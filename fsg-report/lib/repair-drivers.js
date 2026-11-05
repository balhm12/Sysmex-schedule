/* A/S(고장 수리) 증가 요인 분해 — json `repairDrivers` (2026-11-05 요청: 「PM이 늘었는데 A/S는 왜 늘었나」).
 * 기존 키는 건드리지 않고 새 키만 낸다. 개인(엔지니어)별 값은 만들지 않는다(기관은 상위 5개까지, 팀은 4팀 합계).
 *
 * 비교 기간(같은 정의): 개편 전 = REORG.preFrom~preTo(2025.4~2026.3, 12개월) 월평균 · 개편 후 = REORG.postFrom~기준월 월평균 · 당월 · 전월 · 전년 동월.
 * 수리 건수 = 인정 인원 수(담당자+필수 참석자, 한 방문에 둘이면 2) — `caseAnalysis.monthRows`·`trendCompare`와 같은 값. 취소·온라인 정기점검 제외(rows 가 이미 그렇다).
 * 분해 4개는 아래 우선순위로 한 번만 센다(합 = 수리 건수):
 *   ① 설치 후 12개월 이내 장비의 수리 — Serial 설치일자(없으면 초도설치) 기준 0 ≤ 수리일 − 설치일 < 365일
 *   ② 반복 고장 장비의 수리 — 같은 S/N(+거래처)이 해당 기간(창) 안에서 수리 2회 이상(그 S/N 의 수리 전부)
 *   ③ PM 후 30일 내 같은 S/N 수리 — 같은 S/N 의 PM 시작일이 수리 시작 전 30일 안
 *   ④ 그 외(S/N 없음 포함)
 * 주의: ②는 창 길이(개편 전 12개월 vs 개편 후 N개월)에 따라 달라진다 — 긴 창일수록 높다. 길이와 무관하게 볼 수 있게 「같은 달 안 2회 이상」(repeatSameMonth)도 함께 낸다.
 */
'use strict';
const DAY = 86400000, YEAR = 365 * DAY, PM_DAYS = 30;
const GROUPS = ['XN/XR', 'SP-50', 'SP 기타', 'CN', 'HISCL', '기타'];
const groupOfModel = m => { const s = String(m || '').toUpperCase().replace(/\s+/g, '');
  if (/^X[NR]/.test(s)) return 'XN/XR'; if (/^SP-?50/.test(s)) return 'SP-50'; if (/^SP/.test(s)) return 'SP 기타'; if (/^CN/.test(s)) return 'CN'; if (/^HISCL/.test(s)) return 'HISCL'; return '기타'; };

