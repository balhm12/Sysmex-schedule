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
assert.deepStrictEqual(Object.keys(screens).sort(), ['eqp', 'ov', 'org', 'pro', 'sq', 'wl'].sort(), '화면 6개 (2026-11-16 Productivity → Organization 통합)');
assert.strictEqual(new Set(Object.values(screens).map(s => s.hash)).size, 6, '화면 주소가 겹침');
assert(/if\(h==='#people'\) return 'org'/.test(html), '예전 주소 #people 은 Organization 으로');
assert(/VIEW_ALIAS=\{[^}]*prd:'org'/.test(html), '예전 저장값 prd 는 Organization 으로');
assert(!html.includes('id="vtPrd"'), 'Productivity 탭 버튼이 없어야 함');
assert(/org:\{[^}]*tabs:\['team','overview','person','equip'\]/.test(html), 'Organization 상세 분석 하위 탭');
assert(html.includes('id="cOrgSc"') && /type:'bubble'/.test(html), '담당 장비 × 업무량 거품 그림');
assert(/function orgExt[\s\S]{0,400}eqAgg\(PROD\.eq\.by/.test(html), '조직 담당 장비는 기존 함수(eqAgg)를 씀');
assert(html.includes('담당 장비: 현재 관리표 기준 /'), '산점도 주석(시점이 다름)');
assert(/const ORGSC=\{u:'office',y:'per'/.test(html) && /function orgCoreOf\(/.test(html) && /eqc:core\.length\?A\.eq\/core\.length/.test(html), '산점도(2026-11-17) = 기본 사무소, 두 축 모두 비교 인원 1인당');
assert(/const ORG_BAND=0\.10/.test(html) && /function orgRel\(/.test(html) && !/function orgQuad\(/.test(html), '위치 = FSG 평균 비율선 ±10%(중앙값 십자선 아님)');
assert(html.includes('부하 판정용이 아닙니다.') && html.includes('진행 중인 달</b>이 들어 있습니다'), '부하 판정 아님·진행 중인 달 경고');
assert(/if\(o\.purp==='PM'\) pmM\[o\.mk\]/.test(html), 'PM 월별 편차 = 취소만 제외(완료 처리 전 포함)');
assert(html.includes('장비 100대당 처리 건수') && !html.includes('장비 100대당 서비스 발생'), '지표 이름 = 장비 100대당 처리 건수');
const sv = between('function setView(v){', 'function showMain');
assert(sv.includes('rerender()') && sv.includes('scr-off'));
assert(between('function rerender(){', 'function showMain').includes('renderOv()'));
['vtOv', 'vtSq', 'vtOrg', 'vtWl', 'vtEqp', 'vtPro'].forEach(id => assert(html.includes('id="' + id + '"'), id + ' 탭 없음'));
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
['sq','org','eqp','pro'].forEach(k => assert(new RegExp(k + ":\\{hash:'[^']+'[^}]*dsx:1").test(html), k + ' 화면에 dsx 가 꺼져 있음'));
assert(/\.dsx\{--ovp:var\(--primary\)\}/.test(html) && /#ov \.ovkpi,\.dsx \.ovkpi/.test(html), 'Overview CSS 가 .dsx 로 공유되지 않음');
['orgKpi','ogBars','ogTbl','proKpi','proRisk','tChr','sqKpiQ','sqKpiW','insKpis','eqpTitle','orgTitle','proTitle','sqTitle','prodTitle'].forEach(id => assert(html.includes('id="' + id + '"'), id + ' 없음'));
// 최종 개선(사무소 중심·그래프 유형): 사무소 행은 PROD 를 읽기만 하고, 도트 플롯·100% 누적 막대·더 보기 요소가 있다
const orgCode = between('function orgRows(mode){', 'function renderOrgTop');
assert(/PROD\.team\[u\]/.test(orgCode) && /PROD_UNITS/.test(orgCode) && !/revisitAvg|kpiCore\(|buildProdData\(/.test(orgCode), '사무소 행이 PROD 만 읽지 않음');
['famRvDots','orgAllBtn','proAllBtn','ogMix','proOgBars','proOgTbl','cPm','insPerf','instMore','fInstOver','lbMore'].forEach(id => assert(html.includes('id="' + id + '"'), id + ' 없음'));
// 팀·사무소 트리: 팀을 누르면 사무소로 나뉜다(펼침·선택은 화면 공통), 값은 orgRows(PROD) 그대로
assert(/function orgTree\(\)/.test(html) && /function orgPick\(k\)/.test(html) && /aria-expanded/.test(between('function renderOrgTop', 'function chronicList')), '팀·사무소 트리 없음');
assert(!/orgRows\('office'\), tp=/.test(html), 'Proactive 가 예전 사무소 고정 목록을 씀');
assert(/function dsBars/.test(html) && /0에서 시작하지 않음/.test(html), '도트 플롯에 축 범위 안내가 없음');
assert(/\$\{ADMIN\?`, 원본 \$\{SRC\.act\}`:''\}/.test(html), '원본 파일명이 일반 사용자 헤더에 노출됨');
assert(/function chronicList/.test(html) && !/revisitAvg/.test(between('function chronicList', 'function renderProTop')), '반복 고장 목록이 새 계산식을 씀');
// 슬림 헤더(2026-11-13): 자료 정보·관리자·접근 코드 변경은 파란 띠 안에 있고 잠금이 풀릴 때만 보인다. 탭 줄에는 탭만 남는다. 다른 페이지 안에서 열리면 페이지 탭 줄을 숨긴다
const hdrHtml = between('<header class="top">', '</header>'), tabsHtml = between('<nav class="vtabs"', '</nav>');
['id="hdrInfo" hidden', 'id="info"', 'id="adminToggle"', 'id="changeCode"', 'id="openUpl"', 'id="sub"'].forEach(t => assert(hdrHtml.includes(t), '헤더에 ' + t + ' 없음'));
assert(!/vinfo|lbtn/.test(tabsHtml), '화면 탭 줄에 정보·버튼이 남아 있음');
assert(/\$\('hdrInfo'\)\.hidden=true/.test(between('function showEmpty', 'function showMain')) && /\$\('hdrInfo'\)\.hidden=false/.test(between('function showMain', 'loadShifts')), '헤더 정보·버튼이 잠금 상태와 같이 움직이지 않음');
assert(/window\.self!==window\.top/.test(html) && /\.embed \.appbar\{display:none\}/.test(html), '포털 안 페이지 탭 숨김 없음');
console.log('test_kpi_overview: OK (업무 유형 묶음 ' + Object.keys(core).length + '개 kpiCore 와 일치 · 새 계산식 없음 · 화면 전환·주소 · 목표·상태 기준 공유)');
/* v3.1 PR2: 반복 고장 목록은 Service Quality 한 곳, Proactive 는 위험·주의만, 병원별 표는 SQ 기관별 품질로 */
assert(/function renderSqChr\(/.test(html) && /id="tChrSq"/.test(html) && /mode='risk';/.test(html), 'v3.1: 반복 고장 목록 = Service Quality, Proactive = 위험 목록');
assert(/data-k="ftfr"/.test(html) && /if\(0\) html \+= '<div class="block"><div class="block-head"><h2>담당 병원별/.test(html), 'v3.1: 기관별 품질에 FTFR, Organization 병원별 표는 이동');
/* v3.1 PR3: Overview = 핵심 KPI·품질 추이·확인이 필요한 곳(탭 이동) */
assert(/function ovIssues\(/.test(html) && /function ovGo\(/.test(html) && !/SECTION 03<\/i>업무 유형/.test(html) && !/SECTION 05<\/i>예방 서비스/.test(html), 'v3.1: Overview 3영역, 이슈 → 탭 이동');
/* v3.1 PR4: Workload 사람 기준(야간 OT·휴일·이동거리·개인 목록)은 기본 접힘 — 화면별 기억 */
assert(/const FV=VIEW==='org'\|\|VIEW==='wl'/.test(html), 'v3.1: Organization·Workload 상세 기본 접힘');
/* 내보내기: 지금 화면 Excel(ExcelJS, 누를 때만)·PDF(인쇄) */
assert(/id="xXlsx"/.test(html) && /id="xPdf"/.test(html) && /function exportXlsx\(/.test(html) && /exceljs\/4\.4\.0/.test(html) && html.indexOf('function exportXlsx(')<html.indexOf('function showMain(){'), '내보내기 버튼·코드');
/* 산점도 읽는 법: 중앙값 기준 네 칸 의미와 이상적인 모습 */
assert(/class="ogguide"/.test(html) && html.includes('FSG 평균보다 장비 1대당 업무가 많고'), '산점도 읽는 법');
/* v3.2: Overview 운영 장비 현황, 조직 표 핵심 열, PM 편차 상세, 내보내기 메타 */
assert(/function ovEquipCard\(/.test(html) && /\$\{ovEquipCard\(\)\}/.test(html) && /function opEquip\(/.test(html), 'v3.2: Overview 운영 장비 현황(자산대장)');
assert(/const OG_CORE=/.test(html) && /id="proHealthFold"/.test(html) && /ovkpi c4" id="proKpi"/.test(html), 'v3.2: 조직 표 핵심 열·PM 편차 상세');
assert(/\['데이터 구분',M\.kind\]/.test(html) && /\['접힌 상세 포함'/.test(html), 'v3.2: 내보내기 정보 시트');
/* 모든 <script> 블록이 문법 오류 없이 읽혀야 함(2026-11-16 충돌 해소 중 한 줄 중복으로 대시보드가 멈춘 일 재발 방지) */
{ const re=/<script>([\s\S]*?)<\/script>/g; let m, i=0; while((m=re.exec(html))){ i++; try{ new Function(m[1]); }catch(e){ assert(false, 'script 블록 '+i+' 문법 오류: '+e.message); } } }
/* Overview 운영 장비: 분야 100% 막대 → 누르면 세부 장비 */
assert(/function eqField\(/.test(html) && /class="oveqseg/.test(html) && /OV_EQF=\(OV_EQF===b\.dataset\.f/.test(html), '운영 장비 분야 막대·세부(누를 때만)');
/* 분야 규칙(2026-11-16 사용자 결정): 모델명이 중간에 있어도, 당화혈색소 = 혈액, 자동화·라인 = 기타 */
{ const f=new Function(html.match(/function eqField\(m\)\{[\s\S]*?return '기타'; \}/)[0]+';return eqField;')();
  const T=[['HEMATO ANALYZER XT-1800I','혈액'],['TOSOH 23850 HLC-723 G11','혈액'],['XQ-520','혈액'],['COAG ANALYZER CA-540, 220V','응고'],['HISCL-5000','면역'],['UF-5000','뇨화학'],['U-WAM COMPLETE(EN)','기타'],['SA-10 COMPLETE(SA-10)','기타'],['TS-10 COMPLETE','기타'],['','기타']];
  T.forEach(([m,e])=>assert(f(m)===e, `eqField(${m}) = ${f(m)} (기대 ${e})`)); }
/* v3.2 결정: 진행 중인 달 = 전월 동기간(mPred·tTo), 이슈 기준 설정값 OV_ISS(20%·10건·120%, 비교 0이면 판정 안 함), 업무 집중 */
assert(/function mPred\(months\)/.test(html) && /전월 동기간\(/.test(html) && /const OV_ISS=\{incRate:0\.2, incAbs:10, focus:1\.2\}/.test(html) && /chip:'업무 집중'/.test(html), 'v3.2 전월 동기간·이슈 기준');
{ const f=new Function(html.match(/function mPred\(months\)\{[^\n]*\}/)[0]+';return mPred;')(); const M=['2026-10']; M.tTo=Date.UTC(2026,9,17); const g=f(M);
  assert(g('2026-10',Date.UTC(2026,9,16,23))&&!g('2026-10',Date.UTC(2026,9,17,0))&&!g('2026-09',Date.UTC(2026,8,5)), 'mPred 전월 동기간 경계'); assert(f(['2026-10'])('2026-10',Date.UTC(2026,9,30)), 'mPred 마감 월 전체'); }
/* v3.4: Overview 순서 KPI → 추이·이슈 → 운영 장비, 임원보고 2쪽(같은 값 재사용), 유효 운영 0이면 「–」 */
{ const ov=html.slice(html.indexOf('function renderOv(){')); const a=ov.indexOf('id="ovKpi"'), b=ov.indexOf('ovg-a'), c=ov.indexOf('${ovEquipCard()}');
  assert(a>0&&b>a&&c>b, 'v3.4 Overview 순서'); assert(/class="rptbrk"/.test(html)&&/Management Issues/.test(html)&&/1 \/ 2/.test(html)&&/2 \/ 2/.test(html), 'v3.4 임원보고 2쪽 구성');
  }

/* v3.8 Overview 간소화 · 임원보고 2쪽 */
{ const fn=html.slice(html.indexOf('function ovEquipCard('),html.indexOf('function renderOv('));
  assert(/sel=\(OV_EQF&&B\.fld\[OV_EQF\]\)\?OV_EQF:null/.test(fn) && /\$\{sel\?detOf\(sel\):''\}/.test(fn), 'v3.8 운영 장비: 모델 구성은 분야를 누를 때만');
  assert(!/rptstk/.test(fn), 'v3.8 보고서에 장비 모델 상세 없음');
  const ops=html.slice(html.indexOf('function rptOps('),html.indexOf('function renderOv('));
  assert(/orgRows\('team'\)/.test(ops) && /wlAgg\(/.test(ops) && /cur\.total/.test(ops) && /OV_ACT/.test(ops), 'v3.8 2쪽은 기존 결과(stats·Workload·Organization·업무 유형)만 읽음');
  assert(!/function\s+\w*(Calc|calc)\w*\(/.test(ops), 'v3.8 2쪽에 새 계산 함수 없음');
  assert(/처리 건수 기준/.test(ops) && /방문 기준/.test(ops), 'v3.8 업무 구성 단위 표시');
  assert(/Service Operations/.test(html) && /body\.rpt #ov \.ovequip/.test(html), 'v3.8 2쪽 Service Operations, 장비 카드는 보고서에서 숨김');
  assert(/<span class="ovh" hidden>/.test(html), 'v3.8 KPI 카드 설명은 마우스 설명으로'); }
/* 2026-11-16 검토: 진행 중인 분기·반기·연도도 마지막 달은 같은 날까지 비교 */
{ const fn=html.slice(html.indexOf('function prevPeriod('),html.indexOf('/* ===== 집계 ====='));
  assert(/inProg=p\.partial&&upto\.includes\(last\)/.test(fn)&&/months\.tTo=Date\.UTC\(y,mo-1,dd\+1\)/.test(fn),'진행 중 다개월 기간 동기간 비교');
  assert(/yoy\.months\[yoy\.months\.length-1\]/.test(html),'Workload 전년 비교는 마지막 달 기준으로 자름'); }

/* 2026-11-16 사용자 결정 「장비 기준으로 통일」: Overview 운영 장비 = 담당기관 관리표 장비(Organization·Instrument 담당 장비와 같은 값), 미지정은 명단 밖 담당자 */
{ const a=html.indexOf('const EQB_FLD='), b=html.indexOf('function eqOutside(');
  const env=`const ROSTER=[['테스트1','FS WEST'],['테스트2','FS EAST']]; const wlTeam=n=>({'테스트1':'FS WEST','테스트2':'FS EAST'})[n]||null; const EQ_FIELD={'XN':'CBC','UF':'유린','CN':'응고','HISCL':'면역'}; let EQD=null;`;
  const api=new Function(env+html.slice(a,b)+';return {eqBase,set EQD(v){EQD=v;}};')();
  api.EQD={made:'2026-11-04',rows:[['테스트1','가 병원','서울',10,0,0,0,6,2,1,1,{XN:6,UF:2,CN:1,HISCL:1}],['테스트2','나 병원','경기',5,0,0,0,5,0,0,0,{XN:5}],['','다 의원','부산',3,0,0,0,3,0,0,0,{XN:3}],['대리점','라 센터','대구',2,0,0,0,0,2,0,0]]};
  const B=api.eqBase();
  assert(B.total===20&&B.asg===15&&B.un===5&&B.inst===4&&B.instAsg===2, '관리표 장비 합계·담당 지정·미지정 '+JSON.stringify([B.total,B.asg,B.un]));
  assert(B.fsum===B.total&&B.fld.CBC===14&&B.fld['유린']===4, '분야 합계 = 장비');
  assert(B.fldTeam.CBC['FS WEST']===6&&B.fldTeam.CBC['담당 미지정']===3&&B.fam.CBC.XN===14, '분야 구성(팀·장비군)');
  assert(B.unRows.length===2&&B.unRows[0].eq===3, '미지정 목록 장비 많은 순');
  const fn=html.slice(html.indexOf('function ovEquipCard('),html.indexOf('/* v3.8 임원보고 2쪽'));
  assert(/eqBase\(\)/.test(fn)&&/ADMIN\?/.test(fn)&&/rptno/.test(fn), '관리자에게만 정비 목록');
  assert(/body\.rpt #ov \.oveqadm,body\.pdfx \.oveqadm\{display:none!important\}/.test(html), '보고서·PDF 에 기관명 목록 없음');
  const ops=html.slice(html.indexOf('function rptOps('),html.indexOf('function renderOv('));
  assert(/eqBase\(\)/.test(ops)&&!/opEquip\(\)/.test(ops), '보고서 2쪽 장비도 관리표 기준'); }

/* 2026-11-16: 기간을 바꾸면 PROD 를 다시 계산한 뒤 그림(한 번 늦게 바뀌던 것) */
{ const i=html.indexOf("$('fPeriod').addEventListener('change',()=>{ PROD_DIRTY=true; rerender(); });"); assert(i>0, '기간 변경 → PROD_DIRTY 먼저');
  assert(!/\['fPeriod','fTeam'\]\.forEach\(id=>\$\(id\)\.addEventListener\('change',\(\)=>rerender\(\)\)\)/.test(html), '예전 처리기 없음'); }

/* 2026-11-17 KPI 재검토: 이름 정리 · 재방문율 보조 지표 · PM 커버리지 목표 */
{ const h=require('fs').readFileSync(require('path').join(__dirname,'..','fsg-kpi.html'),'utf8');
  const a=require('assert');
  a(!/예방정비 지수|KPI 종합 점수|KPI 점수|학술 업무 비중/.test(h),'옛 지표 이름이 남아 있음');
  a(/n:'평균 수리 작업 시간 \(MTTR\)'/.test(h),'MTTR 표시 이름');
  a(/function revSub\(/.test(h)&&/id="sqKpiR"/.test(h)&&/x\.e>b\.e&&x\.e<=b\.e\+WIN/.test(h),'재방문율 보조 지표(앞 방문 종료 뒤 14일)');
  a(/C\.eligible/.test(h)&&/C\.avg\(rr\)/.test(h),'보조 지표는 재방문율과 같은 거래처 평균');
  a(/const TARGET_PMCOV = 80;/.test(h)&&/tgSt\(cov,TARGET_PMCOV,true\)/.test(h),'PM 커버리지 목표 80%');
  console.log('kpi review 2026-11-17 ok'); }

/* 2026-11-18 초기 고장 → 해당 장비 목록 */
{ const h=require('fs').readFileSync(require('path').join(__dirname,'..','fsg-kpi.html'),'utf8'), a=require('assert');
  a(/function insGoEF\(/.test(h)&&/if\(it\.ef\) insGoEF\(\)/.test(h)&&/vl:'Instrument',ef:1/.test(h),'초기 고장 이슈 → 초기 고장 목록');
  a(/x\.f90L=/.test(h)&&/x\.f90=x\.sn\?x\.f90L\.length/.test(h),'90일 고장 수는 목록 길이와 같음');
  a(/id="insEF"/.test(h)&&/class="ovkc st inslink"/.test(h),'전체/초기 고장만 전환·KPI 칸 누르기');
  console.log('early fail ok'); }
