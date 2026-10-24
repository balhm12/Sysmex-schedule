import { describe, expect, it } from 'vitest';
import { CameraController } from '../src/game/CameraController';

describe('CameraController.lookAheadOffset (카메라 앞보기)', () => {
  it('멈춰 있으면 0, 최고 속도로 달리면 이동 방향으로 amount 만큼', () => {
    expect(CameraController.lookAheadOffset({ x: 0, z: 0 }, 7, 1.4)).toEqual({ x: 0, z: 0 });
    const o = CameraController.lookAheadOffset({ x: 0, z: 7 }, 7, 1.4);
    expect(o.x).toBeCloseTo(0);
    expect(o.z).toBeCloseTo(1.4);
  });
  it('속도가 절반이면 절반만, 최고 속도를 넘어도(대시) amount 를 넘지 않는다', () => {
    expect(CameraController.lookAheadOffset({ x: 3.5, z: 0 }, 7, 1.4).x).toBeCloseTo(0.7);
    expect(CameraController.lookAheadOffset({ x: 20, z: 0 }, 7, 1.4).x).toBeCloseTo(1.4);
  });
  it('amount 0 이면 꺼진다', () => {
    expect(CameraController.lookAheadOffset({ x: 7, z: 0 }, 7, 0)).toEqual({ x: 0, z: 0 });
  });
});
