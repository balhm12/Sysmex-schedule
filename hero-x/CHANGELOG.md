# 변경 내역

형식: 날짜 · 버전 · 변경 내용 · 수정 파일 · 테스트 결과 · 알려진 문제

## 2026-10-23 · v0.6.2 · 6단계 완료 (보스별 고유 패턴·외형)

### 변경 내용
- **보스 패턴 구성이 설정으로**: `boss.closePatterns`(가까울 때 쓰는 패턴 순서, 순환)와 `boss.useCharge`(돌진 사용 여부)를 던전 정의에서 고른다. `BossAI` 는 이 목록대로 순환한다.
- **새 패턴 2개**
  - `summon` 부하 소환: 보스 둘레에 `boss.summon.type` 적을 `count` 마리 부른다(2단계 `phase2Count`). 같은 종류가 `maxAlive` 이상 살아 있으면 더 부르지 않는다.
  - `mortar` 포격 낙하: 플레이어 자리와 주변(`spread`)에 주황 예고 원이 찍히고 `delay` 초 뒤 터진다. 범위 안이면 피해, **점프 중(높이 1 이상)이면 피하기**. `Effects.marker` 가 예고 원을 그린다.
- **보스 3종 차별화**
  - 숲의 수호 로봇(guardian): 그대로 — 돌진 + 내려찍기/탄막, 왕관·망치 팔.
  - 수정 골렘(golem): **돌진 없음**, 내려찍기 → 소환(박쥐 드론 2/3마리, 최대 4) → 탄막 순환, 예고가 길고 느림. 둥근 바위 몸통·수정 뿔·주먹 팔.
  - 요새 사령관(commander): 돌진 + 포격(4/6발, 반지름 2.6, 피해 22) → 탄막 → 내려찍기 → 포격, 예고 짧음. 각진 몸통·어깨 포탑·포신 팔.
- 보스 외형은 `boss.model` 로 고른다 (`createBossModel(def, kind)`).
- 지시서 6단계 완료 기준(던전 2~3개, 던전 선택, 적·보스·장비 추가) 충족. 밸런스는 1차 수치이며 플레이 의견을 받아 조정한다.

### 수정 파일
- 수정: `src/enemies/{BossAI,Boss}.ts`, `src/combat/Effects.ts`, `src/game/{Game,GameConfig,DungeonDefs}.ts`, `tests/{boss,dungeons}.test.ts`, `package.json`

### 테스트 결과 (실제 실행)
- `npm run typecheck`: 통과 · `npm test`: 95개 통과(패턴 순환·돌진 비활성 테스트 추가) · `npm run build`: 성공
- 브라우저 검증(Playwright): 수정 동굴 보스 등장(golem 외형) → 20초 동안 소환으로 박쥐 드론이 2마리 생기고 돌진 상태가 나오지 않음 → 강철 요새 보스(commander 외형) → 포격 예고 4개가 찍힌 뒤 폭발로 체력 570→555 → 숲 보스는 guardian 외형에 돌진 유지. 던전 흐름·숲 보스 회귀 통과. 콘솔 오류 없음.

### 알려진 문제
- 보스마다 외형이 다르지만 모두 코드로 그린 임시 모델이다. 7단계에서 정식 모델 교체 구조(glb 로딩)를 검토한다.
- 밸런스(던전 2·3 권장 레벨, 포격 피해, 소환 수)는 실제 플레이 의견이 필요하다.

## 2026-10-23 · v0.6.1 · 모바일 지원 (터치 조작·화면 맞춤·GitHub Pages 배포)

### 변경 내용
- **터치 조작** (`src/input/TouchControls.ts`): 왼쪽 가상 조이스틱(이동), 오른쪽 근접·원거리·점프 버튼, 상자 근처에서만 보이는 `열기` 버튼, 위쪽 `장비`·`메뉴` 버튼. 버튼은 `GameConfig.controls` 의 키 코드를 `InputManager` 에 가상으로 눌러 기존 입력 경로를 그대로 쓴다. 손가락 터치는 마우스 버튼·마우스 조준으로 취급하지 않는다.
- **자동 조준**: 터치 조작이 켜져 있으면 `combat.autoAimRange`(14) 안의 가장 가까운 적을 겨눈다 (`Game.nearestEnemyPoint`). 적이 없으면 바라보는 방향으로 공격.
- **설정 추가**: `터치 조작`(기본: 터치 기기면 켜짐), `렌더 해상도` 0.5~1.5× (휴대폰 기본 0.8). 휴대폰은 그림자가 기본 꺼짐. 기기 판별은 `src/utils/device.ts`.
- **화면 맞춤**: 900px 이하·낮은 화면에서 창·HUD·설정·던전 카드 레이아웃 축소, 세로로 들면 "가로로 돌리세요" 안내, 확대·더블탭 줌 방지(viewport meta), 캔버스 `touch-action: none`, 홈 화면 추가 시 전체 화면 메타.
- **GitHub Pages 배포**: `.github/workflows/deploy-hero-x.yml` — `hero-x` 브랜치에 올리면 검사·빌드 후 결과를 **main 브랜치 `game/` 폴더**에 넣는다(다른 파일은 건드리지 않음). 주소: https://balhm12.github.io/Sysmex-schedule/game/
- 같은 와이파이에서 휴대폰으로 PC 개발 서버에 접속하는 방법을 README 에 추가 (`npm run dev -- --host`).

