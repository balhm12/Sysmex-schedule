#!/usr/bin/env node
/* FSG 월간·분기 보고서 데이터 — CRM 내보내기 xlsx에서 바로 계산한다 (Google Sheets 불필요).
 *
 *   node fsg-report/report-data.js --period 2026-09 --dir "C:\Users\me\Google Drive\CRM_원본"
 *   node fsg-report/report-data.js --period FY2026Q2 --activity "2. 모든 약속_활동 2026_10_12.xlsx" --out out
 *
 * 옵션
 *   --period   2026-09 | 2026-07~2026-09 | FY2026Q2   (필수)
 *   --dir      CRM 파일 폴더. 파일명으로 종류를 구분해 가장 최신(파일명 날짜 → 수정 시각)을 쓴다
 *   --activity 「2. 모든 약속_활동 …xlsx」 직접 지정 (--dir 보다 우선)
 *   --roster   로스터 CSV(fsg-roster 형식: 번호,팀,직급,성명,…). 없으면 ../fsg-kpi.html 의 ROSTER 상수(대시보드와 같은 명단)
 *   --cut      CRM 추출일 YYYY-MM-DD. 없으면 활동 파일명의 날짜, 그것도 없으면 오늘. 그 뒤로 잡힌 예정 약속을 뺀다
 *   --out      출력 폴더(기본 fsg-report/out). report-data_<기간>.json 과 검산_<기간>.xlsx 를 쓴다
 *
 * 출력 숫자는 월간보고 시트의 정제_KPI · 정제_KPI월별추이 · 정제_팀별실적 · 정제_케이스분석과 같은 기준이다(팀별 설치 칸만 2차 묶음). */
'use strict';
const fs = require('fs'), path = require('path');
const XLSX = require('xlsx');
const R = require('./lib/read-crm');
const { buildReport } = require('./lib/report-core');
const { parsePeriod } = require('./lib/period');
const { buildCheckWorkbook } = require('./lib/write-check');

function args(argv) {
  const o = {}; for (let i = 0; i < argv.length; i++) { const a = argv[i]; if (a.startsWith('--')) { const k = a.slice(2); const v = argv[i + 1]; if (v === undefined || v.startsWith('--')) o[k] = true; else { o[k] = v; i++; } } }
  return o;
}
function loadRosterCsv(p) {
  const txt = fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, ''), lines = txt.split(/\r?\n/).filter(l => l.trim());
  const head = lines[0].split(','), iT = head.indexOf('팀'), iG = head.indexOf('직급'), iN = head.indexOf('성명');
  if (iT < 0 || iG < 0 || iN < 0) throw new Error('로스터 CSV에 팀·직급·성명 열이 있어야 합니다: ' + p);
  return lines.slice(1).map(l => l.split(',')).filter(c => c[iN]).map(c => [c[iN].trim(), c[iT].trim(), c[iG].trim()]);
}
function loadRosterFromDashboard() {
  const html = path.join(__dirname, '..', 'fsg-kpi.html');
  const src = fs.readFileSync(html, 'utf8'), m = src.match(/const ROSTER = (\[[\s\S]*?\]\]);/);
  if (!m) throw new Error('fsg-kpi.html 에서 ROSTER 상수를 찾지 못했습니다');
  return JSON.parse(m[1]);
}
function main() {
  const o = args(process.argv.slice(2));
  if (!o.period || o.help) { console.log(fs.readFileSync(__filename, 'utf8').split('*/')[0].replace(/^\/\*|^ \* ?/gm, '')); process.exit(o.period ? 0 : 1); }
  const period = parsePeriod(o.period);
  let actPath = o.activity, picked = null;
  if (!actPath) {
    if (!o.dir) throw new Error('--activity 파일 또는 --dir 폴더 중 하나는 필요합니다');
    picked = R.pickLatest(o.dir);
    if (!picked.ACT) throw new Error('폴더에서 활동 파일(이름에 "약속_활동")을 찾지 못했습니다: ' + o.dir);
    actPath = picked.ACT.path;
  }
  const rosterSrc = o.roster ? path.resolve(o.roster) : 'fsg-kpi.html ROSTER';
  const roster = o.roster ? loadRosterCsv(o.roster) : loadRosterFromDashboard();
  const cut = o.cut || R.fileDateKey(path.basename(actPath)) || null;
  const act = R.parseActivity(fs.readFileSync(actPath));
  const rep = buildReport({ raw: act.rows, roster, period, cut });
  rep.meta.files = { activity: path.basename(actPath), roster: path.basename(rosterSrc), header: { hasAtt: act.hasAtt, hasFormType: act.hasFormType } };

  const out = path.resolve(o.out || path.join(__dirname, 'out')); fs.mkdirSync(out, { recursive: true });
  const stem = rep.meta.period.key.replace(/[^\w가-힣~-]/g, '_');
  fs.writeFileSync(path.join(out, 'report-data_' + stem + '.json'), JSON.stringify(rep, null, 2));
  XLSX.writeFile(buildCheckWorkbook(rep), path.join(out, '검산_' + stem + '.xlsx'));

  const k = rep.kpi, m = rep.meta;
  console.log(`[${m.period.label}] 활동 ${path.basename(actPath)} · 추출일 ${cut || '(오늘)'} · 로스터 ${path.basename(rosterSrc)}`);
  console.log(`행 ${m.rows.raw} → 예정 제외 ${m.excluded.future} · 시각 없음 ${m.excluded.notime} · 취소 ${m.excluded.cancel} · 온라인 정기점검 ${m.excluded.online} → 집계 ${m.rows.counted}` + (act.hasAtt ? '' : '  ⚠ 필수 참석자 열 없음(담당자만 인정)'));
  console.log(`FSG  FTFR ${k.ftfr}% · 재방문율 ${k.revisitRate}% · MTTR ${k.mttr}분 · 예방정비지수 ${k.pmRatio}% · 고장수리 ${k.repairCount} · PM ${k.pmCount} · 재방문(FTFR 실패) ${k.revisitCount}`);
  k.teams.forEach(t => console.log(`  ${t.team.padEnd(10)} FTFR ${t.ftfr ?? '-'} · 재방문율 ${t.revisit ?? '-'} · MTTR ${t.mttr ?? '-'}`));
  rep.team.rows.forEach(r => console.log(`  ${r.team.padEnd(10)} 인원 ${r.count} · PM ${r.pm} · A/S ${r.as_} · 설치(CRM 활동) ${r.instCrm} · 합계 ${r.sum} · 1인당 ${r.perHead}`));
  if (rep.team.unmapped) console.log(`  ⚠ 로스터 미매핑 활동 ${rep.team.unmapped}건 (이름은 검산 xlsx 「로스터미매핑」 탭)`);
  console.log(`출력: ${out}`);
}
if (require.main === module) { try { main(); } catch (e) { console.error('오류:', e.message); process.exit(1); } }
module.exports = { loadRosterCsv, loadRosterFromDashboard };
