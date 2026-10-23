#!/usr/bin/env python3
"""
몬스터 5종 복셀 모델 생성기 → public/models/monster-*.glb (적 로봇 대신 쓰는 괴물 외형, 더 정교함)
실행: python3 tools/make_monsters_glb.py
- rusher → 고블린 전사(곤봉) / shooter → 유령 마법사(지팡이, 떠다님) / tank → 트롤 거인(방패·도끼) /
  stalker → 동굴 박쥐 괴물(날개) / artillery → 돌 골렘 투석병(바위 던짐)
- 사람형 몬스터는 플레이어와 같은 부품 이름(left_leg/right_leg/left_arm/right_arm/head + weapon_*)을 써서
  적 리그가 걷기(팔다리 교차)·공격 예고(무기 팔 치켜들기)·공격(휘두르기)을 만든다.
  떠다니는 몬스터는 float_* 부품을 하나 두면 떠다닌다. 무기에 붙는 발광 부품은 weapon_* 로 이름 지어야 팔과 함께 움직인다(glow_* 는 따로 관절이 됨). 날개는 wing_l/wing_r, 발광은 glow_*, 눈은 eye_* (예고 때 커짐).
- 정면은 +Z. 크기는 게임이 충돌 반지름에 맞춰 다시 조정한다.
"""
import math
import random
from pathlib import Path
from voxel_glb import VoxelModel, mat

OUT = Path(__file__).resolve().parent.parent / 'public' / 'models'

COMMON = {
    'eye_white': mat('#f7f3ea', rough=0.5),
    'pupil': mat('#15161d', rough=0.3),
    'tooth': mat('#f3f0e6', rough=0.5),
    'wood': mat('#6b4a2b', rough=0.9),
    'wood_dark': mat('#4a3119', rough=0.9),
    'iron': mat('#8b94a3', rough=0.4, metal=0.7),
    'iron_dark': mat('#4c5363', rough=0.5, metal=0.6),
    'leather': mat('#5a3a22', rough=0.95),
    'leather_dark': mat('#3a2414', rough=0.95),
    'rope': mat('#b89b6a', rough=0.95),
    'gold': mat('#e3b23c', rough=0.45, metal=0.5),
}


def eyes(m, prefix, cx, y, z, gap, size, white='eye_white', pupil='pupil', glow=False):
    """눈 한 쌍: 흰자/동공 (glow 면 흰자 대신 발광 재질 하나)"""
    for sgn, side in ((1, 'l'), (-1, 'r')):
        ex = cx + sgn * gap
        if glow:
            m.box(f'eye_{side}', ex, y, z, size, size * 0.8, 0.06, white)
        else:
            m.box(f'eye_{side}_white', ex, y, z, size, size * 0.9, 0.05, white)
            m.box(f'eye_{side}_pupil', ex - sgn * size * 0.1, y - size * 0.05, z + 0.03, size * 0.45, size * 0.55, 0.04, pupil)


