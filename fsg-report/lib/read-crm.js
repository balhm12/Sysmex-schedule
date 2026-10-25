/* CRM(Dynamics 365) 내보내기 xlsx → 대시보드(fsg-kpi.html)와 같은 행 모양.
 * fsg-kpi.html의 xlsxRows / toMs / col / parseActivity / parseSerial 을 Node로 옮긴 것이다(판정 규칙 동일).
 * 행: {st, ft, t, e, own, err, acct, sn, prod, purp, subj, att, c}  — t/e = 벽시계 시각을 UTC ms로 둔 값 */
'use strict';
const fs = require('fs'), path = require('path');
const XLSX = require('xlsx');
const DAY = 86400000;

function xlsxRows(buf, mustHave) {
  const wb = XLSX.read(buf, { type: 'buffer', cellDates: false, dense: true });
  for (const name of wb.SheetNames) {
    const rows = XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1, raw: true, defval: '' });
    if (!rows.length) continue;
    const h = rows[0].map(x => String(x).trim());
    if (!mustHave || mustHave.every(m => h.some(c => c.includes(m)))) return { h, rows: rows.slice(1), sheet: name };
  }
  return null;
}
function toMs(v) {
  if (v === '' || v == null) return null;
  if (typeof v === 'number') return Math.round((v - 25569) * DAY);
  if (v instanceof Date) return Date.UTC(v.getFullYear(), v.getMonth(), v.getDate(), v.getHours(), v.getMinutes());
  const s = String(v).trim().replace(/\./g, '-');
  // 'YYYY-MM-DD 오후 2:30' / 'YYYY-MM-DD PM 2:30' / 'YYYY-MM-DD 14:30' — 문자열 날짜는 직접 읽는다(Node의 Date 파서는 AM/PM 표기를 못 읽음)
  const m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:[ T]+(오전|오후|AM|PM)?\s*(\d{1,2}):(\d{2})(?::\d{2})?\s*(오전|오후|AM|PM)?)?$/i);
  if (m) {
    let h = +(m[5] || 0); const ap = (m[4] || m[7] || '').toUpperCase();
    if (/오후|PM/.test(ap) && h < 12) h += 12; else if (/오전|AM/.test(ap) && h === 12) h = 0;
    return Date.UTC(+m[1], +m[2] - 1, +m[3], h, +(m[6] || 0));
  }
  const d = new Date(s); if (isNaN(d)) return null;
  return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes());
}
function col(h, names, fallback) {
  for (const n of names) { const i = h.findIndex(c => c === n); if (i >= 0) return i; }
  for (const n of names) { const i = h.findIndex(c => c.includes(n)); if (i >= 0) return i; }
  return fallback;
}
function parseActivity(buf) {
  const t = xlsxRows(buf, ['약속/활동 목적']);
  if (!t) throw new Error("'약속/활동 목적' 열이 있는 시트를 찾지 못했습니다. CRM '모든 약속/활동' 내보내기 파일인지 확인해 주세요.");
  return parseActivityRows(t);
}
/* {h: 헤더 배열, rows: 데이터 행 배열} → 행 객체 (시트 사본의 원본_활동 탭처럼 이미 읽어 둔 표에도 쓴다) */
function parseActivityRows(t) {
  const h = t.h.map(x => String(x).trim());
  const ix = { st: col(h, ['상태'], 3), ft: col(h, ['양식 타입'], 4), t: col(h, ['시작 시간'], 5), e: col(h, ['종료 시간'], 6), own: col(h, ['담당자'], 7),
    subj: col(h, ['주제'], 8), err: col(h, ['Error 1'], 9), acct: col(h, ['거래처'], 12), sn: col(h, ['Serial No. (lookup)', 'Serial No'], 14),
    prod: col(h, ['Product'], 15), purp: col(h, ['약속/활동 목적'], 16), att: col(h, ['필수 참석자'], -1), cr: col(h, ['만든 날짜'], -1),
    err2: col(h, ['Error 2', 'Error2'], -1), err3: col(h, ['Error 3', 'Error3'], -1) };   // err2·err3: 장애 요인 TOP4용(Apps Script ERROR2·ERROR3)
  const out = [];
  for (const r of t.rows) {
    if (!r.length || r.every(v => v === '')) continue;
    const g = k => { const v = r[ix[k]]; return v == null ? '' : String(v).trim(); };
    out.push({ st: g('st'), ft: g('ft'), t: toMs(r[ix.t]), e: toMs(r[ix.e]), own: g('own'), err: g('err'), acct: g('acct'), sn: g('sn'),
      prod: g('prod'), purp: g('purp'), subj: g('subj'), att: g('att'), c: ix.cr >= 0 ? toMs(r[ix.cr]) : null,
      err2: ix.err2 >= 0 ? g('err2') : '', err3: ix.err3 >= 0 ? g('err3') : '' });
  }
  if (!out.length) throw new Error('읽을 수 있는 행이 없습니다.');
  return { rows: out, header: h, hasAtt: ix.att >= 0, hasFormType: h.includes('양식 타입'), sheet: t.sheet };
}
function parseSerial(buf) {
  const t = xlsxRows(buf, null);
  if (!t) throw new Error('시트를 읽지 못했습니다.');
  return parseSerialRows(t);
}
/* Serial No 자산대장 {h, rows} → [{state, acct, sn, model, install, first, dealer}] */
function parseSerialRows(t) {
  const h = t.h.map(x => String(x).trim());
  const ix = { state: col(h, ['상태'], 3), acct: col(h, ['거래처'], 6), sn: col(h, ['Serial No.', 'Serial No', 'Serial'], 14), model: col(h, ['모델', 'Product', 'Model'], 13),
    install: col(h, ['설치일자', '설치 일자'], -1), first: col(h, ['초도설치', '초도 설치'], -1), dealer: col(h, ['대리점 명', '대리점명', '대리점'], -1) };
  const g = (r, i) => i >= 0 && r[i] != null ? String(r[i]).trim() : '';
  const out = t.rows.filter(r => r.length).map(r => ({ state: g(r, ix.state), acct: g(r, ix.acct), sn: g(r, ix.sn), model: g(r, ix.model),
    install: ix.install >= 0 ? toMs(r[ix.install]) : null, first: ix.first >= 0 ? toMs(r[ix.first]) : null, dealer: g(r, ix.dealer) }));
  if (!out.some(s => s.state === '사용')) throw new Error("상태가 '사용'인 장비를 찾지 못했습니다. Serial No 자산대장 내보내기인지 확인해 주세요.");
  return out;
}
/* 서비스 케이스 내보내기 → [{acct, created}] (병원 TOP5 당월은 케이스 건수 기준) */
function parseCases(buf) {
  const t = xlsxRows(buf, ['만든 날짜']) || xlsxRows(buf, null);
  if (!t) throw new Error('케이스 시트를 읽지 못했습니다.');
  return parseCasesRows(t);
}
function parseCasesRows(t) {
  const h = t.h.map(x => String(x).trim());
  const ix = { acct: col(h, ['거래처'], -1), created: col(h, ['만든 날짜', '만든날짜', '생성일'], -1) };
  if (ix.acct < 0 || ix.created < 0) throw new Error("케이스 파일에 '거래처'·'만든 날짜' 열이 있어야 합니다.");
  return t.rows.filter(r => r.length).map(r => ({ acct: r[ix.acct] == null ? '' : String(r[ix.acct]).trim(), created: toMs(r[ix.created]) }));
}

