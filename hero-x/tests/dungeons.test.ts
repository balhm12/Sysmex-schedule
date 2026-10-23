import { describe, expect, it } from 'vitest';
import { DUNGEONS, getDungeon, isDungeonUnlocked, nextDungeonAfter, resolveBossConfig } from '../src/game/DungeonDefs';
import { ENEMY_TYPE_LIMITS, GameConfig } from '../src/game/GameConfig';
import { ITEM_TEMPLATES, findTemplate } from '../src/items/ItemDatabase';

/** 원(중심, 반지름)이 장애물 상자와 겹치는지 */
function overlaps(obstacles: typeof GameConfig.world.obstacles, x: number, z: number, r: number): boolean {
  return obstacles.some((o) => Math.abs(x - o.x) < o.w / 2 + r && Math.abs(z - o.z) < o.d / 2 + r);
}

describe('던전 정의 (DungeonDefs)', () => {
  it('던전은 3개 이상이고 id 가 겹치지 않으며, 첫 던전은 GameConfig 의 숲 설정을 그대로 쓴다', () => {
    expect(DUNGEONS.length).toBeGreaterThanOrEqual(3);
    expect(new Set(DUNGEONS.map((d) => d.id)).size).toBe(DUNGEONS.length);
    expect(DUNGEONS[0].requiresClear).toBeUndefined();
    expect(DUNGEONS[0].name).toBe(GameConfig.dungeon.name);
    expect(DUNGEONS[0].spawns).toBe(GameConfig.enemies.spawns);
    expect(DUNGEONS[0].obstacles).toBe(GameConfig.world.obstacles);
    expect(getDungeon('forest')).toBe(DUNGEONS[0]);
  });

  it('해금 사슬: 각 던전은 이전 던전을 가리키고, 클리어 기록으로 차례대로 열린다', () => {
    for (let i = 1; i < DUNGEONS.length; i++) {
      expect(DUNGEONS[i].requiresClear).toBe(DUNGEONS[i - 1].id);
      expect(nextDungeonAfter(DUNGEONS[i - 1].id)).toBe(DUNGEONS[i]);
    }
    expect(nextDungeonAfter(DUNGEONS[DUNGEONS.length - 1].id)).toBeNull();
    const clears: Record<string, number> = {};
    expect(DUNGEONS.map((d) => isDungeonUnlocked(d, clears))).toEqual([true, false, false]);
    clears.forest = 1;
    expect(DUNGEONS.map((d) => isDungeonUnlocked(d, clears))).toEqual([true, true, false]);
    clears.cave = 1;
    expect(DUNGEONS.map((d) => isDungeonUnlocked(d, clears))).toEqual([true, true, true]);
    // 권장 레벨은 오름차순
    for (let i = 1; i < DUNGEONS.length; i++) expect(DUNGEONS[i].recommendedLevel).toBeGreaterThan(DUNGEONS[i - 1].recommendedLevel);
  });

  it.each(DUNGEONS.map((d) => [d.id, d] as const))('던전 %s: 적·상자·보스·장애물 배치가 영역 안이고 서로 겹치지 않는다', (_id, d) => {
    const half = d.arenaHalfSize;
    const s = GameConfig.player.startPosition;
    expect(overlaps(d.obstacles, s.x, s.z, GameConfig.player.radius)).toBe(false);
    for (const o of d.obstacles) {
      expect(Math.abs(o.x) + o.w / 2).toBeLessThanOrEqual(half);
      expect(Math.abs(o.z) + o.d / 2).toBeLessThanOrEqual(half);
    }
    for (const sp of d.spawns) {
      const def = GameConfig.enemies.types[sp.type];
      expect(def, `적 종류 '${sp.type}' 이 types 에 없음`).toBeDefined();
      expect(overlaps(d.obstacles, sp.x, sp.z, def.radius), `적 (${sp.x}, ${sp.z}) 이 장애물과 겹침`).toBe(false);
      expect(Math.hypot(sp.x - s.x, sp.z - s.z), `적 (${sp.x}, ${sp.z}) 이 시작 위치와 너무 가까움`).toBeGreaterThan(6);
      expect(Math.abs(sp.x)).toBeLessThan(half - def.radius);
      expect(Math.abs(sp.z)).toBeLessThan(half - def.radius);
    }
    for (const c of d.chests) {
      expect(Math.abs(c.x)).toBeLessThan(half - 1);
      expect(Math.abs(c.z)).toBeLessThan(half - 1);
      expect(Math.hypot(c.x - s.x, c.z - s.z)).toBeGreaterThan(3);
      expect(overlaps(d.obstacles, c.x, c.z, 1), `상자 (${c.x}, ${c.z}) 가 장애물과 겹침`).toBe(false);
      for (const sp of d.spawns) expect(Math.hypot(c.x - sp.x, c.z - sp.z), `상자 (${c.x}, ${c.z}) 가 적과 너무 가까움`).toBeGreaterThan(2);
    }
    const b = resolveBossConfig(d);
    expect(Math.abs(b.spawn.x)).toBeLessThan(half - b.radius);
    expect(Math.abs(b.spawn.z)).toBeLessThan(half - b.radius);
    expect(overlaps(d.obstacles, b.spawn.x, b.spawn.z, b.radius)).toBe(false);
    expect(b.hp).toBeGreaterThan(0);
    expect(d.rewardMul.gold).toBeGreaterThanOrEqual(1);
  });

  it('보스 설정은 GameConfig.boss 위에 던전 값만 덮어쓴다 (중첩 객체도 빠진 값은 기본 유지)', () => {
    const forest = resolveBossConfig(DUNGEONS[0]);
    expect(forest).toEqual(GameConfig.boss);
    const cave = resolveBossConfig(getDungeon('cave')!);
    expect(cave.name).toBe('수정 골렘');
    expect(cave.hp).toBeGreaterThan(GameConfig.boss.hp);
    expect(cave.windup.charge).toBe(GameConfig.boss.windup.charge); // 중첩 객체에서 덮어쓰지 않은 값은 기본 유지
    expect(cave.windup.summon).toBe(1.0);
    expect(cave.slam.radius).toBe(5.5);
    expect(cave.charge.speed).toBe(GameConfig.boss.charge.speed);
    // 보스별 패턴·외형
    expect(cave.useCharge).toBe(false);
    expect(cave.closePatterns).toContain('summon');
    expect(cave.model).toBe('golem');
    expect(forest.model).toBe('guardian');
    const fort = resolveBossConfig(getDungeon('fortress')!);
    expect(fort.hp).toBeGreaterThan(cave.hp);
    expect(fort.reward.equipMinRarity).toBe('epic');
    expect(fort.closePatterns).toContain('mortar');
    expect(fort.model).toBe('commander');
    expect(fort.useCharge).toBe(true);
  });

  it('새 적 종류(박쥐 드론·요새 포대)는 능력치가 허용 범위 안이고 기존 외형을 재사용한다', () => {
    const stalker = GameConfig.enemies.types.stalker;
    const artillery = GameConfig.enemies.types.artillery;
    expect(stalker.model).toBe('shooter');
    expect(artillery.model).toBe('tank');
    expect(artillery.attackKind).toBe('ranged');
    for (const def of [stalker, artillery]) {
      for (const [key, { min, max }] of Object.entries(ENEMY_TYPE_LIMITS)) {
        const v = def[key as keyof typeof def] as number;
        expect(v).toBeGreaterThanOrEqual(min);
        expect(v).toBeLessThanOrEqual(max);
      }
    }
  });

  it('장비 템플릿은 16종이고 id 가 겹치지 않는다', () => {
    expect(ITEM_TEMPLATES.length).toBe(16);
    expect(new Set(ITEM_TEMPLATES.map((t) => t.id)).size).toBe(16);
    expect(findTemplate('rifle_rail')?.category).toBe('ranged');
    expect(findTemplate('core_fortress')?.category).toBe('trinket');
  });
});