### 수정 파일
- 신규: `src/input/TouchControls.ts`, `src/utils/device.ts`, `../.github/workflows/deploy-hero-x.yml`
- 수정: `index.html`, `src/game/{Game,GameConfig,Settings}.ts`, `src/input/InputManager.ts`, `src/style.css`, `package.json`

### 테스트 결과 (실제 실행)
- `npm run typecheck`: 통과 · `npm test`: 94개 통과 · `npm run build`: 성공
- 브라우저 검증(Playwright, Pixel 5 터치 에뮬레이션 가로 851×393, dpr 2): 기본값 터치 켜짐·그림자 꺼짐·해상도 0.8(pixelRatio 1.6) → 새 게임에서 터치 UI 표시 → 조이스틱으로 이동(z 0→1.5) → 근접 버튼이 자동 조준으로 적 체력 35→23 → 원거리 버튼 투사체 발생 → 점프 버튼 높이 1.17 → 상자 옆에서만 `열기` 버튼, 누르면 상자 열림 → 메뉴 버튼으로 메뉴(터치 UI 숨김) → 설정에서 터치 끄면 UI 안 보임. PC 환경 기본값(터치 꺼짐·그림자 켜짐)도 확인. 메뉴·설정 회귀 통과. 콘솔 오류 없음.
- 실제 휴대폰 기기에서의 확인은 아직 하지 않았다 (에뮬레이션만). 배포 후 사용자 확인 필요.

### 알려진 문제
- GitHub Pages 의 저장은 PC 의 `localhost` 저장과 별개다(브라우저 저장소가 주소별). 진행 공유(내보내기/가져오기)는 다음 묶음에서 검토.
- iOS Safari 는 홈 화면에 추가하지 않으면 위·아래 브라우저 막대가 화면을 가린다. 가로 모드 권장.

## 2026-10-23 · v0.6.0-a.1 · 6단계 첫째 묶음 (던전 3개·던전 선택·새 적·새 장비)

### 변경 내용
- **던전 정의 데이터화**: `src/game/DungeonDefs.ts` 의 `DUNGEONS` 배열 하나로 던전(크기·색·조명·장애물·상자·적 배치·보스·보상 배율·해금 조건)을 정의한다. 던전 공간(`DungeonScene`)·상자·적 배치·보스가 모두 정의를 읽어 만들어진다. 첫 던전 '잊혀진 숲'은 기존 `GameConfig` 값을 그대로 쓴다.
- **새 던전 2개**: ② **수정 동굴**(권장 레벨 4, 어두운 보라색 동굴, 적 14, 보스 '수정 골렘' 체력 650·내려찍기 넓음), ③ **강철 요새**(권장 레벨 8, 격벽과 포탑 받침, 적 18, 보스 '요새 사령관' 체력 900·빠른 패턴·탄막 12/18, 보상 영웅 등급 보장). 보상(골드·경험치) 배율 1.3×, 1.6×.
- **던전 선택 화면**: 메인 메뉴 `던전 선택`, 결과 화면 `던전 선택`. 이전 던전을 클리어해야 다음 던전이 열린다(카드에 잠김·클리어 횟수·권장 레벨 안내). 클리어 시 배너·결과 문구로 새 던전 해금을 알린다. 새로고침 뒤 '이어하기'는 던전 선택 화면으로 간다.
- **새 적 2종**: 박쥐 드론(stalker: 작고 빠른 근접형, 드론 외형 재사용), 요새 포대(artillery: 느리고 단단한 원거리형, 철벽 외형 재사용). `EnemyTypeConfig.model` 로 기존 외형을 재사용할 수 있다.
- **새 장비 4종**: 수정 창, 레일 라이플, 그림자 망토, 요새 코어 (총 16종).
- **저장 형식 v2**: 기록에 던전별 클리어 횟수(`dungeonClears`) 추가. v1 저장은 자동 변환(전체 클리어 횟수 → 숲 기록). 알 수 없는 던전 기록은 버리고 경고.
- **버그 수정**: 메뉴 위에 여는 창(던전 선택 등)이 메뉴 뒤에 깔려 클릭이 막히던 겹침 순서 문제 → 창 층위(z-index)를 메뉴 < 결과 < 보조 창으로 정리.
- `Dungeon01.ts` → `DungeonScene.ts` 로 이름 변경(내용은 던전 정의를 받도록 일반화).

