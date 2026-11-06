import type { JourneyDef } from '../dungeon/journey';
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
  /** 처음부터 배치되는 적 (여정 던전은 비우고 journey 의 구역 파도로 등장) */
  spawns: EnemySpawnConfig[];
  boss: BossOverride;
  /** 적 처치 보상 배율 (골드·경험치) */
  rewardMul: { gold: number; xp: number };
  /** 여정형 구조(구역·통로·문). 있으면 정사각 경기장 대신 이 길을 따라 진행한다 */
  journey?: JourneyDef;
  /** 플레이어 시작 위치 (없으면 GameConfig.player.startPosition) */
  start?: { x: number; z: number };
}

/**
 * 잊혀진 숲 여정 (목표 플레이 10~15분)
 * 출발 → 첫 전투 → 좁은 숲길(박쥐 매복) → 둘째 전투 → [서쪽 보물방] → 갈림길(봉쇄 문) → [동쪽 비밀 방: 미니 보스+희귀 상자]
 * → 매복 광장(증원) → 휴식(상자·회복) → 대전투 광장(증원) → 봉쇄 문 → 보스.
 * 좌표: 남쪽(+Z)에서 출발해 북쪽(-Z)으로. 벽은 journey.ts 가 격자로 만든다.
 */
export const FOREST_JOURNEY: JourneyDef = {
  halfX: 36,
  halfZ: 104,
  cell: 2,
  wallHeight: 2.4,
  start: { x: 0, z: 90 },
  bossZone: 'boss',
  zones: [
    { id: 'start', name: '숲 입구', kind: 'start', rect: { x: 0, z: 88, w: 16, d: 16 }, mainIndex: 0, objective: '북쪽 숲길로 나아가자 (빛 기둥을 따라가세요)' },
    {
      id: 'fight1', name: '첫 번째 공터', kind: 'fight', rect: { x: 0, z: 52, w: 24, d: 24 }, mainIndex: 1, objective: '고블린을 모두 물리쳐라',
      waves: [{ when: 'enter', spawns: [{ type: 'rusher', x: -6, z: 56 }, { type: 'rusher', x: 6, z: 56 }, { type: 'rusher', x: -4, z: 46 }, { type: 'rusher', x: 5, z: 45 }] }],
    },
    {
      id: 'path1', name: '좁은 숲길', kind: 'path', rect: { x: -24, z: 24, w: 8, d: 16 }, mainIndex: 2, objective: '좁은 숲길을 지나라 — 박쥐를 조심!',
      waves: [{ when: 'enter', spawns: [{ type: 'stalker', x: -24, z: 20 }, { type: 'stalker', x: -24, z: 28 }] }],
    },
    {
      id: 'fight2', name: '두 번째 공터', kind: 'fight', rect: { x: -20, z: 4, w: 26, d: 24 }, mainIndex: 3, objective: '고블린과 마법사를 물리쳐라',
      waves: [{ when: 'enter', spawns: [{ type: 'rusher', x: -28, z: 10 }, { type: 'rusher', x: -12, z: 10 }, { type: 'rusher', x: -26, z: -2 }, { type: 'rusher', x: -14, z: -3 }, { type: 'rusher', x: -20, z: 2 }, { type: 'shooter', x: -20, z: 12 }, { type: 'slime', x: -20, z: 12 }, { type: 'archer', x: -30, z: -4 }] }],
    },
    {
      id: 'treasure', name: '숨은 보물 터', kind: 'treasure', rect: { x: -24, z: -18, w: 14, d: 12 }, objective: '보물 상자를 열어라',
      waves: [{ when: 'enter', spawns: [{ type: 'rusher', x: -27, z: -20 }, { type: 'rusher', x: -21, z: -16 }] }],
    },
    {
      id: 'junction', name: '갈림길', kind: 'branch', rect: { x: 20, z: 4, w: 10, d: 12 }, mainIndex: 4, objective: '갈림길의 적을 물리치면 북쪽 문이 열린다 (동쪽에도 길이…)',
      waves: [{ when: 'enter', spawns: [{ type: 'rusher', x: 20, z: 8 }, { type: 'rusher', x: 20, z: 0 }, { type: 'shooter', x: 22, z: 4 }, { type: 'archer', x: 23, z: 8 }] }],
    },
    {
      id: 'secret', name: '거인의 은신처', kind: 'secret', rect: { x: 30, z: 16, w: 12, d: 14 }, objective: '숲의 거인 대장을 물리쳐라 (희귀 상자)',
      waves: [{ when: 'enter', spawns: [{ type: 'tank', x: 30, z: 18, elite: 2.2, name: '숲의 거인 대장' }, { type: 'rusher', x: 26, z: 12 }, { type: 'rusher', x: 34, z: 12 }] }],
    },
    {
      id: 'ambush', name: '매복 광장', kind: 'ambush', rect: { x: 14, z: -22, w: 24, d: 16 }, mainIndex: 5, objective: '매복이다! 모두 물리쳐라',
      waves: [
        { when: 'enter', spawns: [{ type: 'stalker', x: 4, z: -16 }, { type: 'stalker', x: 24, z: -16 }, { type: 'stalker', x: 4, z: -28 }, { type: 'stalker', x: 24, z: -28 }, { type: 'rusher', x: 8, z: -26 }, { type: 'rusher', x: 20, z: -26 }, { type: 'charger', x: 14, z: -27 }] },
        { when: 'half', spawns: [{ type: 'stalker', x: 14, z: -16 }, { type: 'stalker', x: 14, z: -28 }] },
      ],
    },
    { id: 'rest', name: '쉼터', kind: 'rest', rect: { x: 0, z: -44, w: 14, d: 12 }, mainIndex: 6, objective: '잠시 쉬어가자 — 상자와 회복 아이템' },
    {
      id: 'arena', name: '큰 전투 광장', kind: 'arena', rect: { x: 0, z: -70, w: 34, d: 24 }, mainIndex: 7, objective: '큰 전투! 모두 물리치면 보스의 문이 열린다',
      waves: [
        { when: 'enter', spawns: [{ type: 'rusher', x: -12, z: -64 }, { type: 'rusher', x: 12, z: -64 }, { type: 'rusher', x: -8, z: -76 }, { type: 'rusher', x: 8, z: -76 }, { type: 'rusher', x: -14, z: -72 }, { type: 'shooter', x: -10, z: -60 }, { type: 'shooter', x: 10, z: -60 }, { type: 'tank', x: 0, z: -74 }, { type: 'archer', x: -14, z: -78 }, { type: 'charger', x: 14, z: -78 }, { type: 'slime', x: 0, z: -62 }] },
        { when: 'half', spawns: [{ type: 'rusher', x: -6, z: -62 }, { type: 'rusher', x: 6, z: -62 }, { type: 'rusher', x: 0, z: -80 }, { type: 'shooter', x: 0, z: -66 }, { type: 'slime', x: 0, z: -78 }] },
      ],
    },
    { id: 'boss', name: '수호 로봇의 터', kind: 'boss', rect: { x: 0, z: -97, w: 30, d: 14 }, mainIndex: 8, objective: '보스를 쓰러뜨려라!' },
  ],
  corridors: [
    { x: 0, z: 72, w: 8, d: 16 },
    { x: -12, z: 36, w: 28, d: 8 },
    { x: -24, z: -10, w: 6, d: 4 },
    { x: 4, z: 4, w: 22, d: 8 },
    { x: 30, z: 4, w: 10, d: 6 },
    { x: 30, z: 8, w: 6, d: 6 },
    { x: 20, z: -8, w: 8, d: 12 },
    { x: 4, z: -34, w: 8, d: 8 },
    { x: 0, z: -54, w: 8, d: 8 },
    { x: 0, z: -86, w: 8, d: 8 },
  ],
  gates: [
    { id: 'gate-north', rect: { x: 20, z: -8, w: 8, d: 1.2 }, opensWhenCleared: 'junction' },
    { id: 'gate-boss', rect: { x: 0, z: -86, w: 8, d: 1.2 }, opensWhenCleared: 'arena' },
  ],
};

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


