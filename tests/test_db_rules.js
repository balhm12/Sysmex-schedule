/* 설치·근무일정 DB 규칙 1·2단계(firebase/database.rules.stage1·stage2.json) 검증 — targaryen 으로 규칙을 그대로 돌려 본다.
 * 가명 데이터만 사용한다. 실행: node tests/test_db_rules.js
 */
const assert = require('assert');
const path = require('path');
const targaryen = require('targaryen');
const rules = require(path.join(__dirname, '..', 'firebase', 'database.rules.stage1.json'));

const NOW = Date.UTC(2026, 10, 6);
const dbWith = data => targaryen.database(rules, data || {}, NOW);
const anon = { uid: 'anon-user-1', provider: 'anonymous' };
let pass = 0;
function ok(cond, msg) { if (!cond) throw new Error('FAIL: ' + msg); pass++; }
const canWrite = (p, v, data) => dbWith(data).as(anon).write(p, v).allowed;
const canRead = (p, who, data) => dbWith(data).as(who === undefined ? anon : who).read(p).allowed;

const ev = (o) => Object.assign({ id: 'user-1', category: 'install', start: '2026-11-03', end: '2026-11-05', title: '○○대학교병원', device: 'XN-1000', team: 'FS West' }, o || {});
const entry = { night: '', weekend: '', am1: '재택', am2: '', pm1: '', pm2: '' };
const snapshot = { custom: { 'user-1': ev() }, edited: {}, deleted: { 'base-3': true }, clients: {} };

/* ---- 읽기 ---- */
ok(!canRead('/', null), '로그인 없는 맨 위 읽기는 막힘');
ok(!canRead('/schedule-overrides', null), '로그인 없는 일정 읽기는 막힘');
ok(!canRead('/', anon), '로그인해도 맨 위 읽기는 막힘');
ok(canRead('/schedule-overrides', anon), '일정 읽기');
ok(canRead('/schedule-backups', anon), '백업 목록 읽기(정리용 shallow)');
ok(canRead('/work-schedule', anon) && canRead('/work-schedule-backups/2026-11-05/west', anon), '근무일정·백업 읽기');
ok(canRead('/voc-dashboard/data', anon) && canRead('/kpi-dashboard/meta', anon), '만족도·KPI 읽기(현행 유지)');
ok(!canRead('/unknown-path', anon), '정해지지 않은 경로는 읽기 막힘');

/* ---- 설치일정: 전체 덮어쓰기 금지, 한 건 단위 쓰기만 ---- */
ok(!canWrite('/', null), '맨 위 통째 삭제 금지');
ok(!canWrite('/unknown-path', { a: 1 }), '정해지지 않은 경로 쓰기 금지');
ok(!canWrite('/schedule-overrides', snapshot), 'schedule-overrides 통째 덮어쓰기 금지');
ok(!canWrite('/schedule-overrides', null), 'schedule-overrides 통째 삭제 금지');
ok(!canWrite('/schedule-overrides/custom', null, { 'schedule-overrides': snapshot }), 'custom 전체 삭제 금지');
ok(canWrite('/schedule-overrides/custom/user-1', ev()), '일정 한 건 저장');
ok(canWrite('/schedule-overrides/edited/base-6', ev({ id: 'base-6' })), '기본 일정 수정본 저장');
ok(canWrite('/schedule-overrides/custom/user-1', null, { 'schedule-overrides': snapshot }), '일정 한 건 삭제');
ok(canWrite('/schedule-overrides/custom/user-2', ev({ id: 'user-2', device: null, team: null, assignee: null })), '장비·팀·담당 비어 있어도 저장');
ok(canWrite('/schedule-overrides/deleted/base-3', true), '삭제 표시 저장');
ok(!canWrite('/schedule-overrides/deleted/base-3', false), '삭제 표시는 true 만');
ok(canWrite('/schedule-overrides/clients/가명병원', { client: '가명병원', manager: '가명A', team: 'FS West' }), '거래처 한 건 저장');
ok(!canWrite('/schedule-overrides/clients/가명병원', { manager: '가명A' }), '거래처 이름 없으면 거부');
ok(!canWrite('/schedule-overrides/custom/user-1', ev({ category: 'hack' })), '이상한 구분 거부');
ok(!canWrite('/schedule-overrides/custom/user-1', ev({ start: '내일' })), '날짜 형식이 아니면 거부');
ok(!canWrite('/schedule-overrides/custom/user-1', ev({ title: undefined })), '제목 없으면 거부');
ok(!canWrite('/schedule-overrides/custom/user-1', ev({ title: 'x'.repeat(201) })), '제목 200자 초과 거부');
ok(!canWrite('/schedule-overrides/custom/user-1', { junk: 1 }), '일정이 아닌 값 거부');
ok(!dbWith().as(null).write('/schedule-overrides/custom/user-1', ev()).allowed, '로그인 없으면 쓰기 거부');

