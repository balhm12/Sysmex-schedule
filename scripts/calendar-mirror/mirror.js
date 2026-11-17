#!/usr/bin/env node
/**
 * 근무일정표 → Google 캘린더 「FSG 근무일정 거울」 (읽기 전용 거울)
 * ─────────────────────────────────────────────────────────────
 * 매일 05:30(한국 시간) GitHub Actions 가 한 번 돌립니다(.github/workflows/calendar-mirror.yml).
 * 근무일정표(Firebase work-schedule)에서 오늘부터 7일치만 읽어, 기본 근무가 아닌 상태를
 * 전용 캘린더 하나에 종일 일정으로 복사합니다. 설정 절차는 같은 폴더 README.md.
 *
 * 지키는 것
 *  · Firebase 데이터베이스에는 쓰지 않는다(GET 만).
 *  · 팀 하나 · 7일 토막만 받는다(전체 트리·월 전체를 받지 않는다 — 다운로드가 요금을 좌우한다).
 *  · 이름이 「FSG 근무일정 거울」인 캘린더에만 쓴다. 다른 캘린더 ID 가 들어오면 멈춘다.
 *  · 이 스크립트가 만든 일정(fsgMirror 표시)만 고치고 지운다.
 *  · 로그에 이름·상태·비밀값을 찍지 않는다(공개 저장소의 Actions 로그는 누구나 본다). 건수만 찍는다.
 *  · 하나라도 실패하면 오류로 끝난다(워크플로 실패 → GitHub 알림).
 *
 * 의존 패키지 없음 — Node 20 내장 fetch·crypto 만 씁니다.
 */
'use strict';
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const MIRROR_NAME = 'FSG 근무일정 거울';
const DAYS = 7;                       // 오늘 포함 7일
const TEAMS = ['west', 'east', 'central', 'south', 'fss', 'fsom'];
const TEAM_LABEL = {
  west: 'FS WEST', east: 'FS EAST', central: 'FS CENTRAL',
  south: 'FS SOUTH', fss: 'FSS Team', fsom: 'FSOM Team'
};
const SLOT_KEYS = ['am1', 'am2', 'pm1', 'pm2'];
const SLOT_LABEL = { am1: '오전1', am2: '오전2', pm1: '오후1', pm2: '오후2' };
// 화면(work-schedule.html)의 표시 이름과 같게. 목록에 없는 값은 그대로 씁니다.
const STATUS_LABEL = { '오전휴가': '오전 휴가', '오후휴가': '오후 휴가', '전화': '전화대기' };
// 기본 근무 — 거울에 넣지 않습니다. 병원(거래처)명이 적힌 칸도 현장 방문 = 기본 근무로 봅니다.
const BASE_KEYS = new Set(['ON']);
const MARK = { fsgMirror: '1' };
// 근무일정표에 읽은 것이 하나도 없는데 거울에는 일정이 이만큼 있으면, 지우지 않고 멈춥니다.
const WIPE_GUARD = 1;

// ============================================================
// 날짜 (한국 시간 기준)
// ============================================================
const p2 = n => (n < 10 ? '0' : '') + n;
function kstDate(nowMs, shiftDays) {
  const k = new Date(nowMs + 9 * 3600000 + (shiftDays || 0) * 86400000);
  return k.getUTCFullYear() + '-' + p2(k.getUTCMonth() + 1) + '-' + p2(k.getUTCDate());
}
function nextDay(date) {
  const p = date.split('-');
  const d = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2] + 1));
  return d.getUTCFullYear() + '-' + p2(d.getUTCMonth() + 1) + '-' + p2(d.getUTCDate());
}
function dateRange(nowMs) {
  const from = kstDate(nowMs, 0), to = kstDate(nowMs, DAYS - 1);
  return { from, to, endExclusive: nextDay(to) };
}

