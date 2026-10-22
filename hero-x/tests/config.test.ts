import { describe, expect, it } from 'vitest';
import { CONFIG_LIMITS, GameConfig, sanitizeGameConfig, type GameConfigType } from '../src/game/GameConfig';

/** 설정 복사본 (테스트가 실제 설정을 건드리지 않도록) */
const copy = (): GameConfigType => JSON.parse(JSON.stringify(GameConfig));

describe('GameConfig 기본값', () => {
  it('기본 설정은 모두 허용 범위 안에 있다 (보정할 것이 없음)', () => {
    expect(sanitizeGameConfig(copy())).toEqual([]);
  });

  it('장애물 목록의 크기는 모두 0보다 크다', () => {
    for (const o of GameConfig.world.obstacles) {
      expect(o.w).toBeGreaterThan(0);
      expect(o.d).toBeGreaterThan(0);
      expect(o.h).toBeGreaterThan(0);
    }
  });

  it('시작 위치는 어떤 장애물과도 겹치지 않는다', () => {
    const s = GameConfig.player.startPosition;
    const r = GameConfig.player.radius;
    for (const o of GameConfig.world.obstacles) {
      const overlapX = Math.abs(s.x - o.x) < o.w / 2 + r;
      const overlapZ = Math.abs(s.z - o.z) < o.d / 2 + r;
      expect(overlapX && overlapZ).toBe(false);
    }
  });
});

describe('sanitizeGameConfig (설정값 보정)', () => {
  it('너무 큰 이동 속도는 최댓값으로 줄인다', () => {
    const cfg = copy();
    cfg.player.moveSpeed = 999;
    const warnings = sanitizeGameConfig(cfg);
    expect(cfg.player.moveSpeed).toBe(CONFIG_LIMITS['player.moveSpeed'].max);
    expect(warnings).toEqual([{ path: 'player.moveSpeed', from: 999, to: CONFIG_LIMITS['player.moveSpeed'].max }]);
  });

  it('음수나 숫자가 아닌 값은 최솟값으로 바꾼다', () => {
    const cfg = copy();
    cfg.camera.smoothing = -5;
    (cfg.player as unknown as { turnSpeed: unknown }).turnSpeed = 'fast';
    sanitizeGameConfig(cfg);
    expect(cfg.camera.smoothing).toBe(CONFIG_LIMITS['camera.smoothing'].min);
    expect(cfg.player.turnSpeed).toBe(CONFIG_LIMITS['player.turnSpeed'].min);
  });
});
