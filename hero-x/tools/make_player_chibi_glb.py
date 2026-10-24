#!/usr/bin/env python3
"""
둥근(치비) 복셀 모험가 모델 생성기 — 아들 캐릭터 2판 (외부 라이브러리 없음)
- 실행: python3 tools/make_player_chibi_glb.py → public/models/player-chibi.glb
- 둥근 머리·머리카락·몸·팔다리는 voxel_shapes 의 껍데기 복셀(작은 정육면체 수백 개를 한 메시로)로 만들고,
  눈·안경·장식은 박스로 얹는다. 좌표: Y 위, 정면 +Z. 게임이 키 1.9 로 다시 맞추므로 비율만 중요.
- 부품 이름은 src/assets/PartRig.ts 규칙(left_/right_ + leg/boot/knee/arm/hand/bracer…, head/hair/ear/eye/glass/brow/nose/mouth…, sword_…).
  머리에 붙는 것은 모두 head_/hair_/eye_/glass_… 로 시작해야 머리와 같이 돈다. 이름이 규칙 밖이면 몸통으로 취급된다.
"""
import math
import random
from pathlib import Path
from voxel_glb import VoxelModel, mat
from voxel_shapes import capsule_y, ellipsoid, rounded_box

OUT = Path(__file__).resolve().parent.parent / 'public' / 'models' / 'player-chibi.glb'

MAT = {
    'skin': mat('#f6cfae', rough=0.85),
    'skin_dark': mat('#dcae8c', rough=0.85),
    'blush': mat('#f3a9a0', rough=0.9),
    'hair': mat('#5a3a21', rough=0.9),
    'hair_dark': mat('#3d2313', rough=0.9),
    'hair_light': mat('#73492b', rough=0.9),
    'eye_white': mat('#f9f6ef', rough=0.6),
    'iris': mat('#4c2f1a', rough=0.5),
    'pupil': mat('#1a100a', rough=0.5),
    'glint': mat('#ffffff', rough=0.3, emissive=[0.5, 0.5, 0.5], strength=0.8),
    'glass': mat('#aab3c2', rough=0.3, metal=0.7),
    'lens': mat('#cfe4ff', 0.16, rough=0.2, blend=True),
    'mouth': mat('#8a3f36', rough=0.9),
    'navy': mat('#1f3480', rough=0.9),
    'blue': mat('#2f5bd0', rough=0.85),
    'blue_light': mat('#5a8af0', rough=0.85),
    'gold': mat('#e8b93f', rough=0.45, metal=0.5),
    'gold_dark': mat('#b9882a', rough=0.5, metal=0.5),
    'brown': mat('#6f4226', rough=0.9),
    'brown_dark': mat('#47291a', rough=0.9),
    'brown_light': mat('#8e5a36', rough=0.9),
    'white': mat('#f0ede6', rough=0.9),
    'pants': mat('#1b2040', rough=0.9),
    'sole': mat('#2b1a10', rough=0.95),
    'blade': mat('#5fc4ff', 0.88, rough=0.2, emissive=[0.25, 0.6, 1.0], strength=1.1, blend=True),
    'blade_core': mat('#e8fbff', 0.9, rough=0.2, emissive=[0.8, 0.95, 1.0], strength=1.6, blend=True),
    'gem': mat('#5ec8ff', rough=0.2, emissive=[0.3, 0.7, 1.0], strength=1.2),
    'spark': mat('#bfefff', 0.8, rough=0.2, emissive=[0.6, 0.9, 1.0], strength=1.4, blend=True),
}
model = VoxelModel('voxel_adventurer_chibi', MAT)
box = model.box
mirror = model.mirror
vox = model.voxels

# ---------- 비율 (치비: 머리가 전체의 40%) ----------
HX, HY, HZ = 0.0, 2.58, 0.0          # 머리 중심
RX, RY, RZ = 0.64, 0.6, 0.6          # 머리 반지름
V = 0.07                              # 복셀 한 칸

def head_surface_z(x, y):
    """머리 앞면(구면)의 z (x, y 는 머리 중심 기준 상대 좌표)"""
    k = 1 - (x / RX) ** 2 + 0.0 - (y / RY) ** 2
    return HZ + RZ * math.sqrt(max(0.0, k))

