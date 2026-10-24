#!/usr/bin/env python3
"""
보스 3종 복셀 모델 생성기 → public/models/boss-*.glb
실행: python3 tools/make_bosses_glb.py
- guardian → 숲의 수호 로봇(이끼 낀 고대 석상 로봇, 큰 망치) / golem → 수정 골렘(보라 수정이 박힌 바위 거인, 주먹) /
  commander → 요새 사령관(붉은 강철 전투 로봇, 어깨 포탑·팔 대포)
- 몬스터와 같은 부품 이름 규칙(left_leg/right_leg/left_arm/right_arm/head + weapon_* + eye_* + glow_*)을 써서
  적 리그가 걷기·공격 예고(무기 팔 치켜들기)·휘두르기를 만든다. glow_* 는 예고 때 밝아지고, eye_* 는 2단계에서 붉게 바뀐다(Boss.ts).
- 정면은 +Z. 높이 ~6 으로 그리고, 게임이 보스 반지름(×3)에 맞춰 다시 조정한다.
"""
import random
from pathlib import Path
from voxel_glb import VoxelModel, mat

OUT = Path(__file__).resolve().parent.parent / 'public' / 'models'

COMMON = {
    'iron': mat('#8b94a3', rough=0.4, metal=0.7),
    'iron_dark': mat('#464c59', rough=0.5, metal=0.6),
    'steel_black': mat('#23262e', rough=0.45, metal=0.7),
    'gold': mat('#e3b23c', rough=0.4, metal=0.6),
    'bronze': mat('#a7753a', rough=0.5, metal=0.6),
    'bronze_dark': mat('#6e4a22', rough=0.6, metal=0.5),
    'wood': mat('#6b4a2b', rough=0.9),
    'wood_dark': mat('#4a3119', rough=0.9),
    'rope': mat('#b89b6a', rough=0.95),
    'bone': mat('#efe9d6', rough=0.6),
}


def glow_eyes(m, y, z, gap, w, h, material='eye_glow'):
    """발광 눈 한 쌍 (eye_l / eye_r → 머리와 함께 움직이고, 2단계에서 붉게 바뀐다)"""
    m.box('eye_l', +gap, y, z, w, h, 0.08, material)
    m.box('eye_r', -gap, y, z, w, h, 0.08, material)