/**
 * 수정 동굴 여정 (목표 10분+): 동굴 입구 → 좁은 틈(박쥐 매복) → 수정 광장 → [서쪽 지하 호수: 보물] → 종유석 회랑(증원)
 * → 갈림길(봉쇄 문) → [서쪽 골렘의 둥지: 정예 돌 골렘 + 상자] → 박쥐 소굴(매복·증원) → 고요한 샘(쉼터) → 수정 대광장(증원) → 봉쇄 문 → 수정 골렘.
 */
export const CAVE_JOURNEY: JourneyDef = {
  halfX: 36,
  halfZ: 110,
  cell: 2,
  wallHeight: 3.0,
  start: { x: 0, z: 90 },
  bossZone: 'boss',
  zones: [
    { id: 'start', name: '동굴 입구', kind: 'start', rect: { x: 0, z: 88, w: 14, d: 14 }, mainIndex: 0, objective: '동굴 깊은 곳으로 — 빛 기둥을 따라가세요' },
    {
      id: 'path1', name: '좁은 틈', kind: 'path', rect: { x: 0, z: 66, w: 6, d: 20 }, mainIndex: 1, objective: '좁은 틈을 지나라 — 천장의 박쥐를 조심!',
      waves: [{ when: 'enter', spawns: [{ type: 'stalker', x: 0, z: 70 }, { type: 'stalker', x: 1, z: 62 }, { type: 'stalker', x: -1, z: 58 }] }],
    },
    {
      id: 'fight1', name: '수정 광장', kind: 'fight', rect: { x: 0, z: 40, w: 26, d: 22 }, mainIndex: 2, objective: '수정 광장의 적을 물리쳐라',
      waves: [{ when: 'enter', spawns: [{ type: 'stalker', x: -8, z: 44 }, { type: 'stalker', x: 8, z: 44 }, { type: 'stalker', x: 0, z: 33 }, { type: 'rusher', x: -5, z: 38 }, { type: 'rusher', x: 5, z: 38 }, { type: 'shooter', x: 0, z: 47 }, { type: 'bomber', x: 10, z: 34 }] }],
    },
    {
      id: 'treasure', name: '지하 호수', kind: 'treasure', rect: { x: -26, z: 40, w: 14, d: 12 }, objective: '호숫가의 보물 상자를 열어라',
      waves: [{ when: 'enter', spawns: [{ type: 'shooter', x: -30, z: 36 }, { type: 'shooter', x: -22, z: 44 }] }],
    },
    {
      id: 'fight2', name: '종유석 회랑', kind: 'fight', rect: { x: 14, z: 12, w: 28, d: 18 }, mainIndex: 3, objective: '종유석 회랑의 적을 물리쳐라',
      waves: [
        { when: 'enter', spawns: [{ type: 'rusher', x: 6, z: 14 }, { type: 'rusher', x: 14, z: 6 }, { type: 'rusher', x: 22, z: 14 }, { type: 'shooter', x: 10, z: 18 }, { type: 'shooter', x: 24, z: 6 }, { type: 'stalker', x: 18, z: 16 }, { type: 'stalker', x: 4, z: 6 }, { type: 'slime', x: 14, z: 14 }] },
        { when: 'half', spawns: [{ type: 'stalker', x: 24, z: 18 }, { type: 'stalker', x: 2, z: 16 }] },
      ],
    },
    {
      id: 'junction', name: '갈림길', kind: 'branch', rect: { x: -10, z: 2, w: 12, d: 12 }, mainIndex: 4, objective: '갈림길의 적을 물리치면 북쪽 문이 열린다 (서쪽에도 길이…)',
      waves: [{ when: 'enter', spawns: [{ type: 'rusher', x: -13, z: 5 }, { type: 'rusher', x: -7, z: -1 }, { type: 'shooter', x: -10, z: 6 }] }],
    },
    {
      id: 'secret', name: '골렘의 둥지', kind: 'secret', rect: { x: -28, z: 2, w: 14, d: 14 }, objective: '수정 심장 골렘을 물리쳐라 (희귀 상자)',
      waves: [{ when: 'enter', spawns: [{ type: 'artillery', x: -31, z: -2, elite: 2.0, name: '수정 심장 골렘' }, { type: 'stalker', x: -24, z: 6 }, { type: 'stalker', x: -32, z: 6 }] }],
    },
    {
      id: 'ambush', name: '박쥐 소굴', kind: 'ambush', rect: { x: -10, z: -24, w: 24, d: 16 }, mainIndex: 5, objective: '박쥐 떼다! 모두 물리쳐라',
      waves: [
        { when: 'enter', spawns: [{ type: 'stalker', x: -20, z: -20 }, { type: 'stalker', x: 0, z: -20 }, { type: 'stalker', x: -20, z: -28 }, { type: 'stalker', x: 0, z: -28 }, { type: 'stalker', x: -10, z: -30 }, { type: 'stalker', x: -14, z: -18 }, { type: 'shooter', x: -6, z: -26 }, { type: 'bomber', x: -4, z: -18 }, { type: 'bomber', x: -16, z: -30 }] },
        { when: 'half', spawns: [{ type: 'stalker', x: -19, z: -24 }, { type: 'stalker', x: -1, z: -24 }, { type: 'stalker', x: -10, z: -18 }] },
      ],
    },
    { id: 'rest', name: '고요한 샘', kind: 'rest', rect: { x: 6, z: -46, w: 14, d: 12 }, mainIndex: 6, objective: '잠시 쉬어가자 — 상자와 회복 아이템' },
    {
      id: 'arena', name: '수정 대광장', kind: 'arena', rect: { x: 0, z: -72, w: 34, d: 24 }, mainIndex: 7, objective: '큰 전투! 모두 물리치면 골렘의 문이 열린다',
      waves: [
        { when: 'enter', spawns: [{ type: 'rusher', x: -10, z: -66 }, { type: 'rusher', x: 10, z: -66 }, { type: 'rusher', x: 0, z: -78 }, { type: 'shooter', x: -14, z: -76 }, { type: 'shooter', x: 14, z: -76 }, { type: 'shooter', x: 0, z: -62 }, { type: 'stalker', x: -6, z: -72 }, { type: 'stalker', x: 6, z: -72 }, { type: 'stalker', x: 12, z: -80 }, { type: 'tank', x: -12, z: -80 }, { type: 'slime', x: -5, z: -70 }, { type: 'slime', x: 5, z: -70 }, { type: 'bomber', x: 0, z: -84 }] },
        { when: 'half', spawns: [{ type: 'stalker', x: -15, z: -64 }, { type: 'stalker', x: 15, z: -64 }, { type: 'stalker', x: 0, z: -82 }, { type: 'shooter', x: 8, z: -62 }, { type: 'bomber', x: -10, z: -82 }, { type: 'bomber', x: 10, z: -82 }] },
      ],
    },
    { id: 'boss', name: '골렘의 심장', kind: 'boss', rect: { x: 0, z: -100, w: 30, d: 16 }, mainIndex: 8, objective: '수정 골렘을 쓰러뜨려라!' },
  ],
  corridors: [
    { x: 0, z: 78, w: 6, d: 6 },
    { x: 0, z: 53, w: 6, d: 6 },
    { x: -16, z: 40, w: 6, d: 4 },
    { x: 8, z: 25, w: 6, d: 8 },
    { x: -2, z: 6, w: 4, d: 6 },
    { x: -18, z: 2, w: 4, d: 6 },
    { x: -10, z: -11, w: 6, d: 12 },
    { x: 0, z: -36, w: 6, d: 10 },
    { x: 6, z: -56, w: 6, d: 10 },
    { x: 0, z: -88, w: 8, d: 8 },
  ],
  gates: [
    { id: 'gate-north', rect: { x: -10, z: -9, w: 6, d: 1.2 }, opensWhenCleared: 'junction' },
    { id: 'gate-boss', rect: { x: 0, z: -87, w: 8, d: 1.2 }, opensWhenCleared: 'arena' },
  ],
};

