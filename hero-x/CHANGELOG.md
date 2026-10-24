# 변경 내역

형식: 날짜 · 버전 · 변경 내용 · 수정 파일 · 테스트 결과 · 알려진 문제

## 2026-10-24 · v1.22.0 · 둥근(치비) 복셀 아들 캐릭터로 교체

### 변경 내용
- **새 기본 플레이어 모델** `public/models/player-chibi.glb`(자체 제작, 1,158 KB): 사용자가 보내 준 참고 그림(둥근 얼굴·갈색 머리·안경·파란 모험가 복장·빛나는 검)에 맞춰 만든 둥근 복셀 캐릭터. 머리는 복셀 구, 머리카락은 둥근 모자+앞머리 갈래+정수리 뭉치, 큰 눈·둥근 안경테(구면을 따라 놓은 작은 정육면체 고리)·미소·홍조, 둥근 몸통·캡슐 팔다리·둥근 장화, 스카프·허리띠·주머니·배낭, 톱니 날 빛 검. 비율은 머리가 전체의 약 40%.
- `tools/voxel_shapes.py`(새): 껍데기 복셀 도우미 — `ellipsoid`, `rounded_box`, `capsule_y`, `ring_xy`(안쪽 칸은 버려 칸 수를 줄임). `tools/voxel_glb.py` 에 `voxels(name, cubes, 재질)` 추가: 작은 상자 수백 개를 한 메시로 내보낸다(노드 수 34개).
- `tools/make_player_chibi_glb.py`(새) 생성기. 부품 이름은 PartRig 규칙 그대로라 기존 리그 동작(걷기·3단 콤보·회피·점프·피격·쓰러짐)과 장비 부착이 그대로 동작한다. manifest 의 `player.file` 을 `player-chibi.glb` 로. KayKit 기사(`player-knight.glb`)와 예전 각진 복셀(`player.glb`)은 파일을 남겨 manifest 한 줄로 바꿀 수 있다.
- `PartRig` 몸통 상자: 이름이 torso/body/chest 로 시작하는 메시만 기준(배낭·스카프·어깨 보호대 제외) → 갑옷 외형이 몸에 맞는다. 강철 갑옷 재질을 덜 번쩍이게.

### 수정 파일
`public/models/{player-chibi.glb(새),manifest.json,README.md}`, `tools/{make_player_chibi_glb.py(새),voxel_shapes.py(새),voxel_glb.py}`, `src/assets/PartRig.ts`, `src/player/EquipmentVisuals.ts`, `tests/models.test.ts`, `package.json`, `CHANGELOG.md`, `CLAUDE.md`, `GAME_GUIDE.md`

### 테스트 결과
- `npm run check` 통과(타입 검사·단위 테스트 224개·빌드). 새 테스트: player-chibi.glb 에 양 다리·양 팔·머리·검 부품과 얼굴 부품이 있고 얼굴·머리 부품이 모두 head 로 분류됨.
- 모델 뷰어(정면·¾·옆·뒤·얼굴)와 게임 안 근접 화면(정지·달리기·공격·회피·장비)으로 확인. 관절 5개(joint:leftLeg/rightLeg/leftArm/rightArm/head) 생성, 메시 34개. 장비(smoke36)·콤보(smoke35) 회귀 통과.

### 알려진 문제
- 복셀 상자 모델이라 애니메이션은 관절 회전뿐(손가락·표정 없음). 다음 단계(이동 가속·감속, 카메라, 공격 타격 시점 동기화)는 지시서 4~9 순서대로 진행.

## 2026-10-24 · v1.21.0 · 플레이어 캐릭터 교체 1~3단계 (KayKit 기사 모델, 뼈대 애니메이션 재생기)

### 변경 내용
- **새 플레이어 모델** `public/models/player-knight.glb`: KayKit Adventurers Character Pack 1.0 의 Knight (CC0, Kay Lousberg). 원본 3,574 KB·76 클립 → `tools/prune_glb.mjs`(새, 외부 라이브러리 없는 .glb 정리 도구)로 게임용 18 클립만 남겨 1,133 KB. 삼각형 약 6,950, 텍스처 14 KB. 출처·라이선스는 `public/models/README.md`. 예전 복셀 캐릭터(`player.glb`)는 파일을 남겨 manifest 로 되돌릴 수 있다.
- **뼈대 모델 재생기** `src/assets/SkinnedPlayerModel.ts`(새) + `src/assets/skinnedClips.ts`(새, 순수 함수): 클립 이름 → 역할(idle/walk/run/공격 3단계/원거리/회피/점프/피격/사망)을 정확한 이름 우선·키워드 차선으로 매핑. 상태 우선순위 사망 > 한 번 재생 동작(공격·회피·피격) > 공중 > 이동 > 정지, 전환은 crossfade(0.15초, 동작 시작은 0.08초). 걷기/달리기는 속도 기준(이동 속도의 55%)으로 고르고 클립 속도를 실제 속도에 맞춘다(발 미끄러짐 감소). 공격 클립은 휘두르기 시간×1.7 에 맞춰 빨리 감아 타격 판정과 동작이 맞고, 콤보 단계마다 다른 클립(가로 베기·사선 베기·회전). 회피는 Dodge_Forward 를 대시 시간에 맞춤, 피격은 Hit_A, 사망은 Death_A 를 멈춰 둠.
- **장비 외형을 뼈에 부착**: 손 슬롯 뼈(`handslot.r`/`.l`, GLTFLoader 가 이름의 '.' 을 지우므로 정규화해 찾음)와 가슴 뼈(`chest`)에 바인드 자세 기준 행렬로 붙여 움직이는 중에 장착해도 제자리. 무기 방향은 모델에 들어 있는 기준 검 메시의 긴 축으로 맞춘다. 기본 검·방패는 `manifest.defaultParts`(`1H_Sword`, `Round_Shield`)만 보이고 장비를 들면 그 손의 것은 숨는다.
- `ModelEntry.defaultParts`, `PlayerModelState.attackDuration`(Player 가 넘김). 복셀 리그 경로(`PartRig`)는 그대로.

### 수정 파일
`public/models/{player-knight.glb(새),manifest.json,README.md}`, `tools/prune_glb.mjs`(새), `src/assets/{SkinnedPlayerModel.ts(새),skinnedClips.ts(새),ModelRegistry.ts}`, `src/player/Player.ts`, `src/player/models/PlaceholderModel.ts`, `tests/skinnedClips.test.ts`(새), `package.json`, `CHANGELOG.md`, `CLAUDE.md`, `GAME_GUIDE.md`, `README.md`

### 테스트 결과
- `npm run check` 통과(타입 검사·단위 테스트 223개·빌드). 새 테스트: KayKit 이름 정확 매핑(2H_Melee_Idle 에 속지 않음), 키워드 이름 매핑·대체, 빈 목록.
- Playwright `smoke37`: 모델 로드(뼈대 메시 6, 손 슬롯 변형 중 1H_Sword·Round_Shield 만 표시, 키 1.87) → W 이동 5.5 유닛·놓으면 멈춤 → 근접·원거리·회피·점프 동작 → 도끼/갑옷/활 획득 시 handslot.r / chest / handslot.l 에 부착, 기본 검·방패 숨김 → 피격·사망 처리. 오류 없음. 화면: 정지·달리기(망토)·공격·회피·장비·사망 확인. `smoke36`(장비)·`smoke35`(콤보) 회귀 통과.

### 알려진 문제 (다음 단계에서)
- 이동 가속·감속, 회전 보간, 카메라 추적 개선(4~7단계)은 아직 전과 같다. 피격 동작이 넉백과 겹치면 캐릭터가 화면 밖으로 밀릴 수 있다(카메라 단계에서 처리).
- 장비 외형(코드 상자 모델)은 기사 손 크기에 맞춰 팔 길이×1.15 로 두었고 갑옷 판은 몸통 상자 전체를 덮어 조금 두껍다. 로딩 표시·실패 안내(9단계)는 아직 없다(실패 시 복셀/임시 모델로 동작).

## 2026-10-24 · v1.20.0 · 장비 자동 장착 + 무기별 공격 방식 + 장착 장비 외형

### 변경 내용
- **주우면 바로 장착** `EquipmentSystem.pickup(item, autoEquip)`: 슬롯이 비었거나 점수(`GameConfig.equipment.autoEquipWeights` 가중치 합)가 더 높으면 바로 장착하고 쓰던 것은 가방으로, 아니면 가방으로. 장신구는 빈 칸 → 약한 칸 순. 가방이 가득 차 쓰던 것을 넣을 수 없으면 실패(바닥에 다시 둠). 설정 **장비 자동 장착**(`autoEquip`, 기본 켬). `Game.collectItem` 이 효과·소리·`장착: ○○ · 방식` 글자·HUD 배너·능력치 갱신·외형 갱신을 한 번에 처리.
- **무기별 공격 방식** `GameConfig.combat.weaponStyles` + `src/items/weaponStyle.ts`(`weaponStyleFor/meleeComboFor/styleLabelFor`, 순수 함수): 장비 템플릿의 `style` 키가 방식을 가리킨다. 근접: 검 3단 베기(기본) / 도끼 2단 강타 / 망치 충격 회전 / 창 4단 찌르기 — 콤보 단계 전체(배율·각도·방향·색)·이어가기 시간·대기 배율. 원거리: 블래스터 속사(기본) / 활 세 갈래 화살(3발 22°) / 캐논 포격(2.4배 크기·0.65배 속도·2.5배 밀침) / 라이플 관통탄(2배 속도·적 3마리 관통). `CombatSystem` 이 `getWeaponStyle(kind)` 로 받아 콤보 구성과 탄 수·퍼짐·속도·크기·관통을 정한다. HUD 콤보 표시 단계 수도 방식을 따른다.
- **투사체 관통·스윕** `Projectile.ts`: `ProjectileSpec.pierce`(맞힌 적을 기억해 다시 안 맞음, 관통마다 명중 연출), 이동을 `SWEEP_STEP`(0.35) 이하로 나눠 충돌 검사 — 빠른 탄(라이플 44/s)이 적을 건너뛰던 문제(터널링) 수정.
- **장착 장비 외형** `src/player/EquipmentVisuals.ts`(새): 코드로 만든 상자 모델 — 무기 8종(`WeaponLook`: sword/axe/hammer/spear/blaster/bow/cannon/rifle, 팔 길이 비례), 방어구 4종(`ArmorLook`: vest/plate/suit/cloak, 몸통 박스에 맞춤), 등급 색은 빛나는 보석·줄무늬. `PlayerModel.setEquipment(looks)`: .glb 모델은 `PartRig.attach`(검 든 팔·반대 팔·몸 그룹·원래 무기 묶음 `weaponHold`·팔 길이·몸통 박스)에 붙이고 원래 검은 숨긴다(무기 메시를 합치기 전에 `weaponHold` 로 분리). 임시 모델도 지원. `Player.setEquipment` 가 마지막 외형을 기억해 모델 교체 뒤 다시 입힌다. `Game.refreshEquipment` 는 획득·장비 화면 변경·저장 불러오기·새 게임 때 호출.
- 장비 화면: 무기 이름 옆에 방식 꼬리표(`.inv-style`, 마우스를 올리면 설명). 템플릿에 `style/look/color` 추가(16종 모두), 활·캐논·라이플·창 설명 갱신.
- 디버그: `__heroX.debugGiveItem(templateId, rarity)`(주웠을 때와 같은 처리), `getDebugState().equipment.styles/gear`.

### 수정 파일
`src/items/{weaponStyle.ts(새),ItemDatabase.ts,EquipmentSystem.ts}`, `src/player/{EquipmentVisuals.ts(새),Player.ts}`, `src/player/models/PlaceholderModel.ts`, `src/assets/{PartRig.ts,ModelRegistry.ts}`, `src/combat/{CombatSystem.ts,Projectile.ts}`, `src/game/{Game.ts,GameConfig.ts,Settings.ts}`, `src/ui/InventoryUI.ts`, `src/style.css`, `tests/{weaponStyle.test.ts(새),equipment.test.ts}`, `package.json`, `GAME_GUIDE.md`, `CLAUDE.md`, `CHANGELOG.md`

### 테스트 결과
- `npm run check` 통과(타입 검사·단위 테스트 220개·빌드). 새 테스트: 방식 해석(없으면 기본, 표에 없거나 종류가 안 맞으면 기본, 도끼 2단·창 4단·라이플 관통 3·활 3발), 템플릿의 style/look 이 표와 맞는지, 근접 방식은 2단계 이상·마지막이 가장 셈, 원거리 배율 양수; `pickup` 7개(빈 슬롯 장착, 더 좋으면 교체·이전은 가방, 약하면 가방, 자동 장착 끄면 가방, 장신구 두 칸, 가방 가득 차면 실패, 점수).
- Playwright `smoke36`: 희귀 도끼 획득 → 바로 장착·'2단 강타'·손에 Weapon-axe·배너 → 일반 검은 가방 → 강철 갑옷 장착·Armor-plate·최대 체력 300→351 → 도끼 콤보 0→1→0, 피해 31+48+31 → 활 장착 → 한 번에 탄 3 → 라이플(점수 높음) 교체 → 한 발에 트롤 3마리 25씩 → 자동 장착 끄면 전설 망치가 가방으로 → 외형 조합(망치·망토·캐논 / 창·슈트·블래스터) → 장비 화면 꼬리표. 오류 없음. `shots36` 로 정면 근접 화면 확인(무기 8종·방어구 4종).

### 알려진 문제
- 외형은 코드 상자 모델이라 단순하다. 정식 .glb 무기를 넣는 구조는 다음 작업(`WeaponLook` 별 파일 매핑).
- 망토는 흔들리지 않는 판이다. 임시 모델(.glb 없음)의 외형 배치는 브라우저로 확인하지 않았다(타입 검사만).

## 2026-10-24 · v1.19.0 · 근접 3단 콤보 + 원거리 발사·명중 연출

