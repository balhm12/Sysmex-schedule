/**
 * 근무일정표 → Google 캘린더 「FSG 근무일정 거울」 (Apps Script 판, 2026-11-25)
 * ─────────────────────────────────────────────────────────────
 * scripts/calendar-mirror/mirror.js(GitHub Actions 판)를 Apps Script 로 옮긴 것. 규칙은 같다.
 * GitHub 예약 실행이 4~8시간 밀리고 시크릿 4개·서비스 계정이 필요했던 문제를 없앤다.
 * 「FSG 근무일정 캘린더」 프로젝트(calendar_ics.gs 와 같은 프로젝트)에 파일로 추가한다 —
 * 그 파일의 idToken_()·fbGet_()(익명 로그인 + 읽기, 스크립트 속성 FB_API_KEY)를 같이 쓴다.
 * 설치 순서는 README.md 「거울 캘린더」.
 *
 * 지키는 것(원본과 같음)
 *  · Firebase 데이터베이스에는 쓰지 않는다(GET 만). 팀 하나 · 7일 토막만 받는다.
 *  · 이름이 「FSG 근무일정 거울」인 내 캘린더에만 쓴다.
 *  · 이 스크립트가 만든 일정(fsgMirror 표시)만 고치고 지운다. 사람이 만든 일정은 건드리지 않는다.
 *  · 읽은 칸이 0건인데 거울에 일정이 있으면 지우지 않고 멈춘다.
 *  · 병원(거래처) 이름이 적힌 칸은 방문(기본 근무)이라 넣지 않는다 — 거래처 목록을 못 읽으면 멈춘다.
 *  · 로그에는 건수만 남긴다(이름·상태 없음).
 * 필요한 것: 편집기 왼쪽 「서비스」 + → Google Calendar API(식별자 Calendar) 추가.
 */
var MIR_NAME = 'FSG 근무일정 거울';
var MIR_DAYS = 7;
var MIR_TEAMS = ['west', 'east', 'central', 'south', 'fss', 'fsom'];
var MIR_TEAM_LABEL = { west: 'FS WEST', east: 'FS EAST', central: 'FS CENTRAL', south: 'FS SOUTH', fss: 'FSS Team', fsom: 'FSOM Team' };
var MIR_SLOT_KEYS = ['am1', 'am2', 'pm1', 'pm2'];
var MIR_SLOT_LABEL = { am1: '오전1', am2: '오전2', pm1: '오후1', pm2: '오후2' };
var MIR_STATUS_LABEL = { '오전휴가': '오전 휴가', '오후휴가': '오후 휴가', '전화': '전화대기' };
var MIR_BASE_KEYS = { 'ON': 1 };
// 거래처 목록의 원본은 근무일정표 화면 파일(여기에 베끼지 않는다)
var MIR_INST_URL = 'https://balhm12.github.io/Sysmex-schedule/work-schedule.html';