# ----- 머리(구) + 귀 -----
vox('head_ball', ellipsoid(HX, HY, HZ, RX, RY, RZ, V), 'skin')
for sgn, side in ((1, 'l'), (-1, 'r')):
    vox(f'ear_{side}', ellipsoid(sgn * (RX + 0.02), HY - 0.04, -0.03, 0.09, 0.15, 0.13, 0.05), 'skin')
    box(f'ear_inner_{side}', sgn * (RX + 0.07), HY - 0.04, -0.03, 0.03, 0.08, 0.07, 'skin_dark')

# ----- 얼굴: 눈(크게)·눈썹·안경(둥근 테)·코·입·홍조 — 모두 구면 위에 -----
EYE_X, EYE_Y = 0.25, -0.04
for sgn, side in ((1, 'l'), (-1, 'r')):
    ex, ey = sgn * EYE_X, HY + EYE_Y
    z = head_surface_z(ex, EYE_Y)
    box(f'eye_white_{side}', ex, ey, z + 0.0, 0.26, 0.28, 0.07, 'eye_white')
    box(f'eye_iris_{side}', ex, ey - 0.02, z + 0.025, 0.17, 0.2, 0.05, 'iris')
    box(f'pupil_{side}', ex, ey - 0.03, z + 0.04, 0.09, 0.13, 0.045, 'pupil')
    box(f'glint_{side}', ex - sgn * 0.045, ey + 0.05, z + 0.055, 0.05, 0.05, 0.04, 'glint')
    box(f'glint2_{side}', ex + sgn * 0.035, ey - 0.06, z + 0.055, 0.025, 0.025, 0.04, 'glint')
    # 눈썹: 세 조각 아치
    bz = head_surface_z(ex, EYE_Y + 0.24)
    box(f'brow_{side}_a', ex, ey + 0.23, bz + 0.0, 0.22, 0.05, 0.06, 'hair_dark')
    box(f'brow_{side}_b', ex - sgn * 0.12, ey + 0.21, head_surface_z(ex - sgn * 0.12, EYE_Y + 0.22) + 0.0, 0.06, 0.05, 0.06, 'hair_dark')
    box(f'brow_{side}_c', ex + sgn * 0.12, ey + 0.2, head_surface_z(ex + sgn * 0.12, EYE_Y + 0.21) + 0.0, 0.06, 0.05, 0.06, 'hair_dark')
    # 둥근 안경테: 작은 정육면체를 원 둘레를 따라 놓고, 각 칸은 그 자리 구면 앞에 띄운다
    ring = []
    n = 22
    for i in range(n):
        a = i / n * math.tau
        rx_, ry_ = ex + math.cos(a) * 0.2, EYE_Y + math.sin(a) * 0.19
        ring.append((rx_, HY + ry_, head_surface_z(rx_, ry_) + 0.075, 0.045, 0.045, 0.045))
    vox(f'glass_rim_{side}', ring, 'glass')
    box(f'glass_lens_{side}', ex, ey, z + 0.06, 0.34, 0.32, 0.012, 'lens')
    # 안경 다리: 테 바깥에서 귀까지
    tx = sgn * (EYE_X + 0.2)
    box(f'glass_temple_{side}', sgn * (RX * 0.78), ey + 0.09, 0.2, 0.03, 0.03, 0.56, 'glass')
    box(f'glass_temple_end_{side}', sgn * (RX + 0.01), ey + 0.06, -0.02, 0.03, 0.03, 0.14, 'glass')
box('glass_bridge', 0, HY + EYE_Y + 0.02, head_surface_z(0, EYE_Y + 0.02) + 0.075, 0.1, 0.04, 0.045, 'glass')
box('nose', 0, HY - 0.17, head_surface_z(0, -0.17) + 0.02, 0.08, 0.08, 0.08, 'skin_dark')
mz = head_surface_z(0, -0.33)
box('mouth_mid', 0, HY - 0.33, mz + 0.01, 0.18, 0.035, 0.04, 'mouth')
mirror('mouth_end_l', 'mouth_end_r', 0.11, HY - 0.305, head_surface_z(0.11, -0.305) + 0.01, 0.04, 0.04, 0.04, 'mouth')
mirror('head_blush_l', 'head_blush_r', 0.36, HY - 0.2, head_surface_z(0.36, -0.2) + 0.005, 0.16, 0.08, 0.04, 'blush')

