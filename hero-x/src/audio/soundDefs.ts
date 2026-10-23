/**
 * 효과음·음악 정의 (데이터만, 브라우저 비의존 → 테스트 대상)
 * - 효과음은 짧은 신시사이저 레시피(파형·주파수 변화·길이·소음 여부)로 적는다. 외부 음원 파일을 쓰지 않는다.
 * - 음악은 던전마다 다른 간단한 반복 악절(음계·템포·파형)이다. AudioSystem 이 이 데이터를 읽어 소리를 만든다.
 */
export type SfxName =
  | 'melee'
  | 'ranged'
  | 'enemyHit'
  | 'kill'
  | 'hurt'
  | 'pickup'
  | 'equip'
  | 'heal'
  | 'levelup'
  | 'chest'
  | 'jump'
  | 'dash'
  | 'bossAppear'
  | 'slam'
  | 'boom'
  | 'summon'
  | 'clear'
  | 'defeat'
  | 'ui';

/** 한 효과음을 이루는 소리 조각 (여러 조각을 겹쳐 하나의 효과음을 만든다) */
export interface SfxPart {
  /** 파형. 'noise' 는 백색 소음 */
  wave: OscillatorType | 'noise';
  /** 시작 주파수(Hz). noise 면 무시 */
  freq: number;
  /** 끝 주파수(Hz). 없으면 freq 유지 */
  freqEnd?: number;
  /** 길이(초) */
  duration: number;
  /** 음량 0~1 */
  gain: number;
  /** 시작 지연(초) */
  delay?: number;
  /** 소음의 밝기(저역 통과 필터 Hz). noise 전용 */
  filter?: number;
}

export const SFX: Record<SfxName, SfxPart[]> = {
  melee: [
    { wave: 'noise', freq: 0, duration: 0.09, gain: 0.35, filter: 2600 },
    { wave: 'triangle', freq: 320, freqEnd: 140, duration: 0.1, gain: 0.25 },
  ],
  ranged: [{ wave: 'square', freq: 880, freqEnd: 220, duration: 0.12, gain: 0.18 }],
  enemyHit: [{ wave: 'square', freq: 200, freqEnd: 90, duration: 0.07, gain: 0.22 }],
  kill: [
    { wave: 'noise', freq: 0, duration: 0.18, gain: 0.3, filter: 1600 },
    { wave: 'sawtooth', freq: 160, freqEnd: 40, duration: 0.22, gain: 0.25 },
  ],
  hurt: [
    { wave: 'sawtooth', freq: 140, freqEnd: 60, duration: 0.18, gain: 0.35 },
    { wave: 'noise', freq: 0, duration: 0.1, gain: 0.2, filter: 900 },
  ],
  pickup: [
    { wave: 'sine', freq: 880, duration: 0.07, gain: 0.2 },
    { wave: 'sine', freq: 1320, duration: 0.1, gain: 0.2, delay: 0.06 },
  ],
  equip: [
    { wave: 'triangle', freq: 523, duration: 0.09, gain: 0.22 },
    { wave: 'triangle', freq: 659, duration: 0.09, gain: 0.22, delay: 0.08 },
    { wave: 'triangle', freq: 784, duration: 0.16, gain: 0.22, delay: 0.16 },
  ],
  heal: [{ wave: 'sine', freq: 440, freqEnd: 880, duration: 0.25, gain: 0.2 }],
  levelup: [
    { wave: 'square', freq: 523, duration: 0.1, gain: 0.18 },
    { wave: 'square', freq: 659, duration: 0.1, gain: 0.18, delay: 0.1 },
    { wave: 'square', freq: 784, duration: 0.1, gain: 0.18, delay: 0.2 },
    { wave: 'square', freq: 1046, duration: 0.35, gain: 0.2, delay: 0.3 },
  ],
  chest: [
    { wave: 'noise', freq: 0, duration: 0.2, gain: 0.15, filter: 600 },
    { wave: 'sine', freq: 1046, duration: 0.12, gain: 0.18, delay: 0.15 },
    { wave: 'sine', freq: 1568, duration: 0.2, gain: 0.18, delay: 0.25 },
  ],
  jump: [{ wave: 'sine', freq: 300, freqEnd: 600, duration: 0.14, gain: 0.18 }],
  dash: [{ wave: 'noise', freq: 0, duration: 0.16, gain: 0.25, filter: 3200 }],
  bossAppear: [
    { wave: 'sawtooth', freq: 55, freqEnd: 40, duration: 1.2, gain: 0.35 },
    { wave: 'noise', freq: 0, duration: 0.6, gain: 0.2, filter: 400 },
    { wave: 'square', freq: 110, duration: 0.3, gain: 0.2, delay: 0.5 },
  ],
  slam: [
    { wave: 'sine', freq: 90, freqEnd: 30, duration: 0.35, gain: 0.45 },
    { wave: 'noise', freq: 0, duration: 0.25, gain: 0.3, filter: 700 },
  ],
  boom: [
    { wave: 'noise', freq: 0, duration: 0.35, gain: 0.35, filter: 1200 },
    { wave: 'sine', freq: 120, freqEnd: 35, duration: 0.3, gain: 0.35 },
  ],
  summon: [
    { wave: 'sine', freq: 660, freqEnd: 1320, duration: 0.3, gain: 0.2 },
    { wave: 'triangle', freq: 330, freqEnd: 660, duration: 0.3, gain: 0.15, delay: 0.1 },
  ],
  clear: [
    { wave: 'square', freq: 523, duration: 0.12, gain: 0.2 },
    { wave: 'square', freq: 659, duration: 0.12, gain: 0.2, delay: 0.12 },
    { wave: 'square', freq: 784, duration: 0.12, gain: 0.2, delay: 0.24 },
    { wave: 'square', freq: 1046, duration: 0.5, gain: 0.22, delay: 0.36 },
    { wave: 'triangle', freq: 261, duration: 0.9, gain: 0.15, delay: 0.36 },
  ],
  defeat: [
    { wave: 'sawtooth', freq: 392, freqEnd: 196, duration: 0.5, gain: 0.2 },
    { wave: 'sawtooth', freq: 294, freqEnd: 110, duration: 0.8, gain: 0.2, delay: 0.4 },
  ],
  ui: [{ wave: 'sine', freq: 700, duration: 0.05, gain: 0.12 }],
};

