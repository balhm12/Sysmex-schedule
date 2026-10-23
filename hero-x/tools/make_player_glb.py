#!/usr/bin/env python3
"""
아들 복셀 모험가 모델 생성기 (외부 라이브러리 없음, 파이썬 3 표준 라이브러리만)
- 박스를 쌓아 glTF 2.0 바이너리(.glb)로 내보낸다. 실행: python3 tools/make_player_glb.py → public/models/player.glb
- 좌표: Y 가 위, 정면은 +Z (게임 규칙). 크기는 게임이 키 1.9 로 다시 맞추므로 비율만 중요하다.
- 부품 이름은 src/assets/PartRig.ts 규칙을 따른다 (left_/right_ + leg/boot/arm/hand/bracer…, head/hair/eye/glass…, sword_…).
  게임이 이 이름으로 관절을 만들어 걷기·공격 동작을 넣는다.
- 재질: 색은 baseColorFactor, 검 날은 발광(emissive) + 반투명. 노멀을 넣지 않아 게임(three.js)이 평면 음영(flat)으로 그린다.
"""
import json
import math
import random
import struct
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / 'public' / 'models' / 'player.glb'

# ---------- 색 (0~1) ----------
def srgb_to_linear(v):
    """glTF 의 baseColorFactor 는 선형 값이라 화면 색(sRGB)을 변환해 넣는다 (안 하면 전체가 허옇게 뜬다)"""
    return v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4


def c(hexs, a=1.0):
    h = hexs.lstrip('#')
    return [srgb_to_linear(int(h[i:i + 2], 16) / 255) for i in (0, 2, 4)] + [a]

MAT = {
    'skin': dict(color=c('#f4c9a4'), rough=0.85),
    'skin_dark': dict(color=c('#d9a884'), rough=0.85),
    'blush': dict(color=c('#f3a9a0'), rough=0.9),
    'hair': dict(color=c('#55371f'), rough=0.9),
    'hair_dark': dict(color=c('#3a2012'), rough=0.9),
    'hair_light': dict(color=c('#6b4328'), rough=0.9),
    'eye_white': dict(color=c('#f7f3ea'), rough=0.6),
    'iris': dict(color=c('#5a3a22'), rough=0.5),
    'pupil': dict(color=c('#1d120b'), rough=0.5),
    'glint': dict(color=c('#ffffff'), rough=0.3, emissive=[0.5, 0.5, 0.5], strength=0.8),
    'glass': dict(color=c('#9aa3b2'), rough=0.35, metal=0.6),
    'lens': dict(color=c('#cfe4ff', 0.18), rough=0.2, blend=True),
    'mouth': dict(color=c('#7a3b32'), rough=0.9),
    'navy': dict(color=c('#1c2d6e'), rough=0.9),
    'blue': dict(color=c('#2f58c4'), rough=0.85),
    'blue_light': dict(color=c('#4f7fe0'), rough=0.85),
    'gold': dict(color=c('#e3b23c'), rough=0.45, metal=0.5),
    'gold_dark': dict(color=c('#b8872a'), rough=0.5, metal=0.5),
    'brown': dict(color=c('#6b3f24'), rough=0.9),
    'brown_dark': dict(color=c('#452614'), rough=0.9),
    'brown_light': dict(color=c('#8a5633'), rough=0.9),
    'white': dict(color=c('#ece9e2'), rough=0.9),
    'pants': dict(color=c('#1a1f3d'), rough=0.9),
    'sole': dict(color=c('#2b1a10'), rough=0.95),
    'blade': dict(color=c('#5fc4ff', 0.88), rough=0.2, emissive=[0.25, 0.6, 1.0], strength=1.1, blend=True),
    'blade_core': dict(color=c('#e8fbff', 0.9), rough=0.2, emissive=[0.8, 0.95, 1.0], strength=1.6, blend=True),
    'gem': dict(color=c('#5ec8ff'), rough=0.2, emissive=[0.3, 0.7, 1.0], strength=1.2),
    'spark': dict(color=c('#bfefff', 0.8), rough=0.2, emissive=[0.6, 0.9, 1.0], strength=1.4, blend=True),
}
MAT_INDEX = {k: i for i, k in enumerate(MAT)}

