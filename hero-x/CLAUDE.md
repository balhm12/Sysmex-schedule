# HERO X — Claude Code 작업 규칙

이 문서는 Claude Code가 이 프로젝트에서 작업할 때 항상 먼저 읽고 따라야 하는 규칙이다.
사용자는 전문 개발자가 아니다. 설명, 보고, 주석, 문서는 모두 한국어로 쓴다.

## 1. 프로젝트 목표

- 게임명: **HERO X** (부제: 모험의 던전). 이름은 `src/game/GameConfig.ts` 의 `meta` 에서 바꾼다.
- 장르: 3인칭 3D 액션 RPG. Minecraft Dungeons 의 진행 방식을 참고하되 캐릭터·맵·아이템·음악·텍스처는 독자 제작 또는 적법한 에셋만 사용한다.
- 실행 환경: Windows PC 웹 브라우저(Chrome/Edge). 기본 게임은 외부 API·유료 서비스 없이 실행된다.
- 최우선 원칙: **실제로 실행되는 게임**을 단계적으로 완성한다. 그래픽 품질보다 안정성·유지보수성이 먼저다.
- 현재 상태: **1단계(기반 구축) 완료, 2단계(전투) 진행 중** — **2단계(전투) 완료 (v0.2.0)** — 근접·원거리 공격, 적 3종(돌진·포격·철벽), AI, 체력·피해, 점프, 난이도 선택, 피해 숫자. 다음: 3단계 아이템과 성장(드롭, 경험치·레벨, 장비 인벤토리·교체, 능력치 반영).

## 2. 기술 스택

| 항목 | 선택 | 비고 |
| --- | --- | --- |
| 언어 | TypeScript 5.6 (strict) | 타입 오류는 빌드 실패로 취급 |
| 3D | three 0.160.0 | 버전 고정. 올릴 때는 변경점 확인 후 별도 작업 |
| 빌드·개발 서버 | Vite 5 | `npm run dev` / `npm run build` |
| 테스트 | Vitest 2 | `tests/**/*.test.ts`, 브라우저 없이 실행 |
| 버전 관리 | Git | 작업 단위마다 커밋 |

새 라이브러리는 도입 이유와 유지관리 영향을 먼저 설명하고 꼭 필요할 때만 추가한다.

## 3. 폴더 구조

```
hero-x/
├─ index.html              진입 HTML (캔버스 + UI 루트)
├─ package.json            명령어와 의존성
├─ vite.config.ts          개발 서버·빌드·테스트 설정
├─ tsconfig.json           TypeScript 설정
├─ src/
│  ├─ main.ts              진입점: Game 생성·시작, 오류 표시 설치
│  ├─ style.css            UI 스타일 (외부 폰트·파일 없음)
│  ├─ game/
│  │  ├─ Game.ts           게임 본체: 렌더러·씬·루프, 시스템 연결
│  │  ├─ GameConfig.ts     ★ 설정 데이터 + 허용 범위(CONFIG_LIMITS) + 보정 함수
│  │  ├─ Difficulty.ts     난이도 배율 조회·저장(localStorage, 실패해도 동작)
│  │  └─ CameraController.ts  3인칭 추적 카메라
│  ├─ input/InputManager.ts   키보드·마우스 입력 (키 설정은 GameConfig.controls, 마우스는 'Mouse0' 등)
│  ├─ player/
│  │  ├─ Player.ts         플레이어 상태(위치·방향·체력·공격 동작), 모델 교체 setModel()
│  │  ├─ PlayerController.ts  입력 → 이동 → 충돌 → 위치 반영, 피격 밀림, 점프
│  │  ├─ movement.ts       이동·충돌 순수 함수 (테스트 대상)
│  │  └─ models/PlaceholderModel.ts  임시 캐릭터 모델 + PlayerModel 인터페이스
│  ├─ combat/
│  │  ├─ Health.ts         체력·무적·사망 (플레이어와 적 공용, 테스트 대상)
│  │  ├─ melee.ts          근접 공격 부채꼴 판정 순수 함수 (테스트 대상)
│  │  ├─ CombatSystem.ts   플레이어 근접·원거리 공격 (입력 → 조준 → 판정/발사 → 피해·효과)
│  │  ├─ Projectile.ts     투사체 시스템 (플레이어·적 공용, 장애물 충돌, 명중 콜백)
│  │  └─ Effects.ts        휘두르기 부채꼴·파편 효과 (풀 재사용)
│  ├─ enemies/
│  │  ├─ EnemyAI.ts        적 상태 기계 (idle/chase/windup/hurt/dead, 근접형·원거리형, 테스트 대상)
│  │  ├─ EnemyModels.ts    종류별 임시 모델 + EnemyModel 인터페이스
│  │  ├─ Enemy.ts          적 한 마리 (능력치·체력·AI·모델 연결, 이동·충돌)
│  │  └─ EnemySpawner.ts   설정 기반 배치·갱신·정리
│  ├─ dungeon/Dungeon01.ts 바닥·조명·벽·장애물 (CollisionWorld 구현)
│  ├─ ui/
│  │  ├─ ControlsGuide.ts  조작 안내 화면 + 하단 상태 표시
│  │  ├─ HUD.ts            체력바·남은 적·처치·점수·피격 번쩍임
│  │  ├─ DamageNumbers.ts  피해 숫자 (3D 좌표 → 화면 투영은 Game 이 함수로 제공)
│  │  ├─ ResultUI.ts       결과 화면(쓰러짐/승리)과 다시 시작
│  │  └─ ErrorOverlay.ts   화면 오류 표시
│  └─ utils/Logger.ts      [HERO X] 접두어 로그
└─ tests/                  단위 테스트 (movement, config, health, enemyAI, melee, difficulty)
```

