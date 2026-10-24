/**
 * 효과음·음악 정의 (데이터만, 브라우저 비의존 → 테스트 대상)
 * - 효과음은 신시사이저 레시피(여러 조각을 겹침 + 잔향·음높이 흔들림)로 적는다. 외부 음원 파일 없이도 동작한다.
 * - 음악은 던전마다 다른 4마디 반복 악절(베이스·멜로디·드럼·패드 코드)이다. AudioSystem 이 이 데이터를 읽어 소리를 만든다.
 * - 정식 음원 파일(.ogg/.mp3)을 public/sounds/ 에 넣으면 같은 이름의 효과음·음악이 파일로 바뀐다 (assets/SoundRegistry.ts).
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

export const SFX_NAMES: SfxName[] = ['melee', 'ranged', 'enemyHit', 'kill', 'hurt', 'pickup', 'equip', 'heal', 'levelup', 'chest', 'jump', 'dash', 'bossAppear', 'slam', 'boom', 'summon', 'clear', 'defeat', 'ui'];

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
  /** 필터 차단 주파수(Hz). noise 는 기본 2000(저역 통과), 오실레이터는 적을 때만 필터를 건다 */
  filter?: number;
  /** 필터 종류 (기본 lowpass) */
  filterType?: BiquadFilterType;
  /** 필터 차단 주파수의 끝값(Hz). 적으면 길이 동안 쓸어내린다(스윕) */
  filterEnd?: number;
  /** 음량이 올라오는 시간(초). 기본 0.008 (타격은 짧게, 패드는 길게) */
  attack?: number;
  /** 왜곡 정도 0~1 (묵직한 타격·폭발용) */
  distortion?: number;
  /** 두 번째 오실레이터를 이만큼(센트) 어긋나게 겹쳐 두껍게 만든다 */
  detune?: number;
}

/** 효과음 하나: 조각들 + 잔향 양 + 재생마다 음높이·음량을 조금씩 바꿔 똑같은 소리가 반복되지 않게 */
export interface SfxDef {
  parts: SfxPart[];
  /** 잔향으로 보내는 양 0~1 (0 = 없음) */
  reverb?: number;
  /** 재생마다 ±이 반음 안에서 음높이를 무작위로 */
  pitchJitter?: number;
  /** 재생마다 ±이 비율 안에서 음량을 무작위로 (0.2 = ±20%) */
  gainJitter?: number;
}

