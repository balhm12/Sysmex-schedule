import { DUNGEONS, isDungeonUnlocked, type DungeonDef } from '../game/DungeonDefs';
import { zoneSpawns } from '../dungeon/journey';

/** 던전의 적 수: 열린 경기장은 spawns, 여정 던전은 모든 구역 파도의 합 */
function enemyCount(d: DungeonDef): number {
  return d.journey ? d.journey.zones.reduce((n, z) => n + zoneSpawns(z).length, 0) : d.spawns.length;
}

export interface DungeonSelectCallbacks {
  /** 던전별 클리어 횟수 (해금 판단) */
  clears: () => Record<string, number>;
  /** 현재 플레이어 레벨 (권장 레벨 비교 안내) */
  level: () => number;
  enter: (def: DungeonDef) => void;
  onClose: () => void;
}

/**
 * 던전 선택 화면
 * - DungeonDefs 의 목록을 카드로 보여준다. 이전 던전을 클리어해야 다음 던전이 열린다.
 * - 입장하면 Game.enterDungeon 이 던전을 새로 만든다.
 */
export class DungeonSelectUI {
  private readonly el: HTMLDivElement;

  constructor(parent: HTMLElement, private readonly cb: DungeonSelectCallbacks) {
    this.el = document.createElement('div');
    this.el.className = 'guide dungeons';
    this.el.hidden = true;
    this.el.innerHTML = `
      <div class="guide-panel dungeons-panel" role="dialog" aria-labelledby="dungeons-title">
        <div class="inv-head"><h2 class="guide-title" id="dungeons-title">던전 선택</h2><button class="btn small" id="dungeons-close" type="button">닫기 (Esc)</button></div>
        <p class="guide-sub">던전을 클리어하면 다음 던전이 열립니다. 레벨·골드·장비는 모든 던전에서 이어집니다.</p>
        <div class="dungeon-list" id="dungeon-list"></div>
      </div>`;
    parent.appendChild(this.el);
    this.el.querySelector('#dungeons-close')?.addEventListener('click', () => this.cb.onClose());
    this.el.querySelector('#dungeon-list')?.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('button[data-dungeon]');
      if (!btn || btn.disabled) return;
      const def = DUNGEONS.find((d) => d.id === btn.dataset.dungeon);
      if (def) this.cb.enter(def);
    });
  }

  get visible(): boolean {
    return !this.el.hidden;
  }

  /** 카드 목록을 현재 기록으로 다시 그린다 */
  refresh(): void {
    const clears = this.cb.clears();
    const level = this.cb.level();
    const list = this.el.querySelector('#dungeon-list') as HTMLElement;
    list.innerHTML = DUNGEONS.map((d, i) => {
      const unlocked = isDungeonUnlocked(d, clears);
      const n = clears[d.id] ?? 0;
      const need = d.requiresClear ? DUNGEONS.find((x) => x.id === d.requiresClear)?.name ?? d.requiresClear : '';
      const status = !unlocked ? `잠김 · '${need}' 클리어 필요` : n > 0 ? `클리어 ${n}회` : '아직 클리어하지 않음';
      const levelNote = level < d.recommendedLevel ? ` <span class="dungeon-warn">(현재 레벨 ${level}: 어려울 수 있음)</span>` : '';
      return `<div class="dungeon-card${unlocked ? '' : ' locked'}" data-card="${d.id}">
          <div class="dungeon-index">${i + 1}</div>
          <div class="dungeon-text">
            <div class="dungeon-name">${d.name}</div>
            <div class="dungeon-sub">${d.subtitle}</div>
            <div class="dungeon-meta">권장 레벨 ${d.recommendedLevel}${levelNote} · 적 ${enemyCount(d)}마리 · 상자 ${d.chests.length}개 · ${status}</div>
          </div>
          <button class="btn${unlocked ? '' : ' secondary'}" type="button" data-dungeon="${d.id}" ${unlocked ? '' : 'disabled'}>${unlocked ? '입장' : '잠김'}</button>
        </div>`;
    }).join('');
  }

  show(): void {
    this.refresh();
    this.el.hidden = false;
  }

  hide(): void {
    this.el.hidden = true;
  }
}
