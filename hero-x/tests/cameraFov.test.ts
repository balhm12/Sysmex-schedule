import { describe, expect, it } from 'vitest';
import { horizontalFov, verticalFovFor } from '../src/game/cameraFov';
import { GameConfig } from '../src/game/GameConfig';

describe('verticalFovFor (화면 비율에 따른 시야각)', () => {
  const base = GameConfig.camera.fov;
  const maxH = GameConfig.camera.maxHorizontalFov;

  it('보통 화면(4:3, 16:10)은 기본 fov 그대로', () => {
    expect(verticalFovFor(4 / 3, base, maxH)).toBe(base);
    expect(verticalFovFor(16 / 10, base, maxH)).toBe(base);
  });

  it('넓은 화면(휴대폰 가로 20:9)은 가로 시야가 상한에 맞춰 세로 fov 가 줄어든다', () => {
    const aspect = 20 / 9;
    const v = verticalFovFor(aspect, base, maxH);
    expect(v).toBeLessThan(base);
    expect(horizontalFov(aspect, v)).toBeCloseTo(maxH, 5);
  });

  it('비율이 커질수록 세로 fov 는 줄어든다 (단조)', () => {
    let prev = Infinity;
    for (const aspect of [1.5, 1.78, 2.0, 2.2, 2.5]) {
      const v = verticalFovFor(aspect, base, maxH);
      expect(v).toBeLessThanOrEqual(prev);
      prev = v;
    }
  });

  it('잘못된 입력(0·음수)이면 기본값을 돌려준다', () => {
    expect(verticalFovFor(0, base, maxH)).toBe(base);
    expect(verticalFovFor(-1, base, maxH)).toBe(base);
  });
});
