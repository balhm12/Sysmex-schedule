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
| 정제_엔지니어생산성 · 병원TOP5 · 반복고장TOP5 · 장애요인TOP4 | 8 주요 고객·장애 | 최근 1년 · 기간. 병원 TOP5 당월은 케이스 파일 기준 |
| 정제_장비군에러율 · 정제_운영건전성 | 10 에러율·운영 건전성 | 건전성은 Serial No 자산대장이 있어야 계산(가동 장비 = 자산 '사용' ∩ 12개월 이력) |
| 정제_집중관리대상 | (15장 판의 9) | 자산대장 필요. PM 이력 장비 10대↑ · 반복 고장 50%↑ |
| 정제_설치상세 · 정제_설치현황 · 정제_팀별설치실적, 팀별실적의 설치 칸 | 4 장비별 설치 현황, 3 팀별 표 | 설치 공유캘린더 + 자산대장 + 기관명매핑 + 설치_수동입력. 캘린더 줄 병합(5일) · CRM 매칭(±7일) · 수동 입력 · 예정/중고/Demo 제외 · 캘린더 미등록 · v49 자동 기관명 매핑 · v51 중복 제외 · v50 모듈/구성 중복 제거 |

12장 덱의 표는 모두 옮겼다(9 FCA · 11 만족도 · 12 Next Step은 시트 밖 소스).

**2026-10-26 3차 묶음 실측(Colab)**: 16탭 2,336칸 비교 → **다른 칸 0개**(설치 작업 37건 포함). 시트 로직과 완전히 같은 숫자를 내는 것을 확인한 뒤, 시트의 결함 한 가지를 고쳤다(사용자 지시):
자산대장의 **부품·소모품 행**(VALVE_ASSY 등, 설치일자 있음)을 시트는 '캘린더 미등록' 설치로 나열하고 그 기관을 팀별 설치 기관 수에 넣었다. 엔진은 이 행을 설치 매칭·캘린더 미등록에서 뺀다(`install.js` `partSkipped`). 그래서 이후 검산에서 설치상세 행 수·기관 수가 그만큼 시트와 다를 수 있다(의도한 차이, compare-sheet가 안내한다).

## 준비
```powershell
cd sysmex-schedule
npm install            # xlsx(SheetJS)·jsdom
```

