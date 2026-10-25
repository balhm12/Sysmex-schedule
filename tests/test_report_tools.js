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
const SER_H = ['제품 상태', '거래처', 'Model', 'Serial No.', '초도설치', '설치일자'];
const serRows = ['H0', 'H1', 'H2', 'H3'].map((a, i) => ['사용', a, i % 2 ? 'XN-1000' : 'SP-50', 'S' + i, '2019-0' + (i + 1) + '-01', '']).concat([['폐기', 'H9', 'XN-1000', 'S9', '', '']]);
const CASE_H = ['상태', '거래처', '만든 날짜'];
const caseRows = [['해결됨', 'H1', '2026-09-03 10:00'], ['활성', 'H2', '2026-09-10 11:00'], ['해결됨', 'H1', '2026-09-15 09:00']]; // 시트 사본에만 남아 있는 탭(엔진은 안 읽음)
// 설치: 캘린더 작업 2건(매칭 1 · 수동 1) + 예정 1 + 캘린더 미등록 CRM 1
const I = require('../fsg-report/lib/install');
serRows.push(['사용', 'H1', 'XN-1000', 'S-N1', '2026-09-05', '2026-09-05', ''], ['사용', 'H5', 'UF-5000', 'S-N5', '2026-09-15', '2026-09-15', '']);
const CAL_H = ['구분', '병원', '장비', '시작일', '종료일', '기간(일)', '담당팀', '담당자'];
const calRows = [['설치', 'H1', 'XN-1000', ser(T(2026, 9, 4, 0)), ser(T(2026, 9, 4, 0)), 1, 'FS East', 'A'], ['설치', 'H7', 'XR-9100 System', ser(T(2026, 9, 10, 0)), ser(T(2026, 9, 11, 0)), 2, 'FS West', 'B'],
  ['설치', 'H8 (예정)', 'XN-550', ser(T(2026, 9, 20, 0)), ser(T(2026, 9, 20, 0)), 1, 'FS East', 'A']];   // 이 파일의 T()는 시(h)를 꼭 넘겨야 한다
