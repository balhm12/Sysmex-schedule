# 설치·근무일정 DB 규칙 (sysmex-system-schedule-default-rtdb)

`database.rules.stage1.json` — 1단계 규칙. 화면·로그인 방식은 그대로이고, **전체를 한 번에 덮어쓰거나 지우는 요청을 서버에서 막는다.**
(과거 데이터 손실 2건이 "전체 저장"에서 났다. 그 방식을 규칙으로 막는 것이 목적이다.)

## 무엇을 막고, 무엇을 못 막나
막는다
- 맨 위(`/`)·`schedule-overrides`·`work-schedule`·각 팀·`teamRoster`·`notes`·백업 폴더 **통째 쓰기·삭제**
- 정해지지 않은 경로 읽기·쓰기, 형식이 맞지 않는 값(날짜 아님, 구분 이상, 글자 아닌 값, 너무 긴 글)
- 로그인(익명 포함) 없는 읽기·쓰기

못 막는다 (2단계 이후)
- 익명 로그인을 한 사람이 **한 건씩** 고치거나 지우는 것. 페이지 주소와 API 키가 공개라 익명 로그인은 누구나 된다.
- `voc-dashboard`, `kpi-dashboard` 쓰기: 쓰는 쪽(Apps Script, 관리자 로그인)을 코드에서 확인하지 못해 지금 동작 그대로 둠.

## 적용 순서
1. Firebase 콘솔 → `sysmex-system-schedule` 프로젝트 → Realtime Database → **규칙** 탭
2. 지금 규칙 전체를 복사해 따로 저장 (되돌릴 때 쓴다. 지금은 `{"rules":{".read":"auth != null",".write":"auth != null"}}`)
3. `database.rules.stage1.json` 내용을 붙여넣고 **게시**
4. 확인: 설치일정에서 일정 추가·수정·삭제, 근무일정에서 칸 입력·특이사항·팀원 편집, KPI·만족도 열기
5. 이상하면 2번에서 저장한 규칙으로 되돌린다

## 영향 받는 도구
다음은 전체·팀 단위로 쓰기 때문에 1단계 규칙에서는 막힌다. 복구가 필요할 때만 **규칙을 잠깐 예전 것으로 되돌린 뒤** 쓰고, 끝나면 다시 1단계를 게시한다.
- `restore.html`, `backup restore.html` (근무일정 전체 복원)
- `fss복구.html` (팀 단위 복원), `restore_fss.html`
- 설치일정의 옛 배열 형식 자동 정리(`saveStorage`): 지금 데이터는 이미 새 형식이라 실행되지 않음

## 규칙 검증
`npm test` → `tests/test_db_rules.js` 가 규칙을 그대로 돌려 58가지를 확인한다(허용·거부).
규칙을 고치려면 `firebase/` 의 JSON을 직접 고치고 테스트를 맞춘다.

## 2단계: KPI 쓰기를 관리자 1명으로 제한 — `database.rules.stage2.json`
1단계와 같고 `kpi-dashboard` 쓰기만 다르다. KPI 관리자 계정(UID `sknozAsrQ4NZZyaGGPnDWZoWpSv2`) 외에는 쓸 수 없다(읽기는 그대로 로그인한 누구나).
- 적용: 콘솔 규칙 탭에 `database.rules.stage2.json`을 붙여넣고 게시. 적용 전에 지금 규칙(1단계)을 따로 복사해 둔다.
- 확인: KPI를 `?admin`으로 열어 관리자 로그인 → 「CRM 데이터 올리기」가 되는지, 팀장·일반 화면은 평소처럼 열리는지.
- 되돌리기: 문제가 생기면 1단계 파일(또는 복사해 둔 규칙)을 다시 게시.
- 관리자 계정을 바꾸면(UID 변경) 이 파일의 UID를 고치고 `tests/test_db_rules.js`의 UID도 같이 고친다.
- 아직 남은 것: `voc-dashboard` 쓰기(쓰는 쪽 Apps Script 확인 필요), 익명 로그인한 사람이 설치·근무일정을 한 건씩 고치는 것.
