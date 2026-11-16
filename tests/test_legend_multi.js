// 범례(ON·OFF·휴가·당직…)를 여러 개 같이 고를 수 있는지 확인합니다.
// 전에는 하나만 골라졌고, 다른 것을 누르면 앞의 것이 꺼졌습니다.
//  1) 두 개를 누르면 둘 다 켜지고, 둘 중 하나라도 맞는 칸이 보인다(또는 조건)
//  2) 고른 것에 해당하지 않는 칸은 흐려진다
//  3) 같은 칩을 다시 누르면 그것만 꺼지고 나머지 선택은 남는다
//  4) 「필터 해제」에 고른 개수가 보이고, 누르면 전부 풀린다
//  5) 야간 상태와 오전·오후 상태를 같이 골라도 둘 다 걸린다
//  6) 팀을 바꾸면 그 팀에 없는 상태만 빠지고 나머지 선택은 유지된다
const fs = require('fs');
const { JSDOM } = require('jsdom');

const pad = n => String(n).padStart(2, '0');
const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const T = new Date();
const MON = new Date(T.getFullYear(), T.getMonth(), T.getDate());
MON.setDate(MON.getDate() - ((MON.getDay() + 6) % 7));
const dd = n => { const d = new Date(MON); d.setDate(d.getDate() + n); return iso(d); };
const TUE = dd(1);

const html = fs.readFileSync('work-schedule.html', 'utf8')
  .replace(/<script src="https:\/\/(cdnjs\.cloudflare\.com|www\.gstatic\.com)[^"]*"><\/script>/g, '');
const dom = new JSDOM(html, { runScripts: 'dangerously', url: 'https://example.com/work-schedule.html' });
const { window } = dom; const doc = window.document;
window.alert = () => {}; window.confirm = () => true;
window.fetch = (url, o) => {
  o = o || {};
  if ((o.method || 'GET') !== 'GET') return Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve({}) });
  return Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve({}) });
};

const chip = key => [...doc.querySelectorAll('#legend .chip[data-filter]')].find(c => c.dataset.filter === key);
const chipKeys = () => [...doc.querySelectorAll('#legend .chip[data-filter]')].map(c => c.dataset.filter);
const onKeys = () => [...doc.querySelectorAll('#legend .chip.active')].map(c => c.dataset.filter);
// 흐려지지 않은(= 필터에 걸린) 근무 칸의 글자들
const litCells = () => [...doc.querySelectorAll('td.wcell')]
  .filter(td => !td.classList.contains('wcell-dim') && !td.classList.contains('empty'))
  .map(td => td.textContent.trim());

