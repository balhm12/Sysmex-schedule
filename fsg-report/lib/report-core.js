/* 월간·분기 보고서 계산 — 1차 묶음(2·3·5장: 정제_KPI · KPI월별추이 · 팀별실적 · 케이스분석)
 *                    + 2차 묶음(6·7·8·10장: 트렌드비교 · 수도권 · 엔지니어생산성 · 병원TOP5 · 반복고장TOP5 · 장애요인TOP4 · 장비군에러율 · 운영건전성 · 집중관리대상).
 * 계산의 원본은 fsg-kpi.html의 kpiCore(= fsg-report/kpi-core.js)다. 여기서는 그 결과를 보고서 표 모양으로 집계만 한다.
 * 월간보고 시트 Apps Script(v45~v52)의 computeKPI_ · computeKpiTrend_ · computeTeamSummary_ · computeCaseAnalysis_ 와 같은 값을 내도록 맞췄다.
 * 입력 행은 read-crm.parseActivity 의 모양(t/e = 벽시계를 UTC ms로 둔 값). 기간 판정은 모두 UTC 게터로 한다. */
'use strict';
const { kpiCore } = require('../kpi-core');
const P = require('./period');
const INS = require('./install');

const SHEET_TEAMS = ['FS EAST', 'FS WEST', 'FS SOUTH', 'FS CENTRAL'];   // 월간보고 시트의 팀 순서(정제 탭 행 순서)
const PV = { PM: 'PM', REPAIR: '고장 수리', INSTALL: '장비 설치', MOVE_INSTALL: '장비 이전 설치', CAL: 'Calibration' };
const CORR_SERIES = [
  { name: 'XN-Series', prefixes: ['XN-10', 'XN-20'] },
  { name: 'SP-50', prefixes: ['SP-50'] },
  { name: 'CN-Series', prefixes: ['CN-3000', 'CN-6000'] },
];
const EXCLUDED = ['김민결'];
// 로스터에 없지만 CRM 활동에 담당자로 나오는 타 부서 인원 — 집계 제외(사용자 결정 2026-10-26). 새 이름이 나오면 ⚠로 알린다.
const OTHER_DEPT = ['고신곤', '배점룡', '김상우', 'PMTeam'];
const INTERNAL_ACCOUNTS = ['시스멕스코리아주식회사', '시스멕스코리아', '기타', '-', ''];
const ERROR_EXCLUDE = ['기타', 'others', 'other', '-', ''];
const METRO_TEAMS = ['FS WEST', 'FS EAST'];
const N = { HOSPITAL: 5, REPEAT: 5, ERROR: 4, ENGINEER: 10, FOCUS: 10, CHRONIC: 3, FOCUS_MIN_FLEET: 10, FOCUS_MIN_CHRONIC_RATIO: 0.5 };
const LOAD_CV_EXCLUDE_GRADES = ['팀장'], LOAD_CV_EXCLUDE_NAMES = ['심구'];   // 팀 내 업무량 편차에서 팀장·신입 제외(신입은 이름으로 관리, 매년 갱신)
const REORG = { preFrom: { y: 2025, m: 4 }, preTo: { y: 2026, m: 3 }, postFrom: { y: 2026, m: 4 } };   // 조직개편 전 12개월 고정 · 후 = 2026-04~기준월
const round0 = v => Math.round(v);
const avgOf = a => a.reduce((x, y) => x + y, 0) / a.length;
const stdev = a => { const m = avgOf(a); return Math.sqrt(a.reduce((s, x) => s + (x - m) * (x - m), 0) / a.length); };
const topKeyOf = obj => { let best = '', bc = -1; Object.keys(obj).forEach(k => { if (obj[k] > bc) { best = k; bc = obj[k]; } }); return best; };
function errGroup(model) {
  const u = String(model || '').toUpperCase();
  if (u.indexOf('XN-') === 0 || u.indexOf('XR-') === 0 || u.indexOf('XQ-') === 0) return 'XN/XR';
  if (u.indexOf('SP-') === 0) return 'SP';
  if (u.indexOf('CN-') === 0) return 'CN';
  if (u.indexOf('HISCL') >= 0) return 'HISCL';
  return null;
}
const round1 = v => Math.round(v * 10) / 10;                  // Apps Script round1_ (MTTR·예방정비지수·상관표 재방문율)
const monthOf = ms => { const d = new Date(ms); return { y: d.getUTCFullYear(), m: d.getUTCMonth() + 1 }; };
const inMonths = (ms, months) => { const o = monthOf(ms); return months.some(x => x.y === o.y && x.m === o.m); };

