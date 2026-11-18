#!/usr/bin/env node
/* fsg-kpi.html 의 「직원용 자료」 만들기(STAFF_SALT·staffCodeOf·staffBundle)와 시각 보정(TZ_FIX·fixTz)을 글자 그대로 떼어 fsg-report/staff-core.js 를 만든다.
 * 브라우저 「CRM 데이터 올리기」와 PC 올리기 프로그램(push-dashboard.js)이 같은 방법으로 이름 없는 사본을 만들게 하는 장치다(kpi-core.js·equip-core.js 와 같은 방식).
 * 규칙을 바꿀 때는 fsg-kpi.html 을 고치고 이 스크립트를 다시 돌린다. tests/test_staff.js 가 두 파일이 어긋나면 실패한다.
 *   node fsg-report/tools/extract-staff-core.js            # staff-core.js 다시 생성
 *   node fsg-report/tools/extract-staff-core.js --check    # 생성하지 않고 같은지만 확인(종료 코드 1 = 다름) */
'use strict';
const fs = require('fs'), path = require('path');
const { sliceFunction } = require('./extract-kpi-core');
const ROOT = path.resolve(__dirname, '..', '..');
const HTML = path.join(ROOT, 'fsg-kpi.html');
const OUT = path.join(ROOT, 'fsg-report', 'staff-core.js');

function sliceBlock(src) {
  const a = src.indexOf('/* STAFF-CORE-BEGIN'), b = src.indexOf('/* STAFF-CORE-END */');
  if (a < 0 || b < a) throw new Error('fsg-kpi.html 에서 STAFF-CORE 구간을 찾지 못했습니다');
  return src.slice(src.indexOf('\n', a) + 1, b).replace(/\s+$/, '');
}
function sliceTzFix(src) {
  const m = src.match(/^const TZ_FIX = \{[\s\S]*?\};$/m);
  if (!m) throw new Error('TZ_FIX 상수를 fsg-kpi.html에서 찾지 못했습니다');
  return m[0];
}
function build(html) {
  const block = sliceBlock(html), tz = sliceTzFix(html), fix = sliceFunction(html, 'fixTz');
  new Function(block + '\n' + tz + '\n' + fix);                           // 떼어 낸 본문이 문법적으로 완전한지
  return [
    '/* 생성 파일 — 손으로 고치지 말 것.',
    ' * fsg-kpi.html의 직원용 자료 만들기(STAFF_SALT·staffCodeOf·staffBundle)와 시각 보정(TZ_FIX·fixTz)을 tools/extract-staff-core.js 가 글자 그대로 떼어 낸 사본이다.',
    ' * 규칙을 바꾸려면 fsg-kpi.html을 고친 뒤 `node fsg-report/tools/extract-staff-core.js`를 다시 돌린다.',
    ' * (브라우저 올리기와 PC 올리기가 같은 사본을 만들도록 tests/test_staff.js 가 두 파일의 일치를 검사한다) */',
    block, '',
    tz,
    fix, '',
    'module.exports = { STAFF_SALT: STAFF_SALT, staffCodeOf: staffCodeOf, staffBundle: staffBundle, TZ_FIX: TZ_FIX, fixTz: fixTz };',
    '',
  ].join('\n');
}
if (require.main === module) {
  const want = build(fs.readFileSync(HTML, 'utf8'));
  if (process.argv.includes('--check')) {
    const have = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
    if (have !== want) { console.error('staff-core.js 가 fsg-kpi.html과 다릅니다. node fsg-report/tools/extract-staff-core.js 로 다시 생성하세요.'); process.exit(1); }
    console.log('staff-core.js = fsg-kpi.html (일치)');
  } else { fs.writeFileSync(OUT, want); console.log('wrote', path.relative(ROOT, OUT), want.length, 'chars'); }
}
module.exports = { build, HTML, OUT };
