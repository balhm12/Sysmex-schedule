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
// 3) 화면 6개 — 전환·주소·섹션 배치 (2026-11-12 재편)
const screens = new Function(between('const SCREENS=', 'const VIEW_ALIAS') .replace('const SCREENS=', 'var SCREENS=') + '; return SCREENS;')();
assert.deepStrictEqual(Object.keys(screens).sort(), ['eqp', 'ov', 'org', 'pro', 'prd', 'sq'].sort());
assert.strictEqual(new Set(Object.values(screens).map(s => s.hash)).size, 6, '화면 주소가 겹침');
assert.strictEqual(screens.prd.hash, '#people', '기존 주소 #people 은 Productivity 로 유지');
const sv = between('function setView(v){', 'function showMain');
assert(sv.includes('rerender()') && sv.includes('scr-off'));
assert(between('function rerender(){', 'function showMain').includes('renderOv()'));
['vtOv', 'vtSq', 'vtOrg', 'vtPrd', 'vtEqp', 'vtPro'].forEach(id => assert(html.includes('id="' + id + '"'), id + ' 탭 없음'));
assert(html.includes('id="ov"'));
// 서비스 탭에 있던 모든 섹션 제목(h2.sec)과 패널이 새 화면 어딘가에 배정돼 있어야 한다(기능 삭제·숨김 방지)
const main = between('<main class="wrap" id="mainArea" hidden>', '</main>');
const h2 = [...main.matchAll(/<h2 class="sec"([^>]*)>/g)];
assert(h2.length >= 8 && h2.every(m => /data-scr="[a-z ]+"/.test(m[1])), '화면에 배정되지 않은 h2.sec 가 있음');
const used = new Set([...main.matchAll(/data-scr="([a-z ]+)"/g)].flatMap(m => m[1].split(' ')));
used.forEach(k => assert(screens[k], 'data-scr 값 ' + k + ' 이 화면 목록에 없음'));
['teams', 'kpis', 'tpBox', 'cVol', 'cIdx', 'cQual', 'cMttr', 'tSeries', 'health', 'cFam', 'cErr', 'tInsList', 'tInst', 'dq', 'insKpis'].forEach(id => assert(main.includes('id="' + id + '"'), id + ' 가 서비스 영역에서 사라짐'));
// 축 2개 그래프를 새로 만들지 않는다(추이 4개는 각각 축 1개)
const trend = between("upsert('cVol'", 'renderOrg(p, team);');
assert(!/y2:/.test(trend) && !/yAxisID/.test(trend), '추이 그래프에 두 번째 축이 있음');
// 4) 상태·목표는 서비스 탭과 같은 값(TARGET_*)과 tgSt 를 쓴다
assert(ovCode.includes('tgSt(') && ovCode.includes('TARGET_FTFR') && ovCode.includes('TARGET_REV') && ovCode.includes('TARGET_MTTR'));
console.log('test_kpi_overview: OK (업무 유형 묶음 ' + Object.keys(core).length + '개 kpiCore 와 일치 · 새 계산식 없음 · 화면 전환·주소 · 목표·상태 기준 공유)');
