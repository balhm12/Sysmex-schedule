/* 4장 설치 현황 — 월간보고 시트 Apps Script(v47~v51)의 설치 블록을 그대로 옮긴 것.
 * 입력: 설치 공유캘린더 행, Serial No 자산대장, 기관명매핑, 설치_수동입력, (팀 판정용) 활동 행·로스터
 * 출력: installDetail(작업별 상세) · install(모델별 설치 현황) · summary(팀별 설치 실적) · 팀별실적 설치 칸
 * 날짜는 모두 '벽시계를 UTC ms로 둔 값'이다(read-crm.toMs). 시트 로직과 같은 순서·같은 규칙을 지킨다. */
'use strict';
const DAY = 86400000;
const C = {
  TEAMS: ['FS EAST', 'FS WEST', 'FS SOUTH', 'FS CENTRAL'],
  CAL_HEADERS: { GUBUN: ['구분'], ACCOUNT: ['병원', '기관', '기관명', '거래처'], EQUIP: ['장비', '장비명', '모델'], START: ['시작일', '시작', '시작일자'],
    END: ['종료일', '종료', '종료일자'], TEAM: ['담당팀', '팀'], OWNER: ['담당자', '담당'] },
  CAL_MATCH_TOLERANCE: 7, CAL_MERGE_GAP_DAYS: 5,
  CAL_EXCLUDE_KEYWORDS: ['예정', '미확정', '미정', '보류', 'TBD'], USED_KEYWORDS: ['중고', '리퍼', 'REFURB', 'USED'], DEMO_KEYWORDS: ['데모', 'DEMO', '시연'],
  DUP_NAME_DAYS: 35, DUP_STRICT_DAYS: 3,
  AUTO_MAP: { HIGH: 0.75, MID: 0.5 },   // 이름 유사도(v49 점수) 문턱
  LINK: { STRICT_DAYS: 2, FORWARD_DAYS: 35 },   // 자동 연결: 날짜 ±2일 단독 후보 · 지난 작업이 뒤늦게 CRM에 오른 경우 35일까지 귀속
};
const INSTALL_CATS = ['XR-Series', 'XN-Series', 'SP-50', 'A1c', 'CA/CS', 'UF/UC', 'HISCL-Series', 'Other'];
const round1 = v => Math.round(v * 10) / 10;
const fmt = ms => { if (ms == null) return ''; const d = new Date(ms); return d.getUTCFullYear() + '-' + String(d.getUTCMonth() + 1).padStart(2, '0') + '-' + String(d.getUTCDate()).padStart(2, '0'); };
const ymd = s => { const m = String(s || '').match(/^(\d{4})-(\d{2})-(\d{2})/); return m ? Date.UTC(+m[1], +m[2] - 1, +m[3]) : null; };
const monthOf = ms => { const d = new Date(ms); return { y: d.getUTCFullYear(), m: d.getUTCMonth() + 1 }; };
const inMonths = (ms, months) => { if (ms == null) return false; const o = monthOf(ms); return months.some(x => x.y === o.y && x.m === o.m); };
const str = v => String(v == null ? '' : v).trim();

