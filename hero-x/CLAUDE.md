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
│  │  └─ CameraController.ts  3인칭 추적 카메라 (흔들림, 보스가 가까우면 camera.bossZoom 배율로 줌아웃)
│  ├─ input/
│  │  ├─ InputManager.ts   키보드·마우스 입력 (키 설정은 GameConfig.controls, 마우스는 'Mouse0' 등) + 가상 입력(setVirtualAxis/pressVirtual)
│  │  └─ TouchControls.ts  터치 조작: 가상 조이스틱·버튼 (GameConfig.controls 키 코드를 가상으로 누름)
│  ├─ player/
│  │  ├─ Player.ts         플레이어 상태(위치·방향·체력·공격 동작), 모델 교체 setModel(), 장비 외형 setEquipment()
│  │  ├─ EquipmentVisuals.ts 장착 장비 외형(코드 상자 모델): 무기 8종 buildWeaponModel, 방어구 4종 buildArmorModel, 등급 색 빛
│  │  ├─ PlayerController.ts  입력 → 이동 → 충돌 → 위치 반영, 피격 밀림, 점프
│  │  ├─ PlayerStats.ts     레벨·경험치·골드 (최대 체력·공격력 배율 계산, 테스트 대상)
│  │  ├─ movement.ts       이동·충돌·우회 조종(segmentBlocked/steerAround) 순수 함수 (테스트 대상)
│  │  ├─ FaceTexture.ts    얼굴 사진 자르기·저장(localStorage)·텍스처 (cropRect 는 테스트 대상)
│  │  ├─ models/HeroModel.ts   ★ 기본 플레이어: 매끈한 카툰 치비 아들 캐릭터(뾰족한 머리카락 가닥·네모 안경·후드 코트·가죽 장비·검, 천·가죽 질감), setFace 지원
│  │  ├─ models/heroAnimator.ts 코드 모델 공용 관절 동작(HeroRig: 걷기·콤보·회피·점프·피격·쓰러짐)·장비 부착·정리 (테스트: heroModel.test)
│  │  └─ models/PlaceholderModel.ts  단순 임시 모델(지금은 안 씀) + PlayerModel/PlayerModelState 인터페이스
├─ public/manifest.webmanifest  웹 앱 매니페스트 (앱 이름·standalone·아이콘)
├─ public/icons/            앱 아이콘 PNG (tools/make_icons.py 산출물, Pillow 필요)
│  ├─ pwa/
│  │  ├─ sw.js             서비스 워커 템플릿 (__VERSION__ 은 vite 플러그인이 빌드 때 치환; 이동은 네트워크 우선, 그 밖은 캐시 우선+갱신; 개발 서버에서는 미등록)
│  │  ├─ installHint.ts    설치 안내 판단 (standalone/prompt/ios/none, 순수 함수, 테스트 대상)
│  │  └─ registerPwa.ts    PwaInstaller: 서비스 워커 등록·갱신 알림, beforeinstallprompt 붙잡기·promptInstall
├─ public/models/           정식 .glb 모델과 manifest.json, 넣는 방법 README (player.glb = 아들 복셀 캐릭터)
├─ tools/voxel_glb.py       복셀(박스 쌓기) → glTF 2.0 바이너리 공용 모듈 (파이썬 표준 라이브러리만). 색은 sRGB→선형 변환해서 넣는다
├─ tools/make_player_glb.py 아들 복셀 캐릭터(각진 1판) .glb 생성기 → public/models/player.glb
├─ tools/make_player_chibi_glb.py ★ 둥근(치비) 아들 캐릭터 생성기 → public/models/player-chibi.glb (현재 기본 플레이어)
├─ tools/voxel_shapes.py     껍데기 복셀 모양 도우미(ellipsoid/rounded_box/capsule_y/ring_xy) — voxel_glb.VoxelModel.voxels 로 한 메시
├─ tools/make_enemies_glb.py 적 6종 로봇 복셀 .glb 생성기 → public/models/enemy-*.glb (요새 skin 'robot-*' 외형)
├─ tools/make_monsters_glb.py 적 9종 몬스터 복셀 .glb 생성기 → public/models/monster-*.glb (현재 manifest 가 쓰는 외형. 사람형은 플레이어와 같은 부품 이름 + weapon_*, 떠다님은 float_*, 부품 이름 규칙은 public/models/README)
├─ tools/make_bosses_glb.py  보스 4종 복셀 .glb 생성기 → public/models/boss-{guardian,golem,commander,frost}.glb (사람형 부품 이름 + weapon_* + eye_* + glow_*; Boss.ts 가 패턴 바닥 원·2단계 붉은 눈을 덧입힌다)
│  ├─ render/
│  │  ├─ materials.ts      PBR 재질 도우미 (pbr/metal/glow). 새 물체는 Lambert 대신 이걸 쓴다
│  │  ├─ Quality.ts        화질 프리셋(낮음/중간/높음: 블룸·MSAA·그림자 해상도·바닥 선명도)
│  │  ├─ RenderPipeline.ts 렌더러·톤매핑·환경광·후처리(블룸) 한 곳 관리. Game 은 pipeline.render() 만 호출
│  │  ├─ groundTexture.ts  노이즈 바닥 색 지도·노멀맵 생성 (파일 없음)
│  │  ├─ fabricTexture.ts  캐릭터용 천·가죽 질감 캔버스 텍스처(캐시, 캔버스 없으면 null)
│  │  └─ surfaceTexture.ts 벽·장애물 표면 6종(hedge/rock/steel/ice/wood/brick) 색 지도·노멀맵 + 월드 좌표 UV 셰이더 패치 (surfaceSample 테스트 대상)
│  ├─ cinematic/
│  │  ├─ introTimeline.ts  ★ 인트로 연출 시간표: 시각 → 카메라 위치·줌(fov)·시간 배율·주인공 행동·자막 (순수 함수, 테스트 대상)
│  │  └─ IntroDirector.ts  인트로 진행기: 몬스터 등장, 가상 입력으로 주인공 조종, 카메라·자막 적용, 처치 줌 펀치
│  │  └─ IntroSet.ts       인트로 교실 세트(창릉초등학교: 나무 바닥·뒷벽·캔버스 글자 칠판·책상·의자·교탁, 충돌 상자 포함)
│  ├─ ui/IntroOverlay.ts   인트로 덮개(검은 띠·제목·자막·건너뛰기)
│  ├─ game/mathQuiz.ts     ★ 초등 3학년 수학 문제 생성(덧셈·뺄셈·곱셈구구·나눗셈·두 자리×한 자리, 보기 4개) (순수 함수, 테스트 대상)
│  ├─ ui/QuizUI.ts         보물 상자 수학 문제 창(오답이면 새 문제, 정답이면 상자 열림)
│  ├─ ui/BossIntroUI.ts    보스 등장 팝업(초상화 렌더·별명·설명·패턴 표·싸운다 버튼, 열려 있는 동안 paused)
│  ├─ game/bossIntro.ts    ★ 보스 설정 → 패턴 설명 문장(describeBossPatterns, 순수 함수, 테스트 대상)
│  ├─ assets/ModelRegistry.ts  ★ public/models/manifest.json 의 .glb 를 읽어 플레이어·적·보스 모델로 교체 (없으면 임시 모델). rotationX/Y·scale·offsetY·defaultParts 보정
│  ├─ assets/SkinnedPlayerModel.ts 뼈대·클립 플레이어 모델(KayKit 기사): 상태 기계(사망>공격·회피·피격>공중>이동>정지)·crossfade·속도 동기화, 장비를 손 슬롯·가슴 뼈에 부착
│  ├─ assets/skinnedClips.ts  클립 이름 → 역할 매핑(정확한 이름 우선, 키워드 차선) (순수 함수, 테스트 대상)
├─ tools/prune_glb.mjs       .glb 에서 필요한 애니메이션만 남기고 버퍼를 정리해 용량을 줄인다 (KayKit 3.5 MB → 1.1 MB)
│  ├─ assets/meshMerge.ts    복셀 .glb 의 상자 메시를 관절·재질별로 합쳐 그리기 호출을 줄인다 (리그 뒤에 호출, userData.parts 로 부품 이름 보존, meshHasPart) (테스트 대상)
│  ├─ assets/PartRig.ts      클립 없는 .glb 의 부품 이름으로 관절을 만들어 동작 (플레이어: left_leg/right_arm/head/sword… 걷기·공격 / 적: wheel_/claw_/rotor_/wing_/barrel_/shield/piston_/antenna_/glow_/eye_) (classifyPart·classifyEnemyPart 테스트 대상)
│  ├─ audio/
│  │  ├─ soundDefs.ts      ★ 효과음 레시피(SFX: 조각·필터 스윕·왜곡·잔향·흔들림)·음악 4마디 악절(MUSIC: 베이스·멜로디·드럼·패드 코드) (테스트 대상)
│  │  └─ AudioSystem.ts    Web Audio 재생: 첫 조작에 켜기, 효과음 합성(잔향 버스·컴프레서), 음악 예약 재생·전환, 음원 파일 디코딩·재생, 음량
│  ├─ assets/SoundRegistry.ts  ★ public/sounds/manifest.json 의 음원 파일(.ogg/.mp3/.wav)을 받아 두는 곳 (없으면 합성음)
├─ public/sounds/           정식 음원 파일과 manifest.json, 넣는 방법·무료 음원 출처 README
│  ├─ combat/
│  │  ├─ Health.ts         체력·무적·사망 (플레이어와 적 공용, 테스트 대상)
│  │  ├─ melee.ts          근접 공격 부채꼴 판정 순수 함수 (테스트 대상)
│  │  ├─ combo.ts          근접 콤보 단계 계산 (nextComboStep/sweepSign/isFinisher, 순수 함수, 테스트 대상)
│  │  ├─ CombatSystem.ts   플레이어 근접(3단 콤보)·원거리 공격 (입력 → 조준 → 판정/발사 → 피해·효과)
│  │  ├─ Projectile.ts     투사체 시스템 (플레이어·적 공용, 빛 꼬리, 장애물 충돌, 명중·소멸 콜백 onImpact)
│  │  └─ Effects.ts        휘두르기 부채꼴·검 궤적(slash, 방향 sweep)·섬광(flash)·충격파·예고 원·빛 기둥(pillar)·파편 효과 (풀 재사용)
│  ├─ enemies/
│  │  ├─ EnemyAI.ts        적 상태 기계 (idle/chase/windup/charge/hurt/dead, 근접·원거리·돌진·자폭형, 테스트 대상)
│  │  ├─ EnemyModels.ts    종류별 임시 모델 + EnemyModel 인터페이스
│  │  ├─ Enemy.ts          적 한 마리 (능력치·체력·AI·모델 연결, 이동·충돌, 추적 중 우회 이동 steerAround). 상속 가능(protected 필드, 모델 주입)
│  │  ├─ BossAI.ts         보스 패턴 상태 기계 (chase/windup/charge/recover, 2단계 시간 배율, 테스트 대상)
│  │  ├─ Boss.ts           보스 엔티티(Enemy 상속)·패턴 실행 콜백·보스 모델(.glb 가 있으면 decorateGltfBoss 로 패턴 원·2단계 눈 추가, 없으면 코드 모델)
│  │  └─ EnemySpawner.ts   설정 기반 배치·갱신·정리
│  ├─ items/
│  │  ├─ loot.ts           드롭 확률 계산 순수 함수 (테스트 대상)
│  │  ├─ LootSystem.ts     바닥 아이템 생성·끌림·획득, 희귀 이상 장비엔 등급 색 빛 기둥·고리 (효과 적용은 Game.onCollect)
│  │  ├─ ItemDatabase.ts   장비 템플릿 16종(style/look/color 포함), 등급 적용 생성, 무작위 생성 (테스트 대상)
│  │  ├─ weaponStyle.ts    장착 무기 → 공격 방식(GameConfig.combat.weaponStyles) 해석, 콤보 구성·꼬리표 (순수 함수, 테스트 대상)
│  │  └─ EquipmentSystem.ts 가방·슬롯 장착/해제, 주웠을 때 자동 장착(pickup·score), 능력치 합산, 방어력 계산 (테스트 대상)
│  ├─ dungeon/
│  │  ├─ journey.ts        ★ 여정형 던전 정의(구역·통로·문)와 계산: 격자 래스터화 → 울타리 벽 상자, BFS 연결 검증, 구역 판정 (순수 함수, 테스트 대상)
│  │  ├─ ZoneSystem.ts     여정 진행기: 구역 진입 → 적 등장(enter 파도), 절반 이하 → 증원(half 파도), 전멸 → 클리어·문 열림, 보스 구역 → 보스 등장, 목표·진행도·빛 기둥 위치 (테스트 대상)
│  │  ├─ DungeonScene.ts   던전 정의로 바닥·조명·벽·장애물 생성 (CollisionWorld 구현, 직사각형 범위, 여정 울타리 InstancedMesh + 테마 표면 재질 wallMaterial·벽 위 장식 buildWallTops, 종류별 장애물 모델 makeObstacle, 문 openGate, 외부 충돌 상자 추가/제거)
│  │  ├─ Chest.ts          보물 상자 배치·근접 판정·열기 연출 (보상은 loot.rollChestLoot)
│  │  ├─ decorLayout.ts    장식 배치 계산 (결정적 난수, 금지 영역 회피) + 여정 구역 테마 소품 배치 planZoneProps/ZONE_PROPS (테스트 대상)
│  │  └─ Decor.ts          장식 소품·구역 테마 소품(횃불·모닥불 불꽃 일렁임 등)·인스턴싱 풀(바람 셰이더)·입자·경고등 (화질별 개수)
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
- "점프를 더 높게" → `player.jumpSpeed` 올리기 (또는 `player.gravity` 내리기). 장애물 위에 올라서기: 높이(`h`)가 있는 상자는 발이 윗면에 닿으면 가로막지 않고(`isAboveBox`) 발밑 높이(`groundHeightAt`)가 그 상자가 된다. 점프 정점이 윗면보다 `player.climbAssist` 만큼 낮아도 올려 준다(기본 1.0 → 높이 2 상자까지). 상자 위에서는 적 근접 공격이 닿지 않는다(`jumpY < 1.0` 검사). 보물 상자 등 `h` 없는 충돌 상자는 못 오른다. "회피를 더 멀리/자주" → `player.dash.speed/duration/cooldown`. 회피 키는 `controls.dodge`, 터치 버튼은 `TouchControls` 의 `#touch-dodge`.
- 장식 추가: 종류·개수는 `decorLayout.DECOR_KINDS`, 외형은 `Decor.makeProp` 의 분기. 장식은 충돌이 없으므로 통행에 방해되는 큰 것은 `outside` 에만 둔다. 타격감 수치는 `GameConfig.juice`(검 궤적 색 `slashColor`, 레벨 업 빛 기둥 `levelUp`, 보스 등장 `bossEntrance`).
- 여정 구역 테마 소품: 구역 종류별 `[소품, 개수, 자리(edge/corner/center)]` 는 `decorLayout.ZONE_PROPS`, 배치는 `planZoneProps`(걷는 칸 위, 적 등장·상자·장애물·문·시작·보스 자리 회피, 가운데는 비움). 새 소품 외형은 `Decor.makeProp` 에 분기 추가, 불꽃은 `addFlame`. `tests/decor.test.ts` 가 모든 구역에 소품이 있고 걷는 칸 안인지 검사한다.
- 전투 효과: `Effects.slash`(공중 검 궤적, 근접 공격마다), `Effects.pillar`(빛 기둥: 레벨 업·보스 등장), `Effects.shockwave/marker/burst`. 보스 등장은 `spawnBoss` 에서 기둥+충격파+`hitStopTime`(짧은 느려짐). 희귀 이상 장비 드롭의 빛 기둥은 `LootSystem.RARE_GLOW`.
- 적 우회 이동: `Enemy.update` 가 추적 중 `GameConfig.enemies.detour.interval` 마다 `steerAround(pos, dir, radius, boxes, lookAhead, 먼저 볼 쪽, 플레이어 위치)` 를 불러 앞이 막히면 좌우로 꺾은 방향 중 '그 끝에서 플레이어가 곧장 보이는' 것을 고른다(A* 아님, 울타리 모서리 탈출용). 테스트에서 비교하려면 `import('/src/game/GameConfig.ts')` 로 `detour.lookAhead` 를 0 으로 두면 꺼진다. `__heroX.debugSpawnEnemy(type, x, z)` 로 적을 원하는 자리에 둔다.
- 벽·장애물 외형: 던전별 벽 표면은 `DungeonScene.wallSurface()`(숲 hedge / 동굴 rock / 요새 steel / 얼음 ice), 텍스처는 `surfaceTexture.createSurfaceTextures`(종류·색별 캐시 `surface()`), 인스턴스 벽은 `useWorldSpaceUv` 로 무늬 크기 고정. 벽 위 장식은 `buildWallTops`(덤불·고드름/눈·수정·난간/경고등, InstancedMesh). 장애물은 `makeObstacle` 의 `kind` 분기(crate/pillar/ruin/hedge). 새 던전 테마를 넣으면 `wallSurface` 와 `buildWallTops` 분기를 추가한다.
- 그래픽: 재질은 반드시 `render/materials.ts` 의 `pbr()/glow()` 로 만든다(블룸은 emissiveIntensity ≥ 1.5 에 걸림). 던전 분위기(하늘·노출·바닥)는 `DungeonDefs.theme` 수치만 바꾼다. 후처리 켜고 끄기는 `RenderPipeline.setQuality`, 그림자 해상도는 `DungeonScene.applyQuality`.
- 게임 루프: `Game.frame()` 이 흐른 시간을 `performance.maxStep`(0.05초) 단위의 `simulate(dt)` 로 나눠 돌리고 한 번 그린다. 시간에 따라 움직이는 로직은 `simulate` 안에, 화면 갱신·FPS 측정은 `frame` 에 둔다.
- 성능(그리기 호출): 복셀 모델은 `mergeStaticMeshes(root)` 가 리그 뒤에 같은 관절·같은 재질 값(`materialKey`, 색 제외 → 색은 정점 색으로 굽는다)의 메시를 합친다(플레이어 209 → 32). 합친 뒤 발광 재질은 `collectEmissiveMaterials` 로 다시 모은다. 던전 소품은 `Decor` 가 `mergeStaticProps` 로 전체를 재질 값별로 합친다 — 매 프레임 바뀌는 메시(불꽃·등불)는 `userData.animated = true` 로 표시해야 제외된다. 메시 이름으로 부품을 찾는 코드는 `meshHasPart(mesh, /^eye/)` 처럼 써야 합친 뒤에도 동작한다. 측정은 `getDebugState().renderInfo`(스크래치 `perf-quality.cjs`).
- 성능: 자동 화질은 `Game.updateAutoQuality` 가 `GameConfig.performance` 간격으로 `decideQuality` 를 호출해 설정을 낮춘다(올리지 않음). WebGL 끊김은 `contextLost` 플래그로 프레임을 건너뛴다. 프레임 예외는 `loop` 의 try/catch 가 루프를 멈추고 저장한 뒤 다시 던진다(ErrorOverlay 표시).
- 플레이어 모델(현재 코드 모델 `HeroModel.ts`, manifest `player: null`): 외형 수정은 `createHeroModel` 의 치수·재질(M)·배치를 고친다(둥근 부품은 `rbox/sphere/capsule/ring/blob` 도우미). 관절 그룹(torso/head/legL·R/armL·R upper·lower)만 유지하면 동작·장비 부착이 그대로다. 확인은 스크래치 `shots39.cjs`(게임 안 근접). 파일 모델로 바꾸려면 manifest `player.file` 을 적는다. 둥근 복셀판(`player-chibi.glb`, 리그 경로)의 외형 수정은 `tools/make_player_chibi_glb.py` 의 치수·색·배치를 고치고 다시 실행(둥근 부품은 `voxel_shapes`, 얼굴 부품은 `head_surface_z` 로 구면 위에 놓는다). 머리에 붙는 부품 이름은 head/hair/eye/glass/brow/nose/mouth/ear 로 시작해야 한다(`tests/models.test.ts` 가 확인). 대안인 KayKit 기사(CC0): 클립이 있는 .glb 는 `createSkinnedPlayerModel` 이 맡는다. 새 클립 역할을 넣으려면 `skinnedClips.ts` 의 CANDIDATES/ATTACK_STEPS 에 후보를 적고 `SkinnedPlayerModel.update` 의 우선순위에 끼운다. 한 번 재생 동작은 `playOnce(action, seconds)`(클립을 seconds 에 맞춰 빨리 감음) → `oneShotEnd` 가 지나면 이동/정지로 돌아간다. 장비 부착 자리는 `buildAttach`(바인드 자세 행렬 역행렬 저장, `attachToBone`). 뼈 이름은 GLTFLoader 가 '.' 을 지우므로 `norm()` 으로 비교. 같은 팩의 다른 캐릭터로 바꾸려면 `tools/prune_glb.mjs` 로 클립을 추린 뒤 manifest `player.file` 만 바꾼다. 외부 에셋은 CC0 만, 출처·라이선스·용량을 `public/models/README.md` 에 기록한다.
- 모델 교체: `.glb` 는 `public/models/` + `manifest.json`. 생성 함수(`createEnemyModel`, `createBossModel`, `Game.swapPlayerModel`)가 `modelRegistry` 에서 먼저 찾고 없으면 임시 모델을 만든다. 적·보스는 다음 생성부터 적용. 얼굴 사진은 `PlayerModel.setFace`(임시 모델만 구현). 현재 `player.glb`(아들 복셀 캐릭터, `tools/make_player_glb.py` 로 생성, Y-up·정면 +Z)가 들어 있고, 클립이 없어 `PartRig` 가 부품 이름으로 관절을 만든다. 캐릭터 외형을 바꾸는 요청은 스크립트의 박스를 고치고 다시 생성한다(브라우저에서 모델만 보는 뷰어는 Playwright importmap 방식으로 three 를 vite 에서 불러 쓴다). 부품 이름 규칙을 바꾸면 `classifyPart` 와 `tests/models.test.ts` 를 함께 고친다. 'glb 없음' 경로의 브라우저 검증은 Playwright `page.route` 로 manifest 를 비워서 한다(저장소 manifest 파일을 고쳐 쓰지 않는다).
- 음악 분위기: `soundDefs.MUSIC_MOODS`(normal/calm/tense/battle: 템포·드럼·멜로디·패드 배율)와 `moodForZone(kind, cleared)` 가 구역 종류를 분위기로 바꾼다. `Game` 이 현재 구역이 바뀌거나 정리될 때 `audio.setMood()` 를 부르고, 보스 등장·던전 시작은 normal 로 되돌린다. 새 구역 종류를 넣으면 `moodForZone` 에도 넣는다.
- 소리: 새 효과음은 `soundDefs.SFX` 에 레시피(`parts` + `reverb/pitchJitter/gainJitter`)를 추가하고 `Game` 에서 `this.audio.play('이름')`. 음악은 `MUSIC` 에 트랙(베이스 16칸 = 멜로디·드럼 32칸, 코드는 베이스와 같은 길이, 첫 칸은 코드 필수)을 추가하고 `Game.dungeonMusic()` 매핑. 저장소에는 음원 파일을 두지 않고 합성으로 동작하되, 사용자가 `public/sounds/manifest.json` 에 적은 파일(CC0 등 라이선스 확인)은 같은 이름의 효과음·음악을 대신한다(`SoundRegistry` 가 받고 `AudioSystem` 이 디코딩, 없거나 실패하면 합성음). 소리는 첫 사용자 조작 뒤에만 난다(브라우저 제한) — 테스트에서는 키 입력 뒤 `audio.ready/voices` 를 보고, 파일 경로는 Playwright `page.route` 로 manifest 와 wav 를 가로채 검증한다(저장소 파일은 건드리지 않음).
- 진동은 `utils/haptics.ts` 의 `vibrate()` 를 `settings.haptics` 확인 후 호출한다. 터치 전용 표시(자동 조준 고리 `aimRing`)는 `settings.touchControls` 일 때만 보인다.
- "아이템이 더 자주/레벨이 빨리" → `loot.healChance/goldChance`, `progression.xpBase/xpGrowth`.
- 플레이어 공격력: `CombatSystem` 이 레벨 배율(`() => stats.damageMultiplier`)과 무기 공격력(`(kind) => equipment.weaponAttack(kind)`)을 함수로 받는다. 피해 = (기본 + 무기) × 배율.
- 방어력은 `Game.damagePlayer` 에서 `applyDefense` 로, 체력 보너스는 `Game.applyStats`, 속도 보너스는 `PlayerController` 의 배율 함수로 적용된다. 새 능력치를 추가하면 이 세 곳을 확인한다.
- 새 장비 → `ItemDatabase.ts` 의 `ITEM_TEMPLATES` 에 항목 추가 (분류 melee/ranged/armor/trinket, 일반 등급 기준 수치). 무기는 `style`(`GameConfig.combat.weaponStyles` 키, 근접은 melee·원거리는 ranged 설정이 있는 것), 방어구는 `look`(vest/plate/suit/cloak), 외형 색 `color` 를 적는다. `tests/weaponStyle.test.ts` 가 확인.
- 무기 공격 방식: `combat.weaponStyles.<키>` 에 `look`(손에 보일 외형) + `melee{steps, window, cooldownMul}`(콤보 단계 전체) 또는 `ranged{count, spreadDegrees, speedMul, radiusMul, cooldownMul, lifetimeMul, knockbackMul, pierce, color}`. `CombatSystem` 은 `getWeaponStyle(kind)`(Game 이 `weaponStyleFor(kind, equipped[kind])` 로 넘김)만 보고 `meleeComboFor` 로 콤보를 고른다. 'sword'·'blaster' 는 무기가 없을 때의 기본이며 `sword.melee.steps` 는 `combat.melee.combo.steps` 와 같은 값이어야 한다(테스트). 새 외형(`WeaponLook`)을 추가하면 `EquipmentVisuals.buildWeaponModel` 에 분기를 더한다.
- 장비 자동 장착: `Game.collectItem(item, pos)` 한 곳이 `equipment.pickup(item, settings.autoEquip)` → 효과·배너·`applyStats`·`refreshEquipment`. 점수는 `EquipmentSystem.score`(가중치 `equipment.autoEquipWeights`). 장비가 바뀌는 모든 경로(획득, 장비 화면 `onChange`, 저장 불러오기, 새 게임)는 `refreshEquipment()` 를 불러 외형을 맞춘다. 테스트는 `__heroX.debugGiveItem('axe_heavy','rare')` + `getDebugState().equipment.styles/gear`(스크래치 `smoke36.cjs`).
- 장비 외형 붙이는 자리: `.glb` 플레이어는 `buildPartRig` 가 돌려주는 `attach`(`swordArm/otherArm/body/weaponHold/armLength/torsoBox`). 원래 무기 메시는 리그가 `weaponHold` 그룹으로 분리해 두므로(메시 합치기 때 팔과 안 섞임) 교체 무기를 들면 숨길 수 있다. 무기 그룹은 손(관절 기준 (0, -팔길이×0.95, 0))이 원점이고 +Z 로 뻗는다. 임시 모델은 `armR.elbow`/`armL.elbow`/`torso`. 모델을 바꿔도 `Player.setModel` 이 마지막 외형을 다시 입힌다.
- 투사체는 `SWEEP_STEP`(0.35) 이하로 나눠 움직이며 충돌을 본다(빠른 탄 터널링 방지). 관통은 `ProjectileSpec.pierce`.
- 던전 추가·수정 → `DungeonDefs.ts` 의 `DUNGEONS` 에 항목 추가/수정 (해금은 `requiresClear`, 보스는 `boss` 에 바꿀 값만). **여정형 던전**은 `journey`(구역 `zones`·통로 `corridors`·문 `gates`, `halfX/halfZ` 직사각형 범위, `start`)를 적는다: 적은 `spawns: []` 로 두고 구역 `waves`(`enter`/`half`)로 등장, 정예는 `elite`(체력 배율, 1.5 이상이면 몸집·이름 배너), 보스는 `boss.spawn` 을 보스 구역 안에, 상자·장애물은 걷는 사각형 안에. 벽은 적지 않는다(`buildWallBoxes` 가 격자로 만든다). 메인 경로는 `mainIndex` 순서, 선택 경로는 `mainIndex` 없이. `tests/journey.test.ts` 가 연결성(BFS)·구역 안 배치·문 위치·벽 구멍을 검사한다. 지도를 눈으로 보려면 Playwright 로 `/src/game/DungeonDefs.ts` 를 import 해 캔버스에 그린다(스크래치 `map-journey.cjs`). `GameConfig.world.obstacles/dungeon.chests/enemies.spawns` 는 여정이 없는 열린 경기장 던전의 기본값(현재 숲은 안 씀). `tests/dungeons.test.ts` 가 모든 던전의 배치 겹침·영역을 검사한다. 던전 교체는 `Game.loadDungeon` 한 곳(공간·상자 새로 생성, 충돌 세계는 껍데기 객체로 공유).
- 적 공격 방식 `attackKind`: 'melee'(기본) / 'ranged'(`projectileSpeed`, 여러 발이면 `projectileCount`+`spreadDegrees`) / 'charge'(`EnemyAI` 의 charge 상태: 예고 끝 방향으로 `chargeSpeed`·`chargeDuration` 돌진, `AIDecision.speedMul`, 닿으면 attackNow, 피격으로 안 멈춤) / 'explode'(`Game.onEnemyAttack` 이 `explodeRadius` 범위 피해 + 효과 + 그 적을 처치 처리). 죽을 때 갈라지는 적은 `splitInto`(`Game.splitOnDeath` → `ZoneSystem.attach` 로 그 구역에 붙여 클리어 판정에 포함). 몸집 무작위는 `enemies.sizeJitter`(보기용). 적 종류 10종: rusher·shooter·tank·stalker·artillery·archer·slime·slimelet·bomber·charger.
- 새 적이 기존 외형을 써도 되면 `enemies.types.<종류>.model` 에 'rusher' | 'shooter' | 'tank' 를 적는다. 던전 분위기에 맞춰 **같은 종류를 다른 외형**으로 내보내려면 적 배치에 `skin: '<manifest enemies 키>'` 를 적는다(요새는 `robot-<종류>` → `enemy-*.glb` 로봇; `DungeonDefs` 의 `R()` 도우미). `EnemySpawner.spawn(..., skin)` → `createEnemyModel(type, def, skin)` 이 `enemy:<skin>` 을 먼저 찾는다.
- 여정 던전은 네 개(`FOREST_JOURNEY`·`CAVE_JOURNEY`·`FORTRESS_JOURNEY`·`ICE_JOURNEY`). 구역 소품 표는 던전별(`decorLayout.zonePropsFor`: 숲 `ZONE_PROPS`, 동굴 `CAVE_ZONE_PROPS`, 요새 `FORTRESS_ZONE_PROPS`, 얼음 `ICE_ZONE_PROPS`). 새 던전 추가 = `DUNGEONS` 항목(여정·테마·보스) + `DECOR_KINDS`/소품 표 + `MUSIC` 트랙 + `Game.dungeonMusic` 매핑 + (새 보스 외형이면) `make_bosses_glb.py` 빌더·`BossModelKind`·manifest. `tests/journey.test.ts`·`tests/decor.test.ts` 는 여정이 있는 모든 던전을 돈다. 브라우저 공통 시나리오는 스크래치 `smoke30.cjs <id>`(구역 중심을 차례로 돌며 등장 수·증원·문·보스·결과·선택 구역 정예 배너 확인), 지도는 `map-journey.cjs <id>`.
- 터치 조작: 조이스틱은 기본 '떠다니는' 방식(`.touch-zone` 전체 화면, 버튼보다 아래 층; 설정 `floatingJoystick`). 새 동작 버튼은 `TouchControls.ts` 의 HTML 에 `data-code`(GameConfig.controls 의 키 코드)만 적으면 된다. 터치 조작이 켜지면 `Game.getAimPoint` 가 자동 조준(`nearestEnemyPoint`)을 쓴다. 휴대폰 기본값(그림자 끔·해상도 0.8)은 `Settings.defaultSettings` 에서 `isTouchDevice()` 로 정한다. 모바일 검증은 Playwright `devices['Pixel 5']` 에뮬레이션 + `PointerEvent(pointerType: 'touch')` 로 한다.
- 앱 설치(PWA): 서비스 워커 템플릿은 `src/pwa/sw.js`(public 에 두지 않는다 — 버전 치환을 위해 `vite.config.ts` 의 `serviceWorkerPlugin` 이 빌드 때 `dist/sw.js` 로 내보낸다). 개발 서버(`npm run dev`)에서는 등록하지 않는다 — 같은 주소 `/src/style.css` 가 모듈과 스타일로 다르게 서빙돼 캐시가 섞여 화면이 안 뜨기 때문(`import.meta.env.DEV` 검사). 캐시 이름은 `hero-x-<version>` 이라 `package.json` 버전을 올리면 옛 캐시가 정리된다. 설치 버튼은 `MainMenu` 의 `#menu-install`(`installHint()` 가 'prompt' 면 프롬프트, 'ios' 면 안내 상자). 검증은 `vite preview` 로 빌드 결과를 띄우고 `context.setOffline(true)` 후 새로고침(스크래치 `smoke34.cjs`). 서비스 워커는 localhost/127.0.0.1 또는 HTTPS 에서만 동작한다.
- 배포: `hero-x` 브랜치에 push 하면 워크플로가 `npm run check` 후 `dist` 를 main 의 `game/` 에 넣는다. main 의 다른 파일은 건드리지 않는다(`keep_files: true`). 배포 주소는 README 3-1.
- 창 층위는 CSS `.guide`(20) > `.guide.result`(15) > `.guide.menu`(10). 메뉴 위에 여는 새 창은 기본 `.guide` 층위를 그대로 쓴다.
- "상자를 더/보상을 더 좋게" → 첫 던전은 `dungeon.chests` 배열, 다른 던전은 `DungeonDefs.ts`. 상자 보상은 `dungeon.chestLoot`(공통). 상자 위치는 장애물·적 배치와 겹치지 않아야 한다 (`tests/chest.test.ts` 가 확인).
- 상호작용(E)이 필요한 새 물체는 `Game.tryInteract` 에 분기를 추가하고 HUD 안내 문구(`currentPrompt`)를 함께 처리한다. 보물 상자는 설정 `chestQuiz`(기본 켬)가 켜져 있으면 `QuizUI` 로 수학 문제를 먼저 풀고(`paused`), 맞히면 `openChestNow`. 문제 범위를 바꾸려면 `mathQuiz.ts` 의 종류별 숫자 범위만 고친다.
- 클리어 뒤 흐름: `showResult(title, sub, next)` 에 다음 던전을 넘기면 `ResultUI` 가 '다음 던전' 버튼과 카운트다운(`dungeon.autoAdvanceSeconds`, 0 이면 버튼만)을 보여주고 끝나면 `enterDungeon(next)`. 다른 버튼을 누르면 취소.
- 공격 입력: `CombatSystem` 은 `onPress` 로 예약 플래그를 세워 쿨다운 중이나 프레임 사이의 짧은 탭도 쿨다운이 끝나는 즉시 한 번 나가게 한다. 반응 속도는 `combat.melee.cooldown`(0.34)과 `PartRig` 의 뒤로 당김 비율(12%)로 조정.
- 근접 콤보: `combat.melee.combo.steps`(단계별 배율·각도·방향 sweep·색)와 `combo.window`(쿨다운이 끝난 뒤 이어가기 시간). `CombatSystem.comboStep/comboTimer` 가 단계를 추적하고 `combo.ts` 의 `nextComboStep` 이 다음 단계를 정한다(마무리 뒤·시간 초과면 0). 단계는 `player.triggerAttack(swingTime, 'melee', step)` → `PlayerModelState.attackStep` 으로 모델에 전달(`PartRig`: 1단 가로, 2단 반대쪽, 3단 회전 `spin`; 원거리 `attackKind: 'ranged'` 는 팔 뻗기+반동). 단계를 늘리면 `PartRig`/`PlaceholderModel` 의 `step >= 2` 분기가 그대로 회전 베기로 쓰인다. 마무리 연출은 `juice.comboFinish`, 소리는 `Game` 의 `combat.onAttack(kind, step, finisher)` 에서 `audio.play(name, gap, pitchMul)`. HUD 표시는 `hud.showCombo`. 테스트는 `getDebugState().combo`(스크래치 `smoke35.cjs`: 공격이 나간 직후 바로 다음 키를 눌러야 헤드리스에서도 이어진다).
- 원거리 연출: 총구 섬광·파편은 `CombatSystem.rangedAttack`(`effects.flash`), 꼬리는 `ProjectileSystem`(탄마다 꼬리 메시, `juice.ranged.trailLength`), 명중·벽 충돌 연출은 `ProjectileContext.onImpact` 를 `Game` 이 받아 `effects.flash/burst/shockwave`. 섬광 시간(`muzzleTime/impactTime`)은 헤드리스 검증 때 늘려서 관찰한다(한 프레임에 0.3초 이상 흐르면 0.18초 섬광을 못 본다).
- "보스를 약하게/세게" → `boss.hp`, `boss.slam.damage`, `boss.contactDamage`, `boss.windup`(예고가 길수록 쉬움). 던전별 보스는 `DungeonDefs.ts` 의 `boss` 덮어쓰기. 패턴 구성은 `boss.closePatterns`(순환 순서)와 `boss.useCharge`, 외형은 `boss.model`('guardian' | 'golem' | 'commander' | 'frost'). 새 보스 패턴은 `BossPattern` 타입 + `boss.windup` 항목 + `Boss.update` 의 실행 분기 + `Game.onBossAttack` 의 효과 처리에 추가한다(시간이 걸리는 효과는 `Game.updateMortars` 처럼 루프에서 진행). 새 외형은 `tools/make_bosses_glb.py` 에 복셀 모델을 추가해 `manifest.json` `bosses.<외형>` 에 등록(코드 모델은 `createBossModel` 의 `kind` 분기). .glb 보스는 `decorateGltfBoss` 가 패턴 색 바닥 원과 2단계 붉은 눈(`eye_*` 재질)을 덧입힌다. 보스가 가까우면(`camera.bossZoom.range`) 카메라가 `bossZoom.scale` 배 멀어진다. 테스트: `__heroX.debugSetBossHpRatio(0.2)` 로 2단계, `__heroX.debugSpawnDrop('xp', 5000)` 로 레벨 업, `debugSpawnDrop('equip', 1, 'legendary')` 로 희귀 드롭을 만든다.
- 보스 등장 팝업: `spawnBoss` 끝에서 설정 `bossIntro` 가 켜져 있고 `mode === 'play'` 면 `paused = true` 후 `bossIntroUI.show(cfg, maxHp, onClose)`; 닫히면 `paused = false` 와 `lastTime` 재설정. 보스 설명 문구는 `BossConfig.title/lore`(던전별 `boss` 덮어쓰기), 패턴 표는 `describeBossPatterns` 가 설정에서 만든다(새 패턴을 추가하면 여기에도 분기). Escape 는 팝업이 열려 있으면 팝업만 닫는다. 자동 테스트에서 팝업을 피하려면 설정 `bossIntro: false`.
- 승리 흐름은 `Game.checkVictory`: 열린 경기장은 일반 적 전멸 → `spawnBoss`, 여정 던전은 보스 구역 진입(`ZoneSystem.onBossZone`) → `spawnBoss` → 보스 사망 → `onBossDefeated`(보상) → 결과 화면(다음 던전 카운트다운). HUD 목표는 `hud.setObjective`, 다음 목표 구역엔 빛 기둥 `beacon`. 테스트에서는 `__heroX.debugDefeatRegularEnemies()` 로 바로 보스전으로 간다.
- 사용자 설정은 `Settings.ts` 의 `UserSettings`/`SETTING_DEFS` 에만 추가한다(화면은 자동 생성). 게임 코드는 `GameConfig.hud/debug/graphics` 대신 `this.settings` 를 읽는다. 플레이어 체력·공격력은 `effectiveMaxHp()`/`effectiveDamageMultiplier()` 를 거친다. 난이도는 `setDifficulty` 한 곳에서 설정·저장·메뉴를 함께 갱신한다.
- 저장: 성장·장비·난이도·기록만 저장하고 던전 안 상태는 저장하지 않는다. 저장 형식을 바꾸면 `SAVE_VERSION` 을 올리고 `migrateSaveData` 에 변환을 추가한 뒤 `tests/save.test.ts` 에 옛 형식 → 새 형식 테스트를 더한다. 장비는 원형 id·등급만 저장하고 `createItem` 으로 다시 만든다. 저장 시점은 `Game.markDirty()`(자동 저장 간격 뒤) 또는 `Game.saveNow()`(메뉴·결과·탭 닫기)로만 다룬다. 저장 데이터 초기화는 사용자가 '새 게임'을 확인했을 때만 한다.
- 인트로 연출: `Game.startIntro(next)` 가 숲 던전을 초기화하고 `IntroSet`(교실 세트, 학교 이름은 `GameConfig.meta.school`)을 올린 뒤 `mode = 'intro'` 로 `IntroDirector` 를 돌린다(메뉴 '인트로 보기', 처음 '새 게임' 때 한 번 — `hero-x.introSeen` 플래그). `frame()` 은 인트로 시간 배율을 곱해 `simulate()` 하고 연출기가 카메라·자막을 덮어쓴다. 인트로 중에는 피해 없음(`damagePlayer` 반환), 드롭 없음, 승리 판정·자동 저장 없음. 아무 키·화면 터치·건너뛰기 버튼이 `endIntro()` 를 부르고 `restart()` 로 던전을 복구한다. 장면·카메라 수치는 `introTimeline.ts` 만 고친다. 브라우저 테스트는 시작 전에 `localStorage.setItem('hero-x.introSeen','1')` 을 넣어 인트로를 건너뛴다.
- 게임 흐름은 `Game.mode`('menu' | 'play' | 'result' | 'intro') 하나로 관리한다. 메뉴·결과 전환은 `newGame / continueGame / retry / openMenu / showResult` 만 사용하고, 루프는 `mode !== 'play'` 이거나 `paused` 면 그리기만 한다. 브라우저 자동 검증은 `#menu-new` 버튼으로 시작한다.
- 주의: 3D 효과의 방향을 바꿀 때는 `node -e` 로 벡터에 회전을 적용해 보고 확인한다 (2-b 의 부채꼴 반대 방향 버그 참고). 키를 '누르는 순간' 반응해야 하는 동작(점프 등)은 폴링이 아니라 `InputManager.onPress` 로 받는다 (낮은 FPS 에서 짧은 탭을 놓침).
- 새 적 종류 → `enemies.types` 에 능력치 추가 + 외형은 `tools/make_monsters_glb.py`(또는 로봇은 `make_enemies_glb.py`)에 복셀 모델을 추가하고 `manifest.json` `enemies.<종류>` 에 등록(또는 `EnemyModels.ts` 임시 모델 분기) + (행동이 다르면) `EnemyAI.ts` 확장. 적 .glb 의 재질은 개체마다 복제되므로(`cloneMaterials`) 피격 번쩍임·발광이 섞이지 않는다.
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
8. 2차 개선(`docs/2차개선-분석과-계획.md`) — 1 빠른 개선 ✅ v1.8.0 / 2 모바일 UI ✅ v1.8.1 / 3 여정형 첫 던전 ✅ v1.9.0 / 4 그래픽 고도화 ✅ v1.10.0 / 5 다른 던전 확장(동굴·요새 여정형, 로봇 공장 테마) ✅ v1.11.0 / 적 10종 ✅ v1.12.0 / 메시 합치기 ✅ v1.13.0 / 네 번째 던전 얼음 봉우리 ✅ v1.14.0 / 소품 합치기·구역 음악 분위기 ✅ v1.15.0 / 벽·장애물 그래픽 ✅ v1.16.0 / 보스 등장 팝업 ✅ v1.17.0 / 앱처럼 설치(PWA) ✅ v1.18.0 / 근접 3단 콤보·원거리 연출 ✅ v1.19.0 / 장비 자동 장착·무기별 공격 방식·장비 외형 ✅ v1.20.0
9. 캐릭터 리뉴얼·애니메이션 개선(지시서 2차): 1~3 분석·모델 확보(KayKit CC0)·교체 호환 ✅ v1.21.0 / 둥근 복셀 아들 캐릭터로 교체 ✅ v1.22.0 / 매끈한 카툰 치비(코드 모델) ✅ v1.23.0 / 코드 모델 고급화(머리카락 결·네모 안경·후드 코트·질감) ✅ v1.24.0 / 4~5 애니메이션 상태·공격 동기화 / 6 이동 가속·감속 / 7 회전·카메라 / 8~9 충돌·모바일·로딩 표시

각 단계는 완료 기준을 만족하고 기존 기능이 정상일 때만 다음 단계로 넘어간다.
