"""고정 슬라이드(people_slide.py) 시험 — 합성 12장 덱에 만들기 → 다시 갈아 끼우기 → 정식 시행 월(배지 제거).
실행: python test_people_slide.py   (python-pptx 필요. 없으면 건너뜀)"""
import os, sys, tempfile
try:
    from pptx import Presentation
    from pptx.util import Inches, Emu
except ImportError:
    print('test_people_slide: SKIP (python-pptx 없음)'); sys.exit(0)
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from people_slide import add_people_kpi_slide, find_people_slide, NAMES, COLS

def synthetic():
    prs = Presentation(); prs.slide_width, prs.slide_height = Emu(12192000), Emu(6858000)
    lay = prs.slide_layouts[5]   # Title Only
    for i in range(12):
        s = prs.slides.add_slide(lay); s.shapes.title.text = f'{i + 1}장'
        if i == 7:   # 8장: 제목, 부제, TOP10 표(6열)
            s.shapes.title.left, s.shapes.title.top, s.shapes.title.width, s.shapes.title.height = Emu(531294), Emu(342347), Emu(11334643), Emu(558000)
            tb = s.shapes.add_textbox(Emu(531294), Emu(900000), Emu(11334643), Emu(300000)); tb.text_frame.text = '부제'
            t = s.shapes.add_table(11, 6, Emu(531294), Emu(1300000), Emu(6000000), Emu(3000000))
            for r in range(11):
                for c in range(6): t.table.cell(r, c).text = f'{r}-{c}'
    return prs

def unit(key, label, kind, n, nc, score, sp, idx, ip, cases, cp, rv, rvp, ft, ftp, mt, mtp):
    return dict(key=key, label=label, kind=kind, n=n, nCore=nc, score=score, scorePrev=sp, index=idx, indexPrev=ip, cases=cases, casesPrev=cp, revisit=rv, revisitPrev=rvp, ftfr=ft, ftfrPrev=ftp, mttr=mt, mttrPrev=mtp)

U = [unit('FS WEST', 'WEST', 'office', 13, 11, 52.3, 49.9, 101.2, 99.0, 31.5, 33.0, 14.2, 15.1, 91.0, 90.5, 118.4, 120.0),
     unit('FS EAST', 'EAST', 'office', 13, 11, 48.1, 48.1, 98.4, None, 28.0, 27.0, 16.0, 15.0, 88.5, 89.0, 122.1, 119.0),
     unit('FS CENTRAL 대전', 'CENTRAL 대전', 'office', 5, 4, 41.0, 40.0, 95.0, 96.5, 25.5, 26.0, 12.0, 13.0, 92.0, 91.0, 110.0, 112.0),
     unit('FS CENTRAL 광주', 'CENTRAL 광주', 'office', 4, 0, 0, 0, None, None, 0, 0, None, None, None, None, None, None),
     unit('FS SOUTH 부산', 'SOUTH 부산', 'office', 6, 5, 44.4, 45.0, 99.0, 99.0, 27.0, 28.0, 15.5, 15.0, 90.0, 90.0, 125.0, 124.0),
     unit('FS SOUTH 대구', 'SOUTH 대구', 'office', 4, 3, 39.9, 38.0, 94.0, 92.0, 24.0, 22.0, 17.0, 18.0, 89.0, 88.0, 130.0, 135.0)]
T = [dict(U[0], kind='team'), dict(U[1], kind='team'), unit('FS CENTRAL', 'CENTRAL', 'team', 9, 4, 41.0, 40.0, 95.0, 96.5, 25.5, 26.0, 12.0, 13.0, 92.0, 91.0, 110.0, 112.0),
     unit('FS SOUTH', 'SOUTH', 'team', 10, 8, 42.6, 42.0, 96.8, 96.0, 25.8, 25.5, 16.1, 16.2, 89.6, 89.2, 127.0, 128.0)]
D = {'peopleKpi': {'units': {'official': False, 'officialFrom': '2026-11', 'units': U, 'teams': T}}}

def texts(slide): return [sh.text_frame.text for sh in slide.shapes if sh.has_text_frame]
def table_of(slide): return next(sh for sh in slide.shapes if sh.name == NAMES['table']).table

