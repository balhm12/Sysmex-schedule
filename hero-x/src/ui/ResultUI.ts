/**
 * 결과 화면: 쓰러졌을 때 / 모든 적을 처치했을 때
 * - 제목, 설명, '다시 도전'·'메인 메뉴' 버튼. 동작은 Game 이 처리한다.
 */
export class ResultUI {
  private readonly el: HTMLDivElement;
  private readonly title: HTMLElement;
  private readonly sub: HTMLElement;

  constructor(parent: HTMLElement, onRestart: () => void, onMenu: () => void) {
    this.el = document.createElement('div');
    this.el.className = 'guide';
    this.el.hidden = true;
    this.el.innerHTML = `
      <div class="guide-panel result-panel" role="dialog" aria-labelledby="result-title">
        <p class="guide-eyebrow" id="result-eyebrow">결과</p>
        <h2 class="guide-title" id="result-title">결과</h2>
        <p class="guide-sub" id="result-sub"></p>
        <div class="btns"><button class="btn" id="result-restart" type="button">다시 도전 (R)</button><button class="btn secondary" id="result-menu" type="button">메인 메뉴</button></div>
      </div>`;
    parent.appendChild(this.el);
    this.title = this.el.querySelector('#result-title') as HTMLElement;
    this.sub = this.el.querySelector('#result-sub') as HTMLElement;
    this.el.querySelector<HTMLButtonElement>('#result-restart')?.addEventListener('click', onRestart);
    this.el.querySelector<HTMLButtonElement>('#result-menu')?.addEventListener('click', onMenu);
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