/* ---- 백업 ---- */
ok(canWrite('/schedule-backups/2026-11-06', snapshot), '오늘 백업 저장');
ok(!canWrite('/schedule-backups/오늘', snapshot), '날짜 형식이 아닌 백업 키 거부');
ok(!canWrite('/schedule-backups', { '2026-11-06': snapshot }), '백업 전체 덮어쓰기 금지');
ok(!canWrite('/schedule-backups', null, { 'schedule-backups': { '2026-11-06': snapshot } }), '백업 전체 삭제 금지');
ok(canWrite('/schedule-backups/2026-10-01', null, { 'schedule-backups': { '2026-10-01': snapshot } }), '오래된 백업 하루치 정리');

/* ---- 근무일정 ---- */
ok(!canWrite('/work-schedule', {}), 'work-schedule 통째 덮어쓰기 금지');
ok(!canWrite('/work-schedule/west', null, { 'work-schedule': { west: { '2026-11-06': { '가명A': entry } } } }), '팀 전체 삭제 금지');
ok(!canWrite('/work-schedule/west', { '2026-11-06': { '가명A': entry } }), '팀 통째 덮어쓰기 금지');
ok(canWrite('/work-schedule/west/2026-11-06/가명A', entry), '한 사람·한 날짜 저장');
['west', 'east', 'central', 'south', 'fss', 'fsom'].forEach(t => ok(canWrite('/work-schedule/' + t + '/2026-11-06/가명A', entry), t + ' 팀 저장'));
ok(canWrite('/work-schedule/west/2026-11-06/가명A', null, { 'work-schedule': { west: { '2026-11-06': { '가명A': entry } } } }), '한 칸 삭제');
ok(!canWrite('/work-schedule/west/6일/가명A', entry), '날짜가 아닌 키 거부');
ok(!canWrite('/work-schedule/nowhere/2026-11-06/가명A', entry), '없는 팀 거부');
ok(!canWrite('/work-schedule/west/2026-11-06/가명A', { night: 5 }), '글자가 아닌 값 거부');
ok(!canWrite('/work-schedule/west/2026-11-06/가명A', { night: 'x'.repeat(301) }), '너무 긴 값 거부');
ok(canWrite('/work-schedule/teamRoster/west', [{ name: '가명A', role: '', nickname: '' }, { name: '가명B', role: '팀장', nickname: '' }]), '팀원 명단 저장');
ok(!canWrite('/work-schedule/teamRoster/nowhere', [{ name: '가명A' }]), '없는 팀 명단 거부');
ok(!canWrite('/work-schedule/teamRoster', {}), '명단 통째 덮어쓰기 금지');
ok(!canWrite('/work-schedule/teamRoster/west', [{ role: '이름 없음' }]), '이름 없는 팀원 거부');
const note = { date: '2026-11-06', inst: '가명병원', device: 'XN', author: '가명A', status: '진행', doneAt: '', cat: '', text: '내용', ts: NOW, updatedAt: '2026-11-06T00:00:00Z' };
ok(canWrite('/work-schedule/notes/west/20261106_abc', note), '특이사항 저장');
ok(!canWrite('/work-schedule/notes/west/20261106_abc', Object.assign({}, note, { text: undefined })), '내용 없으면 거부');
ok(!canWrite('/work-schedule/notes', {}), '특이사항 통째 덮어쓰기 금지');
ok(!canWrite('/work-schedule/memberOrder/west', ['가명A']), '쓰는 곳이 없는 memberOrder 는 읽기 전용');
ok(canWrite('/work-schedule-backups/2026-11-06', { west: {} , east: { '2026-11-06': { '가명A': entry } } }), '근무 백업 저장');
ok(!canWrite('/work-schedule-backups', null), '근무 백업 전체 삭제 금지');

