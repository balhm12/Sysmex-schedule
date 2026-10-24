import type { DungeonDef } from '../game/DungeonDefs';
import type { Vec2 } from '../player/movement';

/**
 * 던전 장식 배치 (순수 함수, 테스트 대상)
 * - 나무·바위·수정·기둥 같은 장식을 장애물·상자·적 배치·시작 위치·보스 등장 위치와 겹치지 않는 자리에 놓는다.
 * - 같은 던전·같은 seed 면 항상 같은 배치가 나온다 (결정적 난수).
 * - 영역 '안'의 장식은 작은 것만(충돌 없음), 큰 것(나무·기둥)은 벽 바깥 테두리에 둔다 → 이동·적 AI 에 영향 없음.
 */
export interface DecorItem {
  kind: string;
  x: number;
  z: number;
  /** 크기 배율 */
  scale: number;
  /** 회전(라디안) */
  rot: number;
}

export interface DecorPlan {
  /** 영역 안 작은 장식 (충돌 없음) */
  inside: DecorItem[];
  /** 벽 바깥 테두리의 큰 장식 (보이기만 함) */
  outside: DecorItem[];
}

/** 결정적 난수 (mulberry32) */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 던전별 장식 종류와 개수 */
export const DECOR_KINDS: Record<string, { inside: Array<[string, number]>; outside: Array<[string, number]> }> = {
  forest: { inside: [['rock', 10], ['bush', 14], ['flower', 24], ['stump', 4]], outside: [['tree', 46], ['rock', 10]] },
  cave: { inside: [['crystalSmall', 18], ['stalagmite', 10], ['mushroom', 14]], outside: [['crystalBig', 20], ['stalagmite', 26]] },
  fortress: { inside: [['barrel', 10], ['pipe', 6], ['lamp', 8], ['crate', 6]], outside: [['tower', 10], ['pipe', 14], ['crate', 12]] },
};

/** 점이 어떤 금지 영역과도 겹치지 않는지 */
function isFree(p: Vec2, def: DungeonDef, radius: number, bossSpawn: Vec2): boolean {
  const s = { x: 0, z: 0 };
  if (Math.hypot(p.x - s.x, p.z - s.z) < 4 + radius) return false;
  if (Math.hypot(p.x - bossSpawn.x, p.z - bossSpawn.z) < 4 + radius) return false;
  for (const o of def.obstacles) if (Math.abs(p.x - o.x) < o.w / 2 + radius + 0.6 && Math.abs(p.z - o.z) < o.d / 2 + radius + 0.6) return false;
  for (const c of def.chests) if (Math.hypot(p.x - c.x, p.z - c.z) < 2.2 + radius) return false;
  for (const sp of def.spawns) if (Math.hypot(p.x - sp.x, p.z - sp.z) < 1.8 + radius) return false;
  return true;
}

/** 배치 계산. outsideDepth: 벽 바깥 몇 유닛까지 */
export function planDecor(def: DungeonDef, bossSpawn: Vec2, seed = 1, outsideDepth = 14): DecorPlan {
  const rnd = seededRandom(seed + def.id.length * 7919);
  const kinds = DECOR_KINDS[def.id] ?? DECOR_KINDS.forest;
  const halfX = def.journey?.halfX ?? def.arenaHalfSize;
  const halfZ = def.journey?.halfZ ?? def.arenaHalfSize;
  const half = Math.max(halfX, halfZ);
  const inside: DecorItem[] = [];
  const outside: DecorItem[] = [];
  for (const [kind, count] of kinds.inside) {
    let placed = 0;
    for (let tries = 0; tries < count * 30 && placed < count; tries++) {
      const p = { x: (rnd() * 2 - 1) * (halfX - 1.5), z: (rnd() * 2 - 1) * (halfZ - 1.5) };
      if (!isFree(p, def, 0.6, bossSpawn)) continue;
      if (inside.some((d) => Math.hypot(d.x - p.x, d.z - p.z) < 1.4)) continue;
      inside.push({ kind, x: p.x, z: p.z, scale: 0.75 + rnd() * 0.6, rot: rnd() * Math.PI * 2 });
      placed++;
    }
  }
  for (const [kind, count] of kinds.outside) {
    let placed = 0;
    for (let tries = 0; tries < count * 30 && placed < count; tries++) {
      // 벽 바깥 띠: 네 변 중 하나를 골라 바깥쪽으로
      const side = Math.floor(rnd() * 4);
      const along = (rnd() * 2 - 1) * (half + outsideDepth);
      const depth = (side < 2 ? halfZ : halfX) + 1.5 + rnd() * outsideDepth;
      const p = side === 0 ? { x: along, z: -depth } : side === 1 ? { x: along, z: depth } : side === 2 ? { x: -depth, z: along } : { x: depth, z: along };
      if (outside.some((d) => Math.hypot(d.x - p.x, d.z - p.z) < 2.6)) continue;
      outside.push({ kind, x: p.x, z: p.z, scale: 0.8 + rnd() * 0.7, rot: rnd() * Math.PI * 2 });
      placed++;
    }
  }
  return { inside, outside };
}