### 수정 파일
- 신규: `src/game/DungeonDefs.ts`, `src/ui/DungeonSelectUI.ts`, `tests/dungeons.test.ts`
- 이름 변경: `src/dungeon/Dungeon01.ts` → `src/dungeon/DungeonScene.ts`
- 수정: `src/game/{Game,GameConfig}.ts`, `src/dungeon/Chest.ts`, `src/enemies/{Boss,EnemySpawner,EnemyModels}.ts`, `src/items/{ItemDatabase,LootSystem}.ts`, `src/save/SaveData.ts`, `src/ui/{MainMenu,ResultUI}.ts`, `src/style.css`, `tests/save.test.ts`, `package.json`

### 테스트 결과 (실제 실행)
- `npm run typecheck`: 통과 · `npm test`: 94개 통과(던전 8개·저장 변환 1개 추가; 세 던전 모두 적·상자·보스·장애물이 영역 안이고 서로 겹치지 않음을 검사) · `npm run build`: 성공
- 브라우저 검증(Playwright, 헤드리스 Chromium): 새 게임 → 던전 선택 카드 3장(숲만 열림) → 숲 보스 처치 시 "'수정 동굴' 이 열렸습니다" 결과 문구·기록 {forest:1} → 결과 화면 '던전 선택' → 동굴 입장(영역 24, 장애물 11+상자 3, 적 14 종류 4, 박쥐 드론 포함) → 보스 '수정 골렘' 체력 747(650×보통 1.15) → 클리어 후 요새 해금 → 새로고침 뒤 Enter 로 던전 선택 → 요새 입장(적 18, 포대 포함, 레벨 유지) → 포대 사격 확인 → v1 저장 넣고 새로고침 시 동굴만 해금. 메뉴·저장·설정·보스 회귀 통과. 콘솔 오류 없음.

### 알려진 문제
- 보스 3종은 외형이 같고 색·이름·수치만 다르다. 패턴·외형 차별화는 6-b 에서.
- 던전 2·3 의 밸런스(권장 레벨·보상)는 1차 수치라 플레이 후 조정이 필요하다.

## 2026-10-23 · v0.5.0 · 5단계 완료 (설정 화면)

### 변경 내용
- **설정 화면**: 메인 메뉴 `설정` 버튼. 항목은 `src/game/Settings.ts` 의 `SETTING_DEFS` 정의로 자동 생성된다.
  - 게임: 난이도(메뉴 버튼과 동기화, 바꾸면 던전 재시작), 카메라 거리 0.6~1.6×
  - 전투 수치: 내 최대 체력 0.5~3×, 내 공격력 0.5~3×, 적 체력 0.5~3×(난이도 배율에 곱함, 다음 던전 입장부터)
  - 화면: 피해 숫자 표시, 피격 시 화면 번쩍임, 그림자(즉시 반영), FPS 표시
- 바꾸는 즉시 적용·저장(`localStorage` 키 `hero-x.settings`, 버전 기록). 범위 밖·잘못된 값은 기본값·범위 안으로 보정. **기본값 복원**은 확인창을 거친다.
- 사용자 설정(플레이어가 바꾸는 값)과 개발자 설정(`GameConfig.ts`)을 분리했다. 기본값은 GameConfig 를 따른다.
- **버그 수정**: 다시 도전·던전 입장 때 레벨·장비의 최대 체력 보너스가 기본값으로 되돌아가던 문제(플레이어 reset 순서). 레벨 업이나 장비 변경 전까지 최대 체력이 100 으로 보이던 현상이 사라진다.
- 지시서 5단계 완료 기준(설정 변경이 게임에 반영되고 저장·이어하기가 동작) 충족.

