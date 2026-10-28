// 사용 연수별 고장률(lifeCalc) — 대시보드 fsg-kpi.html 의 함수를 그대로 떼어 와 손으로 센 값과 맞춘다.
const assert = require('assert'), fs = require('fs'), path = require('path'), vm = require('vm');
const html = fs.readFileSync(path.join(__dirname, '..', 'fsg-kpi.html'), 'utf8');
function grab(startRe) {
  const m = html.match(startRe); assert(m, 'not found: ' + startRe); let i = html.indexOf('{', m.index), depth = 0;
  for (let j = i; j < html.length; j++) { const ch = html[j]; if (ch === '{') depth++; else if (ch === '}') { depth--; if (!depth) return html.slice(m.index, j + 1); } }
  throw new Error('unbalanced');
}
const line = re => { const m = html.match(re); assert(m, 'not found ' + re); return m[0]; };
const ctx = vm.createContext({});
vm.runInContext(['const DAY = 86400000;', grab(/function famOf\(/), line(/const LIFE_EDGES=.*?;\n/), grab(/function lifeCalc\(/), 'this.lifeCalc = lifeCalc;'].join('\n'), ctx);
const lifeCalc = ctx.lifeCalc, D = 86400000, U = (y, m, d) => Date.UTC(y, m - 1, d);

// 관측 창 = 2026-01-01 ~ 2026-12-31 (365일)
const ws = U(2026, 1, 1), we = U(2026, 12, 31);
const serial = [
  { state: '사용', acct: 'A', sn: 'N1', model: 'XN-1000', install: U(2025, 7, 1) },   // 나이 0.5~1.5년: 창 안 전부 → 0~1년 쪽 약 0.5년, 1~3년 쪽 약 0.5년
  { state: '사용', acct: 'B', sn: 'N2', model: 'XN-1000', install: U(2015, 1, 1) },   // 7년 이상
  { state: '사용', acct: 'C', sn: 'G1', model: 'G11', install: U(2026, 7, 1) },       // 창 안에서 0.5년만
  { state: '사용', acct: 'D', sn: 'N3', model: 'XN-1000', install: null },            // 설치일 없음 → 제외
  { state: '폐기', acct: 'E', sn: 'N4', model: 'XN-1000', install: U(2020, 1, 1) },   // 사용 아님
  { state: '사용', acct: 'F', sn: 'N5', model: 'XN-1000', install: U(2027, 3, 1) },   // 창 이후 설치 → 제외
];
const rows = [
  { purp: '고장 수리', t: U(2026, 2, 1), sn: 'N1', acct: 'A', ek: 'e1' },      // 나이 0.58년 → 0~1년
  { purp: '고장 수리', t: U(2026, 9, 1), sn: 'N1', acct: 'A', ek: 'e1' },      // 나이 1.17년 → 1~3년
  { purp: '고장 수리', t: U(2026, 5, 1), sn: 'N2', acct: 'B', ek: 'e2' },      // 7년 이상
  { purp: '고장 수리', t: U(2026, 8, 1), sn: 'G1', acct: 'C', ek: '미기재' },    // G11 0~1년 (에러 미기재는 TOP에서 제외)
  { purp: 'PM', t: U(2026, 6, 1), sn: 'N1', acct: 'A', ek: 'e1' },            // 고장 아님
  { purp: '고장 수리', t: U(2026, 6, 1), sn: 'N3', acct: 'D', ek: 'e9' },      // 설치일 모르는 장비 → noMatch
  { purp: '고장 수리', t: U(2025, 12, 31), sn: 'N1', acct: 'A', ek: 'e1' },    // 창 밖
  { purp: '고장 수리', t: U(2026, 3, 1), sn: 'G1', acct: 'C', ek: 'e3' },      // 설치(7/1) 전 방문 → preInstall
];
const R = lifeCalc(rows, serial, ws, we);
assert.strictEqual(R.used, 5, "'사용' 5대"); assert.strictEqual(R.withInst, 4, '설치일 있는 사용 장비 4대');
assert.strictEqual(R.preInstall, 1); assert.strictEqual(R.noMatch, 1);
const near = (a, b, tol) => assert(Math.abs(a - b) <= tol, a + ' ≈ ' + b);
// 전체: 0~1년 = N1(2026-01-01~07-01 = 181일 → 0.4956년) + G1(0.5년 가까이: 7/1~12/31 = 183일 = 0.501년)
near(R.all.b[0].exp, (181 + 183) / 365.25, 0.002); assert.strictEqual(R.all.b[0].n, 2); assert.strictEqual(R.all.b[0].fail, 2);
// 1~3년 = N1: 2026-07-01 ~ 12-31 (183일)
near(R.all.b[1].exp, 183 / 365.25, 0.002); assert.strictEqual(R.all.b[1].n, 1); assert.strictEqual(R.all.b[1].fail, 1);
// 7년 이상 = N2: 364일(창 끝이 12-31 0시)
near(R.all.b[4].exp, 364 / 365.25, 0.002); assert.strictEqual(R.all.b[4].fail, 1);
assert.strictEqual(JSON.stringify(R.all.b[0].err), '{"e1":1}', '미기재·others 제외'); assert.strictEqual(JSON.stringify(R.byFam['G11'].b[0].err), '{}');
assert.strictEqual(R.byFam['XN-Series'].b[0].fail, 1); assert.strictEqual(R.byFam['G11'].b[0].fail, 1);
// 설치 연도별: 2025(N1) / 2015(N2) / 2026(G1)
assert.strictEqual(Object.keys(R.all.cohort).sort().join(), '2015,2025,2026'); assert.strictEqual(R.all.cohort[2025].n, 1); assert.strictEqual(R.all.cohort[2025].fail, 2);
near(R.all.cohort[2025].exp, 364 / 365.25, 0.003);
// 설치일이 하나도 없으면 withInst 0
assert.strictEqual(lifeCalc(rows, [{ state: '사용', acct: 'A', sn: 'N1', model: 'XN-1000', install: null }], ws, we).withInst, 0);
console.log('test_lifetime: OK (나이 구간별 장비·년·고장 · 설치 전 방문 제외 · 설치일 없는 장비 제외 · 설치 연도별)');
