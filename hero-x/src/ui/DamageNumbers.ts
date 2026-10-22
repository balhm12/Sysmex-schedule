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

  constructor(parent: HTMLElement, private readonly project: ProjectFn) {
    this.root = document.createElement('div');
    this.root.className = 'dmg-layer';
    parent.appendChild(this.root);
  }

  /** 숫자 띄우기. kind: enemy(적 피해) | player(플레이어 피해) | kill(처치 점수) | heal(회복) | levelup(레벨) */
  show(pos: THREE.Vector3, amount: number, kind: 'enemy' | 'player' | 'kill' | 'heal' | 'levelup' = 'enemy'): void {
    const el = document.createElement('div');
    el.className = `dmg ${kind}`;
    const n = Math.round(amount);
    el.textContent = kind === 'kill' ? `${n} 처치!` : kind === 'heal' ? `+${n}` : kind === 'levelup' ? `레벨 ${n}!` : String(n);
    this.root.appendChild(el);
    this.popups.push({ el, pos: pos.clone(), t: 0 });
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
        p.el.style.opacity = String(Math.max(0, Math.min(1, 1.3 - p.t)));
      }
      if (p.t > 1.1) this.remove(i);
    }
  }

  clear(): void {
    while (this.popups.length) this.remove(this.popups.length - 1);
  }

  private remove(i: number): void {
    this.popups[i].el.remove();
    this.popups.splice(i, 1);
  }
}