## 매달 하는 일 — Drive 폴더 하나에 넣고 Colab 실행 (PC 없이)
1. Drive 「내 드라이브」에 폴더 **`CRM_원본`** 을 한 번 만든다.
2. 매달 CRM에서 내보낸 파일을 **이름 그대로** 그 폴더에 넣는다 — 「2. 모든 약속_활동 …」(필수) · 「Serial No …」 · 「1. 모든 서비스 케이스 …」 · 설치 공유캘린더 내보내기 `시스템설치_공유캘린더_YYYYMMDD.xlsx`. 기관명매핑·설치_수동입력은 같은 폴더에 xlsx 또는 Google 시트로 둔다(이름에 `기관명매핑` / `수동입력`). 지난달 파일은 지우지 않아도 된다(파일명 날짜 → 수정 시각으로 최신 선택).
3. [Colab에서 열기](https://colab.research.google.com/github/balhm12/Sysmex-schedule/blob/claude/fsg-report-engine/fsg-report/colab_report.ipynb) → 런타임 › 모두 실행 → 권한 허용. 기간을 비우면 지난달.
4. 결과는 Drive `FSG_report_out/<기간>/` — `report-data_<기간>.json`(PPT 빌더 입력) · `검산_<기간>.xlsx`(시트 정제 탭과 같은 배치 → 보고서 만들 때 이 파일을 올린다) · `요약_<기간>.txt`(이름 없는 요약, Claude가 Drive 커넥터로 읽음).

PC에서 하려면 아래 CLI를 같은 폴더(Drive 데스크톱 동기화 경로)에 대고 돌리면 된다.

## 보고서 데이터 만들기 (PC, CLI)
```powershell
node fsg-report/report-data.js --period 2026-09 --dir "G:\내 드라이브\CRM_원본"
node fsg-report/report-data.js --period FY2026Q2 --activity "2. 모든 약속_활동 2026_10_12.xlsx" --out out
```
- `--period` 2026-09 · 2026-07~2026-09 · FY2026Q2 (회계 분기, 4월 시작)
- `--dir` 폴더에서 파일명(약속_활동 / Serial / 케이스)으로 종류를 구분해 최신 파일(파일명 날짜 → 수정 시각)을 쓴다
- `--serial` / `--cases` Serial No 자산대장 · 서비스 케이스 내보내기. `--dir` 폴더에 있으면 파일명(Serial / 케이스)으로 자동 선택
- `--calendar` 설치 공유캘린더 내보내기(`시스템설치_공유캘린더_YYYYMMDD.xlsx`), `--acct-map` 기관명매핑, `--manual` 설치_수동입력 — 시트의 같은 이름 탭과 같은 열. `--dir`에 있으면 파일명(캘린더 / 기관명매핑 / 수동입력)으로 자동 선택. 자동 매핑 제안은 검산 xlsx 「기관명매핑_자동」 탭에 쓴다(사람이 기관명매핑에 옮겨 적으면 다음 실행부터 고정)
- `--roster` 로스터 CSV(fsg-roster `references/roster.csv` 형식). 없으면 `fsg-kpi.html`의 ROSTER(대시보드와 같은 명단)
- `--cut` CRM 추출일. 없으면 활동 파일명의 날짜. 그 뒤로 잡힌 예정 약속을 뺀다(대시보드·시트와 같은 규칙)
- 출력: `fsg-report/out/report-data_<기간>.json`(PPT 빌더 입력), `검산_<기간>.xlsx`(시트 정제 탭과 같은 배치), 콘솔 요약

## 시트와 같은 숫자가 나오는지 검산
```powershell
# Google 시트에서 「FSG 보고서 › 데이터 정제 실행」을 돌린 직후, 파일 › 다운로드 › Microsoft Excel(.xlsx)
node fsg-report/compare-sheet.js --sheet "FSG_월_분기 보고 데이터.xlsx"
```
시트 사본의 설정(B2 기간·B4 추출일)·로스터·원본_활동·원본_Serial·원본_케이스·원본_설치캘린더·기관명매핑·설치_수동입력으로 엔진을 돌려 정제 탭 16개와 칸마다 비교하고 다른 칸만 출력한다.
담당자·기관명·S/N은 비교는 하되 화면에는 `(이름·비표시)`로만 나온다. 시트가 `74.4%` 글자를 0.744 숫자로 바꿔 둔 칸은 알아서 맞춰 본다.
`모두 일치 ✅`가 두 달 연속 나오면 시트의 Apps Script를 내려도 된다. 거래처명·직원 이름은 출력하지 않는다.

**2026-10-25 실측(2·3·5장 묶음)**: 2026-10 기준 시트 사본으로 335칸 비교 → 집계 행 39,026 동일, 건수·MTTR·예방정비지수·현재 월 KPI·팀별실적·케이스분석 전부 일치. 정제_KPI월별추이의 FTFR·재방문율 10칸(4개 달)만 0.1~0.3p 차이.
**2026-10-25 2차 묶음 실측(Colab)**: 13탭 730칸 비교 → 다른 칸 12개(위 10칸 + 가동 장비 3,193 vs 3,195). 원인은 하나 — CRM이 장비 없는 활동의 S/N에 내보내는 **0**을 시트 Apps Script는 "S/N 없음"으로, 대시보드·엔진은 '0'이라는 장비로 본 것(활동 15행·자산 2행). 시트 방식으로 계산하면 **0개 차이**. 사용자 결정 A(2026-10-25): S/N 0 = 장비 없음 — 대시보드(`snOf`, PR)와 이 엔진(`read-crm.snOf`) 모두 그 규칙으로 통일했다.

### PC 없이 검산 (Colab)
브라우저만 있으면 된다: [Colab에서 열기](https://colab.research.google.com/github/balhm12/Sysmex-schedule/blob/claude/fsg-report-engine/fsg-report/colab_compare.ipynb) → 런타임 › 모두 실행 → 권한 허용.
노트북이 시트를 Sheets API로 읽어 사본을 만들고 이 브랜치를 받아 `compare-sheet.js`를 돌린 뒤, 이름 없는 결과 요약을 Drive `FSG_report_out/검산결과_날짜.txt`에 저장한다. 데이터는 사용자 Google 계정 안에서만 처리된다.

## 계산 기준 (대시보드·시트 v45~v52와 같음)
취소만 제외 · 온라인 정기점검 제외 · 추출일 이후 예정 약속 제외 · 담당자+필수 참석자(로스터 인원) 각 1건 ·
FTFR·재방문율 = 방문 3건 이상 거래처의 평균(종료 시각 이전 14일, 같은 S/N) · MTTR 0~500분 · 팀 = 거래처를 가장 많이 방문한 팀.
S/N 칸이 0이면 장비 없음(재방문 판정·반복 고장·가동 장비에서 제외). 대시보드만 하는 「+9시간 시각 보정(TZ_FIX)」은 적용하지 않는다(시트와 같음).

## 파일
- `kpi-core.js` 생성 파일(수정 금지) ← `tools/extract-kpi-core.js`
- `lib/read-crm.js` CRM xlsx 읽기(대시보드 parseActivity 포팅) · `lib/period.js` 기간 표기 · `lib/report-core.js` 집계 · `lib/write-check.js` 검산 워크북
- `report-data.js` CLI · `compare-sheet.js` 시트 대조 · `colab_report.ipynb` Drive 폴더 → 보고 데이터(PC 없이) · `colab_compare.ipynb` 시트 검산(PC 없이)
- 테스트: `tests/test_kpi_core_sync.js` `tests/test_report_engine.js` `tests/test_report_tools.js` (`npm test`)
- `out/`·`data/`·xlsx·csv는 커밋하지 않는다(.gitignore) — 거래처명·직원 실명이 들어간다