const MAP_H = ['캘린더 표기', 'CRM 표기 (직접 입력)', '비고'], mapRows = [['H7', '-', '']];
const MAN_H = ['시작일', '기관명', '캘린더 표기']; for (let i = 1; i <= 10; i++) MAN_H.push('모델' + i, '수량' + i); MAN_H.push('비고');
const manRows = [['2026-09-10', 'H7', 'XR-9100 System', 'XR-20', 2, 'SP-50', 1].concat(Array(16).fill('')).concat(['CRM 미등록'])];
const serial = R.parseSerialRows({ h: SER_H, rows: serRows });
const calendar = I.readCalendarRows({ h: CAL_H, rows: calRows }), acctMap = I.readAcctMapRows({ h: MAP_H, rows: mapRows }), manualMap = I.readManualRows({ h: MAN_H, rows: manRows });
const rep = buildReport({ raw: act.rows, roster: ROSTER, period: '2026-09', cut: '2026-09-30', serial, calendar, acctMap, manualMap });
assert(rep.health && rep.fleet.activeCount === 4, '합성 자산대장으로 가동 장비 계산(새 S/N 2대는 활동 이력 없음) ' + rep.fleet.activeCount);
assert(rep.installBlock && rep.installBlock.detail.rows.length === 2 && rep.installBlock.detail.orphan.length === 1 && rep.installBlock.detail.tentative.length === 1, '설치 블록');
const truth = buildCheckWorkbook(rep);
const A = n => XLSX.utils.sheet_to_json(truth.Sheets[n], { header: 1, raw: true, defval: '' });
function sheetCopy(mutate) {
  const wb = XLSX.utils.book_new(), put = (n, a) => XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(a), n);
  put('설정', [['항목', '값', '설명'], ['기준월', '2026-09', ''], ['최근 실행', '', ''], ['CRM 추출일(선택)', '2026. 9. 30', '']]);
  put('로스터', rosterRows);
  put('원본_활동', [H, ...rows]);
  put('원본_Serial', [SER_H, ...serRows]); put('원본_케이스', [CASE_H, ...caseRows]);
  put('원본_설치캘린더', [CAL_H, ...calRows]); put('기관명매핑', [MAP_H, ...mapRows]); put('설치_수동입력', [MAN_H, ...manRows]);
  const kpi = A('정제_KPI'), tr = A('정제_KPI월별추이'), tm = A('정제_팀별실적'), ca = A('정제_케이스분석');
  // 2차 탭: 시트가 '50%'·'28.5%' 같은 글자를 숫자(0.5·0.285)로 바꿔 둔 모양까지 흉내 낸다
  const pctNum = v => { const m = String(v).match(/^([+-]?\d+(?:\.\d+)?)%$/); return m ? Number(m[1]) / 100 : v; };
  const hz = A('정제_운영건전성'); hz.slice(1).forEach(r => { r[1] = pctNum(r[1]); });
  const tcmp = A('정제_트렌드비교'); tcmp.slice(1, 4).forEach(r => { r[1] = pctNum(r[1]); r[2] = pctNum(r[2]); r[3] = pctNum(r[3]); });
  const det = A('정제_설치상세'); det.slice(1).forEach(r => { if (/^\d{4}-\d{2}-\d{2}$/.test(String(r[0]))) r[0] = Math.round(Date.UTC(+r[0].slice(0, 4), +r[0].slice(5, 7) - 1, +r[0].slice(8, 10)) / 86400000) + 25569; });   // 시트가 날짜로 바꾼 시작일
  const tsum = A('정제_팀별설치실적');
  const extra = { '정제_설치상세': det, '정제_설치현황': A('정제_설치현황'), '정제_팀별설치실적': tsum, '정제_트렌드비교': tcmp, '정제_수도권': A('정제_수도권'), '정제_엔지니어생산성': A('정제_엔지니어생산성'), '정제_병원TOP5': A('정제_병원TOP5'), '정제_반복고장TOP5': A('정제_반복고장TOP5'),
    '정제_장애요인TOP4': A('정제_장애요인TOP4'), '정제_장비군에러율': A('정제_장비군에러율'), '정제_운영건전성': hz, '정제_집중관리대상': A('정제_집중관리대상') };
  tr[3][0] = '2025-12'.replace('-12', '-12'); tr[4][0] = '2026-1';                      // 시트가 바꿔 놓은 라벨
  ca[0][1] = '월/모델'; ca[4][1] = '2026-1';                                                 // 행 4 = 2026-01
  tm[0] = ['팀', '리더', '인원', '설치+이전', 'PM', 'A/S', '합계', '1인당', '', '', ''];                 // 시트의 옛 헤더(설치 칸 이름 없음)
  extra['정제_엔지니어생산성'].forEach(r => { if (r[0] === '2026-09') r[0] = 46266; });            // 시트가 '2026-09'를 날짜(2026-09-01)로 바꾼 모양
  extra['정제_반복고장TOP5'].forEach(r => { if (r[0] === '2026-09') r[0] = 46266; });
  const tabs = Object.assign({ '정제_KPI': kpi, '정제_KPI월별추이': tr, '정제_팀별실적': tm.slice(0, 6), '정제_케이스분석': ca }, extra);
  if (mutate) mutate(tabs);
  Object.keys(tabs).forEach(n => put(n, tabs[n]));
  put('실행로그', [['실행 시각', '기준월', '활동 행수'], [46291.5, '2026-09', rows.length]]);
  return wb;
}
const ok = compareWorkbook(sheetCopy());
assert.strictEqual(ok.diffs.length, 0, '왕복 일치: ' + JSON.stringify(ok.diffs.slice(0, 5)));
assert(ok.cells > 300, '비교 칸 수 ' + ok.cells); assert.strictEqual(ok.notes.length, 0, ok.notes.join(' / ')); assert.strictEqual(ok.info.install, 2);
assert(ok.info.serial === serRows.length && ok.info.active === 4);
assert.strictEqual(ok.info.cut, '2026-09-30'); assert.strictEqual(ok.info.period.key, '2026-09'); assert.strictEqual(ok.info.lastRun.period, '2026-09');
const bad = compareWorkbook(sheetCopy(t => { t['정제_KPI'][1][1] = 12.3; t['정제_KPI월별추이'][12][5] += 1; t['정제_케이스분석'][2][2] = 'x'; t['정제_엔지니어생산성'][1][2] = '다른사람'; t['정제_운영건전성'][1][1] = 0.49; t['정제_설치상세'][1][7] = 9; t['정제_팀별실적'][1][3] = 7; }));
assert.strictEqual(bad.diffs.length, 7, '바꾼 칸 7개만 잡힘: ' + JSON.stringify(bad.diffs));
assert(bad.diffs.some(d => d[0] === '정제_설치상세' && d[2] === '실제 대수') && bad.diffs.some(d => d[0] === '정제_팀별실적' && d[2] === '설치+이전'), '설치 칸 차이 검출');
assert.deepStrictEqual(bad.diffs[0].slice(0, 3), ['정제_KPI', 'KPI', 'FTFR']);
const nameDiff = bad.diffs.find(d => d[0] === '정제_엔지니어생산성');
assert.deepStrictEqual(nameDiff.slice(2), ['담당자', '(이름·비표시)', '(이름·비표시)'], '이름은 화면에 내지 않음');
assert(bad.diffs.some(d => d[0] === '정제_운영건전성' && d[2] === '값'), '0.49 vs 50% 차이 검출');
// 원본_Serial 탭이 없는 사본 → 건전성·집중관리만 생략하고 나머지는 비교
const loose = sheetCopy(); { const ws = loose.Sheets['원본_Serial']; const c = XLSX.utils.encode_cell({ r: 1, c: 0 }); ws[c].v = '사용 '; }
const ls = compareWorkbook(loose); assert(ls.notes.some(n => /공백이 붙은 행 1개/.test(n)), '공백 사용 진단: ' + ls.notes.join(' / '));
// S/N 0 행: "장비 없음"으로 읽는다(대시보드 snOf·시트 Apps Script와 같은 규칙) → 재방문 판정·반복 고장·가동 장비에서 빠진다
{ const rowsZ = rows.concat([row('A', '고장 수리', 'H1', 0, 'XN-1000', T(2026, 9, 21, 10), T(2026, 9, 21, 11), 'E1')]);
  const actZ = R.parseActivityRows({ h: H, rows: rowsZ });
  assert.strictEqual(actZ.rows[actZ.rows.length - 1].sn, '', 'S/N 0 → 빈칸'); assert.strictEqual(R.snOf(' 0 '), ''); assert.strictEqual(R.snOf(80364), '80364');
  const a = buildReport({ raw: actZ.rows, roster: ROSTER, period: '2026-09', cut: '2026-09-30' });
  assert(!a.repeatMonth.some(r => r.serial === '0' || r.serial === ''), "반복 고장 표에 S/N '0' 없음");
  assert.strictEqual(R.parseSerialRows({ h: SER_H, rows: [['사용', 'H1', 'XN', 0, '', '']] })[0].sn, '', '자산대장 S/N 0 → 빈칸');
  const copyZ = sheetCopy(); const ws = copyZ.Sheets['원본_활동']; const last = XLSX.utils.decode_range(ws['!ref']).e.r + 1;
  XLSX.utils.sheet_add_aoa(ws, [rowsZ[rowsZ.length - 1]], { origin: { r: last, c: 0 } });
  const cz = compareWorkbook(copyZ);
  assert(cz.notes.some(n => /S\/N 칸이 0인 활동 1행/.test(n)), 'S/N 0 안내: ' + cz.notes.join(' / ')); }
