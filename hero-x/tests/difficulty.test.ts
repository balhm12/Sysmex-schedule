import { describe, expect, it } from 'vitest';
import { difficultyLevels, getDifficultyPreset, isDifficultyLevel } from '../src/game/Difficulty';
import { GameConfig, sanitizeGameConfig, type GameConfigType } from '../src/game/GameConfig';

describe('난이도 (Difficulty)', () => {
  it('쉬움 → 보통 → 어려움 순으로 적 체력·공격력 배율이 커진다', () => {
    const [e, n, h] = [getDifficultyPreset('easy'), getDifficultyPreset('normal'), getDifficultyPreset('hard')];
    expect(e.enemyHp).toBeLessThan(n.enemyHp);
    expect(n.enemyHp).toBeLessThan(h.enemyHp);
    expect(e.enemyDamage).toBeLessThan(n.enemyDamage);
    expect(n.enemyDamage).toBeLessThan(h.enemyDamage);
  });

  it('단계 목록은 설정의 presets 와 같고, 기본 난이도는 그 안에 있다', () => {
    expect(difficultyLevels()).toEqual(Object.keys(GameConfig.difficulty.presets));
    expect(isDifficultyLevel(GameConfig.difficulty.default)).toBe(true);
    expect(isDifficultyLevel('impossible')).toBe(false);
  });

  it('배율이 터무니없으면 보정된다 (0.1 ~ 5)', () => {
    const cfg: GameConfigType = JSON.parse(JSON.stringify(GameConfig));
    cfg.difficulty.presets.hard.enemyHp = 999;
    cfg.difficulty.presets.easy.enemyDamage = -1;
    const w = sanitizeGameConfig(cfg);
    expect(cfg.difficulty.presets.hard.enemyHp).toBe(5);
    expect(cfg.difficulty.presets.easy.enemyDamage).toBe(0.1);
    expect(w.map((x) => x.path).sort()).toEqual(['difficulty.presets.easy.enemyDamage', 'difficulty.presets.hard.enemyHp']);
  });
});
