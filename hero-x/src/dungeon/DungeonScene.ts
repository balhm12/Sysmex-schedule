import * as THREE from 'three';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import type { DungeonDef } from '../game/DungeonDefs';
import { GameConfig } from '../game/GameConfig';
import type { ArenaBounds, Box, CollisionWorld } from '../player/movement';
import { createGroundTextures } from '../render/groundTexture';
import { createSurfaceTextures, useWorldSpaceUv, type SurfaceKind } from '../render/surfaceTexture';
import { glow } from '../render/materials';
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
  private rim: THREE.DirectionalLight | null = null;
  private readonly disposables: Array<{ dispose(): void }> = [];
  private sky: Sky | null = null;
  private floorMat: THREE.MeshStandardMaterial | null = null;
  private decor: Decor | null = null;
  private groundMaps: { map: THREE.Texture; normalMap: THREE.Texture } | null = null;
  /** 벽 재질(테마별 표면 텍스처: 생울타리·바위·강철·얼음). 경계 벽과 여정 울타리가 함께 쓴다 */
  private wallMat: THREE.MeshStandardMaterial | null = null;
  /** 장애물용 표면 텍스처 캐시 (종류별 1회 생성) */
  private readonly surfaceCache = new Map<string, { map: THREE.Texture; normalMap: THREE.Texture }>();

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
    if (this.rim) this.rim.visible = p.rimLight;
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

    // 림 라이트: 태양 반대쪽 위에서 비추는 하늘색 역광 → 둥근 캐릭터 윤곽이 배경에서 또렷해진다 (그림자 없음)
    const rim = new THREE.DirectionalLight(new THREE.Color(t.skyColor).lerp(new THREE.Color(0xffffff), 0.3), 0.55);
    rim.name = 'rimLight';
    this.rim = rim;
    this.root.add(rim);
    this.root.add(rim.target);

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

  /** 던전별 벽 표면 종류: 숲 생울타리 / 동굴 바위 / 요새 강철 / 얼음 봉우리 얼음 */
  private wallSurface(): SurfaceKind {
    return this.def.id === 'forest' ? 'hedge' : this.def.id === 'fortress' ? 'steel' : this.def.id === 'ice' ? 'ice' : 'rock';
  }

  /** 표면 텍스처 (종류+색별로 한 번만 만든다) */
  private surface(kind: SurfaceKind, color: string): { map: THREE.Texture; normalMap: THREE.Texture } {
    const key = `${kind}:${color}`;
    let t = this.surfaceCache.get(key);
    if (!t) {
      t = createSurfaceTextures({ kind, color, seed: this.def.id.length * 7 + kind.length });
      this.surfaceCache.set(key, t);
      this.disposables.push(t.map, t.normalMap);
    }
    return t;
  }

  /** 벽 재질: 테마 표면 텍스처 + 월드 좌표 UV (크기가 다른 벽 조각에도 무늬가 늘어나지 않음) */
  private wallMaterial(): THREE.MeshStandardMaterial {
    if (this.wallMat) return this.wallMat;
    const kind = this.wallSurface();
    const color = kind === 'hedge' ? '#3f8a3a' : this.def.theme.wallColor;
    const t = this.surface(kind, color);
    const ice = kind === 'ice';
    const mat = pbr({
      color: 0xffffff,
      map: t.map,
      normalMap: t.normalMap,
      normalScale: kind === 'hedge' ? 1.0 : 0.7,
      roughness: kind === 'steel' ? 0.45 : ice ? 0.2 : 0.95,
      metalness: kind === 'steel' ? 0.6 : 0,
    });
    if (ice) {
      mat.transparent = true;
      mat.opacity = 0.9;
      mat.emissive = new THREE.Color('#5fa8d8');
      mat.emissiveIntensity = 0.12;
    }
    useWorldSpaceUv(mat, kind === 'hedge' ? 2.5 : kind === 'steel' ? 4 : 3);
    this.wallMat = mat;
    this.disposables.push(mat);
    return mat;
  }

  /** 경계 벽: 이동 가능한 영역의 테두리 */
  private buildWalls(): void {
    const w = this.def.theme;
    const { halfX, halfZ } = this.getArenaBounds();
    const mat = this.wallMaterial();
    const thickness = 0.5;
    const geoX = new THREE.BoxGeometry(halfX * 2 + 1, w.wallHeight, thickness);
    const geoZ = new THREE.BoxGeometry(halfZ * 2 + 1, w.wallHeight, thickness);
    this.disposables.push(geoX, geoZ);
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

  /**
   * 벽 위 장식 (인스턴싱 1~2회): 숲 덤불 덩어리 / 얼음 고드름·눈 모자 / 동굴 수정 조각 / 요새 난간·경고등
   * 걷는 길에는 영향 없음(보이기만 함).
   */
  private buildWallTops(walls: Array<{ x: number; z: number; w: number; d: number; h: number }>): void {
    const kind = this.wallSurface();
    const seed = (x: number, z: number, k = 0) => {
      const n = Math.sin(x * 12.9898 + z * 78.233 + k * 37.719) * 43758.5453;
      return n - Math.floor(n);
    };
    const place = (geo: THREE.BufferGeometry, mat: THREE.Material, step: number, fn: (w: { x: number; z: number; w: number; d: number; h: number }, px: number, pz: number, r: number, m: THREE.Matrix4, c: THREE.Color) => boolean, name: string) => {
      const items: Array<{ m: THREE.Matrix4; c: THREE.Color }> = [];
      const q = new THREE.Quaternion();
      const sc = new THREE.Vector3();
      const pos = new THREE.Vector3();
      for (const w of walls) {
        const n = Math.max(1, Math.round(Math.max(w.w, w.d) / step));
        for (let i = 0; i < n; i++) {
          const t = (i + 0.5) / n - 0.5;
          const px = w.x + (w.w >= w.d ? t * w.w : 0);
          const pz = w.z + (w.w >= w.d ? 0 : t * w.d);
          const r = seed(px, pz, i);
          const m = new THREE.Matrix4();
          const c = new THREE.Color(1, 1, 1);
          if (fn(w, px, pz, r, m, c)) items.push({ m, c });
        }
      }
      if (items.length === 0) return;
      const mesh = new THREE.InstancedMesh(geo, mat, items.length);
      items.forEach((it, i) => {
        mesh.setMatrixAt(i, it.m);
        mesh.setColorAt(i, it.c);
      });
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
      mesh.castShadow = kind !== 'ice';
      mesh.receiveShadow = true;
      mesh.name = name;
      this.root.add(mesh);
      this.disposables.push(geo, mat);
      void q;
      void sc;
      void pos;
    };
    const compose = (m: THREE.Matrix4, x: number, y: number, z: number, s: number, ry = 0, sy = s) => m.compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), ry), new THREE.Vector3(s, sy, s));
    if (kind === 'hedge') {
      // 덤불 덩어리: 벽 위에 봉긋하게, 색은 잎 색 변주
      place(new THREE.DodecahedronGeometry(0.75, 0), pbr({ color: 0xffffff, roughness: 0.95, flatShading: true }), 1.5, (w, px, pz, r, m, c) => {
        compose(m, px + (r - 0.5) * 0.4, w.h - 0.1, pz + (seed(px, pz, 9) - 0.5) * 0.4, 0.8 + r * 0.5, r * 6.28, 0.6 + r * 0.3);
        c.setHSL(0.3 + (r - 0.5) * 0.05, 0.55, 0.1 + r * 0.1); // 선형 색이라 어둡게 잡아야 잎 색이 된다
        return true;
      }, 'WallBushes');
    } else if (kind === 'ice') {
      // 고드름: 벽 양 옆면 윗모서리에 매달림(아래로 뾰족), 눈 모자: 윗면에 납작하게
      const icicleGeo = new THREE.ConeGeometry(0.16, 0.9, 5);
      icicleGeo.rotateX(Math.PI); // 뾰족한 끝이 아래로
      const iceMat = new THREE.MeshStandardMaterial({ color: new THREE.Color('#dff4ff'), roughness: 0.15, transparent: true, opacity: 0.85 });
      place(icicleGeo, iceMat, 1.3, (w, px, pz, r, m) => {
        if (r < 0.35) return false;
        const side = seed(px, pz, 3) < 0.5 ? -1 : 1;
        const along = w.w >= w.d;
        const ox = along ? 0 : side * (w.w / 2 + 0.1);
        const oz = along ? side * (w.d / 2 + 0.1) : 0;
        compose(m, px + ox, w.h - 0.45 - r * 0.2, pz + oz, 0.7 + r * 0.6, 0, 0.7 + r * 0.8);
        return true;
      }, 'WallIcicles');
      place(new THREE.SphereGeometry(0.7, 8, 6), pbr({ color: '#f6fbff', roughness: 0.98 }), 1.6, (w, px, pz, r, m) => {
        compose(m, px, w.h + 0.02, pz, 0.75 + r * 0.4, 0, 0.3 + r * 0.15);
        return true;
      }, 'WallSnow');
    } else if (kind === 'rock') {
      // 수정 조각: 드문드문, 발광
      place(new THREE.ConeGeometry(0.22, 1.1, 5), glow('#b48cff', 0.9), 3.2, (w, px, pz, r, m, c) => {
        if (r < 0.55) return false;
        compose(m, px + (r - 0.5) * 0.6, w.h + 0.45, pz + (seed(px, pz, 5) - 0.5) * 0.6, 0.6 + r * 0.7, r * 6.28, 0.6 + r * 0.9);
        c.set(r > 0.8 ? '#8fe8ff' : '#c7a2ff');
        return true;
      }, 'WallCrystals');
    } else {
      // 강철 난간 + 붉은 경고등
      place(new THREE.BoxGeometry(1, 0.14, 0.3), pbr({ color: '#3a3c44', roughness: 0.4, metalness: 0.8 }), 1, (w, px, pz, _r, m) => {
        const along = w.w >= w.d;
        compose(m, px, w.h + 0.07, pz, 1, along ? 0 : Math.PI / 2, 1);
        return true;
      }, 'WallRails');
      place(new THREE.SphereGeometry(0.14, 8, 6), glow('#ff3b3b', 1.6), 6, (w, px, pz, r, m) => {
        if (r < 0.5) return false;
        compose(m, px, w.h + 0.3, pz, 1);
        return true;
      }, 'WallLamps');
    }
  }

  /** 장애물 하나를 종류별로 보기 좋게 만든다 (충돌 상자는 그대로 상자) */
  private makeObstacle(o: (typeof this.def.obstacles)[number]): THREE.Object3D {
    const g = new THREE.Group();
    g.position.set(o.x, 0, o.z);
    const c = new THREE.Color(o.color ?? '#9aa3b2');
    const add = (geo: THREE.BufferGeometry, mat: THREE.Material, y: number, x = 0, z = 0) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.castShadow = true;
      m.receiveShadow = true;
      g.add(m);
      this.disposables.push(geo, mat);
      return m;
    };
    const ice = this.def.id === 'ice';
    const kind = o.kind ?? (this.def.id === 'cave' ? 'pillar' : 'crate');
    switch (kind) {
      case 'crate': {
        // 나무 상자(얼음 던전은 얼음 덩어리): 판자 텍스처 + 모서리 쇠테 + 못
        if (ice) {
          const t = this.surface('ice', o.color ?? '#bfe3f7');
          const m = pbr({ color: 0xffffff, map: t.map, normalMap: t.normalMap, roughness: 0.2, metalness: 0 });
          m.transparent = true;
          m.opacity = 0.92;
          add(new THREE.BoxGeometry(o.w, o.h, o.d), m, o.h / 2);
          add(new THREE.BoxGeometry(o.w * 0.9, 0.12, o.d * 0.9), pbr({ color: '#f6fbff', roughness: 0.98 }), o.h + 0.05);
          break;
        }
        const t = this.surface('wood', o.color ?? '#b07a3e');
        add(new THREE.BoxGeometry(o.w, o.h, o.d), pbr({ color: 0xffffff, map: t.map, normalMap: t.normalMap, normalScale: 0.6, roughness: 0.85, metalness: 0 }), o.h / 2);
        const band = pbr({ color: '#4c4f58', roughness: 0.45, metalness: 0.7 });
        for (const sx of [-1, 1]) for (const sz of [-1, 1]) add(new THREE.BoxGeometry(0.12, o.h + 0.04, 0.12), band, o.h / 2, sx * (o.w / 2 - 0.05), sz * (o.d / 2 - 0.05));
        for (const y of [0.18, o.h - 0.18]) add(new THREE.BoxGeometry(o.w + 0.06, 0.1, o.d + 0.06), band, y);
        break;
      }
      case 'pillar': {
        // 돌기둥(동굴·얼음은 수정/얼음 기둥): 받침 + 원기둥 + 머리
        const crystal = this.def.id === 'cave' || ice;
        const r = Math.min(o.w, o.d) / 2;
        if (crystal) {
          const m = pbr({ color: c, roughness: 0.2, metalness: 0.1, emissive: c, emissiveIntensity: ice ? 0.1 : 0.25, flatShading: true });
          add(new THREE.CylinderGeometry(r * 0.75, r, o.h * 0.75, 6), m, o.h * 0.375);
          add(new THREE.ConeGeometry(r * 0.75, o.h * 0.3, 6), m, o.h * 0.75 + o.h * 0.15);
          add(new THREE.CylinderGeometry(r * 0.35, r * 0.45, o.h * 0.5, 5), m, o.h * 0.3, r * 0.9, r * 0.3).rotation.z = -0.35;
          add(new THREE.DodecahedronGeometry(r * 1.2, 0), pbr({ color: this.def.theme.floorAltColor, roughness: 0.95, flatShading: true }), 0.2);
          break;
        }
        const t = this.surface('rock', o.color ?? '#9aa3b2');
        const stone = pbr({ color: 0xffffff, map: t.map, normalMap: t.normalMap, normalScale: 0.6, roughness: 0.85, metalness: 0 });
        add(new THREE.BoxGeometry(o.w * 1.15, 0.3, o.d * 1.15), stone, 0.15);
        add(new THREE.CylinderGeometry(r * 0.85, r * 0.95, o.h - 0.6, 10), stone, o.h / 2);
        add(new THREE.BoxGeometry(o.w * 1.1, 0.3, o.d * 1.1), stone, o.h - 0.15);
        if (this.def.id === 'forest') add(new THREE.BoxGeometry(o.w * 0.7, 0.1, o.d * 0.6), pbr({ color: '#4f8a3a', roughness: 0.95 }), o.h + 0.02, 0.1, 0.1);
        break;
      }
      case 'ruin': {
        // 돌담: 벽돌 텍스처 + 윗줄 이가 빠진 느낌 + 이끼/눈
        const t = this.surface('brick', o.color ?? '#8f8a7e');
        const brick = pbr({ color: 0xffffff, map: t.map, normalMap: t.normalMap, normalScale: 0.7, roughness: 0.95, metalness: 0 });
        add(new THREE.BoxGeometry(o.w, o.h - 0.25, o.d), brick, (o.h - 0.25) / 2);
        const n = Math.max(2, Math.round(o.w / 0.6));
        for (let i = 0; i < n; i++) {
          const rr = Math.sin(o.x * 3.1 + o.z * 1.7 + i) * 0.5 + 0.5;
          if (rr < 0.35) continue;
          add(new THREE.BoxGeometry(o.w / n - 0.04, 0.25, o.d), brick, o.h - 0.125, -o.w / 2 + (i + 0.5) * (o.w / n), 0);
        }
        add(new THREE.BoxGeometry(o.w * 0.5, 0.06, o.d + 0.04), pbr({ color: ice ? '#f6fbff' : this.def.id === 'cave' ? '#b48cff' : '#4f8a3a', roughness: 0.95 }), o.h - 0.25 + 0.03, o.w * 0.15, 0);
        break;
      }
      case 'hedge': {
        add(new THREE.BoxGeometry(o.w, o.h, o.d), this.wallMaterial(), o.h / 2);
        break;
      }
      default: {
        const metallic = this.def.id === 'fortress';
        add(new THREE.BoxGeometry(o.w, o.h, o.d), pbr({ color: c, roughness: metallic ? 0.45 : 0.85, metalness: metallic ? 0.6 : 0.05 }), o.h / 2);
      }
    }
    return g;
  }

  /** 장애물: 설정 목록을 종류별 모델로 만들고 충돌 상자로 등록한다. 여정 던전이면 울타리 벽과 문도 만든다 */
  private buildObstacles(): void {
    for (const o of this.def.obstacles) {
      this.root.add(this.makeObstacle(o));
      this.boxes.push({ x: o.x, z: o.z, w: o.w, d: o.d, h: o.h });
    }
    if (this.def.journey) this.buildJourneyWalls();
  }

  private readonly gates = new Map<string, { mesh: THREE.Mesh; box: Box }>();

  /** 여정 던전의 울타리 벽(인스턴싱 한 번에 그림)과 문 */
  private buildJourneyWalls(): void {
    const j = this.def.journey!;
    const walls = buildWallBoxes(j);
    const geo = new THREE.BoxGeometry(1, 1, 1);
    // 테마 표면 텍스처(숲 생울타리·동굴 바위·요새 강철·얼음) — 색 변주는 인스턴스 색으로
    const color = this.def.id === 'forest' ? '#3f8a3a' : this.def.theme.wallColor;
    const mat = this.wallMaterial();
    const mesh = new THREE.InstancedMesh(geo, mat, walls.length);
    const m = new THREE.Matrix4();
    const tint = new THREE.Color();
    void color;
    walls.forEach((w, i) => {
      m.makeScale(w.w, w.h, w.d);
      m.setPosition(w.x, w.h / 2, w.z);
      mesh.setMatrixAt(i, m);
      // 벽마다 밝기를 조금씩 달리해 단조로움을 깬다 (텍스처 색에 곱해지므로 흰색 근처로)
      const n = Math.sin(w.x * 12.9898 + w.z * 78.233) * 43758.5453;
      const jitter = (n - Math.floor(n)) - 0.5;
      tint.setScalar(1 + jitter * 0.3);
      mesh.setColorAt(i, tint);
      this.boxes.push({ x: w.x, z: w.z, w: w.w, d: w.d }); // 높이 없음 = 못 오름
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.name = 'JourneyWalls';
    this.root.add(mesh);
    this.disposables.push(geo);
    this.buildWallTops(walls.map((w) => ({ x: w.x, z: w.z, w: w.w, d: w.d, h: w.h })));
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
    if (this.rim) {
      // 림 라이트는 태양 반대쪽(뒤)에서 낮게
      this.rim.position.set(target.x - this.sunDir.x * 30, 14, target.z - this.sunDir.z * 30);
      this.rim.target.position.copy(target);
    }
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
