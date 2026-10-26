"""FSR 담당기관 관리표(엑셀)의 「담당기관 마스터」 시트를 읽어 기관명 → (팀, 담당 FSR)을 찾아 준다.
머리글: No · 담당자 · 직급 · 팀 · 거점 · 기관명(병원) …  기관명은 법인 표기·공백·괄호를 지운 키로 맞추고, 정확히 안 맞으면 4자 이상 포함 관계가 한 곳뿐일 때만 쓴다."""
import re
import openpyxl


def _key(s):
    s = re.sub(r'\(주\)|\(사\)|\(재\)|\(학\)|㈜', '', str(s or ''))
    return re.sub(r'의료법인|학교법인|재단법인|사단법인|특수법인|사회복지법인|\s+|[()\[\]·\-_/,.]', '', s)


def load_fsr_master(path):
    wb = openpyxl.load_workbook(path, data_only=True, read_only=True)
    name = next((w.title for w in wb.worksheets if '마스터' in w.title), None)
    if not name: raise ValueError('「담당기관 마스터」 시트를 찾지 못했습니다')
    rows = [list(r) for r in wb[name].iter_rows(values_only=True)]
    hi = next((i for i, r in enumerate(rows[:15]) if any(str(c or '').startswith('기관명') for c in r) and any(str(c or '') == '담당자' for c in r)), None)
    if hi is None: raise ValueError('담당기관 마스터의 머리글(담당자·기관명)을 찾지 못했습니다')
    h = [str(c or '').strip() for c in rows[hi]]
    ci = lambda k: next((j for j, x in enumerate(h) if x.startswith(k)), None)
    c_own, c_team, c_acct = ci('담당자'), ci('팀'), ci('기관명')
    table = {}
    for r in rows[hi + 1:]:
        if len(r) <= max(c_own, c_team, c_acct) or not r[c_acct] or not r[c_own]: continue
        table.setdefault(_key(r[c_acct]), (str(r[c_team]).strip(), str(r[c_own]).strip()))

    def lookup(account):
        k = _key(account)
        if k in table: return table[k]
        if len(k) >= 4:
            hits = [v for m, v in table.items() if len(m) >= 4 and (k in m or m in k)]
            if len(set(hits)) == 1: return hits[0]
        return None
    lookup.size = len(table)
    return lookup
