/**
 * 게임 설정 데이터
 *
 * - 자주 바꾸는 수치는 모두 이 파일에서 관리한다. 값만 바꾸면 게임에 바로 반영된다.
 * - 핵심 로직 파일(Game.ts, PlayerController.ts, Enemy.ts 등)은 이 값을 읽기만 하고 직접 수정하지 않는다.
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
  /** 외형: 상자(기본)·기둥·울타리(여정 던전 벽)·폐허 돌담·문(열리면 사라짐) */
  kind?: 'crate' | 'pillar' | 'hedge' | 'ruin' | 'gate';
}

/** 적 종류 하나의 능력치 */
export interface EnemyTypeConfig {
  /** 화면·로그에 표시할 이름 */
  name: string;
  /** 체력 */
  hp: number;
  /** 이동 속도 (유닛/초) */
  speed: number;
  /** 충돌 반지름 */
  radius: number;
  /** 한 번 공격의 피해 */
  damage: number;
  /** 공격이 닿는 거리 */
  attackRange: number;
  /** 공격 전 예고 시간(초). 플레이어가 피할 기회 */
  attackWindup: number;
  /** 공격 후 다음 공격까지 대기(초) */
  attackCooldown: number;
  /** 이 거리 안에 플레이어가 오면 추적 시작 */
  aggroRange: number;
  /** 임시 모델 색상 */
  color: string;
  /** 처치 점수 */
  score: number;
  /** 공격 방식: 'melee'(근접, 기본) 또는 'ranged'(투사체) */
  attackKind?: 'melee' | 'ranged';
  /** (원거리형) 플레이어가 이 거리보다 가까우면 물러난다 */
  retreatRange?: number;
  /** (원거리형) 투사체 속도 */
  projectileSpeed?: number;
  /** 밀려남 저항: 받는 밀침에 곱하는 값 (1 = 보통, 0.3 = 거의 안 밀림) */
  knockbackResist?: number;
  /** 외형: 기존 모델을 재사용할 때 지정 ('rusher' | 'shooter' | 'tank'). 없으면 종류 이름과 같은 모델 */
  model?: 'rusher' | 'shooter' | 'tank';
}

/** 장비 등급 */
export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

/** 등급 하나의 설정 */
export interface RarityConfig {
  /** 표시 이름 */
  label: string;
  /** 이름 앞에 붙는 말 (없으면 빈 문자열) */
  prefix: string;
  /** 능력치 배율 */
  statMul: number;
  /** 드롭 가중치 (클수록 자주) */
  weight: number;
  /** 표시 색 */
  color: string;
}

/** 난이도 단계 */
export type DifficultyLevel = 'easy' | 'normal' | 'hard';

/** 난이도 배율 */
export interface DifficultyPreset {
  /** 화면에 표시할 이름 */
  label: string;
  /** 적 체력 배율 */
  enemyHp: number;
  /** 적 공격력 배율 */
  enemyDamage: number;
  /** 적 이동 속도 배율 */
  enemySpeed: number;
}

/** 적 배치 하나: 종류와 위치 */
export interface EnemySpawnConfig {
  type: string;
  x: number;
  z: number;
  /** 정예(미니 보스): 체력 배율. 1.5 이상이면 몸집도 커지고 이름이 붙는다 */
  elite?: number;
  /** 정예 이름 (배너·디버그용) */
  name?: string;
  /** 외형 키: manifest.json `enemies.<skin>` 의 .glb 를 쓴다 (없으면 종류 기본 외형). 예: 'robot-rusher' */
  skin?: string;
}

