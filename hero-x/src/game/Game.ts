import * as THREE from 'three';
import { CombatSystem } from '../combat/CombatSystem';
import { Effects } from '../combat/Effects';
import { ProjectileSystem } from '../combat/Projectile';
import { ChestSystem } from '../dungeon/Chest';
import { Dungeon01 } from '../dungeon/Dungeon01';
import type { Enemy } from '../enemies/Enemy';
import { EnemySpawner } from '../enemies/EnemySpawner';
import { InputManager } from '../input/InputManager';
import { EquipmentSystem, applyDefense } from '../items/EquipmentSystem';
import { LootSystem } from '../items/LootSystem';
import { InventoryUI } from '../ui/InventoryUI';
import type { Drop } from '../items/loot';
import { PlayerStats } from '../player/PlayerStats';
import { Player } from '../player/Player';
import { PlayerController } from '../player/PlayerController';
import { createPlaceholderModel } from '../player/models/PlaceholderModel';
import type { Vec2 } from '../player/movement';
import { ControlsGuide } from '../ui/ControlsGuide';
import { DamageNumbers } from '../ui/DamageNumbers';
import { HUD } from '../ui/HUD';
import { ResultUI } from '../ui/ResultUI';
import { Logger } from '../utils/Logger';
import { CameraController } from './CameraController';
import { getDifficultyPreset, loadDifficulty, saveDifficulty } from './Difficulty';
import { GameConfig, sanitizeGameConfig, type DifficultyLevel } from './GameConfig';

/** 테스트·디버그용으로 밖에서 읽을 수 있는 상태 */
export interface GameDebugState {
  running: boolean;
  frames: number;
  ended: boolean;
  player: { x: number; z: number; facing: number; moving: boolean; hp: number; maxHp: number };
  camera: { x: number; y: number; z: number };
  guideVisible: boolean;
  resultVisible: boolean;
  enemies: Array<{ type: string; x: number; z: number; hp: number; state: string }>;
  aliveEnemies: number;
  projectiles: number;
  playerY: number;
  difficulty: string;
  pickups: number;
  stats: { level: number; xp: number; xpToNext: number; gold: number; maxHp: number };
  equipment: { inventory: number; equipped: Record<string, string | null>; totals: { attack: number; defense: number; maxHp: number; moveSpeed: number } };
  paused: boolean;
  inventoryVisible: boolean;
  chests: { opened: number; total: number; nearby: boolean };
  prompt: string;
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
  private readonly scene = new THREE.Scene();
  private readonly camera: THREE.PerspectiveCamera;
  private readonly input = new InputManager();
  private readonly dungeon: Dungeon01;
  private readonly player: Player;
  private readonly controller: PlayerController;
  private readonly cameraCtrl: CameraController;
  private readonly spawner: EnemySpawner;
  private readonly effects: Effects;
  private readonly projectiles: ProjectileSystem;
  private readonly combat: CombatSystem;
  private readonly guide: ControlsGuide;
  private readonly hud: HUD;
  private readonly result: ResultUI;
  private readonly damageNumbers: DamageNumbers;
  private readonly loot: LootSystem;
  private readonly chests: ChestSystem;
  private readonly inventoryUI: InventoryUI;
  readonly stats = new PlayerStats();
  readonly equipment = new EquipmentSystem();
  /** 장비 화면이 열려 게임이 멈춘 상태 */
  private paused = false;
  private difficulty: DifficultyLevel = loadDifficulty();
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

