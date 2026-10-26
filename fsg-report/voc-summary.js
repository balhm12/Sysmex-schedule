#!/usr/bin/env node
/* 고객 만족도 월 집계 — VOC 대시보드 데이터(Firebase /voc-dashboard/data)를 내려받아 보고서용 값으로 만든다.
 *
 *   node fsg-report/voc-summary.js --period 2026-09 [--out out] [--keywords 친절,신속,설명,꼼꼼]
 *   --file data.json       Firebase 대신 내려받아 둔 data.json 을 읽는다(시험·오프라인)
 *   --firebase-url / --api-key  기본값은 voc-dashboard.html 안의 상수(대시보드와 항상 같게)
 *
 * 읽기는 대시보드와 같은 익명 로그인(관리자 계정 불필요). 결과: <out>/voc-summary_<기간>.json — 같은 폴더에 report-data_<기간>.json 이 있으면 그 안에 satisfaction 으로도 합쳐 넣는다(올릴 파일이 하나가 되도록).
 * 개인(FSR) 단위는 내지 않고 팀 단위만. */
'use strict';
const fs = require('fs'), path = require('path');
const { parsePeriod } = require('./lib/period');
const { summarizeVoc, DEFAULT_KEYWORDS } = require('./lib/voc');
const { trustSystemCerts, explainError } = require('./push-dashboard');

function args(argv) { const o = {}; for (let i = 0; i < argv.length; i++) { const a = argv[i]; if (a.startsWith('--')) { const k = a.slice(2), v = argv[i + 1]; if (v === undefined || v.startsWith('--')) o[k] = true; else { o[k] = v; i++; } } } return o; }
function vocConst(name, fallback) {
  try { const html = fs.readFileSync(path.join(__dirname, '..', 'voc-dashboard.html'), 'utf8'); const m = html.match(new RegExp('const ' + name + '\\s*=\\s*"([^"]*)"')); if (m) return m[1]; } catch (e) { /* 없으면 기본값 */ }
  return fallback;
}
async function fetchData(base, apiKey, dataPath) {
  const r = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + apiKey, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ returnSecureToken: true }) });
  const j = await r.json(); if (!r.ok) throw new Error('익명 로그인 실패: ' + ((j.error && j.error.message) || r.status));
  const res = await fetch(base.replace(/\/+$/, '') + dataPath + '?auth=' + encodeURIComponent(j.idToken), { cache: 'no-store' });
  if (res.status === 401 || res.status === 403) throw new Error('VOC 데이터 읽기 권한이 없습니다(Firebase 규칙·API 키 확인)');
  if (!res.ok) throw new Error('VOC 데이터 읽기 오류 ' + res.status);
  const data = await res.json(); if (!data || !data.recs) throw new Error('VOC 데이터가 비어 있거나 형식이 다릅니다(/voc-dashboard/data)');
  return data;
}
async function main() {
  const o = args(process.argv.slice(2));
  if (!o.period || o.help) { console.log(fs.readFileSync(__filename, 'utf8').split('*/')[0].replace(/^\/\*|^ \* ?/gm, '')); process.exit(o.period ? 0 : 1); }
  trustSystemCerts();
  const period = parsePeriod(o.period), months = period.months.map(ym => ym.y + '-' + String(ym.m).padStart(2, '0'));
  const data = o.file ? JSON.parse(fs.readFileSync(o.file, 'utf8'))
    : await fetchData(o['firebase-url'] || vocConst('FIREBASE_URL', ''), o['api-key'] || vocConst('FIREBASE_API_KEY', ''), vocConst('DATA_PATH', '/voc-dashboard/data.json'));
  const sat = summarizeVoc(data, months, { keywords: o.keywords ? String(o.keywords).split(',') : DEFAULT_KEYWORDS });
  const out = path.resolve(o.out || path.join(__dirname, 'out')); fs.mkdirSync(out, { recursive: true });
  const stem = period.key.replace(/[^\w가-힣~-]/g, '_');
  fs.writeFileSync(path.join(out, 'voc-summary_' + stem + '.json'), JSON.stringify(sat, null, 2));
  const rp = path.join(out, 'report-data_' + stem + '.json'); let merged = false;
  if (fs.existsSync(rp)) { const rep = JSON.parse(fs.readFileSync(rp, 'utf8')); rep.satisfaction = sat; fs.writeFileSync(rp, JSON.stringify(rep, null, 2)); merged = true; }
  console.log(`[만족도 ${period.label}] 응답 ${sat.n}건 · 응답률 ${sat.responseRate == null ? '-' : sat.responseRate + '%'} · 종합 ${sat.avg == null ? '-' : sat.avg} · 저점수 ${sat.low}건 (방문 ${sat.visits}건, 집계 기준일 ${sat.visitAsOf || '-'})` + (merged ? ' → report-data 에 합쳐 넣음' : ' (같은 폴더에 report-data 가 없어 별도 파일만 저장)'));
  if (!sat.n) console.log('⚠ 이 기간의 응답이 없습니다 — 기간·집계 대상 월(startMonth ' + (sat.startMonth || '-') + ')을 확인하세요');
}
main().catch(e => { console.error('오류: ' + explainError(e)); process.exit(1); });
