import { difficultyLevels, getDifficultyPreset } from '../game/Difficulty';
import { GameConfig, type DifficultyLevel } from '../game/GameConfig';

export interface MainMenuCallbacks {
  /** 새 게임 시작 (진행 중인 게임이 있으면 확인을 거친다) */
  newGame: () => void;
  /** 진행 중인 게임으로 돌아가기 */
  continueGame: () => void;
  openInventory: () => void;
  openGuide: () => void;
  /** 진행 중인 게임이 있는지 (이어하기 버튼 활성화) */
  hasRun: () => boolean;
  difficulty: { get: () => DifficultyLevel; set: (level: DifficultyLevel) => void };
}

/**
 * 메인 메뉴
 * - 게임을 켜면 가장 먼저 보이고, 플레이 중 Esc 로 돌아올 수 있다.
 * - 새 게임 / 이어하기 / 장비 / 조작 안내 / 설정(5단계 예정) / 난이도
 * - 브라우저 게임이라 '게임 종료' 대신 탭을 닫으면 된다는 안내만 둔다.
 */
export class MainMenu {
  private readonly el: HTMLDivElement;
  private confirming = false;

  constructor(parent: HTMLElement, private readonly cb: MainMenuCallbacks) {
    const meta = GameConfig.meta;
    const diffButtons = difficultyLevels()
      .map((lv) => `<button type="button" class="diff-btn" data-level="${lv}">${getDifficultyPreset(lv).label}</button>`)
      .join('');
    this.el = document.createElement('div');
    this.el.className = 'guide menu';
    this.el.innerHTML = `
      <div class="guide-panel menu-panel" role="dialog" aria-labelledby="menu-title">
        <p class="guide-eyebrow">3D 액션 RPG</p>
        <h1 class="guide-title" id="menu-title">${meta.title.replace(' X', ' <em>X</em>')}</h1>
        <p class="guide-sub">${meta.subtitle} · v${meta.version}</p>
        <div class="menu-list">
          <button class="btn" id="menu-new" type="button">새 게임</button>
          <button class="btn secondary" id="menu-continue" type="button">이어하기</button>
          <button class="btn secondary" id="menu-inventory" type="button">장비</button>
          <button class="btn secondary" id="menu-guide" type="button">조작 안내</button>
          <button class="btn secondary" id="menu-settings" type="button" disabled title="5단계에서 추가됩니다">설정 (준비 중)</button>
        </div>
        <div class="diff-row"><span class="hud-label">난이도</span>${diffButtons}</div>
        <div class="menu-confirm" id="menu-confirm" hidden>
          <p>진행 중인 게임이 있습니다. 새로 시작하면 레벨·골드·장비가 초기화됩니다. 계속할까요?</p>
          <div class="btns"><button class="btn small" id="menu-confirm-yes" type="button">새로 시작</button><button class="btn small ghost" id="menu-confirm-no" type="button">취소</button></div>
        </div>
        <p class="guide-note">던전 "${GameConfig.dungeon.name}": 적을 모두 처치하면 보스가 나타나고, 보스를 쓰러뜨리면 클리어입니다. 게임을 끝내려면 브라우저 탭을 닫으세요.</p>
      </div>`;
    parent.appendChild(this.el);
    const q = <T extends HTMLElement>(sel: string) => this.el.querySelector(sel) as T;
    q<HTMLButtonElement>('#menu-new').addEventListener('click', () => {
      if (this.cb.hasRun()) this.setConfirm(true);
      else this.cb.newGame();
    });
    q<HTMLButtonElement>('#menu-confirm-yes').addEventListener('click', () => {
      this.setConfirm(false);
      this.cb.newGame();
    });
    q<HTMLButtonElement>('#menu-confirm-no').addEventListener('click', () => this.setConfirm(false));
    q<HTMLButtonElement>('#menu-continue').addEventListener('click', () => this.cb.continueGame());
    q<HTMLButtonElement>('#menu-inventory').addEventListener('click', () => this.cb.openInventory());
    q<HTMLButtonElement>('#menu-guide').addEventListener('click', () => this.cb.openGuide());
    this.el.querySelectorAll<HTMLButtonElement>('.diff-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.cb.difficulty.set(btn.dataset.level as DifficultyLevel);
        this.refresh();
      });
    });
    this.refresh();
  }

  get visible(): boolean {
    return !this.el.hidden;
  }

  private setConfirm(on: boolean): void {
    this.confirming = on;
    (this.el.querySelector('#menu-confirm') as HTMLElement).hidden = !on;
  }

  /** 버튼 상태(이어하기 가능 여부, 난이도 선택 표시) 갱신 */
  refresh(): void {
    const hasRun = this.cb.hasRun();
    const cont = this.el.querySelector('#menu-continue') as HTMLButtonElement;
    cont.disabled = !hasRun;
    cont.title = hasRun ? '' : '진행 중인 게임이 없습니다';
    const current = this.cb.difficulty.get();
    this.el.querySelectorAll<HTMLButtonElement>('.diff-btn').forEach((btn) => btn.setAttribute('aria-pressed', String(btn.dataset.level === current)));
  }

  show(): void {
    this.setConfirm(false);
    this.refresh();
    this.el.hidden = false;
  }

  hide(): void {
    this.el.hidden = true;
  }

  /** Enter 키: 확인 중이면 새로 시작, 아니면 이어하기(있으면) 또는 새 게임 */
  pressPrimary(): void {
    if (this.confirming) {
      this.setConfirm(false);
      this.cb.newGame();
    } else if (this.cb.hasRun()) this.cb.continueGame();
    else this.cb.newGame();
  }
}
