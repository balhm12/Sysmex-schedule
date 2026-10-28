/**
 * 드롭 계산 (순수 함수)
 * - 어떤 적을 처치했을 때 무엇이 떨어지는지 확률로 정한다. 확률·수량은 GameConfig.loot 에서 온다.
 * - 난수 함수를 인자로 받아 테스트에서 결과를 고정할 수 있다.
 */

import type { ItemInstance } from './ItemDatabase';

/** 떨어지는 아이템 종류 */
export type ItemKind = 'heal' | 'xp' | 'gold' | 'equip';

export interface Drop {
  kind: ItemKind;
  amount: number;
  /** kind 가 'equip' 일 때 장비 */
  item?: ItemInstance;
}

export interface LootTable {
  /** 체력 회복 아이템이 떨어질 확률 0~1 */
  healChance: number;
  /** 회복량 */
  healAmount: number;
  /** 골드가 떨어질 확률 0~1 */
  goldChance: number;
  /** 골드 수량 범위 */
  goldMin: number;
  goldMax: number;
  /** 적 점수 1점당 경험치 */
  xpPerScore: number;
  /** 장비가 떨어질 확률 0~1 (없으면 0) */
  equipChance?: number;
}

/**
 * 처치 보상을 굴린다.
 * - 경험치는 항상 떨어진다 (점수 × xpPerScore, 최소 1)
 * - 체력·골드·장비는 확률. 장비는 makeItem 으로 만든다 (없으면 장비는 떨어지지 않음)
 */
export function rollLoot(enemyScore: number, table: LootTable, random: () => number = Math.random, makeItem?: () => ItemInstance): Drop[] {
  const drops: Drop[] = [];
  drops.push({ kind: 'xp', amount: Math.max(1, Math.round(enemyScore * table.xpPerScore)) });
  if (random() < table.healChance) drops.push({ kind: 'heal', amount: table.healAmount });
  if (random() < table.goldChance) {
    const span = Math.max(0, table.goldMax - table.goldMin);
    drops.push({ kind: 'gold', amount: Math.round(table.goldMin + random() * span) });
  }
  if (makeItem && random() < (table.equipChance ?? 0)) drops.push({ kind: 'equip', amount: 0, item: makeItem() });
  return drops;
}

export interface ChestLootTable {
  goldMin: number;
  goldMax: number;
  equipChance: number;
  healChance: number;
  /** 회복량 (GameConfig.loot.healAmount) */
  healAmount: number;
}

/** 보물 상자 보상: 골드는 항상, 장비·회복은 확률 */
export function rollChestLoot(table: ChestLootTable, random: () => number = Math.random, makeItem?: () => ItemInstance): Drop[] {
  const drops: Drop[] = [];
  const span = Math.max(0, table.goldMax - table.goldMin);
  drops.push({ kind: 'gold', amount: Math.round(table.goldMin + random() * span) });
  if (makeItem && random() < table.equipChance) drops.push({ kind: 'equip', amount: 0, item: makeItem() });
  if (random() < table.healChance) drops.push({ kind: 'heal', amount: table.healAmount });
  return drops;
}