# ---------------------------------------------------------------- 고블린 전사
def build_goblin():
    m = VoxelModel('goblin', {**COMMON,
        'skin': mat('#6fae3c', rough=0.85), 'skin_dark': mat('#4d7f27', rough=0.85), 'skin_light': mat('#8fc85a', rough=0.85),
        'cloth': mat('#8a2d2d', rough=0.95), 'cloth_dark': mat('#5e1d1d', rough=0.95),
        'eye_glow': mat('#ffd23f', rough=0.3, emissive=[1.0, 0.75, 0.2], strength=1.1)})
    # 다리 (짧고 굵음) + 맨발
    for sgn, side in ((1, 'left'), (-1, 'right')):
        x = sgn * 0.26
        m.box(f'{side}_leg', x, 0.62, 0, 0.34, 0.5, 0.36, 'skin')
        m.box(f'{side}_leg_wrap', x, 0.78, 0, 0.38, 0.14, 0.4, 'cloth_dark')
        m.box(f'{side}_foot', x, 0.12, 0.08, 0.36, 0.24, 0.52, 'skin_dark')
        for i in range(3):
            m.box(f'{side}_foot_toe{i}', x + (i - 1) * 0.11, 0.1, 0.38, 0.09, 0.14, 0.12, 'skin_light')
    # 몸통 (앞으로 숙인 느낌: 가슴이 앞) + 누더기 옷 + 허리띠
    m.box('body', 0, 1.2, 0.02, 0.9, 0.7, 0.62, 'skin')
    m.box('body_belly', 0, 1.05, 0.26, 0.6, 0.36, 0.16, 'skin_light')
    m.box('body_cloth', 0, 1.3, 0.0, 0.94, 0.4, 0.66, 'cloth')
    m.box('body_cloth_strap', 0.2, 1.45, 0.0, 0.14, 0.5, 0.7, 'cloth_dark')
    m.box('body_belt', 0, 0.9, 0, 0.96, 0.12, 0.68, 'leather')
    m.box('body_belt_buckle', 0, 0.9, 0.36, 0.16, 0.14, 0.04, 'iron')
    m.box('body_pouch', -0.38, 0.86, 0.22, 0.2, 0.22, 0.2, 'leather_dark')
    # 어깨 뼈 장식 + 팔
    for sgn, side in ((1, 'left'), (-1, 'right')):
        x = sgn * 0.6
        m.box(f'{side}_arm', x, 1.3, 0.04, 0.28, 0.48, 0.3, 'skin')              # 위팔
        m.box(f'{side}_arm_band', x, 1.42, 0.04, 0.3, 0.1, 0.32, 'rope')
        m.box(f'{side}_arm_fore', x, 0.92, 0.1, 0.26, 0.4, 0.28, 'skin_dark')     # 아래팔
        m.box(f'{side}_hand', x, 0.68, 0.14, 0.28, 0.22, 0.3, 'skin_light')
        m.box(f'{side}_shoulder_bone', x, 1.6, 0.02, 0.34, 0.14, 0.4, 'tooth')
    # 큰 머리 (뾰족 귀, 긴 코, 송곳니, 노란 눈)
    m.box('head', 0, 2.05, 0.08, 0.86, 0.72, 0.78, 'skin')
    m.box('head_jaw', 0, 1.78, 0.2, 0.7, 0.2, 0.6, 'skin_dark')
    m.box('head_brow', 0, 2.3, 0.44, 0.74, 0.1, 0.1, 'skin_dark')
    eyes(m, 'head', 0, 2.14, 0.48, 0.22, 0.2, white='eye_glow', glow=True)
    m.box('nose', 0, 1.98, 0.6, 0.14, 0.14, 0.34, 'skin_dark')
    m.box('mouth', 0, 1.84, 0.5, 0.42, 0.06, 0.04, 'leather_dark')
    m.mirror('mouth_tooth_l', 'mouth_tooth_r', 0.14, 1.9, 0.5, 0.07, 0.14, 0.06, 'tooth')
    for sgn, side in ((1, 'l'), (-1, 'r')):
        m.box(f'ear_{side}', sgn * 0.62, 2.15, 0.0, 0.42, 0.14, 0.2, 'skin')
        m.box(f'ear_{side}_tip', sgn * 0.86, 2.22, 0.0, 0.14, 0.1, 0.12, 'skin_dark')
    # 투구 대신 머리띠 + 깃털
    m.box('hair_band', 0, 2.36, 0.08, 0.9, 0.08, 0.8, 'cloth_dark')
    m.box('hair_feather', 0.3, 2.62, -0.1, 0.08, 0.5, 0.14, 'cloth')
    m.box('hair_feather_tip', 0.3, 2.9, -0.1, 0.06, 0.1, 0.1, 'tooth')
    # 곤봉 (오른손, 앞을 향함) : 못 박힌 나무 몽둥이
    hx, hy, hz = -0.6, 0.68, 0.14
    m.box('weapon_grip', hx, hy, hz + 0.2, 0.12, 0.12, 0.5, 'wood_dark')
    m.box('weapon_club', hx, hy, hz + 0.75, 0.3, 0.3, 0.6, 'wood')
    m.box('weapon_club_tip', hx, hy, hz + 1.08, 0.24, 0.24, 0.1, 'wood_dark')
    for i, (dx, dy) in enumerate(((0.17, 0.08), (-0.17, -0.06), (0.05, 0.17), (-0.06, -0.17))):
        m.box(f'weapon_spike{i}', hx + dx, hy + dy, hz + 0.72 + (i % 2) * 0.12, 0.08, 0.08, 0.08, 'iron')
    return m


