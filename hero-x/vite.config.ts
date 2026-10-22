import { defineConfig } from 'vitest/config';

/**
 * HERO X 개발 서버 / 빌드 / 테스트 설정
 * - base: './' → 어떤 폴더에 올려도(예: GitHub Pages, 로컬 파일 서버) 동작하도록 상대 경로 사용
 * - server.port: 개발 서버 주소는 http://localhost:5173
 * - test: 단위 테스트는 tests/ 폴더의 *.test.ts 파일 (브라우저 없이 Node에서 실행)
 */
export default defineConfig({
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
