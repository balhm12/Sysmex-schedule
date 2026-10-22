# 변경 내역

형식: 날짜 · 버전 · 변경 내용 · 수정 파일 · 테스트 결과 · 알려진 문제

## 2026-10-22 · v0.2.0-a.1 · 2단계 전투 (첫 묶음: 돌진형 적 + 근접 공격)

### 변경 내용
- 돌진 로봇(`rusher`) 6마리 배치. 감지 → 추적 → 공격 예고(눈이 붉어짐) → 공격 → 재사용 대기 상태 AI
- 체력 시스템(`Health`): 플레이어 100, 피격 무적 0.6초, 밀려남. 적도 같은 체력 클래스 사용
- 마우스 방향 근접 공격(왼쪽 버튼 또는 J): 정면 110도·거리 1.9 부채꼴, 밀침, 휘두르기 부채꼴 효과와 파편
- 적 처치 연출(작아지며 사라짐), 처치 수·점수
- HUD(체력바, 남은 적, 처치, 점수, 피격 번쩍임), 결과 화면(쓰러짐 / 모든 적 처치)과 다시 시작(버튼 또는 R)
- 설정 추가: `player.maxHp` 등, `combat.melee`, `enemies.types/spawns`, 허용 범위(`ENEMY_TYPE_LIMITS` 포함) 보정
- 디버그 상태에 입력 정보(마우스 위치, 눌린 키) 추가

### 수정 파일
- 신규: `src/combat/{Health,melee,Effects,CombatSystem}.ts`, `src/enemies/{EnemyAI,EnemyModels,Enemy,EnemySpawner}.ts`, `src/ui/{HUD,ResultUI}.ts`
- 신규 테스트: `tests/{health,enemyAI,melee}.test.ts`
- 수정: `src/game/{GameConfig,Game}.ts`, `src/input/InputManager.ts`, `src/player/{Player,PlayerController}.ts`, `src/player/models/PlaceholderModel.ts`, `src/ui/ControlsGuide.ts`, `src/style.css`, `tests/config.test.ts`, `package.json`(버전)

### 테스트 결과 (실제 실행)
- `npm run typecheck`: 통과
- `npm test`: 38개 통과 (이동·충돌 12, 설정 8, 체력 6, 적 AI 6, 근접 판정 6)
- `npm run build`: 성공 (dist/ 약 492KB JS, gzip 129KB)
- 브라우저 자동 실행 검증 (헤드리스 Chromium, 개발 서버): 적 6마리 등장 → 적 옆에서 대기하면 예고 후 피격되어 체력 감소 → 가장 가까운 적 쪽으로 마우스를 두고 공격 버튼을 누르면 적 체력 감소·처치 → 방치하면 쓰러져 결과 화면 → 다시 시작으로 체력 100·적 6마리 복구. 빌드 미리보기도 오류 없이 로드. 콘솔 오류·경고 없음.

### 알려진 문제
- 마우스가 가리키는 쪽으로만 공격하므로 등 뒤의 적은 맞지 않는다 (의도된 동작, 조작 요령은 GAME_GUIDE 참고).
- 원거리 공격·원거리형·방어형 적은 다음 묶음(2단계-b, c)에서 추가.

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
