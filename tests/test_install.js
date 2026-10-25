// 4장 설치 현황 — 작은 캘린더·자산대장 시나리오를 손으로 계산해 검증 (시트 Apps Script 규칙 + 2026-10-26 자동 연결)
const assert = require('assert');
const R = require('../fsg-report/lib/read-crm');
const I = require('../fsg-report/lib/install');
const { buildReport } = require('../fsg-report/lib/report-core');
const { buildCheckWorkbook } = require('../fsg-report/lib/write-check');
const XLSX = require('xlsx');
const T = (y, m, d) => Date.UTC(y, m - 1, d);
const ser = ms => ms / 86400000 + 25569;

// ── 단위: 모델 분해(v48·v50 규칙) ──
const tot = s => I.expandDetail(s).total;
assert.deepStrictEqual([tot('XR-10 1대 · XR-1000 1대'), tot('XR-10 2대 · XR-2000 1대 · CS-1600 1대'), tot('XR-20 5대 · SP-50 1대 · XR-9000 1대'), tot('XR-3000 1대'), tot('XN-10 3대 · XR-9100 1대 · SP-50 1대 · DI-60 1대')], [1, 3, 6, 3, 5], 'v50 중복 제거 12건 중 5건');
assert.deepStrictEqual(I.expandModel('XN-1500'), [{ label: 'XN-Series', n: 1 }, { label: 'SP-50', n: 1 }]); assert.deepStrictEqual(I.expandModel('XN-550'), [{ label: 'XN-L Series', n: 1 }]);
assert.strictEqual(I.expandModel('VALVE_ASSY NO.49(XN-10)'), null, '부품은 제외'); assert.deepStrictEqual(I.expandModel('UF-5000 COMPLETE'), [{ label: 'UF-5000', n: 1 }]);
assert.strictEqual(I.normAcct('씨젠의료재단 (대구)'), '씨젠의료재단대구'); assert.strictEqual(I.normAcct('의료법인 ABC 대학교 부속병원'), 'abc대병원');
assert.strictEqual(I.normGubun('이전 설치'), '이전설치'); assert.strictEqual(I.normGubun('신규설치'), '설치'); assert.strictEqual(I.normTeam('FS East'), 'FS EAST'); assert.strictEqual(I.normTeam('east'), 'FS EAST');
assert.deepStrictEqual(I.sysModelsFromText('XR-9100 재구성, CN-6000 설치'), ['XR-9100']); assert.strictEqual(I.sysGubunFor('XR-9100 재구성, CN-6000 설치', 'XR-9100', '설치'), '이전설치');
assert.deepStrictEqual(I.calModelTokens('XR-9100 재구성, CN-6000 설치 (예정)'), ['CN-6000'], 'System 본체·괄호 제외');
assert(I.autoNameScore('양병원', '서울양병원') >= 0.75, '포함 관계 → 높음');

