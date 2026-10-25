// compare-sheet(시트 사본 대조)와 report-data CLI 의 동작 — 합성 시트 사본으로 왕복 검증
const assert = require('assert'), fs = require('fs'), os = require('os'), path = require('path'), cp = require('child_process'), XLSX = require('xlsx');
const { compareWorkbook, settingCut, monthLabel } = require('../fsg-report/compare-sheet');
const R = require('../fsg-report/lib/read-crm');
const { buildReport } = require('../fsg-report/lib/report-core');
const { buildCheckWorkbook } = require('../fsg-report/lib/write-check');

assert.strictEqual(settingCut([[], [], [], ['CRM 추출일(선택)', '2026. 10. 12']]), '2026-10-12', '시트의 "2026. 10. 12" 표기');
assert.strictEqual(settingCut([[], [], [], ['x', 46307]]), '2026-10-12', '일련번호');
assert.strictEqual(monthLabel('2026-1'), '2026-01'); assert.strictEqual(monthLabel(46023), '2026-01');

const DAY = 86400000, ser = ms => ms / DAY + 25569, T = (y, m, d, h, mi) => Date.UTC(y, m - 1, d, h, mi || 0);
const H = ['상태', '양식 타입', '시작 시간', '종료 시간', '담당자', '주제', 'Error 1', 'Error 2', 'Error 3', '거래처', '위치', 'Serial No. (lookup)', 'Product', '약속/활동 목적', '우선 순위', '필수 참석자', '만든 날짜'];
const row = (own, purp, acct, sn, prod, s, e, err, att) => ['완료됨', '서비스 요청', ser(s), ser(e), own, '', err || '', '', '', acct, '', sn, prod, purp, '보통', att || '', ''];
const rows = [];
for (let d = 1; d <= 20; d++) { rows.push(row(d % 2 ? 'A' : 'B', d % 3 ? '고장 수리' : 'PM', 'H' + (d % 4), 'S' + (d % 4), d % 2 ? 'XN-1000' : 'SP-50', T(2026, 9, d, 10), T(2026, 9, d, 11 + (d % 3)), 'E' + (d % 2), d % 5 ? '' : 'C')); }
rows.push(row('A', '고장 수리', 'H1', 'S1', 'XN-1000', T(2026, 8, 20, 10), T(2026, 8, 20, 11), 'E1'));
rows.push(row('A', '고장 수리', 'H1', 'S1', 'XN-1000', T(2026, 10, 5, 10), T(2026, 10, 5, 11), 'E1'));      // 추출일 9/30 뒤 → 예정 제외
const rosterRows = [['No', 'TEAM', '직급/직책', '이름'], [1, 'FS EAST', '팀장', 'C'], [2, 'FS EAST', 'T2', 'A'], [3, 'FS WEST', 'T1', 'B'], [4, 'FS SOUTH', 'T3', 'X'], [5, 'FS CENTRAL', 'T2', 'Y']];
const ROSTER = rosterRows.slice(1).map(r => [r[3], r[1], r[2]]);

