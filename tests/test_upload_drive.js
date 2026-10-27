// Drive 업로드(upload-drive.js) — 가짜 웹 앱(302 리다이렉트 포함)으로 요청 형식·중복·인증 실패·주소 검사·토큰 비노출을 확인한다
const assert = require('assert'), fs = require('fs'), os = require('os'), path = require('path'), http = require('http'), cp = require('child_process');
const { okUrl } = require('../fsg-report/upload-drive.js');
(async () => {
  assert(okUrl('https://script.google.com/macros/s/AKfycbx_abc-123/exec') && !okUrl('http://script.google.com/macros/s/AK/exec') && !okUrl('https://evil.example/macros/s/AK/exec') && !okUrl('https://script.google.com/macros/s/AK/dev') && !okUrl('https://script.google.com.evil.example/macros/s/AK/exec'), 'URL 형식');
  assert(okUrl('http://127.0.0.1:1/x', true), 'any-url (시험용)');
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'fsg-up-')), f1 = path.join(tmp, '2. 모든 약속_활동 2026_10_27 AM 11-08-26.xlsx'), f2 = path.join(tmp, 'Serial No 2026_10_27.xlsx');
  fs.writeFileSync(f1, Buffer.alloc(300000, 7)); fs.writeFileSync(f2, Buffer.from('serial-bytes'));
  const seen = [], stored = {};
  const srv = http.createServer((req, res) => {
    let b = ''; req.on('data', c => b += c); req.on('end', () => {
      if (req.url.startsWith('/exec') && req.method === 'POST') { seen.push(JSON.parse(b)); res.writeHead(302, { Location: '/done?i=' + (seen.length - 1) }); return res.end(); }   // Apps Script 처럼 POST → 302 → GET
      if (req.url.startsWith('/done') && req.method === 'GET') {
        const r = seen[Number(new URL(req.url, 'http://x').searchParams.get('i'))], out = (o) => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(o)); };
        if (r.token !== 'TOKEN-OK-0123456789abcdef0123456789') return out({ ok: false, error: '인증 실패' });
        const buf = Buffer.from(r.b64, 'base64'); if (buf.length !== r.size || require('crypto').createHash('sha256').update(buf).digest('hex') !== r.sha256) return out({ ok: false, error: '파일이 손상되었습니다' });
        const dup = stored[r.name] === r.sha256; stored[r.name] = r.sha256; return out({ ok: true, dup });
      }
      res.writeHead(404); res.end();
    });
  });
  await new Promise(r => srv.listen(0, '127.0.0.1', r)); const url = 'http://127.0.0.1:' + srv.address().port + '/exec';
  const cli = path.join(__dirname, '..', 'fsg-report', 'upload-drive.js');
  const go = (extra, env) => new Promise(res => { const c = cp.spawn(process.execPath, [cli, '--allow-any-url'].concat(extra), { env: Object.assign({}, process.env, { FSG_DRIVE_URL: url, FSG_DRIVE_TOKEN: 'TOKEN-OK-0123456789abcdef0123456789' }, env || {}) }); let o = '', e = ''; c.stdout.on('data', d => o += d); c.stderr.on('data', d => e += d); c.on('close', s => res({ s, o, e })); });
  // 1) 정상 업로드: 두 파일, 요청 형식, 302 따라가기
  let r = await go(['--file', f1, '--file', f2]);
  assert.strictEqual(r.s, 0, r.o + r.e); assert(/약속_활동 2026_10_27/.test(r.o) && /완료/.test(r.o) && /2시간 안에/.test(r.o), r.o);
  assert.strictEqual(seen.length, 2); assert.strictEqual(seen[0].name, path.basename(f1)); assert.strictEqual(seen[0].size, 300000); assert(/^[0-9a-f]{64}$/.test(seen[0].sha256));
  // 2) 같은 파일 다시 → 서버가 중복으로 알림(건너뜀 표시), 실패 아님
  r = await go(['--file', f1]); assert.strictEqual(r.s, 0); assert(/이미 올라가 있음/.test(r.o), r.o);
  // 3) 토큰이 틀리면 실패(종료 코드 1), 안내문구, 토큰 값은 어디에도 출력되지 않음
  r = await go(['--file', f1], { FSG_DRIVE_TOKEN: 'WRONG-TOKEN-SECRET-VALUE-9999999999' }); assert.strictEqual(r.s, 1); assert(/인증 실패/.test(r.e) && /끌어다 놓아도/.test(r.e), r.e);
  assert(!/WRONG-TOKEN-SECRET|TOKEN-OK-0123/.test(r.o + r.e), '토큰이 출력에 나옴');
  // 4) 시험(dry-run): 아무것도 보내지 않음. 주소 형식·파일 없음·토큰 없음 오류
  const n = seen.length; r = await go(['--file', f1, '--dry-run']); assert.strictEqual(r.s, 0); assert(/\[시험\]/.test(r.o) && seen.length === n, 'dry-run 은 보내지 않는다');
  r = await new Promise(res => { const c = cp.spawn(process.execPath, [cli, '--file', f1], { env: Object.assign({}, process.env, { FSG_DRIVE_URL: 'https://evil.example/exec', FSG_DRIVE_TOKEN: 'x' }) }); let e = ''; c.stderr.on('data', d => e += d); c.on('close', s => res({ s, e })); });
  assert.strictEqual(r.s, 1); assert(/주소 형식/.test(r.e), r.e);
  r = await go(['--file', path.join(tmp, 'nope.xlsx')]); assert.strictEqual(r.s, 1); assert(/찾을 수 없습니다/.test(r.e));
  r = await go(['--file', f1], { FSG_DRIVE_TOKEN: '' }); assert.strictEqual(r.s, 1); assert(/토큰/.test(r.e));
  // 5) 서버가 JSON 이 아닌 응답(로그인 화면 등)을 주면 설정 안내
  const bad = http.createServer((q, s) => { s.setHeader('Content-Type', 'text/html'); s.end('<html>login</html>'); }); await new Promise(rr => bad.listen(0, '127.0.0.1', rr));
  r = await new Promise(res => { const c = cp.spawn(process.execPath, [cli, '--allow-any-url', '--file', f1], { env: Object.assign({}, process.env, { FSG_DRIVE_URL: 'http://127.0.0.1:' + bad.address().port + '/exec', FSG_DRIVE_TOKEN: 'x' }) }); let e = ''; c.stderr.on('data', d => e += d); c.on('close', s => res({ s, e })); });
  assert.strictEqual(r.s, 1); assert(/모든 사용자/.test(r.e), r.e);
  srv.close(); bad.close(); console.log('test_upload_drive OK');
})().catch(e => { console.error(e); process.exit(1); });
