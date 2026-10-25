// 4장 설치 현황 — 작은 캘린더·자산대장·수동입력·매핑 시나리오를 손으로 계산해 검증 (시트 Apps Script 규칙)
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
  ['설치', 'B병원', 'XN-9100 System', ser(T(2026, 9, 10)), ser(T(2026, 9, 10)), 1, 'FS West', '을'],   // 캘린더 3줄 병합(9/10·9/11·9/14) → 1작업, System 1세트, CRM 없음 → 수동 입력
  ['설치', 'B병원', 'CN-6000', ser(T(2026, 9, 11)), ser(T(2026, 9, 11)), 1, 'FS West', '을'],
  ['설치', 'B병원', 'XN-9100 마무리', ser(T(2026, 9, 14)), ser(T(2026, 9, 14)), 1, 'FS West', '을'],
  ['이전설치', 'C병원', 'UF-5000 이전', ser(T(2026, 9, 16)), ser(T(2026, 9, 16)), 1, 'FS South', '병'],  // CRM 없음·수동 없음 → 캘린더 기준 UF-5000 1대
  ['설치', 'D병원 (예정)', 'XN-1000', ser(T(2026, 9, 20)), ser(T(2026, 9, 20)), 1, 'FS East', '갑'],      // 예정 → 집계 제외
  ['설치', 'E병원', 'G11(중고장비)', ser(T(2026, 9, 22)), ser(T(2026, 9, 22)), 1, 'FS Central', '정'],  // 중고 → 제외
  ['설치', 'F병원', 'XN-550 Demo', ser(T(2026, 9, 23)), ser(T(2026, 9, 23)), 1, 'FS East', '갑'],        // 데모 → 제외
  ['평가', 'G병원', 'XR Demo', ser(T(2026, 9, 24)), ser(T(2026, 9, 24)), 1, '', 'Mia'],                  // 구분 평가 → 제외
  ['설치', '강남차병원', 'CS-1600', ser(T(2026, 8, 25)), ser(T(2026, 8, 25)), 1, 'FS East', '갑'],        // 8월 작업 — CRM 9/1 장비를 선점(claimedOutside) → 9월에서 뺌
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
];
const MAP_H = ['캘린더 표기', 'CRM 표기 (직접 입력)', '비고'];
const mapRows = [['B병원', '', '자동 수집'], ['양병원', '서울양병원', '']];
const MAN_H = ['시작일', '기관명', '캘린더 표기']; for (let i = 1; i <= 10; i++) MAN_H.push('모델' + i, '수량' + i); MAN_H.push('비고');   // 시트와 같은 10칸
const manRows = [['2026-09-10', 'B병원', 'XN-9100 System / CN-6000', 'XN-10', 2, 'CN-6000', 1, 'SP-50', 1].concat(Array(14).fill('')).concat(['CRM 미등록'])];

const cal = I.readCalendarRows({ h: CAL_H, rows: calRows }, R.toMs);
assert.strictEqual(cal.length, 10); assert.strictEqual(cal[0].team, 'FS EAST'); assert.strictEqual(cal[4].gubun, '이전설치'); assert.strictEqual(cal[0].start, T(2026, 9, 8));
const serial = R.parseSerialRows({ h: SER_H, rows: serRows });
const acctMap = I.readAcctMapRows({ h: MAP_H, rows: mapRows }); assert.deepStrictEqual(acctMap, { map: { '양병원': '서울양병원' }, pending: ['B병원'] });
const manualMap = I.readManualRows({ h: MAN_H, rows: manRows }); assert.deepStrictEqual(Object.keys(manualMap), ['b병원|2026-09-10']);