앞으로 추가될 폴더(지시서 9장 기준): `combat/Projectile.ts`, `items/`, `save/`, `audio/`, `ui/SettingsUI.ts`, `ui/InventoryUI.ts` 등. 새 기능은 **새 파일**로 만들고 `Game.ts` 에서 연결한다.

시스템 간 연결 규칙: `Game.ts` 만 모든 시스템을 알고, 각 시스템은 필요한 정보를 **함수나 인터페이스로** 받는다. (예: `CombatSystem` 은 적 목록을 `() => Enemy[]` 로, 조준 지점을 `() => Vec2 | null` 로 받는다. `Enemy` 는 `CollisionWorld` 인터페이스만 안다.)

## 4. 코드 작성 규칙

1. 기능별로 파일을 분리한다. 한 파일에 여러 기능을 몰아넣지 않는다.
2. 자주 바꾸는 수치(속도, 체력, 공격력, 출현 수, 확률 등)는 `GameConfig.ts` 에만 둔다. 로직 파일은 값을 읽기만 한다.
3. 새 설정 항목을 추가하면 `CONFIG_LIMITS` 에 허용 범위도 함께 추가한다.
4. 시스템 간 직접 참조를 피한다. 필요한 정보는 인터페이스로 받는다. (예: `PlayerController` 는 `CollisionWorld` 인터페이스만 안다)
5. 플레이어 외형은 `PlayerModel` 인터페이스를 구현한 모델로 교체한다. 모델 정면은 +Z.
6. 주요 클래스·함수·분기에 한국어 주석을 쓴다.
7. 중복 코드를 만들지 않는다. 사용하지 않는 코드·라이브러리는 정리한다.
8. 오류 메시지는 원인을 알 수 있게 한국어로 쓴다. 치명적 오류는 `ErrorOverlay` 로 화면에 보인다.
9. 브라우저 없이 검증할 수 있는 계산 로직은 순수 함수로 분리해 `tests/` 에 테스트를 둔다.
10. 외부 폰트·이미지·API 를 쓰지 않는다 (오프라인 실행 보장). 텍스처는 코드로 그리거나 저장소 안의 라이선스 확인된 파일만 쓴다.

## 5. 실행·빌드·테스트 명령

| 명령 | 설명 |
| --- | --- |
| `npm install` | 최초 1회 (또는 package.json 변경 시) 라이브러리 설치 |
| `npm run dev` | 개발 서버 실행 → http://localhost:5173 (저장하면 자동 새로고침). 종료는 터미널에서 Ctrl+C |
| `npm run typecheck` | TypeScript 타입 검사 |
| `npm test` | 단위 테스트 (Vitest) |
| `npm run build` | 타입 검사 + 배포용 빌드 → `dist/` |
| `npm run preview` | 빌드 결과 미리보기 → http://localhost:4173 |
| `npm run check` | 타입 검사 + 테스트 + 빌드를 한 번에 (작업 완료 전 필수) |

브라우저에서 눈으로 확인할 때: 개발 모드이거나 주소 뒤에 `?debug` 를 붙이면 콘솔에서 `__heroX.getDebugState()` 로 플레이어·카메라·적·입력 상태를 볼 수 있고, `__heroX.setPlayerPosition(x, z)` 로 순간이동, `__heroX.restart()` 로 재시작할 수 있다.

브라우저 자동 검증(헤드리스 Chromium + Playwright)은 프로젝트 의존성에 넣지 않았다. 작업 환경에 Playwright 가 있으면 개발 서버를 띄우고 `__heroX` 디버그 API 로 시나리오(이동, 충돌, 피격, 공격, 결과 화면, 재시작)를 돌려 확인한다. 공격 검증 시에는 사람이 하듯 **적이 있는 방향으로 마우스를 옮긴 뒤** 공격해야 한다 (공격은 마우스 방향 부채꼴에만 들어간다).