### 수정 파일
- 신규: `src/game/Settings.ts`, `src/ui/SettingsUI.ts`, `tests/settings.test.ts`
- 수정: `src/game/{Game,GameConfig,CameraController}.ts`, `src/dungeon/Dungeon01.ts`, `src/ui/MainMenu.ts`, `src/style.css`, `package.json`

### 테스트 결과 (실제 실행)
- `npm run typecheck`: 통과 · `npm test`: 85개 통과(설정 4개 추가) · `npm run build`: 성공
- 브라우저 검증(Playwright, 헤드리스 Chromium): 설정 열기 → 그림자 스위치 끄면 렌더러 그림자도 꺼짐 → 카메라 1.4×·체력 2.0× 슬라이더로 최대 체력 200 → 설정 창의 난이도 '어려움'이 메뉴 버튼과 동기화, Esc 로 닫힘 → 새로고침 뒤 설정 유지, 새 게임에서 최대 체력 200·적 체력 48(30×1.6)·카메라 거리 15.4 확인 → 기본값 복원(확인창) 후 모든 값·렌더러 원복 → 손상된 설정(체력 99, 그림자 "x")은 3·true 로 보정. 메뉴·저장·보스 흐름 회귀 통과. 콘솔 오류 없음.

### 알려진 문제
- 소리(효과음·음악)는 아직 없어 사운드 설정도 없다. 7단계(품질 개선)에서 자체 제작 효과음과 함께 추가한다.
- 적 체력 배율은 이미 등장한 적에게는 적용되지 않는다 (설계: 다음 입장부터).

## 2026-10-23 · v0.5.0-a.1 · 5단계 첫째 묶음 (저장 시스템)

### 변경 내용
- **자동 저장**: 레벨·경험치·골드, 장비(가방·장착), 난이도, 기록(클리어·쓰러짐·누적 처치·최고 점수)을 브라우저 저장소(`localStorage`, 키 `hero-x.save`)에 저장한다. 골드·경험치·장비를 얻거나 바꾸면 `save.autoSaveInterval`(기본 3초) 뒤에, 메뉴를 열거나 결과 화면이 뜨거나 탭을 닫을 때는 즉시 저장한다.
- **이어하기**: 새로고침·재접속 뒤에도 메인 메뉴 '이어하기 (던전 입구부터)' 로 성장을 유지한 채 계속할 수 있다. 던전 안 위치·적 상태는 저장하지 않는다(설계).
- **새 게임**: 이어갈 진행이 있으면 확인창을 거쳐 저장 데이터를 새로 쓴다.
- **저장 데이터 버전·손상 처리**: 형식 버전(`SAVE_VERSION`)을 기록한다. JSON 이 깨졌거나 구조가 틀리면 `hero-x.save.corrupt` 키로 옮겨 두고 새로 시작하며, 범위를 벗어난 수치는 잘라내고 알 수 없는 장비는 버린다(콘솔 경고). 더 새로운 버전의 저장은 읽지도 덮어쓰지도 않고, '새 게임'을 눌러야 덮어쓴다.
- 장비는 '원형 id + 등급'만 저장하고 불러올 때 다시 만든다 → 밸런스 수치를 바꿔도 저장 데이터가 깨지지 않는다.
- 메인 메뉴에 진행 요약(레벨·골드·클리어 횟수·최고 점수)과 저장 상태(마지막 저장 시각, 손상·버전 안내)를 표시한다.

### 수정 파일
- 신규: `src/save/SaveData.ts`(형식·검증·변환·적용, 순수 함수), `src/save/SaveStorage.ts`(localStorage 어댑터·손상 격리), `tests/save.test.ts`
- 수정: `src/game/{Game,GameConfig}.ts`, `src/ui/MainMenu.ts`, `src/style.css`, `package.json`

### 테스트 결과 (실제 실행)
- `npm run typecheck`: 통과 · `npm test`: 81개 통과(저장 9개 추가) · `npm run build`: 성공
- 브라우저 검증(Playwright, 헤드리스 Chromium): 처음엔 '저장된 진행 없음'·이어하기 비활성 → 새 게임 직후 저장 파일(버전 1) 생성 → 골드 77 상태로 Esc → 저장 확인 → 새로고침 후 골드 77·이어하기(던전 입구부터) 활성·Enter 로 입장 → 쓰러짐 결과에서 기록 deaths 1 저장 → 장착한 '영웅의 생명의 반지'가 새로고침 뒤 복원(능력치는 원형·등급으로 재계산) → 깨진 JSON 은 corrupt 키로 보관되고 메뉴에 손상 안내 → 버전 99 저장은 읽지 않고 원본 유지, 새 게임 후 버전 1 로 덮어씀. 메뉴 흐름·보스 클리어 회귀 통과. 콘솔 오류 없음.