### 변경 내용
- **근접 콤보** `src/combat/combo.ts`(새, 순수 함수) + `CombatSystem.meleeAttack`: 근접을 연달아 누르면 `GameConfig.combat.melee.combo.steps` 순서대로 **1단 가로 베기(흰색) → 2단 되돌려 베기(하늘색, 피해 1.15배·130°) → 3단 회전 베기(금색, 360°·피해 1.6배·밀침 1.8배·대기 1.7배)**. 한 번 휘두른 뒤 쿨다운이 끝나고 `combo.window`(0.55초) 안에 다시 누르면 이어지고, 놓치거나 마무리 뒤에는 1단으로 돌아간다. 마무리는 바닥 충격파·파편·짧은 멈춤(`juice.comboFinish`)·카메라 흔들림. 단계마다 효과음 음높이가 오르고(`AudioSystem.play` 의 `pitchMul`), 마무리는 'slam' 소리를 더한다. HUD 에 `2연격`·`마무리!` 표시(`HUD.showCombo`, `.combo` CSS).
- **단계별 애니메이션** `PartRig`/`PlaceholderModel`: `PlayerModelState.attackKind/attackStep` 추가(`Player.triggerAttack(duration, kind, step)`). 2단은 반대쪽으로 되돌려 베고, 3단은 검을 옆으로 뻗은 채 몸을 한 바퀴 돈다. 원거리는 팔을 앞으로 뻗어 쏘고 반동으로 튄다.
- **검 궤적 방향** `Effects.slash(..., sweep)`: 1 오른→왼, -1 왼→오른(기울기 반대), 0 한 바퀴.
- **원거리 발사 연출**: 쏘는 순간 총구 **섬광**(`Effects.flash`, 새) + 파편, 탄은 돌면서 두근거리고 **빛 꼬리**(`ProjectileSystem` 의 꼬리 메시, 지나온 거리만큼 최대 `juice.ranged.trailLength`)를 끈다. 사라질 때 `onImpact(pos, spec, reason)` 콜백 → `Game` 이 **명중 섬광·파편·바닥 충격파**(벽은 작게, 수명 만료는 없음). 적의 탄도 같은 꼬리·명중 연출. 탄 색은 `combat.ranged.color`.
- 설정: `combat.melee.combo{window, steps[]}`, `combat.ranged.color`, `juice.ranged{muzzleRadius, muzzleTime, trailLength, impactRadius, impactTime, impactRing}`, `juice.comboFinish{shockMul, hitStop}` + CONFIG_LIMITS. `getDebugState().combo`(마지막 단계, 끊기면 -1)·`effects`(살아 있는 효과 수).

### 수정 파일
`src/combat/{combo.ts(새),CombatSystem.ts,Effects.ts,Projectile.ts}`, `src/player/Player.ts`, `src/player/models/PlaceholderModel.ts`, `src/assets/PartRig.ts`, `src/audio/AudioSystem.ts`, `src/ui/HUD.ts`, `src/game/{Game.ts,GameConfig.ts}`, `src/style.css`, `tests/combo.test.ts`(새), `package.json`, `GAME_GUIDE.md`, `CLAUDE.md`, `CHANGELOG.md`

### 테스트 결과
- `npm run check` 통과(타입 검사·단위 테스트 206개·빌드). 새 테스트: 콤보 단계 진행(처음 0, 시간 안 1→2, 놓치면 0, 마무리 뒤 0, 단계 1개면 0)·설정 건전성(첫 단계 배율 1, 피해 배율 증가, 마지막은 spin 360°·대기 길게, 색·방향 값).
- Playwright `smoke35`: 정면 1.3 에 트롤, 등 뒤 1.3 에 트롤을 두고 연타 → 단계 0→1→2, 정면 피해 45(12+14+19), 등 뒤 19(회전 베기만) → 가만히 두면 콤보 끊김(-1) → 다시 누르면 0 → HUD '1연격' 텍스트 → 원거리: 탄+꼬리 메시 2개·총구 섬광 1 → 7 거리 트롤 명중(체력 -9: 레벨 2 배율), 명중 섬광 2, 탄 소멸. 오류 없음. `shots35` 로 1·2·3단 궤적·자세와 총구 섬광·꼬리를 화면으로 확인.

### 알려진 문제
- 이어가기 0.55초는 PC 기준. 휴대폰에서 연타가 어려우면 `combo.window` 를 늘리면 된다.
- 회전 베기(3단)의 바닥 부채꼴은 금색 원 전체가 잠깐(0.34초) 보여 조금 강하게 느껴질 수 있다. 색은 `combo.steps[2].color`.

## 2026-10-24 · v1.18.0 · 휴대폰에서 앱처럼 (PWA: 홈 화면 설치·전체 화면·오프라인 실행)

### 변경 내용
- **웹 앱 매니페스트** `public/manifest.webmanifest`: 이름 'HERO X - 모험의 던전', `display: standalone`(주소창 없는 전체 화면), 시작 주소·범위 `./`(배포 폴더 어디서나), 테마 색, 아이콘 192/512 + maskable. `index.html` 에 매니페스트·Apple 터치 아이콘·앱 제목 메타 추가.
- **아이콘** `tools/make_icons.py`(Pillow, 아이콘을 다시 만들 때만 필요) → `public/icons/{icon-192,icon-512,maskable-512,apple-touch-icon-180}.png`: 복셀 영웅 얼굴 + 빛나는 검 픽셀 아트(자체 제작).
- **서비스 워커** `src/pwa/sw.js`(템플릿) + `vite.config.ts` 플러그인: 빌드 때 `__VERSION__` 을 package.json 버전으로 바꿔 `dist/sw.js` 로 내보내고, 캐시 이름이 버전마다 달라 옛 캐시는 자동 정리. 개발 서버에서는 등록하지 않는다(같은 주소가 모듈·스타일로 다르게 서빙돼 캐시가 섞임). 전략: 페이지 이동은 네트워크 우선(새 버전 바로) → 실패 시 캐시의 index.html, 그 밖의 같은 출처 파일(JS·CSS·모델·소리·아이콘)은 캐시 우선 + 뒤에서 갱신. 두 번째 실행부터 **오프라인에서도 열린다**.
- **설치 안내** `src/pwa/{installHint,registerPwa}.ts`: `beforeinstallprompt` 를 붙잡아 메인 메뉴 **'📱 앱으로 설치'** 버튼(안드로이드 Chrome·데스크톱 Chrome/Edge)으로 띄운다. iPhone/iPad Safari 는 프롬프트가 없어 **'홈 화면에 추가하는 법'** 안내(공유 → 홈 화면에 추가). 이미 앱으로 실행 중이거나 지원하지 않는 브라우저면 버튼 숨김. 새 버전이 설치되면 HUD 배너 '새 버전이 준비되었습니다'. `getDebugState().pwa`.

### 수정 파일
`public/manifest.webmanifest`(새), `public/icons/*.png`(새), `tools/make_icons.py`(새), `src/pwa/{sw.js,installHint.ts,registerPwa.ts}`(새), `vite.config.ts`, `index.html`, `src/ui/MainMenu.ts`, `src/game/Game.ts`, `src/style.css`, `tests/pwa.test.ts`(새), `package.json`, `README.md`, `CLAUDE.md`, `GAME_GUIDE.md`, `CHANGELOG.md`

### 테스트 결과
- `npm run check` 통과(타입 검사·단위 테스트 196개·빌드). 새 테스트: 설치 안내 판단(앱 실행 중 / 프롬프트 / iPhone Safari / iPhone Chrome·데스크톱 숨김).
- Playwright `smoke34`(빌드 결과를 `vite preview` 로): 매니페스트(HERO X·standalone·아이콘 3)·아이콘 PNG·`sw.js` 버전 치환 → 서비스 워커가 페이지 제어, 캐시 26항목 → **오프라인으로 새로고침해도 메뉴·캔버스가 뜸** → 데스크톱은 설치 버튼 숨김 → iPhone 13 에뮬레이션에서 '홈 화면에 추가하는 법' 버튼·안내 → 설치 프롬프트 이벤트를 흉내 내면 '앱으로 설치' 버튼.

### 알려진 문제
- 실제 설치 프롬프트는 HTTPS(GitHub Pages 는 해당)와 브라우저 조건(방문 횟수 등)에 따라 뜬다. iOS 는 Safari 에서만 홈 화면 추가가 된다.
- 첫 실행은 온라인이어야 한다(그때 파일이 캐시된다). 모델·소리 파일은 처음 쓰일 때 캐시된다.

## 2026-10-24 · v1.17.0 · 보스 등장 팝업 (초상화·설명·패턴 표·피하는 법)

### 변경 내용
- **보스 등장 팝업** `src/ui/BossIntroUI.ts`(새): 보스가 나타나면 게임을 멈추고 팝업을 띄운다 — 보스 **초상화**(보스 .glb 를 작은 WebGL 렌더러로 한 번 그려 2D 캔버스에 복사, 실패해도 팝업은 뜸), 별명·이름·체력(난이도 반영)·접촉 피해, **설명(lore)**, **패턴 표**(패턴 / 어떻게 / 피하는 법), '싸운다!' 버튼(Enter·Escape 로도 닫힘). 닫으면 바로 재개.
- 패턴 설명은 `src/game/bossIntro.ts`(새) `describeBossPatterns(cfg)` 가 보스 설정에서 만든다(돌진·내려찍기·탄막·소환(소환되는 적 이름)·포격 낙하·분노 2단계, 수치 포함, 중복 제거) — 설정을 바꾸면 설명도 따라 바뀐다.
- `BossConfig` 에 `title`(별명)·`lore`(설명) 추가. 네 보스 모두 작성(숲의 수호 로봇·수정 골렘·요새 사령관·서리 거인).
- 설정 **보스 등장 설명**(`bossIntro`, 기본 켬, 게임 그룹). 인트로 영상 중에는 띄우지 않는다.

### 수정 파일
`src/ui/BossIntroUI.ts`(새), `src/game/bossIntro.ts`(새), `src/game/{GameConfig,DungeonDefs,Settings,Game}.ts`, `src/style.css`, `tests/bossIntro.test.ts`(새), `package.json`, `CLAUDE.md`, `GAME_GUIDE.md`, `CHANGELOG.md`

### 테스트 결과
- `npm run check` 통과(타입 검사·단위 테스트 190개·빌드). 새 테스트: 네 보스의 별명·설명 존재, 패턴 설명이 설정(돌진 여부·가까운 패턴 종류·중복 제거·2단계)과 일치, 소환 적 이름.
- Playwright `smoke33`: 숲 보스 구역 진입 → 팝업(별명/이름/설명/패턴 4줄) + 멈춤(보스 위치 그대로) + 초상화 칠해짐 32% → '싸운다!' → 재개 / 얼음 봉우리 서리 거인 팝업(내려찍기·소환·탄막·분노) → Escape 로 닫힘(메뉴 안 열림) / 설정 끔이면 팝업 없이 바로 전투. 다른 자동 시나리오는 설정을 꺼서 돌린다.

## 2026-10-24 · v1.16.0 · 벽·장애물 그래픽: 테마별 표면 텍스처(생울타리·바위·강철·얼음), 벽 위 장식, 종류별 장애물 모델

### 변경 내용
- **표면 텍스처 모듈** `src/render/surfaceTexture.ts`(새): 코드로 만든 6종 무늬(색 지도 + 노멀맵, 타일 반복) — `hedge`(잎 덩어리), `rock`(바위·금), `steel`(격자 판·리벳), `ice`(줄무늬·밝은 금), `wood`(판자·나뭇결), `brick`(어긋난 벽돌·회반죽). 무늬 계산(`surfaceSample`)은 순수 함수로 테스트. `useWorldSpaceUv()` 셰이더 패치로 인스턴스 벽처럼 크기가 제각각인 상자에도 무늬가 늘어나지 않는다(면 방향별 월드 평면 UV).
- **벽**: 던전마다 표면이 다르다 — 숲 **생울타리**(잎 텍스처 + 벽 위 덤불 덩어리), 동굴 **바위**(금 + 벽 위 발광 수정 조각), 요새 **강철 판**(리벳 + 난간·붉은 경고등), 얼음 봉우리 **얼음 벽**(반투명·밝은 금·은은한 발광 + 매달린 고드름·눈 모자). 경계 벽과 여정 울타리가 같은 재질을 쓴다. 벽마다 밝기 변주는 인스턴스 색(흰색 근처)으로.
- **장애물**: 종류별 모델 — 나무 상자(판자 텍스처·모서리 쇠테·위아래 띠, 얼음 던전은 눈 덮인 얼음 덩어리), 돌기둥(받침·원기둥·머리, 숲은 이끼 / 동굴·얼음은 발광 수정 기둥 + 곁가지 + 바위 받침), 돌담(벽돌 텍스처·이가 빠진 윗줄·이끼/눈/수정 띠), 울타리 종류는 벽 재질. 충돌 상자는 그대로 상자.

### 수정 파일
`src/render/surfaceTexture.ts`(새), `src/dungeon/DungeonScene.ts`, `tests/surfaceTexture.test.ts`(새), `package.json`, `CLAUDE.md`, `GAME_GUIDE.md`, `CHANGELOG.md`

### 테스트 결과
- `npm run check` 통과(타입 검사·단위 테스트 188개·빌드). 새 테스트: 6종 무늬의 높이·금 범위와 기복, 판자·벽돌·강철 홈의 규칙성.
- Playwright 스크린샷(높은 화질): 숲 출발·상자·큰 전투 광장(생울타리 잎·덤불, 판자 상자, 돌기둥), 얼음 봉우리 빙판 호수(얼음 벽·고드름·눈 모자·얼음 덩어리), 수정 동굴 수정 광장(바위 벽·수정 조각·수정 기둥), 강철 요새 조립장(강철 판·난간·경고등·컨테이너) 확인. 초기 버전에서 벽이 검게 나온 원인(인스턴스 색이 텍스처 색에 또 곱해짐)을 고쳤다.

### 알려진 문제
- 표면 텍스처는 던전 입장 때 256×256 으로 계산한다(종류당 수십 ms). 더 선명하게 하려면 `createSurfaceTextures({ size: 512 })`.

## 2026-10-24 · v1.15.0 · 소품 합치기(정점 색) · 구역별 음악 분위기

