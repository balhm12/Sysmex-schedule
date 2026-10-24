import * as THREE from 'three';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import type { DungeonDef } from '../game/DungeonDefs';
import { GameConfig } from '../game/GameConfig';
import type { ArenaBounds, Box, CollisionWorld } from '../player/movement';
import { createGroundTextures } from '../render/groundTexture';
import { pbr } from '../render/materials';
import { QUALITY_PRESETS, type QualityLevel } from '../render/Quality';
import { Decor } from './Decor';
import { resolveBossConfig } from '../game/DungeonDefs';
import { buildWallBoxes } from './journey';

/**
 * 던전 공간 (정의 데이터로 생성)
 * - 바닥, 조명, 경계 벽, 장애물을 DungeonDef 대로 만든다. 던전 정의는 src/game/DungeonDefs.ts 에 있다.
 * - 텍스처는 코드로 그려서(캔버스) 외부 이미지 파일 없이 동작한다.
 * - 던전을 바꿀 때는 dispose() 한 뒤 새로 만든다 (Game.loadDungeon).
 */
export class DungeonScene implements CollisionWorld {
  /** 씬에 추가되는 최상위 객체 */
  readonly root = new THREE.Group();

  private readonly boxes: Box[] = [];
  private sun!: THREE.DirectionalLight;
  private readonly disposables: Array<{ dispose(): void }> = [];
  private sky: Sky | null = null;
  private floorMat: THREE.MeshStandardMaterial | null = null;
  private decor: Decor | null = null;
  private groundMaps: { map: THREE.Texture; normalMap: THREE.Texture } | null = null;

  constructor(scene: THREE.Scene, readonly def: DungeonDef, quality: QualityLevel = 'medium') {
    const t = def.theme;
    this.root.name = `Dungeon-${def.id}`;
    scene.background = new THREE.Color(t.backgroundColor);
    scene.fog = new THREE.Fog(t.backgroundColor, t.fogNear, t.fogFar);
    if (t.sky) this.buildSky(t.sky);

    this.buildLights();
    this.buildFloor();
    this.buildWalls();
    this.buildObstacles();
    this.decor = new Decor(def, resolveBossConfig(def).spawn, quality);
    this.root.add(this.decor.root);
    this.applyQuality(quality);
    scene.add(this.root);
  }

  /** 장식 애니메이션(풀 바람·입자·경고등) */
  update(dt: number): void {
    this.decor?.update(dt);
  }

  /** 물리 기반 하늘: 태양 높이·방위, 탁도·산란으로 색이 정해진다 (코드 생성, 파일 없음) */
  private buildSky(s: NonNullable<DungeonDef['theme']['sky']>): void {
    this.sky = new Sky();
    this.sky.scale.setScalar(900);
    const u = this.sky.material.uniforms;
    u.turbidity.value = s.turbidity;
    u.rayleigh.value = s.rayleigh;
    u.mieCoefficient.value = 0.005;
    u.mieDirectionalG.value = 0.8;
    const phi = THREE.MathUtils.degToRad(90 - s.elevation);
    const theta = THREE.MathUtils.degToRad(s.azimuth);
    const sun = new THREE.Vector3().setFromSphericalCoords(1, phi, theta);
    u.sunPosition.value.copy(sun);
    this.root.add(this.sky);
  }

  /** 화질 프리셋에 따라 그림자 지도 해상도·바닥 선명도·요철을 맞춘다 */
  applyQuality(q: QualityLevel): void {
    const p = QUALITY_PRESETS[q];
    if (this.sun.shadow.mapSize.x !== p.shadowMapSize) {
      this.sun.shadow.mapSize.set(p.shadowMapSize, p.shadowMapSize);
      this.sun.shadow.map?.dispose();
      this.sun.shadow.map = null;
    }
    if (this.groundMaps) {
      this.groundMaps.map.anisotropy = p.anisotropy;
      this.groundMaps.normalMap.anisotropy = p.anisotropy;
      this.groundMaps.map.needsUpdate = true;
      this.groundMaps.normalMap.needsUpdate = true;
    }
    this.floorMat?.normalScale.set(p.normalScale, p.normalScale);
    if (this.decor && this.lastQuality !== q) this.decor.applyQuality(q);
    this.lastQuality = q;
  }

  private lastQuality: QualityLevel | null = null;