/** 강철 요새(로봇 공장) 여정의 적: 모두 로봇 외형(skin 'robot-종류') */
const R = (type: string, x: number, z: number, extra: Partial<EnemySpawnConfig> = {}): EnemySpawnConfig => ({ type, x, z, skin: `robot-${type}`, ...extra });

/**
 * 강철 요새 여정 (목표 10분+, 로봇 공장 분위기): 정문 → 경비 초소 → 컨베이어 통로(드론·포대) → 조립장(증원) → [서쪽 창고: 보물]
 * → 교차로(봉쇄 문) → [남쪽 무기고: 정예 경비대장 + 상자] → 포대 마당(매복·증원) → 정비실(쉼터) → 사령부 앞마당(증원) → 봉쇄 문 → 요새 사령관.
 */
export const FORTRESS_JOURNEY: JourneyDef = {
  halfX: 38,
  halfZ: 102,
  cell: 2,
  wallHeight: 3.2,
  start: { x: 0, z: 88 },
  bossZone: 'boss',
  zones: [
    { id: 'start', name: '요새 정문', kind: 'start', rect: { x: 0, z: 88, w: 16, d: 12 }, mainIndex: 0, objective: '요새 안으로 — 빛 기둥을 따라가세요' },
    {
      id: 'fight1', name: '경비 초소', kind: 'fight', rect: { x: 0, z: 64, w: 22, d: 20 }, mainIndex: 1, objective: '경비 로봇을 모두 부숴라',
      waves: [{ when: 'enter', spawns: [R('rusher', -6, 68), R('rusher', 6, 68), R('rusher', -4, 58), R('rusher', 5, 57), R('shooter', 0, 70)] }],
    },
    {
      id: 'path1', name: '컨베이어 통로', kind: 'path', rect: { x: 18, z: 38, w: 8, d: 24 }, mainIndex: 2, objective: '컨베이어 통로를 지나라 — 드론과 포대를 조심!',
      waves: [{ when: 'enter', spawns: [R('stalker', 18, 44), R('stalker', 17, 36), R('stalker', 19, 30), R('artillery', 18, 28)] }],
    },
    {
      id: 'fight2', name: '조립장', kind: 'fight', rect: { x: 10, z: 8, w: 30, d: 20 }, mainIndex: 3, objective: '조립장의 로봇을 모두 부숴라',
      waves: [
        { when: 'enter', spawns: [R('tank', 10, 2), R('rusher', 0, 12), R('rusher', 20, 12), R('rusher', 10, 16), R('shooter', -2, 2), R('shooter', 22, 2), R('bomber', 10, 10)] },
        { when: 'half', spawns: [R('rusher', 2, 16), R('rusher', 18, 16)] },
      ],
    },
    {
      id: 'treasure', name: '창고', kind: 'treasure', rect: { x: -18, z: 10, w: 14, d: 12 }, objective: '창고의 보물 상자를 열어라',
      waves: [{ when: 'enter', spawns: [R('shooter', -22, 14), R('shooter', -14, 6)] }],
    },
    {
      id: 'junction', name: '교차로', kind: 'branch', rect: { x: 30, z: -12, w: 12, d: 12 }, mainIndex: 4, objective: '교차로의 로봇을 부수면 서쪽 문이 열린다 (남쪽에도 길이…)',
      waves: [{ when: 'enter', spawns: [R('rusher', 27, -9), R('rusher', 33, -15), R('artillery', 33, -8)] }],
    },
    {
      id: 'secret', name: '무기고', kind: 'secret', rect: { x: 30, z: -34, w: 12, d: 14 }, objective: '요새 경비대장을 부숴라 (희귀 상자)',
      waves: [{ when: 'enter', spawns: [R('tank', 30, -38, { elite: 2.2, name: '요새 경비대장' }), R('rusher', 26, -30), R('rusher', 34, -30)] }],
    },
    {
      id: 'ambush', name: '포대 마당', kind: 'ambush', rect: { x: 0, z: -18, w: 24, d: 16 }, mainIndex: 5, objective: '포대 사격이다! 모두 부숴라',
      waves: [
        { when: 'enter', spawns: [R('artillery', -7, -19), R('artillery', 7, -19), R('stalker', -6, -14), R('stalker', 6, -14), R('stalker', 0, -24), R('rusher', 0, -12), R('bomber', -4, -26), R('bomber', 4, -26)] },
        { when: 'half', spawns: [R('stalker', -10, -12), R('stalker', 10, -12), R('stalker', 0, -24)] },
      ],
    },
    { id: 'rest', name: '정비실', kind: 'rest', rect: { x: -18, z: -36, w: 14, d: 12 }, mainIndex: 6, objective: '잠시 정비 — 상자와 회복 아이템' },
    {
      id: 'arena', name: '사령부 앞마당', kind: 'arena', rect: { x: 0, z: -62, w: 36, d: 24 }, mainIndex: 7, objective: '큰 전투! 모두 부수면 사령관의 문이 열린다',
      waves: [
        { when: 'enter', spawns: [R('tank', -8, -66), R('tank', 8, -66), R('artillery', -14, -70), R('artillery', 14, -70), R('shooter', -12, -56), R('shooter', 12, -56), R('shooter', 0, -72), R('rusher', -4, -60), R('rusher', 4, -60), R('rusher', 0, -66), R('stalker', -16, -62), R('stalker', 16, -62), R('bomber', -16, -72), R('bomber', 16, -72)] },
        { when: 'half', spawns: [R('rusher', -10, -54), R('rusher', 10, -54), R('rusher', 0, -70), R('shooter', 6, -70), R('bomber', -6, -72), R('bomber', 6, -72)] },
      ],
    },
    { id: 'boss', name: '사령관의 홀', kind: 'boss', rect: { x: 0, z: -92, w: 32, d: 16 }, mainIndex: 8, objective: '요새 사령관을 쓰러뜨려라!' },
  ],
  corridors: [
    { x: 0, z: 78, w: 8, d: 8 },
    { x: 12, z: 52, w: 12, d: 6 },
    { x: 18, z: 22, w: 6, d: 8 },
    { x: -8, z: 10, w: 6, d: 4 },
    { x: 24, z: -3, w: 8, d: 6 },
    { x: 30, z: -22, w: 6, d: 10 },
    { x: 18, z: -12, w: 12, d: 6 },
    { x: -10, z: -29, w: 10, d: 8 },
    { x: -14, z: -46, w: 6, d: 10 },
    { x: 0, z: -79, w: 8, d: 10 },
  ],
  gates: [
    { id: 'gate-west', rect: { x: 19, z: -12, w: 1.2, d: 6 }, opensWhenCleared: 'junction' },
    { id: 'gate-boss', rect: { x: 0, z: -78, w: 8, d: 1.2 }, opensWhenCleared: 'arena' },
  ],
};