// ── 시나리오 (기간 2026-09) ──
const CAL_H = ['구분', '병원', '장비', '시작일', '종료일', '기간(일)', '담당팀', '담당자'];
const calRows = [
  ['설치', 'A병원', 'XR-1000', ser(T(2026, 9, 8)), ser(T(2026, 9, 8)), 1, 'FS East', '갑'],             // CRM 매칭(9/9 설치일자, ±7일) → OK
  ['설치', 'B병원', 'XN-9100 System', ser(T(2026, 9, 10)), ser(T(2026, 9, 10)), 1, 'FS West', '을'],   // 캘린더 3줄 병합 → 1작업, System 1세트, CRM 없음 → 캘린더 표기(CN-6000 1대)
  ['설치', 'B병원', 'CN-6000', ser(T(2026, 9, 11)), ser(T(2026, 9, 11)), 1, 'FS West', '을'],
  ['설치', 'B병원', 'XN-9100 마무리', ser(T(2026, 9, 14)), ser(T(2026, 9, 14)), 1, 'FS West', '을'],
  ['이전설치', 'C병원', 'UF-5000 이전', ser(T(2026, 9, 16)), ser(T(2026, 9, 16)), 1, 'FS South', '병'],  // CRM 없음 → 캘린더 기준 UF-5000 1대
  ['설치', 'D병원 (예정)', 'XN-1000', ser(T(2026, 9, 20)), ser(T(2026, 9, 20)), 1, 'FS East', '갑'],      // 예정 → 집계 제외
  ['설치', 'E병원', 'G11(중고장비)', ser(T(2026, 9, 22)), ser(T(2026, 9, 22)), 1, 'FS Central', '정'],  // 중고 → 제외
  ['설치', 'F병원', 'XN-550 Demo', ser(T(2026, 9, 23)), ser(T(2026, 9, 23)), 1, 'FS East', '갑'],        // 데모 → 제외
  ['평가', 'G병원', 'XR Demo', ser(T(2026, 9, 24)), ser(T(2026, 9, 24)), 1, '', 'Mia'],                  // 구분 평가 → 제외
  ['설치', '강남차병원', 'CS-1600', ser(T(2026, 8, 25)), ser(T(2026, 8, 25)), 1, 'FS East', '갑'],        // 8월 작업 — CRM 9/1 장비를 선점(claimedOutside) → 9월에서 뺌
  // 자동 연결(2026-10-26): 이름이 다른 짝
  ['설치', '양병원', 'CS-1600', ser(T(2026, 9, 10)), ser(T(2026, 9, 10)), 1, 'FS East', 'Daniel'],       // CRM '서울양병원' — 포함 관계(점수 0.75) → 연결
  ['설치', '전주에코병원', 'G11', ser(T(2026, 9, 15)), ser(T(2026, 9, 15)), 1, 'FS Central', 'Heath'],   // CRM '에코내과' — 이름 점수 낮음, 같은 날 같은 모델군(A1c) 후보 하나·같은 팀 → 연결
  ['설치', '담대한내과의원', 'XN-550', ser(T(2026, 9, 21)), ser(T(2026, 9, 21)), 1, 'FS Central', 'BONY'],  // CRM '담대한외과의원' — 이름 점수 0.5 → 연결
  ['설치', 'P의원', 'XN-550', ser(T(2026, 9, 25)), ser(T(2026, 9, 25)), 1, 'FS East', '갑'],             // CRM 'Q병원'(같은 날 XN-550)은 SOUTH 기관 → 연결 안 함 → 캘린더 표기 1대, Q는 캘린더 미등록
];
const SER_H = ['제품 상태', '거래처', 'Model', 'Serial No.', '초도설치', '설치일자', '대리점 명'];
const serRows = [
  ['사용', 'A병원', 'XR-10', 'S-A1', '2026-09-09', '2026-09-09', ''],                 // A병원 작업에 매칭
  ['사용', 'A병원', 'XR-1000', 'S-A2', '2026-09-09', '2026-09-09', ''],               // 같은 작업 — 모듈+구성 중복 제거 → 1대
  ['사용', 'CHA의과학대학교 강남차병원', 'CS-1600', 'S-K1', '2026-09-01', '2026-09-01', ''],   // 8월 캘린더 작업이 선점 (이름 포함 매칭)
  ['사용', 'H병원', 'XN-10', 'S-H1', '2026-09-18', '2026-09-18', ''],                 // 캘린더 미등록 → orphan(신규)
  ['사용', 'I병원', 'UC-3500', 'S-I1', '2025-01-01', '2026-09-19', ''],               // 캘린더 미등록 · 초도≠설치 → orphan(이전설치)
  ['사용', 'J병원', 'SP-50', 'S-J1', '2026-09-20', '2026-09-20', '대리점X'],          // 대리점 설치 → 실적 제외
  ['사용', 'K병원', 'XN-1000', '12345RE', '2026-09-21', '2026-09-21', ''],            // 중고(RE) → 제외
  ['사용', 'L병원', 'VALVE_ASSY NO.49(XN-10)', 'S-L1', '2026-09-22', '2026-09-22', ''],  // 부품 → 설치 아님
  ['사용', 'M병원', 'XR-9100', 'S-M1', '2026-10-02', '2026-10-02', ''],               // 10월 → 기간 밖
  ['사용', '서울양병원', 'CS-1600', 'S-Y1', '2026-09-10', '2026-09-10', ''],
  ['사용', '에코내과', 'HLC-723 G11', 'S-E1', '2026-09-15', '2026-09-15', ''],
  ['사용', '담대한외과의원', 'XN-550', 'S-D1', '2026-09-21', '2026-09-21', ''],
  ['사용', 'Q병원', 'XN-550', 'S-Q1', '2026-09-25', '2026-09-25', ''],
];
const cal = I.readCalendarRows({ h: CAL_H, rows: calRows }, R.toMs);
assert.strictEqual(cal.length, 14); assert.strictEqual(cal[0].team, 'FS EAST'); assert.strictEqual(cal[4].gubun, '이전설치'); assert.strictEqual(cal[0].start, T(2026, 9, 8));
const serial = R.parseSerialRows({ h: SER_H, rows: serRows });

