// 회사 자체 휴일(Close day, 2026-12-28~31)이 주말·공휴일과 똑같이 '쉬는 날'로 다뤄지는지 확인합니다.
// 법정 공휴일이 아니라 회사가 정한 날이라, 공휴일 표와 따로 두되 동작은 같아야 합니다.
//  1) 네 날짜가 모두 쉬는 날로 잡히고 이름이 'Close day'다
//  2) 평일 판정을 쓰는 곳(석/야 다음 근무일 찾기)이 이 날들을 건너뛴다
//  3) 근무표에서 그날은 오전1~오후2 칸이 열리지 않고 '휴일' 줄로 나온다
//  4) 편집창에서도 쉬는 날로 다뤄진다 (주말/휴일 구분 칸이 보임)
//  5) 공휴일 표는 그대로다 (회사 휴일이 공휴일로 섞이지 않음)
//  6) 설치일정(index.html) 달력에서도 쉬는 날로 표시된다
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
  console.log('5) 공휴일 표는 그대로, 회사 휴일은 따로 ✓');

  // 2) 다음 근무일 찾기가 이 날들을 건너뛴다 (석/야 연쇄 입력이 휴무일에 OFF를 쓰지 않도록)
  //    12/24(목) 다음 근무일 → 12/25 공휴일·주말·12/28~31 회사휴무를 지나 2027-01-04(월)
  //    (2027-01-01 신정은 공휴일)
  const nd = window.eval("nextWorkday('2026-12-24')");
  if (nd !== '2027-01-04') throw new Error('다음 근무일이 휴무를 건너뛰지 않음: ' + nd);
  console.log('2) 다음 근무일 찾기가 회사 휴무를 건너뜀 (12/24 → ' + nd + ') ✓');

  // 3) 주간 보기 — 그날은 근무 칸이 열리지 않고 휴일 줄로 나온다
  window.eval("viewMode='week'; weekAnchor='2026-12-28'; render();");
  await new Promise(r => setTimeout(r, 200));
  const rows = [...doc.querySelectorAll('tr[data-date]')];
  if (!rows.length) throw new Error('테스트 전제 실패: 근무표 줄을 못 찾음');
  CLOSE.forEach(d => {
    const dayRows = rows.filter(tr => tr.dataset.date === d);
    if (!dayRows.length) throw new Error(d + ' 줄이 근무표에 없음');
    // 공휴일(holiday-row, 붉은색)과 색이 달라야 하므로 closeday-row 로 표시된다
    if (!dayRows.some(tr => tr.classList.contains('closeday-row'))) {
      throw new Error(d + ' 이 Close day 줄(closeday-row)로 표시되지 않음');
    }
    if (dayRows.some(tr => tr.classList.contains('holiday-row'))) {
      throw new Error(d + ' 이 공휴일 줄로 표시됨 (색이 공휴일과 같아짐)');
    }
    const labels = dayRows.map(tr => tr.textContent);
    if (labels.some(t => t.includes('오전1') || t.includes('오후2'))) {
      throw new Error(d + ' 에 오전1~오후2 근무 칸이 열림 (쉬는 날이어야 함)');
    }
    if (!labels.join(' ').includes('Close day')) throw new Error(d + ' 줄에 Close day 표기가 없음: ' + labels.join(' | '));
  });
  console.log('3) 주간 보기에서 휴일 줄로 나오고 근무 칸이 열리지 않음 ✓');

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
  console.log('3-2) 월간 보기: Close day와 공휴일(12/25)이 서로 다른 색으로 표시됨 ✓');

  // 4) 편집창에서도 쉬는 날 (주말/휴일 구분 칸이 보이고 오전/오후는 감춰짐)
  const anyName = window.eval("(TEAMS.west.members[0]||{}).name || ''");
  if (!anyName) throw new Error('테스트 전제 실패: 팀원이 없음');
  window.openEditor('west', CLOSE[0], anyName);
  await new Promise(r => setTimeout(r, 80));
  const ampm = doc.getElementById('ampmRows');
  const wkRow = doc.getElementById('weekendRow');
  if (!ampm || !wkRow) throw new Error('편집창 구성을 못 찾음');
  if (ampm.style.display !== 'none') throw new Error('회사 휴무일인데 오전1~오후2 칸이 보임');
  if (wkRow.style.display === 'none') throw new Error('회사 휴무일인데 주말/휴일 구분 칸이 안 보임');
  window.closePanel();
  console.log('4) 편집창에서도 쉬는 날로 다뤄짐 ✓');

  // 6) 설치일정 달력에서도 쉬는 날로 표시된다
  const dom2 = boot('index.html');
  await new Promise(r => setTimeout(r, 900));
  CLOSE.forEach(d => {
    const name = dom2.window.eval(`offDayName('${d}')`);
    if (name !== 'Close day') throw new Error('설치일정에서 ' + d + ' 가 Close day로 안 잡힘: ' + JSON.stringify(name));
  });
  if (dom2.window.eval("!!HOLIDAYS_KR['2026-12-28']")) throw new Error('설치일정 공휴일 표에 회사 휴일이 섞임');
  if (!dom2.window.eval("isCloseDay('2026-12-28')")) throw new Error('설치일정에서 12/28이 Close day로 구분되지 않음');
  if (dom2.window.eval("isCloseDay('2026-12-25')")) throw new Error('설치일정에서 공휴일이 Close day로 잡힘');
  console.log('6) 설치일정(index.html)에서도 쉬는 날로 잡힘 ✓');

  console.log('\n✅ 회사 자체 휴일(12/28~31)이 주말·공휴일과 같이 쉬는 날로 다뤄짐');
  process.exit(0);
})().catch(e => { console.error('\n❌ 테스트 실패:', e.message); process.exit(1); });