### 변경 내용
- **소품 전체 합치기** `meshMerge.mergeStaticProps`: 던전 장식(나무·바위·횃불 기둥·울타리·기둥·돌담 …)을 재질 '값'(거칠기·금속성·발광·투명도, **색 제외**)별로 하나의 메시로 합친다. 각 소품의 색은 **정점 색**으로 구워 넣고 합친 재질은 흰색 + `vertexColors` 라, 색이 제각각인 나뭇잎·바위도 한 번에 그린다. 불꽃·등불처럼 매 프레임 바뀌는 메시는 `userData.animated` 로 제외. `Decor` 가 소품을 `Props` 그룹에 모아 합치고, 합친 지오메트리·재질은 dispose 때 정리.
- **복셀 모델 합치기 확장**: `mergeStaticMeshes` 도 같은 관절 안에서 재질 값이 같으면 색이 달라도 정점 색으로 합친다(플레이어 209 → 56 → **32** 메시). 합친 뒤 발광 재질 목록을 다시 모아(`collectEmissiveMaterials`) 피격 번쩍임·붉은 기가 합친 메시에도 적용된다.
- **구역별 음악 분위기** `soundDefs.MUSIC_MOODS` + `moodForZone`(순수 함수): 같은 곡을 구역에 따라 다르게 연주한다 — 출발·쉼터·보물 터는 **calm**(템포 0.85, 드럼 없음, 멜로디 작게, 패드 크게), 좁은 길은 **tense**(멜로디 절반), 매복·큰 전투·비밀 방은 **battle**(템포 1.15, 멜로디 크게) → 정리하면 normal. `AudioSystem.setMood` 는 다음 음부터 적용돼 자연스럽게 넘어가고, 파일 음악은 음량만 바뀐다. `Game` 이 현재 구역이 바뀔 때·구역을 정리했을 때 분위기를 정하고, 보스전은 보스 곡(normal). `getDebugState().audio.mood`.

### 수정 파일
`src/assets/meshMerge.ts`, `src/assets/ModelRegistry.ts`, `src/dungeon/Decor.ts`, `src/audio/{soundDefs,AudioSystem}.ts`, `src/game/Game.ts`, `tests/{meshMerge,sound}.test.ts`, `package.json`, `CLAUDE.md`, `GAME_GUIDE.md`, `CHANGELOG.md`

### 테스트 결과
- `npm run check` 통과(타입 검사·단위 테스트 181개·빌드). 새 테스트: 재질 값 열쇠(색 무시)·정점 색 굽기·움직이는 메시 제외·빈 Group 정리·바운딩 박스 불변, 분위기 표 범위·구역 종류별 선택.
- 그리기 호출(낮음 화질, 헤드리스): 출발 구역 138 → **96**(v1.9 기준 308), 큰 전투 광장(적 11) 533 → **450**, 보스 터 243 → 368*. *합친 소품은 던전 전체에 걸쳐 있어 화면 밖 소품도 함께 그려지므로(절두체 컬링 없음) 보스 터처럼 소품이 많이 가려지던 곳은 호출이 늘 수 있다. 삼각형은 1.1만 → 3.1만으로 늘었지만 휴대폰 GPU 에서도 가벼운 양이며, 호출 수가 병목인 환경에 유리하다.
- Playwright `smoke32`: 출발 calm(숲 곡) → 첫 공터 normal → 좁은 숲길 tense → 매복 광장 battle → 정리 뒤 normal → 쉼터 calm → 큰 전투 battle → 보스 터 normal(보스 곡). 구역 스크린샷으로 합친 소품 색(천막·통나무·횃불·돌기둥) 확인.

### 알려진 문제
- 남은 그리기 호출의 대부분은 적 모델(관절×재질 값, 그림자 패스 포함)이다. 더 줄이려면 그림자 끄기(설정) 또는 관절 수 축소.
- 분위기 전환은 다음 음부터라 최대 반 박자(0.3초 안팎) 늦게 바뀐다.

## 2026-10-24 · v1.14.0 · 네 번째 던전 '얼음 봉우리' (서리 거인 보스, 눈 내리는 지그재그 여정)

### 변경 내용
- **얼음 봉우리** `DUNGEONS[3]`(id `ice`, 권장 레벨 12, 요새 클리어 후 해금, 보상 1.9배): 산기슭 → 얼어붙은 숲길(멧돼지·궁수) → 빙판 호수(슬라임 3·오를 수 있는 얼음 바위) → [얼음 동굴: 상자] → 눈보라 고개(증원) → 갈림길(북쪽 문) → [서리 신전: 정예 **서리 트롤** 2.4배 + 상자] → 고드름 골짜기(폭탄 벌레 매복·증원) → 모닥불 쉼터 → 봉우리 광장(11 + 증원 4, 상자) → 서리 거인의 옥좌. 적 50 + 미니 보스 + 보스, 상자 4. 길이 동→서→동으로 크게 꺾이는 지그재그(`ICE_JOURNEY`, 80×216).
- **서리 거인**(새 보스 외형 `frost`, `boss-frost.glb` 88상자): 얼음 몸·털 망토·가슴 발광 핵·고드름 왕관·얼음 주먹. 체력 1100, 넓은 내려찍기(반지름 6) → 작은 슬라임 소환(3/4마리, 최대 6) → 탄막 12/16발, 돌진 없음. `BossModelKind` 에 'frost' 추가(.glb 없으면 골렘 코드 모델로 대체).
- **얼음 테마**: 밝은 하늘·흰 눈 바닥·하늘색 얼음 벽, 입자는 내리는 눈. 새 소품 `iceSpike`(고드름 바위), `snowPile`(눈더미), `frozenTree`(얼어붙은 나무), `iceLantern`(얼음 등불, 깜빡임) + 구역 소품 표 `ICE_ZONE_PROPS`, 바깥 장식 `DECOR_KINDS.ice`.
- **음악** `MUSIC.ice`: 느린 D 단조, 맑은 사인파 멜로디, 성근 드럼, 긴 잔향. `Game.dungeonMusic` 매핑.
- 해금 사슬 테스트가 던전 수에 상관없이 동작하도록 일반화. 여정·소품·모델 테스트에 얼음 봉우리·frost 포함.

### 수정 파일
`src/game/DungeonDefs.ts`, `src/game/GameConfig.ts`, `src/enemies/Boss.ts`, `src/dungeon/{decorLayout,Decor}.ts`, `src/audio/soundDefs.ts`, `src/game/Game.ts`, `tools/make_bosses_glb.py`, `public/models/boss-frost.glb`(새), `public/models/{manifest.json,README.md}`, `tests/{dungeons,journey,models}.test.ts`, `package.json`, `CLAUDE.md`, `GAME_GUIDE.md`, `CHANGELOG.md`

### 에셋·라이선스
- `boss-frost.glb` 는 이 저장소의 스크립트 산출물. 외부 에셋 없음.

### 테스트 결과
- `npm run check` 통과(타입 검사·단위 테스트 179개·빌드). 여정 테스트(연결성·배치·문·벽 구멍·경로 길이)와 던전 배치 겹침 검사, 소품 검사, 음악 트랙 검사(던전마다 곡 존재)가 얼음 봉우리를 포함해 통과.
- Playwright `smoke30 ice`: 던전 카드(권장 12, 적 50, 상자 4) → 시작 (−20, 92) → 메인 구역 8곳 등장 수 일치·증원·분열·문 2개 열림·쉼터 회복 → 보스 등장 → 처치 → 결과 9/9 → 선택 구역 2곳(서리 트롤 배너). 지도 캔버스·서리 거인 모델 뷰어·구역 스크린샷 확인.

### 알려진 문제
- 실제 플레이 시간·난이도(권장 레벨 12)는 사람이 재야 한다. 서리 거인이 세면 `DUNGEONS[3].boss` 의 `hp`·`slam.damage` 조정.

## 2026-10-24 · v1.13.0 · 성능: 복셀 메시 합치기 (그리기 호출 절반 이하)

### 변경 내용
- **메시 합치기** `src/assets/meshMerge.ts`(새): 복셀 .glb 는 상자 하나가 메시 하나라 적 1마리에 80번 넘게 그려졌다. 리그가 관절 묶음으로 나눈 **뒤**, 같은 부모 아래 같은 재질의 메시를 `BufferGeometryUtils.mergeGeometries` 로 하나로 합친다(묶음·재질당 1회). 뼈대 메시·재질 배열·속성 구성이 다른 메시는 제외. 원본 지오메트리는 다른 개체와 공유되므로 트리에서만 빼고, 합친 지오메트리만 개체 전용으로 둔다(`disposeTree` 가 정리). 합친 메시는 `userData.parts` 에 원래 부품 이름을 남기고 `meshHasPart()` 로 찾는다(보스 2단계 붉은 눈이 이걸 쓴다).
- 적용: `ModelRegistry.createGltfEnemyModel`(적·보스), `createGltfPlayerModel`(플레이어). 애니메이션 클립이 있는 모델(뼈대)은 합치지 않는다.

### 수정 파일
`src/assets/meshMerge.ts`(새), `src/assets/ModelRegistry.ts`, `src/enemies/Boss.ts`, `tests/meshMerge.test.ts`(새), `package.json`, `CLAUDE.md`, `CHANGELOG.md`

### 테스트 결과
- `npm run check` 통과(타입 검사·단위 테스트 169개·빌드). 새 테스트: 같은 부모·같은 재질만 합침, 바운딩 박스 불변, 부품 이름 보존, 재질 배열·속성 다른 메시 제외.
- 그리기 호출(낮음 화질, 헤드리스): 출발 구역 308 → **138**, 큰 전투 광장(적 11) 963 → **533**, 보스 터(적 12 + 보스) 696 → **243**. 삼각형 수는 같다.
- Playwright: 보스 3종 등장·예고·2단계 붉은 눈(합친 눈 메시) 통과, 플레이어·적 동작(리그) 스크린샷 이상 없음.

### 알려진 문제
- 남은 호출의 대부분은 반투명 재질(슬라임·유령·날개 막)과 발광 부품(묶음마다 따로), 소품·입자. 더 줄이려면 소품 InstancedMesh 화가 다음 후보.

## 2026-10-24 · v1.12.0 · 적 종류 5 → 10 (궁수·분열 슬라임·폭탄 벌레·뿔 멧돼지·작은 슬라임) · 몸집 무작위

### 변경 내용
- **새 공격 방식**(`EnemyTypeConfig.attackKind`): `charge`(돌진 — `EnemyAI` 에 charge 상태 추가: 예고가 끝난 순간의 방향으로 `chargeSpeed`·`chargeDuration` 만큼 직진, `AIDecision.speedMul`, 닿으면 피해, 시간이 다 되면 멈춤, 돌진 중 피격으로 안 멈춤), `explode`(자폭 — `Game.onEnemyAttack` 이 `explodeRadius` 안이면 피해(공중이면 면함) + 충격파·파편·폭발음·흔들림, 그 적은 처치 처리). 원거리는 `projectileCount`+`spreadDegrees` 로 여러 발 부채꼴. `splitInto` 로 죽을 때 작은 적 생성(`Game.splitOnDeath` → 여정이면 `ZoneSystem.attach` 로 그 구역의 적 목록에 넣어 새끼까지 잡아야 클리어).
- **새 적 5종**(`GameConfig.enemies.types`): 고블린 궁수(화살 3발 부채꼴, 가까우면 후퇴) / 분열 슬라임(느리고 잘 안 밀림, 죽으면 작은 슬라임 2) / 작은 슬라임(빠르고 약함) / 폭탄 벌레(빠르게 접근 → 0.7초 예고 → 반지름 3 폭발 22) / 뿔 멧돼지(7 거리에서 예고 → 속도 14 돌진 16, 밀림 저항). 복셀 모델 `monster-{archer,slime,bomber,charger}.glb`(`tools/make_monsters_glb.py`, 작은 슬라임은 슬라임 모델 재사용) + 요새용 자폭 드론 `enemy-bomber.glb`(`tools/make_enemies_glb.py`, skin `robot-bomber`).
- **여정에 섞음**: 숲(둘째 공터 슬라임·궁수, 갈림길 궁수, 매복 멧돼지, 큰 전투 궁수·멧돼지·슬라임 + 증원 슬라임 → 48마리), 동굴(수정 광장·박쥐 소굴 폭탄 벌레, 회랑·대광장 슬라임, 대광장 폭탄 벌레 + 증원 → 59마리), 요새(조립장·포대 마당·앞마당 자폭 드론 → 57마리). 모든 던전이 종류 5가지 이상.
- **몸집 무작위** `enemies.sizeJitter` 0.12: 같은 종류라도 개체마다 ±12% 크기(보기용, 충돌은 그대로). 정예는 기존대로 1.25배.
- 디버그 `debugDefeatRegularEnemies` 는 목록을 복사해 돌아 분열 새끼를 같은 호출에서 죽이지 않는다.

### 수정 파일
`src/enemies/{EnemyAI,Enemy,EnemySpawner}.ts`, `src/game/{GameConfig,Game,DungeonDefs}.ts`, `src/dungeon/ZoneSystem.ts`, `tools/{make_monsters_glb,make_enemies_glb}.py`, `public/models/{monster-archer,monster-slime,monster-bomber,monster-charger,enemy-bomber}.glb`(새), `public/models/manifest.json`, `public/models/README.md`, `tests/{enemyAI,dungeons,journey}.test.ts`, `package.json`, `CLAUDE.md`, `GAME_GUIDE.md`, `CHANGELOG.md`

### 에셋·라이선스
- 새 .glb 5개 모두 이 저장소의 파이썬 스크립트가 생성한 자체 제작물.

### 테스트 결과
- `npm run check` 통과(타입 검사·단위 테스트 167개·빌드). 새 테스트: 돌진형 상태 전이·속도 배율·방향 고정·피격 무시·시간 만료, 자폭형 예고→attackNow, 새 종류 5종 능력치 범위·공격 방식·분열 대상 존재, 모든 여정 던전에 새 종류 포함·종류 5가지 이상, skin 키(robot-bomber 포함).
- Playwright `smoke31`: 새 모델 6개 로드, 궁수 동시 투사체 3, 슬라임 처치 → 작은 슬라임 2(그 자리 2 유닛 안), 폭탄 벌레 폭발로 플레이어 체력 300 → 276 + 자신 소멸, 뿔 멧돼지 돌진 상태 진입·도달, 고블린 6마리 몸집 6가지.
- 여정 3종 공통 시나리오(`smoke30`): 분열 새끼까지 잡아야 클리어되는 흐름 포함 통과(아래 실행 기록).