boxes = []  # (이름, 중심 xyz, 크기 xyz, 재질)


def box(name, cx, cy, cz, sx, sy, sz, mat):
    boxes.append((name, (cx, cy, cz), (sx, sy, sz), mat))


def mirror(name_l, name_r, x, y, z, sx, sy, sz, mat):
    """좌우 대칭 두 개 (x 는 +쪽 값)"""
    box(name_l, +x, y, z, sx, sy, sz, mat)
    box(name_r, -x, y, z, sx, sy, sz, mat)


# ---------- 비율 (치비: 머리 큼) ----------
# 캐릭터가 +Z 를 보므로 +X 는 캐릭터의 왼쪽 = 화면에서 볼 때 오른쪽. 검은 캐릭터 오른손(-X).
H_TOP = 3.05
HEAD_Y = 2.45     # 머리 중심
HEAD = (1.0, 0.98, 0.92)
TORSO_Y0, TORSO_Y1 = 1.12, 1.95
LEG_Y0, LEG_Y1 = 0.38, 1.14
SHOULDER_Y = 1.9

# ----- 머리 -----
box('head', 0, HEAD_Y, 0, *HEAD, 'skin')
# 볼 홍조
mirror('head_blush_l', 'head_blush_r', 0.3, HEAD_Y - 0.17, HEAD[2] / 2 + 0.005, 0.16, 0.08, 0.02, 'blush')
# 귀
mirror('ear_l', 'ear_r', HEAD[0] / 2 + 0.05, HEAD_Y - 0.05, -0.02, 0.12, 0.2, 0.2, 'skin')
mirror('ear_inner_l', 'ear_inner_r', HEAD[0] / 2 + 0.1, HEAD_Y - 0.05, -0.02, 0.03, 0.1, 0.1, 'skin_dark')
# 눈: 흰자 → 홍채 → 동공 → 하이라이트 (앞면 z 에 얇게 겹침)
FZ = HEAD[2] / 2
for sgn, side in ((1, 'l'), (-1, 'r')):
    ex = sgn * 0.21
    box(f'eye_white_{side}', ex, HEAD_Y - 0.03, FZ + 0.006, 0.2, 0.2, 0.012, 'eye_white')
    box(f'eye_iris_{side}', ex, HEAD_Y - 0.045, FZ + 0.014, 0.13, 0.15, 0.012, 'iris')
    box(f'pupil_{side}', ex, HEAD_Y - 0.05, FZ + 0.022, 0.07, 0.1, 0.012, 'pupil')
    box(f'glint_{side}', ex - sgn * 0.035, HEAD_Y + 0.01, FZ + 0.03, 0.035, 0.035, 0.012, 'glint')
    # 눈썹: 세 조각으로 살짝 아치
    box(f'brow_{side}_a', ex, HEAD_Y + 0.16, FZ + 0.01, 0.2, 0.045, 0.02, 'hair_dark')
    box(f'brow_{side}_b', ex - sgn * 0.11, HEAD_Y + 0.14, FZ + 0.01, 0.05, 0.045, 0.02, 'hair_dark')
    box(f'brow_{side}_c', ex + sgn * 0.11, HEAD_Y + 0.14, FZ + 0.01, 0.05, 0.045, 0.02, 'hair_dark')
    # 안경: 렌즈 테두리(위·아래·바깥·안쪽) + 반투명 렌즈 + 다리
    lx, ly, lz = ex, HEAD_Y - 0.02, FZ + 0.045
    box(f'glass_top_{side}', lx, ly + 0.14, lz, 0.32, 0.035, 0.035, 'glass')
    box(f'glass_bottom_{side}', lx, ly - 0.14, lz, 0.32, 0.035, 0.035, 'glass')
    box(f'glass_out_{side}', lx + sgn * 0.16, ly, lz, 0.035, 0.3, 0.035, 'glass')
    box(f'glass_in_{side}', lx - sgn * 0.16, ly, lz, 0.035, 0.3, 0.035, 'glass')
    box(f'glass_lens_{side}', lx, ly, lz - 0.005, 0.3, 0.27, 0.01, 'lens')
    box(f'glass_temple_{side}', sgn * (HEAD[0] / 2 + 0.01), ly + 0.1, FZ / 2 - 0.05, 0.03, 0.03, FZ + 0.1, 'glass')
