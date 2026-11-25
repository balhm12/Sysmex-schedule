import type * as THREE from 'three';

/** 3D 좌표를 화면 좌표(px)로 바꿔 주는 함수. 화면 밖이면 null */
export type ProjectFn = (pos: THREE.Vector3) => { x: number; y: number } | null;

interface Popup {
  el: HTMLDivElement;
  pos: THREE.Vector3;
  t: number;
}

/**
 * 피해 숫자 표시
 * - 맞은 위치 위로 숫자가 떠오르며 사라진다. 플레이어가 받은 피해는 붉게, 적이 받은 피해는 밝게.
 * - GameConfig.hud.showDamageNumbers 가 false 면 아무것도 그리지 않는다 (Game 이 호출 여부를 결정).
 */
export class DamageNumbers {
  private readonly root: HTMLDivElement;
  private readonly popups: Popup[] = [];
  /** 다 쓴 글자 상자를 모아 두고 다시 쓴다 (매 타격마다 DOM 을 만들고 지우면 휴대폰에서 끊긴다) */
  private readonly free: HTMLDivElement[] = [];

  constructor(parent: HTMLElement, private readonly project: ProjectFn) {
    this.root = document.createElement('div');
    this.root.className = 'dmg-layer';
    parent.appendChild(this.root);
  }

  /** 숫자 띄우기. kind: enemy(적 피해) | player(플레이어 피해) | kill(처치 점수) | heal(회복) | levelup(레벨) */
  private take(className: string): HTMLDivElement {
    const el = this.free.pop() ?? document.createElement('div');
    el.className = className;
    el.style.color = '';
    el.style.opacity = '0';
    if (!el.isConnected) this.root.appendChild(el);
    el.hidden = false;
    return el;
  }

  show(pos: THREE.Vector3, amount: number, kind: 'enemy' | 'player' | 'kill' | 'heal' | 'levelup' = 'enemy'): void {
    const el = this.take(`dmg ${kind}`);
    const n = Math.round(amount);
    el.textContent = kind === 'kill' ? `${n} 처치!` : kind === 'heal' ? `+${n}` : kind === 'levelup' ? `레벨 ${n}!` : String(n);
    this.popups.push({ el, pos: pos.clone(), t: 0 });
    if (this.popups.length > 40) this.remove(0);
  }

  /** 글자 띄우기 (장비 획득 안내 등) */
  showText(pos: THREE.Vector3, text: string, color?: string): void {
    const el = this.take('dmg text');
    el.textContent = text;
    if (color) el.style.color = color;
    this.popups.push({ el, pos: pos.clone(), t: -0.6 });
    if (this.popups.length > 40) this.remove(0);
  }

  update(dt: number): void {
    for (let i = this.popups.length - 1; i >= 0; i--) {
      const p = this.popups[i];
      p.t += dt;
      p.pos.y += dt * 1.4;
      const s = this.project(p.pos);
      if (!s) {
        p.el.style.opacity = '0';
      } else {
        p.el.style.transform = `translate(${s.x}px, ${s.y}px) translate(-50%, -50%) scale(${1 + Math.min(p.t * 2, 0.3)})`;
        p.el.style.opacity = String(Math.max(0, Math.min(1, 1.3 - Math.max(0, p.t))));
      }
      if (p.t > 1.1) this.remove(i);
    }
  }

  clear(): void {
    while (this.popups.length) this.remove(this.popups.length - 1);
  }

  private remove(i: number): void {
    const el = this.popups[i].el;
    this.popups.splice(i, 1);
    el.hidden = true;
    if (this.free.length < 48) this.free.push(el);
    else el.remove();
  }

  /** 보이는 글자 수 (검증용) */
  get count(): number {
    return this.popups.length;
  }
}
