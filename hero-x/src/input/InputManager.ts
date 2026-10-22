import { GameConfig } from '../game/GameConfig';

/** 이동 축: x(왼쪽 -1 / 오른쪽 +1), z(위쪽 -1 / 아래쪽 +1) */
export interface MoveAxis {
  x: number;
  z: number;
}

/** 마우스 위치 (화면 정규화 좌표 -1~1, has: 한 번이라도 움직였는지) */
export interface PointerState {
  x: number;
  y: number;
  has: boolean;
}

/** 입력창에 타이핑 중인지 확인 (그럴 때는 게임 키 입력을 무시) */
function isTypingTarget(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el || !el.tagName) return false;
  const tag = el.tagName.toUpperCase();
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable === true;
}

/**
 * 키보드·마우스 입력 관리자
 * - 물리 키 코드(e.code)를 사용하므로 한/영 상태나 키보드 배열과 상관없이 W/A/S/D 위치가 그대로 동작한다.
 * - 마우스 버튼은 'Mouse0'(왼쪽), 'Mouse1'(가운데), 'Mouse2'(오른쪽) 코드로 키와 똑같이 다룬다.
 * - 키 설정은 GameConfig.controls 에서 바꾼다.
 * - 창이 포커스를 잃거나 탭이 숨겨지면 눌린 키를 모두 해제한다 (키가 눌린 채로 굳는 현상 방지).
 */
export class InputManager {
  private readonly pressed = new Set<string>();
  private readonly pressHandlers = new Map<string, Array<() => void>>();
  private readonly pointer: PointerState = { x: 0, y: 0, has: false };
  private cleanup: Array<() => void> = [];

  /** 브라우저 이벤트 연결. canvas 를 주면 마우스 위치를 그 영역 기준으로 계산한다. */
  attach(target: Window = window, canvas?: HTMLElement): void {
    const onKeyDown = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return;
      if (!e.repeat) this.press(e.code);
      // 게임에서 쓰는 키는 브라우저 기본 동작(페이지 스크롤 등)을 막는다
      if (this.isGameKey(e.code)) e.preventDefault();
    };
    const onKeyUp = (e: KeyboardEvent) => {
      this.pressed.delete(e.code);
    };
    const release = () => this.pressed.clear();
    const onVisibility = () => {
      if (document.hidden) release();
    };
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas ? canvas.getBoundingClientRect() : { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
      this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      this.pointer.has = true;
    };
    const onPointerDown = (e: PointerEvent) => {
      if (isTypingTarget(e.target)) return;
      onPointerMove(e);
      this.press(`Mouse${e.button}`);
    };
    const onPointerUp = (e: PointerEvent) => {
      this.pressed.delete(`Mouse${e.button}`);
    };
    const onContextMenu = (e: Event) => e.preventDefault();

    target.addEventListener('keydown', onKeyDown);
    target.addEventListener('keyup', onKeyUp);
    target.addEventListener('blur', release);
    target.addEventListener('pointermove', onPointerMove);
    target.addEventListener('pointerdown', onPointerDown);
    target.addEventListener('pointerup', onPointerUp);
    target.addEventListener('pointercancel', onPointerUp);
    document.addEventListener('visibilitychange', onVisibility);
    canvas?.addEventListener('contextmenu', onContextMenu);
    this.cleanup = [
      () => target.removeEventListener('keydown', onKeyDown),
      () => target.removeEventListener('keyup', onKeyUp),
      () => target.removeEventListener('blur', release),
      () => target.removeEventListener('pointermove', onPointerMove),
      () => target.removeEventListener('pointerdown', onPointerDown),
      () => target.removeEventListener('pointerup', onPointerUp),
      () => target.removeEventListener('pointercancel', onPointerUp),
      () => document.removeEventListener('visibilitychange', onVisibility),
      () => canvas?.removeEventListener('contextmenu', onContextMenu),
    ];
  }

  /** 이벤트 연결 해제 */
  detach(): void {
    this.cleanup.forEach((fn) => fn());
    this.cleanup = [];
    this.pressed.clear();
  }

  /** 특정 키가 '눌리는 순간'에 실행할 함수 등록 (예: H 키로 안내 화면 열기/닫기) */
  onPress(codes: string[], fn: () => void): void {
    for (const code of codes) {
      const list = this.pressHandlers.get(code) ?? [];
      list.push(fn);
      this.pressHandlers.set(code, list);
    }
  }

  /** 키가 눌려 있는지 */
  isDown(code: string): boolean {
    return this.pressed.has(code);
  }

  /** 설정 목록 중 하나라도 눌려 있는지 (예: GameConfig.controls.attackMelee) */
  isActionDown(codes: string[]): boolean {
    return codes.some((c) => this.pressed.has(c));
  }

  /** 마우스 위치 (화면 정규화 좌표) */
  getPointer(): PointerState {
    return this.pointer;
  }

  /** 지금 눌려 있는 모든 키·버튼 코드 (디버그용) */
  getPressedCodes(): string[] {
    return [...this.pressed];
  }

  /** 현재 이동 축 (-1, 0, 1 조합). 대각선 정규화는 movement.ts 에서 처리한다. */
  getMoveAxis(): MoveAxis {
    const c = GameConfig.controls;
    return {
      x: (this.isActionDown(c.right) ? 1 : 0) - (this.isActionDown(c.left) ? 1 : 0),
      z: (this.isActionDown(c.down) ? 1 : 0) - (this.isActionDown(c.up) ? 1 : 0),
    };
  }

  private press(code: string): void {
    this.pressed.add(code);
    this.pressHandlers.get(code)?.forEach((fn) => fn());
  }

  private isGameKey(code: string): boolean {
    return Object.values(GameConfig.controls).some((codes) => codes.includes(code));
  }
}
