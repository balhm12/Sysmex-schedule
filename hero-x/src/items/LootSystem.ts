import * as THREE from 'three';
import { pbr } from '../render/materials';
import { GameConfig } from '../game/GameConfig';
import type { Vec2 } from '../player/movement';
import { generateRandomItem } from './ItemDatabase';
import { rollChestLoot, rollLoot, type Drop, type ItemKind } from './loot';

interface Pickup {
  mesh: THREE.Mesh;
  drop: Drop;
  t: number;
  life: number;
  /** 희귀 이상 장비의 빛 기둥·고리 */
  aura?: THREE.Group;
}

/** 이 등급부터 떨어진 장비에 빛 기둥을 세운다 */
const RARE_GLOW = new Set(['rare', 'epic', 'legendary']);

/**
 * 바닥에 떨어진 아이템 관리
 * - 적 처치 위치에 아이템을 떨어뜨리고, 플레이어가 가까이 오면 끌려가 획득된다.
 * - 외형은 종류별 단순 도형 (heal: 붉은 십자 느낌의 상자, xp: 하늘색 보석, gold: 노란 동전).
 * - 획득 효과(회복·경험치·골드 반영)는 콜백으로 Game 에 맡긴다.
 */
export class LootSystem {
  private readonly root = new THREE.Group();
  private readonly pickups: Pickup[] = [];
  private readonly auraRingGeo = new THREE.RingGeometry(0.5, 0.75, 24);
  private readonly auraBeamGeo = (() => {
    const g = new THREE.CylinderGeometry(0.22, 0.34, 3.2, 12, 1, true);
    g.translate(0, 1.6, 0);
    return g;
  })();
  private readonly geos: Record<ItemKind, THREE.BufferGeometry> = {
    heal: new THREE.BoxGeometry(0.42, 0.42, 0.42),
    xp: new THREE.OctahedronGeometry(0.3, 0),
    gold: new THREE.CylinderGeometry(0.26, 0.26, 0.1, 16),
    equip: new THREE.BoxGeometry(0.5, 0.36, 0.34),
  };
  private readonly mats: Record<ItemKind, THREE.Material> = {
    heal: pbr({ color: 0xff4f79, emissive: 0x551122, emissiveIntensity: 1.2, roughness: 0.35, metalness: 0.3 }),
    xp: pbr({ color: 0x5cf2d8, emissive: 0x0f4a44, emissiveIntensity: 1.2, roughness: 0.35, metalness: 0.3 }),
    gold: pbr({ color: 0xffd23f, emissive: 0x4d3a00, emissiveIntensity: 1.2, roughness: 0.35, metalness: 0.3 }),
    equip: pbr({ color: 0xcdd6f4, emissive: 0x333a55, emissiveIntensity: 1.2, roughness: 0.35, metalness: 0.3 }),
  };

  constructor(scene: THREE.Scene) {
    this.root.name = 'Loot';
    scene.add(this.root);
  }

  /** 적 처치 보상을 굴려 바닥에 떨어뜨린다 */
  dropFor(enemyScore: number, at: Vec2, rewardMul: { gold: number; xp: number } = { gold: 1, xp: 1 }): Drop[] {
    const l = GameConfig.loot;
    const table = { ...l, xpPerScore: l.xpPerScore * rewardMul.xp, goldMin: Math.round(l.goldMin * rewardMul.gold), goldMax: Math.round(l.goldMax * rewardMul.gold), equipChance: GameConfig.equipment.dropChance };
    const drops = rollLoot(enemyScore, table, Math.random, () => generateRandomItem());
    this.scatter(drops, at, 0.6);
    return drops;
  }

  /** 보물 상자 보상을 굴려 상자 앞에 흩어 놓는다 */
  dropChest(at: Vec2): Drop[] {
    const t = GameConfig.dungeon.chestLoot;
    const drops = rollChestLoot({ ...t, healAmount: GameConfig.loot.healAmount }, Math.random, () => generateRandomItem());
    this.scatter(drops, at, 1.1);
    return drops;
  }

  /** 여러 개를 원형으로 흩어 놓는다 */
  private scatter(drops: Drop[], at: Vec2, radius: number): void {
    drops.forEach((d, i) => {
      const angle = (i / drops.length) * Math.PI * 2 + Math.random();
      this.spawn(d, { x: at.x + Math.cos(angle) * radius, z: at.z + Math.sin(angle) * radius });
    });
  }

