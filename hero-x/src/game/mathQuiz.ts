/**
 * 초등학교 3학년 수학 문제 생성 (순수 함수, 테스트 대상)
 * - 보물 상자를 열 때 한 문제를 풀어야 열린다 (설정에서 끌 수 있음).
 * - 3학년 범위: 세 자리 수 덧셈·뺄셈(받아올림·내림 포함), 곱셈구구, 나눗셈(구구단 범위), 두 자리 × 한 자리.
 * - 보기 4개 중 고르기(휴대폰에서 누르기 쉽게). 오답 보기는 정답 근처 값으로 만들어 어림짐작이 어렵게 한다.
 */
export type QuizKind = 'add' | 'sub' | 'mul' | 'div' | 'mul2';

export interface MathProblem {
  kind: QuizKind;
  /** 화면에 보여줄 식 (예: '347 + 268 = ?') */
  text: string;
  answer: number;
  /** 보기 4개 (정답 포함, 섞여 있음) */
  choices: number[];
}

export type Rng = () => number;

const randInt = (rng: Rng, min: number, max: number) => min + Math.floor(rng() * (max - min + 1));

/** 정답과 겹치지 않는 가까운 오답 3개를 만든다 */
function makeChoices(rng: Rng, answer: number, spread: number): number[] {
  const set = new Set<number>([answer]);
  let guard = 0;
  while (set.size < 4 && guard++ < 100) {
    const delta = randInt(rng, 1, spread) * (rng() < 0.5 ? -1 : 1);
    const v = answer + delta;
    if (v >= 0 && !set.has(v)) set.add(v);
  }
  // 아주 드물게 못 채우면 위쪽으로 채운다
  let extra = answer + spread + 1;
  while (set.size < 4) set.add(extra++);
  const arr = [...set];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** 문제 하나 생성. kind 를 주지 않으면 무작위 종류 */
export function makeMathProblem(rng: Rng = Math.random, kind?: QuizKind): MathProblem {
  const kinds: QuizKind[] = ['add', 'sub', 'mul', 'div', 'mul2'];
  const k = kind ?? kinds[Math.floor(rng() * kinds.length)];
  switch (k) {
    case 'add': {
      const a = randInt(rng, 100, 899);
      const b = randInt(rng, 100, 999 - a);
      return { kind: k, text: `${a} + ${b} = ?`, answer: a + b, choices: makeChoices(rng, a + b, 30) };
    }
    case 'sub': {
      const a = randInt(rng, 200, 999);
      const b = randInt(rng, 100, a - 1);
      return { kind: k, text: `${a} − ${b} = ?`, answer: a - b, choices: makeChoices(rng, a - b, 30) };
    }
    case 'mul': {
      const a = randInt(rng, 2, 9);
      const b = randInt(rng, 2, 9);
      return { kind: k, text: `${a} × ${b} = ?`, answer: a * b, choices: makeChoices(rng, a * b, 9) };
    }
    case 'div': {
      const b = randInt(rng, 2, 9);
      const q = randInt(rng, 2, 9);
      return { kind: k, text: `${b * q} ÷ ${b} = ?`, answer: q, choices: makeChoices(rng, q, 3) };
    }
    case 'mul2':
    default: {
      const a = randInt(rng, 12, 49);
      const b = randInt(rng, 2, 9);
      return { kind: 'mul2', text: `${a} × ${b} = ?`, answer: a * b, choices: makeChoices(rng, a * b, 20) };
    }
  }
}

/** 보기를 골랐을 때 정답인지 */
export function checkAnswer(problem: MathProblem, choice: number): boolean {
  return choice === problem.answer;
}
