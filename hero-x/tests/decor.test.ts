import { describe, expect, it } from 'vitest';
import { DECOR_KINDS, planDecor, seededRandom } from '../src/dungeon/decorLayout';
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
