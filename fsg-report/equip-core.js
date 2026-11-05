/* 생성 파일 — 손으로 고치지 말 것.
 * fsg-kpi.html의 담당 장비 읽기(EQ_FIELD·parseEq·eqFromRows·eqByPerson·eqAgg)를 tools/extract-equip-core.js 가 글자 그대로 떼어 낸 사본이다.
 * 규칙을 바꾸려면 fsg-kpi.html을 고친 뒤 `node fsg-report/tools/extract-equip-core.js`를 다시 돌린다.
 * (대시보드·월간보고가 같은 규칙을 쓰도록 tests/test_equip.js 가 두 파일의 일치를 검사한다) */
const XLSX = require('xlsx');   // 대시보드는 브라우저 전역 XLSX 를 쓴다 — 함수 본문은 그대로

const EQ_FIELD={'XN':'CBC','XN-L':'CBC','XR':'CBC','SP':'CBC','DI':'CBC','HLC':'CBC','UF':'유린','UC':'유린','UD':'유린','CA':'응고','CS-1600·2500':'응고','CS-5100':'응고','CN':'응고','HISCL':'면역'};
const EQ_FIELDS=['CBC','유린','응고','면역'];

function parseEq(buf, fname){
  const wb=XLSX.read(buf,{type:'array'}), nm=wb.SheetNames.find(n=>n.replace(/\s/g,'')==='담당기관마스터');
  if(!nm) throw new Error("「담당기관 마스터」 시트가 없습니다. 담당기관 관리표 정리본인지 확인해 주세요.");
  const A=XLSX.utils.sheet_to_json(wb.Sheets[nm],{header:1,raw:true,defval:null,blankrows:false});
  const hi=A.findIndex(r=>r&&r.some(c=>String(c==null?'':c).trim()==='담당자')&&r.some(c=>String(c==null?'':c).replace(/\s/g,'').startsWith('기관명')));
  if(hi<0) throw new Error("「담당기관 마스터」 시트에서 머리글(담당자·기관명)을 찾지 못했습니다.");
  const dt=String(fname||'').match(/(20\d{2})[_.\-]?(\d{2})[_.\-]?(\d{2})/);
  return {rows:eqFromRows(A[hi], A.slice(hi+1)), src:fname, made:dt?dt[1]+'-'+dt[2]+'-'+dt[3]:''};
}

function eqFromRows(h, rows){
  const nz=c=>String(c==null?'':c).replace(/\s/g,''), ix=k=>h.findIndex(c=>nz(c).startsWith(k));
  const iP=ix('담당자'), iN=ix('기관명'), iS=ix('시·도'), iE=ix('장비수'), iB=ix('혈액시스템'), iU=ix('유린시스템'), iC=ix('응고시스템');
  if(iP<0||iN<0||iE<0) throw new Error("「담당기관 마스터」 시트에서 담당자·기관명·장비 수 열을 찾지 못했습니다. 담당기관 관리표 정리본인지 확인해 주세요.");
  const fam=Object.keys(EQ_FIELD).map(f=>[f,h.findIndex(c=>String(c==null?'':c).trim()===f)]).filter(x=>x[1]>=0);
  const num=v=>{ const n=typeof v==='number'?v:parseFloat(v); return isFinite(n)?n:0; }, at=(r,i)=>i>=0?r[i]:null;
  const out=[]; let any=0;
  for(const r of rows){ if(!r) continue; const n=String(at(r,iN)??'').trim(), p=String(at(r,iP)??'').trim(); if(!n||n===String(h[iN]).trim()) continue;
    const f={CBC:0,'유린':0,'응고':0,'면역':0}; fam.forEach(([k,i])=>{ f[EQ_FIELD[k]]+=num(r[i]); });
    const e=num(at(r,iE)); if(e>0) any++;
    out.push([p,n,String(at(r,iS)??'').trim(),e,num(at(r,iB)),num(at(r,iU)),num(at(r,iC)),f.CBC,f['유린'],f['응고'],f['면역']]); }
  if(!out.length) throw new Error('기관 행을 찾지 못했습니다.');
  if(!any) throw new Error('장비 수가 모두 비어 있습니다. 엑셀에서 파일을 한 번 열어 저장한 뒤 올려 주세요(수식 계산값이 필요합니다).');
  return out;
}

function eqByPerson(rows){
  const m={}; for(const r of rows){ if(!r[0]) continue; const o=m[r[0]]||(m[r[0]]={inst:0,eq:0,sB:0,sU:0,sC:0,CBC:0,'유린':0,'응고':0,'면역':0});
    o.inst++; o.eq+=r[3]; o.sB+=r[4]; o.sU+=r[5]; o.sC+=r[6]; o.CBC+=r[7]; o['유린']+=r[8]; o['응고']+=r[9]; o['면역']+=r[10]; }
  return m;
}

function eqAgg(by, members, cases, lead){
  const Z=()=>({inst:0,eq:0,sB:0,sU:0,sC:0,CBC:0,'유린':0,'응고':0,'면역':0}), a=Z();
  let nLead=0, cAll=0, cNoLead=0;
  for(const n of members){ const x=by[n]||Z(); for(const k in a) a[k]+=x[k]||0; const c=cases(n)||0; cAll+=c; if(lead(n)) nLead++; else cNoLead+=c; }
  const nAll=members.length, nPeople=nAll-nLead;
  a.nAll=nAll; a.nLead=nLead; a.nPeople=nPeople; a.perHead=a.eq/(nPeople||1); a.perHeadInclLead=a.eq/(nAll||1);
  a.casesAll=cAll; a.casesNoLead=cNoLead; a.per100=a.eq?cAll/a.eq*100:null; a.per100InclLead=a.per100; a.per100CasesExclLead=a.eq?cNoLead/a.eq*100:null;
  return a;
}

module.exports = { EQ_FIELD: EQ_FIELD, EQ_FIELDS: EQ_FIELDS, parseEq: parseEq, eqFromRows: eqFromRows, eqByPerson: eqByPerson, eqAgg: eqAgg };