### 알려진 문제
- 저장은 브라우저별·PC별이다 (다른 브라우저나 PC 에서는 이어지지 않는다). 내보내기/가져오기는 설정 화면(5-b)에서 검토.
- 던전 안 진행(적·상자 상태·위치)은 저장하지 않으므로, 던전 도중 새로고침하면 입구부터 다시 시작한다.

## 2026-10-23 · v0.4.0 · 4단계 완료 (메인 메뉴, 던전 입장·결과 흐름)

### 변경 내용
- **메인 메뉴**: 게임을 켜면 메뉴가 먼저 보인다. 새 게임 / 이어하기(진행 중일 때만) / 장비 / 조작 안내 / 설정(5단계 예정, 비활성) / 난이도. Enter 로 이어하기 또는 새 게임.
- **흐름**: 새 게임 → 던전 입장(레벨·골드·장비 초기화, 진행 중이면 확인창) → 플레이 중 `Esc` 로 메뉴(던전 정지) → 이어하기 → 결과 화면(쓰러짐/클리어)에서 **다시 도전**(R, 성장 유지) 또는 **메인 메뉴**.
- 조작 안내는 메뉴 버튼이나 H 로 여는 보조 창이 됐고, 난이도 버튼은 메뉴로 옮겼다. 메뉴 중에는 HUD 를 숨긴다.
- 지시서 4단계 완료 기준(던전 입장부터 보스 처치와 결과 화면까지 한 번의 플레이) 충족.

### 수정 파일
- 신규: `src/ui/MainMenu.ts`
- 수정: `src/game/{GameConfig,Game}.ts`, `src/ui/{ControlsGuide,ResultUI}.ts`, `src/style.css`, `package.json`

### 테스트 결과 (실제 실행)
- `npm run typecheck`: 통과 · `npm test`: 72개 통과 · `npm run build`: 성공
- 브라우저 검증(Playwright, 헤드리스 Chromium): 시작 시 메뉴 표시·HUD 숨김·이어하기 비활성 → 조작 안내 열고 H 로 닫기 → 새 게임(모드 play, 적 11) → Esc 메뉴에서 적이 움직이지 않음 → 이어하기 후 위치 유지 → 쓰러짐 결과 화면 → 메인 메뉴 → 진행 중 새 게임 시 확인창, 확인 후 골드 0 초기화. 보스 처치→클리어 흐름 회귀 통과. 콘솔 오류 없음.

### 알려진 문제
- '이어하기'는 같은 브라우저 탭 안에서만 된다. 새로고침하면 사라진다 (저장은 5단계).
- 던전은 아직 하나뿐이라 던전 선택 화면은 없다 (6단계 콘텐츠 확장 때 추가).

## 2026-10-22 · v0.4.0-b.1 · 4단계 둘째 묶음 (보스전)

### 변경 내용
- **보스 "숲의 수호 로봇"**: 일반 적 11마리를 모두 처치하면 "등장!" 배너와 함께 (0, −20)에 나타난다. 체력 420(난이도 배율 적용), 밀려남 저항 0.1.
- **패턴 3개** (각각 바닥 원 예고): 돌진(멀 때, 주황) · 내려찍기 충격파(가까울 때, 붉은 원이 커짐, 반지름 4.5, **점프로 회피**) · 탄막(보라, 8발 원형). 체력 50% 이하 **2단계(분노)**: 예고·회복 30% 단축, 이동 1.3배, 탄막 12발이 플레이어 쪽으로 몰림, 눈이 붉어짐.
- **전용 체력바**(화면 위 가운데, 2단계 표시), 처치 시 골드 80~150 + 경험치 120 + **희귀 이상 장비 확정** + 큰 회복 아이템, "던전 클리어!" 배너와 결과 화면.
- 적 클래스 상속 구조 정리(`Enemy` 의 모델·방향·밀림 필드를 protected 로, 외형 생성 함수 주입), `EnemySpawner.addEnemy`, 충격파 효과, `Game.debugDefeatRegularEnemies()`(테스트용).

### 수정 파일
- 신규: `src/enemies/{BossAI,Boss}.ts`, `tests/boss.test.ts`
- 수정: `src/game/{GameConfig,Game}.ts`, `src/enemies/{Enemy,EnemySpawner}.ts`, `src/combat/Effects.ts`, `src/items/ItemDatabase.ts`, `src/ui/HUD.ts`, `src/style.css`, `package.json`

