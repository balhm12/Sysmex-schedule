/* CRM 원본 읽기·업로드 입구·자동 가져오기 — 순수 로직 시험
 *
 * 2026-11-12: 이 기능들은 편집기 붙여넣기 사고로 **45개 함수가 통째로 사라졌다가**
 * 배포된 「버전 2」에서 되살린 것이다(웹 앱은 배포 시점 코드로 돌아 살아남았다).
 * 또 사라지면 ① 방문건수(응답률 분모)가 멈추고 ② PC 「FSG 대시보드 올리기」가 끊기므로,
 * 먼저 함수가 있는지부터 확인한다.
 *
 * Drive·시트가 필요한 부분은 여기서 돌릴 수 없어, 자료만으로 판정되는 곳을 본다.
 */
const fs = require('fs'), path = require('path');
const SRC = path.join(__dirname, '..', 'apps-script', 'survey_analysis.gs');
const code = fs.readFileSync(SRC, 'utf8');

let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log('  ✗ ' + m); } };

/* ---------- 1. 되살린 45개가 있는가 ---------- */
const RESTORED = [
  // CRM 원본 읽기 + 변환 캐시
  'crmHubId_', 'crmSourceLabel_', 'crmFolderSpec_', 'crmFindFolder_', 'crmFileDateKey_',
  'crmPickActFiles_', 'crmListFiles_', 'crmConvert_', 'crmToast_', 'crmCacheName_',
  'crmCacheFind_', 'crmCacheTrimOld_', 'crmCacheGet_', 'crmWarmCache_', 'clearCrmCache',
  'sweepStaleTemps_', 'crmRemoveTemp_', 'crmReadFileCols_', 'crmFileTod_', 'crmRange_',
  'crmOverlap_', 'crmLoadFromFolder_', 'crmMemoPrefetch_', 'loadCrmTable_', 'loadCrmTableRaw_',
  'setCrmHubSheet', 'setCrmFolder', 'diagnoseCrmSource',
  // 6분 한도 대응 — 단계 나눠 실행
  'updJson_', 'runUpdateSteps_', 'resumeUpdateStepsTrigger', 'runAllUpdatesForce', 'runAllUpdates',
  // PC 업로드 입구 (바탕화면 「FSG 대시보드 올리기」)
  'uploadTokenEq_', 'uploadReply_', 'uploadHex_', 'uploadReportFolder_', 'uploadCore_',
  'doPost', 'setupUploadToken', 'showUploadStatus',
  // CRM 자동 가져오기
  'crmNowStr_', 'crmAutoState_', 'crmAutoMail_', 'autoCrmRefresh', 'autoCrmRefreshTrigger',
  'installAutoCrmTrigger', 'removeAutoCrmTrigger', 'runAutoCrmNow', 'showAutoCrmStatus',
];
RESTORED.forEach(f => ok(code.indexOf('\nfunction ' + f + '(') !== -1,
  f + ' 가 없음 — 10-26 기능이 또 사라졌다'));

/* 같은 이름이 두 번 정의되면 뒤쪽이 이기므로 조용히 동작이 바뀐다 */
const defs = (code.match(/^function [A-Za-z_][A-Za-z0-9_]*/gm) || []).map(s => s.slice(9));
const dup = defs.filter((v, i) => defs.indexOf(v) !== i);
ok(dup.length === 0, '함수가 두 번 정의됨: ' + dup.join(', '));