# ---------------------------------------------------------------- 유령 마법사
def build_ghost_mage():
    m = VoxelModel('ghost_mage', {**COMMON,
        'robe': mat('#5b3fb8', rough=0.9), 'robe_dark': mat('#3a2680', rough=0.9), 'robe_trim': mat('#b89bff', rough=0.8),
        'ghost': mat('#c9c3ff', 0.55, rough=0.6, blend=True), 'ghost_light': mat('#ece9ff', 0.4, rough=0.6, blend=True),
        'eye_glow': mat('#ff8fb0', rough=0.3, emissive=[1.0, 0.4, 0.6], strength=1.4),
        'orb': mat('#ff9ad5', rough=0.2, emissive=[1.0, 0.45, 0.8], strength=1.7),
        'orb_core': mat('#ffffff', rough=0.2, emissive=[1.0, 0.9, 1.0], strength=1.2)})
    # 떠다님 표시(보이지 않는 작은 조각 대신 꼬리 끝을 float_ 로)
    m.box('float_tail', 0, 0.25, -0.1, 0.24, 0.3, 0.24, 'ghost_light')
    # 유령 하체(연기처럼 좁아지는 층) → 몸통 로브
    for i, (w, y) in enumerate(((0.34, 0.5), (0.5, 0.78), (0.68, 1.04))):
        m.box(f'body_wisp{i}', 0, y, -0.04, w, 0.3, w * 0.9, 'ghost')
    m.box('body', 0, 1.45, 0, 0.88, 0.6, 0.7, 'robe')
    m.box('body_trim', 0, 1.18, 0, 0.92, 0.08, 0.74, 'robe_trim')
    m.box('body_collar', 0, 1.8, 0.04, 0.96, 0.14, 0.78, 'robe_dark')
    m.box('body_sash', 0.1, 1.45, 0.36, 0.2, 0.6, 0.04, 'robe_trim')
    # 팔(소매) + 손
    for sgn, side in ((1, 'left'), (-1, 'right')):
        x = sgn * 0.6
        m.box(f'{side}_arm', x, 1.5, 0.06, 0.3, 0.44, 0.34, 'robe')
        m.box(f'{side}_arm_sleeve', x, 1.2, 0.12, 0.36, 0.3, 0.4, 'robe_dark')
        m.box(f'{side}_arm_trim', x, 1.08, 0.12, 0.38, 0.06, 0.42, 'robe_trim')
        m.box(f'{side}_hand', x, 0.98, 0.18, 0.22, 0.2, 0.24, 'ghost_light')
    # 두건 + 어둠 속 눈
    m.box('head', 0, 2.2, 0.02, 0.8, 0.7, 0.76, 'robe')
    m.box('head_hood_top', 0, 2.62, -0.08, 0.6, 0.2, 0.6, 'robe_dark')
    m.box('head_hood_peak', 0, 2.8, -0.2, 0.3, 0.2, 0.3, 'robe_dark')
    m.box('head_face', 0, 2.14, 0.3, 0.56, 0.5, 0.2, 'leather_dark')
    eyes(m, 'head', 0, 2.2, 0.42, 0.15, 0.16, white='eye_glow', glow=True)
    m.box('head_hood_trim', 0, 1.9, 0.3, 0.7, 0.08, 0.26, 'robe_trim')
    # 지팡이 (오른손, 앞으로 기울임) + 발광 구슬
    hx, hy, hz = -0.6, 0.98, 0.18
    m.box('weapon_staff', hx, hy + 0.1, hz + 0.5, 0.1, 0.1, 1.3, 'wood_dark')
    m.box('weapon_staff_wrap', hx, hy + 0.1, hz + 0.2, 0.14, 0.14, 0.2, 'rope')
    m.box('weapon_claw_l', hx + 0.12, hy + 0.14, hz + 1.2, 0.08, 0.08, 0.26, 'iron_dark')
    m.box('weapon_claw_r', hx - 0.12, hy + 0.14, hz + 1.2, 0.08, 0.08, 0.26, 'iron_dark')
    m.box('weapon_orb', hx, hy + 0.14, hz + 1.3, 0.3, 0.3, 0.3, 'orb')
    m.box('weapon_orb_core', hx, hy + 0.14, hz + 1.3, 0.14, 0.14, 0.14, 'orb_core')
    return m


