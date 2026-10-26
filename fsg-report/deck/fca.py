"""FCA 현황 엑셀(FY26 FCA 그룹회의 발표 자료)을 읽어 보고서 9장용 값으로 만든다.
구조(스킬 문서 기준): 「FCA」 시트 = 건별 요약(No · 응급 기한 · Start/End Day · 분야 · 제목 · 적용 Model · Progress rate · 장비 대수 · 진행 완료),
「FCA {번호}」 시트 = 건별 대상 장비(Serial No · End-user · 팀별 분류 · 진행 여부 · 진행 날짜). 진행 여부 「폐기」는 대상에서 빠진 것이며 완료로 센다.
머리글 이름은 키워드로 찾으므로 열 순서가 바뀌어도 읽는다. 못 찾은 열이 있으면 warnings 에 적는다."""
import datetime, re
import openpyxl

KEYS = {
    'no': ['fca no', 'no.', 'no', 'fca'], 'field': ['분야', 'field', 'category'], 'title': ['제목', 'title', '내용', 'description'],
    'model': ['적용 model', 'model', '모델'], 'start': ['start'], 'end': ['end day', 'end', '기한', 'deadline', '응급'],
    'target': ['장비 대수', '대상', '대수', 'target', 'qty'], 'done': ['진행 완료', '완료', 'done', 'completed'], 'rate': ['progress', '진행률', 'rate'],
    'note': ['비고', 'note', '상태', 'status', '구분'],
}


def _txt(v):
    return '' if v is None else str(v).strip()


def _num(v):
    if v is None or isinstance(v, bool): return None
    if isinstance(v, (int, float)): return float(v)
    m = re.match(r'^\s*(\d+(?:\.\d+)?)\s*(대|건)?\s*$', str(v).replace(',', ''))
    return float(m.group(1)) if m else None


def _date(v):
    if isinstance(v, datetime.datetime): return v.date()
    if isinstance(v, datetime.date): return v
    m = re.match(r'^\s*(\d{2,4})[.\-/](\d{1,2})[.\-/](\d{1,2})', _txt(v))
    if not m: return None
    y = int(m.group(1)); y += 2000 if y < 100 else 0
    return datetime.date(y, int(m.group(2)), int(m.group(3)))


def _find_cols(header):
    cols, used = {}, set()
    for key in ['target', 'done', 'rate', 'model', 'field', 'title', 'start', 'end', 'note', 'no']:   # 구체적인 열부터
        best = None
        for j, h in enumerate(header):
            if j in used: continue
            hl = _txt(h).lower()
            if not hl: continue
            for pri, kw in enumerate(KEYS[key]):
                if (hl == kw or kw in hl) and (best is None or pri < best[0]): best = (pri, j); break
        if best: cols[key] = best[1]; used.add(best[1])
    return cols


def _clean_model(m):
    return re.sub(r'\s*COMPLETE.*$', '', m or '').strip()


def _short_model(m):
    return re.sub(r'[- ]?series$', '', _clean_model(m), flags=re.I).strip()


def read_fca(path, asof=None):
    wb = openpyxl.load_workbook(path, data_only=True, read_only=True)
    warnings = []
    names = {ws.title.strip().lower(): ws.title for ws in wb.worksheets}
    ws = wb[names['fca']] if 'fca' in names else next((w for w in wb.worksheets if 'fca' in w.title.lower()), wb.worksheets[0])
    rows = [list(r) for r in ws.iter_rows(values_only=True)]
    hdr_i = next((i for i, r in enumerate(rows[:20]) if sum(1 for c in r if _txt(c)) >= 4 and any(k in ' '.join(_txt(c).lower() for c in r) for k in ('model', '모델')) and any(k in ' '.join(_txt(c).lower() for c in r) for k in ('progress', '진행', '대수'))), None)
    if hdr_i is None: raise ValueError('FCA 시트에서 머리글(Model·진행·장비 대수 등)을 찾지 못했습니다: ' + ws.title)
    cols = _find_cols(rows[hdr_i])
    for need in ('no', 'model', 'target', 'done'):
        if need not in cols: warnings.append(f'열을 찾지 못함: {need} — 머리글 {[_txt(c) for c in rows[hdr_i] if _txt(c)]}')
    items = []
    for r in rows[hdr_i + 1:]:
        g = lambda k: r[cols[k]] if k in cols and cols[k] < len(r) else None
        no = _txt(g('no'))
        if not no or no.lower() in ('total', '합계', '계'): continue
        target, done = _num(g('target')), _num(g('done'))
        start, end = _date(g('start')), _date(g('end'))
        note = _txt(g('note')) + ' ' + _txt(g('end')) + ' ' + _txt(g('start'))
        if target and target > 0: status = '완료' if (done or 0) >= target else '진행 중'
        elif '안내' in note: status = '안내문 발송'
        elif '필요' in note: status = '필요 시'
        else: status = '-'
        items.append({'no': no, 'field': _txt(g('field')), 'model': _clean_model(_txt(g('model'))), 'modelShort': _short_model(_txt(g('model'))), 'title': _txt(g('title')), 'start': start, 'end': end,
                      'target': int(target) if target else None, 'done': int(done) if done is not None and target else None,
                      'rate': (round(100 * (done or 0) / target) if target else None), 'status': status, 'note': note.strip()})
    if not items: warnings.append('FCA 건을 한 건도 읽지 못했습니다')
    tgt = sum(i['target'] or 0 for i in items); dn = sum(i['done'] or 0 for i in items)
    open_ = [i for i in items if i['status'] == '진행 중']
    top = max(open_, key=lambda i: ((i['target'] or 0) - (i['done'] or 0), -(i['end'].toordinal() if i['end'] else 0)), default=None)
    by_model = {}
    for i in items:
        if i['target']: k_ = i['modelShort'] or i['no']; by_model[k_] = by_model.get(k_, 0) + i['target']
    return {'items': items, 'counts': {s: sum(1 for i in items if i['status'] == s) for s in ('완료', '진행 중', '안내문 발송', '필요 시')}, 'total': len(items),
            'target': tgt, 'done': dn, 'donePct': round(100 * dn / tgt) if tgt else None, 'remain': tgt - dn, 'byModel': by_model, 'top': top, 'warnings': warnings, 'sheet': ws.title, 'asof': asof}
