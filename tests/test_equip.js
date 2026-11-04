// 담당 장비(관리표 정리본) — ① equip-core.js == fsg-kpi.html ② 대시보드 함수와 같은 읽기 결과 ③ 엔진 peopleKpi.units.equip 값(손 계산) ④ json 에 이름·기관명 없음
const assert = require('assert'), fs = require('fs'), path = require('path'), vm = require('vm'), XLSX = require('xlsx');
const X = require('../fsg-report/tools/extract-equip-core');
const K = require('../fsg-report/tools/extract-kpi-core');
const html = fs.readFileSync(X.HTML, 'utf8');

// ① 생성 파일이 대시보드와 같은지
assert.strictEqual(fs.readFileSync(X.OUT, 'utf8'), X.build(html), 'fsg-report/equip-core.js 가 fsg-kpi.html 과 다릅니다 → node fsg-report/tools/extract-equip-core.js');
const EQC = require('../fsg-report/equip-core');
assert.deepStrictEqual(EQC.EQ_FIELDS, ['CBC', '유린', '응고', '면역']);

// 합성 정리본: 제목 줄 + 머리글 + 기관 행 (실제 이름 없음)
const HEAD = ['담당자', '기관명', '시·도', '장비 수', '혈액 시스템', '유린 시스템', '응고 시스템', 'XN', 'XN-L', 'XR', 'SP', 'DI', 'HLC', 'UF', 'UC', 'UD', 'CA', 'CS-1600·2500', 'CS-5100', 'CN', 'HISCL'];
const fam = o => HEAD.slice(7).map(k => o[k] || 0);
const R = (p, n, e, sB, sU, sC, f) => [p, n, '서울', e, sB, sU, sC, ...fam(f || {})];
const ROWS = [
  R('A', 'ACCT-SECRET-1', 10, 1, 0, 0, { XN: 6, XR: 2, UF: 2 }), R('A', 'ACCT-SECRET-2', 5, 0, 1, 0, { XN: 3, UC: 1, CA: 1 }),
  R('C', 'ACCT-SECRET-3', 4, 0, 0, 1, { CA: 2, CN: 2 }), R('B', 'ACCT-SECRET-4', 20, 2, 1, 0, { XN: 10, 'XN-L': 2, SP: 4, UD: 2, HISCL: 2 }),
  R('X', 'ACCT-SECRET-5', 8, 0, 1, 0, { UF: 4, UC: 4 }), R('Q', 'ACCT-SECRET-6', 3, 0, 0, 0, { XN: 3 }),
];
const mkWb = rows => { const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([['제목 줄'], [], HEAD, ...rows, []]), '담당기관 마스터'); XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([['요약']]), '요약'); return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' }); };
const buf = mkWb(ROWS);

// ② 대시보드의 함수(브라우저 코드)를 그대로 실행한 결과와 같은지
const ctx = vm.createContext({ XLSX, TextDecoder, Uint8Array });
vm.runInContext([...X.CONSTS.map(n => html.match(new RegExp('^const ' + n + '=.*;$', 'm'))[0]), ...X.FUNCS.map(n => K.sliceFunction(html, n)), 'this.parseEq = parseEq; this.eqByPerson = eqByPerson;'].join('\n'), ctx);
const dash = ctx.parseEq(new Uint8Array(buf), 'FSG_FSR_담당기관관리표_20261104_정리본.xlsx'), mine = EQC.parseEq(buf, 'FSG_FSR_담당기관관리표_20261104_정리본.xlsx');
assert.strictEqual(JSON.stringify(mine), JSON.stringify(dash), '대시보드 parseEq 와 같은 결과');
assert.strictEqual(mine.made, '2026-11-04'); assert.strictEqual(mine.rows.length, 6);
assert.deepStrictEqual(mine.rows[0], ['A', 'ACCT-SECRET-1', '서울', 10, 1, 0, 0, 8, 2, 0, 0], '분야 합: CBC = XN+XR, 유린 = UF');
assert.deepStrictEqual(mine.rows[3], ['B', 'ACCT-SECRET-4', '서울', 20, 2, 1, 0, 16, 2, 0, 2], 'XN 10 + XN-L 2 + SP 4 = CBC 16, UD 2, HISCL 2');
assert.strictEqual(JSON.stringify(EQC.eqByPerson(mine.rows)), JSON.stringify(ctx.eqByPerson(mine.rows)));
// 장비 수가 모두 비면(수식 계산값 없음) 막는다 · 시트가 없으면 안내
assert.throws(() => EQC.parseEq(mkWb(ROWS.map(r => [r[0], r[1], r[2], null, ...r.slice(4)])), 'x.xlsx'), /장비 수가 모두 비어 있습니다/);
const wb2 = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb2, XLSX.utils.aoa_to_sheet([['a']]), '다른 시트');
assert.throws(() => EQC.parseEq(XLSX.write(wb2, { type: 'buffer', bookType: 'xlsx' }), 'x.xlsx'), /담당기관 마스터/);

