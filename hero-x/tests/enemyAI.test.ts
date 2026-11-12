import { describe, expect, it } from 'vitest';
import { EnemyAI, type AIParams } from '../src/enemies/EnemyAI';

const params: AIParams = { attackRange: 1.5, attackWindup: 0.3, attackCooldown: 1.0, aggroRange: 10 };

/** dt 간격으로 steps 번 갱신하고 마지막 결정을 돌려준다 */
function run(ai: EnemyAI, self: { x: number; z: number }, player: { x: number; z: number }, steps: number, dt = 0.1) {
  let last = ai.update(dt, self, player, params);
  for (let i = 1; i < steps; i++) last = ai.update(dt, self, player, params);
  return last;
}

describe('EnemyAI (돌진형 적 판단)', () => {
  it('플레이어가 멀면 대기하고 움직이지 않는다', () => {
    const ai = new EnemyAI();
    const d = ai.update(0.1, { x: 0, z: 0 }, { x: 50, z: 0 }, params);
    expect(d.state).toBe('idle');
    expect(d.move).toEqual({ x: 0, z: 0 });
  });

  it('감지 범위 안에 들어오면 플레이어 쪽으로 다가간다', () => {
    const ai = new EnemyAI();
    ai.update(0.1, { x: 0, z: 0 }, { x: 6, z: 0 }, params); // idle → chase
    const d = ai.update(0.1, { x: 0, z: 0 }, { x: 6, z: 0 }, params);
    expect(d.state).toBe('chase');
    expect(d.move.x).toBeCloseTo(1, 6);
    expect(d.move.z).toBeCloseTo(0, 6);
  });

  it('사거리 안에 오면 예고(windup) 후 공격하고, 바로 다시 공격하지 않는다', () => {
    const ai = new EnemyAI();
    const self = { x: 0, z: 0 };
    const player = { x: 1, z: 0 };
    ai.update(0.1, self, player, params); // idle → chase
    const windup = ai.update(0.1, self, player, params); // chase → windup
    expect(windup.state).toBe('windup');
    expect(windup.attackNow).toBe(false);
    expect(windup.move).toEqual({ x: 0, z: 0 });

    // 예고 0.3초가 끝나는 프레임에 공격
    let attacked = false;
    for (let i = 0; i < 5; i++) {
      const d = ai.update(0.1, self, player, params);
      if (d.attackNow) attacked = true;
    }
    expect(attacked).toBe(true);

    // 재사용 대기 중에는 공격하지 않는다
    const during = run(ai, self, player, 3);
    expect(during.attackNow).toBe(false);
    expect(during.state).toBe('chase');
  });

  it('예고 중에 플레이어가 멀어지면 헛스윙한다', () => {
    const ai = new EnemyAI();
    const self = { x: 0, z: 0 };
    ai.update(0.1, self, { x: 1, z: 0 }, params);
    ai.update(0.1, self, { x: 1, z: 0 }, params); // windup 시작
    let attacked = false;
    for (let i = 0; i < 5; i++) {
      const d = ai.update(0.1, self, { x: 5, z: 0 }, params);
      if (d.attackNow) attacked = true;
    }
    expect(attacked).toBe(false);
  });

  it('피격되면 잠시 멈췄다가 다시 추적한다', () => {
    const ai = new EnemyAI();
    ai.update(0.1, { x: 0, z: 0 }, { x: 6, z: 0 }, params);
    ai.onHurt(0.15);
    const stopped = ai.update(0.1, { x: 0, z: 0 }, { x: 6, z: 0 }, params);
    expect(stopped.state).toBe('hurt');
    expect(stopped.move).toEqual({ x: 0, z: 0 });
    const again = ai.update(0.1, { x: 0, z: 0 }, { x: 6, z: 0 }, params);
    expect(again.state).toBe('chase');
  });

  it('죽으면 아무것도 하지 않는다', () => {
    const ai = new EnemyAI();
    ai.kill();
    const d = ai.update(0.1, { x: 0, z: 0 }, { x: 1, z: 0 }, params);
    expect(d.state).toBe('dead');
    expect(d.attackNow).toBe(false);
    expect(d.move).toEqual({ x: 0, z: 0 });
  });
});

