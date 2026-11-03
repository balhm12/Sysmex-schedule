// 덱 고정 슬라이드(fsg-report/deck/people_slide.py) 시험 — python-pptx 가 있는 파이썬으로 합성 덱에서 만들기·갱신·건너뜀을 확인한다. python-pptx 가 없으면 건너뜀(실패 아님)
const cp = require('child_process'), path = require('path'), assert = require('assert');
const script = path.join(__dirname, '..', 'fsg-report', 'deck', 'test_people_slide.py');
let ran = false;
for (const py of ['python3', 'python', '/usr/bin/python3']) {
  const r = cp.spawnSync(py, ['-I', script], { encoding: 'utf8' });
  if (r.error) continue;                                   // 그 이름의 파이썬이 없음
  const out = (r.stdout || '') + (r.stderr || '');
  if (/SKIP/.test(out)) continue;                          // 이 파이썬엔 python-pptx 가 없음 → 다음 후보
  assert.strictEqual(r.status, 0, out); console.log(out.trim()); ran = true; break;
}
if (!ran) console.log('test_deck_people_slide: SKIP (python-pptx 가 있는 파이썬을 찾지 못함)');
