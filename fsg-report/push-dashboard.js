#!/usr/bin/env node
/* FSG KPI 대시보드(fsg-kpi.html)에 CRM 데이터 올리기 — 브라우저 「CRM 데이터 올리기」(?admin)와 같은 포맷·같은 암호화.
 * 활동 → act(열 사전 압축 encodeAct) · 자산대장 '사용' 장비 → ser(encodeSer) · meta(actSrc·actRows·serSrc·updatedAt·check)
 * gzip → PBKDF2(200,000회)+AES-GCM(접근 코드) → Firebase RTDB <FIREBASE_URL>/kpi-dashboard/{act,ser,meta}. 올리기 전 기존 데이터를 backups/날짜/ 에 복사(30일 보관).
 *
 *   node fsg-report/push-dashboard.js --dir "CRM_원본"            (활동 필수 · Serial 있으면 함께)
 *   환경변수  FSG_KPI_CODE(접근 코드)  FSG_ADMIN_EMAIL / FSG_ADMIN_PW(관리자 계정)  — 어디에도 기록하지 않는다
 *   --activity / --serial 파일 직접 지정 · --token 관리자 idToken 직접(로그인 생략) · --dry-run 올리지 않고 포맷만 만들어 --out 에 저장
 *   --firebase-url / --api-key / --data-path  기본값은 fsg-kpi.html 안의 상수(대시보드와 항상 같게)
 *   --force-code  기존 데이터의 접근 코드와 달라도 올린다(팀장들이 새 코드를 입력해야 함) */
'use strict';
const fs = require('fs'), path = require('path');
const R = require('./lib/read-crm');
const subtle = require('crypto').webcrypto.subtle, rnd = n => require('crypto').webcrypto.getRandomValues(new Uint8Array(n));