### 알려진 문제
- 헤드리스 소프트웨어 렌더(약 1.5~2 FPS)에서는 프레임 시간이 0.2초로 잘려 게임이 느리게 흐른다(실기기와 무관). 돌진 속도 검증은 단위 테스트가 맡는다.
- 자폭은 플레이어가 공중(점프)이면 피해를 입지 않는다 — 의도된 회피 수단.

## 2026-10-24 · v1.11.0 · 수정 동굴·강철 요새를 여정형으로 (2차 개선 5단계: 세 던전 모두 길을 떠나는 구조, 로봇 공장 테마)

### 변경 내용
- **수정 동굴 여정** `CAVE_JOURNEY`(72×220): 동굴 입구 → 좁은 틈(박쥐 3 매복) → 수정 광장(6) → [지하 호수: 마법사 2 + 상자] → 종유석 회랑(7, 증원 2, 오를 수 있는 바위) → 갈림길(3, 북쪽 문) → [골렘의 둥지: 정예 **수정 심장 골렘**(돌 골렘 2배) + 박쥐 2 + 상자] → 박쥐 소굴(7, 증원 3) → 고요한 샘(모닥불·상자·회복) → 수정 대광장(10, 증원 4, 골렘의 문) → 골렘의 심장(보스). 적 50 + 미니 보스 + 보스, 상자 3. 보스 (0, −101).
- **강철 요새 여정** `FORTRESS_JOURNEY`(76×204, **로봇 공장** 테마): 요새 정문 → 경비 초소(5) → 컨베이어 통로(드론 3 + 포대 1) → 조립장(6, 증원 2, 오를 수 있는 컨테이너) → [창고: 드론 2 + 상자] → 교차로(3, 서쪽 문) → [무기고: 정예 **요새 경비대장**(철벽 2.2배) + 돌진 2 + 상자] → 포대 마당(6, 증원 3) → 정비실(기계·상자·회복) → 사령부 앞마당(12, 증원 4, 사령관의 문, 상자) → 사령관의 홀(보스). 적 50 + 미니 보스 + 보스, 상자 4. 보스 (0, −93).
- **적 외형(skin)** `EnemySpawnConfig.skin`: 적 배치마다 `manifest.json` `enemies.<skin>` 의 .glb 를 고를 수 있다. 요새의 적은 전부 `robot-<종류>`(기존 `enemy-*.glb` 로봇 5종, 자체 제작)로 나와 같은 종류라도 숲·동굴의 몬스터와 다르게 보인다. `EnemySpawner.spawn(..., skin)` → `createEnemyModel(type, def, skin)`.
- **던전별 구역 소품 표** `decorLayout.zonePropsFor`: 동굴 `CAVE_ZONE_PROPS`(횃불·수정 기둥·종유석·발광 버섯·뼈·모닥불), 요새 `FORTRESS_ZONE_PROPS`(경고등·기계·컨테이너·드럼통·배관). 새 소품 `crystalPillar`(바위 받침 + 발광 수정), `machine`(강철 상자 + 발광 조작판 + 배관 + 경고등). 부피 있는 소품은 구역 가운데를 피한다(테스트).
- 던전 선택 카드의 적 수가 여정 파도 합계로 표시된다(숲 40·동굴 50·요새 50). 던전 소개 문구 갱신.
- 열린 경기장용 `arenaHalfSize/spawns` 는 남겨 두되 세 던전 모두 `journey` 를 쓴다(`GameConfig.world/enemies.spawns` 기본값은 그대로).

### 수정 파일
`src/game/DungeonDefs.ts`, `src/game/GameConfig.ts`, `src/enemies/{EnemySpawner,EnemyModels}.ts`, `src/game/Game.ts`, `src/dungeon/{decorLayout,Decor}.ts`, `src/ui/DungeonSelectUI.ts`, `public/models/manifest.json`, `tests/{journey,decor}.test.ts`, `package.json`, `CLAUDE.md`, `GAME_GUIDE.md`, `docs/2차개선-분석과-계획.md`, `CHANGELOG.md`

### 에셋·라이선스
- 새 파일 없음. 로봇 외형은 기존 `enemy-*.glb`(이 저장소의 `tools/make_enemies_glb.py` 산출물).

### 테스트 결과
- `npm run check` 통과(타입 검사·단위 테스트 163개·빌드). 여정 테스트가 세 던전을 모두 돈다: 연결성(BFS)·구역 모양 다양성·적 배치가 구역 안·정예·증원 존재·상자/보스/장애물이 걷는 곳·문이 통로 안·벽 구멍 없음·경로 길이, skin 키가 manifest 와 일치, 던전끼리 배치가 다름. 던전 배치 겹침 검사·구역 소품 검사도 세 던전.
- Playwright 공통 시나리오(`smoke30.cjs cave|fortress`): 시작 구역 → 메인 구역 8곳을 차례로 돌며 등장 수(기대와 일치)·증원·클리어·문 열림(벽 −1)·쉼터 회복 아이템 → 보스 구역에서 보스 등장 → 처치 → 결과 9/9 → 선택 구역 2곳(정예 배너 "수정 심장 골렘 등장!" / "요새 경비대장 등장!"). 요새는 로봇 외형 5종 로드 확인. 지도 캔버스(`map-journey.cjs cave|fortress`)로 배치 확인.
- 회귀: 숲 여정(smoke26)·던전 선택/해금/저장 변환(smoke12)·보스 패턴 3종(smoke14) — 보스가 보스 구역 진입으로 등장하도록 테스트를 맞춘 뒤 통과.

### 알려진 문제
- 실제 플레이 시간(각 10분+ 목표)과 난이도는 사람이 재야 한다. 적 수·체력은 각 여정의 `waves` 로 조정.
- 얼음 던전·우주 기지 테마는 아직 없다(네 번째 던전 정의를 추가하면 같은 구조로 동작).
- 그리기 호출은 적 수에 비례(복셀 적 1마리 ≈ 80회). 큰 전투 광장(적 12)에서 휴대폰이 느리면 화질을 '낮음'으로.

## 2026-10-24 · v1.10.0 · 그래픽 고도화 (2차 개선 4단계: 복셀 보스·구역 소품·전투 효과·적 우회 이동)

### 변경 내용
- **복셀 보스 3종** `tools/make_bosses_glb.py`(새) → `public/models/boss-{guardian,golem,commander}.glb`(각 86~89개 상자, 41~44KB). 숲의 수호 로봇(이끼 낀 돌·청동 흉갑·발광 코어·사슴뿔 왕관·룬 돌 망치), 수정 골렘(어두운 바위·보라 수정 심장·등의 수정 산맥·수정 뿔·수정 주먹), 요새 사령관(붉은 강철·금 휘장·어깨 포탑·망토·오른팔 대포·배기구 발광). 몬스터와 같은 부품 이름 규칙이라 적 리그가 걷기·예고·휘두르기를 만들고, `Boss.decorateGltfBoss` 가 패턴 색 바닥 원(내려찍기는 커짐)과 2단계 붉은 눈(`eye_*` 재질 맥동)을 덧입힌다. `manifest.json` `bosses` 에 등록(코드 모델은 파일을 지우면 그대로 돌아옴).
- **보스전 카메라**: 보스가 22 유닛 안에 살아 있으면 카메라 거리를 1.3배로 부드럽게 (`camera.bossZoom`) — 큰 보스가 화면 위로 잘리지 않게.
- **구역 테마 소품** `decorLayout.planZoneProps`/`ZONE_PROPS`(새): 구역 종류별로 가장자리·모서리·가운데에 소품을 둔다(걷는 칸 위, 적 등장·상자·장애물·문·시작·보스 자리 회피, 전투 공간 가운데는 비움). 새 소품 12종(`Decor.makeProp`): 횃불·모닥불(불꽃 일렁임)·통나무 의자·쓰러진 통나무·부서진 울타리·표지판·폐허 기둥·무너진 돌담·보스 터 룬 돌기둥·뼈 무더기·발광 버섯·천막. 울타리 벽은 자리마다 색을 조금씩 달리해(인스턴스 색) 단조로움을 줄였다.
- **전투 효과** `Effects.slash`(근접 공격마다 공중을 비스듬히 휩쓰는 검 궤적, 가산 혼합), `Effects.pillar`(빛 기둥). 레벨 업: 금빛 기둥 + 충격파 + "레벨 업! 레벨 N" 배너. 보스 등장: 보스 색 기둥 + 큰 충격파 + 0.3초 느려짐(`juice.bossEntrance`). 희귀 이상 장비 드롭에 등급 색 빛 기둥·바닥 고리(`LootSystem`, 맥동). 수치는 `GameConfig.juice`.
- **적 우회 이동** `movement.segmentBlocked/steerAround`(새, 순수 함수) + `Enemy.update`: 추적 중 앞 3.5 유닛이 막히면 0.3초마다 좌우 0.6/1.2/1.8/2.4 rad 로 꺾은 방향 중 '보이는 데까지 간 지점에서 플레이어가 곧장 보이는' 것을 고른다(A* 아님). 처음 꺾은 쪽을 기억해 떨림을 막는다. `enemies.detour`.
- 디버그 API: `debugSetBossHpRatio`, `debugSpawnDrop`, `debugSpawnEnemy`, `getDebugState().renderInfo`(그리기 호출·삼각형).

### 수정 파일
`tools/make_bosses_glb.py`(새), `public/models/{boss-guardian,boss-golem,boss-commander}.glb`(새), `public/models/manifest.json`, `public/models/README.md`, `src/enemies/{Boss,Enemy}.ts`, `src/game/{Game,GameConfig,CameraController}.ts`, `src/dungeon/{decorLayout,Decor,DungeonScene}.ts`, `src/combat/{Effects,CombatSystem}.ts`, `src/items/LootSystem.ts`, `src/player/movement.ts`, `tests/{models,decor,movement}.test.ts`, `package.json`, `CLAUDE.md`, `GAME_GUIDE.md`, `docs/2차개선-분석과-계획.md`, `CHANGELOG.md`

### 에셋·라이선스
- 보스 3종 .glb: 이 저장소의 파이썬 스크립트가 생성한 자체 제작물. 외부 에셋 없음.

### 테스트 결과
- `npm run check` 통과(타입 검사·단위 테스트 146개·빌드 823KB/gzip 231KB). 새 테스트: 보스 .glb 파일·manifest·리그 부품(팔다리·머리·눈·발광·무기 유무), 구역 소품(결정적, 모든 구역에 존재, 걷는 칸 위, 적·상자·시작·보스 회피, 모닥불·의자), 우회 조종(막힘 판정, 뚫린 방향, 목표 가시성, 사방 막힘).
- Playwright: 보스 3종 로드(`boss:*`)·등장·예고 바닥 원·2단계 붉은 눈 스크린샷(숲·동굴·요새) / 구역 6곳 소품 스크린샷 / 검 궤적·희귀 드롭 빛 기둥·레벨 업(1→13, 배너)·보스 등장 느려짐 0.30초 / 우회 이동: 보물 터(−27,−19)→둘째 공터(−13,−7) 고블린이 우회 끔이면 40초 동안 모서리에 갇힘(최소 거리 6.6), 켜면 15초에 도달(경로 흔들림 없음).
- 회귀: 보스 패턴(동굴 소환·요새 포격·숲 돌진), 여정 흐름(출발→보스→결과 9/9, 비밀 방), 던전 선택·해금·저장 변환 모두 통과.
- 성능(헤드리스 소프트웨어 렌더라 FPS 는 의미 없음, 그리기 호출·삼각형만): 낮음 — 출발 306회/1.1만, 큰 전투 광장(적 8) 774회/1.9만, 보스 터(적 9+보스) 452회/1.4만. 중간 — 308/1.9만, 774/2.6만, 452/2.1만(풀 포기 증가). 높음은 블룸 후처리 때문에 마지막 패스만 집계돼 측정 불가(기하는 중간과 같음).

### 알려진 문제
- 그리기 호출의 대부분은 복셀 적(상자마다 메시 1개, 적 1마리 ≈ 80회). 적 8마리 이상 광장에서 휴대폰이 느리면 같은 재질 상자를 부위별로 합치는 최적화가 다음 후보.
- 우회 이동은 한 모서리를 도는 수준이라 긴 미로는 못 푼다(여정 구조에서는 충분).
- 다리·계단은 지형에 높낮이가 없어 보류. 실제 플레이 시간·체감 난이도는 사람이 재야 한다.

## 2026-10-24 · v1.9.0 · 첫 던전을 여정형 구조로 (2차 개선 3단계: 구역·통로·문·매복·증원·미니 보스·진행도)

### 변경 내용
- **여정 모듈** `src/dungeon/journey.ts`(새): 구역(zone)·통로(corridor)·문(gate) 사각형으로 던전을 적으면 격자(2유닛)로 래스터화해 걷는 칸과 맞닿은 칸을 **울타리 벽 상자**로 만든다(가로로 이어 붙여 242개). BFS 로 시작→모든 구역 연결 검증, `zoneAt`, 메인 경로 길이.
- **구역 진행기** `src/dungeon/ZoneSystem.ts`(새): 구역에 들어서면 `enter` 파도의 적 등장, 처음 등장한 적이 절반 이하가 되면 `half` 파도(증원), 전멸하면 클리어 → 조건이 맞는 문이 열린다. 적 없는 구역(출발·쉼터)은 들어서면 클리어. 보스 구역 진입 → 보스 등장. 목표(메인 경로의 첫 미클리어 구역)·진행도·빛 기둥 자리.
- **잊혀진 숲 여정** (`DungeonDefs.FOREST_JOURNEY`): 72×208 범위, 구역 11개(출발·첫 공터·좁은 숲길·둘째 공터·숨은 보물 터·갈림길·거인의 은신처·매복 광장·쉼터·큰 전투 광장·보스 터), 통로 10개, 문 2개(갈림길 정리 → 북쪽 문, 큰 전투 정리 → 보스 문), 적 41마리(고블린 24·박쥐 10·마법사 5·트롤 2) + 정예 미니 보스(숲의 거인 대장, 체력 2.2배·몸집 1.25배) + 보스, 증원 파도 2곳, 상자 3개(선택 경로 2), 오를 수 있는 상자·기둥·폐허 돌담 소품. 플레이어 시작 (0, 90), 보스 (0, −98). 메인 경로 직선 길이 239유닛(걷기만 약 40초) + 전투 ≈ 10분대.
- **직사각형 이동 범위**: `CollisionWorld.getArenaBounds()`(halfX/halfZ), `clampToArena`/`hitsObstacle` 이 직사각형을 받는다. 바닥·경계 벽·장식(풀·입자)도 직사각형. 다른 던전은 정사각형 그대로.
- `DungeonScene`: 울타리는 InstancedMesh 한 번에 그림, 장애물 `kind`(crate/pillar/hedge/ruin/gate)별 재질, 문 메시(널빤지+쇠띠) → `openGate` 로 충돌 상자 제거.
- `EnemySpawner.spawn(..., elite)`: 정예 배율. HUD **목표 패널**(PC: 위쪽 가운데, 휴대폰 가로: 아래 가운데, 세로: 세 번째 줄)과 **빛 기둥**(다음 목표 구역, 들어가면 사라짐). 구역 진입 배너, 매복 때 화면 흔들림, 쉼터 회복 아이템, 문 열림 효과.
- 인트로 무대를 여정 숲의 첫 공터(0, 55)로 옮김(`INTRO_ORIGIN`). 인트로 중에는 구역 진행기가 돌지 않는다.
- `GameConfig.world.obstacles/dungeon.chests/enemies.spawns` 는 열린 경기장 던전용 기본값으로 남김(숲은 여정 정의 사용).

