import * as THREE from 'three';
import type { Enemy } from '../enemies/Enemy';
import { GameConfig } from '../game/GameConfig';
import type { InputManager } from '../input/InputManager';
import type { Player } from '../player/Player';
import { directionToFacing, type Vec2 } from '../player/movement';
import type { Effects } from './Effects';
import { isInMeleeArc } from './melee';
import type { ProjectileSystem } from './Projectile';

/**
 * 플레이어의 공격 처리
 * - 근접: 공격 입력 → 마우스 방향으로 몸을 돌림 → 부채꼴 안의 적에게 피해와 밀침 → 효과 표시
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
  /** 공격을 시작할 때 알림 (효과음용) */
  onAttack: ((kind: 'melee' | 'ranged') => void) | null = null;
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
  ) {}

  /** 재시작 시 기록 초기화 */
  reset(): void {
    this.kills = 0;
    this.score = 0;
    this.meleeCooldown = 0;
    this.rangedCooldown = 0;
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
    if (this.rangedCooldown > 0) this.rangedCooldown -= dt;
    if (this.player.health.isDead) {
      this.meleeQueued = this.rangedQueued = false;
      return;
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

  /** 근접 공격 한 번 */
  private meleeAttack(): void {
    const cfg = GameConfig.combat.melee;
    this.meleeCooldown = cfg.cooldown;
    this.attacks++;
    this.onAttack?.('melee');
    this.faceAim();
    const pos = this.player.position;
    this.player.triggerAttack(cfg.swingTime);
    this.effects.swing(pos, this.player.facing, cfg.range, cfg.arcDegrees, cfg.swingTime);
    this.effects.slash(pos, this.player.facing, cfg.range, cfg.arcDegrees, cfg.swingTime * 1.3, new THREE.Color(GameConfig.juice.slashColor).getHex());

    const origin: Vec2 = { x: pos.x, z: pos.z };
    for (const enemy of this.getEnemies()) {
      if (!enemy.alive) continue;
      const ep = enemy.position;
      if (!isInMeleeArc(origin, this.player.facing, { x: ep.x, z: ep.z }, enemy.radius, cfg.range, cfg.arcDegrees)) continue;
      const len = Math.hypot(ep.x - pos.x, ep.z - pos.z) || 1;
      this.damageEnemy(enemy, Math.round((cfg.damage + this.getWeaponAttack('melee')) * this.getDamageMultiplier()), { x: (ep.x - pos.x) / len, z: (ep.z - pos.z) / len }, cfg.knockback);
    }
  }

  /** 원거리 공격 한 발 */
  private rangedAttack(): void {
    const cfg = GameConfig.combat.ranged;
    this.rangedCooldown = cfg.cooldown;
    this.attacks++;
    this.onAttack?.('ranged');
    const dir = this.faceAim();
    const pos = this.player.position;
    this.player.triggerAttack(0.15);
    this.projectiles.spawn(
      { x: pos.x + dir.x * 0.7, z: pos.z + dir.z * 0.7 },
      dir,
      { damage: Math.round((cfg.damage + this.getWeaponAttack('ranged')) * this.getDamageMultiplier()), speed: cfg.speed, lifetime: cfg.lifetime, radius: cfg.radius, knockback: cfg.knockback, color: 0x5cf2d8, friendly: true },
    );
  }
}
