/* 직원용 자료(이름 없는 사본, 2026-11-18) — 합성 데이터(가명)만 쓴다.
 * ① staff-core.js == fsg-kpi.html ② 직원용 코드는 한쪽 방향 ③ 사본에 이름이 없다 ④ 단위(팀·사무소) 합계는 원본과 같다
 * ⑤ 한 사람의 실적은 남지 않는다(건마다 섞임) ⑥ PC 올리기(buildStaff)도 같은 사본 ⑦ 화면 규칙(직원 화면에 사람 단위 화면 없음)
 * 실행: node tests/test_staff.js */
const assert = require('assert'), fs = require('fs'), path = require('path');
const X = require('../fsg-report/tools/extract-staff-core');
const html = fs.readFileSync(X.HTML, 'utf8');
assert.strictEqual(fs.readFileSync(X.OUT, 'utf8'), X.build(html), 'fsg-report/staff-core.js 가 fsg-kpi.html 과 다릅니다 → node fsg-report/tools/extract-staff-core.js');
const SC = require('../fsg-report/staff-core'), PD = require('../fsg-report/push-dashboard'), { kpiCore, buildProdData } = require('../fsg-report/kpi-core');
const { sliceFunction } = require('../fsg-report/tools/extract-kpi-core');
const subtle = require('crypto').webcrypto.subtle;
let pass = 0; const ok = (c, m) => { if (!c) throw new Error('FAIL: ' + m); pass++; };

