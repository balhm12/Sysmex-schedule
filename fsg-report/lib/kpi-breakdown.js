/* FTFR 실패 건 분해(`ftfrFail`) · MTTR 분해(`mttrBreak`) — 2026-11-16 작업지시서 「Central FTFR · South MTTR 미달 원인 분해」.
 * 기존 키는 건드리지 않고 새 키 두 개만 낸다. 사무소 6개·팀 4개·FSG 합계만 — 엔지니어 이름·개인별 값은 만들지 않는다(기관명은 상위 5개까지).
 * 새 기준을 만들지 않는다: 판정은 kpiCore(= fsg-kpi.html) 그대로다.
 *
 * 기간: cur = 보고 기간 · prev = 바로 앞 같은 길이 기간 · m12 = 보고 기간 끝 달까지 12개월. 기간 판정은 수리의 시작 시각(달) — computeKPI 와 같다.
 *
 * ── ftfrFail ──
 *   실패(같은 에러 재수리) = kpiCore 의 AE === 1: 종료 시각 이전 14일 안에 같은 S/N 에서 같은 Error 1 의 고장 수리가 있는 고장 수리.
 *     Error 1 이 둘 다 비어 있어도 「같은 에러」로 판정된다(kpiCore 그대로) → blankErrorFails 로 따로 센다.
 *   대상 = FTFR 평균에 들어가는 기록만: S/N·거래처·종료 시각이 있는 고장 수리 + 전체 기간 고장 수리·PM 기록 3건 이상인 거래처(eligible).
 *     그 밖의 거래처 건은 excludedNotEligible 에 건수만 둔다. 건수는 활동 행 수다(FTFR 은 인정 인원 수가 아니라 기록 수로 계산한다).
 *   사무소 = 거래처의 사무소(담당자 기준 최다 방문 사무소, kpiCore acctTeam — peopleKpi.units 의 FTFR 과 같은 배정), 팀 = 거래처의 팀(acctGroup).
 *   ftfr = 대시보드 값(거래처별 FTFR 의 평균) — 실패 건수 ÷ 수리 건수(failPct)와 다르다: 수리 1건이 실패한 거래처는 0% 로 평균에 들어간다(accounts.ftfr0).
 *   재수리 간격 = 실패한 수리의 종료 시각 − 바로 앞(가장 가까운) 같은 에러 수리의 종료 시각, 지난 날 수(내림): 0~3일 · 4~7일 · 8~14일.
 *   인수인계(handover) = 그 앞 수리의 담당자 사무소와 실패한 수리의 담당자 사무소가 같은가. 담당자가 로스터에 없으면 unknown.
 *
 * ── mttrBreak ──
 *   MTTR = 고장 수리의 (종료 − 시작) 분, 0~500분만(kpiCore dur — 0분 포함, 0분 건수는 zeroMin), 인정 인원(담당자+필수 참석자, 로스터 인원) 수만큼 가중.
 *   모든 건수(n)는 인정 인원 수다(한 수리에 두 명이면 2). 사무소 = 인정 인원의 사무소, 팀 = 그 합.
 *   분포 구간: 60분 이하 · 61~120 · 121~180 · 181~300 · 301분 이상. over300.avgExcl = 300분 초과 건을 뺀 평균(참고), lift = 평균 − avgExcl.
 *   장시간 = 180분 초과. 기관 상위 5개와 그 장비군.
 *   설치·Calibration 병행 = 같은 거래처에 같은 날(시작 시각의 날짜) 목적이 「장비 설치」·「장비 이전 설치」·「Calibration」인 활동(취소·온라인 정기점검 제외, 담당자 무관)이 있는 수리.
 *     「원격 Calibration」 등 다른 목적은 넣지 않는다.
 *   30분 단위 = 시작·종료 시각이 모두 정각 또는 30분(초 0)인 건의 비율 — CRM 시각이 예약 칸 값인지 보는 참고값.
 *   장비군 구성 차이를 보정한 값은 만들지 않는다(장비군별 값만 나란히 — familyCompare).
 */
