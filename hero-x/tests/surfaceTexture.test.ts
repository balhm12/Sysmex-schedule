import { describe, expect, it } from 'vitest';
import { surfaceSample, type SurfaceKind } from '../src/render/surfaceTexture';

const noise = (x: number, y: number) => {
  const v = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return v - Math.floor(v);
};

describe('표면 무늬 (surfaceSample)', () => {
  it.each(['hedge', 'rock', 'steel', 'ice', 'wood', 'brick'] as SurfaceKind[])('%s: 높이는 0~1, 금은 0~1, 무늬가 평평하지 않다', (kind) => {
    let min = 1;
    let max = 0;
    for (let i = 0; i < 400; i++) {
      const s = surfaceSample(kind, (i % 20) / 20, Math.floor(i / 20) / 20, noise);
      expect(s.h).toBeGreaterThanOrEqual(0);
      expect(s.h).toBeLessThanOrEqual(1);
      expect(s.crack).toBeGreaterThanOrEqual(0);
      expect(s.crack).toBeLessThanOrEqual(1);
      min = Math.min(min, s.h);
      max = Math.max(max, s.h);
    }
    expect(max - min).toBeGreaterThan(0.2);
  });
  it('판자·벽돌·강철은 홈(crack)이 규칙적으로 나타난다', () => {
    expect(surfaceSample('wood', 0.3, 0.26, noise).crack).toBe(1); // 판 사이 홈 (v*4 % 1 < 0.06)
    expect(surfaceSample('wood', 0.3, 0.55, noise).crack).toBe(0);
    expect(surfaceSample('brick', 0.5, 0.26, noise).crack).toBe(1); // 회반죽 가로 홈 (v*4 % 1 < 0.1)
    expect(surfaceSample('steel', 0.01, 0.5, noise).crack).toBe(1); // 격자 홈
    expect(surfaceSample('steel', 0.6, 0.6, noise).crack).toBe(0);
  });
});
