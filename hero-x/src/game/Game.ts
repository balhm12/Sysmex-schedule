import * as THREE from 'three';
import { CombatSystem } from '../combat/CombatSystem';
import { Effects } from '../combat/Effects';
import { ProjectileSystem } from '../combat/Projectile';
import { ChestSystem } from '../dungeon/Chest';
import { DungeonScene } from '../dungeon/DungeonScene';
import { DUNGEONS, isDungeonUnlocked, nextDungeonAfter, resolveBossConfig, type BossConfig, type DungeonDef } from './DungeonDefs';
import { DungeonSelectUI } from '../ui/DungeonSelectUI';
import { Boss, type BossAttack } from '../enemies/Boss';
import type { Enemy } from '../enemies/Enemy';
import { EnemySpawner } from '../enemies/EnemySpawner';
import { InputManager } from '../input/InputManager';
import { TouchControls } from '../input/TouchControls';
import { EquipmentSystem, applyDefense } from '../items/EquipmentSystem';
import { generateItemAtLeast } from '../items/ItemDatabase';
import { LootSystem } from '../items/LootSystem';
import { InventoryUI } from '../ui/InventoryUI';
import type { Drop } from '../items/loot';
import { PlayerStats } from '../player/PlayerStats';
import { Player } from '../player/Player';
import { PlayerController } from '../player/PlayerController';
import { createPlaceholderModel } from '../player/models/PlaceholderModel';
import { faceFromFile, faceTexture, loadFace, saveFace } from '../player/FaceTexture';
import { modelRegistry } from '../assets/ModelRegistry';
import { soundRegistry } from '../assets/SoundRegistry';
import type { Vec2 } from '../player/movement';
import { ControlsGuide } from '../ui/ControlsGuide';
import { MainMenu } from '../ui/MainMenu';
import { DamageNumbers } from '../ui/DamageNumbers';
import { HUD } from '../ui/HUD';
import { ResultUI } from '../ui/ResultUI';
import { SettingsUI } from '../ui/SettingsUI';
import { EMPTY_RECORDS, applySaveData, cloneRecords, hasProgress, serializeSave, type SaveRecords } from '../save/SaveData';
import { browserStorage, clearSave, loadSave, writeSave } from '../save/SaveStorage';
import { vibrate } from '../utils/haptics';
import { AudioSystem } from '../audio/AudioSystem';
import { decideQuality } from './AutoQuality';
import { RenderPipeline } from '../render/RenderPipeline';
import type { MusicName } from '../audio/soundDefs';
import { Logger } from '../utils/Logger';
import { CameraController } from './CameraController';
import { getDifficultyPreset, loadDifficulty, saveDifficulty } from './Difficulty';
import { GameConfig, sanitizeGameConfig, type DifficultyLevel } from './GameConfig';
import { defaultSettings, loadSettings, saveSettings, sanitizeSettings, type SettingKey, type UserSettings } from './Settings';

/** 테스트·디버그용으로 밖에서 읽을 수 있는 상태 */
export interface GameDebugState {
  running: boolean;
  frames: number;
  ended: boolean;
  save: { status: string; lastSavedAt: string | null; hasSavedProgress: boolean; blocked: boolean; dirty: boolean; records: SaveRecords };
  settings: UserSettings;
  dungeon: { id: string; name: string; arenaHalfSize: number; obstacles: number };
  dungeonSelectVisible: boolean;
  unlockedNow: string | null;
  mortars: number;
  hitStop: number;
  bossModel: string;
  settingsVisible: boolean;
  touchVisible: boolean;
  floatingJoystick: boolean;
  dash: { active: boolean; cooldown: number; invulnerable: number };
  aimRingVisible: boolean;
  audio: { ready: boolean; track: string | null; voices: number; fileMusic: boolean; files: string[]; fetched: string[] };
  contextLost: boolean;
  face: boolean;
  faceVisible: boolean;
  models: { loaded: string[]; playerGltf: boolean };
  pixelRatio: number;
  interactButtonVisible: boolean;
  shadowsEnabled: boolean;
  quality: string;
  bloomEnabled: boolean;
  exposure: number;
  cameraDistanceScale: number;
  player: { x: number; z: number; facing: number; moving: boolean; hp: number; maxHp: number };
  camera: { x: number; y: number; z: number };
  guideVisible: boolean;
  resultVisible: boolean;
  mode: string;
  menuVisible: boolean;
  runActive: boolean;
  enemies: Array<{ type: string; x: number; z: number; hp: number; state: string }>;
  aliveEnemies: number;
  projectiles: number;
  playerY: number;
  groundY: number;
  difficulty: string;
  pickups: number;
  stats: { level: number; xp: number; xpToNext: number; gold: number; maxHp: number };
  equipment: { inventory: number; equipped: Record<string, string | null>; totals: { attack: number; defense: number; maxHp: number; moveSpeed: number } };
  paused: boolean;
  inventoryVisible: boolean;
  chests: { opened: number; total: number; nearby: boolean };
  prompt: string;
  boss: { alive: boolean; hp: number; maxHp: number; state: string; phase2: boolean } | null;
  bossDefeated: boolean;
  kills: number;
  score: number;
  input: { pointerX: number; pointerY: number; pointerHas: boolean; pressed: string[] };
}

/**
 * 게임 본체: 렌더러·씬·카메라를 만들고, 각 시스템(던전, 플레이어, 입력, 적, 전투, 카메라, UI)을 연결해 매 프레임 갱신한다.
 * - 새로운 시스템(아이템, 보스, 저장 등)은 이 클래스에 '추가'하는 방식으로 붙인다. 기존 시스템은 서로 직접 참조하지 않는다.
 */
export class Game {
  private readonly renderer: THREE.WebGLRenderer;
  /** 톤매핑·환경광·후처리(블룸)를 맡는 렌더 파이프라인 */
  private readonly pipeline: RenderPipeline;
  private readonly scene = new THREE.Scene();
  private readonly camera: THREE.PerspectiveCamera;
  private readonly input = new InputManager();
  /** 현재 던전 공간 (던전을 바꾸면 새로 만든다) */
  private dungeon: DungeonScene;
  /** 현재 던전 정의 */
  private dungeonDef: DungeonDef = DUNGEONS[0];
  /** 현재 던전의 보스 설정 */
  private bossCfg: BossConfig = resolveBossConfig(DUNGEONS[0]);
  private readonly dungeonSelect: DungeonSelectUI;
  /** 이번 클리어로 새로 열린 던전 (결과 화면 안내용) */
  private unlockedNow: DungeonDef | null = null;
  // 자동 화질: 플레이 중 FPS 표본
  private qualityFrames = 0;
  private qualityTime = 0;
  private readonly qualitySamples: number[] = [];
  /** 그래픽 장치 연결이 끊긴 상태 (WebGL context lost) */
  private contextLost = false;
  /** 복구 직후 잠시 동안은 프레임 오류를 치명적으로 보지 않는다 (셰이더 재컴파일 중 일시 오류) */
  private restoreGraceUntil = 0;
  /** 히트 스톱: 남은 시간 동안 시뮬레이션 시간이 느리게 흐른다 */
  private hitStopTime = 0;
  /** 얼굴 사진 (data URL). null 이면 기본 얼굴 */
  private face: string | null = loadFace();
  /** 플레이어가 정식 glb 모델을 쓰는 중인지 */
  private playerUsesGltf = false;
  /** 소리 (효과음·음악, 코드 합성) */
  private readonly audio = new AudioSystem();
  /** 자동 조준 표시: 터치 조작 중 겨누는 적 발밑의 고리 */
  private readonly aimRing: THREE.Mesh;
  /** 보스 포격: 예고 뒤 터질 지점들 */
  private mortars: Array<{ x: number; z: number; t: number; radius: number; damage: number }> = [];
  private readonly player: Player;
  private readonly controller: PlayerController;
  private readonly cameraCtrl: CameraController;
  private readonly spawner: EnemySpawner;
  private readonly effects: Effects;
  private readonly projectiles: ProjectileSystem;
  private readonly combat: CombatSystem;
  private readonly guide: ControlsGuide;
  private readonly menu: MainMenu;
  private readonly settingsUI: SettingsUI;
  /** 터치 조작 (설정 touchControls 가 켜져 있고 플레이 중일 때만 보인다) */
  private readonly touch: TouchControls;
  /** 사용자 설정 (설정 화면에서 바꾸고 브라우저에 저장) */
  private settings: UserSettings = defaultSettings();
  /** 게임 흐름: menu(메인 메뉴) → play(던전) → result(결과) */
  private mode: 'menu' | 'play' | 'result' = 'menu';
  /** 진행 중인 게임이 있는지 (메뉴에서 '이어하기' 가능) */
  private runActive = false;
  private readonly hud: HUD;
  private readonly result: ResultUI;
  private readonly damageNumbers: DamageNumbers;
  private readonly loot: LootSystem;
  private chests: ChestSystem;
  private readonly inventoryUI: InventoryUI;
  readonly stats = new PlayerStats();
  readonly equipment = new EquipmentSystem();
  /** 장비 화면이 열려 게임이 멈춘 상태 */
  private paused = false;
  /** 현재 보스 (등장 전·처치 후에는 null) */
  private boss: Boss | null = null;
  private bossDefeated = false;
  private difficulty: DifficultyLevel = loadDifficulty();

