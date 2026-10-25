// fsg-kpi.html: S/N 칸이 0이면 "장비 없음"(2026-10-25 결정 A) — 업로드 파싱·저장 데이터 복원·자산대장 세 경로 모두
const fs = require('fs'), path = require('path'), vm = require('vm'), assert = require('assert');
const html = fs.readFileSync(path.join(__dirname, '..', 'fsg-kpi.html'), 'utf8');
function slice(name) {   // 'function name(' 부터 짝이 맞는 '}' 까지 (문자열·주석·정규식 건너뜀)
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
    if (c === '{') depth++; else if (c === '}') { depth--; if (depth === 0) return html.slice(start, i + 1); }
    if (!/\s/.test(c)) prev = c;
  }
  throw new Error(name + ' 중괄호 불일치');
}
const src = ['snOf', 'toMs', 'col', 'xlsxRows', 'parseActivity', 'parseSerial', 'decodeEmbed'].map(slice).join('\n') + '\nconst DAY=86400000;';
const XLSX = require('xlsx');
const sb = { XLSX, console, Date, String, Number, Math, Array, Object, Error, isNaN, Map, Set };
vm.createContext(sb); vm.runInContext(src, sb, { filename: 'fsg-kpi.html(slice)' });

const H = ['상태', '양식 타입', '시작 시간', '종료 시간', '담당자', '주제', 'Error 1', '거래처', 'Serial No. (lookup)', 'Product', '약속/활동 목적'];
const ser = ms => ms / 86400000 + 25569;
const rows = [H, ['완료됨', '서비스 요청', ser(Date.UTC(2026, 8, 1, 10)), ser(Date.UTC(2026, 8, 1, 11)), 'A', '', 'E1', 'H1', 0, 'XN-1000', '고장 수리'],
                 ['완료됨', '서비스 요청', ser(Date.UTC(2026, 8, 2, 10)), ser(Date.UTC(2026, 8, 2, 11)), 'A', '', 'E1', 'H1', 80364, 'XN-1000', '고장 수리'],
                 ['완료됨', '서비스 요청', ser(Date.UTC(2026, 8, 3, 10)), ser(Date.UTC(2026, 8, 3, 11)), 'A', '', 'E1', 'H1', ' 0 ', 'XN-1000', '고장 수리']];
const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(rows), 'a');
const buf = new Uint8Array(XLSX.write(wb, { type: 'array', bookType: 'xlsx' }));
const act = sb.parseActivity(buf);
assert.strictEqual(JSON.stringify(act.map(r => r.sn)), JSON.stringify(['', '80364', '']), '업로드 파싱: 0 → 빈칸, 숫자 S/N은 글자로');
// 저장소 데이터 복원: 예전에 '0'으로 저장된 S/N도 빈칸으로
const E = { n: 2, t: [1, 2], e: [3, 4], c: { st: [0, 0], own: [0, 0], err: [0, 0], acct: [0, 0], sn: [0, 1], prod: [0, 0], purp: [0, 0], subj: [0, 0] },
  d: { st: ['완료됨'], own: ['A'], err: ['E1'], acct: ['H1'], sn: ['0', '80364'], prod: ['XN-1000'], purp: ['고장 수리'], subj: [''] } };
assert.strictEqual(JSON.stringify(sb.decodeEmbed(E).map(r => r.sn)), JSON.stringify(['', '80364']), '저장 데이터 복원');
// 자산대장
const swb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(swb, XLSX.utils.aoa_to_sheet([['제품 상태', '거래처', 'Model', 'Serial No.'], ['사용', 'H1', 'XN-1000', 0], ['사용', 'H2', 'SP-50', 'A9953']]), 's');
const sr = sb.parseSerial(new Uint8Array(XLSX.write(swb, { type: 'array', bookType: 'xlsx' })));
assert.strictEqual(JSON.stringify(sr.map(s => s.sn)), JSON.stringify(['', 'A9953']), '자산대장 S/N 0 → 빈칸');
console.log('test_kpi_sn_zero: OK (S/N 0 = 장비 없음 — 업로드·저장 복원·자산대장)');
