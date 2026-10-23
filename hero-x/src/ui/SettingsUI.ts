import { difficultyLevels, getDifficultyPreset } from '../game/Difficulty';
import type { DifficultyLevel } from '../game/GameConfig';
import { SETTING_DEFS, SETTING_GROUPS, type SettingKey, type UserSettings } from '../game/Settings';

export interface SettingsUICallbacks {
  /** 현재 설정 */
  get: () => UserSettings;
  /** 항목 하나 변경 (적용·저장은 Game 이 한다) */
  set: <K extends SettingKey>(key: K, value: UserSettings[K]) => void;
  /** 모두 기본값으로 */
  resetAll: () => void;
  onClose: () => void;
}

/**
 * 설정 화면
 * - SETTING_DEFS 정의를 읽어 그룹별로 슬라이더·스위치·선택 버튼을 자동 생성한다. 항목 추가는 Settings.ts 에서만 하면 된다.
 * - 값을 바꾸면 바로 적용되고 저장된다. '기본값 복원'은 확인을 한 번 거친다.
 */
export class SettingsUI {
  private readonly el: HTMLDivElement;
  private confirming = false;

  constructor(parent: HTMLElement, private readonly cb: SettingsUICallbacks) {
    this.el = document.createElement('div');
    this.el.className = 'guide settings';
    this.el.hidden = true;
    const groups = SETTING_GROUPS.map((group) => {
      const rows = SETTING_DEFS.filter((d) => d.group === group)
        .map((d) => {
          let control = '';
          if (d.kind === 'choice') {
            control = difficultyLevels()
              .map((lv) => `<button type="button" class="diff-btn" data-key="difficulty" data-level="${lv}">${getDifficultyPreset(lv).label}</button>`)
              .join('');
          } else if (d.kind === 'toggle') {
            control = `<button type="button" class="toggle" role="switch" data-key="${d.key}" aria-checked="false"><span class="toggle-knob"></span></button>`;
          } else {
            control = `<input type="range" data-key="${d.key}" min="${d.min}" max="${d.max}" step="${d.step}" aria-label="${d.label}"><output data-out="${d.key}"></output>`;
          }
          return `<div class="set-row" data-row="${d.key}"><div class="set-text"><div class="set-label">${d.label}</div><div class="set-desc">${d.description}</div></div><div class="set-control">${control}</div></div>`;
        })
        .join('');
      return `<section class="set-group"><h3 class="set-group-title">${group}</h3>${rows}</section>`;
    }).join('');
    this.el.innerHTML = `
      <div class="guide-panel settings-panel" role="dialog" aria-labelledby="settings-title">
        <div class="inv-head"><h2 class="guide-title" id="settings-title">설정</h2><button class="btn small" id="settings-close" type="button">닫기 (Esc)</button></div>
        <p class="guide-sub">바꾸는 즉시 적용되고 이 브라우저에 저장됩니다.</p>
        <div class="set-body">${groups}</div>
        <div class="menu-confirm" id="settings-confirm" hidden>
          <p>모든 설정을 기본값으로 되돌릴까요?</p>
          <div class="btns"><button class="btn small" id="settings-reset-yes" type="button">되돌리기</button><button class="btn small ghost" id="settings-reset-no" type="button">취소</button></div>
        </div>
        <div class="btns set-foot"><button class="btn secondary" id="settings-reset" type="button">기본값 복원</button></div>
      </div>`;
    parent.appendChild(this.el);

    this.el.querySelector('#settings-close')?.addEventListener('click', () => this.cb.onClose());
    this.el.querySelector('#settings-reset')?.addEventListener('click', () => this.setConfirm(true));
    this.el.querySelector('#settings-reset-no')?.addEventListener('click', () => this.setConfirm(false));
    this.el.querySelector('#settings-reset-yes')?.addEventListener('click', () => {
      this.setConfirm(false);
      this.cb.resetAll();
      this.refresh();
    });
    this.el.querySelectorAll<HTMLInputElement>('input[type="range"]').forEach((input) => {
      input.addEventListener('input', () => {
        this.cb.set(input.dataset.key as SettingKey, Number(input.value) as never);
        this.refresh();
      });
    });
    this.el.querySelectorAll<HTMLButtonElement>('button.toggle').forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.key as SettingKey;
        this.cb.set(key, !(this.cb.get()[key] as boolean) as never);
        this.refresh();
      });
    });
    this.el.querySelectorAll<HTMLButtonElement>('.diff-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.cb.set('difficulty', btn.dataset.level as DifficultyLevel);
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
    (this.el.querySelector('#settings-confirm') as HTMLElement).hidden = !on;
  }

  /** 현재 값으로 모든 컨트롤을 갱신 */
  refresh(): void {
    const s = this.cb.get();
    for (const d of SETTING_DEFS) {
      if (d.kind === 'choice') {
        this.el.querySelectorAll<HTMLButtonElement>('.diff-btn[data-key="difficulty"]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.level === s.difficulty)));
      } else if (d.kind === 'toggle') {
        const b = this.el.querySelector<HTMLButtonElement>(`button.toggle[data-key="${d.key}"]`);
        b?.setAttribute('aria-checked', String(s[d.key]));
      } else {
        const input = this.el.querySelector<HTMLInputElement>(`input[data-key="${d.key}"]`);
        const out = this.el.querySelector<HTMLOutputElement>(`output[data-out="${d.key}"]`);
        const v = s[d.key] as number;
        if (input) input.value = String(v);
        if (out) out.textContent = `${v.toFixed(1)}${d.unit ?? ''}`;
      }
    }
  }

  show(): void {
    this.setConfirm(false);
    this.refresh();
    this.el.hidden = false;
  }

  hide(): void {
    this.confirming = false;
    this.el.hidden = true;
  }

  /** Esc: 확인 중이면 확인만 닫고, 아니면 창을 닫는다 */
  pressBack(): void {
    if (this.confirming) this.setConfirm(false);
    else this.cb.onClose();
  }
}