/* 변환 캐시가 빠지면 xlsx 를 매번 다시 변환해 진단이 260초까지 걸린다 */
ok(/crmCacheGet_\(/.test(code) && /\[CRM변환캐시\]/.test(code),
  '변환 캐시가 실제로 쓰이지 않음 — 매번 xlsx 를 다시 변환하게 된다');

/* ---------- 2. 설정값 ---------- */
ok(/CRM_FOLDER:\s*'CRM_원본'/.test(code), "CONFIG.CRM_FOLDER 기본값이 'CRM_원본' 이 아님");
ok(/HUB_SHEET:\s*''/.test(code) && /HUB_CRM_TAB:\s*'원본_활동'/.test(code),
  '허브 시트 설정(HUB_SHEET·HUB_CRM_TAB)이 없음 — crmHubId_ 가 못 읽는다');
ok(/VISITS_SKIP_CURRENT_MONTH:\s*true/.test(code), 'VISITS_SKIP_CURRENT_MONTH 가 꺼져 있음');

/* 당월 제외는 버전 2 에 없던 것이라, 블록을 되살릴 때 날아가기 쉽다 */
ok(/if \(skipMonth && m >= skipMonth\) continue;/.test(code),
  '진행 중인 달 제외가 집계 루프에 없음');
ok(/const skipMonth = CONFIG\.VISITS_SKIP_CURRENT_MONTH/.test(code), 'skipMonth 계산이 없음');

/* 읽는 경로가 셋(폴더 → 허브 시트 → CRM원본 탭) 다 살아 있는가 */
ok(/crmLoadFromFolder_\(/.test(code), '폴더 경로를 부르는 곳이 없음');
ok(code.indexOf('ss.getSheetByName(SHEETS.CRM)') !== -1 || /SHEETS\.CRM/.test(code),
  'CRM원본 탭 대비 경로가 사라짐 — 폴더를 못 읽을 때 멈추게 된다');

/* 집계 두 곳이 열 목록을 넘겨 읽는가 (버전 2 의 loadCrmTable_(needCols) 규약) */
ok(/loadCrmTable_\(\['상태', '양식 타입'/.test(code), 'importCrmVisits 가 필요한 열을 넘기지 않음');
ok(/loadCrmTable_\(\['거래처', '담당자'\]\)/.test(code), 'seedOrgDbFromCrm 이 필요한 열을 넘기지 않음');
ok(!/loadCrmTable_\(\)/.test(code), 'loadCrmTable_() 를 인자 없이 부르는 곳이 남아 있음 (예전 규약)');

/* ---------- 3. 업로드 입구 안전장치 ---------- */
ok(/MIN_TOKEN: 24/.test(code), '업로드 토큰 최소 길이 검사가 없음');
ok(/uploadTokenEq_\(String\(req\.token/.test(code), '토큰 비교가 uploadTokenEq_ 를 쓰지 않음');
ok(/d \|= a\.charCodeAt\(i\) \^ b\.charCodeAt\(i\)/.test(code),
  '토큰 비교가 상수 시간이 아님 — 한 글자씩 새어 나갈 수 있다');
ok(/Utilities\.sleep\(1500\)/.test(code), '인증 실패 때 지연이 없음 — 무차별 대입을 늦추지 못한다');
ok(!/UPLOAD_TOKEN['"]?\s*[,:]\s*['"][A-Za-z0-9]{8}/.test(code),
  '토큰 값이 코드에 박혀 있음 — 스크립트 속성에만 있어야 한다');

/* ---------- 4. 파일 이름·고르기 판정 ---------- */
const grab = name => {
  const re = new RegExp('^function ' + name + '\\([\\s\\S]*?\\n\\}', 'm');
  const m = re.exec(code);
  if (!m) throw new Error(name + ' 를 찾지 못했습니다');
  return m[0];
};
const sandbox = new Function(
  ['crmFileDateKey_', 'crmPickActFiles_', 'crmFileTod_', 'crmRange_', 'crmOverlap_'].map(grab).join('\n') +
  '\nreturn { crmFileDateKey_, crmPickActFiles_, crmFileTod_, crmRange_, crmOverlap_ };')();
const { crmFileDateKey_, crmPickActFiles_, crmFileTod_, crmRange_, crmOverlap_ } = sandbox;

[
  ['2. 모든 약속_활동 2026_11_12 AM 8-47-05.xlsx', '2026-11-12'],
  ['모든 약속_활동 2026-11-12.xlsx', '2026-11-12'],
  ['약속_활동 20261112.xlsx', '2026-11-12'],
  ['약속_활동.xlsx', null],
  ['약속_활동 2026_13_40.xlsx', null],      // 없는 월·일은 날짜로 보지 않는다
].forEach(([n, want]) => ok(crmFileDateKey_(n) === want,
  'crmFileDateKey_("' + n + '") = ' + crmFileDateKey_(n) + ' (기대 ' + want + ')'));

const cand = (name, at) => ({ name: name, updated: new Date(at).getTime(), dateKey: crmFileDateKey_(name) });

// 가장 새로운 날짜 하나만, 활동 파일만
let got = crmPickActFiles_([
  cand('모든 약속_활동 2026_11_10.xlsx', '2026-11-10T09:00:00Z'),
  cand('모든 약속_활동 2026_11_12.xlsx', '2026-11-12T09:00:00Z'),
  cand('Serial No 2026_11_12.xlsx', '2026-11-12T09:00:00Z'),
  cand('서비스 케이스 2026_11_12.xlsx', '2026-11-12T09:00:00Z'),
]).map(c => c.name);
ok(got.length === 1 && got[0] === '모든 약속_활동 2026_11_12.xlsx',
  '가장 새 날짜의 활동 파일 하나만 골라야 함: ' + JSON.stringify(got));

// 같은 날짜가 여럿이면 모두 (CRM 내보내기 40,000행 상한으로 기간을 나눈 경우)
got = crmPickActFiles_([
  cand('약속_활동 2026_11_12 (2).xlsx', '2026-11-12T09:10:00Z'),
  cand('약속_활동 2026_11_12 (1).xlsx', '2026-11-12T09:00:00Z'),
  cand('약속_활동 2026_11_05.xlsx', '2026-11-05T09:00:00Z'),
]).map(c => c.name);
ok(got.length === 2 && got[0] < got[1], '같은 날짜 파일은 모두, 이름 순으로: ' + JSON.stringify(got));

// 이름에 날짜가 없으면 수정 시각이 가장 늦은 것 하나
got = crmPickActFiles_([
  cand('약속_활동 내보내기.xlsx', '2026-11-01T09:00:00Z'),
  cand('약속_활동 최신.xlsx', '2026-11-12T09:00:00Z'),
]).map(c => c.name);
ok(got.length === 1 && got[0] === '약속_활동 최신.xlsx',
  '날짜 없으면 수정 시각 최신 하나: ' + JSON.stringify(got));

// 날짜가 있는 파일이 날짜 없는 파일보다 우선
got = crmPickActFiles_([
  cand('약속_활동 최신본.xlsx', '2026-11-20T09:00:00Z'),
  cand('약속_활동 2026_11_12.xlsx', '2026-11-12T09:00:00Z'),
]).map(c => c.name);
ok(got.length === 1 && got[0] === '약속_활동 2026_11_12.xlsx',
  '이름에 날짜가 있는 파일을 먼저 봐야 함: ' + JSON.stringify(got));

ok(crmPickActFiles_([cand('Serial No 2026_11_12.xlsx', '2026-11-12T09:00:00Z')]).length === 0,
  '활동 파일이 없으면 빈 배열이어야 함');

/* 같은 날 여러 번 내보낸 파일의 순서 — 시각이 늦은 것이 뒤에 */
ok(crmFileTod_('모든 약속_활동 2026_11_12 AM 8-47-05.xlsx') === 8 * 3600 + 47 * 60 + 5,
  'crmFileTod_ 오전 판정 오류');
ok(crmFileTod_('모든 약속_활동 2026_11_12 PM 1-05-00.xlsx') === 13 * 3600 + 5 * 60,
  'crmFileTod_ 오후 판정 오류');
ok(crmFileTod_('모든 약속_활동 2026_11_12.xlsx') === null, '시각이 없으면 null 이어야 함');

/* 같은 기간을 다시 내보낸 파일을 겹침으로 알아내는가 */
const r = (lo, hi) => ({ lo: new Date(lo).getTime(), hi: new Date(hi).getTime() });
ok(crmOverlap_(r('2026-10-01', '2026-10-31'), r('2026-10-01', '2026-10-31')) === 1,
  '같은 기간이면 겹침 1');
ok(crmOverlap_(r('2026-10-01', '2026-10-31'), r('2026-11-01', '2026-11-30')) === 0,
  '안 겹치면 0');
ok(crmOverlap_(r('2026-10-01', '2026-10-31'), r('2026-10-20', '2026-11-20')) > 0.3,
  '일부 겹침을 잡아야 함');
ok(crmRange_([[new Date('2026-10-05')], [new Date('2026-10-01')]], 0).lo === new Date('2026-10-01').getTime(),
  'crmRange_ 가 가장 이른 시각을 못 찾음');
ok(crmRange_([['값']], -1) === null, '열이 없으면 null 이어야 함');

/* ---------- 5. 메뉴 ---------- */
const menu = /function onOpen\(\)[\s\S]*?addToUi\(\);/.exec(code);
ok(!!menu, 'onOpen 메뉴를 찾지 못함');
[
  'runAllUpdatesForce', 'setCrmFolder', 'installAutoCrmTrigger', 'removeAutoCrmTrigger',
  'runAutoCrmNow', 'showAutoCrmStatus', 'setupUploadToken', 'showUploadStatus',
  'setCrmHubSheet', 'diagnoseCrmSource', 'clearCrmCache',
  'syncLowFollow', 'setupLowFollowSync', 'testLowScoreAlert', 'resendMonthlyMail',
].forEach(f => ok(menu[0].indexOf("'" + f + "'") !== -1, '메뉴에 ' + f + ' 가 없음'));

/* 메뉴가 가리키는 함수가 모두 실제로 있는가 (없으면 누를 때 오류) */
(menu[0].match(/', '[A-Za-z_][A-Za-z0-9_]*'/g) || []).forEach(s => {
  const f = s.slice(4, -1);
  ok(code.indexOf('\nfunction ' + f + '(') !== -1, '메뉴 항목 ' + f + ' 에 해당하는 함수가 없음');
});

console.log(fail ? '\nCRM 원본·업로드·자동 가져오기: ' + pass + ' 통과 / ' + fail + ' 실패'
  : 'CRM 원본·업로드·자동 가져오기: ' + pass + '항목 통과');
process.exit(fail ? 1 : 0);
