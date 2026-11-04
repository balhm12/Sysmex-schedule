// 담당 장비(eqFromRows·eqByPerson) — 대시보드 fsg-kpi.html 의 함수를 떼어 와 손으로 센 값과 맞춘다.
const assert = require('assert'), fs = require('fs'), path = require('path'), vm = require('vm');
const html = fs.readFileSync(path.join(__dirname, '..', 'fsg-kpi.html'), 'utf8');
function grab(startRe) {
  const m = html.match(startRe); assert(m, 'not found: ' + startRe); let i = html.indexOf('{', m.index), depth = 0;
  for (let j = i; j < html.length; j++) { const ch = html[j]; if (ch === '{') depth++; else if (ch === '}') { depth--; if (!depth) return html.slice(m.index, j + 1); } }
  throw new Error('unbalanced');
}
const line = re => { const m = html.match(re); assert(m, 'not found ' + re); return m[0]; };
const ctx = vm.createContext({});
vm.runInContext([line(/const EQ_FIELD=.*?;\n/), line(/const EQ_FIELDS=.*?;\n/), grab(/function eqFromRows\(/), grab(/function eqByPerson\(/),
  'this.eqFromRows = eqFromRows; this.eqByPerson = eqByPerson;'].join('\n'), ctx);
const h = ['No', '담당자', '팀', '거점', '기관명 (CRM 거래처명)', '시·도', '시/구/군', '영업담당', '영업팀', '장비 수', '혈액 시스템', '유린 시스템', '응고 시스템',
  'XN', 'XN-L', 'XR', 'SP', 'DI', 'HLC', 'UF', 'UC', 'UD', 'CA', 'CS-1600·2500', 'CS-5100', 'CN', 'HISCL', '기존 관리표 이름'];
const R = (p, n, eq, sys, f) => { const r = new Array(h.length).fill(0); r[1] = p; r[4] = n; r[5] = '서울특별시'; r[9] = eq; r[10] = sys[0]; r[11] = sys[1]; r[12] = sys[2];
  Object.keys(f).forEach(k => { r[h.indexOf(k)] = f[k]; }); return r; };
const rows = [
  R('가', 'A병원', 7, [1, 1, 0], { XN: 3, SP: 2, UF: 1, UC: 1 }),
  R('가', 'B의원', 2, [0, 0, 0], { 'XN-L': 1, HLC: 1 }),
  R('나', 'C센터', 5, [0, 0, 1], { CA: 1, 'CS-5100': 1, CN: 2, HISCL: 1 }),
  R('나', 'D병원', 0, [0, 0, 0], {}),
  [null, null, null, null, '', null],                 // 빈 행
];
const out = JSON.parse(JSON.stringify(ctx.eqFromRows(h, rows)));   // vm 영역 배열을 이 영역 배열로
assert.strictEqual(out.length, 4, '기관 4곳(빈 행 제외)');
assert.deepStrictEqual(out[0].slice(3), [7, 1, 1, 0, 5, 2, 0, 0], 'A병원: CBC = XN 3 + SP 2, 유린 = UF + UC');
assert.deepStrictEqual(out[2].slice(7), [0, 0, 4, 1], 'C센터: 응고 = CA + CS-5100 + CN 2, 면역 = HISCL');
const by = ctx.eqByPerson(out);
assert.strictEqual(by['가'].inst, 2); assert.strictEqual(by['가'].eq, 9); assert.strictEqual(by['가'].CBC, 7); assert.strictEqual(by['가'].sB, 1);
assert.strictEqual(by['나'].inst, 2); assert.strictEqual(by['나'].eq, 5); assert.strictEqual(by['나']['응고'], 4); assert.strictEqual(by['나'].sC, 1);
assert.throws(() => ctx.eqFromRows(h, [R('가', 'A', 0, [0, 0, 0], {})]), /비어 있습니다/, '계산값이 없으면 막는다');
assert.throws(() => ctx.eqFromRows(['이름', '병원'], rows), /찾지 못했습니다/, '머리글이 다르면 막는다');
console.log('✅ 담당 장비 집계 테스트 통과');
