# fsg-report — FSG 월간·분기 보고서 데이터 엔진 (Google Sheets 없이)

CRM 「모든 약속/활동」 내보내기 xlsx에서 보고서 숫자를 바로 계산한다.
계산의 원본은 대시보드 `fsg-kpi.html`의 `kpiCore`이고, 이 폴더의 `kpi-core.js`는 그 함수를 글자 그대로 떼어 낸 사본이다
(`tests/test_kpi_core_sync.js`가 둘이 같은지 검사한다). 그래서 **대시보드와 보고서가 한 엔진**을 쓴다.

내는 표 — 월간보고 시트의 같은 이름 탭과 같은 기준·같은 열 배치:

| 표 | 보고서 슬라이드 | 비고 |
|---|---|---|
| 정제_KPI | 2 핵심 요약 | FTFR·재방문율·MTTR·예방정비지수·건수, 팀별 FTFR·재방문율·MTTR |
| 정제_KPI월별추이 | 3 서비스 활동(12개월 차트), 2 전월 대비 | 기간 끝 달까지 12개월 |
| 정제_팀별실적 | 3 서비스 활동(팀별 표) | 설치+이전 칸은 CRM 활동 수. 시트의 캘린더 기준 기관 수는 설치 묶음에서 |
| 정제_케이스분석 | 5 케이스 분석 | 12개월 수리·PM·Calibration, 시리즈 재방문율 상관표(기간 vs 직전 달) |
| 정제_트렌드비교 | 6 트렌드 비교 | 조직개편 전(2025-04~2026-03) vs 후(2026-04~기준월) 월평균 |
| 정제_수도권 | 7 수도권 | WEST·EAST 최근 6개월 PM/A·S |
| 정제_엔지니어생산성 · 병원TOP5 · 반복고장TOP5 · 장애요인TOP4 | 8 주요 고객·장애 | 최근 1년 · 기간. 병원 TOP5 당월은 활동(방문) 기준 — 2026-10-26 결정으로 서비스 케이스 파일을 쓰지 않는다(시트는 케이스 기준이었음, 검산에서 당월 행은 비교 생략) |
| 정제_장비군에러율 · 정제_운영건전성 | 10 에러율·운영 건전성 | 건전성은 Serial No 자산대장이 있어야 계산(가동 장비 = 자산 '사용' ∩ 12개월 이력) |
| 정제_집중관리대상 | (15장 판의 9) | 자산대장 필요. PM 이력 장비 10대↑ · 반복 고장 50%↑ |
| 정제_설치상세 · 정제_설치현황 · 정제_팀별설치실적, 팀별실적의 설치 칸 | 4 장비별 설치 현황, 3 팀별 표 | 설치 공유캘린더 + 자산대장(기관명매핑·설치_수동입력 표는 2026-10-26부터 안 씀). 캘린더 줄 병합(5일) · CRM 매칭(±7일) · **이름이 다른 짝 자동 연결** · CRM에 없으면 캘린더 장비 표기로 집계 · 예정/중고/Demo 제외 · 캘린더 미등록 · 지난달 작업 35일 귀속 · v51 중복 제외 · v50 모듈/구성 중복 제거 |

12장 덱의 표는 모두 옮겼다(9 FCA · 11 만족도 · 12 Next Step은 시트 밖 소스).

**2026-10-26 3차 묶음 실측(Colab)**: 16탭 2,336칸 비교 → **다른 칸 0개**(설치 작업 37건 포함). 시트 로직과 완전히 같은 숫자를 내는 것을 확인한 뒤, 시트의 결함 한 가지를 고쳤다(사용자 지시):
자산대장의 **부품·소모품 행**(VALVE_ASSY 등, 설치일자 있음)을 시트는 '캘린더 미등록' 설치로 나열하고 그 기관을 팀별 설치 기관 수에 넣었다. 엔진은 이 행을 설치 매칭·캘린더 미등록에서 뺀다(`install.js` `partSkipped`).

