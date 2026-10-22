import type { Vec2 } from '../player/movement';

/** 적의 상태 */
export type EnemyState = 'idle' | 'chase' | 'windup' | 'hurt' | 'dead';

/** AI 가 매 프레임 내리는 결정 */
export interface AIDecision {
  /** 이동 방향 (길이 1) 또는 (0, 0) */
  move: Vec2;
  /** 이번 프레임에 공격을 실행하는지 */
  attackNow: boolean;
  state: EnemyState;
}

/** AI 가 참고하는 능력치 (GameConfig.enemies.types 의 일부) */
export interface AIParams {
  attackRange: number;
  attackWindup: number;
  attackCooldown: number;
  aggroRange: number;
}

/**
 * 적 AI (돌진형)
 * - 상태: 대기(idle) → 추적(chase) → 공격 예고(windup) → 공격 → 추적 …, 피격(hurt), 사망(dead)
 * - 공격 전 예고 시간이 있어 플레이어가 피할 수 있다.
 * - Three.js 에 의존하지 않는 순수 로직이라 단위 테스트가 쉽다.
 */
export class EnemyAI {
  state: EnemyState = 'idle';
  private cooldown = 0;
  private windup = 0;
  private hurtTimer = 0;

  /** 예고 진행도 0~1 (모델이 예고 동작을 보여줄 때 사용) */
  get windupProgress(): number {
    return this.state === 'windup' && this.windupTotal > 0 ? 1 - this.windup / this.windupTotal : 0;
  }
  private windupTotal = 0;

  update(dt: number, self: Vec2, player: Vec2, p: AIParams): AIDecision {
    const dx = player.x - self.x;
    const dz = player.z - self.z;
    const dist = Math.hypot(dx, dz);
    const toPlayer: Vec2 = dist > 1e-6 ? { x: dx / dist, z: dz / dist } : { x: 0, z: 0 };
    if (this.cooldown > 0) this.cooldown = Math.max(0, this.cooldown - dt);

    const none: Vec2 = { x: 0, z: 0 };

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

      case 'chase':
        if (dist > p.aggroRange * 1.5) {
          this.state = 'idle';
          return { move: none, attackNow: false, state: this.state };
        }
        if (dist <= p.attackRange && this.cooldown <= 0) {
          this.state = 'windup';
          this.windup = this.windupTotal = p.attackWindup;
          return { move: none, attackNow: false, state: this.state };
        }
        // 사거리 안이면 멈춰서 대기, 밖이면 다가간다
        return { move: dist <= p.attackRange ? none : toPlayer, attackNow: false, state: this.state };

      case 'windup': {
        this.windup -= dt;
        if (this.windup > 0) return { move: none, attackNow: false, state: this.state };
        // 예고가 끝나면 공격. 그 사이 플레이어가 멀어졌으면 헛스윙
        this.cooldown = p.attackCooldown;
        this.state = 'chase';
        const hit = dist <= p.attackRange + 0.4;
        return { move: none, attackNow: hit, state: this.state };
      }
    }
  }

  /** 피격: 잠시 멈춘다 (예고 중이었다면 공격이 취소된다) */
  onHurt(duration = 0.15): void {
    if (this.state === 'dead') return;
    this.state = 'hurt';
    this.hurtTimer = duration;
  }

  kill(): void {
    this.state = 'dead';
  }
}
