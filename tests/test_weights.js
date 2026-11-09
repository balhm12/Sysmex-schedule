/* KPI 가중치 설정(2026-11): 적용 시작월별 묶음이 buildProdData 점수에 반영되는지 — 합성 데이터(가명)만 사용한다.
 * 실행: node tests/test_weights.js */
const assert = require('assert');
const { buildProdData } = require('../fsg-report/kpi-core');
const TEAMS = ['FS WEST', 'FS EAST', 'FS CENTRAL 대전', 'FS CENTRAL 광주', 'FS SOUTH 부산', 'FS SOUTH 대구'];
const GROUPS = { 'FS CENTRAL': ['FS CENTRAL 대전', 'FS CENTRAL 광주'], 'FS SOUTH': ['FS SOUTH 부산', 'FS SOUTH 대구'] };
const ROSTER = [['가명A', 'FS WEST', 'T3'], ['가명B', 'FS WEST', '팀장']];
const act = (month, day, purp, own) => ({ st: '완료됨', ft: '', t: Date.UTC(2026, month - 1, day, 10), e: Date.UTC(2026, month - 1, day, 11), own, att: '', err: 'E1', acct: 'H' + day, sn: '', prod: 'XN-1000', purp, subj: '' });
const RAW = [act(10, 5, '고장 수리', '가명A'), act(10, 6, 'PM', '가명A'), act(11, 5, '고장 수리', '가명A'), act(12, 5, '고장 수리', '가명A'), act(12, 6, 'PM', '가명A')];
const run = (weights, sel) => buildProdData(RAW, ROSTER, { teams: TEAMS, teamGroups: GROUPS, gradeNow: { 가명A: 'T3', 가명B: '팀장' }, exclAvg: ['가명B'], gradeHist: [], weights, sel, cmp: [], labels: { '이번 년도': 'x', '직전 년도': 'y', '전체 누적': 'z' } });
const score = (P, who) => Math.round((P.person[who].score['이번 년도'] || 0) * 100) / 100;
const R2 = x => Math.round(x * 100) / 100;
let pass = 0; const ok = (c, m) => { if (!c) throw new Error('FAIL: ' + m); pass++; };

// 1) 설정이 없으면 기본값(고장 수리 3 + T3 0.4, PM 0.5 + 0.4)
let P = run(undefined, ['2026-10', '2026-11', '2026-12']);
ok(score(P, '가명A') === R2(3.4 * 3 + 0.9 * 2), '기본값 점수 ' + score(P, '가명A'));
ok(P.weights.items.length === 0 && P.weights.base.score['고장 수리'] === 3 && P.weights.base.grade.T3 === 0.4, '기본값 요약');
ok(JSON.stringify(P.weights.groups) === JSON.stringify(['고장 수리', '장비 설치', '성능 평가·인증 지원', '장비 이전 설치', 'Calibration', 'PM', '장비 철수', '고객 요청', '기타']), '묶음 순서');
// 2) 2026-12부터 고장 수리 4, PM 1, T3 0.5 — 10·11월은 그대로
const W = [{ from: '2026-12', score: { '고장 수리': 4, 'PM': 1 }, grade: { T3: 0.5 } }];
ok(score(run(W, ['2026-10']), '가명A') === 3.4 + 0.9, '시작월 전(10월)은 기본값');
ok(score(run(W, ['2026-11']), '가명A') === 3.4, '시작월 전(11월)은 기본값');
ok(score(run(W, ['2026-12']), '가명A') === 4.5 + 1.5, '시작월 이후(12월) 새 값 ' + score(run(W, ['2026-12']), '가명A'));
ok(score(run(W, ['2026-10', '2026-11', '2026-12']), '가명A') === 3.4 + 0.9 + 3.4 + 4.5 + 1.5, '여러 달은 달마다 다른 값');
// 3) 값이 없는 묶음·직급은 앞 묶음(기본값)을 유지, 일부만 바꿔도 된다
ok(score(run([{ from: '2026-12', score: { 'PM': 2 }, grade: {} }], ['2026-12']), '가명A') === 3.4 + 2.4, '일부만 변경');
// 4) 묶음은 여러 목적을 한꺼번에 바꾼다(성능 평가·인증 지원 = 6개 목적)
const P4 = run([{ from: '2026-01', score: { '성능 평가·인증 지원': 5 }, grade: {} }], ['2026-10']);
ok(P4.weights.items[0].score['성능 평가·인증 지원'] === 5 && P4.weights.items[0].score['고장 수리'] === 3, '요약에 묶음 값');
// 5) 두 번 이어 바꾸면 뒤 묶음이 앞 묶음 위에 덮인다
const W2 = [{ from: '2026-11', score: { '고장 수리': 4 }, grade: {} }, { from: '2026-12', score: { 'PM': 1 }, grade: {} }];
ok(score(run(W2, ['2026-12']), '가명A') === R2(4.4 + 1.4), '12월 = 11월 값 + PM 1 (' + score(run(W2, ['2026-12']), '가명A') + ')');
// 6) 이상한 값(글자·무한)은 무시하고 기본값 유지, 순서가 뒤섞여도 시작월 순
ok(score(run([{ from: '2026-12', score: { '고장 수리': 'x', 'PM': Infinity }, grade: {} }], ['2026-12']), '가명A') === 3.4 + 0.9, '숫자가 아니면 무시');
ok(score(run(W2.slice().reverse(), ['2026-12']), '가명A') === R2(4.4 + 1.4), '입력 순서와 무관');
// 7) 월간보고 엔진이 대시보드가 저장한 모양(items 객체)과 배열 모양을 같은 목록으로 읽는다
const { parseWeights } = require('../fsg-report/report-data');
const saved = { rev: 'x', items: { '2026-12': { score: { 'PM': 1 }, grade: { T3: 0.5 }, at: 't', by: 'a' }, '2026-11': { score: { '고장 수리': 4 } }, 'bad': { score: {} }, '2026-13': {} } };
const L = parseWeights(saved);
ok(JSON.stringify(L.map(x => x.from)) === '["2026-11","2026-12"]', '시작월 형식이 아닌 항목은 버리고 순서대로');
ok(L[1].score.PM === 1 && L[1].grade.T3 === 0.5 && L[0].grade && Object.keys(L[0].grade).length === 0, '값 보존·빈 직급은 빈 객체');
ok(parseWeights(null).length === 0 && parseWeights({}).length === 0 && parseWeights([{ from: '2026-12', score: { PM: 2 } }])[0].score.PM === 2, '없음·빈 값·배열');
ok(score(run(L, ['2026-12']), '가명A') === R2(4.5 + 1.5), '엔진 형식 → 계산 (' + score(run(L, ['2026-12']), '가명A') + ')');
console.log('test_weights: OK (' + pass + '개 확인)');
