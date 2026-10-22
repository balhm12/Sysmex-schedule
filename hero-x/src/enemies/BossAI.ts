import type { Vec2 } from '../player/movement';

/** 보스 공격 패턴 */
export type BossPattern = 'charge' | 'slam' | 'barrage';

/** 보스 상태 */
export type BossState = 'idle' | 'chase' | 'windup' | 'charge' | 'recover' | 'dead';

/** 패턴 타이밍 (GameConfig.boss 에서 온다) */
export interface BossParams {
  /** 추적 중 이 거리 안이면 패턴을 시작한다 */
  engageRange: number;
  /** 이 거리보다 멀면 돌진을 고른다 */
  chargeMinRange: number;
  windup: Record<BossPattern, number>;
  chargeDuration: number;
  recover: number;
  cooldown: number;
  /** 2단계(체력 50% 이하)에서 시간이 곱해지는 비율 (0.75 = 25% 빨라짐) */
  phase2TimeMul: number;
}

/** 매 프레임 결정 */
export interface BossDecision {
  state: BossState;
  /** 이동 방향(길이 1) 또는 (0,0). charge 상태에서는 돌진 방향 */
  move: Vec2;
  /** 이번 프레임에 실행되는 패턴 (예고가 끝난 순간) */
  execute: BossPattern | null;
  /** 지금 예고 중인 패턴과 진행도 0~1 (모델 연출용) */
  windupPattern: BossPattern | null;
  windupProgress: number;
}

/**
 * 보스 AI (순수 로직)
 * - 추적 → 패턴 선택 → 예고(windup) → 실행 → 회복(recover) → 대기(cooldown) → 추적 …
 * - 패턴: 멀면 돌진(charge), 가까우면 내려찍기(slam)와 탄막(barrage)을 번갈아.
 * - 2단계에서는 예고·회복·대기 시간이 phase2TimeMul 배로 짧아진다.
 */
export class BossAI {
  state: BossState = 'idle';
  private pattern: BossPattern | null = null;
  private timer = 0;
  private total = 0;
  private cooldown = 0;
  private lastClose: BossPattern = 'barrage';
  private chargeDir: Vec2 = { x: 0, z: 1 };

  update(dt: number, self: Vec2, player: Vec2, p: BossParams, phase2: boolean): BossDecision {
    const mul = phase2 ? p.phase2TimeMul : 1;
    const dx = player.x - self.x;
    const dz = player.z - self.z;
    const dist = Math.hypot(dx, dz);
    const toPlayer: Vec2 = dist > 1e-6 ? { x: dx / dist, z: dz / dist } : { x: 0, z: 1 };
    const none: Vec2 = { x: 0, z: 0 };
    if (this.cooldown > 0) this.cooldown = Math.max(0, this.cooldown - dt);

    const base: BossDecision = { state: this.state, move: none, execute: null, windupPattern: null, windupProgress: 0 };

    switch (this.state) {
      case 'dead':
        return base;

      case 'idle':
        this.state = 'chase';
        return { ...base, state: this.state };

      case 'chase': {
        if (this.cooldown <= 0 && dist <= p.engageRange) {
          // 패턴 선택: 멀면 돌진, 가까우면 내려찍기/탄막 교대
          if (dist > p.chargeMinRange) this.pattern = 'charge';
          else {
            this.pattern = this.lastClose === 'slam' ? 'barrage' : 'slam';
            this.lastClose = this.pattern;
          }
          this.state = 'windup';
          this.timer = this.total = p.windup[this.pattern] * mul;
          this.chargeDir = toPlayer;
          return { ...base, state: this.state, windupPattern: this.pattern, windupProgress: 0 };
        }
        return { ...base, state: this.state, move: dist > 2.5 ? toPlayer : none };
      }

      case 'windup': {
        this.timer -= dt;
        // 예고 중에는 플레이어 쪽을 계속 바라보되 돌진 방향은 마지막에 확정
        this.chargeDir = toPlayer;
        const progress = this.total > 0 ? 1 - Math.max(0, this.timer) / this.total : 1;
        if (this.timer > 0) return { ...base, state: this.state, windupPattern: this.pattern, windupProgress: progress };
        const pattern = this.pattern!;
        if (pattern === 'charge') {
          this.state = 'charge';
          this.timer = p.chargeDuration;
          return { ...base, state: this.state, move: this.chargeDir, execute: 'charge' };
        }
        this.state = 'recover';
        this.timer = p.recover * mul;
        return { ...base, state: this.state, execute: pattern };
      }

      case 'charge': {
        this.timer -= dt;
        if (this.timer > 0) return { ...base, state: this.state, move: this.chargeDir };
        this.state = 'recover';
        this.timer = p.recover * mul;
        return { ...base, state: this.state };
      }

      case 'recover': {
        this.timer -= dt;
        if (this.timer > 0) return { ...base, state: this.state };
        this.state = 'chase';
        this.cooldown = p.cooldown * mul;
        return { ...base, state: this.state };
      }
    }
  }

  /** 돌진을 벽 등에 막혔을 때 즉시 멈추게 한다 */
  stopCharge(): void {
    if (this.state === 'charge') this.timer = 0;
  }

  kill(): void {
    this.state = 'dead';
  }
}