### 수정 파일
`src/dungeon/journey.ts`(새), `src/dungeon/ZoneSystem.ts`(새), `src/game/DungeonDefs.ts`, `src/game/GameConfig.ts`, `src/player/movement.ts`, `src/player/PlayerController.ts`, `src/enemies/{Enemy,Boss,EnemySpawner}.ts`, `src/combat/Projectile.ts`, `src/dungeon/{DungeonScene,Decor,decorLayout}.ts`, `src/ui/HUD.ts`, `src/game/Game.ts`, `src/cinematic/{introTimeline,IntroDirector}.ts`, `src/style.css`, `tests/{journey,zones}.test.ts`(새), `tests/{dungeons,decor}.test.ts`, `package.json`, `CLAUDE.md`, `GAME_GUIDE.md`, `CHANGELOG.md`

### 테스트 결과
- `npm run check` 통과(타입 검사·단위 테스트 135개·빌드). 여정 테스트: 연결성, 구역 모양 다양성, 적·상자·장애물이 걷는 곳 안, 문이 통로 안, 벽에 구멍 없음, 경로 길이. 구역 진행기 테스트: 진입 등장·증원·증원까지 잡아야 클리어·문 열림·보스 진입 1회.
- Playwright 여정 시나리오: 출발 구역(적 0, 목표 1/9) → 첫 공터 4 등장 → 정리 → 숲길 2 → 둘째 공터 6 → 갈림길 3 → 정리 → 문 열림(벽 −1) → 매복 6 → 전멸 → 증원 2 → 정리 → 쉼터(회복 아이템) → 큰 전투 8 → 증원 4 → 정리 → 보스 문 열림 → 보스 구역에서 보스 등장 → 처치 → 결과 9/9 → 비밀 방 정예 배너. 지도 캔버스로 전체 배치 확인(스크린샷).
- 회귀: 상자 오르기(좌표 갱신), 인트로(교실, 적 0 복귀), 던전 선택·해금·저장 변환, 보스 패턴(동굴·요새·숲) 통과. 모바일 가로/세로 레이아웃 재확인(목표 패널 겹침 없음).

### 알려진 문제
- 적은 길 찾기가 없어 울타리 뒤에서 플레이어를 보면 벽에 막힌다(구역 안에서 등장하므로 대체로 괜찮음). 다음 단계에서 간단한 우회 이동 검토.
- 실제 플레이 시간은 사람이 재야 한다(10~15분 목표). 적 수·체력은 `FOREST_JOURNEY` 의 파도 수치로 조정.
- 동굴·요새는 아직 열린 경기장(다음 단계).

## 2026-10-24 · v1.8.1 · 모바일 UI 다듬기 (2차 개선 1단계)

### 변경 내용
- HUD 글자 최소 13~14px(라벨 11→13, 값 13→14), 패널 Safe Area(노치·홈 인디케이터) 반영.
- 휴대폰 가로(높이 520px 이하): 체력 패널을 두 열 격자(체력바 | 레벨·골드)로 납작하게(123→66px 높이), 통계 패널 한 줄(점수는 숨김 — 결과 화면에서 확인), 장비·메뉴 버튼은 패널 아래 44px 높이로, 조이스틱 120px.
- 세로: 통계 글자 13px, 회전 안내를 장비·메뉴 버튼 위로 올려 겹침 제거.
- 측정(Playwright, iPhone 가로 844×390·세로 390×844·태블릿 1180×820): 모든 주요 UI 화면 안, 겹침 없음, 최소 글자 13~14px, 터치 버튼 44px 이상.

### 수정 파일
`src/style.css`, `CHANGELOG.md`

## 2026-10-24 · v1.8.0 · 교실 인트로 · 수학 문제 상자 · 다음 던전 자동 이동 · 공격 반응 개선

### 변경 내용
- **공격 반응**: 쿨다운 0.45→0.34초, 검 동작의 뒤로 당김 30%→12%(누르는 즉시 휘두르는 느낌). `CombatSystem` 에 누름 예약: 쿨다운 중이나 프레임 사이의 짧은 탭도 쿨다운이 끝나자마자 한 번 나간다(두 번 나가지 않음).
- **다음 던전 자동 이동**: 클리어 결과 화면에 '다음 던전: ○○' 버튼과 6초 카운트다운(`dungeon.autoAdvanceSeconds`, 0 이면 버튼만). 끝나면 자동 입장, 다른 버튼을 누르면 취소. 다음 던전이 잠겼거나 마지막이면 표시 안 함.
- **보물 상자 수학 문제** (`game/mathQuiz.ts`, `ui/QuizUI.ts`): 상자를 열 때 초등 3학년 범위 문제(세 자리 덧셈·뺄셈, 곱셈구구, 나눗셈, 두 자리×한 자리) 보기 4개. 오답이면 새 문제(두 번째 오답부터 정답 안내), 정답이면 열림. 창이 열려 있으면 게임 멈춤(Esc 로 닫기). 설정 `chestQuiz`(게임 그룹, 기본 켬).
- **교실 인트로** (`cinematic/IntroSet.ts`): 창릉초등학교 3학년 교실(나무 바닥·뒷벽·칠판 글자 '창릉초등학교 3학년 / 오늘의 수학: 347 + 268 = ?'·책상 5개·의자·교탁·시계·창문·책)에서 공부하다가 몬스터가 들이닥치는 장면으로 변경. 첫 장면 카메라는 주인공 앞쪽에서 얼굴과 칠판을 함께 잡고, 자막 '창릉초등학교 3학년 교실, 조용한 수학 시간' → '갑자기 몬스터들이 교실로 들이닥쳤다!'. 조용한 음악으로 시작해 몬스터 등장 때 보스 음악. 책상·교탁·뒷벽은 충돌 상자(인트로 끝나면 제거). 학교 이름은 `GameConfig.meta.school`.
- 디버그: `chestsOpened`, `chestPositions`, `attacks`, `debugKillBoss()`.
- `docs/2차개선-분석과-계획.md`: 2차 개선 지시서에 대한 현재 구조 분석·원인·단계 계획.

### 수정 파일
`src/combat/CombatSystem.ts`, `src/assets/PartRig.ts`, `src/game/GameConfig.ts`, `src/game/Settings.ts`, `src/game/mathQuiz.ts`(새), `src/ui/QuizUI.ts`(새), `src/ui/ResultUI.ts`, `src/cinematic/IntroSet.ts`(새), `src/cinematic/introTimeline.ts`, `src/cinematic/IntroDirector.ts`, `src/dungeon/DungeonScene.ts`, `src/game/Game.ts`, `src/style.css`, `tests/mathQuiz.test.ts`(새), `tests/intro.test.ts`, `docs/2차개선-분석과-계획.md`(새), `package.json`, `CLAUDE.md`, `GAME_GUIDE.md`, `CHANGELOG.md`

### 테스트 결과
- `npm run check` 통과(타입 검사·단위 테스트 125개·빌드). 수학 문제 1,000개 범위·정답·보기 검증, 교실 카메라 테스트.
- Playwright: 상자 앞 E → 문제 창·게임 멈춤 → 오답 → 새 문제 → 정답 → 상자 열림·재개; 설정 끄면 바로 열림; 클리어 → '다음 던전: 수정 동굴' 카운트다운 → 자동 입장(play, cave); 빠른 탭 2번 → 공격 2회; 교실 인트로 장면 스크린샷·영상 확인. 회귀 smoke10/13/16 통과.

### 알려진 문제
- 교실 세트는 인트로에서만 보인다(게임 본편의 '여정식' 구조는 다음 단계).

## 2026-10-24 · v1.7.0 · 인트로 영상 (게임 안 실시간 연출, 줌 포함)

### 변경 내용
- **인트로 연출** (`src/cinematic/introTimeline.ts`, `IntroDirector.ts`, `src/ui/IntroOverlay.ts`): 숲 던전에서 소년이 몬스터 5마리(고블린 3·유령 마법사·트롤)와 싸우는 16초 장면을 실제 게임 엔진으로 연출한다(영상 파일 없음 → 용량 0, 어떤 화면 비율에도 맞음).
  1. 설정(0~3초): 높고 먼 곳에서 주인공에게 **줌 인**(시야각 55→40), 제목 'HERO X' 와 자막 '잊혀진 숲, 어둠이 깃들다'.
  2. 접근(3~6.5초): 몬스터 등장, 주인공이 앞으로 걷고 낮은 옆 앵글이 따라감. 자막 '몬스터들이 몰려온다'.
  3. 전투(6.5~11초): 카메라가 주인공 주위를 돌며 공격·처치, 처치 순간 **줌 펀치**(시야각 −7).
  4. 슬로 모션(11~13초): 시간 배율 0.25, 회피로 파고들며 앞쪽 옆에서 **얼굴 클로즈업**(시야각 34→30). 자막 '소년은 검을 들었다'.
  5. 마무리(13~16초): 뒤로 빠지며 **줌 아웃**(42→56), 제목과 '모험을 시작하세요'.
  - 위아래 검은 띠(영화 느낌), 건너뛰기 버튼. 아무 키·화면 터치로도 건너뛴다. 보스 음악 재생.
- 메뉴에 **인트로 보기** 버튼. 처음 '새 게임'을 누르면 인트로가 먼저 나오고 끝나면 새 게임이 시작된다(`hero-x.introSeen` 저장, 이후엔 바로 시작).
- 인트로 중에는 주인공이 다치지 않고(`damagePlayer` 무시), 드롭·경험치 없음, 승리 판정·자동 저장 없음. 끝나면 `restart()` 로 던전이 원래대로 돌아간다. 인트로 몬스터 체력 35%.
- `Game.mode` 에 'intro' 추가, `frame()` 이 연출 시간 배율로 시뮬레이션. `CameraController.resetFollow()` 로 복귀 때 카메라 점프.
- 창(메뉴 등) 패널이 화면보다 길면 패널 안에서 스크롤(`.guide-panel max-height/overflow`) — 버튼이 늘어 작은 화면에서 잘리던 문제.

### 수정 파일
`src/cinematic/introTimeline.ts`(새), `src/cinematic/IntroDirector.ts`(새), `src/ui/IntroOverlay.ts`(새), `src/game/Game.ts`, `src/game/CameraController.ts`, `src/ui/MainMenu.ts`, `src/style.css`, `tests/intro.test.ts`(새), `package.json`, `src/game/GameConfig.ts`, `CLAUDE.md`, `GAME_GUIDE.md`, `CHANGELOG.md`

### 테스트 결과
- `npm run check` 통과(타입 검사·단위 테스트 123개·빌드). 시간표 테스트(장면 순서, 줌 인/아웃, 줌 펀치, 슬로 모션·회피, 주인공 기준 이동, 몬스터 배치) 추가.
- Playwright(영상 녹화 포함): 인트로 보기 → 다섯 장면 모두 진행, 시야각 9단계 변화(31.5~55.8), 몬스터 5마리 등장·처치, 끝나면 메뉴 복귀·던전 적 11마리 복구·성장 불변. 키 건너뛰기, 첫 새 게임 → 인트로 → 건너뛰기 → 플레이, 두 번째 새 게임은 바로 플레이. 회귀 smoke10/13/16/20 통과.

### 알려진 문제
- 헤드리스 검증 환경(6 FPS)에서는 인트로가 실시간보다 느리게 흐른다(프레임당 0.2초 상한). 실제 기기(20 FPS 이상)에서는 16초.
- 슬로 모션 장면에서 주인공이 어느 쪽을 보는지는 자동 조준 대상에 따라 조금 달라진다.

## 2026-10-24 · v1.6.0 · 적을 몬스터로 (고블린·유령 마법사·트롤·동굴 박쥐·돌 골렘) + 사람형 적 리그

### 변경 내용
- **몬스터 5종 복셀 모델** `tools/make_monsters_glb.py`(새) → `public/models/monster-*.glb`, manifest 가 이 파일들을 쓴다(로봇 `enemy-*.glb` 는 선택 외형으로 남김).
  - rusher **고블린 전사**(52개 박스): 초록 피부, 발가락 달린 맨발, 누더기 옷·허리띠·주머니, 뼈 어깨 장식, 큰 머리·뾰족 귀·긴 코·송곳니·노란 발광 눈, 깃털 머리띠, 못 박힌 곤봉.
  - shooter **유령 마법사**(29개): 반투명 연기 하체(떠다님), 보라 로브·소매·장식 띠, 두건 속 어둠과 분홍 눈, 지팡이 끝 발광 구슬.
  - tank **트롤 거인**(60개): 굵은 다리·발톱, 거대한 몸통·배·털 조끼·허리띠·등 혹, 긴 팔·주먹, 작은 머리·뿔·아래 송곳니·주황 눈, 룬이 빛나는 나무 방패(예고 때 들어 올림), 도끼.
  - stalker **동굴 박쥐**(37개): 보라 털, 큰 귀, 코·송곳니·분홍 눈, 뼈대(팔·손가락뼈)와 막으로 된 날개(퍼덕임), 갈고리 발, 가슴 발광 무늬.
  - artillery **돌 골렘**(39개): 바위 다리·몸통, 용암 균열·심장석, 이끼, 바위 팔, 눈 틈새 발광, 손에 든 던질 바위(예고 때 치켜듦).
