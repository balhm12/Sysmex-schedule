import * as THREE from 'three';
import { modelRegistry } from '../assets/ModelRegistry';
import type { BossConfig } from '../game/DungeonDefs';
import { describeBossPatterns } from '../game/bossIntro';

/**
 * 보스 등장 팝업: 초상화(보스 모델을 작은 캔버스에 한 번 그림) + 별명·이름·설명 + 패턴 표 + 공략 팁.
 * 열려 있는 동안 Game 은 멈춘다(paused). 버튼이나 Enter/Escape 로 닫는다.
 */
export class BossIntroUI {
  private readonly el: HTMLDivElement;
  private readonly portrait: HTMLCanvasElement;
  private onClose: (() => void) | null = null;

  constructor(parent: HTMLElement) {
    this.el = document.createElement('div');
    this.el.className = 'guide boss-intro';
    this.el.hidden = true;
    this.el.innerHTML = `
      <div class="guide-panel boss-intro-panel" role="dialog" aria-labelledby="boss-intro-name">
        <div class="boss-intro-head">
          <canvas class="boss-intro-portrait" id="boss-intro-portrait" width="220" height="220" aria-hidden="true"></canvas>
          <div class="boss-intro-text">
            <p class="guide-eyebrow" id="boss-intro-title"></p>
            <h2 class="guide-title" id="boss-intro-name"></h2>
            <p class="boss-intro-hp" id="boss-intro-hp"></p>
            <p class="boss-intro-lore" id="boss-intro-lore"></p>
          </div>
        </div>
        <table class="boss-intro-table"><thead><tr><th>패턴</th><th>어떻게</th><th>피하는 법</th></tr></thead><tbody id="boss-intro-patterns"></tbody></table>
        <div class="btns"><button class="btn primary" id="boss-intro-fight" type="button">싸운다!</button></div>
      </div>`;
    parent.appendChild(this.el);
    this.portrait = this.el.querySelector('#boss-intro-portrait') as HTMLCanvasElement;
    (this.el.querySelector('#boss-intro-fight') as HTMLButtonElement).addEventListener('click', () => this.close());
  }

  get visible(): boolean {
    return !this.el.hidden;
  }

  /** 팝업 열기. hpMax: 실제 적용된 최대 체력(난이도 반영) */
  show(cfg: BossConfig, hpMax: number, onClose: () => void): void {
    this.onClose = onClose;
    (this.el.querySelector('#boss-intro-title') as HTMLElement).textContent = cfg.title;
    (this.el.querySelector('#boss-intro-name') as HTMLElement).textContent = cfg.name;
    (this.el.querySelector('#boss-intro-hp') as HTMLElement).textContent = `체력 ${hpMax} · 접촉 피해 ${cfg.contactDamage}`;
    (this.el.querySelector('#boss-intro-lore') as HTMLElement).textContent = cfg.lore;
    const body = this.el.querySelector('#boss-intro-patterns') as HTMLElement;
    body.innerHTML = '';
    for (const p of describeBossPatterns(cfg)) {
      const tr = document.createElement('tr');
      for (const text of [p.name, p.desc, p.tip]) {
        const td = document.createElement('td');
        td.textContent = text;
        tr.appendChild(td);
      }
      body.appendChild(tr);
    }
    renderBossPortrait(this.portrait, cfg);
    this.el.hidden = false;
    (this.el.querySelector('#boss-intro-fight') as HTMLButtonElement).focus();
  }

  close(): void {
    if (this.el.hidden) return;
    this.el.hidden = true;
    const cb = this.onClose;
    this.onClose = null;
    cb?.();
  }
}

/**
 * 보스 초상화: 보스 .glb(없으면 색 상자)를 작은 WebGL 렌더러로 한 번 그리고 바로 정리한다.
 * 실패해도(WebGL 불가 등) 팝업은 뜬다.
 */
export function renderBossPortrait(canvas: HTMLCanvasElement, cfg: BossConfig): boolean {
  let renderer: THREE.WebGLRenderer | null = null;
  try {
    // 임시 WebGL 캔버스에 그린 뒤 보이는 2D 캔버스로 복사한다 (WebGL 컨텍스트를 바로 반납해도 그림이 남게)
    const gl = document.createElement('canvas');
    gl.width = canvas.width;
    gl.height = canvas.height;
    renderer = new THREE.WebGLRenderer({ canvas: gl, antialias: true, alpha: true, powerPreference: 'low-power', preserveDrawingBuffer: true });
    renderer.setPixelRatio(1);
    renderer.setSize(canvas.width, canvas.height, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    const scene = new THREE.Scene();
    const key = new THREE.DirectionalLight('#fff4e0', 2.4);
    key.position.set(3, 6, 5);
    scene.add(key, new THREE.AmbientLight('#cfd8ff', 0.9));
    const rim = new THREE.DirectionalLight(new THREE.Color(cfg.color), 1.6);
    rim.position.set(-4, 3, -4);
    scene.add(rim);
    const model = modelRegistry.createEnemyModel(`boss:${cfg.model}`, 3.0);
    let root: THREE.Object3D;
    if (model) {
      root = model.root;
      model.update(0.016, { state: 'idle', moving: false, windup: 0, death: 0 });
    } else {
      root = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.4, 1.2), new THREE.MeshStandardMaterial({ color: new THREE.Color(cfg.color) }));
      root.position.y = 1.2;
    }
    root.rotation.y = 0.5;
    scene.add(root);
    const cam = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
    cam.position.set(2.6, 2.6, 5.4);
    cam.lookAt(0, 1.5, 0);
    renderer.render(scene, cam);
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(gl, 0, 0);
    }
    model?.dispose();
    if (!model) {
      const m = root as THREE.Mesh;
      m.geometry.dispose();
      (m.material as THREE.Material).dispose();
    }
    return true;
  } catch {
    return false;
  } finally {
    renderer?.dispose();
    renderer?.forceContextLoss();
  }
}
