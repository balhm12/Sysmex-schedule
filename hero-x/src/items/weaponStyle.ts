import { GameConfig, type ComboStepConfig, type WeaponStyleConfig } from '../game/GameConfig';
import type { ItemInstance } from './ItemDatabase';

/**
 * 장착한 무기 → 공격 방식 (순수 함수, 테스트 대상)
 * - 무기가 없거나 템플릿에 style 이 없으면 기본(근접 'sword', 원거리 'blaster').
 * - 표에 없는 키(설정 실수)는 기본으로 돌아간다.
 */
export const DEFAULT_STYLE: Record<'melee' | 'ranged', string> = { melee: 'sword', ranged: 'blaster' };

export function weaponStyleFor(kind: 'melee' | 'ranged', item: ItemInstance | null | undefined): WeaponStyleConfig {
  const table = GameConfig.combat.weaponStyles;
  const key = item?.style;
  const picked = key ? table[key] : undefined;
  // 근접 무기는 melee 설정이, 원거리 무기는 ranged 설정이 있어야 쓸 수 있다
  if (picked && (kind === 'melee' ? picked.melee : picked.ranged)) return picked;
  return table[DEFAULT_STYLE[kind]];
}

/** 근접 콤보 설정: 방식에 있으면 그것, 없으면 GameConfig.combat.melee.combo */
export function meleeComboFor(style: WeaponStyleConfig): { steps: ComboStepConfig[]; window: number; cooldownMul: number } {
  if (style.melee) return style.melee;
  const base = GameConfig.combat.melee.combo;
  return { steps: base.steps, window: base.window, cooldownMul: 1 };
}

/** 장비 화면용 한 줄: '3단 베기 · 가로 베기 → …' */
export function styleLabelFor(item: ItemInstance): string | null {
  if (item.category !== 'melee' && item.category !== 'ranged') return null;
  const st = weaponStyleFor(item.category, item);
  return `${st.label}: ${st.description}`;
}
