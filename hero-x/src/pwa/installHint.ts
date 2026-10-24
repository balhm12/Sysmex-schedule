/**
 * 설치 안내 판단 (순수 함수, 테스트 대상)
 * - 'standalone': 이미 앱으로 실행 중 → 안내 없음
 * - 'prompt': 브라우저가 설치 프롬프트(beforeinstallprompt)를 지원 → '앱으로 설치' 버튼
 * - 'ios': iPhone/iPad Safari → '공유 → 홈 화면에 추가' 안내
 * - 'none': 그 밖 (데스크톱 등 — 버튼 숨김)
 */
export type InstallHint = 'standalone' | 'prompt' | 'ios' | 'none';

export function installHintFor(userAgent: string, standalone: boolean, hasPrompt: boolean): InstallHint {
  if (standalone) return 'standalone';
  if (hasPrompt) return 'prompt';
  const ua = userAgent.toLowerCase();
  const apple = /iphone|ipad|ipod/.test(ua) || (/macintosh/.test(ua) && /mobile/.test(ua));
  const safari = /safari/.test(ua) && !/crios|fxios|chrome|android/.test(ua);
  if (apple && safari) return 'ios';
  return 'none';
}