export const SFX: Record<SfxName, SfxDef> = {
  // 근접: 바람 가르는 소리(대역 통과 소음 스윕) + 낮은 휘두름
  melee: {
    parts: [
      { wave: 'noise', freq: 0, duration: 0.14, gain: 0.22, filter: 900, filterType: 'bandpass', filterEnd: 2600 },
      { wave: 'triangle', freq: 180, freqEnd: 90, duration: 0.1, gain: 0.1 },
    ],
    reverb: 0.1,
    pitchJitter: 2,
    gainJitter: 0.15,
  },
  // 원거리: 레이저(두껍게 겹친 사각파 하강) + 고음 꼬리 + 발사 클릭
  ranged: {
    parts: [
      { wave: 'square', freq: 1200, freqEnd: 300, duration: 0.14, gain: 0.14, detune: 8, filter: 3000 },
      { wave: 'sine', freq: 2400, freqEnd: 600, duration: 0.08, gain: 0.08 },
      { wave: 'noise', freq: 0, duration: 0.02, gain: 0.1, filter: 4000, filterType: 'highpass' },
    ],
    reverb: 0.15,
    pitchJitter: 1.5,
  },
  // 적 피격: 쿵(저음) + 찰(소음 크랙, 왜곡) + 금속 링
  enemyHit: {
    parts: [
      { wave: 'sine', freq: 160, freqEnd: 50, duration: 0.14, gain: 0.4 },
      { wave: 'noise', freq: 0, duration: 0.06, gain: 0.3, filter: 1500, filterType: 'bandpass', distortion: 0.4 },
      { wave: 'square', freq: 520, freqEnd: 380, duration: 0.09, gain: 0.1, filter: 2500 },
    ],
    reverb: 0.2,
    pitchJitter: 2,
    gainJitter: 0.2,
  },
  // 처치: 폭발(저음 붐 + 소음 스윕 왜곡 + 톱니파 하강) + 반짝임
  kill: {
    parts: [
      { wave: 'sine', freq: 120, freqEnd: 30, duration: 0.45, gain: 0.5 },
      { wave: 'noise', freq: 0, duration: 0.5, gain: 0.4, filter: 3000, filterEnd: 300, distortion: 0.5 },
      { wave: 'sawtooth', freq: 300, freqEnd: 60, duration: 0.3, gain: 0.12, filter: 1200 },
      { wave: 'triangle', freq: 1800, freqEnd: 2600, duration: 0.25, gain: 0.06, delay: 0.05 },
    ],
    reverb: 0.35,
    pitchJitter: 1.5,
    gainJitter: 0.15,
  },
  // 플레이어 피격: 거친 하강음 + 소음 + 저음
  hurt: {
    parts: [
      { wave: 'sawtooth', freq: 220, freqEnd: 110, duration: 0.22, gain: 0.22, distortion: 0.3, filter: 1800 },
      { wave: 'noise', freq: 0, duration: 0.1, gain: 0.18, filter: 800, filterType: 'bandpass' },
      { wave: 'sine', freq: 90, freqEnd: 40, duration: 0.2, gain: 0.3 },
    ],
    reverb: 0.2,
    pitchJitter: 1,
  },
  // 획득: 두 음 상승 + 잔향
  pickup: {
    parts: [
      { wave: 'sine', freq: 880, duration: 0.07, gain: 0.16 },
      { wave: 'sine', freq: 1320, duration: 0.12, gain: 0.16, delay: 0.06 },
    ],
    reverb: 0.25,
    pitchJitter: 0.5,
  },
  // 장비 장착: 세 음 상승 + 금속 클릭
  equip: {
    parts: [
      { wave: 'triangle', freq: 440, duration: 0.08, gain: 0.15 },
      { wave: 'triangle', freq: 660, duration: 0.08, gain: 0.15, delay: 0.08 },
      { wave: 'triangle', freq: 880, duration: 0.16, gain: 0.15, delay: 0.16 },
      { wave: 'noise', freq: 0, duration: 0.03, gain: 0.12, filter: 5000, filterType: 'highpass' },
    ],
    reverb: 0.3,
  },
  // 회복: 부드럽게 올라가는 두꺼운 음 + 높은 꼬리
  heal: {
    parts: [
      { wave: 'sine', freq: 440, freqEnd: 880, duration: 0.3, gain: 0.18, detune: 6, attack: 0.03 },
      { wave: 'sine', freq: 1320, duration: 0.3, gain: 0.08, delay: 0.15, attack: 0.05 },
    ],
    reverb: 0.45,
  },
  // 레벨 업: 아르페지오 4음 + 마지막 화음 유지
  levelup: {
    parts: [
      { wave: 'triangle', freq: 523, duration: 0.12, gain: 0.16 },
      { wave: 'triangle', freq: 659, duration: 0.12, gain: 0.16, delay: 0.1 },
      { wave: 'triangle', freq: 784, duration: 0.12, gain: 0.16, delay: 0.2 },
      { wave: 'triangle', freq: 1047, duration: 0.5, gain: 0.18, delay: 0.3, detune: 7 },
      { wave: 'sawtooth', freq: 523, duration: 0.5, gain: 0.06, delay: 0.3, filter: 1500, detune: 5 },
    ],
    reverb: 0.5,
  },
  // 상자: 삐걱(낮은 톱니파) + 반짝이는 두 음 + 은은한 소음
  chest: {
    parts: [
      { wave: 'sawtooth', freq: 90, freqEnd: 140, duration: 0.25, gain: 0.08, filter: 600 },
      { wave: 'sine', freq: 1568, duration: 0.18, gain: 0.12, delay: 0.1 },
      { wave: 'sine', freq: 2093, duration: 0.3, gain: 0.12, delay: 0.22 },
      { wave: 'noise', freq: 0, duration: 0.3, gain: 0.05, filter: 6000, filterType: 'highpass', delay: 0.1 },
    ],
    reverb: 0.4,
  },
  // 점프: 상승음 + 짧은 바람
  jump: {
    parts: [
      { wave: 'sine', freq: 300, freqEnd: 600, duration: 0.14, gain: 0.16 },
      { wave: 'noise', freq: 0, duration: 0.05, gain: 0.08, filter: 3000, filterType: 'highpass' },
    ],
    pitchJitter: 1,
  },
  // 회피: 바람 스윕 + 낮은 상승음
  dash: {
    parts: [
      { wave: 'noise', freq: 0, duration: 0.18, gain: 0.28, filter: 1200, filterType: 'bandpass', filterEnd: 3500 },
      { wave: 'sine', freq: 220, freqEnd: 440, duration: 0.1, gain: 0.08 },
    ],
    pitchJitter: 1,
  },
  // 보스 등장: 열리는 저음 톱니파(필터 스윕) + 우르릉 + 하강 저음, 긴 잔향
  bossAppear: {
    parts: [
      { wave: 'sawtooth', freq: 55, duration: 1.2, gain: 0.35, filter: 300, filterEnd: 1200, detune: 10, attack: 0.05 },
      { wave: 'noise', freq: 0, duration: 1.0, gain: 0.2, filter: 400, attack: 0.1 },
      { wave: 'sine', freq: 110, freqEnd: 55, duration: 0.8, gain: 0.3 },
    ],
    reverb: 0.6,
  },
  // 내려찍기: 서브 붐 + 왜곡 소음 + 거친 저음
  slam: {
    parts: [
      { wave: 'sine', freq: 90, freqEnd: 25, duration: 0.5, gain: 0.6 },
      { wave: 'noise', freq: 0, duration: 0.35, gain: 0.45, filter: 600, distortion: 0.5 },
      { wave: 'sawtooth', freq: 70, duration: 0.3, gain: 0.15, distortion: 0.6, filter: 500 },
    ],
    reverb: 0.4,
    pitchJitter: 1,
  },
  // 폭발(박격포): 붐 + 소음 스윕 왜곡
  boom: {
    parts: [
      { wave: 'sine', freq: 100, freqEnd: 30, duration: 0.4, gain: 0.5 },
      { wave: 'noise', freq: 0, duration: 0.45, gain: 0.4, filter: 2500, filterEnd: 200, distortion: 0.4 },
    ],
    reverb: 0.4,
    pitchJitter: 2,
    gainJitter: 0.15,
  },
  // 소환: 두꺼운 상승음 + 높은 꼬리 + 반짝 소음
  summon: {
    parts: [
      { wave: 'triangle', freq: 300, freqEnd: 900, duration: 0.35, gain: 0.15, detune: 12 },
      { wave: 'sine', freq: 900, freqEnd: 1800, duration: 0.3, gain: 0.08, delay: 0.1 },
      { wave: 'noise', freq: 0, duration: 0.3, gain: 0.08, filter: 4000, filterType: 'highpass' },
    ],
    reverb: 0.5,
  },
  // 승리: 팡파르 4음 + 받쳐 주는 화음
  clear: {
    parts: [
      { wave: 'triangle', freq: 523, duration: 0.15, gain: 0.18, detune: 7 },
      { wave: 'triangle', freq: 659, duration: 0.15, gain: 0.18, delay: 0.15, detune: 7 },
      { wave: 'triangle', freq: 784, duration: 0.15, gain: 0.18, delay: 0.3, detune: 7 },
      { wave: 'triangle', freq: 1047, duration: 0.7, gain: 0.2, delay: 0.45, detune: 7 },
      { wave: 'sawtooth', freq: 262, duration: 0.7, gain: 0.07, delay: 0.45, filter: 1500, detune: 6, attack: 0.05 },
      { wave: 'sawtooth', freq: 392, duration: 0.7, gain: 0.05, delay: 0.45, filter: 1500, detune: 6, attack: 0.05 },
    ],
    reverb: 0.5,
  },
  // 패배: 어두워지는 하강음 두 겹
  defeat: {
    parts: [
      { wave: 'sawtooth', freq: 330, freqEnd: 165, duration: 0.6, gain: 0.2, filter: 1200, filterEnd: 300 },
      { wave: 'sine', freq: 165, freqEnd: 82, duration: 0.8, gain: 0.25, delay: 0.3 },
    ],
    reverb: 0.5,
  },
  // 메뉴 클릭: 짧은 톡
  ui: {
    parts: [
      { wave: 'sine', freq: 700, duration: 0.05, gain: 0.12 },
      { wave: 'triangle', freq: 1400, duration: 0.03, gain: 0.06 },
    ],
    reverb: 0.1,
  },
};

