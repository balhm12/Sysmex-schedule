#!/usr/bin/env node
/* 월간보고 Google 시트 사본(xlsx)과 엔진 결과를 자동 대조한다 — "새 엔진이 시트와 같은 숫자를 내는가"의 검산.
 *
 *   1) Google 시트 「FSG_월_분기 보고 데이터」에서 메뉴 「FSG 보고서 › 데이터 정제 실행」을 한 번 돌린 직후
 *      파일 › 다운로드 › Microsoft Excel(.xlsx)
 *   2) node fsg-report/compare-sheet.js --sheet "FSG_월_분기 보고 데이터.xlsx"
 *
 * 시트 사본 하나에 입력(설정·로스터·원본_활동)과 정답(정제_KPI·정제_KPI월별추이·정제_팀별실적·정제_케이스분석)이 다 있으므로,
 * 같은 기간(설정 B2)·같은 추출일(설정 B4)로 엔진을 돌려 칸마다 비교하고 다른 곳만 출력한다. 거래처명·직원 이름은 출력하지 않는다.
 * 옵션: --period 2026-09 (설정 B2 대신) · --cut 2026-10-12 (설정 B4 대신) · --tol 0.051 (숫자 허용 오차)
 * 종료 코드: 0 = 모두 일치, 1 = 차이 있음, 2 = 읽기 오류 */
'use strict';
const fs = require('fs'), XLSX = require('xlsx');
const R = require('./lib/read-crm');
const { buildReport, SHEET_TEAMS } = require('./lib/report-core');
const { parsePeriod } = require('./lib/period');
const { buildCheckWorkbook } = require('./lib/write-check');

