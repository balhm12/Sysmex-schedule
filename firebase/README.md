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
- `voc-dashboard`, `kpi-dashboard` 쓰기: 쓰는 쪽을 코드에서 확인하지 못해 지금 동작 그대로 둠. 만족도는 Apps Script 가 데이터베이스 비밀(`FIREBASE_SECRET`, 규칙을 건너뜀)로 `/voc-dashboard/data` 와 `/voc-dashboard-backups/{날짜}` 에 쓴다(비밀이 비어 있으면 `auth != null` 규칙에서 쓰기가 실패). 스크립트 속성에 비밀이 있는지는 사용자만 확인할 수 있다. `/voc-dashboard-backups` 는 30일 정리 코드가 없어 쌓인다.

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
`npm test` → `tests/test_db_rules.js` 가 규칙(1·2단계)을 그대로 돌려 71가지를 확인한다(허용·거부).
규칙을 고치려면 `firebase/` 의 JSON을 직접 고치고 테스트를 맞춘다.

## 2단계: KPI 쓰기를 관리자 1명으로 제한 — `database.rules.stage2.json`
1단계와 같고 `kpi-dashboard` 쓰기만 다르다. KPI 관리자 계정(UID `sknozAsrQ4NZZyaGGPnDWZoWpSv2`) 외에는 쓸 수 없다(읽기는 그대로 로그인한 누구나).
- 적용: 콘솔 규칙 탭에 `database.rules.stage2.json`을 붙여넣고 게시. 적용 전에 지금 규칙(1단계)을 따로 복사해 둔다.
- 확인: KPI를 `?admin`으로 열어 관리자 로그인 → 「CRM 데이터 올리기」가 되는지, 팀장·일반 화면은 평소처럼 열리는지.
- 되돌리기: 문제가 생기면 1단계 파일(또는 복사해 둔 규칙)을 다시 게시.
- 관리자 계정을 바꾸면(UID 변경) 이 파일의 UID를 고치고 `tests/test_db_rules.js`의 UID도 같이 고친다.
- 아직 남은 것: `voc-dashboard` 쓰기(쓰는 쪽 Apps Script 확인 필요), 익명 로그인한 사람이 설치·근무일정을 한 건씩 고치는 것.

## 3단계: KPI 가중치 설정을 관리자 2명이 — `database.rules.stage3.json`
2단계와 같고 `kpi-dashboard/weights`(KPI 화면 「가중치 설정」이 저장하는 곳)만 다르다.
- **쓰기**: `weights/items/{YYYY-MM}`(그 달부터 적용하는 가중치 한 묶음)과 `weights/rev`(바꾼 시각)만 관리자 2명(기존 관리자 + 가중치 관리자). CRM 데이터(`meta`·`act`·`ser`·`hr`·`geo`·`eq`·`backups`) 쓰기는 기존 관리자 1명뿐이다. 값 검사: 시작월 형식, 정해진 업무·직급 이름만, 0~10 숫자만, `at`·`by` 필수, 그 밖의 항목 거부. `weights` 통째·`items` 통째 덮어쓰기·삭제는 거부(한 묶음 단위로만).
- 가중치 관리자 = smkim07 계정(UID `HBUnInhKjzMRicdpRIiV7Gn7p2d2`, 규칙 파일 2곳). 계정을 바꾸면 이 파일의 UID 2곳과 `tests/test_db_rules.js`의 `WUID`를 같이 고친다. UID는 그 계정으로 KPI `?admin` → 부서원 KPI → 가중치 설정에서 로그인하면 창에 표시된다(또는 콘솔 Authentication → 사용자).
- 적용·되돌리기는 2단계와 같다(콘솔 규칙 탭에 붙여넣고 게시, 문제가 있으면 2단계 파일 또는 복사해 둔 규칙). 2단계 없이 바로 3단계를 게시해도 된다(3단계가 2단계를 포함).
- 기존 관리자는 규칙을 바꾸기 전에도 가중치를 저장할 수 있다(2단계·1단계의 `kpi-dashboard` 쓰기 권한 안). 가중치 관리자만 3단계가 필요하다.
- 확인: 가중치 관리자 계정으로 저장이 되고, 같은 계정으로 「CRM 데이터 올리기」는 거부되는지.

## 3단계 추가: 학술 응대 자동 반영(2026-11-16) — `kpi-dashboard/acadAuto`
FS Portal 서버(Apps Script)가 Slack 학술요청 접수 건수(날짜·시간별 숫자만, 이름·본문 없음)를 3시간마다 `kpi-dashboard/acadAuto`에 쓴다.
- **쓰기**: `kpi-dashboard/acadBots/{UID}` 가 `true` 인 계정만(서버 전용 계정). 지정(`acadBots`)은 기존 관리자만. 값 검사: kind = fsportal-acad, src = slack, made = YYYY-MM-DD, at = 숫자.
- **처음 한 번(사용자)**: ① Firebase 콘솔(sysmex-system-schedule) → Authentication → 사용자 추가(이메일·비밀번호, 서버 전용) → UID 복사 ② 규칙 탭에 `database.rules.stage3.json` 붙여넣고 게시 ③ Realtime Database → `kpi-dashboard/acadBots` 아래에 키 = UID, 값 = true(불리언) 추가 ④ FS Portal Apps Script 「프로젝트 설정 → 스크립트 속성」에 `KPI_BOT_EMAIL`·`KPI_BOT_PW` 추가(채팅·저장소에 쓰지 않음).
- 확인: FS Portal 요청함 「연결 시험」 또는 3시간 안에 KPI Workload 학술 응대 「수집 범위」가 「FS Portal 서버 자동 반영」으로 바뀌는지. 계정을 바꾸면 `acadBots` 의 UID 만 바꾸면 된다(규칙 수정 불필요).