/* ---- 현행 유지(2단계에서 좁힘) ---- */
ok(canWrite('/kpi-dashboard/meta', { updatedAt: 'x' }) && canWrite('/voc-dashboard/data', { a: 1 }), 'KPI·만족도 쓰기는 현행 유지');


/* ---- 2단계: KPI 쓰기는 관리자 계정(UID) 한 명만 ---- */
const rules2 = require(path.join(__dirname, '..', 'firebase', 'database.rules.stage2.json'));
const ADMIN = { uid: 'sknozAsrQ4NZZyaGGPnDWZoWpSv2', provider: 'password' };
const db2 = () => targaryen.database(rules2, {}, NOW);
const w2 = (who, p, v) => db2().as(who).write(p, v).allowed;
const r2 = (who, p) => db2().as(who).read(p).allowed;
ok(w2(ADMIN, '/kpi-dashboard/meta', { updatedAt: 'x' }), '관리자는 KPI 메타 저장');
ok(w2(ADMIN, '/kpi-dashboard/act', { v: 1, data: 'x' }), '관리자는 KPI 데이터 저장');
ok(w2(ADMIN, '/kpi-dashboard/backups/2026-11-06', { a: 1 }), '관리자는 KPI 백업 저장');
ok(!w2(anon, '/kpi-dashboard/meta', { updatedAt: 'x' }), '익명은 KPI 쓰기 거부');
ok(!w2(anon, '/kpi-dashboard/act', { v: 1 }), '익명은 KPI 데이터 쓰기 거부');
ok(!w2(anon, '/kpi-dashboard', null), '익명은 KPI 전체 삭제 거부');
ok(!w2({ uid: 'other-admin', provider: 'password' }, '/kpi-dashboard/meta', { a: 1 }), '다른 이메일 계정도 KPI 쓰기 거부');
ok(!w2(null, '/kpi-dashboard/meta', { a: 1 }), '로그인 없으면 거부');
ok(r2(anon, '/kpi-dashboard/meta') && r2(ADMIN, '/kpi-dashboard/act'), 'KPI 읽기는 로그인한 누구나(팀장 화면)');
ok(!r2(null, '/kpi-dashboard/meta'), '로그인 없는 KPI 읽기 거부');
ok(w2(anon, '/schedule-overrides/custom/user-1', ev()) && w2(anon, '/work-schedule/west/2026-11-06/가명A', entry), '설치·근무일정 쓰기는 1단계와 동일');
ok(!w2(anon, '/schedule-overrides', snapshot) && !w2(anon, '/work-schedule', {}), '전체 덮어쓰기 금지도 1단계와 동일');
ok(w2(anon, '/voc-dashboard/data', { a: 1 }), '만족도 쓰기는 현행 유지');