/* ── 문자열·모델 헬퍼 (Apps Script 원문과 같은 정규식) ── */
function normAcct(s) {
  let t = String(s || '');
  t = t.replace(/\(([^)]*)\)/g, (m, inner) => { const x = String(inner).trim(); return /^[가-힣]{2,3}$/.test(x) ? x : ''; });
  t = t.replace(/(의료법인|재단법인|사회복지법인|학교법인|사단법인|주식회사|㈜)/g, '');
  t = t.replace(/대학교/g, '대').replace(/대학/g, '대');
  t = t.replace(/부속병원/g, '병원').replace(/부속의원/g, '의원');
  return t.replace(/[\s\-_·,.]/g, '').toLowerCase();
}
function normGubun(v) { const s = String(v || '').replace(/\s/g, ''); if (/^이전/.test(s)) return '이전설치'; if (s === '설치' || /^신규/.test(s)) return '설치'; return s; }
function normTeam(v) {
  const raw = String(v || '').trim(), u = raw.toUpperCase().replace(/[\s\-_]/g, '');
  for (const t of C.TEAMS) { const core = t.toUpperCase().replace(/^FS\s*/, ''); if (u === 'FS' + core || u === core) return t; }
  return raw;
}
const isUsedSerial = sn => /RE$/i.test(String(sn || '').trim());
const isDemoLabel = text => { const u = String(text || '').toUpperCase(); return C.DEMO_KEYWORDS.some(k => u.indexOf(k.toUpperCase()) >= 0); };
const isUsedLabel = text => { const u = String(text || '').toUpperCase(); return C.USED_KEYWORDS.some(k => u.indexOf(k.toUpperCase()) >= 0); };
function isTentative(r) { const joined = [r.acct, r.equip, r.gubun].map(x => String(x || '')).join(' '); return C.CAL_EXCLUDE_KEYWORDS.some(k => joined.indexOf(k) >= 0); }
function cleanModel(model) {
  let u = String(model || '').toUpperCase().trim();
  u = u.replace(/[-_\s]*SYSTEM\b/g, ''); u = u.replace(/\s*\b(COMPLETE|IFU)\b/g, ''); u = u.replace(/\s*\([^)]*\)/g, '');
  return u.replace(/\s+/g, ' ').trim();
}
const isPartName = u => /(_ASSY|\bASSY\b|SUPPLY PARTS|\bPARTS\b|CABLE_|\bKIT\b|PUMP UNIT|VOLUMETRIC)/.test(String(u || '').toUpperCase());
const isSystemLabel = equip => { const u = String(equip || '').toUpperCase(); return /SYSTEM/.test(u) || /(XR|XN)-?(9\d{3}|3\d{3})/.test(u) || /\bUN-?(\d{4}|XX)\b/.test(u); };
const isSystemModel = model => { const c = cleanModel(model); return /^(XR|XN)-?(9\d{3}|3\d{3})\b/.test(c) || /^UN-?\d{4}\b/.test(c); };
function sysModelsFromText(text) {
  const u = String(text || '').toUpperCase(), out = []; let m;
  const add = x => { if (out.indexOf(x) < 0) out.push(x); };
  const re = /(XR|XN)-?(9\d{3}|3\d{3})/g; while ((m = re.exec(u)) !== null) add(m[1] + '-' + m[2]);
  const reUn = /\bUN-?(\d{4})\b/g; while ((m = reUn.exec(u)) !== null) add('UN-' + m[1]);
  ['XR', 'XN', 'UN'].forEach(fam => { const famRe = new RegExp('\\b' + fam + '\\b[-_\\s]*(SYSTEM|XX)\\b'); if (!famRe.test(u)) return; if (!out.some(x => x.indexOf(fam + '-') === 0)) add(fam + ' System'); });
  if (!out.length && /SYSTEM/.test(u)) add('System');
  return out;
}
function sysGubunFor(text, model, jobGubun) {
  const key = / System$/.test(model) ? '\\b' + model.split(' ')[0] + '\\b' : model.replace('-', '-?'), re = new RegExp(key);
  const moved = String(text || '').toUpperCase().split(/[,\/]/).some(seg => re.test(seg) && /(재구성|이전|재배치)/.test(seg));
  return (moved || jobGubun === '이전설치') ? '이전설치' : '설치';
}
function expandModel(model) {
  const u = String(model || '').toUpperCase().trim();
  if (!u) return [{ label: '기타', n: 1 }];
  if (isPartName(u)) return null;
  const c = cleanModel(u), m = c.match(/^(XN|XR)-?(\d+)/);
  if (!m) return [{ label: c || '기타', n: 1 }];
  const fam = m[1], num = m[2];
  if (fam === 'XN' && num.length === 3 && /^[345]/.test(num)) return [{ label: 'XN-L Series', n: 1 }];
  const series = fam + '-Series', head = parseInt(num.charAt(0), 10);
  if (num.length <= 2) return [{ label: series, n: 1 }];
  if (head === 3 && num.length === 4) return [{ label: series, n: 2 }, { label: 'SP-50', n: 1 }];
  if (head === 9) return [{ label: series, n: 1 }];
  if (num.length === 4 && num.charAt(1) === '5' && head >= 1 && head <= 8) return [{ label: series, n: head }, { label: 'SP-50', n: 1 }];
  return [{ label: series, n: (head >= 1 && head <= 8) ? head : 1 }];
}
function expandItems(items) {
  const agg = {}, parsed = [], modN = {}; let total = 0, listedSp = 0;
  const add = (label, n) => { if (n > 0) { agg[label] = (agg[label] || 0) + n; total += n; } };
  items.forEach(it => {
    const parts = expandModel(it.model); if (!parts) return;
    const qty = it.qty || 1, c = cleanModel(it.model), m = c.match(/^(XN|XR)-?(\d+)/); let kind = 'other';
    if (m && !(m[1] === 'XN' && m[2].length === 3 && /^[345]/.test(m[2]))) kind = m[2].length <= 2 ? 'module' : (/^9\d{3}$/.test(m[2]) ? 'system' : 'config');
    if (kind === 'module') modN[m[1]] = (modN[m[1]] || 0) + qty;
    if (/^SP-?50\b/.test(c)) listedSp += qty;
    parsed.push({ parts, qty, kind, fam: m ? m[1] : null });
  });
  const implN = {}, anyMod = Object.keys(modN).length > 0; let implSp = 0;
  parsed.forEach(p => {
    if (p.kind === 'system' && anyMod) return;
    if (p.kind === 'config' && modN[p.fam]) { p.parts.forEach(x => { if (x.label === 'SP-50') implSp += x.n * p.qty; else implN[p.fam] = (implN[p.fam] || 0) + x.n * p.qty; }); return; }
    p.parts.forEach(x => add(x.label, x.n * p.qty));
  });
  Object.keys(implN).forEach(f => add(f + '-Series', implN[f] - modN[f]));
  add('SP-50', implSp - listedSp);
  return { agg, total };
}
function detailItems(detailStr) { const items = []; String(detailStr || '').split(' · ').forEach(seg => { const mm = seg.match(/^(.+?)\s+(\d+)대$/); if (mm) items.push({ model: mm[1], qty: parseInt(mm[2], 10) || 1 }); }); return items; }
function expandDetail(detailStr) { const ex = expandItems(detailItems(detailStr)), agg = ex.agg; return { total: ex.total, agg, text: Object.keys(agg).sort((a, b) => agg[b] - agg[a]).map(k => k + ' ' + agg[k]).join(' · ') }; }
function installCatOf(label) {
  const u = String(label || '').toUpperCase();
  if (/^XR/.test(u)) return 'XR-Series'; if (/^XN/.test(u)) return 'XN-Series'; if (/^SP-?50\b/.test(u)) return 'SP-50'; if (/G11|HLC|A1C/.test(u)) return 'A1c';
  if (/^(CA|CS)-?\d/.test(u)) return 'CA/CS'; if (/^(UF|UC|UN)-?\d/.test(u)) return 'UF/UC'; if (/HISCL/.test(u)) return 'HISCL-Series'; return 'Other';
}
function calModelTokens(text) {
  const u = String(text || '').toUpperCase().replace(/\([^)]*\)/g, ' '), out = [], re = /\b([A-Z]{1,5}-?\d{2,4}[A-Z]?)\b/g; let m;
  while ((m = re.exec(u)) !== null) { const t = m[1]; if (isSystemModel(t) || isPartName(t)) continue; if (out.indexOf(t) < 0) out.push(t); }
  return out;
}
function modelFamily(m) { const u = cleanModel(m); if (/G11|HLC|A1C/.test(u)) return 'A1C'; const f = u.match(/^([A-Z]+)/); return f ? f[1] : u; }
function usedTokens(text) {
  let used = [], other = false;
  String(text || '').toUpperCase().split(/[,\/]/).forEach(seg => { const toks = seg.replace(/\([^)]*\)/g, ' ').match(/[A-Z]+-?\d+[A-Z]*/g) || [];
    if (isUsedLabel(seg)) used = used.concat(toks.length ? toks : ['*']); else if (toks.length) other = true; });
  return { used, hasOther: other };
}
function hitIsUsed(model, tokens) { if (tokens.indexOf('*') >= 0) return true; const m = cleanModel(model).replace(/-/g, ''); return tokens.some(t => m.indexOf(String(t).replace(/-/g, '')) >= 0); }
/* 자동 기관명 매칭 (v49) */
function autoNameKey(s) {
  return String(s || '').replace(/(XR|XN|UN)-?\d{3,4}/gi, ' ').replace(/이전\s*설치|재구성|\(철수\)|철수|설치/g, ' ')
    .replace(/의료법인|재단법인|학교법인|사단법인|사회복지법인|\(사\)|의료재단|의과대학|부속|대학교|대학|병원|의원|의료원|센터/g, '').replace(/[\s\-·,.()_]/g, '');
}
function autoBigrams(s) { const k = autoNameKey(s), out = {}; if (k.length === 1) out[k] = 1; for (let i = 0; i < k.length - 1; i++) out[k.substr(i, 2)] = 1; return out; }
function autoNameScore(a, b) {
  const A = autoBigrams(a), B = autoBigrams(b), na = Object.keys(A).length, nb = Object.keys(B).length;
  if (!na || !nb) return 0;
  let hit = 0; Object.keys(A).forEach(x => { if (B[x]) hit++; });
  let sc = hit / Math.min(na, nb);
  const x = normAcct(a), y = normAcct(b);
  if (x.length >= 3 && y.length >= 3 && (x.indexOf(y) >= 0 || y.indexOf(x) >= 0)) sc = Math.max(sc, C.AUTO_MAP.HIGH);
  return sc;
}
function autoCalFamilies(text) {
  const u = String(text || '').toUpperCase(), fam = {};
  calModelTokens(u).forEach(t => fam[modelFamily(t)] = 1);
  if (/XR-?\d/.test(u)) fam.XR = 1; if (/XN-?\d/.test(u)) fam.XN = 1; if (/UN-?\d/.test(u)) { fam.UN = 1; fam.UF = 1; fam.UC = 1; } if (/G11|HLC|A1C/.test(u)) fam.A1C = 1;
  return fam;
}
function dupFamKey(m) { const u = cleanModel(m); if (/^XN-?(L|[345]\d{2}\b)/.test(u)) return 'XNL'; const f = modelFamily(m); return (f === 'XN' || f === 'XR') ? 'CBC' : f; }
function dupCalFams(text) {
  const fam = {}, u = String(text || '').toUpperCase();
  calModelTokens(u).forEach(t => fam[dupFamKey(t)] = 1);
  Object.keys(autoCalFamilies(u)).forEach(f => { if (f === 'XN' || f === 'XR') { if (!/XN-?(L|[345]\d{2}\b)/.test(u) || /XR|XN-?\d{4}/.test(u)) fam.CBC = 1; } else fam[f] = 1; });
  return fam;
}

