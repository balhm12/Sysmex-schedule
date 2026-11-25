/**
 * 진동(햅틱) 피드백
 * - Android Chrome 등 navigator.vibrate 를 지원하는 기기에서만 동작한다. iOS Safari 는 지원하지 않아 조용히 무시된다.
 * - 켜고 끄기는 사용자 설정(haptics)에서. 호출하는 쪽(Game)이 설정을 확인한다.
 */
export function vibrate(pattern: number | number[]): boolean {
  if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function') return false;
  try {
    return navigator.vibrate(pattern);
  } catch {
    return false;
  }
}
