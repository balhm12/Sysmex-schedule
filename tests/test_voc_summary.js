// 고객 만족도 월 집계 — VOC 대시보드(voc-dashboard.html)와 같은 규칙: 같은 FSR·기관·날짜 응답은 한 방문, 방문건수 집계 기준일(visitAsOf) 이후 응답은 응답률에서 제외
const assert = require('assert'), fs = require('fs'), os = require('os'), path = require('path'), cp = require('child_process');
const { summarizeVoc } = require('../fsg-report/lib/voc');
const rec = (ts, team, fsr, org, q1, q2, q3, comment, flag) => ({ ts, month: ts.slice(0, 7), team, fsr, org, q1, q2, q3, avg: Math.round((q1 + q2 + q3) / 3 * 100) / 100, comment: comment || '', flag: !!flag });
const data = {
  total: { '2026-08': 100, '2026-09': 50 }, visits: { 'FS EAST': { '2026-09': 20 }, 'FS WEST': { '2026-09': 30 } }, visitAsOf: { '2026-09': '2026-09-20' }, updated: '2026-10-01 09:00', startMonth: '2026-09',
  recs: [
    rec('2026-09-01 10:00', 'FS EAST', 'A', 'H1', 5, 5, 5, '친절하고 신속하게 설명해 주셨습니다'),
    rec('2026-09-01 10:05', 'FS EAST', 'A', 'H1', 5, 5, 5, ''),                       // 같은 방문(같은 FSR·기관·날짜) → 응답은 2건, 방문은 1
    rec('2026-09-02 11:00', 'FS EAST', 'B', 'H2', 4, 5, 5, '꼼꼼하게 봐주셨어요'),
    rec('2026-09-10 11:00', 'FS WEST', 'C', 'H3', 5, 5, 4, '설명이 쉬웠습니다'),
    rec('2026-09-15 09:00', 'FS WEST', 'D', 'H4', 2, 3, 3, '답변이 늦었습니다', true),     // 저점수(≤2)
    rec('2026-09-25 09:00', 'FS WEST', 'E', 'H5', 5, 5, 5, '친절'),                    // 집계 기준일(9/20) 이후 → 응답 수에는 들어가지만 응답률 분자에서는 제외
    rec('2026-08-20 09:00', 'FS EAST', 'A', 'H9', 1, 1, 1, '8월 응답'),                  // 다른 달
  ],
};
const s = summarizeVoc(data, ['2026-09']);
assert.strictEqual(s.n, 6); assert.strictEqual(s.visits, 50);
assert.strictEqual(s.responseRate, 8, '방문 4곳(A·H1, B·H2, C·H3, D·H4)만 · 50 중 4 = 8%');
assert.strictEqual(s.respondedVisits, 4, '응답률 분자 = 고유 방문 응답 수(응답 건수 n=6 과 다르다)'); assert(s.respondedVisits <= s.n);
assert(/고유 방문 응답 수/.test(s.rateBasis) && /respondedVisits/.test(s.rateBasis), 'rateBasis 설명');
assert.strictEqual(s.low, 1); assert.strictEqual(s.perfect, 3, 'A 2건 + E'); assert.strictEqual(s.perfectPct, 50);
assert.strictEqual(s.comments, 5, '서술형 있는 응답'); assert.strictEqual(s.flag, 1);
assert.deepStrictEqual(s.q, [4.33, 4.67, 4.5]); assert.strictEqual(s.avg, 4.5);
const east = s.teams.find(t => t.team === 'FS EAST'), west = s.teams.find(t => t.team === 'FS WEST');
assert.deepStrictEqual([east.n, east.visits, east.responseRate], [3, 20, 10], 'EAST 방문 2곳 / 20'); assert.strictEqual(east.respondedVisits, 2, 'EAST 분자 2'); assert.strictEqual(Math.round(1000 * east.respondedVisits / east.visits) / 10, east.responseRate, '분자 ÷ 분모 = 응답률'); assert.deepStrictEqual([west.n, west.visits, west.responseRate], [3, 30, 6.7]);
assert.deepStrictEqual(s.keywords['친절'], { n: 2, pct: 40 }, '서술형 5건 중 2건'); assert.strictEqual(s.keywords['설명'].n, 2); assert.strictEqual(s.keywords['꼼꼼'].n, 1);
assert.strictEqual(s.visitAsOf, '2026-09-20'); assert.strictEqual(s.firstDay, '2026-09-01');
assert.strictEqual(summarizeVoc(data, ['2026-07']).n, 0, '응답 없는 기간');
assert.deepStrictEqual(summarizeVoc(data, ['2026-08', '2026-09']).months, ['2026-08', '2026-09'], '여러 달 합산');
assert.strictEqual(summarizeVoc(data, ['2026-08', '2026-09']).n, 7);
// CLI: --file 로 읽고, 같은 폴더의 report-data 에 satisfaction 으로 합쳐 넣는다
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'fsg-voc-')), out = path.join(tmp, 'out'); fs.mkdirSync(out);
fs.writeFileSync(path.join(tmp, 'data.json'), JSON.stringify(data)); fs.writeFileSync(path.join(out, 'report-data_2026-09.json'), JSON.stringify({ kpi: { ftfr: 90 } }));
const r = cp.spawnSync(process.execPath, [path.join(__dirname, '..', 'fsg-report', 'voc-summary.js'), '--period', '2026-09', '--file', path.join(tmp, 'data.json'), '--out', out], { encoding: 'utf8' });
assert.strictEqual(r.status, 0, r.stderr + r.stdout); assert(/응답 6건/.test(r.stdout) && /합쳐 넣음/.test(r.stdout), r.stdout);
const merged = JSON.parse(fs.readFileSync(path.join(out, 'report-data_2026-09.json'), 'utf8')); assert.strictEqual(merged.satisfaction.n, 6); assert.strictEqual(merged.kpi.ftfr, 90, '기존 값은 그대로');
assert(fs.existsSync(path.join(out, 'voc-summary_2026-09.json')));
assert(!JSON.stringify(merged.satisfaction).includes('"fsr"'), '개인(FSR) 단위는 내지 않음');
fs.rmSync(tmp, { recursive: true, force: true });
console.log('test_voc_summary: OK (대시보드와 같은 응답률 규칙·팀 단위·키워드·CLI 합치기)');
