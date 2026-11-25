/* 거울 캘린더 Apps Script 판(apps-script-calendar/mirror.gs, 2026-11-25) — GitHub Actions 판(mirror.js)과 같은 일정을 만드는지,
   가짜 Firebase·가짜 캘린더로 동기화 규칙(만들기·그대로·고치기·지우기·되살리기·0건 멈춤·사람 일정 보존)을 확인. 합성 이름만 쓴다 */
const fs = require('fs'), path = require('path'), crypto = require('crypto'), assert = require('assert');
const root = path.join(__dirname, '..');
const M = require(path.join(root, 'scripts', 'calendar-mirror', 'mirror.js'));
const src = fs.readFileSync(path.join(root, 'apps-script-calendar', 'mirror.gs'), 'utf8');
const ics = fs.readFileSync(path.join(root, 'apps-script-calendar', 'calendar_ics.gs'), 'utf8');
/* 같은 프로젝트에 붙으므로 이름이 겹치면 안 된다 */
const names = s => new Set([...s.matchAll(/^(?:function\s+([\w$]+)|var\s+([\w$]+))/gm)].map(m => m[1] || m[2]));
const both = [...names(src)].filter(n => names(ics).has(n));
assert.deepStrictEqual(both, [], 'calendar_ics.gs 와 이름이 겹침: ' + both.join(','));
assert.ok(!/AIza/.test(src), '키 값을 적지 않는다');

const NOW = Date.UTC(2026, 10, 16, 20, 30), D = n => M.kstDate(NOW, n), HOSP = '가나다시험병원';
function load(env) {
  const Utilities = { DigestAlgorithm: { SHA_256: 'sha256' }, Charset: { UTF_8: 'utf8' },
    computeDigest: (a, s) => [...crypto.createHash('sha256').update(s, 'utf8').digest()].map(b => b > 127 ? b - 256 : b) };
  const f = new Function('Utilities', 'Calendar', 'CalendarApp', 'UrlFetchApp', 'fbGet_', 'ScriptApp', 'Logger', src + '; return {mirrorRun_, mirBuild_, mirRange_, mirEventId_, mirInstitutions_};');
  return f(Utilities, env.Calendar, env.CalendarApp, env.UrlFetchApp, env.fbGet_, env.ScriptApp || {}, { log() {} });
}
function fakeCal() {
  const ev = new Map(); const cal = { getId: () => 'mirror@group' };
  const Calendar = { Events: {
    list(id, q) { return { items: [...ev.values()].filter(e => !q.privateExtendedProperty || ((e.extendedProperties || {}).private || {}).fsgMirror === '1').map(e => JSON.parse(JSON.stringify(e))) }; },
    insert(e, id) { if (ev.has(e.id)) throw new Error('API call to calendar.events.insert failed with error: The requested identifier already exists.'); ev.set(e.id, JSON.parse(JSON.stringify(e))); return e; },
    update(e, id, eid) { ev.set(eid, JSON.parse(JSON.stringify(e))); return e; },
    remove(id, eid) { if (!ev.has(eid)) throw new Error('Not Found'); const x = ev.get(eid); x.status = 'cancelled'; } } };
  return { ev, Calendar, CalendarApp: { getOwnedCalendarsByName: () => [cal] } };
}
const instPage = '<script>const INSTITUTION_LIST = ' + JSON.stringify([HOSP].concat(Array.from({ length: 120 }, (_, i) => '시험기관' + i))) + ';</script>';
const okFetch = { fetch: () => ({ getResponseCode: () => 200, getContentText: () => instPage }) };
let DATA = { west: { [D(0)]: { 테스트1: { am1: '휴가', am2: '휴가' }, 테스트2: { am1: HOSP, pm1: 'ON' }, 테스트3: { night: '석/야' } }, [D(9)]: { 테스트1: { am1: '휴가' } } },
  east: { [D(2)]: { 테스트4: { weekend: '당직' } } } };
const fb = (p, q) => { assert.ok(/^work-schedule\/\w+$/.test(p) && /startAt/.test(q) && /endAt/.test(q), '팀별 7일 토막만'); return DATA[p.split('/')[1]] || null; };

/* 1) 원본(mirror.js)과 같은 일정 */
{ const C = fakeCal(), G = load(Object.assign({ UrlFetchApp: okFetch, fbGet_: fb }, C)), range = G.mirRange_(NOW);
  assert.deepStrictEqual(range, M.dateRange(NOW));
  const a = G.mirBuild_(DATA, range, { [HOSP]: 1 }), b = M.buildEvents(DATA, range, new Set([HOSP]));
  assert.strictEqual(a.cells, b.cells); assert.deepStrictEqual(JSON.parse(JSON.stringify(a.events)), JSON.parse(JSON.stringify(b.events)), '일정·ID 가 원본과 같아야 함');
  assert.strictEqual(a.events.length, 3, '병원 방문·ON 은 빼고, 범위 밖 날짜도 뺀다'); }
/* 2) 동기화 */
{ const C = fakeCal(), G = load(Object.assign({ UrlFetchApp: okFetch, fbGet_: fb }, C));
  C.ev.set('human1', { id: 'human1', summary: '사람이 만든 일정', start: { date: D(0) }, end: { date: D(1) } });
  let r = G.mirrorRun_({ now: NOW }); assert.deepStrictEqual([r.created, r.updated, r.deleted, r.same], [3, 0, 0, 0]);
  r = G.mirrorRun_({ now: NOW }); assert.deepStrictEqual([r.created, r.updated, r.deleted, r.same], [0, 0, 0, 3], '다시 돌리면 아무것도 쓰지 않음');
  const keep = DATA; DATA = JSON.parse(JSON.stringify(DATA)); delete DATA.east; DATA.west[D(0)]['테스트3'] = { night: '당직' };
  r = G.mirrorRun_({ now: NOW }); assert.deepStrictEqual([r.created, r.deleted], [1, 2], '바뀐 상태는 새 ID, 사라진 것은 지움');
  assert.ok(C.ev.get('human1') && !C.ev.get('human1').status, '사람이 만든 일정은 건드리지 않음');
  DATA = keep; r = G.mirrorRun_({ now: NOW }); assert.ok(r.updated >= 1, '지워졌던 같은 ID 는 되살린다(insert 409 → update)');
  DATA = {}; assert.throws(() => G.mirrorRun_({ now: NOW }), /0건/, '0건 읽기면 지우지 않고 멈춤'); DATA = keep; }
/* 3) 거래처 목록을 못 읽으면 멈춤(병원 이름이 새지 않게) */
{ const C = fakeCal(), G = load(Object.assign({ UrlFetchApp: { fetch: () => ({ getResponseCode: () => 404, getContentText: () => '' }) }, fbGet_: fb }, C));
  assert.throws(() => G.mirrorRun_({ now: NOW }), /거래처 목록/); }
/* 4) 거울 캘린더가 없거나 둘이면 멈춤 */
{ const C = fakeCal(); C.CalendarApp = { getOwnedCalendarsByName: () => [] }; const G = load(Object.assign({ UrlFetchApp: okFetch, fbGet_: fb }, C));
  assert.throws(() => G.mirrorRun_({ now: NOW }), /setupMirror/); }
console.log('test_calendar_mirror_gs: 통과 (원본과 같은 일정 · 만들기·그대로·지우기·되살리기·0건 멈춤·사람 일정 보존·거래처 목록 실패 시 멈춤)');
