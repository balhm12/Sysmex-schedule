// 보고서 엔진(2·3·5장 묶음) — 손으로 계산한 작은 CRM 워크북으로 KPI·추이·팀별·케이스 값을 검증한다
const assert = require('assert'), XLSX = require('xlsx');
const R = require('../fsg-report/lib/read-crm');
const { parsePeriod } = require('../fsg-report/lib/period');
const { buildReport } = require('../fsg-report/lib/report-core');
const { buildCheckWorkbook } = require('../fsg-report/lib/write-check');

const DAY = 86400000, ser = ms => ms / DAY + 25569;                       // Excel 일련번호(벽시계를 UTC로)
const T = (y, m, d, h, mi) => Date.UTC(y, m - 1, d, h, mi || 0);
const H = ['상태', '양식 타입', '시작 시간', '종료 시간', '담당자', '필수 참석자', '주제', 'Error 1', 'Error 2', 'Error 3', '거래처', 'Serial No. (lookup)', 'Product', '약속/활동 목적', '만든 날짜'];
const row = (st, own, purp, acct, sn, prod, s, e, err, att, err2, err3) => ['완료됨' === st || st ? st : '완료됨', '서비스 요청', s == null ? '' : ser(s), e == null ? '' : ser(e), own, att || '', '', err || '', err2 || '', err3 || '', acct, sn, prod, purp, ''];
const ROSTER = [['A', 'FS EAST', 'T2'], ['C', 'FS EAST', '팀장'], ['B', 'FS WEST', 'T1'], ['X', 'FS CENTRAL', 'T3'], ['김민결', 'FS SOUTH', 'T2']];
const rows = [
  row('완료됨', 'A', '고장 수리', 'H1', 'S1', 'XN-1000', T(2026, 9, 1, 10), T(2026, 9, 1, 11), 'E1'),                 // r1  60분, 첫 수리
  row('완료됨', 'A', '고장 수리', 'H1', 'S1', 'XN-1000', T(2026, 9, 5, 10), T(2026, 9, 5, 12), 'E1'),                 // r2 120분, 14일 내 재수리·같은 에러 → AD=1, AE=1
  row('완료됨', 'B', 'PM',       'H1', 'S1', 'XN-1000', T(2026, 9, 10, 9), T(2026, 9, 10, 10)),                      // r3
  row('완료됨', 'A', 'PM',       'H2', 'S2', 'SP-50',   T(2026, 9, 12, 9), T(2026, 9, 12, 10), '', 'B'),             // r4 담당 A + 참석 B → 2명
  row('완료됨', 'B', '고장 수리', 'H2', 'S2', 'SP-50',   T(2026, 9, 20, 13), T(2026, 9, 20, 14, 30), 'E2', '', 'Water leak'),   // r5 90분, 직전 PM → AD=1, AE=2 · Error 2
  row('완료됨', 'A', '고장 수리', 'H3', 'S3', 'CN-3000', T(2026, 9, 25, 10), T(2026, 9, 25, 20), '', '', '', '기타'),           // r6 600분 → MTTR 제외 · Error 3 '기타'는 집계 제외
  row('완료됨', 'C', '온라인 정기점검', 'H1', 'S1', 'XN-1000', T(2026, 9, 26, 10), T(2026, 9, 26, 11)),                // r7 제외
  row('취소됨', 'A', '고장 수리', 'H1', 'S1', 'XN-1000', T(2026, 9, 27, 10), T(2026, 9, 27, 11), 'E1'),               // r8 취소 제외
  row('완료됨', 'Z', '고장 수리', 'H4', 'S4', 'XN-1000', T(2026, 9, 3, 10), T(2026, 9, 3, 11), 'E9'),                 // r9 로스터 밖 → 인정 0명, 미매핑 1
  row('완료됨', 'A', '고장 수리', 'H1', 'S1', 'XN-1000', T(2026, 10, 2, 10), T(2026, 10, 2, 11), 'E1'),               // r10 10월 → 기간 밖 / cut 9/30이면 예정 제외
  row('완료됨', 'A', 'Calibration', 'H2', 'S2', 'SP-50', T(2026, 9, 15, 10), T(2026, 9, 15, 11)),                     // r11 Cal
  row('완료됨', 'A', '고장 수리', 'H5', 'S5', 'XN-1000', T(2026, 8, 25, 10), T(2026, 8, 25, 11), 'E3'),               // r12 8월
  row('완료됨', 'A', '고장 수리', 'H5', 'S5', 'XN-2000', T(2026, 9, 2, 10), T(2026, 9, 2, 10, 30), 'E4'),             // r13 30분, 8/25 수리로 AD=1, 에러 다름 AE=2
  row('완료됨', '김민결', '고장 수리', 'H6', 'S6', 'XN-1000', T(2026, 9, 4, 10), T(2026, 9, 4, 11), 'E5'),             // r14 제외 인원 → 인정 0명(로스터엔 있어 미매핑 아님)
  ['완료됨', '서비스 요청', '', '', 'A', '', '', '', '', '', 'H1', 'S1', 'XN-1000', '고장 수리', ''],                   // r15 시작 시각 없음 → 제외
  row('완료됨', 'A', 'PM',       'H7', 'S7', 'XN-1000', T(2025, 6, 10, 10), T(2025, 6, 10, 11)),                      // r16 2025-06 (개편 전 기간) — 추이·기간 밖
  row('완료됨', 'B', '고장 수리', 'H7', 'S7', 'XN-1000', T(2025, 6, 12, 10), T(2025, 6, 12, 11), 'E7'),               // r17 2025-06
];
const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([H, ...rows]), '약속');
const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

