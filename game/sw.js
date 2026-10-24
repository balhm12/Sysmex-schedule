/*
 * HERO X 서비스 워커 (앱처럼 설치·오프라인 실행)
 * - 빌드 때 vite 플러그인이 1.31.0 을 package.json 버전으로 바꿔 dist/sw.js 로 내보낸다 (개발 서버에서는 등록하지 않음).
 * - 캐시 전략: index.html(이동 요청)은 네트워크 우선(새 버전 바로), 그 밖의 같은 출처 파일(JS·CSS·모델·소리·아이콘)은
 *   캐시 우선 + 뒤에서 갱신. 파일 이름에 해시가 붙으므로 새 빌드는 새 항목으로 들어가고, 옛 버전 캐시는 activate 때 지운다.
 */
const VERSION = '1.31.0';
const CACHE = `hero-x-${VERSION}`;
const PRECACHE = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((c) => c.addAll(PRECACHE).catch(() => undefined))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('hero-x-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  // 페이지 이동: 네트워크 우선, 실패하면(오프라인) 캐시의 index.html
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put('./index.html', copy)).catch(() => undefined);
          return res;
        })
        .catch(() => caches.match('./index.html').then((hit) => hit || caches.match('./'))),
    );
    return;
  }
  // 그 밖: 캐시 우선, 뒤에서 갱신 (stale-while-revalidate)
  event.respondWith(
    caches.open(CACHE).then((c) =>
      c.match(req).then((hit) => {
        const update = fetch(req)
          .then((res) => {
            if (res && res.status === 200) c.put(req, res.clone()).catch(() => undefined);
            return res;
          })
          .catch(() => hit);
        return hit || update;
      }),
    ),
  );
});