/* ---------- 처음 한 번: 거울 캘린더 만들기 + 매일 05시대 실행 예약 ---------- */
function setupMirror() {
  var cal = mirCalendar_(true);
  ScriptApp.getProjectTriggers().forEach(function (t) { if (t.getHandlerFunction() === 'mirrorDaily') ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('mirrorDaily').timeBased().everyDays(1).atHour(5).nearMinute(20).inTimezone('Asia/Seoul').create();
  Logger.log('거울 캘린더 준비됨 · 매일 05시대 실행 예약됨. 캘린더 ID(공유할 때 씀): ' + cal.getId());
}
function removeMirrorTrigger() {
  ScriptApp.getProjectTriggers().forEach(function (t) { if (t.getHandlerFunction() === 'mirrorDaily') ScriptApp.deleteTrigger(t); });
}
/* 매일 실행(시간 트리거). 실패하면 예외 — Apps Script 가 소유자에게 실패 메일을 보낸다 */
function mirrorDaily() {
  var r = mirrorRun_({});
  Logger.log('거울: 읽은 칸 ' + r.cells + ' · 둘 일정 ' + r.desired + ' · 새로 ' + r.created + ' · 고침 ' + r.updated + ' · 삭제 ' + r.deleted + ' · 그대로 ' + r.same);
  return r;
}

/* ---------- 본체 ---------- */
function mirrorRun_(opt) {
  var nowMs = opt.now != null ? opt.now : Date.now();
  var range = mirRange_(nowMs);
  var inst = opt.institutions || mirInstitutions_();
  // 1) 읽기 — 전부 읽은 뒤에만 캘린더를 건드린다
  var q = 'orderBy=' + encodeURIComponent('"$key"') + '&startAt=' + encodeURIComponent('"' + range.from + '"') + '&endAt=' + encodeURIComponent('"' + range.to + '"');
  var data = {};
  MIR_TEAMS.forEach(function (t) { var j = fbGet_('work-schedule/' + t, q); data[t] = (j && typeof j === 'object') ? j : {}; });
  var built = mirBuild_(data, range, inst);
  // 2) 쓰기 — 거울 캘린더에만
  var cal = mirCalendar_(false);
  var n = mirSync_(cal.getId(), built.events, range, built.cells);
  n.cells = built.cells; n.desired = built.events.length;
  return n;
}

function mirCalendar_(create) {
  var list = CalendarApp.getOwnedCalendarsByName(MIR_NAME);
  if (list.length > 1) throw new Error('이름이 「' + MIR_NAME + '」인 캘린더가 ' + list.length + '개 있습니다 — 하나만 남겨 주세요');
  if (list.length === 1) return list[0];
  if (!create) throw new Error('「' + MIR_NAME + '」 캘린더가 없습니다 — setupMirror 를 먼저 한 번 실행하세요');
  return CalendarApp.createCalendar(MIR_NAME, { summary: '근무일정표 거울(자동 복사 — 여기서 고쳐도 반영되지 않습니다)', timeZone: 'Asia/Seoul' });
}

function mirInstitutions_() {
  var res = UrlFetchApp.fetch(MIR_INST_URL, { muteHttpExceptions: true });
  if (res.getResponseCode() !== 200) throw new Error('거래처 목록을 읽지 못했습니다(' + res.getResponseCode() + ') — 병원 이름이 새지 않게 멈춥니다');
  var m = res.getContentText().match(/const INSTITUTION_LIST = (\[[^\n]*\]);/);
  if (!m) throw new Error('work-schedule.html 에서 거래처 목록(INSTITUTION_LIST)을 찾지 못했습니다');
  var list = JSON.parse(m[1]);
  if (!Array.isArray(list) || list.length < 100) throw new Error('거래처 목록이 비정상입니다');
  var set = {}; list.forEach(function (x) { set[x] = 1; }); return set;
}

/* ---------- 날짜(한국 시간) ---------- */
function mirP2_(n) { return (n < 10 ? '0' : '') + n; }
function mirKst_(nowMs, shift) { var k = new Date(nowMs + 9 * 3600000 + (shift || 0) * 86400000); return k.getUTCFullYear() + '-' + mirP2_(k.getUTCMonth() + 1) + '-' + mirP2_(k.getUTCDate()); }
function mirNext_(date) { var p = date.split('-'); var d = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2] + 1)); return d.getUTCFullYear() + '-' + mirP2_(d.getUTCMonth() + 1) + '-' + mirP2_(d.getUTCDate()); }
function mirRange_(nowMs) { var from = mirKst_(nowMs, 0), to = mirKst_(nowMs, MIR_DAYS - 1); return { from: from, to: to, endExclusive: mirNext_(to) }; }

