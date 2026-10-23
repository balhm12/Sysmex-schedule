# HERO X — Claude Code 작업 규칙

이 문서는 Claude Code가 이 프로젝트에서 작업할 때 항상 먼저 읽고 따라야 하는 규칙이다.
사용자는 전문 개발자가 아니다. 설명, 보고, 주석, 문서는 모두 한국어로 쓴다.

## 1. 프로젝트 목표

- 게임명: **HERO X** (부제: 모험의 던전). 이름은 `src/game/GameConfig.ts` 의 `meta` 에서 바꾼다.
- 장르: 3인칭 3D 액션 RPG. Minecraft Dungeons 의 진행 방식을 참고하되 캐릭터·맵·아이템·음악·텍스처는 독자 제작 또는 적법한 에셋만 사용한다.
- 실행 환경: Windows PC 웹 브라우저(Chrome/Edge). 기본 게임은 외부 API·유료 서비스 없이 실행된다.
- 최우선 원칙: **실제로 실행되는 게임**을 단계적으로 완성한다. 그래픽 품질보다 안정성·유지보수성이 먼저다.
- 현재 상태: **지시서 1~7단계 완료 (v1.0.0)** → 그래픽 개선 완료 (v1.1.0: 1 렌더링 품질 / 2 환경 연출 / 3 관절형 캐릭터·적 애니메이션). 더 높은 품질은 .glb 에셋 투입으로. 이후 작업은 사용자 플레이 의견 기반 조정(밸런스·조작 느낌·음악), 정식 .glb 모델 투입, 추가 콘텐츠(던전·적·장비)다. 새 작업도 같은 절차(최소 단위 구현 → `npm run check` → 브라우저 확인 → 문서 → 커밋)로 한다.

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
│  │  ├─ AutoQuality.ts    자동 화질 판단 (평균 FPS → 그림자 끄기 → 해상도 낮추기, 순수 함수·테스트 대상)
│  │  ├─ Settings.ts       ★ 사용자 설정: 항목 정의(SETTING_DEFS)·기본값·보정·저장 (테스트 대상)
│  │  ├─ DungeonDefs.ts    ★ 던전 정의 목록(DUNGEONS: 공간·장애물·상자·적 배치·보스 덮어쓰기·보상·해금) (테스트 대상)
│  ├─ save/
│  │  ├─ SaveData.ts       ★ 저장 형식(SAVE_VERSION)·검증·보정·버전 변환·적용 (순수 함수, 테스트 대상)
│  │  └─ SaveStorage.ts    localStorage 어댑터: 읽기/쓰기/삭제, 손상 데이터는 *.corrupt 키로 격리
│  │  └─ CameraController.ts  3인칭 추적 카메라
│  ├─ input/
│  │  ├─ InputManager.ts   키보드·마우스 입력 (키 설정은 GameConfig.controls, 마우스는 'Mouse0' 등) + 가상 입력(setVirtualAxis/pressVirtual)
│  │  └─ TouchControls.ts  터치 조작: 가상 조이스틱·버튼 (GameConfig.controls 키 코드를 가상으로 누름)
│  ├─ player/
│  │  ├─ Player.ts         플레이어 상태(위치·방향·체력·공격 동작), 모델 교체 setModel()
│  │  ├─ PlayerController.ts  입력 → 이동 → 충돌 → 위치 반영, 피격 밀림, 점프
│  │  ├─ PlayerStats.ts     레벨·경험치·골드 (최대 체력·공격력 배율 계산, 테스트 대상)
│  │  ├─ movement.ts       이동·충돌 순수 함수 (테스트 대상)
│  │  ├─ FaceTexture.ts    얼굴 사진 자르기·저장(localStorage)·텍스처 (cropRect 는 테스트 대상)
│  │  └─ models/PlaceholderModel.ts  관절형 영웅 모델(걷기·공격·점프·회피·피격·망토) + PlayerModel 인터페이스 (setFace 로 얼굴 사진)
├─ public/models/           정식 .glb 모델과 manifest.json, 넣는 방법 README
│  ├─ render/
│  │  ├─ materials.ts      PBR 재질 도우미 (pbr/metal/glow). 새 물체는 Lambert 대신 이걸 쓴다
│  │  ├─ Quality.ts        화질 프리셋(낮음/중간/높음: 블룸·MSAA·그림자 해상도·바닥 선명도)
│  │  ├─ RenderPipeline.ts 렌더러·톤매핑·환경광·후처리(블룸) 한 곳 관리. Game 은 pipeline.render() 만 호출
│  │  └─ groundTexture.ts  노이즈 바닥 색 지도·노멀맵 생성 (파일 없음)
│  ├─ assets/ModelRegistry.ts  ★ public/models/manifest.json 의 .glb 를 읽어 플레이어·적·보스 모델로 교체 (없으면 임시 모델)
│  ├─ audio/
│  │  ├─ soundDefs.ts      ★ 효과음 레시피(SFX: 조각·필터 스윕·왜곡·잔향·흔들림)·음악 4마디 악절(MUSIC: 베이스·멜로디·드럼·패드 코드) (테스트 대상)
│  │  └─ AudioSystem.ts    Web Audio 재생: 첫 조작에 켜기, 효과음 합성(잔향 버스·컴프레서), 음악 예약 재생·전환, 음원 파일 디코딩·재생, 음량
│  ├─ assets/SoundRegistry.ts  ★ public/sounds/manifest.json 의 음원 파일(.ogg/.mp3/.wav)을 받아 두는 곳 (없으면 합성음)
├─ public/sounds/           정식 음원 파일과 manifest.json, 넣는 방법·무료 음원 출처 README
│  ├─ combat/
│  │  ├─ Health.ts         체력·무적·사망 (플레이어와 적 공용, 테스트 대상)
│  │  ├─ melee.ts          근접 공격 부채꼴 판정 순수 함수 (테스트 대상)
│  │  ├─ CombatSystem.ts   플레이어 근접·원거리 공격 (입력 → 조준 → 판정/발사 → 피해·효과)
│  │  ├─ Projectile.ts     투사체 시스템 (플레이어·적 공용, 장애물 충돌, 명중 콜백)
│  │  └─ Effects.ts        휘두르기 부채꼴·파편 효과 (풀 재사용)
│  ├─ enemies/
│  │  ├─ EnemyAI.ts        적 상태 기계 (idle/chase/windup/hurt/dead, 근접형·원거리형, 테스트 대상)
│  │  ├─ EnemyModels.ts    종류별 임시 모델 + EnemyModel 인터페이스
│  │  ├─ Enemy.ts          적 한 마리 (능력치·체력·AI·모델 연결, 이동·충돌). 상속 가능(protected 필드, 모델 주입)
│  │  ├─ BossAI.ts         보스 패턴 상태 기계 (chase/windup/charge/recover, 2단계 시간 배율, 테스트 대상)
│  │  ├─ Boss.ts           보스 엔티티(Enemy 상속)·패턴 실행 콜백·보스 모델
│  │  └─ EnemySpawner.ts   설정 기반 배치·갱신·정리
│  ├─ items/
│  │  ├─ loot.ts           드롭 확률 계산 순수 함수 (테스트 대상)
│  │  ├─ LootSystem.ts     바닥 아이템 생성·끌림·획득 (효과 적용은 Game.onCollect)
│  │  ├─ ItemDatabase.ts   장비 템플릿 12종, 등급 적용 생성, 무작위 생성 (테스트 대상)
│  │  └─ EquipmentSystem.ts 가방·슬롯 장착/해제, 능력치 합산, 방어력 계산 (테스트 대상)
│  ├─ dungeon/
│  │  ├─ DungeonScene.ts   던전 정의로 바닥·조명·벽·장애물 생성 (CollisionWorld 구현, 외부 충돌 상자 추가 가능)
│  │  ├─ Chest.ts          보물 상자 배치·근접 판정·열기 연출 (보상은 loot.rollChestLoot)
│  │  ├─ decorLayout.ts    장식 배치 계산 (결정적 난수, 금지 영역 회피, 테스트 대상)
│  │  └─ Decor.ts          장식 소품·인스턴싱 풀(바람 셰이더)·입자·경고등 (화질별 개수)
│  ├─ ui/
│  │  ├─ MainMenu.ts       메인 메뉴 (새 게임/이어하기/장비/조작 안내/설정/난이도, 새 게임 확인창)
│  │  ├─ SettingsUI.ts     설정 화면 (SETTING_DEFS 로 자동 생성: 슬라이더·스위치·선택)
│  │  ├─ DungeonSelectUI.ts 던전 선택 화면 (DUNGEONS 카드, 잠김·클리어 횟수·권장 레벨)
│  │  ├─ ControlsGuide.ts  조작 안내 창 + 하단 상태 표시
│  │  ├─ HUD.ts            체력바·남은 적·처치·점수·피격 번쩍임
│  │  ├─ DamageNumbers.ts  피해 숫자 (3D 좌표 → 화면 투영은 Game 이 함수로 제공)
│  │  ├─ ResultUI.ts       결과 화면(쓰러짐/승리)과 다시 시작
│  │  ├─ InventoryUI.ts    장비 화면 (슬롯·가방·비교·장착/해제/버리기)
│  │  └─ ErrorOverlay.ts   화면 오류 표시
│  ├─ utils/Logger.ts      [HERO X] 접두어 로그
│  └─ utils/device.ts      터치 기기·세로 방향 판별 (설정 기본값에만 사용)
../.github/workflows/deploy-hero-x.yml  hero-x 브랜치 push → 검사·빌드 → main 의 game/ 폴더로 배포 (GitHub Pages)
└─ tests/                  단위 테스트 (movement, config, health, enemyAI, melee, difficulty, progression, equipment, chest, boss)
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
- "점프를 더 높게" → `player.jumpSpeed` 올리기 (또는 `player.gravity` 내리기). "회피를 더 멀리/자주" → `player.dash.speed/duration/cooldown`. 회피 키는 `controls.dodge`, 터치 버튼은 `TouchControls` 의 `#touch-dodge`.
- 장식 추가: 종류·개수는 `decorLayout.DECOR_KINDS`, 외형은 `Decor.makeProp` 의 분기. 장식은 충돌이 없으므로 통행에 방해되는 큰 것은 `outside` 에만 둔다. 타격감 수치는 `GameConfig.juice`.
- 그래픽: 재질은 반드시 `render/materials.ts` 의 `pbr()/glow()` 로 만든다(블룸은 emissiveIntensity ≥ 1.5 에 걸림). 던전 분위기(하늘·노출·바닥)는 `DungeonDefs.theme` 수치만 바꾼다. 후처리 켜고 끄기는 `RenderPipeline.setQuality`, 그림자 해상도는 `DungeonScene.applyQuality`.
- 게임 루프: `Game.frame()` 이 흐른 시간을 `performance.maxStep`(0.05초) 단위의 `simulate(dt)` 로 나눠 돌리고 한 번 그린다. 시간에 따라 움직이는 로직은 `simulate` 안에, 화면 갱신·FPS 측정은 `frame` 에 둔다.
- 성능: 자동 화질은 `Game.updateAutoQuality` 가 `GameConfig.performance` 간격으로 `decideQuality` 를 호출해 설정을 낮춘다(올리지 않음). WebGL 끊김은 `contextLost` 플래그로 프레임을 건너뛴다. 프레임 예외는 `loop` 의 try/catch 가 루프를 멈추고 저장한 뒤 다시 던진다(ErrorOverlay 표시).
- 모델 교체: `.glb` 는 `public/models/` + `manifest.json`. 생성 함수(`createEnemyModel`, `createBossModel`, `Game.swapPlayerModel`)가 `modelRegistry` 에서 먼저 찾고 없으면 임시 모델을 만든다. 적·보스는 다음 생성부터 적용. 얼굴 사진은 `PlayerModel.setFace`(임시 모델만 구현).
- 소리: 새 효과음은 `soundDefs.SFX` 에 레시피(`parts` + `reverb/pitchJitter/gainJitter`)를 추가하고 `Game` 에서 `this.audio.play('이름')`. 음악은 `MUSIC` 에 트랙(베이스 16칸 = 멜로디·드럼 32칸, 코드는 베이스와 같은 길이, 첫 칸은 코드 필수)을 추가하고 `Game.dungeonMusic()` 매핑. 저장소에는 음원 파일을 두지 않고 합성으로 동작하되, 사용자가 `public/sounds/manifest.json` 에 적은 파일(CC0 등 라이선스 확인)은 같은 이름의 효과음·음악을 대신한다(`SoundRegistry` 가 받고 `AudioSystem` 이 디코딩, 없거나 실패하면 합성음). 소리는 첫 사용자 조작 뒤에만 난다(브라우저 제한) — 테스트에서는 키 입력 뒤 `audio.ready/voices` 를 보고, 파일 경로는 Playwright `page.route` 로 manifest 와 wav 를 가로채 검증한다(저장소 파일은 건드리지 않음).
- 진동은 `utils/haptics.ts` 의 `vibrate()` 를 `settings.haptics` 확인 후 호출한다. 터치 전용 표시(자동 조준 고리 `aimRing`)는 `settings.touchControls` 일 때만 보인다.
- "아이템이 더 자주/레벨이 빨리" → `loot.healChance/goldChance`, `progression.xpBase/xpGrowth`.
- 플레이어 공격력: `CombatSystem` 이 레벨 배율(`() => stats.damageMultiplier`)과 무기 공격력(`(kind) => equipment.weaponAttack(kind)`)을 함수로 받는다. 피해 = (기본 + 무기) × 배율.
- 방어력은 `Game.damagePlayer` 에서 `applyDefense` 로, 체력 보너스는 `Game.applyStats`, 속도 보너스는 `PlayerController` 의 배율 함수로 적용된다. 새 능력치를 추가하면 이 세 곳을 확인한다.
- 새 장비 → `ItemDatabase.ts` 의 `ITEM_TEMPLATES` 에 항목 추가 (분류 melee/ranged/armor/trinket, 일반 등급 기준 수치).
- 던전 추가·수정 → `DungeonDefs.ts` 의 `DUNGEONS` 에 항목 추가/수정 (해금은 `requiresClear`, 보스는 `boss` 에 바꿀 값만). 첫 던전만 `GameConfig.world/dungeon/enemies.spawns/boss` 를 그대로 쓴다. `tests/dungeons.test.ts` 가 모든 던전의 배치 겹침·영역을 검사한다. 던전 교체는 `Game.loadDungeon` 한 곳(공간·상자 새로 생성, 충돌 세계는 껍데기 객체로 공유).
- 새 적이 기존 외형을 써도 되면 `enemies.types.<종류>.model` 에 'rusher' | 'shooter' | 'tank' 를 적는다.
- 터치 조작: 조이스틱은 기본 '떠다니는' 방식(`.touch-zone` 전체 화면, 버튼보다 아래 층; 설정 `floatingJoystick`). 새 동작 버튼은 `TouchControls.ts` 의 HTML 에 `data-code`(GameConfig.controls 의 키 코드)만 적으면 된다. 터치 조작이 켜지면 `Game.getAimPoint` 가 자동 조준(`nearestEnemyPoint`)을 쓴다. 휴대폰 기본값(그림자 끔·해상도 0.8)은 `Settings.defaultSettings` 에서 `isTouchDevice()` 로 정한다. 모바일 검증은 Playwright `devices['Pixel 5']` 에뮬레이션 + `PointerEvent(pointerType: 'touch')` 로 한다.
- 배포: `hero-x` 브랜치에 push 하면 워크플로가 `npm run check` 후 `dist` 를 main 의 `game/` 에 넣는다. main 의 다른 파일은 건드리지 않는다(`keep_files: true`). 배포 주소는 README 3-1.
- 창 층위는 CSS `.guide`(20) > `.guide.result`(15) > `.guide.menu`(10). 메뉴 위에 여는 새 창은 기본 `.guide` 층위를 그대로 쓴다.
- "상자를 더/보상을 더 좋게" → 첫 던전은 `dungeon.chests` 배열, 다른 던전은 `DungeonDefs.ts`. 상자 보상은 `dungeon.chestLoot`(공통). 상자 위치는 장애물·적 배치와 겹치지 않아야 한다 (`tests/chest.test.ts` 가 확인).
- 상호작용(E)이 필요한 새 물체는 `Game.tryInteract` 에 분기를 추가하고 HUD 안내 문구(`currentPrompt`)를 함께 처리한다.
- "보스를 약하게/세게" → `boss.hp`, `boss.slam.damage`, `boss.contactDamage`, `boss.windup`(예고가 길수록 쉬움). 던전별 보스는 `DungeonDefs.ts` 의 `boss` 덮어쓰기. 패턴 구성은 `boss.closePatterns`(순환 순서)와 `boss.useCharge`, 외형은 `boss.model`('guardian' | 'golem' | 'commander'). 새 보스 패턴은 `BossPattern` 타입 + `boss.windup` 항목 + `Boss.update` 의 실행 분기 + `Game.onBossAttack` 의 효과 처리에 추가한다(시간이 걸리는 효과는 `Game.updateMortars` 처럼 루프에서 진행). 새 외형은 `createBossModel` 의 `kind` 분기.
- 승리 흐름은 `Game.checkVictory`: 일반 적 전멸 → `spawnBoss` → 보스 사망 → `onBossDefeated`(보상) → 결과 화면. 테스트에서는 `__heroX.debugDefeatRegularEnemies()` 로 바로 보스전으로 간다.
- 사용자 설정은 `Settings.ts` 의 `UserSettings`/`SETTING_DEFS` 에만 추가한다(화면은 자동 생성). 게임 코드는 `GameConfig.hud/debug/graphics` 대신 `this.settings` 를 읽는다. 플레이어 체력·공격력은 `effectiveMaxHp()`/`effectiveDamageMultiplier()` 를 거친다. 난이도는 `setDifficulty` 한 곳에서 설정·저장·메뉴를 함께 갱신한다.
- 저장: 성장·장비·난이도·기록만 저장하고 던전 안 상태는 저장하지 않는다. 저장 형식을 바꾸면 `SAVE_VERSION` 을 올리고 `migrateSaveData` 에 변환을 추가한 뒤 `tests/save.test.ts` 에 옛 형식 → 새 형식 테스트를 더한다. 장비는 원형 id·등급만 저장하고 `createItem` 으로 다시 만든다. 저장 시점은 `Game.markDirty()`(자동 저장 간격 뒤) 또는 `Game.saveNow()`(메뉴·결과·탭 닫기)로만 다룬다. 저장 데이터 초기화는 사용자가 '새 게임'을 확인했을 때만 한다.
- 게임 흐름은 `Game.mode`('menu' | 'play' | 'result') 하나로 관리한다. 메뉴·결과 전환은 `newGame / continueGame / retry / openMenu / showResult` 만 사용하고, 루프는 `mode !== 'play'` 이거나 `paused` 면 그리기만 한다. 브라우저 자동 검증은 `#menu-new` 버튼으로 시작한다.
- 주의: 3D 효과의 방향을 바꿀 때는 `node -e` 로 벡터에 회전을 적용해 보고 확인한다 (2-b 의 부채꼴 반대 방향 버그 참고). 키를 '누르는 순간' 반응해야 하는 동작(점프 등)은 폴링이 아니라 `InputManager.onPress` 로 받는다 (낮은 FPS 에서 짧은 탭을 놓침).
- 새 적 종류 → `enemies.types` 에 능력치 추가 + `EnemyModels.ts` 에 외형 분기 + (행동이 다르면) `EnemyAI.ts` 확장.
- "더 어렵게/쉽게" → 먼저 난이도 버튼 안내. 전체 조정은 `difficulty.presets` 배율, 특정 적만이면 `enemies.types.<종류>`.
- 난이도 배율은 적 생성 시(체력·속도)와 피해 계산 시(공격력, `Game.onEnemyAttack`)에 적용된다. 새 적 능력치를 추가하면 배율 적용 위치를 함께 확인한다.
- 새 기능(무기, 아이템…) → 새 파일을 만들고 `Game.ts` 의 루프에 `update()` 를 추가. 설정은 `GameConfig.ts` 에.

## 9. 개발 단계 (지시서 11장)

1. 기반 구축 ✅ (v0.1.0)
2. 전투 시스템 ✅ (v0.2.0: 적 3종, 근접·원거리, 점프, 난이도, 피해 숫자)
3. 아이템과 성장 ✅ (v0.3.0: 드롭, 경험치·레벨, 골드, 장비·장비 화면·능력치 반영)
4. 던전과 보스 ✅ (v0.4.0: 보물 상자, 보스전, 메인 메뉴·입장·결과 흐름)
5. 설정 화면과 저장 ✅ (v0.5.0: 자동 저장·이어하기·버전·손상 처리, 설정 화면·기본값 복원)
6. 콘텐츠 확장 ✅ (v0.6.0-a.1 던전 3개·던전 선택·새 적·새 장비 / v0.6.1 모바일 / v0.6.2 보스별 패턴·외형)
7. 품질 개선 ✅ (v0.7.0-a.1 효과음·음악 / v0.7.0-b.1 얼굴 사진·glb 교체 구조 / v1.0.0 자동 화질·오류 처리·문서)

각 단계는 완료 기준을 만족하고 기존 기능이 정상일 때만 다음 단계로 넘어간다.
