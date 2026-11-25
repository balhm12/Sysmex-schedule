// 근무일정표 → Google 캘린더 「FSG 근무일정 거울」 동기화(scripts/calendar-mirror/mirror.js)를 확인합니다.
// 가짜 Firebase·가짜 Google 캘린더로 돌립니다(합성 이름·합성 일정 — 실명·실데이터 없음).
//  1) 워크플로: 매일 UTC 20:30(한국 05:30) 한 번 + 수동 실행, 비밀값은 Secrets 에서만
//  2) Firebase: 팀별 7일 토막만 읽고(전체 트리·팀 전체를 받지 않음), 데이터베이스에는 GET 만
//  3) 포함·제외: ON·빈 칸·병원(거래처) 방문은 빼고, 내근·회의·휴가·당직·직접 입력은 넣는다
//  4) 제목 「이름 상태」, 종일 일정, 일정 ID 는 날짜+팀+이름+상태로 고정
//  5) 다시 돌리면 아무것도 쓰지 않는다(중복 없음)
//  6) 근무일정표에서 사라진·바뀐 항목은 거울에서 지워지고, 사람이 만든 일정은 건드리지 않는다
//  7) 지워졌던 같은 ID 가 다시 생기면 되살린다(409 → 고치기)
//  8) 이름이 다른 캘린더에는 쓰지 않는다
//  9) 실패하면 예외(워크플로 실패) — 읽기 실패·0건 읽기 때 거울을 지우지 않는다
// 10) 로그·오류 글에 이름·비밀값이 없다
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const M = require('../scripts/calendar-mirror/mirror.js');

let fail = 0;
function ok(cond, msg) { if (cond) console.log('  ok  ' + msg); else { fail++; console.error('  FAIL ' + msg); } }

// ── 고정 시각: 2026-11-16(월) 20:30 UTC = 한국 11-17(화) 05:30 ──
const NOW = Date.UTC(2026, 10, 16, 20, 30);
const D = n => M.kstDate(NOW, n);
const HOSPITAL = '가나다시험병원';
const INST = new Set([HOSPITAL]);

const { privateKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });
const PEM = privateKey.export({ type: 'pkcs8', format: 'pem' });
const ENV = {
  FIREBASE_API_KEY: 'test-api-key-SECRET',
  FIREBASE_DB_URL: 'https://example-default-rtdb.firebaseio.com',
  GOOGLE_SERVICE_ACCOUNT_KEY: JSON.stringify({ client_email: 'mirror@example.iam.gserviceaccount.com', private_key: PEM }),
  MIRROR_CALENDAR_ID: 'mirror-cal@group.calendar.google.com'
};
const on4 = { am1: 'ON', am2: 'ON', pm1: 'ON', pm2: 'ON', night: '', weekend: '' };

function makeData() {
  return {
    west: {
      [D(-1)]: { '가팀원': { am1: '휴가', am2: '휴가', pm1: '휴가', pm2: '휴가' } },           // 어제 — 범위 밖
      [D(0)]: {
        '가팀원': Object.assign({}, on4),                                                    // 기본 근무 → 제외
        '나팀원': { am1: '회의: 주간 회의', am2: '회의', pm1: '내근', pm2: '내근', night: '', weekend: '' },
        '다팀원': { am1: HOSPITAL, am2: HOSPITAL + ': PM', pm1: 'ON', pm2: '', night: '', weekend: '' }, // 방문 → 제외
        '라팀원': { am1: '건강검진', am2: '건강검진', pm1: 'ON', pm2: 'ON', night: '', weekend: '' }       // 직접 입력
      },
      [D(1)]: {
        '가팀원': { am1: '휴가', am2: '휴가', pm1: '휴가', pm2: '휴가', night: '', weekend: '' },
        '나팀원': { am1: 'ON', am2: 'ON', pm1: 'ON', pm2: 'ON', night: '석/야: 알람 대응', weekend: '' },
        '다팀원': { am1: HOSPITAL, am2: 'ON', pm1: '내근', pm2: '내근', night: 'OFF', weekend: '' }
      },
      [D(6)]: { '가팀원': { am1: '', am2: '', pm1: '', pm2: '', night: '', weekend: '전화: 1차' } },
      [D(7)]: { '가팀원': { am1: '휴가', am2: '휴가', pm1: '휴가', pm2: '휴가' } }             // 8일째 — 범위 밖
    },
    east: { [D(2)]: { '마팀원': { am1: '오전휴가', am2: '오전휴가', pm1: 'ON', pm2: 'ON', night: '', weekend: '' } } },
    central: { [D(3)]: { '바팀원': { am1: 'ON', am2: 'ON', pm1: 'ON', pm2: 'ON', night: '대전당직', weekend: '' } } },
    south: {}, fss: {}, fsom: null
  };
}