// 활동(팀 판정용) — H병원·I병원은 EAST, 에코내과는 CENTRAL, Q병원은 SOUTH 담당자 활동
const ACT_H = ['상태', '양식 타입', '시작 시간', '종료 시간', '담당자', '주제', 'Error 1', '거래처', 'Serial No. (lookup)', 'Product', '약속/활동 목적'];
const A = (d, own, acct, sn, prod, purp) => ['완료됨', '서비스 요청', ser(T(2026, 9, d)), ser(T(2026, 9, d)) + 1 / 24, own, '', '', acct, sn, prod, purp];
const actRows = [A(2, '갑', 'H병원', 'S-H1', 'XN-10', 'PM'), A(3, '갑', 'I병원', 'S-I1', 'UC-3500', 'PM'), A(5, '을', 'A병원', 'S-A1', 'XR-10', '장비 설치'),
  A(14, '정', '에코내과', 'S-E1', 'HLC-723 G11', 'PM'), A(20, '병', 'Q병원', 'S-Q1', 'XN-550', 'PM')];
const act = R.parseActivityRows({ h: ACT_H, rows: actRows });
const ROSTER = [['갑', 'FS EAST', 'T2'], ['을', 'FS WEST', 'T1'], ['병', 'FS SOUTH', 'T3'], ['정', 'FS CENTRAL', 'T2']];
const rep = buildReport({ raw: act.rows, roster: ROSTER, period: '2026-09', cut: '2026-09-30', serial, calendar: cal });
const IB = rep.installBlock; assert(IB, '설치 블록 생성');
const D = IB.detail, byAcct = {}; D.rows.forEach(r => byAcct[r.acct] = r);

