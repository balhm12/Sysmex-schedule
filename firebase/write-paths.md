# 일정 DB(sysmex-system-schedule)에 쓰는 곳 — 규칙을 조이기 전 판단 자료

2026-11-25 조사(Sysmex-schedule `0bf65e6` · fs-talk `95e0dc4` 기준). 규칙 열은 `database.rules.stage3.json`(2026-11-16 게시 기록). 루트는 읽기·쓰기 모두 `false`.

## 쓰는 곳

| DB 경로 | 지금 규칙 | 쓰는 코드 | 언제 | 그때 로그인 |
|---|---|---|---|---|
| `schedule-overrides/{custom·edited}/{id}` | 로그인한 누구나, 건별, 필수 칸·분류(install·relocation·evaluation·holiday) 확인 | `index.html` `saveEventToServer` | 설치일정 추가·수정 저장 | 익명 |
| `schedule-overrides/custom/{id}` 삭제 · `deleted/{id}` | 같음 | `index.html` `deleteEventFromServer` | 설치일정 삭제 | 익명 |
| `schedule-overrides/custom/user-{시각}` | 같음 | 포털 `index.html` `openInstallForm` → `schPut` | 포털 설치일정 등록, `/설치` | 익명 |
| `schedule-overrides/clients/{key}` | 로그인한 누구나 | `index.html` `saveClientToServer` | 새 거래처로 일정 저장 | 익명 |
| `schedule-backups/{날짜}` | 로그인한 누구나 | `index.html` `writeDailyBackup` | 저장·삭제 뒤 자동(30일 지난 것 정리 포함) | 익명 |
| `work-schedule/{팀}/{날짜}/{이름}` | 로그인한 누구나, 사람별, 날짜 형식·글자 수 확인 | `work-schedule.html` `saveEntryToServer` | 근무일정 칸 저장·지우기 | 익명 |
| 같음 | 같음 | 포털 `openWorkForm` → `schPut` | 포털 「내 근무」 입력, 바로 쓰기 명령 | 익명 |
| `work-schedule/notes/{팀}/{id}` | 로그인한 누구나 | `work-schedule.html` `saveNoteToServer`·`deleteNoteFromServer` | 특이사항 저장·삭제 | 익명 |
| `work-schedule/teamRoster/{팀}` | 로그인한 누구나, 6개 팀 이름만 | `work-schedule.html` `saveTeamRoster`, `bulk_grade_tool.html`·`bulk_nickname_tool.html` `applyAll` | 팀원 순서·추가·삭제·별명, 일괄 도구 | 익명 |
| `work-schedule-backups/{날짜}` | 로그인한 누구나 | `work-schedule.html` `writeDailyBackup` | 근무일정 저장 뒤 자동 | 익명 |
| `voc-dashboard/data` | **이 PR부터 규칙 쓰기 막음**(읽기는 그대로) | 만족도 Apps Script `pushDashboardToFirebase` | 폼 제출·매시간·전체 갱신 | 데이터베이스 보안 비밀(규칙 무시) |
| `voc-dashboard-backups/{날짜}` | 규칙 없음 = 거부 | 같은 스크립트 | 같음 | 보안 비밀 |
| `kpi-dashboard/*`(act·ser·hr·geo·eq·acad·meta·backups·staff·loadw) | 주 관리자 계정만 | `fsg-kpi.html` `pushShared`·`staffSync`, `fsg-report/push-dashboard.js` | 관리자 올리기·직원용 자료·부하도 가중치 | 관리자 이메일 로그인 |
| `kpi-dashboard/weights/*` | 관리자 2명 | `fsg-kpi.html` `wgtSave`·`wgtDelete` | 가중치 설정 | 관리자 이메일 로그인 |
| `kpi-dashboard/acadAuto` | `acadBots` 에 등록된 서버 계정만, 형식 확인 | 포털 `notify.gs` `acadKpiPush_` | 3시간마다·관리자 「지금 보내기」 | 서버 계정 로그인 |

이미 막혀 있는 것(stage3): 복구 페이지(`restore.html` 등 — 토큰 없이 트리 전체를 씀), `index.html` 옛 형식 자동 변환(`saveStorage` — 전체 덮어쓰기). 쓸 일이 생기면 `README.md` 「적용 순서」의 「잠깐 예전 규칙으로」 절차를 따른다.

읽기만 하는 곳: `voc-dashboard.html`, `apps-script-calendar/*.gs`(구독·거울), `scripts/calendar-mirror/mirror.js`, `fsg-report/report-data.js`·`voc-summary.js`, 포털 `notify.gs` 일정 읽기.

## 쓰기를 관리자·서버 계정으로만 묶으면 멈추는 것

1. **설치일정**: 일정 추가·수정·삭제, 새 거래처, 자동 백업
2. **근무일정표**: 칸 입력, 특이사항, 팀원 명단(순서·별명), 자동 백업
3. **FS 포털**: 「내 근무」 입력, 설치일정 등록, 그 바로 쓰기 명령
4. **일괄 도구** 두 개(관리자 로그인으로 바꾸지 않는 한)

모두 익명 로그인으로 쓰기 때문이다. 묶으려면 먼저 화면이 실제 계정으로 로그인하게 바꾸거나(예: 포털 승인 계정과 연결), 「내 이름 칸만 쓰기」처럼 계정–이름 대응표를 두는 규칙이 필요하다 — 둘 다 따로 설계할 일이다.

## 이번에 고친 것 · 남은 것

- **만족도 대시보드 쓰기를 규칙으로 막음**(`voc-dashboard/.write: false`) — 예전엔 익명 방문자도 대시보드 자료를 덮어쓰거나 지울 수 있었다. 쓰는 곳은 보안 비밀을 쓰는 Apps Script 하나라 깨지는 곳이 없다. **콘솔 게시는 사용자**(규칙 탭에 `database.rules.stage3.json` 붙여넣고 게시 — 게시 전 지금 규칙을 복사해 둔다). 게시 뒤 만족도 시트 메뉴 「전체 갱신」을 한 번 눌러 저장이 되는지 확인.
- **남은 것(결정 필요)**: 포털 바로 쓰기 명령의 「데모」 분류(`demo`)는 규칙 분류 목록(install·relocation·evaluation·holiday)에 없어 저장이 거부된다. 설치일정 화면에도 「데모」 표시가 없으므로, 규칙에 넣을지(설치일정 화면도 함께 고침) 포털에서 「데모」를 빼거나 다른 분류로 보낼지 정해야 한다.
