// ftfrFail · mttrBreak(lib/kpi-breakdown.js) — 손으로 센 합성 데이터로 실패 건 분해·재수리 간격·인수인계·MTTR 분포·설치/Cal 병행·30분 단위를 검증한다
const assert = require('assert');
const KB = require('../fsg-report/lib/kpi-breakdown');
const { kpiCore } = require('../fsg-report/kpi-core');
const P = require('../fsg-report/lib/period');
const { buildReport, round1 } = require('../fsg-report/lib/report-core');
const monthOf = ms => { const d = new Date(ms); return { y: d.getUTCFullYear(), m: d.getUTCMonth() + 1 }; };
const U = (m, d, h, mi) => Date.UTC(2026, m - 1, d, h, mi || 0);
const roster = [['A', 'FS WEST', 'T2'], ['B', 'FS CENTRAL', 'T2'], ['C', 'FS CENTRAL', 'T2'], ['D', 'FS SOUTH', 'T2']];
const office = { B: '대전', C: '광주', D: '부산' };
const r = (t, e, own, purp, acct, sn, err, prod, att) => ({ st: '완료됨', t, e, own, att: att || '', err: err || '', acct, sn, prod, purp, subj: '' });
const REP = '고장 수리';
const raw = [
  // H1(대전 거래처 — 담당자 방문 B 4회·C 1회·A 1회): S1 수리 4건, 실패 2건
  r(U(10, 1, 10), U(10, 1, 11), 'B', REP, 'H1', 'S1', 'E1', 'XN-1000'),              // 60분
  r(U(10, 5, 10), U(10, 5, 12), 'B', REP, 'H1', 'S1', 'e1', 'XN-1000', 'C'),         // 실패(같은 에러, 4일 뒤 · 같은 사무소) 120분, C 동행
  r(U(10, 5, 14), U(10, 5, 15), 'A', 'Calibration', 'H1', 'S1', '', 'XN-1000'),      // 같은 날 Calibration → 위 수리는 병행
  r(U(10, 8, 9), U(10, 8, 9, 30), 'B', 'PM', 'H1', 'S1', '', 'XN-1000'),
  r(U(10, 9, 10), U(10, 9, 15, 30), 'C', REP, 'H1', 'S1', '', 'XN-1000'),            // 330분, 에러 미기재(앞 수리와 다른 에러 → 실패 아님)
  r(U(10, 10, 10), U(10, 10, 10, 45), 'B', REP, 'H1', 'S1', '', 'XN-1000'),          // 실패(둘 다 미기재, 1일 뒤 · 앞 수리는 광주 담당 → 다른 사무소) 45분
  // H2(WEST): 전월에 실패 1건(종료 기준 8일 23시간 30분 뒤 → 8일, 내림)
  r(U(9, 20, 10), U(9, 20, 11), 'A', REP, 'H2', 'S2', 'X', 'CN-3000'),
  r(U(9, 29, 10), U(9, 29, 10, 30), 'A', REP, 'H2', 'S2', 'X', 'CN-3000'),
  r(U(10, 3, 10), U(10, 3, 11), 'A', 'PM', 'H2', 'S2', '', 'CN-3000'),
  // H3(부산): 기록 1건뿐 → FTFR 평균 대상 아님. 50분, 30분 단위 아님
  r(U(10, 2, 10, 10), U(10, 2, 11), 'D', REP, 'H3', 'S3', 'Z', 'SP-50'),
  r(U(10, 4, 10), U(10, 4, 11), 'B', REP, 'H9', 'S9', 'Q', 'XN-1000'), r(null, null, 'B', REP, 'H9', 'S9', 'Q', 'XN-1000'),   // 취소·시각 없음은 아래에서 뺀다
];
raw[raw.length - 2].st = '취소됨';
const period = P.parsePeriod('2026-10');
const res = KB.build({ kpiCore, raw: raw.filter(x => x.t != null), roster, office, period, P, round1, monthOf, excluded: [] });
const F = res.ftfrFail, M = res.mttrBreak, unit = (o, k) => o.units.find(u => u.key === k), team = (o, k) => o.teams.find(u => u.key === k);

