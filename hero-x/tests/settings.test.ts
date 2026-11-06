import { describe, expect, it } from 'vitest';
import { GameConfig } from '../src/game/GameConfig';
import { SETTINGS_KEY, SETTING_DEFS, SETTING_GROUPS, clampRange, defaultSettings, loadSettings, sanitizeSettings, saveSettings } from '../src/game/Settings';
import type { StorageLike } from '../src/save/SaveStorage';

function memoryStorage(initial: Record<string, string> = {}): StorageLike & { map: Map<string, string> } {
  const map = new Map(Object.entries(initial));
  return { map, getItem: (k) => map.get(k) ?? null, setItem: (k, v) => void map.set(k, v), removeItem: (k) => void map.delete(k) };
}

describe('사용자 설정 (Settings)', () => {
  it('기본값은 개발자 설정(GameConfig)을 따르고, 정의 목록은 모든 필드를 다룬다', () => {
    const d = defaultSettings();
    expect(d.difficulty).toBe(GameConfig.difficulty.default);
    expect(d.showDamageNumbers).toBe(GameConfig.hud.showDamageNumbers);
    expect(d.shadows).toBe(GameConfig.graphics.shadows);
    expect(SETTING_DEFS.map((x) => x.key).sort()).toEqual(Object.keys(d).sort());
    for (const def of SETTING_DEFS) expect(SETTING_GROUPS).toContain(def.group);
  });

  it('범위 항목은 step 으로 반올림하고 min~max 안에 묶는다', () => {
    const def = SETTING_DEFS.find((x) => x.key === 'playerHpMul');
    if (!def || def.kind !== 'range') throw new Error('정의 없음');
    expect(clampRange(def, 1.24)).toBe(1.2);
    expect(clampRange(def, 99)).toBe(def.max);
    expect(clampRange(def, -1)).toBe(def.min);
    expect(clampRange(def, NaN)).toBe(1);
  });

  it('잘못된 값은 보정·기본값 처리하고 경고를 남기며, 모르는 키는 무시한다', () => {
    const r = sanitizeSettings({ difficulty: 'ultra', playerHpMul: 10, showFps: 'yes', cameraDistance: 1.3, unknownKey: 1 });
    expect(r.settings.difficulty).toBe(GameConfig.difficulty.default);
    expect(r.settings.playerHpMul).toBe(3);
    expect(r.settings.showFps).toBe(defaultSettings().showFps);
    expect(r.settings.cameraDistance).toBe(1.3);
    expect(r.warnings).toHaveLength(3);
    expect('unknownKey' in r.settings).toBe(false);
    expect(sanitizeSettings(null).settings).toEqual(defaultSettings());
    expect(sanitizeSettings('x').warnings).toHaveLength(1);
  });

  it('저장 → 읽기 round trip, 깨진 JSON 은 기본값 + 경고', () => {
    const storage = memoryStorage();
    expect(loadSettings(storage).found).toBe(false);
    const s = { ...defaultSettings(), playerDamageMul: 1.5, shadows: false, difficulty: 'hard' as const };
    expect(saveSettings(storage, s)).toBe(true);
    const r = loadSettings(storage);
    expect(r.found).toBe(true);
    expect(r.settings).toEqual(s);
    expect(r.warnings).toEqual([]);
    storage.map.set(SETTINGS_KEY, '{broken');
    const broken = loadSettings(storage);
    expect(broken.settings).toEqual(defaultSettings());
    expect(broken.warnings).toHaveLength(1);
    expect(loadSettings(null).found).toBe(false);
  });
});
