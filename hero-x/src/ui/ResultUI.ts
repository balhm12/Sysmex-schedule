/**
 * 결과 화면: 쓰러졌을 때 / 모든 적을 처치했을 때
 * - 제목, 설명, '다시 도전'·'던전 선택'·'메인 메뉴' 버튼. 동작은 Game 이 처리한다.
 */
export class ResultUI {
  private readonly el: HTMLDivElement;
  private readonly title: HTMLElement;
  private readonly sub: HTMLElement;

  constructor(parent: HTMLElement, onRestart: () => void, onMenu: () => void, onDungeons: () => void) {
    this.el = document.createElement('div');
    this.el.className = 'guide result';
    this.el.hidden = true;
    this.el.innerHTML = `
      <div class="guide-panel result-panel" role="dialog" aria-labelledby="result-title">
        <p class="guide-eyebrow" id="result-eyebrow">결과</p>
        <h2 class="guide-title" id="result-title">결과</h2>
        <p class="guide-sub" id="result-sub"></p>
        <p class="result-next" id="result-count" hidden></p>
        <div class="btns"><button class="btn" id="result-next" type="button" hidden>다음 던전으로</button><button class="btn" id="result-restart" type="button">다시 도전 (R)</button><button class="btn secondary" id="result-dungeons" type="button">던전 선택</button><button class="btn secondary" id="result-menu" type="button">메인 메뉴</button></div>
      </div>`;
    parent.appendChild(this.el);
    this.title = this.el.querySelector('#result-title') as HTMLElement;
    this.sub = this.el.querySelector('#result-sub') as HTMLElement;
    this.el.querySelector<HTMLButtonElement>('#result-restart')?.addEventListener('click', onRestart);
    this.el.querySelector<HTMLButtonElement>('#result-menu')?.addEventListener('click', onMenu);
    this.el.querySelector<HTMLButtonElement>('#result-dungeons')?.addEventListener('click', onDungeons);
    this.el.querySelector<HTMLButtonElement>('#result-next')?.addEventListener('click', () => this.goNext());
    // 다른 버튼을 누르면 카운트다운은 멈춘다
    for (const id of ['#result-restart', '#result-dungeons', '#result-menu']) this.el.querySelector(id)?.addEventListener('click', () => this.stopCountdown());
  }

  private timer = 0;
  private next: { onNext: () => void } | null = null;

  /** 남은 초를 표시하다가 0 이 되면 다음 던전으로 */
  private startCountdown(name: string, seconds: number): void {
    const count = this.el.querySelector('#result-count') as HTMLElement;
    let left = seconds;
    const tick = () => {
      count.textContent = `${left}초 뒤 '${name}' 으로 이동합니다 (다른 버튼을 누르면 취소)`;
      if (left <= 0) {
        this.goNext();
        return;
      }
      left--;
      this.timer = window.setTimeout(tick, 1000);
    };
    tick();
  }

  private stopCountdown(): void {
    clearTimeout(this.timer);
    this.timer = 0;
    (this.el.querySelector('#result-count') as HTMLElement).hidden = true;
  }

  private goNext(): void {
    const n = this.next;
    this.stopCountdown();
    this.next = null;
    n?.onNext();
  }

  get visible(): boolean {
    return !this.el.hidden;
  }

  /** next 가 있으면 '다음 던전으로' 버튼과 카운트다운(seconds > 0)을 보여준다 */
  show(title: string, sub: string, next?: { name: string; seconds: number; onNext: () => void }): void {
    this.title.textContent = title;
    this.sub.textContent = sub;
    this.stopCountdown();
    this.next = next ?? null;
    const btn = this.el.querySelector('#result-next') as HTMLButtonElement;
    const count = this.el.querySelector('#result-count') as HTMLElement;
    btn.hidden = !next;
    btn.textContent = next ? `다음 던전: ${next.name}` : '';
    count.hidden = !next || next.seconds <= 0;
    this.el.hidden = false;
    if (next && next.seconds > 0) this.startCountdown(next.name, next.seconds);
  }

  hide(): void {
    this.stopCountdown();
    this.next = null;
    this.el.hidden = true;
  }
}
