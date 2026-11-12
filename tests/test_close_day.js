// 회사 자체 휴일(Close day, 2026-12-28~31)을 확인합니다.
// 달력에 이름과 색으로 '표시'만 하고, 근무 입력은 평일과 똑같이 받습니다 —
// 그날 나와서 일하거나 휴가·당직을 적어야 하는 사람이 있어서 칸을 닫으면 안 됩니다.
//  1) 네 날짜에 'Close day' 이름이 붙고, 공휴일 표와는 따로다
//  2) 근무 칸을 닫는 '쉬는 날'에는 들어가지 않는다 (석/야 다음 근무일 찾기가 건너뛰지 않음)
//  3) 주간 보기에서 평일과 같은 줄(오전1~오후2·야간)로 나오고, 날짜 칸에 이름이 보인다
//  4) 편집창도 평일 양식이다 (오전1~오후2가 보이고 주말/휴일 구분 칸은 안 보임)
//  5) 색은 공휴일(붉은색)과 다르다
//  6) 설치일정(index.html) 달력에도 이름이 표시된다
const fs = require('fs');
const { JSDOM } = require('jsdom');

const CLOSE = ['2026-12-28', '2026-12-29', '2026-12-30', '2026-12-31'];

function boot(file) {
  const html = fs.readFileSync(file, 'utf8')
    .replace(/<script src="https:\/\/cdnjs\.cloudflare\.com[^"]*"><\/script>/g, '')
    .replace(/<script src="https:\/\/www\.gstatic\.com[^"]*"><\/script>\s*/g, '');
  const dom = new JSDOM(html, { runScripts: 'dangerously', url: 'https://example.com/' + file });
  dom.window.alert = () => {};
  dom.window.confirm = () => true;
  dom.window.fetch = (url, o) => {
    o = o || {};
    if ((o.method || 'GET') !== 'GET') return Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve({}) });
    return Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve({}) });
  };
  return dom;
}

