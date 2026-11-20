#!/usr/bin/env node
/* KPI 지도 「기관 위치 → 시·군·구」 찾기 표(fsg-kpi-map-loc.json) 만들기 — 2026-11-20
   왜: 이동거리 좌표 파일의 기관 좌표는 「행정동 중심(동을 못 찾으면 시·군·구 중심)」이다.
     ① 동 중심을 줄인 지도 경계(fsg-kpi-map.json)에 넣으면 구 경계 가까운 동은 옆 구로 들어간다(3,559동 중 44곳).
     ② 주소에 구가 없는 기관(예: 「고양시 ○○로」)은 시 전체 중심을 받는데, 그 점은 그 시의 한 구(고양 → 일산동구) 안에 떨어진다.
   그래서 좌표 파일과 같은 행정동 경계로 동 중심·구 중심·시 중심 표를 만들어, 좌표가 그 점과 같으면 표의 시·군·구를 쓴다.
   쓰는 법: node scripts/build-kpi-map-loc.js <HangJeongDong_ver20261001.geojson> [sgg2018 원본 topojson]
     · 행정동 경계 = github.com/vuski/admdongkor (좌표 파일을 만든 것과 같은 판을 쓴다)
     · 두 번째 인자 = 지도를 만든 통계청 2018 시군구 경계 원본(줄이기 전). 이름으로 못 찾는 구(인천 2026 개편 등)는 이 경계로 찾는다. 없으면 fsg-kpi-map.json 으로 찾는다.
   결과는 저장소의 fsg-kpi-map-loc.json 에 쓴다. 좌표 파일을 새 행정동 판으로 다시 만들면 이 표도 같은 판으로 다시 만든다. */
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const [, , ADM, SRC] = process.argv;
if (!ADM) { console.error('사용법: node scripts/build-kpi-map-loc.js <행정동 geojson> [2018 시군구 원본 topojson]'); process.exit(1); }