function build(o) {
  const { rows, serial, period, REORG, P, teamOf, PV, internal, round1, monthOf, expect } = o;
  const warnings = [], endMk = P.mk(period.y, period.m);
  const range = (a, b) => { const k = []; for (let i = a; i <= b; i++) k.push(i); return k; };
  const lab = k => { const ym = P.toYM(k); return P.lab(ym.y, ym.m); };
  const mkOf = x => { const d = monthOf(x.t); return P.mk(d.y, d.m); };
  const prevYM = P.prevMonth(period);
  const KEYS = {
    pre: range(P.mk(REORG.preFrom.y, REORG.preFrom.m), P.mk(REORG.preTo.y, REORG.preTo.m)),
    post: range(P.mk(REORG.postFrom.y, REORG.postFrom.m), endMk),
    cur: period.months.map(ym => P.mk(ym.y, ym.m)),
    prev: [P.mk(prevYM.y, prevYM.m)],
  };
  KEYS.yoy = KEYS.cur.map(k => k - 12);
  const NAMES = { pre: '개편 전', post: '개편 후', cur: '당월', prev: '전월', yoy: '전년 동월' };
  const keyLabel = k => k.length > 1 ? lab(k[0]) + '~' + lab(k[k.length - 1]) : lab(k[0]);
  const key = x => (x.sn && x.acct) ? x.sn + '|' + x.acct : null;

  // 자료가 있는 달(행이 하나라도) — 없는 달은 비우지 않고 알린다(값을 추정해 채우지 않음)
  const dataMonths = new Set(rows.map(mkOf));
  const missing = {}; Object.keys(KEYS).forEach(w => { missing[w] = KEYS[w].filter(k => !dataMonths.has(k)).map(lab); });

  const repairs = rows.filter(x => x.purpose === PV.REPAIR), pms = rows.filter(x => x.purpose === PV.PM);
  const pmTimes = {}; pms.forEach(x => { const k = key(x); if (k) (pmTimes[k] = pmTimes[k] || []).push(x.t); });
  const inst = {}; let instAny = false;
  (serial || []).forEach(s => { if (!s.sn || !s.acct) return; const d = s.install != null ? s.install : s.first; if (d != null) { inst[s.sn + '|' + s.acct] = d; instAny = true; } });
  const hasPm30 = (k, t) => (pmTimes[k] || []).some(tp => tp < t && t - tp <= PM_DAYS * DAY);
  const wset = w => new Set(KEYS[w]), inW = (w, x) => wset(w).has(mkOf(x));
  const avg = (v, w) => KEYS[w].length ? v / KEYS[w].length : 0;
  const r1 = v => round1(v);

  function windowStats(w) {
    const S = wset(w), reps = repairs.filter(x => S.has(mkOf(x)) && x.credits.length);
    const cnt = {}, cntM = {};
    reps.forEach(x => { const k = key(x); if (!k) return; cnt[k] = (cnt[k] || 0) + 1; const m = mkOf(x) + '|' + k; cntM[m] = (cntM[m] || 0) + 1; });
    const b = { install12: 0, repeat: 0, pm30: 0, other: 0 }; let total = 0, sameMonth = 0, follow = 0, instKnown = 0;
    reps.forEach(x => { const n = x.credits.length, k = key(x); total += n;
      const ins = k ? inst[k] : null; if (ins != null) instKnown += n;
      const isInst = ins != null && x.t >= ins && x.t - ins < YEAR, isRep = !!k && cnt[k] >= 2, isPm = !!k && hasPm30(k, x.t);
      if (isPm) follow += n; if (k && cntM[mkOf(x) + '|' + k] >= 2) sameMonth += n;
      if (isInst) b.install12 += n; else if (isRep) b.repeat += n; else if (isPm) b.pm30 += n; else b.other += n; });
    const pmN = pms.filter(x => S.has(mkOf(x))).reduce((t, x) => t + x.credits.length, 0);
    const repairRows = repairs.filter(x => S.has(mkOf(x))).length;
    const per = {}, share = {}; Object.keys(b).forEach(k => { per[k] = r1(avg(b[k], w)); share[k] = total ? r1(b[k] / total * 100) : null; });
    return { label: NAMES[w] + ' ' + keyLabel(KEYS[w]), months: KEYS[w].length, complete: missing[w].length === 0, missingMonths: missing[w],
      total, perMonth: r1(avg(total, w)), buckets: b, bucketsPerMonth: per, share,
      repeatSameMonth: { total: sameMonth, perMonth: r1(avg(sameMonth, w)) },
      pmFollow: { pm: pmN, repairsAfterPm: follow, per100Pm: pmN ? r1(follow / pmN * 100) : null },
      repairRows, installKnownPct: total ? r1(instKnown / total * 100) : null };
  }
  const W = {}; Object.keys(KEYS).forEach(w => { W[w] = windowStats(w); });

  // 증가분 — 개편 전 월평균 대비 개편 후 월평균
  const dTotal = W.post.perMonth - W.pre.perMonth;
  const increase = { perMonthPre: W.pre.perMonth, perMonthPost: W.post.perMonth, delta: r1(dTotal), deltaPct: W.pre.perMonth ? r1(dTotal / W.pre.perMonth * 100) : null,
    byBucket: Object.keys(W.pre.buckets).map(k => { const d = avg(W.post.buckets[k], 'post') - avg(W.pre.buckets[k], 'pre'); return { key: k, delta: r1(d), shareOfIncrease: dTotal ? r1(d / dTotal * 100) : null }; }) };

  // 장비군별
  const byGroup = w => { const S = wset(w), g = {}; GROUPS.forEach(k => g[k] = 0);
    repairs.forEach(x => { if (!S.has(mkOf(x)) || !x.credits.length) return; g[groupOfModel(x.r && x.r.prod)] += x.credits.length; }); return g; };
  const G = { pre: byGroup('pre'), post: byGroup('post'), cur: byGroup('cur'), prev: byGroup('prev') };
  const groups = GROUPS.map(k => { const pre = avg(G.pre[k], 'pre'), post = avg(G.post[k], 'post'), d = post - pre;
    return { group: k, preTotal: G.pre[k], postTotal: G.post[k], pre: r1(pre), post: r1(post), delta: r1(d), deltaPct: pre ? r1(d / pre * 100) : null, shareOfIncrease: dTotal ? r1(d / dTotal * 100) : null, cur: G.cur[k], prev: G.prev[k] }; });

  // 기관(상위 5개, 증가분 기준 — 기관명만, 개인명 없음) · 팀(4팀 합계)
  const acc = (w) => { const S = wset(w), a = {}; repairs.forEach(x => { if (!S.has(mkOf(x)) || !x.credits.length || !x.acct || (internal || []).includes(x.acct)) return; a[x.acct] = (a[x.acct] || 0) + x.credits.length; }); return a; };
  const aPre = acc('pre'), aPost = acc('post'), names = new Set(Object.keys(aPre).concat(Object.keys(aPost)));
  const topAccounts = [...names].map(n => { const pre = avg(aPre[n] || 0, 'pre'), post = avg(aPost[n] || 0, 'post'), d = post - pre;
    return { account: n, pre: r1(pre), post: r1(post), delta: r1(d), shareOfIncrease: dTotal ? r1(d / dTotal * 100) : null, _d: d }; })
    .filter(x => x._d > 0).sort((a, b) => b._d - a._d || (a.account < b.account ? -1 : 1)).slice(0, 5).map(x => { delete x._d; return x; });
  const byTeam = w => { const S = wset(w), t = {}; repairs.forEach(x => { if (!S.has(mkOf(x))) return; x.credits.forEach(c => { const k = teamOf(c); if (k) t[k] = (t[k] || 0) + 1; }); }); return t; };
  const tPre = byTeam('pre'), tPost = byTeam('post');
  const teams = Object.keys(Object.assign({}, tPre, tPost)).sort().map(k => { const pre = avg(tPre[k] || 0, 'pre'), post = avg(tPost[k] || 0, 'post'), d = post - pre;
    return { team: k, preTotal: tPre[k] || 0, postTotal: tPost[k] || 0, pre: r1(pre), post: r1(post), delta: r1(d), deltaPct: pre ? r1(d / pre * 100) : null, shareOfIncrease: dTotal ? r1(d / dTotal * 100) : null }; });

  // 가동 장비 100대당 수리(방문 건수 기준 — 대시보드 「MTBF (100대당 월 고장)」과 같은 식): 개편 전 = 개편 전 12개월 가동 장비, 개편 후 = 기준월까지 12개월 가동 장비(= health.activeCount)
  let activeFleet = null;
  if (serial) {
    const used = {}; serial.forEach(s => { if (s.state === '사용' && s.sn && s.acct) used[s.sn + '|' + s.acct] = true; });
    const fleetAt = keys => { const S = new Set(keys), t = {}; rows.forEach(x => { const k = key(x); if (k && used[k] && S.has(mkOf(x))) t[k] = true; }); return Object.keys(t).length; };
    const fPre = fleetAt(KEYS.pre), fPost = fleetAt(range(endMk - 11, endMk));
    activeFleet = { preActive: fPre, postActive: fPost,
      pre: fPre ? r1(W.pre.repairRows / KEYS.pre.length / fPre * 100) : null, post: fPost ? r1(W.post.repairRows / KEYS.post.length / fPost * 100) : null,
      note: '수리 방문 건수(행) ÷ 개월 수 ÷ 가동 장비 × 100. 가동 장비 = Serial 「사용」 중 그 시점까지 12개월에 서비스 이력이 있는 장비(현재 Serial 기준이라 과거 시점은 근사). 인정 인원 수가 아니라 방문 행 수라 위 건수와 단위가 다르다' };
  } else warnings.push('repairDrivers.activeFleet — Serial 없음: 가동 장비 100대당 수리를 비움');

  // Calibration·Application 같은 기준 비교(개편 전 12개월 월평균 vs 개편 후) — 비중 = 해당 건수 ÷ 전체 활동 건수(인정 인원 수, 모든 목적)
  const appPurposes = new Set(); rows.forEach(x => { if (/^application/i.test(String(x.purpose || ''))) appPurposes.add(x.purpose); });
  const calOf = w => { const S = wset(w); let cal = 0, app = 0, all = 0, pm = 0, rp = 0;
    rows.forEach(x => { if (!S.has(mkOf(x))) return; const n = x.credits.length; all += n;
      if (x.purpose === PV.CAL) cal += n; else if (appPurposes.has(x.purpose)) app += n; else if (x.purpose === PV.PM) pm += n; else if (x.purpose === PV.REPAIR) rp += n; });
    const sh = v => all ? r1(v / all * 100) : null;
    return { months: KEYS[w].length, complete: missing[w].length === 0, all, allPerMonth: r1(avg(all, w)),
      calibration: { total: cal, perMonth: r1(avg(cal, w)), sharePct: sh(cal) }, application: appPurposes.size ? { total: app, perMonth: r1(avg(app, w)), sharePct: sh(app) } : null,
      pm: { total: pm, perMonth: r1(avg(pm, w)), sharePct: sh(pm) }, repair: { total: rp, perMonth: r1(avg(rp, w)), sharePct: sh(rp) } }; };
  const CW = { pre: calOf('pre'), post: calOf('post'), cur: calOf('cur'), prev: calOf('prev'), yoy: calOf('yoy') };
  const dpct = (a, b) => b ? r1((a - b) / b * 100) : null;
  const calCompare = { windows: CW, applicationPurposes: [...appPurposes].sort(),
    delta: { calibrationPerMonth: r1(CW.post.calibration.perMonth - CW.pre.calibration.perMonth), calibrationPct: dpct(CW.post.calibration.perMonth, CW.pre.calibration.perMonth),
      applicationPerMonth: CW.post.application ? r1(CW.post.application.perMonth - CW.pre.application.perMonth) : null, applicationPct: CW.post.application ? dpct(CW.post.application.perMonth, CW.pre.application.perMonth) : null },
    basis: 'Calibration = 목적 「Calibration」(원격 Calibration 제외 — 5장 12개월 추이와 같음) · Application = 목적이 「Application」으로 시작하는 활동 · 비중 = 해당 건수 ÷ 전체 활동 건수(인정 인원 수, 취소·온라인 정기점검 제외) · 월평균 = 합 ÷ 달 수' };
  if (!appPurposes.size) warnings.push('repairDrivers.calCompare — 활동 목적에 「Application」이 한 건도 없어 Application 값을 비움(목적 이름이 다르면 알려 주세요)');

  // 합계 검증 — 분해 4개 합 = 수리 건수, 그리고 기존 값(trendCompare·caseAnalysis.monthRows)과 같아야 한다
  const checks = {};
  Object.keys(W).forEach(w => { const s = W[w], sum = s.buckets.install12 + s.buckets.repeat + s.buckets.pm30 + s.buckets.other; if (sum !== s.total) warnings.push(`repairDrivers.${w} — 분해 합(${sum})이 수리 건수(${s.total})와 다름`); });
  const cmp = (name, got, want) => { if (want == null) return; const ok = Math.abs(got - want) < 0.06; checks[name] = { got, expected: want, ok }; if (!ok) warnings.push(`repairDrivers.${name} — 월평균 ${got} 이(가) 기존 값 ${want} 과 다름`); };
  if (expect) { cmp('pre', W.pre.perMonth, expect.preRP); cmp('post', W.post.perMonth, expect.postRP); if (expect.curRepair != null && KEYS.cur.length === 1) checks.cur = { got: W.cur.total, expected: expect.curRepair, ok: W.cur.total === expect.curRepair };
    if (checks.cur && !checks.cur.ok) warnings.push(`repairDrivers.cur — 당월 수리 ${W.cur.total} 이(가) caseAnalysis.monthRows ${expect.curRepair} 과 다름`); }
  ['pre', 'post', 'cur', 'prev', 'yoy'].forEach(w => { if (missing[w].length) warnings.push(`repairDrivers.${w} — 활동 자료가 없는 달 ${missing[w].join(', ')}: 그 달은 0건으로 센 평균이라 낮게 나올 수 있음(값을 추정해 채우지 않음)`); });
  if (!instAny) warnings.push('repairDrivers — Serial 설치일자가 없어 「설치 후 12개월 이내」를 셀 수 없음(그 건은 다른 항목으로 분류됨)');
  if (W.cur.installKnownPct != null && W.cur.installKnownPct < 80) warnings.push(`repairDrivers — 당월 수리 중 설치일을 아는 장비 몫이 ${W.cur.installKnownPct}% 뿐이라 「설치 12개월 이내」가 낮게 나올 수 있음`);

  const basis = {
    windows: '개편 전 = ' + keyLabel(KEYS.pre) + ' 12개월 월평균, 개편 후 = ' + keyLabel(KEYS.post) + ' 월평균, 당월·전월·전년 동월은 그 달(들) 값. 월평균 = 합 ÷ 달 수',
    count: '수리 건수 = 인정 인원 수(담당자+필수 참석자, 한 방문에 둘이면 2) — 5장 12개월 추이·trendCompare 와 같은 값. 취소·온라인 정기점검 제외, 개인별 값은 내지 않음',
    order: '분해는 우선순위로 한 번만 센다: ① 설치 후 12개월 이내 → ② 반복 고장 장비 → ③ PM 후 30일 내 → ④ 그 외. 합 = 수리 건수',
    install12: '설치 후 12개월 이내 = Serial 설치일자(없으면 초도설치)로부터 0 ≤ 수리일 − 설치일 < 365일인 장비의 수리. 설치일을 모르는 장비는 이 항목에 들지 않는다(installKnownPct = 설치일을 아는 수리의 몫)',
    repeat: '반복 고장 장비 = 같은 S/N(+거래처)이 그 창(개편 전 12개월 / 개편 후 N개월 / 당월 …) 안에서 수리 2회 이상, 그 S/N 의 수리 전부. 창이 길수록 반복으로 잡히는 몫이 커져 개편 전(12개월)과 개편 후(N개월)의 비중은 같은 조건이 아니다 — 길이와 무관하게 보려면 repeatSameMonth(같은 달 안 2회 이상)를 본다',
    pm30: 'PM 후 30일 내 = 같은 S/N 의 PM 시작일이 수리 시작 전 30일 안(PM 은 창 밖이어도 본다). pmFollow.per100Pm = (PM 후 30일 내 수리 건수, 우선순위와 무관하게 전부) ÷ PM 건수 × 100(인정 인원 수 기준). 당월·최근 PM 은 30일 관찰이 끝나지 않아 낮게 나올 수 있다',
    groups: '장비군 = Product 모델 접두사: XN/XR(XN-L 포함) · SP-50 · SP 기타(SP-10 등) · CN · HISCL · 기타',
    caution: '정황 자료다 — 인과를 단정하지 않는다. 장비는 현재 Serial 기준이라 과거 시점의 가동 장비·설치일은 근사' };

  return { value: { periodLabel: period.label, basis, windows: W, increase, groups, topAccounts, teams, activeFleet, calCompare, checks, monthsMissing: missing }, warnings };
}
module.exports = { build, groupOfModel, GROUPS };
