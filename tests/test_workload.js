// Workload(업무부하) 화면의 계산 함수 손계산 대조 — 가명 기관·합성 활동만 사용
const fs=require('fs'), path=require('path'), assert=require('assert');
const html=fs.readFileSync(path.join(__dirname,'..','fsg-kpi.html'),'utf8');
const a=html.indexOf('/* ===== Workload — 업무부하 분석'), b=html.indexOf('\nfunction setView(v){',a);
assert(a>0&&b>a,'Workload 블록을 찾지 못함');
const block=html.slice(a,b);
// 페이지 상수(실제 값) — 공휴일·사무소
const KR=eval(html.match(/const KR_HOLIDAYS=(\[[^\]]*\])/)[1]);
const env=`const DAY=86400000; const KR_HOLIDAYS=${JSON.stringify(KR)};
const ROSTER=[['테스트1','FS WEST','T1'],['테스트2','FS EAST','T1'],['테스트3','FS CENTRAL','T1'],['테스트4','FS SOUTH','T1']];
const OFFICE={'테스트3':'대전','테스트4':'부산'}; const PROD_UNITS=['FS WEST','FS EAST','FS CENTRAL 대전','FS CENTRAL 광주','FS SOUTH 부산','FS SOUTH 대구'];
let EQD={rows:[['테스트1','가 수탁 A','경기'],['테스트2','가 수탁 B','경기도'],['테스트1','가 수탁 C','서울'],['테스트1','가 수탁 D','인천']]};
const mkey=ms=>{const d=new Date(ms);return d.getUTCFullYear()+'-'+String(d.getUTCMonth()+1).padStart(2,'0');};
const esc=s=>String(s); const $=()=>null;`;
const api=new Function(env+block+';return {wlSplit,wlBand,wlVisits,wlAgg,wlAcadAgg,parseAcad,wlRegionAuto,wlInfo,wlSug,set INST(v){INST=v;},set ACAD(v){ACAD=v;}};')();
const T=(y,m,d,h,mi)=>Date.UTC(y,m-1,d,h,mi||0);   // 벽시계 시각
// 2026-11-11(수) 평일, 2026-11-14(토), 2026-10-09(금, 한글날 공휴일)
let s=api.wlSplit(T(2026,11,11,17),T(2026,11,11,19)); assert.deepStrictEqual([s.day,s.night,s.hol],[60,60,0],'평일 17~19시 = 주간 60·야간 60');
s=api.wlSplit(T(2026,11,11,7),T(2026,11,11,8,30)); assert.deepStrictEqual([s.day,s.night],[30,60],'07~08:30 = 야간 60·주간 30');
s=api.wlSplit(T(2026,11,13,23),T(2026,11,14,1)); assert.deepStrictEqual([s.night,s.hol],[60,60],'금 23시~토 01시 = 야간 60·주말 60');
assert.strictEqual(api.wlBand(T(2026,11,14,10),T(2026,11,14,11)),'hol','토요일 = 주말·공휴일');
assert.strictEqual(api.wlBand(T(2026,10,9,10),T(2026,10,9,11)),'hol','한글날 = 공휴일');
assert.strictEqual(api.wlBand(T(2026,11,11,17),T(2026,11,11,18,30)),'night','18시를 넘기면 야간(겹침)');
assert.strictEqual(api.wlBand(T(2026,11,11,9),T(2026,11,11,17,59)),'day');
assert.strictEqual(api.wlBand(T(2026,11,11,20),null),'night','종료 없음 = 시작 시각으로');
// 방문 묶기: 같은 거래처·같은 날·60분 안 이어짐 = 1건, 공동 방문 인원 수
const r=(acct,t,dur,credits,purp)=>({acct,t,dur,credits,purp:purp||'고장 수리',internal:false});
const rows=[r('가 수탁 A',T(2026,11,11,19),60,['테스트1']),r('가 수탁 A',T(2026,11,11,20,30),30,['테스트1','테스트2']),   // 같은 방문(이어짐)
  r('가 수탁 A',T(2026,11,11,23,30),30,['테스트1']),        // 90분 뒤 → 다른 방문
  r('가 수탁 B',T(2026,11,14,10),60,['테스트2']),            // 토요일
  r('나 병원',T(2026,11,12,10),60,['테스트3']),               // 평일 주간
  r('다 병원',T(2026,11,12,10),60,['테스트4'],'원격 Calibration'),   // 원격 = 방문 아님
  Object.assign(r('사내',T(2026,11,12,10),60,['테스트1']),{internal:true})];
