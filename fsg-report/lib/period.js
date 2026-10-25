/* 보고 기간 — 월간보고 시트 설정 B2와 같은 표기를 받는다.
 *   '2026-09'                → 단일 월
 *   '2026-07~2026-09'        → 구간(개월 수 제한 없음)
 *   'FY2026Q2' / '2026-Q2' / 'FY2026 Q2' → 회계 분기(4월 시작: Q1=4~6, Q2=7~9, Q3=10~12, Q4=1~3)
 * 돌려주는 값: {y, m(끝 달), label, key, months:[{y,m}], isQuarter, isRange} */
'use strict';
const mk = (y, m) => y * 12 + m;
const toYM = k => ({ y: Math.floor((k - 1) / 12), m: ((k - 1) % 12) + 1 });
const lab = (y, m) => y + '-' + String(m).padStart(2, '0');
function quarterBounds(fy, q) {
  let sy = fy, sm = (q - 1) * 3 + 4; if (sm > 12) { sy++; sm -= 12; }
  let ey = sy, em = sm + 2; if (em > 12) { ey++; em -= 12; }
  return { fy, q, sy, sm, ey, em };
}
function parsePeriod(raw) {
  const s = String(raw || '').trim();
  let m;
  if ((m = s.match(/^(\d{4})-(\d{1,2})\s*~\s*(\d{4})-(\d{1,2})$/))) {
    const a = mk(+m[1], +m[2]), b = mk(+m[3], +m[4]);
    if (a > b) throw new Error('기간: 시작월이 종료월보다 늦습니다 — ' + s);
    const months = []; for (let k = a; k <= b; k++) months.push(toYM(k));
    const e = toYM(b);
    return { y: e.y, m: e.m, months, isRange: true, isQuarter: false, key: lab(+m[1], +m[2]) + '~' + lab(+m[3], +m[4]),
      label: lab(+m[1], +m[2]) + '~' + lab(+m[3], +m[4]) + ' (' + months.length + '개월)' };
  }
  if ((m = s.match(/^(?:FY\s*)?(\d{4})[\s-]*Q([1-4])$/i))) {
    const q = quarterBounds(+m[1], +m[2]);
    const months = []; for (let k = mk(q.sy, q.sm); k <= mk(q.ey, q.em); k++) months.push(toYM(k));
    return { y: q.ey, m: q.em, months, isRange: false, isQuarter: true, key: 'FY' + q.fy + 'Q' + q.q,
      label: 'FY' + q.fy + ' Q' + q.q + ' (' + q.sy + '.' + q.sm + '~' + q.em + '월)' };
  }
  if ((m = s.match(/^(\d{4})-(\d{1,2})$/))) {
    const y = +m[1], mo = +m[2];
    return { y, m: mo, months: [{ y, m: mo }], isRange: false, isQuarter: false, key: lab(y, mo), label: lab(y, mo) };
  }
  throw new Error('기간 표기를 모르겠습니다: "' + s + '" — 예: 2026-09, 2026-07~2026-09, FY2026Q2');
}
function monthsBack(period, n) {            // 기간 끝 달까지 n개월 (추이용)
  const end = mk(period.y, period.m), out = [];
  for (let k = end - n + 1; k <= end; k++) out.push(toYM(k));
  return out;
}
function prevMonth(period) { return toYM(mk(period.y, period.m) - 1); }
module.exports = { parsePeriod, monthsBack, prevMonth, mk, toYM, lab };