// ── 가짜 서버 ─────────────────────────────────────────────────
function makeWorld(data) {
  const w = {
    data, calls: [], calName: M.MIRROR_NAME, events: new Map(), failTeam: '', nextId: 1,
    writes() { return this.calls.filter(c => c.host === 'cal' && c.method !== 'GET'); }
  };
  const json = (status, body) => ({ status, json: async () => body, clone() { return this; } });
  w.fetch = async (url, opts) => {
    const method = (opts && opts.method) || 'GET';
    const u = new URL(url);
    const body = opts && opts.body && opts.headers && /json/.test(opts.headers['Content-Type'] || '') ? JSON.parse(opts.body) : null;
    if (u.hostname === 'identitytoolkit.googleapis.com') {
      w.calls.push({ host: 'auth', method, path: u.pathname });
      return json(200, /signUp/.test(u.pathname) ? { idToken: 'ID-TOKEN-SECRET' } : {});
    }
    if (u.hostname === 'oauth2.googleapis.com') {
      w.calls.push({ host: 'oauth', method });
      return json(200, { access_token: 'ACCESS-TOKEN-SECRET' });
    }
    if (u.hostname === 'example-default-rtdb.firebaseio.com') {
      w.calls.push({ host: 'fb', method, path: u.pathname, q: u.searchParams });
      const m = u.pathname.match(/^\/work-schedule\/([a-z]+)\.json$/);
      if (!m || method !== 'GET') return json(400, { error: 'bad' });
      if (m[1] === w.failTeam) return json(401, { error: 'Permission denied' });
      const from = JSON.parse(u.searchParams.get('startAt')), to = JSON.parse(u.searchParams.get('endAt'));
      const all = w.data[m[1]];
      if (!all) return json(200, null);
      const out = {};
      Object.keys(all).forEach(d => { if (d >= from && d <= to) out[d] = all[d]; });
      return json(200, out);
    }
    if (u.hostname === 'www.googleapis.com') {
      const p = decodeURIComponent(u.pathname);
      const prefix = '/calendar/v3/calendars/' + ENV.MIRROR_CALENDAR_ID;
      w.calls.push({ host: 'cal', method, path: p, auth: opts.headers.Authorization });
      if (p.indexOf(prefix) !== 0) return json(404, {});
      const rest = p.slice(prefix.length);
      if (rest === '' && method === 'GET') return json(200, { id: ENV.MIRROR_CALENDAR_ID, summary: w.calName });
      if (rest === '/events' && method === 'GET') {
        const [k, v] = u.searchParams.get('privateExtendedProperty').split('=');
        const items = [...w.events.values()].filter(e =>
          ((e.extendedProperties || {}).private || {})[k] === v &&
          (u.searchParams.get('showDeleted') === 'true' || e.status !== 'cancelled'));
        return json(200, { items });
      }
      if (rest === '/events' && method === 'POST') {
        if (w.events.has(body.id)) return json(409, { error: { errors: [{ reason: 'duplicate' }] } });
        w.events.set(body.id, Object.assign({ status: 'confirmed' }, body));
        return json(200, body);
      }
      const em = rest.match(/^\/events\/(.+)$/);
      if (em && method === 'PUT') { w.events.set(em[1], Object.assign({}, body)); return json(200, body); }
      if (em && method === 'DELETE') {
        const e = w.events.get(em[1]);
        if (!e || e.status === 'cancelled') return json(410, {});
        e.status = 'cancelled';
        return json(204, {});
      }
    }
    return json(404, {});
  };
  return w;
}
async function sync(w, extra) {
  const logs = [];
  const res = await M.run(Object.assign({ env: ENV, fetch: w.fetch, now: NOW, log: s => logs.push(String(s)), sleep: async () => {}, institutions: INST }, extra || {}));
  return { res, logs };
}
async function throws(fn) { try { await fn(); return null; } catch (e) { return e; } }
const live = w => [...w.events.values()].filter(e => e.status !== 'cancelled');
const titles = w => live(w).map(e => e.summary).sort();

