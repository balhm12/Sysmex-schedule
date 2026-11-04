#!/usr/bin/env node
/* fsg-kpi.html 의 「담당 장비」 읽기 함수(EQ_FIELD·EQ_FIELDS·parseEq·eqFromRows·eqByPerson)를 글자 그대로 떼어 fsg-report/equip-core.js 를 만든다.
 * 대시보드와 월간보고가 같은 계산·같은 머리글 규칙을 쓰게 하는 장치다(kpi-core.js 와 같은 방식). 규칙을 바꿀 때는 fsg-kpi.html 을 고치고 이 스크립트를 다시 돌린다.
 * tests/test_equip.js 가 두 파일이 어긋나면 실패한다.
 *   node fsg-report/tools/extract-equip-core.js            # equip-core.js 다시 생성
 *   node fsg-report/tools/extract-equip-core.js --check    # 생성하지 않고 같은지만 확인(종료 코드 1 = 다름) */
'use strict';
const fs = require('fs'), path = require('path');
const { sliceFunction } = require('./extract-kpi-core');
const ROOT = path.resolve(__dirname, '..', '..');
const HTML = path.join(ROOT, 'fsg-kpi.html');
const OUT = path.join(ROOT, 'fsg-report', 'equip-core.js');
const FUNCS = ['parseEq', 'eqFromRows', 'eqByPerson'];
const CONSTS = ['EQ_FIELD', 'EQ_FIELDS'];

function sliceConst(src, name) {
  const m = src.match(new RegExp('^const ' + name + '=.*;$', 'm'));
  if (!m) throw new Error(name + ' 상수를 fsg-kpi.html에서 찾지 못했습니다');
  return m[0];
}
function build(html) {
  const consts = CONSTS.map(n => sliceConst(html, n)), funcs = FUNCS.map(n => sliceFunction(html, n));
  funcs.forEach(p => new Function('XLSX', p));                           // 떼어 낸 본문이 문법적으로 완전한지
  return [
    '/* 생성 파일 — 손으로 고치지 말 것.',
    ' * fsg-kpi.html의 담당 장비 읽기(EQ_FIELD·parseEq·eqFromRows·eqByPerson)를 tools/extract-equip-core.js 가 글자 그대로 떼어 낸 사본이다.',
    ' * 규칙을 바꾸려면 fsg-kpi.html을 고친 뒤 `node fsg-report/tools/extract-equip-core.js`를 다시 돌린다.',
    ' * (대시보드·월간보고가 같은 규칙을 쓰도록 tests/test_equip.js 가 두 파일의 일치를 검사한다) */',
    "const XLSX = require('xlsx');   // 대시보드는 브라우저 전역 XLSX 를 쓴다 — 함수 본문은 그대로",
    '',
    ...consts, '',
    ...funcs.map(p => p + '\n'),
    'module.exports = { EQ_FIELD: EQ_FIELD, EQ_FIELDS: EQ_FIELDS, parseEq: parseEq, eqFromRows: eqFromRows, eqByPerson: eqByPerson };',
    '',
  ].join('\n');
}
if (require.main === module) {
  const want = build(fs.readFileSync(HTML, 'utf8'));
  if (process.argv.includes('--check')) {
    const have = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
    if (have !== want) { console.error('equip-core.js 가 fsg-kpi.html과 다릅니다. node fsg-report/tools/extract-equip-core.js 로 다시 생성하세요.'); process.exit(1); }
    console.log('equip-core.js = fsg-kpi.html (일치)');
  } else { fs.writeFileSync(OUT, want); console.log('wrote', path.relative(ROOT, OUT), want.length, 'chars'); }
}
module.exports = { build, HTML, OUT, FUNCS, CONSTS };
