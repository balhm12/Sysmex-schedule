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
// 4-2) Chart.js 그래프 전체에 두 번째 축(yAxisID·y2:axis)이 하나도 없어야 한다(2026-11-12 — 단위가 다른 지표는 그래프를 나눈다)
assert(!/yAxisID/.test(html) && !/y2:axis\(/.test(html), 'Chart.js 그래프에 두 번째 축이 남아 있음');
['cFam', 'cFamTrend', 'cVol', 'cIdx', 'cQual', 'cMttr', 'cRev', 'cPm'].forEach(id => assert(html.includes("upsert('" + id + "'"), id + ' 그래프가 사라짐'));
// 5) 보고용 보기(2026-11-12) — Overview 만 보고서 모양으로 인쇄, 다른 화면 인쇄는 그대로
['rptHead', 'ovRptBtn', 'rptPrint', 'ovrfoot', 'ovrpt'].forEach(k => assert(html.includes(k), k + ' 없음'));
assert(html.includes('@page{size:A4'), 'A4 인쇄 설정 없음');
const bp = between("addEventListener('beforeprint'", "addEventListener('afterprint'");
assert(bp.includes("VIEW==='ov'"), 'beforeprint 가 Overview 에서만 보고용으로 바꾸지 않음');
assert(!/\bov(?:Rpt)?[^\n]*revisitAvg/.test(ovCode), '보고용 코드에 새 계산식');
// 사무소 표기: PROD(부서원 계산)의 사무소 값만 읽고 새 계산식을 만들지 않는다
assert(/offOf=/.test(ovCode) && /PROD\.team\[u\]/.test(ovCode) && /PROD\.revisit/.test(ovCode), '사무소 행이 PROD 를 읽지 않음');
assert(html.includes('id="${pf}Off"') && html.includes('사무소 표시'), '사무소 표시 체크박스 없음');
// 화면 통일: .dsx 는 Service Quality·Productivity·Organization·Instrument·Proactive 에서 켜고 Overview 는 #ov 규칙을 그대로 쓴다
['sq','prd','org','eqp','pro'].forEach(k => assert(new RegExp(k + ":\\{hash:'[^']+'[^}]*dsx:1").test(html), k + ' 화면에 dsx 가 꺼져 있음'));
assert(/\.dsx\{--ovp:var\(--primary\)\}/.test(html) && /#ov \.ovkpi,\.dsx \.ovkpi/.test(html), 'Overview CSS 가 .dsx 로 공유되지 않음');
['orgKpi','ogBars','ogTbl','proKpi','proRisk','tChr','sqKpiQ','sqKpiW','insKpis','eqpTitle','orgTitle','proTitle','sqTitle','prodTitle'].forEach(id => assert(html.includes('id="' + id + '"'), id + ' 없음'));
// 최종 개선(사무소 중심·그래프 유형): 사무소 행은 PROD 를 읽기만 하고, 도트 플롯·100% 누적 막대·더 보기 요소가 있다
const orgCode = between('function orgRows(mode){', 'function renderOrgTop');
assert(/PROD\.team\[u\]/.test(orgCode) && /PROD_UNITS/.test(orgCode) && !/revisitAvg|kpiCore\(|buildProdData\(/.test(orgCode), '사무소 행이 PROD 만 읽지 않음');
['famRvDots','orgMode','ogMix','proOgBars','proOgTbl','cPm','insPerf','instMore','fInstOver','lbMore'].forEach(id => assert(html.includes('id="' + id + '"'), id + ' 없음'));
assert(/function dsBars/.test(html) && /0에서 시작하지 않음/.test(html), '도트 플롯에 축 범위 안내가 없음');
assert(/\$\{ADMIN\?`, 원본 \$\{SRC\.act\}`:''\}/.test(html), '원본 파일명이 일반 사용자 헤더에 노출됨');
assert(/function chronicList/.test(html) && !/revisitAvg/.test(between('function chronicList', 'function renderProTop')), '반복 고장 목록이 새 계산식을 씀');
console.log('test_kpi_overview: OK (업무 유형 묶음 ' + Object.keys(core).length + '개 kpiCore 와 일치 · 새 계산식 없음 · 화면 전환·주소 · 목표·상태 기준 공유)');