/** 음악 트랙: 베이스·멜로디 음정(반음 단위, 0 = 기준음)과 템포 */
export interface MusicTrack {
  /** 분당 박자 */
  bpm: number;
  /** 기준음 주파수(Hz). 보통 C3 ≈ 130.81 */
  root: number;
  /** 베이스 악절: 한 박자에 한 음, 반음 오프셋. null 은 쉼표 */
  bass: Array<number | null>;
  /** 멜로디 악절: 반 박자에 한 음 */
  melody: Array<number | null>;
  bassWave: OscillatorType;
  melodyWave: OscillatorType;
  /** 멜로디 음량 배율 */
  melodyGain: number;
}

export type MusicName = 'menu' | 'forest' | 'cave' | 'fortress' | 'boss';

export const MUSIC: Record<MusicName, MusicTrack> = {
  // 메뉴: 느긋한 장조
  menu: { bpm: 84, root: 130.81, bass: [0, null, 7, null, 5, null, 7, null], melody: [12, 16, 19, 16, 12, null, 14, null, 17, 14, 12, null, 11, null, 12, null], bassWave: 'triangle', melodyWave: 'sine', melodyGain: 0.6 },
  // 숲: 밝고 가벼운 장조
  forest: { bpm: 112, root: 130.81, bass: [0, 0, 5, 5, 7, 7, 5, 5], melody: [12, 14, 16, 12, 19, null, 16, null, 17, 16, 14, 12, 14, null, 12, null], bassWave: 'triangle', melodyWave: 'square', melodyGain: 0.45 },
  // 동굴: 느린 단조, 울림
  cave: { bpm: 92, root: 110, bass: [0, null, 3, null, 5, null, 3, null], melody: [12, null, 15, null, 17, 15, 12, null, 10, null, 12, null, 15, null, 12, null], bassWave: 'sine', melodyWave: 'triangle', melodyGain: 0.55 },
  // 요새: 빠른 단조, 긴장
  fortress: { bpm: 132, root: 98, bass: [0, 0, 0, 3, 0, 0, 0, 5], melody: [12, 12, 15, 12, 17, 15, 12, null, 10, 10, 12, 10, 8, null, 7, null], bassWave: 'sawtooth', melodyWave: 'square', melodyGain: 0.4 },
  // 보스: 빠르고 무거움
  boss: { bpm: 150, root: 98, bass: [0, 0, 3, 3, 0, 0, 6, 5], melody: [12, null, 12, 15, 12, null, 18, 17, 12, null, 12, 15, 19, null, 17, 15], bassWave: 'sawtooth', melodyWave: 'sawtooth', melodyGain: 0.35 },
};

/** 반음 오프셋 → 주파수 */
export function semitoneToFreq(root: number, semitone: number): number {
  return root * Math.pow(2, semitone / 12);
}