export interface GameConfigType {
  /** 게임 이름 정보 (제목 변경은 여기서) */
  meta: { title: string; subtitle: string; version: string; /** 인트로 교실 칠판에 적히는 학교 이름 */ school: string };
  /** 키 설정: 물리 키 코드(e.code) 목록. 마우스 버튼은 'Mouse0'(왼쪽), 'Mouse2'(오른쪽) */
  controls: {
    up: string[];
    down: string[];
    left: string[];
    right: string[];
    attackMelee: string[];
    attackRanged: string[];
    jump: string[];
    /** 회피(대시): 이동 방향으로 짧게 빠르게 움직이며 무적 */
    dodge: string[];
    restart: string[];
    toggleGuide: string[];
    toggleInventory: string[];
    /** 상자 열기 등 상호작용 */
    interact: string[];
  };
  /** 플레이어 */
  player: {
    /** 최대 체력 */
    maxHp: number;
    /** 피격 후 무적 시간(초) */
    invulnerableTime: number;
    /** 피격 시 밀려나는 세기 */
    hitKnockback: number;
    /** 이동 속도 (유닛/초) */
    moveSpeed: number;
    /** 공격 중 이동 속도 비율 (0~1) */
    attackMoveFactor: number;
    /** 점프 시작 속도 (클수록 높이 뜀) */
    /** 회피(대시) */
    dash: {
      /** 대시 중 이동 속도 (유닛/초) */
      speed: number;
      /** 대시 시간(초) */
      duration: number;
      /** 다음 대시까지 대기(초) */
      cooldown: number;
      /** 대시 중 무적 여부 */
      invulnerable: boolean;
    };
    jumpSpeed: number;
    /** 중력 (클수록 빨리 떨어짐) */
    gravity: number;
    /** 올라서기 보조(유닛): 점프 정점이 상자 윗면보다 이만큼 낮아도 올라선다. 0 이면 보조 없음 */
    climbAssist: number;
    /** 몸을 돌리는 속도 (클수록 빠르게 회전) */
    turnSpeed: number;
    /** 충돌 반지름 */
    radius: number;
    /** 시작 위치 */
    startPosition: { x: number; z: number };
    /** 임시 모델 색상 */
    colors: { body: string; accent: string; skin: string; visor: string };
  };
  /** 전투 */
  combat: {
    /** 터치 조작 자동 조준: 이 거리 안의 가장 가까운 적을 겨눈다 */
    autoAimRange: number;
    /** 근접 공격 */
    melee: {
      damage: number;
      /** 공격이 닿는 거리 */
      range: number;
      /** 공격 부채꼴 각도 (도) */
      arcDegrees: number;
      /** 다음 공격까지 대기(초) */
      cooldown: number;
      /** 맞은 적이 밀려나는 세기 */
      knockback: number;
      /** 휘두르기 동작 시간(초) */
      swingTime: number;
    };

    /** 원거리 공격 (에너지 탄) */
    ranged: {
      damage: number;
      /** 탄 속도 (유닛/초) */
      speed: number;
      /** 다음 발사까지 대기(초) */
      cooldown: number;
      /** 탄이 사라지기까지 시간(초) */
      lifetime: number;
      /** 탄 충돌 반지름 */
      radius: number;
      /** 맞은 적이 밀려나는 세기 */
      knockback: number;
    };
  };
  /** 적 */
  enemies: {
    /** 종류별 능력치. 새 종류는 여기에 추가하고 spawns 에서 사용한다. */
    types: Record<string, EnemyTypeConfig>;
    /** 던전 1 의 적 배치 */
    spawns: EnemySpawnConfig[];
    /** 적끼리 겹치지 않게 밀어내는 세기 */
    separation: number;
    /** 처치된 적이 사라질 때까지 시간(초) */
    deathDuration: number;
    /** 우회 이동: 앞 lookAhead 유닛이 막히면 좌우로 꺾는다. interval(초)마다 다시 판단 (성능·떨림 방지) */
    detour: { lookAhead: number; interval: number };
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
    /** 보스전 거리: 보스가 range 안에 살아 있으면 카메라 거리를 scale 배로 (큰 보스가 화면에 들어오게) */
    bossZoom: { scale: number; range: number };
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
    /** 빛 번짐(블룸, '높음' 화질) */
    bloom: { strength: number; radius: number; threshold: number };
  };
  /** 난이도 */
  difficulty: {
    /** 처음 실행할 때의 난이도 */
    default: DifficultyLevel;
    presets: Record<DifficultyLevel, DifficultyPreset>;
  };
  /** 아이템 드롭 */
  loot: {
    /** 체력 회복 아이템 확률 0~1 */
    healChance: number;
    /** 회복량 */
    healAmount: number;
    /** 골드 확률 0~1 */
    goldChance: number;
    goldMin: number;
    goldMax: number;
    /** 적 점수 1점당 경험치 */
    xpPerScore: number;
    /** 바닥에 남아 있는 시간(초) */
    lifetime: number;
    /** 이 거리 안에 오면 플레이어 쪽으로 끌려온다 */
    magnetRange: number;
    magnetSpeed: number;
    /** 이 거리 안이면 획득 */
    pickupRadius: number;
  };
  /** 던전 */
  dungeon: {
    /** 화면에 표시할 던전 이름 */
    name: string;
    /** 보물 상자 위치 */
    chests: Array<{ x: number; z: number }>;
    /** 던전 클리어 뒤 다음 던전으로 자동 이동하기까지 초 (0 = 자동 이동 없음) */
    autoAdvanceSeconds: number;
    chestLoot: {
      /** 골드 범위 (항상) */
      goldMin: number;
      goldMax: number;
      /** 장비가 나올 확률 0~1 */
      equipChance: number;
      /** 체력 회복이 나올 확률 0~1 */
      healChance: number;
      /** 이 거리 안에서 열 수 있다 */
      interactRange: number;
    };
  };
  /** 보스 (일반 적을 모두 처치하면 등장) */
  boss: {
    name: string;
    hp: number;
    speed: number;
    radius: number;
    color: string;
    score: number;
    knockbackResist: number;
    /** 등장 위치 */
    spawn: { x: number; z: number };
    /** 돌진 접촉 피해 */
    contactDamage: number;
    /** 이 거리 안이면 패턴 시작 */
    engageRange: number;
    /** 이 거리보다 멀면 돌진 선택 */
    chargeMinRange: number;
    windup: { charge: number; slam: number; barrage: number; summon: number; mortar: number };
    /** 가까울 때 쓰는 패턴 순서 (순환) */
    closePatterns: Array<'slam' | 'barrage' | 'summon' | 'mortar'>;
    /** 돌진 사용 여부 */
    useCharge: boolean;
    /** 외형: 'guardian'(숲 수호 로봇) | 'golem'(수정 골렘) | 'commander'(요새 사령관) */
    model: 'guardian' | 'golem' | 'commander';
    chargeDuration: number;
    recover: number;
    cooldown: number;
    /** 2단계 진입 체력 비율 */
    phase2Ratio: number;
    phase2TimeMul: number;
    phase2SpeedMul: number;
    charge: { speed: number };
    slam: { radius: number; damage: number };
    barrage: { count: number; phase2Count: number; damage: number; speed: number };
    /** 부하 소환: 종류, 마리 수, 동시에 살아 있을 수 있는 최대 수 */
    summon: { type: string; count: number; phase2Count: number; maxAlive: number };
    /** 포격 낙하: 낙하 수, 예고 시간(초), 반지름, 피해, 플레이어 주변 흩어짐 */
    mortar: { count: number; phase2Count: number; delay: number; radius: number; damage: number; spread: number };
    /** 처치 보상 */
    reward: { goldMin: number; goldMax: number; xp: number; equipMinRarity: Rarity };
  };
  /** 장비 */
  equipment: {
    /** 적 처치 시 장비가 떨어질 확률 0~1 */
    dropChance: number;
    /** 가방 칸 수 */
    inventorySize: number;
    /** 방어력 계산 기준: 방어력이 이 값과 같으면 피해 절반 */
    defenseScale: number;
    rarities: Record<Rarity, RarityConfig>;
  };
  /** 성장 */
  progression: {
    /** 1→2 레벨에 필요한 경험치 */
    xpBase: number;
    /** 레벨마다 필요 경험치가 곱해지는 비율 */
    xpGrowth: number;
    /** 레벨당 최대 체력 증가 */
    hpPerLevel: number;
    /** 레벨당 공격력 증가 비율 (0.05 = 5%) */
    damagePerLevel: number;
    /** 최대 레벨 */
    maxLevel: number;
    /** 레벨 업 때 체력을 회복하는 비율 0~1 */
    levelUpHealRatio: number;
  };
  /** 화면 표시 */
  hud: {
    /** 피해 숫자 표시 */
    showDamageNumbers: boolean;
  };
  /** 연출 */
  juice: {
    /** 피격 시 카메라 흔들림 세기·시간 */
    hitShake: { amp: number; duration: number };
    /** 보스 내려찍기·포격 폭발 흔들림 */
    slamShake: { amp: number; duration: number };
    /** 처치 순간 짧은 멈춤(초)과 그때의 시간 배율 */
    hitStop: { duration: number; timeScale: number };
    /** 보스 처치 멈춤(초) */
    bossHitStop: number;
    /** 검 궤적 색 (근접 공격 때 공중을 휩쓰는 빛) */
    slashColor: string;
    /** 레벨 업 연출: 빛 기둥 반지름·높이·시간(초) */
    levelUp: { radius: number; height: number; duration: number; color: string };
    /** 보스 등장 연출: 충격파 반지름, 빛 기둥 높이·시간, 짧은 느려짐(초) */
    bossEntrance: { shockRadius: number; pillarHeight: number; duration: number; slowMo: number };
  };
  /** 성능 */
  performance: {
    /** 자동 화질 판단 간격(초): 이 시간 동안의 평균 FPS 로 판단 */
    autoQualityInterval: number;
    /** 이 FPS 미만이면 화질을 한 단계 내린다 */
    autoQualityFps: number;
    /** 시뮬레이션 한 단계의 최대 시간(초). 프레임이 느리면 이 단위로 여러 번 돌린다 */
    maxStep: number;
  };
  /** 저장 */
  save: {
    /** 자동 저장 간격(초). 바뀐 것이 있을 때만 이 간격으로 저장한다 */
    autoSaveInterval: number;
  };
  /** 디버그 */
  debug: {
    /** 화면 아래에 FPS 표시 */
    showFps: boolean;
  };
}

