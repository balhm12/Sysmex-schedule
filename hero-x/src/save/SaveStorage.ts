import { Logger } from '../utils/Logger';
import { validateSaveData, type SaveData } from './SaveData';

/**
 * 저장소 어댑터: 브라우저 localStorage 에 JSON 으로 저장한다.
 * - 손상된 데이터는 지우지 않고 `*.corrupt` 키로 옮겨 둔 뒤 새로 시작한다 (사용자가 복구를 시도할 수 있게).
 * - 더 새로운 버전의 저장은 건드리지 않는다. 사용자가 '새 게임'으로 명시적으로 덮어쓰기 전까지 자동 저장도 막는다.
 * - 저장소를 쓸 수 없는 환경(사생활 보호 모드 등)에서도 게임은 동작한다. 저장만 되지 않는다.
 */
export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export const SAVE_KEY = 'hero-x.save';
export const CORRUPT_KEY = 'hero-x.save.corrupt';

export type LoadResult =
  | { kind: 'none' }
  | { kind: 'loaded'; data: SaveData; warnings: string[] }
  | { kind: 'corrupt'; message: string }
  | { kind: 'newer'; message: string }
  | { kind: 'unavailable' };

/** 브라우저 localStorage (없거나 막혀 있으면 null) */
export function browserStorage(): StorageLike | null {
  try {
    const s = globalThis.localStorage;
    // 실제로 쓸 수 있는지 한 번 확인한다
    const probe = '__hero-x-probe__';
    s.setItem(probe, '1');
    s.removeItem(probe);
    return s;
  } catch {
    return null;
  }
}

/** 저장 데이터를 읽어 검증한다 */
export function loadSave(storage: StorageLike | null): LoadResult {
  if (!storage) return { kind: 'unavailable' };
  let text: string | null;
  try {
    text = storage.getItem(SAVE_KEY);
  } catch {
    return { kind: 'unavailable' };
  }
  if (text === null || text === '') return { kind: 'none' };
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    quarantine(storage, text);
    return { kind: 'corrupt', message: '저장 데이터를 읽을 수 없어(JSON 손상) 따로 보관하고 새로 시작합니다.' };
  }
  const result = validateSaveData(raw);
  if (result.ok) return { kind: 'loaded', data: result.data, warnings: result.warnings };
  if (result.reason === 'newer') return { kind: 'newer', message: result.message };
  quarantine(storage, text);
  return { kind: 'corrupt', message: `저장 데이터가 손상되어 따로 보관하고 새로 시작합니다. (${result.message})` };
}

/** 손상된 데이터를 corrupt 키로 옮긴다 */
function quarantine(storage: StorageLike, text: string): void {
  try {
    storage.setItem(CORRUPT_KEY, text);
    storage.removeItem(SAVE_KEY);
    Logger.warn(`손상된 저장 데이터를 '${CORRUPT_KEY}' 에 보관했습니다.`);
  } catch {
    /* 무시 */
  }
}

/** 저장한다. 성공 여부를 돌려준다 */
export function writeSave(storage: StorageLike | null, data: SaveData): boolean {
  if (!storage) return false;
  try {
    storage.setItem(SAVE_KEY, JSON.stringify(data));
    return true;
  } catch (err) {
    Logger.warn('저장에 실패했습니다.', err);
    return false;
  }
}

/** 저장 데이터를 지운다 (새 게임) */
export function clearSave(storage: StorageLike | null): void {
  if (!storage) return;
  try {
    storage.removeItem(SAVE_KEY);
  } catch {
    /* 무시 */
  }
}
