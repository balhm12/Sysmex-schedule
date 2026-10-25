/* 검산 워크북 — 월간보고 시트의 정제 탭과 같은 열 배치로 써서 나란히 대조할 수 있게 한다. */
'use strict';
const XLSX = require('xlsx');
const nz = v => (v === null || v === undefined) ? '' : v;

function buildCheckWorkbook(rep) {
  const wb = XLSX.utils.book_new(), teams = rep.meta.teams, short = teams.map(t => t.replace('FS ', ''));
  const add = (name, aoa) => XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(aoa.map(r => r.map(nz))), name);
  const k = rep.kpi;
  add('정제_KPI', [
    ['기준월', 'FTFR(%)', 'MTTR(분)', '예방정비지수(%)', '고장수리건수', '재방문건수', 'PM건수', '재방문율(%)'],
    [k.period, k.ftfr, k.mttr, k.pmRatio, k.repairCount, k.revisitCount, k.pmCount, k.revisitRate],
    [],
    ['팀', 'FTFR(%)', '재방문율(%)', 'MTTR(분)'],
    ...k.teams.map(t => [t.team, t.ftfr, t.revisit, t.mttr]),
  ]);
  add('정제_KPI월별추이', [
    ['월', 'FTFR(%)', '재방문율(%)', 'MTTR(분)', '예방정비지수(%)', '고장수리', 'PM', ...short.map(t => 'FTFR ' + t), ...short.map(t => '재방문율 ' + t), ...short.map(t => 'MTTR ' + t), '비고'],
    ...rep.kpiTrend.map(r => { const tm = {}; r.kpi.teams.forEach(t => tm[t.team] = t);
      return [r.label, r.kpi.ftfr, r.kpi.revisitRate, r.kpi.mttr, r.kpi.pmRatio, r.kpi.repairCount, r.kpi.pmCount,
        ...teams.map(t => tm[t].ftfr), ...teams.map(t => tm[t].revisit), ...teams.map(t => tm[t].mttr), '']; }),
  ]);
  const tr = rep.team.rows, sum = key => tr.reduce((s, r) => s + r[key], 0), cnt = sum('count');
  add('정제_팀별실적', [
    ['팀', '리더', '인원', '설치+이전', 'PM', 'A/S', '합계', '1인당', '└ 설치', '└ 이전설치', '(참고) CRM 설치 활동'],
    ...tr.map(r => [r.team, r.leader, r.count, r.inst, r.pm, r.as_, r.sum, r.perHead, '', '', r.instCrm]),
    ['합계', '', cnt, sum('inst'), sum('pm'), sum('as_'), rep.team.total, cnt ? Math.round(rep.team.total / cnt * 10) / 10 : 0, '', '', sum('instCrm')],
    [],
    ['※ 설치+이전 = CRM 활동 수(' + rep.team.instSource + '). 시트는 원본_설치캘린더가 있으면 캘린더 기준 기관 수로 바꾼다 — 설치 묶음(2차)에서 맞춘다.'],
  ]);
  const ca = rep.caseAnalysis;
  add('정제_케이스분석', [
    ['구분', '월/시리즈', '고장수리', '재방문 또는PM', 'Cal또는재방문율(%)', '전월 재방문율(%)', '전월 대비', '비고'],
    ...ca.monthRows.map(r => ['월별추이', r[0], r[1], r[2], r[3], '', '', '']),
    ...ca.corrRows.map(r => ['상관표(' + rep.meta.period.label + ')', r[0], r[1], r[2], r[3], r[4], r[5], '']),
  ]);
  /* ── 2차 묶음 ── 시트 writeXxx_ 와 같은 열 배치 */
  const T = rep.trendCompare, pl = rep.meta.period.label;
  add('정제_트렌드비교', [
    ['구분', '개편 전(월평균)', '개편 후(월평균)', '증감'],
    ['PM건수', T.prePM, T.postPM, T.pmDelta + '%'],
    ['수리건수', T.preRP, T.postRP, T.rpDelta + '%'],
    ['예방정비 지수', T.prePMRatio + '%', T.postPMRatio + '%', (T.pmRatioDelta >= 0 ? '+' : '') + T.pmRatioDelta + '%p'],
    [], ['개편 후 반영 월: ' + T.postKeyLabels.join(', ')],
  ]);
  add('정제_수도권', [['월', '팀', 'PM건수', 'A/S건수', '비고'], ...rep.metro.rows.map(r => r.concat(['']))]);
  add('정제_엔지니어생산성', [['기간', '순위', '담당자', '팀', '건수', '직급', '고장수리%', 'PM%'],
    ...rep.engYear.map((r, i) => ['최근 1년', i + 1, r.name, r.team, r.count, r.grade, r.repairPct, r.pmPct]),
    ...rep.engMonth.map((r, i) => [pl, i + 1, r.name, r.team, r.count, r.grade, r.repairPct, r.pmPct])]);
  add('정제_병원TOP5', [['기간', '순위', '기관명', '건수'],
    ...rep.hospYear.map((r, i) => ['최근 1년(활동 기준)', i + 1, r.account, r.count]),
    ...rep.hospMonth.map((r, i) => [pl + '(케이스 기준)', i + 1, r.account, r.count])]);
  add('정제_반복고장TOP5', [['기간', '순위', 'S/N', '장비', '기관명', '건수'],
    ...rep.repeatYear.map((r, i) => ['최근 1년', i + 1, r.serial, r.model, r.account, r.count]),
    ...rep.repeatMonth.map((r, i) => [pl, i + 1, r.serial, r.model, r.account, r.count])]);
  add('정제_장애요인TOP4', [['기간', '순위', '장애 요인', '건수', '전체 기재 건수'],
    ...rep.errYear.rows.map((r, i) => ['최근 1년', i + 1, r.error, r.count, rep.errYear.total]),
    ...rep.errMonth.rows.map((r, i) => [pl, i + 1, r.error, r.count, rep.errMonth.total])]);
  add('정제_장비군에러율', [['월', ...rep.errRate.groups.map(g => g + ' 에러율(%)'), '비고'], ...rep.errRate.months.map(r => r.concat(['']))]);
  const H = rep.health;
  if (H) {
    const cv = teams.map(t => { const st = H.teamStat[t]; return st ? t + ': ' + H.teamCV[t] + '% (평균 ' + st.avg + '건 · ' + st.min + '~' + st.max + ' · ' + st.n + '명)' : t + ': -'; }).join(' · ');
    add('정제_운영건전성', [['지표', '값', '설명'],
      ['PM 커버리지율', H.pmCoverage + '%', '가동 ' + H.activeCount + '대 중 12개월 내 PM 수행 비율'],
      ['점검 일정 고르기', H.pmCV == null ? '-' : H.pmCV + '%', '달마다 점검량이 얼마나 들쭉날쭉한지 — 낮을수록 고르게 점검'],
      ['100대당 고장 발생률', H.per100 == null ? '-' : H.per100 + '건', '기간 월평균 고장수리 ÷ 가동 장비 ×100'],
      ['반복 고장 장비 비율', H.chronicRatio + '%', H.chronicUnits + '대 ÷ 가동 ' + H.activeCount + '대 (12개월 수리 3회 이상)'],
      ['팀원 간 업무량 차이', cv, '팀별 최근 12개월 인당 활동 건수의 편차 — 팀장·신입 제외, 낮을수록 고르게 분담']]);
    const F = rep.focus;
    add('정제_집중관리대상', [['기관명', '담당 팀(CRM 활동 기준)', '보유(6개월 PM 이력)', '반복 고장', '반복 고장 비율(%)', '12개월 수리', '5년 이상', '5년 이상 비율(%)', '필요 조치'],
      ...F.rows.map(r => [r.account, r.team, r.fleet, r.chronic, r.chronicPct, r.repairs, r.oldUnits, r.oldPct, r.action]),
      ['(선정 조건 충족 기관 수)', F.candidateCount + '곳', '', '', '', '', '', '', '상위 10곳 표기']]);
  } else {
    add('정제_운영건전성', [['지표', '값', '설명'], ['(Serial No 파일 없음)', '', '--serial 또는 --dir 에 Serial No 자산대장을 주면 가동 장비 기준 지표가 계산된다']]);
  }
  add('로스터미매핑', [['담당자', '건수', '거래처(예)'], ...rep.team.unmappedRows.map(u => [u.name, u.count, u.sample])]);
  const m = rep.meta;
  add('메타', [
    ['항목', '값'], ['기간', m.period.label], ['기간 키', m.period.key], ['CRM 추출일(cut)', m.cut || '(오늘)'],
    ['원본 행', m.rows.raw], ['추출일 이후 예정 제외', m.excluded.future], ['시작 시각 없음', m.excluded.notime],
    ['취소 제외', m.excluded.cancel], ['온라인 정기점검 제외', m.excluded.online], ['집계 행', m.rows.counted],
    ['로스터 인원 없는 행', m.unmappedRows], ['재방문율 대상 거래처(방문 3건 이상)', m.eligibleAccounts],
    ['활동 파일', (m.files && m.files.activity) || ''], ['Serial 파일', (m.files && m.files.serial) || (rep.inputs && rep.inputs.serial ? '(시트 사본)' : '(없음)')],
    ['케이스 파일', (m.files && m.files.cases) || (rep.inputs && rep.inputs.cases ? '(시트 사본)' : '(없음)')], ['가동 장비', rep.fleet ? rep.fleet.activeCount : ''],
    ['로스터', (m.files && m.files.roster) || ''], ['생성', new Date().toISOString()],
  ]);
  return wb;
}
module.exports = { buildCheckWorkbook };
