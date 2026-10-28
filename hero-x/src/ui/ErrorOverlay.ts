/**
 * 오류 표시 상자
 * - 실행 중 잡히지 않은 오류가 나면 화면 위쪽에 한국어 안내와 함께 보여준다.
 * - 개발자 도구(F12) 콘솔을 보지 않아도 무슨 문제인지 알 수 있게 하기 위한 장치다.
 */
export function installErrorOverlay(root: HTMLElement): void {
  let box: HTMLDivElement | null = null;

  const show = (title: string, detail: string) => {
    if (!box) {
      box = document.createElement('div');
      box.className = 'error-box';
      root.appendChild(box);
    }
    box.innerHTML = `<b>${title}</b>\n${detail}\n\n자세한 내용은 F12 → Console 탭, 해결 방법은 TROUBLESHOOTING.md 를 확인하세요.`;
  };

  window.addEventListener('error', (e) => {
    show('게임 실행 중 오류가 발생했습니다.', String(e.message || e.error || '알 수 없는 오류'));
  });
  window.addEventListener('unhandledrejection', (e) => {
    const reason = (e as PromiseRejectionEvent).reason;
    show('게임 실행 중 오류가 발생했습니다.', String(reason?.message ?? reason ?? '알 수 없는 오류'));
  });
}

/** 게임을 시작조차 못할 때(WebGL 불가 등) 보여주는 안내 */
export function showFatalMessage(root: HTMLElement, message: string): void {
  const box = document.createElement('div');
  box.className = 'error-box';
  box.innerHTML = `<b>게임을 시작할 수 없습니다.</b>\n${message}`;
  root.appendChild(box);
}