// ============================================================
// 상태 → 일정
// ============================================================
function splitKey(val) {
  if (!val) return { key: '', detail: '' };
  const s = String(val);
  const i = s.indexOf(':');
  if (i < 0) return { key: s.trim(), detail: '' };
  return { key: s.substring(0, i).trim(), detail: s.substring(i + 1).trim() };
}
const label = key => STATUS_LABEL[key] || key;

/**
 * 한 사람 · 하루 칸을 거울 일정 한 건으로. 기본 근무뿐이면 null.
 * institutions = 거래처(병원)명 Set — 그 이름이 적힌 칸은 방문(기본 근무)이라 넣지 않습니다.
 */
function summarize(entry, institutions) {
  if (!entry || typeof entry !== 'object') return null;
  const parts = [], lines = [], seen = new Set();
  const add = (text) => { if (!seen.has(text)) { seen.add(text); parts.push(text); } };

  const wk = splitKey(entry.weekend);
  if (wk.key) {
    add(label(wk.key));
    lines.push('주말 · 휴일: ' + label(wk.key) + (wk.detail ? ' (' + wk.detail + ')' : ''));
  }
  for (const sk of SLOT_KEYS) {
    const sv = splitKey(entry[sk]);
    if (!sv.key || BASE_KEYS.has(sv.key) || institutions.has(sv.key)) continue;
    add(label(sv.key));
    lines.push(SLOT_LABEL[sk] + ': ' + label(sv.key) + (sv.detail ? ' (' + sv.detail + ')' : ''));
  }
  const ni = splitKey(entry.night);
  if (ni.key) {
    // 야간 칸의 OFF 는 종일 OFF 와 뜻이 달라 구분해 적습니다.
    const nl = ni.key === 'OFF' ? '야간 OFF' : label(ni.key);
    add(nl);
    lines.push('야간: ' + label(ni.key) + (ni.detail ? ' (' + ni.detail + ')' : ''));
  }
  if (!parts.length) return null;
  return { status: parts.join('·'), lines };
}

// 일정 ID = 날짜 + 팀 + 이름 + 상태로 고정. Google 일정 ID 는 a-v·0-9 만 되므로 해시(16진수)를 씁니다.
function eventId(date, team, name, status) {
  return 'fsg' + crypto.createHash('sha256')
    .update([date, team, name, status].join('|'), 'utf8').digest('hex').substring(0, 40);
}

/** teamData = { 팀: { 날짜: { 이름: 칸 } } } → 만들 일정 목록 */
function buildEvents(teamData, range, institutions) {
  const out = [];
  let cells = 0;
  for (const team of TEAMS) {
    const days = teamData[team] || {};
    for (const date of Object.keys(days)) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date < range.from || date > range.to) continue;
      const day = days[date] || {};
      for (const name of Object.keys(day)) {
        cells++;
        const s = summarize(day[name], institutions);
        if (!s) continue;
        out.push({
          id: eventId(date, team, name, s.status),
          summary: name + ' ' + s.status,
          description: s.lines.join('\n') + '\n\n' + (TEAM_LABEL[team] || team) + ' · 근무일정표 거울(자동 복사, 여기서 고쳐도 반영되지 않습니다)',
          start: { date },
          end: { date: nextDay(date) },
          transparency: 'transparent',
          reminders: { useDefault: false },
          extendedProperties: { private: Object.assign({ team }, MARK) }
        });
      }
    }
  }
  return { events: out, cells };
}

function sameEvent(a, b) {
  return a.status !== 'cancelled' &&
    a.summary === b.summary &&
    (a.description || '') === (b.description || '') &&
    a.start && a.start.date === b.start.date &&
    a.end && a.end.date === b.end.date &&
    (a.transparency || 'opaque') === b.transparency;
}