### 테스트 결과 (실제 실행)
- `npm run typecheck`: 통과 · `npm test`: 72개 통과 (보스 AI 5개, 보상·배치 2개 추가) · `npm run build`: 성공
- 브라우저 검증(헤드리스 Chromium, 개발 서버, 쉬움): 일반 적 전멸 직후 "숲의 수호 로봇 등장!" 배너와 체력바(336/336) 표시 → 보스 앞에서 15초 동안 windup→실행→recover→chase 순환, 충격파·돌진으로 체력 100→57, 탄막 동시 7발 → 디버그 검으로 처치하자 보상 드롭과 처치 플래그 → 보상 획득 후 "던전 클리어!" 결과 화면(골드 142, 레벨 6, 장비 1). 콘솔 오류·경고 없음.

### 알려진 문제
- 메인 메뉴(새 게임/이어하기/장비/설정)와 던전 선택은 4-c 에서. 현재는 결과 화면의 '다시 시작'으로 같은 던전을 반복한다.

## 2026-10-22 · v0.4.0-a.1 · 4단계 첫 묶음 (보물 상자, 던전 표시)

### 변경 내용
- **보물 상자** 3개 배치(`GameConfig.dungeon.chests`). 2.2 거리 안에 가면 화면 아래에 "E 보물 상자 열기" 안내가 뜨고, `E`(또는 `F`)로 연다. 뚜껑이 열리며 골드(15~40, 항상), 장비(80%), 체력 상자(50%)가 앞에 흩어진다. 한 번 연 상자는 다시 열 수 없고 전투 재시작 시 닫힌다. 상자는 통과할 수 없다.
- HUD 에 던전 이름("잊혀진 숲")과 연 상자 수 표시.

### 수정 파일
- 신규: `src/dungeon/Chest.ts`, `tests/chest.test.ts`
- 수정: `src/game/{GameConfig,Game}.ts`, `src/items/{loot,LootSystem}.ts`, `src/dungeon/Dungeon01.ts`, `src/ui/{HUD,ControlsGuide}.ts`, `src/style.css`, `package.json`

### 테스트 결과 (실제 실행)
- `npm run typecheck`: 통과 · `npm test`: 65개 통과 (상자 보상·배치 3개 추가) · `npm run build`: 성공
- 브라우저 검증(헤드리스 Chromium, 개발 서버): HUD 에 "잊혀진 숲"·상자 0/3 표시 → 상자 옆에 서면 "E 보물 상자 열기" 안내 → E 로 열면 열린 상자 1, 보상이 바로 끌려와 골드 26·장비 1개 획득 → 다시 E 눌러도 변화 없음 → 재시작하면 상자 0/3 으로 닫히고 골드는 유지. 콘솔 오류·경고 없음.

### 알려진 문제
- 보스전과 던전 클리어 흐름(결과 화면·메인 메뉴)은 4-b, 4-c 에서.

## 2026-10-22 · v0.3.0 · 3단계 완료 (장비 시스템)

### 변경 내용
- **장비 데이터**: 근접 무기 3종, 원거리 무기 3종, 방어구 3종, 장신구 3종 (독자 제작 이름·설명, `src/items/ItemDatabase.ts`). 등급 일반/고급/희귀/영웅/전설(능력치 ×1/1.3/1.7/2.2/3, 드롭 가중치 55/25/13/5/2).
- **장비 드롭**: 적 처치 시 30% 확률로 등급 색 상자가 떨어진다. 획득하면 "획득: 이름" 표시. 가방(20칸)이 가득 차면 바닥에 남는다.
- **장비 화면**(I 또는 Tab, Esc 로 닫기): 장착 슬롯 5개(근접·원거리·방어구·장신구 2)와 가방. 가방 장비에는 장착 시 변화(▲▼) 표시. 장착/해제/버리기. 열려 있는 동안 게임 일시정지.
- **능력치 반영**: 무기 공격력은 해당 공격 피해에 더해지고, 방어력은 받는 피해를 줄이며(방어 50 = 절반), 체력 보너스는 최대 체력에, 속도 보너스는 이동 속도에 적용된다. 요약 줄에 현재 근접/원거리 공격력·방어·최대 체력·속도 표시.
- 지시서 3단계 완료 기준(아이템을 획득하고 장착하면 실제 능력치가 변경) 충족.