export const GameConfig: GameConfigType = {
  meta: { title: 'HERO X', subtitle: '모험의 던전', version: '1.11.0', school: '창릉초등학교' },

  controls: {
    up: ['KeyW', 'ArrowUp'],
    down: ['KeyS', 'ArrowDown'],
    left: ['KeyA', 'ArrowLeft'],
    right: ['KeyD', 'ArrowRight'],
    attackMelee: ['Mouse0', 'KeyJ'],
    attackRanged: ['Mouse2', 'KeyK'],
    jump: ['Space'],
    dodge: ['ShiftLeft', 'ShiftRight', 'KeyL'],
    restart: ['KeyR'],
    toggleGuide: ['KeyH'],
    toggleInventory: ['KeyI', 'Tab'],
    interact: ['KeyE', 'KeyF'],
  },

  player: {
    maxHp: 100,
    invulnerableTime: 0.6,
    hitKnockback: 6,
    moveSpeed: 7,
    attackMoveFactor: 0.6,
    dash: { speed: 20, duration: 0.22, cooldown: 0.9, invulnerable: true },
    jumpSpeed: 8,
    gravity: 24,
    climbAssist: 1.0,
    turnSpeed: 14,
    radius: 0.5,
    startPosition: { x: 0, z: 0 },
    colors: { body: '#2f6df6', accent: '#ffc531', skin: '#f3c6a0', visor: '#5cf2d8' },
  },

  combat: {
    autoAimRange: 14,
    melee: {
      damage: 12,
      range: 1.9,
      arcDegrees: 110,
      cooldown: 0.34,
      knockback: 7,
      swingTime: 0.22,
    },
    ranged: {
      damage: 8,
      speed: 22,
      cooldown: 0.5,
      lifetime: 1.6,
      radius: 0.18,
      knockback: 3,
    },
  },

  enemies: {
    types: {
      rusher: {
        name: '고블린 전사',
        hp: 30,
        speed: 4.2,
        radius: 0.55,
        damage: 10,
        attackRange: 1.5,
        attackWindup: 0.35,
        attackCooldown: 1.3,
        aggroRange: 20,
        color: '#ff7a45',
        score: 10,
      },
      shooter: {
        name: '유령 마법사',
        hp: 20,
        speed: 3.2,
        radius: 0.5,
        damage: 8,
        attackRange: 9,
        attackWindup: 0.5,
        attackCooldown: 2.2,
        aggroRange: 22,
        color: '#b06bff',
        score: 15,
        attackKind: 'ranged',
        retreatRange: 4.5,
        projectileSpeed: 11,
      },
      tank: {
        name: '트롤 거인',
        hp: 90,
        speed: 1.9,
        radius: 0.9,
        damage: 18,
        attackRange: 2.0,
        attackWindup: 0.6,
        attackCooldown: 2.0,
        aggroRange: 16,
        color: '#5b7bd6',
        score: 30,
        knockbackResist: 0.25,
      },
      // 동굴 동굴 박쥐 (수정 동굴): 작고 빠른 근접형. 체력은 낮다. 외형은 드론 모델 재사용
      stalker: {
        name: '동굴 박쥐',
        hp: 18,
        speed: 7.5,
        radius: 0.45,
        damage: 7,
        attackRange: 1.3,
        attackWindup: 0.25,
        attackCooldown: 0.9,
        aggroRange: 16,
        color: '#8e6cff',
        score: 14,
        attackKind: 'melee',
        model: 'shooter',
      },
      // 돌 골렘 (강철 요새): 느리고 단단한 원거리형. 멀리서 세게 쏜다. 외형은 트롤 거인 재사용
      artillery: {
        name: '돌 골렘',
        hp: 70,
        speed: 1.6,
        radius: 0.8,
        damage: 16,
        attackRange: 13,
        attackWindup: 0.9,
        attackCooldown: 2.2,
        aggroRange: 18,
        color: '#c0392b',
        score: 40,
        attackKind: 'ranged',
        retreatRange: 5,
        projectileSpeed: 12,
        knockbackResist: 0.4,
        model: 'tank',
      },
    },
    spawns: [
      // 던전 1 '잊혀진 숲'. 다른 던전의 배치는 src/game/DungeonDefs.ts 에 있다
      { type: 'rusher', x: 12, z: -12 },
      { type: 'rusher', x: -14, z: -6 },
      { type: 'rusher', x: 16, z: 6 },
      { type: 'rusher', x: -10, z: 16 },
      { type: 'rusher', x: 4, z: 20 },
      { type: 'rusher', x: -20, z: -18 },
      { type: 'shooter', x: 18, z: -2 },
      { type: 'shooter', x: -6, z: -22 },
      { type: 'shooter', x: 20, z: 18 },
      { type: 'tank', x: -22, z: 12 },
      { type: 'tank', x: 10, z: -22 },
    ],
    separation: 2.5,
    detour: { lookAhead: 3.5, interval: 0.3 },
    deathDuration: 0.6,
  },

  camera: {
    fov: 50,
    offset: { x: 0, y: 13, z: 11 },
    lookAtHeight: 1.0,
    smoothing: 6,
    near: 0.1,
    far: 300,
    bossZoom: { scale: 1.3, range: 22 },
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
    bloom: { strength: 0.42, radius: 0.35, threshold: 0.85 },
  },

  difficulty: {
    default: 'normal',
    presets: {
      easy: { label: '쉬움', enemyHp: 0.8, enemyDamage: 0.7, enemySpeed: 0.9 },
      normal: { label: '보통', enemyHp: 1.15, enemyDamage: 1.1, enemySpeed: 1.0 },
      hard: { label: '어려움', enemyHp: 1.6, enemyDamage: 1.6, enemySpeed: 1.15 },
    },
  },

  loot: {
    healChance: 0.25,
    healAmount: 25,
    goldChance: 0.6,
    goldMin: 3,
    goldMax: 12,
    xpPerScore: 1,
    lifetime: 20,
    magnetRange: 3.5,
    magnetSpeed: 6,
    pickupRadius: 0.9,
  },

  dungeon: {
    name: '잊혀진 숲',
    chests: [
      { x: -22, z: -4 },
      { x: 12, z: 2 },
      { x: -4, z: 24 },
    ],
    autoAdvanceSeconds: 6,
    chestLoot: {
      goldMin: 15,
      goldMax: 40,
      equipChance: 0.8,
      healChance: 0.5,
      interactRange: 2.2,
    },
  },

  boss: {
    name: '숲의 수호 로봇',
    hp: 420,
    speed: 2.8,
    radius: 1.6,
    color: '#3f8f5f',
    score: 300,
    knockbackResist: 0.1,
    spawn: { x: 0, z: -20 },
    contactDamage: 22,
    engageRange: 11,
    chargeMinRange: 5,
    windup: { charge: 0.8, slam: 0.7, barrage: 0.6, summon: 0.9, mortar: 0.8 },
    closePatterns: ['slam', 'barrage'],
    useCharge: true,
    model: 'guardian',
    chargeDuration: 0.55,
    recover: 0.7,
    cooldown: 1.3,
    phase2Ratio: 0.5,
    phase2TimeMul: 0.7,
    phase2SpeedMul: 1.3,
    charge: { speed: 18 },
    slam: { radius: 4.5, damage: 26 },
    barrage: { count: 8, phase2Count: 12, damage: 10, speed: 9 },
    summon: { type: 'stalker', count: 2, phase2Count: 3, maxAlive: 4 },
    mortar: { count: 3, phase2Count: 5, delay: 1.1, radius: 2.4, damage: 18, spread: 3.5 },
    reward: { goldMin: 80, goldMax: 150, xp: 120, equipMinRarity: 'rare' },
  },

  equipment: {
    dropChance: 0.3,
    inventorySize: 20,
    defenseScale: 50,
    rarities: {
      common: { label: '일반', prefix: '', statMul: 1, weight: 55, color: '#cdd6f4' },
      uncommon: { label: '고급', prefix: '튼튼한', statMul: 1.3, weight: 25, color: '#7dffb0' },
      rare: { label: '희귀', prefix: '희귀한', statMul: 1.7, weight: 13, color: '#5b8dff' },
      epic: { label: '영웅', prefix: '영웅의', statMul: 2.2, weight: 5, color: '#c77dff' },
      legendary: { label: '전설', prefix: '전설의', statMul: 3, weight: 2, color: '#ffc531' },
    },
  },

  progression: {
    xpBase: 40,
    xpGrowth: 1.35,
    hpPerLevel: 10,
    damagePerLevel: 0.08,
    maxLevel: 30,
    levelUpHealRatio: 0.5,
  },

  hud: {
    showDamageNumbers: true,
  },

  juice: {
    hitShake: { amp: 0.25, duration: 0.25 },
    slamShake: { amp: 0.5, duration: 0.4 },
    hitStop: { duration: 0.06, timeScale: 0.1 },
    bossHitStop: 0.35,
    slashColor: '#bffcf2',
    levelUp: { radius: 0.9, height: 7, duration: 1.4, color: '#ffd23f' },
    bossEntrance: { shockRadius: 9, pillarHeight: 14, duration: 1.6, slowMo: 0.3 },
  },
  performance: {
    autoQualityInterval: 6,
    autoQualityFps: 30,
    maxStep: 0.05,
  },
  save: {
    autoSaveInterval: 3,
  },
  debug: {
    showFps: true,
  },
};