/* ---------- 칸 → 일정(원본 summarize·buildEvents 와 같은 규칙) ---------- */
function mirSplit_(val) { if (!val) return { key: '', detail: '' }; var s = String(val), i = s.indexOf(':'); return i < 0 ? { key: s.trim(), detail: '' } : { key: s.substring(0, i).trim(), detail: s.substring(i + 1).trim() }; }
function mirLabel_(k) { return MIR_STATUS_LABEL[k] || k; }
function mirSummarize_(entry, inst) {
  if (!entry || typeof entry !== 'object') return null;
  var parts = [], lines = [], seen = {};
  var add = function (t) { if (!seen[t]) { seen[t] = 1; parts.push(t); } };
  var wk = mirSplit_(entry.weekend);
  if (wk.key) { add(mirLabel_(wk.key)); lines.push('주말 · 휴일: ' + mirLabel_(wk.key) + (wk.detail ? ' (' + wk.detail + ')' : '')); }
  MIR_SLOT_KEYS.forEach(function (sk) {
    var sv = mirSplit_(entry[sk]);
    if (!sv.key || MIR_BASE_KEYS[sv.key] || inst[sv.key]) return;
    add(mirLabel_(sv.key)); lines.push(MIR_SLOT_LABEL[sk] + ': ' + mirLabel_(sv.key) + (sv.detail ? ' (' + sv.detail + ')' : ''));
  });
  var ni = mirSplit_(entry.night);
  if (ni.key) { add(ni.key === 'OFF' ? '야간 OFF' : mirLabel_(ni.key)); lines.push('야간: ' + mirLabel_(ni.key) + (ni.detail ? ' (' + ni.detail + ')' : '')); }
  return parts.length ? { status: parts.join('·'), lines: lines } : null;
}
// 일정 ID = 날짜+팀+이름+상태 해시(원본과 같은 값 — GitHub 판에서 넘어와도 중복이 생기지 않는다)
function mirEventId_(date, team, name, status) {
  var b = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, [date, team, name, status].join('|'), Utilities.Charset.UTF_8);
  var h = ''; for (var i = 0; i < b.length; i++) { var v = (b[i] + 256) % 256; h += (v < 16 ? '0' : '') + v.toString(16); }
  return 'fsg' + h.substring(0, 40);
}
function mirBuild_(teamData, range, inst) {
  var out = [], cells = 0;
  MIR_TEAMS.forEach(function (team) {
    var days = teamData[team] || {};
    Object.keys(days).forEach(function (date) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date < range.from || date > range.to) return;
      var day = days[date] || {};
      Object.keys(day).forEach(function (name) {
        cells++;
        var s = mirSummarize_(day[name], inst); if (!s) return;
        out.push({
          id: mirEventId_(date, team, name, s.status),
          summary: name + ' ' + s.status,
          description: s.lines.join('\n') + '\n\n' + (MIR_TEAM_LABEL[team] || team) + ' · 근무일정표 거울(자동 복사, 여기서 고쳐도 반영되지 않습니다)',
          start: { date: date }, end: { date: mirNext_(date) },
          transparency: 'transparent', reminders: { useDefault: false },
          extendedProperties: { 'private': { team: team, fsgMirror: '1' } }
        });
      });
    });
  });
  return { events: out, cells: cells };
}
function mirSame_(a, b) {
  return a.status !== 'cancelled' && a.summary === b.summary && (a.description || '') === (b.description || '') &&
    a.start && a.start.date === b.start.date && a.end && a.end.date === b.end.date && (a.transparency || 'opaque') === b.transparency;
}

/* ---------- 캘린더 맞추기(고급 서비스 Calendar) ---------- */
function mirSync_(calId, desired, range, cells) {
  var items = [], pageToken = null;
  do {
    var j = Calendar.Events.list(calId, {
      timeMin: range.from + 'T00:00:00+09:00', timeMax: range.endExclusive + 'T00:00:00+09:00',
      privateExtendedProperty: 'fsgMirror=1', showDeleted: true, singleEvents: true, maxResults: 2500, pageToken: pageToken || undefined
    });
    (j.items || []).forEach(function (x) { items.push(x); });
    pageToken = j.nextPageToken || null;
  } while (pageToken);
  var existing = items.filter(function (e) {
    return e && e.id && e.extendedProperties && e.extendedProperties['private'] && e.extendedProperties['private'].fsgMirror === '1' &&
      e.start && e.start.date && e.start.date >= range.from && e.start.date <= range.to;
  });
  var live = existing.filter(function (e) { return e.status !== 'cancelled'; });
  if (cells === 0 && live.length >= 1) throw new Error('근무일정표에서 읽은 칸이 0건인데 거울에는 일정이 ' + live.length + '건 있습니다 — 지우지 않고 멈춥니다');
  var byId = {}; existing.forEach(function (e) { byId[e.id] = e; });
  var want = {}; desired.forEach(function (e) { want[e.id] = e; });
  var n = { created: 0, updated: 0, deleted: 0, same: 0 };
  desired.forEach(function (ev) {
    var cur = byId[ev.id];
    if (cur && mirSame_(cur, ev)) { n.same++; return; }
    if (cur) { Calendar.Events.update(mirConfirmed_(ev), calId, ev.id); n.updated++; return; }
    try { Calendar.Events.insert(ev, calId); n.created++; }
    catch (e) {   // 같은 ID 가 이미 있음(지워진 일정 포함) → 되살려 고친다
      if (!/already exists|duplicate|409/i.test(String(e && e.message))) throw e;
      Calendar.Events.update(mirConfirmed_(ev), calId, ev.id); n.updated++;
    }
  });
  live.forEach(function (e) {
    if (want[e.id]) return;
    try { Calendar.Events.remove(calId, e.id); n.deleted++; }
    catch (x) { if (!/not found|deleted|404|410/i.test(String(x && x.message))) throw x; }
  });
  return n;
}
function mirConfirmed_(ev) { var o = {}; for (var k in ev) o[k] = ev[k]; o.status = 'confirmed'; return o; }
