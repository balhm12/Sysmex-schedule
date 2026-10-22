import { GameConfig } from '../game/GameConfig';
import type { EquipSlot, ItemCategory, ItemInstance, ItemStats } from './ItemDatabase';

export const EQUIP_SLOTS: EquipSlot[] = ['melee', 'ranged', 'armor', 'trinket1', 'trinket2'];

export const SLOT_LABELS: Record<EquipSlot, string> = {
  melee: '근접 무기',
  ranged: '원거리 무기',
  armor: '방어구',
  trinket1: '장신구 1',
  trinket2: '장신구 2',
};

/** 분류 → 들어갈 수 있는 슬롯 */
export function slotsForCategory(category: ItemCategory): EquipSlot[] {
  return category === 'trinket' ? ['trinket1', 'trinket2'] : [category];
}

/**
 * 장비·인벤토리
 * - 가방(inventory)에 든 장비를 슬롯에 장착·해제하고, 장착한 장비의 능력치 합을 계산한다.
 * - Three.js 나 화면에 의존하지 않아 단위 테스트가 쉽다. 저장(5단계)은 inventory 와 equipped 를 그대로 저장하면 된다.
 */
export class EquipmentSystem {
  readonly inventory: ItemInstance[] = [];
  readonly equipped: Record<EquipSlot, ItemInstance | null> = { melee: null, ranged: null, armor: null, trinket1: null, trinket2: null };

  /** 가방에 넣는다. 가득 찼으면 false */
  add(item: ItemInstance): boolean {
    if (this.inventory.length >= GameConfig.equipment.inventorySize) return false;
    this.inventory.push(item);
    return true;
  }

  get isFull(): boolean {
    return this.inventory.length >= GameConfig.equipment.inventorySize;
  }

  /** 가방에서 버린다 */
  discard(uid: number): boolean {
    const i = this.inventory.findIndex((it) => it.uid === uid);
    if (i < 0) return false;
    this.inventory.splice(i, 1);
    return true;
  }

  /** 이 장비를 장착하면 들어갈 슬롯 (빈 장신구 칸 우선, 없으면 첫 칸) */
  targetSlot(item: ItemInstance): EquipSlot {
    const slots = slotsForCategory(item.category);
    return slots.find((s) => this.equipped[s] === null) ?? slots[0];
  }

  /** 가방의 장비를 장착한다. 그 슬롯에 있던 장비는 가방으로 돌아온다 */
  equip(uid: number): EquipSlot | null {
    const i = this.inventory.findIndex((it) => it.uid === uid);
    if (i < 0) return null;
    const item = this.inventory[i];
    const slot = this.targetSlot(item);
    this.inventory.splice(i, 1);
    const prev = this.equipped[slot];
    this.equipped[slot] = item;
    if (prev) this.inventory.push(prev);
    return slot;
  }

  /** 슬롯의 장비를 해제해 가방으로 보낸다. 가방이 가득 차면 false */
  unequip(slot: EquipSlot): boolean {
    const item = this.equipped[slot];
    if (!item) return false;
    if (this.isFull) return false;
    this.equipped[slot] = null;
    this.inventory.push(item);
    return true;
  }

  /** 장착한 장비의 능력치 합 */
  totals(): ItemStats {
    const sum: ItemStats = { attack: 0, defense: 0, maxHp: 0, moveSpeed: 0 };
    for (const slot of EQUIP_SLOTS) {
      const it = this.equipped[slot];
      if (!it) continue;
      sum.attack += it.stats.attack;
      sum.defense += it.stats.defense;
      sum.maxHp += it.stats.maxHp;
      sum.moveSpeed += it.stats.moveSpeed;
    }
    return sum;
  }

  /** 특정 공격에 더해지는 무기 공격력 */
  weaponAttack(kind: 'melee' | 'ranged'): number {
    return this.equipped[kind]?.stats.attack ?? 0;
  }

  /** 이 장비를 장착하면 능력치가 얼마나 바뀌는지 (현재 그 슬롯의 장비 대비) */
  compare(item: ItemInstance): ItemStats {
    const current = this.equipped[this.targetSlot(item)];
    return {
      attack: item.stats.attack - (current?.stats.attack ?? 0),
      defense: item.stats.defense - (current?.stats.defense ?? 0),
      maxHp: item.stats.maxHp - (current?.stats.maxHp ?? 0),
      moveSpeed: Math.round((item.stats.moveSpeed - (current?.stats.moveSpeed ?? 0)) * 100) / 100,
    };
  }

  /** 모두 비운다 (새 게임) */
  reset(): void {
    this.inventory.length = 0;
    for (const slot of EQUIP_SLOTS) this.equipped[slot] = null;
  }
}

/** 방어력으로 줄어든 피해 (최소 1). 방어력 50이면 절반 */
export function applyDefense(damage: number, defense: number): number {
  if (damage <= 0) return 0;
  const k = GameConfig.equipment.defenseScale;
  return Math.max(1, Math.round(damage * (k / (k + Math.max(0, defense)))));
}
