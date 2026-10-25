// fsg-report/kpi-core.js 가 fsg-kpi.html 의 kpiCore·buildProdData 와 글자 단위로 같은지 — 대시보드와 월간보고가 한 엔진을 쓰는 보증
const fs = require('fs'), path = require('path'), assert = require('assert');
const X = require('../fsg-report/tools/extract-kpi-core');
const html = fs.readFileSync(X.HTML, 'utf8');
const want = X.build(html), have = fs.readFileSync(X.OUT, 'utf8');
assert.strictEqual(have, want, 'fsg-report/kpi-core.js 가 fsg-kpi.html 과 다릅니다 → node fsg-report/tools/extract-kpi-core.js');
X.NAMES.forEach(n => assert(have.includes('function ' + n + '('), n + ' 누락'));
const core = require('../fsg-report/kpi-core');
assert.strictEqual(typeof core.kpiCore, 'function'); assert.strictEqual(typeof core.buildProdData, 'function');
// 떼어 낸 함수가 HTML 안의 다른 전역에 기대지 않는지(빈 입력으로 실행)
const C = core.kpiCore([], [['a', 'FS EAST', 'T1']], { teams: ['FS EAST'] });
assert.deepStrictEqual(C.rows, []); assert.strictEqual(C.revisitAvg(() => true, null).ftfr, null);
console.log('test_kpi_core_sync: OK (kpi-core.js == fsg-kpi.html, ' + X.NAMES.join('·') + ')');
