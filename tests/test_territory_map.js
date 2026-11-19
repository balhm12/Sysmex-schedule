/* 사무소·팀 지도 (2026-11-19) — 경계 자료와 담당 지역 표가 서로 맞는지, 지도가 밖으로 자료를 보내지 않는지 */
const fs = require('fs'), path = require('path'), assert = require('assert');
const root = path.join(__dirname, '..'), html = fs.readFileSync(path.join(root, 'fsg-kpi.html'), 'utf8');
const topo = JSON.parse(fs.readFileSync(path.join(root, 'fsg-kpi-map.json'), 'utf8'));
const SD = eval('(' + /const MAP_SD=(\{[^;]+\});/.exec(html)[1] + ')');
const TERR = eval('(' + /const MAP_TERR=(\{[\s\S]+?\}\s*\});/.exec(html)[1] + ')');
const UNITS = eval(/const PROD_UNITS = (\[[^\]]+\]);/.exec(html)[1]);
const geoms = topo.objects[Object.keys(topo.objects)[0]].geometries;
const keys = new Set(geoms.map(g => SD[String(g.properties.code).slice(0, 2)] + ' ' + g.properties.name));
const sds = new Set(geoms.map(g => SD[String(g.properties.code).slice(0, 2)]));

assert.ok(geoms.length >= 240 && geoms.length <= 260, '시군구 수가 이상함: ' + geoms.length);
assert.ok(!sds.has(undefined) && sds.size === 17, '시·도 17곳이 모두 있어야 함');
assert.ok(fs.statSync(path.join(root, 'fsg-kpi-map.json')).size < 150000, '경계 파일은 150KB 아래로');
assert.deepStrictEqual(Object.keys(TERR.sgg).filter(k => !keys.has(k)), [], '담당 지역 표의 시군구 이름이 경계 자료에 없음');
assert.deepStrictEqual(Object.values(TERR.sgg).concat(Object.values(TERR.sd)).filter(u => !UNITS.includes(u)), [], '담당 지역 표에 없는 단위');
/* 서울·경기만 표에 기본값이 없다(CRM 방문 다수결로 나눔) */
assert.deepStrictEqual([...sds].filter(x => !TERR.sd[x]).sort(), ['경기', '서울']);
/* 기준표(fsg-roster 2026-11-04)의 예외가 그대로인지 */
assert.strictEqual(TERR.sd['제주'], 'FS WEST'); assert.strictEqual(TERR.sd['강원'], 'FS EAST'); assert.strictEqual(TERR.sgg['경남 거창군'], 'FS SOUTH 대구');
assert.strictEqual(Object.keys(TERR.sgg).filter(k => TERR.sgg[k] === 'FS CENTRAL 광주').length, 8, '광주 사무소가 맡는 전북 8곳');
/* 외부 지도 서비스·타일을 쓰지 않는다. 개인 위치(거주지)를 그리지 않는다 */
const i = html.indexOf('/* ===== 사무소·팀 지도'), j = html.indexOf('/* ===== 장비군별 고장률·재방문율 추이', i), code = html.slice(i, j);
assert.ok(i > 0 && j > i);
assert.ok(!/https?:\/\//.test(code), '지도 코드에 외부 주소가 있으면 안 됨');
assert.ok(!/GEO\.home/.test(code), '지도는 거주지 좌표를 쓰지 않는다');
assert.ok(/const MAP_URL='fsg-kpi-map\.json'/.test(code));
/* 두 탭에 들어가 있고, 값은 loadIndex 에서 온다 */
assert.ok(/terrMapFill\('load', 'idx'\)/.test(html) && /terrMapFill\('move', 'move'\)/.test(html));
assert.ok(/function terrMapFill\(tab, defK\)\{[\s\S]{0,200}loadIndex\(state\.period\)/.test(html));
console.log('test_territory_map: 통과');

/* 건당 평균 시간 (2026-11-19 「건수에 평균시간」) — 건수가 나오는 곳에 같은 식으로: 작업 시간 ÷ 시간이 기록된 건수 */
assert.ok(/\{k:'avgm',n:'건당 평균 시간',u:'분',d:0,type:'bar'\}/.test(html), 'Organization 비교 지표에 건당 평균 시간');
assert.ok(/out\.avgm=out\.tnAll\?A\.tot\/out\.tnAll:null/.test(html), '건당 평균 = 작업 시간 ÷ 시간이 기록된 건수');
assert.ok(/const OG_CORE=\[[^\]]*'건당 평균 시간 \(분\)'/.test(html), '조직 표의 핵심 열(기본으로 보임)');
assert.ok(/'처리 건수','건당 평균 시간 \(분\)','1인당 처리 건수'/.test(html));
assert.ok(/row\('건당 평균 작업 시간'/.test(html), '개인 종합 요약');
assert.ok(/\['건당 평균\(분\)','avg'\]/.test(html) && /평가 건당\(분\)/.test(html), '평가·Calibration 탭');
assert.ok(/if\(mins>0&&mins<=500\)\{ c\[1\]\+=mins; c\[2\]\+\+; \}/.test(code), '지도의 지역 방문 평균도 작업 시간과 같은 범위(0~500분)');
console.log('test_territory_map: 건당 평균 시간 확인 통과');

/* 개인 순위표의 건당 평균 시간 (2026-11-19) — 같은 식(workTimeSum), 휴대폰에서는 이름 아래 줄에 */
assert.ok(/\{k:'avg', label:'건당 평균 시간', num:true, cls:'lbav'\}/.test(html), '개인 순위표 열');
assert.ok(/lbAvg = function\(n\)\{[^\n]*workTimeSum\(\[n\], lbWm\)/.test(html), '개인 순위표도 workTimeSum 으로 계산');
assert.ok(/#prod #lbTable \.lbeq,#prod #lbTable \.lbav\{display:none\}/.test(html) && /' · 건당 '\+fmt\(Math\.round\(r\.avg\)\)\+'분'/.test(html), '휴대폰: 열은 숨기고 이름 아래 줄에 표시');
console.log('test_territory_map: 개인 순위표 건당 평균 확인 통과');

/* Overview 의 건당 평균 작업 시간 (2026-11-19) — 다섯째 칸. OV_K(목표 판정·보고용 보기가 같이 씀)에는 넣지 않고, 보고용 보기는 네 칸 그대로 */
assert.ok(/const OV_AVG=\{k:'avgm',n:'건당 평균 작업 시간',u:'분'/.test(html), 'Overview 칸 정의');
{ const a=html.indexOf('const OV_K=['), b=html.indexOf('}];',a); assert.ok(a>0&&b>a&&!/avgm/.test(html.slice(a,b)), 'OV_K 에는 넣지 않는다'); }
assert.ok(/cur\.avgm=ovAvg\(p\.months\); prv\.avgm=ovAvg\(pp\.months\)/.test(html) && /ovAvg=mm=>\{ try\{ const A=workTimeSum\(ovNm,/.test(html), 'Overview 도 workTimeSum 으로 계산');
assert.ok(/body\.rpt #ov #ovKpi \.ovkc:nth-child\(5\)\{display:none\}/.test(html), '보고용 보기는 네 칸');
assert.ok(/#ov \.ovkpi\.c5 \.ovkc:nth-child\(5\)\{grid-column:1\/-1;border-left:0\}/.test(html), '좁은 화면에서 다섯째 칸은 한 줄 전체');
console.log('test_territory_map: Overview 건당 평균 확인 통과');

/* Organization·Overview 의 지도 (2026-11-19 「지도를 조직·사무소 쪽에」「overview에도 지도」) — 팀·사무소별 비교와 같은 값(orgRows), 같은 그리기 함수 */
assert.ok(/id="ogMapCard"[^>]*data-scr="org"/.test(html) && /id="ogMap"/.test(html), 'Organization 지도 카드');
assert.ok(/id="ovMapCard"/.test(html) && /id="ovMap"/.test(html), 'Overview 지도 카드');
assert.ok(/function orgMap\(o\)\{[^\n]*orgRows\('office'\)/.test(html) && /terrMapDraw\(host,\{units:O\.map/.test(html), '값은 orgRows, 그리기는 terrMapDraw');
assert.ok(/orgMap\(\{host:'ogMap'[^\n]*onSel:k=>\{ ORG\.m=k; rerender\(\); \}/.test(html), 'Organization: 지표를 바꾸면 막대와 지도가 같이');
assert.ok(/orgMap\(\{host:'ovMap'/.test(html) && /OV\.metric=b\.dataset\.k; OV\.mapM=null;/.test(html), 'Overview: 핵심 지표를 누르면 지도가 따라감');
assert.ok(/body\.rpt #ovMapCard\{display:none\}/.test(html), '보고용 보기·PDF 에는 지도를 넣지 않는다');
assert.ok(/spanK=hi>lo\?Math\.min\(1,/.test(html), '값 차이가 작으면 색 차이도 작게');
console.log('test_territory_map: Organization·Overview 지도 확인 통과');

/* 지도 팀별 확대 (2026-11-19 「지도는 각 팀별로 확대해서」) — 전국·팀 단추, 그 팀이 맡은 시군구로 그림 범위를 줄인다 */
assert.ok(/const zoomBox=\(\)=>\{/.test(html) && /class="'\+\(cfg\.segClass\|\|'segmented'\)\+' tmzseg"/.test(html), '확대 범위 계산과 단추 줄');
assert.ok(/g\.sd==='제주'\|\|teamOf\(D\.unit\[gi\]\)!==Z/.test(html), '확대 범위에서 제주는 뺀다');
assert.ok(/function mapZoomOf\(st,cur\)\{ return st&&st\.f===cur\?st\.z:cur; \}/.test(html), '화면에서 고른 팀을 따라가고, 지도에서 고르면 팀 선택이 바뀔 때까지 유지');
assert.ok(/zoom:mapZoomOf\(ORG\.mapZ,/.test(html) && /zoom:mapZoomOf\(OV\.mapZ,team\|\|''\)/.test(html) && /zoom:window\.mapZoomOf\(state\.tmZ\[tab\], cur\)/.test(html), '세 화면 모두');
assert.ok(/\(zoomed\?'':zoom\)\+top/.test(html), '확대했을 때 수도권 확대 그림은 뺀다');
console.log('test_territory_map: 팀별 확대 확인 통과');
