import { describe, expect, it } from 'vitest';
import { segmentBlocked, steerAround, stepVelocity } from '../src/player/movement';
import {
  clampToArena,
  computeMoveDirection,
  directionToFacing,
  hitsObstacle,
  groundHeightAt,
  integrateJump,
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

describe('hitsObstacle / integrateJump (투사체·점프)', () => {
  it('hitsObstacle: 장애물 안이나 영역 밖이면 true', () => {
    const boxes = [{ x: 5, z: 0, w: 2, d: 2 }];
    expect(hitsObstacle({ x: 5, z: 0 }, 0.2, boxes, 28)).toBe(true);
    expect(hitsObstacle({ x: 0, z: 0 }, 0.2, boxes, 28)).toBe(false);
    expect(hitsObstacle({ x: 29, z: 0 }, 0.2, boxes, 28)).toBe(true);
  });

  it('integrateJump: 올라갔다가 중력으로 내려와 땅(0)에서 멈춘다', () => {
    let s = { y: 0.001, vy: 8 };
    let maxY = 0;
    for (let i = 0; i < 200; i++) {
      s = integrateJump(s, 1 / 60, 24);
      maxY = Math.max(maxY, s.y);
    }
    expect(maxY).toBeGreaterThan(1);
    expect(s.y).toBe(0);
    expect(s.vy).toBe(0);
  });
});

describe('회피(대시) 상태', () => {
  it('시작하면 방향이 정규화되고, 대시 중·쿨다운 중에는 다시 시작할 수 없다', async () => {
    const { createDashState, startDash, tickDash } = await import('../src/player/movement');
    const d = createDashState();
    expect(startDash(d, { x: 3, z: 4 }, 0.2, 1.0)).toBe(true);
    expect(d.dir.x).toBeCloseTo(0.6, 6);
    expect(d.dir.z).toBeCloseTo(0.8, 6);
    expect(startDash(d, { x: 1, z: 0 }, 0.2, 1.0)).toBe(false); // 대시 중
    tickDash(d, 0.25);
    expect(d.timer).toBe(0);
    expect(d.cooldown).toBeCloseTo(0.75, 6);
    expect(startDash(d, { x: 1, z: 0 }, 0.2, 1.0)).toBe(false); // 쿨다운 중
    tickDash(d, 0.8);
    expect(startDash(d, { x: 0, z: 0 }, 0.2, 1.0)).toBe(true); // 방향이 없으면 앞(+Z)
    expect(d.dir).toEqual({ x: 0, z: 1 });
  });
});

describe('장애물 위에 올라서기 (높이가 있는 상자)', () => {
  const crate = { x: 0, z: 0, w: 2, d: 2, h: 2 };
  const pillar = { x: 5, z: 0, w: 1.2, d: 1.2 }; // 높이 없음 = 항상 가로막음
  it('발이 윗면(보조 포함)에 닿지 않으면 밀어내고, 닿으면 지나간다', () => {
    expect(resolveCircleVsBoxes({ x: 0.9, z: 0 }, 0.5, [crate], 0)).toEqual({ x: 1.5, z: 0 });
    expect(resolveCircleVsBoxes({ x: 0.9, z: 0 }, 0.5, [crate], 1.0, 0.8)).toEqual({ x: 1.5, z: 0 }); // 2 - 0.8 = 1.2 보다 낮음
    expect(resolveCircleVsBoxes({ x: 0.9, z: 0 }, 0.5, [crate], 1.3, 0.8)).toEqual({ x: 0.9, z: 0 }); // 보조로 통과
    expect(resolveCircleVsBoxes({ x: 0.9, z: 0 }, 0.5, [crate], 2.5)).toEqual({ x: 0.9, z: 0 });
    expect(resolveCircleVsBoxes({ x: 5.4, z: 0 }, 0.5, [pillar], 9)).toEqual({ x: 6.1, z: 0 }); // 높이 없는 상자는 항상 막음
  });
  it('발밑 높이: 상자 위(가장자리 여유 포함)에 있고 충분히 높으면 상자 높이, 아니면 0', () => {
    expect(groundHeightAt({ x: 0, z: 0 }, 0.5, [crate], 2.5)).toBe(2);
    expect(groundHeightAt({ x: 1.2, z: 0 }, 0.5, [crate], 2.5)).toBe(2); // 반지름 절반(0.25)까지 여유
    expect(groundHeightAt({ x: 1.3, z: 0 }, 0.5, [crate], 2.5)).toBe(0);
    expect(groundHeightAt({ x: 0, z: 0 }, 0.5, [crate], 1.0)).toBe(0); // 아직 못 올라옴
    expect(groundHeightAt({ x: 0, z: 0 }, 0.5, [crate], 1.3, 0.8)).toBe(2); // 보조로 올라섬
    expect(groundHeightAt({ x: 5, z: 0 }, 0.5, [pillar], 9)).toBe(0); // 높이 없는 상자 위에는 못 선다
    expect(groundHeightAt({ x: 0, z: 0 }, 0.5, [crate, { x: 0, z: 0, w: 1, d: 1, h: 3 }], 3)).toBe(3); // 겹치면 높은 것
  });
  it('점프 적분: 발밑(ground)에 착지하고, 발밑보다 낮으면 올려 준다', () => {
    expect(integrateJump({ y: 2.3, vy: -1 }, 0.5, 24, 2)).toEqual({ y: 2, vy: 0 });
    expect(integrateJump({ y: 1.5, vy: 0 }, 0.016, 24, 2)).toEqual({ y: 2, vy: 0 });
    const up = integrateJump({ y: 2.001, vy: 8 }, 0.1, 24, 2);
    expect(up.y).toBeGreaterThan(2.5);
    const fall = integrateJump({ y: 2, vy: 0 }, 0.1, 24, 0); // 상자에서 걸어 내려오면 떨어진다
    expect(fall.y).toBeLessThan(2);
    expect(fall.vy).toBeLessThan(0);
  });
});

describe('적 우회 이동 (segmentBlocked / steerAround)', () => {
  const wall = [{ x: 0, z: -4, w: 10, d: 1 }]; // 앞을 가로막는 긴 울타리
  it('선분이 상자를 지나면 막힘, 비껴가면 통과', () => {
    expect(segmentBlocked({ x: 0, z: 0 }, { x: 0, z: -8 }, 0.5, wall)).toBe(true);
    expect(segmentBlocked({ x: 0, z: 0 }, { x: 8, z: 0 }, 0.5, wall)).toBe(false);
    expect(segmentBlocked({ x: 0, z: 0 }, { x: 0, z: -3 }, 0.5, wall)).toBe(false); // 벽 바로 앞까지는 괜찮음
  });
  it('앞이 비어 있으면 방향을 그대로 돌려준다', () => {
    const dir = { x: 0, z: -1 };
    expect(steerAround({ x: 0, z: 0 }, dir, 0.5, [], 3.5)).toBe(dir);
    expect(steerAround({ x: 0, z: 0 }, dir, 0.5, wall, 3.0)).toBe(dir); // 3.0 앞까지는 벽에 안 닿음
  });
  it('앞이 막히면 좌우로 꺾은, 뚫린 방향을 돌려준다 (길이 유지, NaN 없음)', () => {
    const dir = { x: 0, z: -1 };
    const out = steerAround({ x: 0, z: 0 }, dir, 0.5, wall, 3.5);
    expect(out).not.toBe(dir);
    expect(Math.hypot(out.x, out.z)).toBeCloseTo(1, 5);
    expect(Math.abs(out.x)).toBeGreaterThan(0.3); // 옆으로 꺾임
    expect(segmentBlocked({ x: 0, z: 0 }, { x: out.x * 3.5, z: out.z * 3.5 }, 0.5, wall)).toBe(false);
    // preferSign 이 꺾는 쪽을 정한다
    const left = steerAround({ x: 0, z: 0 }, dir, 0.5, wall, 3.5, 1);
    const right = steerAround({ x: 0, z: 0 }, dir, 0.5, wall, 3.5, -1);
    expect(Math.sign(left.x)).not.toBe(Math.sign(right.x));
  });
  it('목표를 주면 울타리 모서리에서 목표와 반대쪽으로 꺾지 않고, 틈을 지나 목표가 보이는 쪽으로 꺾는다', () => {
    // 잊혀진 숲 보물 터 → 둘째 공터 틈(x −28~−20, z −12~−10)을 본뜬 벽: 틈 오른쪽 울타리와 동쪽 벽
    const walls = [
      { x: -17, z: -11, w: 6, d: 2 }, // 틈 오른쪽 울타리 (x −20~−14)
      { x: -31, z: -11, w: 6, d: 2 }, // 틈 왼쪽 울타리
      { x: -15, z: -18, w: 2, d: 12 }, // 동쪽 벽
    ];
    const pos = { x: -20.7, z: -12.9 };
    const target = { x: -13, z: -7 };
    const dir = { x: target.x - pos.x, z: target.z - pos.z };
    const n = Math.hypot(dir.x, dir.z);
    const unit = { x: dir.x / n, z: dir.z / n };
    const noTarget = steerAround(pos, unit, 0.5, walls, 3.5, -1);
    const withTarget = steerAround(pos, unit, 0.5, walls, 3.5, -1, target);
    expect(noTarget.x).toBeGreaterThan(0.5); // 목표 없이 오른쪽을 선호하면 틈에서 멀어지는 쪽(동쪽)으로 꺾인다
    expect(withTarget.x).toBeLessThan(0); // 목표를 알면 왼쪽 위(틈 쪽)로 꺾인다
    expect(withTarget.z).toBeGreaterThan(0.5);
  });
  it('사방이 막히면 원래 방향을 돌려준다 (벽을 따라 미끄러지게)', () => {
    const box = [{ x: 0, z: 0, w: 20, d: 20 }]; // 상자 안에 갇힘
    const dir = { x: 1, z: 0 };
    expect(steerAround({ x: 0, z: 0 }, dir, 0.5, box, 3)).toBe(dir);
  });
});

describe('stepVelocity (가속·감속, 프레임 독립)', () => {
  it('가속: 목표를 향해 점점 빨라지고 accelTime 뒤에는 약 63% 에 이른다', () => {
    let v = { x: 0, z: 0 };
    const target = { x: 0, z: 7 };
    v = stepVelocity(v, target, 0.1, 0.1, 0.07);
    expect(v.z).toBeGreaterThan(7 * 0.6);
    expect(v.z).toBeLessThan(7 * 0.66);
    for (let i = 0; i < 20; i++) v = stepVelocity(v, target, 0.05, 0.1, 0.07);
    expect(v.z).toBeCloseTo(7, 2);
  });
  it('감속: 입력을 놓으면 줄어들다가 아주 작아지면 0 으로', () => {
    let v = { x: 7, z: 0 };
    v = stepVelocity(v, { x: 0, z: 0 }, 0.07, 0.1, 0.07);
    expect(v.x).toBeGreaterThan(7 * 0.34);
    expect(v.x).toBeLessThan(7 * 0.4);
    for (let i = 0; i < 20; i++) v = stepVelocity(v, { x: 0, z: 0 }, 0.05, 0.1, 0.07);
    expect(v).toEqual({ x: 0, z: 0 });
  });
  it('프레임 독립: 0.02초 한 번과 0.01초 두 번의 결과가 같다', () => {
    const target = { x: 7, z: 0 };
    const one = stepVelocity({ x: 1, z: 0 }, target, 0.02, 0.1, 0.07);
    const two = stepVelocity(stepVelocity({ x: 1, z: 0 }, target, 0.01, 0.1, 0.07), target, 0.01, 0.1, 0.07);
    expect(one.x).toBeCloseTo(two.x, 10);
  });
  it('반대 방향으로 바꾸면 튀지 않고 0 을 지나 반대로 간다', () => {
    let v = { x: 7, z: 0 };
    v = stepVelocity(v, { x: -7, z: 0 }, 0.03, 0.1, 0.07);
    expect(v.x).toBeLessThan(7);
    expect(v.x).toBeGreaterThan(-7);
    expect(Math.abs(v.x)).toBeLessThan(7);
  });
  it('시간이 0 이면 즉시 목표 속도', () => {
    expect(stepVelocity({ x: 0, z: 0 }, { x: 3, z: 4 }, 0.016, 0, 0)).toEqual({ x: 3, z: 4 });
  });
});
