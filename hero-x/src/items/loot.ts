/**
 * 드롭 계산 (순수 함수)
 * - 어떤 적을 처치했을 때 무엇이 떨어지는지 확률로 정한다. 확률·수량은 GameConfig.loot 에서 온다.
 * - 난수 함수를 인자로 받아 테스트에서 결과를 고정할 수 있다.
 */

/** 떨어지는 아이템 종류 */
export type ItemKind = 'heal' | 'xp' | 'gold';

export interface Drop {
  kind: ItemKind;
  amount: number;
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
}

/**
 * 처치 보상을 굴린다.
 * - 경험치는 항상 떨어진다 (점수 × xpPerScore, 최소 1)
 * - 체력·골드는 확률
 */
export function rollLoot(enemyScore: number, table: LootTable, random: () => number = Math.random): Drop[] {
  const drops: Drop[] = [];
  drops.push({ kind: 'xp', amount: Math.max(1, Math.round(enemyScore * table.xpPerScore)) });
  if (random() < table.healChance) drops.push({ kind: 'heal', amount: table.healAmount });
  if (random() < table.goldChance) {
    const span = Math.max(0, table.goldMax - table.goldMin);
    drops.push({ kind: 'gold', amount: Math.round(table.goldMin + random() * span) });
  }
  return drops;
}
