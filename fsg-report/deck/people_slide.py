"""월간보고 덱 고정 슬라이드 — 「사무소 단위 1인당 KPI 비교」 (8장 「주요 고객·장애」 바로 뒤, 새 9장).

report-data json 의 peopleKpi.units(사무소 6개) · peopleKpi.units.teams(팀 4개 합계)를 표 하나로 채운다.
 - 베이스 덱에 이 슬라이드가 없으면(처음 한 번) 8장의 제목·부제·표 서식을 복사해 8장 뒤에 새로 만든다.
 - 이미 있으면(전월 확정 덱) 그 슬라이드의 표·제목만 새 값으로 갈아 끼운다(손으로 넣은 코멘트 상자는 건드리지 않는다).
 - 이 슬라이드가 베이스에 들어 있으면 이후 장의 쪽 번호가 하나씩 밀리므로, fill_deck.run 은 이 슬라이드를 장 번호 계산에서 빼 두고 쓴다(find_people_slide).
부서원 KPI 는 2026-11 정식 시행 → 그 전 기간은 「시행 전 참고값」 배지와 문구를 붙인다(json 의 peopleKpi.units.official).
"""
import copy
from pptx.util import Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from pptx.oxml.ns import qn
from ppt_helpers import set_text, set_cell, GREEN, RED, ORANGE, NAVY

NAMES = {'title': 'PK_Title', 'sub': 'PK_Sub', 'table': 'PK_Table', 'note': 'PK_Note', 'badge': 'PK_Badge'}
COLS = ['단위', '인원 (비교)', '1인당 처리 건수', '1인당 KPI 점수', '직급 보정 지수', '재방문율', 'FTFR', 'MTTR']
EQ_COLS = ['1인당 담당 장비', '장비 100대당 처리 건수']   # json peopleKpi.units.equip 가 있을 때만 붙는다(2026-11-05) — 현재 관리표 기준
HEAD_NOTE = {'인원 (비교)': '전체 인원 (괄호 = 비교 인원, 팀장·신입 제외)', '직급 보정 지수': '개인 점수 ÷ FSG 같은 직급 중앙값 × 100 의 평균 (100 = 같은 직급 중앙값)'}
# 값 하나: (json 키, 이전 키, 표시 형식, 단위, 올라가면 좋은가)
METRICS = [('cases', 'casesPrev', '{:.1f}', '', True), ('score', 'scorePrev', '{:.1f}', '', True), ('index', 'indexPrev', '{:.1f}', '', True),
           ('revisit', 'revisitPrev', '{:.1f}', '%', False), ('ftfr', 'ftfrPrev', '{:.1f}', '%', True), ('mttr', 'mttrPrev', '{:.1f}', '분', False)]
LIGHT = RGBColor(0xEA, 0xF2, 0xFB)


def find_people_slide(prs):
    """베이스 덱에서 이 슬라이드(표 이름 PK_Table)의 위치(0부터). 없으면 None."""
    for i, s in enumerate(prs.slides):
        if any(sh.name == NAMES['table'] for sh in s.shapes):
            return i
    return None


def _shape(slide, key):
    return next((sh for sh in slide.shapes if sh.name == NAMES[key]), None)


def _next_id(slide):
    ids = [int(x) for x in slide.shapes._spTree.xpath('.//p:cNvPr/@id')]
    return (max(ids) if ids else 1) + 1


def _copy_shape(src, dst_slide, name):
    el = copy.deepcopy(src._element)
    dst_slide.shapes._spTree.append(el)
    el.xpath('.//p:cNvPr')[0].set('id', str(_next_id(dst_slide))); el.xpath('.//p:cNvPr')[0].set('name', name)
    return next(sh for sh in dst_slide.shapes if sh._element is el)


def _fmt(v, pat, unit):
    return '-' if v is None else pat.format(v) + unit