const noSer = sheetCopy(); delete noSer.Sheets['원본_Serial']; noSer.SheetNames = noSer.SheetNames.filter(n => n !== '원본_Serial');
const ns = compareWorkbook(noSer); assert.strictEqual(ns.diffs.length, 0); assert(ns.notes.length === 1 && /원본_Serial/.test(ns.notes[0]));
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
assert(/가동 장비 지표 없음/.test(res.stdout), 'Serial 없으면 안내');
const swb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(swb, XLSX.utils.aoa_to_sheet([SER_H, ...serRows]), 'Serial'); XLSX.writeFile(swb, path.join(dir, 'Serial No 2026_09_30.xlsx'));
const cwb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(cwb, XLSX.utils.aoa_to_sheet([CASE_H, ...caseRows]), 'case'); XLSX.writeFile(cwb, path.join(dir, '1. 모든 서비스 케이스 2026_09_30.xlsx')); // 폴더에 있어도 무시
const res2 = cp.spawnSync(process.execPath, [cli, '--period', '2026-09', '--dir', dir, '--roster', path.join(tmp, 'roster.csv'), '--out', out], { encoding: 'utf8' });
assert.strictEqual(res2.status, 0, res2.stderr); assert(/가동 장비 4대/.test(res2.stdout), '폴더의 Serial 자동 사용: ' + res2.stdout);
const json2 = JSON.parse(fs.readFileSync(path.join(out, 'report-data_2026-09.json'), 'utf8'));
assert.strictEqual(json2.meta.files.serial, 'Serial No 2026_09_30.xlsx'); assert.strictEqual(json2.meta.files.cases, undefined, '케이스 파일은 쓰지 않음'); assert(json2.hospMonth.length >= 1);
const q = cp.spawnSync(process.execPath, [cli, '--period', 'FY2026Q2', '--activity', path.join(dir, '2. 모든 약속_활동 2026_08_01.xlsx'), '--out', out], { encoding: 'utf8' });
assert.strictEqual(q.status, 0, q.stderr); assert(fs.existsSync(path.join(out, 'report-data_FY2026Q2.json')), '대시보드 ROSTER 기본값 + 분기');
fs.rmSync(tmp, { recursive: true, force: true });
console.log('test_report_tools: OK (시트 사본 대조 왕복 16탭·차이 검출·이름 비표시·Serial 없는 사본·CLI 폴더 선택·분기)');
