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
    if not name:
        raise ValueError('이 파일에는 「담당기관 마스터」 시트가 없습니다 — 옛 관리표(2026-07-07판 등)로 보입니다. 담당기관·장비를 갱신한 「FSG_FSR_담당기관관리표_YYYYMMDD_정리본.xlsx」가 필요합니다')
    rows = [list(r) for r in wb[name].iter_rows(values_only=True)]
    hi = next((i for i, r in enumerate(rows[:15]) if any(str(c or '').replace(' ', '').startswith('기관명') for c in r) and any(str(c or '') == '담당자' for c in r)), None)
    if hi is None: raise ValueError('담당기관 마스터의 머리글(담당자·기관명)을 찾지 못했습니다')
    h = [str(c or '').strip() for c in rows[hi]]
    ci = lambda k: next((j for j, x in enumerate(h) if x.replace(' ', '').startswith(k)), None)
    c_own, c_team, c_acct, c_old = ci('담당자'), ci('팀'), ci('기관명'), ci('기존')   # 정리본은 팀 열이 없을 수 있고(→ 팀은 엔진 값), 「기존 관리표 이름」 열이 있을 수 있다
    table, old_table = {}, {}
    for r in rows[hi + 1:]:
        if len(r) <= max(c_own, c_acct) or not r[c_acct] or not r[c_own]: continue
        team = str(r[c_team]).strip() if c_team is not None and len(r) > c_team and r[c_team] else ''
        val = (team, str(r[c_own]).strip())
        table.setdefault(_key(r[c_acct]), val)
        if c_old is not None and len(r) > c_old and r[c_old]: old_table.setdefault(_key(r[c_old]), val)   # 기관명이 CRM 거래처명으로 바뀐 기관을 옛 이름으로도 찾는다

    def lookup(account):
        k = _key(account)
        if k in table: return table[k]
        if k in old_table: return old_table[k]
        if len(k) >= 4:
            for T in (table, old_table):
                hits = [v for m, v in T.items() if len(m) >= 4 and (k in m or m in k)]
                if len(set(hits)) == 1: return hits[0]
        return None
    lookup.size = len(table)
    lookup.has_team = c_team is not None
    return lookup
