/* KPI 상태 단계 — 서비스 탭(tgSt)과 부서원 탭(targetPill)이 같은 기준(달성/근접/미달)을 쓰는지 확인 (2026-11-12 결정)
   근접: 높을수록 좋은 지표는 목표의 92% 이상, 낮을수록 좋은 지표는 목표의 115% 이하 */
const fs = require('fs'), assert = require('assert');
const html = fs.readFileSync(__dirname + '/../fsg-kpi.html', 'utf8');
function grab(name) { const i = html.indexOf('function ' + name + '('); assert(i >= 0, name + ' 함수를 찾지 못함'); let d = 0, j = html.indexOf('{', i);
  for (let k = j; k < html.length; k++) { if (html[k] === '{') d++; else if (html[k] === '}') { d--; if (!d) return html.slice(i, k + 1); } } throw new Error(name + ' 끝을 찾지 못함'); }
const tgSt = new Function(grab('tgSt') + '; return tgSt;')();
const targetPill = new Function(grab('targetPill') + '; return targetPill;')();
const word = { good: '달성', warn: '근접', bad: '미달' };
let n = 0;
[[90, true], [15, false], [120, false]].forEach(([target, higher]) => {
  for (let v = target * 0.5; v <= target * 1.6; v += target / 100) {
    const a = tgSt(v, target, higher), b = targetPill(v, target, higher ? 'higher-better' : 'lower-better');
    const cls = /pill (\w+)/.exec(b)[1];
    assert.strictEqual(a.st, cls, `목표 ${target} 값 ${v.toFixed(2)}: 서비스 탭 ${a.st} / 부서원 탭 ${cls}`); assert.strictEqual(a.chip, word[a.st]); n++;
  }
});
// 경계값
assert.strictEqual(tgSt(90, 90, true).chip, '달성'); assert.strictEqual(tgSt(82.8, 90, true).chip, '근접'); assert.strictEqual(tgSt(82.7, 90, true).chip, '미달');
assert.strictEqual(tgSt(15, 15, false).chip, '달성'); assert.strictEqual(tgSt(17.25, 15, false).chip, '근접'); assert.strictEqual(tgSt(17.3, 15, false).chip, '미달');
assert.strictEqual(tgSt(138, 120, false).chip, '근접'); assert.strictEqual(tgSt(138.1, 120, false).chip, '미달');
assert.deepStrictEqual(tgSt(null, 90, true), {});
console.log('test_kpi_status: OK (' + n + '개 값에서 두 탭 상태 일치 · 경계값 · 칩 문구)');