## 쓰는 곳 표와 만족도 쓰기 막기(2026-11-25)

화면·서버가 이 DB 어디에 쓰는지, 쓰기를 더 묶으면 무엇이 멈추는지는 `write-paths.md`. 같은 날 `database.rules.stage3.json` 의 `voc-dashboard` 쓰기를 `false` 로 바꿨다(쓰는 곳은 보안 비밀을 쓰는 만족도 Apps Script 뿐) — **콘솔에 다시 게시해야 적용된다.**

## 웹 API 키 정리 — 화면용·서버용 나누기(2026-11-25)

Firebase 웹 API 키는 화면이 떠야 하므로 공개 HTML 에 있을 수밖에 없다(지워도·재발급해도 같은 이유로 다시 노출). 통제는 **키 제한 + 위 DB 규칙**으로 한다. 이 프로젝트(sysmex-system-schedule) 키는 브라우저와 서버가 같이 쓰고 있어, 화면용 키에 HTTP 리퍼러 제한만 걸면 서버 쪽 호출이 막힌다. 그래서 서버용 키를 따로 만든다.

**이 키를 쓰는 곳**

| 쓰는 곳 | 종류 | 키를 읽는 곳 |
|---|---|---|
| `index.html`·`work-schedule.html`·`voc-dashboard.html`·`fsg-kpi.html`·`bulk_*_tool.html` | 브라우저 | 파일 안 `FIREBASE_API_KEY`(그대로 둔다) |
| FS 포털 `fs-talk/index.html` (근무일정·설치·만족도 읽기·근무일정 본인 칸 쓰기) | 브라우저 | 포털 파일 안(그대로 둔다) |
| FS 포털 `apps-script/notify.gs` (아침 브리핑·학술 자동 반영) | 서버(Apps Script) | 스크립트 속성 `SCH_KEY`(없으면 코드 안 값) |
| 설치 캘린더 구독 `apps-script-calendar/calendar_ics.gs` | 서버(Apps Script) | 스크립트 속성 `FB_API_KEY` |
| `fsg-report/push-dashboard.js`(「FSG 대시보드 올리기」·Colab)·`report-data.js`·`voc-summary.js` | 서버(PC·Colab Node) | 환경변수 `FSG_FB_SERVER_KEY`(없으면 HTML 안 값, `server-key.js`) |
| 근무일정 거울 캘린더(GitHub Actions `calendar-mirror`) | 서버 | 시크릿 `FIREBASE_API_KEY` |

**순서(콘솔은 사용자)**
1. Google Cloud 콘솔 → API 및 서비스 → 사용자 인증 정보 → 키 만들기. 이름 「서버용(Apps Script·PC)」. **애플리케이션 제한 없음, API 제한 = Identity Toolkit API · Token Service API** 두 개만(이 키로는 로그인만 하고, DB 읽기·쓰기는 로그인 토큰으로 한다).
2. 새 키를 넣는다 — 키 값은 저장소·채팅에 적지 않는다.
   - FS 포털 Apps Script(「FS TALK 알림」) → 프로젝트 설정 → 스크립트 속성 `SCH_KEY`
   - 설치 캘린더 Apps Script → 스크립트 속성 `FB_API_KEY`
   - 올리기 PC: PowerShell `setx FSG_FB_SERVER_KEY "새 키"` 후 새 창에서 실행(여러 사람이 쓰는 PC 도 이 값은 로그인 정보가 아니라 괜찮다 — 관리자 비밀번호·접근 코드는 따로)
   - Colab: 노트북 첫 칸에 `import os; os.environ['FSG_FB_SERVER_KEY']='새 키'`(노트북을 공유하면 그 줄은 지운다)
   - 거울 캘린더를 GitHub Actions 로 쓸 때만: 저장소 시크릿 `FIREBASE_API_KEY`
3. 각각 한 번씩 돌려 본다: 포털 아침 브리핑(`morningDigest` 수동 실행), 설치 캘린더 `.ics` 주소 열기, PC 「FSG 대시보드 올리기」(또는 `--dry-run` 아닌 실제 올리기 1회), `report-data` 가중치 읽기(로그에 「Firebase kpi-dashboard/weights」).
4. 그다음 기존 키(화면용)에 **HTTP 리퍼러 제한**: `https://balhm12.github.io/Sysmex-schedule/*`, `https://balhm12.github.io/fs-talk/*`, `http://localhost/*`, `http://localhost:*/*`. API 제한은 걸지 않는다(브라우저 SDK 가 여러 API 를 쓴다).
5. 확인: 설치일정·근무일정·만족도·KPI(관리자 올리기 포함)·포털(근무일정 칸 저장, 홈 일정 카드). 막히면 4번 제한을 지우면 바로 원래대로.
6. 3번까지 했는데 서버 쪽이 실패하면 그 곳의 속성·환경변수를 지우면 예전 키로 돌아간다(코드가 예전 값으로 되돌아감) — 단, 4번을 건 뒤에는 서버 쪽이 다시 막힌다.

**GitHub Security 알림(「Possible valid secrets detected」) 닫을 때 남길 사유** — 사유 「Won't fix」, 설명:
> Firebase 웹 API 키는 브라우저 앱에 공개되도록 설계된 값입니다. 접근은 HTTP 리퍼러 제한과 Realtime Database 보안 규칙으로 통제하며, 키를 재발급해도 같은 방식으로 다시 공개됩니다. 서버용 키는 저장소에 두지 않습니다(2026-11-25 화면용·서버용 분리).