// 작업별 상세
assert.deepStrictEqual(D.rows.map(r => r.acct), ['A병원', 'B병원', '양병원', '전주에코병원', 'C병원', '담대한내과의원', 'P의원'], '설치 작업 7 — 예정·중고·데모·평가·8월 제외');
assert.deepStrictEqual([byAcct['A병원'].status, byAcct['A병원'].units, byAcct['A병원'].detail, byAcct['A병원'].sns, byAcct['A병원'].link], ['OK', 1, 'XR-10 1대 · XR-1000 1대', 'S-A1, S-A2', ''], 'A: CRM 매칭 2행 → 중복 제거 1대');
assert.deepStrictEqual([byAcct['B병원'].status, byAcct['B병원'].merged, byAcct['B병원'].units, byAcct['B병원'].detail, byAcct['B병원'].sns, byAcct['B병원'].calBased], ['캘린더 표기(CRM 미등록)', 3, 1, 'CN-6000 1대', '(캘린더 표기)', true], 'B: 3줄 병합 · CRM 없음 → 캘린더 표기(System 본체 제외)');
assert.deepStrictEqual([byAcct['C병원'].status, byAcct['C병원'].units, byAcct['C병원'].detail, byAcct['C병원'].calBased], ['캘린더 기준', 1, 'UF-5000 1대', true], 'C: 이전설치 캘린더 표기 기준');
assert.deepStrictEqual([byAcct['양병원'].status, byAcct['양병원'].sns, byAcct['양병원'].linkedAcct, byAcct['양병원'].link], ['OK', 'S-Y1', '서울양병원', '이름 유사 75% · 같은 모델군'], '양병원 ↔ 서울양병원');
assert.deepStrictEqual([byAcct['담대한내과의원'].status, byAcct['담대한내과의원'].sns, byAcct['담대한내과의원'].linkedAcct, byAcct['담대한내과의원'].link], ['OK', 'S-D1', '담대한외과의원', '이름 유사 50% · 같은 모델군']);
assert.deepStrictEqual([byAcct['전주에코병원'].status, byAcct['전주에코병원'].sns, byAcct['전주에코병원'].linkedAcct, byAcct['전주에코병원'].link], ['OK', 'S-E1', '에코내과', '같은 날(±2일) 같은 모델군 후보 하나 · 같은 팀']);
assert.deepStrictEqual([byAcct['P의원'].status, byAcct['P의원'].units, byAcct['P의원'].detail, byAcct['P의원'].link], ['캘린더 표기(CRM 미등록)', 1, 'XN-550 1대', ''], 'P: 같은 날 XN-550 후보(Q병원)는 다른 팀 → 연결 안 함');
assert.deepStrictEqual(D.links.map(l => [l.start, l.calAcct, l.crmAcct]), [['2026-09-10', '양병원', '서울양병원'], ['2026-09-15', '전주에코병원', '에코내과'], ['2026-09-21', '담대한내과의원', '담대한외과의원']], '자동연결 3건');
assert.strictEqual(D.tentative.length, 1); assert.strictEqual(D.usedCal, 1); assert.strictEqual(D.demoCal, 1); assert.strictEqual(D.partSkipped, 1, '이 기간 부품 행 1개 제외');
assert.deepStrictEqual(D.orphan.map(o => [o.acct, o.model, o.moved, o.team]), [['H병원', 'XN-10', false, 'FS EAST'], ['I병원', 'UC-3500', true, 'FS EAST'], ['Q병원', 'XN-550', false, 'FS SOUTH']], '캘린더 미등록 (강남차 S-K1은 8월 작업이 선점, 대리점·중고·부품·10월·자동 연결 제외)');
assert.strictEqual(D.dealerOrphan.length, 1); assert(D.claimedOutside['S-K1|' + T(2026, 9, 1)], '8월 작업 선점 키');
assert.strictEqual(D.audit.length, 13, '9월 캘린더 줄 13개(8월 제외)'); assert.deepStrictEqual(D.audit.filter(a => /^제외/.test(a.result)).map(a => a.acct), ['D병원 (예정)', 'E병원', 'F병원', 'G병원']);

// 설치 현황: CRM 단품 = A XR 1 · H XN 1 · 서울양 CS-1600 1 · 에코 G11 1 · 담대한외과 XN-L 1 · Q XN-L 1 = 6 + 캘린더 표기 신규 = B CN-6000 1 · P XN-L 1 → 8 (C 이전설치는 단품에 안 넣음)
const inst = IB.install, cnt = {}; inst.rows.forEach(r => cnt[r.series] = r.count);
assert.deepStrictEqual(cnt, { 'XN-L Series': 3, 'XR-Series': 1, 'XN-Series': 1, 'CS-1600': 1, 'HLC-723 G11': 1, 'CN-6000': 1 });
assert.deepStrictEqual([inst.total, inst.calUnits, inst.reExcluded, inst.moved, inst.partExcluded], [8, 2, 1, 1, 1], '총 8 · 캘린더 표기 2 · 중고 1 · 이전(I병원) 1 · 부품 1');
assert.deepStrictEqual(IB.systems.list.map(s => [s.acct, s.model, s.gubun]), [['B병원', 'XN-9100', '설치']], 'System 1세트');

