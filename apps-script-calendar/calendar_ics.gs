/**
 * FSG 근무일정 → 휴대폰 캘린더 구독(.ics)
 * ─────────────────────────────────────────────────────────────
 * 근무일정표(work-schedule.html)의 Firebase 데이터를 읽어 캘린더 구독 파일(iCalendar)로
 * 내보내는 중계입니다. 아이폰·안드로이드 캘린더에 주소를 한 번 등록하면 그 뒤로는
 * 캘린더 앱이 알아서 다시 받아 갑니다(읽기 전용 — 폰에서 고쳐도 일정표에는 반영되지 않습니다).
 *
 * 이 파일은 **만족도 Apps Script(apps-script/survey_analysis.gs)와 완전히 다른 프로젝트**입니다.
 * 같은 프로젝트에 넣지 마세요. GitHub Actions 자동 배포도 걸려 있지 않습니다(사람이 붙여넣습니다).
 * 설정 절차는 같은 폴더의 README.md.
 *
 * 설계상 지켜야 할 것
 *  · 저장소(공개)에는 이름·주소를 남기지 않는다. 사람별 열쇠는 Firebase 에 둔 소금(salt)으로 만든다.
 *  · Firebase 다운로드가 요금을 좌우한다. 그래서 ① 팀 하나 · 기간 한 토막만 받고
 *    ② 받은 것을 30분간 캐시한다. 구독자가 44명이어도 Firebase 는 팀당 시간에 두 번만 읽힌다.
 *  · 쓰기는 하지 않는다. 이 스크립트는 읽기 전용이다.
 */

var FB_URL = 'https://sysmex-system-schedule-default-rtdb.firebaseio.com';

var DAYS_BACK = 30;        // 과거 며칠까지 넣을지 (지난 일정은 캘린더에서 쓸모가 적다)
var DAYS_AHEAD = 120;      // 미래 며칠까지
// 받은 일정 데이터를 캐시하는 시간(근무 시간대). 캘린더 앱이 아무리 자주 받아 가도
// Firebase 는 팀당 이 간격에 한 번만 읽힙니다. 30분이면 낮에 바뀐 일정이 비교적 빨리 갑니다.
var DATA_CACHE_SEC = 1800;

// 근무 시간 밖에는 중계를 쉽니다(2026-11-17 사용자 요청 「17시부터 08시까지는 안 받고」).
// 그 시간대(한국 시간)에는 캐시를 아침까지 길게 잡아 Firebase 를 거의 읽지 않습니다.
// 캘린더 앱이 밤에 받아 가도 받아 둔 내용을 그대로 주므로 일정이 비거나 지워지지 않습니다.
// Apps Script 캐시는 최대 6시간이라 밤 사이 두세 번은 읽힙니다(30회 → 3회 정도).
var QUIET_FROM = 17; // 17시부터
var QUIET_TO = 8;    // 다음 날 8시까지
var CACHE_MAX_SEC = 21600; // Apps Script 캐시 상한 (6시간)
var SALT_CACHE_SEC = 21600;
var ROSTER_CACHE_SEC = 3600;
var TOKEN_LEN = 24;        // 열쇠 길이(16진수 글자 수)

var TEAM_LABEL = {
  west: 'FS WEST', east: 'FS EAST', central: 'FS CENTRAL',
  south: 'FS SOUTH', fss: 'FSS Team', fsom: 'FSOM Team'
};

// 화면(work-schedule.html)의 표시 이름과 같게 맞춥니다. 목록에 없는 값은 그대로 씁니다.
var STATUS_LABEL = {
  '오전휴가': '오전 휴가',
  '오후휴가': '오후 휴가',
  '휴가': '휴가',
  '전화': '전화대기'
};

var SLOT_KEYS = ['am1', 'am2', 'pm1', 'pm2'];
var SLOT_LABEL = { am1: '오전1', am2: '오전2', pm1: '오후1', pm2: '오후2' };