# ---------------------------------------------------------------- 트롤 거인
def build_troll():
    m = VoxelModel('troll', {**COMMON,
        'skin': mat('#5f7f8f', rough=0.9), 'skin_dark': mat('#44606e', rough=0.9), 'skin_light': mat('#7b9aa8', rough=0.9),
        'fur': mat('#3b2a1c', rough=0.98), 'cloth': mat('#4a3b6b', rough=0.95),
        'eye_glow': mat('#ff6a3d', rough=0.3, emissive=[1.0, 0.35, 0.15], strength=1.2),
        'glow': mat('#9ad0ff', rough=0.3, emissive=[0.4, 0.7, 1.0], strength=1.2)})
    # 굵은 다리 + 큰 발
    for sgn, side in ((1, 'left'), (-1, 'right')):
        x = sgn * 0.5
        m.box(f'{side}_leg', x, 0.95, 0, 0.62, 0.9, 0.66, 'skin')
        m.box(f'{side}_leg_wrap', x, 1.2, 0, 0.66, 0.26, 0.7, 'cloth')
        m.box(f'{side}_leg_fur', x, 0.62, 0, 0.66, 0.2, 0.7, 'fur')
        m.box(f'{side}_foot', x, 0.2, 0.14, 0.66, 0.4, 0.9, 'skin_dark')
        for i in range(3):
            m.box(f'{side}_foot_toe{i}', x + (i - 1) * 0.2, 0.16, 0.64, 0.16, 0.24, 0.16, 'tooth')
    # 거대한 몸통 (어깨가 넓고 굽음) + 배 + 털 조끼
    m.box('body', 0, 2.1, 0.0, 1.9, 1.5, 1.2, 'skin')
    m.box('body_belly', 0, 1.75, 0.5, 1.2, 0.8, 0.3, 'skin_light')
    m.box('body_vest', 0, 2.35, 0.0, 1.98, 0.7, 1.28, 'fur')
    m.box('body_vest_strap', 0, 2.0, 0.62, 0.3, 1.1, 0.06, 'leather')
    m.box('body_belt', 0, 1.4, 0, 1.96, 0.2, 1.26, 'leather')
    m.box('body_belt_buckle', 0, 1.4, 0.65, 0.3, 0.26, 0.06, 'iron')
    m.box('body_hump', 0, 2.95, -0.3, 1.3, 0.4, 0.8, 'skin_dark')
    # 팔: 긴 팔, 주먹이 땅 가까이
    for sgn, side in ((1, 'left'), (-1, 'right')):
        x = sgn * 1.2
        m.box(f'{side}_arm', x, 2.3, 0.05, 0.58, 0.9, 0.62, 'skin')
        m.box(f'{side}_arm_band', x, 2.0, 0.05, 0.62, 0.16, 0.66, 'iron_dark')
        m.box(f'{side}_arm_fore', x, 1.4, 0.15, 0.54, 0.9, 0.58, 'skin_dark')
        m.box(f'{side}_hand', x, 0.85, 0.22, 0.6, 0.44, 0.62, 'skin_light')
        for i in range(3):
            m.box(f'{side}_hand_knuckle{i}', x + (i - 1) * 0.18, 0.98, 0.52, 0.14, 0.14, 0.1, 'skin_dark')
    # 작은 머리 (몸에 파묻힘), 아래턱 송곳니, 작은 눈, 뿔
    m.box('head', 0, 3.2, 0.3, 0.9, 0.7, 0.86, 'skin')
    m.box('head_jaw', 0, 2.9, 0.45, 0.8, 0.26, 0.7, 'skin_dark')
    m.mirror('mouth_tooth_l', 'mouth_tooth_r', 0.26, 3.05, 0.8, 0.12, 0.3, 0.12, 'tooth')
    eyes(m, 'head', 0, 3.3, 0.72, 0.2, 0.16, white='eye_glow', glow=True)
    m.box('head_brow', 0, 3.44, 0.7, 0.8, 0.12, 0.14, 'skin_dark')
    m.box('nose', 0, 3.15, 0.78, 0.26, 0.2, 0.16, 'skin_light')
    m.mirror('head_horn_l', 'head_horn_r', 0.4, 3.6, 0.2, 0.18, 0.3, 0.18, 'tooth')
    m.mirror('head_horn_tip_l', 'head_horn_tip_r', 0.48, 3.82, 0.2, 0.12, 0.2, 0.12, 'tooth')
    # 방패 (왼손, 앞) : 나무판 + 쇠테 + 중앙 발광 룬
    m.box('shield', 1.2, 1.3, 1.0, 1.4, 1.8, 0.18, 'wood')
    m.box('shield_rim_top', 1.2, 2.15, 1.0, 1.46, 0.12, 0.22, 'iron')
    m.box('shield_rim_bottom', 1.2, 0.45, 1.0, 1.46, 0.12, 0.22, 'iron')
    m.box('shield_rim_l', 1.87, 1.3, 1.0, 0.12, 1.8, 0.22, 'iron')
    m.box('shield_rim_r', 0.53, 1.3, 1.0, 0.12, 1.8, 0.22, 'iron')
    m.box('shield_boss', 1.2, 1.3, 1.1, 0.4, 0.4, 0.1, 'iron_dark')
    m.box('shield_rune', 1.2, 1.3, 1.16, 0.14, 0.5, 0.04, 'glow')
    m.box('shield_rune2', 1.2, 1.3, 1.16, 0.4, 0.12, 0.04, 'glow')
    # 도끼 (오른손, 앞) : 자루 + 쇠 날
    hx, hy, hz = -1.2, 0.85, 0.22
    m.box('weapon_haft', hx, hy, hz + 0.6, 0.16, 0.16, 1.4, 'wood_dark')
    m.box('weapon_head', hx - 0.3, hy, hz + 1.15, 0.5, 0.9, 0.3, 'iron')
    m.box('weapon_edge', hx - 0.6, hy, hz + 1.15, 0.12, 1.1, 0.34, 'tooth')
    m.box('weapon_back_spike', hx + 0.22, hy, hz + 1.15, 0.3, 0.2, 0.2, 'iron_dark')
    m.box('weapon_wrap', hx, hy, hz + 0.1, 0.2, 0.2, 0.3, 'rope')
    return m


