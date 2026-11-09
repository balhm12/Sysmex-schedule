/* 연장근무 파일 업로드(parseHr): 파일명에 연도가 없어도 읽는다 — 파일 저장일로 연도를 추정하고 화면에 알린다. 가명 데이터만 사용.
 * 실행: node tests/test_hr_year.js */
const fs = require('fs'), path = require('path'), vm = require('vm'), assert = require('assert');
const html = fs.readFileSync(path.join(__dirname, '..', 'fsg-kpi.html'), 'utf8');
function slice(name) {
  const start = html.indexOf('function ' + name + '('); assert(start >= 0, name + ' 없음');
  let depth = 0, str = null, line = false, block = false, prev = '';
  for (let i = html.indexOf('{', start); i < html.length; i++) {
    const c = html[i], n = html[i + 1];
    if (line) { if (c === '\n') line = false; continue; }
    if (block) { if (c === '*' && n === '/') { block = false; i++; } continue; }
    if (str) { if (c === '\\') { i++; continue; } if (c === str) str = null; continue; }
    if (c === '/' && n === '/') { line = true; i++; continue; }
    if (c === '/' && n === '*') { block = true; i++; continue; }
    if (c === '/' && /[=(,;!&|?:{}\[\s]/.test(prev || ' ')) { let j = i + 1, cls = false; for (; j < html.length; j++) { const d = html[j]; if (d === '\\') { j++; continue; } if (d === '[') cls = true; else if (d === ']') cls = false; else if (d === '/' && !cls) break; else if (d === '\n') break; } i = j; prev = '/'; continue; }
    if (c === '"' || c === "'" || c === '`') { str = c; prev = c; continue; }
    if (c === '{') depth++; else if (c === '}') { depth--; if (!depth) return html.slice(start, i + 1); }
    if (!/\s/.test(c)) prev = c;
  }
  throw new Error(name + ' 중괄호 불일치');
}
const XLSX = require('xlsx');
const src = ['toMs', 'col', 'xlsxRows', 'parseOtMonthly', 'parseHr'].map(slice).join('\n') + '\nconst DAY=86400000;';
const sb = { XLSX, console, Date, String, Number, Math, Array, Object, Error, isNaN, isFinite, parseFloat, Set, Map, ROSTER: [['가명A', 'FS WEST', 'T2']] };
vm.createContext(sb); vm.runInContext(src + ';this.parseHr=parseHr;', sb, { filename: 'fsg-kpi.html(slice)' });
let pass = 0; const ok = (c, m) => { if (!c) throw new Error('FAIL: ' + m); pass++; };
const head = ['No', '사번', '성명', '소속', '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
const row = (i, name, vals) => [String(i), '000' + i, name, 'Field Service Team'].concat(vals);
const zeros = Array(12).fill(0), val = (o) => zeros.map((_, k) => o[k + 1] || 0);
const rows = [head, row(1, '가명A', val({ 9: 3, 10: 2.3 })), row(2, '가명B', val({ 8: 5.15, 9: 3.3, 10: 1 })), row(3, '가명C', val({ 5: 4.4, 10: 0.3 })), row(4, '가명D', val({ 10: 8 })), row(5, '가명E', val({ 9: 2, 10: 4.3 })), row(6, '가명F', val({ 10: 1.3 }))];
const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(rows), 'Sheet');
const buf = new Uint8Array(XLSX.write(wb, { type: 'array', bookType: 'xlsx' }));
const T = (y, m, d) => new Date(y, m - 1, d).getTime();
// 1) 파일명에 연도가 있으면 그 연도, 안내 없음
let p = sb.parseHr(buf, '직원 월별연장근무현황_2026_10_7.xlsx', T(2025, 1, 1));
ok(p.yearNote === '' && Object.keys(p.h.가명A).join() === '2026-09,2026-10', '파일명 연도 우선: ' + Object.keys(p.h.가명A));
ok(p.upto === '2026-10' && p.asof === '2026-10-07', '파일명 날짜 → 자료 기준일');
// 2) 파일명에 연도가 없으면 파일 저장일의 연도(2026-11-09 저장) + 안내
p = sb.parseHr(buf, '직원월별연장근무현황 (10).xlsx', T(2026, 11, 9));
ok(Object.keys(p.h.가명A).join() === '2026-09,2026-10', '저장일 연도로 읽음: ' + Object.keys(p.h.가명A));
ok(/2026년으로 읽음/.test(p.yearNote) && /연도를 넣어/.test(p.yearNote), '추정했다는 안내');
ok(Math.abs(p.h.가명A['2026-10'] - (2 + 30 / 60)) < 1e-9 && p.upto === null, '시간.분 환산(2.30 = 2.5시간), 기준일 없음');
// 3) 값이 있는 가장 늦은 달이 저장일의 달보다 뒤면 아직 오지 않은 달 → 전년도 (예: 2027-03 저장인데 10월 값이 있으면 2026)
p = sb.parseHr(buf, '연장근무.xlsx', T(2027, 3, 2));
ok(Object.keys(p.h.가명A).join() === '2026-09,2026-10', '내년 3월에 저장한 10월분은 전년도: ' + Object.keys(p.h.가명A));
// 3-2) 미리 신청된 11·12월 몇 건(5명 미만)은 자료 달로 세지 않는다 — 2026-11-09 사용자 파일 모양(11월 3명·12월 1명)에서 2025년으로 잘못 읽던 것
const advRows = rows.map(r => r.slice()); advRows[1][14] = 2; advRows[2][14] = 3; advRows[3][14] = 1; advRows[1][15] = 6.3;
const wb2 = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb2, XLSX.utils.aoa_to_sheet(advRows), 'Sheet');
p = sb.parseHr(new Uint8Array(XLSX.write(wb2, { type: 'array', bookType: 'xlsx' })), '연장근무.xlsx', T(2026, 11, 9));
ok(Object.keys(p.h.가명A).join() === '2026-09,2026-10,2026-11,2026-12' && /2026년으로 읽음/.test(p.yearNote), '미리 신청된 달이 있어도 2026년: ' + Object.keys(p.h.가명A));
// 4) 저장일을 모르면 오늘 기준(오류로 멈추지 않음)
p = sb.parseHr(buf, '연장근무.xlsx');
ok(Object.keys(p.h).length === 6 && /년으로 읽음/.test(p.yearNote), '저장일 없어도 읽음');
// 5) 여전히 막아야 하는 경우: 성명 열이 없음 / 월 열이 없음
const bad = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(bad, XLSX.utils.aoa_to_sheet([['이름', '값'], ['가명A', 1]]), 'S');
let err = null; try { sb.parseHr(new Uint8Array(XLSX.write(bad, { type: 'array', bookType: 'xlsx' })), 'x_2026.xlsx'); } catch (e) { err = e; }
ok(err && /성명/.test(err.message), "'성명' 열 없음은 안내와 함께 거부");
const bad2 = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(bad2, XLSX.utils.aoa_to_sheet([['성명', '값'], ['가명A', 1]]), 'S');
err = null; try { sb.parseHr(new Uint8Array(XLSX.write(bad2, { type: 'array', bookType: 'xlsx' })), 'x_2026.xlsx'); } catch (e) { err = e; }
ok(err && /월/.test(err.message), "'1월'~'12월' 열 없음은 거부");
console.log('test_hr_year: OK (' + pass + '개 확인)');
