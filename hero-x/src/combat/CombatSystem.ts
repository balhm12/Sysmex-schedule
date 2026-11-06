import * as THREE from 'three';
import type { Enemy } from '../enemies/Enemy';
import { GameConfig, type WeaponStyleConfig } from '../game/GameConfig';
import type { InputManager } from '../input/InputManager';
import { meleeComboFor } from '../items/weaponStyle';
import type { Player } from '../player/Player';
import { directionToFacing, type Vec2 } from '../player/movement';
import { isFinisher, nextComboStep, sweepSign } from './combo';
import type { Effects } from './Effects';
import { isInMeleeArc } from './melee';
import type { ProjectileSystem } from './Projectile';

/**
 * 플레이어의 공격 처리
 * - 근접: 공격 입력 → 마우스 방향으로 몸을 돌림 → 부채꼴 안의 적에게 피해와 밀침 → 효과 표시
 *   연달아 누르면 콤보(GameConfig.combat.melee.combo): 가로 → 되돌려 → 가로 → 올려 → 5단 회전 마무리(맞은 적 감전)
 * - 원거리: 발사 입력 → 마우스 방향으로 에너지 탄 발사 (명중 처리는 ProjectileSystem 이 콜백으로 알려줌)
 * - 공격 수치는 GameConfig.combat 에서 읽는다.
 * - 적 목록과 조준 지점은 함수로 받아서 다른 시스템을 직접 알지 않는다.
 */
export class CombatSystem {
  /** 처치한 적 수 */
  kills = 0;
  /** 누적 점수 */
  score = 0;

  private meleeCooldown = 0;
  private rangedCooldown = 0;
  /** 마지막으로 나간 콤보 단계(0부터). 콤보가 끊기면 -1 */
  comboStep = -1;
  /** 콤보를 이어갈 수 있는 남은 시간(초). 쿨다운이 끝난 뒤부터 줄어든다 */
  private comboTimer = 0;
  /** 휘두르는 중 아직 판정하지 않은 타격 (동작의 타격 시점에 맞춰 적용) */
  private pendingHit: { time: number; damage: number; range: number; arcDegrees: number; knockback: number; finisher: boolean } | null = null;
  /** 마무리에 맞아 감전된 적 알림 (효과음·진동용) */
  onShock: ((enemy: Enemy) => void) | null = null;
  /** 감전시킨 횟수 (검증용) */
  shocks = 0;
  /** 공격을 시작할 때 알림 (효과음용). step 은 근접 콤보 단계(0부터), finisher 는 마무리 단계인지 */
  onAttack: ((kind: 'melee' | 'ranged', step: number, finisher: boolean) => void) | null = null;
  private readonly tmp = new THREE.Vector3();

  constructor(
    private readonly player: Player,
    private readonly input: InputManager,
    private readonly getEnemies: () => Enemy[],
    private readonly getAimPoint: () => Vec2 | null,
    private readonly effects: Effects,
    private readonly projectiles: ProjectileSystem,
    /** 적이 피해를 받았을 때 알림 (피해 숫자·드롭용). killed 는 이 타격으로 처치됐는지 */
    private readonly onEnemyDamaged: (enemy: Enemy, damage: number, killed: boolean) => void = () => {},
    /** 플레이어 공격력 배율 (레벨 보너스). 없으면 1 */
    private readonly getDamageMultiplier: () => number = () => 1,
    /** 무기 공격력 (장비). 없으면 0 */
    private readonly getWeaponAttack: (kind: 'melee' | 'ranged') => number = () => 0,
    /** 장착한 무기의 공격 방식 (콤보 구성·탄 성질). 없으면 기본 방식 */
    private readonly getWeaponStyle: (kind: 'melee' | 'ranged') => WeaponStyleConfig = (kind) => GameConfig.combat.weaponStyles[kind === 'melee' ? 'sword' : 'blaster'],
  ) {}

  /** 재시작 시 기록 초기화 */
  reset(): void {
    this.kills = 0;
    this.score = 0;
    this.meleeCooldown = 0;
    this.rangedCooldown = 0;
    this.comboStep = -1;
    this.comboTimer = 0;
    this.pendingHit = null;
  }

  /** 지금까지 휘두른/쏜 횟수 (디버그·검증용) */
  attacks = 0;
  /**
   * 누른 순간을 기억하는 예약 플래그: 쿨다운 중에 누르거나, 프레임 사이에 아주 짧게 톡 눌러도(느린 기기)
   * 쿨다운이 끝나는 즉시 한 번 나간다. 공격이 나가면 지워지므로 두 번 나가지 않는다.
   */
  private meleeQueued = false;
  private rangedQueued = false;
  private pressAttached = false;

