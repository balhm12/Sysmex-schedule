import { GameConfig } from '../game/GameConfig';

/** 키 코드를 사람이 읽는 이름으로 */
function keyLabel(code: string): string {
  if (code === 'Mouse0') return '마우스 왼쪽';
  if (code === 'Mouse2') return '마우스 오른쪽';
  if (code === 'Mouse1') return '마우스 가운데';
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
        <p class="guide-eyebrow">3D 액션 RPG · 2단계 전투 테스트</p>
        <h1 class="guide-title" id="guide-title">${meta.title.replace(' X', ' <em>X</em>')}</h1>
        <p class="guide-sub">${meta.subtitle} · v${meta.version}</p>
        <ul class="guide-keys">
          <li>${keys(c.up)} 앞으로</li>
          <li>${keys(c.down)} 뒤로</li>
          <li>${keys(c.left)} 왼쪽</li>
          <li>${keys(c.right)} 오른쪽</li>
          <li>${keys(c.attackMelee)} 근접 공격 (마우스가 가리키는 쪽으로)</li>
          <li>${keys(c.restart)} 결과 화면에서 다시 시작</li>
          <li>${keys(c.toggleGuide)} 이 안내 열기/닫기</li>
        </ul>
        <p class="guide-note">돌진 로봇이 다가와 공격합니다. 눈이 붉어지면 공격 예고이니 피하세요. 모든 로봇을 처치하면 승리입니다.</p>
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