(async () => {
  console.log('1) 워크플로');
  const yml = fs.readFileSync('.github/workflows/calendar-mirror.yml', 'utf8');
  const crons = yml.match(/cron:\s*"[^"]+"/g) || [];
  ok(crons.length === 1 && /#\s*-\s*cron:\s*"30 20 \* \* \*"/.test(yml) && !/^\s*schedule:/m.test(yml), '예약은 꺼 둠(2026-11-25 Apps Script 판으로 옮김) — 되살릴 때 쓸 한 줄은 주석으로 남김');
  ok(/workflow_dispatch/.test(yml), '수동 실행(workflow_dispatch)');
  ok(/node scripts\/calendar-mirror\/mirror\.js/.test(yml), '동기화 스크립트를 실행');
  ['FIREBASE_API_KEY', 'FIREBASE_DB_URL', 'GOOGLE_SERVICE_ACCOUNT_KEY', 'MIRROR_CALENDAR_ID'].forEach(k =>
    ok(new RegExp(k + ': \\$\\{\\{ secrets\\.' + k + ' \\}\\}').test(yml), k + ' 는 Secrets 에서 받는다'));
  ok(!/continue-on-error/.test(yml), '실패를 삼키지 않는다(continue-on-error 없음)');
  const src = fs.readFileSync('scripts/calendar-mirror/mirror.js', 'utf8');
  ok(!/AIza[0-9A-Za-z_-]{20,}/.test(src + yml) && !/firebaseio\.com/.test(src) && !/BEGIN PRIVATE KEY/.test(src + yml),
    '코드·워크플로에 키·DB 주소·개인 키가 없다');
  ok(!/@group\.calendar\.google\.com|@gmail\.com/.test(src + yml), '코드·워크플로에 캘린더 ID·메일 주소가 없다');

  console.log('2) Firebase 읽기');
  const w = makeWorld(makeData());
  const first = await sync(w);
  const fb = w.calls.filter(c => c.host === 'fb');
  ok(fb.length === 6 && fb.every(c => c.method === 'GET'), '팀마다 한 번씩 GET 6회뿐(쓰기 없음)');
  ok(fb.every(c => /^\/work-schedule\/(west|east|central|south|fss|fsom)\.json$/.test(c.path)), '팀 경로만 읽는다(전체 트리·명단·특이사항을 받지 않음)');
  ok(fb.every(c => c.q.get('orderBy') === '"$key"' && c.q.get('startAt') === '"' + D(0) + '"' && c.q.get('endAt') === '"' + D(6) + '"'),
    '오늘 ~ 6일 뒤(7일) 토막만 요청한다');
  ok(M.DAYS === 7, '기간은 7일');
  ok(D(0) === '2026-11-17', '05:30 실행 시 「오늘」은 한국 날짜(2026-11-17)');
  const auth = w.calls.filter(c => c.host === 'auth').map(c => c.path);
  ok(auth.length === 2 && /signUp/.test(auth[0]) && /delete/.test(auth[1]), '익명 로그인 1회 + 끝나면 그 계정 정리');

  console.log('3) 포함 · 제외');
  const t = titles(w);
  ok(JSON.stringify(t) === JSON.stringify([
    '가팀원 전화대기', '가팀원 휴가', '나팀원 석/야', '나팀원 회의·내근', '다팀원 내근·야간 OFF',
    '라팀원 건강검진', '마팀원 오전 휴가', '바팀원 대전당직'].sort()), '거울 일정 8건: ' + t.length + '건');
  ok(!t.some(s => /ON$/.test(s) || s === '가팀원 ON'), '기본 근무(ON)만 있는 날은 넣지 않는다');
  ok(!live(w).some(e => (e.summary + e.description).indexOf(HOSPITAL) >= 0), '병원(거래처)명은 제목·설명 어디에도 없다');
  ok(first.res.cells === 10 && first.res.desired === 8 && first.res.created === 8, '읽은 칸 10 → 일정 8 → 새로 8');
  ok(M.summarize({ am1: 'OFF', am2: 'OFF', pm1: 'OFF', pm2: 'OFF' }, INST).status === 'OFF' &&
     M.summarize({ am1: 'DP', pm1: '교육: 신제품' }, INST).status === 'DP·교육' &&
     M.summarize({ weekend: '당직: 1차', night: '잔업' }, INST).status === '당직·잔업' &&
     M.summarize({ am1: '', am2: 'ON' }, INST) === null && M.summarize(null, INST) === null,
    'OFF·DP·교육·당직·잔업 포함, 빈 칸·ON 제외');

  console.log('4) 일정 모양 · ID');
  const meet = live(w).find(e => e.summary === '나팀원 회의·내근');
  ok(meet.start.date === D(0) && meet.end.date === D(1) && !meet.start.dateTime, '종일 일정(끝 = 다음 날)');
  ok(/오전1: 회의 \(주간 회의\)/.test(meet.description) && /오후1: 내근/.test(meet.description) && /FS WEST/.test(meet.description), '설명에 칸별 내용·팀');
  ok(meet.transparency === 'transparent' && meet.reminders.useDefault === false, '바쁨 표시·알림 없음');
  ok(meet.id === M.eventId(D(0), 'west', '나팀원', '회의·내근') && /^fsg[0-9a-f]{40}$/.test(meet.id), 'ID = 날짜+팀+이름+상태 해시(Google 허용 문자)');
  ok(M.eventId(D(0), 'west', '나팀원', '내근') !== meet.id && M.eventId(D(1), 'west', '나팀원', '회의·내근') !== meet.id, '날짜·상태가 다르면 ID 가 다르다');
  ok(live(w).every(e => e.extendedProperties.private.fsgMirror === '1'), '모든 일정에 거울 표시');
  ok(w.calls.filter(c => c.host === 'cal').every(c => c.path.indexOf('/calendar/v3/calendars/' + ENV.MIRROR_CALENDAR_ID) === 0 && c.auth === 'Bearer ACCESS-TOKEN-SECRET'),
    '거울 캘린더 한 곳에만 요청한다');

  console.log('5) 다시 돌리면 그대로');
  w.calls.length = 0;
  const second = await sync(w);
  ok(w.writes().length === 0 && second.res.same === 8 && live(w).length === 8, '두 번째 실행은 쓰기 0회 · 일정 8건 그대로(중복 없음)');

  console.log('6) 사라진 · 바뀐 항목');
  w.events.set('manual1', { id: 'manual1', status: 'confirmed', summary: '사람이 만든 일정', start: { date: D(0) }, end: { date: D(1) } });
  // 어제 날짜의 거울 일정(시간대 차이로 목록에 걸려 온 경우) — 지우면 안 된다
  w.events.set('old1', { id: 'old1', status: 'confirmed', summary: '가팀원 휴가', start: { date: D(-1) }, end: { date: D(0) }, extendedProperties: { private: { fsgMirror: '1' } } });
  delete w.data.west[D(1)]['가팀원'];                                  // 휴가 취소
  w.data.west[D(0)]['라팀원'].am1 = 'ON'; w.data.west[D(0)]['라팀원'].am2 = 'ON'; // 건강검진 → 기본 근무
  w.data.west[D(0)]['나팀원'].pm1 = 'ON'; w.data.west[D(0)]['나팀원'].pm2 = 'ON'; // 회의·내근 → 회의
  w.data.west[D(1)]['나팀원'].night = '석/야: 내용만 바뀜';             // 세부 내용만 변경 → 같은 ID 고치기
  w.calls.length = 0;
  const third = await sync(w);
  const t3 = titles(w);
  ok(t3.filter(s => s === '가팀원 휴가').length === 1 && w.events.get(M.eventId(D(1), 'west', '가팀원', '휴가')).status === 'cancelled', '취소된 휴가는 거울에서 삭제(어제 것만 남음)');
  ok(!t3.includes('라팀원 건강검진') && !t3.includes('나팀원 회의·내근') && t3.includes('나팀원 회의'), '바뀐 상태: 옛 일정 삭제 + 새 일정');
  ok(third.res.deleted === 3 && third.res.created === 1 && third.res.updated === 1, '삭제 3 · 새로 1 · 고침 1');
  ok(/내용만 바뀜/.test(live(w).find(e => e.summary === '나팀원 석/야').description), '세부 내용 변경은 같은 일정을 고친다');
  ok(w.events.get('manual1').status === 'confirmed' && w.events.get('old1').status === 'confirmed', '사람이 만든 일정·범위 밖 일정은 건드리지 않는다');

  console.log('7) 지워졌던 ID 되살리기');
  w.data.west[D(1)]['가팀원'] = { am1: '휴가', am2: '휴가', pm1: '휴가', pm2: '휴가', night: '', weekend: '' };
  await sync(w);
  const revived = w.events.get(M.eventId(D(1), 'west', '가팀원', '휴가'));
  ok(revived && revived.status === 'confirmed' && w.events.size === new Set(w.events.keys()).size, '다시 생긴 휴가는 같은 ID 로 되살아난다');
  // 목록에 안 보이는 지워진 일정(409) 경로
  const w7 = makeWorld(makeData());
  const gid = M.eventId(D(1), 'west', '가팀원', '휴가');
  w7.events.set(gid, { id: gid, status: 'cancelled' });
  const r7 = await sync(w7);
  ok(w7.events.get(gid).status === 'confirmed' && r7.res.updated === 1 && r7.res.created === 7, '만들기가 409 면 고치기로 넘어간다');

  console.log('8) 다른 캘린더에는 쓰지 않는다');
  const w8 = makeWorld(makeData());
  w8.calName = '설치팀 일정';
  const e8 = await throws(() => sync(w8));
  ok(e8 && /거울/.test(e8.message) && w8.writes().length === 0 && w8.events.size === 0, '이름이 다르면 멈추고 아무것도 쓰지 않는다');

  console.log('9) 실패 처리');
  const w9 = makeWorld(makeData());
  await sync(w9);
  w9.failTeam = 'south'; w9.calls.length = 0;
  const e9 = await throws(() => sync(w9));
  ok(e9 && w9.calls.filter(c => c.host === 'cal').length === 0 && live(w9).length === 8, '한 팀이라도 못 읽으면 실패 · 캘린더는 건드리지 않는다');
  ok(w9.calls.some(c => c.host === 'auth' && /delete/.test(c.path)), '실패해도 익명 계정은 정리한다');
  w9.failTeam = ''; w9.data = { west: {}, east: {}, central: {}, south: {}, fss: {}, fsom: {} }; w9.calls.length = 0;
  const e9b = await throws(() => sync(w9));
  ok(e9b && /0건/.test(e9b.message) && w9.writes().length === 0 && live(w9).length === 8, '읽은 칸이 0건이면 거울을 비우지 않고 실패');
  const e9c = await throws(() => M.run({ env: Object.assign({}, ENV, { MIRROR_CALENDAR_ID: ' ' }), fetch: w9.fetch, now: NOW, log: () => {}, institutions: INST }));
  ok(e9c && /MIRROR_CALENDAR_ID/.test(e9c.message), '비밀값이 비어 있으면 어느 것인지 알려 주고 실패');
  const e9d = await throws(() => M.run({ env: Object.assign({}, ENV, { GOOGLE_SERVICE_ACCOUNT_KEY: 'not-json' }), fetch: makeWorld(makeData()).fetch, now: NOW, log: () => {}, institutions: INST }));
  ok(e9d && /JSON/.test(e9d.message), '서비스 계정 키 형식이 틀리면 실패');
  const w9e = makeWorld(makeData());
  const base = w9e.fetch;
  w9e.fetch = async (url, opts) => (/\/events$/.test(new URL(url).pathname) && opts.method === 'POST') ? { status: 500, json: async () => ({}), clone() { return this; } } : base(url, opts);
  const e9e = await throws(() => sync(w9e));
  ok(e9e && /일정 만들기 실패/.test(e9e.message), '캘린더 쓰기가 계속 실패하면 예외');
  ok(/process\.exit\(1\)/.test(src), '명령으로 돌릴 때 실패하면 종료 코드 1');

  console.log('10) 로그 · 오류 글');
  const allText = [first.logs, second.logs, third.logs].flat().join('\n') + '\n' + [e8, e9, e9b, e9c, e9d, e9e].map(e => e.message).join('\n');
  ok(!/팀원|회의|내근|휴가|건강검진|병원/.test(allText), '이름·상태·병원명이 없다(건수만)');
  ok(!/SECRET|PRIVATE KEY|example-default-rtdb|mirror-cal@|iam\.gserviceaccount/.test(allText), '키·토큰·주소·캘린더 ID 가 없다');
  ok(/새로 8/.test(first.logs.join('\n')) && /범위: 2026-11-17 ~ 2026-11-23/.test(first.logs.join('\n')), '건수와 범위는 남는다');

  console.log('11) 거래처 목록은 화면 파일에서');
  const inst = M.loadInstitutions('work-schedule.html');
  ok(inst.size > 500, '화면의 거래처 목록을 읽는다(' + inst.size + '곳)');
  const tmp = path.join(require('os').tmpdir(), 'mirror-test-' + process.pid + '.html');
  fs.writeFileSync(tmp, '<script>const X = 1;</script>');
  const e11 = await throws(async () => M.loadInstitutions(tmp));
  fs.unlinkSync(tmp);
  ok(e11 && /거래처 목록/.test(e11.message), '목록을 못 찾으면 멈춘다(병원명이 새어 나가지 않게)');
  const vy = fs.readFileSync('.github/workflows/validate.yml', 'utf8');
  ok(/scripts\/\*\*/.test(vy) && /calendar-mirror\.yml/.test(vy), '이 스크립트·워크플로가 바뀌면 자동 검증이 돈다');

  if (fail) { console.error('\n거울 캘린더 테스트 실패: ' + fail + '건'); process.exit(1); }
  console.log('\n거울 캘린더 테스트 통과');
})().catch(e => { console.error(e); process.exit(1); });
