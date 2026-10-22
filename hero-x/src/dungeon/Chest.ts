import * as THREE from 'three';
import { GameConfig } from '../game/GameConfig';
import type { Box, Vec2 } from '../player/movement';

interface Chest {
  root: THREE.Group;
  lid: THREE.Mesh;
  x: number;
  z: number;
  opened: boolean;
  /** 뚜껑 열림 진행 0~1 */
  openT: number;
}

/**
 * 보물 상자
 * - GameConfig.dungeon.chests 위치에 놓이고, 플레이어가 가까이 와서 상호작용 키를 누르면 열린다.
 * - 한 번 연 상자는 다시 열 수 없다 (뚜껑이 열린 채 어두워진다). 재시작하면 다시 닫힌다.
 * - 보상은 Game 이 rollChestLoot 로 굴려 LootSystem 에 떨어뜨린다.
 */
export class ChestSystem {
  private readonly root = new THREE.Group();
  private readonly chests: Chest[] = [];
  private readonly bodyGeo = new THREE.BoxGeometry(1.2, 0.7, 0.8);
  private readonly lidGeo = new THREE.BoxGeometry(1.24, 0.3, 0.84);
  private readonly woodMat = new THREE.MeshLambertMaterial({ color: 0xb5793a });
  private readonly trimMat = new THREE.MeshLambertMaterial({ color: 0xffd23f });
  private readonly openedMat = new THREE.MeshLambertMaterial({ color: 0x6b4a26 });

  constructor(scene: THREE.Scene) {
    this.root.name = 'Chests';
    scene.add(this.root);
    for (const c of GameConfig.dungeon.chests) this.place(c.x, c.z);
  }

  private place(x: number, z: number): void {
    const root = new THREE.Group();
    root.position.set(x, 0, z);
    const body = new THREE.Mesh(this.bodyGeo, this.woodMat);
    body.position.y = 0.35;
    body.castShadow = true;
    body.receiveShadow = true;
    root.add(body);
    const band = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.72, 0.84), this.trimMat);
    band.position.y = 0.35;
    root.add(band);
    // 뚜껑은 뒤쪽 모서리를 축으로 열린다
    const lid = new THREE.Mesh(this.lidGeo, this.woodMat);
    lid.position.set(0, 0.15, 0.42);
    lid.castShadow = true;
    const hinge = new THREE.Group();
    hinge.position.set(0, 0.7, -0.42);
    hinge.add(lid);
    root.add(hinge);
    this.root.add(root);
    this.chests.push({ root, lid, x, z, opened: false, openT: 0 });
  }

  /** 충돌용 상자 목록 (플레이어·적이 통과하지 못하게) */
  getCollisionBoxes(): Box[] {
    return this.chests.map((c) => ({ x: c.x, z: c.z, w: 1.3, d: 0.9 }));
  }

  /** 아직 열지 않은 상자 중 플레이어와 가까운 것 (없으면 null) */
  nearest(playerPos: Vec2, range = GameConfig.dungeon.chestLoot.interactRange): Chest | null {
    let best: Chest | null = null;
    let bestD = range;
    for (const c of this.chests) {
      if (c.opened) continue;
      const d = Math.hypot(c.x - playerPos.x, c.z - playerPos.z);
      if (d < bestD) {
        bestD = d;
        best = c;
      }
    }
    return best;
  }

  /** 상자를 연다. 이미 열렸으면 false */
  open(chest: Chest): boolean {
    if (chest.opened) return false;
    chest.opened = true;
    return true;
  }

  get openedCount(): number {
    return this.chests.filter((c) => c.opened).length;
  }

  get total(): number {
    return this.chests.length;
  }

  update(dt: number): void {
    for (const c of this.chests) {
      const target = c.opened ? 1 : 0;
      if (c.openT === target) continue;
      c.openT += (target - c.openT) * (1 - Math.exp(-8 * dt));
      if (Math.abs(target - c.openT) < 0.01) c.openT = target;
      (c.lid.parent as THREE.Group).rotation.x = -c.openT * 1.9;
      if (c.opened && c.openT > 0.5) (c.lid.material as THREE.Material) !== this.openedMat && (c.lid.material = this.openedMat);
    }
  }

  /** 모두 닫는다 (재시작) */
  reset(): void {
    for (const c of this.chests) {
      c.opened = false;
      c.openT = 0;
      (c.lid.parent as THREE.Group).rotation.x = 0;
      c.lid.material = this.woodMat;
    }
  }

  dispose(): void {
    this.root.removeFromParent();
    this.bodyGeo.dispose();
    this.lidGeo.dispose();
    this.woodMat.dispose();
    this.trimMat.dispose();
    this.openedMat.dispose();
  }
}
