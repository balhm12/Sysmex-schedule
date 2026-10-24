import { GameConfig, type DifficultyLevel, type Rarity } from '../game/GameConfig';
import { isDifficultyLevel } from '../game/Difficulty';
import { EQUIP_SLOTS, slotsForCategory, type EquipmentSystem } from '../items/EquipmentSystem';
import { createItem, findTemplate, type EquipSlot, type ItemInstance } from '../items/ItemDatabase';
import type { PlayerStats } from '../player/PlayerStats';
import { DUNGEONS } from '../game/DungeonDefs';

/**
 * 저장 데이터 형식과 검증 (순수 함수, 화면·Three.js 비의존)
 * - 저장하는 것: 성장(레벨·경험치·골드), 장비(가방·장착), 난이도, 기록(클리어 횟수·최고 점수 등)
 * - 저장하지 않는 것: 던전 안의 위치·적 상태. 이어하기는 던전 입구부터 다시 시작한다.
 * - 장비는 '원형 id + 등급'만 저장하고 불러올 때 다시 만든다. 밸런스(GameConfig)를 바꿔도 저장 데이터가 깨지지 않는다.
 * - 형식이 바뀌면 SAVE_VERSION 을 올리고 migrateSaveData 에 변환을 추가한다.
 */
export const SAVE_VERSION = 2;

/** 저장된 장비 한 개 */
export interface SavedItem {
  templateId: string;
  rarity: Rarity;
}

/** 누적 기록 */
export interface SaveRecords {
  /** 던전 클리어 횟수 */
  clears: number;
  /** 쓰러진 횟수 */
  deaths: number;
  /** 누적 처치 수 */
  totalKills: number;
  /** 한 판 최고 점수 */
  bestScore: number;
  /** 던전별 클리어 횟수 (던전 id → 횟수). 해금 판단에 쓴다 (v2) */
  dungeonClears: Record<string, number>;
}

export interface SaveData {
  version: number;
  /** 저장 시각 (ISO 문자열) */
  savedAt: string;
  /** 저장 당시 게임 버전 (참고용) */
  gameVersion: string;
  difficulty: DifficultyLevel;
  stats: { level: number; xp: number; gold: number };
  equipment: { inventory: SavedItem[]; equipped: Record<EquipSlot, SavedItem | null> };
  records: SaveRecords;
}

export const EMPTY_RECORDS: SaveRecords = { clears: 0, deaths: 0, totalKills: 0, bestScore: 0, dungeonClears: {} };

/** 기록 복사 (중첩 객체까지) */
export function cloneRecords(r: SaveRecords): SaveRecords {
  return { ...r, dungeonClears: { ...r.dungeonClears } };
}

/** 검증 결과: 성공이면 보정된 데이터, 실패면 이유 */
export type ValidateResult = { ok: true; data: SaveData; warnings: string[] } | { ok: false; reason: 'invalid' | 'newer'; message: string };

const RARITIES: Rarity[] = ['common', 'uncommon', 'rare', 'epic', 'legendary'];

