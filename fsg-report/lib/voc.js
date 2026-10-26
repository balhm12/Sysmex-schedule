'use strict';
/* 고객 만족도 월 집계 — VOC 공개 대시보드(voc-dashboard.html)와 같은 규칙으로 계산한다.
 * data = Apps Script pushDashboardToFirebase()가 /voc-dashboard/data 에 올린 JSON { total:{월:방문}, visits:{팀:{월:방문}}, recs:[{ts,month,team,fsr,org,q1,q2,q3,avg,comment,flag}], visitAsOf:{월:날짜}, updated, startMonth }
 * 응답률 = 같은 FSR·기관·날짜 응답을 한 방문으로 묶고, CRM 방문건수가 집계된 날짜(visitAsOf)까지만 센 수 ÷ 그 달 방문건수(고장 수리·PM).
 * 개인(FSR) 단위는 내지 않는다 — 팀 단위만(보고서 원칙). */
const round = (v, d) => v == null ? null : Math.round(v * Math.pow(10, d)) / Math.pow(10, d);
const mean = a => a.length ? a.reduce((x, y) => x + y, 0) / a.length : null;
const TEAMS = ['FS EAST', 'FS WEST', 'FS SOUTH', 'FS CENTRAL'];
const DEFAULT_KEYWORDS = ['친절', '신속', '설명', '꼼꼼'];

function summarizeVoc(data, months, opt) {
  opt = opt || {};
  const keywords = opt.keywords || DEFAULT_KEYWORDS, recsAll = (data.recs || []), asOf = m => (data.visitAsOf || {})[m] || '';
  const inRange = r => months.indexOf(r.month) >= 0;
  const within = r => { const a = asOf(r.month); return !a || String(r.ts).slice(0, 10) <= a; };
  const visitCount = R => new Set(R.filter(within).map(r => r.fsr + '|' + (r.org || '') + '|' + String(r.ts).slice(0, 10))).size;
  const visitsFor = t => months.reduce((s, m) => s + (t === 'ALL' ? ((data.total || {})[m] || 0) : (((data.visits || {})[t] || {})[m] || 0)), 0);
  const stats = (R, v) => {
    const n = R.length, q = [1, 2, 3].map(i => mean(R.map(r => r['q' + i]).filter(x => x != null)));
    const perfect = R.filter(r => r.avg === 5).length, low = R.filter(r => Math.min(r.q1, r.q2, r.q3) <= 2).length;
    const resp = visitCount(R);
    return { n, visits: v, responseRate: v ? round(100 * resp / v, 1) : null, avg: round(mean(R.map(r => r.avg).filter(x => x != null)), 2), q: q.map(x => round(x, 2)),
      perfect, perfectPct: n ? round(100 * perfect / n, 1) : null, low, comments: R.filter(r => r.comment && String(r.comment).trim()).length, flag: R.filter(r => r.flag).length };
  };
  const R = recsAll.filter(inRange), all = stats(R, visitsFor('ALL'));
  const teams = TEAMS.map(t => Object.assign({ team: t }, stats(R.filter(r => r.team === t), visitsFor(t))));
  const kw = {}; const commented = R.filter(r => r.comment && String(r.comment).trim());
  keywords.forEach(k => { const c = commented.filter(r => String(r.comment).indexOf(k) >= 0).length; kw[k] = { n: c, pct: commented.length ? round(100 * c / commented.length, 0) : null }; });
  const days = R.map(r => String(r.ts).slice(0, 10)).sort();
  const asOfs = months.map(asOf).filter(Boolean).sort();
  return { months, ...all, teams, keywords: kw, commentTotal: commented.length, firstDay: days[0] || null, lastDay: days[days.length - 1] || null,
    visitAsOf: asOfs.length ? asOfs[asOfs.length - 1] : null, updated: data.updated || null, startMonth: data.startMonth || null, totalRecs: recsAll.length };
}
module.exports = { summarizeVoc, DEFAULT_KEYWORDS, TEAMS };