describe('EnemyAI (원거리형)', () => {
  const ranged: AIParams = { attackRange: 9, attackWindup: 0.5, attackCooldown: 2, aggroRange: 22, attackKind: 'ranged', retreatRange: 4.5 };

  it('너무 가까우면 플레이어 반대쪽으로 물러난다', () => {
    const ai = new EnemyAI();
    ai.update(0.1, { x: 0, z: 0 }, { x: 2, z: 0 }, ranged); // idle → chase
    const d = ai.update(0.1, { x: 0, z: 0 }, { x: 2, z: 0 }, ranged);
    expect(d.state).toBe('chase');
    expect(d.move.x).toBeCloseTo(-1, 6);
  });

  it('사거리 안이고 적당히 떨어져 있으면 멈춰서 예고 후 발사한다', () => {
    const ai = new EnemyAI();
    const self = { x: 0, z: 0 };
    const player = { x: 7, z: 0 };
    ai.update(0.1, self, player, ranged); // idle → chase
    const w = ai.update(0.1, self, player, ranged); // chase → windup
    expect(w.state).toBe('windup');
    let fired = false;
    for (let i = 0; i < 8; i++) if (ai.update(0.1, self, player, ranged).attackNow) fired = true;
    expect(fired).toBe(true);
  });
});

describe('EnemyAI (돌진형 · 자폭형)', () => {
  const chargeParams: AIParams = { attackRange: 7, attackWindup: 0.3, attackCooldown: 2, aggroRange: 18, attackKind: 'charge', speed: 3, chargeSpeed: 15, chargeDuration: 0.6 };
  it('돌진형: 사거리 안에서 예고 → 예고가 끝난 방향으로 빠르게 달린다 (speedMul = chargeSpeed/speed), 닿으면 공격, 돌진 중 피격돼도 안 멈춤', () => {
    const ai = new EnemyAI();
    ai.update(0.1, { x: 0, z: 0 }, { x: 6, z: 0 }, chargeParams); // idle → chase
    let d = ai.update(0.1, { x: 0, z: 0 }, { x: 6, z: 0 }, chargeParams); // chase → windup
    expect(d.state).toBe('windup');
    for (let i = 0; i < 3; i++) d = ai.update(0.1, { x: 0, z: 0 }, { x: 6, z: 0 }, chargeParams);
    expect(d.state).toBe('charge');
    expect(d.move.x).toBeCloseTo(1, 6);
    expect(d.speedMul).toBeCloseTo(5, 6);
    ai.onHurt();
    d = ai.update(0.1, { x: 1.5, z: 0 }, { x: 6, z: 0 }, chargeParams);
    expect(d.state).toBe('charge'); // 피격으로 안 멈춤
    // 플레이어가 옆으로 피하면 방향은 그대로 → 지나간다
    d = ai.update(0.1, { x: 3, z: 0 }, { x: 6, z: 3 }, chargeParams);
    expect(d.move).toEqual({ x: 1, z: 0 });
    // 닿으면 공격하고 멈춘다
    d = ai.update(0.1, { x: 5, z: 0 }, { x: 6, z: 0 }, chargeParams);
    expect(d.attackNow).toBe(true);
    expect(d.state).toBe('chase');
    expect(d.move).toEqual({ x: 0, z: 0 });
  });
  it('돌진형: 시간이 다 되면 공격 없이 멈춘다 (벽에 막힌 경우)', () => {
    const ai = new EnemyAI();
    ai.update(0.1, { x: 0, z: 0 }, { x: 6, z: 0 }, chargeParams);
    for (let i = 0; i < 4; i++) ai.update(0.1, { x: 0, z: 0 }, { x: 6, z: 0 }, chargeParams);
    let d = ai.update(0.1, { x: 0, z: 0 }, { x: 6, z: 0 }, chargeParams);
    expect(d.state).toBe('charge');
    for (let i = 0; i < 7; i++) d = ai.update(0.1, { x: 0, z: 0 }, { x: 6, z: 0 }, chargeParams);
    expect(d.state).toBe('chase');
    expect(d.attackNow).toBe(false);
  });
  it('자폭형은 근접과 같이 예고 뒤 attackNow (범위 처리는 Game)', () => {
    const p: AIParams = { attackRange: 1.8, attackWindup: 0.2, attackCooldown: 1, aggroRange: 10, attackKind: 'explode' };
    const ai = new EnemyAI();
    ai.update(0.1, { x: 0, z: 0 }, { x: 1, z: 0 }, p);
    ai.update(0.1, { x: 0, z: 0 }, { x: 1, z: 0 }, p);
    const d = ai.update(0.1, { x: 0, z: 0 }, { x: 1, z: 0 }, p);
    const d2 = ai.update(0.1, { x: 0, z: 0 }, { x: 1, z: 0 }, p);
    expect(d.state === 'windup' || d2.attackNow).toBe(true);
    expect(d2.attackNow).toBe(true);
  });
});