// ============================================================
// 입구
// ============================================================
function doGet(e) {
  var k = (e && e.parameter && e.parameter.k) || '';
  if (!k) {
    return plain_('이 주소는 근무일정표의 「캘린더 연동」에서 받은 개인 주소로만 열립니다.');
  }
  try {
    var who = resolveKey_(k);
    if (!who) {
      return plain_('주소가 올바르지 않습니다. 근무일정표 → 캘린더 연동에서 주소를 다시 받아 주세요.');
    }
    return ContentService.createTextOutput(icsFor_(who))
      .setMimeType(ContentService.MimeType.ICAL);
  } catch (err) {
    // 일부러 캘린더 형식으로 답하지 않습니다. 빈 캘린더를 주면 캘린더 앱이 기존 일정을
    // 전부 지워 버리므로, 오류일 때는 형식이 아닌 답을 줘서 앞서 받은 내용을 남겨 둡니다.
    return plain_('일정을 불러오지 못했습니다: ' + (err && err.message ? err.message : err));
  }
}

function plain_(msg) {
  return ContentService.createTextOutput(msg).setMimeType(ContentService.MimeType.TEXT);
}

// ============================================================
// 열쇠 — Firebase 의 소금 + 이름(또는 팀)을 해시한 값
// ============================================================
function tok_(salt, kind, value) {
  var raw = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256, salt + '|' + kind + '|' + value, Utilities.Charset.UTF_8);
  var hex = '';
  for (var i = 0; i < raw.length; i++) {
    var b = raw[i] < 0 ? raw[i] + 256 : raw[i];
    hex += (b < 16 ? '0' : '') + b.toString(16);
  }
  return hex.substring(0, TOKEN_LEN);
}

function resolveKey_(k) {
  k = String(k).toLowerCase().replace(/[^0-9a-f]/g, '');
  if (k.length !== TOKEN_LEN) return null;
  var salt = calSalt_();
  if (!salt) throw new Error('캘린더 설정(소금)이 없습니다');

  for (var tk in TEAM_LABEL) {
    if (tok_(salt, 'team', tk) === k) return { kind: 'team', team: tk, name: '' };
  }
  var roster = rosterAll_();
  for (var i = 0; i < roster.length; i++) {
    if (tok_(salt, 'me', roster[i].name) === k) {
      return { kind: 'me', team: roster[i].team, name: roster[i].name };
    }
  }
  return null;
}

function calSalt_() {
  var c = CacheService.getScriptCache();
  var hit = c.get('salt');
  if (hit) return hit;
  var cfg = fbGet_('work-schedule/calendar', '') || {};
  var salt = cfg.salt || '';
  if (salt) c.put('salt', salt, SALT_CACHE_SEC);
  return salt;
}

// 명단은 근무일정표의 「팀원 관리」가 Firebase 에 저장한 teamRoster 를 그대로 씁니다.
// 화면도 이 값을 코드 기본값보다 우선하므로, 둘이 어긋나는 일이 없습니다.
function rosterAll_() {
  var c = CacheService.getScriptCache();
  var hit = cacheGet_('roster');
  if (hit) return JSON.parse(hit);
  var raw = fbGet_('work-schedule/teamRoster', '') || {};
  var out = [];
  for (var tk in TEAM_LABEL) {
    var list = raw[tk] || [];
    for (var i = 0; i < list.length; i++) {
      var nm = list[i] && (list[i].name || list[i]);
      if (nm) out.push({ name: String(nm), team: tk });
    }
  }
  cachePut_('roster', JSON.stringify(out), ROSTER_CACHE_SEC);
  return out;
}