/** 드럼 한 칸: 글자 조합. k = 킥, s = 스네어, h = 닫힌 하이햇, o = 열린 하이햇 (예: 'kh' = 킥+하이햇) */
export type DrumStep = string | null;

/** 음악 트랙: 4마디 반복 악절 */
export interface MusicTrack {
  /** 분당 박자 */
  bpm: number;
  /** 기준음 주파수(Hz). C3 ≈ 130.81, A2 = 110, G2 = 98 */
  root: number;
  /** 베이스 악절: 한 박자에 한 음, 반음 오프셋. null 은 쉼표 */
  bass: Array<number | null>;
  /** 멜로디 악절: 반 박자에 한 음 (베이스 길이의 2배) */
  melody: Array<number | null>;
  bassWave: OscillatorType;
  melodyWave: OscillatorType;
  /** 멜로디 음량 배율 */
  melodyGain: number;
  /** 멜로디 저역 통과 필터 차단(Hz). 적으면 신시사이저처럼 부드럽게 */
  melodyFilter?: number;
  /** 드럼 악절: 반 박자에 한 칸 (멜로디와 같은 길이). 없으면 드럼 없음 */
  drums?: DrumStep[];
  /** 패드 코드: 한 박자에 한 칸 (베이스와 같은 길이). 배열이면 그 박자에 새 코드 시작, null 이면 이전 코드가 이어진다 */
  chords?: Array<number[] | null>;
  padWave?: OscillatorType;
  /** 패드 음량 배율 (기본 1) */
  padGain?: number;
  /** 잔향으로 보내는 양 0~1 */
  reverb?: number;
}

