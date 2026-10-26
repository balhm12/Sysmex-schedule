// 같은 날짜 활동 파일 판정 — 기간 분할 내보내기(합침) vs 같은 기간 재내보내기(최신만)
const assert = require('assert');
const R = require('../fsg-report/lib/read-crm');
const DAY = 86400000, T = (m, d, h) => Date.UTC(2026, m - 1, d, h || 0);
const mk = (t, st, own) => ({ st: st || '완료됨', ft: '서비스 요청', t, e: t + 3600000, own: own || 'A', err: '', acct: 'H', sn: 'S' + t, prod: '', purp: '고장 수리', subj: 's' + t, att: '', c: null });
const act = rows => ({ rows, header: [], hasAtt: true, hasFormType: true, sheet: 'x' });
const days = (a, b, st) => { const o = []; for (let d = a; d <= b; d++) o.push(mk(T(9, d, 10), st)); return o; };

assert.strictEqual(R.fileTimeOfDay('2. 모든 약속_활동 2026_10_26 AM 12-34-04.xlsx'), 34 * 60 + 4, 'AM 12 = 0시');
assert.strictEqual(R.fileTimeOfDay('x 2026_10_26 PM 03-10-00.xlsx'), 15 * 3600 + 600); assert.strictEqual(R.fileTimeOfDay('x 2026_10_26 PM 12-00-00.xlsx'), 12 * 3600); assert.strictEqual(R.fileTimeOfDay('x 2026_10_26.xlsx'), null);

// 1. 분할 내보내기: 범위가 이어 붙음(경계 행 1개만 겹침) → 둘 다 사용, 합침
let r = R.resolveActivity([{ name: 'a (1)', mtime: 1, act: act(days(1, 14)) }, { name: 'a (2)', mtime: 2, act: act(days(14, 30)) }]);
assert.deepStrictEqual([r.used, r.superseded, r.rows.length, r.dup, r.merged], [['a (1)', 'a (2)'], [], 30, 1, 2], '분할: 1~14 + 14~30 → 30행, 경계 1행 제외');
// 2. 재내보내기: 같은 범위 → 가장 새 파일만. 상태가 바뀐 행이 이중으로 잡히지 않는다
r = R.resolveActivity([{ name: 'old AM 09-00-00', mtime: 5, act: act(days(1, 30).map((x, i) => i === 3 ? Object.assign({}, x, { st: '시작됨' }) : x)) }, { name: 'new PM 03-00-00', mtime: 1, act: act(days(1, 30)) }]);
assert.deepStrictEqual([r.used, r.superseded, r.rows.length], [['new PM 03-00-00'], ['old AM 09-00-00'], 30], '이름의 시각이 mtime보다 우선');
assert.strictEqual(r.rows.filter(x => x.st === '시작됨').length, 0, '새 파일의 완료됨만');
// 3. 이름에 시각이 없으면 mtime
r = R.resolveActivity([{ name: 'x', mtime: 1, act: act(days(1, 30)) }, { name: 'y', mtime: 9, act: act(days(1, 30)) }]); assert.deepStrictEqual([r.used, r.superseded], [['y'], ['x']]);
// 4. 세 파일: 서로 겹치는 둘 + 떨어진 하나 → 새 쪽 하나 + 떨어진 하나
r = R.resolveActivity([{ name: 'p AM 01-00-00', mtime: 1, act: act(days(1, 10)) }, { name: 'q AM 02-00-00', mtime: 2, act: act(days(1, 10)) }, { name: 'r AM 03-00-00', mtime: 3, act: act(days(11, 20)) }]);
assert.deepStrictEqual([r.used, r.superseded], [['q AM 02-00-00', 'r AM 03-00-00'], ['p AM 01-00-00']]);
// 5. 겹침이 절반 미만이면 분할로 본다(경계 며칠 겹쳐 내보낸 경우), 절반 이상이면 재내보내기
r = R.resolveActivity([{ name: 'm', mtime: 1, act: act(days(1, 20)) }, { name: 'n', mtime: 2, act: act(days(16, 30)) }]); assert.deepStrictEqual([r.used.length, r.superseded.length, r.rows.length], [2, 0, 30], '겹침 5일/짧은 쪽 14일 → 분할');
r = R.resolveActivity([{ name: 'm', mtime: 1, act: act(days(1, 20)) }, { name: 'n', mtime: 2, act: act(days(5, 25)) }]); assert.deepStrictEqual([r.used, r.superseded], [['n'], ['m']], '겹침 15일/짧은 쪽 20일 → 재내보내기');
// 6. 시각 정보가 없는 파일은 겹침을 판정하지 않고 합친다(똑같은 행만 제외)
const noT = [Object.assign(mk(null), { subj: 'a' }), Object.assign(mk(null), { subj: 'b' })];
r = R.resolveActivity([{ name: 'u', mtime: 1, act: act(noT) }, { name: 'v', mtime: 2, act: act(noT.slice(0, 1)) }]); assert.deepStrictEqual([r.used.length, r.rows.length, r.dup], [2, 2, 1]);
// 7. 한 파일이면 그대로
r = R.resolveActivity([{ name: 'solo', mtime: 1, act: act(days(1, 3)) }]); assert.deepStrictEqual([r.used, r.superseded, r.rows.length, r.merged], [['solo'], [], 3, undefined]);
console.log('test_activity_files: OK (분할 내보내기 합침 · 같은 기간 재내보내기 최신만 · 파일명 시각/mtime 순서 · 경계 겹침 허용 · 시각 없는 파일)');
