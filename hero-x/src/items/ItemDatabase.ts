import { GameConfig, type Rarity } from '../game/GameConfig';

/** 장비 분류: 어느 슬롯에 들어가는지 */
export type ItemCategory = 'melee' | 'ranged' | 'armor' | 'trinket';

/** 장비 슬롯 */
export type EquipSlot = 'melee' | 'ranged' | 'armor' | 'trinket1' | 'trinket2';

/** 장비가 올려 주는 능력치 (없는 항목은 0) */
export interface ItemStats {
  /** 공격력 (무기: 해당 공격에 더해짐) */
  attack: number;
  /** 방어력 (받는 피해 감소) */
  defense: number;
  /** 최대 체력 증가 */
  maxHp: number;
  /** 이동 속도 증가 비율 (0.1 = 10%) */
  moveSpeed: number;
}

/** 장비 원형(템플릿). 등급에 따라 능력치가 배율로 커진다 */
export interface ItemTemplate {
  id: string;
  name: string;
  category: ItemCategory;
  base: Partial<ItemStats>;
  description: string;
}

/** 실제로 떨어진 장비 한 개 */
export interface ItemInstance {
  uid: number;
  templateId: string;
  name: string;
  category: ItemCategory;
  rarity: Rarity;
  stats: ItemStats;
  description: string;
}

/**
 * 장비 데이터베이스 (독자 제작 이름·설명)
 * - 새 장비를 추가하려면 아래 목록에 항목을 더하면 된다. 수치는 '일반' 등급 기준이며 등급 배율(GameConfig.equipment.rarities)이 곱해진다.
 */
export const ITEM_TEMPLATES: ItemTemplate[] = [
  // 근접 무기
  { id: 'sword_basic', name: '에너지 검', category: 'melee', base: { attack: 4 }, description: '기본형 에너지 검. 가볍고 다루기 쉽다.' },
  { id: 'axe_heavy', name: '플라즈마 도끼', category: 'melee', base: { attack: 7, moveSpeed: -0.05 }, description: '무겁지만 한 방이 세다. 이동이 조금 느려진다.' },
  { id: 'hammer_pulse', name: '펄스 망치', category: 'melee', base: { attack: 9, moveSpeed: -0.1 }, description: '충격파를 내는 망치. 느리지만 강력하다.' },
  // 원거리 무기
  { id: 'blaster_basic', name: '소형 블래스터', category: 'ranged', base: { attack: 3 }, description: '빠르게 쏠 수 있는 기본 블래스터.' },
  { id: 'bow_photon', name: '광자 활', category: 'ranged', base: { attack: 5 }, description: '빛의 화살을 쏘는 활.' },
  { id: 'cannon_arc', name: '아크 캐논', category: 'ranged', base: { attack: 8, moveSpeed: -0.05 }, description: '전기를 뿜는 대형 캐논.' },
  // 방어구
  { id: 'vest_light', name: '경량 조끼', category: 'armor', base: { defense: 6 }, description: '움직임을 방해하지 않는 가벼운 방어구.' },
  { id: 'plate_steel', name: '강철 갑옷', category: 'armor', base: { defense: 12, maxHp: 10, moveSpeed: -0.05 }, description: '튼튼한 강철판 갑옷.' },
  { id: 'suit_nano', name: '나노 슈트', category: 'armor', base: { defense: 9, moveSpeed: 0.05 }, description: '몸에 딱 맞는 첨단 슈트. 조금 더 빨라진다.' },
  // 장신구
  { id: 'ring_vitality', name: '생명의 반지', category: 'trinket', base: { maxHp: 20 }, description: '최대 체력을 늘려 준다.' },
  { id: 'boots_wind', name: '바람 신발', category: 'trinket', base: { moveSpeed: 0.12 }, description: '이동 속도가 빨라진다.' },
  { id: 'amulet_power', name: '힘의 목걸이', category: 'trinket', base: { attack: 2, defense: 2 }, description: '공격과 방어를 조금씩 올려 준다.' },
];

const EMPTY_STATS: ItemStats = { attack: 0, defense: 0, maxHp: 0, moveSpeed: 0 };

let nextUid = 1;

/** 템플릿과 등급으로 장비 한 개를 만든다 */
export function createItem(template: ItemTemplate, rarity: Rarity): ItemInstance {
  const r = GameConfig.equipment.rarities[rarity];
  const stats: ItemStats = { ...EMPTY_STATS };
  for (const key of Object.keys(stats) as Array<keyof ItemStats>) {
    const base = template.base[key] ?? 0;
    // 이동 속도는 비율이라 소수 둘째 자리, 나머지는 정수
    stats[key] = key === 'moveSpeed' ? Math.round(base * (base > 0 ? r.statMul : 1) * 100) / 100 : Math.round(base * r.statMul);
  }
  return {
    uid: nextUid++,
    templateId: template.id,
    name: r.prefix ? `${r.prefix} ${template.name}` : template.name,
    category: template.category,
    rarity,
    stats,
    description: template.description,
  };
}

/** 등급을 가중치대로 뽑는다 */
export function rollRarity(random: () => number = Math.random): Rarity {
  const entries = Object.entries(GameConfig.equipment.rarities) as Array<[Rarity, { weight: number }]>;
  const total = entries.reduce((n, [, r]) => n + r.weight, 0);
  let pick = random() * total;
  for (const [rarity, r] of entries) {
    pick -= r.weight;
    if (pick <= 0) return rarity;
  }
  return entries[entries.length - 1][0];
}

/** 무작위 장비 한 개 생성 */
export function generateRandomItem(random: () => number = Math.random): ItemInstance {
  const template = ITEM_TEMPLATES[Math.min(ITEM_TEMPLATES.length - 1, Math.floor(random() * ITEM_TEMPLATES.length))];
  return createItem(template, rollRarity(random));
}

const RARITY_ORDER: Rarity[] = ['common', 'uncommon', 'rare', 'epic', 'legendary'];

/** 최소 등급을 보장한 무작위 장비 (보스 보상 등) */
export function generateItemAtLeast(minRarity: Rarity, random: () => number = Math.random): ItemInstance {
  const template = ITEM_TEMPLATES[Math.min(ITEM_TEMPLATES.length - 1, Math.floor(random() * ITEM_TEMPLATES.length))];
  const rolled = rollRarity(random);
  const rarity = RARITY_ORDER.indexOf(rolled) >= RARITY_ORDER.indexOf(minRarity) ? rolled : minRarity;
  return createItem(template, rarity);
}

export function findTemplate(id: string): ItemTemplate | undefined {
  return ITEM_TEMPLATES.find((t) => t.id === id);
}
