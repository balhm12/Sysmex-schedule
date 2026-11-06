// @ts-expect-error 빌드 설정 전용 Node 모듈 (프로젝트에 @types/node 를 두지 않음)
import { readFileSync } from 'node:fs';
// @ts-expect-error 위와 같음
import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vitest/config';

/**
 * 서비스 워커 플러그인: src/pwa/sw.js 의 __VERSION__ 을 package.json 버전으로 바꿔
 * 빌드 때 dist/sw.js 로 내보낸다 (캐시 이름이 버전마다 달라져 옛 캐시가 정리됨). 개발 서버에서는 서비스 워커를 쓰지 않는다.
 */
function serviceWorkerPlugin(): Plugin {
  const render = () => {
    const pkg = JSON.parse(readFileSync(resolve('package.json'), 'utf8') as string) as { version: string };
    return (readFileSync(resolve('src/pwa/sw.js'), 'utf8') as string).replace(/__VERSION__/g, pkg.version);
  };
  return {
    name: 'hero-x-service-worker',
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'sw.js', source: render() });
    },
  };
}

/**
 * HERO X 개발 서버 / 빌드 / 테스트 설정
 * - base: './' → 어떤 폴더에 올려도(예: GitHub Pages, 로컬 파일 서버) 동작하도록 상대 경로 사용
 * - server.port: 개발 서버 주소는 http://localhost:5173
 * - test: 단위 테스트는 tests/ 폴더의 *.test.ts 파일 (브라우저 없이 Node에서 실행)
 */
export default defineConfig({
  plugins: [serviceWorkerPlugin()],
  base: './',
  server: { port: 5173, open: false },
  preview: { port: 4173 },
  build: {
    target: 'es2020',
    sourcemap: false,
    // three.js 하나만으로도 500KB가 넘으므로 경고 기준을 올려 불필요한 경고를 막는다
    chunkSizeWarningLimit: 1500,
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
});