- **사람형 적 리그** (`PartRig.buildEnemyPartRig` 확장): 플레이어와 같은 부품 이름(`left_leg`…`weapon_*`)을 적에도 적용. 걷기(팔다리 교차), 예고(무기 팔을 뒤로 치켜들고 몸이 돌아감, 머리 숙임), 공격 순간(앞으로 휘두르고 복귀). 새 부품 `float_*`(떠다님), `leg_*`(짧게 흔들림). 기계 부품(wheel/claw/rotor/wing/barrel/shield/piston/antenna/glow/eye)과 함께 쓸 수 있다.
- 적 이름 변경: 돌진 로봇→고블린 전사, 포격 드론→유령 마법사, 철벽 로봇→트롤 거인, 박쥐 드론→동굴 박쥐, 요새 포대→돌 골렘 (`GameConfig`, 던전 부제, 조작 안내, 장비 설명, 문서). 능력치·행동은 그대로.

### 수정 파일
`tools/make_monsters_glb.py`(새), `public/models/monster-*.glb`(새 5개), `public/models/manifest.json`, `public/models/README.md`, `src/assets/PartRig.ts`, `src/game/GameConfig.ts`, `src/game/DungeonDefs.ts`, `src/ui/ControlsGuide.ts`, `src/items/ItemDatabase.ts`, `tests/models.test.ts`, `tests/dungeons.test.ts`, `package.json`, `CLAUDE.md`, `GAME_GUIDE.md`, `CHANGELOG.md`

### 테스트 결과
- `npm run check` 통과(타입 검사·단위 테스트 118개·빌드).
- 모델 단독 뷰어로 5종 확인. 게임 안(숲) 근접: 고블린·트롤(방패 룬·눈 발광) 확인, 콘솔 오류 없음. 회귀: 던전 선택·새 적(smoke12), 보스 패턴(smoke14) 통과(동굴 박쥐·돌 골렘 생성 포함).

### 알려진 문제
- 몬스터 색은 .glb 에 고정(설정의 `color` 는 투사체·효과 색에만). 로봇으로 되돌리려면 manifest 파일 이름만 바꾸면 된다.

## 2026-10-24 · v1.5.0 · 점프로 장애물 위에 올라서기

### 변경 내용
- 충돌 상자(`Box`)에 높이 `h` 추가(던전 장애물은 설정의 `h` 그대로, 보물 상자는 높이 없음 = 못 오름).
- `movement.ts`: `isAboveBox`(발이 윗면에 닿은 상자는 가로막지 않음), `groundHeightAt`(발밑 높이: 중심이 반지름 절반 여유 안에 있는 가장 높은 상자), `integrateJump` 에 발밑 높이 인자 + 등가속도 공식(프레임 간격이 커도 점프 높이가 줄지 않음 — 느린 기기에서 못 오르던 문제 예방).
- `PlayerController`: 이동 → 발밑 높이 계산 → 중력 순서. 윗면보다 `player.climbAssist`(1.0) 만큼 낮아도 올려 준다(올라서기 보조). 상자 가장자리로 걸어가면 떨어진다. 상자 위에서도 다시 점프 가능.
- `Player.groundY` 추가, `airborne` 는 발밑 기준. 디버그 상태에 `groundY`.
- 설정 `player.climbAssist`(허용 0~3).

### 수정 파일
`src/player/movement.ts`, `src/player/PlayerController.ts`, `src/player/Player.ts`, `src/dungeon/DungeonScene.ts`, `src/game/GameConfig.ts`, `src/game/Game.ts`, `tests/movement.test.ts`, `package.json`, `CLAUDE.md`, `GAME_GUIDE.md`, `CHANGELOG.md`

### 테스트 결과
- `npm run check` 통과(타입 검사·단위 테스트 118개·빌드). 통과/가로막힘, 발밑 높이, 적분·착지·낙하 테스트 추가.
- Playwright: 상자(높이 2) 앞에서 점프+전진 → 위에 섬(groundY 2, 스크린샷) → 걸어 내려오면 땅(0) → 돌기둥(높이 4)은 가로막힘 → 땅에서 다시 점프 정상. 콘솔 오류 없음.

### 알려진 문제
- 적은 상자 위로 못 올라오고(근접 공격도 안 닿음) 드론 포격만 맞는다. 너무 안전하면 `boss`/`enemies` 수치나 `climbAssist` 로 조정.

## 2026-10-23 · v1.4.0 · 적 5종 복셀 모델 + 적용 부품 이름 리그

### 변경 내용
- **공용 생성 모듈** `tools/voxel_glb.py`(새): 박스 쌓기 → .glb 내보내기를 모듈로 빼고 `make_player_glb.py` 가 이를 쓰도록 정리(출력 동일: 박스 209개).
- **적 5종 복셀 모델** `tools/make_enemies_glb.py`(새) → `public/models/enemy-{rusher,shooter,tank,stalker,artillery}.glb`, manifest 에 등록. 돌진 로봇(바퀴 4·집게 2·외눈·발광 안테나·경고 줄무늬), 포격 드론(로터·포신·발광 포구·렌즈 눈·지느러미), 철벽 로봇(궤도·바퀴·방패+금 테·붉은 눈·배기관·피스톤), 박쥐 드론(반투명 날개·송곳니·분홍 눈·귀), 요새 포대(다리 4·큰 포신·탄약 상자·줄무늬). 기존엔 박쥐 드론·요새 포대가 다른 적 외형을 재사용했는데 이제 전용 외형.
- **적 부품 이름 리그** (`PartRig.ts` `buildEnemyPartRig`): `wheel_`(이동 시 회전) / `claw_`(예고 때 벌어짐) / `rotor_`(항상 회전, 떠다님) / `wing_`(퍼덕임, 떠다님) / `barrel_`(발사 순간 반동) / `shield`(예고 때 들어 올림) / `piston_`(이동 시 펌프) / `antenna_`(흔들림) / `glow_`(예고 때 밝아짐) / `eye_`(예고 때 커짐). 예고 때 몸이 살짝 숙여지고 떠다니는 적은 위아래로 흔들린다. `ModelRegistry` 가 클립 없는 적 .glb 에 자동 적용.
- `ModelRegistry.cloneMaterials`: .glb 재질을 개체마다 복제해 피격 번쩍임·발광이 다른 개체와 섞이지 않게. 번쩍임이 끝나면 원래 emissive 색으로 복원(발광 부품 유지).

### 수정 파일
`tools/voxel_glb.py`(새), `tools/make_enemies_glb.py`(새), `tools/make_player_glb.py`, `public/models/enemy-*.glb`(새 5개), `public/models/manifest.json`, `public/models/README.md`, `src/assets/PartRig.ts`, `src/assets/ModelRegistry.ts`, `tests/models.test.ts`, `package.json`, `src/game/GameConfig.ts`, `CLAUDE.md`, `GAME_GUIDE.md`, `CHANGELOG.md`

### 테스트 결과
- `npm run check` 통과(타입 검사·단위 테스트 115개·빌드). `classifyEnemyPart`/`enemyPartGroup` 테스트 추가.
- 모델 단독 뷰어로 5종 정면·3/4·뒷면 확인. 게임 안(숲) 근접 스크린샷: 돌진 로봇(집게·안테나 발광), 포격 드론(떠서 로터 회전), 철벽 로봇(방패) 확인, 콘솔 오류 없음.
- 회귀: 던전 선택·새 적(smoke12), 보스 패턴(smoke14) 통과 — 동굴·요새의 박쥐 드론·요새 포대 .glb 생성 포함.

### 알려진 문제
- 적 모델 색은 .glb 에 고정이라 `enemies.types.<종류>.color` 를 바꿔도 .glb 적의 색은 바뀌지 않는다(투사체·효과 색만 바뀜). 색을 바꾸려면 생성 스크립트를 고치고 다시 생성.
- 보스 3종은 아직 임시 모델(다음 단계).

## 2026-10-23 · v1.3.1 · 아들 캐릭터 모델 디테일 강화 (코드로 다시 생성)

### 변경 내용
- **`tools/make_player_glb.py`** (새): 파이썬 표준 라이브러리만으로 박스를 쌓아 glTF 2.0 바이너리를 쓰는 생성기. 참고 그림(복셀 모험가)에 맞춰 박스 68개 → **209개**, 재질 28개(색·거칠기·금속, 발광·반투명)로 다시 만들었다. Y-up·정면 +Z 로 만들어 manifest 의 `rotationX` 보정이 필요 없다.
  - 머리: 3단 돔 캡 + 옆머리·뒷머리 + 앞머리 두 줄(길이 제각각, 가르마) + 결정적 난수로 쌓은 윗머리 뭉치 44개 + 정수리 삐침. 밝기 3단계 갈색.
  - 얼굴: 흰자·홍채·동공·하이라이트 눈, 3조각 아치 눈썹, 안경(테·반투명 렌즈·다리·브릿지), 코, 미소 입(양끝 올라감), 볼 홍조, 귀.
  - 옷: 남색 튜닉 + 밝은 파란 앞판 + 금색 중앙·가장자리·밑단 테두리, 가슴 V 장식·보석, 허리띠·금 버클·양쪽 주머니, 어깨 보호대(금 테), 흰 소매, 갈색 팔 보호대(금 띠), 배낭 끈·버클, 스카프(접힘·금 고리·뒤 꼬리).
  - 배낭: 몸체·파란 두루마리·주머니·버클·끈. 다리: 바지·파란 무릎 보호대·금 끈·장화(윗단·끈·버클·코·밑창).
  - 검: 오른손에 **앞(+Z)을 향하게**. 손잡이·감개·자루끝·금 날밑·보석, 발광 반투명 날 + 밝은 중심선 + 계단형 가장자리 7개 + 끝 2단 + 떠다니는 빛 조각 6개(`KHR_materials_emissive_strength` 로 블룸에 걸림).
- 색은 sRGB → 선형으로 변환해 넣는다(처음엔 변환 없이 넣어 전체가 허옇게 떠서 고침). 검 발광 세기는 블룸에 하얗게 번지지 않는 1.1~1.6 으로.
- `manifest.json`: `player` 의 `rotationX` 제거(새 파일은 Y-up).

### 수정 파일
`tools/make_player_glb.py`(새), `public/models/player.glb`(재생성), `public/models/manifest.json`, `public/models/README.md`, `package.json`, `src/game/GameConfig.ts`, `CLAUDE.md`, `CHANGELOG.md`

### 테스트 결과
- `npm run check` 통과(타입 검사·단위 테스트 114개·빌드).
- 모델 단독 뷰어(Playwright + three, 정면·3/4·측면·뒷면·얼굴 클로즈업)로 비율·색·디테일 확인. 게임 안(고화질, 카메라 0.6)에서 정면·걷기·공격·뒷모습 스크린샷 확인, 콘솔 오류 없음. 리그(걷기·공격)는 부품 이름이 같아 그대로 동작.

### 알려진 문제
- 참고 그림의 60% 정도 느낌이 한계(박스 기반). 더 올리려면 Meshy/Tripo 같은 AI 3D 생성 결과물이나 MagicaVoxel 작업물을 넣는다.

## 2026-10-23 · v1.3.0 · 아들 캐릭터 모델(player.glb) 투입 + 부품 이름 리그

### 변경 내용
- **`public/models/player.glb`**: 사용자가 준 아들 복셀 모험가 모델(안경·갈색 머리·파란 튜닉·검·배낭, 68개 부품, 40KB). `manifest.json` 의 `player` 에 등록.
- **`rotationX` 옵션** (`ModelRegistry.ts`): 위가 Z 축인 파일(trimesh·복셀 도구 출력)을 세우기 위한 보정. 회전 → 크기 재기 → 바닥·중심 맞추기 순서로 바꿔 어떤 축의 파일이든 발이 땅에 닿고 가운데에 선다.
- **부품 이름 리그** (`assets/PartRig.ts` 새 파일): 애니메이션 클립이 없는 .glb 에서 메시 이름(`left_leg`, `right_arm`, `head`, `sword_*` …)으로 다리·팔·머리를 묶고 바운딩 박스로 엉덩이·어깨·목 관절을 잡아 걷기(다리·팔 교차, 들썩임)·공격(검 든 팔을 뒤로 당겼다 휘두르고 몸이 따라 돎)·점프·회피(앞으로 숙임)·피격(뒤로 젖힘 + 붉은빛)·쓰러짐 동작을 만든다. 무기는 가까운 팔에 붙는다. 양 다리·양 팔이 모두 없으면 기존 단순 흔들림.
- glb 플레이어 재질을 복제해 피격 붉은빛(emissive)을 넣는다.

### 수정 파일
`public/models/player.glb`(새), `public/models/manifest.json`, `public/models/README.md`, `src/assets/PartRig.ts`(새), `src/assets/ModelRegistry.ts`, `tests/models.test.ts`, `package.json`, `src/game/GameConfig.ts`, `CLAUDE.md`, `GAME_GUIDE.md`, `CHANGELOG.md`

### 테스트 결과
- `npm run check` 통과(타입 검사·단위 테스트 114개·빌드). `classifyPart` 이름 분류 테스트 추가, manifest 기본값에 `rotationX: 0` 반영.
- Playwright 스크린샷(고화질·카메라 0.6): 정면(카메라를 향해 섬, 발이 땅에 닿음, 키 1.9), 걷기(다리 교차), 공격(검 팔 휘두름 + 부채꼴), 뒷모습(배낭) 확인. 오류 없음. 피격 무적 중 깜빡임(원래 기능)으로 한 장은 비어 보였고 재확인 시 정상.
- 회귀: 저장·이어하기(smoke10), 회피(smoke16) 통과. 얼굴 사진·모델 구조 검증(smoke19)은 저장소 manifest 를 고쳐 쓰던 방식을 `page.route` 가로채기로 바꿔 'glb 없음' 경로로 통과.

### 알려진 문제
- 설정의 **내 얼굴 사진**은 임시 모델 전용이라 `player.glb` 를 쓰는 동안 적용되지 않는다(설정 화면에는 그대로 보임).
- 리그 동작은 코드로 만든 것이라 전문 애니메이션만큼 자연스럽지는 않다. 각도·속도는 `PartRig.ts` 의 `update` 수치로 조정.

