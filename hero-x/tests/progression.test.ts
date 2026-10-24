import { describe, expect, it } from 'vitest';
import { GameConfig } from '../src/game/GameConfig';
import { rollLoot, type LootTable } from '../src/items/loot';
import { PlayerStats } from '../src/player/PlayerStats';

describe('PlayerStats (레벨·경험치·골드)', () => {
  it('필요 경험치를 채우면 레벨이 오르고 남은 경험치는 이월된다', () => {
    const s = new PlayerStats();
    const need = s.xpToNext;
    expect(s.addXp(need - 1)).toBe(0);
    expect(s.level).toBe(1);
    expect(s.addXp(5)).toBe(1);
    expect(s.level).toBe(2);
    expect(s.xp).toBe(4);
  });

  it('경험치를 한꺼번에 많이 받으면 여러 레벨을 오른다', () => {
    const s = new PlayerStats();
    const gained = s.addXp(10000);
    expect(gained).toBeGreaterThan(2);
    expect(s.level).toBe(1 + gained);
  });

  it('최대 레벨을 넘지 않는다', () => {
    const s = new PlayerStats();
    s.addXp(1e9);
    expect(s.level).toBe(GameConfig.progression.maxLevel);
  });

  it('레벨이 오르면 최대 체력과 공격력 배율이 늘어난다', () => {
    const s = new PlayerStats();
    const hp1 = s.maxHp, dmg1 = s.damageMultiplier;
    s.addXp(s.xpToNext);
    expect(s.maxHp).toBe(hp1 + GameConfig.progression.hpPerLevel);
    expect(s.damageMultiplier).toBeCloseTo(dmg1 + GameConfig.progression.damagePerLevel, 6);
  });

  it('골드는 양수만 더해지고 reset 으로 초기화된다', () => {
    const s = new PlayerStats();
    s.addGold(10);
    s.addGold(-5);
    expect(s.gold).toBe(10);
    s.reset();
    expect(s.gold).toBe(0);
    expect(s.level).toBe(1);
  });
});

describe('rollLoot (드롭 계산)', () => {
  const table: LootTable = { healChance: 0.5, healAmount: 25, goldChance: 0.5, goldMin: 3, goldMax: 12, xpPerScore: 1 };

  it('경험치는 항상 떨어진다 (점수 × 배율)', () => {
    const drops = rollLoot(10, table, () => 0.99);
    expect(drops).toEqual([{ kind: 'xp', amount: 10 }]);
  });

  it('난수가 확률보다 작으면 체력·골드가 떨어지고 골드는 범위 안이다', () => {
    const drops = rollLoot(10, table, () => 0.1);
    expect(drops.map((d) => d.kind)).toEqual(['xp', 'heal', 'gold']);
    const gold = drops.find((d) => d.kind === 'gold')!;
    expect(gold.amount).toBeGreaterThanOrEqual(3);
    expect(gold.amount).toBeLessThanOrEqual(12);
  });
});
