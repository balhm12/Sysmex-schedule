/* 만족도 Apps Script — 저점수 조치(FS 포털 → 「저점수조치」 시트)와 CRM 변환본 시간대
 *
 * 2026-11-16 점검에서 나온 두 가지를 지킨다.
 * ① 1시간 트리거가 `syncLowFollowFromPortal_`(이름이 _ 로 끝남)에 걸려 있었다. 그런 함수는 트리거가 부를 수 없어
 *    설정을 마쳐도 시트가 자동으로 갱신되지 않는다 → 트리거는 `syncLowFollowTrigger` 에 건다.
 * ② xlsx 를 변환한 시트의 시간대가 달라 CRM 시각이 16~17시간 밀려 방문건수가 틀어졌다 → `crmWallClock_`.
 * 포털(fs-talk)의 vocKey 와 같은 키가 나오는지도 고정값으로 확인한다(fs-talk tests/voc_followup.js 와 같은 값).
 */
const fs = require('fs'), path = require('path'), vm = require('vm');
const code = fs.readFileSync(path.join(__dirname, '..', 'apps-script', 'survey_analysis.gs'), 'utf8');
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log('  ✗ ' + m); } };

/* ---------- Apps Script 흉내 ---------- */
const fmtDate = (d, tz, f) => {
  const p = {}; new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' })
    .formatToParts(d).forEach(x => { p[x.type] = x.value; });
  return f.replace(/'T'/g, 'T').replace('yyyy', p.year).replace('MM', p.month).replace('dd', p.day).replace('HH', p.hour).replace('mm', p.minute).replace('ss', p.second);
};
function makeSheet(rows) {
  const data = rows || [];
  const range = (r, c, nr, nc) => ({
    getValues: () => { const o = []; for (let i = 0; i < (nr || 1); i++) { const row = []; for (let j = 0; j < (nc || 1); j++) row.push((data[r - 1 + i] || [])[c - 1 + j] === undefined ? '' : data[r - 1 + i][c - 1 + j]); o.push(row); } return o; },
    getValue: () => (data[r - 1] || [])[c - 1] === undefined ? '' : data[r - 1][c - 1],
    setValues(v) { v.forEach((row, i) => { data[r - 1 + i] = data[r - 1 + i] || []; row.forEach((x, j) => { data[r - 1 + i][c - 1 + j] = x; }); }); return this; },
    clearContent() { for (let i = 0; i < (nr || 1); i++) data[r - 1 + i] = []; while (data.length && !data[data.length - 1].some(x => x !== '' && x != null)) data.pop(); return this; },
    setFontWeight() { return this; }, setBackground() { return this; }, setFontColor() { return this; },
  });
  return { _data: data, getLastRow: () => data.length, getDataRange: () => ({ getValues: () => data.map(r => r.slice()) }), getRange: range,
    clear() { data.length = 0; }, setFrozenRows() {}, setColumnWidth() {}, hideColumns() {} };
}
function world(opt) {
  const props = Object.assign({}, opt.props), triggers = (opt.triggers || []).map(n => ({ getHandlerFunction: () => n })), alerts = [], prompts = (opt.prompts || []).slice();
  const sheets = Object.assign({}, opt.sheets);
  const ss = { getSheetByName: n => sheets[n] || null, insertSheet: n => (sheets[n] = makeSheet([])), getSpreadsheetTimeZone: () => opt.tz || 'Asia/Seoul', toast() {} };
  const ui = { ButtonSet: { OK_CANCEL: 1 }, Button: { OK: 'OK', CANCEL: 'CANCEL' }, alert: m => alerts.push(String(m)),
    prompt: () => { const v = prompts.shift(); return { getSelectedButton: () => v == null ? 'CANCEL' : 'OK', getResponseText: () => v || '' }; } };
  const ctx = {
    console, Intl, Date, Math, JSON, String, Number, Object, Array, RegExp, Error, encodeURIComponent, parseInt, parseFloat, isNaN,
    SpreadsheetApp: { getActiveSpreadsheet: () => ss, getUi: () => ui, openById: () => ss },
    PropertiesService: { getScriptProperties: () => ({ getProperty: k => (k in props ? props[k] : null), setProperty: (k, v) => { props[k] = String(v); }, deleteProperty: k => { delete props[k]; } }) },
    ScriptApp: { getProjectTriggers: () => triggers.slice(), deleteTrigger: t => { const i = triggers.indexOf(t); if (i >= 0) triggers.splice(i, 1); },
      newTrigger: n => { const b = { timeBased: () => b, everyHours: () => b, everyMinutes: () => b, after: () => b, create: () => { const t = { getHandlerFunction: () => n }; triggers.push(t); return t; } }; return b; } },
    UrlFetchApp: { fetch: url => { ctx._urls.push(url); const r = opt.fetch(url); return { getResponseCode: () => r.code, getContentText: () => r.body }; } },
    Utilities: { formatDate: fmtDate }, Logger: { log() {} }, Session: {}, MailApp: {}, DriveApp: {}, LockService: {}, HtmlService: {}, ContentService: {}, MimeType: {},
    _urls: [],
  };
  vm.createContext(ctx);
  vm.runInContext(code + '\n;this.API = { vocKeyOf_, VOC_REASONS, LOWFU, LOWFU_HEAD, lowFollowRows_, syncLowFollowFromPortal_, syncLowFollowTrigger, syncLowFollow, setupLowFollowSync, showLowFollowStatus, crmWallClock_ };', ctx);
  return { api: ctx.API, props, triggers, alerts, sheets, urls: ctx._urls };
}
const KST = (y, m, d, h, mi) => new Date(Date.UTC(y, m - 1, d, h - 9, mi));
const HEAD = ['응답일시', '월', '지역', '기관명(표준)', '담당FSR', '팀', '직급', '장비모델', '서비스형태', '신속성·일정', '전문성·해결', '응대·마무리', '평균점수', '서술형의견', '기관명상태', '확인필요'];
const row = (ts, org, fsr, q1, q2, q3, txt) => [ts, '', '', org, fsr, 'FS WEST', 'T2', 'XN-1000', 'A/S', q1, q2, q3, (q1 + q2 + q3) / 3, txt || '', '표준화', ''];
const clean = () => makeSheet([HEAD,
  row(KST(2026, 10, 20, 10, 0), '시월병원', '테스트1', 3, 5, 5),            // 11/1 전 3점 → 그때 기준(≤2)으로는 저점수 아님
  row(KST(2026, 11, 10, 14, 2), '테스트검사센터', '테스트2', 5, 5, 5),      // 만점
  row(KST(2026, 11, 11, 21, 15), '테스트의료원', '테스트3', 3, 5, 5),       // 저점수 — 포털 시험과 같은 고정값(vjq6wnj)
]);
const DONE_AT = Date.UTC(2026, 10, 12, 1, 30);   // 2026-11-12 10:30 KST
const portal = { vjq6wnj: { s: 'done', r: '조치 지연', t: '전화로 사과하고 다음 날 재방문', by: '팀장A', at: DONE_AT, ts: DONE_AT } };
const okFetch = () => ({ code: 200, body: JSON.stringify(portal) });

