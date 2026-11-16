// 위험 장비 점수 v1 — fsg-kpi.html 의 riskScore·riskCalc·riskList 를 그대로 떼어 와 검증한다.
// 검증 벡터는 파이썬 로지스틱(2026-08-03 CRM 백테스트, 설계서 claude/위험장비점수_설계서_v1_20261116.md)의 결과와 같아야 한다.
const assert = require('assert'), fs = require('fs'), path = require('path'), vm = require('vm');
const html = fs.readFileSync(path.join(__dirname, '..', 'fsg-kpi.html'), 'utf8');
function grab(startRe) {
  const m = html.match(startRe); assert(m, 'not found: ' + startRe); let i = html.indexOf('{', m.index), depth = 0;
  for (let j = i; j < html.length; j++) { const ch = html[j]; if (ch === '{') depth++; else if (ch === '}') { depth--; if (!depth) return html.slice(m.index, j + 1); } }
  throw new Error('unbalanced');
}
const ctx = vm.createContext({});
vm.runInContext(['const DAY = 86400000;', grab(/function famOf\(/), grab(/const RISK_MODEL=/) + ';', grab(/function riskScore\(/), grab(/function riskCalc\(/), grab(/function riskList\(/), grab(/function riskWhy\(/),
  'this.riskScore = riskScore; this.riskCalc = riskCalc; this.riskList = riskList; this.riskWhy = riskWhy; this.M = RISK_MODEL;'].join('\n'), ctx);
const { riskScore, riskList, riskWhy, M } = ctx, DAY = 86400000, U = (y, m, d) => Date.UTC(y, m - 1, d);

// 1) 파이썬 결과와 일치 (최대 오차 1e-4: 벡터 입력을 반올림해 적었다)
const VEC = [
  [0,0,0,null,0.0,"기타",0.030709],
  [0,0,0,null,0.0,"XN-Series",0.070896],
  [0,0,0,null,0.125,"UF-Series",0.102435],
  [0,0,1,212.375,0.0,"XN-Series",0.140409],
  [0,1,1,80.5208,1.333333,"XN-Series",0.290178],
  [0,0,3,131.4375,1.0,"UC-3500",0.490714],
  [2,6,29,4.7292,1.125,"SP-50",0.944625],
  [0,7,22,38.875,0.88,"SP-50",0.903519],
  [0,0,1,234.3958,0.0,"SP-50",0.401000],
  [0,0,1,305.5,0.0,"CN-Series",0.295570],
  [0,0,1,362.0417,0.0,"XN-Series",0.117268],
  [0,0,1,313.125,0.0,"UC-3500",0.184973],
  [0,0,1,352.3333,0.0,"G11",0.171483],
  [0,0,1,364.3125,0.0,"기타",0.052119],
  [0,0,1,348.4792,0.0,"XN-L Series",0.138140]
];
let worst = 0;
for (const [r30, r90, r365, lastDays, acct, fam, p] of VEC) { const o = riskScore({ r30, r90, r365, lastDays, acct, fam }); worst = Math.max(worst, Math.abs(o.p - p)); }
assert(worst < 1e-4, '파이썬 검증 벡터와 다름: ' + worst);

// 2) 손으로 계산한 값 — 이력이 없는 XN 장비: z = b0 + gap 계수(경과 365일 = 1)
const zero = riskScore({ r30: 0, r90: 0, r365: 0, lastDays: null, acct: 0, fam: 'XN-Series' });
assert(Math.abs(zero.p - 1 / (1 + Math.exp(-(-2.069 - 0.504)))) < 1e-12 && zero.tier === '정상', '이력 없는 장비');
assert(riskScore({ r30: 0, r90: 0, r365: 0, lastDays: 900, acct: 0, fam: 'XN-Series' }).p === zero.p, '경과일은 365일에서 멈춘다');
assert(riskScore({ r30: 0, r90: 0, r365: 0, lastDays: null, acct: 0, fam: '없는 장비군' }).p === riskScore({ r30: 0, r90: 0, r365: 0, lastDays: null, acct: 0, fam: '기타' }).p, '모르는 장비군은 기타 값');

// 3) 등급 경계(≥ 포함): z=0 → 0.5 위험, 0.3 이상 주의, 0.15 이상 관찰
const flat = b0 => ({ b0, c: { r30: 0, r90: 0, r365: 0, gap: 0, acct: 0 }, fam: { 'XN-Series': 0 }, tier: M.tier });
const T = b0 => riskScore({ r30: 0, r90: 0, r365: 0, lastDays: null, acct: 0, fam: 'XN-Series' }, flat(b0)).tier;
const logit = p => Math.log(p / (1 - p));
assert.strictEqual(T(0), '위험'); assert.strictEqual(T(-0.0001), '주의');
assert.strictEqual(T(logit(0.3) + 1e-9), '주의'); assert.strictEqual(T(logit(0.3) - 1e-6), '관찰');
assert.strictEqual(T(logit(0.15) + 1e-9), '관찰'); assert.strictEqual(T(logit(0.15) - 1e-6), '정상');

// 4) riskCalc / riskList — 합성 자산대장·활동
const ref = U(2026, 8, 3);
const ago = d => ref - d * DAY;
const mk = (sn, acct, purp, t, atm) => ({ sn, acct, purp, t, atm });
ctx.D = { maxT: ref, rows: [
  mk('X1', 'A', '고장 수리', ago(10), 'WEST'), mk('X1', 'A', '고장 수리', ago(30), 'WEST'), mk('X1', 'A', '고장 수리', ago(31), 'WEST'),   // 30일 경계: 30.0일은 r30, 31일은 아님
  mk('X1', 'A', '고장 수리', ago(90), 'WEST'), mk('X1', 'A', '고장 수리', ago(91), 'WEST'), mk('X1', 'A', '고장 수리', ago(365), 'WEST'), mk('X1', 'A', '고장 수리', ago(366), 'WEST'),
  mk('X1', 'A', 'PM', ago(5), 'WEST'),                                // PM 은 고장 건수에 안 들어간다
  mk('S1', 'B', '고장 수리', ago(400), 'EAST'),                        // 365일 밖
  mk('X1', 'A', '고장 수리', ref + DAY, 'WEST'),                       // 기준 시점 이후는 무시
  mk('ZZ', 'Q', '고장 수리', ago(3), 'WEST'),                          // 자산대장에 없는 장비
  mk(null, 'A', '고장 수리', ago(3), 'WEST'),
] };
ctx.SERIAL = [
  { state: '사용', acct: 'A', sn: 'X1', model: 'XN-1000' }, { state: '사용', acct: 'A', sn: 'X2', model: 'XN-1000' },
  { state: '사용', acct: 'B', sn: 'S1', model: 'SP-50' }, { state: '폐기', acct: 'A', sn: 'DEAD', model: 'XN-1000' }, { state: '사용', acct: 'C', sn: 'N0', model: '' },
  { state: '사용', acct: 'A', sn: 'X1', model: 'XN-1000' },            // 같은 키 중복은 한 대
];
const L = riskList(null); assert(L, '자산대장이 있으면 목록');
assert.strictEqual(L.items.length, 4, '사용 장비 4대(폐기·중복 제외)');
const by = sn => L.items.find(x => x.sn === sn);
assert.deepStrictEqual([by('X1').r30, by('X1').r90, by('X1').r365], [2, 4, 6], '30·90·365일 경계는 포함(≤)');
assert.strictEqual(by('X1').atm, 'WEST', '담당 팀 = 가장 최근 활동의 거래처 팀');
assert.strictEqual(by('S1').r365, 0); assert.strictEqual(by('S1').last, ago(400));
assert(by('X2').r365 === 0 && by('X2').last === null);
assert.strictEqual(by('X2').oth, 4, '같은 거래처 다른 장비 고장 = (거래처 90일 합 4 − 자기 0) ÷ (2대 − 1)');
assert.strictEqual(by('X1').oth, 0);
const ex = by('X1'), want = riskScore({ r30: 2, r90: 4, r365: 6, lastDays: 10, acct: 0, fam: 'XN-Series' });
assert(Math.abs(ex.p - want.p) < 1e-12 && ex.tier === want.tier, '목록 값 = riskScore 값');
assert.strictEqual(by('N0').fam, '기타', '모델 미기재 = 기타');
for (let i = 1; i < L.items.length; i++) assert(L.items[i - 1].p >= L.items[i].p, '점수 내림차순');
assert.strictEqual(L.counts['위험'] + L.counts['주의'] + L.counts['관찰'] + L.counts['정상'], 4);
// 팀 필터: 담당 팀이 WEST 인 장비만
const W = riskList('WEST'); assert(W.items.every(x => x.atm === 'WEST') && W.items.some(x => x.sn === 'X1') && !W.items.some(x => x.sn === 'S1'));
// 같은 D·SERIAL 이면 다시 계산하지 않고, 자산대장이 바뀌면 다시 계산한다
const c1 = ctx.riskCalc(); assert.strictEqual(ctx.riskCalc(), c1, '캐시');
ctx.SERIAL = ctx.SERIAL.concat([{ state: '사용', acct: 'D', sn: 'NEW', model: 'UF-5000' }]); assert.strictEqual(riskList(null).items.length, 5, '자산대장 교체 후 다시 계산');
ctx.SERIAL = null; assert.strictEqual(riskList(null), null, '자산대장이 없으면 null(점수를 만들지 않는다)');
// 근거 문구는 사실만
assert.strictEqual(riskWhy({ r30: 2, r90: 4, oth: 0 }), '30일 내 2회'); assert.strictEqual(riskWhy({ r30: 0, r90: 1, oth: 2 }), '90일 내 1회 · 같은 거래처 다른 장비도 고장'); assert.strictEqual(riskWhy({ r30: 0, r90: 0, oth: 0 }), '-');

// 5) 화면 연결: 반복 고장 목록 계산(ovChronic·chronicList)은 그대로이고 Overview·Proactive 위험 칸이 점수 결과를 쓴다
const between = (a, b) => { const i = html.indexOf(a), j = html.indexOf(b, i); assert(i >= 0 && j > i, a); return html.slice(i, j); };
assert(/rk=riskList\(team\)/.test(between('function renderOv()', 'const logoEl')) , 'Overview 가 riskList 를 안 씀');
assert(/rk=riskList\(team\)/.test(between('function renderProTop', "$('proSub')")), 'Proactive 가 riskList 를 안 씀');
assert(!/ch\.risk/.test(html), '예전 위험 장비 판정(ch.risk)이 화면에 남음');
assert(/function renderChrTable/.test(html) && /id="chrSeg"/.test(html), '위험·주의 / 반복 고장 보기 전환 없음');
assert(!/revisitAvg/.test(between('function riskCalc', 'function ovChronic')), '위험 점수가 재방문 계산식을 건드림');
console.log('test_risk_score ok — 검증 벡터 ' + VEC.length + '건, 최대 오차 ' + worst.toExponential(1));
