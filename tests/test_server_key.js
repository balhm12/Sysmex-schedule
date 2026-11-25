/* 서버용 Firebase 키(2026-11-25) — 화면용 키에 리퍼러 제한을 걸어도 PC·Colab 프로그램이 로그인할 수 있게 */
const fs = require('fs'), path = require('path'), assert = require('assert');
const root = path.join(__dirname, '..');
const { serverKey } = require(path.join(root, 'fsg-report', 'server-key.js'));
const keep = process.env.FSG_FB_SERVER_KEY;
delete process.env.FSG_FB_SERVER_KEY; assert.strictEqual(serverKey('WEBKEY'), 'WEBKEY', '환경변수가 없으면 지금 키 그대로');
process.env.FSG_FB_SERVER_KEY = '  '; assert.strictEqual(serverKey('WEBKEY'), 'WEBKEY', '빈 값이면 지금 키');
process.env.FSG_FB_SERVER_KEY = 'SRVKEY'; assert.strictEqual(serverKey('WEBKEY'), 'SRVKEY', '환경변수가 있으면 서버용 키');
if (keep === undefined) delete process.env.FSG_FB_SERVER_KEY; else process.env.FSG_FB_SERVER_KEY = keep;
/* Firebase 에 로그인하는 Node 프로그램은 모두 serverKey 를 거친다 */
for (const f of ['push-dashboard.js', 'report-data.js', 'voc-summary.js']) {
  const s = fs.readFileSync(path.join(root, 'fsg-report', f), 'utf8');
  assert.ok(/serverKey\(/.test(s), f + ' 가 서버용 키를 읽지 않음');
}
/* 저장소에 키 값을 새로 적지 않는다 */
assert.ok(!/AIza/.test(fs.readFileSync(path.join(root, 'fsg-report', 'server-key.js'), 'utf8')));
console.log('test_server_key: 통과');