(async () => {
  /* ② 직원용 코드 — 정해진 값(FS Portal tests/kpi_staff.js 도 같은 값을 확인한다), 접근 코드와 다르고 매번 같다 */
  const sc = await SC.staffCodeOf('TESTCODE', subtle);
  ok(sc === 'zBSVPjImvCNFIuXF-p9jD3C4L6FsMBD_dvFpC1lZZ4Q', '직원용 코드 기준값이 바뀜: ' + sc);
  ok(sc !== await SC.staffCodeOf('TESTCODF', subtle), '다른 접근 코드인데 같은 직원용 코드');

  /* 합성 자료 */
  const TEAMS = ['FS WEST', 'FS EAST', 'FS CENTRAL', 'FS SOUTH'], UNITS = ['FS WEST', 'FS EAST', 'FS CENTRAL 대전', 'FS CENTRAL 광주', 'FS SOUTH 부산', 'FS SOUTH 대구'];
  const GROUPS = { 'FS CENTRAL': ['FS CENTRAL 대전', 'FS CENTRAL 광주'], 'FS SOUTH': ['FS SOUTH 부산', 'FS SOUTH 대구'] };
  const roster = [], office = {}; let k = 0;
  const add = (team, off, grade) => { const n = '가명' + String(++k).padStart(2, '0'); roster.push([n, team, grade]); if (off) office[n] = off; return n; };
  add('FS WEST', '', '팀장'); ['T4', 'T3', 'T3', 'T2', 'T2', 'T1', 'T1'].forEach(g => add('FS WEST', '', g));
  add('FS EAST', '', '팀장'); ['T3', 'T3', 'T2', 'T1', 'T1'].forEach(g => add('FS EAST', '', g));
  add('FS CENTRAL', '대전', '팀장'); ['T4', 'T2', 'T1'].forEach(g => add('FS CENTRAL', '대전', g)); ['T3', 'T2', 'T1'].forEach(g => add('FS CENTRAL', '광주', g));
  add('FS SOUTH', '부산', '팀장'); ['T3', 'T2', 'T2'].forEach(g => add('FS SOUTH', '부산', g)); ['T3', 'T1'].forEach(g => add('FS SOUTH', '대구', g));
  const names = roster.map(r => r[0]), newbie = [names[7], names[13], names[20]];   // WEST T1 · EAST T1 · 광주 T1
  let seed = 5; const rndF = () => (seed = (seed * 16807) % 2147483647) / 2147483647, ri = n => Math.floor(rndF() * n);
  const purps = ['고장 수리', '고장 수리', 'PM', 'PM', 'Calibration', '장비 설치', '기타'], prods = ['XN-1000', 'XR-1000', 'SP-50', 'CN-3000', 'UF-5000', 'HISCL-5000'];
  const raw = [];
  for (let m = 0; m < 6; m++) names.forEach(nm => { for (let i = 0, n = 6 + ri(8); i < n; i++) { const t = Date.UTC(2026, 5 + m, 1 + ri(27), 8 + ri(11), ri(60)), a = ri(60), pi = ri(prods.length), x = rndF();
    const att = x < .15 ? names[ri(names.length)] : x < .2 ? names[ri(names.length)] + ';' + names[ri(names.length)] + ';외부인갑' : x < .23 ? nm : '';
    raw.push({ st: rndF() < .04 ? '취소됨' : '완료됨', ft: '서비스', own: nm, att, err: rndF() < .6 ? 'E' + ri(6) : '', acct: '병원' + a, sn: prods[pi] + '-' + a, prod: prods[pi], purp: purps[ri(purps.length)], subj: '병원' + a + '/' + nm + ' 방문 요청', t, e: t + (20 + ri(200)) * 60000, c: t - 3600000 }); } });
  for (let i = 0; i < 20; i++) { const t = Date.UTC(2026, 6 + ri(4), 1 + ri(27), 10); raw.push({ st: '완료됨', ft: '서비스', own: i % 2 ? '외부인갑' : '외부인을', att: i === 0 ? names[2] : '', err: '', acct: '병원' + ri(60), sn: 'XN-1000-' + ri(60), prod: 'XN-1000', purp: '고장 수리', subj: '외부인갑 지원', t, e: t + 3600000, c: t }); }
  const eqRows = []; for (let a = 0; a < 60; a++) eqRows.push([a % 17 === 0 ? '' : a % 13 === 0 ? '외부인을' : names[(a * 5) % names.length], '병원' + a, '서울', 1 + a % 4, a % 7 === 0 ? 1 : 0, 0, 0, 1 + a % 4, 0, 0, 0, { XN: 1 + a % 4 }]);
  const rnd = n => require('crypto').webcrypto.getRandomValues(new Uint8Array(n));
  const mk = () => SC.staffBundle({ raw, roster, office, newbie, encodeAct: PD.encodeAct, rnd, ser: { v: 3, used: [['병원1', 'XN-1000-1', 'XN-1000', 20000]] }, eq: { rows: eqRows, src: '관리표.xlsx', made: '2026-11-04' }, inst: { map: { 병원1: { t: 'lab' } }, at: '2026-11-01 10:00', by: 'admin@example.invalid' }, acad: { talk: { made: '2026-11-03', days: {} } }, src: { act: 'act_2026_11_16.xlsx', ser: 'ser.xlsx' }, tzN: 3, made: '2026-11-17 08:30' });
  const B = mk(), J = JSON.stringify(B);

  /* ③ 이름·관리자 이메일·연장근무·좌표가 없다 */
  ok(!/가명\d\d|외부인[갑을]/.test(J), '사본에 이름이 남아 있음: ' + (J.match(/가명\d\d|외부인[갑을]/g) || []).slice(0, 3));
  ok(!/admin@example/.test(J) && !('hr' in B) && !('geo' in B), '관리자 이메일·연장근무·좌표가 들어 있음');
  ok(B.act.d.subj.every(x => /○/.test(x) || !x), '주제의 이름이 가려지지 않음');
  ok(B.tzN === 3 && B.src.act === 'act_2026_11_16.xlsx' && B.ser.used.length === 1 && B.inst.map['병원1'].t === 'lab' && B.acad.talk.made === '2026-11-03', '함께 넣는 자료가 빠짐');

  /* 명단: 사람 수·팀·사무소·직급 구성·신입 수는 같고 이름만 없다 */
  const unitOf = (r, off) => off[r[0]] ? r[1] + ' ' + off[r[0]] : r[1];
  const shape = (ro, off, nb) => { const o = {}; ro.forEach(r => { const u = unitOf(r, off) + '|' + r[2] + '|' + (nb.includes(r[0]) ? 'N' : ''); o[u] = (o[u] || 0) + 1; }); return JSON.stringify(Object.keys(o).sort().map(x => [x, o[x]])); };
  ok(B.ros.roster.length === roster.length && shape(B.ros.roster, B.ros.office, B.ros.newbie) === shape(roster, office, newbie), '명단 구성(단위·직급·신입)이 달라짐');
  ok(B.ros.roster.every(r => /^~[a-z2-9]{6}$/.test(r[0])) && new Set(B.ros.roster.map(r => r[0])).size === roster.length && B.ros.gradeHist.length === 0, '가짜 사람 번호 형식');
  ok(B.ros.roster.map(r => r[1] + r[2]).join() !== roster.map(r => r[1] + r[2]).join(), '명단 순서가 그대로임(순서로 주인을 맞힐 수 있음)');

  /* ④ 단위 합계 = 원본 (같은 계산식 kpiCore·buildProdData 로 비교) */
  const sRaw = PD.rowsOfAct(B.act), R0 = PD.rowsOfAct(PD.encodeAct(raw, 's'));   // 원본도 같은 분 단위 반올림을 거친 값으로
  const pro = (ro, off) => ro.map(r => [r[0], unitOf(r, off), r[2]]);
  const C0 = kpiCore(R0, roster, { teams: TEAMS }), C1 = kpiCore(sRaw, B.ros.roster, { teams: TEAMS });
  ok(C0.rows.length === C1.rows.length, '대상 행 수가 다름');
  ok(C0.rows.every((x, i) => x.credits.map(n => C0.memberTeam[n]).sort().join() === C1.rows[i].credits.map(n => C1.memberTeam[n]).sort().join()), '건마다 인정 인원의 팀 구성이 달라짐');
  const inP = () => true;
  TEAMS.concat([null]).forEach(t => ok(JSON.stringify(C0.revisitAvg(inP, t)) === JSON.stringify(C1.revisitAvg(inP, t)), '재방문율·FTFR 이 다름: ' + t));
  const opt = (ro, nb) => ({ teams: UNITS, teamGroups: GROUPS, gradeNow: Object.fromEntries(ro.map(r => [r[0], r[2]])), exclAvg: ro.filter(r => r[2] === '팀장' || nb.includes(r[0])).map(r => r[0]), gradeHist: [], sel: ['2026-09', '2026-10'], cmp: ['2026-07', '2026-08'], trend: [], labels: { '이번 년도': 'a', '직전 년도': 'b', '전체 누적': 'c' } });
  const P0 = buildProdData(R0, pro(roster, office), opt(roster, newbie)), P1 = buildProdData(sRaw, pro(B.ros.roster, B.ros.office), opt(B.ros.roster, B.ros.newbie));
  UNITS.concat(Object.keys(GROUPS)).forEach(u => ['이번 년도', '직전 년도'].forEach(pr => { const a = P0.team[u], b = P1.team[u];
    ok(a.members.length === b.members.length && a.n_core === b.n_core, u + ' 인원');
    ok(a.total_case[pr] === b.total_case[pr], u + ' 처리 건수 ' + pr + ': ' + a.total_case[pr] + ' / ' + b.total_case[pr]);
    ok(a.case_avg_core[pr] === b.case_avg_core[pr], u + ' 1인당 처리 건수(팀장·신입 제외) ' + pr + ': ' + a.case_avg_core[pr] + ' / ' + b.case_avg_core[pr]);
    ok(JSON.stringify(a.case[pr]) === JSON.stringify(b.case[pr]) && JSON.stringify(a.group_case[pr]) === JSON.stringify(b.group_case[pr]), u + ' 업무 유형·장비 그룹 건수');
    const mt = o => { let x = 0, n = 0; Object.values(o.mttr[pr]).forEach(d => { x += d.avg * d.n; n += d.n; }); return n ? x / n : null; };
    ok(mt(a) == null ? mt(b) == null : Math.abs(mt(a) - mt(b)) < 0.05, u + ' MTTR ' + pr + ': ' + mt(a) + ' / ' + mt(b));
    ok(JSON.stringify(P0.revisit[u].team_total) === JSON.stringify(P1.revisit[u].team_total), u + ' 재방문율·FTFR'); }));
  /* 담당 장비: 단위별 장비 합, 명단 밖 담당자·빈 칸은 그대로 구분 */
  const eqSum = (rows, ro, off) => { const m = Object.fromEntries(pro(ro, off).map(r => [r[0], r[1]])), o = {}; rows.forEach(r => { const u = m[r[0]] || (r[0] ? '명단 밖' : '빈 칸'); o[u] = (o[u] || 0) + r[3]; }); return JSON.stringify(Object.keys(o).sort().map(x => [x, o[x]])); };
  ok(eqSum(B.eq.rows, B.ros.roster, B.ros.office) === eqSum(eqRows, roster, office), '단위별 담당 장비 합이 다름');
  ok(B.eq.rows.every((r, i) => r[1] === eqRows[i][1] && r[3] === eqRows[i][3]) && B.eq.src === '관리표.xlsx', '관리표의 기관·장비 수가 바뀜');

  /* ⑤ 한 사람의 실적은 남지 않는다 — 같은 사람이 건마다 다른 번호로, 같은 거래처·같은 날에는 같은 번호(공동 방문 인원 수 유지) */
  const first = names[2], ids = new Set(); R0.forEach((r, i) => { if (r.own === first) ids.add(sRaw[i].own); });
  ok(ids.size > 1, '한 사람이 늘 같은 번호로 남음(' + ids.size + ')');
  const core0 = P0.team['FS WEST'].members.filter(n => roster.find(r => r[0] === n)[2] !== '팀장' && !newbie.includes(n)).map(n => P0.person[n].total_case['이번 년도']).sort((a, b) => a - b).join();
  const m1 = Object.fromEntries(B.ros.roster.map(r => [r[0], r])), core1 = P1.team['FS WEST'].members.filter(n => m1[n][2] !== '팀장' && !B.ros.newbie.includes(n)).map(n => P1.person[n].total_case['이번 년도']).sort((a, b) => a - b).join();
  ok(core0 !== core1, '개인별 건수 분포가 원본과 같음 — 섞이지 않았다');
  const grp = (rows, C) => { const g = {}; C.rows.forEach(x => { const k2 = x.acct + '|' + Math.floor(x.t / 86400000); (g[k2] = g[k2] || new Set()); x.credits.forEach(n => g[k2].add(n)); }); return Object.keys(g).sort().map(k2 => g[k2].size).join(); };
  ok(grp(R0, C0) === grp(sRaw, C1), '같은 거래처·같은 날의 인원 수가 달라짐');
  ok(JSON.stringify(mk().ros.roster) !== JSON.stringify(B.ros.roster), '만들 때마다 번호가 같음');
  ok(sRaw.filter(r => r.own === '~other').length === R0.filter(r => /외부인/.test(r.own)).length, '명단 밖 담당자 표시');

  /* ⑥ PC 올리기: 같은 사본을 만들고, 직원용 코드로만 열리며 접근 코드를 알 수 없다 */
  const S = await PD.buildStaff({ code: 'TESTCODE', actPayload: PD.encodeAct(raw, 'act_2026_11_16.xlsx'), serPayload: null, eq: { rows: eqRows, src: '관리표.xlsx', made: '' }, roster, office, newbie, made: '2026-11-17 08:30' });
  const opened = await PD.open_(S.data, sc);
  ok(opened.kind === 'fsg-kpi-staff' && opened.act.n === raw.length && !/가명\d\d|외부인[갑을]/.test(JSON.stringify(opened)), 'PC 올리기 사본');
  ok(await PD.codeOk(sc, S.meta) && !(await PD.codeOk('TESTCODE', S.meta)), '직원용 meta 는 직원용 코드로만 확인돼야 함');
  let leadOpens = true; try { await PD.open_(await PD.seal({ x: 1 }, 'TESTCODE'), sc); } catch (e) { leadOpens = false; } ok(!leadOpens, '직원용 코드로 원본(접근 코드로 잠근 자료)이 열림');
  /* rowsOfAct = 대시보드 decodeEmbed (S/N 정리 제외) */
  const dec = new Function('snOf', sliceFunction(html, 'decodeEmbed') + '\nreturn decodeEmbed;')(x => x || '');
  ok(JSON.stringify(dec(PD.encodeAct(raw, 's'))) === JSON.stringify(R0), 'rowsOfAct 가 대시보드 decodeEmbed 와 다름');
  /* 시각 보정은 사본을 만들 때 미리 적용된다 — 사본에는 보정 대상 이름이 없으므로 */
  const tzName = SC.TZ_FIX.names[0], t0 = Date.UTC(2026, 3, 10, 19, 0), E9 = PD.encodeAct([{ st: '완료됨', ft: '', own: tzName, att: '', err: '', acct: 'H', sn: '', prod: '', purp: 'PM', subj: '', t: t0, e: t0 + 3600000, c: t0 - 9 * 3600000 }], 's');
  const S9 = await PD.buildStaff({ code: 'TESTCODE', actPayload: E9, roster: [[tzName, 'FS WEST', 'T1']], office: {}, newbie: [], made: 'x' });
  ok(S9.bundle.tzN === 1 && S9.bundle.act.t[0] * 60000 === t0 - 9 * 3600000 && !JSON.stringify(S9.bundle).includes(tzName), '+9시간 보정이 사본에 미리 적용되지 않음');

  /* ⑦ 화면 규칙 */
  ok(/\.staff body:not\(\[data-view=eqp\]\) #prod[^{]*\{display:none!important\}/.test(html), '직원 화면에서 사람 단위 화면(#prod)을 숨기는 규칙이 없음');
  ok(/if\(STAFF&&VIEW!=='eqp'\)\{ ensureProd\(\); return; \}/.test(html), '직원 화면이 사람 단위 화면을 그림');
  ok(/if\(STAFF\) staffScrub\(PROD\);/.test(html) && /function staffScrub/.test(html), '직원 화면에서 점수·지수를 비우지 않음');
  ok(/if\(STAFF\)\{ await loadStaff\(\); return; \}/.test(html) && /fbCached\('staff\/data'/.test(html), '직원 화면이 원본 경로를 읽음');
  ok(/const sm = ok && kind!=='hr' && kind!=='geo' \? await staffSyncMsg\(\) : ''/.test(html), '올린 뒤 직원용 자료를 갱신하지 않음');
  ok(/if\(STAFF\|\|!RAW\|\|!CODE\) return false;/.test(html), '직원 화면에서 직원용 자료를 다시 만들 수 있음(섞인 자료로 덮어씀)');
  const loadStaff = sliceFunction(html, 'loadStaff');
  ok(!/'hr'|'geo'|loadShifts/.test(loadStaff) && /HRDATA=null; GEO=null/.test(loadStaff), '직원 화면이 연장근무·좌표·근무일정표를 읽음');
  console.log('test_staff: OK ' + pass + '항목 (staff-core == fsg-kpi.html · 이름 없음 · 단위 합계 같음 · 개인 실적 섞임 · PC 올리기 같은 사본 · 화면 규칙)');
})().catch(e => { console.error(e.message || e); process.exit(1); });