'use strict';
const { FAM_ORDER, famOf, modelOf } = require('./repair-drivers');
const DAY = 86400000, W14 = 14 * DAY, REPAIR = '고장 수리', PM = 'PM';
const WITH_PURPOSES = { '장비 설치': 'install', '장비 이전 설치': 'install', 'Calibration': 'cal' };
const DIST = [['60분 이하', 0, 60], ['61~120분', 60, 120], ['121~180분', 120, 180], ['181~300분', 180, 300], ['301분 이상', 300, Infinity]];
const BLANK_ERR = '(Error 1 미기재)';
const UNITS = ['FS WEST', 'FS EAST', 'FS CENTRAL 대전', 'FS CENTRAL 광주', 'FS SOUTH 부산', 'FS SOUTH 대구'];
const TEAMS = ['FS WEST', 'FS EAST', 'FS CENTRAL', 'FS SOUTH'];
const GROUPS = { 'FS CENTRAL': ['FS CENTRAL 대전', 'FS CENTRAL 광주'], 'FS SOUTH': ['FS SOUTH 부산', 'FS SOUTH 대구'] };

function build(o) {
  const { kpiCore, raw, roster, office, period, P, round1, monthOf, excluded, expect } = o;
  const warnings = [];
  if (!office || !Object.keys(office).length) {
    return { ftfrFail: null, mttrBreak: null, warnings: ['ftfrFail·mttrBreak 생략 — 사무소 배정(fsg-kpi.html OFFICE)을 읽지 못해 사무소 단위로 나눌 수 없음(--roster 로 명단을 따로 준 경우 포함)'] };
  }
  const unitRoster = roster.map(r => [r[0], office[r[0]] ? r[1] + ' ' + office[r[0]] : r[1], r[2]]);
  const UG = {}; Object.keys(GROUPS).forEach(g => GROUPS[g].forEach(u => { UG[u] = g; }));
  const C = kpiCore(raw, unitRoster, { teams: UNITS, excluded, unitGroup: UG });
  const rows = C.rows, unitOf = n => C.memberTeam[n] || null, teamOfUnit = u => UG[u] || u;
  const short = k => k.replace(/^FS\s*/, '');
  const mkOf = x => { const d = monthOf(x.t); return P.mk(d.y, d.m); };
  const lab = k => { const ym = P.toYM(k); return P.lab(ym.y, ym.m); };

  // 기간
  const len = period.months.length, endMk = P.mk(period.y, period.m), range = (a, b) => { const k = []; for (let i = a; i <= b; i++) k.push(i); return k; };
  const KEYS = { cur: period.months.map(ym => P.mk(ym.y, ym.m)), prev: range(endMk - 2 * len + 1, endMk - len), m12: range(endMk - 11, endMk) };
  const NAMES = { cur: '당월', prev: '전월', m12: '12개월' };
  if (len > 1) { NAMES.cur = '보고 기간'; NAMES.prev = '직전 기간'; }
  const SETS = {}; Object.keys(KEYS).forEach(w => { SETS[w] = new Set(KEYS[w]); });
  const dataMonths = new Set(rows.map(mkOf));
  const periods = {}; Object.keys(KEYS).forEach(w => { const miss = KEYS[w].filter(k => !dataMonths.has(k)).map(lab);
    periods[w] = { name: NAMES[w], label: KEYS[w].length > 1 ? lab(KEYS[w][0]) + '~' + lab(KEYS[w][KEYS[w].length - 1]) : lab(KEYS[w][0]), months: KEYS[w].length, complete: !miss.length, missingMonths: miss };
    if (miss.length) warnings.push(`ftfrFail·mttrBreak ${NAMES[w]}(${periods[w].label}): 활동 자료가 없는 달 ${miss.join(', ')} — 그 달은 0건으로 들어감(추정해 채우지 않음)`); });
  const WINS = Object.keys(KEYS);
  const r1 = v => v == null ? null : round1(v);
  const pct = (a, b) => b ? round1(a / b * 100) : null;
  const top = (map, n, keyName) => Object.keys(map).sort((a, b) => map[b] - map[a] || (a < b ? -1 : 1)).slice(0, n).map(k => ({ [keyName]: k, fails: map[k] }));
  const famOfRow = x => famOf(modelOf(x.r && x.r.prod, x.r && x.r.subj));

  /* ════════ ftfrFail ════════ */
  const eligible = new Set(C.eligible);
  const bySn = {}; rows.forEach(x => { if (x.inRec) (bySn[x.sn] = bySn[x.sn] || []).push(x); });
  // 실패한 수리의 「바로 앞 같은 에러 수리」 — kpiCore 판정 창과 같은 조건(종료 시각 14일 전 이상, 자기보다 이전) 중 가장 가까운 것
  const priorOf = x => { let best = null; (bySn[x.sn] || []).forEach(p => { if (p === x || p.purpose !== REPAIR || p.err !== x.err) return; if (!(p.e >= x.e - W14 && p.e < x.e)) return; if (!best || p.e > best.e) best = p; }); return best; };
  const errShow = {}; rows.forEach(x => { if (x.purpose !== REPAIR || !x.err) return; const s = String(x.r.err || '').trim(), m = errShow[x.err] = errShow[x.err] || {}; m[s] = (m[s] || 0) + 1; });
  const errLabel = k => { if (!k) return BLANK_ERR; const m = errShow[k] || {}; return Object.keys(m).sort((a, b) => m[b] - m[a] || (a < b ? -1 : 1))[0] || k; };
  const ftRows = rows.filter(x => x.inRec && x.purpose === REPAIR);
  const notEligible = {}; WINS.forEach(w => { notEligible[w] = { repairs: 0, fails: 0 }; });
  const unassigned = {}; WINS.forEach(w => { unassigned[w] = { repairs: 0, fails: 0 }; });
  function ftStat(w, pick, avgKey) {
    const S = SETS[w]; let repairs = 0, fails = 0, blank = 0, blankRep = 0;
    const fam = {}, err = {}, acc = {}, sn = {}, gap = { d0_3: 0, d4_7: 0, d8_14: 0 }, hand = { same: 0, different: 0, unknown: 0 };
    ftRows.forEach(x => { if (!S.has(mkOf(x)) || !eligible.has(x.acct) || !pick(x)) return; repairs++; if (!x.err) blankRep++;
      if (x.AE !== 1) return; fails++;
      const f = famOfRow(x); fam[f] = (fam[f] || 0) + 1;
      const e = errLabel(x.err); err[e] = (err[e] || 0) + 1; if (!x.err) blank++;
      acc[x.acct] = (acc[x.acct] || 0) + 1; sn[x.sn] = (sn[x.sn] || 0) + 1;
      const p = priorOf(x);
      if (p) { const d = Math.floor((x.e - p.e) / DAY); if (d <= 3) gap.d0_3++; else if (d <= 7) gap.d4_7++; else gap.d8_14++;
        const a = unitOf(p.own), b = unitOf(x.own); if (!a || !b) hand.unknown++; else if (a === b) hand.same++; else hand.different++; }
    });
    const snKeys = Object.keys(sn), rep = snKeys.filter(k => sn[k] >= 2), repFails = rep.reduce((t, k) => t + sn[k], 0);
    // 대시보드 FTFR(거래처 평균)과 그 평균에 들어간 거래처 수
    const inP = x => S.has(mkOf(x)), dash = avgKey === undefined ? null : C.revisitAvg(inP, avgKey);
    let inAvg = 0, withFail = 0, zero = 0;
    C.eligible.forEach(a => { if (!pick({ acct: a })) return; const rt = C.rates(C.acctRecs.get(a).filter(inP)); if (rt.ftfr == null) return; inAvg++; if (rt.ftfr < 1) withFail++; if (rt.ftfr === 0) zero++; });
    return { repairs, fails, failPct: pct(fails, repairs), ftfr: dash ? dash.ftfr : null,
      accounts: { inAverage: inAvg, withFail, ftfr0: zero },
      byFamily: FAM_ORDER.filter(f => fam[f]).map(f => ({ family: f, fails: fam[f] })),
      topErrors: top(err, 5, 'error'), blankErrorFails: blank, blankErrorRepairs: blankRep, blankErrorRepairPct: pct(blankRep, repairs),
      topAccounts: top(acc, 5, 'account'),
      repeatSn: { snWithFails: snKeys.length, snRepeat: rep.length, failsInRepeat: repFails, sharePct: pct(repFails, fails) },
      gap, handover: Object.assign({}, hand, { samePct: pct(hand.same, hand.same + hand.different) }) };
  }
  ftRows.forEach(x => { const k = mkOf(x); WINS.forEach(w => { if (!SETS[w].has(k)) return;
    if (!eligible.has(x.acct)) { notEligible[w].repairs++; if (x.AE === 1) notEligible[w].fails++; }
    else if (UNITS.indexOf(C.acctTeam(x.acct)) < 0) { unassigned[w].repairs++; if (x.AE === 1) unassigned[w].fails++; } }); });
  const ftEntry = (key, kind, pick, avgKey) => { const e = { key, label: short(key), kind }; WINS.forEach(w => { e[w] = ftStat(w, pick, avgKey); }); return e; };
  const ftfrFail = {
    basis: {
      rule: '실패 = 종료 시각 이전 14일 안에 같은 S/N·같은 Error 1 의 고장 수리가 있는 고장 수리(대시보드 FTFR 판정 그대로). Error 1 이 둘 다 비어도 같은 에러로 판정됨(blankErrorFails). blankErrorRepairs·blankErrorRepairPct = 대상 수리 중 Error 1 이 빈 건수와 비율',
      scope: '대상 = S/N·거래처·종료 시각이 있는 고장 수리 중 FTFR 평균에 들어가는 거래처(전체 기간 고장 수리·PM 기록 3건 이상)의 건. 건수 = 활동 행 수(인정 인원 수 아님)',
      unit: '사무소 = 거래처의 사무소(담당자 기준 최다 방문 사무소 — peopleKpi.units 의 FTFR 과 같은 배정), 팀 = 거래처의 팀. 그래서 사무소 합이 팀 값과 다를 수 있다(거래처 배정이 단위마다 따로)',
      ftfr: 'ftfr = 대시보드 값(거래처별 FTFR 의 평균, %). failPct = 실패 건수 ÷ 수리 건수(%) — 서로 다른 값이다. accounts.inAverage = 그 기간 수리가 있어 평균에 들어간 거래처 수, withFail = 실패가 1건 이상인 거래처, ftfr0 = FTFR 0%인 거래처(수리가 모두 실패)',
      gap: '재수리 간격 = 실패한 수리의 종료 − 바로 앞 같은 에러 수리의 종료, 지난 날 수(내림): d0_3 = 0~3일 · d4_7 = 4~7일 · d8_14 = 8~14일',
      handover: '앞 수리와 실패한 수리의 담당자 사무소가 같은가(same·different). 담당자가 로스터에 없으면 unknown. samePct = same ÷ (same + different)',
      repeatSn: '같은 S/N 에서 실패가 2회 이상 난 S/N 수(snRepeat)와 그 S/N 들의 실패가 전체 실패에서 차지하는 몫(sharePct)',
      family: '장비군 = 대시보드 장비군(famOf) — 모델은 Product, 없으면 주제의 모델, 모델 미기재는 「기타」',
      note: '정황을 보는 자료다 — 인과를 단정하지 않는다. 엔지니어 이름·개인별 값은 없다',
    },
    periods, units: UNITS.map(u => ftEntry(u, 'office', x => (UG[u] ? C.acctTeam(x.acct) : C.acctGroup(x.acct)) === u, u)),   // 나뉘지 않은 팀(WEST·EAST)은 kpiCore revisitAvg 와 같이 팀 단위 배정
    teams: TEAMS.map(t => ftEntry(t, 'team', x => C.acctGroup(x.acct) === t, t)),
    total: (() => { const e = { key: 'FSG', label: 'FSG 전체', kind: 'total' }; WINS.forEach(w => { e[w] = ftStat(w, x => UNITS.indexOf(C.acctTeam(x.acct)) >= 0, null); }); return e; })(),
    excludedNotEligible: notEligible, unassignedAccounts: unassigned,
  };

  /* ════════ mttrBreak ════════ */
  const withKey = x => x.acct + '|' + Math.floor(x.t / DAY);
  const withSet = { install: new Set(), cal: new Set() };
  rows.forEach(x => { const k = WITH_PURPOSES[x.purpose]; if (k && x.acct) withSet[k].add(withKey(x)); });
  const on30 = ms => { const d = new Date(ms); return d.getUTCMinutes() % 30 === 0 && d.getUTCSeconds() === 0; };
  const mtRows = rows.filter(x => x.purpose === REPAIR && x.dur != null && x.credits.length);
  const agg = () => ({ n: 0, s: 0 }), add = (a, d, n) => { a.n += n; a.s += d * n; }, out = a => ({ n: a.n, avg: a.n ? round1(a.s / a.n) : null });
  // unitsOfRow(x) → 그 범위에 드는 인정 인원 수
  function mtStat(w, countIn) {
    const S = SETS[w], all = agg(), ex300 = agg(), fam = {}, dist = DIST.map(() => 0), longAcc = {}, withA = agg(), instA = agg(), calA = agg(), woA = agg(); let zero = 0, both30 = 0;
    mtRows.forEach(x => { if (!S.has(mkOf(x))) return; const n = countIn(x); if (!n) return; const d = x.dur;
      add(all, d, n); if (d === 0) zero += n; if (d <= 300) add(ex300, d, n);
      const f = famOfRow(x); add(fam[f] = fam[f] || agg(), d, n);
      const i = DIST.findIndex(b => d > b[1] && d <= b[2]); dist[i < 0 ? 0 : i] += n;   // 0분은 첫 구간
      if (d > 180) { const a = longAcc[x.acct || '(거래처 미기재)'] = longAcc[x.acct || '(거래처 미기재)'] || { n: 0, fam: {} }; a.n += n; a.fam[f] = (a.fam[f] || 0) + n; }
      const k = withKey(x), wi = !!x.acct && withSet.install.has(k), wc = !!x.acct && withSet.cal.has(k);
      if (wi) add(instA, d, n); if (wc) add(calA, d, n); if (wi || wc) add(withA, d, n); else add(woA, d, n);
      if (on30(x.t) && on30(x.e)) both30 += n; });
    const avg = all.n ? all.s / all.n : null, avgEx = ex300.n ? ex300.s / ex300.n : null, n300 = all.n - ex300.n;
    return { n: all.n, avg: r1(avg), zeroMin: zero,
      byFamily: FAM_ORDER.filter(f => fam[f]).map(f => Object.assign({ family: f }, out(fam[f]))),
      dist: DIST.map((b, i) => ({ bucket: b[0], n: dist[i], pct: pct(dist[i], all.n) })),
      over300: { n: n300, pct: pct(n300, all.n), avgExcl: r1(avgEx), lift: avg != null && avgEx != null ? round1(avg - avgEx) : null },
      longTopAccounts: Object.keys(longAcc).sort((a, b) => longAcc[b].n - longAcc[a].n || (a < b ? -1 : 1)).slice(0, 5)
        .map(a => ({ account: a, n: longAcc[a].n, families: FAM_ORDER.filter(f => longAcc[a].fam[f]).map(f => ({ family: f, n: longAcc[a].fam[f] })) })),
      longTotal: Object.keys(longAcc).reduce((t, a) => t + longAcc[a].n, 0),
      withInstCal: Object.assign(out(withA), { install: out(instA), cal: out(calA) }), withoutInstCal: out(woA),
      slot30: { n: all.n, both30, pct: pct(both30, all.n) } };
  }
  const cnt = pred => x => x.credits.reduce((t, c) => t + (pred(unitOf(c)) ? 1 : 0), 0);
  const mtEntry = (key, kind, pred) => { const e = { key, label: short(key), kind }; WINS.forEach(w => { e[w] = mtStat(w, cnt(pred)); }); return e; };
  const mtUnits = UNITS.map(u => mtEntry(u, 'office', v => v === u)), mtTeams = TEAMS.map(t => mtEntry(t, 'team', v => !!v && teamOfUnit(v) === t));
  const mtTotal = mtEntry('FSG', 'total', v => !!v); mtTotal.label = 'FSG 전체';
  // 같은 장비군을 팀끼리 나란히(보정 없음)
  const familyCompare = {}; WINS.forEach(w => { familyCompare[w] = FAM_ORDER.map(f => { const row = { family: f }; let any = 0;
    mtTeams.forEach(t => { const v = t[w].byFamily.find(b => b.family === f); row[t.label] = v ? { n: v.n, avg: v.avg } : { n: 0, avg: null }; any += v ? v.n : 0; });
    const tv = mtTotal[w].byFamily.find(b => b.family === f); row.FSG = tv ? { n: tv.n, avg: tv.avg } : { n: 0, avg: null }; return any ? row : null; }).filter(Boolean); });
  const mttrBreak = {
    basis: {
      rule: 'MTTR = 고장 수리의 (종료 − 시작) 분, 0~500분인 건만, 인정 인원(담당자+필수 참석자 중 로스터 인원) 수만큼 가중 — 대시보드·kpi.mttr 과 같은 정의. 0분 건도 들어간다(zeroMin 에 건수)',
      count: '모든 n = 인정 인원 수(한 수리에 두 명이면 2). 사무소 = 인정 인원의 사무소, 팀 = 그 합',
      dist: '구간: 60분 이하 · 61~120 · 121~180 · 181~300 · 301분 이상(500분 초과는 MTTR 대상이 아니라 없음). over300.avgExcl = 300분 초과 건을 뺀 평균(참고), lift = avg − avgExcl(300분 초과 건이 평균을 올린 분)',
      long: 'longTopAccounts = 180분 초과 건이 많은 기관 상위 5개와 장비군별 건수, longTotal = 180분 초과 건 전체',
      withInstCal: '같은 거래처에 같은 날(시작 날짜) 목적이 「장비 설치」·「장비 이전 설치」(install)·「Calibration」(cal)인 활동이 있는 수리(취소·온라인 정기점검 제외, 담당자 무관) 대 그렇지 않은 수리. install 과 cal 이 둘 다면 양쪽에 다 센다',
      slot30: '시작·종료 시각이 모두 정각 또는 30분인 건의 비율(%) — CRM 시각이 예약 칸 값인지 보는 참고값',
      familyCompare: '같은 장비군의 MTTR 을 팀끼리 나란히 놓은 값. 장비군 구성 차이를 보정한 값은 만들지 않는다',
      family: '장비군 = 대시보드 장비군(famOf) — 모델은 Product, 없으면 주제의 모델, 모델 미기재는 「기타」',
      note: '정황을 보는 자료다 — 인과를 단정하지 않는다. 엔지니어 이름·개인별 값은 없다',
    },
    periods, units: mtUnits, teams: mtTeams, total: mtTotal, familyCompare,
  };

  /* 기존 값과 맞는지 확인 — 다르면 추정해 맞추지 않고 이유를 알린다 */
  if (expect) {
    if (expect.mttr != null && mtTotal.cur.avg !== expect.mttr) warnings.push(`mttrBreak 확인 필요: FSG ${NAMES.cur} 평균 ${mtTotal.cur.avg}분이 kpi.mttr ${expect.mttr}분과 다름`);
    (expect.teamMttr || []).forEach(t => { const m = mtTeams.find(x => x.key === t.team); if (m && t.mttr != null && m.cur.avg !== t.mttr) warnings.push(`mttrBreak 확인 필요: ${short(t.team)} ${NAMES.cur} 평균 ${m.cur.avg}분이 kpi.teams 의 ${t.mttr}분과 다름`); });
    (expect.teamFtfr || []).forEach(t => { const m = ftfrFail.teams.find(x => x.key === t.team); if (m && t.ftfr != null && m.cur.ftfr !== t.ftfr) warnings.push(`ftfrFail 확인 필요: ${short(t.team)} ${NAMES.cur} FTFR ${m.cur.ftfr}%가 kpi.teams 의 ${t.ftfr}%와 다름`); });
    (expect.units || []).forEach(u => { const f = ftfrFail.units.find(x => x.key === u.key), m = mtUnits.find(x => x.key === u.key);
      if (f && u.ftfr != null && f.cur.ftfr !== u.ftfr) warnings.push(`ftfrFail 확인 필요: ${short(u.key)} ${NAMES.cur} FTFR ${f.cur.ftfr}%가 peopleKpi.units 의 ${u.ftfr}%와 다름`);
      if (m && u.mttr != null && m.cur.avg !== u.mttr) warnings.push(`mttrBreak 확인 필요: ${short(u.key)} ${NAMES.cur} 평균 ${m.cur.avg}분이 peopleKpi.units 의 ${u.mttr}분과 다름`); });
  }
  const unk = ftfrFail.total.m12.handover.unknown;
  if (unk) warnings.push(`ftfrFail handover: 12개월 실패 ${ftfrFail.total.m12.fails}건 중 ${unk}건은 앞 수리나 재수리의 담당자가 로스터에 없어 같은 사무소 여부를 알 수 없음(unknown) — 비율은 나머지로 계산`);
  const na = unassigned.m12.repairs;
  if (na) warnings.push(`ftfrFail: 12개월 고장 수리 ${na}건(실패 ${unassigned.m12.fails}건)은 거래처의 사무소를 정할 수 없어(로스터 담당자의 방문 없음) 사무소·팀·FSG 합계에서 빠짐 — unassignedAccounts`);
  return { ftfrFail, mttrBreak, warnings };
}
module.exports = { build, UNITS, TEAMS, DIST, BLANK_ERR };