**2026-10-26 설치 규칙 변경(사용자 결정)** — 기관명매핑·설치_수동입력 표를 없앴다. 사람이 유지하던 두 표가 부정확해서다. 대신:
- **자동 연결**: 캘린더 작업과 자산대장 설치 행을 ① 이름 같음/포함 → ② 날짜 ±7일 안에서 이름 유사도(v49 점수) ≥ 0.5 + 같은 모델군 → ③ 같은 날(±2일) 같은 모델군 후보가 하나뿐이고 팀이 다르지 않으면 이름이 달라도 연결. 연결한 짝은 검산 xlsx 「자동연결」 탭에 근거와 함께 적는다(사람은 보기만 한다).
- CRM에 없는 신규 설치는 이전설치처럼 **캘린더 장비 표기**로 대수를 센다(상태 `캘린더 표기(CRM 미등록)`), 지난달 캘린더 작업이 이달 CRM에 늦게 오르면 35일까지 그 작업에 귀속해 '캘린더 미등록'으로 다시 세지 않는다.
- 9월 실측: 기관 30곳 → 27곳(양쪽에 따로 잡히던 같은 설치 3건 해소), CRM 미등록 4건 → 1건.
- 그래서 설치(4장·팀별실적 설치 칸)는 더 이상 시트와 비교하지 않는다(compare-sheet가 안내). 병원 TOP5 당월도 케이스 파일 대신 활동 기준(같은 날 결정).
- CRM 「모든 약속/활동」 내보내기는 **40,000행이 상한**이다. 2026-10-26 추출은 정확히 40,000행이고 데이터가 2024-06-28부터 들어 있어 지금은 필요한 기간을 모두 덮는다(매달 시작일이 한 달가량 뒤로 밀리므로 지난 회계연도 비교가 잘리기 시작하는 2027년 여름쯤 기간을 둘로 나눠 내보낸다).
- **같은 날짜 활동 파일이 여럿이면 시작 시간 범위로 판정한다.** 범위가 이어 붙으면(기간을 나눠 내보냄) 모두 쓰고 똑같은 행은 한 번만 센다. 범위가 절반 이상 겹치면(같은 기간을 같은 날 다시 내보냄) **가장 새 파일 하나만** 쓴다 — 파일명의 `AM/PM 시-분-초`, 없으면 파일 수정 시각 기준. 다시 내보낸 파일까지 합치면 그 사이 상태가 바뀐 행(시작됨 → 완료됨)이 이중으로 잡히기 때문이다. 쓰지 않은 파일은 실행 요약에 `⚠ 같은 기간을 다시 내보낸 파일 N개는 쓰지 않음`으로 나온다(`lib/read-crm.js` `resolveActivity`, `tests/test_activity_files.js`).
- 대시보드·만족도는 **주 2회쯤** 새 CRM 파일로 반영한다. 파일을 폴더에 넣고 같은 명령을 다시 실행하면 된다(지난 파일은 지우지 않아도 최신만 쓴다).

## 준비
```powershell
cd sysmex-schedule
npm install            # xlsx(SheetJS)·jsdom
```

