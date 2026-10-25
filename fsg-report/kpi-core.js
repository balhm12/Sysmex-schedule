/* 생성 파일 — 손으로 고치지 말 것.
 * fsg-kpi.html의 kpiCore·buildProdData를 tools/extract-kpi-core.js 가 글자 그대로 떼어 낸 사본이다.
 * 계산을 바꾸려면 fsg-kpi.html을 고친 뒤 `node fsg-report/tools/extract-kpi-core.js`를 다시 돌린다.
 * (대시보드·월간보고가 같은 함수를 쓰도록 tests/test_kpi_core_sync.js 가 두 파일의 일치를 검사한다) */

function kpiCore(RAW, ROSTER, opt){
  opt = opt || {};
  var TEAMS = opt.teams || ['FS WEST','FS EAST','FS CENTRAL','FS SOUTH'];
  var EXCL = new Set(opt.excluded || ['김민결']);
  var memberTeam = {};
  ROSTER.forEach(function(r){ if (!EXCL.has(r[0]) && TEAMS.indexOf(r[1]) >= 0 && !memberTeam[r[0]]) memberTeam[r[0]] = r[1]; });
  function purposeOf(r){ if (r.purp) return r.purp; if (!r.subj) return null; var p = r.subj.split('/');
    if (p.length >= 4) return p.slice(3).join('/'); if (p.length === 2) return p[1]; return null; }
  function mkOf(ms){ var d = new Date(ms); return d.getUTCFullYear()+'-'+String(d.getUTCMonth()+1).padStart(2,'0'); }
  var rows = [];
  RAW.forEach(function(r){
    if (r.t == null || r.st === '취소됨') return;
    var purpose = purposeOf(r); if (purpose === '온라인 정기점검') return;
    var cr = [], seen = {};
    [r.own].concat(r.att ? String(r.att).split(/[;,]/) : []).forEach(function(x){ x = (x||'').trim();
      if (x && !seen[x] && memberTeam[x]){ seen[x] = 1; cr.push(x); } });
    rows.push({r:r, t:r.t, e:r.e, mk:mkOf(r.t), purpose:purpose, credits:cr, acct:r.acct, sn:r.sn, own:r.own,
      err:(r.err||'').trim().toLowerCase(), dur:(r.e != null && (r.e-r.t)/60000 >= 0 && (r.e-r.t)/60000 <= 500) ? (r.e-r.t)/60000 : null,
      AD:null, AE:null, inRec:false});
  });
  /* 재방문·FTFR 플래그 (종료 시각 기준) */
  var bySn = {}, W14 = 14*86400000;
  rows.forEach(function(x){ if (x.e == null || !x.sn || !x.acct) return; x.inRec = true; (bySn[x.sn] = bySn[x.sn] || []).push(x); });
  Object.keys(bySn).forEach(function(sn){
    var l = bySn[sn].sort(function(a,b){ return a.e - b.e; });
    l.forEach(function(x){
      if (x.purpose !== '고장 수리') return;
      var ws = x.e - W14, ad = 2, ae = 2;
      for (var i=0;i<l.length;i++){ var o = l[i]; if (o === x || !(o.e >= ws && o.e < x.e)) continue;
        if (o.purpose === '고장 수리' || o.purpose === 'PM') ad = 1;
        if (o.purpose === '고장 수리' && o.err === x.err) ae = 1; }
      x.AD = ad; x.AE = ae;
    });
  });
  /* 거래처 → 팀 (담당자 기준 최다 방문 팀), 거래처별 기록 */
  var ctr = new Map(), acctRecs = new Map();
  rows.forEach(function(x){
    if (x.acct && memberTeam[x.own]){ var c = ctr.get(x.acct); if (!c) ctr.set(x.acct, c = new Map()); var t = memberTeam[x.own]; c.set(t, (c.get(t)||0)+1); }
    if (x.inRec){ var a = acctRecs.get(x.acct); if (!a) acctRecs.set(x.acct, a = []); a.push(x); }
  });
  var acctMap = opt.accountTeam || {};
  function topKey(map){ var best=null, bn=-1; map.forEach(function(v,k){ if (v>bn){ bn=v; best=k; } }); return best; }
  function acctTeam(a){ if (acctMap[a]) return acctMap[a]; var c = ctr.get(a); return c ? topKey(c) : null; }
  /* 사무소로 나눈 팀의 합계(opt.unitGroup = {사무소 단위: 팀}) — 거래처 팀은 팀 단위 방문 수로 다시 정함(서비스 탭과 같은 값) */
  var UG = opt.unitGroup || {};
  function acctGroup(a){ var c = ctr.get(a); if (!c) return null; var g = new Map();
    c.forEach(function(v,k){ var t = UG[k] || k; g.set(t, (g.get(t)||0) + v); }); return topKey(g); }
  function rnd(x, d){ var k = Math.pow(10, d), n = x*k, f = Math.floor(n), r = n - f;
    if (Math.abs(r - 0.5) < 1e-9) return (f % 2 === 0 ? f : f + 1)/k; return Math.round(n)/k; }
  function rates(list){ var dRv=0, nRv=0, dF=0, nB=0;
    list.forEach(function(e){ if (e.purpose==='고장 수리'||e.purpose==='PM') dRv++; if (e.AD===1) nRv++; if (e.purpose==='고장 수리') dF++; if (e.AE===1) nB++; });
    return {revisit: dRv ? nRv/dRv : null, ftfr: dF ? (dF-nB)/dF : null, n_rv: dRv}; }
  var eligible = [];   // 전체 기간 방문 3건 이상 거래처
  acctRecs.forEach(function(list, a){ if (rates(list).n_rv >= 3) eligible.push(a); });
  function pct(v){ return v == null ? null : rnd(v*100, 1); }
  function avg(vs){ vs = vs.filter(function(v){ return v != null; }); return vs.length ? rnd(vs.reduce(function(a,b){return a+b;},0)/vs.length, 1) : null; }
  /* 팀(또는 FSG 전체: team=null) 재방문율·FTFR — inPeriod(x): 기록이 기간 안인지 */
  function revisitAvg(inPeriod, team){
    var rv = [], ft = [], n = 0;
    eligible.forEach(function(a){ var tm = team && team.group ? team.group : team, t = (tm && !UG[tm]) ? acctGroup(a) : acctTeam(a); if (!t || (tm ? t !== tm : TEAMS.indexOf(t) < 0)) return;
      var rt = rates(acctRecs.get(a).filter(inPeriod)); if (rt.n_rv) n++; rv.push(pct(rt.revisit)); ft.push(pct(rt.ftfr)); });
    return {revisit: avg(rv), ftfr: avg(ft), accounts: n};
  }
  function acctRates(a, inPeriod){ var rt = rates(acctRecs.get(a).filter(inPeriod)); return {revisit: pct(rt.revisit), ftfr: pct(rt.ftfr), n_rv: rt.n_rv}; }
  return {rows:rows, memberTeam:memberTeam, teams:TEAMS, acctTeam:acctTeam, acctGroup:acctGroup, acctRecs:acctRecs, eligible:eligible,
    revisitAvg:revisitAvg, acctRates:acctRates, rates:rates, pct:pct, avg:avg, rnd:rnd, purposeOf:purposeOf};
}