# ---------------------------------------------------------------- 숲의 수호 로봇
def build_guardian():
    m = VoxelModel('boss_guardian', {**COMMON,
        'stone': mat('#7a8a7c', rough=0.95), 'stone_dark': mat('#55645a', rough=0.95), 'stone_light': mat('#9aa89a', rough=0.95),
        'moss': mat('#4f8a3a', rough=0.95), 'moss_light': mat('#7ab84f', rough=0.95),
        'leaf': mat('#3f8f5f', rough=0.9), 'leaf_dark': mat('#2d6b45', rough=0.9),
        'vine': mat('#3b6b2a', rough=0.95),
        'eye_glow': mat('#5cf2d8', rough=0.3, emissive=[0.36, 0.95, 0.85], strength=1.6),
        'core': mat('#9af7e8', rough=0.3, emissive=[0.5, 1.0, 0.9], strength=1.5),
        'rune': mat('#7fe9d0', rough=0.3, emissive=[0.4, 0.9, 0.8], strength=1.2)})
    rng = random.Random(11)
    # 다리: 돌기둥 같은 두꺼운 다리 + 뿌리처럼 감긴 덩굴 + 넓은 발
    for sgn, side in ((1, 'left'), (-1, 'right')):
        x = sgn * 0.85
        m.box(f'{side}_leg', x, 1.75, 0, 1.0, 1.5, 1.0, 'stone')
        m.box(f'{side}_leg_knee', x, 2.3, 0.18, 0.9, 0.5, 0.86, 'bronze_dark')
        m.box(f'{side}_leg_shin', x, 1.3, 0.2, 0.7, 0.9, 0.7, 'stone_dark')
        m.box(f'{side}_leg_vine', x + sgn * 0.3, 1.6, 0.3, 0.16, 1.1, 0.16, 'vine')
        m.box(f'{side}_leg_vine2', x - sgn * 0.2, 1.2, 0.46, 0.14, 0.7, 0.14, 'vine')
        m.box(f'{side}_leg_moss', x, 2.56, -0.1, 0.8, 0.1, 0.7, 'moss')
        m.box(f'{side}_foot', x, 0.3, 0.2, 1.2, 0.6, 1.5, 'stone_dark')
        m.box(f'{side}_foot_plate', x, 0.55, 0.5, 1.0, 0.16, 0.9, 'bronze')
        for i in range(3):
            m.box(f'{side}_foot_toe{i}', x + (i - 1) * 0.36, 0.25, 0.98, 0.3, 0.42, 0.2, 'stone_light')
    # 몸통: 넓은 가슴 바위 + 청동 흉갑 + 발광 코어 + 이끼
    m.box('body', 0, 3.9, 0, 3.0, 2.0, 1.8, 'stone')
    m.box('body_waist', 0, 2.75, 0, 2.0, 0.5, 1.4, 'stone_dark')
    m.box('body_belt', 0, 2.75, 0, 2.1, 0.3, 1.5, 'bronze_dark')
    m.box('body_plate', 0, 4.0, 0.92, 2.2, 1.5, 0.16, 'bronze')
    m.box('body_plate_rim', 0, 4.78, 0.92, 2.4, 0.16, 0.2, 'gold')
    m.box('body_core_frame', 0, 3.95, 1.02, 0.9, 0.9, 0.08, 'bronze_dark')
    m.box('glow_core', 0, 3.95, 1.07, 0.6, 0.6, 0.08, 'core')
    m.box('body_rune_a', 0.8, 4.3, 1.02, 0.12, 0.6, 0.06, 'rune')
    m.box('body_rune_b', -0.8, 3.7, 1.02, 0.12, 0.5, 0.06, 'rune')
    m.box('body_top', 0, 4.95, -0.2, 2.4, 0.3, 1.2, 'stone_light')
    m.box('body_moss_top', 0.3, 5.12, -0.2, 1.6, 0.1, 0.9, 'moss')
    m.box('body_moss_side', 1.5, 4.2, 0.1, 0.12, 1.0, 0.8, 'moss_light')
    m.box('body_back', 0, 3.9, -0.95, 2.0, 1.6, 0.3, 'stone_dark')
    for i in range(6):
        m.box(f'body_pebble{i}', rng.uniform(-1.3, 1.3), rng.uniform(3.2, 4.6), 0.92 + rng.uniform(0, 0.04), 0.18, 0.18, 0.1, 'stone_light')
    # 어깨 바위 + 새싹
    for sgn, side in ((1, 'l'), (-1, 'r')):
        m.box(f'body_shoulder_{side}', sgn * 1.75, 4.95, 0, 1.1, 0.7, 1.3, 'stone')
        m.box(f'body_shoulder_{side}_plate', sgn * 1.75, 5.35, 0, 1.0, 0.14, 1.2, 'bronze')
        m.box(f'body_shoulder_{side}_leaf', sgn * 1.9, 5.55, 0.1, 0.4, 0.3, 0.3, 'leaf')
    # 팔: 두꺼운 돌 팔, 손목 청동 고리, 큰 주먹. 오른손엔 거대한 돌 망치
    for sgn, side in ((1, 'left'), (-1, 'right')):
        x = sgn * 1.9
        m.box(f'{side}_arm', x, 4.1, 0.1, 0.8, 1.3, 0.84, 'stone')
        m.box(f'{side}_arm_band', x, 3.5, 0.1, 0.86, 0.22, 0.9, 'bronze')
        m.box(f'{side}_arm_fore', x, 2.75, 0.2, 0.74, 1.3, 0.78, 'stone_dark')
        m.box(f'{side}_arm_vine', x + sgn * 0.3, 2.9, 0.3, 0.14, 0.9, 0.14, 'vine')
        m.box(f'{side}_hand', x, 1.9, 0.3, 0.86, 0.6, 0.9, 'stone_light')
        for i in range(3):
            m.box(f'{side}_hand_knuckle{i}', x + (i - 1) * 0.26, 2.05, 0.74, 0.2, 0.2, 0.12, 'stone_dark')
    # 머리: 투구 같은 돌 머리, 사슴뿔 모양 나뭇가지 왕관, 발광 눈
    m.box('head', 0, 5.6, 0.3, 1.3, 1.0, 1.2, 'stone')
    m.box('head_visor', 0, 5.6, 0.86, 1.1, 0.5, 0.14, 'bronze_dark')
    glow_eyes(m, 5.62, 0.94, 0.3, 0.26, 0.18)
    m.box('head_brow', 0, 5.86, 0.9, 1.2, 0.14, 0.14, 'bronze')
    m.box('head_jaw', 0, 5.2, 0.5, 1.0, 0.24, 0.8, 'stone_dark')
    m.box('head_crown', 0, 6.15, 0.2, 1.1, 0.18, 1.0, 'gold')
    for sgn, side in ((1, 'l'), (-1, 'r')):
        m.box(f'head_antler_{side}', sgn * 0.5, 6.5, 0.1, 0.18, 0.6, 0.18, 'wood_dark')
        m.box(f'head_antler_{side}_branch', sgn * 0.75, 6.85, 0.1, 0.16, 0.5, 0.16, 'wood_dark')
        m.box(f'head_antler_{side}_tip', sgn * 0.45, 6.95, 0.1, 0.14, 0.4, 0.14, 'wood')
        m.box(f'head_antler_{side}_leaf', sgn * 0.8, 7.15, 0.1, 0.34, 0.2, 0.3, 'leaf')
        m.box(f'head_antler_{side}_leaf2', sgn * 0.45, 7.2, 0.14, 0.26, 0.16, 0.24, 'leaf_dark')
    m.box('head_moss', 0, 6.24, 0.4, 0.5, 0.08, 0.5, 'moss_light')
    # 망치 (오른손, 앞) : 긴 돌 자루 + 거대한 돌 머리 + 청동 테 + 룬
    hx, hy, hz = -1.9, 1.9, 0.3
    m.box('weapon_haft', hx, hy, hz + 1.3, 0.26, 0.26, 2.8, 'wood_dark')
    m.box('weapon_grip', hx, hy, hz + 0.3, 0.32, 0.32, 0.5, 'rope')
    m.box('weapon_head', hx, hy, hz + 2.7, 1.5, 1.1, 1.0, 'stone')
    m.box('weapon_head_rim_a', hx, hy, hz + 2.26, 1.56, 1.16, 0.14, 'bronze')
    m.box('weapon_head_rim_b', hx, hy, hz + 3.14, 1.56, 1.16, 0.14, 'bronze')
    m.box('weapon_rune', hx, hy + 0.1, hz + 2.7, 1.54, 0.16, 0.6, 'rune')
    m.box('weapon_rune2', hx, hy - 0.2, hz + 2.7, 0.4, 0.16, 1.04, 'rune')
    m.box('weapon_moss', hx, hy + 0.56, hz + 2.6, 0.9, 0.08, 0.6, 'moss')
    return m


