/* 생성 파일 — 손으로 고치지 말 것.
 * fsg-kpi.html의 직원용 자료 만들기(STAFF_SALT·staffCodeOf·staffCutOf·staffScore·staffBundle)와 시각 보정(TZ_FIX·fixTz)을 tools/extract-staff-core.js 가 글자 그대로 떼어 낸 사본이다.
 * 규칙을 바꾸려면 fsg-kpi.html을 고친 뒤 `node fsg-report/tools/extract-staff-core.js`를 다시 돌린다.
 * (브라우저 올리기와 PC 올리기가 같은 사본을 만들도록 tests/test_staff.js 가 두 파일의 일치를 검사한다) */
const STAFF_SALT='fsg-kpi-staff-v1';
async function staffCodeOf(code, subtle){
  subtle=subtle||crypto.subtle; const enc=new TextEncoder();
  const base=await subtle.importKey('raw',enc.encode(code),'PBKDF2',false,['deriveBits']);
  const bits=new Uint8Array(await subtle.deriveBits({name:'PBKDF2',salt:enc.encode(STAFF_SALT),iterations:200000,hash:'SHA-256'},base,256));
  let b=''; for(const x of bits) b+=String.fromCharCode(x);
  return btoa(b).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
}
/* CRM 추출일(파일명의 날짜, 없으면 올린 날, 그것도 없으면 오늘) 다음 날 0시 — 그 뒤로 잡힌 예정 약속은 쓰지 않는다(dataCutoff 가 이 함수를 쓴다) */
function staffCutOf(act, at){
  let m=String(act||'').match(/(20\d\d)[_\-.](\d{1,2})[_\-.](\d{1,2})/);
  if(!m&&at) m=String(at).match(/(20\d\d)-(\d\d)-(\d\d)/);
  if(m) return {t:Date.UTC(+m[1],+m[2]-1,+m[3]+1), d:`${m[1]}-${String(m[2]).padStart(2,'0')}-${String(m[3]).padStart(2,'0')}`};
  const k=new Date(Date.now()+9*3600000); return {t:Date.UTC(k.getUTCFullYear(),k.getUTCMonth(),k.getUTCDate()+1), d:k.toISOString().slice(0,10)};
}
/* 단위(팀·사무소)별 월 점수 합 — 원본으로 buildProdData 를 달마다 돌려(한 번에 두 달) 사람 점수를 단위로 더한다. 결과에 사람은 없다.
   o = {raw(추출일까지 자른 행), roster[[이름,단위,직급]](PROD_ROSTER 모양), units, groups, exclAvg[이름], gradeHist, weights, buildProdData, rev, pause} → {months, u:{단위:{c:[비교 인원 합], a:[전체 합]}}, rev} */