# ----- 머리카락: 둥근 모자(윗부분·뒷부분·옆부분) + 앞머리 갈래 + 정수리 뭉치 -----
CAP = (HX, HY + 0.06, HZ - 0.05, RX + 0.07, RY + 0.08, RZ + 0.09)
def hair_keep(x, y, z):
    return y > HY + 0.1 or z < HZ - 0.14 or (abs(x) > 0.52 and y > HY - 0.2)
vox('hair_cap', ellipsoid(*CAP, 0.075, keep=hair_keep), 'hair')
# 앞머리: 구면 앞쪽 둘레를 따라 길이가 다른 갈래
rng = random.Random(7)
fringe = []
for i, a in enumerate([-62, -50, -38, -26, -14, -3, 8, 20, 32, 44, 56]):
    r = math.radians(a)
    x = CAP[3] * math.sin(r) * 0.98
    z = CAP[2] + CAP[5] * math.cos(r) * 0.96
    length = 0.3 + 0.16 * abs(math.sin(i * 1.9)) + rng.uniform(0, 0.08)
    top = HY + 0.48
    w = 0.15 if abs(a) < 50 else 0.13
    m = 'hair_dark' if i in (1, 6, 9) else 'hair_light' if i in (3, 8) else 'hair'
    box(f'fringe_{i}', x, top - length / 2, z, w, length, 0.14, m)
# 뒷머리 아랫단
vox('hair_back_low', ellipsoid(HX, HY - 0.22, HZ - 0.3, 0.58, 0.3, 0.38, 0.075, keep=lambda x, y, z: z < HZ - 0.25), 'hair_dark')
# 정수리 뭉치: 모자 윗면 위에 작은 덩어리
for i in range(40):
    th = rng.uniform(0, math.tau)
    ph = rng.uniform(0.0, 1.05)  # 0=정수리, 클수록 옆
    x = CAP[0] + CAP[3] * math.sin(ph) * math.cos(th) * 0.95
    z = CAP[2] + CAP[5] * math.sin(ph) * math.sin(th) * 0.95
    y = CAP[1] + CAP[4] * math.cos(ph) * 0.98
    s = rng.uniform(0.12, 0.22)
    m = rng.choice(['hair', 'hair', 'hair', 'hair_light', 'hair_dark'])
    box(f'hair_tuft_{i}', x, y, z, s, s * rng.uniform(0.7, 1.0), s, m)
box('hair_spike_a', -0.14, HY + RY + 0.2, -0.02, 0.12, 0.14, 0.12, 'hair_light')
box('hair_spike_b', 0.18, HY + RY + 0.17, 0.08, 0.1, 0.12, 0.1, 'hair')

# ----- 목·스카프 -----
box('neck', 0, 1.98, 0, 0.32, 0.2, 0.3, 'skin')
vox('scarf', rounded_box(0, 1.9, 0.02, 1.06, 0.24, 0.82, 0.1, 0.06), 'blue')
box('scarf_fold', 0, 1.96, 0.3, 0.62, 0.1, 0.28, 'blue_light')
box('scarf_clasp', 0, 1.9, 0.43, 0.2, 0.17, 0.05, 'gold')
box('scarf_clasp_center', 0, 1.9, 0.46, 0.08, 0.08, 0.02, 'gold_dark')
box('scarf_tail', 0.26, 1.68, -0.4, 0.22, 0.5, 0.1, 'blue')

