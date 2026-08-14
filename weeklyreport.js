/* ============================================================
 * 주간보고/계획 핵심 로직 (report_core) — 첨부 원본 양식 충실 재현
 * - DB 시트(유형→구분, 아이템→장비명) + 정의된 이름 + 종속 드롭다운(INDIRECT)
 * - 시트명/헤더 문구/6행-per-day/일~토 주간까지 원본과 일치
 * - 순수 함수: DOM/Firebase 의존 없음
 * ============================================================ */
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) module.exports = factory();
  else root.WeeklyReport = factory();
})(typeof self !== 'undefined' ? self : this, function () {

  // ---- 유형 → 구분 (원본 DB 시트 B~F열) ----
  var TYPES = ['거래처', '사내', '휴무', '대기업무', '기타'];
  var CAT = {
    '거래처': ['Technical service', 'Application work', 'Installation', 'Preventive maintenance', 'Sales support'],
    '사내': ['Office work', 'Meeting', 'Training', 'Facility management'],
    '휴무': ['연차', '공가', '보상휴가', '공휴일'],
    '대기업무': ['Service ON', '당직 근무', '야근 후 정비'],
    '기타': ['출장', '근무 지원', '공무', '기타'],
  };
  // ---- 아이템 → 장비명 (원본 DB 시트 G~L열) ----
  var ITEMS = ['혈액', '혈액_소', '응고', '유린', '면역', 'IT'];
  var DEV = {
    '혈액': ['XR/XN system', 'XR/XN-20', 'XR/XN-10', 'XN-L', 'CT-90', 'ST/CV', 'SP-10', 'SP-50', 'TS-10', 'TS-01', 'DI-60', 'G8', 'G11', 'RU-20'],
    '혈액_소': ['XQ-300', 'XP-300'],
    '응고': ['CN-Track', 'CN-6500', 'CN-6000', 'CN-3000', 'CS-5100', 'CS-1600', 'CA-1500', 'CA-600'],
    '유린': ['UN system', 'UF-5000', 'UF-4000', 'UF-1500', 'UC-3500', 'UC-1000', 'UD-10', 'U-WAM', 'CV-11'],
    '면역': ['HISCL-5000', 'HISCL-800'],
    'IT': ['Interface', 'S-WAM', 'IPU', 'Network', 'Security', 'E-care', 'XQC', 'Online'],
  };
  // 하위호환 별칭
  var REPORT_TYPES = CAT;
  var ITEM_OPTIONS = ITEMS;

  // ---- 내용(content) 텍스트에서 DB의 장비명을 감지 → 아이템/장비명 자동 채움 ----
  var FLAT_DEVICES = [];
  ITEMS.forEach(function (it) {
    DEV[it].forEach(function (dev) {
      FLAT_DEVICES.push({ item: it, device: dev, needle: dev });
      if (dev.indexOf('/') !== -1) {
        dev.split('/').forEach(function (part) {
          part = part.trim(); if (part) FLAT_DEVICES.push({ item: it, device: dev, needle: part });
        });
      }
    });
  });
  // 더 길고 구체적인 표기(예: "XR/XN-20")가 짧은 표기보다 먼저 매칭되도록 정렬
  FLAT_DEVICES.sort(function (a, b) { return b.needle.length - a.needle.length; });
  function escRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  // 정확한 DB 장비명은 없지만 모델 계열로 아이템을 알 수 있는 경우 (예: XN-2000 → 혈액)
  // 장비명은 비워둔다 — DB에 없는 값을 넣으면 종속 드롭다운과 어긋나므로, 아는 것(아이템)만 채운다.
  var FAMILY_ITEMS = [
    [/\bX[NR]-?\d{2,4}\b/i, '혈액'],
    [/\b(XQ|XP)-?\d{2,4}\b/i, '혈액_소'],
    [/\b(CN|CS|CA)-?\d{2,4}\b/i, '응고'],
    [/\b(UN|UF|UC|UD)-?\d{2,4}\b/i, '유린'],
    [/\bHISCL\b/i, '면역'],
  ];
  function detectDevice(content) {
    if (!content) return null;
    var text = String(content);
    for (var i = 0; i < FLAT_DEVICES.length; i++) {
      var f = FLAT_DEVICES[i];
      // 단어 경계(\b) 매칭 — "FSTL MEETING"의 "ST"처럼 단어 중간에 우연히 포함된 경우는 제외
      var re = new RegExp('\\b' + escRe(f.needle) + '\\b', 'i');
      if (re.test(text)) return { item: f.item, device: f.device, needle: f.needle };
    }
    for (var j = 0; j < FAMILY_ITEMS.length; j++) {
      if (FAMILY_ITEMS[j][0].test(text)) return { item: FAMILY_ITEMS[j][1], device: '', needle: '' };
    }
    return null;
  }

  // ---- 내용(content) 텍스트에서 구분(카테고리) 키워드 감지 ----
  var CATEGORY_KEYWORDS = [
    { words: ['설치', '이전설치', '폐기'], category: 'Installation' },
    { words: ['점검', 'PM'], category: 'Preventive maintenance' },
    { words: ['칼', 'Calibration', '칼리브레이션', 'Cal'], category: 'Application work' },
  ];
  function detectCategory(content) {
    if (!content) return null;
    var text = String(content);
    for (var i = 0; i < CATEGORY_KEYWORDS.length; i++) {
      var grp = CATEGORY_KEYWORDS[i];
      for (var j = 0; j < grp.words.length; j++) {
        var word = grp.words[j];
        var isAscii = /^[A-Za-z0-9]+$/.test(word);
        if (isAscii) {
          // 영문/숫자 키워드는 단어 경계로 매칭(예: "Cal"이 "Calibration" 중간에 우연히 걸리는 것 방지)
          var re2 = new RegExp('\\b' + escRe(word) + '\\b', 'i');
          if (re2.test(text)) return grp.category;
        } else {
          // 한글은 \b 경계가 제대로 동작하지 않아 단순 포함 여부로 판단
          if (text.indexOf(word) !== -1) return grp.category;
        }
      }
    }
    return null;
  }

  // ---- 날짜 유틸 ----
  function pad2(n) { return String(n).padStart(2, '0'); }
  function fmtDate(y, m, d) { return y + '-' + pad2(m) + '-' + pad2(d); }
  function parseISO(s) { var p = String(s).split('-').map(Number); return { y: p[0], m: p[1], d: p[2] }; }
  function jsDate(dstr) { var p = parseISO(dstr); return new Date(p.y, p.m - 1, p.d); }
  function weekdayKr(dstr) { return ['일', '월', '화', '수', '목', '금', '토'][jsDate(dstr).getDay()]; }
  function addDays(dstr, n) { var dt = jsDate(dstr); dt.setDate(dt.getDate() + n); return fmtDate(dt.getFullYear(), dt.getMonth() + 1, dt.getDate()); }
  function mondayOf(dstr) { var dt = jsDate(dstr); var day = dt.getDay(); var diff = day === 0 ? -6 : 1 - day; dt.setDate(dt.getDate() + diff); return fmtDate(dt.getFullYear(), dt.getMonth() + 1, dt.getDate()); }
  function sundayOf(dstr) { var dt = jsDate(dstr); dt.setDate(dt.getDate() - dt.getDay()); return fmtDate(dt.getFullYear(), dt.getMonth() + 1, dt.getDate()); }
  function weekDates(sunday) { return Array.from({ length: 7 }, function (_, i) { return addDays(sunday, i); }); }

  // ---- OT ----
  function otToMinutes(v) { if (!v) return 0; if (typeof v === 'number') return Math.round(v * 60); var m = String(v).trim().match(/^(\d{1,3}):(\d{1,2})$/); if (m) return parseInt(m[1], 10) * 60 + parseInt(m[2], 10); var n = parseFloat(v); return isNaN(n) ? 0 : Math.round(n * 60); }
  function minutesToOt(min) { if (!min) return '0:00'; return Math.floor(min / 60) + ':' + pad2(min % 60); }

  // ---- 근무 셀 → 보고행 자동 시드 ----
  function mk(type, category, inst, content) {
    if (type === '사내' && !inst) inst = '사무실'; // 유형=사내는 기관명을 "사무실"로 자동 등록
    var item = '', device = '';
    if (type === '거래처') {
      var det = detectDevice(content); // 거래처 업무 내용 안에 DB 장비명이 있으면 아이템/장비명 자동 채움
      if (det) { item = det.item; device = det.device; }
      if (!category) { var detCat = detectCategory(content); if (detCat) category = detCat; } // 내용 키워드로 구분 자동 채움
    }
    return { type: type, category: category || '', inst: inst || '', item: item, device: device, content: content || '', multi: '', ot: '' };
  }
  // ---- 지난 주 보고: 자유 입력 텍스트 정제 ----
  // 근무표 칸에는 "서울아산병원 점검 / 작성 김병우"처럼 기관명·업무·작성자가 한 칸에 섞여
  // 들어온다. 보고서에서는 이걸 기관명/아이템/장비명/내용 열로 분리해 넣는다.
  var INST_SUFFIXES = ['요양병원', '대학병원', '동물병원', '병원', '의료원', '의원', '보건소',
    '건강관리협회', '협회', '검사센터', '센터', '연구소', '대학교', '학교', '재단', '부대',
    '카페', '클리닉', '랩', '요양원', '의학연구소'];
  function stripEdgePunct(s) { return String(s || '').replace(/^[\s\/_,·\-]+|[\s\/_,·\-]+$/g, ''); }
  function parseInstText(raw) {
    var tokens = String(raw || '').trim().split(/\s+/).filter(Boolean);
    if (!tokens.length) return { inst: '', rest: '' };
    var cut = -1;
    for (var i = 0; i < tokens.length; i++) {
      var t = stripEdgePunct(tokens[i]);
      for (var s = 0; s < INST_SUFFIXES.length; s++) {
        if (t.length > INST_SUFFIXES[s].length - 1 && t.slice(-INST_SUFFIXES[s].length) === INST_SUFFIXES[s]) { cut = i; break; }
      }
      if (cut !== -1) break;
    }
    if (cut === -1) cut = 0; // 접미어를 못 찾으면 첫 단어를 기관명으로
    return {
      inst: stripEdgePunct(tokens.slice(0, cut + 1).join(' ')),
      rest: tokens.slice(cut + 1).join(' ')
    };
  }
  function stripAuthors(text, personNames) {
    var s = String(text || '');
    s = s.replace(/[\/·,]?\s*작성\s*[:：]?/g, ' '); // "작성" 표기는 항상 제거
    if (personNames && personNames.length) {
      personNames.forEach(function (nm) {
        if (!nm) return;
        s = s.replace(new RegExp('(^|\\s)' + escRe(nm) + '(?=\\s|$)', 'g'), ' ');
      });
    }
    return stripEdgePunct(s.replace(/\s{2,}/g, ' '));
  }
  function fmtMD(dstr) { var p = String(dstr).split('-'); return Number(p[1]) + '/' + Number(p[2]); }
  function refineReportRows(rows, personNames) {
    // 1단계: 거래처 행의 기관명 텍스트를 분리·정제
    var refined = rows.map(function (r) {
      var out = {}; for (var k in r) out[k] = r[k];
      if (out.type !== '거래처') { out.content = stripAuthors(out.content, personNames); return out; }
      var parsed = parseInstText(out.inst);
      var content = stripAuthors(stripEdgePunct([parsed.rest, out.content].filter(Boolean).join(' ')), personNames);
      var det = detectDevice(content) || detectDevice(parsed.inst);
      if (det) {
        if (!out.item) out.item = det.item;
        if (!out.device && det.device) out.device = det.device;
        // 장비명 칸에 정확히 들어간 표기는 내용에서 중복 제거 (계열 폴백은 내용에 남김)
        if (det.needle) content = stripEdgePunct(content.replace(new RegExp('\\b' + escRe(det.needle) + '\\b', 'i'), ' ').replace(/\s{2,}/g, ' '));
      }
      out.inst = parsed.inst;
      out.content = content;
      return out;
    });
    // 2단계: "같은 날" 안에서 겹치는 동일 일정만 한 행으로 병합한다.
    // 날짜가 다르면 같은 내용이라도 날짜별로 각각 남긴다 — 며칠에 걸친 반복을 한 행으로
    // 합쳐봤더니 어느 날 무엇을 했는지가 보고서에서 사라져서, 하루 단위 통합으로 좁혔다.
    var seen = {}; var order = [];
    refined.forEach(function (r) {
      var key = [r.__date, r.type, r.category, r.inst, r.item, r.device, r.content].join('|');
      if (!seen[key]) { seen[key] = r; order.push(key); }
    });
    return order.map(function (key) { return seen[key]; });
  }

  function seedRowsFromEntry(entry, dstr, team, H) {
    var rows = []; H = H || {};
    var isHoli = H.isHoliday ? H.isHoliday(dstr) : false;
    var dow = weekdayKr(dstr); var isWeekend = dow === '토' || dow === '일';
    entry = entry || {};
    function detailOf(v) { var s = String(v || ''); var i = s.indexOf(':'); return i !== -1 ? s.slice(i + 1).trim() : ''; }

    var nst = H.nightStatusOf ? H.nightStatusOf(entry.night, team) : null;
    var wst = H.weekendStatusOf ? H.weekendStatusOf(entry.weekend, team) : null;
    if (nst && (nst.key === '석/야' || nst.key === '석간' || (nst.key || '').indexOf('당직') !== -1)) rows.push(mk('대기업무', '당직 근무', '', detailOf(entry.night)));
    if (wst && (wst.key || '').indexOf('당직') !== -1) rows.push(mk('대기업무', '당직 근무', '', detailOf(entry.weekend)));

    var slots = ['am1', 'am2', 'pm1', 'pm2']; var seen = {}; var instAdded = {};
    slots.forEach(function (k) {
      var val = entry[k]; if (!val) return;
      var st = H.matchStatus ? H.matchStatus(val) : null;
      if (st) {
        var key = st.key;
        if (key === 'ON' || key === 'OFF') return;
        if (key === '휴가' || key === '오전휴가' || key === '오후휴가') { if (!('연차' in seen)) seen['연차'] = ''; return; }
        if (!(key in seen)) seen[key] = detailOf(val); else if (!seen[key] && detailOf(val)) seen[key] = detailOf(val);
        return;
      }
      var inst = String(val).split(':')[0].trim();
      if (inst && !(inst in instAdded)) instAdded[inst] = String(val).indexOf(':') !== -1 ? val.split(':').slice(1).join(':').trim() : '';
    });
    if ('내근' in seen) rows.push(mk('사내', 'Office work', '', seen['내근']));
    if ('교육' in seen) rows.push(mk('사내', 'Training', '', seen['교육']));
    if ('회의' in seen) rows.push(mk('사내', 'Meeting', '', seen['회의']));
    if ('DP' in seen) rows.push(mk('거래처', 'Technical service', '', ['DP', seen['DP']].filter(Boolean).join(' ')));
    if ('당직' in seen) rows.push(mk('대기업무', '당직 근무', '', seen['당직']));
    if ('연차' in seen) rows.push(mk('휴무', '연차', '', ''));
    Object.keys(instAdded).forEach(function (inst) { rows.push(mk('거래처', '', inst, instAdded[inst])); });

    var allOff = slots.every(function (k) { var st = H.matchStatus ? H.matchStatus(entry[k]) : null; return st && st.key === 'OFF'; });
    if (rows.length === 0) {
      if (isHoli) {
        // 공휴일은 다른 일정이 없어도(입력이 아예 없어도) 휴일명과 함께 표시한다.
        // "빈 날짜 건너뛰기" 정책의 예외 — 계획서에서 다음 주에 휴일이 있다는 사실 자체가 정보이기 때문.
        rows.push(mk('휴무', '공휴일', '', H.holidayName ? H.holidayName(dstr) : ''));
      } else if (!isWeekend && allOff) {
        rows.push(mk('휴무', '연차', '', ''));
      }
    }
    return rows;
  }

  // ---- 집계 (주간보고 요약 시트용) ----
  function summarize(memberRows, members) {
    var byCat = {}; var otByMember = {};
    members.forEach(function (m) { otByMember[m.name] = 0; });
    members.forEach(function (m) {
      (memberRows[m.name] || []).forEach(function (r) {
        if (!r || !r.type) return;
        if (r.category) byCat[r.category] = (byCat[r.category] || 0) + 1;
        else byCat['__' + r.type] = (byCat['__' + r.type] || 0) + 1; // 구분 미지정
        otByMember[m.name] += otToMinutes(r.ot);
      });
    });
    return { byCat: byCat, otByMember: otByMember };
  }

  // ---- 스타일 ----
  var NAVY = 'FF003087', WHITE = 'FFFFFFFF', LIGHT = 'FFE4F5FC', LINE = 'FFDFE6F2', HINT = 'FFF6F8FB';
  var FILL_ROW = 'FFFCE4D6'; // 작성 영역(색 셀) 배경 — "■색 셀만 작성하세요" 안내와 맞춤

  // ============================================================
  // 워크북 빌더
  //  opts: { ExcelJS, teamLabel, members:[{name,nickname,role}], sunday, mode:'report'|'plan', memberRows, note }
  // ============================================================
  async function buildWorkbook(opts) {
    var ExcelJS = opts.ExcelJS;
    var wb = new ExcelJS.Workbook();
    wb.creator = 'Sysmex Korea FS Group';
    var members = opts.members;
    var weeks = Math.max(1, opts.weeks || 1);
    var dates = []; for (var _i = 0; _i < weeks * 7; _i++) dates.push(addDays(opts.sunday, _i));
    var start = dates[0], end = dates[dates.length - 1];
    var teamLabel = opts.teamLabel;
    var memberRows = opts.memberRows || {};
    var isPlan = opts.mode === 'plan';

    function headFill(cell) { cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY } }; cell.font = { bold: true, color: { argb: WHITE }, size: 10 }; cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }; }
    function thin(ws, r1, c1, r2, c2) { for (var r = r1; r <= r2; r++) for (var c = c1; c <= c2; c++) { ws.getCell(r, c).border = { top: { style: 'thin', color: { argb: LINE } }, bottom: { style: 'thin', color: { argb: LINE } }, left: { style: 'thin', color: { argb: LINE } }, right: { style: 'thin', color: { argb: LINE } } }; } }
    function outerBorder(ws, r1, c1, r2, c2) {
      var st = { style: 'medium', color: { argb: NAVY } };
      for (var c = c1; c <= c2; c++) {
        var tc = ws.getCell(r1, c); tc.border = tc.border || {}; tc.border.top = st;
        var bc = ws.getCell(r2, c); bc.border = bc.border || {}; bc.border.bottom = st;
      }
      for (var r = r1; r <= r2; r++) {
        var lc = ws.getCell(r, c1); lc.border = lc.border || {}; lc.border.left = st;
        var rc = ws.getCell(r, c2); rc.border = rc.border || {}; rc.border.right = st;
      }
    }
    function dateCell(cell, dstr) { cell.value = jsDate(dstr); cell.numFmt = 'yyyy-mm-dd'; cell.alignment = { horizontal: 'center' }; }

    // ===== DB 시트 (숨김) + 정의된 이름 =====
    var db = wb.addWorksheet('DB');
    db.state = 'hidden';
    // B~F: 유형별 구분
    TYPES.forEach(function (t, i) {
      var col = 2 + i; // B=2
      db.getCell(1, col).value = t;
      CAT[t].forEach(function (v, j) { db.getCell(2 + j, col).value = v; });
      var last = 1 + CAT[t].length;
      wb.definedNames.add('DB!$' + colLetter(col) + '$2:$' + colLetter(col) + '$' + last, t);
    });
    // G~L: 아이템별 장비명
    ITEMS.forEach(function (it, i) {
      var col = 7 + i; // G=7
      db.getCell(1, col).value = it;
      DEV[it].forEach(function (v, j) { db.getCell(2 + j, col).value = v; });
      var last = 1 + DEV[it].length;
      wb.definedNames.add('DB!$' + colLetter(col) + '$2:$' + colLetter(col) + '$' + last, defName(it));
    });
    // 유형/아이템 마스터 (N/P 열)
    db.getCell(1, 14).value = '유형'; TYPES.forEach(function (t, i) { db.getCell(2 + i, 14).value = t; });
    db.getCell(1, 16).value = '아이템'; ITEMS.forEach(function (t, i) { db.getCell(2 + i, 16).value = t; });
    var typeListRange = 'DB!$N$2:$N$' + (1 + TYPES.length);
    var itemListRange = 'DB!$P$2:$P$' + (1 + ITEMS.length);

    function colLetter(n) { var s = ''; while (n > 0) { var m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = (n - m - 1) / 26; } return s; }
    function defName(it) { return it.replace(/[^0-9A-Za-z가-힣_]/g, '_'); } // 혈액_소 등 그대로

    // ===== 주간보고 요약 (report 모드) =====
    if (!isPlan) buildSummary(wb, teamLabel, start, end, members, memberRows, opts.note, headFill, thin);

    // ===== 전체일정 (plan 모드) =====
    if (isPlan) buildOverview(wb, teamLabel, members, dates, memberRows, headFill, thin, outerBorder, dateCell);

    // ===== 개인별 시트 =====
    members.forEach(function (m) {
      if (isPlan) buildPersonPlan(wb, m, teamLabel, dates, memberRows[m.name] || [], headFill, thin, outerBorder, dateCell, typeListRange);
      else buildPersonReport(wb, m, teamLabel, dates, memberRows[m.name] || [], headFill, thin, dateCell, typeListRange, itemListRange);
    });

    return wb;
  }

  // ---- 주간보고 요약 시트 (지난주 보고) ----
  function buildSummary(wb, teamLabel, start, end, members, memberRows, note, headFill, thin) {
    var ws = wb.addWorksheet('주간보고');
    ws.properties.tabColor = { argb: 'FF003087' };
    var s = summarize(memberRows, members);
    var c = function (cat) { return s.byCat[cat] || 0; };
    var sumType = function (t) { return REPORT_TYPES[t].reduce(function (a, x) { return a + c(x); }, 0); };

    ws.mergeCells('A1:E1'); ws.getCell('A1').value = '주간 업무 보고'; ws.getCell('A1').font = { bold: true, size: 15, color: { argb: 'FF003087' } }; ws.getCell('A1').alignment = { horizontal: 'center' };
    ws.mergeCells('A2:E2'); ws.getCell('A2').value = teamLabel + ' Team'; ws.getCell('A2').font = { bold: true, size: 12 }; ws.getCell('A2').alignment = { horizontal: 'center' };
    ws.mergeCells('A3:B3'); ws.getCell('A3').value = start; ws.getCell('C3').value = '~'; ws.mergeCells('D3:E3'); ws.getCell('D3').value = end; ws.getCell('C3').alignment = { horizontal: 'center' };

    function put(r, a, av, d, dv, head) {
      if (a !== null) { ws.getCell('A' + r).value = a; if (av !== null) ws.getCell('B' + r).value = av; }
      if (d !== null) { ws.getCell('D' + r).value = d; if (dv !== null) ws.getCell('E' + r).value = dv; }
      if (head) ['A', 'B', 'D', 'E'].forEach(function (col) { var cc = ws.getCell(col + r); if (cc.value != null) { cc.font = { bold: true }; cc.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE4F5FC' } }; } });
    }
    put(5, '외근 업무', sumType('거래처'), '내근 업무', sumType('사내'), true);
    put(6, 'Technical service', c('Technical service'), 'Office work', c('Office work'));
    put(7, 'Application work', c('Application work'), 'Meeting', c('Meeting'));
    put(8, 'Installation', c('Installation'), 'Training', c('Training'));
    put(9, 'Preventive maintenance', c('Preventive maintenance'), 'Facility management', c('Facility management'));
    put(10, 'Sales support', c('Sales support'), null, null);
    var dutyEtc = c('당직 근무') + c('출장') + c('근무 지원') + c('공무') + c('기타');
    put(12, '휴무', sumType('휴무'), '당직 및 기타', dutyEtc, true);
    put(13, '연차', c('연차'), '당직 근무', c('당직 근무'));
    put(14, '공가', c('공가'), '출장', c('출장'));
    put(15, '보상휴가', c('보상휴가'), '근무 지원', c('근무 지원'));
    put(16, '공휴일', c('공휴일'), '공무', c('공무'));
    put(17, null, null, '기타', c('기타'));

    var totOt = 0; members.forEach(function (m) { totOt += s.otByMember[m.name] || 0; });
    ws.getCell('A19').value = '연장근로 시간 (1주)'; ws.getCell('A19').font = { bold: true }; ws.getCell('B19').value = minutesToOt(totOt); ws.getCell('B19').font = { bold: true };
    members.forEach(function (m, i) { var r = 20 + i; ws.getCell('A' + r).value = m.nickname ? (m.name + ' (' + m.nickname + ')') : m.name; ws.getCell('B' + r).value = minutesToOt(s.otByMember[m.name] || 0); });
    var nr = 20 + members.length + 1; ws.getCell('A' + nr).value = '특이 사항'; ws.getCell('A' + nr).font = { bold: true }; if (note) ws.getCell('A' + (nr + 1)).value = note;
    [22, 12, 4, 22, 12].forEach(function (w, i) { ws.getColumn(i + 1).width = w; });
    thin(ws, 5, 1, 17, 5);
  }

  // ---- 전체일정 (다음주 계획) ----
  function buildOverview(wb, teamLabel, members, dates, memberRows, headFill, thin, outerBorder, dateCell) {
    var ws = wb.addWorksheet('전체일정');
    ws.properties.tabColor = { argb: 'FF009EE0' };
    ws.mergeCells('A1:B2'); ws.getCell('A1').value = teamLabel; headFill(ws.getCell('A1'));
    members.forEach(function (m, i) {
      var col = 3 + i;
      var c1 = ws.getCell(1, col); c1.value = m.name; headFill(c1);
      var c2 = ws.getCell(2, col); c2.value = m.nickname || ''; c2.font = { italic: true, color: { argb: 'FF5A6B8C' } }; c2.alignment = { horizontal: 'center' };
    });
    var lastCol = 2 + members.length;
    var r = 3;
    var blockStarts = [];
    dates.forEach(function (dstr) {
      // 일정이 없는 날짜는 표시하지 않는다 (모든 팀원이 해당 날짜에 행이 없으면 건너뜀)
      var anyRows = members.some(function (m) {
        return (memberRows[m.name] || []).some(function (x) { return x.__date === dstr; });
      });
      if (!anyRows) return;
      var wk = weekdayKr(dstr);
      var isWeekend = (wk === '토' || wk === '일');
      blockStarts.push(r);
      for (var k = 0; k < 6; k++) {
        var row = r + k;
        if (k === 0) {
          var wkCell = ws.getCell(row, 1);
          wkCell.value = wk; wkCell.alignment = { horizontal: 'center' };
          if (isWeekend) wkCell.font = { color: { argb: 'FFDC2626' }, bold: true }; // 토·일은 빨간 글씨
          dateCell(ws.getCell(row, 2), dstr);
        }
        members.forEach(function (m, i) {
          if (k === 0) {
            var rows = (memberRows[m.name] || []).filter(function (x) { return x.__date === dstr; });
            var txt = rows.map(function (x) { return x.category || x.type; }).filter(Boolean).join(', ');
            ws.getCell(row, 3 + i).value = txt;
          }
        });
      }
      r += 6;
    });
    if (r === 3) { // 표시할 날짜가 하나도 없음
      ws.mergeCells(3, 1, 3, lastCol);
      var noneCell = ws.getCell(3, 1);
      noneCell.value = '해당 기간 일정 없음';
      noneCell.alignment = { horizontal: 'center' };
      noneCell.font = { italic: true, color: { argb: 'FF5A6B8C' } };
      r = 4;
    }
    [6, 12].concat(members.map(function () { return 16; })).forEach(function (w, i) { ws.getColumn(i + 1).width = w; });
    ws.views = [{ state: 'frozen', xSplit: 2, ySplit: 2 }];
    thin(ws, 1, 1, r - 1, lastCol);
    outerBorder(ws, 1, 1, r - 1, lastCol);
    // 하루 블록 상단 경계(전체 너비) — thin()이 셀 테두리를 덮어쓰므로 반드시 그 이후에 적용
    blockStarts.forEach(function (row0) {
      for (var col2 = 1; col2 <= lastCol; col2++) {
        var cell = ws.getCell(row0, col2); cell.border = cell.border || {}; cell.border.top = { style: 'medium', color: { argb: 'FF003087' } };
      }
    });
  }

  // ---- 개인 다음주 계획 시트 ----
  function buildPersonPlan(wb, m, teamLabel, dates, rows, headFill, thin, outerBorder, dateCell, typeListRange) {
    var ws = wb.addWorksheet(sheetName(m.name, wb));
    ws.mergeCells('A1:C1'); ws.getCell('A1').value = 'Next Week Schedule';
    ws.getCell('A1').font = { bold: true, color: { argb: 'FF003087' } };
    dateCell(ws.getCell('D1'), dates[0]);
    ws.getCell('E1').value = m.name + (m.nickname ? ' (' + m.nickname + ')' : '') + (m.role ? ' - ' + m.role : '');
    ws.getCell('E1').font = { bold: true };
    ws.getCell('F1').value = '( ■색 셀만 작성하세요. )'; ws.getCell('F1').font = { color: { argb: 'FF5A6B8C' }, size: 9 };
    var heads = ['요일\n(작성안함)', '날짜\n(작성안함)', '유형\n(목록 선택)', '구분\n(유형 선택 후 목록)', '기관명\n(Text 입력)', '내용\n(Text 입력)'];
    heads.forEach(function (h, i) { var c = ws.getCell(2, i + 1); c.value = h; headFill(c); });
    ws.getRow(2).height = 28;

    var r = 3;
    var blockStarts = [];
    dates.forEach(function (dstr) {
      var dayRows = rows.filter(function (x) { return x.__date === dstr; });
      if (dayRows.length === 0) return; // 일정이 없는 날짜는 표시하지 않음
      var wk = weekdayKr(dstr);
      var isWeekend = (wk === '토' || wk === '일');
      blockStarts.push(r);
      for (var k = 0; k < 6; k++) {
        var row = r + k; var src = dayRows[k];
        if (src) {
          ws.getCell(row, 3).value = src.type || '';
          ws.getCell(row, 4).value = src.category || '';
          ws.getCell(row, 5).value = src.inst || '';
          ws.getCell(row, 6).value = src.content || '';
        }
        // 구분: 유형에 종속(INDIRECT) — 행별로 지정
        ws.getCell(row, 4).dataValidation = { type: 'list', allowBlank: true, formulae: ['INDIRECT($C' + row + ')'] };
        // 작성 영역(유형~내용, C:F)에 "■색 셀" 안내와 맞춘 배경색 — 주중·주말 동일하게 적용
        for (var col = 3; col <= 6; col++) {
          ws.getCell(row, col).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: FILL_ROW } };
        }
      }
      // 요일·날짜는 하루 블록당 맨 위 한 번만 표기(병합)
      var wkCell2 = ws.getCell(r, 1);
      wkCell2.value = weekdayKr(dstr);
      if (isWeekend) wkCell2.font = { color: { argb: 'FFDC2626' }, bold: true }; // 토·일은 빨간 글씨
      dateCell(ws.getCell(r, 2), dstr);
      ws.mergeCells(r, 1, r + 5, 1);
      ws.mergeCells(r, 2, r + 5, 2);
      ws.getCell(r, 1).alignment = { horizontal: 'center', vertical: 'middle' };
      ws.getCell(r, 2).alignment = { horizontal: 'center', vertical: 'middle' };
      r += 6;
    });
    if (r === 3) { // 이 기간에 일정이 전혀 없는 팀원
      ws.mergeCells(3, 1, 3, 6);
      var noneCell2 = ws.getCell(3, 1);
      noneCell2.value = '해당 기간 일정 없음';
      noneCell2.alignment = { horizontal: 'center' };
      noneCell2.font = { italic: true, color: { argb: 'FF5A6B8C' } };
      r = 4;
    }
    // 유형(C): 목록형 — 실제 날짜 블록이 있을 때만 범위 단위 1회 지정(중복 방지)
    if (blockStarts.length > 0) ws.dataValidations.add('C3:C' + (r - 1), { type: 'list', allowBlank: true, formulae: [typeListRange] });
    [6, 12, 14, 22, 22, 30].forEach(function (w, i) { ws.getColumn(i + 1).width = w; });
    ws.views = [{ state: 'frozen', ySplit: 2 }];
    thin(ws, 2, 1, r - 1, 6);
    outerBorder(ws, 2, 1, r - 1, 6);
    // 하루 블록 상단 경계(전체 너비) — thin()이 셀 테두리를 덮어쓰므로 반드시 그 이후에 적용
    blockStarts.forEach(function (row0) {
      for (var col2 = 1; col2 <= 6; col2++) {
        var cell = ws.getCell(row0, col2); cell.border = cell.border || {}; cell.border.top = { style: 'medium', color: { argb: 'FF003087' } };
      }
    });
  }

  // ---- 개인 지난주 보고 시트 ----
  function buildPersonReport(wb, m, teamLabel, dates, rows, headFill, thin, dateCell, typeListRange, itemListRange) {
    var ws = wb.addWorksheet(sheetName(m.name, wb));
    ws.getCell('A1').value = jsDate(dates[0]).getFullYear();
    ws.getCell('D1').value = teamLabel + ' Team'; ws.getCell('D1').font = { bold: true };
    ws.getCell('E1').value = m.name; ws.getCell('E1').font = { bold: true };
    ws.getCell('F1').value = m.nickname || '';
    ws.getCell('G1').value = m.role || '';
    var heads = ['요일\n(작성 안함)', '날짜\n(모두 작성)', '유형\n(목록 선택)', '구분\n(유형 선택 후 목록)', '기관명\n(Text 입력)', '아이템\n(목록 선택)', '장비명\n(아이템 선택 후 목록)', '내용\n(Text 입력)', '복수 장비\n(숫자)', 'OT\n(HH:mm)'];
    heads.forEach(function (h, i) { var c = ws.getCell(2, i + 1); c.value = h; headFill(c); });
    ws.getRow(2).height = 28;

    var r = 3;
    var hasData = false;
    dates.forEach(function (dstr) {
      var dayRows = rows.filter(function (x) { return x.__date === dstr; });
      if (dayRows.length === 0) return; // 일정이 없는 날짜는 표시하지 않음
      hasData = true;
      var n = dayRows.length;
      for (var k = 0; k < n; k++) {
        var src = dayRows[k];
        if (k === 0) ws.getCell(r, 1).value = weekdayKr(dstr);
        dateCell(ws.getCell(r, 2), dstr);
        if (src) {
          ws.getCell(r, 3).value = src.type || '';
          ws.getCell(r, 4).value = src.category || '';
          ws.getCell(r, 5).value = src.inst || '';
          ws.getCell(r, 6).value = src.item || '';
          ws.getCell(r, 7).value = src.device || '';
          ws.getCell(r, 8).value = src.content || '';
          ws.getCell(r, 9).value = src.multi || '';
          ws.getCell(r, 10).value = src.ot || '';
        }
        // 종속 목록(INDIRECT)은 행별 지정
        ws.getCell(r, 4).dataValidation = { type: 'list', allowBlank: true, formulae: ['INDIRECT($C' + r + ')'] };
        ws.getCell(r, 7).dataValidation = { type: 'list', allowBlank: true, formulae: ['INDIRECT($F' + r + ')'] };
        r++;
      }
    });
    if (!hasData) {
      ws.mergeCells(3, 1, 3, 10);
      var noneCell3 = ws.getCell(3, 1);
      noneCell3.value = '해당 기간 일정 없음';
      noneCell3.alignment = { horizontal: 'center' };
      noneCell3.font = { italic: true, color: { argb: 'FF5A6B8C' } };
      r = 4;
    }
    // 유형(C)·아이템(F) 목록형은 범위 단위 1회 지정(중복 방지)
    if (hasData) {
      ws.dataValidations.add('C3:C' + (r - 1), { type: 'list', allowBlank: true, formulae: [typeListRange] });
      ws.dataValidations.add('F3:F' + (r - 1), { type: 'list', allowBlank: true, formulae: [itemListRange] });
    }
    [6, 12, 14, 20, 20, 8, 16, 26, 8, 8].forEach(function (w, i) { ws.getColumn(i + 1).width = w; });
    ws.views = [{ state: 'frozen', ySplit: 2 }];
    thin(ws, 2, 1, r - 1, 10);
  }

  function sheetName(name, wb) {
    var base = String(name).replace(/[\\\/\?\*\[\]:]/g, ' ').slice(0, 28);
    var nm = base, i = 2;
    while (wb.getWorksheet(nm)) { nm = base.slice(0, 26) + i; i++; }
    return nm;
  }

  return {
    TYPES: TYPES, CAT: CAT, ITEMS: ITEMS, DEV: DEV,
    REPORT_TYPES: REPORT_TYPES, ITEM_OPTIONS: ITEM_OPTIONS,
    otToMinutes: otToMinutes, minutesToOt: minutesToOt,
    weekdayKr: weekdayKr, mondayOf: mondayOf, sundayOf: sundayOf, addDays: addDays, weekDates: weekDates,
    seedRowsFromEntry: seedRowsFromEntry, refineReportRows: refineReportRows, summarize: summarize, buildWorkbook: buildWorkbook,
  };
});

