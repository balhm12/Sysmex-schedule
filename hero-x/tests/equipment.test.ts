import { describe, expect, it } from 'vitest';
import { GameConfig } from '../src/game/GameConfig';
import { EquipmentSystem, applyDefense } from '../src/items/EquipmentSystem';
import { ITEM_TEMPLATES, createItem, generateRandomItem, rollRarity } from '../src/items/ItemDatabase';
import { rollLoot } from '../src/items/loot';

const sword = () => createItem(ITEM_TEMPLATES.find((t) => t.id === 'sword_basic')!, 'common');
const ring = () => createItem(ITEM_TEMPLATES.find((t) => t.id === 'ring_vitality')!, 'common');

describe('ItemDatabase (장비 생성)', () => {
  it('등급 배율이 능력치에 곱해지고 이름에 접두어가 붙는다', () => {
    const common = createItem(ITEM_TEMPLATES[0], 'common');
    const legendary = createItem(ITEM_TEMPLATES[0], 'legendary');
    expect(legendary.stats.attack).toBe(Math.round(common.stats.attack * GameConfig.equipment.rarities.legendary.statMul));
    expect(legendary.name.startsWith(GameConfig.equipment.rarities.legendary.prefix)).toBe(true);
    expect(common.uid).not.toBe(legendary.uid);
  });

  it('등급 뽑기는 가중치 순서를 따른다 (난수 0 → 가장 흔한 등급, 난수 1 근처 → 가장 희귀한 등급)', () => {
    expect(rollRarity(() => 0)).toBe('common');
    expect(rollRarity(() => 0.9999)).toBe('legendary');
  });

  it('무작위 장비는 항상 템플릿 목록 안의 것이다', () => {
    for (let i = 0; i < 20; i++) {
      const it = generateRandomItem();
      expect(ITEM_TEMPLATES.some((t) => t.id === it.templateId)).toBe(true);
    }
  });
});

describe('EquipmentSystem (장착·해제·합산)', () => {
  it('장착하면 가방에서 빠지고 슬롯에 들어가며 능력치 합에 반영된다', () => {
    const eq = new EquipmentSystem();
    const s = sword();
    eq.add(s);
    expect(eq.equip(s.uid)).toBe('melee');
    expect(eq.inventory.length).toBe(0);
    expect(eq.equipped.melee?.uid).toBe(s.uid);
    expect(eq.weaponAttack('melee')).toBe(s.stats.attack);
    expect(eq.weaponAttack('ranged')).toBe(0);
  });

  it('같은 슬롯에 다른 장비를 장착하면 기존 장비가 가방으로 돌아온다', () => {
    const eq = new EquipmentSystem();
    const a = sword(), b = sword();
    eq.add(a); eq.add(b);
    eq.equip(a.uid);
    eq.equip(b.uid);
    expect(eq.equipped.melee?.uid).toBe(b.uid);
    expect(eq.inventory.map((i) => i.uid)).toEqual([a.uid]);
  });

  it('장신구는 빈 칸부터 채우고, 두 개 다 차면 첫 칸을 바꾼다', () => {
    const eq = new EquipmentSystem();
    const r1 = ring(), r2 = ring(), r3 = ring();
    [r1, r2, r3].forEach((r) => eq.add(r));
    expect(eq.equip(r1.uid)).toBe('trinket1');
    expect(eq.equip(r2.uid)).toBe('trinket2');
    expect(eq.equip(r3.uid)).toBe('trinket1');
    expect(eq.totals().maxHp).toBe(r2.stats.maxHp + r3.stats.maxHp);
  });

  it('해제하면 가방으로 돌아오고, 가방이 가득 차면 해제·획득이 거부된다', () => {
    const eq = new EquipmentSystem();
    const s = sword();
    eq.add(s); eq.equip(s.uid);
    for (let i = 0; i < GameConfig.equipment.inventorySize; i++) eq.add(ring());
    expect(eq.isFull).toBe(true);
    expect(eq.add(ring())).toBe(false);
    expect(eq.unequip('melee')).toBe(false);
    eq.discard(eq.inventory[0].uid);
    expect(eq.unequip('melee')).toBe(true);
    expect(eq.equipped.melee).toBeNull();
  });

  it('compare 는 장착 시 변화량을 돌려준다', () => {
    const eq = new EquipmentSystem();
    const weak = sword();
    const strong = createItem(ITEM_TEMPLATES.find((t) => t.id === 'sword_basic')!, 'rare');
    eq.add(weak); eq.add(strong);
    eq.equip(weak.uid);
    expect(eq.compare(strong).attack).toBe(strong.stats.attack - weak.stats.attack);
  });
});

describe('applyDefense (방어력)', () => {
  it('방어력이 기준값(defenseScale)과 같으면 피해가 절반, 0이면 그대로, 최소 1', () => {
    expect(applyDefense(20, 0)).toBe(20);
    expect(applyDefense(20, GameConfig.equipment.defenseScale)).toBe(10);
    expect(applyDefense(1, 10000)).toBe(1);
  });
});

describe('rollLoot 장비 드롭', () => {
  it('equipChance 보다 난수가 작으면 장비가 함께 떨어진다', () => {
    const table = { healChance: 0, healAmount: 0, goldChance: 0, goldMin: 0, goldMax: 0, xpPerScore: 1, equipChance: 0.5 };
    const drops = rollLoot(10, table, () => 0.1, () => sword());
    expect(drops.map((d) => d.kind)).toEqual(['xp', 'equip']);
    expect(drops[1].item?.category).toBe('melee');
    expect(rollLoot(10, table, () => 0.9, () => sword()).map((d) => d.kind)).toEqual(['xp']);
  });
});
