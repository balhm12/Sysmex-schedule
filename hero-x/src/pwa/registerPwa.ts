import { Logger } from '../utils/Logger';
import { installHintFor, type InstallHint } from './installHint';

/**
 * 앱 설치(PWA) 연결
 * - 서비스 워커(sw.js) 등록 → 두 번째부터 오프라인에서도 열린다. 새 버전이 적용되면 onUpdated 로 알린다.
 * - 설치 프롬프트(beforeinstallprompt)를 붙잡아 두었다가 메뉴의 '앱으로 설치' 버튼에서 띄운다.
 * - iOS Safari 는 프롬프트가 없어 '공유 → 홈 화면에 추가' 안내만 보여 준다.
 */
interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export class PwaInstaller {
  private deferred: BeforeInstallPromptEvent | null = null;
  private readonly listeners = new Set<() => void>();
  /** 새 버전이 설치됐을 때 (다음에 열면 적용) */
  onUpdated: (() => void) | null = null;

  constructor() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferred = e as BeforeInstallPromptEvent;
      this.emit();
    });
    window.addEventListener('appinstalled', () => {
      this.deferred = null;
      Logger.info('앱으로 설치되었습니다.');
      this.emit();
    });
  }

  /** 현재 안내 종류 */
  get hint(): InstallHint {
    const standalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as unknown as { standalone?: boolean }).standalone === true;
    return installHintFor(navigator.userAgent, standalone, this.deferred !== null);
  }

  /** 안내 종류가 바뀔 때 알림 받기 */
  onChange(fn: () => void): void {
    this.listeners.add(fn);
  }

  private emit(): void {
    for (const fn of this.listeners) fn();
  }

  /** 설치 프롬프트 띄우기. 결과: 수락 여부 (프롬프트가 없으면 null) */
  async promptInstall(): Promise<boolean | null> {
    if (!this.deferred) return null;
    const ev = this.deferred;
    this.deferred = null;
    await ev.prompt();
    const choice = await ev.userChoice;
    this.emit();
    return choice.outcome === 'accepted';
  }

  /** 서비스 워커 등록 (지원 안 하면 조용히 넘어감) */
  registerServiceWorker(): void {
    if (!('serviceWorker' in navigator)) return;
    // 개발 서버에서는 등록하지 않는다: 같은 주소(/src/style.css)가 모듈(JS)과 스타일(CSS)로 다르게 서빙돼 캐시가 섞인다
    if (import.meta.env.DEV) {
      Logger.info('개발 모드: 서비스 워커 등록을 건너뜁니다 (빌드 결과에서만 동작).');
      return;
    }
    const url = `${import.meta.env.BASE_URL}sw.js`;
    navigator.serviceWorker
      .register(url)
      .then((reg) => {
        Logger.info(`서비스 워커 등록: ${reg.scope}`);
        reg.addEventListener('updatefound', () => {
          const sw = reg.installing;
          if (!sw) return;
          sw.addEventListener('statechange', () => {
            if (sw.state === 'installed' && navigator.serviceWorker.controller) this.onUpdated?.();
          });
        });
      })
      .catch((err) => Logger.warn('서비스 워커를 등록하지 못했습니다 (오프라인 실행 불가, 게임은 그대로 동작).', err));
  }
}
