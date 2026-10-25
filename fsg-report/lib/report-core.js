/* 월간·분기 보고서 계산 — 2·3·5장 묶음 (정제_KPI · 정제_KPI월별추이 · 정제_팀별실적 · 정제_케이스분석).
 * 계산의 원본은 fsg-kpi.html의 kpiCore(= fsg-report/kpi-core.js)다. 여기서는 그 결과를 보고서 표 모양으로 집계만 한다.
 * 월간보고 시트 Apps Script(v45~v52)의 computeKPI_ · computeKpiTrend_ · computeTeamSummary_ · computeCaseAnalysis_ 와 같은 값을 내도록 맞췄다.
 * 입력 행은 read-crm.parseActivity 의 모양(t/e = 벽시계를 UTC ms로 둔 값). 기간 판정은 모두 UTC 게터로 한다. */
'use strict';
const { kpiCore } = require('../kpi-core');
const P = require('./period');

const SHEET_TEAMS = ['FS EAST', 'FS WEST', 'FS SOUTH', 'FS CENTRAL'];   // 월간보고 시트의 팀 순서(정제 탭 행 순서)
const PV = { PM: 'PM', REPAIR: '고장 수리', INSTALL: '장비 설치', MOVE_INSTALL: '장비 이전 설치', CAL: 'Calibration' };
const CORR_SERIES = [
  { name: 'XN-Series', prefixes: ['XN-10', 'XN-20'] },
  { name: 'SP-50', prefixes: ['SP-50'] },
  { name: 'CN-Series', prefixes: ['CN-3000', 'CN-6000'] },
];
const EXCLUDED = ['김민결'];
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
  let unmapped = 0; const unmappedDetail = {};
  rows.forEach(x => {
    if (!inMonths(x.t, period.months)) return;
    if (!R.map[x.own]) {
      unmapped++;
      const key = x.own || '(공백)';
      const u = unmappedDetail[key] = unmappedDetail[key] || { count: 0, sample: x.acct || '' };
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
  const team = { rows: teamRows, total, unmapped, instSource: 'CRM 활동',
    unmappedRows: Object.keys(unmappedDetail).map(n => ({ name: n, count: unmappedDetail[n].count, sample: unmappedDetail[n].sample })).sort((a, b) => b.count - a.count) };

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

  return {
    meta: { period: { key: period.key, label: period.label, months: period.months.map(ym => P.lab(ym.y, ym.m)) }, cut: opt.cut || null, teams,
      rows: { raw: raw.length, afterCut: RAWC.length, counted: rows.length }, excluded,
      unmappedRows: rows.filter(x => !x.credits.length).length, eligibleAccounts: CORE.eligible.length },
    kpi, kpiTrend, team, caseAnalysis,
  };
}
module.exports = { buildReport, rosterInfo, cutEndMs, SHEET_TEAMS, PV, CORR_SERIES, round1 };