# ---------------------------------------------------------------- 동굴 박쥐 괴물
def build_cave_bat():
    m = VoxelModel('cave_bat', {**COMMON,
        'fur': mat('#5a3f8e', rough=0.95), 'fur_dark': mat('#3a2860', rough=0.95), 'fur_light': mat('#7c5fb8', rough=0.95),
        'wing': mat('#2b1d4a', 0.92, rough=0.8, blend=True), 'wing_bone': mat('#8e6cff', rough=0.7),
        'eye_glow': mat('#ff5fd2', rough=0.3, emissive=[1.0, 0.3, 0.8], strength=1.5),
        'glow': mat('#ff9af0', rough=0.3, emissive=[1.0, 0.5, 0.9], strength=1.3)})
    # 몸통(털) + 가슴 + 짧은 다리(갈고리 발)
    m.box('body', 0, 1.05, 0, 0.7, 0.6, 0.8, 'fur')
    m.box('body_chest', 0, 0.98, 0.3, 0.5, 0.36, 0.26, 'fur_light')
    m.box('body_back', 0, 1.3, -0.1, 0.5, 0.16, 0.5, 'fur_dark')
    for sgn, side in ((1, 'l'), (-1, 'r')):
        m.box(f'leg_{side}', sgn * 0.18, 0.66, 0.1, 0.14, 0.24, 0.14, 'fur_dark')
        m.box(f'leg_{side}_claw', sgn * 0.18, 0.5, 0.2, 0.18, 0.1, 0.3, 'tooth')
    # 머리: 큰 귀, 코, 눈, 송곳니
    m.box('head', 0, 1.42, 0.36, 0.66, 0.5, 0.56, 'fur')
    m.box('head_snout', 0, 1.32, 0.68, 0.3, 0.24, 0.16, 'fur_light')
    m.box('nose', 0, 1.36, 0.78, 0.14, 0.1, 0.06, 'leather_dark')
    eyes(m, 'head', 0, 1.5, 0.64, 0.17, 0.16, white='eye_glow', glow=True)
    m.mirror('mouth_tooth_l', 'mouth_tooth_r', 0.1, 1.2, 0.68, 0.06, 0.16, 0.06, 'tooth')
    for sgn, side in ((1, 'l'), (-1, 'r')):
        m.box(f'ear_{side}', sgn * 0.26, 1.82, 0.3, 0.2, 0.4, 0.14, 'fur')
        m.box(f'ear_{side}_inner', sgn * 0.26, 1.8, 0.36, 0.1, 0.28, 0.04, 'fur_light')
        m.box(f'ear_{side}_tip', sgn * 0.3, 2.08, 0.3, 0.12, 0.14, 0.1, 'fur_dark')
    # 날개: 뼈대(팔 + 손가락뼈 3개) + 막, 안쪽 모서리가 관절
    for sgn, side in ((1, 'l'), (-1, 'r')):
        bx = sgn * 0.35
        m.box(f'wing_{side}_arm', bx + sgn * 0.5, 1.3, 0.0, 1.0, 0.12, 0.12, 'wing_bone')
        m.box(f'wing_{side}_elbow', bx + sgn * 1.0, 1.32, 0.0, 0.16, 0.16, 0.16, 'fur_dark')
        for i, (fx, fz, fl) in enumerate(((1.2, -0.3, 0.9), (1.35, -0.1, 1.1), (1.4, 0.15, 1.0))):
            m.box(f'wing_{side}_finger{i}', bx + sgn * (1.0 + fl / 2 * 0.3), 1.3 - i * 0.02, fz, fl * 0.6, 0.07, 0.07, 'wing_bone')
        m.box(f'wing_{side}_membrane', bx + sgn * 0.95, 1.26, -0.15, 1.9, 0.04, 0.9, 'wing')
        m.box(f'wing_{side}_membrane2', bx + sgn * 1.5, 1.25, 0.1, 0.8, 0.04, 0.5, 'wing')
        m.box(f'wing_{side}_tip', bx + sgn * 1.95, 1.28, -0.4, 0.14, 0.1, 0.3, 'wing_bone')
    # 분홍 발광 무늬(가슴)
    m.box('glow_mark', 0, 1.0, 0.44, 0.14, 0.14, 0.04, 'glow')
    return m


