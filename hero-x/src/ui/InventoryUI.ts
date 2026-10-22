import { GameConfig } from '../game/GameConfig';
import { EQUIP_SLOTS, SLOT_LABELS, type EquipmentSystem } from '../items/EquipmentSystem';
import type { EquipSlot, ItemInstance, ItemStats } from '../items/ItemDatabase';

/** 능력치 한 줄 표시 (0인 항목은 생략) */
function statText(s: ItemStats, delta?: ItemStats): string {
  const parts: string[] = [];
  const fmt = (label: string, v: number, d: number | undefined, pct = false) => {
    if (v === 0 && !d) return;
    const show = (n: number) => (pct ? `${Math.round(n * 100)}%` : String(n));
    let text = `${label} ${v > 0 ? '+' : ''}${show(v)}`;
    if (d !== undefined && d !== 0) text += ` <span class="${d > 0 ? 'up' : 'down'}">(${d > 0 ? '▲' : '▼'}${show(Math.abs(d))})</span>`;
    parts.push(text);
  };
  fmt('공격', s.attack, delta?.attack);
  fmt('방어', s.defense, delta?.defense);
  fmt('체력', s.maxHp, delta?.maxHp);
  fmt('속도', s.moveSpeed, delta?.moveSpeed, true);
  return parts.join(' · ') || '효과 없음';
}

/**
 * 장비(인벤토리) 화면
 * - I 키로 열고 닫는다. 열려 있는 동안 게임은 멈춘다 (Game 이 처리).
 * - 장착 중인 슬롯 5개와 가방 목록을 보여주고, 가방 장비에는 장착 시 변화(▲▼)를 함께 표시한다.
 */
export class InventoryUI {
  private readonly el: HTMLDivElement;
  private readonly body: HTMLElement;

  constructor(
    parent: HTMLElement,
    private readonly equipment: EquipmentSystem,
    private readonly callbacks: { onChange: () => void; onClose: () => void; getSummary: () => string },
  ) {
    this.el = document.createElement('div');
    this.el.className = 'guide inv';
    this.el.hidden = true;
    this.el.innerHTML = `
      <div class="guide-panel inv-panel" role="dialog" aria-labelledby="inv-title">
        <div class="inv-head"><h2 class="guide-title" id="inv-title">장비</h2><button class="btn small" id="inv-close" type="button">닫기 (I)</button></div>
        <p class="guide-sub" id="inv-summary"></p>
        <div id="inv-body"></div>
      </div>`;
    parent.appendChild(this.el);
    this.body = this.el.querySelector('#inv-body') as HTMLElement;
    this.el.querySelector('#inv-close')?.addEventListener('click', () => this.callbacks.onClose());
    this.body.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('button[data-action]');
      if (!btn) return;
      const action = btn.dataset.action;
      if (action === 'equip') this.equipment.equip(Number(btn.dataset.uid));
      else if (action === 'unequip') this.equipment.unequip(btn.dataset.slot as EquipSlot);
      else if (action === 'discard') this.equipment.discard(Number(btn.dataset.uid));
      this.callbacks.onChange();
      this.render();
    });
  }

  get visible(): boolean {
    return !this.el.hidden;
  }

  show(): void {
    this.el.hidden = false;
    this.render();
  }

  hide(): void {
    this.el.hidden = true;
  }

  /** 화면 내용을 다시 그린다 */
  render(): void {
    const eq = this.equipment;
    const rarities = GameConfig.equipment.rarities;
    (this.el.querySelector('#inv-summary') as HTMLElement).textContent = this.callbacks.getSummary();

    const slotRows = EQUIP_SLOTS.map((slot) => {
      const it = eq.equipped[slot];
      return `<li class="inv-row">
        <span class="inv-slot">${SLOT_LABELS[slot]}</span>
        ${it ? `<span class="inv-name" style="color:${rarities[it.rarity].color}">${it.name}</span><span class="inv-stats">${statText(it.stats)}</span>
          <button class="btn small ghost" type="button" data-action="unequip" data-slot="${slot}">해제</button>` : `<span class="inv-empty">비어 있음</span>`}
      </li>`;
    }).join('');

    const bagRows = eq.inventory.length
      ? eq.inventory.map((it: ItemInstance) => `<li class="inv-row">
          <span class="inv-slot">${SLOT_LABELS[eq.targetSlot(it)]}</span>
          <span class="inv-name" style="color:${rarities[it.rarity].color}">${it.name} <small>${rarities[it.rarity].label}</small></span>
          <span class="inv-stats">${statText(it.stats, eq.compare(it))}</span>
          <button class="btn small" type="button" data-action="equip" data-uid="${it.uid}">장착</button>
          <button class="btn small ghost" type="button" data-action="discard" data-uid="${it.uid}" title="${it.description}">버리기</button>
        </li>`).join('')
      : '<li class="inv-empty">가방이 비어 있습니다. 적을 처치하면 장비가 떨어집니다.</li>';

    this.body.innerHTML = `
      <h3 class="inv-h">장착 중</h3><ul class="inv-list">${slotRows}</ul>
      <h3 class="inv-h">가방 (${eq.inventory.length} / ${GameConfig.equipment.inventorySize})</h3><ul class="inv-list">${bagRows}</ul>`;
  }
}