/**
 * 음악 분위기(구역에 따라 같은 곡을 다르게 연주): 템포 배율, 드럼 켜기, 멜로디·패드 음량 배율.
 * 쉼터는 드럼 없이 느리고 조용하게, 매복·큰 전투는 빠르고 세게, 보스 문 앞(길)은 멜로디를 줄여 긴장감.
 */
export interface MusicMood {
  tempo: number;
  drums: boolean;
  melody: number;
  pad: number;
}
export const MUSIC_MOODS: Record<'normal' | 'calm' | 'tense' | 'battle', MusicMood> = {
  normal: { tempo: 1, drums: true, melody: 1, pad: 1 },
  calm: { tempo: 0.85, drums: false, melody: 0.7, pad: 1.15 },
  tense: { tempo: 1.0, drums: true, melody: 0.5, pad: 1.1 },
  battle: { tempo: 1.15, drums: true, melody: 1.15, pad: 0.9 },
};
/** 여정 구역 종류 → 분위기 (순수 함수, 테스트 대상) */
export function moodForZone(kind: string, cleared: boolean): keyof typeof MUSIC_MOODS {
  if (kind === 'rest' || kind === 'start' || kind === 'treasure') return 'calm';
  if (kind === 'ambush' || kind === 'arena' || kind === 'secret') return cleared ? 'normal' : 'battle';
  if (kind === 'path') return 'tense';
  return 'normal';
}

