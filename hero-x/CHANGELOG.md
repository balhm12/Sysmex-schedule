# 변경 내역

형식: 날짜 · 버전 · 변경 내용 · 수정 파일 · 테스트 결과 · 알려진 문제

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
