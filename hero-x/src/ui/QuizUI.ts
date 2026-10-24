import type { MathProblem } from '../game/mathQuiz';

/**
 * 보물 상자 수학 문제 창
 * - 문제와 보기 4개 버튼. 맞히면 onCorrect, 틀리면 짧게 흔들고 새 문제를 요청한다(onWrong → Game 이 다음 문제 제공).
 * - 닫기(그만두기)도 가능. 열려 있는 동안 게임은 멈춘다(Game.paused).
 */
export class QuizUI {
  private readonly el: HTMLDivElement;
  private readonly question: HTMLElement;
  private readonly choicesEl: HTMLElement;
  private readonly feedback: HTMLElement;
  private problem: MathProblem | null = null;
  private wrongCount = 0;

  constructor(parent: HTMLElement, private readonly cb: { onCorrect: () => void; onWrong: () => MathProblem; onClose: () => void }) {
    this.el = document.createElement('div');
    this.el.className = 'guide quiz';
    this.el.hidden = true;
    this.el.innerHTML = `
      <div class="guide-panel quiz-panel" role="dialog" aria-labelledby="quiz-title">
        <p class="guide-eyebrow">보물 상자의 자물쇠</p>
        <h2 class="guide-title" id="quiz-title">수학 문제를 풀면 열려요</h2>
        <p class="quiz-question" id="quiz-question"></p>
        <div class="quiz-choices" id="quiz-choices"></div>
        <p class="quiz-feedback" id="quiz-feedback"></p>
        <div class="btns"><button class="btn small ghost" id="quiz-close" type="button">나중에</button></div>
      </div>`;
    parent.appendChild(this.el);
    this.question = this.el.querySelector('#quiz-question') as HTMLElement;
    this.choicesEl = this.el.querySelector('#quiz-choices') as HTMLElement;
    this.feedback = this.el.querySelector('#quiz-feedback') as HTMLElement;
    (this.el.querySelector('#quiz-close') as HTMLButtonElement).addEventListener('click', () => this.close());
    this.choicesEl.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('button[data-value]');
      if (!btn || !this.problem) return;
      this.pick(Number(btn.dataset.value));
    });
  }

  get visible(): boolean {
    return !this.el.hidden;
  }

  /** 문제를 보여주며 연다 */
  open(problem: MathProblem): void {
    this.wrongCount = 0;
    this.feedback.textContent = '';
    this.render(problem);
    this.el.hidden = false;
  }

  close(): void {
    if (this.el.hidden) return;
    this.el.hidden = true;
    this.problem = null;
    this.cb.onClose();
  }

  private render(problem: MathProblem): void {
    this.problem = problem;
    this.question.textContent = problem.text;
    this.choicesEl.innerHTML = problem.choices.map((c) => `<button type="button" class="btn quiz-choice" data-value="${c}">${c}</button>`).join('');
  }

  private pick(value: number): void {
    if (!this.problem) return;
    if (value === this.problem.answer) {
      this.feedback.textContent = '정답! 상자가 열립니다.';
      this.feedback.classList.remove('wrong');
      this.el.hidden = true;
      this.problem = null;
      this.cb.onCorrect();
      return;
    }
    this.wrongCount++;
    this.feedback.textContent = this.wrongCount >= 2 ? `아쉬워요. 정답은 ${this.problem.answer} 이었어요. 새 문제!` : '다시 생각해 봐요. 새 문제!';
    this.feedback.classList.add('wrong');
    this.el.classList.remove('shake');
    void this.el.offsetWidth;
    this.el.classList.add('shake');
    this.render(this.cb.onWrong());
  }
}