  /** 아이템 하나를 놓는다 */
  spawn(drop: Drop, at: Vec2): void {
    let material = this.mats[drop.kind];
    if (drop.kind === 'equip' && drop.item) {
      // 장비 상자는 등급 색으로
      const color = new THREE.Color(GameConfig.equipment.rarities[drop.item.rarity].color);
      material = new THREE.MeshLambertMaterial({ color, emissive: color.clone().multiplyScalar(0.35) });
    }
    const mesh = new THREE.Mesh(this.geos[drop.kind], material);
    mesh.position.set(at.x, 0.6, at.z);
    if (drop.kind === 'gold') mesh.rotation.x = Math.PI / 2;
    mesh.castShadow = true;
    this.root.add(mesh);
    // 희귀 이상 장비: 등급 색 빛 기둥 + 바닥 고리가 멀리서도 보이게 (update 에서 맥동)
    let aura: THREE.Group | undefined;
    if (drop.kind === 'equip' && drop.item && RARE_GLOW.has(drop.item.rarity)) {
      const color = new THREE.Color(GameConfig.equipment.rarities[drop.item.rarity].color);
      aura = new THREE.Group();
      const ring = new THREE.Mesh(this.auraRingGeo, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.7, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending }));
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.06;
      const beam = new THREE.Mesh(this.auraBeamGeo, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.28, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending }));
      aura.add(ring, beam);
      aura.position.set(at.x, 0, at.z);
      this.root.add(aura);
    }
    this.pickups.push({ mesh, drop, t: Math.random() * 6, life: GameConfig.loot.lifetime, aura });
  }

  get count(): number {
    return this.pickups.length;
  }

  /**
   * 매 프레임: 둥실거리며 회전, 플레이어가 가까우면 끌려가고, 닿으면 onCollect 호출
   */
  update(dt: number, playerPos: Vec2, onCollect: (drop: Drop, at: Vec2) => void): void {
    const cfg = GameConfig.loot;
    for (let i = this.pickups.length - 1; i >= 0; i--) {
      const p = this.pickups[i];
      p.t += dt;
      p.life -= dt;
      p.mesh.rotation.y += dt * 2.5;
      p.mesh.position.y = 0.6 + Math.sin(p.t * 3) * 0.12;
      if (p.aura) {
        const k = 1 + Math.sin(p.t * 4) * 0.15;
        p.aura.children[0].scale.setScalar(k);
        p.aura.rotation.y += dt * 0.8;
        p.aura.position.x = p.mesh.position.x;
        p.aura.position.z = p.mesh.position.z;
        p.aura.visible = p.mesh.visible;
      }
      // 사라지기 3초 전부터 깜빡임
      p.mesh.visible = p.life > 3 || Math.floor(p.t * 8) % 2 === 0;

      const dx = playerPos.x - p.mesh.position.x;
      const dz = playerPos.z - p.mesh.position.z;
      const dist = Math.hypot(dx, dz);
      if (dist < cfg.magnetRange && dist > 1e-4) {
        const pull = (cfg.magnetSpeed + (cfg.magnetRange - dist) * 2) * dt;
        p.mesh.position.x += (dx / dist) * Math.min(pull, dist);
        p.mesh.position.z += (dz / dist) * Math.min(pull, dist);
      }
      if (dist < cfg.pickupRadius) {
        onCollect(p.drop, { x: p.mesh.position.x, z: p.mesh.position.z });
        this.remove(i);
        continue;
      }
      if (p.life <= 0) this.remove(i);
    }
  }

  clear(): void {
    for (let i = this.pickups.length - 1; i >= 0; i--) this.remove(i);
  }

  dispose(): void {
    this.clear();
    Object.values(this.geos).forEach((g) => g.dispose());
    Object.values(this.mats).forEach((m) => m.dispose());
    this.auraRingGeo.dispose();
    this.auraBeamGeo.dispose();
    this.root.removeFromParent();
  }

  private remove(i: number): void {
    const p = this.pickups[i];
    this.root.remove(p.mesh);
    if (p.drop.kind === 'equip') (p.mesh.material as THREE.Material).dispose();
    if (p.aura) {
      this.root.remove(p.aura);
      for (const c of p.aura.children) ((c as THREE.Mesh).material as THREE.Material).dispose();
    }
    this.pickups.splice(i, 1);
  }
}