// 팀별 실적 설치 칸(기관 수): EAST 신규 A·양병원·P·H(미등록) 4 + 이전 I 1 / WEST B 1 / SOUTH 신규 Q(미등록) 1 + 이전 C 1 / CENTRAL 신규 전주에코·담대한 2
const tm = {}; rep.team.rows.forEach(r => tm[r.team] = r);
assert.deepStrictEqual([tm['FS EAST'].instNew, tm['FS EAST'].instMove, tm['FS WEST'].instNew, tm['FS SOUTH'].instNew, tm['FS SOUTH'].instMove, tm['FS CENTRAL'].instNew], [4, 1, 1, 1, 1, 2]);
assert.strictEqual(tm['FS WEST'].instCrm, 1, 'CRM 활동 기준 설치(을 1건)'); assert.strictEqual(rep.team.instSource, '설치 공유캘린더');

// 팀별 설치 실적 매트릭스
const S = IB.summary, M = {}; S.mat.forEach(r => M[r[0] + '|' + r[1]] = r);
assert.deepStrictEqual(M['전체|합계'].slice(2, 4), [10, 1], '기관 10 · System 1'); assert.strictEqual(M['전체|합계'][12], 10, '장비 합계 10(작업 7 + 미등록 3, 각 1대)');
assert.deepStrictEqual(M['FS WEST|신규'].slice(2), [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1], 'WEST 신규: B병원 System 1세트 · CN(Other) 1');
assert(!M['(팀 미상)|신규']);
assert.strictEqual(S.list.length, 7 + 3 + 1, '작업 7 + 미등록 3 + 예정 1'); assert.strictEqual(S.jobs.filter(j => j.status === '캘린더 미등록').length, 3);
assert(/CRM 미등록 2건 → 캘린더 장비 표기로 집계/.test(S.notes[0][1]) && /자동 연결한 짝 3건/.test(S.notes[0][1]), S.notes[0][1]);
assert(/예정 1건 · 중고 2건 · Demo 1건 · 대리점 설치\(캘린더 없음\) 1대/.test(S.notes[1][1]), S.notes[1][1]);
assert(/자동 연결 → 에코내과/.test(S.jobs.find(j => j.acct === '전주에코병원').note));