### 수정 파일
- 신규: `src/items/{ItemDatabase,EquipmentSystem}.ts`, `src/ui/InventoryUI.ts`, `tests/equipment.test.ts`
- 수정: `src/game/{GameConfig,Game}.ts`, `src/items/{loot,LootSystem}.ts`, `src/combat/CombatSystem.ts`, `src/player/PlayerController.ts`, `src/ui/{ControlsGuide,DamageNumbers}.ts`, `src/style.css`, `package.json`

### 테스트 결과 (실제 실행)
- `npm run typecheck`: 통과 · `npm test`: 62개 통과 (장비 10개 추가) · `npm run build`: 성공
- 브라우저 검증(헤드리스 Chromium, 개발 서버): 테스트 장비(검 공격+20, 갑옷 방어 50·체력+30)를 가방에 넣고 I 로 장비 화면 열기(일시정지, 위치 고정 확인) → 장착 버튼으로 둘 다 장착 → 합계 공격 20·방어 50·체력 30, 최대 체력 130, 요약 "근접 32" 표시 → 닫으면 재개 → 돌진 로봇(체력 24)을 한 방(32)에 처치 → 피격 시 피해 7이 방어력으로 4로 감소. 콘솔 오류·경고 없음.

### 알려진 문제
- 골드는 아직 쓸 곳이 없다 (장비 강화·상점은 6단계 콘텐츠 확장에서).
- 장비·레벨은 새로고침하면 사라진다 (저장은 5단계).

## 2026-10-22 · v0.3.0-a.1 · 3단계 첫 묶음 (아이템 드롭, 경험치·레벨, 골드) + 난이도 완화

### 변경 내용
- **난이도 완화**(사용자 피드백 "높은 편"): 보통 배율 1.3/1.3 → **1.15(체력)/1.1(공격력)**, 어려움 1.8 → 1.6.
- **아이템 드롭**: 적 처치 시 경험치 보석(항상), 체력 회복 상자(25%), 골드 동전(60%)이 떨어진다. 가까이 가면 끌려오고 닿으면 획득. 20초 뒤 사라진다. 확률·수량은 `GameConfig.loot`.
- **경험치·레벨**: 레벨 업마다 최대 체력 +10, 공격력 +8%, 체력 50% 회복. 필요 경험치 40 × 1.35^(레벨-1). 수치는 `GameConfig.progression`.
- **골드**: 누적만 된다 (3-b 장비·상점에서 사용 예정).
- HUD 에 레벨·경험치 막대·골드 추가, 결과 화면에 레벨·골드 표시. 레벨·골드는 '다시 시작' 해도 유지(새로고침하면 초기화, 저장은 5단계).

### 수정 파일
- 신규: `src/items/{loot,LootSystem}.ts`, `src/player/PlayerStats.ts`, `tests/progression.test.ts`
- 수정: `src/game/{GameConfig,Game}.ts`, `src/combat/CombatSystem.ts`, `src/ui/{HUD,DamageNumbers}.ts`, `src/style.css`, `package.json`

### 테스트 결과 (실제 실행)
- `npm run typecheck`: 통과 · `npm test`: 52개 통과 (레벨·드롭 7개 추가) · `npm run build`: 성공
- 브라우저 검증(헤드리스 Chromium, 개발 서버): 쉬움 난이도에서 돌진 로봇 처치 → 바닥에 아이템 1개(경험치 보석) → 플레이어가 다가가자 획득되어 경험치 0→10/40, HUD 에 "10 / 40" 표시, 바닥 아이템 0개. 콘솔 오류·경고 없음. (골드는 확률 60%라 이 실행에서는 떨어지지 않음)

### 알려진 문제
- 장비(무기·방어구·장신구)와 인벤토리 화면은 3-b 에서.

## 2026-10-22 · v0.2.0 · 2단계 전투 완료 (셋째 묶음: 철벽 로봇, 난이도, 피해 숫자)

### 변경 내용
- **철벽 로봇**(`tank`) 2마리: 체력 90, 느리고 세며(피해 18) 밀려남 저항 0.25. 방패를 들어 올린 뒤(0.6초) 내려찍는다. 적은 총 11마리.
- **난이도 선택**: 안내 화면의 쉬움/보통/어려움 버튼. 적 체력·공격력·속도 배율(`GameConfig.difficulty.presets`). 선택은 브라우저에 저장되고, 바꾸면 전투가 다시 시작된다. 사용자 피드백("쉬움")을 반영해 이전 수치를 쉬움보다 조금 센 수준으로 두고 **보통을 1.3배**로 올렸다.
- **피해 숫자**: 맞은 자리 위로 숫자가 떠오른다(적 흰색, 플레이어 붉은색, 처치 시 점수 노란색). `GameConfig.hud.showDamageNumbers` 로 끌 수 있다.
- 이로써 지시서 11장 2단계(근접·원거리 공격, 적 3종, AI, 체력·피해, 처치) 완료 기준 충족.

