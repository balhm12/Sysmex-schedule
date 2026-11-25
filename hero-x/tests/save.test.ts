import { describe, expect, it } from 'vitest';
import { GameConfig } from '../src/game/GameConfig';
import { EquipmentSystem } from '../src/items/EquipmentSystem';
import { createItem, findTemplate } from '../src/items/ItemDatabase';
import { PlayerStats } from '../src/player/PlayerStats';
import { EMPTY_RECORDS, SAVE_VERSION, applySaveData, hasProgress, serializeSave, validateSaveData } from '../src/save/SaveData';
import { CORRUPT_KEY, SAVE_KEY, clearSave, loadSave, writeSave, type StorageLike } from '../src/save/SaveStorage';

/** 테스트용 메모리 저장소 */
function memoryStorage(initial: Record<string, string> = {}): StorageLike & { map: Map<string, string> } {
  const map = new Map(Object.entries(initial));
  return {
    map,
    getItem: (k) => map.get(k) ?? null,
    setItem: (k, v) => void map.set(k, v),
    removeItem: (k) => void map.delete(k),
  };
}

function sampleState() {
  const stats = new PlayerStats();
  stats.level = 5;
  stats.xp = 12;
  stats.gold = 340;
  const equipment = new EquipmentSystem();
  equipment.add(createItem(findTemplate('sword_basic')!, 'rare'));
  equipment.add(createItem(findTemplate('ring_vitality')!, 'common'));
  equipment.equip(equipment.inventory[0].uid); // 검 장착
  const records = { clears: 2, deaths: 1, totalKills: 40, bestScore: 1234, dungeonClears: { forest: 2 } };
  return { stats, equipment, records };
}

describe('저장 데이터 (SaveData)', () => {
  it('직렬화 → 검증 → 적용하면 레벨·골드·장비·기록이 그대로 돌아온다', () => {
    const src = sampleState();
    const data = serializeSave({ ...src, difficulty: 'hard', now: new Date('2026-10-23T10:00:00Z') });
    expect(data.version).toBe(SAVE_VERSION);
    expect(data.savedAt).toBe('2026-10-23T10:00:00.000Z');
    const parsed = validateSaveData(JSON.parse(JSON.stringify(data)));
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    expect(parsed.warnings).toEqual([]);
    const target = { stats: new PlayerStats(), equipment: new EquipmentSystem() };
    applySaveData(parsed.data, target);
    expect(target.stats.level).toBe(5);
    expect(target.stats.xp).toBe(12);
    expect(target.stats.gold).toBe(340);
    expect(target.equipment.equipped.melee?.templateId).toBe('sword_basic');
    expect(target.equipment.equipped.melee?.rarity).toBe('rare');
    expect(target.equipment.equipped.melee?.stats).toEqual(src.equipment.equipped.melee?.stats);
    expect(target.equipment.inventory.map((i) => i.templateId)).toEqual(['ring_vitality']);
    expect(parsed.data.records).toEqual(src.records);
    expect(parsed.data.difficulty).toBe('hard');
  });

  it('범위를 벗어난 수치는 잘라내고 경고를 남긴다', () => {
    const data = serializeSave({ ...sampleState(), difficulty: 'normal', records: EMPTY_RECORDS });
    data.stats.level = 9999;
    data.stats.gold = -50;
    data.difficulty = 'nightmare' as never;
    const r = validateSaveData(data);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.data.stats.level).toBe(GameConfig.progression.maxLevel);
    expect(r.data.stats.gold).toBe(0);
    expect(r.data.difficulty).toBe(GameConfig.difficulty.default);
    expect(r.warnings.length).toBeGreaterThanOrEqual(2);
  });

  it('알 수 없는 장비는 버리고, 슬롯에 맞지 않는 장비는 가방으로 옮긴다', () => {
    const data = serializeSave({ ...sampleState(), difficulty: 'normal' });
    data.equipment.inventory.push({ templateId: 'removed_item', rarity: 'epic' });
    data.equipment.equipped.armor = { templateId: 'blaster_basic', rarity: 'common' }; // 무기를 방어구 칸에
    const r = validateSaveData(data);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.data.equipment.inventory.map((i) => i.templateId)).toEqual(['ring_vitality', 'blaster_basic']);
    expect(r.data.equipment.equipped.armor).toBeNull();
    expect(r.warnings.some((w) => w.includes('removed_item'))).toBe(true);
  });

  it('구조가 아예 없거나 버전이 없으면 실패하고, 더 새로운 버전은 newer 로 거절한다', () => {
    expect(validateSaveData(null).ok).toBe(false);
    expect(validateSaveData('문자열').ok).toBe(false);
    expect(validateSaveData({ stats: {} }).ok).toBe(false);
    const newer = validateSaveData({ version: SAVE_VERSION + 1, stats: {}, equipment: {} });
    expect(newer.ok).toBe(false);
    if (!newer.ok) expect(newer.reason).toBe('newer');
    const noEq = validateSaveData({ version: 1, stats: { level: 2 } });
    expect(noEq.ok).toBe(false);
    if (!noEq.ok) expect(noEq.reason).toBe('invalid');
  });

  it('v1 저장(던전 하나)은 v2 로 변환되어 클리어 횟수가 첫 던전 기록으로 옮겨진다', () => {
    const v1 = {
      version: 1,
      savedAt: '2026-10-23T00:00:00.000Z',
      gameVersion: '0.5.0',
      difficulty: 'normal',
      stats: { level: 3, xp: 5, gold: 120 },
      equipment: { inventory: [], equipped: {} },
      records: { clears: 2, deaths: 1, totalKills: 30, bestScore: 900 },
    };
    const r = validateSaveData(v1);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.data.version).toBe(SAVE_VERSION);
    expect(r.data.records.dungeonClears).toEqual({ forest: 2 });
    expect(r.data.records.clears).toBe(2);
    expect(r.warnings).toEqual([]);
    // 알 수 없는 던전 기록은 버린다
    const r2 = validateSaveData({ ...v1, version: 2, records: { ...v1.records, dungeonClears: { forest: 1, moon: 3 } } });
    expect(r2.ok).toBe(true);
    if (r2.ok) {
      expect(r2.data.records.dungeonClears).toEqual({ forest: 1 });
      expect(r2.warnings.some((w) => w.includes('moon'))).toBe(true);
    }
  });

  it('처음 상태 그대로면 진행이 없다고 본다', () => {
    const fresh = serializeSave({ stats: new PlayerStats(), equipment: new EquipmentSystem(), difficulty: 'easy', records: EMPTY_RECORDS });
    expect(hasProgress(fresh)).toBe(false);
    fresh.stats.gold = 1;
    expect(hasProgress(fresh)).toBe(true);
  });
});