// 1. 리더
const act = R.parseActivity(buf);
assert.strictEqual(act.rows.length, 17); assert(act.hasAtt && act.hasFormType);
assert.strictEqual(act.rows[0].t, T(2026, 9, 1, 10)); assert.strictEqual(act.rows[3].att, 'B'); assert.strictEqual(act.rows[14].t, null);
assert.strictEqual(act.rows[4].err2, 'Water leak'); assert.strictEqual(act.rows[5].err3, '기타');
assert.strictEqual(R.toMs('2026-09-01 오후 2:30'), T(2026, 9, 1, 14, 30), '한글 오전/오후 문자열');
assert.strictEqual(R.fileDateKey('2. 모든 약속_활동 2026_10_12 AM 10-47-02.xlsx'), '2026-10-12');
assert.strictEqual(R.classifyByName('1. 모든 서비스 케이스 2026_10_12.xlsx'), 'CASE');

// 2. 기간 표기
assert.deepStrictEqual(parsePeriod('FY2026Q2').months.map(x => x.m), [7, 8, 9]);
assert.strictEqual(parsePeriod('2026-Q4').months[0].y, 2027);
assert.strictEqual(parsePeriod('2026-07~2026-09').label, '2026-07~2026-09 (3개월)');
assert.throws(() => parsePeriod('2026/09'), /기간 표기/);

