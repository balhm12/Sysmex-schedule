import { GameConfig, type DifficultyLevel } from './GameConfig';
import { isDifficultyLevel } from './Difficulty';
import type { StorageLike } from '../save/SaveStorage';
import { Logger } from '../utils/Logger';
import { isTouchDevice } from '../utils/device';

/**
 * 사용자 설정 (게임 안 설정 화면에서 바꾸는 값)
 * - GameConfig(개발자 설정)와 다르다. 여기 값은 플레이어가 설정 화면에서 바꾸고 브라우저 저장소에 기억된다.
 * - 항목을 추가하려면 UserSettings 에 필드를, SETTING_DEFS 에 정의(이름·설명·범위)를 더하면 화면이 자동으로 만들어진다.
 * - 모든 값은 sanitizeSettings 로 허용 범위 안에 묶인다. 저장 데이터가 깨져도 기본값으로 동작한다.
 */
export interface UserSettings {
  /** 난이도 (메인 메뉴의 난이도 버튼과 같은 값) */
  difficulty: DifficultyLevel;
  /** 플레이어 최대 체력 배율 */
  playerHpMul: number;
  /** 플레이어 공격력 배율 */
  playerDamageMul: number;
  /** 적 체력 배율 (난이도 배율에 곱해진다. 다음 던전 입장부터 적용) */
  enemyHpMul: number;
  /** 카메라 거리 배율 (1 = 기본) */
  cameraDistance: number;
  /** 터치 조작 표시 (가상 조이스틱·버튼) + 가까운 적 자동 조준. 기본값은 터치 기기 여부로 정한다 */
  touchControls: boolean;
  /** 조이스틱이 누르는 자리에 나타남 (false: 왼쪽 아래 고정) */
  floatingJoystick: boolean;
  /** 왼손 모드: 버튼을 왼쪽에 */
  leftHanded: boolean;
  /** 터치 버튼 크기 배율 */
  touchButtonScale: number;
  /** 진동 피드백 (지원 기기만) */
  haptics: boolean;
  /** 소리: 전체·효과음·음악 음량 0~1 */
  soundMaster: number;
  soundSfx: number;
  soundMusic: number;
  /** 렌더 해상도 배율 (낮추면 휴대폰에서 부드러워진다) */
  resolution: number;
  /** 피해 숫자 표시 */
  showDamageNumbers: boolean;
  /** 맞았을 때 화면 테두리 붉게 */
  hitFlash: boolean;
  /** 그림자 */
  shadows: boolean;
  /** FPS 표시 */
  showFps: boolean;
}

export type SettingKey = keyof UserSettings;

/** 설정 항목 정의: 화면을 이 정의로 자동 생성한다 */
export type SettingDef =
  | { key: 'difficulty'; kind: 'choice'; group: string; label: string; description: string }
  | { key: SettingKey; kind: 'range'; group: string; label: string; description: string; min: number; max: number; step: number; unit?: string }
  | { key: SettingKey; kind: 'toggle'; group: string; label: string; description: string };

export const SETTING_GROUPS = ['게임', '소리', '전투 수치', '화면'] as const;