box('glass_bridge', 0, HEAD_Y + 0.0, FZ + 0.045, 0.1, 0.035, 0.035, 'glass')
# 코, 입(미소: 가운데 선 + 양끝 위로)
box('nose', 0, HEAD_Y - 0.14, FZ + 0.03, 0.08, 0.07, 0.06, 'skin_dark')
box('mouth_mid', 0, HEAD_Y - 0.3, FZ + 0.008, 0.16, 0.03, 0.012, 'mouth')
mirror('mouth_end_l', 'mouth_end_r', 0.1, HEAD_Y - 0.275, FZ + 0.008, 0.04, 0.035, 0.012, 'mouth')

# ----- 머리카락: 뒤통수 캡(3단 돔) + 옆머리 + 앞머리 두 줄 + 윗머리 뭉치 -----
hy = HEAD_Y
box('hair_cap', 0, hy + 0.3, -0.08, HEAD[0] + 0.1, 0.5, HEAD[2] - 0.05, 'hair')
box('hair_cap2', 0, hy + 0.52, -0.08, HEAD[0] - 0.12, 0.22, HEAD[2] - 0.22, 'hair')
box('hair_cap3', 0, hy + 0.63, -0.1, HEAD[0] - 0.4, 0.16, HEAD[2] - 0.44, 'hair_light')
box('hair_back', 0, hy - 0.05, -HEAD[2] / 2 - 0.02, HEAD[0] + 0.06, 0.8, 0.14, 'hair')
box('hair_back_low', 0, hy - 0.42, -HEAD[2] / 2 + 0.02, 0.8, 0.14, 0.12, 'hair_dark')
mirror('hair_side_l', 'hair_side_r', HEAD[0] / 2 + 0.02, hy + 0.05, -0.08, 0.14, 0.62, HEAD[2] - 0.2, 'hair')
mirror('hair_side2_l', 'hair_side2_r', HEAD[0] / 2 + 0.03, hy - 0.2, -0.22, 0.1, 0.26, 0.3, 'hair_dark')
mirror('hair_side_tip_l', 'hair_side_tip_r', HEAD[0] / 2 + 0.02, hy - 0.3, 0.12, 0.12, 0.2, 0.18, 'hair')
# 앞머리: 앞줄 9갈래(길이 제각각, x≈0.1 에 가르마) + 뒷줄(빈틈 메움)
fringe = [(-0.44, 0.12, 0.3), (-0.33, 0.12, 0.4), (-0.21, 0.12, 0.34), (-0.09, 0.12, 0.42), (0.03, 0.1, 0.26), (0.14, 0.12, 0.32), (0.26, 0.12, 0.42), (0.37, 0.1, 0.36), (0.46, 0.08, 0.28)]
for i, (fx, fw, fl) in enumerate(fringe):
    mat = 'hair_dark' if i in (1, 6) else 'hair_light' if i in (3, 7) else 'hair'
    box(f'fringe_{i}', fx, hy + 0.52 - fl / 2, FZ - 0.04, fw, fl, 0.14, mat)
for i, fx in enumerate((-0.38, -0.15, 0.08, 0.2, 0.42)):
    box(f'fringe_back_{i}', fx, hy + 0.36, FZ - 0.16, 0.18, 0.34, 0.12, 'hair_dark')
