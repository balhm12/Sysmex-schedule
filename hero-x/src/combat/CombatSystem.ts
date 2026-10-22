import * as THREE from 'three';
import type { Enemy } from '../enemies/Enemy';
import { GameConfig } from '../game/GameConfig';
import type { InputManager } from '../input/InputManager';
import type { Player } from '../player/Player';
import { directionToFacing, type Vec2 } from '../player/movement';
import type { Effects } from './Effects';
import { isInMeleeArc } from './melee';

/**
 * 플레이어의 공격 처리
 * - 공격 입력 → 마우스 방향으로 몸을 돌림 → 부채꼴 안의 적에게 피해와 밀침 → 효과 표시
 * - 공격 수치는 GameConfig.combat 에서 읽는다.
 * - 적 목록과 조준 지점은 함수로 받아서 다른 시스템을 직접 알지 않는다.
 */
export class CombatSystem {
  /** 처치한 적 수 */
  kills = 0;
  /** 누적 점수 */
  score = 0;

  private meleeCooldown = 0;
  private readonly tmp = new THREE.Vector3();

  constructor(
    private readonly player: Player,
    private readonly input: InputManager,
    private readonly getEnemies: () => Enemy[],
    private readonly getAimPoint: () => Vec2 | null,
    private readonly effects: Effects,
  ) {}

  /** 재시작 시 기록 초기화 */
  reset(): void {
    this.kills = 0;
    this.score = 0;
    this.meleeCooldown = 0;
  }

  update(dt: number): void {
    if (this.meleeCooldown > 0) this.meleeCooldown -= dt;
    if (this.player.health.isDead) return;

    if (this.meleeCooldown <= 0 && this.input.isActionDown(GameConfig.controls.attackMelee)) {
      this.meleeAttack();
    }
  }

  /** 근접 공격 한 번 */
  private meleeAttack(): void {
    const cfg = GameConfig.combat.melee;
    this.meleeCooldown = cfg.cooldown;

    // 마우스가 가리키는 쪽으로 즉시 몸을 돌린다 (너무 가까우면 현재 방향 유지)
    const pos = this.player.position;
    const aim = this.getAimPoint();
    if (aim) {
      const dir = { x: aim.x - pos.x, z: aim.z - pos.z };
      if (Math.hypot(dir.x, dir.z) > 0.25) this.player.facing = directionToFacing(dir);
    }
    this.player.triggerAttack(cfg.swingTime);
    this.effects.swing(pos, this.player.facing, cfg.range, cfg.arcDegrees, cfg.swingTime);

    const origin: Vec2 = { x: pos.x, z: pos.z };
    for (const enemy of this.getEnemies()) {
      if (!enemy.alive) continue;
      const ep = enemy.position;
      if (!isInMeleeArc(origin, this.player.facing, { x: ep.x, z: ep.z }, enemy.radius, cfg.range, cfg.arcDegrees)) continue;

      const len = Math.hypot(ep.x - pos.x, ep.z - pos.z) || 1;
      const hitDir = { x: (ep.x - pos.x) / len, z: (ep.z - pos.z) / len };
      if (!enemy.hit(cfg.damage, hitDir, cfg.knockback)) continue;

      this.tmp.set(ep.x, 0.8, ep.z);
      if (enemy.alive) {
        this.effects.burst(this.tmp, 0xffffff, 5, 3);
      } else {
        this.effects.burst(this.tmp, enemy.def.color, 18, 7);
        this.kills++;
        this.score += enemy.def.score;
      }
    }
  }
}
