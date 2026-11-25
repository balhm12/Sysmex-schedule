import { describe, expect, it } from 'vitest';
import { describeBossPatterns } from '../src/game/bossIntro';
import { DUNGEONS, resolveBossConfig } from '../src/game/DungeonDefs';

describe('보스 등장 설명 (describeBossPatterns)', () => {
  it.each(DUNGEONS.map((d) => [d.name, d] as const))('%s 보스: 별명·설명이 있고 패턴 설명이 설정과 맞는다', (_n, d) => {
    const cfg = resolveBossConfig(d);
    expect(cfg.title.length).toBeGreaterThan(2);
    expect(cfg.lore.length).toBeGreaterThan(20);
    const info = describeBossPatterns(cfg);
    const names = info.map((p) => p.name);
    expect(names.includes('돌진')).toBe(cfg.useCharge);
    for (const p of new Set(cfg.closePatterns)) {
      const label = { slam: '내려찍기', barrage: '탄막', summon: '소환', mortar: '포격 낙하' }[p];
      expect(names).toContain(label);
    }
    expect(names.filter((n) => n === '내려찍기').length).toBeLessThanOrEqual(1); // 중복 제거
    expect(names[names.length - 1]).toMatch(/^분노/);
    for (const p of info) {
      expect(p.desc.length).toBeGreaterThan(5);
      expect(p.tip.length).toBeGreaterThan(3);
    }
  });
  it('소환 패턴은 소환되는 적의 이름을 쓴다', () => {
    const cave = resolveBossConfig(DUNGEONS.find((d) => d.id === 'cave')!);
    const summon = describeBossPatterns(cave).find((p) => p.name === '소환')!;
    expect(summon.desc).toContain('동굴 박쥐');
  });
});
