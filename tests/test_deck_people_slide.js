// 덱 도구 시험 — fsg-report/deck/test_people_slide.py(고정 슬라이드·5장 Cal 줄·장비 열·3장 각주) · test_fsr.py(8장 담당 조회)
// python-pptx·openpyxl 이 있는 파이썬을 찾아 돌린다. 없으면 건너뜀(실패 아님)
const cp = require('child_process'), path = require('path'), assert = require('assert');
const dir = path.join(__dirname, '..', 'fsg-report', 'deck');
for (const name of ['test_people_slide.py', 'test_fsr.py']) {
  let ran = false;
  for (const py of ['python3', 'python', '/usr/bin/python3']) {
    const r = cp.spawnSync(py, ['-I', path.join(dir, name)], { encoding: 'utf8' });
    if (r.error) continue;                                   // 그 이름의 파이썬이 없음
    const out = (r.stdout || '') + (r.stderr || '');
    if (/SKIP/.test(out)) continue;                          // 이 파이썬엔 필요한 모듈이 없음 → 다음 후보
    assert.strictEqual(r.status, 0, name + '\n' + out); console.log(out.trim()); ran = true; break;
  }
  if (!ran) console.log(name.replace('.py', '') + ': SKIP (필요한 모듈이 있는 파이썬을 찾지 못함)');
}