/* ── 폴더에서 종류별 최신 파일 고르기 (월간보고 시트 Apps Script v52와 같은 규칙) ── */
function fileDateKey(name) {
  const s = String(name || ''), m = s.match(/(20\d{2})[-_.](\d{1,2})[-_.](\d{1,2})(?!\d)/) || s.match(/(20\d{2})(\d{2})(\d{2})(?!\d)/);
  if (!m) return null;
  const y = +m[1], mo = +m[2], d = +m[3];
  if (mo < 1 || mo > 12 || d < 1 || d > 31) return null;
  return y + '-' + String(mo).padStart(2, '0') + '-' + String(d).padStart(2, '0');
}
const TYPES = [
  { key: 'CASE', pat: /케이스|case/i }, { key: 'SER', pat: /serial|시리얼|자산/i }, { key: 'CAL', pat: /캘린더|calendar/i }, { key: 'ACT', pat: /약속|활동|activit/i },
];
function classifyByName(name) { for (const T of TYPES) if (T.pat.test(name)) return T.key; return null; }
function newerThan(a, b) {
  if (a.dateKey && b.dateKey && a.dateKey !== b.dateKey) return a.dateKey > b.dateKey;
  if (!!a.dateKey !== !!b.dateKey) return !!a.dateKey;
  return a.mtime > b.mtime;
}
function pickLatest(dir) {
  const picks = {};
  for (const f of fs.readdirSync(dir)) {
    if (!/\.(xlsx|xlsm|xls|csv)$/i.test(f) || /^~\$/.test(f)) continue;
    const key = classifyByName(f); if (!key) continue;
    const c = { path: path.join(dir, f), name: f, dateKey: fileDateKey(f), mtime: fs.statSync(path.join(dir, f)).mtimeMs };
    if (!picks[key] || newerThan(c, picks[key])) picks[key] = c;
  }
  return picks;
}
module.exports = { xlsxRows, toMs, col, parseActivity, parseActivityRows, parseSerial, parseSerialRows, parseCases, parseCasesRows, fileDateKey, classifyByName, pickLatest, DAY };