def _delta(cur, prev, unit, up_good):
    """(문구, 색) — 변화가 0.05 미만이거나 전월이 없으면 (None, None)."""
    if cur is None or prev is None or abs(cur - prev) < 0.05:
        return None, None
    d = cur - prev; txt = f"{'▲' if d > 0 else '▼'}{abs(d):.1f}{'%p' if unit == '%' else ('' if unit == '분' else unit)}"   # 분은 값에만 붙인다(칸이 좁아 줄바꿈 방지)
    if up_good is None: return txt, NAVY   # 좋고 나쁨 판단 없음(장비 100대당 처리 건수) — 파랑
    return txt, (GREEN if (d > 0) == up_good else RED)


def _put(cell, text, delta=None, color=None, bold=None, center=True, size=None):
    """셀 글자 교체 — 값 한 칸 + (있으면) 작은 증감 글자. 표 서식(글꼴·크기)은 셀 원래 서식을 따른다."""
    set_cell(cell, text, bold=bold)
    p = cell.text_frame.paragraphs[0]
    if size:
        for r in p.runs: r.font.size = Pt(size)
    if delta:
        r0 = p.runs[0]._r; r1 = copy.deepcopy(r0); p._p.insert(list(p._p).index(r0) + 1, r1)
        r1.find(qn('a:t')).text = '  ' + delta
        run = [r for r in p.runs][-1]
        run.font.bold = False; run.font.color.rgb = color
        run.font.size = Pt((size or 11) * 0.8)
    if center: p.alignment = PP_ALIGN.CENTER
    cell.vertical_anchor = MSO_ANCHOR.MIDDLE


def _reshape_table(tbl, widths, n_rows, row_h):
    """원본 표(열 수·행 수가 다른)를 widths 열 × n_rows 행으로 바꾼다 — 머리글 행·본문 행의 셀 서식을 복제."""
    x = tbl._tbl
    tr_head, tr_body = x.tr_lst[0], x.tr_lst[min(1, len(x.tr_lst) - 1)]
    first_h, mid_h = copy.deepcopy(tr_head.tc_lst[0]), copy.deepcopy(tr_head.tc_lst[min(1, len(tr_head.tc_lst) - 1)])
    first_b, mid_b = copy.deepcopy(tr_body.tc_lst[0]), copy.deepcopy(tr_body.tc_lst[min(1, len(tr_body.tc_lst) - 1)])
    grid = x.tblGrid; g0 = copy.deepcopy(grid.gridCol_lst[0])
    for gc in list(grid.gridCol_lst): grid.remove(gc)
    for w in widths:
        gc = copy.deepcopy(g0); gc.set('w', str(int(w))); grid.append(gc)
    tr_tpl_head, tr_tpl_body = copy.deepcopy(tr_head), copy.deepcopy(tr_body)
    for tr in list(x.tr_lst): x.remove(tr)
    def mk(tpl, first, mid, h):
        tr = copy.deepcopy(tpl)
        for tc in list(tr.findall(qn('a:tc'))): tr.remove(tc)
        ext = tr.find(qn('a:extLst'))
        for j in range(len(widths)):
            tc = copy.deepcopy(first if j == 0 else mid)
            for a in ('gridSpan', 'hMerge', 'rowSpan', 'vMerge'):
                if a in tc.attrib: del tc.attrib[a]
            if ext is not None: ext.addprevious(tc)
            else: tr.append(tc)
        tr.set('h', str(int(h))); return tr
    x.append(mk(tr_tpl_head, first_h, mid_h, row_h * 1.25))
    for _ in range(n_rows - 1): x.append(mk(tr_tpl_body, first_b, mid_b, row_h))
    # 열·행 ID 를 표 안에서 유일하게(PowerPoint 호환)
    A16 = '{http://schemas.microsoft.com/office/drawing/2014/main}'
    for k, gc in enumerate(grid.gridCol_lst):
        for e in gc.iter(A16 + 'colId'): e.set('val', str(20000 + k))
    for k, tr in enumerate(x.tr_lst):
        for e in tr.iter(A16 + 'rowId'): e.set('val', str(10000 + k))


