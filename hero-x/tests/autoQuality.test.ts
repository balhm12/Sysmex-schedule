import { describe, expect, it } from 'vitest';
import { decideQuality } from '../src/game/AutoQuality';

describe('자동 화질 조절 (decideQuality)', () => {
  it('프레임이 충분하면 그대로', () => {
    const r = decideQuality([60, 58, 55], { shadows: true, resolution: 1 });
    expect(r.next).toEqual({ shadows: true, resolution: 1 });
    expect(r.message).toBeNull();
    expect(decideQuality([], { shadows: true, resolution: 1 }).message).toBeNull();
  });
  it('낮으면 그림자부터 끄고, 그 다음 해상도를 0.2 씩 낮추되 0.5 아래로는 안 간다', () => {
    const a = decideQuality([20, 25], { shadows: true, resolution: 1 });
    expect(a.next.shadows).toBe(false);
    expect(a.next.resolution).toBe(1);
    expect(a.message).toContain('그림자');
    const b = decideQuality([20, 25], a.next);
    expect(b.next.resolution).toBe(0.8);
    expect(b.message).toContain('0.8');
    let s = b.next;
    for (let i = 0; i < 5; i++) s = decideQuality([10], s).next;
    expect(s.resolution).toBe(0.5);
    expect(decideQuality([10], s).message).toBeNull(); // 더 내릴 것이 없음
  });
});