  update(dt: number): void {
    if (!this.pressAttached) {
      this.pressAttached = true;
      const c = GameConfig.controls;
      this.input.onPress(c.attackMelee, () => (this.meleeQueued = true));
      this.input.onPress(c.attackRanged, () => (this.rangedQueued = true));
    }
    if (this.meleeCooldown > 0) this.meleeCooldown -= dt;
    else if (this.comboStep >= 0) {
      // 쿨다운이 끝난 뒤부터 이어가기 시간이 흐른다. 다 흐르면(마무리 뒤에는 바로) 콤보가 끊긴다
      this.comboTimer -= dt;
      if (this.comboTimer <= 0) this.comboStep = -1;
    }
    if (this.rangedCooldown > 0) this.rangedCooldown -= dt;
    if (this.player.health.isDead) {
      this.meleeQueued = this.rangedQueued = false;
      this.pendingHit = null;
      return;
    }
    // 타격 시점이 되면 그때의 위치·방향으로 부채꼴 판정 (동작과 판정이 맞는다)
    if (this.pendingHit) {
      this.pendingHit.time -= dt;
      if (this.pendingHit.time <= 0) {
        const h = this.pendingHit;
        this.pendingHit = null;
        this.applyMeleeHit(h.damage, h.range, h.arcDegrees, h.knockback, h.finisher);
      }
    }

    const c = GameConfig.controls;
    if (this.meleeCooldown <= 0 && (this.input.isActionDown(c.attackMelee) || this.meleeQueued)) {
      this.meleeQueued = false;
      this.meleeAttack();
    } else if (this.rangedCooldown <= 0 && (this.input.isActionDown(c.attackRanged) || this.rangedQueued)) {
      this.rangedQueued = false;
      this.rangedAttack();
    }
  }

  /**
   * 적에게 피해를 준다 (근접·투사체 공용). 처치하면 기록을 올리고 효과를 보여준다.
   * 실제로 맞았으면 true
   */
  damageEnemy(enemy: Enemy, damage: number, dir: Vec2, knockback: number): boolean {
    if (!enemy.alive || !enemy.hit(damage, dir, knockback)) return false;
    const ep = enemy.position;
    this.tmp.set(ep.x, 0.8, ep.z);
    if (enemy.alive) {
      this.effects.burst(this.tmp, 0xffffff, 5, 3);
    } else {
      this.effects.burst(this.tmp, enemy.def.color, 18, 7);
      this.kills++;
      this.score += enemy.def.score;
    }
    this.onEnemyDamaged(enemy, damage, !enemy.alive);
    return true;
  }

  /** 마우스가 가리키는 쪽으로 즉시 몸을 돌린다 (너무 가까우면 현재 방향 유지). 바라보는 방향(길이 1)을 돌려준다 */
  private faceAim(): Vec2 {
    const pos = this.player.position;
    const aim = this.getAimPoint();
    if (aim) {
      const dir = { x: aim.x - pos.x, z: aim.z - pos.z };
      if (Math.hypot(dir.x, dir.z) > 0.25) this.player.facing = directionToFacing(dir);
    }
    return { x: Math.sin(this.player.facing), z: Math.cos(this.player.facing) };
  }

  /** 근접 공격 한 번: 장착한 무기의 방식(콤보 구성)에 따라 다른 베기가 나간다 */
  private meleeAttack(): void {
    const cfg = GameConfig.combat.melee;
    const combo = meleeComboFor(this.getWeaponStyle('melee'));
    const steps = combo.steps;
    const index = steps.length > 0 ? nextComboStep(this.comboStep, this.comboStep >= 0 && this.comboTimer > 0, steps.length) : 0;
    const step = steps[index] ?? { damageMul: 1, rangeMul: 1, arcDegrees: cfg.arcDegrees, swingTime: cfg.swingTime, cooldownMul: 1, knockbackMul: 1, sweep: 'right' as const, color: GameConfig.juice.slashColor };
    const finisher = isFinisher(index, steps.length);
    this.comboStep = index;
    this.meleeCooldown = cfg.cooldown * combo.cooldownMul * step.cooldownMul;
    // 마무리 뒤에는 이어갈 수 없다 (1단계부터 다시)
    this.comboTimer = finisher ? 0 : combo.window;
    this.attacks++;
    this.onAttack?.('melee', index, finisher);
    this.faceAim();
    const pos = this.player.position;
    const range = cfg.range * step.rangeMul;
    this.player.triggerAttack(step.swingTime, 'melee', index, sweepSign(step));
    const color = new THREE.Color(step.color).getHex();
    this.effects.swing(pos, this.player.facing, range, step.arcDegrees, step.swingTime, finisher ? color : 0x5cf2d8);
    this.effects.slash(pos, this.player.facing, range, step.arcDegrees, step.swingTime * 1.3, color, sweepSign(step));
    if (finisher) {
      this.tmp.set(pos.x, 0.1, pos.z);
      this.effects.shockwave(this.tmp, range * GameConfig.juice.comboFinish.shockMul, 0.4, color);
      this.tmp.y = 0.9;
      this.effects.burst(this.tmp, color, 10, 4);
    }

    const damage = Math.round((cfg.damage + this.getWeaponAttack('melee')) * step.damageMul * this.getDamageMultiplier());
    const delay = step.swingTime * cfg.hitFraction;
    if (delay <= 0) this.applyMeleeHit(damage, range, step.arcDegrees, cfg.knockback * step.knockbackMul, finisher);
    else this.pendingHit = { time: delay, damage, range, arcDegrees: step.arcDegrees, knockback: cfg.knockback * step.knockbackMul, finisher };
  }