def _build_table_shape(prs, slide, ref_slide, left, top, width, height):
    """8장의 표(첫 번째 표)를 복사해 서식을 물려받는다. 8장에 표가 없으면 새로 만든다."""
    src = next((sh for sh in ref_slide.shapes if sh.has_table), None)
    if src is not None:
        gf = _copy_shape(src, slide, NAMES['table'])
        gf.left, gf.top, gf.width, gf.height = left, top, width, height
        return gf
    gf = slide.shapes.add_table(12, len(COLS), left, top, width, height); gf.name = NAMES['table']
    for c in gf.table.rows[0].cells:
        c.fill.solid(); c.fill.fore_color.rgb = NAVY
    return gf


def _equip_lookup(u):
    eq = u.get('equip')
    return eq, ({(r['kind'], r['key']): r for r in eq.get('rows', [])} if eq else {})


def _widths(width, n):
    return [width * 0.15] + [width * 0.85 / (n - 1)] * (n - 1) if n > 8 else [width * 0.19] + [width * 0.81 / 7] * 7


def _fill(prs, slide, u, label, mo, pmo):
    """슬라이드의 표·제목·부제·배지를 json 값으로 채운다. 반환: 표."""
    official = bool(u.get('official'))
    eq, eqmap = _equip_lookup(u); cols = COLS + (EQ_COLS if eq else [])
    set_text(_shape(slide, 'title'), f'사무소 단위 1인당 KPI 비교 ({mo})')
    sub = f"{label[:4]}년 {int(label[5:7])}월 기준 · {pmo}(직전 기간) 대비 · 팀장·신입 제외 1인당 값"
    set_text(_shape(slide, 'sub'), sub)
    badge = _shape(slide, 'badge')
    if badge is not None: badge._element.getparent().remove(badge._element)
    if not official:
        # 표 바로 위 별도 줄(오른쪽 정렬) — 제목·부제와 겹치지 않게
        tb_shape = _shape(slide, 'table'); w = Emu(4200000)
        b = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, tb_shape.left + tb_shape.width - w, tb_shape.top - Emu(330000), w, Emu(280000)); b.name = NAMES['badge']
        b.fill.solid(); b.fill.fore_color.rgb = ORANGE; b.line.fill.background()
        tf = b.text_frame; tf.text = '시행 전 참고값 · 부서원 KPI는 11월 정식 시행'; p = tf.paragraphs[0]; p.alignment = PP_ALIGN.CENTER
        r = p.runs[0]; r.font.size = Pt(12); r.font.bold = True; r.font.color.rgb = RGBColor(255, 255, 255)
        tf.vertical_anchor = MSO_ANCHOR.MIDDLE
    gf = _shape(slide, 'table'); tbl = gf.table
    if len(tbl.columns) != len(cols):   # 지난달 덱의 표(열 수가 다름)를 이번 열 구성으로 맞춘다 — 서식은 그 표의 셀을 복제
        _reshape_table(tbl, _widths(gf.width, len(cols)), len(tbl.rows), gf.height / (len(tbl.rows) + 0.25))
    units, teams = u['units'], u['teams']
    rows = [('unit', x) for x in units] + [('sep', None)] + [('team', x) for x in teams]
    hs = 10 if eq else 11   # 열이 10개면 머리글 글자 10pt(최소 크기)
    for j, name in enumerate(cols): _put(tbl.cell(0, j), name, bold=True, size=hs)
    for i, (kind, x) in enumerate(rows, start=1):
        if kind == 'sep':
            _put(tbl.cell(i, 0), '팀 합계 (4팀)', bold=True, center=False, size=10)
            for j in range(1, len(cols)): _put(tbl.cell(i, j), '', size=10)
            for j in range(len(cols)): tbl.cell(i, j).fill.solid(); tbl.cell(i, j).fill.fore_color.rgb = LIGHT
            continue
        name = x['label'] + (' (대전+광주)' if x['key'] == 'FS CENTRAL' else ' (부산+대구)' if x['key'] == 'FS SOUTH' else '')
        _put(tbl.cell(i, 0), name, bold=(kind == 'team'), center=False, size=11)
        _put(tbl.cell(i, 1), f"{x['n']} ({x['nCore']})", size=11)
        for j, (k, kp, pat, unit, up) in enumerate(METRICS, start=2):
            v = x.get(k); empty = (v is None) or (x['nCore'] == 0 and k in ('cases', 'score', 'index'))
            if empty: _put(tbl.cell(i, j), '-', size=11); continue
            txt, col = _delta(v, x.get(kp), unit, up)
            _put(tbl.cell(i, j), _fmt(v, pat, unit), delta=txt, color=col, size=11)
        if eq:   # 담당 장비(현재 관리표 기준): 1인당 장비 · 장비 100대당 처리 건수(이번 달 · 전월, 좋고 나쁨 판단 없이 파랑)
            er = eqmap.get((x.get('kind', kind), x['key'])) or eqmap.get(('office' if kind == 'unit' else 'team', x['key']))
            j0 = len(METRICS) + 2
            if not er or not er.get('equip'): _put(tbl.cell(i, j0), '-', size=11); _put(tbl.cell(i, j0 + 1), '-', size=11); continue
            _put(tbl.cell(i, j0), _fmt(er['equipPerHead'], '{:.1f}', ''), size=11)
            txt, col = _delta(er.get('per100'), er.get('per100Prev'), '', None)
            _put(tbl.cell(i, j0 + 1), _fmt(er.get('per100'), '{:.1f}', ''), delta=txt, color=col, size=11)
    return tbl