/* ---------- 1. 정적 확인 ---------- */
const handlers = (code.match(/ScriptApp\.newTrigger\(([^)]*)\)/g) || []).map(s => s.slice(21, -1).trim());
ok(handlers.length >= 6, '트리거 설치 코드를 찾지 못함');
handlers.forEach(h => ok(!/_['"]?$/.test(h), '트리거가 _ 로 끝나는 함수에 걸려 있음(돌지 않는다): ' + h));
ok(/\nfunction syncLowFollowTrigger\(\)/.test(code), 'syncLowFollowTrigger 가 없음');
['setupLowFollowSync', 'syncLowFollow', 'showLowFollowStatus'].forEach(f => ok(new RegExp("\\.addItem\\('[^']*', '" + f + "'\\)").test(code), '메뉴에 ' + f + ' 가 없음'));
ok(/const tz = DASH_WEB\.TZ;[^\n]*\n\s*const fmt = v =>/.test(code), '저점수 행의 응답일시를 Firebase 내보내기와 같은 시간대(DASH_WEB.TZ)로 만들지 않음 — 포털 키와 어긋날 수 있다');

/* ---------- 2. 포털과 같은 키·사유 ---------- */
const W0 = world({ sheets: { '정제데이터': clean() }, fetch: okFetch });
[['테스트3', '테스트의료원', '2026-11-11 21:15', 'vjq6wnj'], ['테스트2', '테스트검사센터', '2026-11-10 14:02', 'vx9m42t'], ['A', '', '2026-01-01 00:00', 'v1bcd90g'], ['홍길동', '가나다라마바사 의료원 (분원)', '2026-02-29 09:05', 'vnjzog1']]
  .forEach(v => ok(W0.api.vocKeyOf_(v[0], v[1], v[2]) === v[3], 'vocKeyOf_(' + v.slice(0, 3).join('|') + ') 가 포털 고정값 ' + v[3] + ' 과 다름'));
ok(JSON.stringify(Array.from(W0.api.VOC_REASONS)) === JSON.stringify(['조치 지연', '재방문 발생', '부품 수급', '설명·안내 부족', '장비 상태', '응대 태도', '고객 착오', '기타']), 'VOC_REASONS 가 포털 목록과 다름');

/* ---------- 3. 최초 설정 → 시트 생성 + 트리거 ---------- */
const W1 = world({ sheets: { '정제데이터': clean() }, fetch: okFetch, prompts: ['https://example-rtdb.firebasedatabase.app/', 'SECRET-VALUE'], triggers: ['syncLowFollowFromPortal_', 'autoCrmRefreshTrigger'] });
W1.api.setupLowFollowSync();
const sh1 = W1.sheets['저점수조치'];
ok(!!sh1, '설정 뒤 「저점수조치」 시트가 생기지 않음');
ok(sh1 && sh1._data.length === 2, '저점수 응답 1건만 옮겨져야 함(11/1 전 3점·만점은 제외): ' + (sh1 ? sh1._data.length - 1 : '-') + '줄');
const r1 = sh1 ? sh1._data[1] : [];
ok(r1[0] === '2026-11-11 21:15' && r1[1] === '테스트의료원' && r1[4] === 3, '응답일시·기관·최저점이 맞지 않음: ' + JSON.stringify(r1.slice(0, 5)));
ok(r1[9] === '조치 완료' && r1[10] === '조치 지연' && r1[11] === '전화로 사과하고 다음 날 재방문' && r1[12] === '팀장A' && r1[13] === '2026-11-12 10:30', '포털의 조치 기록이 줄에 붙지 않음: ' + JSON.stringify(r1.slice(9, 14)));
ok(r1[14] === 'vjq6wnj', '키가 포털과 다름: ' + r1[14]);
const names1 = W1.triggers.map(t => t.getHandlerFunction());
ok(names1.filter(n => n === 'syncLowFollowTrigger').length === 1, '1시간 트리거가 syncLowFollowTrigger 로 설치되지 않음: ' + names1.join(','));
ok(names1.indexOf('syncLowFollowFromPortal_') < 0, '돌지 않는 예전 트리거가 남아 있음');
ok(names1.indexOf('autoCrmRefreshTrigger') >= 0, '다른 트리거를 지움');
ok(W1.props.FSTALK_URL === 'https://example-rtdb.firebasedatabase.app' && W1.props.FSTALK_SECRET === 'SECRET-VALUE', '주소 끝 / 정리·비밀 저장이 안 됨');
ok(/talk\/vocfu\.json\?auth=/.test(W1.urls[0] || ''), 'talk/vocfu 를 읽지 않음');
ok(W1.alerts.some(a => /연동 완료/.test(a)) && !W1.alerts.join('').includes('SECRET-VALUE') && !(W1.props.LOWFU_LAST || '').includes('SECRET-VALUE'), '완료 안내가 없거나 비밀값이 화면·기록에 남음');

/* 시트의 시간대가 달라도 키는 같아야 한다(포털은 한국 시각 글자로 키를 만든다) */
const W2 = world({ tz: 'America/Los_Angeles', sheets: { '정제데이터': clean() }, fetch: okFetch, props: { FSTALK_URL: 'https://x', FSTALK_SECRET: 's' } });
W2.api.syncLowFollowFromPortal_();
ok(W2.sheets['저점수조치']._data[1][14] === 'vjq6wnj' && W2.sheets['저점수조치']._data[1][0] === '2026-11-11 21:15', '시트 시간대가 다르면 키가 달라짐');

/* ---------- 4. 트리거용 함수·실패 처리·상태 ---------- */
const W3 = world({ sheets: { '정제데이터': clean() }, fetch: okFetch, props: { FSTALK_URL: 'https://x', FSTALK_SECRET: 's' } });
W3.api.syncLowFollowTrigger();
ok(!!W3.sheets['저점수조치'] && /자동 · 저점수 1건\(조치 완료 1건\)/.test(W3.props.LOWFU_LAST || ''), '트리거용 함수가 시트를 만들지 않거나 결과를 적지 않음: ' + W3.props.LOWFU_LAST);
W3.api.syncLowFollowTrigger();
ok(/바뀐 줄 0개/.test(W3.props.LOWFU_LAST), '바뀐 것이 없는데 다시 씀');
const W4 = world({ sheets: { '정제데이터': clean() }, fetch: () => ({ code: 401, body: '{"error":"Unauthorized"}' }), props: { FSTALK_URL: 'https://x', FSTALK_SECRET: 'bad' } });
let threw = false; try { W4.api.syncLowFollowTrigger(); } catch (e) { threw = /401/.test(e.message); }
ok(threw && /자동 · 실패: .*401/.test(W4.props.LOWFU_LAST || ''), '포털 읽기 실패가 실행 기록·상태에 남지 않음');
const W5 = world({ sheets: { '정제데이터': clean() }, fetch: () => ({ code: 401, body: '' }), prompts: ['https://x', 'wrong'] });
W5.api.setupLowFollowSync();
ok(!('FSTALK_SECRET' in W5.props) && !W5.triggers.length && W5.alerts.some(a => /연결 실패/.test(a)), '설정 실패 때 비밀을 지우지 않거나 트리거를 설치함');
const W6 = world({ sheets: { '정제데이터': clean() }, fetch: okFetch, triggers: ['syncLowFollowFromPortal_'] });
W6.api.showLowFollowStatus();
const st = W6.alerts.join('\n');
ok(/DB 주소: 없음/.test(st) && /비밀: 없음/.test(st) && /꺼짐/.test(st) && /예전 트리거 1개/.test(st) && /시트: 없음/.test(st) && /저점수 응답: 1건/.test(st) && /연동 설정/.test(st), '연동 상태 안내가 부족함:\n' + st);
let threw2 = false; try { W6.api.syncLowFollowTrigger(); } catch (e) { threw2 = /설정되지 않았습니다/.test(e.message); }
ok(threw2 && !W6.sheets['저점수조치'], '설정 전인데 조용히 지나감');

/* ---------- 5. CRM 변환본 시간대 ---------- */
const wc = W0.api.crmWallClock_;
const la = (y, m, d, h, mi, off) => new Date(Date.UTC(y, m - 1, d, h + off, mi));   // 태평양 시간으로 읽힌 「벽시계」 시각
const seoul = d => fmtDate(d, 'Asia/Seoul', 'yyyy-MM-dd HH:mm');
ok(seoul(wc(la(2026, 10, 5, 10, 0, 7), 'America/Los_Angeles')) === '2026-10-05 10:00', '여름(태평양 일광절약) 시각이 그대로 돌아오지 않음: ' + seoul(wc(la(2026, 10, 5, 10, 0, 7), 'America/Los_Angeles')));
ok(seoul(wc(la(2026, 11, 20, 23, 30, 8), 'America/Los_Angeles')) === '2026-11-20 23:30', '겨울 시각이 그대로 돌아오지 않음');
ok(seoul(la(2026, 10, 5, 10, 0, 7)) === '2026-10-06 02:00', '시험 전제가 틀림 — 고치기 전에는 16시간 밀려 다음 날이 된다');
const k = KST(2026, 10, 5, 10, 0);
ok(wc(k, 'Asia/Seoul') === k && wc(k, '') === k && wc('글자', 'America/Los_Angeles') === '글자' && wc(46341.5, 'UTC') === 46341.5, '같은 시간대·날짜 아닌 값을 건드림');
ok(/let srcTz = ''; try \{ srcTz = book\.getSpreadsheetTimeZone\(\)/.test(code) && /cols\.map\(col => crmWallClock_\(col\[r\]\[0\], srcTz\)\)/.test(code), 'crmReadFileCols_ 가 변환본의 시간대를 보정하지 않음');

console.log(fail ? '\n저점수 조치·CRM 시간대: ' + pass + ' 통과 / ' + fail + ' 실패' : '저점수 조치·CRM 시간대: ' + pass + '항목 통과');
process.exit(fail ? 1 : 0);