// ============================================================
// Firebase 읽기 (익명 인증 — 화면과 같은 방식)
// ============================================================
function idToken_() {
  var c = CacheService.getScriptCache();
  var t = c.get('idt');
  if (t) return t;

  var props = PropertiesService.getScriptProperties();
  var key = props.getProperty('FB_API_KEY');
  if (!key) throw new Error('스크립트 속성 FB_API_KEY 가 없습니다');

  var tok = '';
  var rt = props.getProperty('FB_REFRESH');
  if (rt) {
    var r = UrlFetchApp.fetch('https://securetoken.googleapis.com/v1/token?key=' + key, {
      method: 'post',
      payload: { grant_type: 'refresh_token', refresh_token: rt },
      muteHttpExceptions: true
    });
    if (r.getResponseCode() === 200) {
      tok = JSON.parse(r.getContentText()).id_token || '';
    } else {
      props.deleteProperty('FB_REFRESH'); // 못 쓰는 값이면 버리고 새로 로그인
    }
  }
  if (!tok) {
    // 익명 계정을 매번 새로 만들지 않도록, 처음 한 번만 만들고 갱신 열쇠를 보관합니다.
    var s = UrlFetchApp.fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + key, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({ returnSecureToken: true }),
      muteHttpExceptions: true
    });
    if (s.getResponseCode() !== 200) throw new Error('익명 로그인 실패 (' + s.getResponseCode() + ')');
    var sj = JSON.parse(s.getContentText());
    tok = sj.idToken;
    if (sj.refreshToken) props.setProperty('FB_REFRESH', sj.refreshToken);
  }
  c.put('idt', tok, 3000); // 토큰은 1시간짜리라 50분만 재사용
  return tok;
}

function fbGet_(path, query) {
  var url = FB_URL + '/' + path + '.json?auth=' + encodeURIComponent(idToken_()) + (query ? '&' + query : '');
  var res = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  var code = res.getResponseCode();
  if (code === 401 || code === 403) {
    CacheService.getScriptCache().remove('idt');
    throw new Error('데이터베이스 접근이 거부되었습니다 (' + code + ')');
  }
  if (code !== 200) throw new Error('데이터베이스 응답 ' + code);
  var txt = res.getContentText();
  return (txt && txt !== 'null') ? JSON.parse(txt) : null;
}

// 팀 하나 · 기간 한 토막만 받습니다 (전체를 받으면 요금이 올라갑니다).
function teamData_(tk) {
  var ck = 'd:' + tk;
  var hit = cacheGet_(ck);
  if (hit) return JSON.parse(hit);
  var q = 'orderBy=' + encodeURIComponent('"$key"') +
    '&startAt=' + encodeURIComponent('"' + isoShift_(-DAYS_BACK) + '"') +
    '&endAt=' + encodeURIComponent('"' + isoShift_(DAYS_AHEAD) + '"');
  var obj = fbGet_('work-schedule/' + tk, q) || {};
  cachePut_(ck, JSON.stringify(obj), cacheSecFor_(Date.now()));
  return obj;
}

/**
 * 지금 받은 자료를 얼마나 오래 들고 있을지 정합니다.
 * 근무 시간(08~17시)에는 DATA_CACHE_SEC, 그 밖에는 아침까지(캐시 상한 6시간).
 * 시각을 인자로 받는 이유는 시험에서 시간을 고정해 확인하기 위해서입니다.
 */
function cacheSecFor_(nowMs) {
  var k = new Date(nowMs + 9 * 3600000); // 한국 시간
  var h = k.getUTCHours(), m = k.getUTCMinutes();
  var night = (h >= QUIET_FROM) || (h < QUIET_TO);
  if (!night) return DATA_CACHE_SEC;
  var hoursLeft = (h >= QUIET_FROM) ? (24 - h + QUIET_TO) : (QUIET_TO - h);
  var sec = hoursLeft * 3600 - m * 60;
  return Math.max(DATA_CACHE_SEC, Math.min(CACHE_MAX_SEC, sec));
}

// 캐시는 한 칸에 100KB 까지라, 긴 값은 토막으로 나눠 담습니다.
function cachePut_(key, text, sec) {
  var c = CacheService.getScriptCache();
  var CH = 90000, parts = [];
  for (var i = 0; i < text.length; i += CH) parts.push(text.substring(i, i + CH));
  if (parts.length > 8) return; // 너무 크면 캐시하지 않고 그냥 넘어갑니다
  var map = { };
  for (var j = 0; j < parts.length; j++) map[key + ':' + j] = parts[j];
  map[key + ':n'] = String(parts.length);
  c.putAll(map, sec);
}

function cacheGet_(key) {
  var c = CacheService.getScriptCache();
  var n = parseInt(c.get(key + ':n'), 10);
  if (!n) return null;
  var out = '';
  for (var i = 0; i < n; i++) {
    var p = c.get(key + ':' + i);
    if (p === null || p === undefined) return null; // 한 토막이라도 빠지면 못 쓴다
    out += p;
  }
  return out;
}