/**
 * 얼음 봉우리 여정 (목표 10분+, 눈과 얼음): 산기슭 → 얼어붙은 숲길(멧돼지·궁수) → 빙판 호수(슬라임 많음) → [동쪽 얼음 동굴: 보물]
 * → 눈보라 고개(증원) → 갈림길(봉쇄 문) → [서쪽 서리 신전: 정예 서리 트롤 + 상자] → 고드름 골짜기(매복·폭탄 벌레)
 * → 모닥불 쉼터 → 봉우리 광장(증원) → 봉쇄 문 → 서리 거인.
 * 좌우로 크게 꺾이는 지그재그 모양이라 앞의 세 던전과 다르게 느껴진다.
 */
export const ICE_JOURNEY: JourneyDef = {
  halfX: 40,
  halfZ: 108,
  cell: 2,
  wallHeight: 3.4,
  start: { x: -20, z: 92 },
  bossZone: 'boss',
  zones: [
    { id: 'start', name: '산기슭', kind: 'start', rect: { x: -20, z: 90, w: 16, d: 14 }, mainIndex: 0, objective: '얼음 봉우리로 — 빛 기둥을 따라가세요' },
    {
      id: 'path1', name: '얼어붙은 숲길', kind: 'path', rect: { x: 2, z: 84, w: 28, d: 8 }, mainIndex: 1, objective: '얼어붙은 숲길을 지나라 — 멧돼지가 돌진한다!',
      waves: [{ when: 'enter', spawns: [{ type: 'charger', x: 10, z: 84 }, { type: 'archer', x: 14, z: 86 }] }],
    },
    {
      id: 'fight1', name: '빙판 호수', kind: 'fight', rect: { x: 22, z: 60, w: 28, d: 24 }, mainIndex: 2, objective: '호수의 슬라임을 모두 물리쳐라',
      waves: [{ when: 'enter', spawns: [{ type: 'slime', x: 14, z: 64 }, { type: 'slime', x: 30, z: 64 }, { type: 'slime', x: 22, z: 52 }, { type: 'rusher', x: 18, z: 56 }, { type: 'rusher', x: 26, z: 56 }, { type: 'archer', x: 22, z: 68 }] }],
    },
    {
      id: 'treasure', name: '얼음 동굴', kind: 'treasure', rect: { x: 32, z: 34, w: 12, d: 12 }, objective: '얼음 동굴의 보물 상자를 열어라',
      waves: [{ when: 'enter', spawns: [{ type: 'stalker', x: 28, z: 30 }, { type: 'stalker', x: 36, z: 38 }, { type: 'shooter', x: 32, z: 30 }] }],
    },
    {
      id: 'fight2', name: '눈보라 고개', kind: 'fight', rect: { x: -4, z: 36, w: 28, d: 16 }, mainIndex: 3, objective: '눈보라 속 적을 물리쳐라',
      waves: [
        { when: 'enter', spawns: [{ type: 'rusher', x: -12, z: 40 }, { type: 'rusher', x: 4, z: 40 }, { type: 'archer', x: -8, z: 30 }, { type: 'archer', x: 0, z: 30 }, { type: 'charger', x: -4, z: 42 }, { type: 'shooter', x: 6, z: 32 }] },
        { when: 'half', spawns: [{ type: 'stalker', x: -14, z: 32 }, { type: 'stalker', x: 6, z: 42 }, { type: 'slime', x: 2, z: 36 }] },
      ],
    },
    {
      id: 'junction', name: '갈림길', kind: 'branch', rect: { x: -26, z: 24, w: 12, d: 12 }, mainIndex: 4, objective: '갈림길의 적을 물리치면 북쪽 문이 열린다 (서쪽에도 길이…)',
      waves: [{ when: 'enter', spawns: [{ type: 'rusher', x: -29, z: 27 }, { type: 'archer', x: -23, z: 21 }, { type: 'bomber', x: -26, z: 28 }] }],
    },
    {
      id: 'secret', name: '서리 신전', kind: 'secret', rect: { x: -30, z: 4, w: 14, d: 14 }, objective: '서리 트롤을 물리쳐라 (희귀 상자)',
      waves: [{ when: 'enter', spawns: [{ type: 'tank', x: -30, z: 0, elite: 2.4, name: '서리 트롤' }, { type: 'archer', x: -35, z: 8 }, { type: 'archer', x: -25, z: 8 }] }],
    },
    {
      id: 'ambush', name: '고드름 골짜기', kind: 'ambush', rect: { x: -8, z: 2, w: 24, d: 16 }, mainIndex: 5, objective: '고드름이 떨어진다! 모두 물리쳐라',
      waves: [
        { when: 'enter', spawns: [{ type: 'bomber', x: -16, z: 6 }, { type: 'bomber', x: 0, z: 6 }, { type: 'stalker', x: -14, z: -2 }, { type: 'stalker', x: 0, z: -2 }, { type: 'rusher', x: -8, z: 8 }, { type: 'slime', x: -8, z: -4 }] },
        { when: 'half', spawns: [{ type: 'bomber', x: -17, z: 2 }, { type: 'bomber', x: 1, z: 2 }, { type: 'charger', x: -4, z: 7 }] },
      ],
    },
    { id: 'rest', name: '모닥불 쉼터', kind: 'rest', rect: { x: 20, z: -16, w: 14, d: 12 }, mainIndex: 6, objective: '모닥불에서 몸을 녹이자 — 상자와 회복 아이템' },
    {
      id: 'arena', name: '봉우리 광장', kind: 'arena', rect: { x: 0, z: -48, w: 36, d: 26 }, mainIndex: 7, objective: '큰 전투! 모두 물리치면 서리 거인의 문이 열린다',
      waves: [
        { when: 'enter', spawns: [{ type: 'tank', x: -10, z: -52 }, { type: 'tank', x: 10, z: -52 }, { type: 'slime', x: -14, z: -42 }, { type: 'slime', x: 14, z: -42 }, { type: 'archer', x: -6, z: -58 }, { type: 'archer', x: 6, z: -58 }, { type: 'charger', x: 0, z: -56 }, { type: 'rusher', x: -4, z: -40 }, { type: 'rusher', x: 4, z: -40 }, { type: 'shooter', x: -16, z: -54 }, { type: 'shooter', x: 16, z: -54 }] },
        { when: 'half', spawns: [{ type: 'bomber', x: -12, z: -46 }, { type: 'bomber', x: 12, z: -46 }, { type: 'charger', x: 0, z: -58 }, { type: 'slime', x: 6, z: -45 }] },
      ],
    },
    { id: 'boss', name: '서리 거인의 옥좌', kind: 'boss', rect: { x: 0, z: -84, w: 32, d: 18 }, mainIndex: 8, objective: '서리 거인을 쓰러뜨려라!' },
  ],
  corridors: [
    { x: -10, z: 84, w: 8, d: 6 },
    { x: 18, z: 76, w: 6, d: 10 },
    { x: 32, z: 44, w: 6, d: 10 },
    { x: 8, z: 47, w: 6, d: 8 },
    { x: -20, z: 30, w: 8, d: 6 },
    { x: -30, z: 14, w: 6, d: 10 },
    { x: -21, z: 14, w: 6, d: 10 },
    { x: 2, z: -9, w: 6, d: 8 },
    { x: 9, z: -14, w: 14, d: 6 },
    { x: 18, z: -29, w: 6, d: 14 },
    { x: 0, z: -68, w: 8, d: 16 },
  ],
  gates: [
    { id: 'gate-north', rect: { x: -21, z: 13, w: 6, d: 1.2 }, opensWhenCleared: 'junction' },
    { id: 'gate-boss', rect: { x: 0, z: -72, w: 8, d: 1.2 }, opensWhenCleared: 'arena' },
  ],
};

