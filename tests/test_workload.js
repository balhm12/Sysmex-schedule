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
const esc=s=>String(s); const $=()=>null;
function mPred(months){ const ms=new Set(months), tTo=months&&months.tTo; return tTo? (mk,t)=>ms.has(mk)&&(t==null||t<tTo) : (mk)=>ms.has(mk); }`;
const api=new Function(env+block+';return {wlSplit,wlBand,wlVisits,wlAgg,wlAcadAgg,parseAcad,wlRegionAuto,wlInfo,wlSug,acadMergeAuto,set INST(v){INST=v;},set ACAD(v){ACAD=v;}};')();
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
const acad=api.parseAcad(JSON.stringify({kind:'fsportal-acad',src:'talk',days:{'2026-11-02':h({10:2,20:1}),'2026-11-03':h({9:5}),'2026-10-09':h({11:1})}}),'t.json');
api.ACAD=acad; let g=api.wlAcadAgg(['2026-11','2026-10']); assert.deepStrictEqual([g.n,g.day,g.night,g.hol],[9,7,1,1],'Talk 만');
api.ACAD=api.parseAcad(JSON.stringify({kind:'fsportal-acad',src:'slack',days:{'2026-11-03':h({7:1,8:1})}}),'s.json');
// 데이터 소스 전환(2026-11-16 결정): 2026-11-03 까지 Talk, 11-04 부터 Slack — 날짜로 나눠 같은 날을 두 번 세지 않음
api.ACAD=Object.assign({},acad,{slack:{made:'2026-11-30',days:{'2026-11-03':h({7:1,8:1})}}});
g=api.wlAcadAgg(['2026-11']); assert.deepStrictEqual([g.n,g.day,g.night],[8,7,1],'11/3 Slack(전환 전)은 쓰지 않음, Talk 11/2·11/3 '+JSON.stringify([g.n,g.day,g.night]));
// Talk 은 평일 09시 전 글 = 야간, Slack 은 08시부터 주간. 11/4 이후 Talk 글은 쓰지 않음(운영 종료)
api.ACAD={talk:{made:'2026-11-05',days:{'2026-11-03':h({7:1,8:2,9:3,17:1,18:1}),'2026-11-04':h({9:9})}},slack:{made:'2026-11-30',days:{'2026-11-05':h({8:1,7:1})}}};
g=api.wlAcadAgg(['2026-11']); assert.deepStrictEqual([g.n,g.day,g.night],[10,5,5],'Talk 11/3(08시 야간·09~17 주간) + Slack 11/5(07 야간·08 주간), Talk 11/4 제외 '+JSON.stringify([g.n,g.day,g.night]));
assert.deepStrictEqual([g.talk,g.slack],[8,2],'전환 월 = 두 소스 합');
assert(g.src.has('talk')&&g.src.has('slack')&&!g.gap.wait,'Slack 이 월말까지 있으면 집계 대기 없음');
// Slack 미연동 — 11/4 이후는 0 이 아니라 집계 대기
api.ACAD={talk:{made:'2026-11-03',days:{'2026-11-02':h({10:2})}}};
g=api.wlAcadAgg(['2026-11']); assert(g.gap.wait==='slack'&&g.gap.part&&g.gap.mix,'11월 = Talk 만 반영, Slack 집계 대기(일부)');
g=api.wlAcadAgg(['2026-12']); assert(g.gap.wait==='slack'&&g.gap.none,'12월 Slack 미연동 = 집계 대기(0 아님)');
api.ACAD={talk:{made:'2026-11-03',days:{}},slack:{made:'2026-11-07',days:{'2026-11-06':h({10:1})}}};
g=api.wlAcadAgg(['2026-11']); assert(g.gap.wait==='slack'&&g.gap.part&&g.gap.upto==='2026-11-07','Slack 일부 연동 = 내보낸 날까지만');
g=api.wlAcadAgg(['2026-10']); assert(!g.gap.wait,'10월 Talk 수집 범위 안');
// 서버 자동(acadAuto): 파일보다 새것이면 Slack 자리에, 손으로 올린 더 새 파일은 그대로, 잘못된 모양은 무시
{ const au={kind:'fsportal-acad',src:'slack',made:'2026-11-09',days:{'2026-11-05':h({8:2})},at:1};
  let m=api.acadMergeAuto({talk:{made:'2026-11-03',days:{}},slack:{made:'2026-11-07',days:{}}},au); assert(m.slack.auto&&m.slack.made==='2026-11-09'&&m.slack.days['2026-11-05'][8]===2&&m.talk,'자동 값이 새것');
  m=api.acadMergeAuto({slack:{made:'2026-11-13',days:{}}},au); assert(!m.slack.auto,'손으로 올린 파일이 더 새것이면 유지');
  m=api.acadMergeAuto(null,Object.assign({},au,{src:'talk'})); assert(m===null,'Slack 아닌 자동 값 무시'); }
assert(/function wlAcadCrm\(/.test(block)&&!/wlAcadAgg[\s\S]{0,200}wlAcadCrm/.test(block.slice(block.indexOf('function wlAcadAgg'),block.indexOf('function acadGapTxt'))),'CRM 학술 요청과 학술 응대를 합치지 않음');
assert.throws(()=>api.parseAcad('{"kind":"x"}','x'),/학술 파일이 아닙니다/);
assert.throws(()=>api.parseAcad(JSON.stringify({kind:'fsportal-acad',src:'talk',days:{'2026-1-1':[1]}}),'x'),/형식/);
// 화면: Workload 탭·데이터 미확보 표시·이름 검색으로 KPI 를 계산하지 않음
assert(/id="vtWl" data-view="wl"/.test(html),'Workload 탭');
assert(/wl:\{hash:'#workload',prod:'ot'/.test(html));   // 야간·휴일 근무(OT) 패널을 Workload 아래로 (2026-11-13)
assert(!/prd:\{[^}]*tabs:\[[^\]]*'ot'/.test(html), 'Productivity 하위 탭에서 야간·휴일 근무를 뺌');
assert(/body\[data-view=prd\] #prodTabs \[data-tab=ot\]\{display:none\}/.test(html));
// 화면 역할 나누기(2026-11-16, A안): 조직 비교 = Organization, 일의 성격(방문·야간·이동) = Workload, 사람 = Productivity
assert(/wl:\{hash:'#workload',prod:'ot',tabs:\['ot','move','acad','load'\]/.test(html), 'Workload 아래 = 야간 OT + 이동거리 + 평가·Calibration + 부하도');
/* 2026-11-19: 개인 종합 요약 · 학술업무(평가·Calibration) · 부하도(개선 지수) — 화면 쪽 계산만, buildProdData·kpiCore 는 그대로 */
{ const m=/const LOAD_DEF=(\{[^}]*\});/.exec(html); assert(m, '부하도 기본 가중치'); const d=eval('('+m[1]+')'); assert.strictEqual(Object.values(d).reduce((a,b)=>a+b,0), 100, '부하도 기본 가중치 합 100'); assert.deepStrictEqual(d, {score:40,inst:10,veq:10,move:20,ot:20}, '스킬 개선 지수와 같은 기본 가중치');
  assert(/p\.idx = rsd \? 100 \+ 15 \* \(p\.raw - rm\) \/ rsd : 100/.test(html), '부하도 = 100 + 15 × Z');
  assert(/p\.idx >= 110 \? '고부하' : p\.idx < 90 \? '저부하' : '표준'/.test(html), '구간 110·90');
  assert(/\(DATA\.grade\|\|\{\}\)\[n\] !== '팀장' && nb\.indexOf\(n\) < 0/.test(html), '부하도 대상 = 팀장·신입 제외');
  assert(/await fb\('loadw',\{method:'PUT'/.test(html) && /Math\.abs\(r\.sum-100\)<0\.001/.test(html), '부하도 가중치 저장 = loadw, 합 100 일 때만');
  assert(/const ACW_EVAL=new Set\(\['설치\/데모 평가','Evaluation','EVALUATION','인증 지원','Accreditation Support','Proficiency Test'\]\)/.test(html), '평가 목적 = 가중치 묶음 「성능 평가·인증 지원」과 같음');
  const g=/\['성능 평가·인증 지원',\[([^\]]*)\]\]/.exec(html); assert(g && g[1].replace(/\s/g,'')==="'설치/데모평가','Evaluation','EVALUATION','인증지원','AccreditationSupport','ProficiencyTest'", '가중치 묶음의 목적 목록이 바뀌면 ACW_EVAL 도 같이 바꾼다');
  assert(/html2 \+= personSummaryHtml\(state\.person, period\)/.test(html) && /function personSummaryHtml\(/.test(html), '개인별 상세에 종합 요약');
  const fn=html.slice(html.indexOf('function personSummaryHtml('), html.indexOf('/* ================= RENDER: 담당 장비')); assert(!/color:var\(--(good|bad|warn)\)/.test(fn), '종합 요약의 평균 대비에는 상태 색을 쓰지 않는다');
  /* 작업 시간(건수가 아닌 시간으로도) — 0~500분, 취소·온라인 정기점검 제외, 건수와 같은 업무 유형 묶음 */
  assert(/function workTime\(\)/.test(html) && /r\.st==='취소됨'\|\|r\.purp==='온라인 정기점검'\) continue; const mins=\(r\.e-r\.t\)\/60000; if\(!\(mins>0&&mins<=500\)\) continue;/.test(html), '작업 시간 = CRM 시작~종료 0~500분, 취소·온라인 정기점검 제외');
  assert(/b=OV_BUCKET\[r\.purp\]\|\|'기타'/.test(html), '작업 시간의 업무 유형 = 건수와 같은 묶음(OV_BUCKET)');
  assert(/\{k:'hr',n:'작업 시간',u:'시간',d:0,type:'bar'\},\{k:'hrh',n:'1인당 작업 시간',u:'시간',d:1,type:'bar',avg:'hrh'\}/.test(html), '조직 비교 지표에 작업 시간·1인당 작업 시간');
  assert(/data-x="cnt"[^>]*>건수<\/button><button type="button" data-x="hr"[^>]*>시간<\/button>/.test(html), '업무 유형 구성비 건수/시간 전환');
  assert(/html\.staff #prod|\.staff #prod/.test(html), '직원 화면에서는 사람 단위 화면(#prod)이 숨겨져 새 탭도 보이지 않는다'); }
assert(!/prd:\{[^}]*tabs:\[[^\]]*'move'/.test(html), 'Productivity 하위 탭에서 이동거리를 뺌');
assert(!/\['org','조직'\]/.test(html), 'Workload 「조직」 탭은 Organization 으로');
assert(/function wlOfficeHtml\(/.test(html) && /\['unit','팀·사무소'\]/.test(html) && /T==='unit'\)\{[^\n]*wlOfficeHtml\(team\)/.test(html) && !/id="ogWl"/.test(html), '사무소별 업무부하(방문) = Workload 「팀·사무소」 (작업지시서 v2: Organization 에서는 뺌)');
assert(!/id="pmBars"/.test(html) && !/teamRevisitCards/.test(html), 'Productivity 의 팀 비교·팀별 재방문율은 Organization 비교표로 (중복 제거)');
assert(!/<h2 class="sec" data-scr="sq">업무량 추이/.test(html), 'Service Quality 의 업무량 추이는 Proactive Service 와 중복');
assert(/function otPersonHtml\(/.test(html) && /function otPersonDraw\(/.test(html), '개인 야간·휴일 블록은 OT 패널 아래로');
assert(!/html2 \+= '<div class="block"><div class="block-head"><h2>야간·휴일 근무<\/h2>/.test(html), '개인별 상세에서 야간 블록을 뺌');
assert(/function wlAcadCrm\(/.test(html) && /\/학술\/\.test\(o\.ft\)/.test(html) && /ft:r\.ft\|\|''/.test(html),'학술 업무 비중 = CRM 양식 타입 「학술 요청」 비율');
assert(/function wlAcadUnitHtml\(/.test(html) && /h\+=acU;/.test(html) && /PROD_UNITS\.filter\(u=>u\.startsWith\(t\+' '\)\)/.test(html),'CRM 학술 업무 팀·사무소별 표(사무소는 팀 아래)');
assert(!/WL_SUG[\s\S]{0,40}wlAgg/.test(block)&&!/wlSug\(/.test(block.slice(block.indexOf('function wlAgg'),block.indexOf('function wlAcadDays'))),'집계에 이름 후보를 쓰지 않음');
console.log('test_workload ok');