/** 설정값 허용 범위. 범위를 벗어나면 sanitizeGameConfig()가 자동으로 보정한다. */
export const CONFIG_LIMITS: Record<string, { min: number; max: number }> = {
  'player.maxHp': { min: 1, max: 9999 },
  'player.invulnerableTime': { min: 0, max: 5 },
  'player.hitKnockback': { min: 0, max: 50 },
  'player.moveSpeed': { min: 1, max: 30 },
  'player.attackMoveFactor': { min: 0, max: 1 },
  'player.jumpSpeed': { min: 1, max: 30 },
  'player.gravity': { min: 1, max: 100 },
  'player.climbAssist': { min: 0, max: 3 },
  'dungeon.autoAdvanceSeconds': { min: 0, max: 60 },
  'player.dash.speed': { min: 1, max: 60 },
  'player.dash.duration': { min: 0.05, max: 2 },
  'player.dash.cooldown': { min: 0, max: 10 },
  'combat.autoAimRange': { min: 2, max: 60 },
  'boss.summon.count': { min: 0, max: 10 },
  'boss.summon.maxAlive': { min: 0, max: 20 },
  'boss.mortar.count': { min: 0, max: 20 },
  'boss.mortar.delay': { min: 0.3, max: 5 },
  'boss.mortar.radius': { min: 0.5, max: 10 },
  'boss.mortar.damage': { min: 0, max: 999 },
  'combat.ranged.damage': { min: 1, max: 9999 },
  'combat.ranged.speed': { min: 1, max: 100 },
  'combat.ranged.cooldown': { min: 0.05, max: 5 },
  'combat.ranged.lifetime': { min: 0.1, max: 10 },
  'combat.ranged.radius': { min: 0.05, max: 2 },
  'combat.ranged.knockback': { min: 0, max: 50 },
  'player.turnSpeed': { min: 1, max: 40 },
  'player.radius': { min: 0.2, max: 2 },
  'combat.melee.damage': { min: 1, max: 9999 },
  'combat.melee.range': { min: 0.5, max: 10 },
  'combat.melee.arcDegrees': { min: 10, max: 360 },
  'combat.melee.cooldown': { min: 0.05, max: 5 },
  'combat.melee.knockback': { min: 0, max: 50 },
  'combat.melee.swingTime': { min: 0.05, max: 2 },
  'enemies.separation': { min: 0, max: 20 },
  'loot.healChance': { min: 0, max: 1 },
  'loot.healAmount': { min: 1, max: 9999 },
  'loot.goldChance': { min: 0, max: 1 },
  'loot.goldMin': { min: 0, max: 99999 },
  'loot.goldMax': { min: 0, max: 99999 },
  'loot.xpPerScore': { min: 0.1, max: 100 },
  'loot.lifetime': { min: 1, max: 600 },
  'loot.magnetRange': { min: 0, max: 30 },
  'loot.magnetSpeed': { min: 0, max: 50 },
  'loot.pickupRadius': { min: 0.2, max: 5 },
  'dungeon.chestLoot.goldMin': { min: 0, max: 99999 },
  'dungeon.chestLoot.goldMax': { min: 0, max: 99999 },
  'dungeon.chestLoot.equipChance': { min: 0, max: 1 },
  'dungeon.chestLoot.healChance': { min: 0, max: 1 },
  'dungeon.chestLoot.interactRange': { min: 0.5, max: 10 },
  'boss.hp': { min: 1, max: 99999 },
  'boss.speed': { min: 0, max: 30 },
  'boss.radius': { min: 0.5, max: 6 },
  'boss.contactDamage': { min: 0, max: 9999 },
  'boss.engageRange': { min: 1, max: 60 },
  'boss.chargeMinRange': { min: 0, max: 60 },
  'boss.chargeDuration': { min: 0.1, max: 5 },
  'boss.recover': { min: 0, max: 5 },
  'boss.cooldown': { min: 0, max: 10 },
  'boss.phase2Ratio': { min: 0, max: 1 },
  'boss.phase2TimeMul': { min: 0.2, max: 1 },
  'boss.phase2SpeedMul': { min: 1, max: 3 },
  'boss.charge.speed': { min: 1, max: 60 },
  'boss.slam.radius': { min: 0.5, max: 30 },
  'boss.slam.damage': { min: 0, max: 9999 },
  'boss.barrage.count': { min: 1, max: 64 },
  'boss.barrage.phase2Count': { min: 1, max: 64 },
  'boss.barrage.damage': { min: 0, max: 9999 },
  'boss.barrage.speed': { min: 1, max: 60 },
  'equipment.dropChance': { min: 0, max: 1 },
  'equipment.inventorySize': { min: 1, max: 200 },
  'equipment.defenseScale': { min: 1, max: 1000 },
  'progression.xpBase': { min: 1, max: 99999 },
  'progression.xpGrowth': { min: 1, max: 3 },
  'progression.hpPerLevel': { min: 0, max: 1000 },
  'progression.damagePerLevel': { min: 0, max: 1 },
  'progression.maxLevel': { min: 1, max: 999 },
  'save.autoSaveInterval': { min: 0.5, max: 600 },
  'performance.autoQualityInterval': { min: 2, max: 60 },
  'performance.autoQualityFps': { min: 10, max: 60 },
  'performance.maxStep': { min: 0.01, max: 0.1 },
  'juice.hitShake.amp': { min: 0, max: 2 },
  'juice.slamShake.amp': { min: 0, max: 3 },
  'juice.hitStop.duration': { min: 0, max: 0.5 },
  'juice.hitStop.timeScale': { min: 0, max: 1 },
  'juice.bossHitStop': { min: 0, max: 2 },
  'progression.levelUpHealRatio': { min: 0, max: 1 },
  'enemies.deathDuration': { min: 0, max: 5 },
  'camera.fov': { min: 30, max: 90 },
  'camera.offset.y': { min: 3, max: 40 },
  'camera.offset.z': { min: 0, max: 40 },
  'camera.smoothing': { min: 0.5, max: 30 },
  'world.arenaHalfSize': { min: 10, max: 200 },
  'graphics.maxPixelRatio': { min: 1, max: 3 },
  'graphics.bloom.strength': { min: 0, max: 3 },
  'graphics.bloom.radius': { min: 0, max: 1 },
  'graphics.bloom.threshold': { min: 0, max: 2 },
};