/* 페이지와 같은 지도 읽기 코드를 쓴다(fsg-kpi.html 에서 떼어 옴) */
const html = fs.readFileSync(path.join(ROOT, 'fsg-kpi.html'), 'utf8');
const pick = re => { const m = html.match(re); if (!m) throw new Error('fsg-kpi.html 에서 찾지 못함: ' + re); return m[0]; };
const lib = new Function([pick(/const MAP_SD=\{[^\n]*\n/), pick(/const MAP_ALIAS=[^\n]*\n/),
  html.slice(html.indexOf('function kmapDecode(t){'), html.indexOf('function kmapFind(K, lat, lon){')),
  html.slice(html.indexOf('function kmapFind(K, lat, lon){'), html.indexOf('\n', html.indexOf('return bd<0.06?bi:-1;')) + 2)].join('\n') +
  '; return {kmapDecode, kmapFind, MAP_SD};')();
const K = lib.kmapDecode(JSON.parse(fs.readFileSync(path.join(ROOT, 'fsg-kpi-map.json'), 'utf8')));
const KS = SRC ? lib.kmapDecode(JSON.parse(fs.readFileSync(SRC, 'utf8'))) : K;

const SIDO = { '서울특별시': ['서울'], '부산광역시': ['부산'], '대구광역시': ['대구', '경북'], '인천광역시': ['인천'], '광주광역시': ['광주'], '대전광역시': ['대전'], '울산광역시': ['울산'],
  '세종특별자치시': ['세종'], '경기도': ['경기'], '강원도': ['강원'], '강원특별자치도': ['강원'], '충청북도': ['충북'], '충청남도': ['충남'], '전라북도': ['전북'], '전북특별자치도': ['전북'],
  '전라남도': ['전남'], '전남광주통합특별시': ['광주', '전남'], '경상북도': ['경북'], '경상남도': ['경남'], '제주특별자치도': ['제주'] };
const nz = s => String(s == null ? '' : s).replace(/\s/g, '');
/* 2018 지도 뒤에 바뀐 이름 → 2018 지도 이름 */
const RENAME = { '인천|미추홀구': '남구' };
const byName = {}; K.G.forEach((g, gi) => { (byName[g.name] = byName[g.name] || []).push(gi); });
const codeOf = gi => K.G[gi].code;

/* 넓이 중심(좌표 파일을 만들 때와 같은 방식 — 경위도 그대로) */
function centroid(geom) {
  const polys = geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates; let A = 0, X = 0, Y = 0;
  for (const p of polys) { const r = p[0]; for (let i = 0, j = r.length - 1; i < r.length; j = i++) { const f = r[j][0] * r[i][1] - r[i][0] * r[j][1]; A += f; X += (r[j][0] + r[i][0]) * f; Y += (r[j][1] + r[i][1]) * f; } }
  return [Y / (3 * A), X / (3 * A)];   /* [위도, 경도] */
}
/* 행정동의 시·군·구 → 2018 지도 칸. 이름으로 먼저, 못 찾으면 원본 경계에 동 중심을 넣어 찾는다 */
const how = { name: 0, pip: 0, none: 0 };
function polyOf(sido, sgg, lat, lon) {
  const sds = SIDO[sido] || [], n = nz(sgg);
  const tries = [n]; sds.forEach(sd => { if (RENAME[sd + '|' + n]) tries.unshift(RENAME[sd + '|' + n]); });
  const city = n.match(/^(.+?시)(.+[구])$/); if (city) tries.push(city[1]);   /* 2018 뒤에 생긴 일반구(화성·부천) → 시 하나 */
  for (const t of tries) { const c = (byName[t] || []).filter(gi => sds.indexOf(K.G[gi].sd) >= 0); if (c.length === 1) { how.name++; return c[0]; } }
  const gi = lib.kmapFind(KS, lat, lon); if (gi < 0) { how.none++; return -1; }
  how.pip++; const code = KS.G[gi].code; return K.G.findIndex(g => g.code === code);
}

const J = JSON.parse(fs.readFileSync(ADM, 'utf8'));
const codes = [], ki = {}; const kOf = gi => { const c = codeOf(gi); if (ki[c] === undefined) { ki[c] = codes.length; codes.push(c); } return ki[c]; };
const r4 = v => Math.round(v * 1e4);
const D = [], gu = {}, unres = [];
for (const f of J.features) {
  const p = f.properties, [lat, lon] = centroid(f.geometry), gi = polyOf(p.sidonm, p.sggnm, lat, lon);
  if (gi < 0) { unres.push(p.adm_nm); continue; }
  D.push(r4(lat), r4(lon), kOf(gi));
  const k = p.sidonm + '|' + nz(p.sggnm), o = gu[k] || (gu[k] = { n: 0, la: 0, lo: 0, gi, sido: p.sidonm, sgg: nz(p.sggnm) }); o.n++; o.la += lat; o.lo += lon;
}
/* 시·군·구 중심 = 그 시·군·구 동 중심의 평균(좌표 파일과 같은 계산) */
const G = []; for (const k in gu) { const o = gu[k]; G.push(r4(o.la / o.n), r4(o.lo / o.n), kOf(o.gi)); }
/* 시 중심 — 2018 지도에서 구가 둘 이상으로 나뉜 시만(수원·성남·고양 …). 이 점은 어느 구인지 모른다 */
const city = {}; for (const k in gu) { const o = gu[k], m = o.sgg.match(/^(.+?시)(.+구)$/); if (!m) continue;
  const c = city[o.sido + '|' + m[1]] || (city[o.sido + '|' + m[1]] = { name: m[1], n: 0, la: 0, lo: 0, ks: new Set() });
  c.n += o.n; c.la += o.la; c.lo += o.lo; c.ks.add(o.gi); }
const C = []; for (const k in city) { const c = city[k]; if (c.ks.size < 2) continue; C.push([r4(c.la / c.n), r4(c.lo / c.n), c.name, [...c.ks].map(kOf)]); }

const made = new Date().toISOString().slice(0, 10), ver = (path.basename(ADM).match(/ver\d{8}/) || [''])[0];
const out = { v: 1, src: '행정동 경계 ' + (ver || path.basename(ADM)) + ' (vuski/admdongkor) — 좌표 파일과 같은 판', made, k: codes, d: D, g: G, c: C };
fs.writeFileSync(path.join(ROOT, 'fsg-kpi-map-loc.json'), JSON.stringify(out));
console.log(`동 ${D.length / 3} · 시군구 ${G.length / 3} · 시 ${C.length} (${C.map(c => c[2]).join('·')}) · 이름으로 ${how.name} · 경계로 ${how.pip} · 못 찾음 ${unres.length}${unres.length ? ' — ' + unres.slice(0, 8).join(', ') : ''}`);
console.log('크기', fs.statSync(path.join(ROOT, 'fsg-kpi-map-loc.json')).size, '바이트');
