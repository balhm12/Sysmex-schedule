import { describe, expect, it } from 'vitest';
import { GameConfig } from '../src/game/GameConfig';
import { ITEM_TEMPLATES, createItem } from '../src/items/ItemDatabase';
import { rollChestLoot } from '../src/items/loot';

describe('rollChestLoot (보물 상자 보상)', () => {
  const table = { goldMin: 15, goldMax: 40, equipChance: 0.8, healChance: 0.5, healAmount: 25 };
  const sword = () => createItem(ITEM_TEMPLATES[0], 'common');

  it('골드는 항상, 난수가 작으면 장비와 회복도 나온다', () => {
    const drops = rollChestLoot(table, () => 0.1, sword);
    expect(drops.map((d) => d.kind)).toEqual(['gold', 'equip', 'heal']);
    expect(drops[0].amount).toBeGreaterThanOrEqual(15);
    expect(drops[0].amount).toBeLessThanOrEqual(40);
  });

  it('난수가 크면 골드만 나온다', () => {
    expect(rollChestLoot(table, () => 0.95, sword).map((d) => d.kind)).toEqual(['gold']);
  });
});

describe('보물 상자 배치 설정', () => {
  it('상자는 장애물·시작 위치·적 배치와 겹치지 않고 영역 안에 있다', () => {
    const half = GameConfig.world.arenaHalfSize;
    const s = GameConfig.player.startPosition;
    for (const c of GameConfig.dungeon.chests) {
      expect(Math.abs(c.x)).toBeLessThan(half - 1);
      expect(Math.abs(c.z)).toBeLessThan(half - 1);
      expect(Math.hypot(c.x - s.x, c.z - s.z)).toBeGreaterThan(3);
      for (const o of GameConfig.world.obstacles) {
        const overlap = Math.abs(c.x - o.x) < o.w / 2 + 1 && Math.abs(c.z - o.z) < o.d / 2 + 1;
        expect(overlap, `상자 (${c.x}, ${c.z}) 가 장애물과 겹침`).toBe(false);
      }
      for (const sp of GameConfig.enemies.spawns) {
        expect(Math.hypot(c.x - sp.x, c.z - sp.z), `상자 (${c.x}, ${c.z}) 가 적 배치와 너무 가까움`).toBeGreaterThan(2);
      }
    }
  });
});