// ── ftfrFail ──
const dj = unit(F, 'FS CENTRAL 대전').cur;
assert.strictEqual(dj.repairs, 4); assert.strictEqual(dj.fails, 2); assert.strictEqual(dj.failPct, 50); assert.strictEqual(dj.ftfr, 50);
assert.deepStrictEqual(dj.accounts, { inAverage: 1, withFail: 1, ftfr0: 0 });
assert.deepStrictEqual(dj.byFamily, [{ family: 'XN-Series', fails: 2 }]);
assert.deepStrictEqual(dj.topErrors, [{ error: KB.BLANK_ERR, fails: 1 }, { error: 'E1', fails: 1 }]);   // 같은 건수면 이름순, 에러 표기는 가장 많이 쓴 원문
assert.strictEqual(dj.blankErrorFails, 1); assert.strictEqual(dj.blankErrorRepairs, 2); assert.strictEqual(dj.blankErrorRepairPct, 50);
assert.deepStrictEqual(dj.topAccounts, [{ account: 'H1', fails: 2 }]);
assert.deepStrictEqual(dj.repeatSn, { snWithFails: 1, snRepeat: 1, failsInRepeat: 2, sharePct: 100 });
assert.deepStrictEqual(dj.gap, { d0_3: 1, d4_7: 1, d8_14: 0 });
assert.deepStrictEqual(dj.handover, { same: 1, different: 1, unknown: 0, samePct: 50 });
assert.strictEqual(unit(F, 'FS CENTRAL 광주').cur.repairs, 0); assert.strictEqual(unit(F, 'FS CENTRAL 광주').cur.ftfr, null);
assert.strictEqual(team(F, 'FS CENTRAL').cur.fails, 2); assert.strictEqual(team(F, 'FS CENTRAL').cur.ftfr, 50);
const wp = unit(F, 'FS WEST').prev;
assert.strictEqual(wp.repairs, 2); assert.strictEqual(wp.fails, 1); assert.deepStrictEqual(wp.gap, { d0_3: 0, d4_7: 0, d8_14: 1 }); assert.deepStrictEqual(wp.byFamily, [{ family: 'CN-Series', fails: 1 }]);
assert.strictEqual(unit(F, 'FS WEST').cur.repairs, 0);
assert.deepStrictEqual(F.excludedNotEligible.cur, { repairs: 1, fails: 0 });   // H3
assert.strictEqual(F.total.cur.fails, 2); assert.strictEqual(F.total.m12.fails, 3); assert.strictEqual(F.total.cur.ftfr, 50);
assert.deepStrictEqual(Object.keys(F.periods), ['cur', 'prev', 'm12']); assert.strictEqual(F.periods.m12.label, '2025-11~2026-10'); assert.strictEqual(F.periods.m12.complete, false);

// ── mttrBreak ── (건수 = 인정 인원 수)
const mdj = unit(M, 'FS CENTRAL 대전').cur, mgj = unit(M, 'FS CENTRAL 광주').cur, mbs = unit(M, 'FS SOUTH 부산').cur, mct = team(M, 'FS CENTRAL').cur;
assert.strictEqual(mdj.n, 3); assert.strictEqual(mdj.avg, 75);
assert.deepStrictEqual(mdj.dist.map(b => b.n), [2, 1, 0, 0, 0]); assert.strictEqual(mdj.dist[0].pct, 66.7);
assert.deepStrictEqual(mdj.withInstCal, { n: 1, avg: 120, install: { n: 0, avg: null }, cal: { n: 1, avg: 120 } }); assert.deepStrictEqual(mdj.withoutInstCal, { n: 2, avg: 52.5 });
assert.deepStrictEqual(mdj.slot30, { n: 3, both30: 2, pct: 66.7 });
assert.strictEqual(mgj.n, 2); assert.strictEqual(mgj.avg, 225);                       // C: 동행 120분 + 담당 330분
assert.deepStrictEqual(mgj.over300, { n: 1, pct: 50, avgExcl: 120, lift: 105 });
assert.deepStrictEqual(mgj.longTopAccounts, [{ account: 'H1', n: 1, families: [{ family: 'XN-Series', n: 1 }] }]); assert.strictEqual(mgj.longTotal, 1);
assert.strictEqual(mct.n, 5); assert.strictEqual(mct.avg, 135);
assert.strictEqual(mbs.n, 1); assert.strictEqual(mbs.avg, 50); assert.strictEqual(mbs.slot30.pct, 0);
assert.strictEqual(unit(M, 'FS WEST').prev.avg, 45); assert.strictEqual(unit(M, 'FS WEST').cur.n, 0); assert.strictEqual(unit(M, 'FS WEST').cur.avg, null);
assert.strictEqual(M.total.cur.n, 6); assert.strictEqual(M.total.cur.avg, round1(725 / 6));
const fc = M.familyCompare.cur;
assert.deepStrictEqual(fc.find(x => x.family === 'XN-Series').CENTRAL, { n: 5, avg: 135 }); assert.deepStrictEqual(fc.find(x => x.family === 'SP-50').SOUTH, { n: 1, avg: 50 });
assert.deepStrictEqual(fc.find(x => x.family === 'XN-Series').WEST, { n: 0, avg: null });