function args(argv) { const o = {}; for (let i = 0; i < argv.length; i++) { const a = argv[i]; if (a.startsWith('--')) { const k = a.slice(2), v = argv[i + 1]; if (v === undefined || v.startsWith('--')) o[k] = true; else { o[k] = v; i++; } } } return o; }
function dashConst(name, fallback) {
  try { const html = fs.readFileSync(path.join(__dirname, '..', 'fsg-kpi.html'), 'utf8'); const m = html.match(new RegExp("const " + name + "\\s*=\\s*'([^']*)'")); if (m) return m[1]; } catch (e) { /* 없으면 기본값 */ }
  return fallback;
}
/* --- fsg-kpi.html 과 같은 인코딩·암호화 (encodeAct · encodeSer · seal) --- */
function encodeAct(recs, src) {
  const keys = ['st', 'ft', 'own', 'att', 'err', 'acct', 'sn', 'prod', 'purp', 'subj'], d = {}, c = {}, idx = {};
  keys.forEach(k => { d[k] = []; c[k] = new Array(recs.length); idx[k] = new Map(); });
  const t = new Array(recs.length), e = new Array(recs.length), cr = new Array(recs.length); let hasCr = false;
  recs.forEach((r, i) => { const T = r.t0 !== undefined ? r.t0 : r.t, Ee = r.e0 !== undefined ? r.e0 : r.e;
    t[i] = T == null ? -1 : Math.round(T / 60000); e[i] = Ee == null ? -1 : Math.round(Ee / 60000); cr[i] = r.c == null ? -1 : Math.round(r.c / 60000); if (r.c != null) hasCr = true;
    keys.forEach(k => { const v = r[k] || ''; let j = idx[k].get(v); if (j === undefined) { j = d[k].length; d[k].push(v); idx[k].set(v, j); } c[k][i] = j; }); });
  const o = { v: 1, n: recs.length, t, e, d, c, src }; if (hasCr) o.cr = cr; return o;
}
function encodeSer(list) { return { v: 2, used: list.map(s => [s.acct, s.sn, s.model || '']) }; }
const b64 = u8 => Buffer.from(u8).toString('base64'), unb64 = s => new Uint8Array(Buffer.from(s, 'base64'));
async function streamThrough(u8, ts) { return new Uint8Array(await new Response(new Blob([u8]).stream().pipeThrough(ts)).arrayBuffer()); }
async function deriveKey(code, salt) {
  const base = await subtle.importKey('raw', new TextEncoder().encode(code), 'PBKDF2', false, ['deriveKey']);
  return subtle.deriveKey({ name: 'PBKDF2', salt, iterations: 200000, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
}
async function seal(obj, code) {
  const salt = rnd(16), iv = rnd(12);
  const z = await streamThrough(new TextEncoder().encode(JSON.stringify(obj)), new CompressionStream('gzip'));
  const ct = new Uint8Array(await subtle.encrypt({ name: 'AES-GCM', iv }, await deriveKey(code, salt), z));
  return { v: 1, salt: b64(salt), iv: b64(iv), data: b64(ct) };
}
async function open_(rec, code) {
  const pt = new Uint8Array(await subtle.decrypt({ name: 'AES-GCM', iv: unb64(rec.iv) }, await deriveKey(code, unb64(rec.salt)), unb64(rec.data)));
  return JSON.parse(new TextDecoder().decode(await streamThrough(pt, new DecompressionStream('gzip'))));
}
async function codeOk(code, meta) { if (!meta || !meta.check) return true; try { return (await open_(meta.check, code)) === 'FSG-KPI'; } catch (e) { return false; } }
const nowStr = () => { const d = new Date(Date.now() + 9 * 3600000); return d.toISOString().slice(0, 16).replace('T', ' '); };   // 한국 시각(대시보드는 관리자 PC 시각)

/* --- Firebase REST --- */
async function adminLogin(email, pw, apiKey) {
  const r = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + apiKey, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password: pw, returnSecureToken: true }) });
  const d = await r.json();
  if (!r.ok) { const m = (d.error && d.error.message) || ''; throw new Error(/INVALID|PASSWORD|EMAIL_NOT_FOUND|USER/.test(m) ? '관리자 이메일 또는 비밀번호가 맞지 않습니다.' : '로그인 실패: ' + m); }
  return d.idToken;
}
function makeFb(baseUrl, dataPath, token) {
  return async function fb(p, opt = {}) {
    const url = baseUrl.replace(/\/$/, '') + '/' + dataPath + '/' + p + '.json?auth=' + encodeURIComponent(token) + (opt.query ? '&' + opt.query : '');
    const r = await fetch(url, { method: opt.method || 'GET', body: opt.body, headers: { 'Content-Type': 'application/json' } });
    if (r.status === 401 || r.status === 403) throw new Error((opt.method && opt.method !== 'GET' ? '쓰기' : '읽기') + ' 권한이 없습니다(' + p + '). 관리자 계정인지, Firebase 규칙의 관리자 UID가 맞는지 확인해 주세요.');
    if (!r.ok) throw new Error('저장소 오류 ' + r.status + ' (' + p + ')');
    return r.status === 204 ? null : await r.json();
  };
}

