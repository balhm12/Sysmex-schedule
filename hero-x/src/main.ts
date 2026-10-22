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