/* ---- 3단계: 가중치 설정은 관리자 2명, 나머지 KPI 쓰기는 기존 관리자 1명 ---- */
const WUID = 'HBUnInhKjzMRicdpRIiV7Gn7p2d2';   // 가중치 관리자(smkim07) 계정의 UID — 규칙 파일의 값과 같아야 한다
const raw3 = require('fs').readFileSync(path.join(__dirname, '..', 'firebase', 'database.rules.stage3.json'), 'utf8');
ok(!/REPLACE_WITH/.test(raw3), '3단계 규칙에 자리표시(REPLACE_WITH_…)가 남아 있으면 안 됨');
ok(raw3.split(WUID).length - 1 === 2, '3단계 규칙에 가중치 관리자 UID 2곳');
const rules3 = JSON.parse(raw3);
const WADM = { uid: WUID, provider: 'password' };
const db3 = d => targaryen.database(rules3, d || {}, NOW);
const w3 = (who, p, v, d) => db3(d).as(who).write(p, v).allowed;
const r3 = (who, p) => db3().as(who).read(p).allowed;
const wItem = (o) => Object.assign({ score: { '고장 수리': 3.5, 'PM': 1, '성능 평가·인증 지원': 3 }, grade: { T4: 0.6, T3: 0.4, '팀장': 0.6 }, at: '2026-11-09T00:00:00.000Z', by: 'smkim07' }, o || {});
ok(w3(WADM, '/kpi-dashboard/weights/items/2026-12', wItem()), '가중치 관리자는 시작월 묶음 저장');
ok(w3(WADM, '/kpi-dashboard/weights/rev', '2026-11-09T00:00:00.000Z'), '가중치 관리자는 rev(바뀐 시각) 저장');
ok(w3(ADMIN, '/kpi-dashboard/weights/items/2026-12', wItem()), '기존 관리자도 가중치 저장');
ok(w3(WADM, '/kpi-dashboard/weights/items/2026-12', null, { 'kpi-dashboard': { weights: { items: { '2026-12': wItem() } } } }), '가중치 관리자는 묶음 삭제');
ok(!w3(WADM, '/kpi-dashboard/meta', { updatedAt: 'x' }), '가중치 관리자는 KPI 메타 쓰기 거부');
ok(!w3(WADM, '/kpi-dashboard/act', { v: 1 }), '가중치 관리자는 CRM 데이터 쓰기 거부');
ok(!w3(WADM, '/kpi-dashboard/backups/2026-11-09', { a: 1 }), '가중치 관리자는 KPI 백업 쓰기 거부');
ok(!w3(WADM, '/kpi-dashboard', null), '가중치 관리자는 KPI 전체 삭제 거부');
ok(!w3(WADM, '/kpi-dashboard/weights', { rev: 'x' }), '가중치 전체 덮어쓰기 거부(한 묶음 단위로만)');
ok(!w3(WADM, '/kpi-dashboard/weights/items', null), '묶음 전체 삭제 거부');
ok(!w3(anon, '/kpi-dashboard/weights/items/2026-12', wItem()), '익명은 가중치 쓰기 거부');
ok(!w3({ uid: 'other-admin', provider: 'password' }, '/kpi-dashboard/weights/rev', 'x'), '다른 계정은 가중치 쓰기 거부');
ok(!w3(null, '/kpi-dashboard/weights/rev', 'x'), '로그인 없으면 거부');
ok(!w3(WADM, '/kpi-dashboard/weights/items/abc', wItem()), '시작월 형식이 아니면 거부');
ok(!w3(WADM, '/kpi-dashboard/weights/items/2026-13', wItem()), '13월 거부');
ok(!w3(WADM, '/kpi-dashboard/weights/items/2026-12', wItem({ score: { '고장 수리': 11 } })), '10 초과 값 거부');
ok(!w3(WADM, '/kpi-dashboard/weights/items/2026-12', wItem({ score: { '고장 수리': -1 } })), '음수 거부');
ok(!w3(WADM, '/kpi-dashboard/weights/items/2026-12', wItem({ score: { '고장 수리': '3' } })), '숫자가 아닌 값 거부');
ok(!w3(WADM, '/kpi-dashboard/weights/items/2026-12', wItem({ score: { '없는 업무': 1 } })), '정해지지 않은 업무 이름 거부');
ok(!w3(WADM, '/kpi-dashboard/weights/items/2026-12', wItem({ grade: { T9: 1 } })), '정해지지 않은 직급 거부');
ok(!w3(WADM, '/kpi-dashboard/weights/items/2026-12', wItem({ by: undefined })), '설정한 사람 없으면 거부');
ok(!w3(WADM, '/kpi-dashboard/weights/items/2026-12', Object.assign(wItem(), { extra: 1 })), '정해지지 않은 항목 거부');
ok(r3(anon, '/kpi-dashboard/weights') && r3(anon, '/kpi-dashboard/weights/rev') && r3(WADM, '/kpi-dashboard/meta'), '읽기는 로그인한 누구나');
ok(!r3(null, '/kpi-dashboard/weights'), '로그인 없는 읽기 거부');
ok(w3(ADMIN, '/kpi-dashboard/meta', { updatedAt: 'x' }) && !w3(anon, '/kpi-dashboard/meta', { updatedAt: 'x' }), '기존 관리자만 데이터 올리기(2단계와 동일)');
ok(w3(anon, '/schedule-overrides/custom/user-1', ev()) && !w3(anon, '/schedule-overrides', snapshot), '설치일정 규칙은 그대로');

console.log('test_db_rules: OK (' + pass + '개 확인)');