### 수정 파일
- 신규: `src/game/Difficulty.ts`, `src/ui/DamageNumbers.ts`, `tests/difficulty.test.ts`
- 수정: `src/game/{GameConfig,Game}.ts`, `src/enemies/{Enemy,EnemySpawner,EnemyModels}.ts`, `src/combat/CombatSystem.ts`, `src/ui/ControlsGuide.ts`, `src/style.css`, `package.json`

### 테스트 결과 (실제 실행)
- `npm run typecheck`: 통과 · `npm test`: 45개 통과 · `npm run build`: 성공
- 브라우저 자동 실행 검증: 결과는 아래 "브라우저 검증" 줄 참고.
- 브라우저 검증(헤드리스 Chromium, 개발 서버): 적 11마리(로봇 6·드론 3·철벽 2) 등장, 보통 난이도에서 돌진 로봇 체력 39·철벽 117 → 쉬움 버튼 24·72 → 새로고침 후 쉬움 유지 → 어려움 54·162. 철벽 로봇 옆에서 근접 공격하면 피해 숫자가 화면에 뜨고 체력 117→93. 콘솔 오류·경고 없음.

### 알려진 문제
- 난이도를 바꾸면 전투가 처음부터 다시 시작된다 (적 체력이 생성 시 정해지기 때문). 5단계 설정 화면에서도 같은 방식.

## 2026-10-22 · v0.2.0-b.1 · 2단계 전투 둘째 묶음 (원거리 공격, 포격 드론, 점프) + 버그 수정

### 변경 내용
- **버그 수정**: 근접 공격 휘두르기 효과(부채꼴)가 등 뒤로 그려지던 문제. 타격 판정은 원래 마우스 쪽이었고 표시만 반대였다 (`Effects.swing` 의 회전 부호).
- **점프**(Space): 설정 `player.jumpSpeed`, `player.gravity`. 떠 있는 동안(높이 1 이상) 적의 탄이 아래로 지나간다.
- **원거리 공격**(마우스 오른쪽 또는 K): 마우스 방향으로 에너지 탄 발사. 설정 `combat.ranged`.
- **포격 드론**(`shooter`) 3마리: 거리를 두고(사거리 9, 4.5 안으로 오면 후퇴) 포신이 밝아진 뒤 탄 발사. 투사체는 장애물에 막힌다.
- 투사체 시스템(`combat/Projectile.ts`, 플레이어·적 공용), 적 AI 에 원거리형 행동 추가, 난이도 피드백("쉬움")은 2-c 밸런스 때 반영 예정.

### 수정 파일
- 신규: `src/combat/Projectile.ts`
- 수정: `src/game/{GameConfig,Game}.ts`, `src/combat/{CombatSystem,Effects}.ts`, `src/enemies/{EnemyAI,EnemyModels,Enemy}.ts`, `src/player/{Player,PlayerController,movement}.ts`, `src/player/models/PlaceholderModel.ts`, `src/ui/ControlsGuide.ts`, `tests/{movement,enemyAI,config}.test.ts`, `package.json`

### 테스트 결과 (실제 실행)
- `npm run typecheck`: 통과
- `npm test`: 42개 통과 (점프 적분·투사체 장애물 판정·원거리형 AI 4개 추가)
- `npm run build`: 성공
- 브라우저 자동 실행 검증(헤드리스 Chromium, 개발 서버): 적 9마리(로봇 6, 드론 3) 등장 → Space 로 점프(높이 0.34 → 2.5초 뒤 착지) → 마우스를 화면 위쪽에 두고 근접 공격하면 부채꼴이 캐릭터 앞(화면 위)에 그려짐(스크린샷 확인) → 드론 앞 7 거리에서 대기하면 탄이 날아와 피격(체력 100→72) → 가장 가까운 적을 조준하고 K 를 누르면 탄이 명중해 적 체력 합 감소. 콘솔 오류·경고 없음.

### 알려진 문제
- 점프 중에도 돌진 로봇의 근접 공격은 맞는다 (점프는 탄 회피용).
- 방어형 적, 피해 숫자 표시, 난이도 선택은 2-c 에서.

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