# ---------------------------------------------------------------- 수정 골렘
def build_golem():
    m = VoxelModel('boss_golem', {**COMMON,
        'rock': mat('#4b4660', rough=0.95), 'rock_dark': mat('#332f45', rough=0.95), 'rock_light': mat('#6a6485', rough=0.95),
        'crystal': mat('#8f6cff', rough=0.2, emissive=[0.35, 0.22, 0.8], strength=0.8),
        'crystal_light': mat('#c9b6ff', rough=0.15, emissive=[0.55, 0.45, 1.0], strength=1.0),
        'crystal_glow': mat('#b48cff', rough=0.2, emissive=[0.6, 0.4, 1.0], strength=1.6),
        'eye_glow': mat('#d9c8ff', rough=0.3, emissive=[0.8, 0.7, 1.0], strength=1.8)})
    rng = random.Random(7)
    # 다리: 굵고 짧은 바위 다리, 무릎 수정
    for sgn, side in ((1, 'left'), (-1, 'right')):
        x = sgn * 0.95
        m.box(f'{side}_leg', x, 1.7, 0, 1.2, 1.3, 1.2, 'rock')
        m.box(f'{side}_leg_knee', x, 2.1, 0.5, 0.6, 0.6, 0.4, 'crystal')
        m.box(f'{side}_leg_shin', x, 1.1, 0.1, 1.0, 0.8, 1.0, 'rock_dark')
        m.box(f'{side}_foot', x, 0.35, 0.2, 1.4, 0.7, 1.6, 'rock_dark')
        m.box(f'{side}_foot_top', x, 0.75, 0.0, 1.1, 0.14, 1.2, 'rock_light')
        for i in range(3):
            m.box(f'{side}_foot_toe{i}', x + (i - 1) * 0.42, 0.3, 1.05, 0.34, 0.5, 0.26, 'crystal')
    # 몸통: 둥글게 쌓은 바위 덩어리 + 가슴 거대 수정 + 등의 수정 산맥
    m.box('body', 0, 3.9, 0, 3.2, 2.2, 2.2, 'rock')
    m.box('body_upper', 0, 4.6, -0.1, 3.5, 1.0, 2.0, 'rock_light')
    m.box('body_lower', 0, 3.0, 0.1, 2.6, 0.7, 1.9, 'rock_dark')
    m.box('body_waist', 0, 2.6, 0, 2.2, 0.5, 1.6, 'rock')
    m.box('body_chest', 0, 4.0, 1.12, 1.3, 1.3, 0.3, 'rock_dark')
    m.box('glow_heart', 0, 4.0, 1.3, 0.8, 1.0, 0.3, 'crystal_glow')
    m.box('glow_heart_core', 0, 4.0, 1.46, 0.36, 0.5, 0.1, 'crystal_light')
    for i in range(7):
        a = -1.2 + i * 0.4
        m.box(f'body_spine{i}', a, 5.2 + abs(a) * -0.35 + 0.35, -0.7, 0.44, 0.9 + (i % 2) * 0.4, 0.44, 'crystal')
        m.box(f'body_spine{i}_tip', a, 5.85 + abs(a) * -0.35 + (i % 2) * 0.4, -0.7, 0.26, 0.4, 0.26, 'crystal_light')
    for i in range(8):
        m.box(f'body_shard{i}', rng.uniform(-1.5, 1.5), rng.uniform(3.1, 4.8), 1.12 + rng.uniform(0, 0.06), 0.22, rng.uniform(0.3, 0.6), 0.14, 'crystal')
    for i in range(5):
        m.box(f'body_crack{i}', rng.uniform(-1.4, 1.4), rng.uniform(3.3, 4.7), 1.15, 0.1, rng.uniform(0.3, 0.7), 0.04, 'crystal_glow')
    # 어깨: 거대한 수정 뿔
    for sgn, side in ((1, 'l'), (-1, 'r')):
        m.box(f'body_shoulder_{side}', sgn * 1.95, 5.0, 0, 1.3, 0.9, 1.5, 'rock_light')
        m.box(f'body_horn_{side}', sgn * 2.1, 5.9, -0.1, 0.6, 1.1, 0.6, 'crystal')
        m.box(f'body_horn_{side}_mid', sgn * 2.3, 6.6, -0.1, 0.44, 0.7, 0.44, 'crystal')
        m.box(f'body_horn_{side}_tip', sgn * 2.45, 7.1, -0.1, 0.26, 0.5, 0.26, 'crystal_light')
    # 팔: 땅까지 닿는 긴 바위 팔, 수정 주먹 (무기 없음 → 리그가 오른팔을 휘두름)
    for sgn, side in ((1, 'left'), (-1, 'right')):
        x = sgn * 2.2
        m.box(f'{side}_arm', x, 4.0, 0.1, 1.0, 1.4, 1.0, 'rock')
        m.box(f'{side}_arm_crystal', x + sgn * 0.45, 4.1, 0.2, 0.3, 0.7, 0.3, 'crystal')
        m.box(f'{side}_arm_fore', x, 2.6, 0.2, 0.94, 1.5, 0.94, 'rock_dark')
        m.box(f'{side}_hand', x, 1.5, 0.35, 1.3, 1.0, 1.3, 'rock_light')
        for i in range(4):
            m.box(f'{side}_hand_spike{i}', x + (i - 1.5) * 0.3, 1.65, 1.0, 0.22, 0.34, 0.3, 'crystal')
        m.box(f'{side}_hand_glow', x, 1.5, 1.0, 0.5, 0.3, 0.06, 'crystal_glow')
    # 머리: 몸에 파묻힌 낮은 바위 머리, 수정 왕관, 세 눈
    m.box('head', 0, 5.65, 0.4, 1.5, 0.9, 1.3, 'rock_dark')
    m.box('head_top', 0, 6.15, 0.3, 1.1, 0.2, 1.0, 'rock')
    glow_eyes(m, 5.72, 1.06, 0.4, 0.3, 0.22)
    m.box('eye_center', 0, 5.95, 1.06, 0.2, 0.24, 0.08, 'eye_glow')
    m.box('mouth', 0, 5.35, 1.04, 0.7, 0.1, 0.06, 'crystal_glow')
    m.box('head_crown', 0, 6.5, 0.2, 0.5, 0.6, 0.5, 'crystal')
    m.box('head_crown_tip', 0, 6.95, 0.2, 0.3, 0.4, 0.3, 'crystal_light')
    m.box('head_crown_l', 0.5, 6.4, 0.3, 0.3, 0.4, 0.3, 'crystal')
    m.box('head_crown_r', -0.5, 6.4, 0.3, 0.3, 0.4, 0.3, 'crystal')
    return m