# 윗머리 뭉치: 돔 모양으로 (가운데가 높고 가장자리로 갈수록 낮게), 결정적 난수
rng = random.Random(11)
for i in range(44):
    ang = rng.uniform(0, math.tau)
    rad = rng.uniform(0, 0.47)
    tx, tz = math.cos(ang) * rad, math.sin(ang) * rad * 0.8 - 0.08
    sx, sz = rng.uniform(0.16, 0.3), rng.uniform(0.16, 0.3)
    top = hy + 0.74 - 0.5 * rad * rad + rng.uniform(0.0, 0.08)
    sy = rng.uniform(0.12, 0.2)
    mat = rng.choice(['hair', 'hair', 'hair', 'hair_light', 'hair_dark'])
    box(f'hair_tuft_{i}', tx, top - sy / 2, tz, sx, sy, sz, mat)
# 정수리 삐침 두 가닥
box('hair_spike_a', -0.12, hy + 0.84, -0.04, 0.12, 0.1, 0.12, 'hair_light')
box('hair_spike_b', 0.16, hy + 0.82, 0.06, 0.1, 0.08, 0.1, 'hair')

# ----- 목 + 스카프 -----
box('neck', 0, 2.0, 0, 0.3, 0.14, 0.26, 'skin')
box('scarf', 0, 1.9, 0.02, 1.0, 0.18, 0.74, 'blue')
box('scarf_fold', 0, 1.95, 0.28, 0.6, 0.1, 0.26, 'blue_light')
box('scarf_clasp', 0, 1.9, 0.4, 0.2, 0.16, 0.06, 'gold')
box('scarf_clasp_center', 0, 1.9, 0.44, 0.08, 0.08, 0.02, 'gold_dark')
box('scarf_tail', 0.25, 1.7, -0.38, 0.22, 0.5, 0.1, 'blue')

# ----- 몸통 -----
TY = (TORSO_Y0 + TORSO_Y1) / 2
TH = TORSO_Y1 - TORSO_Y0
box('torso', 0, TY, 0, 0.9, TH, 0.52, 'navy')
box('torso_front', 0, TY, 0.27, 0.56, TH - 0.1, 0.04, 'blue')
box('torso_center_trim', 0, TY, 0.3, 0.07, TH - 0.1, 0.02, 'gold')
mirror('torso_edge_trim_l', 'torso_edge_trim_r', 0.3, TY, 0.3, 0.05, TH - 0.1, 0.02, 'gold')
box('torso_chest_v', 0, TORSO_Y1 - 0.18, 0.31, 0.2, 0.06, 0.02, 'gold')
box('torso_chest_gem', 0, TORSO_Y1 - 0.26, 0.31, 0.08, 0.08, 0.03, 'blue_light')
box('torso_hem_trim', 0, TORSO_Y0 + 0.03, 0.0, 0.94, 0.06, 0.56, 'gold')
box('torso_hem', 0, TORSO_Y0 - 0.08, 0.0, 0.92, 0.18, 0.54, 'blue')
box('torso_hem_edge', 0, TORSO_Y0 - 0.16, 0.0, 0.94, 0.04, 0.56, 'gold_dark')
# 허리띠·버클·주머니
box('belt', 0, TORSO_Y0 + 0.22, 0, 0.96, 0.13, 0.58, 'brown')
box('belt_buckle', 0, TORSO_Y0 + 0.22, 0.3, 0.2, 0.17, 0.04, 'gold')
box('belt_buckle_center', 0, TORSO_Y0 + 0.22, 0.33, 0.08, 0.08, 0.02, 'brown_dark')
mirror('pouch_l', 'pouch_r', 0.4, TORSO_Y0 + 0.1, 0.16, 0.22, 0.24, 0.2, 'brown')
mirror('pouch_flap_l', 'pouch_flap_r', 0.4, TORSO_Y0 + 0.19, 0.17, 0.24, 0.08, 0.22, 'brown_dark')
mirror('pouch_button_l', 'pouch_button_r', 0.4, TORSO_Y0 + 0.1, 0.27, 0.06, 0.06, 0.02, 'gold')
# 어깨 보호대
mirror('left_shoulder', 'right_shoulder', 0.52, SHOULDER_Y + 0.02, 0, 0.36, 0.22, 0.46, 'blue')
mirror('left_shoulder_trim', 'right_shoulder_trim', 0.52, SHOULDER_Y - 0.1, 0, 0.38, 0.05, 0.48, 'gold')
# 멜빵(배낭 끈)
mirror('strap_l', 'strap_r', 0.28, TY + 0.1, 0.28, 0.1, TH - 0.3, 0.03, 'brown')
mirror('strap_buckle_l', 'strap_buckle_r', 0.28, TY + 0.25, 0.3, 0.12, 0.08, 0.02, 'gold')