// ============================================================
// 상태 요약 — 화면의 한 칸을 캘린더 제목 한 줄로
// ============================================================
function splitKey_(val) {
  if (!val) return { key: '', detail: '' };
  var s = String(val);
  var i = s.indexOf(':');
  if (i < 0) return { key: s.trim(), detail: '' };
  return { key: s.substring(0, i).trim(), detail: s.substring(i + 1).trim() };
}

function label_(key) {
  return STATUS_LABEL[key] || key;
}

/**
 * 반환: {title, desc, plain} — 넣을 내용이 없으면 null.
 * plain = 평일 ON 뿐인 날(팀 주소에서는 넣지 않습니다 — 매일 전원이 떠서 가려집니다).
 */
function summary_(entry, team) {
  if (!entry) return null;
  var wk = splitKey_(entry.weekend);
  var ni = splitKey_(entry.night);
  var parts = [], lines = [];

  if (wk.key) {
    parts.push(label_(wk.key));
    lines.push('주말 · 휴일: ' + label_(wk.key) + (wk.detail ? ' (' + wk.detail + ')' : ''));
  }

  var keys = [], seen = {};
  for (var i = 0; i < SLOT_KEYS.length; i++) {
    var sv = splitKey_(entry[SLOT_KEYS[i]]);
    if (!sv.key) continue;
    lines.push(SLOT_LABEL[SLOT_KEYS[i]] + ': ' + label_(sv.key) + (sv.detail ? ' (' + sv.detail + ')' : ''));
    if (!seen[sv.key]) { seen[sv.key] = 1; keys.push(sv.key); }
  }
  for (var j = 0; j < keys.length; j++) parts.push(label_(keys[j]));

  if (ni.key) {
    parts.push(label_(ni.key));
    lines.push('야간: ' + label_(ni.key) + (ni.detail ? ' (' + ni.detail + ')' : ''));
  }

  if (!parts.length) return null;
  return {
    title: parts.join(' · '),
    desc: lines.join('\n') + '\n\n' + (TEAM_LABEL[team] || team) + ' 근무일정표',
    plain: !wk.key && !ni.key && keys.length === 1 && keys[0] === 'ON'
  };
}

// ============================================================
// iCalendar 만들기
// ============================================================
function icsFor_(who) {
  var data = teamData_(who.team) || {};
  var dates = [];
  for (var d in data) if (/^\d{4}-\d{2}-\d{2}$/.test(d)) dates.push(d);
  dates.sort();

  var body = [];
  for (var i = 0; i < dates.length; i++) {
    var day = data[dates[i]] || {};
    if (who.kind === 'me') {
      var s = summary_(day[who.name], who.team);
      if (s) body.push(vevent_(dates[i], who.name, s.title, s.desc, day[who.name]));
    } else {
      var names = [];
      for (var nm in day) names.push(nm);
      names.sort();
      for (var j = 0; j < names.length; j++) {
        var t = summary_(day[names[j]], who.team);
        if (!t || t.plain) continue;
        body.push(vevent_(dates[i], names[j], names[j] + ' ' + t.title, t.desc, day[names[j]]));
      }
    }
  }

  var name = who.kind === 'me'
    ? (who.name + ' 근무일정')
    : ((TEAM_LABEL[who.team] || who.team) + ' 근무일정');

  var head = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Sysmex Korea FSG//work-schedule//KO',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:' + esc_(name),
    'X-WR-CALDESC:' + esc_('FSG 근무일정표 (읽기 전용)'),
    'X-WR-TIMEZONE:Asia/Seoul',
    'REFRESH-INTERVAL;VALUE=DURATION:PT4H',
    'X-PUBLISHED-TTL:PT4H'
  ];
  return fold_(head.concat(body).concat(['END:VCALENDAR']));
}

function vevent_(date, name, title, desc, entry) {
  var stamp = stampOf_(entry);
  return [
    'BEGIN:VEVENT',
    'UID:' + date + '-' + hash8_(name) + '@fsg-work-schedule',
    'DTSTAMP:' + stamp,
    'LAST-MODIFIED:' + stamp,
    'DTSTART;VALUE=DATE:' + date.replace(/-/g, ''),
    'DTEND;VALUE=DATE:' + nextDay_(date).replace(/-/g, ''),
    'SUMMARY:' + esc_(title),
    'DESCRIPTION:' + esc_(desc),
    'TRANSP:TRANSPARENT',
    'END:VEVENT'
  ].join('\n');
}