/* ============================================================
 * 주간계획서 내보내기 애드온 (v2, 경량)
 * - 기존 근무표(work-schedule.html)의 데이터를 그대로 읽어 주간계획서 xlsx 생성
 * - 입력창 / 필드확장 / 별도 저장 없음 (읽기 전용, /work-schedule 불변)
 * - report_core.js(WeeklyReport) 먼저 로드 필요. ExcelJS 는 기존 페이지가 로드.
 * - 의존 전역: TEAMS, TEAM_ORDER, currentTeam, getEntry, matchStatus,
 *   nightStatusOf, weekendStatusOf, HOLIDAYS_KR, memberTeam, todayISO, ExcelJS, showToast
 * ============================================================ */
(function () {
  var WR = window.WeeklyReport;
  if (!WR) { console.error('[주간계획서] report_core(WeeklyReport) 미로드 — 순서를 확인하세요'); return; }
  console.log('[주간계획서] 애드온 로드됨 (v3.1)');

  // 원본 페이지 전역은 const/let(전역 식별자, window 프로퍼티 아님)일 수 있으므로
  // window[name] 대신 typeof 가드로 식별자를 직접 참조한다.
  var NOOP = function () { return null; };
  function helpers() {
    return {
      matchStatus: (typeof matchStatus !== 'undefined') ? matchStatus : NOOP,
      nightStatusOf: (typeof nightStatusOf !== 'undefined') ? nightStatusOf : NOOP,
      weekendStatusOf: (typeof weekendStatusOf !== 'undefined') ? weekendStatusOf : NOOP,
      isHoliday: function (d) { return (typeof HOLIDAYS_KR !== 'undefined') && !!HOLIDAYS_KR[d]; },
      holidayName: function (d) { return (typeof HOLIDAYS_KR !== 'undefined') && HOLIDAYS_KR[d] ? String(HOLIDAYS_KR[d]) : ''; },
    };
  }
  function todayStr() { return (typeof todayISO !== 'undefined') ? todayISO() : new Date().toISOString().slice(0, 10); }
  function teamKeysAll() { return (typeof TEAM_ORDER !== 'undefined') ? TEAM_ORDER : ['west', 'east', 'central', 'south', 'fss']; }
  function membersOf(teamKey) {
    var t = TEAMS[teamKey];
    return t.members.map(function (m) { return { name: m.name, nickname: m.nickname || '', role: m.role || '', team: m.team || teamKey }; });
  }

  // 근무표 → 주간 업무행 자동 생성 (읽기 전용)
  function buildMemberRows(teamKey, sunday, weeks) {
    weeks = Math.max(1, weeks || 1);
    var members = membersOf(teamKey);
    var dates = []; for (var i = 0; i < weeks * 7; i++) dates.push(WR.addDays(sunday, i));
    var getEntryFn = (typeof getEntry !== 'undefined') ? getEntry : function () { return {}; };
    var out = {};
    members.forEach(function (m) {
      var rows = [];
      dates.forEach(function (dstr) {
        var entry = getEntryFn(m.team, dstr, m.name) || {};
        WR.seedRowsFromEntry(entry, dstr, m.team, helpers()).forEach(function (r) { r.__date = dstr; rows.push(r); });
      });
      out[m.name] = rows;
    });
    return out;
  }

  async function exportWorkbook(teamKey, sunday, mode, weeks) {
    if (typeof ExcelJS === 'undefined') { alert('엑셀 모듈(ExcelJS)을 불러오지 못했습니다.'); return; }
    // 계획=선택 주 1주. 보고=선택 주 포함 뒤로 weeks 주(직전 주들 포함).
    weeks = (mode === 'plan') ? 1 : Math.max(1, weeks || 1);
    var startSunday = (mode === 'plan') ? sunday : WR.addDays(sunday, -(weeks - 1) * 7);
    var members = membersOf(teamKey);
    var memberRows = buildMemberRows(teamKey, startSunday, weeks);
    // 계획서·보고서 모두: 기관명/작성자/장비가 한 칸에 섞인 자유 입력을 열별로 분리·정제하고,
    // 같은 일정이 여러 날 반복되면 한 행으로 병합한다.
    // 작성자 이름 제거용으로 전 팀 인원 이름을 넘긴다 (다른 팀원이 대신 작성한 경우도 있어서).
    var allNames = [];
    teamKeysAll().forEach(function (tk) { membersOf(tk).forEach(function (m) { allNames.push(m.name); }); });
    Object.keys(memberRows).forEach(function (nm) {
      memberRows[nm] = WR.refineReportRows(memberRows[nm], allNames);
    });
    var wb = await WR.buildWorkbook({
      ExcelJS: ExcelJS,
      teamLabel: TEAMS[teamKey] ? TEAMS[teamKey].label : teamKey,
      members: members,
      sunday: startSunday,
      weeks: weeks,
      mode: mode,
      memberRows: memberRows,
      note: '',
    });
    var buffer = await wb.xlsx.writeBuffer();
    var blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    var tag = mode === 'plan' ? '다음 주 계획' : '지난 주 보고';
    var span = (mode === 'plan' || weeks <= 1) ? '' : ('_' + weeks + '주');
    a.href = url;
    a.download = (TEAMS[teamKey] ? TEAMS[teamKey].label : teamKey) + '_' + tag + '_' + startSunday.replace(/-/g, '') + span + '.xlsx';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // ---- 다이얼로그 ----
  var st = null;
  function weekLabel(sunday) { var d = WR.weekDates(sunday); return d[0] + ' ~ ' + d[6]; }

  // 지원 팀 목록. 정식 오픈 시 이 배열에 팀 키를 추가하면 됩니다. (2026-08: west·east 오픈)
  var BETA_TEAMS = ['fss', 'west', 'east'];

  function openDialog() {
    st = { teamKey: BETA_TEAMS[0], sunday: WR.mondayOf(todayStr()), weeks: 2 }; // 주 단위는 월요일~일요일
    renderDialog();
    document.getElementById('overlay').classList.add('show');
  }

  function renderDialog() {
    var panel = document.getElementById('panel');
    var teamOpts = BETA_TEAMS.map(function (tk) {
      return '<option value="' + tk + '"' + (tk === st.teamKey ? ' selected' : '') + '>' + TEAMS[tk].label + '</option>';
    }).join('');
    panel.innerHTML =
      '<button class="close" id="wp-close">✕</button>' +
      '<h3>📋 주간계획서 내보내기 <span style="font-size:10px;font-weight:800;color:#B45309;background:#FEF3C7;padding:2px 7px;border-radius:8px;vertical-align:2px;">Beta</span></h3>' +
      '<div style="background:#FEF3C7;border:1px solid #FDE68A;border-radius:8px;padding:8px 10px;margin-bottom:12px;font-size:11.5px;color:#92400E;line-height:1.5;">' +
        '⚠️ <b>Beta 테스트 중입니다.</b> 현재 <b>FSS · FS West · FS East</b> 팀을 지원하며, 나머지 팀은 검증 후 순차 오픈 예정입니다. 실제 보고에 쓰시기 전에 내보낸 파일을 꼭 확인해주세요.' +
      '</div>' +
      '<div class="sub">선택한 팀·주차의 근무표 데이터를 첨부 양식(xlsx)으로 내보냅니다. (근무표는 변경되지 않습니다)</div>' +
      '<div class="form-row"><label>팀</label><select id="wp-team">' + teamOpts + '</select></div>' +
      '<div class="form-row"><label>주차</label>' +
        '<div style="display:flex;align-items:center;gap:8px;">' +
          '<button class="add-btn" id="wp-prev">‹</button>' +
          '<span id="wp-week" style="font-weight:800;color:#003087;font-size:13px;flex:1;text-align:center;">' + weekLabel(st.sunday) + '</span>' +
          '<button class="add-btn" id="wp-next">›</button>' +
          '<button class="add-btn" id="wp-this">이번주</button>' +
          '<button class="add-btn" id="wp-nextw">다음주</button>' +
        '</div>' +
      '</div>' +
      '<div class="form-row"><label>보고서 포함 기간 (지난주 보고 전용)</label>' +
        '<select id="wp-weeks">' +
          '<option value="1"' + (st.weeks === 1 ? ' selected' : '') + '>선택한 주만 (1주)</option>' +
          '<option value="2"' + (st.weeks === 2 ? ' selected' : '') + '>선택 주 + 직전 1주 (2주)</option>' +
          '<option value="4"' + (st.weeks === 4 ? ' selected' : '') + '>최근 4주</option>' +
          '<option value="13"' + (st.weeks === 13 ? ' selected' : '') + '>최근 13주 (분기)</option>' +
        '</select>' +
        '<div class="field-hint" style="margin-top:4px;">지난주 보고는 선택한 주부터 <b>뒤로 위 기간만큼</b> 모두 포함합니다 (직전 주 일정까지 표시). 다음주 계획은 항상 선택한 1주만.</div>' +
      '</div>' +
      '<div class="field-hint">계획서=요일/날짜/유형/구분/기관명/내용 · 보고서=집계 요약+개인별 상세(아이템·장비·OT 칸 포함). 근무표에 있는 휴무·당직·내근·병원명은 자동으로 채워지고, 나머지 세부칸은 엑셀에서 직접 채워 완성하시면 됩니다.</div>' +
      '<div class="form-actions" style="flex-wrap:wrap;">' +
        '<button class="btn-cancel" id="wp-cancel">취소</button>' +
        '<button class="btn-save" id="wp-plan" style="background:#009EE0;">📄 다음주 계획</button>' +
        '<button class="btn-save" id="wp-report">📊 지난주 보고</button>' +
        '<button class="btn-save" id="wp-both" style="background:#001C55;">⬇ 둘 다</button>' +
      '</div>';

    panel.querySelector('#wp-close').onclick = close;
    panel.querySelector('#wp-cancel').onclick = close;
    panel.querySelector('#wp-team').onchange = function () { st.teamKey = this.value; };
    panel.querySelector('#wp-weeks').onchange = function () { st.weeks = parseInt(this.value, 10) || 1; };
    panel.querySelector('#wp-prev').onclick = function () { st.sunday = WR.addDays(st.sunday, -7); upd(); };
    panel.querySelector('#wp-next').onclick = function () { st.sunday = WR.addDays(st.sunday, 7); upd(); };
    panel.querySelector('#wp-this').onclick = function () { st.sunday = WR.mondayOf(todayStr()); upd(); };
    panel.querySelector('#wp-nextw').onclick = function () { st.sunday = WR.addDays(WR.mondayOf(todayStr()), 7); upd(); };
    panel.querySelector('#wp-plan').onclick = function () { run('plan'); };
    panel.querySelector('#wp-report').onclick = function () { run('report'); };
    panel.querySelector('#wp-both').onclick = function () { run('both'); };

    function upd() { panel.querySelector('#wp-week').textContent = weekLabel(st.sunday); }
  }
  function close() { document.getElementById('overlay').classList.remove('show'); }

  async function run(which) {
    var toast = (typeof showToast !== 'undefined') ? showToast : function (m) { console.log(m); };
    try {
      if (which === 'both') {
        await exportWorkbook(st.teamKey, st.sunday, 'report', st.weeks);
        await exportWorkbook(st.teamKey, st.sunday, 'plan', 1);
        toast('주간보고(' + st.weeks + '주) + 다음주 계획 내보내기 완료');
      } else {
        await exportWorkbook(st.teamKey, st.sunday, which, st.weeks);
        toast((which === 'plan' ? '다음주 계획' : '주간보고(' + st.weeks + '주)') + ' 내보내기 완료');
      }
      close();
    } catch (e) {
      console.error('[주간계획서] export 오류', e);
      alert('내보내기 중 오류가 발생했습니다: ' + e.message);
    }
  }

  // ---- 탭 주입 (견고: 즉시 + DOMContentLoaded + 재시도) ----
  // 상단 "🏥 설치일정 / 📅 근무일정"과 같은 자리에 세 번째 탭으로 추가합니다.
  function injectButton() {
    if (document.getElementById('weeklyPlanBtn')) return true;
    var nav = document.querySelector('.app-nav');
    if (!nav) return false;
    var btn = document.createElement('a');
    btn.href = '#';
    btn.id = 'weeklyPlanBtn';
    btn.title = '팀·주차를 골라 주간계획서/보고서를 엑셀로 내보냅니다 (Beta 테스트 중 — 아직 정식 사용 전입니다)';
    btn.innerHTML = '📋 주간계획서 <span style="font-size:9px;font-weight:800;color:#B45309;background:#FEF3C7;' +
      'padding:1px 6px;border-radius:8px;margin-left:3px;vertical-align:1px;">Beta</span>';
    btn.onclick = function (e) { e.preventDefault(); openDialog(); };
    nav.appendChild(btn);
    console.log('[주간계획서] 탭 추가됨');
    return true;
  }
  function tryInject() {
    if (injectButton()) return;
    var tries = 0;
    var iv = setInterval(function () {
      tries++;
      if (injectButton() || tries > 20) clearInterval(iv);
    }, 300);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', tryInject);
  else tryInject();

  // 수동 트리거도 노출 (콘솔에서 openWeeklyPlanDialog() 로 강제 실행 가능)
  window.openWeeklyPlanDialog = openDialog;
})();