def add_people_kpi_slide(prs, d, label, mo, pmo):
    """json(d) 의 peopleKpi.units 로 슬라이드를 만들거나 갱신한다. 반환: (state, 검토 필요 목록, 건너뜀 목록). state = 'created' | 'updated' | 'skipped'.
    peopleKpi.units.equip 가 있으면 열 2개(1인당 담당 장비 · 장비 100대당 처리 건수)를 더하고, 없으면 열 없이 건너뜀 목록에 이유를 남긴다."""
    pk = d.get('peopleKpi'); u = pk and pk.get('units')
    if not u or not u.get('units'):
        return 'skipped', [], ['8장 뒤 「사무소 단위 1인당 KPI 비교」 슬라이드 — json 에 peopleKpi.units 없음(엔진 최신판 필요)']
    msgs, skips = [], []
    idx = find_people_slide(prs)
    if idx is not None:
        slide = prs.slides[idx]; state = 'updated'
    else:
        ref = prs.slides[7]; slide = prs.slides.add_slide(ref.slide_layout)
        for sh in list(slide.shapes): sh._element.getparent().remove(sh._element)
        shapes = list(ref.shapes)
        title, sub = shapes[0], shapes[1]   # fill_deck 은 8장의 s[0]=제목, s[1]=부제로 다룬다
        _copy_shape(title, slide, NAMES['title']); _copy_shape(sub, slide, NAMES['sub'])
        L = title.left; W = title.width; T = sub.top + sub.height + Emu(120000) + Emu(330000); H = Emu(6858000) - T - Emu(820000)   # 아래 820000 = 기준 설명 3줄 자리 · 위 330000 = 「시행 전 참고값」 배지 줄
        gf = _build_table_shape(prs, slide, ref, L, T, W, H)
        _reshape_table(gf.table, _widths(W, len(COLS) + (len(EQ_COLS) if u.get('equip') else 0)), 12, H / 12.5)
        # 아래 기준 설명 — 텍스트 상자(회색 작은 글자)
        nb = slide.shapes.add_textbox(L, Emu(6858000) - Emu(620000), W, Emu(520000)); nb.name = NAMES['note']
        tf = nb.text_frame; tf.word_wrap = True
        # 새 슬라이드를 8장 바로 뒤로
        lst = prs.slides._sldIdLst; el = lst[-1]; lst.remove(el); lst.insert(8, el)
        state = 'created'
    _fill(prs, slide, u, label, mo, pmo)
    note = _shape(slide, 'note')
    if note is not None:
        gft = _shape(slide, 'table')
        note.top = gft.top + gft.height + Emu(40000); note.height = max(Emu(420000), prs.slide_height - note.top - Emu(60000))   # 표 바로 아래 — 지난달 덱의 상자 위치·높이와 상관없이 3줄이 들어가게
        tf = note.text_frame; tf.word_wrap = True
        p = tf.paragraphs[0]; p.text = ''
        r = p.add_run(); r.text = ('1인당 값은 인원 수와 무관 · 직급 보정 지수 100 = FSG 같은 직급 중앙값 · 재방문율·FTFR은 팀은 팀 단위, 사무소는 사무소 단위 거래처 기준 · '
                                  'MTTR = 고장 수리 가중평균(분) · ▲▼ = 직전 기간 대비 (초록 = 좋아짐, 빨강 = 나빠짐) · 팀 합계의 WEST·EAST는 사무소와 같은 값')
        r.font.size = Pt(10); r.font.color.rgb = RGBColor(0x59, 0x59, 0x59)
        if u.get('equip'):
            r2 = p.add_run(); r2.text = (f" · 장비 = 현재 관리표 기준({u['equip'].get('asOf') or '날짜 미상'}·과거와 시점이 다름·시험 운영 중), 10장 「가동 장비」(Serial 가동 기준)와 정의가 다름 · "
                                         '장비 100대당 처리 건수의 ▲▼(파랑)는 좋고 나쁨 판단 없음')
            r2.font.size = Pt(10); r2.font.color.rgb = RGBColor(0x59, 0x59, 0x59)
    if not u.get('equip'):
        skips.append('9장 「1인당 담당 장비」·「장비 100대당 처리 건수」 열 — json 에 peopleKpi.units.equip 없음(관리표 정리본이 CRM_원본 폴더에 없거나 못 읽음 — json meta.warnings 확인)')
    if not u.get('official'):
        msgs.append(f'{mo}분 「사무소 단위 1인당 KPI 비교」는 「시행 전 참고값」 배지·문구가 붙어 있음 — 부서원 KPI 정식 시행(2026-11) 이후 월부터 json 의 official=true 라서 배지와 문구가 자동으로 빠진다')
    if state == 'created':
        msgs.append('「사무소 단위 1인당 KPI 비교」 슬라이드를 8장 뒤(새 9장)에 새로 만들었다 — 이후 장이 하나씩 밀렸으니 목차·쪽 번호·핵심 요약의 「N장」 참조와 서식(8장 표 복사본)을 확인할 것')
    return state, msgs, skips