/* ── 입력 읽기 ── */
function resolveCols(header, cands) {   // Apps Script resolveColumns_: 정확 일치 → 부분 일치, 1-based (없으면 -1)
  const H = header.map(h => String(h == null ? '' : h).trim()), out = {};
  Object.keys(cands).forEach(f => { let found = -1;
    for (const c of cands[f]) { if (found > 0) break; const i = H.indexOf(c); if (i >= 0) found = i + 1; }
    if (found < 0) for (const c of cands[f]) { if (found > 0) break; const i = H.findIndex(h => h.indexOf(c) >= 0); if (i >= 0) found = i + 1; }
    out[f] = found; });
  return out;
}
/* 설치 공유캘린더 {h, rows} → [{gubun, acct, equip, start, end, team, owner}] (구분·팀 표기는 정리) */
function readCalendarRows(t, toMs) {
  toMs = toMs || require('./read-crm').toMs;
  const cc = resolveCols(t.h, C.CAL_HEADERS);
  if (cc.GUBUN < 0 || cc.ACCOUNT < 0 || cc.START < 0) throw new Error('설치 공유캘린더에 구분·병원(기관)·시작일 열이 있어야 합니다');
  const g = (r, i) => i > 0 ? str(r[i - 1]) : '';
  return t.rows.filter(r => r && r.length).map(r => ({ gubun: normGubun(g(r, cc.GUBUN)), acct: g(r, cc.ACCOUNT), equip: g(r, cc.EQUIP),
    start: cc.START > 0 ? toMs(r[cc.START - 1]) : null, end: cc.END > 0 ? toMs(r[cc.END - 1]) : null, team: cc.TEAM > 0 ? normTeam(g(r, cc.TEAM)) : '', owner: g(r, cc.OWNER) }));
}
/* ── 계산 ── */
/* 캘린더 작업 ↔ 자산대장 설치 행 연결 (2026-10-26: 기관명매핑·설치_수동입력 표를 없애고 자동 연결로 대체)
   ① 정규화 이름이 같거나 4자 이상 포함 관계 (시트 규칙 그대로)
   ② 없으면 날짜 창 안의 다른 기관 후보 중 이름 유사도(v49 점수) ≥ 0.5 이고 캘린더 장비 표기의 모델군과 맞는 것 (동점이면 보류)
   ③ 그래도 없으면 날짜 ±2일·같은 모델군 후보가 딱 한 기관이고 팀이 다르지 않으면(CRM 활동으로 아는 팀) 이름이 달라도 연결
   캘린더에 제 이름 그대로 작업이 있는 CRM 기관은 ②③ 후보에서 뺀다(그 작업 몫). */
