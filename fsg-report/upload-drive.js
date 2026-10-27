#!/usr/bin/env node
// CRM 파일을 Drive 「CRM_원본」 폴더로 올린다 — 만족도 시트(Apps Script 웹 앱 「CRM 업로드 입구」)가 받아 폴더에 저장한다.
// 사용: node fsg-report/upload-drive.js --file <경로> [--file <경로> ...] [--dry-run]
// 환경변수: FSG_DRIVE_URL(웹 앱 주소 .../exec) · FSG_DRIVE_TOKEN(시트 메뉴에서 만든 토큰). 토큰은 화면·로그에 쓰지 않는다.
// 같은 파일(내용이 같음)을 다시 올리면 서버가 알아보고 건너뛴다(중복 방지).
'use strict';
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const { trustSystemCerts, explainError } = require('./push-dashboard.js');

const MAX_BYTES = 45 * 1024 * 1024;
function args(a) {
  const o = { files: [], dry: false, anyUrl: false, timeout: 240000 };
  for (let i = 0; i < a.length; i++) {
    const k = a[i];
    if (k === '--file') o.files.push(a[++i]);
    else if (k === '--dry-run') o.dry = true;
    else if (k === '--allow-any-url') o.anyUrl = true;   // 시험용(로컬 서버). 운영에서는 쓰지 않는다
    else if (k === '--timeout') o.timeout = Number(a[++i]) * 1000;
    else throw new Error('알 수 없는 옵션: ' + k);
  }
  return o;
}
function okUrl(u, anyUrl) { return anyUrl ? /^https?:\/\//.test(u) : /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec\/?$/.test(u); }

async function uploadOne(url, token, file, timeoutMs) {
  const buf = fs.readFileSync(file), name = path.basename(file);
  if (!buf.length) throw new Error('빈 파일입니다: ' + name);
  if (buf.length > MAX_BYTES) throw new Error('파일이 너무 큽니다(' + Math.round(buf.length / 1048576) + 'MB, 최대 45MB): ' + name);
  const body = JSON.stringify({ token, name, size: buf.length, sha256: crypto.createHash('sha256').update(buf).digest('hex'), b64: buf.toString('base64') });
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body, redirect: 'follow', signal: AbortSignal.timeout(timeoutMs) });
  const text = await res.text();
  let j; try { j = JSON.parse(text); } catch (e) { throw new Error('응답을 읽을 수 없습니다(HTTP ' + res.status + '). 웹 앱 배포의 「액세스: 모든 사용자」와 주소를 확인하세요.'); }
  if (!j || !j.ok) throw new Error((j && j.error) || '업로드가 거부되었습니다');
  return { name, size: buf.length, dup: !!j.dup };
}

async function main() {
  const o = args(process.argv.slice(2));
  const url = (process.env.FSG_DRIVE_URL || '').trim(), token = process.env.FSG_DRIVE_TOKEN || '';
  if (!o.files.length) throw new Error('--file 이 필요합니다');
  if (!url) throw new Error('Drive 업로드 주소(FSG_DRIVE_URL)가 없습니다. setup.bat 에서 설정하세요.');
  if (!okUrl(url, o.anyUrl)) throw new Error('Drive 업로드 주소 형식이 맞지 않습니다(https://script.google.com/macros/s/…/exec).');
  if (!o.dry && !token) throw new Error('토큰(FSG_DRIVE_TOKEN)이 없습니다.');
  for (const f of o.files) if (!fs.existsSync(f)) throw new Error('파일을 찾을 수 없습니다: ' + f);
  trustSystemCerts();
  let bad = 0;
  for (const f of o.files) {
    const name = path.basename(f), mb = (fs.statSync(f).size / 1048576).toFixed(1);
    if (o.dry) { console.log('[시험] 올릴 파일: ' + name + ' (' + mb + 'MB)'); continue; }
    process.stdout.write('Drive 로 올리는 중: ' + name + ' (' + mb + 'MB) … ');
    try {
      const r = await uploadOne(url, token, f, o.timeout);
      console.log(r.dup ? '이미 올라가 있음(건너뜀)' : '완료');
    } catch (e) { bad++; console.log('실패'); console.error('  ' + explainError(e)); }
  }
  if (bad) { console.error('Drive 업로드 ' + bad + '건 실패 — 파일을 Drive 창에 직접 끌어다 놓아도 됩니다.'); process.exit(1); }
  if (!o.dry) console.log('Drive 업로드 끝 — 만족도 시트는 2시간 안에 자동 반영됩니다.');
}
if (require.main === module) main().catch(e => { console.error('오류: ' + explainError(e)); process.exit(1); });
module.exports = { okUrl, uploadOne, args, MAX_BYTES };
