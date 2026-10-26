// 대시보드 올리기 — 엔진이 만든 act/ser 를 fsg-kpi.html 의 복호화·디코드 함수로 그대로 읽을 수 있는지(포맷 동일) + 가짜 Firebase 로 올리기 흐름 검증
const assert = require('assert'), fs = require('fs'), os = require('os'), path = require('path'), cp = require('child_process'), http = require('http'), vm = require('vm');
const XLSX = require('xlsx');
const P = require('../fsg-report/push-dashboard');
const html = fs.readFileSync(path.join(__dirname, '..', 'fsg-kpi.html'), 'utf8');
function grab(startRe) {   // HTML 안 함수 본문을 중괄호 짝으로 잘라 온다 (test_kpi_sn_zero 와 같은 방식)
  const m = html.match(startRe); assert(m, 'not found: ' + startRe); let i = html.indexOf('{', m.index), depth = 0;
  for (let j = i; j < html.length; j++) { const ch = html[j]; if (ch === '{') depth++; else if (ch === '}') { depth--; if (!depth) return html.slice(m.index, j + 1); } }
  throw new Error('unbalanced');
}
const line = re => { const m = html.match(re); assert(m, 'not found ' + re); return m[0]; };
const wc = require('crypto').webcrypto;
const ctx = vm.createContext({ crypto: wc, TextEncoder, TextDecoder, atob, btoa, Blob, Response, CompressionStream, DecompressionStream, Uint8Array, JSON, Math, console, Array, Map, String, Number });
vm.runInContext([line(/const b64=.*?;\n/), line(/const unb64=.*?;\n/), grab(/async function streamThrough\(/), grab(/async function deriveKey\(/), grab(/async function open_\(/), grab(/async function codeOk\(/),
  grab(/function decodeEmbed\(/), grab(/function decodeSer\(/), 'function snOf(v){ v=String(v==null?\'\':v).trim(); return v===\'0\'?\'\':v; }'].join('\n'), ctx);
const dash = { open_: ctx.open_, decodeEmbed: ctx.decodeEmbed, decodeSer: ctx.decodeSer, codeOk: ctx.codeOk };

(async () => {
  // 작은 CRM 파일
  const T = (y, m, d, h) => Date.UTC(y, m - 1, d, h || 0), ser = ms => ms / 86400000 + 25569;
  const H = ['상태', '양식 타입', '시작 시간', '종료 시간', '담당자', '주제', 'Error 1', '거래처', 'Serial No. (lookup)', 'Product', '약속/활동 목적', '필수 참석자', '만든 날짜'];
  const rows = []; for (let d = 1; d <= 12; d++) rows.push(['완료됨', '서비스 요청', ser(T(2026, 9, d, 10)), ser(T(2026, 9, d, 11)), d % 2 ? 'A' : 'B', '주제' + d, d % 3 ? 'E1' : '', 'H' + (d % 3), d % 4 ? 'S' + d : 0, 'XN-1000', d % 3 ? '고장 수리' : 'PM', d % 5 ? '' : 'C', ser(T(2026, 8, 30, 9))]);
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'fsg-push-')), dir = path.join(tmp, 'CRM_원본'); fs.mkdirSync(dir);
  const awb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(awb, XLSX.utils.aoa_to_sheet([H, ...rows]), '약속'); XLSX.writeFile(awb, path.join(dir, '2. 모든 약속_활동 2026_09_30.xlsx'));
  const SER_H = ['제품 상태', '거래처', 'Model', 'Serial No.', '초도설치', '설치일자'];
  const swb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(swb, XLSX.utils.aoa_to_sheet([SER_H, ['사용', 'H1', 'XN-1000', 'S1', '2020-01-01', '2020-01-01'], ['폐기', 'H2', 'SP-50', 'S2', '', ''], ['사용', 'H3', 'CN-3000', 0, '', '']]), 'Serial');
  XLSX.writeFile(swb, path.join(dir, 'Serial No 2026_09_30.xlsx'));
  const cli = path.join(__dirname, '..', 'fsg-report', 'push-dashboard.js');

  // 1) dry-run: 포맷 만들기 → 대시보드 함수로 복호화·디코드
  const outJ = path.join(tmp, 'dry.json');
  const dry = cp.spawnSync(process.execPath, [cli, '--dir', dir, '--dry-run', '--out', outJ], { encoding: 'utf8', env: Object.assign({}, process.env, { FSG_KPI_CODE: 'test-code' }) });
  assert.strictEqual(dry.status, 0, dry.stderr + dry.stdout); assert(!/test-code/.test(dry.stdout + dry.stderr), '코드를 출력하지 않음');
  const J = JSON.parse(fs.readFileSync(outJ, 'utf8'));
  assert.strictEqual(J.act.n, 12); assert.deepStrictEqual(J.ser.used, [['H1', 'S1', 'XN-1000'], ['H3', '', 'CN-3000']], "'사용'만 · S/N 0 → 빈칸");
  const actBack = await dash.open_(J.sealed.act, 'test-code'); assert.deepStrictEqual(actBack, J.act, 'seal → open_ 왕복');
  assert.strictEqual(await dash.open_(J.sealed.check, 'test-code'), 'FSG-KPI'); assert(await dash.codeOk('test-code', { check: J.sealed.check })); assert(!(await dash.codeOk('wrong', { check: J.sealed.check })));
  const recs = JSON.parse(JSON.stringify(dash.decodeEmbed(actBack)));   // vm 영역 배열 → 평범한 객체
  assert.strictEqual(recs.length, 12);
  assert.deepStrictEqual([recs[0].st, recs[0].ft, recs[0].own, recs[0].acct, recs[0].sn, recs[0].prod, recs[0].purp, recs[0].subj, recs[0].err, recs[0].att, recs[0].t, recs[0].e, recs[0].c],
    ['완료됨', '서비스 요청', 'A', 'H1', 'S1', 'XN-1000', '고장 수리', '주제1', 'E1', '', T(2026, 9, 1, 10), T(2026, 9, 1, 11), T(2026, 8, 30, 9)], '대시보드 decodeEmbed 로 읽은 행 = 원본');
  assert.strictEqual(recs[3].sn, '', 'S/N 0 → 장비 없음'); assert.strictEqual(recs[4].att, 'C');
  assert.deepStrictEqual(JSON.parse(JSON.stringify(dash.decodeSer(J.ser))), [{ state: '사용', acct: 'H1', sn: 'S1', model: 'XN-1000' }, { state: '사용', acct: 'H3', sn: '', model: 'CN-3000' }]);

  // 1-b) 같은 날 다시 내보낸 활동 파일은 최신 하나만 올린다(이중 계산 방지) · 이어 붙은 분할 파일은 합친다
  const wAct = (d, name, list) => { const w = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(w, XLSX.utils.aoa_to_sheet([H, ...list]), '약속'); XLSX.writeFile(w, path.join(d, name)); };
  const dRe = path.join(tmp, 're'); fs.mkdirSync(dRe);
  wAct(dRe, '2. 모든 약속_활동 2026_09_30 AM 09-00-00.xlsx', rows.map((r, i) => i === 2 ? Object.assign(r.slice(), { 0: '시작됨' }) : r)); wAct(dRe, '2. 모든 약속_활동 2026_09_30 PM 03-00-00.xlsx', rows);
  const dryRe = cp.spawnSync(process.execPath, [cli, '--dir', dRe, '--dry-run', '--out', path.join(tmp, 're.json')], { encoding: 'utf8' });
  assert.strictEqual(dryRe.status, 0, dryRe.stderr); assert(/다시 내보낸 파일 1개는 쓰지 않음/.test(dryRe.stdout), dryRe.stdout);
  const jRe = JSON.parse(fs.readFileSync(path.join(tmp, 're.json'), 'utf8')); assert.strictEqual(jRe.act.n, 12, '최신 파일의 12행만'); assert.strictEqual(jRe.meta.actSrc, '2. 모든 약속_활동 2026_09_30 PM 03-00-00.xlsx');
  const dSp = path.join(tmp, 'sp'); fs.mkdirSync(dSp);
  wAct(dSp, '2. 모든 약속_활동 2026_09_30 AM 10-00-00 (1).xlsx', rows.slice(0, 6)); wAct(dSp, '2. 모든 약속_활동 2026_09_30 AM 10-00-01 (2).xlsx', rows.slice(5));
  const drySp = cp.spawnSync(process.execPath, [cli, '--dir', dSp, '--dry-run', '--out', path.join(tmp, 'sp.json')], { encoding: 'utf8' });
  assert.strictEqual(drySp.status, 0, drySp.stderr); assert(/파일 2개 합침, 똑같은 행 1개 제외/.test(drySp.stdout), drySp.stdout); assert.strictEqual(JSON.parse(fs.readFileSync(path.join(tmp, 'sp.json'), 'utf8')).act.n, 12, '12행 합침');

  // 2) 가짜 Firebase 에 올리기: 경로·백업·meta·코드 검사
  const store = {}, log = [];
  const srv = http.createServer((req, res) => {
    const u = new URL(req.url, 'http://x'), m = u.pathname.match(/^\/kpi-dashboard\/(.+)\.json$/); if (!m) { res.writeHead(404); return res.end(); }
    const key = m[1], auth = u.searchParams.get('auth'); log.push(req.method + ' ' + key);
    if (req.method !== 'GET' && auth !== 'TOKEN') { res.writeHead(401); return res.end('{}'); }
    let body = ''; req.on('data', c => body += c); req.on('end', () => {
      res.setHeader('Content-Type', 'application/json');
      if (req.method === 'GET') { if (u.searchParams.get('shallow') === 'true') { const pre = key + '/', ks = {}; Object.keys(store).forEach(k => { if (k.indexOf(pre) === 0) ks[k.slice(pre.length).split('/')[0]] = true; }); return res.end(Object.keys(ks).length ? JSON.stringify(ks) : 'null'); }
        return res.end(store[key] === undefined ? 'null' : JSON.stringify(store[key])); }
      if (req.method === 'PUT') { store[key] = JSON.parse(body); return res.end(body); }
      if (req.method === 'DELETE') { Object.keys(store).forEach(k => { if (k === key || k.indexOf(key + '/') === 0) delete store[k]; }); return res.end('null'); }
      res.writeHead(405); res.end(); });
  });
  await new Promise(r => srv.listen(0, '127.0.0.1', r)); const base = 'http://127.0.0.1:' + srv.address().port;
  // 가짜 서버가 이 프로세스에 있으므로 CLI 는 비동기로 띄운다(spawnSync 면 서로 기다려 멈춤)
  const spawnP = (a, env) => new Promise(res => { const c = cp.spawn(process.execPath, a, { env: Object.assign({}, process.env, env) }); let out = '', err = ''; c.stdout.on('data', d => out += d); c.stderr.on('data', d => err += d); c.on('close', status => res({ status, stdout: out, stderr: err })); });
  const run = (extra, code, token) => spawnP([cli, '--dir', dir, '--firebase-url', base, '--token', token || 'TOKEN'].concat(extra || []), { FSG_KPI_CODE: code || 'test-code' });
  const r1 = await run(); assert.strictEqual(r1.status, 0, r1.stderr + r1.stdout); assert(/올리기 완료/.test(r1.stdout));
  assert(store.act && store.ser && store.meta, '세 경로 저장'); assert.strictEqual(store.meta.actRows, 12); assert.strictEqual(store.meta.actSrc, '2. 모든 약속_활동 2026_09_30.xlsx'); assert.strictEqual(store.meta.serSrc, 'Serial No 2026_09_30.xlsx');
  assert(store.meta.updatedAt === store.meta.actAt && store.meta.serAt === store.meta.actAt); assert(await dash.codeOk('test-code', store.meta));
  const got = JSON.parse(JSON.stringify(dash.decodeEmbed(await dash.open_(store.act, 'test-code')))); assert.strictEqual(got.length, 12); assert.strictEqual(got[11].purp, 'PM');
  assert(!Object.keys(store).some(k => /^backups\//.test(k)), '처음엔 백업 없음');
  // 두 번째 올리기: 기존 act/ser 를 backups/오늘/ 로, 오래된 백업은 삭제, 기존 meta 의 다른 필드(hrSrc)는 유지
  store.meta.hrSrc = '연장근무.xlsx'; store['backups/2020-01-01/act'] = { old: 1 };
  const r2 = await run(); assert.strictEqual(r2.status, 0, r2.stderr + r2.stdout);
  const today = P.nowStr().slice(0, 10); assert(store['backups/' + today + '/act'] && store['backups/' + today + '/ser'], '백업 생성'); assert(!store['backups/2020-01-01/act'], '30일 지난 백업 삭제');
  assert.strictEqual(store.meta.hrSrc, '연장근무.xlsx', 'meta 병합');
  // 접근 코드가 다르면 거부, --force-code 면 진행
  const r3 = await run([], 'other'); assert.strictEqual(r3.status, 1); assert(/접근 코드가 기존 데이터의 코드와 다릅니다/.test(r3.stderr)); assert(!/other/.test(r3.stderr + r3.stdout));
  const r4 = await run(['--force-code'], 'other'); assert.strictEqual(r4.status, 0, r4.stderr); assert(await dash.codeOk('other', store.meta));
  // 토큰 없이는 쓰기 거부(401) → 오류 메시지
  const r5 = await run([], 'other', 'BAD');
  assert.strictEqual(r5.status, 1); assert(/쓰기 권한이 없습니다/.test(r5.stderr), r5.stderr);
  srv.close(); fs.rmSync(tmp, { recursive: true, force: true });
  console.log('test_push_dashboard: OK (encodeAct/encodeSer/seal = 대시보드 decodeEmbed/decodeSer/open_ 왕복 · S/N 0 · 가짜 Firebase 올리기·백업·meta 병합·코드 검사·권한 오류)');
})().catch(e => { console.error(e); process.exit(1); });