// 활동(팀 판정용) — H병원·I병원은 EAST 담당자 활동, 로스터
const ACT_H = ['상태', '양식 타입', '시작 시간', '종료 시간', '담당자', '주제', 'Error 1', '거래처', 'Serial No. (lookup)', 'Product', '약속/활동 목적'];
const actRows = [['완료됨', '서비스 요청', ser(T(2026, 9, 2)), ser(T(2026, 9, 2)) + 1 / 24, '갑', '', '', 'H병원', 'S-H1', 'XN-10', 'PM'], ['완료됨', '서비스 요청', ser(T(2026, 9, 3)), ser(T(2026, 9, 3)) + 1 / 24, '갑', '', '', 'I병원', 'S-I1', 'UC-3500', 'PM'],
  ['완료됨', '서비스 요청', ser(T(2026, 9, 5)), ser(T(2026, 9, 5)) + 1 / 24, '을', '', '', 'A병원', 'S-A1', 'XR-10', '장비 설치']];
const act = R.parseActivityRows({ h: ACT_H, rows: actRows });
const ROSTER = [['갑', 'FS EAST', 'T2'], ['을', 'FS WEST', 'T1'], ['병', 'FS SOUTH', 'T3'], ['정', 'FS CENTRAL', 'T2']];
const rep = buildReport({ raw: act.rows, roster: ROSTER, period: '2026-09', cut: '2026-09-30', serial, calendar: cal, acctMap, manualMap });
const IB = rep.installBlock; assert(IB, '설치 블록 생성');
const D = IB.detail, byAcct = {}; D.rows.forEach(r => byAcct[r.acct] = r);

// 작업별 상세
assert.strictEqual(D.rows.length, 3, '설치 작업: A·B(병합)·C — 예정·중고·데모·평가·8월 제외: ' + D.rows.map(r => r.acct));
assert.deepStrictEqual([byAcct['A병원'].status, byAcct['A병원'].units, byAcct['A병원'].detail, byAcct['A병원'].sns], ['OK', 1, 'XR-10 1대 · XR-1000 1대', 'S-A1, S-A2'], 'A: CRM 매칭 2행 → 중복 제거 1대');
assert.deepStrictEqual([byAcct['B병원'].status, byAcct['B병원'].merged, byAcct['B병원'].units, byAcct['B병원'].detail, byAcct['B병원'].calEquip], ['수동 입력', 3, 4, 'XN-10 2대 · CN-6000 1대 · SP-50 1대', 'XN-9100 System / CN-6000 / XN-9100 마무리'], 'B: 3줄 병합 · 수동 입력 2+1+1');
assert.deepStrictEqual([byAcct['C병원'].status, byAcct['C병원'].units, byAcct['C병원'].detail, byAcct['C병원'].calBased], ['캘린더 기준', 1, 'UF-5000 1대', true], 'C: 이전설치 캘린더 표기 기준');
assert.strictEqual(D.tentative.length, 1); assert.strictEqual(D.usedCal, 1); assert.strictEqual(D.demoCal, 1);
// 시트 규칙 그대로: 부품 행(L병원 VALVE_ASSY)도 '캘린더 미등록'으로 나열된다(대수는 0, 팀이 없어 팀별 합계엔 안 들어감) — 시트와 같은 결과를 내는 것이 1차 목표
assert.deepStrictEqual(D.orphan.map(o => [o.acct, o.model, o.moved, o.team]), [['H병원', 'XN-10', false, 'FS EAST'], ['I병원', 'UC-3500', true, 'FS EAST'], ['L병원', 'VALVE_ASSY NO.49(XN-10)', false, '']], '캘린더 미등록 (강남차 S-K1은 8월 작업이 선점, 대리점·중고·10월 제외)');
assert.strictEqual(D.dealerOrphan.length, 1); assert(D.claimedOutside['S-K1|' + T(2026, 9, 1)], '8월 작업 선점 키');
assert.strictEqual(IB.autoFilled.length, 1, 'B병원 자동 매핑 시도(후보 없음)'); assert.strictEqual(IB.autoFilled[0].to, '');
assert.strictEqual(D.audit.length, 9, '9월 캘린더 줄 9개(8월 제외)'); assert.deepStrictEqual(D.audit.filter(a => /^제외/.test(a.result)).map(a => a.acct), ['D병원 (예정)', 'E병원', 'F병원', 'G병원']);

