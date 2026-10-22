# 변경 내역

형식: 날짜 · 버전 · 변경 내용 · 수정 파일 · 테스트 결과 · 알려진 문제

## 2026-10-22 · v0.1.0 · 1단계 기반 구축

### 변경 내용
- Three.js + TypeScript + Vite 프로젝트 생성
- 3D 바닥(코드로 그린 체크무늬), 반구광 + 그림자 태양광, 경계 벽, 설정 기반 장애물 10개
- 단순 도형으로 만든 임시 플레이어 캐릭터 (걷기 동작 포함)
- WASD / 방향키 이동, 대각선 정규화, 장애물·경계 충돌
- 3인칭 추적 카메라 (부드러운 추적, 고정 시점)
- 조작 안내 화면(시작하기 버튼, H 키 토글), 하단 FPS 표시, 화면 오류 표시
- 설정 파일 `GameConfig.ts` 와 허용 범위 보정 `sanitizeGameConfig()`
- 문서 5종: CLAUDE.md, README.md, GAME_GUIDE.md, CHANGELOG.md, TROUBLESHOOTING.md

### 수정 파일
- 신규: `index.html`, `package.json`, `tsconfig.json`, `vite.config.ts`, `.gitignore`
- 신규: `src/main.ts`, `src/style.css`, `src/game/{Game,GameConfig,CameraController}.ts`, `src/input/InputManager.ts`, `src/player/{Player,PlayerController,movement}.ts`, `src/player/models/PlaceholderModel.ts`, `src/dungeon/Dungeon01.ts`, `src/ui/{ControlsGuide,ErrorOverlay}.ts`, `src/utils/Logger.ts`
- 신규: `tests/movement.test.ts`, `tests/config.test.ts`

### 테스트 결과 (실제 실행)
- `npm run typecheck`: 통과
- `npm test`: 17개 통과 (이동 방향·충돌·영역 제한·각도·설정 보정)
- `npm run build`: 성공 (dist/ 약 471KB JS, gzip 122KB)
- 브라우저 자동 실행 검증 (헤드리스 Chromium): 개발 서버(5173)와 빌드 미리보기(4173) 모두에서 안내 화면 표시 → 시작 → W 로 -Z 이동, D 로 +X 이동과 방향 전환, 카메라 추적, H 토글, 상자 충돌 정지 확인. 콘솔 오류·경고 없음.

### 알려진 문제
- 마우스 시점 조작은 아직 없음 (고정 시점). 2단계 전투에서 공격 방향 조작과 함께 검토.
- 소프트웨어 렌더링(GPU 없는 환경)에서는 그림자 때문에 프레임이 낮을 수 있음 → `GameConfig.graphics.shadows = false` 로 완화.
