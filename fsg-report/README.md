# fsg-report — FSG 월간·분기 보고서 데이터 엔진 (Google Sheets 없이)

CRM 「모든 약속/활동」 내보내기 xlsx에서 보고서 숫자를 바로 계산한다.
계산의 원본은 대시보드 `fsg-kpi.html`의 `kpiCore`이고, 이 폴더의 `kpi-core.js`는 그 함수를 글자 그대로 떼어 낸 사본이다
(`tests/test_kpi_core_sync.js`가 둘이 같은지 검사한다). 그래서 **대시보드와 보고서가 한 엔진**을 쓴다.

지금(1차 묶음) 내는 표 — 월간보고 시트의 같은 이름 탭과 같은 기준·같은 열 배치:

| 표 | 보고서 슬라이드 | 비고 |
|---|---|---|
| 정제_KPI | 2 핵심 요약 | FTFR·재방문율·MTTR·예방정비지수·건수, 팀별 FTFR·재방문율·MTTR |
| 정제_KPI월별추이 | 3 서비스 활동(12개월 차트), 2 전월 대비 | 기간 끝 달까지 12개월 |
| 정제_팀별실적 | 3 서비스 활동(팀별 표) | 설치+이전 칸은 CRM 활동 수. 시트의 캘린더 기준 기관 수는 2차 묶음(설치) |
| 정제_케이스분석 | 5 케이스 분석 | 12개월 수리·PM·Calibration, 시리즈 재방문율 상관표(기간 vs 직전 달) |

아직 안 옮긴 것: 4 설치 현황(설치 공유캘린더·설치_수동입력·기관명매핑), 6~8·10장 집계(트렌드·수도권·TOP5·에러율·건전성).

## 준비
```powershell
cd sysmex-schedule
npm install            # xlsx(SheetJS)·jsdom
```

## 보고서 데이터 만들기
```powershell
node fsg-report/report-data.js --period 2026-09 --dir "G:\내 드라이브\CRM_원본"
node fsg-report/report-data.js --period FY2026Q2 --activity "2. 모든 약속_활동 2026_10_12.xlsx" --out out
```
- `--period` 2026-09 · 2026-07~2026-09 · FY2026Q2 (회계 분기, 4월 시작)
- `--dir` 폴더에서 파일명(약속_활동 / Serial / 케이스)으로 종류를 구분해 최신 파일(파일명 날짜 → 수정 시각)을 쓴다
- `--roster` 로스터 CSV(fsg-roster `references/roster.csv` 형식). 없으면 `fsg-kpi.html`의 ROSTER(대시보드와 같은 명단)
- `--cut` CRM 추출일. 없으면 활동 파일명의 날짜. 그 뒤로 잡힌 예정 약속을 뺀다(대시보드·시트와 같은 규칙)
- 출력: `fsg-report/out/report-data_<기간>.json`(PPT 빌더 입력), `검산_<기간>.xlsx`(시트 정제 탭과 같은 배치), 콘솔 요약

## 시트와 같은 숫자가 나오는지 검산
```powershell
# Google 시트에서 「FSG 보고서 › 데이터 정제 실행」을 돌린 직후, 파일 › 다운로드 › Microsoft Excel(.xlsx)
node fsg-report/compare-sheet.js --sheet "FSG_월_분기 보고 데이터.xlsx"
```
시트 사본의 설정(B2 기간·B4 추출일)·로스터·원본_활동으로 엔진을 돌려 정제 탭 네 개와 칸마다 비교하고 다른 칸만 출력한다.
`모두 일치 ✅`가 두 달 연속 나오면 시트의 Apps Script를 내려도 된다. 거래처명·직원 이름은 출력하지 않는다.

**2026-10-25 실측(2·3·5장 묶음)**: 2026-10 기준 시트 사본으로 335칸 비교 → 집계 행 39,026 동일, 건수·MTTR·예방정비지수·현재 월 KPI·팀별실적·케이스분석 전부 일치. 정제_KPI월별추이의 FTFR·재방문율 10칸(4개 달)만 0.1~0.3p 차이 — 대시보드(fsg-kpi.html)는 엔진과 같은 값이므로 시트 쪽 차이(날짜 객체 vs 엑셀 일련번호의 14일 경계)로 본다. 시트는 폐기 예정이라 고치지 않는다.

## 계산 기준 (대시보드·시트 v45~v52와 같음)
취소만 제외 · 온라인 정기점검 제외 · 추출일 이후 예정 약속 제외 · 담당자+필수 참석자(로스터 인원) 각 1건 ·
FTFR·재방문율 = 방문 3건 이상 거래처의 평균(종료 시각 이전 14일, 같은 S/N) · MTTR 0~500분 · 팀 = 거래처를 가장 많이 방문한 팀.
대시보드만 하는 「+9시간 시각 보정(TZ_FIX)」은 적용하지 않는다(시트와 같음).

## 파일
- `kpi-core.js` 생성 파일(수정 금지) ← `tools/extract-kpi-core.js`
- `lib/read-crm.js` CRM xlsx 읽기(대시보드 parseActivity 포팅) · `lib/period.js` 기간 표기 · `lib/report-core.js` 집계 · `lib/write-check.js` 검산 워크북
- `report-data.js` CLI · `compare-sheet.js` 시트 대조
- 테스트: `tests/test_kpi_core_sync.js` `tests/test_report_engine.js` `tests/test_report_tools.js` (`npm test`)
- `out/`·`data/`·xlsx·csv는 커밋하지 않는다(.gitignore) — 거래처명·직원 실명이 들어간다