describe('저장소 (SaveStorage)', () => {
  it('저장 → 읽기 → 삭제', () => {
    const storage = memoryStorage();
    expect(loadSave(storage).kind).toBe('none');
    const data = serializeSave({ ...sampleState(), difficulty: 'easy' });
    expect(writeSave(storage, data)).toBe(true);
    const loaded = loadSave(storage);
    expect(loaded.kind).toBe('loaded');
    if (loaded.kind === 'loaded') expect(loaded.data.stats.gold).toBe(340);
    clearSave(storage);
    expect(loadSave(storage).kind).toBe('none');
  });

  it('JSON 이 깨졌으면 corrupt 키로 옮기고 새로 시작한다', () => {
    const storage = memoryStorage({ [SAVE_KEY]: '{"version":1, 깨진' });
    const r = loadSave(storage);
    expect(r.kind).toBe('corrupt');
    expect(storage.map.get(CORRUPT_KEY)).toBe('{"version":1, 깨진');
    expect(storage.map.has(SAVE_KEY)).toBe(false);
  });

  it('구조가 잘못된 JSON 도 corrupt 로 보관하고, 더 새로운 버전은 건드리지 않는다', () => {
    const bad = memoryStorage({ [SAVE_KEY]: JSON.stringify({ hello: 'world' }) });
    expect(loadSave(bad).kind).toBe('corrupt');
    expect(bad.map.has(CORRUPT_KEY)).toBe(true);
    const newerText = JSON.stringify({ version: SAVE_VERSION + 5, stats: {}, equipment: {} });
    const newer = memoryStorage({ [SAVE_KEY]: newerText });
    expect(loadSave(newer).kind).toBe('newer');
    expect(newer.map.get(SAVE_KEY)).toBe(newerText);
  });

  it('저장소가 없으면 unavailable 이고 쓰기는 false', () => {
    expect(loadSave(null).kind).toBe('unavailable');
    expect(writeSave(null, serializeSave({ ...sampleState(), difficulty: 'easy' }))).toBe(false);
  });
});
