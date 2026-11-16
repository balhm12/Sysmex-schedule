// 포털 안(iframe)·?embed 에서 페이지 탭 줄 숨김 — 네 페이지 모두에 있어야 한다(페이지를 웹 업로드로 덮어쓸 때 빠지지 않게 확인)
const fs = require('fs'), path = require('path'), assert = require('assert');
const read = f => fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
[['index.html', '.embed .app-nav{display:none;}'], ['work-schedule.html', '.embed .app-nav{display:none;}'], ['voc-dashboard.html', '.embed .appbar{display:none}'], ['fsg-kpi.html', '.embed .appbar{display:none}']].forEach(([f, css]) => {
  const html = read(f);
  assert(html.includes(css), f + ': 숨김 CSS 없음 (' + css + ')');
  assert(/window\.self\s*!==\s*window\.top/.test(html) && /classList\.add\(["']embed["']\)/.test(html), f + ': 다른 페이지 안에서 열렸는지 보는 스크립트 없음');
  assert(/embed/.test(html.match(/location\.search[^\n]{0,80}/g).join(' ')), f + ': ?embed 처리 없음');
  ['index.html', 'work-schedule.html', 'voc-dashboard.html', 'fsg-kpi.html'].forEach(href => assert(html.includes('href="' + href + '"'), f + ': 탭 줄에 ' + href + ' 링크 없음(직접 열 때는 보여야 한다)'));
});
// 설치일정·근무일정·만족도는 탭 줄이 그려지기 전에 class 가 붙어야 깜박이지 않는다(<body> 바로 아래)
['index.html', 'work-schedule.html', 'voc-dashboard.html'].forEach(f => { const html = read(f), b = html.indexOf('<body'), s = html.indexOf('classList.add("embed")'), n = html.indexOf('class="app-nav"'); assert(b >= 0 && s > b && s < n, f + ': embed 스크립트가 탭 줄보다 뒤에 있음'); });
console.log('test_embed_tabs: OK (네 페이지 모두 포털 안에서 탭 줄 숨김 · 직접 열면 표시)');