/** 적 종류 능력치 중 숫자 항목 */
export type EnemyNumericKey = 'hp' | 'speed' | 'radius' | 'damage' | 'attackRange' | 'attackWindup' | 'attackCooldown' | 'aggroRange' | 'score';

/** 적 종류 능력치의 허용 범위 (모든 종류에 같은 범위를 적용) */
export const ENEMY_TYPE_LIMITS: Record<EnemyNumericKey, { min: number; max: number }> = {
  hp: { min: 1, max: 99999 },
  speed: { min: 0, max: 30 },
  radius: { min: 0.2, max: 5 },
  damage: { min: 0, max: 9999 },
  attackRange: { min: 0.3, max: 30 },
  attackWindup: { min: 0, max: 5 },
  attackCooldown: { min: 0.1, max: 20 },
  aggroRange: { min: 1, max: 200 },
  score: { min: 0, max: 99999 },
};

/** 보정된 항목 기록 */
export interface ConfigWarning {
  path: string;
  from: number;
  to: number;
}

const clampNumber = (value: unknown, min: number, max: number): number =>
  typeof value === 'number' && !Number.isNaN(value) ? Math.min(max, Math.max(min, value)) : min;

/**
 * 설정값을 허용 범위 안으로 보정한다.
 * 숫자가 아니거나 범위를 벗어난 값은 가장 가까운 허용값으로 바꾸고, 바꾼 항목 목록을 돌려준다.
 */