(async () => {
  const dom = boot('work-schedule.html');
  const { window } = dom; const doc = window.document;
  await new Promise(r => setTimeout(r, 900));
  window.closePanel();

  // 1) 쉬는 날로 잡히고 이름이 붙는다
  CLOSE.forEach(d => {
    const name = window.eval(`offDayName('${d}')`);
    if (name !== 'Close day') throw new Error(d + ' 가 Close day로 안 잡힘: ' + JSON.stringify(name));
  });
  // 바로 앞 근무일(12/24 목)은 쉬는 날이 아니어야 한다 — 범위가 번지지 않았는지
  if (window.eval("offDayName('2026-12-24')")) throw new Error('12/24까지 휴일로 번짐');
  if (!window.eval("offDayName('2026-12-25')")) throw new Error('테스트 전제 실패: 12/25가 공휴일이 아님');
  console.log('1) 12/28~31이 모두 Close day로 잡힘 (12/24는 근무일) ✓');

  // 5) 공휴일 표에는 섞이지 않았다
  CLOSE.forEach(d => {
    if (window.eval(`!!HOLIDAYS_KR['${d}']`)) throw new Error(d + ' 가 공휴일 표에 들어감 (회사 휴일과 공휴일은 구분해야 함)');
  });
  if (window.eval("HOLIDAYS_KR['2026-12-25']") !== '크리스마스') throw new Error('공휴일 표가 바뀜');
  console.log('1-2) 공휴일 표는 그대로, Close day는 따로 ✓');

  // 2) Close day는 근무일이므로 '쉬는 날' 판정에 들어가지 않는다
  CLOSE.forEach(d => {
    if (window.eval(`isNonWorkingDay('${d}')`)) throw new Error(d + ' 가 쉬는 날로 잡힘 (평일이어야 함)');
  });
  if (!window.eval("isNonWorkingDay('2026-12-25')")) throw new Error('공휴일이 쉬는 날이 아님');
  if (!window.eval("isNonWorkingDay('2026-12-26')")) throw new Error('토요일이 쉬는 날이 아님');
  //    12/24(목) 다음 근무일 → 12/25 공휴일·주말을 지나 12/28(월) = Close day(근무일)
  const nd = window.eval("nextWorkday('2026-12-24')");
  if (nd !== '2026-12-28') throw new Error('다음 근무일이 Close day를 건너뜀: ' + nd + ' (평일로 다뤄야 함)');
  console.log('2) Close day는 근무일 — 다음 근무일 찾기가 건너뛰지 않음 (12/24 → ' + nd + ') ✓');

  // 3) 주간 보기 — 평일과 같은 줄 구성 + 날짜 칸에 Close day 표시
  window.eval("viewMode='week'; weekAnchor='2026-12-28'; render();");
  await new Promise(r => setTimeout(r, 200));
  const rows = [...doc.querySelectorAll('tr[data-date]')];
  if (!rows.length) throw new Error('테스트 전제 실패: 근무표 줄을 못 찾음');
  CLOSE.forEach(d => {
    const dayRows = rows.filter(tr => tr.dataset.date === d);
    if (!dayRows.length) throw new Error(d + ' 줄이 근무표에 없음');
    const labels = dayRows.map(tr => tr.textContent).join(' | ');
    // 평일과 똑같이 오전1~오후2·야간 줄이 있어야 한다
    ['오전1', '오전2', '오후1', '오후2', '야간'].forEach(sl => {
      if (!labels.includes(sl)) throw new Error(d + ' 에 ' + sl + ' 칸이 없음 (평일과 같아야 함): ' + labels);
    });
    if (labels.includes('주말 · 구분')) throw new Error(d + ' 이 주말/휴일 줄로 나옴');
    // 색은 Close day 색, 공휴일 색이 아니어야 한다
    if (!dayRows.some(tr => tr.classList.contains('closeday-row'))) throw new Error(d + ' 이 Close day 색으로 표시되지 않음');
    if (dayRows.some(tr => tr.classList.contains('holiday-row'))) throw new Error(d + ' 이 공휴일 색으로 표시됨');
    // 날짜 칸에 이름이 보여야 한다
    const note = dayRows.map(tr => tr.querySelector('.datecell .dnote')).find(Boolean);
    if (!note || note.textContent.trim() !== 'Close day') throw new Error(d + ' 날짜 칸에 Close day 표시가 없음');
  });
  // 비교: 공휴일(1/1)은 지금까지대로 근무 칸이 닫힌다
  const nyRows = rows.filter(tr => tr.dataset.date === '2027-01-01');
  if (nyRows.length && nyRows.map(tr => tr.textContent).join(' ').includes('오전1')) {
    throw new Error('공휴일(1/1)에 근무 칸이 열림');
  }
  console.log('3) 주간 보기에서 평일과 같은 줄 + 날짜 칸에 Close day 표시 ✓');

  // 3-2) 월간 보기 — 그 날짜 열 머리글이 휴일로 표시된다
  window.eval("viewYear=2026; viewMonth=12; viewMode='month'; render();");
  await new Promise(r => setTimeout(r, 200));
  const ths = [...doc.querySelectorAll('#gridScroll thead th')];
  if (ths.length < 30) throw new Error('테스트 전제 실패: 월간 보기 열 머리글을 못 찾음 (' + ths.length + ')');
  [28, 29, 30, 31].forEach(d => {
    const th = ths[d]; // 0번은 '팀원' 칸이라 날짜 d가 곧 인덱스 d
    if (!th || !th.textContent.startsWith(String(d))) throw new Error(d + '일 열을 못 찾음: ' + (th && th.textContent));
    if (!th.classList.contains('closeday')) throw new Error('12/' + d + ' 열 머리글이 Close day 색으로 표시되지 않음');
    if (th.classList.contains('holi')) throw new Error('12/' + d + ' 열 머리글이 공휴일 색으로 표시됨');
    if (th.title !== 'Close day') throw new Error('12/' + d + ' 열 안내가 다름: ' + th.title);
  });
  const th25 = ths[25];
  if (!th25 || !th25.classList.contains('holi')) throw new Error('12/25(공휴일) 머리글이 공휴일 색이 아님');
  if (th25.classList.contains('closeday')) throw new Error('공휴일이 Close day 색으로 바뀜');
  console.log('5) 월간 보기: Close day와 공휴일(12/25)이 서로 다른 색으로 표시됨 ✓');

  // 4) 편집창도 평일 양식 — 오전1~오후2가 보이고 주말/휴일 구분 칸은 안 보인다
  const anyName = window.eval("(TEAMS.west.members[0]||{}).name || ''");
  if (!anyName) throw new Error('테스트 전제 실패: 팀원이 없음');
  window.openEditor('west', CLOSE[0], anyName);
  await new Promise(r => setTimeout(r, 80));
  const ampm = doc.getElementById('ampmRows');
  const wkRow = doc.getElementById('weekendRow');
  if (!ampm || !wkRow) throw new Error('편집창 구성을 못 찾음');
  if (ampm.style.display === 'none') throw new Error('Close day인데 오전1~오후2 칸이 안 보임 (평일 양식이어야 함)');
  if (wkRow.style.display !== 'none') throw new Error('Close day인데 주말/휴일 구분 칸이 보임');
  window.closePanel();
  // 비교: 공휴일은 지금까지대로 주말/휴일 양식
  window.openEditor('west', '2026-12-25', anyName);
  await new Promise(r => setTimeout(r, 80));
  if (doc.getElementById('ampmRows').style.display !== 'none') throw new Error('공휴일인데 오전1~오후2 칸이 보임');
  window.closePanel();
  console.log('4) 편집창이 평일 양식 (공휴일은 그대로 휴일 양식) ✓');

  // 6) 설치일정 달력에서도 쉬는 날로 표시된다
  const dom2 = boot('index.html');
  await new Promise(r => setTimeout(r, 900));
  CLOSE.forEach(d => {
    const name = dom2.window.eval(`offDayName('${d}')`);
    if (name !== 'Close day') throw new Error('설치일정에서 ' + d + ' 에 Close day 이름이 안 붙음: ' + JSON.stringify(name));
  });
  if (dom2.window.eval("!!HOLIDAYS_KR['2026-12-28']")) throw new Error('설치일정 공휴일 표에 회사 휴일이 섞임');
  if (!dom2.window.eval("isCloseDay('2026-12-28')")) throw new Error('설치일정에서 12/28이 Close day로 구분되지 않음');
  if (dom2.window.eval("isCloseDay('2026-12-25')")) throw new Error('설치일정에서 공휴일이 Close day로 잡힘');
  console.log('6) 설치일정(index.html)에도 Close day로 표시됨 ✓');

  console.log('\n✅ Close day(12/28~31): 이름·색으로 표시되고, 근무 입력은 평일과 같음');
  process.exit(0);
})().catch(e => { console.error('\n❌ 테스트 실패:', e.message); process.exit(1); });