export const SETTING_DEFS: SettingDef[] = [
  { key: 'difficulty', kind: 'choice', group: '게임', label: '난이도', description: '적의 체력·공격력·속도 배율. 바꾸면 던전을 처음부터 다시 시작합니다.' },
  { key: 'cameraDistance', kind: 'range', group: '게임', label: '카메라 거리', description: '1.0 이 기본. 멀리 두면 넓게 보이고 가까우면 캐릭터가 크게 보입니다.', min: 0.6, max: 1.6, step: 0.1, unit: '×' },
  { key: 'touchControls', kind: 'toggle', group: '게임', label: '터치 조작', description: '화면에 조이스틱·버튼을 띄우고 가까운 적을 자동으로 조준합니다. 휴대폰·태블릿은 기본 켜짐.' },
  { key: 'floatingJoystick', kind: 'toggle', group: '게임', label: '조이스틱: 누르는 자리에', description: '켜면 버튼이 아닌 아무 곳이나 눌러 그 자리에서 끌면 움직입니다. 끄면 왼쪽 아래 고정 조이스틱.' },
  { key: 'leftHanded', kind: 'toggle', group: '게임', label: '왼손 모드', description: '공격·점프·회피 버튼을 왼쪽에, 고정 조이스틱을 오른쪽에 둡니다.' },
  { key: 'touchButtonScale', kind: 'range', group: '게임', label: '터치 버튼 크기', description: '버튼이 작거나 크면 조절하세요.', min: 0.8, max: 1.4, step: 0.1, unit: '×' },
  { key: 'haptics', kind: 'toggle', group: '게임', label: '진동', description: '맞거나 처치할 때 짧게 진동합니다 (지원하는 휴대폰만, iPhone 은 안 됨).' },
  { key: 'soundMaster', kind: 'range', group: '소리', label: '전체 음량', description: '0 이면 무음. 소리는 첫 조작(터치·키) 뒤부터 납니다.', min: 0, max: 1, step: 0.1 },
  { key: 'soundSfx', kind: 'range', group: '소리', label: '효과음', description: '공격·피격·획득·보스 소리.', min: 0, max: 1, step: 0.1 },
  { key: 'soundMusic', kind: 'range', group: '소리', label: '음악', description: '던전·보스·메뉴 배경 음악.', min: 0, max: 1, step: 0.1 },
  { key: 'playerHpMul', kind: 'range', group: '전투 수치', label: '내 최대 체력', description: '레벨·장비 보너스를 더한 최대 체력에 곱합니다.', min: 0.5, max: 3, step: 0.1, unit: '×' },
  { key: 'playerDamageMul', kind: 'range', group: '전투 수치', label: '내 공격력', description: '근접·원거리 공격 피해에 곱합니다.', min: 0.5, max: 3, step: 0.1, unit: '×' },
  { key: 'enemyHpMul', kind: 'range', group: '전투 수치', label: '적 체력', description: '난이도 배율에 다시 곱합니다. 다음 던전 입장부터 적용됩니다.', min: 0.5, max: 3, step: 0.1, unit: '×' },
  { key: 'showDamageNumbers', kind: 'toggle', group: '화면', label: '피해 숫자 표시', description: '공격하거나 맞을 때 숫자를 띄웁니다.' },
  { key: 'hitFlash', kind: 'toggle', group: '화면', label: '피격 시 화면 번쩍임', description: '맞았을 때 화면 테두리를 붉게 비춥니다.' },
  { key: 'shadows', kind: 'toggle', group: '화면', label: '그림자', description: '느린 PC·휴대폰에서는 끄면 부드러워집니다.' },
  { key: 'resolution', kind: 'range', group: '화면', label: '렌더 해상도', description: '1.0 이 기기 기본. 휴대폰에서 끊기면 0.6~0.8 로 낮추세요.', min: 0.5, max: 1.5, step: 0.1, unit: '×' },
  { key: 'showFps', kind: 'toggle', group: '화면', label: 'FPS 표시', description: '왼쪽 아래에 초당 프레임을 보여줍니다.' },
];