export const DUNGEONS: DungeonDef[] = [
  {
    id: 'forest',
    name: GameConfig.dungeon.name,
    subtitle: '햇살이 드는 숲길을 따라 고블린·박쥐·거인을 물리치고 수호 로봇에게로.',
    recommendedLevel: 1,
    arenaHalfSize: GameConfig.world.arenaHalfSize,
    theme: forestTheme,
    // 여정 던전: 장애물은 구역 안 소품(오를 수 있는 상자·기둥·폐허 돌담), 적은 구역에 들어설 때 등장
    obstacles: [
      { x: 6, z: 48, w: 2, d: 2, h: 2, color: '#d9a066', kind: 'crate' },
      { x: 8.2, z: 48, w: 2, d: 2, h: 2, color: '#d9a066', kind: 'crate' },
      { x: 7, z: 45.8, w: 2, d: 2, h: 1.4, color: '#e0ad6c', kind: 'crate' },
      { x: -10, z: -70, w: 1.2, d: 1.2, h: 4, color: '#9aa3b2', kind: 'pillar' },
      { x: 10, z: -70, w: 1.2, d: 1.2, h: 4, color: '#9aa3b2', kind: 'pillar' },
      { x: -5, z: -41, w: 3, d: 0.7, h: 1.6, color: '#8f8a7e', kind: 'ruin' },
      { x: 5, z: -47, w: 3, d: 0.7, h: 1.2, color: '#8f8a7e', kind: 'ruin' },
      { x: 26, z: 20, w: 1.6, d: 1.6, h: 2, color: '#d9a066', kind: 'crate' },
    ],
    chests: [
      { x: -24, z: -20 },
      { x: 30, z: 21 },
      { x: 0, z: -46 },
    ],
    spawns: [],
    boss: { spawn: { x: 0, z: -98 } },
    rewardMul: { gold: 1, xp: 1 },
    journey: FOREST_JOURNEY,
    start: FOREST_JOURNEY.start,
  },
  {
    id: 'cave',
    name: '수정 동굴',
    subtitle: '어둡고 좁은 동굴 길. 박쥐 떼와 수정 골렘이 기다린다.',
    recommendedLevel: 4,
    requiresClear: 'forest',
    arenaHalfSize: 24,
    journey: CAVE_JOURNEY,
    start: CAVE_JOURNEY.start,
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
      // 수정 광장·회랑의 수정 기둥 (못 오름), 오를 수 있는 바위
      { x: 9, z: 46, w: 1.4, d: 1.4, h: 5, color: '#8fe8ff', kind: 'pillar' },
      { x: -9, z: 34, w: 1.6, d: 1.6, h: 6, color: '#c7a2ff', kind: 'pillar' },
      { x: 12, z: 10, w: 2, d: 2, h: 2, color: '#5a5f8c', kind: 'crate' },
      { x: 14.2, z: 10, w: 2, d: 2, h: 2, color: '#5a5f8c', kind: 'crate' },
      { x: 20, z: 10, w: 1.4, d: 1.4, h: 4.5, color: '#8fe8ff', kind: 'pillar' },
      // 대광장 양쪽 수정 기둥
      { x: -10, z: -70, w: 1.2, d: 1.2, h: 4, color: '#c7a2ff', kind: 'pillar' },
      { x: 10, z: -70, w: 1.2, d: 1.2, h: 4, color: '#c7a2ff', kind: 'pillar' },
      // 종유석 돌담
      { x: 1, z: -42, w: 3, d: 0.7, h: 1.4, color: '#4a3f7a', kind: 'ruin' },
    ],
    chests: [
      { x: -26, z: 40 },
      { x: -28, z: 2 },
      { x: 9, z: -48 },
    ],
    spawns: [],
    boss: {
      name: '수정 골렘',
      title: '동굴 깊은 곳의 수정 심장',
      lore: '수정 동굴의 수정이 수백 년 동안 모여 생명을 얻은 바위 거인. 가슴의 보라 수정이 심장이며, 돌진하지 않는 대신 땅을 내려찍고 동굴 박쥐를 불러냅니다.',
      hp: 650,
      color: '#8f6cff',
      speed: 2.6,
      radius: 1.8,
      score: 500,
      spawn: { x: 0, z: -101 },
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
    subtitle: '붉은 강철 로봇 공장. 경비 로봇·포대·사령관이 길목을 지킨다.',
    recommendedLevel: 8,
    requiresClear: 'cave',
    arenaHalfSize: 30,
    journey: FORTRESS_JOURNEY,
    start: FORTRESS_JOURNEY.start,
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
      // 조립장 컨테이너 (오를 수 있음)
      { x: 6, z: 7, w: 4, d: 2, h: 2.4, color: '#b0392f', kind: 'crate' },
      { x: 16, z: 8, w: 2, d: 4, h: 2.4, color: '#c9a227', kind: 'crate' },
      // 포대 마당 받침
      { x: -9, z: -24, w: 3, d: 3, h: 2, color: '#8d9099', kind: 'crate' },
      { x: 9, z: -24, w: 3, d: 3, h: 2, color: '#8d9099', kind: 'crate' },
      // 앞마당 격벽
      { x: -8, z: -62, w: 6, d: 1.2, h: 3, color: '#7a2b2b', kind: 'ruin' },
      { x: 8, z: -62, w: 6, d: 1.2, h: 3, color: '#7a2b2b', kind: 'ruin' },
    ],
    chests: [
      { x: -18, z: 10 },
      { x: 30, z: -34 },
      { x: -20, z: -38 },
      { x: 0, z: -56 },
    ],
    spawns: [],
    boss: {
      name: '요새 사령관',
      title: '강철 요새의 지휘관',
      lore: '로봇 공장을 지휘하는 붉은 강철 전투 로봇. 어깨 포탑과 오른팔 대포로 포격을 퍼붓고, 체력이 떨어지면 포탄 수를 늘립니다. 발밑의 주황 원이 보이면 바로 자리를 옮기세요.',
      hp: 900,
      color: '#c0392b',
      speed: 3.2,
      radius: 1.7,
      score: 800,
      spawn: { x: 0, z: -93 },
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
  {
    id: 'ice',
    name: '얼음 봉우리',
    subtitle: '눈보라 치는 산길. 빙판의 슬라임과 서리 거인이 기다린다.',
    recommendedLevel: 12,
    requiresClear: 'fortress',
    arenaHalfSize: 30,
    journey: ICE_JOURNEY,
    start: ICE_JOURNEY.start,
    theme: {
      backgroundColor: '#dfe9f5',
      fogNear: 22,
      fogFar: 70,
      floorColor: '#e8f1fa',
      floorAltColor: '#d4e3f0',
      floorFlecks: ['#ffffff', '#9fd0f0'],
      wallColor: '#a9cfe8',
      wallHeight: 3.4,
      skyColor: '#eaf3fb',
      groundColor: '#8fb3cc',
      sunColor: '#f2f7ff',
      sunIntensity: 2.6,
      sky: { elevation: 12, azimuth: 160, turbidity: 4, rayleigh: 2.5 },
      exposure: 1.0,
      groundBump: 1.2,
      groundScale: 7,
      groundRoughness: 0.5,
    },
    obstacles: [
      // 빙판 호수의 얼음 바위(오를 수 있음), 눈보라 고개 얼음 기둥, 광장 얼음 기둥, 골짜기 눈더미
      { x: 22, z: 60, w: 2.2, d: 2.2, h: 1.6, color: '#bfe3f7', kind: 'crate' },
      { x: 24.4, z: 60, w: 2.2, d: 2.2, h: 2.2, color: '#bfe3f7', kind: 'crate' },
      { x: -4, z: 36, w: 1.4, d: 1.4, h: 5, color: '#cfeeff', kind: 'pillar' },
      { x: -12, z: -48, w: 1.4, d: 1.4, h: 5, color: '#cfeeff', kind: 'pillar' },
      { x: 12, z: -48, w: 1.4, d: 1.4, h: 5, color: '#cfeeff', kind: 'pillar' },
      { x: -8, z: 2, w: 3, d: 0.8, h: 1.4, color: '#eef6fb', kind: 'ruin' },
    ],
    chests: [
      { x: 32, z: 34 },
      { x: -30, z: 4 },
      { x: 23, z: -18 },
      { x: 0, z: -40 },
    ],
    spawns: [],
    boss: {
      name: '서리 거인',
      title: '얼음 봉우리의 옥좌 주인',
      lore: '봉우리 꼭대기에 앉아 눈보라를 부르는 얼음 거인. 가슴의 얼음 핵이 빛나며, 넓은 내려찍기로 땅을 얼리고 작은 슬라임을 불러냅니다. 느리지만 한 방이 무겁습니다.',
      hp: 1100,
      color: '#8fd3ff',
      speed: 2.4,
      radius: 1.9,
      score: 1000,
      spawn: { x: 0, z: -86 },
      contactDamage: 26,
      model: 'frost',
      // 느리지만 넓은 내려찍기, 눈 슬라임 소환, 탄막. 돌진은 없다
      useCharge: false,
      closePatterns: ['slam', 'summon', 'barrage', 'slam'],
      engageRange: 10,
      windup: { slam: 0.85, barrage: 0.65, summon: 1.0 },
      slam: { radius: 6, damage: 36 },
      barrage: { count: 12, phase2Count: 16, damage: 13, speed: 10 },
      summon: { type: 'slimelet', count: 3, phase2Count: 4, maxAlive: 6 },
      phase2SpeedMul: 1.35,
      reward: { goldMin: 350, goldMax: 520, xp: 600, equipMinRarity: 'epic' },
    },
    rewardMul: { gold: 1.9, xp: 1.9 },
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