# ---------------------------------------------------------------- 요새 사령관
def build_commander():
    m = VoxelModel('boss_commander', {**COMMON,
        'armor': mat('#c0392b', rough=0.45, metal=0.5), 'armor_dark': mat('#7d2219', rough=0.5, metal=0.5),
        'armor_light': mat('#e05a4a', rough=0.4, metal=0.5),
        'cape': mat('#3a1b2e', rough=0.95), 'cape_trim': mat('#e3b23c', rough=0.5, metal=0.4),
        'eye_glow': mat('#ff6b3d', rough=0.3, emissive=[1.0, 0.35, 0.15], strength=1.7),
        'vent': mat('#ff9a3d', rough=0.4, emissive=[1.0, 0.5, 0.15], strength=1.4),
        'muzzle': mat('#ffd08a', rough=0.3, emissive=[1.0, 0.7, 0.3], strength=1.2)})
    # 다리: 각진 강철 다리, 피스톤 느낌의 종아리, 묵직한 발판
    for sgn, side in ((1, 'left'), (-1, 'right')):
        x = sgn * 0.9
        m.box(f'{side}_leg', x, 1.9, 0, 1.0, 1.4, 1.0, 'armor')
        m.box(f'{side}_leg_knee', x, 2.45, 0.3, 0.9, 0.5, 0.7, 'steel_black')
        m.box(f'{side}_leg_shin', x, 1.2, 0.15, 0.6, 1.0, 0.6, 'iron_dark')
        m.box(f'{side}_leg_piston_a', x + sgn * 0.3, 1.3, 0.38, 0.14, 0.9, 0.14, 'iron')
        m.box(f'{side}_leg_piston_b', x - sgn * 0.3, 1.3, 0.38, 0.14, 0.9, 0.14, 'iron')
        m.box(f'{side}_leg_shield', x, 1.5, 0.5, 0.9, 1.1, 0.14, 'armor_dark')
        m.box(f'{side}_foot', x, 0.3, 0.2, 1.2, 0.6, 1.6, 'steel_black')
        m.box(f'{side}_foot_plate', x, 0.62, 0.3, 1.1, 0.1, 1.3, 'iron')
        m.box(f'{side}_foot_claw', x, 0.3, 1.05, 0.9, 0.5, 0.2, 'iron_dark')
    # 몸통: 넓고 각진 흉부, 중앙 사령관 휘장, 측면 배기구(발광), 망토
    m.box('body', 0, 4.0, 0, 3.4, 2.2, 1.9, 'armor')
    m.box('body_waist', 0, 2.8, 0, 2.2, 0.5, 1.4, 'steel_black')
    m.box('body_belt', 0, 2.8, 0.74, 2.0, 0.3, 0.1, 'gold')
    m.box('body_chest_l', 0.75, 4.3, 0.98, 1.2, 1.2, 0.16, 'armor_light')
    m.box('body_chest_r', -0.75, 4.3, 0.98, 1.2, 1.2, 0.16, 'armor_light')
    m.box('body_chest_center', 0, 4.0, 1.0, 0.5, 1.8, 0.2, 'steel_black')
    m.box('body_emblem', 0, 4.4, 1.12, 0.6, 0.6, 0.06, 'gold')
    m.box('body_emblem_bar', 0, 4.4, 1.16, 0.2, 0.9, 0.04, 'armor_dark')
    m.box('body_lower_plate', 0, 3.2, 0.98, 2.4, 0.5, 0.14, 'armor_dark')
    for sgn, side in ((1, 'l'), (-1, 'r')):
        m.box(f'body_vent_{side}', sgn * 1.75, 3.6, 0.2, 0.2, 0.9, 1.0, 'steel_black')
        for i in range(3):
            m.box(f'glow_vent_{side}{i}', sgn * 1.86, 3.3 + i * 0.3, 0.2, 0.06, 0.12, 0.8, 'vent')
    m.box('body_back', 0, 4.1, -1.0, 2.6, 1.8, 0.3, 'steel_black')
    m.box('body_thruster_l', 0.8, 4.5, -1.25, 0.6, 0.6, 0.3, 'iron_dark')
    m.box('body_thruster_r', -0.8, 4.5, -1.25, 0.6, 0.6, 0.3, 'iron_dark')
    m.box('glow_thruster_l', 0.8, 4.5, -1.42, 0.4, 0.4, 0.06, 'vent')
    m.box('glow_thruster_r', -0.8, 4.5, -1.42, 0.4, 0.4, 0.06, 'vent')
    m.box('body_cape', 0, 2.9, -1.2, 2.4, 3.4, 0.14, 'cape')
    m.box('body_cape_trim', 0, 1.3, -1.2, 2.4, 0.2, 0.16, 'cape_trim')
    # 어깨: 큰 견갑 + 포탑(포신 2개) — 머리 옆이라 head_ 가 아닌 body_ 로 (몸과 함께)
    for sgn, side in ((1, 'l'), (-1, 'r')):
        m.box(f'body_pauldron_{side}', sgn * 2.0, 5.0, 0, 1.3, 0.9, 1.5, 'armor')
        m.box(f'body_pauldron_{side}_trim', sgn * 2.0, 5.5, 0, 1.2, 0.14, 1.4, 'gold')
        m.box(f'body_pauldron_{side}_stripe', sgn * 2.55, 5.0, 0, 0.14, 0.7, 1.3, 'armor_light')
        m.box(f'body_turret_{side}', sgn * 1.9, 5.85, -0.2, 0.7, 0.5, 0.8, 'steel_black')
        m.box(f'body_turret_{side}_barrel_a', sgn * 2.05, 5.9, 0.5, 0.18, 0.18, 1.0, 'iron_dark')
        m.box(f'body_turret_{side}_barrel_b', sgn * 1.75, 5.9, 0.5, 0.18, 0.18, 1.0, 'iron_dark')
        m.box(f'body_turret_{side}_muzzle', sgn * 1.9, 5.9, 1.0, 0.56, 0.3, 0.08, 'muzzle')
    # 팔: 왼팔은 강철 주먹 + 전면 방패판, 오른팔은 대포(weapon_) 
    for sgn, side in ((1, 'left'), (-1, 'right')):
        x = sgn * 2.1
        m.box(f'{side}_arm', x, 4.1, 0.1, 0.9, 1.4, 0.9, 'armor')
        m.box(f'{side}_arm_joint', x, 3.4, 0.1, 0.7, 0.3, 0.7, 'steel_black')
        m.box(f'{side}_arm_fore', x, 2.7, 0.2, 0.84, 1.2, 0.84, 'iron_dark')
        m.box(f'{side}_arm_stripe', x + sgn * 0.44, 2.9, 0.2, 0.06, 0.8, 0.5, 'armor_light')
    m.box('left_hand', 2.1, 1.85, 0.3, 0.96, 0.6, 0.96, 'steel_black')
    for i in range(3):
        m.box(f'left_hand_knuckle{i}', 2.1 + (i - 1) * 0.3, 2.0, 0.78, 0.22, 0.22, 0.1, 'iron')
    m.box('left_hand_plate', 2.1, 2.6, 0.72, 1.1, 1.6, 0.14, 'armor_dark')
    m.box('left_hand_plate_trim', 2.1, 2.6, 0.8, 0.3, 1.4, 0.06, 'gold')
    # 오른팔 대포: 아래팔 끝에 큰 포신 + 탄창 + 발광 포구
    hx, hy, hz = -2.1, 2.1, 0.3
    m.box('weapon_cannon', hx, hy, hz + 0.5, 1.0, 1.0, 1.6, 'steel_black')
    m.box('weapon_cannon_ring', hx, hy, hz + 1.3, 1.1, 1.1, 0.2, 'gold')
    m.box('weapon_barrel', hx, hy, hz + 2.1, 0.7, 0.7, 1.4, 'iron_dark')
    m.box('weapon_barrel_tip', hx, hy, hz + 2.85, 0.8, 0.8, 0.2, 'iron')
    m.box('weapon_muzzle', hx, hy, hz + 2.96, 0.5, 0.5, 0.06, 'muzzle')
    m.box('weapon_mag', hx - 0.3, hy + 0.6, hz + 0.4, 0.5, 0.4, 0.8, 'armor_dark')
    m.box('weapon_vent', hx + 0.53, hy, hz + 0.6, 0.08, 0.5, 0.8, 'vent')
    # 머리: 투구형 머리, 바이저 눈, 지휘관 깃, 안테나
    m.box('head', 0, 5.65, 0.3, 1.3, 1.0, 1.2, 'armor')
    m.box('head_visor', 0, 5.65, 0.88, 1.2, 0.46, 0.1, 'steel_black')
    glow_eyes(m, 5.66, 0.95, 0.32, 0.36, 0.14)
    m.box('head_jaw', 0, 5.2, 0.5, 1.1, 0.24, 0.9, 'iron_dark')
    m.box('head_cheek_l', 0.68, 5.55, 0.5, 0.1, 0.7, 0.8, 'armor_dark')
    m.box('head_cheek_r', -0.68, 5.55, 0.5, 0.1, 0.7, 0.8, 'armor_dark')
    m.box('head_crest', 0, 6.3, 0.0, 0.26, 0.5, 1.3, 'gold')
    m.box('head_crest_plume', 0, 6.7, -0.3, 0.2, 0.5, 0.9, 'armor_light')
    m.box('head_antenna', 0.55, 6.5, -0.3, 0.08, 0.9, 0.08, 'iron')
    m.box('head_antenna_tip', 0.55, 7.0, -0.3, 0.14, 0.14, 0.14, 'vent')
    return m


BOSSES = {
    'guardian': build_guardian,
    'golem': build_golem,
    'commander': build_commander,
}

if __name__ == '__main__':
    for key, build in BOSSES.items():
        build().export(OUT / f'boss-{key}.glb')