export function sanitizeGameConfig(config: GameConfigType): ConfigWarning[] {
  const warnings: ConfigWarning[] = [];

  // 1) 경로로 지정한 단일 값
  for (const [path, { min, max }] of Object.entries(CONFIG_LIMITS)) {
    const keys = path.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let obj: any = config;
    for (let i = 0; i < keys.length - 1; i++) obj = obj?.[keys[i]];
    const last = keys[keys.length - 1];
    if (!obj || typeof obj !== 'object') continue;
    const value = obj[last];
    const fixed = clampNumber(value, min, max);
    if (fixed !== value) {
      obj[last] = fixed;
      warnings.push({ path, from: typeof value === 'number' ? value : NaN, to: fixed });
    }
  }

  // 2) 난이도 배율 (0.1~5)
  for (const [level, preset] of Object.entries(config.difficulty.presets)) {
    for (const key of ['enemyHp', 'enemyDamage', 'enemySpeed'] as const) {
      const value = preset[key];
      const fixed = clampNumber(value, 0.1, 5);
      if (fixed !== value) {
        preset[key] = fixed;
        warnings.push({ path: `difficulty.presets.${level}.${key}`, from: typeof value === 'number' ? value : NaN, to: fixed });
      }
    }
  }

  // 3) 적 종류별 능력치
  for (const [typeName, def] of Object.entries(config.enemies.types)) {
    for (const [key, { min, max }] of Object.entries(ENEMY_TYPE_LIMITS)) {
      const k = key as EnemyNumericKey;
      const value = def[k];
      const fixed = clampNumber(value, min, max);
      if (fixed !== value) {
        def[k] = fixed;
        warnings.push({ path: `enemies.types.${typeName}.${key}`, from: typeof value === 'number' ? value : NaN, to: fixed });
      }
    }
  }

  return warnings;
}
