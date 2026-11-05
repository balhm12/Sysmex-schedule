// A/S(수리) 증가 요인 분해 repairDrivers — 손으로 센 합성 데이터로 분해 4개·PM 후 30일·장비군·기관·팀·가동 장비·Calibration 비교를 검증한다
const assert = require('assert');
const RD = require('../fsg-report/lib/repair-drivers');
const P = require('../fsg-report/lib/period');
const { PV } = require('../fsg-report/lib/report-core');
const DAY = 86400000, U = (y, m, d) => Date.UTC(y, m - 1, d, 10), monthOf = ms => { const d = new Date(ms); return { y: d.getUTCFullYear(), m: d.getUTCMonth() + 1 }; };
const REORG = { preFrom: { y: 2025, m: 4 }, preTo: { y: 2026, m: 3 }, postFrom: { y: 2026, m: 4 } };
const round1 = v => Math.round(v * 10) / 10, teamOf = c => ({ A: 'FS EAST', B: 'FS WEST' })[c];
const x = (t, purpose, credits, sn, acct, prod) => ({ t, purpose, credits, sn, acct, r: { prod } });
const REP = PV.REPAIR, PM = PV.PM;

const rows = [
  // 자료가 있는 달 채우기(없는 달 경고를 따로 시험하므로 여기서는 매달 활동 1건) — 개편 전 12개월 + 개편 후 7개월
  ...[[2025, 4], [2025, 5], [2025, 6], [2025, 7], [2025, 8], [2025, 9], [2025, 10], [2025, 11], [2025, 12], [2026, 1], [2026, 2], [2026, 3], [2026, 4], [2026, 5], [2026, 6], [2026, 7], [2026, 8], [2026, 9], [2026, 10]]
    .map(([y, m]) => x(U(y, m, 28), 'Evaluation', ['A'], null, 'HZ', 'XN-1000')),
  // 개편 전(2025.4~2026.3): 합 5 — 설치 12개월 이내 1 · 반복 2 · PM 후 30일 1 · 그 외 1
  x(U(2025, 5, 10), REP, ['A'], 'S1', 'HA', 'XN-1000'),                    // S1: 설치 2025-02-01 → 12개월 이내
  x(U(2025, 6, 1), REP, ['A'], 'S2', 'HB', 'SP-50'), x(U(2025, 9, 1), REP, ['B'], 'S2', 'HB', 'SP-50'),   // S2: 창 안 2회 → 반복(설치 오래됨)
  x(U(2025, 7, 1), PM, ['A'], 'S3', 'HC', 'CN-3000'), x(U(2025, 7, 20), REP, ['A'], 'S3', 'HC', 'CN-3000'),   // S3: PM 19일 후 수리 1회 → PM 후 30일
  x(U(2025, 8, 5), REP, ['A'], 'S4', 'HD', 'HISCL-5000'),                  // 그 외
  // 개편 후(2026.4~10, 7개월): 합 8 — 설치 12개월 이내 2 · 반복 2 · PM 후 30일 1 · 그 외 3
  x(U(2026, 4, 1), PM, ['A'], 'S1', 'HA', 'XN-1000'),                      // PM(수리 없음)
  x(U(2026, 5, 5), REP, ['A', 'B'], 'S5', 'HE', 'XR-20'),                  // S5: 설치 2026-03-01 → 12개월 이내, 인정 2명 → 2
  x(U(2026, 6, 1), REP, ['A'], 'S2', 'HB', 'SP-50'), x(U(2026, 6, 15), REP, ['B'], 'S2', 'HB', 'SP-50'),   // S2: 창 안 2회 → 반복(같은 달 안에서도 2회)
  x(U(2026, 9, 1), PM, ['A'], 'S6', 'HF', 'SP-10'), x(U(2026, 9, 20), REP, ['A'], 'S6', 'HF', 'SP-10'),    // S6: PM 19일 후 → PM 후 30일
  x(U(2026, 8, 7), REP, ['A'], null, 'HG', 'UF-5000'),                     // S/N 없음 → 그 외
  x(U(2026, 10, 5), REP, ['B'], 'S8', 'HH', 'XN-350'),                     // 그 외
  x(U(2026, 10, 10), REP, ['A'], 'S3', 'HC', 'CN-3000'),                   // S3: 마지막 PM(2025-07)이 30일보다 오래됨 → 그 외
  // Calibration · Application · 취소/온라인은 rows 에 없음
  x(U(2025, 10, 3), 'Calibration', ['A'], 'S1', 'HA', 'XN-1000'), x(U(2026, 7, 3), 'Calibration', ['A', 'B'], 'S1', 'HA', 'XN-1000'),
  x(U(2025, 11, 3), 'Application', ['A'], 'S1', 'HA', 'XN-1000'), x(U(2026, 8, 3), 'Application Support', ['B'], 'S1', 'HA', 'XN-1000'),
];
const serial = [
  { state: '사용', acct: 'HA', sn: 'S1', model: 'XN-1000', install: U(2025, 2, 1), first: null }, { state: '사용', acct: 'HB', sn: 'S2', model: 'SP-50', install: U(2018, 1, 1), first: null },
  { state: '사용', acct: 'HC', sn: 'S3', model: 'CN-3000', install: U(2018, 1, 1), first: null }, { state: '사용', acct: 'HD', sn: 'S4', model: 'HISCL-5000', install: null, first: null },
  { state: '사용', acct: 'HE', sn: 'S5', model: 'XR-20', install: U(2026, 3, 1), first: null }, { state: '사용', acct: 'HF', sn: 'S6', model: 'SP-10', install: null, first: U(2015, 1, 1) },
  { state: '사용', acct: 'HH', sn: 'S8', model: 'XN-350', install: U(2019, 1, 1), first: null }, { state: '폐기', acct: 'HI', sn: 'S9', model: 'XN-1000', install: null, first: null },
];
const period = P.parsePeriod('2026-10');
const base = { rows, serial, period, REORG, P, teamOf, PV, internal: ['HZ'], round1, monthOf };
const res = RD.build(Object.assign({ expect: { preRP: 0.4, postRP: 1.1, curRepair: 2 } }, base)), R = res.value, W = R.windows;

