import { describe, expect, it } from 'vitest';
import { BossAI, type BossParams } from '../src/enemies/BossAI';
import { GameConfig } from '../src/game/GameConfig';
import { generateItemAtLeast } from '../src/items/ItemDatabase';

const params: BossParams = {
  engageRange: 11, chargeMinRange: 5,
  windup: { charge: 0.8, slam: 0.7, barrage: 0.6, summon: 0.9, mortar: 0.8 },
  chargeDuration: 0.55, recover: 0.7, cooldown: 1.3, phase2TimeMul: 0.7,
};

/** 특정 조건이 될 때까지 갱신. 돌려주는 값은 그때의 결정 */
function runUntil(ai: BossAI, self: { x: number; z: number }, player: { x: number; z: number }, pred: (d: ReturnType<BossAI['update']>) => boolean, phase2 = false, maxSteps = 200) {
  for (let i = 0; i < maxSteps; i++) {
    const d = ai.update(0.05, self, player, params, phase2);
    if (pred(d)) return { d, steps: i + 1 };
  }
  return null;
}

describe('BossAI (보스 패턴)', () => {
  it('멀리 있으면 돌진을 고르고, 예고가 끝나면 돌진 상태로 빠르게 움직인다', () => {
    const ai = new BossAI();
    const r = runUntil(ai, { x: 0, z: 0 }, { x: 0, z: 8 }, (d) => d.execute === 'charge');
    expect(r).not.toBeNull();
    expect(r!.d.state).toBe('charge');
    expect(r!.d.move.z).toBeCloseTo(1, 6);
  });

  it('가까이 있으면 내려찍기와 탄막을 번갈아 쓴다', () => {
    const ai = new BossAI();
    const self = { x: 0, z: 0 }, player = { x: 0, z: 3 };
    const first = runUntil(ai, self, player, (d) => d.execute === 'slam' || d.execute === 'barrage');
    const second = runUntil(ai, self, player, (d) => d.execute === 'slam' || d.execute === 'barrage');
    expect(first!.d.execute).not.toBe(second!.d.execute);
  });

  it('예고 중에는 움직이지 않고 진행도가 0→1 로 오른다', () => {
    const ai = new BossAI();
    const self = { x: 0, z: 0 }, player = { x: 0, z: 3 };
    runUntil(ai, self, player, (d) => d.state === 'windup');
    const mid = ai.update(0.3, self, player, params, false);
    expect(mid.move).toEqual({ x: 0, z: 0 });
    expect(mid.windupProgress).toBeGreaterThan(0);
    expect(mid.windupProgress).toBeLessThan(1);
  });

  it('2단계에서는 같은 패턴까지 걸리는 시간이 짧아진다', () => {
    const steps = (phase2: boolean) => {
      const ai = new BossAI();
      const self = { x: 0, z: 0 }, player = { x: 0, z: 3 };
      runUntil(ai, self, player, (d) => d.execute !== null, phase2); // 첫 패턴
      return runUntil(ai, self, player, (d) => d.execute !== null, phase2)!.steps; // 두 번째 패턴까지
    };
    expect(steps(true)).toBeLessThan(steps(false));
  });

  it('closePatterns 를 주면 그 순서대로 순환하고, useCharge=false 면 멀어도 돌진하지 않는다', () => {
    const ai = new BossAI();
    const p2: BossParams = { ...params, closePatterns: ['mortar', 'barrage', 'slam'], useCharge: false };
    const self = { x: 0, z: 0 }, player = { x: 0, z: 9 }; // chargeMinRange(5) 보다 멀다
    const seen: string[] = [];
    for (let k = 0; k < 4; k++) {
      let got: string | null = null;
      for (let i = 0; i < 300 && !got; i++) {
        const d = ai.update(0.05, self, player, p2, false);
        if (d.execute) got = d.execute;
      }
      seen.push(got ?? 'none');
    }
    expect(seen).toEqual(['mortar', 'barrage', 'slam', 'mortar']);
    expect(seen).not.toContain('charge');
  });

  it('죽으면 아무것도 하지 않는다', () => {
    const ai = new BossAI();
    ai.kill();
    const d = ai.update(0.1, { x: 0, z: 0 }, { x: 0, z: 1 }, params, false);
    expect(d.state).toBe('dead');
    expect(d.execute).toBeNull();
  });
});

describe('보스 보상·설정', () => {
  it('generateItemAtLeast 는 최소 등급을 보장한다', () => {
    const order = ['common', 'uncommon', 'rare', 'epic', 'legendary'];
    for (let i = 0; i < 30; i++) {
      const it = generateItemAtLeast('rare');
      expect(order.indexOf(it.rarity)).toBeGreaterThanOrEqual(order.indexOf('rare'));
    }
  });

  it('보스 등장 위치는 영역 안이고 장애물과 겹치지 않는다', () => {
    const b = GameConfig.boss;
    expect(Math.abs(b.spawn.x)).toBeLessThan(GameConfig.world.arenaHalfSize - b.radius);
    expect(Math.abs(b.spawn.z)).toBeLessThan(GameConfig.world.arenaHalfSize - b.radius);
    for (const o of GameConfig.world.obstacles) {
      const overlap = Math.abs(b.spawn.x - o.x) < o.w / 2 + b.radius && Math.abs(b.spawn.z - o.z) < o.d / 2 + b.radius;
      expect(overlap).toBe(false);
    }
  });
});