// 3. 9월 보고 (cut = 9/30 → r10 예정 제외)
const rep = buildReport({ raw: act.rows, roster: ROSTER, period: '2026-09', cut: '2026-09-30' });
const k = rep.kpi;
assert.deepStrictEqual(rep.meta.excluded, { notime: 1, future: 1, cancel: 1, online: 1 });
assert.strictEqual(rep.meta.rows.counted, 13, '집계 행 = 17 - 시각없음1 - 예정1 - 취소1 - 온라인1');
assert.strictEqual(k.repairCount, 5, '고장수리 인정 건수(인원 수) r1 r2 r5 r6 r13');
assert.strictEqual(k.repairRows, 7, '고장수리 행 수(인정 0명 r9·r14 포함)');
assert.strictEqual(k.pmCount, 3, 'PM r3(1) + r4(2)');
assert.strictEqual(k.revisitCount, 1, 'FTFR 실패 행 = r2');
assert.strictEqual(k.mttr, 75, '(60+120+90+30)/4');
assert.strictEqual(k.pmRatio, 37.5);
assert.strictEqual(k.ftfr, 50, 'H1(대상 거래처) 9월 수리 2건 중 1건 실패');
assert.strictEqual(k.revisitRate, 33.3, 'H1 수리·PM 3건 중 재방문 1건');
const tm = {}; k.teams.forEach(t => tm[t.team] = t);
assert.deepStrictEqual(Object.keys(tm), ['FS EAST', 'FS WEST', 'FS SOUTH', 'FS CENTRAL'], '시트 팀 순서');
assert.strictEqual(tm['FS EAST'].mttr, 70, 'EAST (60+120+30)/3'); assert.strictEqual(tm['FS WEST'].mttr, 90);
assert.strictEqual(tm['FS EAST'].ftfr, 50); assert.strictEqual(tm['FS EAST'].revisit, 33.3);
assert.strictEqual(tm['FS WEST'].ftfr, null, 'WEST 담당 거래처 중 대상(방문 3건↑) 없음'); assert.strictEqual(tm['FS SOUTH'].mttr, null);

// 4. 추이
assert.strictEqual(rep.kpiTrend.length, 12); assert.strictEqual(rep.kpiTrend[11].label, '2026-09');
assert.deepStrictEqual(rep.kpiTrend[11].kpi, k);
assert.strictEqual(rep.kpiTrend[10].kpi.repairCount, 1, '8월 r12'); assert.strictEqual(rep.kpiTrend[10].kpi.mttr, 60);
assert.strictEqual(rep.kpiTrend[0].kpi.repairCount, 0);

// 5. 팀별 실적
const tr = {}; rep.team.rows.forEach(r => tr[r.team] = r);
assert.deepStrictEqual([tr['FS EAST'].pm, tr['FS EAST'].as_, tr['FS EAST'].count, tr['FS EAST'].leader], [1, 4, 2, 'C']);
assert.deepStrictEqual([tr['FS WEST'].pm, tr['FS WEST'].as_, tr['FS WEST'].count, tr['FS WEST'].leader], [2, 1, 1, '']);
assert.strictEqual(tr['FS EAST'].perHead, 2.5); assert.strictEqual(rep.team.total, 8);
assert.strictEqual(rep.team.unmapped, 1); assert.deepStrictEqual(rep.team.unmappedRows, [{ name: 'Z', count: 1, sample: 'H4' }]);

// 6. 케이스 분석
const ca = rep.caseAnalysis, mr = {}; ca.monthRows.forEach(r => mr[r[0]] = r.slice(1));
assert.deepStrictEqual(mr['2026-09'], [5, 3, 1]); assert.deepStrictEqual(mr['2026-08'], [1, 0, 0]); assert.strictEqual(ca.monthRows.length, 12);
const cr = {}; ca.corrRows.forEach(r => cr[r[0]] = r.slice(1));
assert.deepStrictEqual(cr['XN-Series'], [5, 2, 33.3, 0, '+33.3%p'], 'XN 수리 r1 r2 r9 r13 r14 · 분모 6(+PM r3) · 재방문 r2 r13 / 전월 r12');
assert.deepStrictEqual(cr['SP-50'], [1, 1, 50, '-', '-']);
assert.deepStrictEqual(cr['CN-Series'], [1, 0, 0, '-', '-']);
assert.deepStrictEqual(cr['(전체 평균)'], [7, 3, 33.3, 0, '+33.3%p'], '분모 9(r1 r2 r3 r4 r5 r6 r9 r13 r14) 재방문 3');
assert.strictEqual(ca.prevLabel, '2026-08');

// 7. 분기(FY26 Q2 = 7~9월)와 cut 없음
const q = buildReport({ raw: act.rows, roster: ROSTER, period: 'FY2026Q2', cut: '2026-10-31' });
assert.strictEqual(q.kpi.repairCount, 6, '8월 r12 포함'); assert.strictEqual(q.meta.excluded.future, 0);
assert.strictEqual(q.caseAnalysis.prevLabel, '2026-08', '상관표 비교는 기간 끝의 직전 달');