// 엔진으로 "정답" 탭을 만들고 시트 사본 모양(라벨 날짜 변환·'월/모델' 헤더)으로 흉내 낸다
const act = R.parseActivityRows({ h: H, rows });
const rep = buildReport({ raw: act.rows, roster: ROSTER, period: '2026-09', cut: '2026-09-30' });
const truth = buildCheckWorkbook(rep);
const A = n => XLSX.utils.sheet_to_json(truth.Sheets[n], { header: 1, raw: true, defval: '' });
function sheetCopy(mutate) {
  const wb = XLSX.utils.book_new(), put = (n, a) => XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(a), n);
  put('설정', [['항목', '값', '설명'], ['기준월', '2026-09', ''], ['최근 실행', '', ''], ['CRM 추출일(선택)', '2026. 9. 30', '']]);
  put('로스터', rosterRows);
  put('원본_활동', [H, ...rows]);
  const kpi = A('정제_KPI'), tr = A('정제_KPI월별추이'), tm = A('정제_팀별실적'), ca = A('정제_케이스분석');
  tr[3][0] = '2025-12'.replace('-12', '-12'); tr[4][0] = '2026-1';                      // 시트가 바꿔 놓은 라벨
  ca[0][1] = '월/모델'; ca[4][1] = '2026-1';                                                 // 행 4 = 2026-01
  tm[0] = ['팀', '리더', '인원', '설치+이전', 'PM', 'A/S', '합계', '1인당', '', '', ''];
  tm.forEach((r, i) => { if (i > 0 && r[0] && r[0] !== '합계') { r[3] = 99; r[6] = 999; r[7] = 9.9; } });  // 캘린더 기준 설치 칸은 비교 안 함
  const tabs = { '정제_KPI': kpi, '정제_KPI월별추이': tr, '정제_팀별실적': tm.slice(0, 6), '정제_케이스분석': ca };
  if (mutate) mutate(tabs);
  Object.keys(tabs).forEach(n => put(n, tabs[n]));
  put('실행로그', [['실행 시각', '기준월', '활동 행수'], [46291.5, '2026-09', rows.length]]);
  return wb;
}
const ok = compareWorkbook(sheetCopy());
assert.strictEqual(ok.diffs.length, 0, '왕복 일치: ' + JSON.stringify(ok.diffs.slice(0, 3)));
assert(ok.cells > 100, '비교 칸 수 ' + ok.cells);
assert.strictEqual(ok.info.cut, '2026-09-30'); assert.strictEqual(ok.info.period.key, '2026-09'); assert.strictEqual(ok.info.lastRun.period, '2026-09');
const bad = compareWorkbook(sheetCopy(t => { t['정제_KPI'][1][1] = 12.3; t['정제_KPI월별추이'][12][5] += 1; t['정제_케이스분석'][2][2] = 'x'; }));
assert.strictEqual(bad.diffs.length, 3, '바꾼 칸 3개만 잡힘: ' + JSON.stringify(bad.diffs));
assert.deepStrictEqual(bad.diffs[0].slice(0, 3), ['정제_KPI', 'KPI', 'FTFR']);
assert.throws(() => compareWorkbook(XLSX.utils.book_new()), /탭이 없습니다/);

// CLI 왕복: 활동 xlsx + 로스터 CSV → JSON·검산 xlsx
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'fsg-report-')), dir = path.join(tmp, 'CRM_원본'); fs.mkdirSync(dir);
const awb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(awb, XLSX.utils.aoa_to_sheet([H, ...rows]), '약속');
XLSX.writeFile(awb, path.join(dir, '2. 모든 약속_활동 2026_09_30 AM 10-00-00.xlsx'));
XLSX.writeFile(awb, path.join(dir, '2. 모든 약속_활동 2026_08_01.xlsx'));
fs.writeFileSync(path.join(tmp, 'roster.csv'), '﻿번호,팀,직급,성명,거점\n' + ROSTER.map((r, i) => [i + 1, r[1], r[2], r[0], ''].join(',')).join('\n'));
const cli = path.join(__dirname, '..', 'fsg-report', 'report-data.js'), out = path.join(tmp, 'out');
const res = cp.spawnSync(process.execPath, [cli, '--period', '2026-09', '--dir', dir, '--roster', path.join(tmp, 'roster.csv'), '--out', out], { encoding: 'utf8' });
assert.strictEqual(res.status, 0, res.stderr + res.stdout);
assert(/추출일 2026-09-30/.test(res.stdout), '파일명 날짜가 추출일: ' + res.stdout.split('\n')[0]);
const json = JSON.parse(fs.readFileSync(path.join(out, 'report-data_2026-09.json'), 'utf8'));
assert.strictEqual(json.kpi.repairCount, rep.kpi.repairCount); assert.strictEqual(json.meta.files.activity, '2. 모든 약속_활동 2026_09_30 AM 10-00-00.xlsx');
assert(fs.existsSync(path.join(out, '검산_2026-09.xlsx')));
const q = cp.spawnSync(process.execPath, [cli, '--period', 'FY2026Q2', '--activity', path.join(dir, '2. 모든 약속_활동 2026_08_01.xlsx'), '--out', out], { encoding: 'utf8' });
assert.strictEqual(q.status, 0, q.stderr); assert(fs.existsSync(path.join(out, 'report-data_FY2026Q2.json')), '대시보드 ROSTER 기본값 + 분기');
fs.rmSync(tmp, { recursive: true, force: true });
console.log('test_report_tools: OK (시트 사본 대조 왕복·차이 검출·CLI 폴더 선택·분기)');