async function staffScore(o){
  const mk=t=>{ const d=new Date(t); return d.getUTCFullYear()+'-'+String(d.getUTCMonth()+1).padStart(2,'0'); };
  const months=[...new Set(o.raw.filter(r=>r.t!=null).map(r=>mk(r.t)))].sort(), ex=new Set(o.exclAvg||[]), unit={}, r2=x=>Math.round(x*100)/100;
  o.roster.forEach(r=>{ unit[r[0]]=r[1]; });
  const out={months,u:{},rev:o.rev||''}; o.units.forEach(u=>{ out.u[u]={c:months.map(()=>0),a:months.map(()=>0)}; });
  const gradeNow={}; o.roster.forEach(r=>{ gradeNow[r[0]]=r[2]; });
  for(let i=0;i<months.length;i+=2){
    const P=o.buildProdData(o.raw,o.roster,{teams:o.units,teamGroups:o.groups||{},gradeNow,exclAvg:o.exclAvg||[],gradeHist:o.gradeHist||[],weights:o.weights,sel:[months[i]],cmp:i+1<months.length?[months[i+1]]:[],trend:[],labels:{}});
    Object.keys(P.person).forEach(n=>{ const e=out.u[unit[n]]; if(!e) return; [[i,'이번 년도'],[i+1,'직전 년도']].forEach(([k,pr])=>{ if(k>=months.length) return; const v=(P.person[n].score||{})[pr]||0; e.a[k]+=v; if(!ex.has(n)) e.c[k]+=v; }); });
    if(o.pause) await o.pause();
  }
  Object.keys(out.u).forEach(u=>{ out.u[u].c=out.u[u].c.map(r2); out.u[u].a=out.u[u].a.map(r2); });
  return out;
}
/* o = {raw(시각 보정까지 끝난 행), roster[[이름,팀,직급]], office{이름:사무소}, newbie[이름], encodeAct, rnd(n)→난수 바이트, ser, eq{rows,src,made}, inst{map,at}, acad, score(staffScore 결과), src{act,ser,eq}, tzN, made} */
function staffBundle(o){
  const AL='abcdefghijkmnpqrstuvwxyz23456789', OUT='~other';
  const ri=n=>{ const b=o.rnd(4); return (((b[0]<<24)|(b[1]<<16)|(b[2]<<8)|b[3])>>>0)%n; };
  const used=new Set(), newId=()=>{ for(;;){ const b=o.rnd(6); let v='~'; for(let i=0;i<6;i++) v+=AL[b[i]&31]; if(!used.has(v)){ used.add(v); return v; } } };
  const shuffle=a=>{ for(let i=a.length-1;i>0;i--){ const j=ri(i+1), t=a[i]; a[i]=a[j]; a[j]=t; } return a; };
  const off=o.office||{}, nb=new Set(o.newbie||[]), real={}, groups={}, cls={};
  const ros={roster:[],office:{},newbie:[],gradeHist:[]};
  o.roster.forEach(r=>{ const k=(off[r[0]]?r[1]+' '+off[r[0]]:r[1])+'|'+(r[2]==='팀장'?'L':nb.has(r[0])?'N':'C'); real[r[0]]=k; (groups[k]=groups[k]||[]).push(r); });
  Object.keys(groups).forEach(k=>{ const g=groups[k], grades=shuffle(g.map(r=>r[2]));
    cls[k]=g.map((r,i)=>{ const id=newId(); ros.roster.push([id,r[1],grades[i]]); if(off[r[0]]) ros.office[id]=off[r[0]]; if(k.slice(-1)==='N') ros.newbie.push(id); return id; }); });
  shuffle(ros.roster);
  /* 같은 거래처·같은 날·같은 묶음 안에서는 같은 사람 = 같은 번호(공동 방문 인원 수를 지킴), 그 밖에는 매번 새로 고른다 */
  const memo=new Map();
  const pick=(name,acct,day)=>{ const k=real[name]; if(!k) return null; const gk=k+'|'+acct+'|'+day; let m=memo.get(gk); if(!m) memo.set(gk,m={by:{},free:shuffle(cls[k].slice())});
    return m.by[name]||(m.by[name]=m.free.pop()); };
  const names=new Set(o.roster.map(r=>r[0])), parts=v=>String(v||'').split(/[;,]/).map(x=>x.trim()).filter(Boolean);
  const recs=o.raw.map(r=>{ const day=r.t==null?'':Math.floor(r.t/86400000), acct=r.acct||'', own=String(r.own||'').trim(), at=parts(r.att);
    if(own) names.add(own); at.forEach(n=>names.add(n));
    return {st:r.st,ft:r.ft,own:own?(pick(own,acct,day)||OUT):'',att:at.map(n=>pick(n,acct,day)).filter(Boolean).join(';'),err:r.err,acct:r.acct,sn:r.sn,prod:r.prod,purp:r.purp,subj:r.subj,t:r.t,e:r.e,c:r.c}; });
  let eq=null;
  if(o.eq&&o.eq.rows){ eq={rows:o.eq.rows.map(r=>{ const c=r.slice(), n=String(r[0]||'').trim(), k=real[n]; if(n) names.add(n); c[0]=!n?'':k?cls[k][ri(cls[k].length)]:OUT; return c; }),src:o.eq.src||'',made:o.eq.made||''}; }
  /* 주제에 적힌 이름 가리기 — 한글 3자 이상은 그대로 찾고, 2자 이하·영문은 앞뒤가 글자가 아닐 때만 */
  const esc=x=>x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'), nl=[...names].filter(n=>n.length>=2).sort((a,b)=>b.length-a.length);
  const long=nl.filter(n=>n.length>=3&&/^[가-힣]+$/.test(n)), short=nl.filter(n=>!(n.length>=3&&/^[가-힣]+$/.test(n)));
  const reL=long.length?new RegExp(long.map(esc).join('|'),'g'):null, reS=short.length?new RegExp('(?<![가-힣A-Za-z0-9])(?:'+short.map(esc).join('|')+')(?![가-힣A-Za-z0-9])','g'):null;
  const scrub=v=>{ v=String(v||''); if(reL) v=v.replace(reL,'○○○'); if(reS) v=v.replace(reS,'○○'); return v; };
  const E=o.encodeAct(recs,(o.src&&o.src.act)||''); E.d.subj=E.d.subj.map(scrub);
  return {v:1,kind:'fsg-kpi-staff',made:o.made||'',act:E,tzN:o.tzN||0,ros,ser:o.ser||null,eq,inst:o.inst?{map:o.inst.map||{},at:o.inst.at||''}:null,acad:o.acad||null,sw:o.score||null,src:{act:(o.src&&o.src.act)||'',ser:(o.src&&o.src.ser)||'',eq:(eq&&eq.src)||''}};
}

const TZ_FIX = {cut:{'김동찬':'2026-05-22','백원욱':'2026-05-22'}, def:'2026-05-23',
  names:['김동찬','안성무','이경민','백원욱','심구','박재우','서재훈','김회창','손혜린','이건우','김민결']};
function fixTz(recs){
  const H9=9*3600000, names=new Set(TZ_FIX.names); let n=0;
  for(const r of recs){ if(r.t==null||!names.has(r.own)) continue;
    const [y,m,dd]=(TZ_FIX.cut[r.own]||TZ_FIX.def).split('-').map(Number), cut=Date.UTC(y,m-1,dd);
    if(!(r.c!=null ? r.c<cut : r.t<cut+H9)) continue;
    const h=new Date(r.t).getUTCHours();
    if(h>=7&&h<=15){   /* 저장 07~15시 = 대개 정상(모바일 입력). 단 밤(21~06시)에 만든 기록이 시작보다 5~12시간 앞이면 실제 새벽 출동이 +9시간으로 밀린 것 */
      if(r.c==null) continue; const df=(r.t-r.c)/3600000, ch=new Date(r.c).getUTCHours();
      if(!(df>=5&&df<=12&&(ch>=21||ch<=6))) continue; }
    r.t0=r.t; r.e0=r.e; r.t-=H9; if(r.e!=null) r.e-=H9; r.tz=1; n++; }
  recs.tzFixed=n; return recs;
}

module.exports = { STAFF_SALT: STAFF_SALT, staffCodeOf: staffCodeOf, staffCutOf: staffCutOf, staffScore: staffScore, staffBundle: staffBundle, TZ_FIX: TZ_FIX, fixTz: fixTz };
