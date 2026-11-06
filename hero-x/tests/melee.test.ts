import { describe, expect, it } from 'vitest';
import { isInMeleeArc } from '../src/combat/melee';

const origin = { x: 0, z: 0 };
const facingPlusZ = 0; // +Z 방향을 바라봄

describe('isInMeleeArc (근접 공격 부채꼴 판정)', () => {
  it('정면 사거리 안의 적은 맞는다', () => {
    expect(isInMeleeArc(origin, facingPlusZ, { x: 0, z: 1.5 }, 0.5, 2, 110)).toBe(true);
  });

  it('사거리 밖의 적은 맞지 않는다 (반지름을 더해도)', () => {
    expect(isInMeleeArc(origin, facingPlusZ, { x: 0, z: 3 }, 0.5, 2, 110)).toBe(false);
  });

  it('등 뒤의 적은 맞지 않는다', () => {
    expect(isInMeleeArc(origin, facingPlusZ, { x: 0, z: -1 }, 0.5, 2, 110)).toBe(false);
  });

  it('부채꼴 각도 가장자리에서 반지름만큼 여유를 준다', () => {
    // 60도 부채꼴(반각 30도): 정면에서 45도 옆에 있는 적은 작으면 빗나가지만,
    // 반지름 0.6(거리 1.5 에서 약 22도 폭)인 큰 적은 가장자리에 걸린다
    const target = { x: Math.sin(Math.PI / 4) * 1.5, z: Math.cos(Math.PI / 4) * 1.5 }; // 정면에서 45도
    expect(isInMeleeArc(origin, facingPlusZ, target, 0.01, 2, 60)).toBe(false);
    expect(isInMeleeArc(origin, facingPlusZ, target, 0.6, 2, 60)).toBe(true);
  });

  it('바라보는 방향이 바뀌면 판정도 따라간다 (+X 방향)', () => {
    const facingPlusX = Math.PI / 2;
    expect(isInMeleeArc(origin, facingPlusX, { x: 1.5, z: 0 }, 0.5, 2, 110)).toBe(true);
    expect(isInMeleeArc(origin, facingPlusX, { x: 0, z: 1.5 }, 0.5, 2, 110)).toBe(false);
  });

  it('360도 부채꼴이면 사거리 안의 모든 방향이 맞는다', () => {
    expect(isInMeleeArc(origin, facingPlusZ, { x: 0, z: -1 }, 0.5, 2, 360)).toBe(true);
  });
});
