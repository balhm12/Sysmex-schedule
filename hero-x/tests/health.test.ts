import { describe, expect, it } from 'vitest';
import { Health } from '../src/combat/Health';

describe('Health (체력)', () => {
  it('피해를 받으면 체력이 줄고, 0 이하로는 내려가지 않는다', () => {
    const h = new Health(30);
    expect(h.takeDamage(12)).toBe(true);
    expect(h.hp).toBe(18);
    expect(h.takeDamage(100)).toBe(true);
    expect(h.hp).toBe(0);
    expect(h.isDead).toBe(true);
  });

  it('죽은 뒤에는 피해를 받지 않는다', () => {
    const h = new Health(10);
    h.takeDamage(10);
    expect(h.takeDamage(5)).toBe(false);
  });

  it('무적 시간 동안은 피해를 받지 않고, 시간이 지나면 다시 받는다', () => {
    const h = new Health(100, 0.6);
    expect(h.takeDamage(10)).toBe(true);
    expect(h.takeDamage(10)).toBe(false); // 바로 이어진 피해는 무시
    h.update(0.3);
    expect(h.takeDamage(10)).toBe(false);
    h.update(0.31);
    expect(h.takeDamage(10)).toBe(true);
    expect(h.hp).toBe(80);
  });

  it('회복은 최대 체력을 넘지 않는다', () => {
    const h = new Health(50);
    h.takeDamage(20);
    h.heal(100);
    expect(h.hp).toBe(50);
  });

  it('reset 은 체력을 가득 채우고 무적을 해제한다', () => {
    const h = new Health(50, 1);
    h.takeDamage(50);
    h.reset(80);
    expect(h.hp).toBe(80);
    expect(h.maxHp).toBe(80);
    expect(h.invulnerable).toBe(0);
    expect(h.isDead).toBe(false);
  });

  it('체력 비율은 0~1 이다', () => {
    const h = new Health(200);
    h.takeDamage(50);
    expect(h.ratio).toBeCloseTo(0.75, 6);
  });
});
