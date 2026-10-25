#!/usr/bin/env node
/* fsg-kpi.html 안의 kpiCore·buildProdData 함수를 글자 그대로 떼어 fsg-report/kpi-core.js를 만든다.
 * 대시보드와 월간보고가 같은 계산을 쓰게 하는 장치다. 계산을 바꿀 때는 fsg-kpi.html을 고치고 이 스크립트를 다시 돌린다.
 * tests/test_kpi_core_sync.js 가 두 파일이 어긋나면 실패한다.
 *   node fsg-report/tools/extract-kpi-core.js            # kpi-core.js 다시 생성
 *   node fsg-report/tools/extract-kpi-core.js --check    # 생성하지 않고 같은지만 확인(종료 코드 1 = 다름) */
'use strict';
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const HTML = path.join(ROOT, 'fsg-kpi.html');
const OUT = path.join(ROOT, 'fsg-report', 'kpi-core.js');
const NAMES = ['kpiCore', 'buildProdData'];

// 문자열·주석·정규식을 건너뛰며 중괄호 짝을 맞춰 함수 본문 끝을 찾는다
function sliceFunction(src, name) {
  const start = src.indexOf('function ' + name + '(');
  if (start < 0) throw new Error(name + ' 함수를 fsg-kpi.html에서 찾지 못했습니다');
  let depth = 0, str = null, line = false, block = false, prev = '';
  for (let i = src.indexOf('{', start); i < src.length; i++) {
    const c = src[i], n = src[i + 1];
    if (line) { if (c === '\n') line = false; continue; }
    if (block) { if (c === '*' && n === '/') { block = false; i++; } continue; }
    if (str) { if (c === '\\') { i++; continue; } if (c === str) str = null; continue; }
    if (c === '/' && n === '/') { line = true; i++; continue; }
    if (c === '/' && n === '*') { block = true; i++; continue; }
    if (c === '/' && /[=(,;!&|?:{}\[\s]/.test(prev || ' ')) {           // 정규식 리터럴: 닫는 / 까지 건너뜀
      let j = i + 1, cls = false;
      for (; j < src.length; j++) { const d = src[j]; if (d === '\\') { j++; continue; } if (d === '[') cls = true; else if (d === ']') cls = false; else if (d === '/' && !cls) break; else if (d === '\n') break; }
      i = j; prev = '/'; continue;
    }
    if (c === '"' || c === "'" || c === '`') { str = c; prev = c; continue; }
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) return src.slice(start, i + 1); }
    if (!/\s/.test(c)) prev = c;
  }
  throw new Error(name + ' 함수의 중괄호가 닫히지 않습니다');
}
function build(html) {
  const parts = NAMES.map(n => sliceFunction(html, n));
  parts.forEach(p => new Function(p));                                    // 떼어 낸 본문이 문법적으로 완전한지
  return [
    '/* 생성 파일 — 손으로 고치지 말 것.',
    ' * fsg-kpi.html의 kpiCore·buildProdData를 tools/extract-kpi-core.js 가 글자 그대로 떼어 낸 사본이다.',
    ' * 계산을 바꾸려면 fsg-kpi.html을 고친 뒤 `node fsg-report/tools/extract-kpi-core.js`를 다시 돌린다.',
    ' * (대시보드·월간보고가 같은 함수를 쓰도록 tests/test_kpi_core_sync.js 가 두 파일의 일치를 검사한다) */',
    '',
    ...parts.map(p => p + '\n'),
    "if (typeof module !== 'undefined' && module.exports) module.exports = { kpiCore: kpiCore, buildProdData: buildProdData };",
    '',
  ].join('\n');
}
if (require.main === module) {
  const html = fs.readFileSync(HTML, 'utf8');
  const want = build(html);
  if (process.argv.includes('--check')) {
    const have = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
    if (have !== want) { console.error('kpi-core.js 가 fsg-kpi.html과 다릅니다. node fsg-report/tools/extract-kpi-core.js 로 다시 생성하세요.'); process.exit(1); }
    console.log('kpi-core.js = fsg-kpi.html (일치)');
  } else {
    fs.writeFileSync(OUT, want);
    console.log('wrote', path.relative(ROOT, OUT), want.length, 'chars');
  }
}
module.exports = { sliceFunction, build, HTML, OUT, NAMES };
