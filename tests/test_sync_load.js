/* Firebase 다운로드 줄이기(2026-11): 설치·근무일정의 정기 조회·실시간 연결·백업 빈도 설정이 되돌아가지 않았는지 확인한다.
 * 화면이 20초마다 전체를 받던 때 11월 초 5일 만에 다운로드 32GB(무료 한도 10GB)가 나왔다. */
const fs = require('fs'), assert = require('assert'), path = require('path');
for (const f of ['index.html', 'work-schedule.html']) {
  const s = fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
  assert(!/\},\s*20000\);/.test(s), f + ': 20초 정기 조회로 돌아감');
  assert(/\},\s*600000\);/.test(s), f + ': 10분 정기 조회가 없음');
  assert(/setInterval\(async \(\)=>\{\s*\n\s*if\(document\.hidden\) return;/.test(s), f + ': 숨겨진 탭에서도 정기 조회함');
  assert(s.includes("scheduleRealtimeSync({throttle:true})"), f + ': 창 전환 갱신 제한 없음');
  assert(/function closeStream\(\)/.test(s) && /if\(document\.hidden \|\| es\) return;/.test(s), f + ': 숨겨진 탭의 실시간 연결을 닫지 않음');
  assert(/if\(first\)\{ first = false; return; \}/.test(s), f + ': 연결 직후 전체 전송을 또 받음');
  assert(/BACKUP_MIN_GAP = 10 \* 60 \* 1000/.test(s), f + ': 백업 10분 제한 없음');
  assert(/function doBackupFullSnapshot|async function doBackupFullSnapshot/.test(s), f + ': 백업 함수 없음');
}
console.log('test_sync_load: OK');
