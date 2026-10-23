import './style.css';
import { Game } from './game/Game';
import { installErrorOverlay, showFatalMessage } from './ui/ErrorOverlay';
import { Logger } from './utils/Logger';

/**
 * 진입점: HTML 요소를 찾아 게임을 만들고 시작한다.
 * - 개발 모드(npm run dev)이거나 주소에 ?debug 가 붙으면 window.__heroX 로 게임 객체를 열어 둔다 (자동 테스트용).
 */
const canvas = document.getElementById('game-canvas') as HTMLCanvasElement | null;
const uiRoot = document.getElementById('ui-root');

if (!canvas || !uiRoot) {
  throw new Error('index.html 에 #game-canvas 또는 #ui-root 요소가 없습니다.');
}

installErrorOverlay(uiRoot);
preventBrowserZoom();

try {
  const game = new Game(canvas, uiRoot);
  game.start();

  const debug = import.meta.env.DEV || new URLSearchParams(location.search).has('debug');
  if (debug) {
    (window as unknown as { __heroX: Game }).__heroX = game;
  }
} catch (err) {
  Logger.error('게임을 시작하지 못했습니다.', err);
  showFatalMessage(
    uiRoot,
    '이 브라우저에서 3D 화면(WebGL)을 켤 수 없거나 초기화에 실패했습니다.\n' +
      '최신 Chrome 또는 Edge 로 열어 보고, 그래도 안 되면 TROUBLESHOOTING.md 를 참고하세요.\n' +
      `오류: ${err instanceof Error ? err.message : String(err)}`,
  );
}

/**
 * 휴대폰 브라우저의 화면 확대 방지
 * - iOS Safari 는 viewport 의 user-scalable=no 를 무시하고 두 손가락 확대·더블탭 확대를 허용한다.
 *   게임 중 실수로 확대되면 화면이 잘리므로 두 손가락 터치 이동과 gesture 이벤트, 빠른 연속 탭을 막는다.
 * - 설정·장비 창의 한 손가락 스크롤은 그대로 둔다.
 */
function preventBrowserZoom(): void {
  const block = (e: Event) => e.preventDefault();
  document.addEventListener('gesturestart', block, { passive: false });
  document.addEventListener('gesturechange', block, { passive: false });
  document.addEventListener('gestureend', block, { passive: false });
  document.addEventListener(
    'touchmove',
    (e) => {
      if (e.touches.length > 1) e.preventDefault();
    },
    { passive: false },
  );
  // 더블탭 확대: 같은 자리(30px 안)를 300ms 안에 두 번 탭하면 두 번째 탭을 막는다.
  // (다른 버튼을 빠르게 연달아 누르는 것은 막지 않는다 — touchend 를 막으면 그 탭의 click 이 사라지기 때문)
  let lastTap = 0;
  let lastX = 0;
  let lastY = 0;
  document.addEventListener(
    'touchend',
    (e) => {
      const t = e.changedTouches[0];
      const now = Date.now();
      if (t && now - lastTap < 300 && Math.hypot(t.clientX - lastX, t.clientY - lastY) < 30) e.preventDefault();
      lastTap = now;
      if (t) {
        lastX = t.clientX;
        lastY = t.clientY;
      }
    },
    { passive: false },
  );
}