## 2026-10-23 · v1.2.0 · 소리 개선 (효과음·음악 합성 고도화 + 음원 파일 교체 구조)

### 변경 내용
- **효과음 합성 고도화** (`soundDefs.ts`, `AudioSystem.ts`): 효과음마다 여러 조각을 겹치고(저음 쿵 + 소음 크랙 + 금속 링 등) 필터 스윕·왜곡(WaveShaper)·두 겹 오실레이터(detune)를 쓴다. 잔향 버스(합성 임펄스 응답 1.8초)로 일부를 보내고, 재생마다 음높이·음량을 조금씩 바꿔 같은 소리가 반복되는 느낌을 줄였다. 출력 끝에 컴프레서를 달아 겹쳐도 찢어지지 않게.
- **음악 고도화**: 2줄 8~16박 반복 → 4마디(16박) 악절로 늘리고 드럼(킥·스네어·하이햇 합성), 패드 코드(두 겹 오실레이터 + 저역 통과), 베이스 서브 옥타브, 멜로디 필터 포락선 추가. 메뉴(C장조·드럼 없음)/숲(C장조 C-F-G-Am)/동굴(A단조·긴 잔향)/요새(G단조·톱니파)/보스(G단조·더블 킥) 5곡 재작성.
- **음원 파일 교체 구조** (`assets/SoundRegistry.ts`, `public/sounds/manifest.json`, `public/sounds/README.md`): `.glb` 모델과 같은 방식. manifest 에 적은 효과음·음악은 파일(.ogg/.mp3/.wav)로 재생하고, 없거나 실패하면 합성음. 효과음은 `files` 여러 개면 무작위 선택, `gain` 음량 배율. 음악 파일은 반복 재생, 디코딩이 끝나면 재생 중인 합성 음악을 즉시 파일로 바꾼다. README 에 이름표·파일 조건·무료 CC0 음원 출처·직접 만드는 도구 안내.
- 디버그 상태 `audio` 에 `voices`(울리는 소리 수), `fileMusic`, `files`, `fetched` 추가.

### 수정 파일
`src/audio/soundDefs.ts`, `src/audio/AudioSystem.ts`, `src/assets/SoundRegistry.ts`(새), `public/sounds/manifest.json`(새), `public/sounds/README.md`(새), `src/game/Game.ts`, `tests/sound.test.ts`, `package.json`, `src/game/GameConfig.ts`, `CLAUDE.md`, `GAME_GUIDE.md`, `CHANGELOG.md`

### 테스트 결과
- `npm run check` 통과(타입 검사·단위 테스트 113개·빌드). 테스트에 코드 유지 길이(chordAt)·드럼/코드 길이·manifest 검증 추가.
- Playwright(헤드리스 Chromium): ① 합성 — 메뉴·숲·보스 음악이 각각 울리고(voices > 0) 근접 공격·점프 효과음 뒤 오류 없음. ② 파일 — manifest 와 짧은 wav 를 가로채 넣어 메뉴·숲 음악과 melee·ui 효과음이 파일로 재생되고(fileMusic=true), 파일이 없는 보스 음악은 합성으로 되돌아감. 모두 통과.
- 실제 소리의 느낌(타격감·음량 균형)은 사람이 들어 봐야 한다. 수치는 모두 `soundDefs.ts` 에 있어 바로 조정 가능.

### 알려진 문제
- 합성음은 칩튠/신스 느낌 한계가 있다. 더 높은 품질은 `public/sounds/` 에 음원 파일을 넣는 방식으로.

## 2026-10-23 · v1.1.1 · 휴대폰 회전(가로 → 세로) 화면 깨짐 수정

### 변경 내용
- 증상: iPhone Safari 에서 가로로 하다가 세로로 돌리면 가로 때 배율이 남아 HUD 가 화면 밖으로 잘리고, 버튼이 브라우저 주소창 뒤로 들어감.
- `main.ts` `installViewportFix()` 추가: 회전·크기 변경 때 viewport 메타를 다시 써서 배율을 1 로 되돌리고 맨 위로 스크롤. `visualViewport` 높이(브라우저 막대 제외)를 `--app-height` 로 넣어 `#app` 높이에 사용(미지원 브라우저는 `100dvh`).
- `style.css`: 세로 화면에서 `.hud-top` 을 좌우 10px 안에 가두고 패널 폭을 넘지 않게(`max-width`, `box-sizing`).

### 수정 파일
`src/main.ts`, `src/style.css`, `package.json`, `src/game/GameConfig.ts`, `CHANGELOG.md`, `TROUBLESHOOTING.md`

### 테스트 결과
- `npm run check` 통과(타입 검사·단위 테스트 110개·빌드).
- Playwright(Pixel 5 에뮬레이션) 가로 851×393 → 세로 393×851 → 다시 가로: 각 단계에서 `#app` 높이 = 창 높이, 캔버스 비율 = 창 비율, 근접 버튼 아래 끝 ≤ 창 높이, HUD 오른쪽 ≤ 창 너비 확인(통과).

### 알려진 문제
- 실제 iPhone Safari 회전은 에뮬레이션으로 완전히 재현되지 않으므로 기기에서 확인 필요. 그래도 깨지면 TROUBLESHOOTING 의 '휴대폰 회전' 항목 참고.

## 2026-10-23 · v1.1.0 · 그래픽 개선 3 (캐릭터·적 모델 고도화) — 그래픽 개선 1~3 완료

### 변경 내용
- **영웅 모델 재제작** (`PlaceholderModel.ts`): 허벅지·정강이, 위팔·아래팔 관절. 얼굴(눈·눈썹·입, 사진을 넣으면 숨김), 머리카락 뭉치, 어깨 보호대, 빛나는 버클, 장화, 등 뒤 **망토**(바람·이동에 따라 펄럭임), 에너지 검(날밑·손잡이).
  - 동작: 걷기(무릎 접힘·팔 교차), 정지 숨쉬기, 공격(뒤로 당겼다 크게 휘두르고 몸통·머리가 따라 돎), 점프, **회피**(앞으로 숙이고 팔 뒤로), **피격**(뒤로 젖혀지며 붉게). `PlayerModelState` 에 `dashing`, `hurt` 추가.
- **적 모델 애니메이션**: 돌진 로봇 = 바퀴 4개(이동 시 회전)·집게 팔(예고 때 벌어짐)·안테나 맥동. 포격 드론 = 머리 위 로터 회전·센서 눈·발사 반동. 철벽 로봇 = 배기관·피스톤(이동 시 펌프)·눈 맥동.
- **보스**: 숨쉬기(몸통 부풀기), 눈 맥동(2단계에서 빠르게).
- 바이저·버클 발광을 낮춰 얼굴이 블룸에 가려지지 않게.

### 수정 파일
- 수정: `src/player/{Player.ts,models/PlaceholderModel.ts}`, `src/enemies/{EnemyModels,Boss}.ts`, `package.json`

### 테스트 결과 (실제 실행)
- `npm run typecheck`: 통과 · `npm test`: 110개 통과 · `npm run build`: 성공
- 브라우저: 영웅 정면·걷기, 돌진 로봇·드론·철벽 근접 스크린샷 확인. 얼굴 사진·회피·메뉴 회귀 통과. 콘솔 오류 없음.

### 알려진 문제
- 여전히 코드로 만든 모델이라 '사실적' 수준은 아니다. 더 올리려면 `public/models/` 에 .glb(CC0 에셋 또는 제작 모델)를 넣는다 — 구조는 준비돼 있다(README).

## 2026-10-23 · v1.1.0-b.1 · 그래픽 개선 2 (환경 연출: 장식·풀·입자·카메라 흔들림·히트 스톱)

### 변경 내용
- **던전 장식** (`src/dungeon/Decor.ts`, 배치는 `decorLayout.ts` 순수 함수·테스트): 숲 = 바위·덤불·꽃·그루터기(안), 나무 46그루·바위(벽 바깥 테두리). 동굴 = 작은 수정·종유석·빛나는 버섯(안), 큰 수정·종유석(밖). 요새 = 드럼통·파이프·깜빡이는 경고등·상자(안), 감시탑·파이프(밖). 장애물·상자·적·시작·보스 자리와 겹치지 않게 결정적 난수로 배치, 충돌 없음(이동·AI 영향 없음).
- **풀**(숲): InstancedMesh 로 수천 포기를 한 번에 그리고, 정점 셰이더에서 바람에 흔들린다. 화질별 600/1800/3500 포기.
- **입자**: 숲 반딧불, 동굴 먼지, 요새 불똥(Points, 가산 혼합). 화질별 40/90/160.
- **카메라 흔들림**: 피격, 보스 내려찍기·포격 폭발, 보스 등장·처치. 수치 `juice.hitShake/slamShake`.
- **히트 스톱**: 적 처치 순간 0.06초 동안 시간이 0.1배로 느려지고(보스 0.35초) 그리기는 계속 — 타격감. `juice.hitStop/bossHitStop`.
- 동굴 수정 장애물의 발광을 낮춰 하얗게 날리지 않게.

### 수정 파일
- 신규: `src/dungeon/{Decor,decorLayout}.ts`, `tests/decor.test.ts`
- 수정: `src/dungeon/DungeonScene.ts`, `src/game/{Game,GameConfig,CameraController}.ts`, `src/render/Quality.ts`, `package.json`

### 테스트 결과 (실제 실행)
- `npm run typecheck`: 통과 · `npm test`: 110개 통과(장식 배치 4개 추가: 결정성, 세 던전 모두 금지 영역과 겹치지 않음·영역 안/밖) · `npm run build`: 성공
- 브라우저: 세 던전 스크린샷(풀·바위·꽃·반딧불 / 수정·버섯·먼지 / 파이프·상자·경고등 확인), 던전 전환(장식 생성·해제)·보스·휴대폰 회귀 통과. 콘솔 오류 없음.

### 알려진 문제
- 풀은 그림자를 드리우지 않는다(성능). 나무는 벽 바깥에만 있어 가까이 가면 벽 너머로 보인다.

## 2026-10-23 · v1.1.0-a.1 · 그래픽 개선 1 (렌더링 품질: PBR·톤매핑·하늘·블룸·화질 프리셋)

### 변경 내용
- **재질을 PBR(MeshStandardMaterial)로 전면 교체**: 로봇·보스는 금속성, 돌·나무는 무광, 수정은 빛남. 도우미 `src/render/materials.ts` (`pbr`, `metal`, `glow`).
- **렌더 파이프라인** `src/render/RenderPipeline.ts`: ACES Filmic 톤매핑, sRGB 출력, 코드로 만든 실내 환경광(RoomEnvironment → PMREM)으로 금속·광택 반사. '높음' 화질에서는 EffectComposer(장면 → 블룸 → 출력) + MSAA 4x.
- **물리 기반 하늘**(three `Sky`): 숲·요새에 태양 위치·탁도로 하늘색이 정해지고, 태양광 방향을 하늘의 태양과 맞춤. 동굴은 어두운 배경 유지.
- **바닥 텍스처를 노이즈로 생성** `src/render/groundTexture.ts`: 색 지도 + 노멀맵(요철). 던전 테마마다 색·요철·축척·거칠기(`groundBump/groundScale/groundRoughness`), 톤매핑 노출(`exposure`).
- **빛나는 요소**: 바이저·검·눈·탄·파편·수정이 emissive 로 빛나고 '높음'에서 블룸이 번진다 (`graphics.bloom` 세기·반지름·문턱).
- **게임 루프 고정 단계**: 한 프레임의 흐른 시간을 최대 0.05초(`performance.maxStep`) 단위로 여러 번 시뮬레이션하고 한 번만 그린다. 프레임이 10~20 FPS 로 떨어져도 게임이 느려지지 않고(이전에는 슬로모션), 판정 간격은 그대로 유지된다. 한 프레임에 최대 0.2초까지만 따라잡는다.
- **화질 프리셋** 설정 → 화면 → `화질` 낮음/중간/높음 (휴대폰 기본 중간, PC 높음). 자동 화질 조절은 높음→중간→그림자 끔→해상도 순으로 내린다. 설정 화면의 선택 항목이 일반화되어(`options`) 난이도와 화질이 같은 방식.

### 수정 파일
- 신규: `src/render/{materials,Quality,RenderPipeline,groundTexture}.ts`
- 수정: `src/dungeon/{DungeonScene,Chest}.ts`, `src/game/{Game,GameConfig,DungeonDefs,Settings,AutoQuality}.ts`, `src/enemies/{EnemyModels,Boss}.ts`, `src/player/models/PlaceholderModel.ts`, `src/combat/{Effects,Projectile}.ts`, `src/items/LootSystem.ts`, `src/ui/SettingsUI.ts`, `tests/autoQuality.test.ts`, `package.json`

### 테스트 결과 (실제 실행)
- `npm run typecheck`: 통과 · `npm test`: 106개 통과 · `npm run build`: 성공
- 브라우저: 세 던전·보스 스크린샷 전후 비교(블룸·하늘·요철 바닥 확인), 설정(화질 버튼 포함)·휴대폰 터치·메뉴 흐름 회귀 통과. 콘솔 오류 없음.
- 헤드리스 소프트웨어 렌더에서는 PBR·후처리로 프레임이 더 낮아져(≈ 60→70 프레임/장면) 자동 검증의 대기 시간을 늘렸다. 실제 GPU 에서의 체감 성능은 사용자 확인 필요(끊기면 화질 '중간'·자동 화질 조절).

### 알려진 문제
- 풀·나무·입자 등 환경 장식은 2번 묶음에서. 캐릭터·적 모델 고도화는 3번 묶음에서.

## 2026-10-23 · v1.0.0 · 7단계 완료 (성능·오류 처리·문서) — 지시서 1~7단계 모두 완료