def equip_footnote(slide, anchor, text, name='EQ_Foot3'):
    """anchor 도형(표) 바로 아래에 회색 작은 각주 한 줄을 넣는다(이미 같은 이름의 상자가 있으면 글자만 바꾼다).
    다른 도형과 겹치게 되면 넣지 않고 False — 호출한 쪽이 「검토 필요」로 알린다(실제 덱 레이아웃을 이 환경에서 볼 수 없어 안전하게)."""
    old = next((sh for sh in slide.shapes if sh.name == name), None)
    if old is not None:
        tf = old.text_frame; p = tf.paragraphs[0]; p.text = ''
        r = p.add_run(); r.text = text; r.font.size = Pt(10); r.font.color.rgb = RGBColor(0x59, 0x59, 0x59); return True
    top, h = anchor.top + anchor.height + Emu(30000), Emu(260000)
    box = (anchor.left, top, anchor.left + anchor.width, top + h)
    for sh in slide.shapes:
        if sh is anchor or sh.width is None or sh.height is None: continue
        if sh.left < box[2] and sh.left + sh.width > box[0] and sh.top < box[3] and sh.top + sh.height > box[1]: return False
    if box[3] > slide.part.package.presentation_part.presentation.slide_height: return False
    nb = slide.shapes.add_textbox(anchor.left, top, anchor.width, h); nb.name = name
    tf = nb.text_frame; tf.word_wrap = True
    r = tf.paragraphs[0].add_run(); r.text = text; r.font.size = Pt(10); r.font.color.rgb = RGBColor(0x59, 0x59, 0x59)
    return True