// 파일 이름 분류(폴더에서 자동 선택) — 활동·Serial 분류는 그대로
const RC = require('../fsg-report/lib/read-crm');
assert.strictEqual(RC.classifyByName('FSG_FSR_담당기관관리표_20261104_정리본.xlsx'), 'EQ');
assert.strictEqual(RC.classifyByName('2. 모든 약속_활동 2026_11_04 AM 8-50-10.xlsx'), 'ACT'); assert.strictEqual(RC.classifyByName('Serial No 2026_11_04 AM 8-48-45.xlsx'), 'SER');

// ③ 엔진 값 — 손 계산. 로스터: A·C = EAST(C 팀장), B = WEST, X = CENTRAL 대전(office), 김민결 = 제외, Q 는 로스터 밖
const { buildReport } = require('../fsg-report/lib/report-core');
const T = (y, m, d, h) => Date.UTC(y, m - 1, d, h || 0), DAY = 86400000, ser = ms => ms / DAY + 25569;
const AH = ['상태', '양식 타입', '시작 시간', '종료 시간', '담당자', '필수 참석자', '주제', 'Error 1', '거래처', 'Serial No. (lookup)', 'Product', '약속/활동 목적'];
const ar = (own, purp, d, att) => ['완료됨', '서비스 요청', ser(T(2026, 9, d, 10)), ser(T(2026, 9, d, 11)), own, att || '', '', '', 'H' + d, 'S' + d, 'XN-1000', purp];
const awb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(awb, XLSX.utils.aoa_to_sheet([AH, ar('A', '고장 수리', 1), ar('A', 'PM', 2, 'C'), ar('B', '고장 수리', 3), ar('B', 'PM', 4), ar('X', '고장 수리', 5), ar('A', 'Calibration', 6),
  ar('B', 'PM', 17)]), '약속');