  /** 조명: 전체를 밝히는 반구광 + 그림자를 만드는 태양광 */
  private buildLights(): void {
    const g = GameConfig.graphics;
    const t = this.def.theme;
    const hemi = new THREE.HemisphereLight(new THREE.Color(t.skyColor), new THREE.Color(t.groundColor), 0.9);
    this.root.add(hemi);

    this.sun = new THREE.DirectionalLight(new THREE.Color(t.sunColor), t.sunIntensity);
    // 하늘이 있으면 태양 방향을 하늘의 태양과 맞춘다 (updateLight 에서 위치를 따라가며 유지)
    if (this.def.theme.sky) {
      const s = this.def.theme.sky;
      const dir = new THREE.Vector3().setFromSphericalCoords(1, THREE.MathUtils.degToRad(90 - s.elevation), THREE.MathUtils.degToRad(s.azimuth));
      this.sunDir.copy(dir);
    }
    this.sun.castShadow = g.shadows;
    this.sun.shadow.mapSize.set(g.shadowMapSize, g.shadowMapSize);
    const cam = this.sun.shadow.camera;
    cam.left = -24;
    cam.right = 24;
    cam.top = 24;
    cam.bottom = -24;
    cam.near = 1;
    cam.far = 90;
    cam.updateProjectionMatrix();
    this.sun.shadow.bias = -0.0006;
    this.root.add(this.sun, this.sun.target);
  }

  /** 바닥: 노이즈로 만든 색 지도 + 노멀맵(요철) 을 코드로 생성한다 */
  private buildFloor(): void {
    const w = this.def.theme;
    this.groundMaps = createGroundTextures({ colorA: w.floorColor, colorB: w.floorAltColor, flecks: w.floorFlecks, bump: w.groundBump, scale: w.groundScale, seed: this.def.id.length * 13 + 7 });
    const b = this.getArenaBounds();
    const sizeX = b.halfX * 2 + 60;
    const sizeZ = b.halfZ * 2 + 60;
    this.groundMaps.map.repeat.set(sizeX / 10, sizeZ / 10);
    this.groundMaps.normalMap.repeat.set(sizeX / 10, sizeZ / 10);
    this.floorMat = pbr({ color: 0xffffff, map: this.groundMaps.map, normalMap: this.groundMaps.normalMap, normalScale: 0.7, roughness: w.groundRoughness, metalness: 0 });

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(sizeX, sizeZ), this.floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    floor.name = 'Floor';
    this.root.add(floor);
    this.disposables.push(this.groundMaps.map, this.groundMaps.normalMap, floor.geometry, this.floorMat);
  }

  /** 경계 벽: 이동 가능한 영역의 테두리 */
  private buildWalls(): void {
    const w = this.def.theme;
    const { halfX, halfZ } = this.getArenaBounds();
    const mat = pbr({ color: w.wallColor, roughness: 0.8, metalness: this.def.id === 'fortress' ? 0.5 : 0.05 });
    const thickness = 0.5;
    const geoX = new THREE.BoxGeometry(halfX * 2 + 1, w.wallHeight, thickness);
    const geoZ = new THREE.BoxGeometry(halfZ * 2 + 1, w.wallHeight, thickness);
    this.disposables.push(mat, geoX, geoZ);
    const positions: Array<[number, number, number, THREE.BoxGeometry]> = [
      [0, -(halfZ + thickness / 2), 0, geoX],
      [0, halfZ + thickness / 2, 0, geoX],
      [-(halfX + thickness / 2), 0, Math.PI / 2, geoZ],
      [halfX + thickness / 2, 0, Math.PI / 2, geoZ],
    ];
    for (const [x, z, rot, geo] of positions) {
      const wall = new THREE.Mesh(geo, mat);
      wall.position.set(x, w.wallHeight / 2, z);
      wall.rotation.y = rot;
      wall.castShadow = true;
      wall.receiveShadow = true;
      this.root.add(wall);
    }
  }