/* 로스터: [[성명, 팀, 직급], ...] → {map, teamInfo} (Apps Script readRoster_ 와 같은 의미) */
function rosterInfo(roster) {
  const map = {}, teamInfo = {};
  roster.forEach(([name, team, grade]) => {
    if (!name) return;
    map[name] = { team, grade };
    if (!teamInfo[team]) teamInfo[team] = { leader: '', count: 0 };
    teamInfo[team].count++;
    if (grade === '팀장') teamInfo[team].leader = name;
  });
  return { map, teamInfo };
}

/* cut: 'YYYY-MM-DD'(CRM 추출일) — 그 다음 날 0시 이후 시작하는 예정 약속은 뺀다(Apps Script prepareAct_·대시보드 dataCutoff) */
function cutEndMs(cut) {
  const m = String(cut || '').match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (m) return Date.UTC(+m[1], +m[2] - 1, +m[3] + 1);
  const n = new Date(); return Date.UTC(n.getFullYear(), n.getMonth(), n.getDate() + 1);
}

function buildReport(opt) {
  const raw = opt.raw, roster = opt.roster, period = typeof opt.period === 'string' ? P.parsePeriod(opt.period) : opt.period;
  const teams = opt.teams || SHEET_TEAMS;
  const cutEnd = cutEndMs(opt.cut);
  const RAWC = raw.filter(r => r.t != null && r.t < cutEnd);
  const CORE = kpiCore(RAWC, roster, { teams, excluded: EXCLUDED });
  const rows = CORE.rows, R = rosterInfo(roster);
  const teamOf = name => CORE.memberTeam[name];

  const excluded = {
    notime: raw.filter(r => r.t == null).length,
    future: raw.filter(r => r.t != null && r.t >= cutEnd).length,
    cancel: RAWC.filter(r => r.st === '취소됨').length,
    online: RAWC.filter(r => r.st !== '취소됨' && CORE.purposeOf(r) === '온라인 정기점검').length,
  };

  /* ① KPI — Apps Script computeKPI_ */
  function computeKPI(months, label) {
    let repairCount = 0, pmCount = 0, repairRows = 0, durS = 0, durN = 0, fails = 0;
    const tm = {}; teams.forEach(t => tm[t] = { durS: 0, durN: 0 });
    rows.forEach(x => {
      if (!inMonths(x.t, months)) return;
      if (x.purpose !== PV.PM && x.purpose !== PV.REPAIR) return;
      const n = x.credits.length;
      if (x.purpose === PV.PM) { pmCount += n; return; }
      repairRows++; repairCount += n;
      if (x.AE === 1) fails++;
      if (x.dur != null) {
        durS += x.dur * n; durN += n;
        x.credits.forEach(c => { const t = teamOf(c); tm[t].durS += x.dur; tm[t].durN++; });
      }
    });
    const inP = x => inMonths(x.t, months);
    const all = CORE.revisitAvg(inP, null);
    const teamRows = teams.map(t => {
      const v = CORE.revisitAvg(inP, t);
      return { team: t, ftfr: v.ftfr, revisit: v.revisit, mttr: tm[t].durN ? round1(tm[t].durS / tm[t].durN) : null };
    });
    return { period: label, ftfr: all.ftfr, revisitRate: all.revisit, mttr: durN ? round1(durS / durN) : null,
      pmRatio: (pmCount + repairCount) ? round1(pmCount / (pmCount + repairCount) * 100) : null,
      repairCount, revisitCount: fails, pmCount, repairRows, teams: teamRows };
  }
  const kpi = computeKPI(period.months, period.label);

  /* ② 12개월 KPI 추이 — computeKpiTrend_ (달마다 computeKPI 그대로) */
  const kpiTrend = P.monthsBack(period, 12).map(ym => { const l = P.lab(ym.y, ym.m); return { label: l, kpi: computeKPI([ym], l) }; });

  /* ③ 팀별 실적 — computeTeamSummary_ (설치 칸은 CRM 활동 수. 캘린더 기준 설치는 2차 묶음에서) */
  const pm = {}, as_ = {}, inst = {}; teams.forEach(t => { pm[t] = 0; as_[t] = 0; inst[t] = 0; });
  let unmapped = 0, unmappedOther = 0; const unmappedDetail = {};
  rows.forEach(x => {
    if (!inMonths(x.t, period.months)) return;
    if (!R.map[x.own]) {
      unmapped++;
      const key = x.own || '(공백)', other = OTHER_DEPT.indexOf(key) >= 0; if (other) unmappedOther++;
      const u = unmappedDetail[key] = unmappedDetail[key] || { count: 0, sample: x.acct || '', other };
      u.count++;
    }
    x.credits.forEach(c => {
      const t = teamOf(c);
      if (x.purpose === PV.PM) pm[t]++;
      else if (x.purpose === PV.REPAIR) as_[t]++;
      else if (x.purpose === PV.INSTALL || x.purpose === PV.MOVE_INSTALL) inst[t]++;
    });
  });
  let total = 0;
  const teamRows = teams.map(t => {
    const ti = R.teamInfo[t] || { leader: '', count: 0 }, sum = inst[t] + pm[t] + as_[t];
    total += sum;
    return { team: t, leader: ti.leader, count: ti.count, inst: inst[t], instCrm: inst[t], pm: pm[t], as_: as_[t], sum, perHead: ti.count ? round1(sum / ti.count) : 0 };
  });
  const team = { rows: teamRows, total, unmapped, unmappedOther, instSource: 'CRM 활동', instUnassigned: 0,
    unmappedRows: Object.keys(unmappedDetail).map(n => ({ name: n, count: unmappedDetail[n].count, sample: unmappedDetail[n].sample, other: unmappedDetail[n].other })).sort((a, b) => b.count - a.count) };

  /* ④ 케이스 분석 — computeCaseAnalysis_: 12개월 추이(수리·PM·Calibration, 인정 인원 수) + 시리즈 재방문율 상관표(기간 vs 직전 월) */
  const months12 = P.monthsBack(period, 12), labels12 = months12.map(ym => P.lab(ym.y, ym.m));
  const rp = {}, pmm = {}, cal = {}; labels12.forEach(l => { rp[l] = 0; pmm[l] = 0; cal[l] = 0; });
  const seriesOf = model => { const m = String(model || ''); for (const g of CORR_SERIES) for (const p of g.prefixes) if (m.indexOf(p) === 0) return g.name; return null; };
  const prev = P.prevMonth(period), prevMonths = [prev];
  const blank = () => ({ repair: 0, revisit: 0, den: 0 });
  const cur = blank(), prv = blank(); cur.series = {}; prv.series = {};
  CORR_SERIES.forEach(g => { cur.series[g.name] = blank(); prv.series[g.name] = blank(); });
  rows.forEach(x => {
    if (inMonths(x.t, months12)) {
      const l = P.lab(monthOf(x.t).y, monthOf(x.t).m), n = x.credits.length;
      if (x.purpose === PV.PM) pmm[l] += n; else if (x.purpose === PV.REPAIR) rp[l] += n; else if (x.purpose === PV.CAL) cal[l] += n;
    }
    if (x.purpose !== PV.REPAIR && x.purpose !== PV.PM) return;
    const inCur = inMonths(x.t, period.months), inPrev = inMonths(x.t, prevMonths);
    if (!inCur && !inPrev) return;
    const b = inCur ? cur : prv, s = seriesOf(x.r.prod);
    [b].concat(s ? [b.series[s]] : []).forEach(bk => {
      if (x.purpose === PV.REPAIR) bk.repair++;
      if (x.inRec) { bk.den++; if (x.AD === 1) bk.revisit++; }
    });
  });
  const rate = s => s.den ? round1(s.revisit / s.den * 100) : 0;
  const delta = (c, p) => { const d = round1(c - p); return (d > 0 ? '+' : '') + d + '%p'; };
  const corrRows = CORR_SERIES.map(g => { const c = cur.series[g.name], p = prv.series[g.name];
    return [g.name, c.repair, c.revisit, rate(c), p.den ? rate(p) : '-', p.den ? delta(rate(c), rate(p)) : '-']; });
  corrRows.push(['(전체 평균)', cur.repair, cur.revisit, rate(cur), prv.den ? rate(prv) : '-', prv.den ? delta(rate(cur), rate(prv)) : '-']);
  const caseAnalysis = { monthRows: labels12.map(l => [l, rp[l], pmm[l], cal[l]]), corrRows, prevLabel: P.lab(prev.y, prev.m) };

  /* ════════ 2차 묶음 ════════ 공통: 최근 12개월 = 기간 끝 달까지 12개월, 당월/기간 = period.months */
  const inT12 = x => inMonths(x.t, months12), inPer = x => inMonths(x.t, period.months);
  const endMk = P.mk(period.y, period.m), monthsAgo = ms => { const o = monthOf(ms); return endMk - P.mk(o.y, o.m); };
  const gradeOf = name => (R.map[name] || {}).grade || '';

  /* ⑬ 트렌드 비교 — computeTrendCompare_: 조직개편 전(2025-04~2026-03) vs 후(2026-04~기준월) 월평균, 인정 인원 수 */
  const trendCompare = (() => {
    const pmK = {}, rpK = {};
    rows.forEach(x => { const o = monthOf(x.t), k = P.mk(o.y, o.m), n = x.credits.length;
      if (x.purpose === PV.PM) pmK[k] = (pmK[k] || 0) + n; else if (x.purpose === PV.REPAIR) rpK[k] = (rpK[k] || 0) + n; });
    const preKeys = [], postKeys = [];
    for (let k = P.mk(REORG.preFrom.y, REORG.preFrom.m); k <= P.mk(REORG.preTo.y, REORG.preTo.m); k++) preKeys.push(k);
    for (let k = P.mk(REORG.postFrom.y, REORG.postFrom.m); k <= endMk; k++) postKeys.push(k);
    const av = (keys, o) => keys.length ? keys.reduce((s, k) => s + (o[k] || 0), 0) / keys.length : 0;
    const prePM = av(preKeys, pmK), postPM = av(postKeys, pmK), preRP = av(preKeys, rpK), postRP = av(postKeys, rpK);
    const preR = prePM / (prePM + preRP) * 100, postR = postPM / (postPM + postRP) * 100;
    return { prePM: round1(prePM), postPM: round1(postPM), pmDelta: round1((postPM - prePM) / prePM * 100),
      preRP: round1(preRP), postRP: round1(postRP), rpDelta: round1((postRP - preRP) / preRP * 100),
      prePMRatio: round1(preR), postPMRatio: round1(postR), pmRatioDelta: round1(postR - preR),
      postKeyLabels: postKeys.map(k => { const ym = P.toYM(k); return P.lab(ym.y, ym.m); }) };
  })();

  /* ⑭ 수도권(WEST·EAST) 최근 6개월 PM/A·S — computeMetro_ */
  const metro = (() => {
    const months6 = P.monthsBack(period, 6), labels = months6.map(ym => P.lab(ym.y, ym.m)), data = {};
    METRO_TEAMS.forEach(t => labels.forEach(l => data[t + '|' + l] = { pm: 0, rp: 0 }));
    rows.forEach(x => { const o = monthOf(x.t), l = P.lab(o.y, o.m);
      x.credits.forEach(c => { const cell = data[teamOf(c) + '|' + l]; if (!cell) return; if (x.purpose === PV.PM) cell.pm++; else if (x.purpose === PV.REPAIR) cell.rp++; }); });
    const out = []; METRO_TEAMS.forEach(t => labels.forEach(l => { const c = data[t + '|' + l]; out.push([l, t.replace('FS ', ''), c.pm, c.rp]); }));
    return { rows: out, months: labels };
  })();

  /* ⑤ 엔지니어 생산성 — computeEngineerProductivity_ (최근 1년 · 기간), 담당자+필수 참석자 각각, 시간은 종료-시작(제한 없음) */
  const engineer = sel => {
    const per = {};
    rows.forEach(x => { if (!sel(x)) return;
      x.credits.forEach(c => { const v = per[c] = per[c] || { count: 0, hours: 0, repair: 0, pm: 0 }; v.count++;
        if (x.e != null) v.hours += (x.e - x.t) / 3600000; if (x.purpose === PV.REPAIR) v.repair++; else if (x.purpose === PV.PM) v.pm++; }); });
    return Object.keys(per).filter(n => !!R.map[n]).map(n => { const v = per[n], info = R.map[n];
      return { name: n, team: info.team, grade: info.grade, count: v.count, hours: round1(v.hours), repairPct: round1(v.repair / v.count * 100), pmPct: round1(v.pm / v.count * 100) }; })
      .sort((a, b) => b.count - a.count).slice(0, N.ENGINEER);
  };
  const engYear = engineer(inT12), engMonth = engineer(inPer);

  /* ⑧ 병원 TOP5 — 최근 1년(활동 기준, 모든 목적) · 기간(활동 기준 — 2026-10-26부터 케이스 파일을 쓰지 않는다. 시트는 케이스 기준이었음), 내부 계정 제외 */
  const topAcc = (list, pick) => { const acc = {}; list.forEach(it => { const a = pick(it); if (!a || INTERNAL_ACCOUNTS.includes(a)) return; acc[a] = (acc[a] || 0) + 1; });
    return Object.keys(acc).map(a => ({ account: a, count: acc[a] })).sort((x, y) => y.count - x.count).slice(0, N.HOSPITAL); };
  const hospYear = topAcc(rows.filter(inT12), x => x.acct);
  const hospMonth = topAcc(rows.filter(inPer), x => x.acct);

  /* ⑨ 반복 고장 장비 TOP5 — S/N 단위, 고장 수리 행 수 (최근 1년 · 기간) */
  const repeat = sel => { const rep = {};
    rows.forEach(x => { if (x.purpose !== PV.REPAIR || !sel(x) || !x.sn) return; const v = rep[x.sn] = rep[x.sn] || { count: 0, model: x.r.prod, account: x.acct }; v.count++; v.model = x.r.prod; v.account = x.acct; });
    return Object.keys(rep).map(sn => ({ serial: sn, model: rep[sn].model, account: rep[sn].account, count: rep[sn].count })).sort((a, b) => b.count - a.count).slice(0, N.REPEAT); };
  const repeatYear = repeat(inT12), repeatMonth = repeat(inPer);

  /* ⑩ 장애 요인 TOP4 — 고장 수리 행의 Error 1~3, 기타·others·'-' 제외 */
  const errorTop = sel => { const cnt = {}; let total = 0;
    rows.forEach(x => { if (x.purpose !== PV.REPAIR || !sel(x)) return;
      [x.r.err, x.r.err2, x.r.err3].forEach(e => { const s0 = String(e || '').trim(); if (!s0 || ERROR_EXCLUDE.includes(s0.toLowerCase())) return; cnt[s0] = (cnt[s0] || 0) + 1; total++; }); });
    return { rows: Object.keys(cnt).map(e => ({ error: e, count: cnt[e] })).sort((a, b) => b.count - a.count).slice(0, N.ERROR), total }; };
  const errYear = errorTop(inT12), errMonth = errorTop(inPer);

  /* ⑪ 장비군별 월별 에러율(최근 12개월) = 고장 수리 행 ÷ 그 장비군 전체 활동 행 */
  const errRate = (() => { const groups = ['XN/XR', 'SP', 'CN', 'HISCL'], tot = {}, rp2 = {};
    groups.forEach(g => { tot[g] = {}; rp2[g] = {}; labels12.forEach(l => { tot[g][l] = 0; rp2[g][l] = 0; }); });
    rows.forEach(x => { if (!inT12(x)) return; const g = errGroup(x.r.prod); if (!g) return; const o = monthOf(x.t), l = P.lab(o.y, o.m); tot[g][l]++; if (x.purpose === PV.REPAIR) rp2[g][l]++; });
    return { groups, months: labels12.map(l => [l].concat(groups.map(g => tot[g][l] ? round1(rp2[g][l] / tot[g][l] * 100) : 0))) }; })();

  /* 가동 장비(자산 '사용' ∩ 최근 12개월 서비스 이력) — buildActiveFleet_. Serial 파일이 없으면 null */
  const serial = opt.serial || null;
  let fleet = null, health = null, focus = null;
  if (serial) {
    const usedPairs = {};
    serial.forEach(s2 => { if (s2.state !== '사용' || !s2.sn || !s2.acct) return; usedPairs[s2.sn + '|||' + s2.acct] = { model: s2.model, account: s2.acct, install: s2.first != null ? s2.first : s2.install }; });
    const touched = {}, repairCount = {}, pmTouched = {}, pmRecent = {};
    rows.forEach(x => { if (!inT12(x) || !x.sn || !x.acct) return; const key = x.sn + '|||' + x.acct; if (!usedPairs[key]) return; touched[key] = true;
      if (x.purpose === PV.REPAIR) repairCount[key] = (repairCount[key] || 0) + 1;
      if (x.purpose === PV.PM) { pmTouched[key] = true; if (monthsAgo(x.t) < 6) pmRecent[key] = true; } });
    const activeKeys = Object.keys(usedPairs).filter(k => touched[k]), pmActiveKeys = activeKeys.filter(k => pmRecent[k]);
    fleet = { usedPairs, activeKeys, activeCount: activeKeys.length, pmActiveKeys, pmActiveCount: pmActiveKeys.length, repairCount, pmTouched };

    /* ⑦ 운영 건전성 5종 — computeHealthMetrics_ */
    const activeCount = fleet.activeCount;
    const pmCovered = activeKeys.filter(k => pmTouched[k]).length;
    const pmByMonth = {}; labels12.forEach(l => pmByMonth[l] = 0);
    rows.forEach(x => { if (x.purpose !== PV.PM || !inT12(x)) return; const o = monthOf(x.t); pmByMonth[P.lab(o.y, o.m)]++; });
    const pmVals = labels12.map(l => pmByMonth[l]);
    let lastMk = null; rows.forEach(x => { const o = monthOf(x.t), k = P.mk(o.y, o.m); if (lastMk == null || k > lastMk) lastMk = k; });
    const nMonths = (lastMk == null ? period.months.length : period.months.filter(ym => P.mk(ym.y, ym.m) <= lastMk).length) || 1;   // monthsWithData_
    const chronicUnits = activeKeys.filter(k => (repairCount[k] || 0) >= N.CHRONIC).length;
    const perPerson = {}; rows.forEach(x => { if (!inT12(x)) return; x.credits.forEach(c => perPerson[c] = (perPerson[c] || 0) + 1); });
    const teamCV = {}, teamStat = {};
    teams.forEach(t => { const vals = [];
      Object.keys(R.map).forEach(name => { const info = R.map[name]; if (info.team !== t || LOAD_CV_EXCLUDE_GRADES.includes(info.grade) || LOAD_CV_EXCLUDE_NAMES.includes(name)) return; if (perPerson[name] != null) vals.push(perPerson[name]); });
      if (vals.length > 1) { teamCV[t] = round0(stdev(vals) / avgOf(vals) * 100); teamStat[t] = { avg: Math.round(avgOf(vals)), min: Math.min(...vals), max: Math.max(...vals), n: vals.length }; }
      else { teamCV[t] = null; teamStat[t] = null; } });
    health = { activeCount, pmCoverage: activeCount ? round1(pmCovered / activeCount * 100) : null,
      pmCV: pmVals.length > 1 ? round0(stdev(pmVals) / avgOf(pmVals) * 100) : null,
      per100: (activeCount && nMonths) ? round1(kpi.repairRows / nMonths / activeCount * 100) : null,
      chronicUnits, chronicRatio: activeCount ? round1(chronicUnits / activeCount * 100) : null, teamCV, teamStat, nMonths };

    /* ⑥ 집중관리 대상 — computeFocusAccounts_: PM 이력 장비 10대↑ & 반복 고장 비율 50%↑, 비율 → 수리 건수 순 상위 10 */
    const byAccount = {}, endOfPeriod = Date.UTC(period.y, period.m, 0);
    pmActiveKeys.forEach(key => { const acc = usedPairs[key].account, v = byAccount[acc] || { fleet: 0, chronic: 0, repairs: 0, oldUnits: 0 };
      v.fleet++; const rc = repairCount[key] || 0; v.repairs += rc; if (rc >= N.CHRONIC) v.chronic++;
      const inst = usedPairs[key].install; if (inst != null && (endOfPeriod - inst) / (365.25 * 86400000) >= 5) v.oldUnits++; byAccount[acc] = v; });
    let totalFleet = 0, totalRepairs = 0; Object.keys(byAccount).forEach(a => { totalFleet += byAccount[a].fleet; totalRepairs += byAccount[a].repairs; });
    const teamByAccount = {};
    rows.forEach(x => { if (!byAccount[x.acct]) return; const info = R.map[x.own]; if (!info) return; const t = teamByAccount[x.acct] = teamByAccount[x.acct] || {}; t[info.team] = (t[info.team] || 0) + 1; });
    const candidates = Object.keys(byAccount).filter(a => { const v = byAccount[a]; return v.fleet >= N.FOCUS_MIN_FLEET && v.chronic / v.fleet >= N.FOCUS_MIN_CHRONIC_RATIO; })
      .sort((a, b) => { const ra = byAccount[a].chronic / byAccount[a].fleet, rb = byAccount[b].chronic / byAccount[b].fleet; return rb !== ra ? rb - ra : byAccount[b].repairs - byAccount[a].repairs; });
    focus = { candidateCount: candidates.length, avgPerUnit: round1(totalFleet ? totalRepairs / totalFleet : 0), totalFleet,
      rows: candidates.slice(0, N.FOCUS).map(a => { const v = byAccount[a], oldPct = v.fleet ? v.oldUnits / v.fleet : 0, ratio = v.chronic / v.fleet;
        let action = oldPct >= 0.5 ? '반복 고장 + 교체 협의' : '반복 고장 집중 관리'; if (oldPct >= 0.7 && ratio < 0.75) action = '교체 협의 우선';
        return { account: a, team: teamByAccount[a] ? topKeyOf(teamByAccount[a]) : '', fleet: v.fleet, chronic: v.chronic, chronicPct: round1(ratio * 100), repairs: v.repairs, oldUnits: v.oldUnits, oldPct: round1(oldPct * 100), action }; }) };
  }

  /* ════════ 3차 묶음 ════════ 4장 설치 현황 — 설치 공유캘린더 + 자산대장 + 기관명매핑 + 설치_수동입력 (lib/install.js) */
  let installBlock = null;
  if (opt.calendar && opt.calendar.length && serial) {
    installBlock = INS.runInstall({ cal: opt.calendar, serial, period, rows, rosterMap: R.map, team });
  }

  return {
    meta: { period: { key: period.key, label: period.label, months: period.months.map(ym => P.lab(ym.y, ym.m)) }, cut: opt.cut || null, teams,
      rows: { raw: raw.length, afterCut: RAWC.length, counted: rows.length }, excluded,
      unmappedRows: rows.filter(x => !x.credits.length).length, eligibleAccounts: CORE.eligible.length },
    kpi, kpiTrend, team, caseAnalysis,
    trendCompare, metro, engYear, engMonth, hospYear, hospMonth, repeatYear, repeatMonth, errYear, errMonth, errRate,
    fleet: fleet ? { activeCount: fleet.activeCount, pmActiveCount: fleet.pmActiveCount } : null, health, focus,
    installBlock,
    inputs: { serial: !!serial, calendar: !!(opt.calendar && opt.calendar.length) },
  };
}
module.exports = { buildReport, rosterInfo, cutEndMs, errGroup, SHEET_TEAMS, PV, CORR_SERIES, METRO_TEAMS, N, round1 };