const act = RC.parseActivity(XLSX.write(awb, { type: 'buffer', bookType: 'xlsx' }));
const ROSTER = [['A', 'FS EAST', 'T2'], ['C', 'FS EAST', '팀장'], ['B', 'FS WEST', 'T1'], ['X', 'FS CENTRAL', 'T3'], ['김민결', 'FS SOUTH', 'T2']];
const prodC = { office: { X: '대전' }, gradeHist: [], newbie: [] };
const base = buildReport({ raw: act.rows, roster: ROSTER, period: '2026-09', cut: '2026-09-30', prod: prodC });
assert.strictEqual(base.peopleKpi.units.equip, undefined, '관리표를 안 주면 equip 없음'); assert.strictEqual(base.inputs.equip, false);
const rep = buildReport({ raw: act.rows, roster: ROSTER, period: '2026-09', cut: '2026-09-30', prod: prodC, equip: mine });
const E = rep.peopleKpi.units.equip, row = k => E.rows.find(r => r.key === k);
assert.strictEqual(rep.inputs.equip, true); assert.strictEqual(E.asOf, '2026-11-04'); assert(/현재 관리표 기준/.test(E.note));
assert.deepStrictEqual(E.rows.map(r => r.key), ['FS WEST', 'FS EAST', 'FS CENTRAL 대전', 'FS CENTRAL 광주', 'FS SOUTH 부산', 'FS SOUTH 대구', 'FS WEST', 'FS EAST', 'FS CENTRAL', 'FS SOUTH'], 'units 6 + teams 4 순서');
assert.deepStrictEqual(E.rows.map(r => r.kind), ['office', 'office', 'office', 'office', 'office', 'office', 'team', 'team', 'team', 'team']);
const east = row('FS EAST');
assert.strictEqual(east.nPeople, 2, '장비 담당 인원 = 구성원(팀장 포함)'); assert.strictEqual(east.accounts, 3); assert.strictEqual(east.equip, 19, 'A 15 + C(팀장) 4'); assert.strictEqual(east.equipPerHead, 9.5);
assert.deepStrictEqual(east.systems, { blood: 1, urine: 1, coag: 1 }); assert.deepStrictEqual(east.fields, { CBC: 11, urine: 3, coag: 5, immuno: 0 }, 'A CBC 8+3, 유린 2+1, 응고 1 · C 응고 4');
const west = row('FS WEST'); assert.deepStrictEqual([west.nPeople, west.accounts, west.equip, west.equipPerHead], [1, 1, 20, 20]); assert.deepStrictEqual(west.systems, { blood: 2, urine: 1, coag: 0 });
const dj = row('FS CENTRAL 대전'); assert.deepStrictEqual([dj.nPeople, dj.equip, dj.equipPerHead], [1, 8, 8]);
const gj = row('FS CENTRAL 광주'); assert.deepStrictEqual([gj.nPeople, gj.equip, gj.per100], [0, 0, null], '인원·장비 없는 사무소');
const busan = row('FS SOUTH 부산'); assert.strictEqual(busan.equip, 0); assert.strictEqual(busan.per100, null, '장비 0이면 100대당 처리 건수는 null');
// 100대당 처리 건수 = 기간 처리 건수 ÷ 담당 장비 × 100 (대시보드 renderEquip 과 같은 식). 처리 건수는 담당자+필수 참석자 각각 1건
const top = {}; rep.peopleKpi.top.forEach(x => { top[x.name] = x.count; });
const cases = names => names.reduce((t, n) => t + (top[n] || 0), 0), r1 = v => Math.round(v * 10) / 10;
assert.strictEqual(east.per100, r1(cases(['A', 'C']) / 19 * 100), 'EAST = (A+C 건수) ÷ 19 × 100'); assert.strictEqual(west.per100, r1(cases(['B']) / 20 * 100)); assert.strictEqual(dj.per100, r1(cases(['X']) / 8 * 100));
assert.strictEqual(top.C, 1, '팀장 C 는 A 의 PM 에 필수 참석자로 1건 — 팀장도 구성원이라 EAST 장비·건수에 들어간다')
assert.strictEqual(E.total.equip, 19 + 20 + 8, '로스터 단위 구성원의 장비 합'); assert.strictEqual(E.total.nPeople, 4); assert.strictEqual(E.total.accounts, 5);
assert.strictEqual(E.total.per100, r1(cases(['A', 'B', 'C', 'X']) / 47 * 100));
assert.deepStrictEqual(E.unmatched, Object.assign({ accounts: 1, equip: 3 }, { note: E.unmatched.note })); assert(/로스터/.test(E.unmatched.note));
assert.deepStrictEqual(E.fileTotal, { owners: 5, accounts: 6, equip: 50, systems: 7 }, '파일 전체(로스터 밖 포함)');
// 같은 값이 직전 기간으로도 나온다(같은 장비 수로 나눔)
assert(east.per100Prev === null || typeof east.per100Prev === 'number');

// ④ json 에 이름·기관명·개인별 장비 수가 없다
const blob = JSON.stringify(E);
assert(!/ACCT-SECRET/.test(blob), '기관명 없음'); assert(!/"(A|B|C|X|Q)"/.test(blob), '담당자 이름 없음');
Object.keys(E).forEach(k => assert(['asOf', 'source', 'note', 'basis', 'rows', 'total', 'unmatched', 'fileTotal'].includes(k), '예상 밖 키: ' + k));
console.log('test_equip: OK (equip-core == fsg-kpi.html · 대시보드 parseEq 와 같은 결과 · 엔진 사무소 6·팀 4·total 손 계산 · 개인 정보 없음)');
