// 휴대폰 캘린더 구독(.ics)을 확인합니다.
// 화면(work-schedule.html)이 만드는 주소와 Apps Script(apps-script-calendar/calendar_ics.gs)가
// 되찾는 열쇠가 같아야 합니다 — 다르면 주소를 열어도 아무것도 나오지 않습니다.
//  1) 화면의 sha256Hex 가 표준 SHA-256 과 같다 (한글·빈 문자열·긴 문자열)
//  2) 화면이 만든 열쇠를 Apps Script 가 같은 사람/팀으로 되찾는다
//  3) 남의 열쇠·엉뚱한 값은 되찾지 못한다
//  4) 개인 주소: 내 일정만, ON 인 날도 들어가고, 야간·세부 내용이 제목·설명에 보인다
//  5) 팀 주소: 팀원 이름이 제목에 붙고, 평일 ON 만 있는 날은 빠진다
//  6) iCalendar 형식 — VCALENDAR 로 감싸고 종일 일정이며 줄이 75옥텟 안에서 접힌다
//  7) Firebase 는 팀 하나·기간 한 토막만 읽고, 두 번째 요청은 캐시로 받는다(요금)
//  8) 설정이 없으면 화면이 안내만 보이고 주소를 만들지 않는다
const fs = require('fs');
const vm = require('vm');
const crypto = require('crypto');
const { JSDOM } = require('jsdom');

const GS_PATH = 'apps-script-calendar/calendar_ics.gs';
const SALT = 'test-salt-0123456789';
// 합성 명단·일정 (실명·실데이터를 쓰지 않습니다)
const ROSTER = {
  west: [{ name: '가팀원' }, { name: '나팀원' }, { name: '다팀원' }],
  east: [{ name: '라팀원' }]
};
const pad = n => String(n).padStart(2, '0');
const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const shift = n => { const d = new Date(); d.setDate(d.getDate() + n); return iso(d); };
const D1 = shift(1), D2 = shift(2), D3 = shift(3), OLD = shift(-400);

const DATA = {
  west: {
    [D1]: {
      '가팀원': { am1: 'ON', am2: 'ON', pm1: 'ON', pm2: 'ON', night: '석/야: XN-9100 알람 대응', weekend: '', at: 1763300000000 },
      '나팀원': { am1: 'ON', am2: 'ON', pm1: 'ON', pm2: 'ON', night: '', weekend: '' },
      '다팀원': { am1: '휴가', am2: '휴가', pm1: '휴가', pm2: '휴가', night: '', weekend: '' }
    },
    [D2]: {
      '가팀원': { am1: '오전휴가', am2: '오전휴가', pm1: 'ON', pm2: 'ON', night: '', weekend: '' },
      '나팀원': { am1: '교육: 장비 기초 교육; 2일차', am2: '교육', pm1: '', pm2: '', night: '', weekend: '' }
    },
    [D3]: {
      '가팀원': { am1: '', am2: '', pm1: '', pm2: '', night: '', weekend: '당직: 전화 1차' }
    }
  },
  east: { [D1]: { '라팀원': { am1: 'ON', am2: 'ON', pm1: 'ON', pm2: 'ON', night: '', weekend: '' } } },
  central: {}, south: {}, fss: {}, fsom: {}
};