# ----- 몸통(둥근 상자) + 앞판·장식·허리띠·주머니 -----
TY0, TY1 = 1.02, 1.92
TY = (TY0 + TY1) / 2
vox('torso', rounded_box(0, TY, 0, 1.0, TY1 - TY0, 0.6, 0.14, 0.07), 'navy')
box('torso_front', 0, TY + 0.02, 0.29, 0.6, 0.66, 0.05, 'blue')
box('torso_center_trim', 0, TY + 0.02, 0.32, 0.07, 0.66, 0.02, 'gold')
mirror('torso_edge_trim_l', 'torso_edge_trim_r', 0.3, TY + 0.02, 0.32, 0.05, 0.66, 0.02, 'gold')
box('torso_chest_v', 0, TY1 - 0.2, 0.33, 0.22, 0.06, 0.02, 'gold')
box('torso_chest_gem', 0, TY1 - 0.28, 0.33, 0.09, 0.09, 0.03, 'blue_light')
vox('torso_hem', rounded_box(0, TY0 - 0.04, 0, 1.02, 0.22, 0.62, 0.08, 0.06), 'blue')
box('torso_hem_trim', 0, TY0 + 0.07, 0.0, 1.04, 0.05, 0.64, 'gold')
box('torso_hem_edge', 0, TY0 - 0.14, 0.0, 1.03, 0.04, 0.63, 'gold_dark')
box('belt', 0, TY0 + 0.24, 0, 1.04, 0.14, 0.64, 'brown')
box('belt_buckle', 0, TY0 + 0.24, 0.33, 0.2, 0.18, 0.04, 'gold')
box('belt_buckle_center', 0, TY0 + 0.24, 0.36, 0.08, 0.08, 0.02, 'brown_dark')
for sgn, side in ((1, 'l'), (-1, 'r')):
    vox(f'pouch_{side}', rounded_box(sgn * 0.42, TY0 + 0.1, 0.2, 0.24, 0.26, 0.22, 0.06, 0.05), 'brown')
    box(f'pouch_flap_{side}', sgn * 0.42, TY0 + 0.2, 0.21, 0.26, 0.08, 0.24, 'brown_dark')
    box(f'pouch_button_{side}', sgn * 0.42, TY0 + 0.1, 0.32, 0.06, 0.06, 0.02, 'gold')
    # 어깨 보호대(둥근 반구) — 몸통 소속
    vox(f'pauldron_{side}', ellipsoid(sgn * 0.57, 1.9, 0, 0.26, 0.17, 0.28, 0.06, keep=lambda x, y, z: y > 1.86), 'blue')
    box(f'pauldron_trim_{side}', sgn * 0.57, 1.84, 0, 0.44, 0.05, 0.5, 'gold')
    # 멜빵
    box(f'strap_{side}', sgn * 0.28, TY + 0.1, 0.3, 0.1, 0.56, 0.03, 'brown')
    box(f'strap_buckle_{side}', sgn * 0.28, TY + 0.26, 0.32, 0.12, 0.08, 0.02, 'gold')

# ----- 배낭 -----
vox('backpack', rounded_box(0, TY + 0.04, -0.47, 0.66, 0.76, 0.36, 0.1, 0.06), 'brown')
vox('backpack_roll', rounded_box(0, TY + 0.5, -0.44, 0.58, 0.22, 0.36, 0.09, 0.055), 'navy')
box('backpack_roll_band', 0, TY + 0.5, -0.44, 0.3, 0.24, 0.38, 'blue')
box('backpack_pocket', 0, TY - 0.1, -0.67, 0.36, 0.28, 0.08, 'brown_dark')
box('backpack_buckle', 0, TY + 0.0, -0.72, 0.1, 0.1, 0.02, 'gold')
mirror('backpack_strap_l', 'backpack_strap_r', 0.2, TY + 0.05, -0.56, 0.06, 0.62, 0.12, 'brown_dark')

# ----- 팔 (어깨 관절은 팔 부품 꼭대기) -----
for sgn, side in ((1, 'left'), (-1, 'right')):
    ax = sgn * 0.68
    vox(f'{side}_arm', capsule_y(ax, 1.5, 1.78, 0, 0.17, 0.06), 'navy')
    box(f'{side}_arm_trim', ax, 1.42, 0, 0.36, 0.05, 0.36, 'gold')
    vox(f'{side}_arm_sleeve', capsule_y(ax, 1.3, 1.4, 0, 0.165, 0.055), 'white')
    vox(f'{side}_bracer', rounded_box(ax, 1.12, 0, 0.38, 0.36, 0.4, 0.09, 0.055), 'brown')
    box(f'{side}_bracer_trim', ax, 1.24, 0, 0.4, 0.05, 0.42, 'gold')
    box(f'{side}_bracer_band', ax, 1.02, 0, 0.4, 0.06, 0.42, 'brown_dark')
    vox(f'{side}_hand', ellipsoid(ax, 0.86, 0.02, 0.16, 0.14, 0.16, 0.05), 'skin')
    box(f'{side}_hand_thumb', ax - sgn * 0.02, 0.9, 0.17, 0.1, 0.1, 0.09, 'skin')

