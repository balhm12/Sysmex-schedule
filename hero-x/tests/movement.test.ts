import { describe, expect, it } from 'vitest';
import {
  clampToArena,
  computeMoveDirection,
  directionToFacing,
  lerpAngle,
  resolveCircleVsBoxes,
} from '../src/player/movement';

describe('computeMoveDirection (입력 → 이동 방향)', () => {
  it('입력이 없으면 움직이지 않는다', () => {
    expect(computeMoveDirection({ x: 0, z: 0 })).toEqual({ x: 0, z: 0 });
  });

  it('W(위)는 -Z 방향, D(오른쪽)는 +X 방향이다', () => {
    expect(computeMoveDirection({ x: 0, z: -1 })).toEqual({ x: 0, z: -1 });
    expect(computeMoveDirection({ x: 1, z: 0 })).toEqual({ x: 1, z: 0 });
  });

  it('대각선 입력은 길이가 1이 되도록 정규화한다 (대각선이 더 빨라지지 않음)', () => {
    const d = computeMoveDirection({ x: 1, z: 1 });
    expect(Math.hypot(d.x, d.z)).toBeCloseTo(1, 6);
  });

  it('카메라 방향(yaw)이 90도면 입력 방향도 90도 회전한다', () => {
    const d = computeMoveDirection({ x: 0, z: -1 }, Math.PI / 2);
    expect(d.x).toBeCloseTo(-1, 6);
    expect(d.z).toBeCloseTo(0, 6);
  });
});

describe('resolveCircleVsBoxes (장애물 충돌)', () => {
  const box = { x: 0, z: 0, w: 2, d: 2 };

  it('장애물과 떨어져 있으면 위치가 바뀌지 않는다', () => {
    expect(resolveCircleVsBoxes({ x: 5, z: 5 }, 0.5, [box])).toEqual({ x: 5, z: 5 });
  });

  it('장애물 옆면에 겹치면 바깥으로 밀어낸다', () => {
    const r = resolveCircleVsBoxes({ x: 1.2, z: 0 }, 0.5, [box]);
    expect(r.x).toBeCloseTo(1.5, 6);
    expect(r.z).toBeCloseTo(0, 6);
  });

  it('장애물 안쪽 깊숙이 들어가도 가장 가까운 면으로 밀어낸다', () => {
    const r = resolveCircleVsBoxes({ x: 0.9, z: 0.1 }, 0.5, [box]);
    expect(r.x).toBeCloseTo(1.5, 6);
    expect(r.z).toBeCloseTo(0.1, 6);
  });

  it('모서리 근처에서는 대각선으로 밀어낸다', () => {
    const r = resolveCircleVsBoxes({ x: 1.2, z: 1.2 }, 0.5, [box]);
    const dist = Math.hypot(r.x - 1, r.z - 1);
    expect(dist).toBeCloseTo(0.5, 6);
  });
});

describe('clampToArena (영역 제한)', () => {
  it('영역 밖으로 나가면 반지름만큼 안쪽으로 되돌린다', () => {
    expect(clampToArena({ x: 100, z: -100 }, 28, 0.5)).toEqual({ x: 27.5, z: -27.5 });
  });
  it('영역 안이면 그대로다', () => {
    expect(clampToArena({ x: 3, z: -4 }, 28, 0.5)).toEqual({ x: 3, z: -4 });
  });
});

describe('각도 계산', () => {
  it('lerpAngle 은 360도를 넘는 경우 최단 방향으로 돈다', () => {
    const a = lerpAngle(Math.PI * 0.95, -Math.PI * 0.95, 1);
    expect(Math.cos(a)).toBeCloseTo(Math.cos(-Math.PI * 0.95), 6);
    expect(Math.sin(a)).toBeCloseTo(Math.sin(-Math.PI * 0.95), 6);
  });
  it('directionToFacing: +Z 는 0, +X 는 90도', () => {
    expect(directionToFacing({ x: 0, z: 1 })).toBeCloseTo(0, 6);
    expect(directionToFacing({ x: 1, z: 0 })).toBeCloseTo(Math.PI / 2, 6);
  });
});
