/**
 * 인트로 연출 시간표 (순수 함수, 테스트 대상)
 * - 실시간 t(초)에 따라 카메라 위치·바라볼 점·시야각(fov, 줌), 시간 배율(슬로 모션), 주인공 행동(걷기·공격·회피), 자막을 돌려준다.
 * - 좌표는 주인공 위치 기준 세계 축: 몬스터는 -Z 쪽에서 몰려오고 카메라는 주로 +Z(뒤) 쪽에 있다.
 * - 장면: 교실(앞쪽에서 주인공과 칠판으로 줌 인) → 몬스터 난입(낮은 옆 앵글) → 전투(주위를 도는 카메라, 처치 때 줌 펀치) → 슬로 모션 얼굴 클로즈업 → 마무리(줌 아웃 + 제목)
 * - 주인공은 (0, 3) 책상 앞에서 +Z(칠판)를 보고 있다. 몬스터는 -Z 에서 온다. 교실 세트는 IntroSet 이 만든다.
 */
export interface HeroPose {
  x: number;
  z: number;
}

export type IntroShot = 'establish' | 'approach' | 'fight' | 'slowmo' | 'finale' | 'done';

export interface IntroFrame {
  shot: IntroShot;
  /** 카메라 위치(세계 좌표) */
  cam: { x: number; y: number; z: number };
  /** 카메라가 바라볼 점 */
  look: { x: number; y: number; z: number };
  /** 시야각(도). 작을수록 줌 인 */
  fov: number;
  /** 게임 시간 배율 (1 = 보통, 0.25 = 슬로 모션) */
  timeScale: number;
  /** 주인공이 앞(-Z)으로 걷는지 */
  walk: boolean;
  /** 적이 가까우면 공격해도 되는지 */
  attack: boolean;
  /** 이 순간 회피를 발동할지 (슬로 모션 시작) */
  dodge: boolean;
  /** 제목 표시 */
  title: boolean;
  /** 자막 (없으면 빈 문자열) */
  caption: string;
}

/** 각 장면이 끝나는 시각(초) */
export const INTRO_TIMES = { establish: 3, approach: 6.5, fight: 11, slowmo: 13, finale: 16 } as const;
export const INTRO_DURATION = INTRO_TIMES.finale;
/** 몬스터가 등장하는 시각(초) */
export const INTRO_SPAWN_AT = INTRO_TIMES.establish;
/** 인트로 무대 중심(숲 여정의 첫 공터 안). 주인공은 여기서 책상을 보고(-Z) 서 있다 */
export const INTRO_ORIGIN = { x: 0, z: 55 };
/** 인트로에서 주인공과 싸울 몬스터 배치 (INTRO_ORIGIN 기준 상대 좌표, -Z 쪽에서 온다) */
export const INTRO_SPAWNS: Array<{ type: string; x: number; z: number }> = [
  { type: 'rusher', x: -3, z: -11 },
  { type: 'rusher', x: 3, z: -11 },
  { type: 'rusher', x: 0, z: -13 },
  { type: 'shooter', x: -5, z: -14 },
  { type: 'tank', x: 5, z: -14 },
];
/** 인트로 몬스터 체력 배율 (한두 대에 쓰러져 시원하게) */
export const INTRO_ENEMY_HP = 0.35;

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const smooth = (k: number) => k * k * (3 - 2 * k);
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

export function introAt(t: number, hero: HeroPose, punch = 0, school = '초등학교'): IntroFrame {
  const T = INTRO_TIMES;
  const base: IntroFrame = {
    shot: 'done',
    cam: { x: hero.x, y: 13, z: hero.z + 11 },
    look: { x: hero.x, y: 1, z: hero.z },
    fov: 50,
    timeScale: 1,
    walk: false,
    attack: false,
    dodge: false,
    title: false,
    caption: '',
  };
  if (t < T.establish) {
    // 1. 교실: 앞쪽(-Z) 위에서 공부하는 주인공과 뒤의 칠판으로 줌 인
    const k = smooth(clamp01(t / T.establish));
    return {
      ...base,
      shot: 'establish',
      cam: { x: hero.x + lerp(-3, -1.2, k), y: lerp(9, 3.2, k), z: hero.z - lerp(13, 6.5, k) },
      look: { x: hero.x, y: lerp(1.2, 1.5, k), z: hero.z + 1.5 },
      fov: lerp(52, 38, k),
      title: t > 0.6,
      caption: t > 1.0 ? `${school} 3학년 교실, 조용한 수학 시간` : '',
    };
  }
  if (t < T.approach) {
    // 2. 접근: 낮은 옆 앵글, 주인공은 앞으로 걷고 몬스터가 몰려온다
    return {
      ...base,
      shot: 'approach',
      cam: { x: hero.x + 3.5, y: 1.6, z: hero.z + 4.5 },
      look: { x: hero.x, y: 1.2, z: hero.z - 2.5 },
      fov: 46,
      walk: t < 5.0,
      caption: '갑자기 몬스터들이 교실로 들이닥쳤다!',
    };
  }
  if (t < T.fight) {
    // 3. 전투: 카메라가 주인공 주위를 돌고, 처치 때 줌 펀치(punch)
    const k = clamp01((t - T.approach) / (T.fight - T.approach));
    const ang = lerp(-0.45, 0.75, k);
    const r = 5.5;
    return {
      ...base,
      shot: 'fight',
      cam: { x: hero.x + Math.sin(ang) * r, y: 2.8, z: hero.z + Math.cos(ang) * r },
      look: { x: hero.x, y: 1.1, z: hero.z },
      fov: 44 - 7 * clamp01(punch),
      attack: true,
    };
  }
  if (t < T.slowmo) {
    // 4. 슬로 모션: 앞쪽 옆에서 얼굴 클로즈업, 회피로 파고든다
    const k = clamp01((t - T.fight) / (T.slowmo - T.fight));
    return {
      ...base,
      shot: 'slowmo',
      // 몸 안으로 파고들지 않게 2.3 유닛쯤 떨어진 앞쪽 옆에서 (주인공 키 1.9)
      cam: { x: hero.x + 2.4, y: 2.1, z: hero.z - 3.6 },
      look: { x: hero.x, y: 1.3, z: hero.z },
      fov: lerp(34, 30, k),
      timeScale: 0.25,
      attack: true,
      dodge: t < T.fight + 0.3,
      caption: '소년은 검을 들었다',
    };
  }
  if (t < T.finale) {
    // 5. 마무리: 뒤로 빠지며 줌 아웃, 제목과 안내
    const k = smooth(clamp01((t - T.slowmo) / (T.finale - T.slowmo)));
    return {
      ...base,
      shot: 'finale',
      cam: { x: hero.x, y: lerp(5, 13, k), z: hero.z + lerp(7, 15, k) },
      look: { x: hero.x, y: 1, z: hero.z },
      fov: lerp(42, 56, k),
      attack: true,
      title: t > T.slowmo + 0.5,
      caption: t > T.slowmo + 0.5 ? '모험을 시작하세요' : '',
    };
  }
  return base;
}
