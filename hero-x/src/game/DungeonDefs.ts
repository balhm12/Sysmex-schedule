import { GameConfig, type EnemySpawnConfig, type GameConfigType, type ObstacleConfig } from './GameConfig';

/**
 * 던전 정의 (6단계: 콘텐츠 확장)
 * - 던전 하나 = 공간(크기·색·장애물) + 보물 상자 + 적 배치 + 보스 설정 + 보상 배율 + 해금 조건.
 * - 첫 던전 '잊혀진 숲'은 GameConfig 의 world/dungeon/enemies.spawns/boss 를 그대로 쓴다 (기존 설정·테스트 유지).
 * - 새 던전을 추가하려면 DUNGEONS 배열에 항목을 더하면 된다. tests/dungeons.test.ts 가 배치(겹침·영역)를 검사한다.
 * - 보스는 GameConfig.boss 를 기본으로 두고 던전마다 다른 값만 덮어쓴다 (resolveBossConfig).
 */
export type BossConfig = GameConfigType['boss'];

/** 보스 덮어쓰기: 1단계 필드는 자유롭게, 중첩 객체(windup/charge/slam/barrage/reward)는 통째로 교체 */
export type BossOverride = Partial<Omit<BossConfig, 'windup' | 'charge' | 'slam' | 'barrage' | 'summon' | 'mortar' | 'reward'>> & {
  windup?: Partial<BossConfig['windup']>;
  charge?: Partial<BossConfig['charge']>;
  slam?: Partial<BossConfig['slam']>;
  barrage?: Partial<BossConfig['barrage']>;
  summon?: Partial<BossConfig['summon']>;
  mortar?: Partial<BossConfig['mortar']>;
  reward?: Partial<BossConfig['reward']>;
};

export interface DungeonTheme {
  backgroundColor: string;
  fogNear: number;
  fogFar: number;
  floorColor: string;
  floorAltColor: string;
  /** 바닥 위 작은 점(풀·수정 조각 등) 색 2가지 */
  floorFlecks: [string, string];
  wallColor: string;
  wallHeight: number;
  /** 반구광 하늘/바닥 색과 태양광 색·세기 */
  skyColor: string;
  groundColor: string;
  sunColor: string;
  sunIntensity: number;
  /** 물리 기반 하늘(태양 포함). 없으면 단색 배경 */
  sky?: { elevation: number; azimuth: number; turbidity: number; rayleigh: number };
  /** 톤매핑 노출 (1 = 기본, 어두운 던전은 낮게) */
  exposure: number;
  /** 바닥 요철 세기·노이즈 축척 */
  groundBump: number;
  groundScale: number;
  /** 바닥 재질 거칠기 */
  groundRoughness: number;
}

export interface DungeonDef {
  id: string;
  name: string;
  /** 한 줄 소개 (던전 선택 화면) */
  subtitle: string;
  /** 권장 레벨 (안내용) */
  recommendedLevel: number;
  /** 이 던전을 클리어해야 열린다 (없으면 처음부터 열림) */
  requiresClear?: string;
  arenaHalfSize: number;
  theme: DungeonTheme;
  obstacles: ObstacleConfig[];
  chests: Array<{ x: number; z: number }>;
  spawns: EnemySpawnConfig[];
  boss: BossOverride;
  /** 적 처치 보상 배율 (골드·경험치) */
  rewardMul: { gold: number; xp: number };
}

const forestTheme: DungeonTheme = {
  backgroundColor: GameConfig.world.backgroundColor,
  fogNear: GameConfig.world.fogNear,
  fogFar: GameConfig.world.fogFar,
  floorColor: GameConfig.world.floorColor,
  floorAltColor: GameConfig.world.floorAltColor,
  floorFlecks: ['#8bd268', '#66ad48'],
  wallColor: GameConfig.world.wallColor,
  wallHeight: GameConfig.world.wallHeight,
  skyColor: '#dcefff',
  groundColor: '#5f8f3a',
  sunColor: '#fff4de',
  sunIntensity: 2.6,
  sky: { elevation: 32, azimuth: 160, turbidity: 6, rayleigh: 1.6 },
  exposure: 1.0,
  groundBump: 3.2,
  groundScale: 4,
  groundRoughness: 0.95,
};