// 등록 시각을 그대로 씁니다. 받을 때마다 값이 바뀌면 캘린더 앱이 "변경됨"으로 보고
// 알림을 다시 띄우는 기기가 있어서, 내용이 같으면 같은 값이 나오게 합니다.
function stampOf_(entry) {
  var at = entry && entry.at;
  var ms = null;
  if (typeof at === 'number') ms = at;
  else if (typeof at === 'string' && at) { var p = Date.parse(at); if (!isNaN(p)) ms = p; }
  if (ms === null) return '20260101T000000Z';
  var d = new Date(ms);
  function p2(n) { return (n < 10 ? '0' : '') + n; }
  return d.getUTCFullYear() + p2(d.getUTCMonth() + 1) + p2(d.getUTCDate()) + 'T' +
    p2(d.getUTCHours()) + p2(d.getUTCMinutes()) + p2(d.getUTCSeconds()) + 'Z';
}

// 이름은 UID 에 그대로 넣지 않습니다(파일에 남을 이유가 없습니다).
function hash8_(name) {
  var h = 0;
  for (var i = 0; i < name.length; i++) { h = ((h << 5) - h + name.charCodeAt(i)) | 0; }
  return ('0000000' + (h >>> 0).toString(16)).slice(-8);
}

function esc_(s) {
  return String(s === null || s === undefined ? '' : s)
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

// iCalendar 한 줄은 75옥텟까지라 긴 줄은 접어야 합니다(한글은 한 글자 3바이트).
function fold_(lines) {
  var out = [];
  var all = lines.join('\n').split('\n');
  for (var i = 0; i < all.length; i++) {
    var line = all[i], cur = '', bytes = 0, limit = 73;
    for (var j = 0; j < line.length; j++) {
      var ch = line.charAt(j);
      var n = ch.charCodeAt(0) < 0x80 ? 1 : (ch.charCodeAt(0) < 0x800 ? 2 : 3);
      if (bytes + n > limit) { out.push(cur); cur = ' '; bytes = 1; limit = 74; }
      cur += ch; bytes += n;
    }
    out.push(cur);
  }
  return out.join('\r\n') + '\r\n';
}

// ============================================================
// 날짜
// ============================================================
function isoShift_(days) {
  var d = new Date(Date.now() + days * 86400000);
  // 한국 시간 기준 날짜로 자릅니다 (서버 시간대와 무관하게 같은 결과가 나오도록).
  var k = new Date(d.getTime() + 9 * 3600000);
  function p2(n) { return (n < 10 ? '0' : '') + n; }
  return k.getUTCFullYear() + '-' + p2(k.getUTCMonth() + 1) + '-' + p2(k.getUTCDate());
}

function nextDay_(date) {
  var p = date.split('-');
  var d = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2] + 1));
  function p2(n) { return (n < 10 ? '0' : '') + n; }
  return d.getUTCFullYear() + '-' + p2(d.getUTCMonth() + 1) + '-' + p2(d.getUTCDate());
}

// ============================================================
// 설정 확인용 — 편집기에서 직접 실행합니다(웹 앱과 무관).
// ============================================================
function checkSetup() {
  var salt = calSalt_();
  Logger.log('소금(salt): ' + (salt ? '있음 (' + salt.length + '자)' : '없음 — Firebase work-schedule/calendar/salt 를 넣어야 합니다'));
  var roster = rosterAll_();
  Logger.log('명단: ' + roster.length + '명');
  var byTeam = {};
  for (var i = 0; i < roster.length; i++) byTeam[roster[i].team] = (byTeam[roster[i].team] || 0) + 1;
  Logger.log('팀별: ' + JSON.stringify(byTeam));
  for (var tk in TEAM_LABEL) {
    Logger.log(TEAM_LABEL[tk] + ' 팀 주소 열쇠: ' + (salt ? tok_(salt, 'team', tk) : '-'));
  }
}