// 경고: 자료 없는 달은 알리고(추정하지 않음), 사무소 배정이 없으면 두 키를 비운다
assert(res.warnings.some(w => /12개월/.test(w) && /2025-11/.test(w)), '자료 없는 달 경고 없음');
const none = KB.build({ kpiCore, raw: raw.filter(x => x.t != null), roster, office: null, period, P, round1, monthOf, excluded: [] });
assert.strictEqual(none.ftfrFail, null); assert.strictEqual(none.mttrBreak, null); assert(/생략/.test(none.warnings[0]));

// 개인 이름이 json 에 없어야 한다(기관명·사무소·장비군·에러만)
const text = JSON.stringify({ F, M });
roster.forEach(p => assert(!new RegExp('"' + p[0] + '"').test(text), '개인 이름이 들어 있음: ' + p[0]));

// 엔진 출력: 새 키 두 개가 맨 뒤에 붙고 기존 키는 그대로, 값은 kpi 와 맞는다(확인 필요 경고 없음)
const rep = buildReport({ raw, roster, period: '2026-10', cut: '2026-11-13', prod: { office, gradeHist: [], newbie: [], weights: [] } });
const keys = Object.keys(rep);
assert.deepStrictEqual(keys.slice(-2), ['ftfrFail', 'mttrBreak']); assert.strictEqual(keys.indexOf('inputs'), keys.length - 3);
assert.strictEqual(rep.mttrBreak.total.cur.avg, rep.kpi.mttr);
rep.kpi.teams.forEach(t => { assert.strictEqual(rep.mttrBreak.teams.find(x => x.key === t.team).cur.avg, t.mttr); assert.strictEqual(rep.ftfrFail.teams.find(x => x.key === t.team).cur.ftfr, t.ftfr); });
assert(!rep.meta.warnings.some(w => /확인 필요/.test(w)), '기존 값과 어긋남: ' + rep.meta.warnings.filter(w => /확인 필요/.test(w)).join(' / '));
const noProd = buildReport({ raw, roster, period: '2026-10', cut: '2026-11-13' });
assert.strictEqual(noProd.ftfrFail, null); assert(noProd.meta.warnings.some(w => /ftfrFail·mttrBreak 생략/.test(w)));
// 새 키 계산이 오류를 내도 나머지 보고 데이터는 그대로 나온다(두 키만 비고 이유가 남는다)
const broken = buildReport({ raw, roster, period: '2026-10', cut: '2026-11-13', prod: { office, gradeHist: [], newbie: [], weights: [] }, _kbBuild: () => { throw new Error('시험 오류'); } });
assert.strictEqual(broken.ftfrFail, null); assert.strictEqual(broken.mttrBreak, null); assert(broken.meta.warnings.some(w => /계산 중 오류: 시험 오류/.test(w)));
assert.deepStrictEqual(broken.kpi, rep.kpi); assert.deepStrictEqual(broken.peopleKpi, rep.peopleKpi);
console.log('test_kpi_breakdown: OK (FTFR 실패 분해 · 재수리 간격 · 인수인계 · MTTR 분포 · 설치/Cal 병행 · 30분 단위 · 기존 값 대조)');
