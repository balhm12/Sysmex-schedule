import { difficultyLevels, getDifficultyPreset } from '../game/Difficulty';
import { GameConfig, type DifficultyLevel } from '../game/GameConfig';

/** 키 코드를 사람이 읽는 이름으로 */
function keyLabel(code: string): string {
  if (code === 'Mouse0') return '마우스 왼쪽';
  if (code === 'Mouse2') return '마우스 오른쪽';
  if (code === 'Mouse1') return '마우스 가운데';
  if (code === 'Space') return 'Space';
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

  constructor(
    root: HTMLElement,
    onStart: () => void,
    private readonly difficulty: { get: () => DifficultyLevel; set: (level: DifficultyLevel) => void },
  ) {
    const c = GameConfig.controls;
    const meta = GameConfig.meta;
    const keys = (codes: string[]) => codes.map((k) => `<span class="key">${keyLabel(k)}</span>`).join(' ');
    const diffButtons = difficultyLevels()
      .map((lv) => `<button type="button" class="diff-btn" data-level="${lv}">${getDifficultyPreset(lv).label}</button>`)
      .join('');

    this.guide = document.createElement('div');
    this.guide.className = 'guide';
    this.guide.innerHTML = `
      <div class="guide-panel" role="dialog" aria-labelledby="guide-title">
        <p class="guide-eyebrow">3D 액션 RPG · 3단계 아이템과 성장</p>
        <h1 class="guide-title" id="guide-title">${meta.title.replace(' X', ' <em>X</em>')}</h1>
        <p class="guide-sub">${meta.subtitle} · v${meta.version}</p>
        <ul class="guide-keys">
          <li>${keys(c.up)} 앞으로</li>
          <li>${keys(c.down)} 뒤로</li>
          <li>${keys(c.left)} 왼쪽</li>
          <li>${keys(c.right)} 오른쪽</li>
          <li>${keys(c.attackMelee)} 근접 공격 (마우스가 가리키는 쪽으로)</li>
          <li>${keys(c.attackRanged)} 원거리 공격 (에너지 탄 발사)</li>
          <li>${keys(c.jump)} 점프 (떠 있는 동안 드론의 탄이 아래로 지나감)</li>
          <li>${keys(c.toggleInventory)} 장비 화면 열기/닫기 (게임 일시정지)</li>
          <li>${keys(c.restart)} 결과 화면에서 다시 시작</li>
          <li>${keys(c.toggleGuide)} 이 안내 열기/닫기</li>
        </ul>
        <p class="guide-note">돌진 로봇은 눈이 붉어진 뒤 덤벼들고, 포격 드론은 거리를 두고 포신이 밝아진 뒤 탄을 쏘며, 철벽 로봇은 방패를 들어 올린 뒤 내려찍습니다. 모든 적을 처치하면 승리입니다.</p>
        <div class="diff-row"><span class="hud-label">난이도</span>${diffButtons}</div>
        <button class="btn" id="guide-start" type="button">시작하기</button>
      </div>`;
    root.appendChild(this.guide);
    this.guide.querySelector<HTMLButtonElement>('#guide-start')?.addEventListener('click', () => {
      this.hide();
      onStart();
    });
    this.guide.querySelectorAll<HTMLButtonElement>('.diff-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.difficulty.set(btn.dataset.level as DifficultyLevel);
        this.refreshDifficulty();
      });
    });
    this.refreshDifficulty();

    this.hud = document.createElement('div');
    this.hud.className = 'hud';
    root.appendChild(this.hud);
    this.setHudText('');
  }

  get visible(): boolean {
    return !this.guide.hidden;
  }

  /** 난이도 버튼의 선택 표시 갱신 */
  refreshDifficulty(): void {
    const current = this.difficulty.get();
    this.guide.querySelectorAll<HTMLButtonElement>('.diff-btn').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn.dataset.level === current));
    });
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