(async () => {
  await new Promise(r => setTimeout(r, 900));
  window.closePanel();

  const team = 'west';
  const names = window.eval(`TEAMS.${team}.members.map(m=>m.name)`);
  if (names.length < 3) throw new Error('테스트 전제 실패: 팀원이 너무 적음');
  // 같은 날 서로 다른 상태 3가지를 넣습니다
  window.eval(`setEntry('${team}','${TUE}','${names[0]}',{am1:'ON',am2:'',pm1:'',pm2:'',night:'',weekend:''})`);
  window.eval(`setEntry('${team}','${TUE}','${names[1]}',{am1:'휴가',am2:'휴가',pm1:'휴가',pm2:'휴가',night:'',weekend:''})`);
  window.eval(`setEntry('${team}','${TUE}','${names[2]}',{am1:'교육',am2:'',pm1:'',pm2:'',night:'',weekend:''})`);
  window.eval(`currentTeam='${team}'; viewMode='week'; weekAnchor='${TUE}'; renderTeamTabs(); renderLegend(); render();`);
  await new Promise(r => setTimeout(r, 200));

  const keys = chipKeys();
  ['ON', '휴가', '교육'].forEach(k => { if (!keys.includes(k)) throw new Error('범례에 ' + k + ' 칩이 없음: ' + keys.join(',')); });

  // 1) 두 개 선택 — 둘 다 켜지고 둘 다 보인다
  chip('ON').click();
  await new Promise(r => setTimeout(r, 80));
  chip('교육').click();
  await new Promise(r => setTimeout(r, 120));
  const on2 = onKeys().sort();
  if (on2.join(',') !== 'ON,교육') throw new Error('두 개가 같이 켜지지 않음: ' + on2.join(','));
  const lit2 = litCells();
  if (!lit2.includes('ON')) throw new Error('ON 칸이 보이지 않음');
  if (!lit2.includes('교육')) throw new Error('교육 칸이 보이지 않음');
  console.log('1) 두 개를 같이 고르면 둘 다 보임 ✓ (' + on2.join(' + ') + ')');

  // 2) 고르지 않은 상태는 흐려진다
  if (lit2.includes('휴가')) throw new Error('고르지 않은 휴가 칸이 흐려지지 않음: ' + lit2.join(','));
  const dimmed = [...doc.querySelectorAll('td.wcell.wcell-dim')].map(td => td.textContent.trim());
  if (!dimmed.includes('휴가')) throw new Error('휴가 칸이 흐림 처리되지 않음');
  console.log('2) 고르지 않은 상태는 흐려짐 ✓');

  // 3) 같은 칩을 다시 누르면 그것만 꺼진다
  chip('ON').click();
  await new Promise(r => setTimeout(r, 120));
  if (onKeys().join(',') !== '교육') throw new Error('하나만 꺼지지 않음: ' + onKeys().join(','));
  if (litCells().includes('ON')) throw new Error('끈 상태(ON)가 아직 보임');
  if (!litCells().includes('교육')) throw new Error('남은 선택(교육)이 사라짐');
  console.log('3) 같은 칩을 다시 누르면 그것만 꺼지고 나머지는 남음 ✓');

  // 5) 야간 + 오전·오후를 같이 골라도 둘 다 걸린다
  const nightKeys = window.eval('legendNightItems().map(s=>s.key)');
  const nk = nightKeys.find(k => k && !['OFF'].includes(k));
  if (!nk) throw new Error('테스트 전제 실패: 야간 상태가 없음');
  window.eval(`setEntry('${team}','${TUE}','${names[0]}',{am1:'ON',am2:'',pm1:'',pm2:'',night:${JSON.stringify(nk)},weekend:''})`);
  chip('휴가').click();
  await new Promise(r => setTimeout(r, 80));
  chip(nk).click();
  await new Promise(r => setTimeout(r, 150));
  const on3 = onKeys().sort();
  if (on3.length !== 3) throw new Error('세 개가 같이 켜지지 않음: ' + on3.join(','));
  const lit3 = litCells();
  if (!lit3.includes('휴가')) throw new Error('휴가 칸이 보이지 않음');
  if (!lit3.some(t => t.includes(nk))) throw new Error('야간 상태(' + nk + ') 칸이 보이지 않음: ' + lit3.join(','));
  console.log('5) 야간 + 오전·오후를 같이 골라도 둘 다 걸림 ✓ (' + on3.join(' + ') + ')');

  // 4) 필터 해제에 개수가 보이고 전부 풀린다
  const clear = doc.getElementById('clearFilterChip');
  if (!clear) throw new Error('필터 해제 칩이 없음');
  if (!clear.textContent.includes('(3)')) throw new Error('고른 개수가 안 보임: ' + clear.textContent);
  clear.click();
  await new Promise(r => setTimeout(r, 150));
  if (onKeys().length) throw new Error('필터 해제 후에도 선택이 남음: ' + onKeys().join(','));
  if (doc.querySelectorAll('td.wcell.wcell-dim').length) throw new Error('필터 해제 후에도 흐린 칸이 남음');
  console.log('4) 필터 해제에 개수 표시 + 누르면 전부 풀림 ✓');

  // 6) 팀을 바꾸면 그 팀에 없는 상태만 빠진다
  const centralNight = window.eval("nightStatusListFor('central').map(s=>s.key).filter(Boolean)");
  const westNight = window.eval("nightStatusListFor('west').map(s=>s.key).filter(Boolean)");
  const onlyCentral = centralNight.find(k => !westNight.includes(k));
  if (onlyCentral) {
    window.eval(`currentTeam='central'; renderTeamTabs(); renderLegend(); render();`);
    await new Promise(r => setTimeout(r, 120));
    chip('휴가').click();
    await new Promise(r => setTimeout(r, 80));
    chip(onlyCentral).click();
    await new Promise(r => setTimeout(r, 120));
    if (onKeys().length !== 2) throw new Error('CENTRAL에서 두 개가 안 켜짐');
    // FS WEST 탭으로 이동
    const westTab = [...doc.querySelectorAll('#teamTabs .team-tab')].find(t => t.textContent.includes('FS WEST'));
    if (!westTab) throw new Error('FS WEST 탭을 못 찾음');
    westTab.click();
    await new Promise(r => setTimeout(r, 200));
    const left = onKeys();
    if (left.includes(onlyCentral)) throw new Error('그 팀에 없는 상태(' + onlyCentral + ')가 남음');
    if (!left.includes('휴가')) throw new Error('팀을 바꾸니 공통 선택(휴가)까지 사라짐: ' + left.join(','));
    console.log('6) 팀을 바꾸면 그 팀에 없는 ' + onlyCentral + '만 빠지고 휴가는 유지 ✓');
  } else {
    console.log('6) 팀별로 다른 야간 상태가 없어 건너뜀');
  }

  console.log('\n✅ 범례를 여러 개 같이 고를 수 있고, 고른 것 중 하나라도 맞으면 보임');
  process.exit(0);
})().catch(e => { console.error('\n❌ 테스트 실패:', e.message); process.exit(1); });
