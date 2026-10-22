import { GameConfig } from '../game/GameConfig';

/** 이동 축: x(왼쪽 -1 / 오른쪽 +1), z(위쪽 -1 / 아래쪽 +1) */
export interface MoveAxis {
  x: number;
  z: number;
}

/** 입력창에 타이핑 중인지 확인 (그럴 때는 게임 키 입력을 무시) */
function isTypingTarget(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el || !el.tagName) return false;
  const tag = el.tagName.toUpperCase();
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable === true;
}

/**
 * 키보드 입력 관리자
 * - 물리 키 코드(e.code)를 사용하므로 한/영 상태나 키보드 배열과 상관없이 W/A/S/D 위치가 그대로 동작한다.
 * - 키 설정은 GameConfig.controls 에서 바꾼다.
 * - 창이 포커스를 잃거나 탭이 숨겨지면 눌린 키를 모두 해제한다 (키가 눌린 채로 굳는 현상 방지).
 */
export class InputManager {
  private readonly pressed = new Set<string>();
  private readonly pressHandlers = new Map<string, Array<() => void>>();
  private cleanup: Array<() => void> = [];

  /** 브라우저 이벤트 연결 */
  attach(target: Window = window): void {
    const onKeyDown = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return;
      if (!e.repeat) {
        this.pressed.add(e.code);
        this.pressHandlers.get(e.code)?.forEach((fn) => fn());
      }
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

    target.addEventListener('keydown', onKeyDown);
    target.addEventListener('keyup', onKeyUp);
    target.addEventListener('blur', release);
    document.addEventListener('visibilitychange', onVisibility);
    this.cleanup = [
      () => target.removeEventListener('keydown', onKeyDown),
      () => target.removeEventListener('keyup', onKeyUp),
      () => target.removeEventListener('blur', release),
      () => document.removeEventListener('visibilitychange', onVisibility),
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

  private anyDown(codes: string[]): boolean {
    return codes.some((c) => this.pressed.has(c));
  }

  private isGameKey(code: string): boolean {
    const c = GameConfig.controls;
    return [...c.up, ...c.down, ...c.left, ...c.right, ...c.toggleGuide].includes(code);
  }

  /** 현재 이동 축 (-1, 0, 1 조합). 대각선 정규화는 movement.ts 에서 처리한다. */
  getMoveAxis(): MoveAxis {
    const c = GameConfig.controls;
    return {
      x: (this.anyDown(c.right) ? 1 : 0) - (this.anyDown(c.left) ? 1 : 0),
      z: (this.anyDown(c.down) ? 1 : 0) - (this.anyDown(c.up) ? 1 : 0),
    };
  }
}
