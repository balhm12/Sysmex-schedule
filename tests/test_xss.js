const fs = require('fs');
const { JSDOM } = require('jsdom');

function runTest(filePath, label){
  let html = fs.readFileSync(filePath, 'utf8');
  // 외부 CDN 스크립트(exceljs)는 네트워크가 없는 테스트 환경에서 제외
  html = html.replace(/<script src="https:\/\/cdnjs\.cloudflare\.com[^"]*"><\/script>/, '');

  const dom = new JSDOM(html, {
    runScripts: 'dangerously',
    resources: undefined,
    url: 'https://example.com/' + filePath,
    pretendToBeVisual: true
  });
  const { window } = dom;

  // 네트워크 호출은 모두 실패하도록 처리 (Firebase 등 외부 연결 없이 순수 렌더링 로직만 검증)
  window.fetch = () => Promise.reject(new Error('network disabled in test'));
  window.alert = (msg) => { /* no-op */ };
  window.confirm = () => true;

  return { dom, window };
}

async function testIndex(){
  const { window } = runTest('index.html', 'index');
  await new Promise(r => setTimeout(r, 300)); // init()의 loadStorage/render 대기

  const doc = window.document;

  // 1) escapeHtml 유틸이 실제로 존재하고 올바르게 동작하는지 확인
  const payload = '<img src=x onerror="window.__xss=true">';
  const escaped = window.escapeHtml(payload);
  console.log('[index] escapeHtml output:', escaped);
  if (escaped.includes('<img')) throw new Error('escapeHtml FAILED to neutralize tag');

  // 2) 실제 취약했던 지점(openDetail)에 악성 title을 가진 이벤트를 넣고 렌더링 → DOM에 실제 <img> 태그가 생기면 안 됨
  window.openDetail({
    id: 'test-1', category: 'install', start: '2026-08-03', end: '2026-08-03',
    title: payload, device: payload, team: payload, assignee: payload, creator: payload
  });
  const panelHtml = doc.getElementById('panel').innerHTML;
  const createdImg = doc.getElementById('panel').querySelector('img');
  console.log('[index] panel actually contains <img> element?', !!createdImg);
  if (createdImg) throw new Error('XSS NOT neutralized in openDetail — <img> element was created!');
  if (!panelHtml.includes('&lt;img')) throw new Error('Expected escaped text not found in panel innerHTML');

  // 3) 폼(openForm)도 검증 — value 속성에 들어가도 태그가 실행되지 않아야 함
  window.openForm({ id:'x', category:'install', start:'2026-08-03', end:'2026-08-03', title: payload, device: payload, assignee: payload, creator:'' });
  const titleInput = doc.getElementById('f-title');
  console.log('[index] form title input value (should be literal text, not executed):', titleInput.value);
  if (doc.getElementById('panel').querySelector('img')) throw new Error('XSS NOT neutralized in openForm');

  console.log('[index] ✅ XSS 방어 테스트 통과');
}

async function testWorkSchedule(){
  const { window } = runTest('work-schedule.html', 'work-schedule');
  await new Promise(r => setTimeout(r, 300));
  const doc = window.document;

  const payload = '<img src=x onerror="window.__xss=true">';
  const escaped = window.escapeHtml(payload);
  console.log('[work-schedule] escapeHtml output:', escaped);
  if (escaped.includes('<img')) throw new Error('escapeHtml FAILED to neutralize tag');

  // openEditor를 열어 실제 팀원 하나를 대상으로 편집 패널을 렌더링
  // (TEAMS/scheduleData/viewYear 등은 const/let 최상위 선언이라 window 프로퍼티가 아니므로 window.eval로 접근)
  const memberName = window.eval('TEAMS.west.members[0].name');
  window.openEditor('west', '2026-08-03', memberName);
  const detailInput = doc.getElementById('f-night-detail');
  detailInput.value = payload;
  console.log('[work-schedule] night-detail input accepted value:', detailInput.value);

  // 저장 로직을 거치지 않고, 렌더링 함수(badgeHtml/slotCell 경로)에 악성 문자열을 직접 흘려서 검증
  window.eval(`
    const e = Object.assign(blankEntry(), { am1: ${JSON.stringify(payload)} });
    scheduleData.west = scheduleData.west || {};
    scheduleData.west['2026-08-04'] = scheduleData.west['2026-08-04'] || {};
    scheduleData.west['2026-08-04'][${JSON.stringify(memberName)}] = e;
    viewYear = 2026; viewMonth = 8;
  `);
  window.render();
  const gridHtml = doc.getElementById('gridScroll').innerHTML;
  const injectedImg = doc.getElementById('gridScroll').querySelector('img');
  console.log('[work-schedule] grid actually contains <img> element?', !!injectedImg);
  if (injectedImg) throw new Error('XSS NOT neutralized in month grid rendering!');

  console.log('[work-schedule] ✅ XSS 방어 테스트 통과');
}

(async () => {
  try {
    await testIndex();
    await testWorkSchedule();
    console.log('\n=== 모든 테스트 통과 ===');
    process.exit(0);
  } catch (e) {
    console.error('\n❌ 테스트 실패:', e.message);
    process.exit(1);
  }
})();
