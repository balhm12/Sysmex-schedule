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

  // 1) 팀원 관리 패널 열기
  window.eval("currentTeam = 'west';");
  window.openMemberOrderPanel();
  const beforeCount = doc.querySelectorAll('#orderList > div').length;
  console.log('추가 전 west 팀 인원 수:', beforeCount);

  // 2) 신규 팀원 추가 (악성 스크립트가 섞인 이름으로 XSS도 함께 검증)
  const maliciousName = '테스트직원<img src=x onerror=alert(1)>'; // 이름 검증 규칙(. # $ / [ ] 금지)에 걸리지 않는 XSS 페이로드
  doc.getElementById('newMemberName').value = maliciousName;
  doc.getElementById('newMemberRole').value = 'T1';
  doc.getElementById('addMemberBtn').click();
  await new Promise(r=>setTimeout(r,50));

  const afterAddCount = doc.querySelectorAll('#orderList > div').length;
  console.log('추가 후 west 팀 인원 수:', afterAddCount);
  if (afterAddCount !== beforeCount + 1) throw new Error('팀원 추가가 반영되지 않음');

  const westMembers = window.eval("TEAMS.west.members.map(m=>m.name)");
  console.log('west 팀 명단:', westMembers);
  if (!westMembers.includes(maliciousName)) throw new Error('추가된 이름이 TEAMS.west.members에 없음');

  const injectedImg = doc.getElementById('panel').querySelector('img');
  console.log('악성 이름이 실제 <img> 태그로 실행됐는가?', !!injectedImg);
  if (injectedImg) throw new Error('팀원 이름 XSS가 막히지 않음!');

  // 3) TEAMS.all 에도 반영됐는지 (rebuildAllTeam 호출 확인)
  const allHas = window.eval(`TEAMS.all.members.some(m=>m.name===${JSON.stringify(maliciousName)})`);
  console.log('TEAMS.all에도 반영됨:', allHas);
  if (!allHas) throw new Error('rebuildAllTeam이 반영되지 않음');

  // 4) 순서 변경 (▲ 버튼 클릭 시 정상 동작하는지)
  const upButtons = [...doc.querySelectorAll('#orderList [data-dir="up"]')];
  const lastUpBtn = upButtons[upButtons.length-1]; // 방금 추가된 사람(맨 아래)의 ▲ 버튼
  const nameBefore = window.eval('TEAMS.west.members[TEAMS.west.members.length-2].name');
  lastUpBtn.click();
  await new Promise(r=>setTimeout(r,50));
  const nameAfterMove = window.eval('TEAMS.west.members[TEAMS.west.members.length-2].name');
  console.log('순서 변경 전/후 비교:', nameBefore, '->', nameAfterMove, '(달라야 정상)');
  if (nameBefore === nameAfterMove) throw new Error('순서 변경이 반영되지 않음');

  // 5) 삭제
  const delButtons = doc.querySelectorAll('#orderList [data-act="del"]');
  delButtons[delButtons.length-1].click();
  await new Promise(r=>setTimeout(r,50));
  const afterDeleteCount = window.eval('TEAMS.west.members.length');
  console.log('삭제 후 west 팀 인원 수:', afterDeleteCount);
  if (afterDeleteCount !== beforeCount) throw new Error('팀원 삭제가 반영되지 않음');

  console.log('\n✅ 팀원 추가/순서변경/삭제 + XSS 방어 테스트 통과');
  process.exit(0);
})().catch(e=>{ console.error('\n❌ 테스트 실패:', e.message); process.exit(1); });
