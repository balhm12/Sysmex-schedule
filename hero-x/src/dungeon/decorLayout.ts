import type { DungeonDef } from '../game/DungeonDefs';
import type { Vec2 } from '../player/movement';
import { inRect, isWalkable, zoneSpawns, type JourneyDef, type ZoneKind } from './journey';

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
  ice: { inside: [['snowPile', 16], ['iceSpike', 12], ['rock', 6]], outside: [['frozenTree', 40], ['iceSpike', 16], ['snowPile', 10]] },
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

// ---------------------------------------------------------------- 여정 구역 테마 소품
/**
 * 구역 종류별 소품 (여정 던전 전용). 종류 → [소품, 개수, 어디에]
 * - edge: 구역 사각형의 가장자리 띠(안쪽 1.2~2.6 유닛)에 둔다 → 한가운데 전투 공간을 비워 둔다
 * - corner: 네 모서리 근처
 * - center: 구역 중심 (쉼터의 모닥불처럼 한 개짜리)
 */
export type PropPlace = 'edge' | 'corner' | 'center';
export type ZonePropTable = Record<ZoneKind, Array<[string, number, PropPlace]>>;
/** 숲(기본) 구역 소품 */
export const ZONE_PROPS: ZonePropTable = {
  start: [['signpost', 1, 'center'], ['torch', 2, 'corner'], ['fence', 4, 'edge']],
  fight: [['stump', 3, 'edge'], ['log', 2, 'edge'], ['fence', 3, 'edge']],
  path: [['torch', 4, 'edge'], ['rock', 3, 'edge']],
  treasure: [['ruinPillar', 4, 'corner'], ['ruinWall', 2, 'edge'], ['mushroomGlow', 4, 'edge']],
  branch: [['signpost', 1, 'center'], ['torch', 2, 'corner'], ['ruinPillar', 2, 'edge']],
  secret: [['ruinPillar', 4, 'corner'], ['bones', 3, 'edge'], ['mushroomGlow', 5, 'edge']],
  ambush: [['log', 4, 'edge'], ['bones', 2, 'edge'], ['stump', 2, 'edge']],
  rest: [['campfire', 1, 'center'], ['logSeat', 3, 'center'], ['torch', 2, 'corner'], ['tent', 1, 'edge']],
  arena: [['ruinPillar', 6, 'edge'], ['torch', 4, 'corner'], ['ruinWall', 2, 'edge']],
  boss: [['bossPillar', 4, 'corner'], ['torch', 6, 'edge'], ['bones', 3, 'edge']],
};

/** 수정 동굴: 횃불·수정 기둥·종유석·발광 버섯·뼈 */
export const CAVE_ZONE_PROPS: ZonePropTable = {
  start: [['torch', 2, 'corner'], ['crystalPillar', 2, 'edge'], ['stalagmite', 2, 'edge']],
  fight: [['crystalPillar', 3, 'edge'], ['stalagmite', 3, 'edge'], ['mushroomGlow', 2, 'edge']],
  path: [['torch', 3, 'edge'], ['stalagmite', 3, 'edge']],
  treasure: [['crystalPillar', 3, 'corner'], ['mushroomGlow', 5, 'edge'], ['bones', 1, 'edge']],
  branch: [['torch', 2, 'corner'], ['crystalPillar', 2, 'edge']],
  secret: [['crystalPillar', 3, 'corner'], ['bones', 4, 'edge'], ['mushroomGlow', 4, 'edge']],
  ambush: [['stalagmite', 4, 'edge'], ['bones', 3, 'edge'], ['mushroomGlow', 2, 'edge']],
  rest: [['campfire', 1, 'center'], ['logSeat', 2, 'center'], ['torch', 2, 'corner'], ['mushroomGlow', 3, 'edge']],
  arena: [['crystalPillar', 6, 'edge'], ['torch', 4, 'corner'], ['stalagmite', 2, 'edge']],
  boss: [['bossPillar', 4, 'corner'], ['crystalPillar', 4, 'edge'], ['bones', 3, 'edge']],
};