async function main() {
  const o = args(process.argv.slice(2));
  if (o.help || (!o.dir && !o.activity)) { console.log(fs.readFileSync(__filename, 'utf8').split('*/')[0].replace(/^\/\*|^ \* ?/gm, '')); process.exit(o.help ? 0 : 1); }
  const code = process.env.FSG_KPI_CODE || '', email = process.env.FSG_ADMIN_EMAIL || '', pw = process.env.FSG_ADMIN_PW || '';
  // 입력 파일 (report-data 와 같은 규칙)
  let actFiles = o.activity ? [{ path: o.activity, name: path.basename(o.activity), mtime: fs.statSync(o.activity).mtimeMs }] : null, serPath = o.serial || null;
  if (o.dir) { const picked = R.pickLatest(o.dir);
    if (!actFiles) { if (!picked.ACT) throw new Error('폴더에서 활동 파일(이름에 "약속_활동")을 찾지 못했습니다: ' + o.dir); actFiles = picked.ACT_ALL || [picked.ACT]; }
    if (!serPath && picked.SER) serPath = picked.SER.path; }
  const act = R.loadActivity(actFiles);
  const actSrc = (act.used || actFiles.map(f => f.name)).join(' + ');
  const actPayload = encodeAct(act.rows, actSrc);
  let serPayload = null, serSrc = '', serAll = 0;
  if (serPath) { const all = R.parseSerial(fs.readFileSync(serPath)); serAll = all.length; serPayload = encodeSer(all.filter(x => x.state === '사용')); serSrc = path.basename(serPath); }
  console.log(`활동 ${actSrc}: ${act.rows.length.toLocaleString()}행` + (act.merged ? ` (파일 ${act.merged}개 합침, 똑같은 행 ${act.dup}개 제외)` : '') + (act.superseded && act.superseded.length ? `\n⚠ 같은 기간을 다시 내보낸 파일 ${act.superseded.length}개는 쓰지 않음(최신 파일만 사용): ${act.superseded.join(', ')}` : '') + (act.hasAtt ? '' : ' ⚠ 필수 참석자 열 없음'));
  if (serPayload) console.log(`자산대장 ${serSrc}: 장비 ${serAll.toLocaleString()}대 중 '사용' ${serPayload.used.length.toLocaleString()}대`);

  if (o['dry-run']) {
    const out = { act: actPayload, ser: serPayload, meta: { actSrc, actRows: act.rows.length, serSrc } };
    if (code) { out.sealed = { act: await seal(actPayload, code), ser: serPayload ? await seal(serPayload, code) : null, check: await seal('FSG-KPI', code) }; }
    if (o.out) { fs.writeFileSync(o.out, JSON.stringify(out)); console.log('dry-run: ' + o.out + ' 에 저장 (올리지 않음)'); } else console.log('dry-run: 올리지 않음 · act ' + JSON.stringify(actPayload).length.toLocaleString() + '자');
    return;
  }
  if (!code) throw new Error('접근 코드가 없습니다 — 환경변수 FSG_KPI_CODE');
  const baseUrl = o['firebase-url'] || dashConst('FIREBASE_URL', ''), apiKey = o['api-key'] || dashConst('FIREBASE_API_KEY', ''), dataPath = o['data-path'] || dashConst('DATA_PATH', 'kpi-dashboard');
  if (!baseUrl) throw new Error('FIREBASE_URL을 찾지 못했습니다(fsg-kpi.html 또는 --firebase-url)');
  let token = o.token; if (!token) { if (!email || !pw) throw new Error('관리자 계정이 없습니다 — 환경변수 FSG_ADMIN_EMAIL / FSG_ADMIN_PW (또는 --token)'); token = await adminLogin(email, pw, apiKey); }
  const fb = makeFb(baseUrl, dataPath, token);
  const cur = await fb('meta');
  if (cur && !(await codeOk(code, cur))) {
    if (!o['force-code']) throw new Error('입력한 접근 코드가 기존 데이터의 코드와 다릅니다. 코드를 확인하거나, 코드를 바꾸려면 --force-code (팀장들도 새 코드를 입력해야 하고 연장근무·좌표 자료도 다시 올려야 합니다)');
    console.log('⚠ 접근 코드가 바뀝니다(--force-code)');
  }
  // 하루 1회 백업 + 30일 지난 백업 정리 (대시보드와 같음)
  const today = nowStr().slice(0, 10), kinds = ['act'].concat(serPayload ? ['ser'] : []);
  try {
    for (const k of kinds) { const old = await fb(k); if (old) await fb(`backups/${today}/${k}`, { method: 'PUT', body: JSON.stringify(old) }); }
    const keys = await fb('backups', { query: 'shallow=true' }).catch(() => null);
    if (keys) { const lim = new Date(Date.now() - 30 * 86400000 + 9 * 3600000).toISOString().slice(0, 10); for (const k of Object.keys(keys)) if (k < lim) await fb('backups/' + k, { method: 'DELETE' }); }
  } catch (e) { console.warn('백업 건너뜀: ' + e.message); }
  await fb('act', { method: 'PUT', body: JSON.stringify(await seal(actPayload, code)) });
  const now = nowStr(), meta = Object.assign({}, cur || {}, { actSrc, actRows: act.rows.length, updatedAt: now, actAt: now, check: await seal('FSG-KPI', code) });
  if (serPayload) { await fb('ser', { method: 'PUT', body: JSON.stringify(await seal(serPayload, code)) }); meta.serSrc = serSrc; meta.serAt = now; }
  await fb('meta', { method: 'PUT', body: JSON.stringify(meta) });
  console.log(`올리기 완료 ${now} — 대시보드는 새로고침하거나 5분 안에 자동 반영됩니다` + (serPayload ? '' : ' (자산대장은 올리지 않음 — 기존 자료 유지)'));
}
if (require.main === module) main().catch(e => { console.error('오류: ' + (e.message || e)); process.exit(1); });
module.exports = { encodeAct, encodeSer, seal, open_, codeOk, nowStr };
