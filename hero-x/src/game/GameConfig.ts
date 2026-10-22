/**
 * 게임 설정 데이터 (1단계)
 *
 * - 자주 바꾸는 수치는 모두 이 파일에서 관리한다. 값만 바꾸면 게임에 바로 반영된다.
 * - 핵심 로직 파일(Game.ts, PlayerController.ts 등)은 이 값을 읽기만 하고 직접 수정하지 않는다.
 * - 값의 허용 범위는 아래 CONFIG_LIMITS에 있다. 범위를 벗어나면 게임 시작 시 자동으로 보정된다.
 * - 5단계(설정 화면)에서는 이 값을 화면에서 바꾸고 저장하는 기능이 추가될 예정이다.
 */

/** 장애물 하나의 설정: 중심 위치(x, z), 가로(w), 세로(d), 높이(h), 색상 */
export interface ObstacleConfig {
  x: number;
  z: number;
  w: number;
  d: number;
  h: number;
  color?: string;
}

export interface GameConfigType {
  /** 게임 이름 정보 (제목 변경은 여기서) */
  meta: { title: string; subtitle: string; version: string };
  /** 키 설정: 물리 키 코드(e.code) 목록. 예) 'KeyW', 'ArrowUp' */
  controls: {
    up: string[];
    down: string[];
    left: string[];
    right: string[];
    toggleGuide: string[];
  };
  /** 플레이어 */
  player: {
    /** 이동 속도 (유닛/초) */
    moveSpeed: number;
    /** 몸을 돌리는 속도 (클수록 빠르게 회전) */
    turnSpeed: number;
    /** 충돌 반지름 */
    radius: number;
    /** 시작 위치 */
    startPosition: { x: number; z: number };
    /** 임시 모델 색상 */
    colors: { body: string; accent: string; skin: string; visor: string };
  };
  /** 카메라 (3인칭, 위에서 비스듬히 따라오는 던전 탐험 시점) */
  camera: {
    fov: number;
    /** 플레이어 기준 카메라 위치 (y: 높이, z: 뒤쪽 거리) */
    offset: { x: number; y: number; z: number };
    /** 카메라가 바라보는 지점의 높이 */
    lookAtHeight: number;
    /** 따라오는 부드러움 (클수록 빨리 따라붙음) */
    smoothing: number;
    near: number;
    far: number;
  };
  /** 전투 공간(던전) */
  world: {
    /** 이동 가능한 정사각형 영역의 절반 크기 */
    arenaHalfSize: number;
    floorColor: string;
    floorAltColor: string;
    wallHeight: number;
    wallColor: string;
    backgroundColor: string;
    fogNear: number;
    fogFar: number;
    /** 장애물 목록. 자유롭게 추가·삭제할 수 있다. */
    obstacles: ObstacleConfig[];
  };
  /** 그래픽 */
  graphics: {
    shadows: boolean;
    maxPixelRatio: number;
    antialias: boolean;
    shadowMapSize: number;
  };
  /** 디버그 */
  debug: {
    /** 화면 아래에 FPS 표시 */
    showFps: boolean;
  };
}

export const GameConfig: GameConfigType = {
  meta: { title: 'HERO X', subtitle: '모험의 던전', version: '0.1.0' },

  controls: {
    up: ['KeyW', 'ArrowUp'],
    down: ['KeyS', 'ArrowDown'],
    left: ['KeyA', 'ArrowLeft'],
    right: ['KeyD', 'ArrowRight'],
    toggleGuide: ['KeyH'],
  },

  player: {
    moveSpeed: 7,
    turnSpeed: 14,
    radius: 0.5,
    startPosition: { x: 0, z: 0 },
    colors: { body: '#2f6df6', accent: '#ffc531', skin: '#f3c6a0', visor: '#5cf2d8' },
  },

  camera: {
    fov: 50,
    offset: { x: 0, y: 13, z: 11 },
    lookAtHeight: 1.0,
    smoothing: 6,
    near: 0.1,
    far: 300,
  },

  world: {
    arenaHalfSize: 28,
    floorColor: '#79b85a',
    floorAltColor: '#6fae50',
    wallHeight: 1.2,
    wallColor: '#a6773f',
    backgroundColor: '#8ec9ff',
    fogNear: 40,
    fogFar: 90,
    obstacles: [
      // 나무 상자 무리
      { x: 6, z: -4, w: 2, d: 2, h: 2, color: '#d9a066' },
      { x: 8.2, z: -4, w: 2, d: 2, h: 2, color: '#d9a066' },
      { x: 7, z: -6.2, w: 2, d: 2, h: 1.4, color: '#e0ad6c' },
      // 돌기둥
      { x: -8, z: -8, w: 1.2, d: 1.2, h: 4, color: '#9aa3b2' },
      { x: -8, z: 8, w: 1.2, d: 1.2, h: 4, color: '#9aa3b2' },
      { x: 8, z: 8, w: 1.2, d: 1.2, h: 4, color: '#9aa3b2' },
      // 긴 담장
      { x: 0, z: -14, w: 10, d: 1, h: 1.6, color: '#a6773f' },
      { x: -16, z: 2, w: 1, d: 8, h: 1.6, color: '#a6773f' },
      // 큰 바위
      { x: 14, z: 14, w: 3, d: 3, h: 2.5, color: '#7f8795' },
      { x: -14, z: -16, w: 2.5, d: 2.5, h: 2, color: '#7f8795' },
    ],
  },

  graphics: {
    shadows: true,
    maxPixelRatio: 2,
    antialias: true,
    shadowMapSize: 2048,
  },

  debug: {
    showFps: true,
  },
};

/** 설정값 허용 범위. 범위를 벗어나면 sanitizeGameConfig()가 자동으로 보정한다. */
export const CONFIG_LIMITS: Record<string, { min: number; max: number }> = {
  'player.moveSpeed': { min: 1, max: 30 },
  'player.turnSpeed': { min: 1, max: 40 },
  'player.radius': { min: 0.2, max: 2 },
  'camera.fov': { min: 30, max: 90 },
  'camera.offset.y': { min: 3, max: 40 },
  'camera.offset.z': { min: 0, max: 40 },
  'camera.smoothing': { min: 0.5, max: 30 },
  'world.arenaHalfSize': { min: 10, max: 200 },
  'graphics.maxPixelRatio': { min: 1, max: 3 },
};

/** 보정된 항목 기록 */
export interface ConfigWarning {
  path: string;
  from: number;
  to: number;
}

/**
 * 설정값을 허용 범위 안으로 보정한다.
 * 숫자가 아니거나 범위를 벗어난 값은 가장 가까운 허용값으로 바꾸고, 바꾼 항목 목록을 돌려준다.
 */
export function sanitizeGameConfig(config: GameConfigType): ConfigWarning[] {
  const warnings: ConfigWarning[] = [];
  for (const [path, { min, max }] of Object.entries(CONFIG_LIMITS)) {
    const keys = path.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let obj: any = config;
    for (let i = 0; i < keys.length - 1; i++) obj = obj?.[keys[i]];
    const last = keys[keys.length - 1];
    if (!obj || typeof obj !== 'object') continue;
    const value = obj[last];
    const fixed = typeof value === 'number' && !Number.isNaN(value) ? Math.min(max, Math.max(min, value)) : min;
    if (fixed !== value) {
      obj[last] = fixed;
      warnings.push({ path, from: typeof value === 'number' ? value : NaN, to: fixed });
    }
  }
  return warnings;
}