## 매달 하는 일 — Drive 폴더 하나에 넣고 Colab 실행 (PC 없이)
1. Drive 「내 드라이브」에 폴더 **`CRM_원본`** 을 한 번 만든다.
2. 매달 CRM에서 내보낸 파일을 **이름 그대로** 그 폴더에 넣는다 — 「2. 모든 약속_활동 …」(필수) · 「Serial No …」 · 설치 공유캘린더 내보내기 `시스템설치_공유캘린더_YYYYMMDD.xlsx`. 지난달 파일은 지우지 않아도 된다(파일명 날짜 → 수정 시각으로 최신 선택). 같은 날 다시 내보내도 최신 하나만 쓰고, 40,000행에 걸려 기간을 나눠 내보낸 파일은 합친다(아래 규칙).
3. [Colab에서 열기](https://colab.research.google.com/github/balhm12/Sysmex-schedule/blob/main/fsg-report/colab_report.ipynb) → 런타임 › 모두 실행 → 권한 허용. 기간을 비우면 지난달.
4. 결과는 Drive `FSG_report_out/<기간>/` — `report-data_<기간>.json`(PPT 빌더 입력) · `검산_<기간>.xlsx`(시트 정제 탭과 같은 배치 → 보고서 만들 때 이 파일을 올린다) · `요약_<기간>.txt`(이름 없는 요약, Claude가 Drive 커넥터로 읽음).

5. (선택) 노트북 5번 칸이 같은 파일을 **KPI 대시보드**(fsg-kpi.html)에도 올린다 — 브라우저 ?admin 화면의 「CRM 데이터 올리기」와 같은 포맷(encodeAct·encodeSer)과 같은 암호화(gzip → PBKDF2 200,000회 + AES-GCM, 접근 코드)로 Firebase `kpi-dashboard/{act,ser,meta}`에 쓰고, 올리기 전 기존 데이터를 `backups/날짜/`에 복사한다(30일 보관). 접근 코드·관리자 계정은 실행 때 묻거나 Colab 보안 비밀(FSG_KPI_CODE·FSG_ADMIN_EMAIL·FSG_ADMIN_PW)에서 읽고 어디에도 기록하지 않는다. 기존 데이터의 접근 코드와 다르면 올리지 않는다(`--force-code`로만 바꿈). `tests/test_push_dashboard.js`가 fsg-kpi.html 안의 `open_`·`decodeEmbed`·`decodeSer`로 되읽어 포맷이 같은지 확인한다.

PC에서 하려면 아래 CLI를 같은 폴더(Drive 데스크톱 동기화 경로)에 대고 돌리면 된다. 대시보드 올리기는 `node fsg-report/push-dashboard.js --dir "CRM_원본"` (환경변수 FSG_KPI_CODE·FSG_ADMIN_EMAIL·FSG_ADMIN_PW).

## 보고서 데이터 만들기 (PC, CLI)
```powershell
node fsg-report/report-data.js --period 2026-09 --dir "G:\내 드라이브\CRM_원본"
node fsg-report/report-data.js --period FY2026Q2 --activity "2. 모든 약속_활동 2026_10_12.xlsx" --out out
```
- `--period` 2026-09 · 2026-07~2026-09 · FY2026Q2 (회계 분기, 4월 시작)
- `--dir` 폴더에서 파일명(약속_활동 / Serial)으로 종류를 구분해 최신 파일(파일명 날짜 → 수정 시각)을 쓴다
- `--weights` KPI 가중치 설정. 기본은 Firebase `kpi-dashboard/weights`(대시보드 「가중치 설정」에서 바꾼 값)를 익명으로 읽는다. 못 읽으면 코드 기본값으로 계산하고 `meta.warnings`에 남긴다. 파일(`{items:{'2026-12':{score,grade}}}` 또는 `[{from,score,grade}]`)을 주면 그 값, `none`이면 기본값만(환경변수 `FSG_NO_NET=1`도 같음)
- `--serial` Serial No 자산대장. `--dir` 폴더에 있으면 파일명(Serial)으로 자동 선택. 서비스 케이스 파일은 쓰지 않는다(있어도 무시)
- `--calendar` 설치 공유캘린더 내보내기(`시스템설치_공유캘린더_YYYYMMDD.xlsx`). `--dir`에 있으면 파일명(캘린더)으로 자동 선택. 이름이 다른 짝은 자동 연결하고 검산 xlsx 「자동연결」 탭에 적는다
- `--roster` 로스터 CSV(fsg-roster `references/roster.csv` 형식). 없으면 `fsg-kpi.html`의 ROSTER(대시보드와 같은 명단)
- `--cut` CRM 추출일. 없으면 활동 파일명의 날짜. 그 뒤로 잡힌 예정 약속을 뺀다(대시보드·시트와 같은 규칙)
- 출력: `fsg-report/out/report-data_<기간>.json`(PPT 빌더 입력), `검산_<기간>.xlsx`(시트 정제 탭과 같은 배치), 콘솔 요약

## Windows에서 더블클릭으로 올리기 (Drive 데스크톱 앱 없이)
Colab 연결이 불안하거나 Drive 데스크톱 앱을 못 쓰는 PC용이다. CRM에서 내려받은 파일이 쌓이는 **다운로드 폴더를 그대로** 읽는다.
1. 최신 코드로 맞춘다(한 번): `cd $HOME\Sysmex-engine` → `git fetch origin` → `git checkout main` → `git pull` → `npm install`
2. `fsg-report\windows\setup.bat` 을 더블클릭한다(PC마다 한 번). 먼저 **접근 코드·비밀번호를 이 PC에 저장할지** 고른다(기본: 저장 안 함). 이어서 관리자 이메일 · CRM 파일 폴더(기본: 다운로드) · (선택) Drive `CRM_원본` 폴더 주소를 묻고, 바탕화면에 **「FSG 대시보드 올리기」** 아이콘을 만든다.
3. 평소에는 CRM에서 「2. 모든 약속/활동」(필요하면 「Serial No」도)을 내려받고 → 바탕화면 아이콘을 더블클릭한다. 끝나면 파일 위치와 Drive 폴더가 함께 열리니, 같은 파일을 Drive 창으로 끌어다 놓으면 만족도 시트가 2시간 안에 자동 반영한다.

- **저장 안 함(기본)**: 접근 코드와 비밀번호를 어디에도 저장하지 않고 올릴 때마다 묻는다(입력은 화면에 보이지 않음). 여러 사람이 쓰거나 PC를 번갈아 쓰면 이쪽을 쓴다.
- **저장(y)**: 본인만 쓰는 PC에서만. 이 PC의 이 Windows 계정으로만 풀 수 있게 암호화(DPAPI)해 `%LOCALAPPDATA%\fsg-kpi\config.json`에 저장하고, 이후 아이콘만 누르면 된다. 같은 계정으로 로그인한 사람은 아이콘으로 올릴 수 있다. 저장소·Drive에는 올라가지 않는다.
- PC를 번갈아 쓰면 PC마다 `setup.bat`을 한 번씩 실행한다. 설정은 PC·계정 사이에 옮겨지지 않는다. 비밀번호를 바꿨거나 저장 방식을 바꾸려면 `setup.bat`을 다시 실행한다. 저장한 값을 지우려면 `%LOCALAPPDATA%\fsg-kpi` 폴더를 삭제한다.
- 활동 파일이 8일 넘게 오래됐으면 "그래도 올릴까요?"를 묻는다. 모르고 예전 파일을 올리는 일을 막는다.
- **이미 올라간 것보다 오래된 파일은 올리지 않는다.** 올리기 전에 대시보드에 올라가 있는 활동 파일 이름(파일명 날짜, 같은 날이면 AM/PM 시각)과 비교해, 올리려는 파일이 더 오래됐으면 "예전 데이터로 덮어쓰지 않으려고 올리지 않았습니다"로 멈춘다. PC를 번갈아 쓰면 한쪽 다운로드 폴더에 예전 파일이 남아 있기 쉬워서다. 일부러 되돌릴 때만 `node fsg-report/push-dashboard.js --dir 폴더 --allow-older`(또는 `push-dashboard.ps1 -AllowOlder`). 대시보드에 올라가 있는 파일은 올리기 시작할 때 화면에 함께 나온다.
- **같은 파일로 보고서 데이터도 만든다(Colab 불필요).** 아이콘을 누르면 대시보드에 올린 뒤 이어서 `report-data.js`가 **지난달** 기준으로 `report-data_<기간>.json`과 `검산_<기간>.xlsx`를 `<CRM 파일 폴더>\FSG_report_out\`에 만든다(수 초). 설치 현황(4장)까지 넣으려면 `시스템설치_공유캘린더_YYYYMMDD.xlsx`도 같은 폴더에 두면 된다(없으면 4장만 빠진다). 다른 기간(분기 등)은 `push-dashboard.ps1 -Period FY2026Q2`, 안 만들려면 `-NoReport`. 보고서 데이터 만들기가 실패해도 대시보드 올리기는 이미 끝난 상태이고, 화면에 그렇게 안내한다.
- **자산대장(Serial)도 같은 규칙.** 다운로드 폴더의 Serial 이 대시보드에 올라가 있는 것보다 오래됐으면 활동 파일만 올리고 자산대장은 기존 자료를 유지한다(화면에 안내). 새 Serial 을 내려받으면 다음 올리기 때 함께 올라간다. `--allow-older` 면 함께 덮어쓴다.
- **회사 보안 프로그램이 HTTPS를 검사하는 PC**(브라우저는 되는데 "오류: fetch failed"): Node 는 Windows 인증서 저장소의 회사 인증서를 기본으로 모른다. `push-dashboard.js` 가 시작할 때 시스템 인증서를 자동으로 더해 믿는다(**Node 22.19 이상**). 그래도 안 되면 오류 문장 뒤에 원인 코드(예: `UNABLE_TO_GET_ISSUER_CERT_LOCALLY`)가 함께 나온다.
- **Node 업데이트(git·Node 없는 PC)**: PowerShell 에 `(irm https://raw.githubusercontent.com/balhm12/Sysmex-schedule/main/fsg-report/windows/bootstrap.ps1).TrimStart([char]0xFEFF) | iex` 한 줄을 붙여 넣으면 엔진 코드를 최신으로 덮어쓰고, 같이 깔린 설치 불필요 Node(`tools\node`)가 22.19 미만이면 22.22.2 로 올린다(체크섬 확인). 설정·저장한 코드는 건드리지 않는다. (다시 실행해도 안전하다.)
- 실행할 때마다 `git pull`로 엔진을 최신으로 맞춘다(실패하면 현재 버전으로 진행).
- 같은 날 다시 내보낸 파일 처리(최신 하나만)는 위 규칙 그대로다.
- PowerShell 스크립트 실행이 회사 정책으로 막혀 있으면 오류가 나온다. 그때는 위 「대시보드 올리기」의 PowerShell 명령을 직접 입력해도 같은 결과다(`node fsg-report/push-dashboard.js --dir 폴더`).
- 리눅스용 PowerShell로 파일 찾기·오래된 파일 경고·오류 안내까지는 시험했다. 암호화 저장(DPAPI)·바탕화면 아이콘·실제 업로드는 윈도우에서 처음 실행할 때 확인한다. 저장 안 함/저장 두 방식의 입력·환경변수 전달은 리눅스 PowerShell과 가짜 node로 시험했다.

## 만족도 시트용 CRM 파일을 Drive 로 자동 업로드 (선택)
아이콘이 대시보드에 올린 뒤, 같은 CRM 파일(같은 날짜의 활동 파일 + 최근 8일 안의 Serial No)을 Drive 「CRM_원본」 폴더로도 올린다. 폴더에 파일이 들어가면 만족도 시트의 「CRM 자동 가져오기」(2시간마다)가 방문건수를 갱신한다. 설정하지 않으면 예전처럼 끝에 Drive 폴더가 열려 직접 끌어다 놓는다.
- **받는 쪽(한 번만):** 만족도 시트 Apps Script 에 `doPost`(CRM 업로드 입구)가 있다. ① 메뉴 「CRM 업로드 입구: 토큰 새로 만들기」→ 한 번만 보이는 64자리 토큰을 복사 ② 편집기 「배포 › 새 배포 › 웹 앱 · 다음 사용자로 실행: 나 · 액세스: 모든 사용자」→ 주소(`…/exec`) 복사. 코드를 고친 뒤에는 「배포 관리 › 수정 › 새 버전」.
- **PC 쪽(PC마다 한 번):** `setup.bat` 의 「Drive 업로드 주소」「Drive 업로드 토큰」에 위 두 값을 넣는다. 토큰은 접근 코드와 같은 규칙으로 처리한다(저장(y)면 이 PC·이 계정으로만 풀리게 암호화, 저장 안 함이면 올릴 때마다 입력). 토큰은 채팅·메일에 붙여넣지 않는다.
- **안전장치:** 주소만 알아서는 아무것도 못 한다(토큰 필수·틀리면 1.5초 지연 후 거부) · 약속_활동/Serial No 의 `.xlsx` 만 받고 CRM_원본 폴더에만 저장 · 크기·SHA-256 검증 · 같은 파일은 다시 올려도 건너뜀(중복 없음) · 같은 이름의 다른 내용은 이전 것을 휴지통으로(복구 가능). 끄려면 「배포 관리」에서 배포를 보관처리하거나 스크립트 속성 `UPLOAD_TOKEN` 을 지운다.
- 업로드가 실패해도 대시보드 올리기는 이미 끝난 상태이고, 실패하면 Drive 폴더가 열려 직접 올릴 수 있다. 끄기: 아이콘 명령에 `-NoDrive`.
- **보고 데이터도 같이 올린다**(2026-10-27): 같은 아이콘 실행에서 만든 `report-data_<기간>.json`과 `검산_<기간>.xlsx`가 Drive `내 드라이브/FSG_report_out/<기간>/`에 저장된다(폴더가 없으면 만든다, 같은 이름은 최신으로 바뀌고 이전 것은 휴지통). 프로젝트(채팅)에서 Drive 커넥터로 읽거나 내려받아 올리면 된다. `-NoReport`이면 올리지 않는다. 받는 쪽(Apps Script)이 이 두 이름 형식만 허용한다.
- 명령줄: `node fsg-report/upload-drive.js --file <파일> [--file …] [--dry-run]` (환경변수 `FSG_DRIVE_URL` · `FSG_DRIVE_TOKEN`). 시험: `tests/test_upload_drive.js`(가짜 웹 앱, 302 리다이렉트 포함).
- 한계: 한 번에 보내는 크기는 최대 45MB(CRM 활동 파일은 보통 10MB 안팎). 실제 구글 웹 앱의 요청 크기 한도는 PC 에서 처음 올려 보며 확인한다.

## 설치 대수가 모자라 보일 때 (CRM 자산 등록 지연)
캘린더 작업에 CRM 자산이 하나라도 연결되면 대수는 **CRM에 연결된 만큼만** 센다. 캘린더 장비 표기(예: `XR-9100`)에는 대수가 없어 엔진이 모자란 대수를 채울 수 없다(2026-10-26에 `설치_수동입력`을 폐지했다). 대신 **System 표기(XR/XN 9xxx·3xxx)인데 CRM 연결 XR/XN 모듈이 1대 이하**면 `installBlock.detail.rows[].suspect`와 요약 「확인 필요(대수)」 줄(작업 목록의 note에도 "확인:")로 의심 표시를 한다(대수는 바꾸지 않는다). 구분이 이전설치인 작업은 제외한다. 재구성·재배치·위치이동 System 은 장비를 옮기기만 했을 수도, 추가했을 수도 있어 제외하지 않고 「재구성 — 장비 추가가 있었다면 CRM 모듈 등록 확인」으로 따로 안내한다. 남은 자산을 CRM에 등록한 뒤 아이콘을 다시 실행하면 자동 반영되고, 다음 달 보고서의 전월(prev) 값도 같은 최신 CRM으로 다시 계산된다(2026-10-27 9월 East 21대 → 16대 차이가 이 경우였다).

## 고객 만족도 집계 (`voc-summary.js`)
VOC 공개 대시보드(`voc-dashboard.html`)가 읽는 Firebase `/voc-dashboard/data`를 같은 익명 로그인으로 내려받아 보고서 11장용 값(응답 수·응답률·종합·문항별·만점 비율·저점수·팀별·서술형 키워드)을 만든다. 응답률은 대시보드와 같은 규칙(같은 FSR·기관·날짜 응답은 한 방문, 방문건수 집계 기준일까지). 개인(FSR) 단위는 내지 않는다.
```
node fsg-report/voc-summary.js --period 2026-09 [--out 폴더] [--keywords 친절,신속,설명,꼼꼼] [--file data.json]
```
바탕화면 아이콘이 `report-data` 뒤에 이어서 실행해 같은 json에 `satisfaction`으로 합쳐 넣는다(실패해도 나머지는 정상). 시험은 합성 데이터로 했고, **실제 Firebase 읽기는 PC에서 처음 실행할 때 확인한다.**

## 월간 덱 자동 채움 (`deck/fill_deck.py`)
`report-data_<기간>.json`과 **전월 확정 덱(베이스)** 을 넣으면 확정 12장 덱의 숫자·표·차트를 한 번에 바꾼다(python-pptx 필요, PC가 아니라 Claude 쪽에서 돌린다).
```
python fsg-report/deck/fill_deck.py 전월확정덱.pptx report-data_2026-10.json --fca FY26_FCA_현황.xlsx --fsr FSR_담당기관_관리표.xlsx -o 결과.pptx
```
`--fca`는 사용자가 직접 관리하는 FY26 FCA 현황 엑셀(`FCA` 시트: No·분야·제목·적용 Model·Start/End Day·장비 대수·진행 완료)이다. 머리글을 키워드로 찾아 읽고(`deck/fca.py`), 못 찾은 열은 실행 끝에 알려 준다. `--fsr`는 FSR 담당기관 관리표(`담당기관 마스터` 시트)로, 8장 병원·반복 고장 표의 「담당」을 `팀 · FSR 이름`으로 적는다(`deck/fsr.py`; 못 찾은 기관은 팀만 적고 목록으로 알려 준다).
- 바꾸는 곳: 2 핵심 요약 카드 · 3 팀 표·KPI 카드·차트 · 4 설치 표(주요 기관 System·다음 달 설치 예정 포함) · 5 케이스 분석 · 6 트렌드 비교(전년 대비 포함) · 7 수도권(개편 전 대비 포함) · 8 병원·반복 고장·장애 요인·FSE KPI TOP10 · 10 에러율·운영 건전성(전월 대비 포함).
- 안 바꾸는 곳: 12 Next Step, 9장 SP-50 부품 교체 표(별도 진행표), 이슈·대책·분석·추진 계획 같은 **판단 문장**. 9장 FCA는 `--fca`, 11장 만족도는 json 의 `satisfaction`(voc-summary)으로 채운다. 실행 끝에 「건너뜀」(json에 없는 값)과 「검토 필요」(사람이 새로 써야 하는 문장) 목록이 나온다.
- **A/S(수리) 증가 요인 분해(2026-11-05, `repairDrivers`)** — 「PM이 늘었는데 A/S는 왜 늘었나」용 정황 자료(인과 단정 아님). 비교 창 = 개편 전(2025.4~2026.3 월평균) · 개편 후(2026.4~당월 월평균) · 당월 · 전월 · 전년 동월. **수리 건수 = 인정 인원 수**(5장 12개월 추이·`trendCompare`와 같은 값, 취소·온라인 제외). ① 분해 4개(우선순위로 한 번만 셈, 합 = 수리 건수): 설치 후 12개월 이내(Serial 설치일자, 없으면 초도설치) → 반복 고장 장비(같은 S/N이 그 창에서 수리 2회 이상 — 창 길이에 따라 달라져 길이와 무관한 `repeatSameMonth`도 함께) → PM 후 30일 내 같은 S/N 수리 → 그 외. ② `pmFollow.per100Pm` = PM 100건당 PM 후 30일 내 수리 건수(창별). ③ `groups`: 장비군(XN/XR·SP-50·SP 기타·CN·HISCL·기타) 개편 전/후 월평균·증감·증가 기여율(+`preTotal`·`postTotal` 원 건수) — **「기타」가 수리의 절반이라 `groupsDetail`로 세분화(2026-11-05)**: 대시보드 장비군(`fsg-kpi.html`의 `famOf`·`FAM_ORDER`와 같은 규칙, `tests/test_repair_drivers.js`가 대시보드 함수를 실제로 실행해 일치 검사) XR-Series·XN-Series·XN-L Series·SP-50·UF-Series·UC-3500·CN-Series·CA/CS·HISCL-Series·G11·SP-10·TS-10·기타 중 건수가 있는 것(`family`·`preTotal`·`postTotal`·`pre`·`post`·`delta`·`deltaPct`·`shareOfIncrease`·`cur`·`prev`)과, 「기타」 안에 무엇이 들어 있는지 `otherModels`(모델별 건수, 증가분 큰 순 상위 8개, 모델 미기재는 「(모델 미기재)」). 기존 `groups`는 그대로. ④ `topAccounts`(증가분 상위 5개 기관, 내부 계정 제외 — 기관명만) · `teams`(팀 4개 증가분). ⑤ `activeFleet`: 가동 장비 100대당 수리(방문 행 기준, 개편 전 12개월 가동 장비 vs 기준월까지 12개월 가동 장비). ⑥ `calCompare`(2026-11-05 수정): **Application = 활동 목적 Calibration + Evaluation**(경영회의 기준 — CRM에 「Application」이라는 목적 이름은 없다). 창별(pre·post·cur·prev·yoy) `calibration`·`evaluation`·`application`의 건수·월평균·비중(= 전체 활동 인정 인원 수 대비, 한 번만 셈)과 `calibrationRemote`·`evaluationRemote`(원격은 제외하고 따로), `delta`(Calibration·Evaluation·Application 월평균 증감), `applicationPurposes`(실제 합산한 목적 이름 — 이름이 틀렸는지 확인용), `evalMonthRows`([월, Evaluation 건수] 12개월)·`applicationMonthRows`([월, Calibration, Evaluation, 합]). Evaluation = 목적이 「Evaluation」으로 시작(대소문자 무시) — 「설치/데모 평가」는 설치 업무라 포함하지 않는다. `checks`·`meta.warnings`(「repairDrivers …」)에 합계 검증(분해 합 = 수리 건수, 개편 전/후 월평균 = `trendCompare`, 당월 = `monthRows`)과 자료 없는 달·Serial 설치일자 없음·Application 없음이 남는다. 값을 추정해 채우지 않는다. 계산은 `lib/repair-drivers.js`(`tests/test_repair_drivers.js` 손 계산).
- **담당 장비(2026-11-05, `peopleKpi.units.equip`)**: 대시보드 「담당 장비」 탭과 같은 계산. 입력 = `CRM_원본` 폴더(또는 `--eq 경로`)의 「FSG_FSR_담당기관관리표_YYYYMMDD_정리본.xlsx」(「담당기관 마스터」 시트의 **수식 계산값** — 엑셀에서 한 번 열어 저장한 파일). 읽기 함수는 `fsg-kpi.html`의 `parseEq`·`eqFromRows`·`eqByPerson`을 `tools/extract-equip-core.js`가 글자 그대로 떼어 낸 `equip-core.js`(`tests/test_equip.js`가 일치 검사 — 대시보드의 머리글 규칙을 바꾸면 이 스크립트를 다시 돌린다). json 에는 **사무소 6·팀 4·FSG 전체의 합계만**(담당자 이름·기관명·개인별 장비 수 없음): 담당 인원(팀장 포함)·기관 수·담당 장비·1인당 장비·시스템(혈액·유린·응고)·분야(CBC·유린·응고·면역)·**장비 100대당 처리 건수**(= 기간 처리 건수 ÷ 담당 장비 × 100, 이번 달·전월 — 전월도 같은 장비 수로 나눔). **팀장 제외는 인원·1인당 장비만(2026-11-05 사용자 결정 2번)**: `nPeople`·`equipPerHead`는 팀장을 뺀 인원 기준이고, 장비·기관·시스템·분야 합계와 `per100`·`per100Prev`(장비 100대당 처리 건수 = 팀장 방문 포함 처리 건수 ÷ 담당 장비 전체)에는 팀장이 맡은 담당 기관·팀장의 방문이 들어간다(분모의 장비에 팀장 담당 기관이 있으므로 분자도 같은 대상). 팀장 포함 인원 기준은 `nPeopleInclLead`·`equipPerHeadInclLead`·`per100InclLead`(= `per100`)·`per100PrevInclLead`, 팀장 방문을 뺀 100대당은 `per100ExclLeadCases`·`per100PrevExclLeadCases`. 집계는 대시보드와 같은 `eqAgg`(`equip-core.js`, `fsg-kpi.html`에서 떼어 옴) — 대시보드 「담당 장비」 탭도 같은 기준이라 화면과 json이 같다. 3장 「1인당」(합계 ÷ 인원, 팀장 포함)과 1인당 KPI 점수·처리 건수(이미 팀장·신입 제외)는 바뀌지 않았다. `unmatched`(로스터 밖 담당자의 기관·장비 수), `fileTotal`(파일 전체 합계, 검증용), `asOf`·`note`(현재 관리표 기준 — 과거와 시점이 다름). 파일이 없거나 못 읽으면 멈추지 않고 `equip`을 비우고 `meta.warnings`에 이유를 남긴다. 정리본은 개인·기관명이 있어 Drive 로 올리지 않는다(아이콘의 Drive 업로드는 약속_활동·Serial·report-data·검산만). 관리표 장비(현재 관리표, XP·XQ·주변기기·기타 제외)와 10장 「가동 장비」(Serial 가동 기준)는 정의가 달라 같은 슬라이드에서 섞지 않는다.
  - 덱: 9장 「사무소 단위 1인당 KPI 비교」에 열 2개(**1인당 담당 장비 · 장비 100대당 처리 건수** — 증감은 좋고 나쁨 없이 파랑) · 3장 팀 표 아래 「1인당 담당 장비」 각주 한 줄(자리가 없으면 「검토 필요」) · 10장 「업무량 편차 진단」 근거 숫자를 「검토 필요」에 함께 출력. `equip`이 없으면 열·각주 없이 「건너뜀」에 이유.
  - `--fsr`: 정리본의 「담당기관 마스터」(담당자·기관명, 팀 열은 없어도 됨 → 팀은 엔진 값, 「기존 관리표 이름」 열이 있으면 이름이 안 맞을 때 한 번 더 찾음)로 8장 담당(FSR)을 찾는다. 마스터 시트가 없는 옛 관리표(07-07판)는 「정리본이 필요하다」고 안내한다.
- **5장 오른쪽 상자 팀별 Calibration 줄(2026-11-03)**: json `caseAnalysis.calTeams` — 4팀(EAST·WEST·SOUTH·CENTRAL)의 이번 달·전월 Calibration 건수. 5장 12개월 추이(`monthRows`)와 같은 기준(목적 「Calibration」 · 담당자+필수 참석자 인정 인원 수, 한 방문에 다른 팀이 함께 오면 각 팀에 1 · 취소·온라인 정기점검 제외)이라 **팀 합계 + `unassigned`(로스터 밖) = `monthRows` 같은 달 값**. 원격 Calibration(목적 「원격 Calibration」)은 `monthRows`에서도 빠지므로 팀 건수·합계에서 제외하고 `remote`에 따로 센다. `fill_deck.py`는 「• Cal n건(전월 n건)」 줄 아래에 「└ East n ▲ · West n ▼ · South n · Central n (전월 대비)」 한 줄을 추가한다(상자 높이는 PowerPoint에서 확인).
- **8장 뒤 고정 슬라이드 「사무소 단위 1인당 KPI 비교」(2026-11-03 추가, `deck/people_slide.py`)**: json 의 `peopleKpi.units` 로 채운다 — 사무소 6개(WEST·EAST·CENTRAL 대전·광주·SOUTH 부산·대구) + 팀 4개 합계(CENTRAL = 대전+광주, SOUTH = 부산+대구)의 인원(비교 인원 = 팀장·신입 제외)·1인당 처리 건수·1인당 KPI 점수·직급 보정 지수·재방문율·FTFR·MTTR 이번 달과 전월(▲▼). 대시보드 서비스 탭 「사무소·팀별 1인당 생산성」과 같은 값(재방문율·FTFR은 팀 단위/사무소 단위 거래처 배정). 베이스 덱에 슬라이드가 없으면 8장 서식을 복사해 새로 만들고(새 9장 — 이후 장이 하나씩 밀림), 있으면 값만 갈아 끼운다. 부서원 KPI 는 2026-11 정식 시행 → 그 전 기간은 json `peopleKpi.units.official=false` 라서 「시행 전 참고값」 배지가 붙는다.
- 엔진이 덱을 위해 내는 값: `peopleKpi`(8장 FSE KPI TOP10 — 대시보드 부서원 KPI 와 같은 계산) · `yoy`(전년 동월) · `metroDelta`(수도권 개편 전후 팀별) · `prev`(전월 건전성·KPI) · `nextPlan`(다음 달 설치 예정) · 병원/반복 고장 TOP5의 `team`·`modelAlt`.
- FSR 이름은 엔진이 아니라 관리표(`--fsr`)에서 가져온다.

## 시트와 같은 숫자가 나오는지 검산
```powershell
# Google 시트에서 「FSG 보고서 › 데이터 정제 실행」을 돌린 직후, 파일 › 다운로드 › Microsoft Excel(.xlsx)
node fsg-report/compare-sheet.js --sheet "FSG_월_분기 보고 데이터.xlsx"
```
시트 사본의 설정(B2 기간·B4 추출일)·로스터·원본_활동·원본_Serial로 엔진을 돌려 정제 탭 13개와 칸마다 비교하고 다른 칸만 출력한다(설치 3탭과 팀별실적 설치 칸은 규칙이 달라 비교하지 않음).
담당자·기관명·S/N은 비교는 하되 화면에는 `(이름·비표시)`로만 나온다. 시트가 `74.4%` 글자를 0.744 숫자로 바꿔 둔 칸은 알아서 맞춰 본다.
`모두 일치 ✅`가 두 달 연속 나오면 시트의 Apps Script를 내려도 된다. 거래처명·직원 이름은 출력하지 않는다.

**2026-10-25 실측(2·3·5장 묶음)**: 2026-10 기준 시트 사본으로 335칸 비교 → 집계 행 39,026 동일, 건수·MTTR·예방정비지수·현재 월 KPI·팀별실적·케이스분석 전부 일치. 정제_KPI월별추이의 FTFR·재방문율 10칸(4개 달)만 0.1~0.3p 차이.
**2026-10-25 2차 묶음 실측(Colab)**: 13탭 730칸 비교 → 다른 칸 12개(위 10칸 + 가동 장비 3,193 vs 3,195). 원인은 하나 — CRM이 장비 없는 활동의 S/N에 내보내는 **0**을 시트 Apps Script는 "S/N 없음"으로, 대시보드·엔진은 '0'이라는 장비로 본 것(활동 15행·자산 2행). 시트 방식으로 계산하면 **0개 차이**. 사용자 결정 A(2026-10-25): S/N 0 = 장비 없음 — 대시보드(`snOf`, PR)와 이 엔진(`read-crm.snOf`) 모두 그 규칙으로 통일했다.

### PC 없이 검산 (Colab)
브라우저만 있으면 된다: [Colab에서 열기](https://colab.research.google.com/github/balhm12/Sysmex-schedule/blob/main/fsg-report/colab_compare.ipynb) → 런타임 › 모두 실행 → 권한 허용.
노트북이 시트를 Sheets API로 읽어 사본을 만들고 이 브랜치를 받아 `compare-sheet.js`를 돌린 뒤, 이름 없는 결과 요약을 Drive `FSG_report_out/검산결과_날짜.txt`에 저장한다. 데이터는 사용자 Google 계정 안에서만 처리된다.

## 계산 기준 (대시보드·시트 v45~v52와 같음)
취소만 제외 · 온라인 정기점검 제외 · 추출일 이후 예정 약속 제외 · 담당자+필수 참석자(로스터 인원) 각 1건 ·
FTFR·재방문율 = 방문 3건 이상 거래처의 평균(종료 시각 이전 14일, 같은 S/N) · MTTR 0~500분 · 팀 = 거래처를 가장 많이 방문한 팀.
S/N 칸이 0이면 장비 없음(재방문 판정·반복 고장·가동 장비에서 제외). 대시보드만 하는 「+9시간 시각 보정(TZ_FIX)」은 적용하지 않는다(시트와 같음).

## 파일
- `kpi-core.js` 생성 파일(수정 금지) ← `tools/extract-kpi-core.js`
- `lib/read-crm.js` CRM xlsx 읽기(대시보드 parseActivity 포팅) · `lib/period.js` 기간 표기 · `lib/report-core.js` 집계 · `lib/write-check.js` 검산 워크북
- `report-data.js` CLI · `push-dashboard.js` 대시보드 올리기(`windows/`는 Windows 더블클릭 도구) · `compare-sheet.js` 시트 대조 · `colab_report.ipynb` Drive 폴더 → 보고 데이터(PC 없이) · `colab_compare.ipynb` 시트 검산(PC 없이)
- 테스트: `tests/test_kpi_core_sync.js` `tests/test_report_engine.js` `tests/test_report_tools.js` (`npm test`)
- `out/`·`data/`·xlsx·csv는 커밋하지 않는다(.gitignore) — 거래처명·직원 실명이 들어간다
