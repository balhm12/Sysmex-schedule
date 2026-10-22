import { GameConfig } from '../game/GameConfig';

/** 키 코드를 사람이 읽는 이름으로 */
function keyLabel(code: string): string {
  if (code.startsWith('Key')) return code.slice(3);
  if (code.startsWith('Arrow')) return { Up: '↑', Down: '↓', Left: '←', Right: '→' }[code.slice(5)] ?? code;
  return code;
}

/**
 * 조작 안내 화면 + 화면 아래 상태 표시(HUD)
 * - 게임을 켜면 안내 화면이 먼저 보이고, '시작하기' 버튼이나 H 키로 닫는다.
 * - 안내 내용은 GameConfig.controls 의 키 설정을 그대로 읽어 보여준다.
 */
export class ControlsGuide {
  private readonly guide: HTMLDivElement;
  private readonly hud: HTMLDivElement;

  constructor(root: HTMLElement, onStart: () => void) {
    const c = GameConfig.controls;
    const meta = GameConfig.meta;
    const keys = (codes: string[]) => codes.map((k) => `<span class="key">${keyLabel(k)}</span>`).join(' ');

    this.guide = document.createElement('div');
    this.guide.className = 'guide';
    this.guide.innerHTML = `
      <div class="guide-panel" role="dialog" aria-labelledby="guide-title">
        <p class="guide-eyebrow">3D 액션 RPG · 1단계 이동 테스트</p>
        <h1 class="guide-title" id="guide-title">${meta.title.replace(' X', ' <em>X</em>')}</h1>
        <p class="guide-sub">${meta.subtitle} · v${meta.version}</p>
        <ul class="guide-keys">
          <li>${keys(c.up)} 앞으로</li>
          <li>${keys(c.down)} 뒤로</li>
          <li>${keys(c.left)} 왼쪽</li>
          <li>${keys(c.right)} 오른쪽</li>
          <li>${keys(c.toggleGuide)} 이 안내 열기/닫기</li>
        </ul>
        <p class="guide-note">카메라가 캐릭터를 따라갑니다. 상자와 기둥은 통과할 수 없고, 담장 밖으로는 나갈 수 없습니다.</p>
        <button class="btn" id="guide-start" type="button">시작하기</button>
      </div>`;
    root.appendChild(this.guide);
    this.guide.querySelector<HTMLButtonElement>('#guide-start')?.addEventListener('click', () => {
      this.hide();
      onStart();
    });

    this.hud = document.createElement('div');
    this.hud.className = 'hud';
    root.appendChild(this.hud);
    this.setHudText('');
  }

  get visible(): boolean {
    return !this.guide.hidden;
  }

  show(): void {
    this.guide.hidden = false;
  }

  hide(): void {
    this.guide.hidden = true;
  }

  toggle(): void {
    this.guide.hidden = !this.guide.hidden;
  }

  /** 화면 아래 상태 문구 (FPS 등) */
  setHudText(extra: string): void {
    const h = keyLabel(GameConfig.controls.toggleGuide[0] ?? 'KeyH');
    this.hud.textContent = `${h}: 조작 안내${extra ? ' · ' + extra : ''}`;
  }
}