## 6. 기능 추가·변경 절차 (반드시 이 순서로)

1. 요청과 관련된 기존 코드·설정·문서를 먼저 확인한다.
2. 바꿀 파일과 영향을 받는 기능을 한국어로 짧게 설명한다.
3. 기존 기능을 유지하면서 **최소 단위**로 구현한다. 여러 기능을 한꺼번에 바꾸지 않는다.
4. `npm run check` 를 실행한다. 가능하면 브라우저에서 실제로 실행해 확인한다.
5. 실패하면 원인을 분석해 근본 원인을 고치고 다시 검증한다. 증상만 숨기지 않는다.
6. 변경 파일, 실제 실행한 테스트 결과, 미완성 항목을 구분해서 한국어로 보고한다.
7. 사용자가 직접 확인해야 할 사항과 다음 단계를 안내한다.
8. `CHANGELOG.md` 에 기록하고, 구조·실행 방법·조작이 바뀌면 `README.md`, `GAME_GUIDE.md`, 이 문서도 갱신한다.

작은 변경(설정값 조정, 주석, 문서)은 승인 없이 진행한다.
**파일 삭제, 폴더 구조 대규모 변경, 저장 데이터 초기화, 라이브러리 교체**는 이유와 대안을 먼저 설명하고 승인을 받는다.

## 7. 기존 기능 보호 원칙

- 1단계에서 검증된 기능(이동, 충돌, 카메라, 안내 화면)은 이후 작업에서 깨지면 안 된다. 관련 테스트가 통과해야 완료다.
- "테스트 완료"는 실제로 명령을 실행하고 결과를 본 경우에만 쓴다. 실행하지 않은 검증을 했다고 보고하지 않는다.
- 구현하지 않은 기능을 완성했다고 보고하지 않는다.
- 설정값은 `sanitizeGameConfig()` 가 보정하므로, 새 항목도 같은 방식으로 검증한다.

## 8. 자연어 요청 처리 예시

- "캐릭터를 더 빠르게" → `GameConfig.player.moveSpeed` 조정 (허용 범위 1~30).
- "카메라를 더 가까이" → `GameConfig.camera.offset` 의 y, z 를 줄인다.
- "장애물을 더 많이" → `GameConfig.world.obstacles` 배열에 항목 추가 (시작 위치와 겹치지 않게; `tests/config.test.ts` 가 확인).
- "키를 방향키로만" → `GameConfig.controls` 수정.
- "적을 두 배로" → `GameConfig.enemies.spawns` 에 항목 추가. "적 체력 30% 올려" → `enemies.types.rusher.hp` 조정.
- "공격을 더 세게/넓게" → `GameConfig.combat.melee` 의 `damage`, `range`, `arcDegrees`. 원거리는 `combat.ranged`.
- "점프를 더 높게" → `player.jumpSpeed` 올리기 (또는 `player.gravity` 내리기).
- 주의: 3D 효과의 방향을 바꿀 때는 `node -e` 로 벡터에 회전을 적용해 보고 확인한다 (2-b 의 부채꼴 반대 방향 버그 참고). 키를 '누르는 순간' 반응해야 하는 동작(점프 등)은 폴링이 아니라 `InputManager.onPress` 로 받는다 (낮은 FPS 에서 짧은 탭을 놓침).
- 새 적 종류 → `enemies.types` 에 능력치 추가 + `EnemyModels.ts` 에 외형 분기 + (행동이 다르면) `EnemyAI.ts` 확장.
- "더 어렵게/쉽게" → 먼저 난이도 버튼 안내. 전체 조정은 `difficulty.presets` 배율, 특정 적만이면 `enemies.types.<종류>`.
- 난이도 배율은 적 생성 시(체력·속도)와 피해 계산 시(공격력, `Game.onEnemyAttack`)에 적용된다. 새 적 능력치를 추가하면 배율 적용 위치를 함께 확인한다.
- 새 기능(무기, 아이템…) → 새 파일을 만들고 `Game.ts` 의 루프에 `update()` 를 추가. 설정은 `GameConfig.ts` 에.

## 9. 개발 단계 (지시서 11장)

1. 기반 구축 ✅ (v0.1.0)
2. 전투 시스템 ✅ (v0.2.0: 적 3종, 근접·원거리, 점프, 난이도, 피해 숫자)
3. 아이템과 성장
4. 던전과 보스
5. 설정 화면과 저장
6. 콘텐츠 확장
7. 품질 개선

각 단계는 완료 기준을 만족하고 기존 기능이 정상일 때만 다음 단계로 넘어간다.
