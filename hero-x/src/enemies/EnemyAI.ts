import type { Vec2 } from '../player/movement';

/** 적의 상태 */
export type EnemyState = 'idle' | 'chase' | 'windup' | 'charge' | 'hurt' | 'dead';

/** AI 가 매 프레임 내리는 결정 */
export interface AIDecision {
  /** 이동 방향 (길이 1) 또는 (0, 0) */
  move: Vec2;
  /** 이번 프레임에 공격을 실행하는지 */
  attackNow: boolean;
  state: EnemyState;
  /** 이동 속도 배율 (돌진 중 chargeSpeed/speed). 없으면 1 */
  speedMul?: number;
}

/** AI 가 참고하는 능력치 (GameConfig.enemies.types 의 일부) */
export interface AIParams {
  attackRange: number;
  attackWindup: number;
  attackCooldown: number;
  aggroRange: number;
  /**
   * 'ranged' 면 사거리 안에서 멈춰 쏘고 retreatRange 보다 가까우면 물러난다.
   * 'charge' 면 예고 뒤 플레이어 쪽으로 chargeDuration 동안 chargeSpeed 로 돌진하고 닿으면 피해(attackNow).
   * 'explode' 는 근접과 같이 예고 뒤 attackNow — Game 이 범위 폭발로 처리하고 적은 사라진다.
   */
  attackKind?: 'melee' | 'ranged' | 'charge' | 'explode';
  retreatRange?: number;
  speed?: number;
  chargeSpeed?: number;
  chargeDuration?: number;
}

/**
 * 적 AI (돌진형·원거리형 공용)
 * - 상태: 대기(idle) → 추적(chase) → 공격 예고(windup) → 공격 → 추적 …, 피격(hurt), 사망(dead)
 * - 공격 전 예고 시간이 있어 플레이어가 피할 수 있다.
 * - 원거리형은 사거리 안에서 멈춰서 쏘고, 너무 가까워지면 뒤로 물러난다.
 * - Three.js 에 의존하지 않는 순수 로직이라 단위 테스트가 쉽다.
 */
export class EnemyAI {
  state: EnemyState = 'idle';
  private cooldown = 0;
  private windup = 0;
  private windupTotal = 0;
  private hurtTimer = 0;
  private chargeTimer = 0;
  private chargeDir: Vec2 = { x: 0, z: 1 };

  /** 예고 진행도 0~1 (모델이 예고 동작을 보여줄 때 사용) */
  get windupProgress(): number {
    return this.state === 'windup' && this.windupTotal > 0 ? 1 - this.windup / this.windupTotal : 0;
  }

  update(dt: number, self: Vec2, player: Vec2, p: AIParams): AIDecision {
    const dx = player.x - self.x;
    const dz = player.z - self.z;
    const dist = Math.hypot(dx, dz);
    const toPlayer: Vec2 = dist > 1e-6 ? { x: dx / dist, z: dz / dist } : { x: 0, z: 0 };
    if (this.cooldown > 0) this.cooldown = Math.max(0, this.cooldown - dt);

    const none: Vec2 = { x: 0, z: 0 };
    const ranged = p.attackKind === 'ranged';

    switch (this.state) {
      case 'dead':
        return { move: none, attackNow: false, state: this.state };

      case 'hurt':
        this.hurtTimer -= dt;
        if (this.hurtTimer <= 0) this.state = 'chase';
        return { move: none, attackNow: false, state: this.state };

      case 'idle':
        if (dist <= p.aggroRange) this.state = 'chase';
        return { move: none, attackNow: false, state: this.state };

      case 'chase': {
        if (dist > p.aggroRange * 1.5) {
          this.state = 'idle';
          return { move: none, attackNow: false, state: this.state };
        }
        // 원거리형: 너무 가까우면 물러난다
        if (ranged && p.retreatRange !== undefined && dist < p.retreatRange) {
          return { move: { x: -toPlayer.x, z: -toPlayer.z }, attackNow: false, state: this.state };
        }
        if (dist <= p.attackRange && this.cooldown <= 0) {
          this.state = 'windup';
          this.windup = this.windupTotal = p.attackWindup;
          return { move: none, attackNow: false, state: this.state };
        }
        // 사거리 안이면 멈춰서 대기, 밖이면 다가간다
        return { move: dist <= p.attackRange ? none : toPlayer, attackNow: false, state: this.state };
      }

      case 'windup': {
        this.windup -= dt;
        if (this.windup > 0) return { move: none, attackNow: false, state: this.state };
        this.cooldown = p.attackCooldown;
        if (p.attackKind === 'charge') {
          // 돌진 시작: 예고가 끝난 순간의 플레이어 방향으로 고정해 달린다 (옆으로 피할 수 있다)
          this.state = 'charge';
          this.chargeTimer = p.chargeDuration ?? 0.6;
          this.chargeDir = toPlayer.x === 0 && toPlayer.z === 0 ? { x: 0, z: 1 } : toPlayer;
          return { move: this.chargeDir, attackNow: false, state: this.state, speedMul: this.chargeSpeedMul(p) };
        }
        // 예고가 끝나면 공격. 그 사이 플레이어가 멀어졌으면 헛스윙 (원거리형은 여유를 더 준다)
        this.state = 'chase';
        const reach = ranged ? p.attackRange * 1.3 : p.attackRange + 0.4;
        return { move: none, attackNow: dist <= reach, state: this.state };
      }

      case 'charge': {
        this.chargeTimer -= dt;
        // 닿으면 피해를 주고 멈춘다. 시간이 다 되면 그냥 멈춘다 (벽에 막혀도 시간이 지나면 끝)
        const hit = dist <= 1.2;
        if (hit || this.chargeTimer <= 0) {
          this.state = 'chase';
          return { move: none, attackNow: hit, state: this.state };
        }
        return { move: this.chargeDir, attackNow: false, state: this.state, speedMul: this.chargeSpeedMul(p) };
      }
    }
  }

  private chargeSpeedMul(p: AIParams): number {
    const base = p.speed ?? 1;
    return base > 0 ? (p.chargeSpeed ?? base * 3) / base : 1;
  }

  /** 피격: 잠시 멈춘다 (예고 중이었다면 공격이 취소된다). 돌진 중에는 멈추지 않는다 */
  onHurt(duration = 0.15): void {
    if (this.state === 'dead' || this.state === 'charge') return;
    this.state = 'hurt';
    this.hurtTimer = duration;
  }

  kill(): void {
    this.state = 'dead';
  }
}