/** 기본값 (GameConfig 의 개발자 설정을 기본으로 삼는다) */
export function defaultSettings(): UserSettings {
  const touch = isTouchDevice();
  return {
    difficulty: GameConfig.difficulty.default,
    playerHpMul: 1,
    playerDamageMul: 1,
    enemyHpMul: 1,
    cameraDistance: 1,
    touchControls: touch,
    floatingJoystick: true,
    leftHanded: false,
    touchButtonScale: 1,
    haptics: touch,
    soundMaster: 0.8,
    soundSfx: 1,
    soundMusic: 0.6,
    // 휴대폰은 그림자를 끄고 해상도를 낮춰 시작한다 (설정에서 올릴 수 있다)
    resolution: touch ? 0.8 : 1,
    showDamageNumbers: GameConfig.hud.showDamageNumbers,
    hitFlash: true,
    shadows: touch ? false : GameConfig.graphics.shadows,
    showFps: GameConfig.debug.showFps,
  };
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

/** 범위 항목 값을 step 단위로 반올림해 min~max 안에 넣는다 */
export function clampRange(def: Extract<SettingDef, { kind: 'range' }>, v: number): number {
  const n = Number.isFinite(v) ? v : (defaultSettings()[def.key] as number);
  const snapped = Math.round((n - def.min) / def.step) * def.step + def.min;
  const clamped = Math.min(def.max, Math.max(def.min, snapped));
  return Math.round(clamped * 1000) / 1000;
}

/** 알 수 없는 입력을 검증·보정해 UserSettings 로 만든다. 없는 항목은 기본값, 잘못된 값은 보정하고 경고를 남긴다 */
export function sanitizeSettings(raw: unknown): { settings: UserSettings; warnings: string[] } {
  const base = defaultSettings();
  const warnings: string[] = [];
  if (!isRecord(raw)) return { settings: base, warnings: raw === undefined || raw === null ? [] : ['설정 데이터가 객체가 아니라 기본값을 씁니다.'] };
  const out: UserSettings = { ...base };
  for (const def of SETTING_DEFS) {
    const v = raw[def.key];
    if (v === undefined) continue;
    if (def.kind === 'choice') {
      if (typeof v === 'string' && isDifficultyLevel(v)) out.difficulty = v;
      else warnings.push(`난이도 값 '${String(v)}' 이(가) 잘못되어 기본값으로 바꿨습니다.`);
    } else if (def.kind === 'toggle') {
      if (typeof v === 'boolean') (out[def.key] as boolean) = v;
      else warnings.push(`'${def.label}' 값이 참/거짓이 아니라 기본값으로 바꿨습니다.`);
    } else {
      const n = typeof v === 'number' ? clampRange(def, v) : NaN;
      if (Number.isNaN(n)) warnings.push(`'${def.label}' 값이 숫자가 아니라 기본값으로 바꿨습니다.`);
      else {
        if (n !== v) warnings.push(`'${def.label}' 값 ${String(v)} 을(를) 허용 범위 안의 ${n} 으로 보정했습니다.`);
        (out[def.key] as number) = n;
      }
    }
  }
  return { settings: out, warnings };
}

export const SETTINGS_KEY = 'hero-x.settings';
export const SETTINGS_VERSION = 1;

/** 저장소에서 설정을 읽는다 (없거나 깨졌으면 기본값) */
export function loadSettings(storage: StorageLike | null): { settings: UserSettings; warnings: string[]; found: boolean } {
  if (!storage) return { settings: defaultSettings(), warnings: [], found: false };
  let text: string | null = null;
  try {
    text = storage.getItem(SETTINGS_KEY);
  } catch {
    /* 저장소를 못 쓰는 환경 */
  }
  if (!text) return { settings: defaultSettings(), warnings: [], found: false };
  try {
    const raw: unknown = JSON.parse(text);
    const body = isRecord(raw) && isRecord(raw.settings) ? raw.settings : raw;
    const r = sanitizeSettings(body);
    return { ...r, found: true };
  } catch {
    return { settings: defaultSettings(), warnings: ['설정 데이터를 읽을 수 없어 기본값을 씁니다.'], found: true };
  }
}

/** 설정을 저장한다. 실패는 경고만 남긴다 */
export function saveSettings(storage: StorageLike | null, settings: UserSettings): boolean {
  if (!storage) return false;
  try {
    storage.setItem(SETTINGS_KEY, JSON.stringify({ version: SETTINGS_VERSION, settings }));
    return true;
  } catch (err) {
    Logger.warn('설정 저장에 실패했습니다.', err);
    return false;
  }
}
