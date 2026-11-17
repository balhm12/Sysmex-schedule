// 범례에 같은 상태가 두 번 나오지 않는지 확인합니다.
// OFF 는 오전·오후 목록(HALF_STATUS)과 야간 목록(NIGHT_STATUS_DEFAULT)에 둘 다 있어서
// 범례에 OFF 칩이 두 개 그려졌습니다 (2026-11-17 사용자 지적 「OFF가 두개임」).
//  1) 범례 칩의 상태 키가 중복되지 않는다 (전체 보기)
//  2) OFF 칩이 하나다 (전체 보기 · FS WEST · FS CENTRAL)
//  3) 하나뿐인 OFF 칩을 눌러도 오전 OFF 와 야간 OFF 칸이 모두 보인다
const fs = require('fs');
const { JSDOM } = require('jsdom');

const pad = n => String(n).padStart(2, '0');
const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const MON = new Date();
MON.setHours(0, 0, 0, 0);
MON.setDate(MON.getDate() - ((MON.getDay() + 6) % 7));
const TUE = (() => { const d = new Date(MON); d.setDate(d.getDate() + 1); return iso(d); })();

const html = fs.readFileSync('work-schedule.html', 'utf8')
  .replace(/<script src="https:\/\/(cdnjs\.cloudflare\.com|www\.gstatic\.com)[^"]*"><\/script>/g, '');
const dom = new JSDOM(html, { runScripts: 'dangerously', url: 'https://example.com/work-schedule.html' });
const { window } = dom; const doc = window.document;
window.alert = () => {}; window.confirm = () => true;
window.fetch = () => Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve({}) });

const chipKeys = () => [...doc.querySelectorAll('#legend .chip[data-filter]')].map(c => c.dataset.filter);
const countOf = (arr, k) => arr.filter(x => x === k).length;
const dups = arr => [...new Set(arr.filter((k, i) => arr.indexOf(k) !== i))];

(async () => {
  await new Promise(r => setTimeout(r, 900));
  window.closePanel();

  // 1) · 2) 전체 보기
  window.eval("currentTeam='all'; renderTeamTabs(); renderLegend(); render();");
  await new Promise(r => setTimeout(r, 150));
  const allKeys = chipKeys();
  const d = dups(allKeys);
  if (d.length) throw new Error('전체 보기 범례에 중복된 상태가 있음: ' + d.join(', ') + ' (칩: ' + allKeys.join(',') + ')');
  if (countOf(allKeys, 'OFF') !== 1) throw new Error('전체 보기 OFF 칩이 ' + countOf(allKeys, 'OFF') + '개');
  console.log('1) 전체 보기 범례에 중복 상태 없음 ✓ (칩 ' + allKeys.length + '개)');

  // 2) 팀별 보기에서도 하나씩
  for (const tk of ['west', 'central']) {
    window.eval(`currentTeam='${tk}'; renderTeamTabs(); renderLegend(); render();`);
    await new Promise(r => setTimeout(r, 120));
    const keys = chipKeys();
    const dd = dups(keys);
    if (dd.length) throw new Error(tk + ' 범례에 중복된 상태가 있음: ' + dd.join(', '));
    const n = countOf(keys, 'OFF');
    // FS CENTRAL 은 야간 목록에 OFF 가 없으므로 오전·오후 OFF 하나만 있어야 합니다.
    if (n !== 1) throw new Error(tk + ' OFF 칩이 ' + n + '개');
  }
  console.log('2) FS WEST · FS CENTRAL 에서도 OFF 칩은 하나 ✓');

  // 3) 하나뿐인 OFF 칩이 오전 OFF 와 야간 OFF 를 모두 걸러 준다
  const team = 'west';
  const names = window.eval(`TEAMS.${team}.members.map(m=>m.name)`);
  if (names.length < 3) throw new Error('테스트 전제 실패: 팀원이 너무 적음');
  window.eval(`setEntry('${team}','${TUE}','${names[0]}',{am1:'OFF',am2:'OFF',pm1:'OFF',pm2:'OFF',night:'',weekend:''})`);
  window.eval(`setEntry('${team}','${TUE}','${names[1]}',{am1:'ON',am2:'',pm1:'',pm2:'',night:'OFF',weekend:''})`);
  window.eval(`setEntry('${team}','${TUE}','${names[2]}',{am1:'휴가',am2:'휴가',pm1:'휴가',pm2:'휴가',night:'',weekend:''})`);
  window.eval(`currentTeam='${team}'; viewMode='week'; weekAnchor='${TUE}'; renderTeamTabs(); renderLegend(); render();`);
  await new Promise(r => setTimeout(r, 200));

  const offChip = [...doc.querySelectorAll('#legend .chip[data-filter]')].find(c => c.dataset.filter === 'OFF');
  if (!offChip) throw new Error('OFF 칩을 못 찾음');
  offChip.click();
  await new Promise(r => setTimeout(r, 150));

  const offCells = [...doc.querySelectorAll('td.wcell')].filter(td => td.textContent.trim() === 'OFF');
  if (offCells.length < 2) throw new Error('OFF 칸이 ' + offCells.length + '개 — 오전·야간 OFF 가 모두 있어야 함');
  const hidden = offCells.filter(td => td.classList.contains('wcell-dim'));
  if (hidden.length) throw new Error('OFF 를 골랐는데 OFF 칸 ' + hidden.length + '개가 흐려짐');
  const vac = [...doc.querySelectorAll('td.wcell')].filter(td => td.textContent.trim() === '휴가');
  if (vac.some(td => !td.classList.contains('wcell-dim'))) throw new Error('고르지 않은 휴가 칸이 흐려지지 않음');
  console.log('3) OFF 칩 하나로 오전 OFF · 야간 OFF 가 모두 보임 ✓ (OFF 칸 ' + offCells.length + '개)');

  console.log('\n✅ 범례에 같은 상태가 두 번 나오지 않음');
  process.exit(0);
})().catch(e => { console.error('\n❌ 테스트 실패:', e.message); process.exit(1); });