const V=api.wlVisits(rows);
assert.strictEqual(V.length,4,'방문 4건 (이어진 활동 1건 · 원격·사내 제외) '+V.length);
const v1=V.find(v=>v.acct==='가 수탁 A'&&v.rows.length===2); assert(v1&&v1.ppl.size===2&&v1.pmin===60+30*2,'공동 방문: 인원 2·투입 120분 '+(v1&&v1.pmin));
assert.strictEqual(v1.band,'night'); assert.strictEqual(v1.offmin,60+60,'정규근무 외 = 19~20 60분 + 20:30~21 30분×2명');
// 분류: 이름이 아니라 관리자 지정 표만
assert.strictEqual(api.wlInfo('녹십자의료재단').t,'','지정 없으면 미분류(이름으로 정하지 않음)');
assert(api.wlSug('녹십자의료재단 테스트').g==='gc','이름은 후보 제시에만');
assert.strictEqual(api.wlRegionAuto('가 수탁 A'),'경기 West','경기 + WEST 담당 = 경기 West');
assert.strictEqual(api.wlRegionAuto('가 수탁 B'),'경기 East');
assert.strictEqual(api.wlRegionAuto('가 수탁 C'),'서울'); assert.strictEqual(api.wlRegionAuto('가 수탁 D'),'지방','인천 = 지방(지시서: 서울·경기 외)');
assert.strictEqual(api.wlRegionAuto('관리표에 없음'),'','관리표에 없으면 미분류');
api.INST={map:{'가 수탁 A':{t:'lab',g:'gc'},'가 수탁 B':{t:'lab',g:'',r:'지방'},'나 병원':{t:'hosp'}}};
assert.strictEqual(api.wlInfo('가 수탁 B').r,'지방','관리자가 바꾼 지역이 우선');
const A=api.wlAgg(V,api.wlInfo);
assert.strictEqual(A.all.n,4); assert.strictEqual(A.all.day+A.all.night+A.all.hol,A.all.n,'주간+야간+주말 = 전체');
assert.strictEqual(A.type.lab.n,3); assert.strictEqual(A.type.hosp.n,1);
assert.strictEqual(A.grp.gc.n+A.labOther.n,A.type.lab.n,'5대 + 기타 = 수탁기관');
assert.strictEqual(A.grp.gc.night,2,'녹십자 야간 2'); assert.strictEqual(A.reg['경기 West'].n,2); assert.strictEqual(A.reg['지방'].hol,1);
assert.strictEqual(Object.values(A.reg).reduce((s,o)=>s+o.n,0),A.type.lab.n,'지역 합계(미분류 포함) = 수탁기관');
assert.strictEqual(A.q.joint,1);
// 학술: Slack 첫날부터는 Slack, 그 전은 Talk / 08~18 주간, 공휴일은 별도
const h=(m)=>{ const a=new Array(24).fill(0); Object.entries(m).forEach(([k,v])=>a[k]=v); return a; };
const acad=api.parseAcad(JSON.stringify({kind:'fsportal-acad',src:'talk',days:{'2026-11-09':h({10:2,20:1}),'2026-11-10':h({9:5}),'2026-10-09':h({11:1})}}),'t.json');
api.ACAD=acad; let g=api.wlAcadAgg(['2026-11','2026-10']); assert.deepStrictEqual([g.n,g.day,g.night,g.hol],[9,7,1,1],'Talk 만');
api.ACAD=api.parseAcad(JSON.stringify({kind:'fsportal-acad',src:'slack',days:{'2026-11-10':h({7:1,8:1})}}),'s.json');
// parseAcad 는 기존 ACAD 에 합침 — 위에서 api.ACAD 를 Talk 로 두었으므로 다시 합쳐 봄
api.ACAD=Object.assign({},acad,{slack:{days:{'2026-11-10':h({7:1,8:1})}}});
g=api.wlAcadAgg(['2026-11']); assert.deepStrictEqual([g.n,g.day,g.night],[5,3,2],'11/10 부터 Slack(07시 = 야간, 08시 = 주간), 11/09 는 Talk '+JSON.stringify([g.n,g.day,g.night]));
assert(g.src.has('talk')&&g.src.has('slack'));
assert.throws(()=>api.parseAcad('{"kind":"x"}','x'),/학술 파일이 아닙니다/);
assert.throws(()=>api.parseAcad(JSON.stringify({kind:'fsportal-acad',src:'talk',days:{'2026-1-1':[1]}}),'x'),/형식/);
// 화면: Workload 탭·데이터 미확보 표시·이름 검색으로 KPI 를 계산하지 않음
assert(/id="vtWl" data-view="wl"/.test(html),'Workload 탭');
assert(/wl:\{hash:'#workload',prod:'ot'/.test(html));   // 야간·휴일 근무(OT) 패널을 Workload 아래로 (2026-11-13)
assert(!/prd:\{[^}]*tabs:\[[^\]]*'ot'/.test(html), 'Productivity 하위 탭에서 야간·휴일 근무를 뺌');
assert(/body\[data-view=prd\] #prodTabs \[data-tab=ot\]\{display:none\}/.test(html));
assert(/function otPersonHtml\(/.test(html) && /function otPersonDraw\(/.test(html), '개인 야간·휴일 블록은 OT 패널 아래로');
assert(!/html2 \+= '<div class="block"><div class="block-head"><h2>야간·휴일 근무<\/h2>/.test(html), '개인별 상세에서 야간 블록을 뺌');
assert(/wlNA\('학술 업무 비중'/.test(block),'학술 업무 비중 = 데이터 미확보');
assert(!/WL_SUG[\s\S]{0,40}wlAgg/.test(block)&&!/wlSug\(/.test(block.slice(block.indexOf('function wlAgg'),block.indexOf('function wlAcadDays'))),'집계에 이름 후보를 쓰지 않음');
console.log('test_workload ok');
