import { GameConfig, type DifficultyLevel, type DifficultyPreset } from './GameConfig';

/**
 * 난이도
 * - 단계(쉬움/보통/어려움)마다 적 체력·공격력·속도 배율을 적용한다. 배율 값은 GameConfig.difficulty.presets 에 있다.
 * - 선택은 브라우저 로컬 저장소에 기억한다. 저장이 안 되는 환경에서도 게임은 기본 난이도로 동작한다.
 */
const STORAGE_KEY = 'hero-x.difficulty';

/** 저장된 난이도를 읽는다 (없거나 잘못됐으면 기본값) */
export function loadDifficulty(): DifficultyLevel {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v && isDifficultyLevel(v)) return v;
  } catch {
    /* 저장소를 못 쓰는 환경 (사생활 보호 모드 등) */
  }
  return GameConfig.difficulty.default;
}

/** 난이도를 저장한다. 저장 실패는 조용히 무시한다 */
export function saveDifficulty(level: DifficultyLevel): void {
  try {
    localStorage.setItem(STORAGE_KEY, level);
  } catch {
    /* 무시 */
  }
}

export function isDifficultyLevel(v: string): v is DifficultyLevel {
  return v in GameConfig.difficulty.presets;
}

/** 난이도 배율. 없는 단계를 받으면 기본 난이도의 배율을 돌려준다 */
export function getDifficultyPreset(level: DifficultyLevel): DifficultyPreset {
  return GameConfig.difficulty.presets[level] ?? GameConfig.difficulty.presets[GameConfig.difficulty.default];
}

/** 난이도 단계 목록 (화면 표시 순서) */
export function difficultyLevels(): DifficultyLevel[] {
  return Object.keys(GameConfig.difficulty.presets) as DifficultyLevel[];
}
