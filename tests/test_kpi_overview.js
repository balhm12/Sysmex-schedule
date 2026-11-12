/* Overview 화면(2026-11-12) — 새 계산식을 만들지 않았는지, 업무 유형 묶음이 kpiCore 와 같은지 확인 */
const fs = require('fs'), assert = require('assert');
const html = fs.readFileSync(__dirname + '/../fsg-kpi.html', 'utf8');
function between(a, b) { const i = html.indexOf(a); assert(i >= 0, a + ' 를 찾지 못함'); const j = html.indexOf(b, i); assert(j > i, b + ' 를 찾지 못함'); return html.slice(i, j); }
// 1) 업무 유형 묶음 — kpiCore 의 BUCKET 과 Overview 의 OV_BUCKET 이 같은 목록
const core = new Function(between('var BUCKET = ', 'function bucket(p)') + '; return BUCKET;')();
const ovSrc = between('const OV_BUCKET=', 'const ovBucket=');
const ov = new Function(ovSrc.replace('const OV_BUCKET=', 'var OV_BUCKET=') + '; return OV_BUCKET;')();
assert.deepStrictEqual(Object.entries(ov).sort(), Object.entries(core).sort(), 'Overview 업무 유형 묶음이 kpiCore BUCKET 과 다름');
// 2) Overview 구간에는 kpiCore 계산을 새로 만들지 않는다 — 재방문·FTFR·MTTR 은 stats()/PROD 에서만 읽는다
const ovCode = between('/* ===== Overview (2026-11-12 2단계 시안)', 'function setView(v){');
['revisitAvg', 'buildProdData(', 'kpiCore('].forEach(w => assert(!ovCode.includes(w), 'Overview 코드가 ' + w + ' 를 직접 부름'));
assert(/stats\(p\.months,team\)/.test(ovCode) && /PROD\.team\[t\]/.test(ovCode), 'stats()/PROD 를 읽지 않음');
// 3) 화면 전환·주소
const sv = between('function setView(v){', 'function showMain');
assert(sv.includes("'ov'") && sv.includes('#overview') && sv.includes('renderOv()'));
assert(html.includes('id="vtOv"') && html.includes('id="ov"'));
// 4) 상태·목표는 서비스 탭과 같은 값(TARGET_*)과 tgSt 를 쓴다
assert(ovCode.includes('tgSt(') && ovCode.includes('TARGET_FTFR') && ovCode.includes('TARGET_REV') && ovCode.includes('TARGET_MTTR'));
console.log('test_kpi_overview: OK (업무 유형 묶음 ' + Object.keys(core).length + '개 kpiCore 와 일치 · 새 계산식 없음 · 화면 전환·주소 · 목표·상태 기준 공유)');