// 설치 현황 (CRM 단품: A병원 XR 1대 + 수동 B병원 4대 = 5)
const inst = IB.install;
// CRM 단품 = A병원 XR 1 + H병원(캘린더 미등록이지만 CRM 설치) XN 1, 수동 = XN-10 2 · CN 1 · SP 1 → 6
assert.deepStrictEqual(inst.rows.map(r => [r.series, r.count]), [['XN-Series', 3], ['XR-Series', 1], ['CN-6000', 1], ['SP-50', 1]], '단품: CRM XR 1 + XN 1(H병원) + 수동 XN 2 · CN 1 · SP 1');
assert.deepStrictEqual([inst.total, inst.manualUnits, inst.reExcluded, inst.moved, inst.partExcluded], [6, 4, 1, 1, 1], '총 6 · 수동 4 · 중고 1 · 이전(I병원) 1 · 부품 1');
assert.deepStrictEqual(IB.systems.list.map(s => [s.acct, s.model, s.gubun]), [['B병원', 'XN-9100', '설치']], 'System 1세트');

// 팀별 실적 설치 칸 (기관 수): EAST = A병원 신규 + H병원(미등록 신규) + I병원(미등록 이전) → 설치 2, 이전 1 / WEST = B병원 1 / SOUTH = C병원 이전 1
const tm = {}; rep.team.rows.forEach(r => tm[r.team] = r);
assert.deepStrictEqual([tm['FS EAST'].instNew, tm['FS EAST'].instMove, tm['FS WEST'].instNew, tm['FS SOUTH'].instMove, tm['FS CENTRAL'].inst], [2, 1, 1, 1, 0]);
assert.strictEqual(tm['FS WEST'].instCrm, 1, 'CRM 활동 기준 설치(을 1건)'); assert.strictEqual(rep.team.instSource, '설치 공유캘린더');

// 팀별 설치 실적 매트릭스
const S = IB.summary, M = {}; S.mat.forEach(r => M[r[0] + '|' + r[1]] = r);
assert.deepStrictEqual(M['FS EAST|신규'].slice(2), [2, 0, 1, 1, 0, 0, 0, 0, 0, 0, 2], 'EAST 신규: 기관 2(A·H) · XR 1 · XN 1');
assert.deepStrictEqual(M['FS WEST|신규'].slice(2), [1, 1, 0, 2, 1, 0, 0, 0, 0, 1, 4], 'WEST 신규: B병원 System 1세트 · XN 2 · SP-50 1 · CN(Other) 1 → 합계 4');
assert.deepStrictEqual(M['FS EAST|이전설치'].slice(2), [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1], 'EAST 이전: I병원 UC-3500');
assert.deepStrictEqual(M['전체|합계'].slice(2), [6, 1, 1, 3, 1, 0, 0, 2, 0, 1, 8], '기관 6(L병원 부품 행이 팀 미상 기관으로 1곳 — 시트 규칙) · 장비 8');
assert(M['(팀 미상)|신규'] && M['(팀 미상)|신규'][2] === 1 && M['(팀 미상)|신규'][12] === 0);
assert.strictEqual(S.list.length, 3 + 3 + 1, '작업 3 + 미등록 3 + 예정 1'); assert.strictEqual(S.jobs.filter(j => j.status === '캘린더 미등록').length, 3);
assert(/CRM 미등록 0건/.test(S.notes[0][1]) && /예정 1건 · 중고 2건 · Demo 1건 · 대리점 설치\(캘린더 없음\) 1대/.test(S.notes[1][1]), S.notes[1][1]);