  /** 장애물: 설정 목록을 그대로 박스로 만들고 충돌 상자로 등록한다. 여정 던전이면 울타리 벽과 문도 만든다 */
  private buildObstacles(): void {
    for (const o of this.def.obstacles) {
      const geo = new THREE.BoxGeometry(o.w, o.h, o.d);
      // 종류가 있으면 종류별 재질, 없으면 색으로 짐작: 밝은 청록·보라(수정)는 빛나고, 붉은 강철·회색 금속은 금속성, 나머지는 돌·나무
      const c = new THREE.Color(o.color ?? '#9aa3b2');
      const hsl = { h: 0, s: 0, l: 0 };
      c.getHSL(hsl);
      const crystal = this.def.id === 'cave' && hsl.l > 0.6;
      const metallic = this.def.id === 'fortress';
      const mat =
        o.kind === 'ruin'
          ? pbr({ color: c, roughness: 0.95, metalness: 0, flatShading: true })
          : o.kind === 'pillar'
            ? pbr({ color: c, roughness: 0.7, metalness: 0.1 })
            : crystal
              ? pbr({ color: c, roughness: 0.2, metalness: 0.1, emissive: c, emissiveIntensity: 0.22, flatShading: true })
              : pbr({ color: c, roughness: metallic ? 0.45 : 0.85, metalness: metallic ? 0.6 : 0.05 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(o.x, o.h / 2, o.z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.root.add(mesh);
      this.boxes.push({ x: o.x, z: o.z, w: o.w, d: o.d, h: o.h });
      this.disposables.push(geo, mat);
    }
    if (this.def.journey) this.buildJourneyWalls();
  }

  private readonly gates = new Map<string, { mesh: THREE.Mesh; box: Box }>();

  /** 여정 던전의 울타리 벽(인스턴싱 한 번에 그림)과 문 */
  private buildJourneyWalls(): void {
    const j = this.def.journey!;
    const walls = buildWallBoxes(j);
    const geo = new THREE.BoxGeometry(1, 1, 1);
    // 숲은 생울타리(초록), 그 밖은 벽 색
    const color = this.def.id === 'forest' ? '#3f8a3a' : this.def.theme.wallColor;
    const mat = pbr({ color, roughness: 0.95, metalness: 0 });
    const mesh = new THREE.InstancedMesh(geo, mat, walls.length);
    const m = new THREE.Matrix4();
    walls.forEach((w, i) => {
      m.makeScale(w.w, w.h, w.d);
      m.setPosition(w.x, w.h / 2, w.z);
      mesh.setMatrixAt(i, m);
      this.boxes.push({ x: w.x, z: w.z, w: w.w, d: w.d }); // 높이 없음 = 못 오름
    });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.name = 'JourneyWalls';
    this.root.add(mesh);
    this.disposables.push(geo, mat);
    // 문: 나무 널빤지 느낌의 상자, 열리면 사라진다
    const gateMat = pbr({ color: '#8a5a2b', roughness: 0.85, metalness: 0.05 });
    const bandMat = pbr({ color: '#5b5f6b', roughness: 0.4, metalness: 0.7 });
    this.disposables.push(gateMat, bandMat);
    for (const g of j.gates) {
      const gm = new THREE.Mesh(new THREE.BoxGeometry(g.rect.w, j.wallHeight, g.rect.d), gateMat);
      gm.position.set(g.rect.x, j.wallHeight / 2, g.rect.z);
      gm.castShadow = true;
      gm.receiveShadow = true;
      for (const y of [0.5, j.wallHeight - 0.5]) {
        const band = new THREE.Mesh(new THREE.BoxGeometry(g.rect.w + 0.1, 0.18, g.rect.d + 0.1), bandMat);
        band.position.y = y - j.wallHeight / 2;
        gm.add(band);
        this.disposables.push(band.geometry);
      }
      this.root.add(gm);
      const box: Box = { x: g.rect.x, z: g.rect.z, w: g.rect.w, d: g.rect.d };
      this.boxes.push(box);
      this.gates.set(g.id, { mesh: gm, box });
      this.disposables.push(gm.geometry);
    }
  }

  /** 문 열기: 충돌 상자를 빼고 메시를 치운다. 열렸으면 true */
  openGate(id: string): boolean {
    const g = this.gates.get(id);
    if (!g) return false;
    this.gates.delete(id);
    this.removeCollisionBoxes([g.box]);
    g.mesh.removeFromParent();
    return true;
  }

  /** 문 위치 (효과용) */
  gatePosition(id: string): { x: number; z: number } | null {
    const g = this.def.journey?.gates.find((x) => x.id === id);
    return g ? { x: g.rect.x, z: g.rect.z } : null;
  }

  /** 그림자 켜기/끄기 (사용자 설정) */
  setShadows(on: boolean): void {
    this.sun.castShadow = on;
  }

  private readonly sunDir = new THREE.Vector3(12, 26, 10).normalize();

  /** 그림자 영역이 플레이어를 따라가도록 태양광을 옮긴다 (하늘의 태양 방향과 같은 방향) */
  updateLight(target: THREE.Vector3): void {
    this.sun.position.set(target.x + this.sunDir.x * 30, Math.max(10, this.sunDir.y * 30), target.z + this.sunDir.z * 30);
    this.sun.target.position.copy(target);
  }

  getObstacleBoxes(): Box[] {
    return this.boxes;
  }

  /** 다른 시스템(보물 상자 등)의 충돌 상자를 추가한다 */
  addCollisionBoxes(boxes: Box[]): void {
    this.boxes.push(...boxes);
  }

  /** 추가했던 충돌 상자를 뺀다 (같은 객체만) */
  removeCollisionBoxes(boxes: Box[]): void {
    const set = new Set(boxes);
    for (let i = this.boxes.length - 1; i >= 0; i--) if (set.has(this.boxes[i])) this.boxes.splice(i, 1);
  }

  /** 이동 가능 범위: 여정 던전은 직사각형, 그 외는 정사각형 */
  getArenaBounds(): ArenaBounds {
    const j = this.def.journey;
    return j ? { halfX: j.halfX, halfZ: j.halfZ } : { halfX: this.def.arenaHalfSize, halfZ: this.def.arenaHalfSize };
  }

  dispose(): void {
    this.decor?.dispose();
    if (this.sky) {
      this.sky.geometry.dispose();
      this.sky.material.dispose();
    }
    this.root.removeFromParent();
    this.disposables.forEach((d) => d.dispose());
  }
}