function buildProdData(RAW, ROSTER, opt){
  opt = opt || {};
  var TEAMS = opt.teams || ['FS WEST','FS EAST','FS CENTRAL','FS SOUTH'];
  var TEAM_SHORT = {}; TEAMS.forEach(function(t){ TEAM_SHORT[t] = t.replace(/^FS\s*/,''); });
  var EXCLUDED = new Set(opt.excluded || ['김민결']);
  var GROUPS = ['CBC','COA','HISCL','Urine','A1c','기타'];   // RF-500·모델 없음·미분류 → 기타 (2026-10-07)
  var GROUP_LABEL = {'CBC':'CBC','COA':'COA','HISCL':'Immuno','Urine':'Urine','A1c':'A1c','기타':'기타'};
  var PERIODS = ['이번 년도','직전 년도','전체 누적'];
  var BUCKETS = ['고장수리','PM','설치이전','Cal평가','기타'];
  var BUCKET_LABEL = {'고장수리':'고장 수리','PM':'PM','설치이전':'설치·이전','Cal평가':'Cal·평가','기타':'기타'};
  var BUCKET = {'고장 수리':'고장수리','PM':'PM','온라인 정기점검':'PM'};
  ['장비 설치','장비 이전 설치','설치/데모 평가','설치','장비 철수','철수 및 폐기'].forEach(function(p){ BUCKET[p]='설치이전'; });
  ['Calibration','원격 Calibration','Evaluation','EVALUATION','데이터 문제 해결 (QC/검체)','Quality Control'].forEach(function(p){ BUCKET[p]='Cal평가'; });
  function bucket(p){ return BUCKET[p] || '기타'; }

  /* 가중치 — 2026-10-07 FS 작업 주문 유형표 기준 (양식 타입 무관).
     표에 없는 목적(원격 Calibration·온라인 정기점검·GMCS·부품·소모품·전산·TroubleShooting·목적 공란 등)은 '기타'(0.2)로 계산.
     행 점수 = 업무 가중치 + 직급 가중치(T4 0.6 · T3 0.4 · T2 0.2 · T1 0 · 팀장 0.6, 활동일 기준 직급 — 진급자는 시행일부터) */
  var SCORE_W = {'Calibration':0.5,
    '설치/데모 평가':3,'Evaluation':3,'EVALUATION':3,'인증 지원':3,'Accreditation Support':3,'Proficiency Test':3,
    '고장 수리':3,'PM':0.5,'장비 설치':3,'장비 이전 설치':2,'장비 철수':0.5,'고객 요청':0.5,'고객 요구 사항 지원':0.5,'기타':0.2};   // 2026-10-07 조정: Cal·PM·철수·고객 요청 1→0.5, 기타 0.5→0.2
  var GRADE_W = opt.gradeW || {'T4':0.6,'T3':0.4,'T2':0.2,'T1':0,'팀장':0.6};
  var GRADE_OF = opt.gradeOf || {};
  ROSTER.forEach(function(r){ if (!(r[0] in GRADE_OF)) GRADE_OF[r[0]] = r[2]; });
  /* 진급자는 시행일부터 새 직급 가중치 (opt.gradeHist = [[성명, 'YYYY-MM-DD', 이전 직급], ...]) */
  var GRADE_HIST_MS = {};
  (opt.gradeHist || []).forEach(function(h){ var d=h[1].split('-');
    (GRADE_HIST_MS[h[0]] || (GRADE_HIST_MS[h[0]] = [])).push([Date.UTC(+d[0], +d[1]-1, +d[2]), h[2]]); });
  function gradeAtMs(person, t){
    var g = GRADE_OF[person], hs = GRADE_HIST_MS[person];
    if (hs && t != null){ hs.slice().sort(function(a,b){ return b[0]-a[0]; }).forEach(function(h){ if (t < h[0]) g = h[1]; }); }
    return g;
  }
  function weight(purpose, person, t){
    var w = (purpose != null && Object.prototype.hasOwnProperty.call(SCORE_W, purpose)) ? SCORE_W[purpose] : SCORE_W['기타'];
    return w + (GRADE_W[gradeAtMs(person, t)] || 0);
  }
  /* 장비 모델 → 그룹 */
  var GROUP_RULES = [[/^HISCL/,'HISCL'],[/^HLC-?723/,'A1c'],[/^RF-500/,null],[/^(CA|CS|CN)-/,'COA'],
    [/^(UF|UC|UN|UD)-|^U-WAM/,'Urine'],[/^(XN|XR|XS|XT|XE|XP|XQ|KX|K-|SP|DI|CF|BT|SA|RU|DC|CV|TS)-?/,'CBC']];
  function groupOf(m){ if(!m) return '기타'; for (var i=0;i<GROUP_RULES.length;i++) if (GROUP_RULES[i][0].test(m)) return GROUP_RULES[i][1] || '기타'; return '기타'; }

  /* 회계연도(4월 시작) */
  var nowK = new Date(Date.now() + 9*3600000);
  var fyOf = function(y, m){ return m >= 4 ? y : y - 1; };
  var CUR_FY = fyOf(nowK.getUTCFullYear(), nowK.getUTCMonth()+1), PREV_FY = CUR_FY - 1;
  function periodOf(ms){ var d = new Date(ms), fy = fyOf(d.getUTCFullYear(), d.getUTCMonth()+1);
    return fy === CUR_FY ? '이번 년도' : fy === PREV_FY ? '직전 년도' : '전체 누적'; }
  var FY_LABEL = {'이번 년도':'FY'+CUR_FY+' ('+CUR_FY+'.04–'+(CUR_FY+1)+'.03)',
    '직전 년도':'FY'+PREV_FY+' ('+PREV_FY+'.04–'+(PREV_FY+1)+'.03)', '전체 누적':'FY'+PREV_FY+' 이전'};
  /* 기간 지정 모드: opt.sel(선택 기간 월 목록) → '이번 년도' 칸, opt.cmp(비교 기간) → '직전 년도' 칸,
     '전체 누적' 칸 = 전체 데이터. 월별 추이는 opt.trend(12개월) vs 그 전년 동월. */
  var SEL = opt.sel ? new Set(opt.sel) : null, CMP = new Set(opt.cmp || []);
  function mkOf(ms){ var d = new Date(ms); return d.getUTCFullYear()+'-'+String(d.getUTCMonth()+1).padStart(2,'0'); }
  function shiftMk(mk, n){ var y=+mk.slice(0,4), m=+mk.slice(5)+n; while(m<1){m+=12;y--;} while(m>12){m-=12;y++;} return y+'-'+String(m).padStart(2,'0'); }
  var TR_CUR = {}, TR_PREV = {};
  (opt.trend || []).forEach(function(mk, i){ TR_CUR[mk] = String(i+1); TR_PREV[shiftMk(mk,-12)] = String(i+1); });
  function slotsOf(ms){
    if (!SEL) return [periodOf(ms)];
    var k = mkOf(ms), out = ['전체 누적'];
    if (SEL.has(k)) out.push('이번 년도'); if (CMP.has(k)) out.push('직전 년도');
    return out;
  }
  if (SEL && opt.labels) FY_LABEL = opt.labels;

  /* 인원 */
  var memberTeam = {}, teamMembers = {}; TEAMS.forEach(function(t){ teamMembers[t] = []; });
  ROSTER.forEach(function(r){ var n=r[0], t=r[1]; if (EXCLUDED.has(n) || !teamMembers[t] || memberTeam[n]) return; memberTeam[n]=t; teamMembers[t].push(n); });

  function purposeOf(r){
    if (r.purp) return r.purp;
    if (!r.subj) return null;
    var p = r.subj.split('/');
    if (p.length >= 4) return p.slice(3).join('/');
    if (p.length === 2) return p[1];
    return null;
  }
  function modelFromSubj(s){ if(!s) return null; var p=s.split('/'); return p.length>=3 && p[1] ? p[1] : null; }

  var UNIT_GROUP = {}; Object.keys(opt.teamGroups || {}).forEach(function(g){ opt.teamGroups[g].forEach(function(u){ UNIT_GROUP[u] = g; }); });
  var CORE = kpiCore(RAW, ROSTER, {teams:TEAMS, excluded:[...EXCLUDED], accountTeam:opt.accountTeam, unitGroup:UNIT_GROUP});
  var rows = RAW.filter(function(r){ return r.t != null && r.st !== '취소됨' && purposeOf(r) !== '온라인 정기점검'; });
  // S/N → 가장 많이 나온 모델 (주제에 모델이 없는 행 보정)
  var snCtr = {};
  rows.forEach(function(r){ var m = modelFromSubj(r.subj); if (m && r.sn){ var c = snCtr[r.sn] || (snCtr[r.sn] = new Map()); c.set(m, (c.get(m)||0)+1); } });
  function topKey(map){ var best=null, bn=-1; map.forEach(function(v,k){ if (v>bn){ bn=v; best=k; } }); return best; }
  var snModel = {}; Object.keys(snCtr).forEach(function(s){ snModel[s] = topKey(snCtr[s]); });

  function nest(){ return {}; }
  var P = {}; // 사람별 누적
  function per(name){
    return P[name] || (P[name] = {group:{}, mttr:{}, kase:{}, month:{}, acct:new Map(), acctP:{}, score:{}, scoreG:{}});
  }
  function inc(o, k, v){ o[k] = (o[k]||0) + (v==null?1:v); }
  function sub(o, k){ return o[k] || (o[k] = {}); }

  /* 담당자 + 필수 참석자(2026-10-07): 참석자도 담당자와 같은 가중치로 점수·건수를 받는다.
     거래처→팀 판정(p.acct)과 재방문율·FTFR은 행 단위라 담당자만 쓴다(중복 집계 방지). */
  var ATT_N = 0;
  function attendees(r){
    if (!r.att) return [];
    var seen = {}; seen[r.own] = 1;
    return String(r.att).split(/[;,]/).map(function(x){ return x.trim(); })
      .filter(function(x){ if (!x || seen[x] || EXCLUDED.has(x)) return false; seen[x] = 1; return true; });
  }
  rows.forEach(function(r){
    if (r.st === '취소됨') return;
    var slots = slotsOf(r.t), purpose = purposeOf(r);
    var model = modelFromSubj(r.subj) || (r.sn ? snModel[r.sn] : null) || null;
    var g = groupOf(model), b = bucket(purpose);
    if (r.own && !EXCLUDED.has(r.own)) credit(r.own, true);
    attendees(r).forEach(function(a){ ATT_N++; credit(a, false); });
    function credit(person, isOwner){
    var w = weight(purpose, person, r.t), p = per(person);
    if (SEL){ var mk = mkOf(r.t); if (TR_CUR[mk]) inc(sub(p.month,'이번 년도'), TR_CUR[mk]); if (TR_PREV[mk]) inc(sub(p.month,'직전 년도'), TR_PREV[mk]); }
    else inc(sub(p.month, slots[0]), String(new Date(r.t).getUTCMonth()+1));
    if (isOwner && r.acct && (b === '고장수리' || b === 'PM')) p.acct.set(r.acct, (p.acct.get(r.acct)||0)+1);
    slots.forEach(function(period){
    inc(p.score, period, w);
    if (r.acct) inc(sub(p.acctP, period), r.acct);   // 자주 방문한 병원: 모든 약속/활동(취소 제외), 기간별, 동행 포함
    if (g){
      inc(sub(p.scoreG, period), g, w);
      inc(sub(p.group, period), g);
      if (purpose === '고장 수리' && r.e != null){
        var mins = (r.e - r.t)/60000;
        if (mins >= 0 && mins <= 500){ var mm = sub(sub(p.mttr, period), g); mm.sum = (mm.sum||0)+mins; mm.n = (mm.n||0)+1; }
      }
    }
    inc(sub(p.kase, period), b);
    });
    }
  });

  /* 재방문율 / FTFR — 두 탭 공통 기준(kpiCore) */
  function inSlot(pr){ return function(x){ return pr === 'cum' || slotsOf(x.t).indexOf(pr) >= 0; }; }
  var acctTeam = CORE.acctTeam;

  /* ---- finalize ---- */
  // 파이썬 round()와 같은 결과(정확히 .5면 짝수 쪽)로 맞춘다 — 원본 대시보드와 소수점까지 일치시키기 위해
  function rnd(x, d){ var k = Math.pow(10, d), n = x*k, f = Math.floor(n), r = n - f;
    if (Math.abs(r - 0.5) < 1e-9) return (f % 2 === 0 ? f : f + 1)/k; return Math.round(n)/k; }
  function r2(x){ return typeof x === 'number' ? rnd(x, 2) : x; }
  function personEntry(name, team){
    var p = P[name] || {group:{}, mttr:{}, kase:{}, month:{}, acct:new Map(), acctP:{}, score:{}, scoreG:{}};
    var e = {team:team, group_case:{}, mttr:{}, case:{}, month:{}, total_case:{}, score:{}, score_group:{}};
    PERIODS.forEach(function(pr){
      var gc = p.group[pr] || {}, mt = p.mttr[pr] || {}, cs = p.kase[pr] || {}, sg = p.scoreG[pr] || {};
      e.group_case[pr] = {}; e.mttr[pr] = {}; e.case[pr] = {}; e.score_group[pr] = {};
      var tot = 0;
      GROUPS.forEach(function(g){ e.group_case[pr][g] = gc[g] || 0; tot += gc[g] || 0;
        if (mt[g] && mt[g].n) e.mttr[pr][g] = {avg: r2(mt[g].sum/mt[g].n), n: mt[g].n};
        e.score_group[pr][g] = r2(sg[g] || 0); });
      e.total_case[pr] = tot;
      BUCKETS.forEach(function(b){ e.case[pr][b] = cs[b] || 0; });
      e.month[pr] = Object.assign({}, p.month[pr] || {});
      e.score[pr] = r2(p.score[pr] || 0);
    });
    e.accounts = {};
    PERIODS.forEach(function(pr){ var o = p.acctP[pr] || {};
      e.accounts[pr] = Object.keys(o).map(function(k){ return [k, o[k]]; }).sort(function(a,b){ return b[1]-a[1] || (a[0]<b[0]?-1:1); }); });
    e.top_accounts = e.accounts['이번 년도'].slice(0,6);
    return e;
  }
  var person = {};
  Object.keys(memberTeam).forEach(function(n){ person[n] = personEntry(n, memberTeam[n]); });

  function teamEntry(members){
    var o = {group_case:{}, mttr:{}, case:{}, month:{}, total_case:{}, score:{}, score_group:{}, score_avg:{}};
    PERIODS.forEach(function(pr){
      var gc={}, ms={}, cs={}, mo={}, tot=0, sc=0, sg={};
      GROUPS.forEach(function(g){ gc[g]=0; ms[g]=[0,0]; sg[g]=0; }); BUCKETS.forEach(function(b){ cs[b]=0; });
      members.forEach(function(m){ var pe = person[m];
        GROUPS.forEach(function(g){ gc[g] += pe.group_case[pr][g]; var d = pe.mttr[pr][g]; if (d){ ms[g][0] += d.avg*d.n; ms[g][1] += d.n; } sg[g] += pe.score_group[pr][g]; });
        BUCKETS.forEach(function(b){ cs[b] += pe.case[pr][b]; });
        Object.keys(pe.month[pr]).forEach(function(k){ mo[k] = (mo[k]||0) + pe.month[pr][k]; });
        tot += pe.total_case[pr]; sc += pe.score[pr]; });
      o.group_case[pr] = gc; o.case[pr] = cs; o.month[pr] = mo; o.total_case[pr] = tot;
      o.mttr[pr] = {}; GROUPS.forEach(function(g){ if (ms[g][1]) o.mttr[pr][g] = {avg: r2(ms[g][0]/ms[g][1]), n: ms[g][1]}; sg[g] = r2(sg[g]); });
      o.score[pr] = r2(sc); o.score_group[pr] = sg;
      o.score_avg[pr] = members.length ? r2(o.score[pr]/members.length) : 0;
    });
    return o;
  }
  var team = {};
  TEAMS.forEach(function(t){ team[t] = teamEntry(teamMembers[t]); team[t].members = teamMembers[t]; });
  var company = teamEntry([].concat.apply([], TEAMS.map(function(t){ return teamMembers[t]; })));
  /* 팀 합계(사무소로 나눈 팀: CENTRAL = 대전+광주, SOUTH = 부산+대구) — 화면 순서 VIEW = 팀 합계 다음에 사무소 */
  var GROUPS_T = opt.teamGroups || {}, VIEW = [];
  TEAMS.forEach(function(t){
    Object.keys(GROUPS_T).forEach(function(g){ if (GROUPS_T[g][0] === t){ VIEW.push(g);
      var ms = [].concat.apply([], GROUPS_T[g].map(function(u){ return teamMembers[u] || []; }));
      team[g] = teamEntry(ms); team[g].members = ms; team[g].units = GROUPS_T[g]; TEAM_SHORT[g] = g.replace(/^FS\s*/,''); } });
    VIEW.push(t);
  });
  /* 화면 비교 단위(2026-10-14): 팀 4개(사무소로 나눈 팀은 합계), 사무소는 팀 안에서 참고로 */
  var TOP = [], PARENT = {};
  TEAMS.forEach(function(t){ var g = null; Object.keys(GROUPS_T).forEach(function(k){ if (GROUPS_T[k].indexOf(t) >= 0) g = k; });
    if (g){ PARENT[t] = g; if (TOP.indexOf(g) < 0) TOP.push(g); } else TOP.push(t); });
  /* 공정 비교(2026-10-14): 팀·사무소 비교는 팀장·신입을 뺀 1인당 값 + 직급 보정 지수
     직급 보정 지수 = 개인 점수 ÷ FSG 같은 직급(현재 직급) 중앙값 × 100 — 팀장·신입은 계산에서 뺌 */
  var EXA = {}; (opt.exclAvg || []).forEach(function(n){ EXA[n] = 1; });
  var GNOW = opt.gradeNow || {};
  function median(a){ a = a.slice().sort(function(x,y){ return x-y; }); var k = a.length; return k ? (k%2 ? a[(k-1)/2] : (a[k/2-1]+a[k/2])/2) : 0; }
  var IDX = {};
  Object.keys(person).forEach(function(n){ IDX[n] = {}; });
  PERIODS.forEach(function(pr){
    var byG = {}; Object.keys(person).forEach(function(n){ if (EXA[n]) return; var g = GNOW[n] || person[n].grade || '';
      (byG[g] = byG[g] || []).push(person[n].score[pr] || 0); });
    Object.keys(person).forEach(function(n){ if (EXA[n]) { IDX[n][pr] = null; return; }
      var md = median(byG[GNOW[n] || person[n].grade || ''] || []); IDX[n][pr] = md > 0 ? r2((person[n].score[pr] || 0) / md * 100) : null; });
  });
  Object.keys(person).forEach(function(n){ person[n].grade_index = IDX[n]; });
  Object.keys(team).forEach(function(t){ var core = team[t].members.filter(function(n){ return !EXA[n]; });
    team[t].n_core = core.length; team[t].score_avg_core = {}; team[t].case_avg_core = {}; team[t].index_avg = {};
    PERIODS.forEach(function(pr){
      team[t].score_avg_core[pr] = core.length ? r2(core.reduce(function(a,n){ return a + (person[n].score[pr]||0); }, 0)/core.length) : 0;
      team[t].case_avg_core[pr] = core.length ? r2(core.reduce(function(a,n){ return a + (person[n].total_case[pr]||0); }, 0)/core.length) : 0;
      var iv = core.map(function(n){ return IDX[n][pr]; }).filter(function(v){ return v != null; });
      team[t].index_avg[pr] = iv.length ? r2(iv.reduce(function(a,b){ return a+b; }, 0)/iv.length) : null;
    }); });

  function pct(v){ return v == null ? null : rnd(v*100, 1); }
  function avg(vs){ vs = vs.filter(function(v){ return v != null; }); return vs.length ? vs.reduce(function(a,b){return a+b;},0)/vs.length : null; }
  var revisit = {};
  function teamTotals(t){
    var c = CORE.revisitAvg(inSlot('cum'), t), th = CORE.revisitAvg(inSlot('이번 년도'), t), la = CORE.revisitAvg(inSlot('직전 년도'), t);
    return {'재방문율':c.revisit, 'FTFR':c.ftfr, '이번년도재방문율':th.revisit, '이번년도FTFR':th.ftfr, '직전년도재방문율':la.revisit, '직전년도FTFR':la.ftfr};
  }
  function hospList(match){
    var hs = [];
    CORE.eligible.forEach(function(a){
      if (!match(a)) return;
      var cum = CORE.acctRates(a, inSlot('cum')), th = CORE.acctRates(a, inSlot('이번 년도')), la = CORE.acctRates(a, inSlot('직전 년도'));
      hs.push({name:a, n_rv:cum.n_rv, cum_revisit:cum.revisit, cum_ftfr:cum.ftfr, this_revisit:th.revisit, this_ftfr:th.ftfr, last_revisit:la.revisit, last_ftfr:la.ftfr});
    });
    var n = hs.length;
    hs = hs.map(function(h,i){ h._i=i; return h; }).sort(function(a,b){ return b.n_rv-a.n_rv || a._i-b._i; }).slice(0,40);
    hs.forEach(function(h){ delete h.n_rv; delete h._i; });
    return {hs:hs, n:n};
  }
  TEAMS.forEach(function(t){ var h = hospList(function(a){ return (UNIT_GROUP[t] ? acctTeam(a) : CORE.acctGroup(a)) === t; });
    revisit[t] = {reliable:true, team_total:teamTotals(t), hospitals:h.hs, total_hospital_count:h.n}; });
  revisit.ALL = {team_total:teamTotals(null)};
  Object.keys(GROUPS_T).forEach(function(g){ var h = hospList(function(a){ return CORE.acctGroup(a) === g; });
    revisit[g] = {reliable:true, team_total:teamTotals({group:g}), hospitals:h.hs, total_hospital_count:h.n}; });   // FSG 전체 = 4개 팀 거래처 전체 평균 (서비스 탭과 같은 값)

  /* ===== 야간·휴일 근무(OT) — CRM 기록 기준 (2026-10-13, 10-14 연속 기록 묶음) =====
     기준일 = 시작일(00~08시 시작은 전날 밤으로 봐 전날). 기준일이 토·일·공휴일이면 휴일 근무(시간대 무관),
     평일이면 근무 종료 시각(WEST·EAST 17시, CENTRAL·SOUTH 18시) 이후 또는 06:00 이전 시작 = 야간 OT.
     06~08시에 새로 시작한 작업은 이른 출근으로 보아 제외(06시 이전부터 이어진 작업이면 포함).
     평일 근무 중 시작해 종료 시각을 넘겨 끝난 건 = 잔업(종료 시각부터 끝날 때까지).
     야간·휴일은 사람별로 같은 기준일에 시간이 이어지거나 겹치는 기록을 1건으로 묶는다(장비별로 나눠 입력한 기록 대응).
     묶은 건의 시간 = 기록 구간의 합집합(겹친 시간은 한 번만), 업무 형태 = 그 안에서 시간이 가장 긴 업무.
     500분 초과·종료 없음 기록은 시간 0. 담당자 + 필수 참석자 각각. */
  var HOL = {}; (opt.holidays || []).forEach(function(d){ HOL[d] = 1; });
  /* 근무시간(2026-10-14): WEST·EAST 08~17시, CENTRAL·SOUTH 09~18시 — 종료 시각 이후가 OT */
  var OT_END_H = opt.otEndHour || {'FS WEST':17, 'FS EAST':17, 'FS CENTRAL':18, 'FS SOUTH':18};
  var SHIFT = opt.shift || {};
  var SHIFT_WIN = {'석간':[17,25], '야간':[24,32], '석/야':[17,32]};   /* {성명: {'YYYY-MM-DD': '석간'|'석/야'}} — 근무일정표 시프트 근무일(석간·석/야) */
  var OT_BUCKETS = ['고장수리','PM','설치','이전철수','Cal평가','기타'];
  var OT_BUCKET_LABEL = {'고장수리':'고장 수리','PM':'PM','설치':'설치','이전철수':'이전·철수','Cal평가':'Cal·평가','기타':'기타'};
  function otBucket(p){
    if (p === '장비 이전 설치' || p === '장비 철수' || p === '철수 및 폐기') return '이전철수';
    if (p === '장비 설치' || p === '설치' || p === '설치/데모 평가') return '설치';
    var b = bucket(p); return b === '설치이전' ? '설치' : b;
  }
  function otE(){ return {nN:0,nM:0,hN:0,hM:0,xN:0,xM:0,sN:0,sM:0,rM:0,nB:{},hB:{},sB:{}}; }
  var OTP = {}, OTM = {}, OTEV = {};
  function otP(n, pr){ var a = OTP[n] || (OTP[n] = {}); return a[pr] || (a[pr] = otE()); }
  function otMonth(n, mk){
    var m = OTM[n] || (OTM[n] = {'이번 년도':{}, '직전 년도':{}}), out = [];
    [['이번 년도', TR_CUR[mk]], ['직전 년도', TR_PREV[mk]]].forEach(function(z){ if (!z[1]) return;
      out.push(m[z[0]][z[1]] || (m[z[0]][z[1]] = {n:0, h:0, x:0, s:0, nM:0, hM:0, xM:0, sM:0, r:0})); });
    return out;
  }
  CORE.rows.forEach(function(x){
    if (!x.credits.length) return;
    var h = new Date(x.t).getUTCHours(), ref = h < 8 ? x.t - 86400000 : x.t, rd = new Date(ref), wd = rd.getUTCDay();
    var dkey = rd.toISOString().slice(0,10);
    var isHol = wd === 0 || wd === 6 || !!HOL[dkey];
    x.credits.forEach(function(n){
      var endH = OT_END_H[memberTeam[n]] || 18;   /* 팀별 근무 종료 시각 */
      var kind = isHol ? 'h' : (h >= endH || h < 8) ? 'n' : null;
      /* EAST·WEST 시프트 근무일(근무일정표 석간·석/야): 주간 업무가 저녁·야간으로 옮겨간 날이라 OT가 아니라 '시프트 근무'로 따로 */
      /* 시프트 시간: 석간 17~25시, 야간 24~08시, 석/야(석간+야간) 17~08시. 시프트 시간 안에 시작한 활동만 '시프트 근무' */
      var sh = !isHol && SHIFT[n] && SHIFT[n][dkey];
      if (sh){
        var d0 = Date.UTC(rd.getUTCFullYear(), rd.getUTCMonth(), rd.getUTCDate()), H = 3600000;
        var W = SHIFT_WIN[sh] || SHIFT_WIN['석/야'], w0 = d0 + W[0]*H, w1 = d0 + W[1]*H;
        if (kind === 'n' && x.t >= w0 && x.t < w1) kind = 's';
        else if (!kind && W[0] === 17 && x.dur != null && x.e > d0 + 17*H) kind = 's';   /* 석간 시작(17시)을 넘어간 근무 중 활동 */
      }
      if (!kind){   /* 잔업: 근무 중 시작해 종료 시각을 넘긴 부분(종료 시각~끝). 같은 날 야간 활동과 이어지거나 같은 거래처면 야간 1건으로 합친다 */
        if (x.dur == null) return;
        var cut = Date.UTC(rd.getUTCFullYear(), rd.getUTCMonth(), rd.getUTCDate(), endH);
        if (x.e <= cut) return;
        (OTEV[n] || (OTEV[n] = [])).push({kind:'n', isX:true, day:dkey, ref:ref, s:cut, e:x.e, b:otBucket(x.purpose), a:x.acct || '', early:false});
        return;
      }
      (OTEV[n] || (OTEV[n] = [])).push({kind:kind, day:dkey, ref:ref, s:x.t, e:(x.dur != null ? x.e : x.t), b:otBucket(x.purpose), a:x.acct || '',
        early:(kind !== 'h' && h >= 6 && h < 8)});   /* 06~08시 시작 = 이른 출근(단, 06시 이전부터 이어진 작업이면 포함) */
    });
  });
  /* 같은 사람·같은 기준일·같은 구분(야간/휴일)에서 이어지거나 겹치는 기록 → 1건 */
  Object.keys(OTEV).forEach(function(n){
    var list = OTEV[n].slice().sort(function(a,b){ return a.kind < b.kind ? -1 : a.kind > b.kind ? 1 : a.day < b.day ? -1 : a.day > b.day ? 1 : a.s - b.s; });
    var cur = null;
    function flush(){
      if (!cur) return;
      if (cur.early && cur.kind === 'n'){ cur = null; return; }   /* 06~08시에 새로 시작한 작업은 OT 아님 */
      var mins = cur.len/60000, top = null, tv = -1;
      if (cur.allX){   /* 잔업만으로 된 묶음 → 잔업 1건 */
        slotsOf(cur.ref).forEach(function(pr){ var e = otP(n, pr); e.xN++; e.xM += mins; });
        otMonth(n, mkOf(cur.ref)).forEach(function(c){ c.x++; c.xM += mins; });
        cur = null; return;
      }
      OT_BUCKETS.forEach(function(k){ var v = cur.bm[k]; if (v != null && v > tv){ tv = v; top = k; } });
      var slots = slotsOf(cur.ref), mk = mkOf(cur.ref), K = cur.kind;
      function hm(ms){ var d = new Date(ms); return String(d.getUTCHours()).padStart(2,'0')+':'+String(d.getUTCMinutes()).padStart(2,'0'); }
      var sd = new Date(cur.start), item = {d:(sd.getUTCMonth()+1)+'/'+sd.getUTCDate()+' '+hm(cur.start)+'~'+hm(cur.end), a:cur.ac.join(', '), r:cur.n, m:Math.round(mins), s:cur.start};
      slots.forEach(function(pr){ var e = otP(n, pr);
        e[K+'N']++; e[K+'M'] += mins; e[K+'B'][top] = (e[K+'B'][top]||0) + 1;
        var L = e[K+'L'] || (e[K+'L'] = {}); (L[top] || (L[top] = [])).push(item); });
      otMonth(n, mk).forEach(function(c){ c[K]++; c[K+'M'] += mins; });
      cur = null;
    }
    list.forEach(function(ev){
      /* 같은 날·같은 구분에서 시간이 이어지거나 겹치면, 또는 같은 거래처면(중간에 빈 시간이 있어도) 1건 */
      /* 야간·시프트: 같은 날 60분 이내로 이어지면(다른 거래처로 옮겨가도) 또는 같은 거래처면 1건.
         휴일: 방문 건수 기준 — 같은 거래처만 1건(거래처 없는 기록은 이어질 때만) */
      var sameAc = ev.a && cur && cur.ac.indexOf(ev.a) >= 0;
      var joinable = cur && cur.kind === ev.kind && cur.day === ev.day &&
        (ev.kind === 'h' ? (sameAc || (!ev.a && !cur.ac.length && ev.s <= cur.end + 60000)) : (sameAc || ev.s <= cur.end + 60*60000));
      if (joinable){
        if (ev.e > cur.end){ cur.len += ev.e - Math.max(ev.s, cur.end); cur.end = ev.e; }
      } else {
        flush();
        cur = {kind:ev.kind, day:ev.day, ref:ev.ref, start:ev.s, end:ev.e, len:ev.e - ev.s, bm:{}, n:0, ac:[], early:ev.early, allX:true};
      }
      if (!ev.isX) cur.allX = false;
      cur.bm[ev.b] = (cur.bm[ev.b] || 0) + (ev.e - ev.s) + 1;   /* +1: 시간 0인 기록도 형태 후보로 */
      cur.n++; if (ev.a && cur.ac.indexOf(ev.a) < 0) cur.ac.push(ev.a);
    });
    flush();
  });
  /* 연장근무 시간(2026-10-14 사용자 결정): OT 시간은 인사 「직원 월별 연장근무현황」 기준(opt.hr = {h:{성명:{'YYYY-MM':시간}}, src})
     CRM은 야간·휴일 건수와 업무 형태만 참고. 자료가 있는 달 = 첫 달 ~ 값이 있는 마지막 달 */
  var HR = opt.hr || null, HRM = {}, HRCOV = {};
  if (HR && HR.h){
    /* 자료가 있는 달 = 5명 이상 값이 있는 첫 달 ~ 파일명 날짜의 달(없으면 5명 이상인 마지막 달). 2026년 파일은 1~3월이 거의 비어 있음 */
    var cnt = {}; Object.keys(HR.h).forEach(function(n){ Object.keys(HR.h[n]).forEach(function(mk){ if (HR.h[n][mk] > 0) cnt[mk] = (cnt[mk]||0) + 1; }); });
    var mks = Object.keys(cnt).filter(function(mk){ return cnt[mk] >= 5; }).sort(), firstMk = mks[0] || null, lastMk = HR.upto || mks[mks.length-1] || null;
    if (HR.ms){ Object.keys(HR.ms).forEach(function(mk){ HRCOV[mk] = 1; }); var cks = Object.keys(HRCOV).sort(); firstMk = cks[0] || null; lastMk = cks[cks.length-1] || null; }   /* 월별 연장근로 + 연장근무 신청 합본: 달마다 출처 */
    else if (firstMk && lastMk){ for (var hm = firstMk; hm <= lastMk; hm = shiftMk(hm, 1)) HRCOV[hm] = 1; }
    var perMonths = {'이번 년도': opt.sel || [], '직전 년도': opt.cmp || [], '전체 누적': Object.keys(HRCOV)};
    Object.keys(memberTeam).forEach(function(n){ var hh = HR.h[n] || {};
      PERIODS.forEach(function(pr){ var e = otP(n, pr); perMonths[pr].forEach(function(mk){ if (HRCOV[mk]) e.rM += Math.round((hh[mk] || 0) * 60); }); });
      Object.keys(HRCOV).forEach(function(mk){ otMonth(n, mk).forEach(function(c){ c.r += Math.round((hh[mk] || 0) * 60); }); }); });
    HRM = {src: HR.src || '', asof: HR.asof || null, first: firstMk, last: lastMk, covm: Object.keys(HRCOV).sort(), srcs: HR.srcs || null, missing: Object.keys(memberTeam).filter(function(n){ return !HR.h[n]; }),
      cov: {'이번 년도': (opt.sel||[]).filter(function(mk){ return HRCOV[mk]; }).length, '직전 년도': (opt.cmp||[]).filter(function(mk){ return HRCOV[mk]; }).length, '전체 누적': Object.keys(HRCOV).length},
      months: {'이번 년도': (opt.sel||[]).length, '직전 년도': (opt.cmp||[]).length}};
  }
  function otSum(names){
    var o = {}, mo = {'이번 년도':{}, '직전 년도':{}};
    PERIODS.forEach(function(pr){ var s = otE();
      names.forEach(function(n){ var e = (OTP[n] || {})[pr]; if (!e) return;
        ['nN','nM','hN','hM','xN','xM','sN','sM','rM'].forEach(function(k){ s[k] += e[k] || 0; });
        ['nB','hB','sB'].forEach(function(k){ Object.keys(e[k] || {}).forEach(function(bb){ s[k][bb] = (s[k][bb]||0) + e[k][bb]; }); });
        if (names.length === 1) ['nL','hL','sL'].forEach(function(k){ if (e[k]) s[k] = e[k]; }); });   /* 내역 목록은 개인만 */
      o[pr] = s; });
    names.forEach(function(n){ var m = OTM[n]; if (!m) return;
      ['이번 년도','직전 년도'].forEach(function(pr){ Object.keys(m[pr]).forEach(function(i){
        var c = mo[pr][i] || (mo[pr][i] = {n:0, h:0, x:0, s:0, nM:0, hM:0, xM:0, sM:0, r:0});
        ['n','h','x','s','nM','hM','xM','sM','r'].forEach(function(k){ c[k] += m[pr][i][k] || 0; }); }); }); });
    return {p:o, month:mo};
  }
  var OT = {person:{}, team:{}, company:null, holidays:(opt.holidays||[]).length, shift:opt.shiftInfo || null, hr:(HR && HR.h) ? HRM : null};
  Object.keys(memberTeam).forEach(function(n){ OT.person[n] = otSum([n]); });
  TEAMS.forEach(function(t){ OT.team[t] = otSum(teamMembers[t]); });
  Object.keys(GROUPS_T).forEach(function(g){ OT.team[g] = otSum(team[g].members); });
  OT.company = otSum(Object.keys(memberTeam));

  var today = nowK.toISOString().slice(0,10);
  return {att_credits:ATT_N, teams:TEAMS, team_view:VIEW, team_top:TOP, team_parent:PARENT, team_groups:GROUPS_T, team_short:TEAM_SHORT, groups:GROUPS, group_label:GROUP_LABEL, periods:PERIODS,
    period_label:FY_LABEL, fy_meta:{today:today, cur_fy:CUR_FY, prev_fy:PREV_FY, labels:FY_LABEL},
    buckets:BUCKETS, bucket_label:BUCKET_LABEL, ot_buckets:OT_BUCKETS, ot_bucket_label:OT_BUCKET_LABEL,
    benchmarks:{mttr_target:120, revisit_target:15.0, ftfr_target:90.0},
    person:person, team:team, company:company, revisit:revisit, ot:OT,
    revisit_snapshot_date:today, data_snapshot_date:today};
}

if (typeof module !== 'undefined' && module.exports) module.exports = { kpiCore: kpiCore, buildProdData: buildProdData };