// 8. 2차 묶음 — 트렌드·수도권·엔지니어·병원·반복고장·장애요인·에러율
const TC = rep.trendCompare;
assert.deepStrictEqual([TC.prePM, TC.preRP, TC.postPM, TC.postRP], [0.1, 0.1, 0.5, 1], '개편 전 1/12 · 후(2026-04~09) PM 3/6, 수리 6/6');
assert.deepStrictEqual([TC.pmDelta, TC.rpDelta, TC.prePMRatio, TC.postPMRatio, TC.pmRatioDelta], [500, 1100, 50, 33.3, -16.7]);
assert.deepStrictEqual(TC.postKeyLabels, ['2026-04', '2026-05', '2026-06', '2026-07', '2026-08', '2026-09']);
const M = rep.metro; assert.strictEqual(M.rows.length, 12);
assert.deepStrictEqual(M.rows[5], ['2026-09', 'WEST', 2, 1]); assert.deepStrictEqual(M.rows[11], ['2026-09', 'EAST', 1, 4]); assert.deepStrictEqual(M.rows[10], ['2026-08', 'EAST', 0, 1]);
assert.deepStrictEqual(rep.engYear.map(r => [r.name, r.team, r.grade, r.count, r.hours, r.repairPct, r.pmPct]), [['A', 'FS EAST', 'T2', 7, 16.5, 71.4, 14.3], ['B', 'FS WEST', 'T1', 3, 3.5, 33.3, 66.7]], '엔지니어 최근 1년');
assert.deepStrictEqual(rep.engMonth.map(r => [r.name, r.count, r.hours, r.repairPct, r.pmPct]), [['A', 6, 15.5, 66.7, 16.7], ['B', 3, 3.5, 33.3, 66.7]], '엔지니어 당월');
assert.deepStrictEqual(rep.hospYear.map(r => [r.account, r.count]), [['H1', 3], ['H2', 3], ['H5', 2], ['H3', 1], ['H4', 1]], '병원 TOP5(활동, 동률은 먼저 나온 순)');
assert.deepStrictEqual(rep.repeatYear.map(r => [r.serial, r.model, r.account, r.count]), [['S1', 'XN-1000', 'H1', 2], ['S5', 'XN-2000', 'H5', 2], ['S2', 'SP-50', 'H2', 1], ['S3', 'CN-3000', 'H3', 1], ['S4', 'XN-1000', 'H4', 1]], '반복 고장 최근 1년(모델·기관은 마지막 값)');
assert.deepStrictEqual(rep.repeatMonth.map(r => [r.serial, r.count]), [['S1', 2], ['S2', 1], ['S3', 1], ['S4', 1], ['S5', 1]]);
assert.deepStrictEqual(rep.errYear, { rows: [{ error: 'E1', count: 2 }, { error: 'E2', count: 1 }, { error: 'Water leak', count: 1 }, { error: 'E9', count: 1 }], total: 8 }, 'Error 1~3 합산, 기타·빈칸 제외');
assert.strictEqual(rep.errMonth.total, 7);
const ER = {}; rep.errRate.months.forEach(r => ER[r[0]] = r.slice(1));
assert.deepStrictEqual(ER['2026-09'], [83.3, 33.3, 100, 0], 'XN/XR 수리5/6 · SP 1/3 · CN 1/1'); assert.deepStrictEqual(ER['2026-08'], [100, 0, 0, 0]); assert.strictEqual(rep.errRate.months.length, 12);
assert.strictEqual(rep.health, null); assert.strictEqual(rep.hospMonth.length, 0, 'Serial·케이스 없으면 비움');

