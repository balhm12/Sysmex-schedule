import { GameConfig } from '../game/GameConfig';
import type { InputManager } from './InputManager';

/** 포인터 캡처: 손가락이 버튼 밖으로 나가도 up 이벤트를 받기 위해. 지원하지 않는 환경에서는 조용히 넘어간다 */
function capture(el: Element, pointerId: number): void {
  try {
    el.setPointerCapture(pointerId);
  } catch {
    /* 무시 */
  }
}

/**
 * 터치 조작 (휴대폰·태블릿)
 * - 왼쪽: 가상 조이스틱(이동). 오른쪽: 근접·원거리·점프 버튼, 상자 앞에서만 보이는 상호작용 버튼, 위쪽에 메뉴·장비 버튼.
 * - 버튼은 GameConfig.controls 의 첫 번째 키 코드를 InputManager 에 '가상으로' 누른다. 그래서 키 설정을 바꿔도 같이 동작한다.
 * - 조준은 Game 이 '가까운 적 자동 조준'으로 처리한다 (터치로 마우스 방향 조준은 불편).
 * - 손가락마다 pointerId 를 따로 추적해 조이스틱을 잡은 채 버튼을 눌러도 된다.
 */
export class TouchControls {
  private readonly el: HTMLDivElement;
  private readonly stick: HTMLDivElement;
  private readonly knob: HTMLDivElement;
  private readonly interactBtn: HTMLButtonElement;
  private stickPointer: number | null = null;
  private stickCenter = { x: 0, y: 0 };
  private readonly radius = 56;

  constructor(parent: HTMLElement, private readonly input: InputManager, onMenu: () => void, onInventory: () => void) {
    const c = GameConfig.controls;
    this.el = document.createElement('div');
    this.el.className = 'touch';
    this.el.hidden = true;
    this.el.innerHTML = `
      <div class="touch-stick" id="touch-stick" aria-label="이동 조이스틱"><div class="touch-knob"></div></div>
      <div class="touch-buttons">
        <button type="button" class="touch-btn touch-melee" data-code="${c.attackMelee[1] ?? c.attackMelee[0]}" aria-label="근접 공격">근접</button>
        <button type="button" class="touch-btn touch-ranged" data-code="${c.attackRanged[1] ?? c.attackRanged[0]}" aria-label="원거리 공격">원거리</button>
        <button type="button" class="touch-btn touch-jump" data-code="${c.jump[0]}" aria-label="점프">점프</button>
        <button type="button" class="touch-btn touch-interact" id="touch-interact" data-code="${c.interact[0]}" aria-label="상자 열기" hidden>열기</button>
      </div>
      <div class="rotate-hint">휴대폰을 가로로 돌리면 더 넓게 보입니다</div>
      <div class="touch-top">
        <button type="button" class="touch-small" id="touch-inventory" aria-label="장비">장비</button>
        <button type="button" class="touch-small" id="touch-menu" aria-label="메뉴">메뉴</button>
      </div>`;
    parent.appendChild(this.el);
    this.stick = this.el.querySelector('#touch-stick') as HTMLDivElement;
    this.knob = this.stick.querySelector('.touch-knob') as HTMLDivElement;
    this.interactBtn = this.el.querySelector('#touch-interact') as HTMLButtonElement;

    // 조이스틱: 누른 자리를 중심으로, 손가락 위치에 따라 축(-1~1)을 계산
    this.stick.addEventListener('pointerdown', (e) => {
      if (this.stickPointer !== null) return;
      e.preventDefault();
      this.stickPointer = e.pointerId;
      capture(this.stick, e.pointerId);
      const r = this.stick.getBoundingClientRect();
      this.stickCenter = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      this.moveStick(e.clientX, e.clientY);
    });
    this.stick.addEventListener('pointermove', (e) => {
      if (e.pointerId !== this.stickPointer) return;
      e.preventDefault();
      this.moveStick(e.clientX, e.clientY);
    });
    const endStick = (e: PointerEvent) => {
      if (e.pointerId !== this.stickPointer) return;
      this.stickPointer = null;
      this.knob.style.transform = 'translate(0px, 0px)';
      this.input.setVirtualAxis(0, 0);
    };
    this.stick.addEventListener('pointerup', endStick);
    this.stick.addEventListener('pointercancel', endStick);

    // 동작 버튼: 누르는 동안 가상 키를 누른 상태로 둔다 (공격은 누르고 있으면 연속)
    this.el.querySelectorAll<HTMLButtonElement>('.touch-btn').forEach((btn) => {
      const code = btn.dataset.code ?? '';
      const down = (e: PointerEvent) => {
        e.preventDefault();
        capture(btn, e.pointerId);
        btn.classList.add('down');
        this.input.pressVirtual(code);
      };
      const up = () => {
        btn.classList.remove('down');
        this.input.releaseVirtual(code);
      };
      btn.addEventListener('pointerdown', down);
      btn.addEventListener('pointerup', up);
      btn.addEventListener('pointercancel', up);
      btn.addEventListener('contextmenu', (e) => e.preventDefault());
    });
    this.el.querySelector('#touch-menu')?.addEventListener('click', onMenu);
    this.el.querySelector('#touch-inventory')?.addEventListener('click', onInventory);
    this.el.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  private moveStick(x: number, y: number): void {
    let dx = x - this.stickCenter.x;
    let dy = y - this.stickCenter.y;
    const len = Math.hypot(dx, dy);
    if (len > this.radius) {
      dx = (dx / len) * this.radius;
      dy = (dy / len) * this.radius;
    }
    this.knob.style.transform = `translate(${dx}px, ${dy}px)`;
    // 데드존 안쪽은 정지
    const dead = 0.15;
    const ax = Math.abs(dx / this.radius) < dead ? 0 : dx / this.radius;
    const az = Math.abs(dy / this.radius) < dead ? 0 : dy / this.radius;
    this.input.setVirtualAxis(ax, az);
  }

  get visible(): boolean {
    return !this.el.hidden;
  }

  /** 상호작용 버튼 표시 (상자 근처일 때만) */
  setInteract(visible: boolean): void {
    this.interactBtn.hidden = !visible;
  }

  show(): void {
    this.el.hidden = false;
  }

  hide(): void {
    this.el.hidden = true;
    this.stickPointer = null;
    this.knob.style.transform = 'translate(0px, 0px)';
    this.input.setVirtualAxis(0, 0);
    this.el.querySelectorAll<HTMLButtonElement>('.touch-btn').forEach((btn) => {
      btn.classList.remove('down');
      this.input.releaseVirtual(btn.dataset.code ?? '');
    });
  }
}