  /** 부채꼴 안의 살아 있는 적에게 피해·밀침. 마무리(finisher)에 맞은 적은 감전된다(번개 효과 + 멈춤 + 추가 피해) */
  private applyMeleeHit(damage: number, range: number, arcDegrees: number, knockback: number, finisher = false): void {
    const pos = this.player.position;
    const origin: Vec2 = { x: pos.x, z: pos.z };
    for (const enemy of this.getEnemies()) {
      if (!enemy.alive) continue;
      const ep = enemy.position;
      if (!isInMeleeArc(origin, this.player.facing, { x: ep.x, z: ep.z }, enemy.radius, range, arcDegrees)) continue;
      const len = Math.hypot(ep.x - pos.x, ep.z - pos.z) || 1;
      if (!this.damageEnemy(enemy, damage, { x: (ep.x - pos.x) / len, z: (ep.z - pos.z) / len }, knockback)) continue;
      if (finisher && enemy.alive) this.shockEnemy(enemy, damage);
    }
  }

  /** 감전: 설정(combat.melee.combo.shock)만큼 멈추고 초당 추가 피해, 번개 연출(juice.shock) */
  private shockEnemy(enemy: Enemy, finisherDamage: number): void {
    const cfg = GameConfig.combat.melee.combo.shock;
    const fx = GameConfig.juice.shock;
    enemy.shock(cfg.stun, finisherDamage * cfg.tickDamageRatio);
    const ep = enemy.position;
    this.tmp.set(ep.x, 0.05, ep.z);
    const height = Math.max(1.2, enemy.radius * 2.6);
    this.effects.lightning(this.tmp, enemy.radius * 1.4, height, fx.bolts, fx.duration, new THREE.Color(fx.color));
    this.shocks++;
    this.onShock?.(enemy);
  }

  /** 원거리 공격: 장착한 무기의 방식대로(탄 수·퍼짐·속도·크기·관통) 총구 섬광과 함께 쏜다. 명중 연출은 Game 이 ProjectileSystem 콜백으로 */
  private rangedAttack(): void {
    const cfg = GameConfig.combat.ranged;
    const style = this.getWeaponStyle('ranged').ranged ?? GameConfig.combat.weaponStyles.blaster.ranged!;
    this.rangedCooldown = cfg.cooldown * style.cooldownMul;
    this.attacks++;
    this.onAttack?.('ranged', 0, false);
    const dir = this.faceAim();
    const pos = this.player.position;
    this.player.triggerAttack(Math.min(cfg.cooldown * style.cooldownMul, 0.28), 'ranged', 0);
    const color = new THREE.Color(style.color || cfg.color).getHex();
    const origin: Vec2 = { x: pos.x + dir.x * 0.7, z: pos.z + dir.z * 0.7 };
    // 총구 섬광: 발사 지점에서 밝게 터지고 짧은 파편이 앞으로 튄다 (큰 탄일수록 크게)
    this.tmp.set(origin.x, 0.9, origin.z);
    this.effects.flash(this.tmp, GameConfig.juice.ranged.muzzleRadius * Math.sqrt(style.radiusMul), GameConfig.juice.ranged.muzzleTime, color);
    this.effects.burst(this.tmp, color, 4, 3);
    const damage = Math.round((cfg.damage + this.getWeaponAttack('ranged')) * this.getDamageMultiplier());
    const n = Math.max(1, Math.round(style.count));
    const spread = (style.spreadDegrees * Math.PI) / 180;
    const base = Math.atan2(dir.x, dir.z);
    for (let i = 0; i < n; i++) {
      const a = n > 1 ? base - spread / 2 + (spread * i) / (n - 1) : base;
      this.projectiles.spawn(origin, { x: Math.sin(a), z: Math.cos(a) }, {
        damage,
        speed: cfg.speed * style.speedMul,
        lifetime: cfg.lifetime * style.lifetimeMul,
        radius: cfg.radius * style.radiusMul,
        knockback: cfg.knockback * style.knockbackMul,
        color,
        friendly: true,
        pierce: style.pierce,
      });
    }
  }
}