function linkHits(serByAcct, r, lo, hi, usedSn, ctx) {
  const key = normAcct(r.acct), inWin = x => x.date >= lo && x.date <= hi && !usedSn[x.sn + '|' + x.date];
  let hits = [];
  if (serByAcct[key]) hits = serByAcct[key].filter(inWin);
  if (!hits.length && key.length >= 4) Object.keys(serByAcct).forEach(k => { if (k.length >= 4 && k !== key && (k.indexOf(key) >= 0 || key.indexOf(k) >= 0)) hits = hits.concat(serByAcct[k].filter(inWin)); });
  if (hits.length || !ctx || ctx.exactOnly) return { hits, why: '' };
  const fams = autoCalFamilies(r.equip), anyFam = !Object.keys(fams).length, s = r.start, e = r.end != null ? r.end : s, cand = {};
  Object.keys(serByAcct).forEach(k => { if (ctx.calAccts[k]) return;
    serByAcct[k].forEach(x => { if (!inWin(x)) return; if (!anyFam && !fams[modelFamily(x.model)]) return;
      const c = cand[k] = cand[k] || { k, acct: x.acct, rows: [], strict: false }; c.rows.push(x);
      if (x.date >= s - C.LINK.STRICT_DAYS * DAY && x.date <= e + C.LINK.STRICT_DAYS * DAY) c.strict = true; }); });
  const list = Object.keys(cand).map(k => { const c = cand[k]; c.score = autoNameScore(r.acct, c.acct); return c; }).sort((a, b) => b.score - a.score);
  if (!list.length) return { hits: [], why: '' };
  const top = list[0], tie = list.length > 1 && list[1].score === top.score;
  if (top.score >= C.AUTO_MAP.MID && !tie) return { hits: top.rows, acct: top.acct, why: '이름 유사 ' + Math.round(top.score * 100) + '%' + (anyFam ? '' : ' · 같은 모델군') };
  if (ctx.noUnique || anyFam) return { hits: [], why: '' };
  const strict = list.filter(c => c.strict);
  if (strict.length === 1) { const c = strict[0], ct = ctx.acctTeam[c.k] || '', rt = normTeam(r.team);
    if (!ct || !rt || ct === rt) return { hits: c.rows, acct: c.acct, why: '같은 날(±' + C.LINK.STRICT_DAYS + '일) 같은 모델군 후보 하나' + (ct && rt ? ' · 같은 팀' : '') }; }
  return { hits: [], why: '' };
}
function mergeCalRows(cal) {
  const pass = [], groups = {};
  cal.forEach(r => {
    if (!r.acct || r.start == null || (r.gubun !== '설치' && r.gubun !== '이전설치') || isTentative(r) || isUsedLabel(r.acct + ' ' + r.equip) || isDemoLabel(r.acct + ' ' + r.equip)) { pass.push(r); return; }
    const k = normAcct(r.acct) + '|' + r.gubun; (groups[k] = groups[k] || []).push(r);
  });
  const gap = C.CAL_MERGE_GAP_DAYS * DAY, jobs = [];
  Object.keys(groups).forEach(k => { let cur = null;
    groups[k].slice().sort((a, b) => a.start - b.start).forEach(r => { const s = r.start, e = r.end != null ? r.end : s;
      if (cur && s <= cur.end + gap) { cur.rows.push(r); if (e > cur.end) cur.end = e; } else { cur = { rows: [r], start: s, end: e }; jobs.push(cur); } }); });
  const merged = jobs.map(g => { const uniq = f => { const seen = {}, arr = []; g.rows.forEach(r => { const v = str(r[f]); if (v && !seen[v]) { seen[v] = true; arr.push(v); } }); return arr; };
    const gs = uniq('gubun');
    return Object.assign({}, g.rows[0], { start: g.start, end: g.end, equip: uniq('equip').join(' / '), gubun: gs.length > 1 ? '설치·이전설치' : gs[0], team: uniq('team').join('·'), owner: uniq('owner').join('·'), mergedCount: g.rows.length }); });
  return merged.concat(pass);
}
function calendarAudit(cal, period) {
  const out = [], cnt = {};
  cal.forEach(r => { const s = r.start; if (s == null || !inMonths(s, period.months)) return;
    const acct = r.acct, g = r.gubun, team = r.team, eq = r.equip; let res;
    if (!acct) res = '제외: 기관명 없음';
    else if (g !== '설치' && g !== '이전설치') res = '제외: 구분 "' + (g || '공백') + '" (설치·이전설치만 집계)';
    else if (isUsedLabel(acct) || (() => { const u = usedTokens(eq); return u.used.length && !u.hasOther; })()) res = '제외: 중고';
    else if (isDemoLabel(acct + ' ' + eq)) res = '제외: Demo';
    else if (isTentative(r)) res = '제외: 예정(미확정)';
    else if (C.TEAMS.indexOf(team) < 0) res = '집계(팀 미상 — 팀별 합계에서 빠짐): ' + (g === '이전설치' ? '이전설치' : '신규');
    else res = '집계: ' + (g === '이전설치' ? '이전설치' : '신규');
    const k = normAcct(acct) + '|' + g; cnt[k] = (cnt[k] || 0) + 1;
    out.push({ date: fmt(s), acct, gubun: g, team, equip: eq, result: res, key: k }); });
  out.forEach(o => { if (cnt[o.key] > 1 && /^집계/.test(o.result)) o.result += ' (같은 기관 ' + cnt[o.key] + '줄 — 5일 이내면 1건으로 병합)'; });
  out.sort((a, b) => a.date < b.date ? -1 : (a.date > b.date ? 1 : 0));
  return out;
}
function computeInstallDetail(cal, serial, period, acctTeam) {
  const audit = calendarAudit(cal, period), tol = C.CAL_MATCH_TOLERANCE, serByAcct = {}; let usedCrm = 0, partSkipped = 0;
  serial.forEach(x => { const acct = x.acct, d = x.install; if (!acct || d == null) return;
    // 2026-10-26 수정(시트와 다름): 자산대장의 부품·소모품 행(VALVE_ASSY 등)은 설치가 아니므로 매칭 후보·캘린더 미등록에서 뺀다.
    if (isPartName(x.model)) { if (inMonths(d, period.months)) partSkipped++; return; }
    if (isUsedSerial(x.sn)) { if (inMonths(d, period.months)) usedCrm++; return; }
    (serByAcct[normAcct(acct)] = serByAcct[normAcct(acct)] || []).push({ acct, model: x.model, sn: x.sn, date: d, first: x.first != null ? x.first : null, dealer: x.dealer || '' }); });
  const rows = [], usedSn = {}, tentative = [], claimedOutside = {}, claimedInside = {}, claimedUsed = {}, claimedDemo = {}, links = []; let usedCal = 0, demoCal = 0;
  const inP = r => inMonths(r.start, period.months) ? 1 : 0;
  const calJobs = mergeCalRows(cal); calJobs.sort((a, b) => inP(b) - inP(a));
  const win = (s, e) => [s - tol * DAY, e + tol * DAY];
  const calAccts = {}; calJobs.forEach(r => { if (r.acct) calAccts[normAcct(r.acct)] = true; });
  const ctxExact = { exactOnly: true }, ctxIn = { calAccts, acctTeam: acctTeam || {} }, ctxOut = { calAccts, acctTeam: acctTeam || {}, noUnique: true };
  const claim = (list, mark) => list.forEach(x => { const k = x.sn + '|' + x.date; usedSn[k] = true; if (mark) mark[k] = true; });
  // 중고·Demo 캘린더 줄이 가리키는 CRM 행은 실적에서 뺀다 (시트 규칙)
  calJobs.forEach(r => { const s = r.start; if (!r.acct || s == null) return; let ut = usedTokens(r.equip); if (isUsedLabel(r.acct)) ut = { used: ['*'], hasOther: false }; if (!ut.used.length) return;
    const [lo, hi] = win(s, r.end != null ? r.end : s);
    claim(linkHits(serByAcct, r, lo, hi, usedSn, ctxExact).hits.filter(x => hitIsUsed(x.model, ut.used)), claimedUsed); });
  calJobs.forEach(r => { const s = r.start; if (!r.acct || s == null || !isDemoLabel(r.acct + ' ' + r.equip)) return; const [lo, hi] = win(s, r.end != null ? r.end : s);
    claim(linkHits(serByAcct, r, lo, hi, usedSn, ctxExact).hits, claimedDemo); });
  const isInstall = r => /^(설치|이전설치|설치·이전설치)$/.test(r.gubun) && r.acct && r.start != null;
  const outside = calJobs.filter(r => isInstall(r) && !inMonths(r.start, period.months) && !isTentative(r));
  const inside = calJobs.filter(r => isInstall(r) && inMonths(r.start, period.months));
  const jobWin = r => { const s = r.start, e = r.end != null ? r.end : s; return [s - tol * DAY, e + tol * DAY, s, e]; };
  // 우선순위: 기간 밖 작업 ±7일 이름 매칭(시트 규칙) → 기간 안 작업 이름 매칭 → 기간 안 자동 연결 → 기간 밖 작업 35일 귀속(같은 모델군) → 기간 밖 자동 연결
  // (35일 귀속을 이달 작업보다 먼저 돌리면 같은 기관에 지난달·이달 작업이 다 있을 때 이달 CRM 행을 지난달이 가져간다 — 2026-10-26 9월 실측에서 확인)
  outside.forEach(r => { const [lo, hi, s, e] = jobWin(r); claim(linkHits(serByAcct, r, lo, hi, usedSn, ctxExact).hits, claimedOutside); });
  const plan = [];
  inside.forEach(r => { const acct = r.acct, s = r.start, e = r.end != null ? r.end : s, gubun = r.gubun;
    const utJob = usedTokens(r.equip);
    if (isUsedLabel(acct) || (utJob.used.length && !utJob.hasOther)) { usedCal++; return; }
    if (isDemoLabel(acct + ' ' + r.equip)) { demoCal++; return; }
    if (isTentative(r)) { tentative.push({ start: fmt(s), end: fmt(e), gubun, acct, team: r.team, owner: r.owner, calEquip: r.equip }); return; }
    const [lo, hi] = win(s, e), got = linkHits(serByAcct, r, lo, hi, usedSn, ctxExact); claim(got.hits);
    plan.push({ r, s, e, lo, hi, hits: got.hits, link: '' }); });
  plan.forEach(p => { if (p.hits.length) return; const got = linkHits(serByAcct, p.r, p.lo, p.hi, usedSn, ctxIn); if (!got.hits.length) return;
    claim(got.hits); p.hits = got.hits; p.link = got.why; p.linkedAcct = got.acct;
    links.push({ start: fmt(p.s), calAcct: p.r.acct, crmAcct: got.acct, why: got.why, sns: got.hits.map(x => x.sn).join(', '), models: got.hits.map(x => cleanModel(x.model)).join(', ') }); });
  // 지난달 작업이 이달 CRM에 늦게 오른 경우: 이름 매칭 + 같은 모델군이면 35일까지 그 작업에 귀속(이달 '캘린더 미등록'으로 다시 세지 않음)
  outside.forEach(r => { const [lo, hi, s, e] = jobWin(r); const fams = autoCalFamilies(r.equip); if (!Object.keys(fams).length) return;
    claim(linkHits(serByAcct, r, lo, e + C.LINK.FORWARD_DAYS * DAY, usedSn, ctxExact).hits.filter(x => fams[modelFamily(x.model)]), claimedOutside); });
  outside.forEach(r => { const [lo, hi, s, e] = jobWin(r); const got = linkHits(serByAcct, r, lo, e + C.LINK.FORWARD_DAYS * DAY, usedSn, ctxOut); claim(got.hits, claimedOutside); });
  plan.forEach(p => { const { r, s, e, hits } = p, gubun = r.gubun, acct = r.acct;
    hits.forEach(x => { if (!inMonths(x.date, period.months)) claimedInside[x.sn + '|' + x.date] = true; });
    let missing = [];
    if (hits.length) { const hitFam = {}; hits.forEach(x => hitFam[modelFamily(x.model)] = true); calModelTokens(r.equip).forEach(t => { if (!hitFam[modelFamily(t)] && missing.indexOf(t) < 0) missing.push(t); }); }
    // CRM에 없으면 신규·이전설치 모두 캘린더 장비 표기로 센다 (전에는 신규는 0대 + 설치_수동입력 필요)
    const calBased = hits.length ? null : calModelTokens(r.equip).map(t => ({ model: t, qty: 1 }));
    const byModel = {};
    if (calBased) calBased.forEach(m => byModel[m.model] = (byModel[m.model] || 0) + m.qty); else hits.forEach(x => byModel[x.model] = (byModel[x.model] || 0) + 1);
    const detail = Object.keys(byModel).sort((a, b) => byModel[b] - byModel[a]).map(k => k + ' ' + byModel[k] + '대').join(' · ');
    const unitSum = expandItems(Object.keys(byModel).map(k => ({ model: k, qty: byModel[k] }))).total;
    const calHas = !!calBased && (calBased.length > 0 || isSystemLabel(r.equip));   // 단품 토큰이 없어도 System 표기가 있으면 캘린더 기준(세트는 따로 센다)
    const status = hits.length ? 'OK' : (calHas ? (gubun === '이전설치' ? '캘린더 기준' : '캘린더 표기(CRM 미등록)') : 'CRM 미등록');
    rows.push({ start: fmt(s), end: fmt(e), gubun, acct, team: r.team, owner: r.owner, calEquip: r.equip, merged: r.mergedCount || 1, units: unitSum, detail,
      sns: calBased ? (calHas ? '(캘린더 표기)' : '') : hits.map(x => x.sn).join(', '), calBased: !!calBased, missing, status, link: p.link || '', linkedAcct: p.linkedAcct || '' }); });
  const orphan = [], dealerOrphan = [], dealerKeys = {};
  Object.keys(serByAcct).forEach(k => serByAcct[k].forEach(x => { const key = x.sn + '|' + x.date; if (usedSn[key] || !inMonths(x.date, period.months)) return;
    if (x.dealer) { dealerOrphan.push({ date: fmt(x.date), acct: x.acct, model: x.model, sn: x.sn, dealer: x.dealer }); dealerKeys[key] = true; return; }
    orphan.push({ date: fmt(x.date), acct: x.acct, model: x.model, sn: x.sn, moved: !!(x.first != null && x.first !== x.date), key, t: x.date }); }));
  rows.sort((a, b) => a.start < b.start ? -1 : (a.start > b.start ? 1 : 0)); links.sort((a, b) => a.start < b.start ? -1 : 1);
  return { rows, orphan, tentative, usedCrm, usedCal, partSkipped, claimedOutside, claimedInside, claimedUsed, claimedDemo, demoCal, audit, dealerOrphan, dealerKeys, links, dupOrphan: [], claimedDup: {} };
}
function dedupeOrphans(detail) {
  detail.dupOrphan = []; detail.claimedDup = {};
  const ND = C.DUP_NAME_DAYS, SD = C.DUP_STRICT_DAYS;
  const jobs = detail.rows.filter(j => j.calBased || j.status === 'CRM 미등록').map(j => { const fam = {};
    detailItems(j.detail).forEach(it => fam[dupFamKey(it.model)] = 1); Object.keys(dupCalFams(j.calEquip)).forEach(f => fam[f] = 1);
    const s = ymd(j.start), e = ymd(j.end) != null ? ymd(j.end) : s; return { job: j, fam, s, e, key: normAcct(j.acct), moved: j.gubun === '이전설치' }; }).filter(x => x.s != null);
  if (!jobs.length || !detail.orphan.length) return 0;
  const groups = {}; detail.orphan.forEach(o => { const k = normAcct(o.acct) + '|' + o.date; (groups[k] = groups[k] || []).push(o); });
  const drop = {};
  Object.keys(groups).forEach(gk => { const list = groups[gk], o0 = list[0], ok = normAcct(o0.acct), t = o0.t != null ? o0.t : (ymd(o0.date) || 0);
    const ofam = {}; list.forEach(o => ofam[dupFamKey(o.model)] = 1); const omoved = list.every(o => o.moved); let best = null;
    jobs.forEach(x => { const overlap = Object.keys(ofam).some(f => x.fam[f]); if (!overlap || x.moved !== omoved) return;
      const nameLink = x.key === ok || autoNameScore(x.job.acct, o0.acct) >= C.AUTO_MAP.MID;
      const inName = t >= x.s - ND * DAY && t <= x.e + ND * DAY, inStrict = t >= x.s - SD * DAY && t <= x.e + SD * DAY;
      const subset = Object.keys(ofam).every(f => x.fam[f]), teamOk = !!o0.team && !!x.job.team && o0.team === x.job.team; let why = null;
      if (nameLink && inName) why = '기관명 연결·' + Math.round(Math.abs(t - x.s) / DAY) + '일 차'; else if (inStrict && subset && teamOk) why = '같은 팀·같은 계열·' + Math.round(Math.abs(t - x.s) / DAY) + '일 차';
      if (!why) return; const dist = Math.abs(t - x.s) + (nameLink ? 0 : 1e12); if (!best || dist < best.dist) best = { x, why, dist }; });
    if (!best) return;
    list.forEach(o => { drop[o.key || (o.sn + '|' + o.date)] = 1; o.dupOf = { start: best.x.job.start, acct: best.x.job.acct, status: best.x.job.status }; o.dupWhy = best.why; detail.dupOrphan.push(o); if (o.key) detail.claimedDup[o.key] = true; }); });
  detail.orphan = detail.orphan.filter(o => !drop[o.key || (o.sn + '|' + o.date)]);
  return detail.dupOrphan.length;
}
const dupSummary = list => { const by = {}; list.forEach(o => { const k = o.acct + '→' + o.dupOf.acct; by[k] = (by[k] || 0) + 1; }); return Object.keys(by).map(k => k + ' ' + by[k] + '대').join(', '); };
function buildAcctTeam(rows, rosterMap) {   // 기관 → CRM 활동을 가장 많이 한 팀 (로스터 전원, 제외 인원 포함)
  const cnt = {}; rows.forEach(x => { const info = rosterMap[x.own]; if (!info) return; const k = normAcct(x.acct); if (!k) return; const t = cnt[k] = cnt[k] || {}; t[info.team] = (t[info.team] || 0) + 1; });
  const out = {}; Object.keys(cnt).forEach(k => { let best = '', bc = -1; Object.keys(cnt[k]).forEach(t => { if (cnt[k][t] > bc) { best = t; bc = cnt[k][t]; } }); out[k] = best; });
  return out;
}
function orphanJobs(detail) {
  const by = {};
  (detail.orphan || []).forEach(o => { const k = normAcct(o.acct) + '|' + o.date; const j = by[k] || (by[k] = { acct: o.acct, date: o.date, team: o.team || '', models: {}, moved: true }); j.models[o.model] = (j.models[o.model] || 0) + 1; if (!o.moved) j.moved = false; });
  return Object.keys(by).map(k => { const j = by[k]; j.gubun = j.moved ? '이전설치' : '설치'; j.detail = Object.keys(j.models).map(m => m + ' ' + j.models[m] + '대').join(' · '); return j; });
}
function collectSystems(detail) {
  const list = [], byModel = {}, byGubun = { '설치': 0, '이전설치': 0 };
  if (!detail) return { list, byModel, byGubun, hasCal: false };
  detail.rows.forEach(r => { if (!isSystemLabel(r.calEquip)) return; sysModelsFromText(r.calEquip).forEach(model => { const g = sysGubunFor(r.calEquip, model, r.gubun);
    list.push({ acct: r.acct, model, date: r.start, gubun: g, team: r.team, owner: r.owner, units: r.units }); byModel[model] = (byModel[model] || 0) + 1; byGubun[g] = (byGubun[g] || 0) + 1; }); });
  list.sort((a, b) => a.date < b.date ? -1 : (a.date > b.date ? 1 : 0));
  return { list, byModel, byGubun, hasCal: true };
}
const sysAcctsFor = (sys, model) => sys.list.filter(s => s.model === model).map(s => s.acct + (s.gubun === '이전설치' ? '(이전)' : '')).join(', ');
function applyCalendarInstalls(team, detail) {   // 팀별실적 '설치+이전' = 캘린더 작업 기관 수(+캘린더 미등록)
  if (!detail) { team.instSource = 'CRM 활동'; return; }
  const newA = {}, moveA = {}, unassigned = {}; C.TEAMS.forEach(t => { newA[t] = {}; moveA[t] = {}; });
  const put = (teamName, acct, gubun) => { const t = String(teamName || '').split('·')[0].trim().toUpperCase(), k = normAcct(acct); if (C.TEAMS.indexOf(t) < 0) { unassigned[k] = true; return; } (gubun === '이전설치' ? moveA : newA)[t][k] = true; };
  detail.rows.forEach(r => put(r.team, r.acct, r.gubun)); orphanJobs(detail).forEach(j => put(j.team, j.acct, j.gubun));
  collectSystems(detail).list.forEach(s => { if (s.gubun === '이전설치') put(s.team, s.acct, '이전설치'); });
  team.total = 0;
  team.rows.forEach(r => { r.instCrm = r.inst; r.instNew = Object.keys(newA[r.team] || {}).length; r.instMove = Object.keys(moveA[r.team] || {}).length; r.inst = r.instNew + r.instMove; r.sum = r.inst + r.pm + r.as_; r.perHead = r.count ? round1(r.sum / r.count) : 0; team.total += r.sum; });
  team.instSource = '설치 공유캘린더'; team.instUnassigned = Object.keys(unassigned).length;
}
function computeInstallStatus(serial, period, detail) {
  const newCounts = {}, sysRows = [], crmByAcct = {}; let reExcluded = 0, moved = 0, total = 0, partExcluded = 0;
  serial.forEach(x => { const d = x.install, snKey = x.sn + '|' + (d != null ? d : '');
    if (detail) { if (detail.claimedOutside[snKey]) return; if (detail.claimedUsed[snKey]) { reExcluded++; return; } if (detail.claimedDemo[snKey] || detail.dealerKeys[snKey] || detail.claimedDup[snKey]) return; }
    if (!inMonths(d, period.months) && !(detail && detail.claimedInside[snKey])) return;
    const model = x.model || '', parts = expandModel(model); if (parts === null) { partExcluded++; return; }
    if (isSystemModel(model)) sysRows.push({ acct: x.acct, model: cleanModel(model), date: fmt(d) });
    if (isUsedSerial(x.sn)) { reExcluded++; return; }
    if (x.first != null && d != null && x.first !== d) { moved++; return; }
    const ak = normAcct(x.acct); (crmByAcct[ak] = crmByAcct[ak] || []).push({ model, qty: 1 }); });
  Object.keys(crmByAcct).forEach(ak => { const ex = expandItems(crmByAcct[ak]); Object.keys(ex.agg).forEach(lb => newCounts[lb] = (newCounts[lb] || 0) + ex.agg[lb]); total += ex.total; });
  let calUnits = 0;   // CRM에 없는 신규 설치 = 캘린더 장비 표기로 센 대수 (이전설치는 단품 집계에 안 넣음 — CRM 규칙과 같음)
  if (detail) detail.rows.forEach(r => { if (!r.calBased || r.gubun === '이전설치' || !r.detail) return; const ex = expandItems(detailItems(r.detail)); Object.keys(ex.agg).forEach(lb => newCounts[lb] = (newCounts[lb] || 0) + ex.agg[lb]); total += ex.total; calUnits += ex.total; });
  const rows = Object.keys(newCounts).sort((a, b) => newCounts[b] - newCounts[a]).map(k => ({ series: k, count: newCounts[k], pct: total ? round1(newCounts[k] / total * 100) : 0 }));
  sysRows.sort((a, b) => a.date < b.date ? -1 : 1);
  return { rows, total, reExcluded, moved, partExcluded, sysRows, calUnits };
}
/* 「정제_팀별설치실적」 — 작업 목록·팀×구분 매트릭스 (writeInstallSummary_) */
function installSummary(detail, period) {
  const jobs = [];
  detail.rows.forEach(r => { const exp = expandDetail(r.detail); let sysTxt = '';
    if (isSystemLabel(r.calEquip)) sysTxt = sysModelsFromText(r.calEquip).map(m => m + (sysGubunFor(r.calEquip, m, r.gubun) === '이전설치' ? ' (이전)' : '')).join(', ');
    jobs.push({ start: r.start, end: r.end, team: r.team, owner: r.owner, acct: r.acct, kind: r.gubun === '이전설치' ? '이전설치' : '신규', sys: sysTxt, cal: r.calEquip, equip: exp.text, units: exp.total, agg: exp.agg,
      src: r.calBased ? '캘린더 표기' : (r.status === 'OK' ? 'CRM' : '—'), sn: r.sns,
      status: r.status === 'OK' ? (r.missing && r.missing.length ? '일부 CRM 미확인' : '정상') : r.status,
      note: [r.merged > 1 ? '캘린더 ' + r.merged + '줄 병합' : '', r.missing && r.missing.length ? '미확인: ' + r.missing.join(', ') : '', r.link ? '자동 연결 → ' + r.linkedAcct + ' (' + r.link + ')' : ''].filter(String).join(' · ') }); });
  orphanJobs(detail).forEach(j => { const exp = expandDetail(j.detail), sysM = Object.keys(j.models).filter(m => isSystemModel(m)).map(cleanModel);
    jobs.push({ start: j.date, end: '', team: j.team, owner: '', acct: j.acct, kind: j.gubun === '이전설치' ? '이전설치' : '신규', sys: sysM.join(', '), cal: '', equip: exp.text, units: exp.total, agg: exp.agg, src: 'CRM', sn: '', status: '캘린더 미등록', note: '캘린더에 일정 입력 필요', crmSys: sysM }); });
  jobs.sort((a, b) => a.start < b.start ? -1 : (a.start > b.start ? 1 : 0));
  const teamKey = t => { const k = String(t || '').split('·')[0].trim().toUpperCase(); return C.TEAMS.indexOf(k) >= 0 ? k : '(팀 미상)'; };
  const M = {}, cell = (t, kind) => { const k = t + '|' + kind; if (!M[k]) { M[k] = { accts: {}, sys: 0, cats: {} }; INSTALL_CATS.forEach(c => M[k].cats[c] = 0); } return M[k]; };
  jobs.forEach(j => { const c = cell(teamKey(j.team), j.kind); c.accts[normAcct(j.acct)] = true; Object.keys(j.agg || {}).forEach(lab => c.cats[installCatOf(lab)] += j.agg[lab]); if (j.crmSys) c.sys += j.crmSys.length; });
  collectSystems(detail).list.forEach(s => { const c = cell(teamKey(s.team), s.gubun === '이전설치' ? '이전설치' : '신규'); c.sys++; c.accts[normAcct(s.acct)] = true; });
  const teams = C.TEAMS.slice(); if (Object.keys(M).some(k => k.indexOf('(팀 미상)|') === 0)) teams.push('(팀 미상)');
  const KINDS = ['신규', '이전설치'], head = ['팀', '구분', '기관 수', 'System (세트)'].concat(INSTALL_CATS).concat(['장비 합계']);
  const line = (label, kind, cs) => { const accts = {}, cats = {}; let sys = 0, tot = 0; INSTALL_CATS.forEach(c => cats[c] = 0);
    cs.forEach(c => { if (!c) return; Object.keys(c.accts).forEach(a => accts[a] = true); sys += c.sys; INSTALL_CATS.forEach(x => { cats[x] += c.cats[x]; tot += c.cats[x]; }); });
    return [label, kind, Object.keys(accts).length, sys].concat(INSTALL_CATS.map(x => cats[x])).concat([tot]); };
  const mat = [];
  teams.forEach(t => { KINDS.forEach(kd => mat.push(line(t, kd, [M[t + '|' + kd]]))); mat.push(line(t, '소계', KINDS.map(kd => M[t + '|' + kd]))); });
  KINDS.forEach(kd => mat.push(line('전체', kd, teams.map(t => M[t + '|' + kd]))));
  const allCells = []; teams.forEach(t => KINDS.forEach(kd => allCells.push(M[t + '|' + kd]))); mat.push(line('전체', '합계', allCells));
  const need = jobs.filter(j => /CRM 미등록|일부 CRM 미확인/.test(j.status)).length, calMiss = jobs.filter(j => j.status === '캘린더 미등록').length, tent = detail.tentative || [];
  const notes = [
    ['확인 필요', 'CRM 미등록 ' + need + '건 → 캘린더 장비 표기로 집계(CRM 등록 여부 확인) · 캘린더 미등록 ' + calMiss + '건 → 캘린더 입력 (둘 다 실적에는 포함)' + ((detail.links || []).length ? ' · 이름이 달라 자동 연결한 짝 ' + detail.links.length + '건 → 「자동연결」 탭' : '')],
    ['집계 제외', '예정 ' + tent.length + '건 · 중고 ' + ((detail.usedCrm || 0) + (detail.usedCal || 0)) + '건 · Demo ' + (detail.demoCal || 0) + '건 · 대리점 설치(캘린더 없음) ' + (detail.dealerOrphan || []).length + '대' +
      ((detail.dealerOrphan || []).length ? ' — ' + detail.dealerOrphan.map(x => x.acct + ' ' + cleanModel(x.model) + '(' + x.dealer + ')').join(', ') : '') +
      ((detail.dupOrphan || []).length ? ' · 캘린더 작업과 중복 ' + detail.dupOrphan.length + '대 — ' + dupSummary(detail.dupOrphan) : '')]];
  const list = jobs.concat(tent.map(t => ({ start: t.start, end: t.end, team: t.team, owner: t.owner, acct: t.acct, kind: '예정', sys: '', cal: t.calEquip, equip: '', units: '', src: '—', sn: '', status: '예정(집계 제외)', note: '' })));
  return { head, mat, notes, jobs, list, audit: detail.audit || [], title: '팀별 설치 실적 (' + period.label + ')' };
}
/* 전체 흐름: 기관→팀(CRM 활동) → detail(자동 연결 포함) → 미등록에 팀 붙이기 → 중복 제외 → 설치 현황 → 팀별 실적 설치 칸 → 요약 */
/* 덱 4장 「다음 달 설치 예정」 — 보고 기간 다음 달에 시작하는 캘린더 작업(CRM 기록은 아직 없음): 팀별 기관 수(설치·이전설치)와 System급 일정.
   과거 달 계산과 달리 「예정」 표기는 제외하지 않는다(미래 일정이니까). 미확정·미정·보류·TBD, 중고·Demo는 뺀다. */