// 거래처 목록은 화면 파일에서 읽습니다(원본을 하나로 — 여기에 베끼지 않습니다).
// 못 읽으면 병원명이 일정으로 새어 나가므로 멈춥니다.
function loadInstitutions(htmlPath) {
  const html = fs.readFileSync(htmlPath, 'utf8');
  const m = html.match(/const INSTITUTION_LIST = (\[[^\n]*\]);/);
  if (!m) throw new Error('work-schedule.html 에서 거래처 목록(INSTITUTION_LIST)을 찾지 못했습니다');
  const list = JSON.parse(m[1]);
  if (!Array.isArray(list) || list.length < 100) throw new Error('거래처 목록이 비정상입니다');
  return new Set(list);
}

// ============================================================
// HTTP — 오류 글에 주소(토큰 포함)·본문(이름 포함)을 넣지 않습니다
// ============================================================
function makeHttp(fetchImpl, sleep) {
  return async function http(what, url, opts, okCodes) {
    let last = 0;
    for (let attempt = 0; attempt < 4; attempt++) {
      if (attempt) await sleep(1000 * Math.pow(2, attempt));
      let res;
      try { res = await fetchImpl(url, opts || {}); }
      catch (e) { last = '연결 실패'; continue; }
      if (res.status === 429 || res.status >= 500) { last = res.status; continue; }
      if (res.status === 403) {
        // 호출 한도 초과만 다시 시도합니다. 권한 문제는 바로 실패.
        let reason = '';
        try { const j = await res.clone().json(); reason = (((j.error || {}).errors || [])[0] || {}).reason || ''; } catch (e) {}
        if (/rateLimitExceeded/i.test(reason)) { last = 403; continue; }
      }
      if ((okCodes || []).indexOf(res.status) >= 0) return res;
      if (res.status >= 200 && res.status < 300) return res;
      throw new Error(what + ' 실패 (HTTP ' + res.status + ')');
    }
    throw new Error(what + ' 실패 (다시 시도 후에도 ' + last + ')');
  };
}

// ============================================================
// Firebase — 익명 로그인 + 읽기만
// ============================================================
async function firebaseSignIn(http, apiKey) {
  const res = await http('Firebase 익명 로그인',
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + encodeURIComponent(apiKey),
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ returnSecureToken: true }) });
  const j = await res.json();
  if (!j.idToken) throw new Error('Firebase 익명 로그인 응답에 토큰이 없습니다');
  return j.idToken;
}
// 매일 익명 계정이 하나씩 쌓이지 않게, 끝나면 방금 만든 계정을 지웁니다(인증 계정만 — 데이터베이스와 무관).
async function firebaseSignOut(http, apiKey, idToken) {
  await http('Firebase 익명 계정 정리',
    'https://identitytoolkit.googleapis.com/v1/accounts:delete?key=' + encodeURIComponent(apiKey),
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ idToken }) });
}
async function readSchedule(http, dbUrl, idToken, range) {
  const base = String(dbUrl).replace(/\/+$/, '');
  const q = 'orderBy=' + encodeURIComponent('"$key"') +
    '&startAt=' + encodeURIComponent('"' + range.from + '"') +
    '&endAt=' + encodeURIComponent('"' + range.to + '"');
  const out = {};
  for (const team of TEAMS) {
    const res = await http('근무일정 읽기(' + team + ')',
      base + '/work-schedule/' + team + '.json?' + q + '&auth=' + encodeURIComponent(idToken),
      { method: 'GET' });
    const j = await res.json();
    if (j && typeof j === 'object' && j.error) throw new Error('근무일정 읽기(' + team + ') 거부됨');
    out[team] = (j && typeof j === 'object') ? j : {};
  }
  return out;
}