// 중복 제외(v51): 수동 입력 B병원 작업과 같은 설치인데 CRM에는 'B병원 본관'으로 등록(정규화 키가 달라 매칭 안 됨) → 이름 포함 관계(점수 0.75)·±35일 → 중복
const serRows2 = serRows.concat([['사용', 'B병원 본관', 'XN-10', 'S-B1', '2026-09-12', '2026-09-12', ''], ['사용', 'B병원 본관', 'CN-6000', 'S-B2', '2026-09-12', '2026-09-12', '']]);
// 기관명매핑에 B병원 → '-'(매핑 안 함)로 두면 v49 자동 매핑이 건너뛰므로 작업은 '수동 입력'으로 남고, CRM 'B병원 본관' 2대는 캘린더 미등록 → v51 중복 제외 대상
const acctMap2 = I.readAcctMapRows({ h: MAP_H, rows: [['B병원', '-', ''], ['양병원', '서울양병원', '']] });
assert.deepStrictEqual(acctMap2, { map: { 'b병원': '', '양병원': '서울양병원' }, pending: [] }, "'-'는 빈 매핑(=매핑 안 함)");
const rep2 = buildReport({ raw: act.rows, roster: ROSTER, period: '2026-09', cut: '2026-09-30', serial: R.parseSerialRows({ h: SER_H, rows: serRows2 }), calendar: cal, acctMap: acctMap2, manualMap });
const D2 = rep2.installBlock.detail;
assert.strictEqual(rep2.installBlock.autoFilled.length, 0); assert.strictEqual(D2.rows.find(r => r.acct === 'B병원').status, '수동 입력');
// 같은 자료에서 매핑을 비워 두면(자동 매핑 대상) v49가 'B병원 본관'을 찾아 채우고 작업이 CRM 매칭(OK)으로 바뀐다
const rep3 = buildReport({ raw: act.rows, roster: ROSTER, period: '2026-09', cut: '2026-09-30', serial: R.parseSerialRows({ h: SER_H, rows: serRows2 }), calendar: cal, acctMap, manualMap });
assert.deepStrictEqual(rep3.installBlock.autoFilled.map(a => [a.from, a.to, a.conf]), [['B병원', 'B병원 본관', '높음']], 'v49 자동 매핑(포함 관계 → 높음)');
assert.deepStrictEqual([rep3.installBlock.detail.rows.find(r => r.acct === 'B병원').status, rep3.installBlock.detail.rows.find(r => r.acct === 'B병원').sns], ['OK', 'S-B1, S-B2']);
assert.strictEqual(D2.dupOrphan.length, 2, 'B 병원 2대 중복 제외: ' + JSON.stringify(D2.orphan.map(o => o.acct)));
assert.strictEqual(D2.orphan.length, 3); assert(/기관명 연결·2일 차/.test(D2.dupOrphan[0].dupWhy));
assert.strictEqual(rep2.installBlock.install.total, 6, '중복 제외 장비는 설치 현황에도 안 들어감');

// 검산 워크북 탭·행
const cw = buildCheckWorkbook(rep2);
['정제_설치상세', '정제_설치현황', '정제_팀별설치실적'].forEach(n => assert(cw.SheetNames.includes(n), n));
assert(buildCheckWorkbook(rep3).SheetNames.includes('기관명매핑_자동'), '자동 매핑이 있으면 제안 탭');
const det = XLSX.utils.sheet_to_json(cw.Sheets['정제_설치상세'], { header: 1 });
assert.strictEqual(det.length, 1 + 3 + 3 + 2 + 1, '헤더 + 작업 3 + 미등록 3 + 중복 2 + 예정 1'); assert.strictEqual(det[det.length - 1][10], '예정(집계 제외)');
const tb = XLSX.utils.sheet_to_json(cw.Sheets['정제_팀별실적'], { header: 1 });
assert.deepStrictEqual(tb[1].slice(0, 11).map(v => v === undefined ? '' : v), ['FS EAST', '', 1, 3, 2, 0, 5, 5, 2, 1, 0], 'EAST: 설치+이전 3 = 신규 2 + 이전 1 · PM 2(갑) · 합계 5 · 1인당 5');
console.log('test_install: OK (모델 분해·정규화·병합·매칭·수동·캘린더 기준·예정/중고/데모 제외·미등록·대리점·선점·중복 제외·설치 현황·팀별 실적·매트릭스·검산 탭)');