export const DUNGEONS: DungeonDef[] = [
  {
    id: 'forest',
    name: GameConfig.dungeon.name,
    subtitle: '햇살이 드는 숲. 로봇 3종과 숲의 수호 로봇.',
    recommendedLevel: 1,
    arenaHalfSize: GameConfig.world.arenaHalfSize,
    theme: forestTheme,
    obstacles: GameConfig.world.obstacles,
    chests: GameConfig.dungeon.chests,
    spawns: GameConfig.enemies.spawns,
    boss: {},
    rewardMul: { gold: 1, xp: 1 },
  },
  {
    id: 'cave',
    name: '수정 동굴',
    subtitle: '어둡고 좁은 동굴. 빠른 동굴 박쥐이 떼로 덤빈다.',
    recommendedLevel: 4,
    requiresClear: 'forest',
    arenaHalfSize: 24,
    theme: {
      backgroundColor: '#161a33',
      fogNear: 16,
      fogFar: 52,
      floorColor: '#3b4070',
      floorAltColor: '#343a64',
      floorFlecks: ['#7fe3ff', '#b48cff'],
      wallColor: '#4a3f7a',
      wallHeight: 2.4,
      skyColor: '#6f7fd6',
      groundColor: '#1f2340',
      sunColor: '#c9d6ff',
      sunIntensity: 1.3,
      exposure: 0.9,
      groundBump: 3.2,
      groundScale: 5,
      groundRoughness: 0.75,
    },
    obstacles: [
      // 수정 기둥
      { x: 7, z: -7, w: 1.4, d: 1.4, h: 5, color: '#8fe8ff' },
      { x: -9, z: -5, w: 1.6, d: 1.6, h: 6, color: '#c7a2ff' },
      { x: 10, z: 8, w: 1.4, d: 1.4, h: 4.5, color: '#8fe8ff' },
      { x: -11, z: 10, w: 1.8, d: 1.8, h: 5.5, color: '#c7a2ff' },
      { x: 2, z: 14, w: 1.2, d: 1.2, h: 4, color: '#8fe8ff' },
      // 바위 무리
      { x: -4, z: -14, w: 4, d: 2.2, h: 2.2, color: '#5a5f8c' },
      { x: 16, z: -2, w: 2.6, d: 4, h: 2.6, color: '#5a5f8c' },
      { x: -17, z: 2, w: 2.4, d: 5, h: 2.4, color: '#5a5f8c' },
      { x: 6, z: 19, w: 5, d: 2, h: 2, color: '#5a5f8c' },
      // 종유석 벽
      { x: 0, z: -9, w: 7, d: 1, h: 3, color: '#4a3f7a' },
      { x: 14, z: 16, w: 1, d: 7, h: 3, color: '#4a3f7a' },
    ],
    chests: [
      { x: -19, z: -16 },
      { x: 19, z: 12 },
      { x: -2, z: 20 },
    ],
    spawns: [
      { type: 'stalker', x: 9, z: -13 },
      { type: 'stalker', x: -13, z: -11 },
      { type: 'stalker', x: 15, z: 5 },
      { type: 'stalker', x: -15, z: 14 },
      { type: 'stalker', x: 4, z: 9 },
      { type: 'stalker', x: -7, z: 16 },
      { type: 'shooter', x: 18, z: -10 },
      { type: 'shooter', x: -18, z: -6 },
      { type: 'shooter', x: 17, z: 18 },
      { type: 'shooter', x: -12, z: 19 },
      { type: 'rusher', x: 12, z: 0 },
      { type: 'rusher', x: -8, z: 7 },
      { type: 'rusher', x: 0, z: -17 },
      { type: 'tank', x: -1, z: 18 },
    ],
    boss: {
      name: '수정 골렘',
      hp: 650,
      color: '#8f6cff',
      speed: 2.6,
      radius: 1.8,
      score: 500,
      spawn: { x: 0, z: -17 },
      contactDamage: 24,
      model: 'golem',
      // 돌진 대신 동굴 박쥐을 소환한다. 느리지만 내려찍기가 넓다
      useCharge: false,
      closePatterns: ['slam', 'summon', 'barrage'],
      engageRange: 9,
      windup: { slam: 0.9, barrage: 0.7, summon: 1.0 },
      slam: { radius: 5.5, damage: 30 },
      barrage: { count: 10, phase2Count: 14, damage: 11, speed: 9.5 },
      summon: { type: 'stalker', count: 2, phase2Count: 3, maxAlive: 4 },
      phase2SpeedMul: 1.4,
      reward: { goldMin: 150, goldMax: 240, xp: 220, equipMinRarity: 'rare' },
    },
    rewardMul: { gold: 1.3, xp: 1.3 },
  },
  {
    id: 'fortress',
    name: '강철 요새',
    subtitle: '붉은 강철 요새. 트롤 거인과 포대가 길목을 지킨다.',
    recommendedLevel: 8,
    requiresClear: 'cave',
    arenaHalfSize: 30,
    theme: {
      backgroundColor: '#2b2d33',
      fogNear: 30,
      fogFar: 84,
      floorColor: '#5c6069',
      floorAltColor: '#54585f',
      floorFlecks: ['#7b808a', '#b0392f'],
      wallColor: '#7a2b2b',
      wallHeight: 2.8,
      skyColor: '#b9bcc6',
      groundColor: '#3a3c44',
      sunColor: '#ffd9c7',
      sunIntensity: 3.2,
      sky: { elevation: 18, azimuth: 220, turbidity: 12, rayleigh: 0.6 },
      exposure: 1.1,
      groundBump: 1.6,
      groundScale: 9,
      groundRoughness: 0.55,
    },
    obstacles: [
      // 중앙 격벽
      { x: 0, z: -8, w: 12, d: 1.2, h: 3, color: '#7a2b2b' },
      { x: 0, z: 8, w: 12, d: 1.2, h: 3, color: '#7a2b2b' },
      { x: -12, z: 0, w: 1.2, d: 10, h: 3, color: '#7a2b2b' },
      { x: 12, z: 0, w: 1.2, d: 10, h: 3, color: '#7a2b2b' },
      // 포탑 받침
      { x: -20, z: -20, w: 3, d: 3, h: 2, color: '#8d9099' },
      { x: 20, z: -20, w: 3, d: 3, h: 2, color: '#8d9099' },
      { x: -20, z: 20, w: 3, d: 3, h: 2, color: '#8d9099' },
      { x: 20, z: 20, w: 3, d: 3, h: 2, color: '#8d9099' },
      // 컨테이너
      { x: 18, z: 4, w: 4, d: 2, h: 2.4, color: '#b0392f' },
      { x: -18, z: -4, w: 4, d: 2, h: 2.4, color: '#b0392f' },
      { x: 6, z: 20, w: 2, d: 4, h: 2.4, color: '#c9a227' },
      { x: -6, z: -20, w: 2, d: 4, h: 2.4, color: '#c9a227' },
    ],
    chests: [
      { x: -26, z: 0 },
      { x: 26, z: 0 },
      { x: 0, z: 26 },
      { x: 0, z: -26 },
    ],
    spawns: [
      { type: 'tank', x: 0, z: -14 },
      { type: 'tank', x: 0, z: 14 },
      { type: 'tank', x: -16, z: 0 },
      { type: 'tank', x: 16, z: 0 },
      { type: 'artillery', x: -20, z: -16 },
      { type: 'artillery', x: 20, z: -16 },
      { type: 'artillery', x: -20, z: 16 },
      { type: 'artillery', x: 20, z: 16 },
      { type: 'shooter', x: 24, z: -6 },
      { type: 'shooter', x: -24, z: 6 },
      { type: 'shooter', x: 8, z: 24 },
      { type: 'rusher', x: -8, z: -12 },
      { type: 'rusher', x: 8, z: 12 },
      { type: 'rusher', x: 22, z: 10 },
      { type: 'rusher', x: -22, z: -10 },
      { type: 'stalker', x: 10, z: -24 },
      { type: 'stalker', x: -10, z: 24 },
      { type: 'stalker', x: 26, z: 24 },
    ],
    boss: {
      name: '요새 사령관',
      hp: 900,
      color: '#c0392b',
      speed: 3.2,
      radius: 1.7,
      score: 800,
      spawn: { x: 0, z: -22 },
      contactDamage: 28,
      model: 'commander',
      // 포격을 플레이어 자리에 떨어뜨린다 (예고 원이 보이면 자리를 옮기거나 점프)
      closePatterns: ['mortar', 'barrage', 'slam', 'mortar'],
      windup: { charge: 0.65, slam: 0.6, barrage: 0.5, mortar: 0.7 },
      mortar: { count: 4, phase2Count: 6, delay: 1.0, radius: 2.6, damage: 22, spread: 4 },
      charge: { speed: 21 },
      slam: { radius: 5, damage: 34 },
      barrage: { count: 12, phase2Count: 18, damage: 12, speed: 11 },
      reward: { goldMin: 250, goldMax: 400, xp: 400, equipMinRarity: 'epic' },
    },
    rewardMul: { gold: 1.6, xp: 1.6 },
  },
];