export type MusicName = 'menu' | 'forest' | 'cave' | 'fortress' | 'ice' | 'boss';
export const MUSIC_NAMES: MusicName[] = ['menu', 'forest', 'cave', 'fortress', 'ice', 'boss'];

const _ = null;

export const MUSIC: Record<MusicName, MusicTrack> = {
  // 메뉴: 느긋한 C 장조, 드럼 없이 패드 위주
  menu: {
    bpm: 84,
    root: 130.81,
    chords: [[0, 4, 7], _, _, _, [-3, 0, 4], _, _, _, [-7, -3, 0], _, _, _, [-5, -1, 2], _, _, _],
    bass: [0, _, 7, _, -3, _, 4, _, -7, _, 0, _, -5, _, 2, _],
    melody: [12, _, 16, _, 19, _, 16, _, 12, _, 14, _, 16, _, _, _, 17, _, 16, _, 14, _, 12, _, 11, _, _, _, 12, _, _, _],
    bassWave: 'triangle',
    melodyWave: 'sine',
    melodyGain: 0.6,
    padWave: 'triangle',
    padGain: 0.8,
    reverb: 0.45,
  },
  // 숲: 밝고 가벼운 C 장조 (C-F-G-Am), 가벼운 드럼
  forest: {
    bpm: 112,
    root: 130.81,
    chords: [[0, 4, 7], _, _, _, [0, 5, 9], _, _, _, [-1, 2, 7], _, _, _, [0, 4, 9], _, _, _],
    bass: [0, 0, 7, 0, 5, 5, 0, 5, 7, 7, 2, 7, 9, 9, 4, 9],
    melody: [12, 14, 16, _, 19, _, 16, _, 17, _, 16, 14, 12, _, _, _, 14, _, 16, _, 19, _, 14, _, 16, _, 12, _, _, _, _, _],
    drums: ['k', 'h', 's', 'h', 'k', 'h', 's', 'h', 'k', 'h', 's', 'h', 'k', 'h', 's', 'h', 'k', 'h', 's', 'h', 'k', 'h', 's', 'h', 'k', 'h', 's', 'h', 'k', 'k', 's', 's'],
    bassWave: 'triangle',
    melodyWave: 'square',
    melodyGain: 0.45,
    melodyFilter: 2400,
    padWave: 'triangle',
    padGain: 0.6,
    reverb: 0.3,
  },
  // 동굴: 느린 A 단조 (Am-F-Dm-Em), 드문 드럼, 긴 잔향
  cave: {
    bpm: 92,
    root: 110,
    chords: [[0, 3, 7], _, _, _, [-4, 0, 3], _, _, _, [5, 8, 12], _, _, _, [-5, -2, 2], _, _, _],
    bass: [0, _, 0, _, -4, _, -4, _, 5, _, 5, _, -5, _, -5, _],
    melody: [12, _, _, 15, _, 17, _, _, 15, _, 12, _, _, _, 10, _, 12, _, _, 15, _, 19, _, _, 17, _, 15, _, 12, _, _, _],
    drums: ['k', _, 'h', _, 's', _, 'h', _, 'k', _, 'h', _, 's', _, 'h', _, 'k', _, 'h', _, 's', _, 'h', _, 'k', _, 'h', _, 's', _, 's', 's'],
    bassWave: 'sine',
    melodyWave: 'triangle',
    melodyGain: 0.55,
    melodyFilter: 1800,
    padWave: 'triangle',
    padGain: 0.7,
    reverb: 0.55,
  },
  // 얼음 봉우리: 느린 D 단조 (Dm-Bb-F-C), 맑은 사인파 멜로디·종소리 같은 높은 음, 드럼은 성글게
  ice: {
    bpm: 88,
    root: 146.83,
    chords: [[0, 3, 7], _, _, _, [-4, 0, 3], _, _, _, [3, 7, 10], _, _, _, [-2, 2, 5], _, _, _],
    bass: [0, _, _, 0, -4, _, _, -4, 3, _, _, 3, -2, _, _, -2],
    melody: [12, _, 15, _, 19, _, _, _, 17, _, 15, _, 12, _, _, _, 10, _, 12, _, 15, _, _, _, 14, _, 12, _, 10, _, _, _],
    drums: ['k', _, _, _, 'h', _, _, _, 'k', _, _, _, 'h', _, _, _, 'k', _, _, _, 'h', _, _, _, 'k', _, 'h', _, 'h', _, _, _],
    bassWave: 'sine',
    melodyWave: 'sine',
    melodyGain: 0.6,
    melodyFilter: 2600,
    padWave: 'triangle',
    padGain: 0.8,
    reverb: 0.7,
  },
  // 요새: 빠른 G 단조 (Gm-Eb-F-D), 몰아치는 드럼, 톱니파
  fortress: {
    bpm: 132,
    root: 98,
    chords: [[0, 3, 7], _, _, _, [-4, 0, 3], _, _, _, [-2, 2, 5], _, _, _, [-5, -1, 2], _, _, _],
    bass: [0, 0, 12, 0, -4, -4, 8, -4, -2, -2, 10, -2, -5, -5, 7, -5],
    melody: [12, 12, _, 15, _, 12, _, 17, 15, _, 12, _, _, _, _, _, 10, 10, _, 12, _, 10, _, 8, 7, _, _, _, 10, _, 12, _],
    drums: ['k', 'h', 's', 'h', 'k', 'k', 's', 'h', 'k', 'h', 's', 'h', 'k', 'k', 's', 'h', 'k', 'h', 's', 'h', 'k', 'k', 's', 'h', 'k', 'h', 's', 'h', 's', 's', 's', 's'],
    bassWave: 'sawtooth',
    melodyWave: 'sawtooth',
    melodyGain: 0.4,
    melodyFilter: 2200,
    padWave: 'sawtooth',
    padGain: 0.35,
    reverb: 0.3,
  },
  // 보스: 빠르고 무거운 G 단조 (Gm-Cm-Gm-D), 더블 킥
  boss: {
    bpm: 150,
    root: 98,
    chords: [[0, 3, 7], _, _, _, [5, 8, 12], _, _, _, [0, 3, 7], _, _, _, [-5, -1, 2], _, _, _],
    bass: [0, 0, 0, 0, 5, 5, 5, 5, 0, 0, 0, 0, -5, -5, -3, -1],
    melody: [12, _, 12, 15, _, 12, 18, 17, 17, _, _, 15, _, 12, _, _, 12, _, 12, 15, _, 19, _, 17, 14, _, _, _, 15, _, 17, _],
    drums: ['k', 'k', 's', 'h', 'k', 'k', 's', 'h', 'k', 'k', 's', 'h', 'k', 'k', 's', 'h', 'k', 'k', 's', 'h', 'k', 'k', 's', 'h', 'k', 'k', 's', 's', 'k', 'k', 's', 's'],
    bassWave: 'sawtooth',
    melodyWave: 'sawtooth',
    melodyGain: 0.35,
    melodyFilter: 2600,
    padWave: 'sawtooth',
    padGain: 0.3,
    reverb: 0.3,
  },
};

/** 반음 오프셋 → 주파수 */
export function semitoneToFreq(root: number, semitone: number): number {
  return root * Math.pow(2, semitone / 12);
}

/** 코드 배열에서 i 번째 박자에 울리고 있는 코드와 그 코드가 몇 박자 이어지는지 (순수 함수, 테스트 대상) */
export function chordAt(chords: Array<number[] | null>, i: number): { notes: number[]; hold: number } | null {
  const n = chords.length;
  if (n === 0) return null;
  const idx = ((i % n) + n) % n;
  const notes = chords[idx];
  if (!notes) return null;
  let hold = 1;
  while (hold < n && chords[(idx + hold) % n] === null) hold++;
  return { notes, hold };
}
