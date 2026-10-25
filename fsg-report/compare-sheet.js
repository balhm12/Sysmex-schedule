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
/* 값 정규화: '74.4%' '6.9건' '12곳' 같은 글자는 숫자로, 시트가 '74.4%'를 0.744로 자동 변환한 경우는 ×100으로 맞춘다 */
const num = v => {
  if (v === '' || v === null || v === undefined) return null;
  if (typeof v === 'number') return v;
  const t = String(v).trim(), m = t.match(/^([+-]?\d+(?:\.\d+)?)\s*(%|건|대|곳)?$/);
  return m ? Number(m[1]) : t;
};
const isPct = v => typeof v === 'string' && /%$/.test(v.trim());           // '74.4%' (단, '+3.5%p'는 글자 그대로 비교)
function same(a0, b0, tol) {
  let a = num(a0), b = num(b0);
  if (a === null && b === null) return true;
  if (typeof a === 'number' && typeof b === 'number') {
    // 한쪽이 '74.4%' 글자이고 다른 쪽이 숫자면, 시트가 글자를 0.744로 바꿔 둔 것이므로 ×100
    if (isPct(b0) && typeof a0 === 'number') a *= 100; else if (isPct(a0) && typeof b0 === 'number') b *= 100;
    return Math.abs(a - b) <= tol;
  }
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
    cols.forEach(([ci, label, hide]) => { n++; if (!same(sr[ci], er[ci], tol)) diffs.push([name, k, label, hide ? '(이름·비표시)' : sr[ci], hide ? '(이름·비표시)' : er[ci]]); });
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
  const notes = [];
  const serAoa = aoa(wb, '원본_Serial'), caseAoa = aoa(wb, '원본_케이스');
  let serial = null, cases = null;
  try { if (serAoa && serAoa.length > 1) serial = R.parseSerialRows({ h: serAoa[0], rows: serAoa.slice(1) }); else notes.push('원본_Serial 탭 없음 → 운영건전성·집중관리대상 비교 생략'); }
  catch (e) { notes.push('원본_Serial 읽기 실패(' + e.message + ') → 운영건전성·집중관리대상 비교 생략'); }
  try { if (caseAoa && caseAoa.length > 1) cases = R.parseCasesRows({ h: caseAoa[0], rows: caseAoa.slice(1) }); else notes.push('원본_케이스 탭 없음 → 병원TOP5(케이스 기준) 비교 생략'); }
  catch (e) { notes.push('원본_케이스 읽기 실패(' + e.message + ') → 병원TOP5(케이스 기준) 비교 생략'); }
  const rep = buildReport({ raw: act.rows, roster, period, cut, serial, cases });
  const siA = R.col(actAoa[0].map(x => String(x).trim()), ['Serial No. (lookup)', 'Serial No'], 14);
  const zeroAct = actAoa.slice(1).filter(r => String(r[siA] == null ? '' : r[siA]).trim() === '0').length;
  if (zeroAct) notes.push(`S/N 칸이 0인 활동 ${zeroAct}행은 "장비 없음"으로 처리(대시보드·시트와 같은 규칙, 2026-10-25 결정 A)`);
  if (serAoa && serAoa.length > 1) {   // 진단: '사용' 글자에 공백이 붙은 행(Apps Script는 정확히 '사용'만 인정, 엔진은 공백을 지우고 봄)
    const h0 = serAoa[0].map(x => String(x).trim()), si = R.col(h0, ['상태'], 3);
    const loose = serAoa.slice(1).filter(r => { const v = r[si]; return v !== '사용' && String(v == null ? '' : v).trim() === '사용'; }).length;
    if (loose) notes.push(`원본_Serial에서 상태가 '사용'이지만 앞뒤 공백이 붙은 행 ${loose}개 — 시트 Apps Script는 이 행을 가동 장비에서 빼고, 엔진은 넣는다(가동 장비 수 차이의 후보)`);
  }
  const diffReport = rep => {
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

  /* ── 2차 묶음 ── 이름(담당자·기관명·S/N)은 비교하되 화면에는 내지 않는다 */
  const has = n => !!wb.Sheets[n];
  const rankKey = r => (r[0] === '' || r[0] == null) ? null : (typeof r[0] === 'number' ? monthLabel(r[0]) : String(r[0]).trim()) + '|' + String(r[1]).trim();   // 시트가 '2026-10'을 날짜로 바꾼 칸 대응
  if (has('정제_트렌드비교')) {
    const sX = aoa(wb, '정제_트렌드비교'), eX = E('정제_트렌드비교');
    cells += compareTables('정제_트렌드비교', sX.slice(1), eX.slice(1).filter(r => r[0] && !/^개편 후 반영 월/.test(String(r[0]))), r => String(r[0] || ''), [[1, '개편 전'], [2, '개편 후'], [3, '증감']], tol, diffs);
    const sM = sX.find(r => /^개편 후 반영 월/.test(String(r[0] || ''))), eM = eX.find(r => /^개편 후 반영 월/.test(String(r[0] || '')));
    cells++; if (String(sM ? sM[0] : '') !== String(eM ? eM[0] : '')) diffs.push(['정제_트렌드비교', '개편 후 반영 월', '목록', sM ? sM[0] : '(없음)', eM ? eM[0] : '(없음)']);
  }
  if (has('정제_수도권')) cells += compareTables('정제_수도권', aoa(wb, '정제_수도권').slice(1), E('정제_수도권').slice(1), r => r[0] === '' ? null : monthLabel(r[0]) + '|' + String(r[1] || '').trim(), [[2, 'PM건수'], [3, 'A/S건수']], tol, diffs);
  if (has('정제_엔지니어생산성')) cells += compareTables('정제_엔지니어생산성', aoa(wb, '정제_엔지니어생산성').slice(1), E('정제_엔지니어생산성').slice(1), rankKey, [[2, '담당자', true], [3, '팀'], [4, '건수'], [5, '직급'], [6, '고장수리%'], [7, 'PM%']], tol, diffs);
  if (has('정제_병원TOP5')) {
    const eH = E('정제_병원TOP5').slice(1).filter(r => cases || !/케이스 기준/.test(String(r[0])));
    cells += compareTables('정제_병원TOP5', aoa(wb, '정제_병원TOP5').slice(1), eH, rankKey, [[2, '기관명', true], [3, '건수']], tol, diffs);
  }
  if (has('정제_반복고장TOP5')) cells += compareTables('정제_반복고장TOP5', aoa(wb, '정제_반복고장TOP5').slice(1), E('정제_반복고장TOP5').slice(1), rankKey, [[2, 'S/N', true], [3, '장비'], [4, '기관명', true], [5, '건수']], tol, diffs);
  if (has('정제_장애요인TOP4')) cells += compareTables('정제_장애요인TOP4', aoa(wb, '정제_장애요인TOP4').slice(1), E('정제_장애요인TOP4').slice(1), rankKey, [[2, '장애 요인'], [3, '건수'], [4, '전체 기재 건수']], tol, diffs);
  if (has('정제_장비군에러율')) cells += compareTables('정제_장비군에러율', aoa(wb, '정제_장비군에러율').slice(1), E('정제_장비군에러율').slice(1), r => r[0] === '' ? null : monthLabel(r[0]), [[1, 'XN/XR'], [2, 'SP'], [3, 'CN'], [4, 'HISCL']], tol, diffs);
  if (serial && has('정제_운영건전성')) cells += compareTables('정제_운영건전성', aoa(wb, '정제_운영건전성').slice(1), E('정제_운영건전성').slice(1), r => String(r[0] || ''), [[1, '값'], [2, '설명']], tol, diffs);
  if (serial && has('정제_집중관리대상')) {
    const fk = (rows) => rows.map((r, i) => Object.assign([], r, { __k: /^\(선정 조건/.test(String(r[0])) ? '선정 조건 충족' : '#' + (i + 1) }));
    cells += compareTables('정제_집중관리대상', fk(aoa(wb, '정제_집중관리대상').slice(1)), fk(E('정제_집중관리대상').slice(1)), r => r[0] === '' ? null : r.__k,
      [[0, '기관명', true], [1, '담당 팀'], [2, '보유'], [3, '반복 고장'], [4, '반복 고장 비율'], [5, '12개월 수리'], [6, '5년 이상'], [7, '5년 이상 비율'], [8, '필요 조치']], tol, diffs);
  }

  return { diffs, cells };
  };
  const { diffs, cells } = diffReport(rep);
  return { diffs, cells, tol, notes, info: { periodRaw, period, cut, roster: roster.length, actRows: act.rows.length, counted: rep.meta.rows.counted, serial: serial ? serial.length : 0, cases: cases ? cases.length : 0, active: rep.fleet ? rep.fleet.activeCount : null, hasAtt: act.hasAtt, lastRun: lastRunLog(aoa(wb, '실행로그')) }, report: rep };
}
function main() {
  const o = args(process.argv.slice(2));
  if (!o.sheet) { console.error('사용법: node fsg-report/compare-sheet.js --sheet "FSG_월_분기 보고 데이터.xlsx" [--period 2026-09] [--cut 2026-10-12]'); process.exit(2); }
  const wb = XLSX.read(fs.readFileSync(o.sheet), { type: 'buffer', cellDates: false, dense: true });
  const r = compareWorkbook(wb, o), i = r.info;
  console.log(`기간 ${i.period.label} (설정 B2 "${i.periodRaw}") · 추출일 ${i.cut || '(없음 → 오늘)'} · 로스터 ${i.roster}명 · 원본_활동 ${i.actRows}행 → 집계 ${i.counted}행 · Serial ${i.serial}행 · 케이스 ${i.cases}행` + (i.active != null ? ` · 가동 장비 ${i.active}대` : '') + (i.hasAtt ? '' : ' ⚠ 필수 참석자 열 없음'));
  r.notes.forEach(n => console.log('※ ' + n));
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