# ----- 검 (오른손, 앞(+Z)을 향함) -----
hx, hy_, hz = -0.68, 0.86, 0.04
box('sword_handle', hx, hy_, hz + 0.0, 0.15, 0.15, 0.44, 'brown_dark')
box('sword_handle_wrap', hx, hy_, hz - 0.05, 0.17, 0.17, 0.08, 'gold_dark')
box('sword_pommel', hx, hy_, hz - 0.27, 0.19, 0.19, 0.1, 'gold')
box('sword_guard', hx, hy_, hz + 0.27, 0.5, 0.17, 0.12, 'gold')
box('sword_guard_tip_l', hx + 0.28, hy_, hz + 0.31, 0.08, 0.1, 0.1, 'gold_dark')
box('sword_guard_tip_r', hx - 0.28, hy_, hz + 0.31, 0.08, 0.1, 0.1, 'gold_dark')
box('sword_gem', hx, hy_, hz + 0.35, 0.1, 0.1, 0.08, 'gem')
BL = 1.25
bz0 = hz + 0.35
box('sword_blade', hx, hy_, bz0 + BL / 2, 0.22, 0.08, BL, 'blade')
box('sword_core', hx, hy_, bz0 + BL / 2 - 0.05, 0.1, 0.11, BL - 0.2, 'blade_core')
box('sword_tip', hx, hy_, bz0 + BL + 0.08, 0.17, 0.07, 0.16, 'blade')
box('sword_tip2', hx, hy_, bz0 + BL + 0.2, 0.08, 0.06, 0.1, 'blade_core')
for i in range(8):
    z = bz0 + 0.1 + i * 0.15
    w = 0.32 - i * 0.02
    box(f'sword_edge_{i}', hx + (0.05 if i % 2 else -0.05), hy_, z, w, 0.07, 0.07, 'blade')
for i, (dx, dy, dz, s) in enumerate([(0.26, 0.16, 0.5, 0.05), (-0.22, -0.12, 0.8, 0.04), (0.2, -0.18, 1.05, 0.04), (-0.18, 0.2, 1.3, 0.05), (0.08, 0.26, 0.95, 0.035), (-0.3, 0.05, 0.3, 0.035)]):
    box(f'sword_spark_{i}', hx + dx, hy_ + dy, bz0 + dz, s, s, s, 'spark')

# ----- 다리·장화 (엉덩이 관절은 다리 부품 꼭대기) -----
for sgn, side in ((1, 'left'), (-1, 'right')):
    lx = sgn * 0.25
    vox(f'{side}_leg', capsule_y(lx, 0.62, 0.96, 0, 0.21, 0.06), 'pants')
    vox(f'{side}_knee', rounded_box(lx, 0.66, 0.2, 0.3, 0.26, 0.1, 0.05, 0.045), 'blue')
    box(f'{side}_knee_trim', lx, 0.5, 0.0, 0.46, 0.06, 0.48, 'gold')
    box(f'{side}_thigh_trim', lx, 1.06, 0.0, 0.46, 0.05, 0.48, 'gold_dark')
    vox(f'{side}_boot', rounded_box(lx, 0.24, 0.05, 0.46, 0.46, 0.56, 0.1, 0.055), 'brown')
    box(f'{side}_boot_top', lx, 0.45, 0.0, 0.48, 0.08, 0.5, 'brown_dark')
    box(f'{side}_boot_strap', lx, 0.32, 0.0, 0.5, 0.06, 0.58, 'brown_dark')
    box(f'{side}_boot_buckle', lx, 0.32, 0.31, 0.1, 0.12, 0.03, 'gold')
    vox(f'{side}_boot_toe', rounded_box(lx, 0.14, 0.32, 0.4, 0.24, 0.18, 0.06, 0.05), 'brown_light')
    box(f'{side}_boot_sole', lx, 0.03, 0.06, 0.5, 0.06, 0.6, 'sole')

model.export(OUT)
