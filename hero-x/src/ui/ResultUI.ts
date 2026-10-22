/**
 * 결과 화면: 쓰러졌을 때 / 모든 적을 처치했을 때
 * - 제목, 설명, '다시 시작' 버튼. 재시작은 Game 이 처리한다.
 */
export class ResultUI {
  private readonly el: HTMLDivElement;
  private readonly title: HTMLElement;
  private readonly sub: HTMLElement;

  constructor(parent: HTMLElement, onRestart: () => void) {
    this.el = document.createElement('div');
    this.el.className = 'guide';
    this.el.hidden = true;
    this.el.innerHTML = `
      <div class="guide-panel result-panel" role="dialog" aria-labelledby="result-title">
        <p class="guide-eyebrow" id="result-eyebrow">결과</p>
        <h2 class="guide-title" id="result-title">결과</h2>
        <p class="guide-sub" id="result-sub"></p>
        <button class="btn" id="result-restart" type="button">다시 시작 (R)</button>
      </div>`;
    parent.appendChild(this.el);
    this.title = this.el.querySelector('#result-title') as HTMLElement;
    this.sub = this.el.querySelector('#result-sub') as HTMLElement;
    this.el.querySelector<HTMLButtonElement>('#result-restart')?.addEventListener('click', onRestart);
  }

  get visible(): boolean {
    return !this.el.hidden;
  }

  show(title: string, sub: string): void {
    this.title.textContent = title;
    this.sub.textContent = sub;
    this.el.hidden = false;
  }

  hide(): void {
    this.el.hidden = true;
  }
}