// ── Apps Script 흉내 ──────────────────────────────────────────
const fbCalls = [];
function makeSandbox() {
  const cache = new Map();
  const props = new Map([['FB_API_KEY', 'test-key']]);
  const sandbox = {
    console,
    Logger: { log: () => {} },
    Utilities: {
      DigestAlgorithm: { SHA_256: 'SHA_256' },
      Charset: { UTF_8: 'UTF_8' },
      computeDigest: (_alg, str) =>
        Array.from(crypto.createHash('sha256').update(str, 'utf8').digest())
          .map(b => (b > 127 ? b - 256 : b))
    },
    CacheService: {
      getScriptCache: () => ({
        get: k => (cache.has(k) ? cache.get(k) : null),
        put: (k, v) => cache.set(k, v),
        putAll: (m) => Object.keys(m).forEach(k => cache.set(k, m[k])),
        remove: k => cache.delete(k)
      })
    },
    PropertiesService: {
      getScriptProperties: () => ({
        getProperty: k => (props.has(k) ? props.get(k) : null),
        setProperty: (k, v) => props.set(k, v),
        deleteProperty: k => props.delete(k)
      })
    },
    ContentService: {
      MimeType: { ICAL: 'ICAL', TEXT: 'TEXT' },
      createTextOutput: (t) => ({ _t: t, _m: '', setMimeType(m) { this._m = m; return this; }, getContent() { return this._t; }, getMime() { return this._m; } })
    },
    UrlFetchApp: {
      fetch: (url) => {
        if (url.indexOf('identitytoolkit') >= 0) {
          return resp(200, JSON.stringify({ idToken: 'tok-1', refreshToken: 'rt-1' }));
        }
        if (url.indexOf('securetoken') >= 0) {
          return resp(200, JSON.stringify({ id_token: 'tok-1' }));
        }
        fbCalls.push(url);
        if (url.indexOf('/work-schedule/calendar.json') >= 0) return resp(200, JSON.stringify({ salt: SALT, url: 'https://script.example/exec' }));
        if (url.indexOf('/work-schedule/teamRoster.json') >= 0) return resp(200, JSON.stringify(ROSTER));
        const m = url.match(/\/work-schedule\/([a-z]+)\.json/);
        if (m && DATA[m[1]] !== undefined) {
          // 기간 자르기를 흉내 냅니다 — startAt/endAt 밖의 날짜는 서버가 주지 않습니다
          const from = decodeURIComponent((url.match(/startAt=([^&]*)/) || [, '""'])[1]).replace(/"/g, '');
          const to = decodeURIComponent((url.match(/endAt=([^&]*)/) || [, '""'])[1]).replace(/"/g, '');
          const src = DATA[m[1]], out = {};
          Object.keys(src).forEach(d => { if ((!from || d >= from) && (!to || d <= to)) out[d] = src[d]; });
          return resp(200, JSON.stringify(out));
        }
        return resp(404, 'null');
      }
    }
  };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(GS_PATH, 'utf8'), sandbox);
  return sandbox;
}
const resp = (code, text) => ({ getResponseCode: () => code, getContentText: () => text });
const byteLen = s => Buffer.byteLength(s, 'utf8');

(async () => {
  // ── 화면 쪽 준비 ───────────────────────────────────────────
  const html = fs.readFileSync('work-schedule.html', 'utf8')
    .replace(/<script src="https:\/\/(cdnjs\.cloudflare\.com|www\.gstatic\.com)[^"]*"><\/script>/g, '');
  const dom = new JSDOM(html, { runScripts: 'dangerously', url: 'https://example.com/work-schedule.html' });
  const { window } = dom; const doc = window.document;
  window.alert = () => {}; window.confirm = () => true;
  window.fetch = () => Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve({}) });
  await new Promise(r => setTimeout(r, 900));
  window.closePanel();

  // 1) sha256Hex 가 표준과 같은가
  ['', 'abc', '가팀원', SALT + '|me|가팀원', 'x'.repeat(200), '이모지없는긴한글문자열'.repeat(12)].forEach(s => {
    const mine = window.eval(`sha256Hex(${JSON.stringify(s)})`);
    const std = crypto.createHash('sha256').update(s, 'utf8').digest('hex');
    if (mine !== std) throw new Error('sha256Hex 불일치: ' + JSON.stringify(s.slice(0, 20)) + ' → ' + mine + ' ≠ ' + std);
  });
  console.log('1) 화면의 sha256Hex 가 표준 SHA-256 과 일치 ✓');

  // 화면에 합성 명단·설정을 넣습니다
  window.eval(`
    scheduleData.teamRoster = ${JSON.stringify(ROSTER)};
    scheduleData.calendar = {url:'https://script.example/exec', salt:${JSON.stringify(SALT)}};
    applyTeamRoster();
    setMe('가팀원','west');
  `);

  const cfg = { url: 'https://script.example/exec', salt: SALT };
  const myLink = window.eval("calLink(calSettings(),'me','가팀원')");
  const teamLink = window.eval("calLink(calSettings(),'team','west')");
  const myKey = myLink.split('k=')[1];
  const teamKey = teamLink.split('k=')[1];
  if (!/^[0-9a-f]{24}$/.test(myKey)) throw new Error('열쇠 형식이 이상함: ' + myKey);

  // 2) Apps Script 가 같은 열쇠를 되찾는가
  const sb = makeSandbox();
  const who = sb.resolveKey_(myKey);
  if (!who || who.kind !== 'me' || who.name !== '가팀원' || who.team !== 'west') {
    throw new Error('개인 열쇠를 되찾지 못함: ' + JSON.stringify(who));
  }
  const whoTeam = sb.resolveKey_(teamKey);
  if (!whoTeam || whoTeam.kind !== 'team' || whoTeam.team !== 'west') {
    throw new Error('팀 열쇠를 되찾지 못함: ' + JSON.stringify(whoTeam));
  }
  console.log('2) 화면이 만든 주소를 Apps Script 가 같은 사람·팀으로 되찾음 ✓');

  // 3) 엉뚱한 열쇠는 안 된다
  ['0'.repeat(24), 'deadbeef', myKey.slice(0, 23) + (myKey[23] === 'a' ? 'b' : 'a')].forEach(bad => {
    if (sb.resolveKey_(bad)) throw new Error('엉뚱한 열쇠가 통과함: ' + bad);
  });
  // 다른 소금으로 만든 열쇠도 통하면 안 된다
  const otherKey = window.eval("calToken('다른소금','me','가팀원')");
  if (sb.resolveKey_(otherKey)) throw new Error('다른 소금으로 만든 열쇠가 통과함');
  console.log('3) 남의 열쇠 · 다른 소금 · 틀린 글자는 되찾지 못함 ✓');

  // 4) 개인 주소 내용
  const mine = sb.icsFor_(who);
  const myEvents = mine.split('BEGIN:VEVENT').slice(1);
  if (myEvents.length !== 3) throw new Error('개인 일정 건수가 ' + myEvents.length + '건 (3건이어야 함)');
  if (mine.indexOf('나팀원') >= 0 || mine.indexOf('다팀원') >= 0) throw new Error('개인 주소에 다른 사람이 들어감');
  const unfold = s => s.replace(/\r\n /g, '');
  const flat = unfold(mine);
  if (flat.indexOf('SUMMARY:ON · 석/야') < 0) throw new Error('야간이 제목에 없음: ' + (flat.match(/SUMMARY:[^\r\n]*/g) || []).join(' | '));
  if (flat.indexOf('XN-9100') < 0) throw new Error('야간 세부 내용이 설명에 없음');
  if (flat.indexOf('SUMMARY:오전 휴가 · ON') < 0) throw new Error('반일 휴가 제목이 다름');
  if (flat.indexOf('SUMMARY:당직') < 0) throw new Error('주말·휴일 구분이 제목에 없음');
  if (flat.indexOf(OLD.replace(/-/g, '')) >= 0) throw new Error('기간 밖(1년 전) 일정이 들어감');
  console.log('4) 개인 주소: 내 일정 3건, 야간·세부 내용·반일 휴가가 제목·설명에 보임 ✓');

  // 5) 팀 주소 — 이름이 붙고 평일 ON 만 있는 날은 빠진다
  const team = unfold(sb.icsFor_(whoTeam));
  if (team.indexOf('SUMMARY:나팀원 ON') >= 0) throw new Error('평일 ON 만 있는 날이 팀 주소에 들어감');
  if (team.indexOf('SUMMARY:다팀원 휴가') < 0) throw new Error('팀원 휴가가 팀 주소에 없음');
  if (team.indexOf('SUMMARY:가팀원 ON · 석/야') < 0) throw new Error('야간 근무자가 팀 주소에 없음');
  if (team.indexOf('SUMMARY:나팀원 교육') < 0) throw new Error('교육이 팀 주소에 없음');
  if (team.indexOf('라팀원') >= 0) throw new Error('다른 팀 사람이 들어감');
  // 세부 내용에 들어간 세미콜론·쉼표는 iCalendar 규칙대로 보호해야 합니다(안 하면 줄이 깨집니다)
  if (team.indexOf('\\;') < 0) throw new Error('세미콜론이 보호되지 않음');
  if (team.indexOf('장비 기초 교육\\; 2일차') < 0) throw new Error('세부 내용이 설명에 그대로 들어가지 않음');
  console.log('5) 팀 주소: 이름이 붙고 평일 ON 만 있는 날은 빠짐 ✓');

  // 6) iCalendar 형식
  if (!mine.startsWith('BEGIN:VCALENDAR\r\n')) throw new Error('VCALENDAR 로 시작하지 않음');
  if (!mine.trimEnd().endsWith('END:VCALENDAR')) throw new Error('VCALENDAR 로 끝나지 않음');
  ['VERSION:2.0', 'PRODID:', 'X-WR-CALNAME:', 'X-WR-TIMEZONE:Asia/Seoul'].forEach(h => {
    if (mine.indexOf(h) < 0) throw new Error('머리글 ' + h + ' 가 없음');
  });
  if ((mine.match(/DTSTART;VALUE=DATE:\d{8}/g) || []).length !== 3) throw new Error('종일 일정 형식이 아님');
  if ((mine.match(/BEGIN:VEVENT/g) || []).length !== (mine.match(/END:VEVENT/g) || []).length) throw new Error('VEVENT 짝이 안 맞음');
  const uids = (mine.match(/UID:[^\r\n]*/g) || []);
  if (new Set(uids).size !== uids.length) throw new Error('UID 가 겹침 (캘린더가 일정을 덮어씀)');
  if (mine.indexOf('UID:' + D1 + '-가팀원') >= 0) throw new Error('UID 에 실명이 그대로 들어감');
  mine.split('\r\n').forEach(line => {
    if (byteLen(line) > 75) throw new Error('75옥텟을 넘는 줄이 있음(' + byteLen(line) + '): ' + line.slice(0, 40));
  });
  // 접힌 줄을 다시 이으면 원래 내용이 나와야 한다
  if (unfold(mine).indexOf('장비 기초 교육') < 0 && team.indexOf('장비 기초 교육') < 0) throw new Error('접힌 줄을 이었을 때 내용이 깨짐');
  console.log('6) iCalendar 형식 · 종일 일정 · UID 고유 · 75옥텟 접힘 ✓');

  // 7) 요금 — 팀 하나·기간 한 토막만, 두 번째는 캐시
  const dataCalls = fbCalls.filter(u => /\/work-schedule\/[a-z]+\.json/.test(u) && u.indexOf('calendar.json') < 0 && u.indexOf('teamRoster') < 0);
  if (!dataCalls.length) throw new Error('일정 데이터를 읽은 기록이 없음');
  dataCalls.forEach(u => {
    if (u.indexOf('startAt') < 0 || u.indexOf('endAt') < 0) throw new Error('기간을 자르지 않고 전체를 받음: ' + u);
    if (/\/work-schedule\.json/.test(u)) throw new Error('전체 데이터를 받음');
  });
  // 개인 주소와 팀 주소가 같은 팀이면 데이터는 한 번만 받아야 합니다
  if (dataCalls.length !== 1 || dataCalls[0].indexOf('/work-schedule/west.json') < 0) {
    throw new Error('같은 팀인데 ' + dataCalls.length + '번 읽음: ' + dataCalls.join(' , '));
  }
  const before = fbCalls.length;
  sb.icsFor_(who); sb.icsFor_(whoTeam);
  if (fbCalls.length !== before) throw new Error('두 번째 요청이 캐시를 쓰지 않고 Firebase 를 다시 읽음');
  // 다른 팀은 따로 받아야 합니다(캐시가 팀별로 나뉘어 있는지)
  const eastKey = window.eval("calToken(scheduleData.calendar ? scheduleData.calendar.salt : " + JSON.stringify(SALT) + ",'me','라팀원')");
  sb.icsFor_(sb.resolveKey_(eastKey));
  const eastCalls = fbCalls.filter(u => u.indexOf('/work-schedule/east.json') >= 0);
  if (eastCalls.length !== 1) throw new Error('다른 팀 데이터를 ' + eastCalls.length + '번 읽음');
  console.log('7) 팀 하나·기간 한 토막만 읽고, 같은 팀 두 번째 요청은 캐시로 처리 ✓');

  // 8) 설정이 없으면 안내만
  window.eval("scheduleData.calendar = null;");
  if (window.eval('calSettings()')) throw new Error('설정이 없는데 있다고 함');
  window.eval('openCalendarPanel()');
  await new Promise(r => setTimeout(r, 80));
  const txt = doc.getElementById('panel').textContent;
  if (txt.indexOf('script.example') >= 0) throw new Error('설정이 없는데 주소를 만들어 보여 줌');
  if (txt.indexOf('관리자') < 0) throw new Error('설정이 없을 때 안내 문구가 없음: ' + txt.slice(0, 120));
  window.closePanel();
  // 열쇠가 없는 요청은 캘린더 형식으로 답하지 않는다 (캘린더 앱이 기존 일정을 지우지 않도록)
  const noKey = sb.doGet({ parameter: {} });
  if (noKey.getMime() === 'ICAL') throw new Error('열쇠 없는 요청에 캘린더 형식으로 답함');
  const badKey = sb.doGet({ parameter: { k: '0'.repeat(24) } });
  if (badKey.getMime() === 'ICAL') throw new Error('틀린 열쇠에 캘린더 형식으로 답함');
  console.log('8) 설정·열쇠가 없으면 안내만 하고 빈 캘린더를 주지 않음 ✓');

  console.log('\n✅ 캘린더 구독: 화면과 Apps Script 가 같은 열쇠를 쓰고, 개인·팀 주소가 규격대로 나옴');
  process.exit(0);
})().catch(e => { console.error('\n❌ 테스트 실패:', e.message); process.exit(1); });
