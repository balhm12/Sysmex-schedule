/**
 * 기기 판별 (브라우저가 없는 테스트 환경에서도 안전하게 동작)
 * - 터치 기기: 주 입력이 손가락(pointer: coarse)이거나 터치 이벤트를 지원하는 기기. 휴대폰·태블릿.
 * - 판별 결과는 '기본값'에만 쓰고, 실제 동작은 설정 화면에서 언제든 바꿀 수 있게 한다.
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  try {
    if (window.matchMedia?.('(pointer: coarse)').matches) return true;
  } catch {
    /* 무시 */
  }
  return navigator.maxTouchPoints > 0 && /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
}

/** 세로 방향인지 (가로 모드 안내용) */
export function isPortrait(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerHeight > window.innerWidth;
}
