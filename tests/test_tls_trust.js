// 회사 보안 프로그램(HTTPS 검사)처럼 "사설 CA가 서명한 서버"에 올리는 상황 — 시스템 인증서에 회사 CA가 있으면 올라가고, 없으면 원인을 풀어서 알려 주는지
// Windows 저장소는 SSL_CERT_FILE(Linux 의 시스템 인증서 위치)로 흉내 낸다. openssl 이 없거나 Node 22.19 미만이면 건너뛴다.
const assert = require('assert'), fs = require('fs'), os = require('os'), path = require('path'), cp = require('child_process'), https = require('https');
const XLSX = require('xlsx');
const v = process.versions.node.split('.').map(Number);
if (!(v[0] > 22 || (v[0] === 22 && v[1] >= 19)) || cp.spawnSync('openssl', ['version']).status !== 0) { console.log('test_tls_trust: 건너뜀 (Node 22.19+ · openssl 필요)'); process.exit(0); }
(async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'fsg-tls-')), sh = (a) => { const r = cp.spawnSync('openssl', a, { cwd: tmp, encoding: 'utf8' }); assert.strictEqual(r.status, 0, r.stderr); };
  sh(['req', '-x509', '-newkey', 'rsa:2048', '-nodes', '-keyout', 'ca.key', '-out', 'ca.pem', '-days', '2', '-subj', '/CN=Test Corp Root CA']);
  sh(['req', '-newkey', 'rsa:2048', '-nodes', '-keyout', 'srv.key', '-out', 'srv.csr', '-subj', '/CN=localhost']);
  fs.writeFileSync(path.join(tmp, 'ext.cnf'), 'subjectAltName=DNS:localhost,IP:127.0.0.1\n');
  sh(['x509', '-req', '-in', 'srv.csr', '-CA', 'ca.pem', '-CAkey', 'ca.key', '-CAcreateserial', '-out', 'srv.pem', '-days', '2', '-extfile', 'ext.cnf']);
  const dir = path.join(tmp, 'CRM'); fs.mkdirSync(dir);
  const H = ['상태', '양식 타입', '시작 시간', '종료 시간', '담당자', '주제', 'Error 1', '거래처', 'Serial No. (lookup)', 'Product', '약속/활동 목적', '필수 참석자', '만든 날짜'];
  const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([H, ['완료됨', '서비스 요청', 46000.4, 46000.45, 'A', 'x', '', 'H1', 'S1', 'XN-1000', '고장 수리', '', 45990]]), '약속');
  XLSX.writeFile(wb, path.join(dir, '2. 모든 약속_활동 2026_10_20.xlsx'));
  const store = {};
  const srv = https.createServer({ key: fs.readFileSync(path.join(tmp, 'srv.key')), cert: fs.readFileSync(path.join(tmp, 'srv.pem')) }, (req, res) => {
    const u = new URL(req.url, 'https://x'), m = u.pathname.match(/^\/kpi-dashboard\/(.+)\.json$/); if (!m) { res.writeHead(404); return res.end(); }
    let body = ''; req.on('data', c => body += c); req.on('end', () => { res.setHeader('Content-Type', 'application/json');
      if (req.method === 'GET') return res.end(u.searchParams.get('shallow') ? 'null' : (store[m[1]] === undefined ? 'null' : JSON.stringify(store[m[1]])));
      if (req.method === 'PUT') { store[m[1]] = JSON.parse(body); return res.end(body); } res.end('null'); });
  });
  await new Promise(r => srv.listen(0, '127.0.0.1', r)); const base = 'https://localhost:' + srv.address().port;
  const cli = path.join(__dirname, '..', 'fsg-report', 'push-dashboard.js');
  const go = env => new Promise(res => { const c = cp.spawn(process.execPath, [cli, '--dir', dir, '--firebase-url', base, '--token', 'T'], { env: Object.assign({}, process.env, { FSG_KPI_CODE: 'c' }, env) }); let o = '', e = ''; c.stdout.on('data', d => o += d); c.stderr.on('data', d => e += d); c.on('close', s => res({ s, o, e })); });
  const bad = await go({ SSL_CERT_FILE: '' });   // 회사 CA 가 시스템에 없음
  assert.strictEqual(bad.s, 1); assert(/fetch failed/.test(bad.e) && /UNABLE_TO_VERIFY_LEAF_SIGNATURE|SELF_SIGNED|ISSUER/.test(bad.e) && /HTTPS를 검사/.test(bad.e), '원인을 풀어서 보여 줌: ' + bad.e);
  const good = await go({ SSL_CERT_FILE: path.join(tmp, 'ca.pem') });   // 회사 CA 가 시스템 저장소에 있음
  assert.strictEqual(good.s, 0, good.e + good.o); assert(/올리기 완료/.test(good.o) && store.act && store.meta, '시스템 인증서를 믿고 올라감');
  srv.close(); fs.rmSync(tmp, { recursive: true, force: true });
  console.log('test_tls_trust: OK (사설 CA 서버: 시스템 인증서에 있으면 올라가고, 없으면 인증서 오류 원인 안내)');
})().catch(e => { console.error(e); process.exit(1); });
