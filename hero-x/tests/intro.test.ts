import { describe, expect, it } from 'vitest';
import { INTRO_DURATION, INTRO_SPAWNS, INTRO_TIMES, introAt } from '../src/cinematic/introTimeline';
import { GameConfig } from '../src/game/GameConfig';

describe('인트로 시간표 (introAt)', () => {
  const hero = { x: 0, z: 3 };
  it('장면 순서와 끝 시각이 맞고, 끝나면 done', () => {
    expect(introAt(0, hero).shot).toBe('establish');
    expect(introAt(INTRO_TIMES.establish + 0.1, hero).shot).toBe('approach');
    expect(introAt(INTRO_TIMES.approach + 0.1, hero).shot).toBe('fight');
    expect(introAt(INTRO_TIMES.fight + 0.1, hero).shot).toBe('slowmo');
    expect(introAt(INTRO_TIMES.slowmo + 0.1, hero).shot).toBe('finale');
    expect(introAt(INTRO_DURATION, hero).shot).toBe('done');
  });
  it('설정 장면은 줌 인(시야각이 줄고 카메라가 가까워짐), 마무리는 줌 아웃', () => {
    const a = introAt(0, hero);
    const b = introAt(INTRO_TIMES.establish - 0.01, hero);
    expect(b.fov).toBeLessThan(a.fov);
    expect(b.cam.y).toBeLessThan(a.cam.y);
    const c = introAt(INTRO_TIMES.slowmo + 0.01, hero);
    const d = introAt(INTRO_TIMES.finale - 0.01, hero);
    expect(d.fov).toBeGreaterThan(c.fov);
    expect(d.cam.y).toBeGreaterThan(c.cam.y);
  });
  it('전투 장면은 처치 줌 펀치로 시야각이 줄고, 슬로 모션은 시간 배율 0.25 와 회피', () => {
    const t = INTRO_TIMES.approach + 1;
    expect(introAt(t, hero, 1).fov).toBeLessThan(introAt(t, hero, 0).fov);
    const s = introAt(INTRO_TIMES.fight + 0.1, hero);
    expect(s.timeScale).toBe(0.25);
    expect(s.dodge).toBe(true);
    expect(introAt(INTRO_TIMES.fight + 1, hero).dodge).toBe(false);
    expect(introAt(1, hero).timeScale).toBe(1);
  });
  it('카메라는 항상 주인공을 기준으로 움직인다 (주인공이 옮겨지면 함께 옮겨짐)', () => {
    for (const t of [0.5, 4, 8, 12, 14.5]) {
      const a = introAt(t, { x: 0, z: 0 });
      const b = introAt(t, { x: 5, z: -2 });
      expect(b.cam.x - a.cam.x).toBeCloseTo(5, 6);
      expect(b.cam.z - a.cam.z).toBeCloseTo(-2, 6);
      expect(b.look.x - a.look.x).toBeCloseTo(5, 6);
    }
  });
  it('인트로 몬스터는 모두 정의된 적 종류이고 주인공 앞(-Z)에 있다', () => {
    for (const s of INTRO_SPAWNS) {
      expect(GameConfig.enemies.types[s.type], s.type).toBeDefined();
      expect(s.z).toBeLessThan(0);
      expect(Math.abs(s.x)).toBeLessThan(GameConfig.world.arenaHalfSize);
    }
  });
});
