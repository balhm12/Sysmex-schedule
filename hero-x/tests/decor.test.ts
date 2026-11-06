import { describe, expect, it } from 'vitest';
import { DECOR_KINDS, planDecor, planZoneProps, seededRandom, zonePropsFor } from '../src/dungeon/decorLayout';
import { isWalkable, zoneAt, zoneSpawns } from '../src/dungeon/journey';
import { DUNGEONS, resolveBossConfig } from '../src/game/DungeonDefs';

describe('던전 장식 배치 (planDecor)', () => {
  it('같은 seed 면 같은 배치, 다른 seed 면 다른 배치', () => {
    const d = DUNGEONS[0];
    const b = resolveBossConfig(d).spawn;
    const a1 = planDecor(d, b, 3);
    const a2 = planDecor(d, b, 3);
    const a3 = planDecor(d, b, 4);
    expect(a1).toEqual(a2);
    expect(JSON.stringify(a1)).not.toBe(JSON.stringify(a3));
    const r = seededRandom(5);
    const v = r();
    expect(v).toBeGreaterThanOrEqual(0);
    expect(v).toBeLessThan(1);
  });

  it.each(DUNGEONS.map((d) => [d.id, d] as const))('던전 %s: 안쪽 장식은 장애물·상자·적·시작·보스 자리와 겹치지 않고 영역 안, 바깥 장식은 벽 밖', (_id, d) => {
    const boss = resolveBossConfig(d).spawn;
    const plan = planDecor(d, boss);
    expect(plan.inside.length).toBeGreaterThan(10);
    expect(plan.outside.length).toBeGreaterThan(10);
    for (const it of plan.inside) {
      expect(Math.abs(it.x)).toBeLessThan(d.journey?.halfX ?? d.arenaHalfSize);
      expect(Math.abs(it.z)).toBeLessThan(d.journey?.halfZ ?? d.arenaHalfSize);
      expect(Math.hypot(it.x, it.z)).toBeGreaterThan(4);
      expect(Math.hypot(it.x - boss.x, it.z - boss.z)).toBeGreaterThan(4);
      for (const o of d.obstacles) expect(Math.abs(it.x - o.x) < o.w / 2 + 0.6 && Math.abs(it.z - o.z) < o.d / 2 + 0.6, `장식 (${it.x.toFixed(1)}, ${it.z.toFixed(1)}) 이 장애물과 겹침`).toBe(false);
      for (const c of d.chests) expect(Math.hypot(it.x - c.x, it.z - c.z)).toBeGreaterThan(2.2);
      for (const sp of d.spawns) expect(Math.hypot(it.x - sp.x, it.z - sp.z)).toBeGreaterThan(1.8);
      expect(DECOR_KINDS[d.id].inside.map((k) => k[0])).toContain(it.kind);
    }
    for (const it of plan.outside) expect(Math.abs(it.x) > (d.journey?.halfX ?? d.arenaHalfSize) + 1 || Math.abs(it.z) > (d.journey?.halfZ ?? d.arenaHalfSize) + 1).toBe(true);
  });
});

describe('여정 구역 테마 소품 (planZoneProps)', () => {
  it('여정이 없는 던전 정의는 소품이 없다', () => {
    const d = { ...DUNGEONS[0], journey: undefined };
    expect(planZoneProps(d, resolveBossConfig(d).spawn)).toEqual([]);
  });
  it('던전마다 소품 표가 다르다 (숲 횃불·울타리 / 동굴 수정 / 요새 기계·경고등)', () => {
    expect(zonePropsFor('forest').start.map((k) => k[0])).toContain('signpost');
    expect(zonePropsFor('cave').arena.map((k) => k[0])).toContain('crystalPillar');
    expect(zonePropsFor('fortress').arena.map((k) => k[0])).toContain('machine');
  });
  it.each(DUNGEONS.filter((d) => d.journey).map((d) => [d.id, d] as const))('%s: 결정적이고, 모든 구역에 소품이 있으며, 소품은 걷는 칸 위·구역 안에 있고 적 등장·상자·시작·보스 자리와 겹치지 않는다', (_id, forest) => {
    const boss = resolveBossConfig(forest).spawn;
    const ZONE_PROPS = zonePropsFor(forest.id);
    const props = planZoneProps(forest, boss);
    expect(props).toEqual(planZoneProps(forest, boss));
    expect(props.length).toBeGreaterThan(40);
    const j = forest.journey!;
    const zonesWithProps = new Set<string>();
    for (const p of props) {
      expect(isWalkable(j, p), `소품 ${p.kind} (${p.x.toFixed(1)}, ${p.z.toFixed(1)}) 이 걷는 칸 밖`).toBe(true);
      const z = zoneAt(j, p);
      expect(z, `소품 ${p.kind} 이 구역 밖`).not.toBeNull();
      zonesWithProps.add(z!.id);
      expect(ZONE_PROPS[z!.kind].map((k) => k[0])).toContain(p.kind);
      for (const zz of j.zones) for (const sp of zoneSpawns(zz)) expect(Math.hypot(p.x - sp.x, p.z - sp.z)).toBeGreaterThanOrEqual(2.0);
      for (const c of forest.chests) expect(Math.hypot(p.x - c.x, p.z - c.z)).toBeGreaterThanOrEqual(2.4);
      expect(Math.hypot(p.x - j.start.x, p.z - j.start.z)).toBeGreaterThanOrEqual(2.5);
      expect(Math.hypot(p.x - boss.x, p.z - boss.z)).toBeGreaterThanOrEqual(5);
    }
    for (const z of j.zones) expect(zonesWithProps.has(z.id), `구역 ${z.id} 에 소품 없음`).toBe(true);
    // 쉼터엔 모닥불 하나가 구역 가운데 근처에(상자가 가운데를 차지하면 조금 비켜서), 통나무 의자는 모닥불 둘레
    const rest = j.zones.find((z) => z.id === 'rest')!;
    const centerKind = ZONE_PROPS.rest.find((k) => k[2] === 'center')?.[0];
    if (centerKind) {
      const center = props.filter((p) => p.kind === centerKind && zoneAt(j, p)?.id === 'rest');
      expect(center.length).toBeGreaterThanOrEqual(1);
      expect(Math.hypot(center[0].x - rest.rect.x, center[0].z - rest.rect.z)).toBeLessThan(3);
      if (centerKind === 'campfire') for (const seat of props.filter((p) => p.kind === 'logSeat' && zoneAt(j, p)?.id === 'rest')) expect(Math.hypot(seat.x - center[0].x, seat.z - center[0].z)).toBeLessThan(2.6);
    }
    // 부피가 있는 소품(기계·천막·기둥)은 구역 가운데(플레이어가 서는 곳)에서 1.5 이상 떨어져 있다
    for (const p of props) if (['machine', 'tent', 'ruinPillar', 'crystalPillar', 'bossPillar'].includes(p.kind)) { const z = zoneAt(j, p)!; expect(Math.hypot(p.x - z.rect.x, p.z - z.rect.z), `${p.kind} 가 ${z.id} 가운데`).toBeGreaterThan(1.5); }
  });
});