    const g = GameConfig.graphics;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: g.antialias, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, g.maxPixelRatio));
    this.renderer.shadowMap.enabled = g.shadows;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    const c = GameConfig.camera;
    this.camera = new THREE.PerspectiveCamera(c.fov, 1, c.near, c.far);

    // 시스템 구성
    this.dungeon = new Dungeon01(this.scene);
    this.chests = new ChestSystem(this.scene);
    this.dungeon.addCollisionBoxes(this.chests.getCollisionBoxes());
    this.player = new Player(createPlaceholderModel(GameConfig.player.colors), GameConfig.player.startPosition);
    this.scene.add(this.player.object3d);
    this.cameraCtrl = new CameraController(this.camera);
    this.controller = new PlayerController(this.player, this.input, this.dungeon, () => this.cameraCtrl.getYaw(), () => 1 + this.equipment.totals().moveSpeed);
    this.effects = new Effects(this.scene);
    this.projectiles = new ProjectileSystem(this.scene);
    this.spawner = new EnemySpawner(this.scene);
    this.applyDifficultyToSpawner();
    this.spawner.spawnFromConfig();
    this.combat = new CombatSystem(
      this.player, this.input, () => this.spawner.getEnemies(), () => this.getAimPoint(), this.effects, this.projectiles,
      (enemy, damage, killed) => {
        if (killed) this.loot.dropFor(enemy.def.score, { x: enemy.position.x, z: enemy.position.z });
        if (!GameConfig.hud.showDamageNumbers) return;
        this.projTmp.set(enemy.position.x, 1.6, enemy.position.z);
        this.damageNumbers.show(this.projTmp, killed ? enemy.def.score : damage, killed ? 'kill' : 'enemy');
      },
      () => this.stats.damageMultiplier,
      (kind) => this.equipment.weaponAttack(kind),
    );
    this.loot = new LootSystem(this.scene);

    // UI
    this.damageNumbers = new DamageNumbers(uiRoot, (pos) => this.projectToScreen(pos));
    this.guide = new ControlsGuide(uiRoot, () => this.canvas.focus(), {
      get: () => this.difficulty,
      set: (level) => this.setDifficulty(level),
    });
    this.hud = new HUD(uiRoot);
    this.hud.setDungeonName(GameConfig.dungeon.name);
    this.result = new ResultUI(uiRoot, () => this.restart());
    this.inventoryUI = new InventoryUI(uiRoot, this.equipment, {
      onChange: () => this.applyStats(),
      onClose: () => this.toggleInventory(false),
      getSummary: () => this.statSummary(),
    });
    this.applyDifficulty();

    // 입력 연결
    this.input.attach(window, canvas);
    this.input.onPress(GameConfig.controls.toggleGuide, () => this.guide.toggle());
    this.input.onPress(GameConfig.controls.restart, () => {
      if (this.ended) this.restart();
    });
    this.input.onPress(GameConfig.controls.toggleInventory, () => this.toggleInventory());
    this.input.onPress(GameConfig.controls.interact, () => this.tryInteract());
    this.input.onPress(['Escape'], () => {
      if (this.inventoryUI.visible) this.toggleInventory(false);
    });

    window.addEventListener('resize', this.resize);
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
    this.spawner.multipliers = { hp: p.enemyHp, speed: p.enemySpeed };
  }

  private applyDifficulty(): void {
    this.applyDifficultyToSpawner();
    this.guide?.refreshDifficulty();
  }

  private currentPrompt = '';

  /** 상호작용 키: 가까운 보물 상자를 연다 */
  private tryInteract(): void {
    if (this.ended || this.paused || this.player.health.isDead) return;
    const p = this.player.position;
    const chest = this.chests.nearest({ x: p.x, z: p.z });
    if (!chest || !this.chests.open(chest)) return;
    const drops = this.loot.dropChest({ x: chest.x, z: chest.z });
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
  }

  /** 레벨·장비 보너스를 플레이어 체력에 반영 (최대 체력이 줄면 현재 체력도 그 안으로) */
  private applyStats(): void {
    const h = this.player.health;
    h.maxHp = Math.max(1, this.stats.maxHp + this.equipment.totals().maxHp);
    if (h.hp > h.maxHp) h.hp = h.maxHp;
  }

  /** 장비 화면 위에 보여줄 요약 */
  private statSummary(): string {
    const t = this.equipment.totals();
    const melee = Math.round((GameConfig.combat.melee.damage + this.equipment.weaponAttack('melee')) * this.stats.damageMultiplier);
    const ranged = Math.round((GameConfig.combat.ranged.damage + this.equipment.weaponAttack('ranged')) * this.stats.damageMultiplier);
    const speed = Math.round((1 + t.moveSpeed) * 100);
    return `레벨 ${this.stats.level} · 골드 ${this.stats.gold} · 근접 ${melee} · 원거리 ${ranged} · 방어 ${t.defense} · 최대 체력 ${this.player.health.maxHp} · 속도 ${speed}%`;
  }

  /** 전투 재시작: 플레이어 회복·복귀, 적 재배치, 기록 초기화 */
  restart(): void {
    this.spawner.clear();
    this.spawner.spawnFromConfig();
    this.projectiles.clear();
    this.damageNumbers.clear();
    this.loot.clear();
    this.chests.reset();
    // 레벨·골드·장비는 유지하고(성장), 체력은 보너스를 포함해 가득 채운다
    this.player.health.reset(Math.max(1, this.stats.maxHp + this.equipment.totals().maxHp));
    this.player.reset(GameConfig.player.startPosition);
    this.controller.reset();
    this.combat.reset();
    this.result.hide();
    this.ended = false;
    Logger.info('전투를 다시 시작합니다.');
  }

  /** 모든 자원 정리 (페이지를 떠나거나 게임을 완전히 종료할 때) */
  dispose(): void {
    this.stop();
    this.input.detach();
    window.removeEventListener('resize', this.resize);
    this.spawner.dispose();
    this.projectiles.dispose();
    this.loot.dispose();
    this.chests.dispose();
    this.effects.dispose();
    this.player.dispose();
    this.dungeon.dispose();
    this.renderer.dispose();
  }

  /** 플레이어를 지정한 위치로 옮긴다 (테스트·디버그용, 나중에 리스폰·순간이동에도 사용) */
  setPlayerPosition(x: number, z: number): void {
    this.player.position.set(x, 0, z);
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
      player: { x: p.x, z: p.z, facing: this.player.facing, moving: this.player.moving, hp: this.player.health.hp, maxHp: this.player.health.maxHp },
      camera: { x: cam.x, y: cam.y, z: cam.z },
      guideVisible: this.guide.visible,
      resultVisible: this.result.visible,
      enemies: this.spawner.getEnemies().map((e) => ({ type: e.type, x: e.position.x, z: e.position.z, hp: e.health.hp, state: e.ai.state })),
      aliveEnemies: this.spawner.aliveCount,
      projectiles: this.projectiles.count,
      playerY: this.player.jumpY,
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
    const pointer = this.input.getPointer();
    if (!pointer.has) return null;
    this.raycaster.setFromCamera(new THREE.Vector2(pointer.x, pointer.y), this.camera);
    const hit = this.raycaster.ray.intersectPlane(this.groundPlane, this.aimHit);
    return hit ? { x: hit.x, z: hit.z } : null;
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
    this.effects.burst(new THREE.Vector3(p.x, 1, p.z), 0xff4f79, 6, 4);
    this.hud.flashHit();
    if (GameConfig.hud.showDamageNumbers) this.damageNumbers.show(new THREE.Vector3(p.x, 2.0, p.z), damage, 'player');
    if (this.player.health.isDead) {
      this.ended = true;
      this.result.show('쓰러졌습니다', `처치 ${this.combat.kills} · 점수 ${this.combat.score} · 레벨 ${this.stats.level} · 골드 ${this.stats.gold}`);
      Logger.info('플레이어가 쓰러졌습니다.');
    }
  }

  /** 아이템 획득: 회복·경험치·골드 반영, 레벨 업 처리 */
  private onCollect(drop: Drop, at: Vec2): void {
    const pos = new THREE.Vector3(at.x, 1.4, at.z);
    if (drop.kind === 'heal') {
      this.player.health.heal(drop.amount);
      this.effects.burst(pos, 0xff4f79, 6, 3);
      if (GameConfig.hud.showDamageNumbers) this.damageNumbers.show(pos, drop.amount, 'heal');
    } else if (drop.kind === 'gold') {
      this.stats.addGold(drop.amount);
      this.effects.burst(pos, 0xffd23f, 4, 2);
    } else if (drop.kind === 'equip') {
      if (!drop.item) return;
      if (this.equipment.add(drop.item)) {
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

  /** 승리 판정: 적이 하나라도 배치돼 있었고 모두 처치됐을 때 */
  private checkVictory(): void {
    if (this.ended || GameConfig.enemies.spawns.length === 0) return;
    if (this.spawner.aliveCount === 0) {
      this.ended = true;
      this.result.show('모든 적 처치!', `처치 ${this.combat.kills} · 점수 ${this.combat.score} · 레벨 ${this.stats.level} · 골드 ${this.stats.gold}`);
      Logger.info('모든 적을 처치했습니다.');
    }
  }

  /** 매 프레임 갱신 */
  private readonly loop = (now: number): void => {
    if (!this.running) return;
    this.rafId = requestAnimationFrame(this.loop);

    // 탭을 오래 비웠다 돌아와도 한 번에 크게 움직이지 않도록 dt 상한을 둔다
    const dt = Math.min(0.05, (now - this.lastTime) / 1000);
    this.lastTime = now;

    if (this.paused) {
      // 장비 화면이 열린 동안은 그리기만 한다
      this.renderer.render(this.scene, this.camera);
      return;
    }

    const p = this.player.position;
    this.controller.update(dt);
    if (!this.ended) this.combat.update(dt);
    this.spawner.update(dt, {
      playerPos: { x: p.x, z: p.z },
      world: this.dungeon,
      onAttackPlayer: (enemy, damage) => this.onEnemyAttack(enemy, damage),
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
    this.chests.update(dt);
    const nearChest = !this.ended && this.chests.nearest({ x: p.x, z: p.z }) !== null;
    this.currentPrompt = nearChest ? `${GameConfig.controls.interact[0].replace('Key', '')} 보물 상자 열기` : '';
    this.hud.setPrompt(this.currentPrompt);
    this.hud.setChests(this.chests.openedCount, this.chests.total);
    this.player.update(dt);
    this.effects.update(dt);
    this.damageNumbers.update(dt);
    // 카메라는 점프 높이를 따라가지 않도록 바닥 위치를 본다
    this.camTarget.set(p.x, 0, p.z);
    this.cameraCtrl.update(dt, this.camTarget);
    this.dungeon.updateLight(p);
    this.checkVictory();

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

    this.renderer.render(this.scene, this.camera);
    this.frames++;
    this.updateFps(dt);
  };

  /** FPS 표시 (0.5초마다 갱신) */
  private updateFps(dt: number): void {
    if (!GameConfig.debug.showFps) return;
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
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  };
}