/** 강철 요새(로봇 공장): 경고등·기계·컨테이너·드럼통·배관 */
export const FORTRESS_ZONE_PROPS: ZonePropTable = {
  start: [['lamp', 2, 'corner'], ['crate', 3, 'edge'], ['machine', 1, 'edge']],
  fight: [['barrel', 3, 'edge'], ['crate', 3, 'edge'], ['lamp', 2, 'corner']],
  path: [['lamp', 4, 'edge'], ['pipe', 3, 'edge']],
  treasure: [['crate', 4, 'edge'], ['barrel', 3, 'edge'], ['machine', 1, 'corner']],
  branch: [['lamp', 2, 'corner'], ['machine', 1, 'edge'], ['barrel', 2, 'edge']],
  secret: [['machine', 2, 'corner'], ['barrel', 3, 'edge'], ['crate', 2, 'edge']],
  ambush: [['barrel', 4, 'edge'], ['pipe', 2, 'edge'], ['lamp', 2, 'corner']],
  rest: [['machine', 2, 'edge'], ['lamp', 2, 'corner'], ['crate', 2, 'edge'], ['barrel', 2, 'edge']],
  arena: [['machine', 4, 'edge'], ['lamp', 4, 'corner'], ['pipe', 2, 'edge']],
  boss: [['bossPillar', 4, 'corner'], ['lamp', 6, 'edge'], ['machine', 2, 'edge']],
};

/** 얼음 봉우리: 눈더미·고드름·얼어붙은 나무·얼음 등불·모닥불 */
export const ICE_ZONE_PROPS: ZonePropTable = {
  start: [['signpost', 1, 'center'], ['iceLantern', 2, 'corner'], ['snowPile', 3, 'edge'], ['fence', 2, 'edge']],
  fight: [['iceSpike', 4, 'edge'], ['snowPile', 3, 'edge'], ['frozenTree', 2, 'corner']],
  path: [['iceLantern', 3, 'edge'], ['frozenTree', 3, 'edge']],
  treasure: [['iceSpike', 4, 'corner'], ['snowPile', 3, 'edge'], ['mushroomGlow', 2, 'edge']],
  branch: [['signpost', 1, 'center'], ['iceLantern', 2, 'corner'], ['iceSpike', 2, 'edge']],
  secret: [['ruinPillar', 4, 'corner'], ['iceSpike', 3, 'edge'], ['bones', 3, 'edge']],
  ambush: [['iceSpike', 5, 'edge'], ['snowPile', 3, 'edge'], ['bones', 2, 'edge']],
  rest: [['campfire', 1, 'center'], ['logSeat', 3, 'center'], ['iceLantern', 2, 'corner'], ['tent', 1, 'edge']],
  arena: [['iceSpike', 6, 'edge'], ['iceLantern', 4, 'corner'], ['frozenTree', 2, 'edge']],
  boss: [['bossPillar', 4, 'corner'], ['iceSpike', 6, 'edge'], ['snowPile', 3, 'edge']],
};

/** 던전별 구역 소품 표 (없으면 숲 표) */
export function zonePropsFor(dungeonId: string): ZonePropTable {
  return dungeonId === 'cave' ? CAVE_ZONE_PROPS : dungeonId === 'fortress' ? FORTRESS_ZONE_PROPS : dungeonId === 'ice' ? ICE_ZONE_PROPS : ZONE_PROPS;
}

