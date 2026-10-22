import * as THREE from 'three';
import { GameConfig } from '../game/GameConfig';
import type { Box, CollisionWorld } from '../player/movement';

/**
 * 던전 1 (1단계: 이동 테스트용 공간)
 * - 바닥, 조명, 경계 벽, 장애물을 만든다. 장애물 배치는 GameConfig.world.obstacles 에서 바꾼다.
 * - 텍스처는 코드로 그려서(캔버스) 외부 이미지 파일 없이 동작한다.
 * - 나중에 '잊혀진 숲' 던전(적 배치, 보물 상자, 보스)으로 확장한다.
 */
export class Dungeon01 implements CollisionWorld {
  /** 씬에 추가되는 최상위 객체 */
  readonly root = new THREE.Group();

  private readonly boxes: Box[] = [];
  private sun!: THREE.DirectionalLight;
  private readonly disposables: Array<{ dispose(): void }> = [];

  constructor(scene: THREE.Scene) {
    const w = GameConfig.world;
    this.root.name = 'Dungeon01';
    scene.background = new THREE.Color(w.backgroundColor);
    scene.fog = new THREE.Fog(w.backgroundColor, w.fogNear, w.fogFar);

    this.buildLights();
    this.buildFloor();
    this.buildWalls();
    this.buildObstacles();
    scene.add(this.root);
  }

  /** 조명: 전체를 밝히는 반구광 + 그림자를 만드는 태양광 */
  private buildLights(): void {
    const g = GameConfig.graphics;
    const hemi = new THREE.HemisphereLight(0xdcefff, 0x5f8f3a, 1.1);
    this.root.add(hemi);

    this.sun = new THREE.DirectionalLight(0xfff4de, 2.2);
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

  /** 바닥: 체크무늬 텍스처를 코드로 그린다 */
  private buildFloor(): void {
    const w = GameConfig.world;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = w.floorColor;
      ctx.fillRect(0, 0, 256, 256);
      ctx.fillStyle = w.floorAltColor;
      for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) if ((x + y) % 2) ctx.fillRect(x * 32, y * 32, 32, 32);
      // 풀잎 느낌의 작은 점
      for (let i = 0; i < 160; i++) {
        ctx.fillStyle = Math.random() < 0.5 ? '#8bd268' : '#66ad48';
        ctx.fillRect(Math.random() * 256, Math.random() * 256, 3, 6);
      }
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    const size = w.arenaHalfSize * 2 + 60;
    tex.repeat.set(size / 4, size / 4);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(size, size), new THREE.MeshLambertMaterial({ map: tex }));
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    floor.name = 'Floor';
    this.root.add(floor);
    this.disposables.push(tex, floor.geometry, floor.material);
  }

  /** 경계 벽: 이동 가능한 영역의 테두리 */
  private buildWalls(): void {
    const w = GameConfig.world;
    const half = w.arenaHalfSize;
    const mat = new THREE.MeshLambertMaterial({ color: new THREE.Color(w.wallColor) });
    const len = half * 2 + 1;
    const thickness = 0.5;
    const geo = new THREE.BoxGeometry(len, w.wallHeight, thickness);
    this.disposables.push(mat, geo);
    const positions: Array<[number, number, number]> = [
      [0, -(half + thickness / 2), 0],
      [0, half + thickness / 2, 0],
      [-(half + thickness / 2), 0, Math.PI / 2],
      [half + thickness / 2, 0, Math.PI / 2],
    ];
    for (const [x, z, rot] of positions) {
      const wall = new THREE.Mesh(geo, mat);
      wall.position.set(x, w.wallHeight / 2, z);
      wall.rotation.y = rot;
      wall.castShadow = true;
      wall.receiveShadow = true;
      this.root.add(wall);
    }
  }

  /** 장애물: 설정 목록을 그대로 박스로 만들고 충돌 상자로 등록한다 */
  private buildObstacles(): void {
    for (const o of GameConfig.world.obstacles) {
      const geo = new THREE.BoxGeometry(o.w, o.h, o.d);
      const mat = new THREE.MeshLambertMaterial({ color: new THREE.Color(o.color ?? '#9aa3b2') });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(o.x, o.h / 2, o.z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.root.add(mesh);
      this.boxes.push({ x: o.x, z: o.z, w: o.w, d: o.d });
      this.disposables.push(geo, mat);
    }
  }

  /** 그림자 영역이 플레이어를 따라가도록 태양광을 옮긴다 */
  updateLight(target: THREE.Vector3): void {
    this.sun.position.set(target.x + 12, 26, target.z + 10);
    this.sun.target.position.copy(target);
  }

  getObstacleBoxes(): Box[] {
    return this.boxes;
  }

  /** 다른 시스템(보물 상자 등)의 충돌 상자를 추가한다 */
  addCollisionBoxes(boxes: Box[]): void {
    this.boxes.push(...boxes);
  }

  getArenaHalfSize(): number {
    return GameConfig.world.arenaHalfSize;
  }

  dispose(): void {
    this.root.removeFromParent();
    this.disposables.forEach((d) => d.dispose());
  }
}