### 변경 내용
- **자동 화질 조절** (설정 → 화면 → `자동 화질 조절`, 기본 켜짐): 플레이 중 6초마다 평균 FPS 를 재서 30 미만이면 그림자를 끄고, 그래도 낮으면 해상도를 0.2 씩(최저 0.5) 내린다. 바뀌면 화면에 안내하고 설정에 저장한다. 올리는 방향은 하지 않는다(깜빡임 방지). 수치는 `GameConfig.performance`. 판단 로직은 `src/game/AutoQuality.ts`(순수 함수).
- **그래픽 연결 끊김(WebGL context lost)**: 끊기면 갱신을 멈추고 안내, 복구되면 설정을 다시 적용해 이어서 진행.
- **저장 실패 안내**: 저장 공간 부족·차단으로 쓰지 못하면 메뉴에 "저장에 실패했습니다" 를 표시한다.
- **루프 오류 보호**: 한 프레임에서 예외가 나면 루프를 멈추고 진행을 저장한 뒤 오류 상자로 넘긴다 (새로고침하면 저장 지점에서 이어짐).
- 문서 최종 정리: README(구조·실행·휴대폰), GAME_GUIDE, TROUBLESHOOTING, CLAUDE.md 를 현재 상태로 맞춤.

### 수정 파일
- 신규: `src/game/AutoQuality.ts`, `tests/autoQuality.test.ts`
- 수정: `src/game/{Game,GameConfig,Settings}.ts`, 문서 5종, `package.json`

### 테스트 결과 (실제 실행)
- `npm run typecheck`: 통과 · `npm test`: 106개 통과(자동 화질 2개 추가) · `npm run build`: 성공
- 브라우저 검증(헤드리스 소프트웨어 렌더 = 30 FPS 미만 환경): 새 게임 뒤 자동으로 그림자가 꺼지고 배너·설정 저장 확인 → `WEBGL_lose_context` 로 연결을 끊었다 복구하니 끊김 상태가 true→false 로 바뀌고 이동이 계속됨 → `localStorage.setItem` 이 예외를 던지게 한 뒤 메뉴에 "저장에 실패했습니다" 표시. 그 밖의 콘솔 오류 없음.

### 알려진 문제·다음 할 일 (사용자 의견 기반)
- 밸런스(던전 2·3, 보스 포격·소환, 회피 수치)는 실제 플레이 의견으로 조정한다.
- 정식 .glb 모델은 파일이 생기면 넣어 확인한다. 음악 악절 추가·교체는 의견에 따라.

## 2026-10-23 · v0.7.0-b.1 · 7단계 둘째 묶음 (내 얼굴 사진·정식 모델(.glb) 교체 구조)

### 변경 내용
- **내 얼굴 사진**: 설정 → 내 얼굴 → `사진 고르기`. 사진의 가운데 위쪽 정사각형을 잘라 256px 로 줄여 캐릭터 머리 앞면에 붙인다. 브라우저 저장소(`hero-x.face`)에만 저장, 서버 전송 없음. `지우기`로 원래 얼굴. (`src/player/FaceTexture.ts`, `PlayerModel.setFace`)
- **정식 모델 교체 구조**: `public/models/manifest.json` 에 `.glb` 파일 이름을 적으면 플레이어·적(종류별)·보스(외형별)가 그 모델로 바뀐다. 없으면 임시 모델. 애니메이션 클립 이름(idle/walk·run/attack/jump/die)이 있으면 자동 재생. 크기(`scale`)·바닥(`offsetY`)·정면(`rotationY`) 보정. 파일을 못 읽으면 경고만 남기고 임시 모델로 계속. (`src/assets/ModelRegistry.ts`, `public/models/README.md` 에 만드는 방법)
- three.js 에 포함된 `GLTFLoader`·`SkeletonUtils` 를 사용(새 라이브러리 없음).

### 수정 파일
- 신규: `src/player/FaceTexture.ts`, `src/assets/ModelRegistry.ts`, `public/models/{manifest.json,README.md}`, `tests/models.test.ts`
- 수정: `src/player/{Player.ts,models/PlaceholderModel.ts}`, `src/enemies/{EnemyModels,Boss}.ts`, `src/ui/SettingsUI.ts`, `src/game/{Game,GameConfig}.ts`, `src/style.css`, `package.json`

### 테스트 결과 (실제 실행)
- `npm run typecheck`: 통과 · `npm test`: 104개 통과(얼굴 자르기 3개, manifest 검증 2개 추가) · `npm run build`: 성공
- 브라우저 검증: 처음엔 얼굴 없음·모델 없음·manifest 경고 없음 → 설정에서 사진(300×400 PNG) 선택 → 머리에 얼굴 표시·미리보기·JPEG data URL 저장 → 새로고침 뒤 유지 → 지우기로 원복·저장 삭제 → manifest 에 없는 glb 두 개를 적으면 경고 2개(404)만 남고 새 게임 정상(적 11). 그 밖의 콘솔 오류 없음.
- 실제 .glb 파일로의 교체는 파일이 아직 없어 검증하지 못했다. 파일이 생기면 크기·방향 보정 값과 함께 확인한다.

### 알려진 문제
- 얼굴 사진은 임시 캐릭터에만 붙는다. .glb 플레이어 모델을 쓰면 그 모델의 얼굴이 쓰인다.
- 사진이 매우 크면(수십 MB) 휴대폰에서 처리에 몇 초 걸릴 수 있다.

## 2026-10-23 · v0.7.0-a.1 · 7단계 첫째 묶음 (효과음·음악)

### 변경 내용
- **효과음 19종**(근접·원거리·적 피격·처치·피격·획득·장비·회복·레벨 업·상자·점프·회피·보스 등장·내려찍기·폭발·소환·클리어·쓰러짐·버튼): 외부 음원 파일 없이 Web Audio 오실레이터·소음으로 **코드 합성**. 레시피는 `src/audio/soundDefs.ts` 의 `SFX`.
- **배경 음악 5곡**(메뉴·잊혀진 숲·수정 동굴·강철 요새·보스): 던전마다 다른 음계·템포의 짧은 악절을 반복 재생. 메뉴 ↔ 던전 ↔ 보스 등장 ↔ 결과(정지) 때 자동 전환, 짧은 페이드. 악절은 `MUSIC`.
- `src/audio/AudioSystem.ts`: 첫 조작(터치·키·클릭)에 소리를 켜고(브라우저 제한), 탭을 숨기면 멈춘다. Web Audio 를 지원하지 않으면 조용히 무시한다.
- **설정 → 소리**: 전체 음량·효과음·음악 (0~1). 즉시 반영·저장.
- 연결: `CombatSystem.onAttack`, `PlayerController.onJump/onDash`, Game 의 피격·획득·상자·보스·결과 지점.

### 수정 파일
- 신규: `src/audio/{soundDefs,AudioSystem}.ts`, `tests/sound.test.ts`
- 수정: `src/game/{Game,Settings,GameConfig}.ts`, `src/combat/CombatSystem.ts`, `src/player/PlayerController.ts`, `package.json`

### 테스트 결과 (실제 실행)
- `npm run typecheck`: 통과 · `npm test`: 99개 통과(소리 정의 3개 추가: 레시피 범위, 던전별 트랙 존재·악절 길이, 반음 변환) · `npm run build`: 성공
- 브라우저 검증(헤드리스 Chromium): 로드 직후 소리 꺼짐(예약 트랙 menu) → 새 게임 클릭으로 켜지고 트랙 forest → 공격·점프·회피 효과음 호출 오류 없음 → Esc 메뉴 menu → 이어하기 forest → 보스 등장 boss → 설정 소리 슬라이더 3개·전체 음량 0 저장 → 쓰러짐 결과에서 음악 정지. 콘솔 오류·경고 없음.
- 실제로 '어떻게 들리는지'는 자동 검증이 불가능하다. 사용자 청취 확인 필요.

### 알려진 문제
- iOS 무음 스위치가 켜져 있으면 Safari 는 Web Audio 도 무음으로 둔다. 무음 스위치를 끄거나 볼륨을 올려야 한다.
- 음악은 단순 합성 악절이라 반복이 느껴질 수 있다. 의견에 따라 악절을 늘리거나 바꾼다.

## 2026-10-23 · v0.6.5 · 휴대폰 화면 확대 방지·세로 화면 정리

### 변경 내용
- **화면이 갑자기 커지는 문제**(iPhone Safari): Safari 는 `user-scalable=no` 를 무시해 두 손가락 벌리기·같은 자리 더블탭으로 페이지가 확대된다. `main.ts` 의 `preventBrowserZoom()` 이 두 손가락 터치 이동, gesture 이벤트, 같은 자리(30px 안) 300ms 안 더블탭을 막는다. 다른 버튼을 빠르게 연달아 누르는 것은 막지 않는다. `html, body { touch-action: manipulation; overscroll-behavior: none }` 으로 더블탭 확대·당겨서 새로고침도 막는다.
- **세로 화면**: 위쪽 정보 패널을 두 줄로 쌓고 글자를 줄여 '던전·상자·남은 적' 글자가 세로로 쪼개지지 않게. 터치 `장비`·`메뉴` 버튼을 패널 아래로 옮기고 보스 체력바 위치 조정.

### 수정 파일
- 수정: `src/main.ts`, `src/style.css`, `package.json`

### 테스트 결과 (실제 실행)
- `npm run typecheck`: 통과 · `npm test`: 96개 통과 · `npm run build`: 성공
- 브라우저 검증(Pixel 5 세로 393×851 에뮬레이션): 패널 항목 높이 18px(한 줄), 메뉴 버튼과 겹치지 않음, 가로 모드 안내 표시 → 두 손가락 touchmove 는 차단되고 한 손가락은 허용 → 같은 자리 더블탭의 두 번째만 차단, 다른 자리 빠른 탭은 허용 → 메뉴 → 설정을 빠르게 연달아 탭해도 열림. 콘솔 오류 없음.
- 실제 iPhone 에서의 확대 차단은 사용자 확인 필요 (에뮬레이션은 이벤트 차단 여부만 확인).

### 알려진 문제
- 이미 확대된 상태라면 한 번 새로고침해야 원래 크기로 돌아온다.

## 2026-10-23 · v0.6.4 · 조작 개선 (회피·자동 조준 표시·진동·왼손 모드·버튼 크기)

### 변경 내용
- **회피(대시)**: `Shift`(또는 `L`) / 터치 `회피` 버튼. 이동 중이면 그 방향, 서 있으면 바라보는 방향으로 0.22초 동안 빠르게(20/s) 움직이고 그동안 **무적**. 쿨다운 0.9초(터치 버튼이 흐려지고 점선 테두리). 수치는 `player.dash`, 키는 `controls.dodge`. 순수 함수 `startDash/tickDash` 는 `movement.ts`.
- **자동 조준 표시**: 터치 조작 중 겨누고 있는 적 발밑에 청록색 고리가 보인다 (PC 마우스 조준에서는 없음).
- **진동**: 맞을 때·처치·보스 처치·상자·회피 때 짧게 진동 (`navigator.vibrate` 지원 기기만; iPhone 은 지원하지 않음). 설정 `진동` (휴대폰 기본 켜짐).
- **왼손 모드**: 공격·점프·회피 버튼을 왼쪽, 고정 조이스틱을 오른쪽으로. 설정 `왼손 모드`.
- **터치 버튼 크기**: 0.8~1.4× 슬라이더. 설정 `터치 버튼 크기`.
- 조작 안내 창에 회피 행 추가, Shift 키 이름 표시.

### 수정 파일
- 신규: `src/utils/haptics.ts`
- 수정: `src/player/{movement,PlayerController,Player}.ts`, `src/input/TouchControls.ts`, `src/game/{Game,GameConfig,Settings}.ts`, `src/ui/ControlsGuide.ts`, `src/style.css`, `tests/movement.test.ts`, `package.json`

### 테스트 결과 (실제 실행)
- `npm run typecheck`: 통과 · `npm test`: 96개 통과(대시 상태 테스트 추가) · `npm run build`: 성공
- 브라우저 검증: PC — Shift 로 대시(무적 시간·쿨다운 표시·이동 5.0), 쿨다운 중 재입력 무시, 이동 중 회피는 이동 방향, 자동 조준 고리 숨김. 휴대폰(Pixel 5 에뮬레이션, vibrate 를 가짜로 바꿔 호출 횟수 기록) — 회피 버튼 대시 + 진동 호출, 적 근처에서 조준 고리 표시, 피격 시 진동, 왼손 모드에서 버튼이 왼쪽·고정 조이스틱 오른쪽, 버튼 크기 1.3×로 커짐, 왼손 모드에서도 버튼 동작. 콘솔 오류 없음.

### 알려진 문제
- 회피 중에도 점프와 겹치면 둘 다 적용된다(의도: 허용). 회피 효과음은 7단계에서.

## 2026-10-23 · v0.6.3 · 떠다니는 조이스틱 (아무 곳이나 눌러 이동)

### 변경 내용
- **떠다니는 조이스틱** (기본 켜짐): 버튼이 아닌 화면 아무 곳이나 누르면 그 자리에 조이스틱이 나타나고, 끌면 그 방향으로 움직인다. 손을 떼면 멈추고 조이스틱은 왼쪽 아래 기본 자리로 흐리게 돌아간다. 버튼 위에서는 버튼이 우선이라 조이스틱을 잡은 채 공격·점프를 누를 수 있다.
- 설정 → 게임 → `조이스틱: 누르는 자리에` 를 끄면 예전처럼 왼쪽 아래 고정 조이스틱만 쓴다.
- 구현: `TouchControls` 에 전체 화면 이동 영역(`.touch-zone`, 버튼보다 아래 층)을 두고 `placeStick` 으로 조이스틱을 옮긴다. 설정 `floatingJoystick`.

### 수정 파일
- 수정: `src/input/TouchControls.ts`, `src/game/{Settings,Game}.ts`, `src/style.css`, `package.json`

### 테스트 결과 (실제 실행)
- `npm run typecheck`: 통과 · `npm test`: 95개 통과 · `npm run build`: 성공
- 브라우저 검증(Pixel 5 터치 에뮬레이션, 실제 손가락처럼 화면 좌표의 요소에 터치 이벤트): 화면 가운데(420,140)를 누르자 조이스틱 중심이 그 자리로 옮겨지고 오른쪽으로 끌어 +X 이동 → 오른쪽 빈 곳에서 아래로 끌어 +Z 이동 → 조이스틱을 잡은 채 근접 버튼으로 적 체력 35→23(멀티터치) → 설정에서 끄면 빈 곳을 눌러도 움직이지 않고 왼쪽 아래 조이스틱만 동작. 콘솔 오류 없음.

### 알려진 문제
- 실제 기기에서 손가락 크기에 따른 민감도(데드존 15%, 반지름 56px)는 의견을 받아 조정한다.

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