# ----- 배낭 -----
box('backpack', 0, TY + 0.05, -0.42, 0.62, 0.72, 0.32, 'brown')
box('backpack_top', 0, TY + 0.46, -0.4, 0.56, 0.2, 0.34, 'navy')
box('backpack_roll', 0, TY + 0.46, -0.4, 0.3, 0.22, 0.36, 'blue')
box('backpack_pocket', 0, TY - 0.1, -0.6, 0.36, 0.28, 0.08, 'brown_dark')
box('backpack_buckle', 0, TY + 0.0, -0.65, 0.1, 0.1, 0.02, 'gold')
mirror('backpack_strap_l', 'backpack_strap_r', 0.2, TY + 0.05, -0.5, 0.06, 0.6, 0.12, 'brown_dark')

# ----- 팔 (어깨 관절에서 아래로) -----
for sgn, side in ((1, 'left'), (-1, 'right')):
    ax = sgn * 0.62
    box(f'{side}_arm', ax, SHOULDER_Y - 0.3, 0, 0.3, 0.5, 0.32, 'navy')          # 위팔
    box(f'{side}_arm_trim', ax, SHOULDER_Y - 0.52, 0, 0.32, 0.05, 0.34, 'gold')
    box(f'{side}_arm_sleeve', ax, SHOULDER_Y - 0.66, 0, 0.3, 0.24, 0.32, 'white')  # 흰 소매
    box(f'{side}_bracer', ax, SHOULDER_Y - 0.93, 0, 0.34, 0.32, 0.36, 'brown')    # 팔 보호대
    box(f'{side}_bracer_trim', ax, SHOULDER_Y - 0.82, 0, 0.36, 0.05, 0.38, 'gold')
    box(f'{side}_bracer_band', ax, SHOULDER_Y - 1.0, 0, 0.36, 0.06, 0.38, 'brown_dark')
    box(f'{side}_hand', ax, SHOULDER_Y - 1.2, 0.02, 0.26, 0.22, 0.26, 'skin')
    box(f'{side}_hand_thumb', ax - sgn * 0.0, SHOULDER_Y - 1.17, 0.16, 0.1, 0.1, 0.08, 'skin')

