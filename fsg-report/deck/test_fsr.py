"""FSR 담당(8장) 조회(fsr.py) 시험 — 정리본(팀 열 없음·기존 관리표 이름 열)과 옛 관리표 안내. python-pptx 와 무관, openpyxl 필요(없으면 건너뜀)"""
import os, sys, tempfile
try:
    import openpyxl
except ImportError:
    print('test_fsr: SKIP (openpyxl 없음)'); sys.exit(0)
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from fsr import load_fsr_master

def book(sheet, header, rows, title_rows=2):
    wb = openpyxl.Workbook(); ws = wb.active; ws.title = sheet
    for i in range(title_rows): ws.append([f'제목{i}'])
    ws.append(header)
    for r in rows: ws.append(r)
    p = os.path.join(tempfile.mkdtemp(), 'b.xlsx'); wb.save(p); return p

# 정리본: 팀 열 없음 · 기관명 = CRM 거래처명 · 「기존 관리표 이름」 열
p = book('담당기관 마스터', ['담당자', '기관명', '시·도', '장비 수', '기존 관리표 이름'],
         [['FSR-가', 'TESTHOSP-동산병원', '대구', 5, 'TESTHOSP-OLD동산'], ['FSR-나', '(주)TESTHOSP-서울의원', '서울', 3, None], ['FSR-다', None, '서울', 1, None]])
f = load_fsr_master(p)
assert f.size == 2 and f.has_team is False
assert f('TESTHOSP-동산병원') == ('', 'FSR-가'), f('TESTHOSP-동산병원')
assert f('TESTHOSP OLD 동산') == ('', 'FSR-가'), '기존 관리표 이름으로 한 번 더 찾는다'
assert f('테스트 서울의원') is None and f('TESTHOSP-서울의원') == ('', 'FSR-나'), '(주)·공백·기호를 지운 키로 맞춤'
assert f('전혀 다른 병원') is None

# 팀 열이 있는 판(옛 정리본 형식)도 그대로 읽는다
p2 = book('담당기관 마스터', ['No', '담당자', '직급', '팀', '거점', '기관명(병원)'], [[1, 'FSR-가', 'T2', 'FS EAST', '서울', 'TESTHOSP-동산병원']])
f2 = load_fsr_master(p2); assert f2.has_team is True and f2('TESTHOSP-동산병원') == ('FS EAST', 'FSR-가')

# 마스터 시트가 없는 옛 관리표 → 정리본이 필요하다는 안내
p3 = book('FSR 현황', ['담당자', '병원'], [['FSR-가', 'X']])
try:
    load_fsr_master(p3); raise SystemExit('FAIL: 시트가 없는데 통과')
except ValueError as e:
    assert '정리본' in str(e) and '마스터' in str(e), str(e)
print('test_fsr: OK (정리본 팀 열 없음·기존 이름 보조 조회·옛 관리표 안내)')
