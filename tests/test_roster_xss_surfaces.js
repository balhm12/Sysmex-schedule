// 팀원 이름이 이제 사용자가 직접 입력할 수 있으므로, 그 이름이 노출되는
// 모든 화면(오늘 배너/월간뷰/주간뷰/편집창 헤더)에서 XSS가 막히는지 검증합니다.
const fs = require('fs');
const { JSDOM } = require('jsdom');

function load(file){
  let html = fs.readFileSync(file,'utf8').replace(/<script src="https:\/\/(cdnjs\.cloudflare\.com|www\.gstatic\.com)[^"]*"><\/script>/g, '');
  const dom = new JSDOM(html, { runScripts:'dangerously', url:'https://example.com/'+file });
  dom.window.fetch = () => Promise.reject(new Error('no net'));
  dom.window.alert = ()=>{}; dom.window.confirm = ()=>true;
  return dom;
}

(async ()=>{
  const dom = load('work-schedule.html');
  const { window } = dom;
  await new Promise(r=>setTimeout(r,500));
  const doc = window.document;

  const payload = '악성<img src=x onerror="window.__xss3=true">';

  // 팀 서버 상태를 거치지 않고, 렌더 함수들이 실제로 참조하는 배열에 직접 악성 이름을 주입
  window.eval(`
    TEAMS.west.members.push({ name: ${JSON.stringify(payload)}, role: 'T1' });
    rebuildAllTeam();
    currentTeam = 'west';
    viewYear = 2026; viewMonth = 8;
    scheduleData.west['2026-08-03'] = scheduleData.west['2026-08-03'] || {};
    scheduleData.west['2026-08-03'][${JSON.stringify(payload)}] = Object.assign(blankEntry(), { night: '석/야' });
  `);

  function checkNoImg(label, fn){
    fn();
    const img = doc.querySelector('img');
    console.log(label + ' - <img> 태그 실행됨?', !!img);
    if (img) throw new Error(label + ' 에서 XSS가 막히지 않음!');
  }

  // 1) 오늘 야간/휴가 배너
  checkNoImg('오늘 야간 배너(renderNightBanner)', ()=> window.eval('renderNightBanner()'));

  // 2) 월간 뷰
  checkNoImg('월간 뷰(renderMonthGrid)', ()=> window.eval('viewMode="month"; renderMonthGrid();'));

  // 3) 주간 뷰
  checkNoImg('주간 뷰(renderWeekGrid)', ()=> window.eval('viewMode="week"; renderWeekGrid();'));

  // 4) 편집창 헤더
  checkNoImg('편집창(openEditor)', ()=> window.openEditor('west', '2026-08-03', payload));

  console.log('\n✅ 팀원 이름이 노출되는 모든 화면에서 XSS 방어 확인됨');
  process.exit(0);
})().catch(e=>{ console.error('\n❌ 테스트 실패:', e.message); process.exit(1); });