// 중복 제외(v51): B병원 작업(캘린더 표기)과 같은 설치가 ±7일을 넘겨(9/25) 'B병원 본관'으로 CRM에 오름 → 자동 연결은 못 하지만(날짜 창 밖) 이름 포함·35일 안 → 중복 제외
const serRows2 = serRows.concat([['사용', 'B병원 본관', 'XN-10', 'S-B1', '2026-09-25', '2026-09-25', ''], ['사용', 'B병원 본관', 'CN-6000', 'S-B2', '2026-09-25', '2026-09-25', '']]);
const rep2 = buildReport({ raw: act.rows, roster: ROSTER, period: '2026-09', cut: '2026-09-30', serial: R.parseSerialRows({ h: SER_H, rows: serRows2 }), calendar: cal });
const D2 = rep2.installBlock.detail;
assert.strictEqual(D2.rows.find(r => r.acct === 'B병원').status, '캘린더 표기(CRM 미등록)'); assert.strictEqual(D2.links.length, 3);
assert.strictEqual(D2.dupOrphan.length, 2, 'B병원 본관 2대 중복 제외: ' + JSON.stringify(D2.orphan.map(o => o.acct))); assert(/기관명 연결·15일 차/.test(D2.dupOrphan[0].dupWhy), D2.dupOrphan[0].dupWhy);
assert.strictEqual(D2.orphan.length, 3); assert.strictEqual(rep2.installBlock.install.total, 8, '중복 제외 장비는 설치 현황에도 안 들어감');
assert.strictEqual(D2.rows.find(r => r.acct === 'P의원').status, '캘린더 표기(CRM 미등록)', 'P: 같은 날 XN 후보가 둘(Q·B본관) → 단독 아님 → 연결 안 함');
// 같은 설치가 ±7일 안(9/12)에 'B병원 본관'으로 오르면 자동 연결(포함 관계) → OK
const serRows3 = serRows.concat([['사용', 'B병원 본관', 'XN-10', 'S-B1', '2026-09-12', '2026-09-12', ''], ['사용', 'B병원 본관', 'CN-6000', 'S-B2', '2026-09-12', '2026-09-12', '']]);
const rep3 = buildReport({ raw: act.rows, roster: ROSTER, period: '2026-09', cut: '2026-09-30', serial: R.parseSerialRows({ h: SER_H, rows: serRows3 }), calendar: cal });
const b3 = rep3.installBlock.detail.rows.find(r => r.acct === 'B병원');
assert.deepStrictEqual([b3.status, b3.sns, b3.linkedAcct, b3.units], ['OK', 'S-B1, S-B2', 'B병원 본관', 2]); assert.strictEqual(rep3.installBlock.links.length, 4);
// 지난달 작업이 이달 CRM에 늦게 오른 경우: 8월 강남차 작업(8/25) ↔ 9/20 CS-1600 → ±7일 밖이지만 35일 안·같은 모델군 → 9월 '캘린더 미등록'으로 세지 않음
const serRows4 = serRows.map(r => r[3] === 'S-K1' ? r.slice(0, 4).concat(['2026-09-20', '2026-09-20', '']) : r);
const rep4 = buildReport({ raw: act.rows, roster: ROSTER, period: '2026-09', cut: '2026-09-30', serial: R.parseSerialRows({ h: SER_H, rows: serRows4 }), calendar: cal });
assert(rep4.installBlock.detail.claimedOutside['S-K1|' + T(2026, 9, 20)], '35일 귀속'); assert.strictEqual(rep4.installBlock.detail.orphan.length, 3);

// 검산 워크북 탭·행
const cw = buildCheckWorkbook(rep2);
['정제_설치상세', '정제_설치현황', '정제_팀별설치실적', '자동연결'].forEach(n => assert(cw.SheetNames.includes(n), n));
const det = XLSX.utils.sheet_to_json(cw.Sheets['정제_설치상세'], { header: 1 });
assert.strictEqual(det.length, 1 + 7 + 3 + 2 + 1, '헤더 + 작업 7 + 미등록 3 + 중복 2 + 예정 1'); assert.strictEqual(det[det.length - 1][10], '예정(집계 제외)');
assert(/자동 연결 → 서울양병원/.test(det.find(r => r[3] === '양병원')[10]));
const tb = XLSX.utils.sheet_to_json(cw.Sheets['정제_팀별실적'], { header: 1 });
assert.deepStrictEqual(tb[1].slice(0, 11).map(v => v === undefined ? '' : v), ['FS EAST', '', 1, 5, 2, 0, 7, 7, 4, 1, 0], 'EAST: 설치+이전 5 = 신규 4 + 이전 1 · PM 2(갑) · 합계 7 · 1인당 7');
const lk = XLSX.utils.sheet_to_json(cw.Sheets['자동연결'], { header: 1 }); assert.strictEqual(lk.length, 4); assert.strictEqual(lk[1][2], '서울양병원');
console.log('test_install: OK (모델 분해·정규화·병합·매칭·자동 연결 3종·연결 보류·캘린더 표기·예정/중고/데모 제외·미등록·대리점·선점·35일 귀속·중복 제외·설치 현황·팀별 실적·매트릭스·검산 탭)');
