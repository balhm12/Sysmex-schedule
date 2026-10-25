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
 *   --serial   「Serial No …xlsx」 자산대장 (가동 장비 기준 지표: 운영건전성·집중관리대상). --dir 에 있으면 자동
 *   --cases    「1. 모든 서비스 케이스 …xlsx」 (병원 TOP5 당월). --dir 에 있으면 자동
 *   --calendar 설치 공유캘린더 내보내기 「시스템설치_공유캘린더_YYYYMMDD.xlsx」 (4장 설치 현황). --dir 에 있으면 자동
 *   --acct-map 기관명매핑 xlsx/csv (캘린더 표기 | CRM 표기 | 비고). --dir 의 '기관명매핑*' 자동
 *   --manual   설치_수동입력 xlsx/csv (시작일 | 기관명 | 캘린더 표기 | 모델1 수량1 …). --dir 의 '*수동입력*' 자동
 *   --roster   로스터 CSV(fsg-roster 형식: 번호,팀,직급,성명,…). 없으면 ../fsg-kpi.html 의 ROSTER 상수(대시보드와 같은 명단)
 *   --cut      CRM 추출일 YYYY-MM-DD. 없으면 활동 파일명의 날짜, 그것도 없으면 오늘. 그 뒤로 잡힌 예정 약속을 뺀다
 *   --out      출력 폴더(기본 fsg-report/out). report-data_<기간>.json 과 검산_<기간>.xlsx 를 쓴다
 *
 * 출력 숫자는 월간보고 시트의 정제 탭(KPI · KPI월별추이 · 팀별실적 · 케이스분석 · 트렌드비교 · 수도권 · 엔지니어생산성 · 병원TOP5 ·
 * 반복고장TOP5 · 장애요인TOP4 · 장비군에러율 · 운영건전성 · 집중관리대상)과 같은 기준이다. 설치 현황(캘린더 기준)만 남았다. */
'use strict';
const fs = require('fs'), path = require('path');
const XLSX = require('xlsx');
const R = require('./lib/read-crm');
const { buildReport } = require('./lib/report-core');
const { parsePeriod } = require('./lib/period');
const INS = require('./lib/install');
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
  let actPath = o.activity, serPath = o.serial, casePath = o.cases, picked = null;
  if (!actPath || (!serPath && o.dir) || (!casePath && o.dir)) {
    if (!o.dir && !actPath) throw new Error('--activity 파일 또는 --dir 폴더 중 하나는 필요합니다');
    if (o.dir) {
      picked = R.pickLatest(o.dir);
      if (!actPath) { if (!picked.ACT) throw new Error('폴더에서 활동 파일(이름에 "약속_활동")을 찾지 못했습니다: ' + o.dir); actPath = picked.ACT.path; }
      if (!serPath && picked.SER) serPath = picked.SER.path;
      if (!casePath && picked.CASE) casePath = picked.CASE.path;
    }
  }
  let calPath = o.calendar, mapPath = o['acct-map'], manPath = o.manual;
  if (o.dir) { picked = picked || R.pickLatest(o.dir);
    if (!calPath && picked.CAL) calPath = picked.CAL.path;
    const byName = pat => { const f = fs.readdirSync(o.dir).filter(n => pat.test(n) && /\.(xlsx|xlsm|csv)$/i.test(n)).sort(); return f.length ? path.join(o.dir, f[f.length - 1]) : null; };
    if (!mapPath) mapPath = byName(/기관명매핑/); if (!manPath) manPath = byName(/수동입력/); }
  const table = p => { const t = R.xlsxRows(fs.readFileSync(p), null); if (!t) throw new Error('읽을 수 없습니다: ' + p); return t; };
  const rosterSrc = o.roster ? path.resolve(o.roster) : 'fsg-kpi.html ROSTER';
  const roster = o.roster ? loadRosterCsv(o.roster) : loadRosterFromDashboard();
  const cut = o.cut || R.fileDateKey(path.basename(actPath)) || null;
  const act = R.parseActivity(fs.readFileSync(actPath));
  const serial = serPath ? R.parseSerial(fs.readFileSync(serPath)) : null;
  const cases = casePath ? R.parseCases(fs.readFileSync(casePath)) : null;
  const calendar = calPath ? INS.readCalendarRows(table(calPath), R.toMs) : null;
  const acctMap = mapPath ? INS.readAcctMapRows(table(mapPath)) : null;
  const manualMap = manPath ? INS.readManualRows(table(manPath), R.toMs) : null;
  const rep = buildReport({ raw: act.rows, roster, period, cut, serial, cases, calendar, acctMap, manualMap });
  rep.meta.files = { activity: path.basename(actPath), serial: serPath ? path.basename(serPath) : '', cases: casePath ? path.basename(casePath) : '',
    calendar: calPath ? path.basename(calPath) : '', acctMap: mapPath ? path.basename(mapPath) : '', manual: manPath ? path.basename(manPath) : '',
    roster: path.basename(rosterSrc), header: { hasAtt: act.hasAtt, hasFormType: act.hasFormType } };

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
  const H = rep.health;
  console.log(H ? `가동 장비 ${H.activeCount}대 · PM 커버리지 ${H.pmCoverage}% · 점검 고르기 ${H.pmCV}% · 100대당 고장 ${H.per100}건 · 반복 고장 장비 ${H.chronicRatio}% · 집중관리 후보 ${rep.focus.candidateCount}곳`
    : '가동 장비 지표 없음 — Serial No 파일을 --serial 또는 --dir 로 주면 운영건전성·집중관리대상이 계산됩니다');
  if (!cases) console.log('병원 TOP5(당월, 케이스 기준) 없음 — 케이스 파일을 --cases 또는 --dir 로 주면 계산됩니다');
  const IB = rep.installBlock;
  if (IB) { const D = IB.detail; console.log(`설치(캘린더 기준): 작업 ${D.rows.length}건 · 단품 ${IB.install.total}대(수동 ${IB.install.manualUnits}) · System ${IB.systems.list.length}세트 · 캘린더 미등록 ${D.orphan.length}대 · 중복 제외 ${(D.dupOrphan || []).length}대 · 예정 ${D.tentative.length}건` + (IB.autoFilled.filter(a => a.to).length ? ` · 자동 매핑 ${IB.autoFilled.filter(a => a.to).length}건` : '') + (D.partSkipped ? ` · 부품 행 제외 ${D.partSkipped}` : '')); }
  else console.log(serial ? '설치 현황 없음 — 설치 공유캘린더 내보내기를 --calendar 또는 --dir 로 주면 4장 설치 현황이 계산됩니다' : '설치 현황 없음 — Serial No 파일과 설치 공유캘린더가 모두 필요합니다');
  console.log(`출력: ${out}`);
}
if (require.main === module) { try { main(); } catch (e) { console.error('오류:', e.message); process.exit(1); } }
module.exports = { loadRosterCsv, loadRosterFromDashboard };