// 9. Serial·케이스 입력 — 가동 장비·운영건전성·집중관리·병원TOP5(케이스)
const serial = R.parseSerialRows({ h: ['제품 상태', '거래처', 'Model', 'Serial No.', '초도설치', '설치일자'], rows: [
  ['사용', 'H1', 'XN-1000', 'S1', '2020-01-01', '2020-01-01'], ['사용', 'H2', 'SP-50', 'S2', '', '2024-05-01'], ['사용', 'H3', 'CN-3000', 'S3', '2015-03-01', ''],
  ['사용', 'H5', 'XN-2000', 'S5', '2023-01-01', ''], ['사용', 'H9', 'XN-1000', 'S9', '2019-01-01', ''], ['폐기', 'H4', 'XN-1000', 'S4', '2018-01-01', '']] });
const cases = R.parseCasesRows({ h: ['상태', '거래처', '만든 날짜'], rows: [['해결됨', 'H1', '2026-09-03 10:00'], ['활성', 'H1', '2026-09-10 11:00'], ['해결됨', 'H2', '2026-09-15 09:00'], ['해결됨', '시스멕스코리아', '2026-09-20 09:00'], ['활성', 'H3', '2026-10-01 09:00']] });
const rep2 = buildReport({ raw: act.rows, roster: ROSTER, period: '2026-09', cut: '2026-09-30', serial, cases });
assert.deepStrictEqual(rep2.kpi, k, 'Serial·케이스는 KPI에 영향 없음');
assert.deepStrictEqual(rep2.fleet, { activeCount: 4, pmActiveCount: 2 }, '사용 5대 중 12개월 이력 4대(S9 제외, S4는 폐기, S6은 대장에 없음) · 6개월 PM 2대');
const Hh = rep2.health;
assert.deepStrictEqual([Hh.activeCount, Hh.pmCoverage, Hh.pmCV, Hh.per100, Hh.chronicUnits, Hh.chronicRatio, Hh.nMonths], [4, 50, 332, 175, 0, 0, 1], 'PM 2/4 · 월별 PM [0×11, 2] CV · 7행/1개월/4대');
assert.deepStrictEqual(Hh.teamCV, { 'FS EAST': null, 'FS WEST': null, 'FS SOUTH': null, 'FS CENTRAL': null }, '팀마다 1명 이하 → 편차 없음');
assert.deepStrictEqual([rep2.focus.candidateCount, rep2.focus.totalFleet, rep2.focus.avgPerUnit, rep2.focus.rows.length], [0, 2, 1.5, 0]);
assert.deepStrictEqual(rep2.hospMonth.map(r => [r.account, r.count]), [['H1', 2], ['H2', 1]], '케이스 기준 당월, 내부 계정·다음 달 제외');

// 10. 검산 워크북
const cw = buildCheckWorkbook(rep2);
assert.deepStrictEqual(cw.SheetNames, ['정제_KPI', '정제_KPI월별추이', '정제_팀별실적', '정제_케이스분석', '정제_트렌드비교', '정제_수도권', '정제_엔지니어생산성', '정제_병원TOP5', '정제_반복고장TOP5', '정제_장애요인TOP4', '정제_장비군에러율', '정제_운영건전성', '정제_집중관리대상', '로스터미매핑', '메타']);
const hv = XLSX.utils.sheet_to_json(cw.Sheets['정제_운영건전성'], { header: 1 });
assert.deepStrictEqual([hv[1][0], hv[1][1], hv[3][1]], ['PM 커버리지율', '50%', '175건']);
const kpiTab = XLSX.utils.sheet_to_json(cw.Sheets['정제_KPI'], { header: 1 });
assert.deepStrictEqual(kpiTab[1], ['2026-09', 50, 75, 37.5, 5, 1, 3, 33.3]);
assert.strictEqual(XLSX.utils.sheet_to_json(cw.Sheets['정제_KPI월별추이'], { header: 1 })[0].length, 20);
console.log('test_report_engine: OK (리더·기간·KPI·추이·팀별·케이스 + 트렌드·수도권·엔지니어·병원·반복고장·장애요인·에러율·건전성·집중관리·검산 워크북)');