# ----- 검 (오른손, 앞(+Z)을 향함) -----
hx, hy_, hz = -0.62, SHOULDER_Y - 1.2, 0.02
box('sword_handle', hx, hy_, hz + 0.0, 0.14, 0.14, 0.42, 'brown_dark')
box('sword_handle_wrap', hx, hy_, hz - 0.05, 0.16, 0.16, 0.08, 'gold_dark')
box('sword_pommel', hx, hy_, hz - 0.26, 0.18, 0.18, 0.1, 'gold')
box('sword_guard', hx, hy_, hz + 0.26, 0.46, 0.16, 0.12, 'gold')
box('sword_guard_tip_l', hx + 0.26, hy_, hz + 0.3, 0.08, 0.1, 0.1, 'gold_dark')
box('sword_guard_tip_r', hx - 0.26, hy_, hz + 0.3, 0.08, 0.1, 0.1, 'gold_dark')
box('sword_gem', hx, hy_, hz + 0.34, 0.1, 0.1, 0.08, 'gem')
# 날: 본체 + 중심선 + 복셀 느낌의 가장자리 톱니
BL = 1.15
bz0 = hz + 0.34
box('sword_blade', hx, hy_, bz0 + BL / 2, 0.2, 0.08, BL, 'blade')
box('sword_core', hx, hy_, bz0 + BL / 2 - 0.05, 0.1, 0.1, BL - 0.2, 'blade_core')
box('sword_tip', hx, hy_, bz0 + BL + 0.08, 0.16, 0.07, 0.16, 'blade')
box('sword_tip2', hx, hy_, bz0 + BL + 0.2, 0.08, 0.06, 0.1, 'blade_core')
for i in range(7):
    z = bz0 + 0.1 + i * 0.15
    w = 0.3 - i * 0.02
    box(f'sword_edge_{i}', hx + (0.05 if i % 2 else -0.05), hy_, z, w, 0.07, 0.07, 'blade')
# 떠다니는 빛 조각
for i, (dx, dy, dz, s) in enumerate([(0.25, 0.16, 0.5, 0.05), (-0.22, -0.12, 0.8, 0.04), (0.2, -0.18, 1.05, 0.04), (-0.18, 0.2, 1.3, 0.05), (0.08, 0.26, 0.95, 0.035), (-0.3, 0.05, 0.3, 0.035)]):
    box(f'sword_spark_{i}', hx + dx, hy_ + dy, bz0 + dz, s, s, s, 'spark')

# ----- 다리·장화 -----
LY = (LEG_Y0 + LEG_Y1) / 2
LH = LEG_Y1 - LEG_Y0
for sgn, side in ((1, 'left'), (-1, 'right')):
    lx = sgn * 0.23
    box(f'{side}_leg', lx, LY, 0, 0.38, LH, 0.42, 'pants')
    box(f'{side}_knee', lx, LY + 0.02, 0.2, 0.3, 0.26, 0.08, 'blue')           # 무릎 보호대
    box(f'{side}_knee_trim', lx, LY - 0.14, 0.0, 0.42, 0.06, 0.46, 'gold')     # 금색 끈
    box(f'{side}_thigh_trim', lx, LEG_Y1 - 0.08, 0.0, 0.42, 0.05, 0.46, 'gold_dark')
    box(f'{side}_boot', lx, 0.2, 0.04, 0.42, 0.4, 0.5, 'brown')
    box(f'{side}_boot_top', lx, 0.42, 0.0, 0.44, 0.08, 0.46, 'brown_dark')
    box(f'{side}_boot_strap', lx, 0.3, 0.0, 0.46, 0.06, 0.52, 'brown_dark')
    box(f'{side}_boot_buckle', lx, 0.3, 0.28, 0.1, 0.12, 0.03, 'gold')
    box(f'{side}_boot_toe', lx, 0.12, 0.3, 0.38, 0.22, 0.14, 'brown_light')
    box(f'{side}_boot_sole', lx, 0.03, 0.06, 0.46, 0.06, 0.56, 'sole')

# ---------- glb 내보내기 ----------
def face_tris(mn, mx):
    """8꼭짓점 박스의 삼각형 색인 (바깥을 향하게 감김 확인)"""
    verts = []
    for i in range(8):
        verts.append(((mx if i & 1 else mn)[0], (mx if i & 2 else mn)[1], (mx if i & 4 else mn)[2]))
    faces = {  # 축, 방향, 네 꼭짓점
        (0, -1): [0, 2, 6, 4], (0, 1): [1, 3, 7, 5],
        (1, -1): [0, 1, 5, 4], (1, 1): [2, 3, 7, 6],
        (2, -1): [0, 1, 3, 2], (2, 1): [4, 5, 7, 6],
    }
    tris = []
    for (axis, d), q in faces.items():
        a, b, cc = verts[q[0]], verts[q[1]], verts[q[2]]
        u = [b[i] - a[i] for i in range(3)]
        v = [cc[i] - a[i] for i in range(3)]
        n = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]]
        if n[axis] * d < 0:
            q = [q[0], q[3], q[2], q[1]]
        tris += [q[0], q[1], q[2], q[0], q[2], q[3]]
    return verts, tris