function nextMonthPlan(cal, period) {
  const Pd = require('./period'), nx = Pd.toYM(Pd.mk(period.y, period.m) + 1), lo = Date.UTC(nx.y, nx.m - 1, 1), hi = Date.UTC(nx.y, nx.m, 1);
  const dead = ['미확정', '미정', '보류', 'TBD'], strip = v => String(v || '').replace(/예정/g, '').replace(/[(（]\s*[)）]/g, '').replace(/\s+/g, ' ').trim();
  const rows = (cal || []).filter(r => r.start != null && r.start >= lo && r.start < hi && (r.gubun === '설치' || r.gubun === '이전설치') && r.acct
    && !dead.some(k => [r.acct, r.equip, r.gubun].join(' ').indexOf(k) >= 0))
    .map(r => Object.assign({}, r, { acct: strip(r.acct), equip: strip(r.equip) }));
  const jobs = mergeCalRows(rows).filter(j => j.start != null && j.start >= lo && j.start < hi && (j.gubun === '설치' || j.gubun === '이전설치' || j.gubun === '설치·이전설치')
    && !isUsedLabel(j.acct + ' ' + j.equip) && !isDemoLabel(j.acct + ' ' + j.equip));
  const teams = {}, tot = { inst: 0, move: 0 }, systems = [];
  jobs.forEach(j => { const t = String(j.team || '').split('·')[0] || '(미정)', b = teams[t] = teams[t] || { inst: 0, move: 0 };
    const isMove = j.gubun === '이전설치'; if (isMove) { b.move++; tot.move++; } else { b.inst++; tot.inst++; }
    if (isSystemLabel(j.equip)) sysModelsFromText(j.equip).filter(m => /^(XR|XN)-/.test(m)).forEach(m => systems.push({ team: t, acct: j.acct, model: m, gubun: sysGubunFor(j.equip, m, j.gubun), start: new Date(j.start).toISOString().slice(0, 10) })); });
  return { label: Pd.lab(nx.y, nx.m), month: nx.m, byTeam: teams, total: tot, jobs: jobs.length, systems };
}
function runInstall(opt) {
  const { cal, serial, period, rows, rosterMap, team } = opt;
  const acctTeam = buildAcctTeam(rows, rosterMap);
  const detail = computeInstallDetail(cal, serial, period, acctTeam);
  detail.orphan.forEach(o => { o.team = acctTeam[normAcct(o.acct)] || ''; });
  dedupeOrphans(detail);
  applyCalendarInstalls(team, detail);
  const install = computeInstallStatus(serial, period, detail);
  const summary = installSummary(detail, period);
  return { detail, install, summary, systems: collectSystems(detail), links: detail.links };
}
module.exports = { C, INSTALL_CATS, normAcct, normGubun, normTeam, cleanModel, expandModel, expandItems, detailItems, expandDetail, installCatOf, calModelTokens, modelFamily,
  isSystemLabel, isSystemModel, sysModelsFromText, nextMonthPlan, sysGubunFor, resolveCols, readCalendarRows, mergeCalRows, linkHits, computeInstallDetail, dedupeOrphans,
  buildAcctTeam, orphanJobs, collectSystems, sysAcctsFor, applyCalendarInstalls, computeInstallStatus, installSummary, autoNameScore, runInstall, fmt, ymd };
