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
  add('로스터미매핑', [['담당자', '건수', '거래처(예)'], ...rep.team.unmappedRows.map(u => [u.name, u.count, u.sample])]);
  const m = rep.meta;
  add('메타', [
    ['항목', '값'], ['기간', m.period.label], ['기간 키', m.period.key], ['CRM 추출일(cut)', m.cut || '(오늘)'],
    ['원본 행', m.rows.raw], ['추출일 이후 예정 제외', m.excluded.future], ['시작 시각 없음', m.excluded.notime],
    ['취소 제외', m.excluded.cancel], ['온라인 정기점검 제외', m.excluded.online], ['집계 행', m.rows.counted],
    ['로스터 인원 없는 행', m.unmappedRows], ['재방문율 대상 거래처(방문 3건 이상)', m.eligibleAccounts],
    ['활동 파일', (m.files && m.files.activity) || ''], ['로스터', (m.files && m.files.roster) || ''], ['생성', new Date().toISOString()],
  ]);
  return wb;
}
module.exports = { buildCheckWorkbook };
