import { describe, expect, it } from 'vitest';
import { CONFIG_LIMITS, ENEMY_TYPE_LIMITS, GameConfig, sanitizeGameConfig, type EnemyNumericKey, type GameConfigType } from '../src/game/GameConfig';

/** 설정 복사본 (테스트가 실제 설정을 건드리지 않도록) */
const copy = (): GameConfigType => JSON.parse(JSON.stringify(GameConfig));

/** 점(x, z)이 반지름 r 로 장애물과 겹치는지 */
function overlapsObstacle(x: number, z: number, r: number): boolean {
  return GameConfig.world.obstacles.some((o) => Math.abs(x - o.x) < o.w / 2 + r && Math.abs(z - o.z) < o.d / 2 + r);
}

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
    expect(overlapsObstacle(s.x, s.z, GameConfig.player.radius)).toBe(false);
  });

  it('적 배치는 존재하는 종류만 쓰고, 장애물·시작 위치와 겹치지 않으며, 영역 안에 있다', () => {
    const half = GameConfig.world.arenaHalfSize;
    const s = GameConfig.player.startPosition;
    for (const sp of GameConfig.enemies.spawns) {
      const def = GameConfig.enemies.types[sp.type];
      expect(def, `적 종류 '${sp.type}' 이 types 에 없음`).toBeDefined();
      expect(overlapsObstacle(sp.x, sp.z, def.radius), `적 (${sp.x}, ${sp.z}) 이 장애물과 겹침`).toBe(false);
      expect(Math.hypot(sp.x - s.x, sp.z - s.z), `적 (${sp.x}, ${sp.z}) 이 시작 위치와 너무 가까움`).toBeGreaterThan(6);
      expect(Math.abs(sp.x)).toBeLessThan(half);
      expect(Math.abs(sp.z)).toBeLessThan(half);
    }
  });

  it('적 종류 능력치는 모두 허용 범위 안이다', () => {
    for (const def of Object.values(GameConfig.enemies.types)) {
      for (const [key, { min, max }] of Object.entries(ENEMY_TYPE_LIMITS)) {
        const v = def[key as EnemyNumericKey];
        expect(v).toBeGreaterThanOrEqual(min);
        expect(v).toBeLessThanOrEqual(max);
      }
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

  it('적 종류 능력치도 보정한다', () => {
    const cfg = copy();
    cfg.enemies.types.rusher.hp = -10;
    cfg.enemies.types.rusher.speed = 500;
    const warnings = sanitizeGameConfig(cfg);
    expect(cfg.enemies.types.rusher.hp).toBe(ENEMY_TYPE_LIMITS.hp.min);
    expect(cfg.enemies.types.rusher.speed).toBe(ENEMY_TYPE_LIMITS.speed.max);
    expect(warnings.map((w) => w.path)).toEqual(['enemies.types.rusher.hp', 'enemies.types.rusher.speed']);
  });
});
