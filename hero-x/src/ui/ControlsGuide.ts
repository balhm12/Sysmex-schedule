import { GameConfig } from '../game/GameConfig';

/** 키 코드를 사람이 읽는 이름으로 */
export function keyLabel(code: string): string {
  if (code === 'Mouse0') return '마우스 왼쪽';
  if (code === 'Mouse2') return '마우스 오른쪽';
  if (code === 'Mouse1') return '마우스 가운데';
  if (code === 'Space') return 'Space';
  if (code === 'Escape') return 'Esc';
  if (code.startsWith('Key')) return code.slice(3);
  if (code.startsWith('Arrow')) return { Up: '↑', Down: '↓', Left: '←', Right: '→' }[code.slice(5)] ?? code;
  return code;
}

/**
 * 조작 안내 창 + 화면 아래 상태 표시
 * - 메인 메뉴의 '조작 안내' 버튼이나 H 키로 열고, 닫기 버튼·H·Esc 로 닫는다.
 * - 안내 내용은 GameConfig.controls 의 키 설정을 그대로 읽어 보여준다.
 */
export class ControlsGuide {
  private readonly guide: HTMLDivElement;
  private readonly hud: HTMLDivElement;

  constructor(root: HTMLElement, onClose: () => void) {
    const c = GameConfig.controls;
    const keys = (codes: string[]) => codes.map((k) => `<span class="key">${keyLabel(k)}</span>`).join(' ');

    this.guide = document.createElement('div');
    this.guide.className = 'guide';
    this.guide.hidden = true;
    this.guide.innerHTML = `
      <div class="guide-panel" role="dialog" aria-labelledby="guide-title">
        <div class="inv-head"><h2 class="guide-title" id="guide-title" style="font-size:30px">조작 안내</h2><button class="btn small" id="guide-close" type="button">닫기 (H)</button></div>
        <ul class="guide-keys">
          <li>${keys(c.up)} 앞으로</li>
          <li>${keys(c.down)} 뒤로</li>
          <li>${keys(c.left)} 왼쪽</li>
          <li>${keys(c.right)} 오른쪽</li>
          <li>${keys(c.attackMelee)} 근접 공격 (마우스가 가리키는 쪽으로)</li>
          <li>${keys(c.attackRanged)} 원거리 공격 (에너지 탄 발사)</li>
          <li>${keys(c.jump)} 점프 (떠 있는 동안 탄·충격파를 피함)</li>
          <li>${keys(c.toggleInventory)} 장비 화면 열기/닫기 (게임 일시정지)</li>
          <li>${keys(c.interact)} 보물 상자 열기 (가까이 가면 안내가 뜸)</li>
          <li>${keys(['Escape'])} 메인 메뉴 (게임 일시정지)</li>
          <li>${keys(c.restart)} 결과 화면에서 다시 도전</li>
          <li>${keys(c.toggleGuide)} 이 안내 열기/닫기</li>
        </ul>
        <p class="guide-note">돌진 로봇은 눈이 붉어진 뒤 덤벼들고, 포격 드론은 포신이 밝아진 뒤 탄을 쏘며, 철벽 로봇은 방패를 들어 올린 뒤 내려찍습니다. 보스는 바닥 원 색깔로 패턴을 예고합니다(주황 돌진 · 빨강 내려찍기 · 보라 탄막).</p>
      </div>`;
    root.appendChild(this.guide);
    this.guide.querySelector<HTMLButtonElement>('#guide-close')?.addEventListener('click', onClose);

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
    this.hud.textContent = `${h}: 조작 안내 · Esc: 메뉴${extra ? ' · ' + extra : ''}`;
  }
}
