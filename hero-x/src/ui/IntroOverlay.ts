import { GameConfig } from '../game/GameConfig';

/**
 * 인트로 화면 덮개: 위아래 검은 띠(영화 느낌), 제목, 자막, 건너뛰기 버튼
 * - 3D 장면 위에 얹히고 클릭은 건너뛰기 버튼만 받는다.
 */
export class IntroOverlay {
  private readonly el: HTMLDivElement;
  private readonly title: HTMLElement;
  private readonly caption: HTMLElement;
  private lastCaption = '';

  constructor(parent: HTMLElement, onSkip: () => void) {
    this.el = document.createElement('div');
    this.el.className = 'intro';
    this.el.hidden = true;
    this.el.innerHTML = `
      <div class="intro-bar top"></div>
      <div class="intro-bar bottom"></div>
      <h1 class="intro-title">${GameConfig.meta.title.replace(' X', ' <em>X</em>')}</h1>
      <p class="intro-caption"></p>
      <button type="button" class="btn small ghost intro-skip">건너뛰기</button>`;
    parent.appendChild(this.el);
    this.title = this.el.querySelector('.intro-title') as HTMLElement;
    this.caption = this.el.querySelector('.intro-caption') as HTMLElement;
    (this.el.querySelector('.intro-skip') as HTMLButtonElement).addEventListener('click', onSkip);
  }

  get visible(): boolean {
    return !this.el.hidden;
  }

  show(): void {
    this.el.hidden = false;
    this.title.classList.remove('on');
    this.caption.classList.remove('on');
    this.lastCaption = '';
    // 다음 프레임에 띠가 닫히는 전환이 보이게
    requestAnimationFrame(() => this.el.classList.add('on'));
  }

  hide(): void {
    this.el.hidden = true;
    this.el.classList.remove('on');
  }

  /** 제목·자막 상태 적용 (바뀔 때만 DOM 을 건드린다) */
  set(title: boolean, caption: string): void {
    this.title.classList.toggle('on', title);
    if (caption !== this.lastCaption) {
      this.lastCaption = caption;
      this.caption.textContent = caption;
      this.caption.classList.toggle('on', caption !== '');
    }
  }
}