// 창 · 월평균
assert.deepStrictEqual([W.pre.months, W.post.months, W.cur.months, W.prev.months, W.yoy.months], [12, 7, 1, 1, 1]);
assert.strictEqual(W.pre.label, '개편 전 2025-04~2026-03'); assert.strictEqual(W.post.label, '개편 후 2026-04~2026-10');
assert.deepStrictEqual([W.pre.total, W.post.total], [5, 8]); assert.deepStrictEqual([W.pre.perMonth, W.post.perMonth], [0.4, 1.1]);
// 분해 4개 — 합 = 수리 건수, 우선순위(설치 → 반복 → PM 후 30일 → 그 외)
assert.deepStrictEqual(W.pre.buckets, { install12: 1, repeat: 2, pm30: 1, other: 1 }, '개편 전');
assert.deepStrictEqual(W.post.buckets, { install12: 2, repeat: 2, pm30: 1, other: 3 }, '개편 후: S5 인정 2명 → 2, S3(PM 30일 밖)·S/N 없음·S8 → 그 외 3');
['pre', 'post', 'cur', 'prev', 'yoy'].forEach(w => { const b = W[w].buckets; assert.strictEqual(b.install12 + b.repeat + b.pm30 + b.other, W[w].total, w + ' 합'); });
assert.deepStrictEqual(W.cur.buckets, { install12: 0, repeat: 0, pm30: 0, other: 2 }, '당월 2026-10: S8·S3 수리 둘 다 그 외'); assert.strictEqual(W.cur.total, 2);
assert.strictEqual(W.prev.total, 1, '전월 2026-09: S6 수리 1건(PM 후 30일)'); assert.deepStrictEqual(W.prev.buckets, { install12: 0, repeat: 0, pm30: 1, other: 0 });
assert.strictEqual(W.yoy.total, 0, '전년 동월 2025-10: 수리 없음'); assert.strictEqual(W.yoy.label, '전년 동월 2025-10');
assert.strictEqual(W.post.share.install12, 25); assert.strictEqual(W.pre.share.repeat, 40);
// 반복 고장은 창 길이에 달린다 — 같은 달 안 2회 이상은 길이와 무관(개편 후 S2 6월 2회만)
assert.strictEqual(W.post.repeatSameMonth.total, 2); assert.strictEqual(W.pre.repeatSameMonth.total, 0, '개편 전 S2 는 6월·9월로 달이 다름');
// PM 100건당 PM 후 30일 내 수리 — PM 건수·PM 후 수리(우선순위와 무관하게 전부)
assert.deepStrictEqual(W.pre.pmFollow, { pm: 1, repairsAfterPm: 1, per100Pm: 100 }); assert.deepStrictEqual(W.post.pmFollow, { pm: 2, repairsAfterPm: 1, per100Pm: 50 });
// 설치일을 아는 수리의 몫(S4·S6·S/N 없음은 모름이나 S6 는 초도설치가 있어 안다)
assert.strictEqual(W.pre.installKnownPct, 80, '개편 전: S4(설치일 없음)만 모름 → 4/5');
// 증가분
assert.strictEqual(R.increase.delta, 0.7); assert.strictEqual(R.increase.deltaPct, 175);
assert.deepStrictEqual(R.increase.byBucket.map(b => b.key), ['install12', 'repeat', 'pm30', 'other']);
// 장비군(Product 접두사)
const g = Object.fromEntries(R.groups.map(r => [r.group, r]));
assert.deepStrictEqual(Object.keys(g), ['XN/XR', 'SP-50', 'SP 기타', 'CN', 'HISCL', '기타']);
assert.deepStrictEqual([g['XN/XR'].pre, g['XN/XR'].post], [0.1, 0.4], 'XN 1건 → 월평균 0.1 / 개편 후 XR 2 + XN-350 1 = 3 → 0.4');
assert.deepStrictEqual([g['SP-50'].pre, g['SP-50'].post], [0.2, 0.3]); assert.deepStrictEqual([g['SP 기타'].pre, g['SP 기타'].post], [0, 0.1]);
assert.deepStrictEqual([g.CN.pre, g.CN.post], [0.1, 0.1]); assert.deepStrictEqual([g.HISCL.pre, g.HISCL.post], [0.1, 0]); assert.deepStrictEqual([g['기타'].pre, g['기타'].post], [0, 0.1], 'UF-5000(S/N 없음)');
assert.strictEqual(R.groups.reduce((t, r) => t + r.postTotal, 0), 8, '장비군 합 = 개편 후 수리 건수'); assert.strictEqual(R.groups.reduce((t, r) => t + r.preTotal, 0), 5, '장비군 합 = 개편 전 수리 건수');
// 기관 상위(증가분) — 개편 후 월평균 − 개편 전 월평균, 증가한 기관만
assert(R.topAccounts.length <= 5 && R.topAccounts.every(a => a.delta > 0), '증가한 기관만, 최대 5');
assert.strictEqual(R.topAccounts[0].account, 'HE', '신규 설치(HE) 2건/7개월 = 0.3 증가 — 가장 큼'); assert.strictEqual(R.topAccounts[0].delta, 0.3);
assert(!R.topAccounts.some(a => a.account === 'HZ'), '내부 계정 제외');
// 팀
const t = Object.fromEntries(R.teams.map(r => [r.team, r])); assert.deepStrictEqual([t['FS EAST'].pre, t['FS EAST'].post], [0.3, 0.7]); assert.deepStrictEqual([t['FS WEST'].pre, t['FS WEST'].post], [0.1, 0.4], 'WEST: 개편 전 1 → 1/12, 개편 후 3(S5 동행·S2 6/15·S8) → 3/7'); assert.deepStrictEqual([t['FS EAST'].preTotal, t['FS EAST'].postTotal, t['FS WEST'].preTotal, t['FS WEST'].postTotal], [4, 5, 1, 3]);
// 가동 장비 100대당 수리(방문 건수 기준)
assert.strictEqual(R.activeFleet.preActive, 4, '개편 전 12개월 서비스 이력 있는 「사용」 장비: S1~S4'); assert.strictEqual(R.activeFleet.postActive, 6, '기준월까지 12개월: S1·S2·S3·S5·S6·S8');
assert.strictEqual(R.activeFleet.pre, 10.4, '5행 ÷ 12 ÷ 4 × 100'); assert.strictEqual(R.activeFleet.post, 16.7, '7행 ÷ 7 ÷ 6 × 100 — 방문 행 수(인정 인원 수 아님)');
// Calibration · Application — 같은 기준 비교
const C = R.calCompare.windows; assert.deepStrictEqual(R.calCompare.applicationPurposes, ['Application', 'Application Support']);
assert.strictEqual(C.pre.calibration.total, 1); assert.strictEqual(C.post.calibration.total, 2, '2026-07 Calibration 인정 2명'); assert.strictEqual(C.pre.application.total, 1); assert.strictEqual(C.post.application.total, 1);
assert.strictEqual(C.pre.all, 12 + 5 + 1 + 1 + 1, '개편 전 전체 활동: 매달 1 × 12 + 수리 5 + PM 1 + Cal 1 + App 1'); assert.strictEqual(C.pre.calibration.sharePct, round1(1 / 20 * 100));
assert.strictEqual(R.calCompare.delta.calibrationPerMonth, round1(C.post.calibration.perMonth - C.pre.calibration.perMonth));
// 합계 검증 · 경고
assert.deepStrictEqual(Object.values(R.checks).map(c => c.ok), [true, true, true], '기존 값과 같음'); assert.deepStrictEqual(res.warnings.filter(w => /다름/.test(w)), []);
// 자료가 없는 달은 채우지 않고 알린다
const holes = RD.build(Object.assign({}, base, { rows: rows.filter(r => !(r.purpose === 'Evaluation' && monthOf(r.t).y === 2025 && monthOf(r.t).m === 12)) }));
assert(holes.warnings.some(w => /2025-12/.test(w) && /자료가 없는 달/.test(w)), '없는 달 경고'); assert.deepStrictEqual(holes.value.windows.pre.missingMonths, ['2025-12']); assert.strictEqual(holes.value.windows.pre.complete, false);
// Serial 없으면 가동 장비·설치 12개월은 비우고 알린다
const ns = RD.build(Object.assign({}, base, { serial: null })); assert.strictEqual(ns.value.activeFleet, null); assert(ns.warnings.some(w => /Serial 없음/.test(w)) && ns.warnings.some(w => /설치일자가 없어/.test(w)));
assert.strictEqual(ns.value.windows.post.buckets.install12, 0);
// Application 이 하나도 없으면 비우고 알린다
const na = RD.build(Object.assign({}, base, { rows: rows.filter(r => !/^Application/.test(r.purpose)) })); assert.strictEqual(na.value.calCompare.windows.post.application, null); assert(na.warnings.some(w => /Application/.test(w)));
// 기준 설명 · 개인 정보 없음
['windows', 'count', 'order', 'install12', 'repeat', 'pm30', 'groups', 'caution'].forEach(k => assert(typeof R.basis[k] === 'string' && R.basis[k].length > 15, 'basis.' + k));
assert(!/"(A|B)"/.test(JSON.stringify(R)), '담당자 이름 없음');
console.log('test_repair_drivers: OK (분해 4개 합 = 수리 건수 · PM 후 30일 · 장비군 · 기관/팀 · 가동 장비 · Calibration/Application · 경고)');