bin_parts = []
buffer_views = []
accessors = []
meshes = []
nodes = []
offset = 0


def add_view(data, target):
    global offset
    pad = (-len(data)) % 4
    data = data + b'\0' * pad
    buffer_views.append({'buffer': 0, 'byteOffset': offset, 'byteLength': len(data) - pad, 'target': target})
    bin_parts.append(data)
    offset += len(data)
    return len(buffer_views) - 1


# 색인은 모든 박스가 같으므로 한 번만
_, tris = face_tris((0, 0, 0), (1, 1, 1))
idx_view = add_view(struct.pack('<36H', *tris), 34963)
accessors.append({'bufferView': idx_view, 'componentType': 5123, 'count': 36, 'type': 'SCALAR', 'max': [7], 'min': [0]})
IDX = 0

for name, (cx, cy, cz), (sx, sy, sz), mat in boxes:
    mn = (cx - sx / 2, cy - sy / 2, cz - sz / 2)
    mx = (cx + sx / 2, cy + sy / 2, cz + sz / 2)
    verts, _ = face_tris(mn, mx)
    view = add_view(struct.pack('<24f', *[v for p in verts for v in p]), 34962)
    accessors.append({'bufferView': view, 'componentType': 5126, 'count': 8, 'type': 'VEC3', 'min': list(mn), 'max': list(mx)})
    meshes.append({'name': name, 'primitives': [{'attributes': {'POSITION': len(accessors) - 1}, 'indices': IDX, 'material': MAT_INDEX[mat], 'mode': 4}]})
    nodes.append({'name': name, 'mesh': len(meshes) - 1})

materials = []
for k, m in MAT.items():
    entry = {'name': k, 'pbrMetallicRoughness': {'baseColorFactor': m['color'], 'metallicFactor': m.get('metal', 0.0), 'roughnessFactor': m.get('rough', 0.9)}}
    if m.get('emissive'):
        entry['emissiveFactor'] = m['emissive']
        entry['extensions'] = {'KHR_materials_emissive_strength': {'emissiveStrength': m.get('strength', 1.0)}}
    if m.get('blend'):
        entry['alphaMode'] = 'BLEND'
        entry['doubleSided'] = True
    materials.append(entry)

bin_data = b''.join(bin_parts)
gltf = {
    'asset': {'version': '2.0', 'generator': 'hero-x tools/make_player_glb.py'},
    'scene': 0,
    'scenes': [{'nodes': [len(nodes)]}],
    'nodes': nodes + [{'name': 'voxel_adventurer', 'children': list(range(len(nodes)))}],
    'meshes': meshes,
    'materials': materials,
    'accessors': accessors,
    'bufferViews': buffer_views,
    'buffers': [{'byteLength': len(bin_data)}],
    'extensionsUsed': ['KHR_materials_emissive_strength'],
}
json_bytes = json.dumps(gltf, separators=(',', ':')).encode('utf-8')
json_bytes += b' ' * ((-len(json_bytes)) % 4)
total = 12 + 8 + len(json_bytes) + 8 + len(bin_data)
with open(OUT, 'wb') as f:
    f.write(b'glTF' + struct.pack('<II', 2, total))
    f.write(struct.pack('<I', len(json_bytes)) + b'JSON' + json_bytes)
    f.write(struct.pack('<I', len(bin_data)) + b'BIN\0' + bin_data)
print(f'{OUT.name}: 박스 {len(boxes)}개, 재질 {len(materials)}개, {total / 1024:.1f} KB')