function isRarity(v: unknown): v is Rarity {
  return typeof v === 'string' && (RARITIES as string[]).includes(v);
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

/** 정수로 보정 (숫자가 아니면 기본값, 범위 밖이면 잘라냄) */
function clampInt(v: unknown, min: number, max: number, fallback: number): number {
  const n = typeof v === 'number' && Number.isFinite(v) ? Math.floor(v) : fallback;
  return Math.min(max, Math.max(min, n));
}

function toSavedItem(item: ItemInstance): SavedItem {
  return { templateId: item.templateId, rarity: item.rarity };
}

/** 현재 게임 상태 → 저장 데이터 */
export function serializeSave(input: { stats: PlayerStats; equipment: EquipmentSystem; difficulty: DifficultyLevel; records: SaveRecords; now?: Date }): SaveData {
  const equipped = {} as Record<EquipSlot, SavedItem | null>;
  for (const slot of EQUIP_SLOTS) {
    const it = input.equipment.equipped[slot];
    equipped[slot] = it ? toSavedItem(it) : null;
  }
  return {
    version: SAVE_VERSION,
    savedAt: (input.now ?? new Date()).toISOString(),
    gameVersion: GameConfig.meta.version,
    difficulty: input.difficulty,
    stats: { level: input.stats.level, xp: input.stats.xp, gold: input.stats.gold },
    equipment: { inventory: input.equipment.inventory.map(toSavedItem), equipped },
    records: cloneRecords(input.records),
  };
}

/** 저장된 장비 항목이 올바른지 (원형이 아직 있고 등급이 맞는지) */
function parseSavedItem(v: unknown, warnings: string[], where: string): SavedItem | null {
  if (!isRecord(v) || typeof v.templateId !== 'string' || !isRarity(v.rarity)) {
    warnings.push(`${where}: 장비 항목 형식이 잘못되어 버렸습니다.`);
    return null;
  }
  if (!findTemplate(v.templateId)) {
    warnings.push(`${where}: 알 수 없는 장비 '${v.templateId}' 를 버렸습니다.`);
    return null;
  }
  return { templateId: v.templateId, rarity: v.rarity };
}

/**
 * 알 수 없는 입력(JSON.parse 결과)을 검증·보정해 SaveData 로 만든다.
 * - 필수 구조가 없으면 실패(invalid). 숫자가 범위를 벗어나면 잘라내고 경고만 남긴다.
 * - 더 새로운 버전의 저장은 읽지 않는다(newer). 더 오래된 버전은 migrateSaveData 로 변환한다.
 */
export function validateSaveData(raw: unknown): ValidateResult {
  if (!isRecord(raw)) return { ok: false, reason: 'invalid', message: '저장 데이터가 객체가 아닙니다.' };
  const version = typeof raw.version === 'number' ? raw.version : NaN;
  if (!Number.isInteger(version) || version < 1) return { ok: false, reason: 'invalid', message: '저장 데이터에 버전이 없습니다.' };
  if (version > SAVE_VERSION) return { ok: false, reason: 'newer', message: `저장 데이터 버전(${version})이 이 게임이 아는 버전(${SAVE_VERSION})보다 새롭습니다.` };
  const migrated = migrateSaveData(raw, version);
  const warnings: string[] = [];

  if (!isRecord(migrated.stats) || !isRecord(migrated.equipment)) return { ok: false, reason: 'invalid', message: 'stats 또는 equipment 항목이 없습니다.' };
  const p = GameConfig.progression;
  const level = clampInt(migrated.stats.level, 1, p.maxLevel, 1);
  const xpCap = Math.round(p.xpBase * Math.pow(p.xpGrowth, level - 1));
  const stats = {
    level,
    xp: clampInt(migrated.stats.xp, 0, xpCap, 0),
    gold: clampInt(migrated.stats.gold, 0, 999_999_999, 0),
  };
  if (stats.level !== migrated.stats.level || stats.xp !== migrated.stats.xp || stats.gold !== migrated.stats.gold) warnings.push('성장 수치가 범위를 벗어나 보정했습니다.');

  const difficulty = typeof migrated.difficulty === 'string' && isDifficultyLevel(migrated.difficulty) ? migrated.difficulty : GameConfig.difficulty.default;
  if (difficulty !== migrated.difficulty) warnings.push('난이도 값이 잘못되어 기본 난이도로 바꿨습니다.');

  const eq = migrated.equipment;
  const inventory: SavedItem[] = [];
  const rawInv = Array.isArray(eq.inventory) ? eq.inventory : [];
  if (!Array.isArray(eq.inventory)) warnings.push('가방 목록이 없어 비웠습니다.');
  rawInv.forEach((v, i) => {
    const it = parseSavedItem(v, warnings, `가방 ${i + 1}번`);
    if (it) inventory.push(it);
  });
  const equipped = {} as Record<EquipSlot, SavedItem | null>;
  const rawEq = isRecord(eq.equipped) ? eq.equipped : {};
  for (const slot of EQUIP_SLOTS) {
    const v = rawEq[slot];
    if (v === null || v === undefined) {
      equipped[slot] = null;
      continue;
    }
    const it = parseSavedItem(v, warnings, `슬롯 ${slot}`);
    if (it && !slotsForCategory(findTemplate(it.templateId)!.category).includes(slot)) {
      warnings.push(`슬롯 ${slot}: 맞지 않는 장비라 가방으로 옮겼습니다.`);
      inventory.push(it);
      equipped[slot] = null;
    } else equipped[slot] = it;
  }
  const cap = GameConfig.equipment.inventorySize;
  if (inventory.length > cap) {
    warnings.push(`가방이 ${cap}칸을 넘어 뒤쪽 ${inventory.length - cap}개를 버렸습니다.`);
    inventory.length = cap;
  }

  const r = isRecord(migrated.records) ? migrated.records : {};
  const dungeonClears: Record<string, number> = {};
  const rawClears = isRecord(r.dungeonClears) ? r.dungeonClears : {};
  for (const [id, n] of Object.entries(rawClears)) {
    if (!DUNGEONS.some((d) => d.id === id)) {
      warnings.push(`알 수 없는 던전 '${id}' 의 클리어 기록을 버렸습니다.`);
      continue;
    }
    dungeonClears[id] = clampInt(n, 0, 1e9, 0);
  }
  const records: SaveRecords = {
    clears: clampInt(r.clears, 0, 1e9, 0),
    deaths: clampInt(r.deaths, 0, 1e9, 0),
    totalKills: clampInt(r.totalKills, 0, 1e9, 0),
    bestScore: clampInt(r.bestScore, 0, 1e12, 0),
    dungeonClears,
  };

  return {
    ok: true,
    warnings,
    data: {
      version: SAVE_VERSION,
      savedAt: typeof migrated.savedAt === 'string' && !Number.isNaN(Date.parse(migrated.savedAt)) ? migrated.savedAt : new Date(0).toISOString(),
      gameVersion: typeof migrated.gameVersion === 'string' ? migrated.gameVersion : '?',
      difficulty,
      stats,
      equipment: { inventory, equipped },
      records,
    },
  };
}

/**
 * 오래된 버전의 저장 데이터를 현재 형식으로 변환한다.
 * - 형식을 바꿀 때마다 `if (version < N) { ... }` 블록을 아래에 추가한다. 현재는 버전 1 뿐이라 변환이 없다.
 */
export function migrateSaveData(raw: Record<string, unknown>, version: number): Record<string, unknown> {
  const data = { ...raw };
  if (version < 2) {
    // v1 → v2: 던전이 하나('forest')뿐이었으므로 전체 클리어 횟수를 그 던전의 기록으로 옮긴다
    const r = isRecord(data.records) ? { ...data.records } : {};
    const clears = typeof r.clears === 'number' ? r.clears : 0;
    r.dungeonClears = clears > 0 ? { [DUNGEONS[0].id]: clears } : {};
    data.records = r;
  }
  return data;
}

/** 저장 데이터를 게임 객체에 적용한다 (장비는 원형·등급으로 다시 만든다) */
export function applySaveData(data: SaveData, target: { stats: PlayerStats; equipment: EquipmentSystem }): void {
  target.stats.reset();
  target.stats.level = data.stats.level;
  target.stats.xp = data.stats.xp;
  target.stats.gold = data.stats.gold;
  target.equipment.reset();
  for (const saved of data.equipment.inventory) {
    const t = findTemplate(saved.templateId);
    if (t) target.equipment.add(createItem(t, saved.rarity));
  }
  for (const slot of EQUIP_SLOTS) {
    const saved = data.equipment.equipped[slot];
    const t = saved ? findTemplate(saved.templateId) : undefined;
    if (saved && t) target.equipment.equipped[slot] = createItem(t, saved.rarity);
  }
}

/** 저장 데이터에 의미 있는 진행이 있는지 (처음 상태 그대로면 false) */
export function hasProgress(data: SaveData): boolean {
  const s = data.stats;
  const eq = data.equipment;
  return s.level > 1 || s.xp > 0 || s.gold > 0 || eq.inventory.length > 0 || EQUIP_SLOTS.some((slot) => eq.equipped[slot] !== null) || data.records.clears > 0 || data.records.deaths > 0;
}