const NEED = ['설정', '로스터', '원본_활동', '정제_KPI', '정제_KPI월별추이', '정제_팀별실적', '정제_케이스분석'];
function args(argv) { const o = {}; for (let i = 0; i < argv.length; i++) { const a = argv[i]; if (a.startsWith('--')) { const v = argv[i + 1]; if (v === undefined || v.startsWith('--')) o[a.slice(2)] = true; else { o[a.slice(2)] = v; i++; } } } return o; }
const aoa = (wb, name) => { const ws = wb.Sheets[name]; if (!ws) return null; return XLSX.utils.sheet_to_json(ws, { header: 1, raw: true, defval: '' }); };
const serialToYMD = v => { const d = new Date(Math.round((v - 25569) * 86400000)); return [d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate()]; };
const pad = n => String(n).padStart(2, '0');
/* 시트가 '2026-01' 같은 글자를 날짜로 바꿔 '2026-1' 또는 일련번호로 둔 경우까지 'YYYY-MM' 으로 되돌린다 */
function monthLabel(v) {
  if (typeof v === 'number') { const [y, m] = serialToYMD(v); return y + '-' + pad(m); }
  const m = String(v || '').trim().match(/^(\d{4})\s*[-.\/]\s*(\d{1,2})/);
  return m ? m[1] + '-' + pad(+m[2]) : String(v || '').trim();
}
function settingPeriod(set) {                          // 설정 B2(+B3 '분기') → 기간 문자열 (Apps Script getPeriod_ 와 같은 해석)
  const b2 = set && set[1] ? set[1][1] : '', b3 = set && set[2] ? String(set[2][1] || '') : '';
  let raw = typeof b2 === 'number' ? monthLabel(b2) : String(b2 || '').trim();
  if (/^\d{4}-\d{1,2}$/.test(raw) && /분기/.test(b3)) { const [y, m] = raw.split('-').map(Number); const fy = m >= 4 ? y : y - 1; const q = Math.ceil((((m - 4 + 12) % 12) + 1) / 3); raw = 'FY' + fy + 'Q' + q; }
  return raw;
}
function settingCut(set) {
  const b4 = set && set[3] ? set[3][1] : '';
  if (typeof b4 === 'number') { const [y, m, d] = serialToYMD(b4); return y + '-' + pad(m) + '-' + pad(d); }
  const m = String(b4 || '').trim().match(/^(\d{4})\s*[-.\/]\s*(\d{1,2})\s*[-.\/]\s*(\d{1,2})/);   // '2026. 10. 12' 도 읽는다
  return m ? m[1] + '-' + pad(+m[2]) + '-' + pad(+m[3]) : null;
}
function rosterFromSheet(ro) {                         // 로스터 탭: B 팀 · C 직급 · D 성명 (Apps Script readRoster_)
  return (ro || []).slice(1).map(r => [String(r[3] || '').trim(), String(r[1] || '').trim(), String(r[2] || '').trim()]).filter(r => r[0]);
}
function lastRunLog(log) {                             // 실행로그에서 마지막 '데이터 정제' 행 — 정제 탭이 어느 시점 값인지 알려 준다
  const rows = (log || []).slice(1).filter(r => r[1] && !/가져오기|자동 정제 완료/.test(String(r[1])));
  if (!rows.length) return null;
  const r = rows[rows.length - 1], t = typeof r[0] === 'number' ? (() => { const [y, m, d] = serialToYMD(r[0]); return y + '-' + pad(m) + '-' + pad(d); })() : String(r[0]);
  return { at: t, period: String(r[1]), actRows: r[2] };
}
const num = v => (v === '' || v === null || v === undefined) ? null : (typeof v === 'number' ? v : (isNaN(Number(v)) ? String(v).trim() : Number(v)));
function same(a, b, tol) {
  a = num(a); b = num(b);
  if (a === null && b === null) return true;
  if (typeof a === 'number' && typeof b === 'number') return Math.abs(a - b) <= tol;
  return String(a ?? '') === String(b ?? '');
}
/* 두 표(aoa)를 행 키로 맞춰 지정한 열만 비교. 시트에 없는 행은 '(행 없음)' */
function compareTables(name, sheetRows, engineRows, keyOf, cols, tol, diffs) {
  const idx = new Map(); sheetRows.forEach(r => { const k = keyOf(r); if (k) idx.set(k, r); });
  let n = 0;
  engineRows.forEach(er => {
    const k = keyOf(er); if (!k) return;
    const sr = idx.get(k);
    if (!sr) { diffs.push([name, k, '(행 없음)', '', '']); return; }
    cols.forEach(([ci, label]) => { n++; if (!same(sr[ci], er[ci], tol)) diffs.push([name, k, label, sr[ci], er[ci]]); });
  });
  return n;
}
/* 워크북(시트 사본) → {diffs, cells, info}. 파일 없이도 쓸 수 있게 분리(테스트용) */
function compareWorkbook(wb, opt) {
  opt = opt || {}; const tol = opt.tol != null ? Number(opt.tol) : 0.051;
  const need = NEED.filter(t => !wb.Sheets[t]);
  if (need.length) throw new Error('시트 사본에 탭이 없습니다: ' + need.join(', ') + '\n(Google 시트에서 파일 › 다운로드 › Microsoft Excel 로 받은 전체 사본이어야 합니다)');
  const set = aoa(wb, '설정');
  const periodRaw = opt.period || settingPeriod(set), cut = opt.cut || settingCut(set);
  const period = parsePeriod(periodRaw);
  const roster = rosterFromSheet(aoa(wb, '로스터'));
  const actAoa = aoa(wb, '원본_활동');
  const act = R.parseActivityRows({ h: actAoa[0], rows: actAoa.slice(1), sheet: '원본_활동' });
  const rep = buildReport({ raw: act.rows, roster, period, cut });
  const eng = buildCheckWorkbook(rep);
  const E = name => XLSX.utils.sheet_to_json(eng.Sheets[name], { header: 1, raw: true, defval: '' });
  const diffs = []; let cells = 0;

  const sK = aoa(wb, '정제_KPI'), eK = E('정제_KPI');
  cells += compareTables('정제_KPI', [sK[1] || []], [eK[1]], () => 'KPI', [[1, 'FTFR'], [2, 'MTTR'], [3, '예방정비지수'], [4, '고장수리건수'], [5, '재방문건수'], [6, 'PM건수'], [7, '재방문율']], tol, diffs);
  cells += compareTables('정제_KPI 팀', sK.slice(4, 4 + SHEET_TEAMS.length), eK.slice(4), r => String(r[0] || ''), [[1, 'FTFR'], [2, '재방문율'], [3, 'MTTR']], tol, diffs);
  const sT = aoa(wb, '정제_KPI월별추이'), eT = E('정제_KPI월별추이'), hdr = eT[0];
  cells += compareTables('정제_KPI월별추이', sT.slice(1), eT.slice(1), r => monthLabel(r[0]), hdr.slice(1, -1).map((h, i) => [i + 1, h]), tol, diffs);
  const sTm = aoa(wb, '정제_팀별실적'), eTm = E('정제_팀별실적');
  cells += compareTables('정제_팀별실적', sTm.slice(1), eTm.slice(1).filter(r => SHEET_TEAMS.includes(r[0])), r => String(r[0] || ''), [[1, '리더'], [2, '인원'], [4, 'PM'], [5, 'A/S'], [10, '(참고) CRM 설치 활동']], tol, diffs);
  const sC = aoa(wb, '정제_케이스분석'), eC = E('정제_케이스분석');
  const caseKey = r => { const g = String(r[0] || ''); if (!g) return null; return (g.startsWith('상관표') ? '상관표' : g) + '|' + (g === '월별추이' ? monthLabel(r[1]) : String(r[1] || '').trim()); };
  cells += compareTables('정제_케이스분석', sC.slice(1), eC.slice(1), caseKey, [[2, '고장수리'], [3, '재방문 또는PM'], [4, 'Cal또는재방문율'], [5, '전월 재방문율'], [6, '전월 대비']], tol, diffs);

  return { diffs, cells, tol, info: { periodRaw, period, cut, roster: roster.length, actRows: act.rows.length, counted: rep.meta.counted || rep.meta.rows.counted, hasAtt: act.hasAtt, lastRun: lastRunLog(aoa(wb, '실행로그')) }, report: rep };
}
function main() {
  const o = args(process.argv.slice(2));
  if (!o.sheet) { console.error('사용법: node fsg-report/compare-sheet.js --sheet "FSG_월_분기 보고 데이터.xlsx" [--period 2026-09] [--cut 2026-10-12]'); process.exit(2); }
  const wb = XLSX.read(fs.readFileSync(o.sheet), { type: 'buffer', cellDates: false, dense: true });
  const r = compareWorkbook(wb, o), i = r.info;
  console.log(`기간 ${i.period.label} (설정 B2 "${i.periodRaw}") · 추출일 ${i.cut || '(없음 → 오늘)'} · 로스터 ${i.roster}명 · 원본_활동 ${i.actRows}행 → 집계 ${i.counted}행` + (i.hasAtt ? '' : ' ⚠ 필수 참석자 열 없음'));
  if (i.lastRun) console.log(`시트 정제 탭의 마지막 실행: ${i.lastRun.at} (기준월 ${i.lastRun.period}, 활동 ${i.lastRun.actRows}행) — 원본 탭을 그 뒤에 바꿨다면 「데이터 정제 실행」 후 다시 내려받아야 비교가 맞습니다`);
  console.log(`비교 칸 ${r.cells}개 · 다른 칸 ${r.diffs.length}개 (허용 오차 ±${r.tol})`);
  if (r.diffs.length) {
    console.log('\n탭 | 행 | 열 | 시트 값 | 엔진 값');
    r.diffs.slice(0, 80).forEach(d => console.log(d.map(x => x === '' || x === null || x === undefined ? '(빈칸)' : x).join(' | ')));
    if (r.diffs.length > 80) console.log('… 외 ' + (r.diffs.length - 80) + '개');
    process.exit(1);
  }
  console.log('모두 일치 ✅');
}
if (require.main === module) { try { main(); } catch (e) { console.error('오류:', e.message); process.exit(2); } }
module.exports = { compareWorkbook, settingPeriod, settingCut, rosterFromSheet, monthLabel, same, compareTables, NEED };