// ============================================================
// Google — 서비스 계정 토큰 + 캘린더
// ============================================================
const b64u = buf => Buffer.from(buf).toString('base64').replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
async function googleToken(http, keyJson, nowMs) {
  let key;
  try { key = JSON.parse(keyJson); } catch (e) { throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY 가 JSON 형식이 아닙니다(키 파일 내용 전체를 넣어야 합니다)'); }
  if (!key.client_email || !key.private_key) throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY 에 client_email · private_key 가 없습니다');
  const iat = Math.floor(nowMs / 1000);
  const head = b64u(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = b64u(JSON.stringify({
    iss: key.client_email,
    scope: 'https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.readonly',
    aud: 'https://oauth2.googleapis.com/token', iat, exp: iat + 600
  }));
  let sig;
  try { sig = crypto.createSign('RSA-SHA256').update(head + '.' + claim).sign(key.private_key); }
  catch (e) { throw new Error('서비스 계정 키로 서명하지 못했습니다(키가 손상되었을 수 있습니다)'); }
  const res = await http('Google 로그인',
    'https://oauth2.googleapis.com/token',
    {
      method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'grant_type=' + encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer') + '&assertion=' + head + '.' + claim + '.' + b64u(sig)
    });
  const j = await res.json();
  if (!j.access_token) throw new Error('Google 로그인 응답에 토큰이 없습니다');
  return j.access_token;
}

function calendarApi(http, token, calendarId) {
  const base = 'https://www.googleapis.com/calendar/v3/calendars/' + encodeURIComponent(calendarId);
  const H = { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' };
  return {
    async info() { return (await http('거울 캘린더 확인', base, { method: 'GET', headers: H })).json(); },
    async list(range) {
      const items = [];
      let pageToken = '';
      do {
        const q = 'timeMin=' + encodeURIComponent(range.from + 'T00:00:00+09:00') +
          '&timeMax=' + encodeURIComponent(range.endExclusive + 'T00:00:00+09:00') +
          '&privateExtendedProperty=' + encodeURIComponent('fsgMirror=1') +
          '&showDeleted=true&singleEvents=true&maxResults=2500' +
          (pageToken ? '&pageToken=' + encodeURIComponent(pageToken) : '');
        const j = await (await http('거울 일정 목록', base + '/events?' + q, { method: 'GET', headers: H })).json();
        (j.items || []).forEach(x => items.push(x));
        pageToken = j.nextPageToken || '';
      } while (pageToken);
      return items;
    },
    // 반환: 'created' | 'exists'(같은 ID 가 이미 있음 — 지워진 일정 포함)
    async insert(ev) {
      const res = await http('일정 만들기', base + '/events', { method: 'POST', headers: H, body: JSON.stringify(ev) }, [409]);
      return res.status === 409 ? 'exists' : 'created';
    },
    async update(ev) {
      await http('일정 고치기', base + '/events/' + encodeURIComponent(ev.id),
        { method: 'PUT', headers: H, body: JSON.stringify(Object.assign({ status: 'confirmed' }, ev)) });
    },
    async remove(id) {
      await http('일정 지우기', base + '/events/' + encodeURIComponent(id), { method: 'DELETE', headers: H }, [404, 410]);
    }
  };
}

// ============================================================
// 동기화
// ============================================================
async function syncCalendar(cal, desired, range, cells) {
  const info = await cal.info();
  if (!info || info.summary !== MIRROR_NAME) {
    throw new Error('MIRROR_CALENDAR_ID 가 「' + MIRROR_NAME + '」 캘린더가 아닙니다 — 다른 캘린더에는 쓰지 않습니다');
  }
  const existing = (await cal.list(range)).filter(e =>
    e && e.id && e.extendedProperties && e.extendedProperties.private &&
    e.extendedProperties.private.fsgMirror === '1' &&
    // 종일 일정이고 날짜가 이번 범위 안인 것만 다룹니다(시간대 차이로 걸려 온 어제 일정을 지우지 않게).
    e.start && e.start.date && e.start.date >= range.from && e.start.date <= range.to);
  const live = existing.filter(e => e.status !== 'cancelled');

  if (cells === 0 && live.length >= WIPE_GUARD) {
    throw new Error('근무일정표에서 읽은 칸이 0건인데 거울에는 일정이 ' + live.length + '건 있습니다 — 지우지 않고 멈춥니다(읽기 문제일 수 있습니다)');
  }

  const byId = new Map(existing.map(e => [e.id, e]));
  const want = new Map(desired.map(e => [e.id, e]));
  const n = { created: 0, updated: 0, deleted: 0, same: 0 };

  for (const ev of want.values()) {
    const cur = byId.get(ev.id);
    if (cur && sameEvent(cur, ev)) { n.same++; continue; }
    if (cur) { await cal.update(ev); n.updated++; continue; }
    if ((await cal.insert(ev)) === 'exists') { await cal.update(ev); n.updated++; }
    else n.created++;
  }
  for (const e of live) {
    if (!want.has(e.id)) { await cal.remove(e.id); n.deleted++; }
  }
  return n;
}

function need(env, name) {
  const v = (env[name] || '').trim();
  if (!v) throw new Error('GitHub Secret ' + name + ' 이(가) 비어 있습니다 — scripts/calendar-mirror/README.md 참고');
  return v;
}

async function run(opt) {
  opt = opt || {};
  const env = opt.env || process.env;
  const log = opt.log || console.log;
  const nowMs = opt.now !== undefined ? opt.now : Date.now();
  const http = makeHttp(opt.fetch || fetch, opt.sleep || (ms => new Promise(r => setTimeout(r, ms))));

  const apiKey = need(env, 'FIREBASE_API_KEY');
  const dbUrl = need(env, 'FIREBASE_DB_URL');
  const saKey = need(env, 'GOOGLE_SERVICE_ACCOUNT_KEY');
  const calendarId = need(env, 'MIRROR_CALENDAR_ID');
  if (!/^https:\/\/[a-z0-9.-]+$/i.test(dbUrl.replace(/\/+$/, ''))) throw new Error('FIREBASE_DB_URL 형식이 올바르지 않습니다');

  const institutions = opt.institutions ||
    loadInstitutions(opt.htmlPath || path.join(__dirname, '..', '..', 'work-schedule.html'));
  const range = dateRange(nowMs);
  log('범위: ' + range.from + ' ~ ' + range.to + ' (한국 시간, ' + DAYS + '일)');

  // 1) 읽기 — 전부 읽은 뒤에만 캘린더를 건드립니다(반쯤 읽고 지우는 일이 없게).
  const idToken = await firebaseSignIn(http, apiKey);
  let teamData;
  try {
    teamData = await readSchedule(http, dbUrl, idToken, range);
  } finally {
    try { await firebaseSignOut(http, apiKey, idToken); }
    catch (e) { log('참고: 익명 계정 정리를 못 했습니다(동기화에는 영향 없음)'); }
  }
  const built = buildEvents(teamData, range, institutions);
  log('근무일정표: 읽은 칸 ' + built.cells + '건 → 거울에 둘 일정 ' + built.events.length + '건');

  // 2) 쓰기 — 거울 캘린더에만
  const token = await googleToken(http, saKey, nowMs);
  const n = await syncCalendar(calendarApi(http, token, calendarId), built.events, range, built.cells);
  log('거울 캘린더: 새로 ' + n.created + ' · 고침 ' + n.updated + ' · 삭제 ' + n.deleted + ' · 그대로 ' + n.same);
  return Object.assign({ cells: built.cells, desired: built.events.length }, n);
}

module.exports = {
  MIRROR_NAME, DAYS, TEAMS, kstDate, nextDay, dateRange, splitKey, summarize, eventId,
  buildEvents, sameEvent, loadInstitutions, run
};

if (require.main === module) {
  run().catch(err => {
    // 메시지만 찍습니다(스택·응답 본문에는 이름이나 토큰이 섞일 수 있습니다).
    console.error('동기화 실패: ' + (err && err.message ? err.message : '알 수 없는 오류'));
    process.exit(1);
  });
}
