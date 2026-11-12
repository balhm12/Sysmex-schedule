/* CRM 원본을 Drive 폴더에서 읽는 부분 — 순수 로직 시험
 *
 * 2026-10-26 에 같은 기능을 만들었다가 편집기 붙여넣기로 사라진 적이 있다.
 * 다시 사라지면 방문건수(응답률 분모)가 조용히 멈추므로, 함수가 있는지부터 확인한다.
 *
 * Drive·시트가 필요한 부분(crmConvert_·loadCrmTable_)은 여기서 돌릴 수 없어,
 * 파일 고르기·날짜 읽기·당월 제외처럼 자료만으로 판정되는 곳을 본다.
 */
const fs = require('fs'), path = require('path');
const SRC = path.join(__dirname, '..', 'apps-script', 'survey_analysis.gs');
const code = fs.readFileSync(SRC, 'utf8');

let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log('  ✗ ' + m); } };

/* ---------- 1. 있어야 할 것 ---------- */
[
  'function crmFolder_', 'function crmFolderSetting_', 'function crmFileDate_',
  'function crmIsActivityFile_', 'function crmPickFiles_', 'function crmConvert_',
  'function crmDropTemp_', 'function crmSweepTemps_', 'function loadCrmTable_',
  'function setCrmFolder', 'function diagnoseCrmSource',
].forEach(f => ok(code.indexOf(f) !== -1, f + ' 가 없음 — Drive 폴더 읽기가 또 사라졌다'));

ok(/CRM_FOLDER:\s*'CRM_원본'/.test(code), "CONFIG.CRM_FOLDER 기본값이 'CRM_원본' 이 아님");
ok(/VISITS_SKIP_CURRENT_MONTH:\s*true/.test(code), 'VISITS_SKIP_CURRENT_MONTH 가 꺼져 있음');

/* importCrmVisits·seedOrgDbFromCrm 이 폴더를 거쳐 읽는가 */
ok((code.match(/loadCrmTable_\(\)/g) || []).length >= 3,
  'loadCrmTable_() 를 쓰는 곳이 모자람 — 집계가 CRM원본 탭만 읽고 있을 수 있음');
ok(code.indexOf("ss.getSheetByName(SHEETS.CRM)") !== -1,
  'CRM원본 탭 대비 경로가 사라짐 — 폴더를 못 읽을 때 멈추게 된다');

/* 당월 제외가 집계 루프 안에 있는가 */
ok(/if \(skipMonth && m >= skipMonth\) continue;/.test(code),
  '진행 중인 달 제외가 집계 루프에 없음');
ok(/const skipMonth = CONFIG\.VISITS_SKIP_CURRENT_MONTH/.test(code),
  'skipMonth 계산이 없음');

/* ---------- 2. 파일 이름 판정 ---------- */
const grab = name => {
  const re = new RegExp('function ' + name + '\\([\\s\\S]*?\\n\\}', 'm');
  const m = re.exec(code);
  if (!m) throw new Error(name + ' 를 찾지 못했습니다');
  return m[0];
};
/* 세 함수는 서로를 부르므로 한 범위에 같이 올려 꺼내 쓴다 */
const sandbox = new Function(
  grab('crmFileDate_') + '\n' + grab('crmIsActivityFile_') + '\n' + grab('crmPickFiles_') +
  '\nreturn { crmFileDate_, crmIsActivityFile_, crmPickFiles_ };')();
const { crmFileDate_, crmIsActivityFile_, crmPickFiles_ } = sandbox;

[
  ['2. 모든 약속_활동 2026_11_12 AM 8-47-05.xlsx', '2026-11-12'],
  ['모든 약속_활동 2026-11-12.xlsx', '2026-11-12'],
  ['약속_활동 20261112.xlsx', '2026-11-12'],
  ['약속_활동.xlsx', ''],
  ['약속_활동 2026_13_40.xlsx', ''],           // 없는 월·일은 날짜로 보지 않는다
].forEach(([n, want]) => ok(crmFileDate_(n) === want,
  'crmFileDate_("' + n + '") = ' + crmFileDate_(n) + ' (기대 ' + want + ')'));

[
  ['2. 모든 약속_활동 2026_11_12 AM 8-47-05.xlsx', true],
  ['Serial No 2026_11_12 AM 8-45-42.xlsx', false],   // Serial 은 장비 목록
  ['약속_활동 2026_11_12.csv', false],               // xlsx 만
  ['서비스 케이스 2026_11_12.xlsx', false],
  ['설치 캘린더.xlsx', false],
].forEach(([n, want]) => ok(crmIsActivityFile_(n) === want,
  'crmIsActivityFile_("' + n + '") = ' + crmIsActivityFile_(n) + ' (기대 ' + want + ')'));

/* ---------- 3. 파일 고르기 ---------- */
const fakeFolder = list => ({
  getFiles() {
    let i = 0;
    return { hasNext: () => i < list.length, next: () => list[i++] };
  }
});
const file = (name, at) => ({ getName: () => name, getLastUpdated: () => new Date(at) });

// 가장 새로운 날짜 하나만
let got = crmPickFiles_(fakeFolder([
  file('모든 약속_활동 2026_11_10.xlsx', '2026-11-10T09:00:00Z'),
  file('모든 약속_활동 2026_11_12.xlsx', '2026-11-12T09:00:00Z'),
  file('Serial No 2026_11_12.xlsx', '2026-11-12T09:00:00Z'),
])).map(f => f.getName());
ok(got.length === 1 && got[0] === '모든 약속_활동 2026_11_12.xlsx',
  '가장 새 날짜 하나만 골라야 함: ' + JSON.stringify(got));

// 같은 날짜가 여럿이면 모두 (40,000행 제한으로 나눠 내보낸 경우)
got = crmPickFiles_(fakeFolder([
  file('약속_활동 2026_11_12 (1).xlsx', '2026-11-12T09:00:00Z'),
  file('약속_활동 2026_11_12 (2).xlsx', '2026-11-12T09:10:00Z'),
  file('약속_활동 2026_11_05.xlsx', '2026-11-05T09:00:00Z'),
])).map(f => f.getName());
ok(got.length === 2, '같은 날짜 파일은 모두 읽어야 함: ' + JSON.stringify(got));

// 이름에 날짜가 없으면 수정 시각이 가장 늦은 것 하나
got = crmPickFiles_(fakeFolder([
  file('약속_활동 내보내기.xlsx', '2026-11-01T09:00:00Z'),
  file('약속_활동 최신.xlsx', '2026-11-12T09:00:00Z'),
])).map(f => f.getName());
ok(got.length === 1 && got[0] === '약속_활동 최신.xlsx',
  '날짜 없으면 수정 시각 최신 하나: ' + JSON.stringify(got));

// 활동 파일이 없으면 빈 배열
ok(crmPickFiles_(fakeFolder([file('Serial No 2026_11_12.xlsx', '2026-11-12T09:00:00Z')])).length === 0,
  '활동 파일이 없으면 빈 배열이어야 함');

console.log(fail ? '\nCRM 폴더 읽기: ' + pass + ' 통과 / ' + fail + ' 실패'
  : 'CRM 폴더 읽기: ' + pass + '항목 통과');
process.exit(fail ? 1 : 0);