  // 저장: 성장·장비·기록을 브라우저 저장소에 자동 저장한다 (던전 안 위치는 저장하지 않는다)
  private readonly storage = browserStorage();
  private records: SaveRecords = { ...EMPTY_RECORDS };
  /** 저장소에 의미 있는 진행이 있는지 (새로고침 뒤 '이어하기' 가능 여부) */
  private hasSavedProgress = false;
  /** 더 새로운 버전의 저장이 있어 덮어쓰지 않는 상태 ('새 게임'을 누르면 풀린다) */
  private saveBlocked = false;
  private saveDirty = false;
  private saveTimer = 0;
  private lastSavedAt: string | null = null;
  /** 메뉴에 보여줄 저장 상태 문구 */
  private saveStatus = '';
  private readonly projTmp = new THREE.Vector3();

  private readonly raycaster = new THREE.Raycaster();
  private readonly groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  private readonly aimHit = new THREE.Vector3();
  private readonly camTarget = new THREE.Vector3();

  private running = false;
  /** 쓰러졌거나 모든 적을 처치해 전투가 끝난 상태 */
  private ended = false;
  private rafId = 0;
  private lastTime = 0;
  private frames = 0;
  private fpsFrames = 0;
  private fpsTime = 0;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    uiRoot: HTMLElement,
  ) {
    // 설정값 검증 (범위를 벗어난 값은 보정하고 알린다)
    for (const w of sanitizeGameConfig(GameConfig)) {
      Logger.warn(`설정 '${w.path}' 값 ${w.from} 은(는) 허용 범위를 벗어나 ${w.to} 로 보정했습니다.`);
    }

    // 사용자 설정은 적을 생성하기 전에 읽는다 (적 체력 배율·난이도가 생성 시 적용되므로)
    this.loadSettingsFromStorage();

    const g = GameConfig.graphics;
    this.pipeline = new RenderPipeline(canvas);
    this.renderer = this.pipeline.renderer;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, g.maxPixelRatio));
    // 그래픽 장치 연결이 끊기면(메모리 부족·절전 등) 멈췄다가 복구되면 이어서 그린다
    canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      this.contextLost = true;
      this.hud.showBanner('그래픽 연결이 끊겼습니다. 복구 중…', 4000);
      Logger.warn('WebGL 컨텍스트가 끊겼습니다. 복구를 기다립니다.');
    });
    canvas.addEventListener('webglcontextrestored', () => {
      this.contextLost = false;
      this.lastTime = performance.now();
      this.restoreGraceUntil = performance.now() + 3000;
      this.hud.showBanner('그래픽 연결이 복구됐습니다', 1500);
      Logger.info('WebGL 컨텍스트가 복구됐습니다.');
    });

    const c = GameConfig.camera;
    this.camera = new THREE.PerspectiveCamera(c.fov, 1, c.near, c.far);

    // 시스템 구성
    this.scene.environment = this.pipeline.environment();
    this.dungeon = new DungeonScene(this.scene, this.dungeonDef, this.settings.quality);
    this.pipeline.setExposure(this.dungeonDef.theme.exposure);
    this.chests = new ChestSystem(this.scene, this.dungeonDef.chests);
    this.dungeon.addCollisionBoxes(this.chests.getCollisionBoxes());
    // 충돌 세계는 던전이 바뀌어도 같은 객체를 쓰도록 현재 던전으로 넘겨주는 껍데기를 준다
    const world = { getObstacleBoxes: () => this.dungeon.getObstacleBoxes(), getArenaHalfSize: () => this.dungeon.getArenaHalfSize() };
    this.player = new Player(createPlaceholderModel(GameConfig.player.colors), GameConfig.player.startPosition);
    this.scene.add(this.player.object3d);
    this.cameraCtrl = new CameraController(this.camera);
    this.controller = new PlayerController(this.player, this.input, world, () => this.cameraCtrl.getYaw(), () => 1 + this.equipment.totals().moveSpeed);
    this.controller.onJump = () => this.audio.play('jump');
    this.controller.onDash = (dir) => {
      this.audio.play('dash');
      const p = this.player.position;
      // 뒤쪽으로 파편을 흩어 '휙' 하는 느낌
      this.effects.burst(new THREE.Vector3(p.x - dir.x * 0.5, 0.4, p.z - dir.z * 0.5), 0x5cf2d8, 10, 4);
      if (this.settings.haptics) vibrate(10);
    };
    this.aimRing = new THREE.Mesh(new THREE.RingGeometry(0.55, 0.72, 32), new THREE.MeshBasicMaterial({ color: 0x5cf2d8, transparent: true, opacity: 0.8, side: THREE.DoubleSide, depthWrite: false }));
    this.aimRing.rotation.x = -Math.PI / 2;
    this.aimRing.position.y = 0.06;
    this.aimRing.visible = false;
    this.scene.add(this.aimRing);
    this.effects = new Effects(this.scene);
    this.projectiles = new ProjectileSystem(this.scene);
    this.spawner = new EnemySpawner(this.scene);
    this.applyDifficultyToSpawner();
    this.spawner.spawnFromConfig(this.dungeonDef.spawns);
    this.combat = new CombatSystem(
      this.player, this.input, () => this.spawner.getEnemies(), () => this.getAimPoint(), this.effects, this.projectiles,
      (enemy, damage, killed) => {
        this.audio.play(killed ? 'kill' : 'enemyHit', 0.05);
        if (killed) {
          this.hitStopTime = Math.max(this.hitStopTime, enemy.type === 'boss' ? GameConfig.juice.bossHitStop : GameConfig.juice.hitStop.duration);
          if (enemy.type === 'boss') this.cameraCtrl.shake(GameConfig.juice.slamShake.amp, 0.6);
          this.loot.dropFor(enemy.def.score, { x: enemy.position.x, z: enemy.position.z }, this.dungeonDef.rewardMul);
          if (this.settings.haptics) vibrate(enemy.type === 'boss' ? [60, 40, 120] : 18);
        }
        if (!this.settings.showDamageNumbers) return;
        this.projTmp.set(enemy.position.x, 1.6, enemy.position.z);
        this.damageNumbers.show(this.projTmp, killed ? enemy.def.score : damage, killed ? 'kill' : 'enemy');
      },
      () => this.effectiveDamageMultiplier(),
      (kind) => this.equipment.weaponAttack(kind),
    );
    this.combat.onAttack = (kind) => this.audio.play(kind);
    this.loot = new LootSystem(this.scene);

    // UI
    this.damageNumbers = new DamageNumbers(uiRoot, (pos) => this.projectToScreen(pos));
    this.guide = new ControlsGuide(uiRoot, () => this.guide.hide());
    this.touch = new TouchControls(
      uiRoot,
      this.input,
      () => {
        if (this.mode === 'play') this.openMenu();
      },
      () => {
        if (this.mode === 'play') this.toggleInventory();
      },
    );
    this.hud = new HUD(uiRoot);
    this.hud.setDungeonName(this.dungeonDef.name);
    this.result = new ResultUI(uiRoot, () => this.retry(), () => this.openMenu(), () => this.openDungeons());
    this.dungeonSelect = new DungeonSelectUI(uiRoot, {
      clears: () => this.records.dungeonClears,
      level: () => this.stats.level,
      enter: (def) => this.enterDungeon(def),
      onClose: () => this.closeDungeons(),
    });
    this.loadFromStorage();
    this.menu = new MainMenu(uiRoot, {
      newGame: () => this.newGame(),
      continueGame: () => this.continueGame(),
      openSettings: () => this.openSettings(),
      openDungeons: () => this.openDungeons(),
      hasProgress: () => this.runActive || this.hasSavedProgress,
      progressText: () => this.progressText(),
      saveNote: () => this.saveStatus,
      openInventory: () => this.toggleInventory(true),
      openGuide: () => this.guide.show(),
      hasRun: () => this.runActive,
      difficulty: { get: () => this.difficulty, set: (level) => this.setDifficulty(level) },
    });
    this.settingsUI = new SettingsUI(uiRoot, {
      get: () => this.settings,
      set: (key, value) => this.updateSetting(key, value),
      resetAll: () => this.resetSettings(),
      onClose: () => this.closeSettings(),
      face: {
        get: () => this.face,
        pick: async (file) => {
          const data = await faceFromFile(file);
          this.face = data;
          if (!saveFace(data)) Logger.warn('얼굴 사진을 브라우저에 저장하지 못했습니다 (용량 또는 저장소 제한). 이번 실행에서만 보입니다.');
          await this.applyFace();
          Logger.info('얼굴 사진을 적용했습니다.');
        },
        clear: () => {
          this.face = null;
          saveFace(null);
          void this.applyFace();
        },
      },
    });
    this.inventoryUI = new InventoryUI(uiRoot, this.equipment, {
      onChange: () => {
        this.applyStats();
        this.markDirty();
      },
      onClose: () => this.toggleInventory(false),
      getSummary: () => this.statSummary(),
    });
    this.applyDifficulty();
    this.applySettings();

    // 입력 연결
    this.input.attach(window, canvas);
    this.audio.attach(window);
    // 메뉴·창의 버튼을 누르면 짧은 효과음
    uiRoot.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).closest('button')) this.audio.play('ui');
    });
    this.audio.playMusic('menu');
    this.input.onPress(GameConfig.controls.toggleGuide, () => this.guide.toggle());
    this.input.onPress(GameConfig.controls.restart, () => {
      if (this.mode === 'result') this.retry();
    });
    this.input.onPress(GameConfig.controls.toggleInventory, () => {
      if (this.mode !== 'menu') this.toggleInventory();
    });
    this.input.onPress(GameConfig.controls.interact, () => this.tryInteract());
    this.input.onPress(['Escape'], () => {
      if (this.guide.visible) this.guide.hide();
      else if (this.settingsUI.visible) this.settingsUI.pressBack();
      else if (this.dungeonSelect.visible) this.closeDungeons();
      else if (this.inventoryUI.visible) this.toggleInventory(false);
      else if (this.mode === 'play') this.openMenu();
    });
    this.input.onPress(['Enter'], () => {
      if (this.mode === 'menu' && !this.inventoryUI.visible && !this.guide.visible && !this.settingsUI.visible && !this.dungeonSelect.visible) this.menu.pressPrimary();
    });
    this.hud.hide();
    this.menu.show();

    // 얼굴 사진·정식 모델은 비동기로 붙인다 (실패해도 임시 모델로 계속)
    void this.applyFace();
    modelRegistry.onPlayerReady = () => this.swapPlayerModel();
    void modelRegistry.load(import.meta.env.BASE_URL);
    void soundRegistry.load(import.meta.env.BASE_URL);

    window.addEventListener('resize', this.resize);
    // 탭을 닫거나 숨길 때 바뀐 것이 있으면 바로 저장한다
    window.addEventListener('beforeunload', this.flushSave);
    document.addEventListener('visibilitychange', this.onVisibility);
    this.resize();
    Logger.info(`${GameConfig.meta.title} v${GameConfig.meta.version} 준비 완료 (적 ${this.spawner.aliveCount}마리)`);
  }

  /** 게임 루프 시작 */
  start(): void {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    this.rafId = requestAnimationFrame(this.loop);
  }

  /** 게임 루프 정지 */
  stop(): void {
    this.running = false;
    cancelAnimationFrame(this.rafId);
  }

  /** 난이도 변경: 저장하고 전투를 다시 시작한다 (적 체력 배율이 생성 시 적용되기 때문) */
  setDifficulty(level: DifficultyLevel): void {
    if (level === this.difficulty) return;
    this.difficulty = level;
    this.settings.difficulty = level;
    saveSettings(this.storage, this.settings);
    this.settingsUI?.refresh();
    this.markDirty();
    saveDifficulty(level);
    this.applyDifficulty();
    this.restart();
    Logger.info(`난이도: ${getDifficultyPreset(level).label}`);
  }

  getDifficulty(): DifficultyLevel {
    return this.difficulty;
  }

  private applyDifficultyToSpawner(): void {
    const p = getDifficultyPreset(this.difficulty);
    // 사용자 설정의 적 체력 배율은 난이도 배율에 곱한다 (새로 생성되는 적부터)
    this.spawner.multipliers = { hp: p.enemyHp * this.settings.enemyHpMul, speed: p.enemySpeed };
  }

  // ---------- 사용자 설정 ----------

  /** 저장된 사용자 설정을 읽는다. 없으면 옛 난이도 저장값을 이어받는다 */
  private loadSettingsFromStorage(): void {
    const r = loadSettings(this.storage);
    this.settings = r.settings;
    for (const w of r.warnings) Logger.warn(`설정 보정: ${w}`);
    if (!r.found) this.settings.difficulty = this.difficulty;
    this.difficulty = this.settings.difficulty;
  }

  /** 설정 하나를 바꾸고 바로 적용·저장한다 */
  updateSetting<K extends SettingKey>(key: K, value: UserSettings[K]): void {
    const next = sanitizeSettings({ ...this.settings, [key]: value }).settings;
    if (key === 'difficulty') {
      this.settings = next;
      saveSettings(this.storage, this.settings);
      this.setDifficulty(next.difficulty);
      return;
    }
    this.settings = next;
    saveSettings(this.storage, this.settings);
    this.applySettings();
  }

  /** 모든 설정을 기본값으로 */
  resetSettings(): void {
    const prevDifficulty = this.settings.difficulty;
    this.settings = defaultSettings();
    saveSettings(this.storage, this.settings);
    this.applySettings();
    if (prevDifficulty !== this.settings.difficulty) this.setDifficulty(this.settings.difficulty);
    Logger.info('설정을 기본값으로 되돌렸습니다.');
  }

  /** 현재 설정을 게임 시스템에 반영한다 (난이도·적 체력 배율은 다음 생성부터) */
  private applySettings(): void {
    const s = this.settings;
    this.cameraCtrl.distanceScale = s.cameraDistance;
    if (this.renderer.shadowMap.enabled !== s.shadows) {
      this.renderer.shadowMap.enabled = s.shadows;
      // 그림자 켜고 끄기는 재질을 다시 컴파일해야 바로 반영된다
      this.scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (!mesh.isMesh) return;
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        for (const m of mats) m.needsUpdate = true;
      });
    }
    this.dungeon.setShadows(s.shadows);
    this.pipeline.setQuality(s.quality);
    this.dungeon.applyQuality(s.quality);
    if (!s.showFps) this.guide.setHudText('');
    this.applyPixelRatio();
    this.audio.setVolumes({ master: s.soundMaster, sfx: s.soundSfx, music: s.soundMusic });
    if (this.touch.isFloating !== s.floatingJoystick) this.touch.setFloating(s.floatingJoystick);
    this.touch.setLeftHanded(s.leftHanded);
    this.touch.setButtonScale(s.touchButtonScale);
    this.updateTouchVisibility();
    this.applyDifficultyToSpawner();
    this.applyStats();
  }

  /** 렌더 해상도: 기기 배율(상한 graphics.maxPixelRatio) × 사용자 설정 */
  private applyPixelRatio(): void {
    const base = Math.min(window.devicePixelRatio || 1, GameConfig.graphics.maxPixelRatio);
    this.pipeline.setPixelRatio(Math.max(0.3, base * this.settings.resolution));
  }

  getSettings(): UserSettings {
    return { ...this.settings };
  }

  openSettings(): void {
    this.inventoryUI.hide();
    this.guide.hide();
    this.settingsUI.show();
  }

  closeSettings(): void {
    this.settingsUI.hide();
    if (this.mode === 'menu') this.menu.refresh();
  }

  private applyDifficulty(): void {
    this.applyDifficultyToSpawner();
    this.menu?.refresh();
  }

  /** 새 게임: 레벨·골드·장비·기록을 모두 초기화하고 던전에 들어간다. 저장 데이터도 새로 쓴다 */
  newGame(): void {
    this.stats.reset();
    this.equipment.reset();
    this.records = cloneRecords(EMPTY_RECORDS);
    this.saveBlocked = false;
    clearSave(this.storage);
    this.enterDungeon(DUNGEONS[0]);
    Logger.info('새 게임을 시작합니다.');
  }

  /** 던전 입장: 던전 공간을 새로 만들고 전투를 시작한다 (성장은 유지) */
  enterDungeon(def: DungeonDef): void {
    if (!isDungeonUnlocked(def, this.records.dungeonClears)) {
      Logger.warn(`던전 '${def.name}' 은(는) 아직 잠겨 있습니다.`);
      return;
    }
    this.loadDungeon(def);
    this.restart();
    this.runActive = true;
    this.saveNow();
    this.dungeonSelect.hide();
    this.enterPlay();
    this.hud.showBanner(def.name, 1800);
  }

  /** 던전 공간 교체 (같은 던전이면 유지) */
  private loadDungeon(def: DungeonDef): void {
    if (def.id === this.dungeonDef.id && this.dungeon.def.id === def.id) return;
    this.chests.dispose();
    this.dungeon.dispose();
    this.dungeonDef = def;
    this.bossCfg = resolveBossConfig(def);
    this.dungeon = new DungeonScene(this.scene, def, this.settings.quality);
    this.pipeline.setExposure(def.theme.exposure);
    this.chests = new ChestSystem(this.scene, def.chests);
    this.dungeon.addCollisionBoxes(this.chests.getCollisionBoxes());
    this.hud.setDungeonName(def.name);
    Logger.info(`던전 '${def.name}' 을(를) 불러왔습니다 (적 ${def.spawns.length}마리, 상자 ${def.chests.length}개).`);
  }

  openDungeons(): void {
    if (!this.runActive && !this.hasSavedProgress) return;
    this.inventoryUI.hide();
    this.settingsUI.hide();
    this.guide.hide();
    if (this.mode === 'result') {
      this.result.hide();
      this.mode = 'menu';
      this.hud.hide();
      this.menu.show();
    }
    this.dungeonSelect.show();
  }

  closeDungeons(): void {
    this.dungeonSelect.hide();
    if (this.mode === 'menu') this.menu.refresh();
  }

  getDungeonId(): string {
    return this.dungeonDef.id;
  }

  /** 이어하기: 멈춰 둔 던전으로 돌아간다. 새로고침 뒤라면(저장만 있음) 성장을 유지한 채 던전 입구부터 */
  continueGame(): void {
    if (!this.runActive) {
      // 새로고침 뒤에는 멈춰 둔 던전이 없으므로 던전을 고르게 한다
      if (this.hasSavedProgress) this.openDungeons();
      return;
    }
    this.enterPlay();
  }

  /** 결과 화면에서 다시 도전 (레벨·골드·장비 유지) */
  retry(): void {
    this.restart();
    this.runActive = true;
    this.enterPlay();
  }

  /** 메인 메뉴 열기 (던전은 그대로 멈춘다) */
  openMenu(): void {
    this.mode = 'menu';
    this.inventoryUI.hide();
    this.paused = false;
    this.result.hide();
    this.hud.hide();
    this.touch.hide();
    this.saveNow();
    this.menu.show();
    this.audio.playMusic('menu');
  }

  /** 현재 던전의 음악 트랙 (정의가 없으면 숲) */
  private dungeonMusic(): MusicName {
    const id = this.dungeonDef.id;
    return id === 'cave' || id === 'fortress' || id === 'forest' ? id : 'forest';
  }

  /** 얼굴 사진을 현재 플레이어 모델에 붙인다 (지원하는 모델만) */
  private async applyFace(): Promise<void> {
    const model = this.player.currentModel;
    if (!model.setFace) return;
    if (!this.face) {
      model.setFace(null);
      return;
    }
    try {
      model.setFace(await faceTexture(this.face));
    } catch (err) {
      Logger.warn('얼굴 사진을 붙이지 못했습니다.', err);
    }
  }

  /** 정식 glb 플레이어 모델이 로드되면 교체 */
  private swapPlayerModel(): void {
    const m = modelRegistry.createPlayerModel();
    if (!m) return;
    this.player.setModel(m);
    this.playerUsesGltf = true;
    Logger.info('플레이어 정식 모델로 교체했습니다.');
  }

  getFace(): string | null {
    return this.face;
  }

  /** 터치 조작은 설정이 켜져 있고 플레이 중일 때만 보인다 */
  private updateTouchVisibility(): void {
    const on = this.settings.touchControls && this.mode === 'play';
    if (on) this.touch.show();
    else this.touch.hide();
    // 터치 조작 중에는 키보드 안내 문구(왼쪽 아래)를 숨긴다 (조이스틱과 겹침)
    document.body.classList.toggle('touch-mode', on);
  }

  // ---------- 저장 ----------

  /** 시작할 때 저장 데이터를 읽어 적용한다. 손상·버전 문제는 메뉴 문구와 콘솔로 알린다 */
  private loadFromStorage(): void {
    const r = loadSave(this.storage);
    switch (r.kind) {
      case 'loaded':
        applySaveData(r.data, { stats: this.stats, equipment: this.equipment });
        this.records = cloneRecords(r.data.records);
        this.difficulty = r.data.difficulty;
        saveDifficulty(this.difficulty);
        this.hasSavedProgress = hasProgress(r.data);
        this.lastSavedAt = r.data.savedAt;
        this.saveStatus = `마지막 저장: ${formatSavedAt(r.data.savedAt)}`;
        if (r.warnings.length > 0) {
          this.saveStatus += ' · 일부 항목을 보정했습니다 (F12 콘솔 참고)';
          for (const w of r.warnings) Logger.warn(`저장 데이터 보정: ${w}`);
        }
        Logger.info(`저장 데이터를 불러왔습니다. 레벨 ${this.stats.level} · 골드 ${this.stats.gold}`);
        break;
      case 'corrupt':
        this.saveStatus = '저장 데이터가 손상되어 새로 시작합니다. 손상된 데이터는 따로 보관했습니다.';
        Logger.warn(r.message);
        break;
      case 'newer':
        this.saveBlocked = true;
        this.saveStatus = '이 저장 데이터는 더 새로운 버전의 게임에서 만든 것이라 읽지 않습니다. 새 게임을 누르면 덮어씁니다.';
        Logger.warn(r.message);
        break;
      case 'unavailable':
        this.saveStatus = '이 브라우저에서는 저장이 되지 않습니다 (사생활 보호 모드 등).';
        Logger.warn('브라우저 저장소를 쓸 수 없어 진행이 저장되지 않습니다.');
        break;
      default:
        this.saveStatus = '저장된 진행이 없습니다.';
    }
  }

  /** 바뀐 것이 있다고 표시한다. 자동 저장 간격이 지나면 저장된다 */
  private markDirty(): void {
    this.saveDirty = true;
  }

  /** 지금 바로 저장한다. 성공하면 true (저장소가 없거나 막혀 있으면 false) */
  saveNow(): boolean {
    this.saveDirty = false;
    this.saveTimer = 0;
    if (this.saveBlocked) return false;
    const data = serializeSave({ stats: this.stats, equipment: this.equipment, difficulty: this.difficulty, records: this.records });
    const ok = writeSave(this.storage, data);
    if (ok) {
      this.hasSavedProgress = hasProgress(data);
      this.lastSavedAt = data.savedAt;
      this.saveStatus = `마지막 저장: ${formatSavedAt(data.savedAt)}`;
    } else {
      this.saveStatus = this.storage ? '저장에 실패했습니다 (저장 공간 부족 또는 차단). 진행이 기억되지 않을 수 있습니다.' : '이 브라우저에서는 저장이 되지 않습니다 (사생활 보호 모드 등).';
    }
    if (this.menu?.visible) this.menu.refresh();
    return ok;
  }

  private readonly flushSave = (): void => {
    if (this.saveDirty) this.saveNow();
  };

  private readonly onVisibility = (): void => {
    if (document.visibilityState === 'hidden') this.flushSave();
  };

  /** 메뉴에 보여줄 진행 요약 */
  private progressText(): string {
    if (!this.runActive && !this.hasSavedProgress) return '';
    const r = this.records;
    const opened = DUNGEONS.filter((d) => isDungeonUnlocked(d, r.dungeonClears)).length;
    const parts = [`레벨 ${this.stats.level}`, `골드 ${this.stats.gold}`, `클리어 ${r.clears}회`, `열린 던전 ${opened}/${DUNGEONS.length}`];
    if (r.bestScore > 0) parts.push(`최고 점수 ${r.bestScore}`);
    if (!this.runActive) parts.push('이어하기는 던전 선택부터');
    return parts.join(' · ');
  }

  /** 누적 기록 (테스트·디버그용) */
  getRecords(): SaveRecords {
    return cloneRecords(this.records);
  }

  private enterPlay(): void {
    this.mode = 'play';
    this.menu.hide();
    this.guide.hide();
    this.settingsUI.hide();
    this.dungeonSelect.hide();
    this.result.hide();
    this.hud.show();
    this.updateTouchVisibility();
    this.audio.playMusic(this.boss && this.boss.alive ? 'boss' : this.dungeonMusic());
    this.lastTime = performance.now();
    this.canvas.focus();
  }

  private currentPrompt = '';

  /** 상호작용 키: 가까운 보물 상자를 연다 */
  private tryInteract(): void {
    if (this.ended || this.paused || this.player.health.isDead) return;
    const p = this.player.position;
    const chest = this.chests.nearest({ x: p.x, z: p.z });
    if (!chest || !this.chests.open(chest)) return;
    const drops = this.loot.dropChest({ x: chest.x, z: chest.z });
    this.audio.play('chest');
    if (this.settings.haptics) vibrate(25);
    this.effects.burst(new THREE.Vector3(chest.x, 1, chest.z), 0xffd23f, 16, 5);
    this.damageNumbers.showText(new THREE.Vector3(chest.x, 1.8, chest.z), '보물 상자!', '#ffd23f');
    Logger.info(`보물 상자 개봉: ${drops.map((d) => (d.kind === 'equip' ? d.item?.name : `${d.kind} ${d.amount}`)).join(', ')}`);
  }

  /** 장비 화면 열기/닫기. 열려 있는 동안 게임은 멈춘다 */
  toggleInventory(open = !this.inventoryUI.visible): void {
    if (open) {
      this.inventoryUI.show();
      this.paused = true;
    } else {
      this.inventoryUI.hide();
      this.paused = false;
      this.lastTime = performance.now();
    }
    if (this.mode === 'menu') this.menu.refresh();
  }

  /** 레벨·장비 보너스를 플레이어 체력에 반영 (최대 체력이 줄면 현재 체력도 그 안으로) */
  private applyStats(): void {
    const h = this.player.health;
    h.maxHp = this.effectiveMaxHp();
    if (h.hp > h.maxHp) h.hp = h.maxHp;
  }

  /** 레벨·장비 보너스에 사용자 설정 배율까지 곱한 최대 체력 */
  private effectiveMaxHp(): number {
    return Math.max(1, Math.round((this.stats.maxHp + this.equipment.totals().maxHp) * this.settings.playerHpMul));
  }

  /** 레벨 보너스에 사용자 설정 배율을 곱한 공격력 배율 */
  private effectiveDamageMultiplier(): number {
    return this.stats.damageMultiplier * this.settings.playerDamageMul;
  }

  /** 장비 화면 위에 보여줄 요약 */
  private statSummary(): string {
    const t = this.equipment.totals();
    const melee = Math.round((GameConfig.combat.melee.damage + this.equipment.weaponAttack('melee')) * this.effectiveDamageMultiplier());
    const ranged = Math.round((GameConfig.combat.ranged.damage + this.equipment.weaponAttack('ranged')) * this.effectiveDamageMultiplier());
    const speed = Math.round((1 + t.moveSpeed) * 100);
    return `레벨 ${this.stats.level} · 골드 ${this.stats.gold} · 근접 ${melee} · 원거리 ${ranged} · 방어 ${t.defense} · 최대 체력 ${this.player.health.maxHp} · 속도 ${speed}%`;
  }

  /** 전투 재시작: 플레이어 회복·복귀, 적 재배치, 기록 초기화 */
  restart(): void {
    this.spawner.clear();
    this.spawner.spawnFromConfig(this.dungeonDef.spawns);
    this.unlockedNow = null;
    this.projectiles.clear();
    this.damageNumbers.clear();
    this.loot.clear();
    this.chests.reset();
    this.boss = null;
    this.bossDefeated = false;
    this.mortars.length = 0;
    this.hud.setBoss(null);
    // 레벨·골드·장비는 유지하고(성장), 체력은 보너스를 포함해 가득 채운다
    // (player.reset 이 기본 최대 체력으로 되돌리므로 그 뒤에 보너스를 적용해야 한다)
    this.player.reset(GameConfig.player.startPosition);
    this.player.health.reset(this.effectiveMaxHp());
    this.controller.reset();
    this.combat.reset();
    this.result.hide();
    this.ended = false;
    Logger.info('전투를 다시 시작합니다.');
  }

  /** 결과 화면 표시 (쓰러짐·클리어 공용) */
  private showResult(title: string, sub: string): void {
    this.ended = true;
    this.mode = 'result';
    this.runActive = false;
    this.inventoryUI.hide();
    this.touch.hide();
    this.paused = false;
    // 한 판의 기록을 누적하고 저장한다
    this.records.totalKills += this.combat.kills;
    this.records.bestScore = Math.max(this.records.bestScore, this.combat.score);
    this.audio.play(this.player.health.isDead ? 'defeat' : 'clear');
    this.audio.playMusic(null);
    this.saveNow();
    this.result.show(title, sub);
  }

  /** 모든 자원 정리 (페이지를 떠나거나 게임을 완전히 종료할 때) */
  dispose(): void {
    this.stop();
    this.input.detach();
    this.audio.dispose();
    window.removeEventListener('resize', this.resize);
    window.removeEventListener('beforeunload', this.flushSave);
    document.removeEventListener('visibilitychange', this.onVisibility);
    this.aimRing.removeFromParent();
    this.aimRing.geometry.dispose();
    (this.aimRing.material as THREE.Material).dispose();
    this.spawner.dispose();
    this.projectiles.dispose();
    this.loot.dispose();
    this.chests.dispose();
    this.effects.dispose();
    this.player.dispose();
    this.dungeon.dispose();
    this.pipeline.dispose();
  }

  /** 플레이어를 지정한 위치로 옮긴다 (테스트·디버그용, 나중에 리스폰·순간이동에도 사용) */
  setPlayerPosition(x: number, z: number): void {
    this.player.position.set(x, 0, z);
  }

  /** 일반 적을 모두 즉시 처치한다 (테스트·디버그용: 보스전으로 바로 가기) */
  debugDefeatRegularEnemies(): void {
    for (const e of this.spawner.getEnemies()) {
      if (e.alive && e !== this.boss) this.combat.damageEnemy(e, 99999, { x: 0, z: 1 }, 0);
    }
  }

  /** 테스트·디버그용 상태 */
  getDebugState(): GameDebugState {
    const p = this.player.position;
    const cam = this.camera.position;
    const pointer = this.input.getPointer();
    return {
      running: this.running,
      frames: this.frames,
      ended: this.ended,
      settings: { ...this.settings },
      dungeon: { id: this.dungeonDef.id, name: this.dungeonDef.name, arenaHalfSize: this.dungeon.getArenaHalfSize(), obstacles: this.dungeon.getObstacleBoxes().length },
      dungeonSelectVisible: this.dungeonSelect.visible,
      unlockedNow: this.unlockedNow?.id ?? null,
      mortars: this.mortars.length,
      hitStop: this.hitStopTime,
      bossModel: this.bossCfg.model,
      settingsVisible: this.settingsUI.visible,
      touchVisible: this.touch.visible,
      floatingJoystick: this.touch.isFloating,
      dash: { active: this.controller.dashing, cooldown: this.controller.dashCooldownRatio, invulnerable: this.player.health.invulnerable },
      aimRingVisible: this.aimRing.visible,
      audio: { ready: this.audio.ready, track: this.audio.currentTrack, voices: this.audio.voices, fileMusic: this.audio.usingFileMusic, files: this.audio.fileKeys, fetched: soundRegistry.loadedKeys },
      contextLost: this.contextLost,
      face: this.face !== null,
      faceVisible: this.player.faceVisible,
      models: { loaded: modelRegistry.loadedKeys, playerGltf: this.playerUsesGltf },
      pixelRatio: this.renderer.getPixelRatio(),
      interactButtonVisible: this.touch.visible && !(document.getElementById('touch-interact') as HTMLButtonElement | null)?.hidden,
      shadowsEnabled: this.renderer.shadowMap.enabled,
      quality: this.pipeline.currentQuality,
      bloomEnabled: this.pipeline.bloomEnabled,
      exposure: this.renderer.toneMappingExposure,
      cameraDistanceScale: this.cameraCtrl.distanceScale,
      save: { status: this.saveStatus, lastSavedAt: this.lastSavedAt, hasSavedProgress: this.hasSavedProgress, blocked: this.saveBlocked, dirty: this.saveDirty, records: { ...this.records } },
      player: { x: p.x, z: p.z, facing: this.player.facing, moving: this.player.moving, hp: this.player.health.hp, maxHp: this.player.health.maxHp },
      camera: { x: cam.x, y: cam.y, z: cam.z },
      guideVisible: this.guide.visible,
      resultVisible: this.result.visible,
      mode: this.mode,
      menuVisible: this.menu.visible,
      runActive: this.runActive,
      enemies: this.spawner.getEnemies().map((e) => ({ type: e.type, x: e.position.x, z: e.position.z, hp: e.health.hp, state: e.ai.state })),
      aliveEnemies: this.spawner.aliveCount,
      projectiles: this.projectiles.count,
      playerY: this.player.jumpY,
      groundY: this.player.groundY,
      difficulty: this.difficulty,
      pickups: this.loot.count,
      stats: { level: this.stats.level, xp: this.stats.xp, xpToNext: this.stats.xpToNext, gold: this.stats.gold, maxHp: this.stats.maxHp },
      equipment: {
        inventory: this.equipment.inventory.length,
        equipped: Object.fromEntries(Object.entries(this.equipment.equipped).map(([k, v]) => [k, v ? v.name : null])),
        totals: this.equipment.totals(),
      },
      paused: this.paused,
      inventoryVisible: this.inventoryUI.visible,
      chests: { opened: this.chests.openedCount, total: this.chests.total, nearby: this.chests.nearest({ x: this.player.position.x, z: this.player.position.z }) !== null },
      prompt: this.currentPrompt,
      boss: this.boss ? { alive: this.boss.alive, hp: this.boss.health.hp, maxHp: this.boss.health.maxHp, state: this.boss.bossAI.state, phase2: this.boss.phase2 } : null,
      bossDefeated: this.bossDefeated,
      kills: this.combat.kills,
      score: this.combat.score,
      input: { pointerX: pointer.x, pointerY: pointer.y, pointerHas: pointer.has, pressed: this.input.getPressedCodes() },
    };
  }

  /** 3D 좌표 → 화면 px 좌표 (카메라 뒤면 null) */
  private projectToScreen(pos: THREE.Vector3): { x: number; y: number } | null {
    const v = this.projTmp.copy(pos).project(this.camera);
    if (v.z > 1) return null;
    return { x: ((v.x + 1) / 2) * this.canvas.clientWidth, y: ((1 - v.y) / 2) * this.canvas.clientHeight };
  }

  /** 마우스가 가리키는 바닥 위 지점 (없으면 null) */
  private getAimPoint(): Vec2 | null {
    // 터치 조작: 가까운 적을 자동 조준 (없으면 바라보는 방향 유지)
    if (this.settings.touchControls) return this.nearestEnemyPoint(GameConfig.combat.autoAimRange);
    const pointer = this.input.getPointer();
    if (!pointer.has) return null;
    this.raycaster.setFromCamera(new THREE.Vector2(pointer.x, pointer.y), this.camera);
    const hit = this.raycaster.ray.intersectPlane(this.groundPlane, this.aimHit);
    return hit ? { x: hit.x, z: hit.z } : null;
  }

  /** 지정 거리 안의 가장 가까운 살아 있는 적의 위치 (없으면 null) */
  private nearestEnemyPoint(range: number): Vec2 | null {
    const p = this.player.position;
    let best: Enemy | null = null;
    let bestD = range;
    for (const e of this.spawner.getEnemies()) {
      if (!e.alive) continue;
      const d = Math.hypot(e.position.x - p.x, e.position.z - p.z);
      if (d < bestD) {
        bestD = d;
        best = e;
      }
    }
    return best ? { x: best.position.x, z: best.position.z } : null;
  }

  /** 적이 공격을 실행했을 때: 근접이면 바로 피해, 원거리면 플레이어 쪽으로 탄 발사 */
  private onEnemyAttack(enemy: Enemy, damage: number): void {
    if (this.ended) return;
    const p = this.player.position;
    const e = enemy.position;
    const len = Math.hypot(p.x - e.x, p.z - e.z) || 1;
    const toPlayer: Vec2 = { x: (p.x - e.x) / len, z: (p.z - e.z) / len };
    damage = damage * getDifficultyPreset(this.difficulty).enemyDamage;
    if (enemy.def.attackKind === 'ranged') {
      this.projectiles.spawn(
        { x: e.x + toPlayer.x * (enemy.radius + 0.3), z: e.z + toPlayer.z * (enemy.radius + 0.3) },
        toPlayer,
        { damage, speed: enemy.def.projectileSpeed ?? 10, lifetime: 3, radius: 0.2, knockback: 0, color: 0xff5577, friendly: false },
      );
      return;
    }
    this.damagePlayer(damage, { x: e.x, z: e.z });
  }

  /** 플레이어 피해 처리 (근접·투사체 공용). from: 피해가 온 위치. 방어력만큼 줄어든다 */
  private damagePlayer(rawDamage: number, from: Vec2): void {
    if (this.ended) return;
    const damage = applyDefense(rawDamage, this.equipment.totals().defense);
    if (!this.player.health.takeDamage(damage)) return;
    const p = this.player.position;
    const len = Math.hypot(p.x - from.x, p.z - from.z) || 1;
    this.controller.applyKnockback({ x: (p.x - from.x) / len, z: (p.z - from.z) / len }, GameConfig.player.hitKnockback);
    this.audio.play('hurt', 0.1);
    this.cameraCtrl.shake(GameConfig.juice.hitShake.amp, GameConfig.juice.hitShake.duration);
    if (this.settings.haptics) vibrate(40);
    this.effects.burst(new THREE.Vector3(p.x, 1, p.z), 0xff4f79, 6, 4);
    if (this.settings.hitFlash) this.hud.flashHit();
    if (this.settings.showDamageNumbers) this.damageNumbers.show(new THREE.Vector3(p.x, 2.0, p.z), damage, 'player');
    if (this.player.health.isDead) {
      this.records.deaths++;
      this.showResult('쓰러졌습니다', `처치 ${this.combat.kills} · 점수 ${this.combat.score} · 레벨 ${this.stats.level} · 골드 ${this.stats.gold}`);
      Logger.info('플레이어가 쓰러졌습니다.');
    }
  }

  /** 아이템 획득: 회복·경험치·골드 반영, 레벨 업 처리 */
  private onCollect(drop: Drop, at: Vec2): void {
    const pos = new THREE.Vector3(at.x, 1.4, at.z);
    if (drop.kind === 'heal') {
      this.audio.play('heal');
      this.player.health.heal(drop.amount);
      this.effects.burst(pos, 0xff4f79, 6, 3);
      if (this.settings.showDamageNumbers) this.damageNumbers.show(pos, drop.amount, 'heal');
    } else if (drop.kind === 'gold') {
      this.audio.play('pickup', 0.06);
      this.stats.addGold(drop.amount);
      this.markDirty();
      this.effects.burst(pos, 0xffd23f, 4, 2);
    } else if (drop.kind === 'equip') {
      if (!drop.item) return;
      if (this.equipment.add(drop.item)) {
        this.audio.play('equip');
        this.markDirty();
        const color = GameConfig.equipment.rarities[drop.item.rarity].color;
        this.effects.burst(pos, color, 10, 4);
        this.damageNumbers.showText(pos, `획득: ${drop.item.name}`, color);
      } else {
        // 가방이 가득 차면 다시 바닥에 둔다
        this.loot.spawn(drop, at);
        this.damageNumbers.showText(pos, '가방이 가득 찼어요', '#ff6b90');
      }
    } else {
      const gained = this.stats.addXp(drop.amount);
      this.markDirty();
      if (gained === 0) this.audio.play('pickup', 0.06);
      else this.audio.play('levelup');
      this.effects.burst(pos, 0x5cf2d8, 4, 2);
      if (gained > 0) {
        // 레벨 업: 최대 체력을 올리고 일부 회복
        const h = this.player.health;
        this.applyStats();
        h.heal(Math.round(h.maxHp * GameConfig.progression.levelUpHealRatio));
        const p = this.player.position;
        this.effects.burst(new THREE.Vector3(p.x, 1, p.z), 0xffd23f, 24, 7);
        this.damageNumbers.show(new THREE.Vector3(p.x, 2.4, p.z), this.stats.level, 'levelup');
        Logger.info(`레벨 업! 레벨 ${this.stats.level} (최대 체력 ${h.maxHp}, 공격력 ×${this.stats.damageMultiplier.toFixed(2)})`);
      }
    }
  }

  /** 보스 등장: 일반 적을 모두 처치했을 때 한 번 */
  private spawnBoss(): void {
    const b = this.bossCfg;
    const mul = this.spawner.multipliers;
    this.boss = new Boss({ x: b.spawn.x, z: b.spawn.z }, { hp: mul.hp, speed: mul.speed }, b);
    this.spawner.addEnemy(this.boss);
    this.hud.showBanner(`${b.name} 등장!`);
    this.audio.play('bossAppear');
    this.audio.playMusic('boss');
    this.cameraCtrl.shake(GameConfig.juice.slamShake.amp * 0.8, 0.8);
    this.effects.burst(new THREE.Vector3(b.spawn.x, 1.5, b.spawn.z), b.color, 30, 9);
    Logger.info(`보스 등장: ${b.name} (체력 ${this.boss.health.maxHp})`);
  }

  /** 보스의 공격 실행 */
  private onBossAttack(boss: Boss, attack: BossAttack): void {
    if (this.ended) return;
    const dmgMul = getDifficultyPreset(this.difficulty).enemyDamage;
    const bp = boss.position;
    const p = this.player.position;
    if (attack.kind === 'contact') {
      this.damagePlayer(attack.damage * dmgMul, { x: bp.x, z: bp.z });
    } else if (attack.kind === 'slam') {
      this.audio.play('slam');
      this.cameraCtrl.shake(GameConfig.juice.slamShake.amp, GameConfig.juice.slamShake.duration);
      this.effects.shockwave(new THREE.Vector3(bp.x, 0, bp.z), attack.radius);
      this.effects.burst(new THREE.Vector3(bp.x, 0.5, bp.z), 0xff4f79, 20, 6);
      // 점프로 피할 수 있다 (높이 1 이상)
      const dist = Math.hypot(p.x - bp.x, p.z - bp.z);
      if (dist <= attack.radius + GameConfig.player.radius && this.player.jumpY < 1.0) this.damagePlayer(attack.damage * dmgMul, { x: bp.x, z: bp.z });
    } else if (attack.kind === 'summon') {
      // 부하 소환: 같은 종류가 maxAlive 마리 이상 살아 있으면 더 부르지 않는다
      const alive = this.spawner.getEnemies().filter((e) => e.alive && e.type === attack.type).length;
      const n = Math.max(0, Math.min(attack.count, attack.maxAlive - alive));
      for (let i = 0; i < n; i++) {
        const a = (i / Math.max(1, n)) * Math.PI * 2 + Math.random() * 0.5;
        const sx = bp.x + Math.sin(a) * (boss.radius + 1.2);
        const sz = bp.z + Math.cos(a) * (boss.radius + 1.2);
        const e = this.spawner.spawn(attack.type, sx, sz);
        if (e) this.effects.burst(new THREE.Vector3(sx, 1, sz), 0x8fe8ff, 10, 5);
      }
      if (n > 0) {
        this.hud.showBanner('부하 소환!', 900);
        this.audio.play('summon');
      }
    } else if (attack.kind === 'mortar') {
      // 포격 낙하: 플레이어 자리 주변에 예고 원을 찍고 delay 뒤에 터진다
      for (let i = 0; i < attack.count; i++) {
        const a = Math.random() * Math.PI * 2;
        const d = i === 0 ? 0 : Math.random() * attack.spread;
        const x = p.x + Math.sin(a) * d;
        const z = p.z + Math.cos(a) * d;
        this.mortars.push({ x, z, t: attack.delay + i * 0.12, radius: attack.radius, damage: attack.damage * dmgMul });
        this.effects.marker(new THREE.Vector3(x, 0, z), attack.radius, attack.delay + i * 0.12, 0xffb14f);
      }
    } else {
      const base = Math.atan2(p.x - bp.x, p.z - bp.z);
      for (let i = 0; i < attack.count; i++) {
        const a = attack.aimed ? base + ((i - (attack.count - 1) / 2) * Math.PI * 2) / attack.count : (i / attack.count) * Math.PI * 2;
        const dir: Vec2 = { x: Math.sin(a), z: Math.cos(a) };
        this.projectiles.spawn(
          { x: bp.x + dir.x * (boss.radius + 0.4), z: bp.z + dir.z * (boss.radius + 0.4) },
          dir,
          { damage: attack.damage * dmgMul, speed: attack.speed, lifetime: 4, radius: 0.25, knockback: 0, color: 0xb06bff, friendly: false },
        );
      }
    }
  }

  /** 포격 낙하 진행: 시간이 되면 터지고, 범위 안이면(점프 중 제외) 피해 */
  private updateMortars(dt: number): void {
    if (this.mortars.length === 0) return;
    const p = this.player.position;
    for (let i = this.mortars.length - 1; i >= 0; i--) {
      const m = this.mortars[i];
      m.t -= dt;
      if (m.t > 0) continue;
      this.mortars.splice(i, 1);
      this.audio.play('boom', 0.08);
      this.cameraCtrl.shake(GameConfig.juice.slamShake.amp * 0.6, 0.3);
      this.effects.shockwave(new THREE.Vector3(m.x, 0, m.z), m.radius, 0.4, 0xffb14f);
      this.effects.burst(new THREE.Vector3(m.x, 0.6, m.z), 0xff7a45, 14, 6);
      if (this.ended) continue;
      const dist = Math.hypot(p.x - m.x, p.z - m.z);
      if (dist <= m.radius + GameConfig.player.radius && this.player.jumpY < 1.0) this.damagePlayer(m.damage, { x: m.x, z: m.z });
    }
  }

  /** 보스 처치 보상 */
  private onBossDefeated(): void {
    const b = this.bossCfg;
    const at = { x: this.boss!.position.x, z: this.boss!.position.z };
    this.loot.spawn({ kind: 'gold', amount: Math.round(b.reward.goldMin + Math.random() * (b.reward.goldMax - b.reward.goldMin)) }, { x: at.x - 1, z: at.z });
    this.loot.spawn({ kind: 'xp', amount: b.reward.xp }, { x: at.x + 1, z: at.z });
    this.loot.spawn({ kind: 'equip', amount: 0, item: generateItemAtLeast(b.reward.equipMinRarity) }, { x: at.x, z: at.z + 1 });
    this.loot.spawn({ kind: 'heal', amount: GameConfig.loot.healAmount * 2 }, { x: at.x, z: at.z - 1 });
    this.records.clears++;
    const id = this.dungeonDef.id;
    const before = this.records.dungeonClears[id] ?? 0;
    this.records.dungeonClears[id] = before + 1;
    const next = nextDungeonAfter(id);
    this.unlockedNow = before === 0 && next ? next : null;
    this.markDirty();
    this.hud.showBanner(this.unlockedNow ? `던전 클리어! '${this.unlockedNow.name}' 이(가) 열렸습니다` : '던전 클리어!', 3000);
    Logger.info('보스를 처치했습니다. 던전 클리어!');
  }

  /** 승리 흐름: 일반 적 모두 처치 → 보스 등장 → 보스 처치 → 클리어 */
  private checkVictory(): void {
    if (this.ended || this.dungeonDef.spawns.length === 0) return;
    if (!this.boss) {
      if (this.spawner.aliveCount === 0) this.spawnBoss();
      return;
    }
    this.hud.setBoss(this.boss.alive ? { name: this.bossCfg.name, hp: this.boss.health.hp, maxHp: this.boss.health.maxHp, phase2: this.boss.phase2 } : null);
    if (!this.boss.alive && !this.bossDefeated) {
      this.bossDefeated = true;
      this.onBossDefeated();
    }
    // 보상을 줍거나 3초가 지나면 결과 화면
    if (this.bossDefeated && (this.loot.count === 0 || this.boss.removable)) {
      const unlockNote = this.unlockedNow ? ` · 새 던전 '${this.unlockedNow.name}' 이(가) 열렸습니다!` : '';
      this.showResult('던전 클리어!', `${this.dungeonDef.name} · 처치 ${this.combat.kills} · 점수 ${this.combat.score} · 레벨 ${this.stats.level} · 골드 ${this.stats.gold}${unlockNote}`);
    }
  }

  /** 매 프레임 갱신 */
  private readonly loop = (now: number): void => {
    if (!this.running) return;
    this.rafId = requestAnimationFrame(this.loop);
    try {
      this.frame(now);
    } catch (err) {
      if (this.restoreGraceUntil > 0) {
        if (performance.now() < this.restoreGraceUntil) {
          // 그래픽 복구 직후의 일시 오류는 건너뛰고 다음 프레임을 시도한다
          Logger.warn('그래픽 복구 중 프레임 오류를 건너뜁니다.', err);
          return;
        }
        // 복구 뒤에도 계속 실패하면 진행을 저장하고 페이지를 새로 연다 (저장 지점에서 이어짐)
        this.restoreGraceUntil = 0;
        Logger.warn('그래픽 복구에 실패해 페이지를 다시 엽니다.', err);
        this.flushSave();
        this.hud.showBanner('그래픽 복구 실패 — 다시 여는 중…', 3000);
        location.reload();
        return;
      }
      // 한 프레임의 오류로 게임 전체가 굳지 않게: 루프를 멈추고 오류 상자(ErrorOverlay)에 맡긴다
      this.stop();
      this.flushSave();
      Logger.error('게임 루프에서 오류가 나 멈췄습니다. 새로고침(F5)하면 저장된 진행에서 이어집니다.', err);
      throw err;
    }
  };

  /** 한 프레임 갱신·그리기 */
  private frame(now: number): void {
    // 실제 흐른 시간. 탭을 오래 비웠다 돌아와도 한 번에 크게 움직이지 않도록 상한(0.2초)을 둔다
    const elapsed = Math.min(0.2, Math.max(0, (now - this.lastTime) / 1000));
    this.lastTime = now;

    if (this.contextLost) return;
    if (this.paused || this.mode === 'menu') {
      // 장비 화면이 열렸거나 메인 메뉴 중에는 그리기만 한다
      this.pipeline.render(this.scene, this.camera);
      return;
    }

    // 시뮬레이션은 최대 0.05초 단위로 여러 번 돌린다: 프레임이 느려져도(휴대폰 10~20 FPS) 게임 속도가 느려지지 않고
    // 충돌·공격 판정은 작은 간격으로 유지된다. 그리기는 한 번만.
    // 히트 스톱: 처치 순간 아주 짧게 시간이 느려져 타격감을 준다 (그리기는 계속)
    let remaining = elapsed;
    if (this.hitStopTime > 0) {
      this.hitStopTime = Math.max(0, this.hitStopTime - elapsed);
      remaining = elapsed * GameConfig.juice.hitStop.timeScale;
    }
    while (remaining > 1e-6 && this.mode === 'play') {
      const dt = Math.min(GameConfig.performance.maxStep, remaining);
      remaining -= dt;
      this.simulate(dt);
    }

    this.hud.update({
      hp: this.player.health.hp,
      maxHp: this.player.health.maxHp,
      enemies: this.spawner.aliveCount,
      kills: this.combat.kills,
      score: this.combat.score,
      level: this.stats.level,
      xp: this.stats.xp,
      xpToNext: this.stats.xpToNext,
      gold: this.stats.gold,
    });

    this.pipeline.render(this.scene, this.camera);
    this.frames++;
    // 복구 뒤 한 프레임이라도 정상으로 그려지면 복구 완료
    if (this.restoreGraceUntil > 0) this.restoreGraceUntil = 0;
    this.updateFps(elapsed);
    this.updateAutoQuality(elapsed);
  }

  /** 게임 한 단계(dt 초) 갱신: 조작·적·투사체·아이템·카메라·승리 판정·자동 저장 */
  private simulate(dt: number): void {
    const p = this.player.position;
    this.controller.update(dt);
    if (!this.ended) this.combat.update(dt);
    this.spawner.update(dt, {
      playerPos: { x: p.x, z: p.z },
      world: this.dungeon,
      onAttackPlayer: (enemy, damage) => this.onEnemyAttack(enemy, damage),
      onBossAttack: (boss: Boss, attack: BossAttack) => this.onBossAttack(boss, attack),
      playerRadius: GameConfig.player.radius,
    });
    this.projectiles.update(dt, {
      world: this.dungeon,
      enemies: this.spawner.getEnemies(),
      playerPos: { x: p.x, z: p.z },
      playerY: this.player.jumpY,
      playerRadius: GameConfig.player.radius,
      onHitEnemy: (enemy, spec, dir) => {
        if (!this.ended) this.combat.damageEnemy(enemy, spec.damage, dir, spec.knockback);
      },
      onHitPlayer: (spec, _dir, from) => this.damagePlayer(spec.damage, from),
    });
    this.loot.update(dt, { x: p.x, z: p.z }, (drop, at) => this.onCollect(drop, at));
    this.updateMortars(dt);
    this.chests.update(dt);
    const nearChest = !this.ended && this.chests.nearest({ x: p.x, z: p.z }) !== null;
    this.currentPrompt = nearChest ? `${GameConfig.controls.interact[0].replace('Key', '')} 보물 상자 열기` : '';
    this.hud.setPrompt(this.currentPrompt);
    this.touch.setInteract(nearChest);
    this.touch.setDodgeCooldown(this.controller.dashCooldownRatio);
    // 자동 조준 표시: 터치 조작 중 겨누는 적 발밑에 고리
    const aim = this.settings.touchControls && !this.ended ? this.nearestEnemyPoint(GameConfig.combat.autoAimRange) : null;
    this.aimRing.visible = aim !== null;
    if (aim) this.aimRing.position.set(aim.x, 0.06, aim.z);
    this.hud.setChests(this.chests.openedCount, this.chests.total);
    this.player.update(dt);
    this.effects.update(dt);
    this.damageNumbers.update(dt);
    // 카메라는 점프 높이를 따라가지 않도록 바닥 위치를 본다
    this.camTarget.set(p.x, 0, p.z);
    this.cameraCtrl.update(dt, this.camTarget);
    this.dungeon.updateLight(p);
    this.dungeon.update(dt);
    this.checkVictory();

    // 자동 저장: 바뀐 것이 있고 간격이 지났으면
    this.saveTimer += dt;
    if (this.saveDirty && this.saveTimer >= GameConfig.save.autoSaveInterval) this.saveNow();
  }

  /** 자동 화질: 일정 시간마다 평균 FPS 를 보고 낮으면 그림자·해상도를 한 단계 내린다 */
  private updateAutoQuality(dt: number): void {
    if (!this.settings.autoQuality) return;
    this.qualityFrames++;
    this.qualityTime += dt;
    const p = GameConfig.performance;
    if (this.qualityTime < p.autoQualityInterval) return;
    this.qualitySamples.push(this.qualityFrames / this.qualityTime);
    this.qualityFrames = 0;
    this.qualityTime = 0;
    const d = decideQuality(this.qualitySamples, { quality: this.settings.quality, shadows: this.settings.shadows, resolution: this.settings.resolution }, p.autoQualityFps);
    this.qualitySamples.length = 0;
    if (!d.message) return;
    this.settings = { ...this.settings, quality: d.next.quality, shadows: d.next.shadows, resolution: d.next.resolution };
    saveSettings(this.storage, this.settings);
    this.settingsUI.refresh();
    this.applySettings();
    this.hud.showBanner(d.message, 2500);
    Logger.info(`자동 화질 조절: ${d.message}`);
  }

  /** FPS 표시 (0.5초마다 갱신) */
  private updateFps(dt: number): void {
    if (!this.settings.showFps) return;
    this.fpsFrames++;
    this.fpsTime += dt;
    if (this.fpsTime >= 0.5) {
      this.guide.setHudText(`FPS ${Math.round(this.fpsFrames / this.fpsTime)}`);
      this.fpsFrames = 0;
      this.fpsTime = 0;
    }
  }

  /** 창 크기 변경에 맞춰 렌더러와 카메라를 조정 */
  private readonly resize = (): void => {
    const w = this.canvas.clientWidth || window.innerWidth;
    const h = this.canvas.clientHeight || window.innerHeight;
    this.pipeline.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  };
}

/** 저장 시각을 '2026-10-23 14:05' 처럼 보여준다 */
function formatSavedAt(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime()) || d.getTime() === 0) return '알 수 없음';
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
