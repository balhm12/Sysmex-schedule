import { describe, expect, it } from 'vitest';
import { installHintFor } from '../src/pwa/installHint';

const IOS = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';
const IOS_CHROME = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/118.0 Mobile/15E148 Safari/604.1';
const ANDROID = 'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0 Mobile Safari/537.36';
const DESKTOP = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0 Safari/537.36';

describe('앱 설치 안내 판단 (installHintFor)', () => {
  it('이미 앱으로 실행 중이면 안내 없음', () => {
    expect(installHintFor(ANDROID, true, true)).toBe('standalone');
    expect(installHintFor(IOS, true, false)).toBe('standalone');
  });
  it('설치 프롬프트가 있으면(안드로이드 Chrome·데스크톱 Chrome/Edge) 버튼', () => {
    expect(installHintFor(ANDROID, false, true)).toBe('prompt');
    expect(installHintFor(DESKTOP, false, true)).toBe('prompt');
  });
  it('iPhone Safari 는 홈 화면 추가 안내, iPhone 의 Chrome 과 데스크톱은 숨김', () => {
    expect(installHintFor(IOS, false, false)).toBe('ios');
    expect(installHintFor(IOS_CHROME, false, false)).toBe('none');
    expect(installHintFor(DESKTOP, false, false)).toBe('none');
  });
});
