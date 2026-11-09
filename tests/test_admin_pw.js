/* KPI 관리자 비밀번호 변경(changeAdminPw): 현재 비밀번호로 다시 로그인 → 비밀번호 변경 → 새 토큰 보관. 가짜 서버·가짜 값만 사용한다.
 * 실행: node tests/test_admin_pw.js */
const fs = require('fs'), path = require('path'), vm = require('vm'), assert = require('assert');
const html = fs.readFileSync(path.join(__dirname, '..', 'fsg-kpi.html'), 'utf8');
const start = html.indexOf('async function changeAdminPw('); assert(start >= 0, 'changeAdminPw 없음');
let depth = 0, end = -1;
for (let i = html.indexOf('{', start); i < html.length; i++) { if (html[i] === '{') depth++; else if (html[i] === '}') { depth--; if (!depth) { end = i + 1; break; } } }
const src = html.slice(start, end);
let pass = 0; const ok = (c, m) => { if (!c) throw new Error('FAIL: ' + m); pass++; };
(async () => {
  const calls = [];
  const fetchMock = async (url, o) => { const body = JSON.parse(o.body), kind = /signInWithPassword/.test(url) ? 'signIn' : /accounts:update/.test(url) ? 'update' : '?'; calls.push({ kind, body });
    const res = (st, d) => ({ ok: st < 400, json: async () => d });
    if (kind === 'signIn') return body.password === 'cur-pass-0000' ? res(200, { idToken: 'T1', expiresIn: '3600' }) : res(400, { error: { message: 'INVALID_LOGIN_CREDENTIALS' } });
    if (body.password === 'weakweak') return res(400, { error: { message: 'WEAK_PASSWORD : x' } });
    if (body.password === 'toomany0') return res(400, { error: { message: 'TOO_MANY_ATTEMPTS_TRY_LATER' } });
    if (body.password === 'server-err') return res(500, { error: { message: 'INTERNAL' } });
    return res(200, { idToken: 'T2', expiresIn: '3600' }); };
  const sb = { fetch: fetchMock, FIREBASE_API_KEY: 'KEY', ADMIN_EMAIL: 'a@example.invalid', ADMIN_TOKEN: 'T0', ADMIN_EXP: 0, Date, parseInt, JSON, Error };
  vm.createContext(sb); vm.runInContext(src + ';this.changeAdminPw=changeAdminPw;', sb);
  await sb.changeAdminPw('cur-pass-0000', 'brand-new-pass');
  ok(calls.length === 2 && calls[0].kind === 'signIn' && calls[1].kind === 'update', '다시 로그인 → 변경 순서');
  ok(calls[0].body.email === 'a@example.invalid' && calls[0].body.password === 'cur-pass-0000', '현재 비밀번호로 로그인');
  ok(calls[1].body.idToken === 'T1' && calls[1].body.password === 'brand-new-pass', '방금 받은 토큰으로 새 비밀번호 설정');
  ok(vm.runInContext('ADMIN_TOKEN', sb) === 'T2' && vm.runInContext('ADMIN_EXP', sb) > Date.now(), '새 토큰 보관·만료 시각 갱신');
  const fail = async (cur, nw, re, why) => { const n = calls.length; let err = null; try { await sb.changeAdminPw(cur, nw); } catch (e) { err = e; } ok(err && re.test(err.message), why + ' → ' + (err && err.message)); return calls.length - n; };
  ok(await fail('wrong', 'brand-new-pass', /현재 비밀번호가 맞지 않습니다/, '현재 비밀번호 틀림') === 1, '틀리면 변경 요청을 보내지 않음');
  await fail('cur-pass-0000', 'weakweak', /너무 약합니다/, '약한 비밀번호');
  await fail('cur-pass-0000', 'toomany0', /시도가 너무 많습니다/, '시도 제한');
  await fail('cur-pass-0000', 'server-err', /바꾸지 못했습니다/, '서버 오류');
  ok(!/password.*console|console.*password/i.test(src) && !/localStorage|sessionStorage/.test(src), '비밀번호를 기록·저장하지 않음');
  console.log('test_admin_pw: OK (' + pass + '개 확인)');
})().catch(e => { console.error(e.message); process.exit(1); });
