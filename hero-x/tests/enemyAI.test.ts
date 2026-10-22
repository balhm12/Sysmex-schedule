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