export function getDungeon(id: string): DungeonDef | undefined {
  return DUNGEONS.find((d) => d.id === id);
}

/** 던전별 클리어 횟수로 해금 여부 판단 */
export function isDungeonUnlocked(def: DungeonDef, dungeonClears: Record<string, number>): boolean {
  return !def.requiresClear || (dungeonClears[def.requiresClear] ?? 0) > 0;
}

/** 이 던전을 클리어하면 열리는 던전 (없으면 null) */
export function nextDungeonAfter(id: string): DungeonDef | null {
  return DUNGEONS.find((d) => d.requiresClear === id) ?? null;
}

/** GameConfig.boss 위에 던전별 값을 덮어쓴 보스 설정 */
export function resolveBossConfig(def: DungeonDef): BossConfig {
  const base = GameConfig.boss;
  const o = def.boss;
  return {
    ...base,
    ...o,
    spawn: { ...base.spawn, ...(o.spawn ?? {}) },
    windup: { ...base.windup, ...(o.windup ?? {}) },
    charge: { ...base.charge, ...(o.charge ?? {}) },
    slam: { ...base.slam, ...(o.slam ?? {}) },
    barrage: { ...base.barrage, ...(o.barrage ?? {}) },
    summon: { ...base.summon, ...(o.summon ?? {}) },
    mortar: { ...base.mortar, ...(o.mortar ?? {}) },
    reward: { ...base.reward, ...(o.reward ?? {}) },
  };
}