# ---------------------------------------------------------------- 돌 골렘 투석병
def build_stone_golem():
    m = VoxelModel('stone_golem', {**COMMON,
        'stone': mat('#7d6f66', rough=0.95), 'stone_dark': mat('#5a4f48', rough=0.95), 'stone_light': mat('#9c8e84', rough=0.95),
        'moss': mat('#4f7a3a', rough=0.95), 'lava': mat('#ff7a2a', rough=0.5, emissive=[1.0, 0.4, 0.1], strength=1.6),
        'eye_glow': mat('#ffb347', rough=0.3, emissive=[1.0, 0.6, 0.15], strength=1.5)})
    rng = random.Random(5)
    # 다리: 바위 덩어리 쌓기
    for sgn, side in ((1, 'left'), (-1, 'right')):
        x = sgn * 0.55
        m.box(f'{side}_leg', x, 0.95, 0, 0.7, 0.8, 0.7, 'stone')
        m.box(f'{side}_leg_knee', x, 1.3, 0.1, 0.6, 0.3, 0.6, 'stone_dark')
        m.box(f'{side}_leg_crack', x + sgn * 0.3, 0.9, 0.1, 0.12, 0.3, 0.1, 'lava')
        m.box(f'{side}_foot', x, 0.25, 0.1, 0.84, 0.5, 0.9, 'stone_dark')
        m.box(f'{side}_foot_moss', x, 0.52, -0.1, 0.5, 0.06, 0.4, 'moss')
    # 몸통: 큰 바위 + 균열(용암) + 이끼
    m.box('body', 0, 2.1, 0, 1.9, 1.4, 1.3, 'stone')
    m.box('body_top', 0, 2.9, -0.1, 1.5, 0.3, 1.0, 'stone_light')
    m.box('body_chest', 0, 2.2, 0.68, 1.0, 0.8, 0.1, 'stone_dark')
    m.box('body_core', 0, 2.2, 0.72, 0.3, 0.5, 0.08, 'lava')
    m.box('body_crack_a', 0.55, 2.4, 0.68, 0.1, 0.5, 0.06, 'lava')
    m.box('body_crack_b', -0.5, 1.9, 0.68, 0.1, 0.4, 0.06, 'lava')
    m.box('body_moss', 0.4, 2.98, 0.2, 0.6, 0.1, 0.5, 'moss')
    for i in range(6):
        m.box(f'body_rock{i}', rng.uniform(-0.8, 0.8), rng.uniform(1.6, 2.8), -0.7, rng.uniform(0.2, 0.4), rng.uniform(0.2, 0.4), 0.14, 'stone_light')
    # 팔: 큰 바위 팔, 오른손에 던질 바위(weapon_)
    for sgn, side in ((1, 'left'), (-1, 'right')):
        x = sgn * 1.25
        m.box(f'{side}_arm', x, 2.4, 0.0, 0.7, 0.8, 0.74, 'stone')
        m.box(f'{side}_arm_fore', x, 1.6, 0.1, 0.64, 0.8, 0.68, 'stone_dark')
        m.box(f'{side}_arm_crack', x + sgn * 0.3, 1.7, 0.1, 0.1, 0.4, 0.1, 'lava')
        m.box(f'{side}_hand', x, 1.05, 0.2, 0.7, 0.4, 0.74, 'stone_light')
    # 머리: 낮고 넓은 바위, 눈 틈새 발광
    m.box('head', 0, 3.3, 0.2, 1.0, 0.5, 0.9, 'stone_dark')
    m.box('head_top', 0, 3.6, 0.1, 0.7, 0.16, 0.6, 'stone')
    eyes(m, 'head', 0, 3.3, 0.66, 0.22, 0.2, white='eye_glow', glow=True)
    m.box('mouth', 0, 3.1, 0.66, 0.5, 0.08, 0.06, 'lava')
    # 던질 바위 (오른손 위에 들고 있음)
    m.box('weapon_rock', -1.25, 1.5, 0.6, 0.7, 0.6, 0.7, 'stone_light')
    m.box('weapon_rock2', -1.1, 1.75, 0.5, 0.4, 0.3, 0.4, 'stone')
    m.box('weapon_rock_vein', -1.25, 1.5, 0.96, 0.3, 0.1, 0.04, 'lava')
    return m


MONSTERS = {
    'rusher': build_goblin,
    'shooter': build_ghost_mage,
    'tank': build_troll,
    'stalker': build_cave_bat,
    'artillery': build_stone_golem,
}

if __name__ == '__main__':
    for key, build in MONSTERS.items():
        build().export(OUT / f'monster-{key}.glb')