/** 구역 안 소품 자리가 비어 있는지: 걷는 칸 위, 적 등장 자리·상자·장애물·문과 안 겹침 */
function isZoneFree(p: Vec2, j: JourneyDef, def: DungeonDef, bossSpawn: Vec2, taken: DecorItem[], gap: number): boolean {
  if (!isWalkable(j, p)) return false;
  if (Math.hypot(p.x - j.start.x, p.z - j.start.z) < 2.5) return false;
  for (const z of j.zones) for (const sp of zoneSpawns(z)) if (Math.hypot(p.x - sp.x, p.z - sp.z) < 2.0) return false;
  for (const c of def.chests) if (Math.hypot(p.x - c.x, p.z - c.z) < 2.4) return false;
  for (const o of def.obstacles) if (Math.abs(p.x - o.x) < o.w / 2 + 1.0 && Math.abs(p.z - o.z) < o.d / 2 + 1.0) return false;
  for (const g of j.gates) if (inRect(p, g.rect, 2.5)) return false;
  if (Math.hypot(p.x - bossSpawn.x, p.z - bossSpawn.z) < 5) return false;
  return !taken.some((d) => Math.hypot(d.x - p.x, d.z - p.z) < gap);
}

/**
 * 여정 던전의 구역 테마 소품 배치 (순수 함수, 결정적). 여정이 없으면 빈 배열.
 * 소품은 보이기만 하고 충돌은 없다 — 그래서 한가운데를 피해 가장자리·모서리에 둔다.
 */
export function planZoneProps(def: DungeonDef, bossSpawn: Vec2, seed = 1): DecorItem[] {
  const j = def.journey;
  if (!j) return [];
  const rnd = seededRandom(seed * 7 + 101 + def.id.length * 31);
  const table = zonePropsFor(def.id);
  const out: DecorItem[] = [];
  for (const z of j.zones) {
    const r = z.rect;
    // 가운데 소품의 기준점: 구역 중심. 모닥불을 놓으면 그 자리가 기준이 된다 (통나무 의자가 모닥불을 향함)
    let anchor: Vec2 = { x: r.x, z: r.z };
    for (const [kind, count, place] of table[z.kind] ?? []) {
      let placed = 0;
      for (let tries = 0; tries < count * 40 && placed < count; tries++) {
        let p: Vec2;
        if (place === 'center') {
          const a = rnd() * Math.PI * 2;
          // 첫 시도는 정확히 가운데, 막혀 있으면(상자 등) 가까운 둘레에서 찾는다. 의자는 기준점 둘레
          const d = kind === 'logSeat' ? 1.7 + rnd() * 0.7 : tries === 0 ? 0 : 1.2 + rnd() * 1.6;
          p = { x: anchor.x + Math.cos(a) * d, z: anchor.z + Math.sin(a) * d };
        } else if (place === 'corner') {
          const sx = rnd() < 0.5 ? -1 : 1;
          const sz = rnd() < 0.5 ? -1 : 1;
          p = { x: r.x + sx * (r.w / 2 - 1.6 - rnd() * 1.2), z: r.z + sz * (r.d / 2 - 1.6 - rnd() * 1.2) };
        } else {
          // 가장자리 띠: 네 변 중 하나
          const side = Math.floor(rnd() * 4);
          const inset = 1.2 + rnd() * 1.4;
          const along = rnd() * 2 - 1;
          p = side === 0 ? { x: r.x + along * (r.w / 2 - 1.5), z: r.z - r.d / 2 + inset } : side === 1 ? { x: r.x + along * (r.w / 2 - 1.5), z: r.z + r.d / 2 - inset } : side === 2 ? { x: r.x - r.w / 2 + inset, z: r.z + along * (r.d / 2 - 1.5) } : { x: r.x + r.w / 2 - inset, z: r.z + along * (r.d / 2 - 1.5) };
        }
        if (!inRect(p, r)) continue;
        if (!isZoneFree(p, j, def, bossSpawn, out, place === 'center' ? 1.0 : 1.8)) continue;
        out.push({ kind, x: p.x, z: p.z, scale: 0.9 + rnd() * 0.3, rot: kind === 'logSeat' ? Math.atan2(anchor.x - p.x, anchor.z - p.z) : rnd() * Math.PI * 2 });
        if (kind === 'campfire') anchor = p;
        placed++;
      }
    }
  }
  return out;
}
