import { isPortrait, isTouchDevice } from '../utils/device';

/**
 * 가로 전용 안내: 터치 기기에서 화면이 세로이면 "가로로 돌려 주세요" 덮개를 띄운다 (Game 은 그동안 그리기만 한다)
 * - 설치한 앱(PWA)은 manifest 의 orientation: landscape 로 처음부터 가로. 브라우저에서는 잠글 수 없어(전체 화면이 아니면 거부됨) 안내만 한다.
 * - tryLock(): 첫 조작 뒤 가능한 기기에서 가로 잠금을 시도한다 (실패해도 조용히 넘어감).
 */
export class OrientationGuard {
  private readonly el: HTMLDivElement;
  /** 설정에서 끄면 안내하지 않는다 */
  enabled = true;
  private shown = false;

  constructor(parent: HTMLElement) {
    this.el = document.createElement('div');
    this.el.className = 'orientation-guard';
    this.el.hidden = true;
    this.el.innerHTML = `
      <div class="orientation-guard-phone" aria-hidden="true"></div>
      <div class="orientation-guard-text">휴대폰을 <strong>가로</strong>로 돌려 주세요</div>
      <div class="orientation-guard-sub">HERO X 는 가로 화면에서 플레이합니다</div>`;
    parent.appendChild(this.el);
  }

  /** 지금 막아야 하는지 (세로 + 터치 기기 + 설정 켜짐). 상태가 바뀌면 덮개를 보이거나 숨긴다 */
  update(): boolean {
    const block = this.enabled && isTouchDevice() && isPortrait();
    if (block !== this.shown) {
      this.shown = block;
      this.el.hidden = !block;
    }
    return block;
  }

  get blocked(): boolean {
    return this.shown;
  }

  /** 가로 잠금 시도 (지원하지 않거나 전체 화면이 아니면 거부되므로 결과는 무시) */
  tryLock(): void {
    if (!this.enabled || !isTouchDevice()) return;
    try {
      const o = (screen as Screen & { orientation?: { lock?: (t: string) => Promise<void> } }).orientation;
      void o?.lock?.('landscape').catch(() => undefined);
    } catch {
      /* 지원 안 함 */
    }
  }
}
