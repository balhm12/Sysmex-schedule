import { describe, expect, it } from 'vitest';
import { checkAnswer, makeMathProblem, type QuizKind } from '../src/game/mathQuiz';

/** 결정적 난수 (시드) */
function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

describe('초등 3학년 수학 문제 (makeMathProblem)', () => {
  it('모든 종류가 3학년 범위 안이고 정답이 식과 맞다', () => {
    const rng = seeded(7);
    for (const kind of ['add', 'sub', 'mul', 'div', 'mul2'] as QuizKind[]) {
      for (let i = 0; i < 200; i++) {
        const p = makeMathProblem(rng, kind);
        const m = /^(\d+) ([+−×÷]) (\d+) = \?$/.exec(p.text);
        expect(m, p.text).not.toBeNull();
        const a = Number(m![1]);
        const b = Number(m![3]);
        const op = m![2];
        const expected = op === '+' ? a + b : op === '−' ? a - b : op === '×' ? a * b : a / b;
        expect(p.answer).toBe(expected);
        if (kind === 'add') expect(a + b).toBeLessThanOrEqual(999);
        if (kind === 'sub') expect(a - b).toBeGreaterThan(0);
        if (kind === 'mul') {
          expect(a).toBeLessThanOrEqual(9);
          expect(b).toBeLessThanOrEqual(9);
        }
        if (kind === 'div') {
          expect(Number.isInteger(a / b)).toBe(true);
          expect(b).toBeLessThanOrEqual(9);
        }
        if (kind === 'mul2') expect(b).toBeLessThanOrEqual(9);
      }
    }
  });
  it('보기는 4개, 서로 다르고, 정답을 포함하며 음수가 없다', () => {
    const rng = seeded(99);
    for (let i = 0; i < 300; i++) {
      const p = makeMathProblem(rng);
      expect(p.choices).toHaveLength(4);
      expect(new Set(p.choices).size).toBe(4);
      expect(p.choices).toContain(p.answer);
      for (const c of p.choices) expect(c).toBeGreaterThanOrEqual(0);
      expect(checkAnswer(p, p.answer)).toBe(true);
      const wrong = p.choices.find((c) => c !== p.answer)!;
      expect(checkAnswer(p, wrong)).toBe(false);
    }
  });
});