prs = synthetic(); assert len(prs.slides) == 12 and find_people_slide(prs) is None
state, msgs = add_people_kpi_slide(prs, D, '2026-10', '10월', '9월')
assert state == 'created' and len(prs.slides) == 13 and find_people_slide(prs) == 8, '8장 바로 뒤(새 9장)'
sl = prs.slides[8]; tb = table_of(sl)
assert len(tb.rows) == 12 and len(tb.columns) == len(COLS), (len(tb.rows), len(tb.columns))
assert [tb.cell(0, j).text for j in range(len(COLS))] == COLS
assert tb.cell(1, 0).text == 'WEST' and tb.cell(7, 0).text.startswith('팀 합계') and tb.cell(8, 0).text == 'WEST' and tb.cell(10, 0).text == 'CENTRAL (대전+광주)' and tb.cell(11, 0).text == 'SOUTH (부산+대구)'
assert tb.cell(1, 1).text == '13 (11)' and tb.cell(1, 3).text.startswith('52.3') and '▲2.4' in tb.cell(1, 3).text, tb.cell(1, 3).text
assert tb.cell(1, 5).text.startswith('14.2%') and '▼0.9%p' in tb.cell(1, 5).text, '재방문율은 내려가면 좋아짐: ' + tb.cell(1, 5).text
assert tb.cell(2, 4).text.startswith('98.4') and '▲' not in tb.cell(2, 4).text and '▼' not in tb.cell(2, 4).text, '전월이 없으면 증감 없음'
assert tb.cell(4, 2).text == '-' and tb.cell(4, 3).text == '-', '비교 인원 0명이면 -'
assert tb.cell(2, 3).text.startswith('48.1') and '▲' not in tb.cell(2, 3).text, '변화 0.05 미만이면 증감 없음'
joined = ' '.join(texts(sl))
assert '사무소 단위 1인당 KPI 비교 (10월)' in joined and '시행 전 참고값' in joined and '2026년 10월 기준' in joined and any(sh.name == NAMES['badge'] for sh in sl.shapes)
assert any('▲▼' in t for t in texts(sl)), '기준 설명'
assert len(msgs) == 2 and any('새 9장' in m for m in msgs) and any('시행 전' in m for m in msgs)
ids = [int(x) for x in sl.shapes._spTree.xpath('.//p:cNvPr/@id')]; assert len(ids) == len(set(ids)), '도형 ID 유일'
out = os.path.join(tempfile.mkdtemp(), 'a.pptx'); prs.save(out)

# 저장본 다시 열기 → 이미 있음 → 값만 갈아 끼움(슬라이드 수 그대로, 손으로 넣은 도형은 유지)
p2 = Presentation(out); assert find_people_slide(p2) == 8
extra = p2.slides[8].shapes.add_textbox(Emu(100000), Emu(100000), Emu(1000000), Emu(300000)); extra.name = '내 코멘트'; extra.text_frame.text = '손으로 쓴 문장'
D2 = {'peopleKpi': {'units': dict(D['peopleKpi']['units'], official=True, units=[dict(x, score=60.0) for x in U])}}
state, msgs = add_people_kpi_slide(p2, D2, '2026-11', '11월', '10월')
assert state == 'updated' and len(p2.slides) == 13 and find_people_slide(p2) == 8
t2 = table_of(p2.slides[8]); assert t2.cell(1, 3).text.startswith('60.0') and len(t2.rows) == 12
assert '사무소 단위 1인당 KPI 비교 (11월)' in ' '.join(texts(p2.slides[8])) and '시행 전 참고값' not in ' '.join(texts(p2.slides[8])), '정식 시행 월은 배지·문구 없음'
assert not any(sh.name == NAMES['badge'] for sh in p2.slides[8].shapes) and any(sh.name == '내 코멘트' for sh in p2.slides[8].shapes)
assert msgs == [], msgs

# json 에 peopleKpi.units 가 없으면 건너뜀
p3 = synthetic(); st, ms = add_people_kpi_slide(p3, {'peopleKpi': {'top': []}}, '2026-10', '10월', '9월'); assert st == 'skipped' and len(p3.slides) == 12 and ms
print('test_people_slide: OK (새로 만들기·갱신·정식 시행 월·건너뜀)')
