#!/usr/bin/env python3
"""
적 5종 복셀 모델 생성기 → public/models/enemy-*.glb
실행: python3 tools/make_enemies_glb.py
- 돌진 로봇(rusher) · 포격 드론(shooter) · 철벽 로봇(tank) · 박쥐 드론(stalker) · 요새 포대(artillery)
- 부품 이름 규칙(src/assets/PartRig.ts 의 적 리그): wheel_* 바퀴(이동 시 회전) / claw_l|r 집게(예고 때 벌어짐) /
  rotor_* 로터(항상 회전, 있으면 떠다님) / wing_l|r 날개(퍼덕임, 있으면 떠다님) / barrel_* 포신(예고 끝에 반동) /
  shield 방패(예고 때 들어 올림) / piston_* 피스톤(이동 시 펌프) / antenna_* 안테나(흔들림) / glow_* 발광(예고 때 밝아짐) /
  eye_* 눈(예고 때 커짐).
- 정면은 +Z. 크기는 게임이 충돌 반지름에 맞춰 다시 조정한다.
"""
from pathlib import Path
from voxel_glb import VoxelModel, mat

OUT = Path(__file__).resolve().parent.parent / 'public' / 'models'

COMMON = {
    'steel': mat('#9aa3b2', rough=0.4, metal=0.7),
    'steel_dark': mat('#4c5363', rough=0.5, metal=0.6),
    'black': mat('#1a1d26', rough=0.7, metal=0.3),
    'rubber': mat('#23262f', rough=0.95),
    'hub': mat('#c9d0dc', rough=0.4, metal=0.8),
    'eye_white': mat('#f7f3ea', rough=0.5),
    'pupil': mat('#15161d', rough=0.3),
    'warn_y': mat('#f2c94c', rough=0.6),
    'warn_k': mat('#2b2b2b', rough=0.6),
    'glass': mat('#8fd3ff', 0.6, rough=0.2, blend=True),
}


def build_rusher():
    m = VoxelModel('rusher', {**COMMON,
        'body': mat('#ff7a45', rough=0.6, metal=0.2), 'body_dark': mat('#c9552b', rough=0.6, metal=0.2),
        'body_light': mat('#ffa177', rough=0.6), 'glow': mat('#ffb08a', emissive=[1.0, 0.45, 0.2], strength=1.6)})
    # 몸통: 낮고 넓은 상자 + 앞뒤 경사 느낌의 층
    m.box('body', 0, 1.0, 0, 1.6, 1.0, 1.5, 'body')
    m.box('body_top', 0, 1.56, -0.1, 1.2, 0.16, 1.1, 'body_dark')
    m.box('body_front', 0, 0.95, 0.8, 1.2, 0.6, 0.12, 'body_dark')
    m.box('body_bumper', 0, 0.62, 0.86, 1.5, 0.2, 0.16, 'steel_dark')
    m.mirror('body_side_l', 'body_side_r', 0.82, 1.05, -0.1, 0.08, 0.6, 1.0, 'body_light')
    m.box('base', 0, 0.42, 0, 1.85, 0.4, 1.8, 'black')
    # 경고 줄무늬 (뒤쪽)
    for i in range(4):
        m.box(f'stripe_{i}', -0.6 + i * 0.4, 1.2, -0.78, 0.2, 0.3, 0.04, 'warn_y' if i % 2 == 0 else 'warn_k')
    # 눈 하나 (크게) : 흰자·동공·하이라이트
    m.box('eye_white', 0, 1.25, 0.78, 0.6, 0.5, 0.1, 'eye_white')
    m.box('eye_pupil', 0, 1.22, 0.84, 0.3, 0.3, 0.06, 'pupil')
    m.box('eye_glint', 0.09, 1.3, 0.88, 0.08, 0.08, 0.03, 'eye_white')
    m.box('eye_rim', 0, 1.25, 0.76, 0.72, 0.62, 0.06, 'steel_dark')
    # 안테나 + 발광 끝
    m.box('antenna_a', 0, 1.95, -0.2, 0.08, 0.6, 0.08, 'black')
    m.box('glow_tip', 0, 2.3, -0.2, 0.2, 0.2, 0.2, 'glow')
    # 바퀴 4개 (고무 + 허브)
    for sx, sz, n in ((1, 1, 'fl'), (-1, 1, 'fr'), (1, -1, 'bl'), (-1, -1, 'br')):
        m.box(f'wheel_{n}', sx * 1.0, 0.36, sz * 0.62, 0.26, 0.7, 0.7, 'rubber')
        m.box(f'wheel_{n}_hub', sx * 1.14, 0.36, sz * 0.62, 0.04, 0.3, 0.3, 'hub')
    # 집게 팔 (앞 양쪽): 팔 + 집게 두 갈래
    for sx, n in ((1, 'l'), (-1, 'r')):
        m.box(f'claw_{n}_arm', sx * 0.85, 1.0, 0.75, 0.18, 0.18, 0.7, 'black')
        m.box(f'claw_{n}_a', sx * 0.85 + sx * 0.12, 1.0, 1.2, 0.1, 0.14, 0.4, 'steel')
        m.box(f'claw_{n}_b', sx * 0.85 - sx * 0.12, 1.0, 1.2, 0.1, 0.14, 0.4, 'steel')
        m.box(f'claw_{n}_tip', sx * 0.85, 1.0, 1.42, 0.3, 0.1, 0.1, 'steel_dark')
    return m


def build_shooter():
    m = VoxelModel('shooter', {**COMMON,
        'body': mat('#b06bff', rough=0.5, metal=0.4), 'body_dark': mat('#7a44c4', rough=0.5, metal=0.4),
        'body_light': mat('#d2a6ff', rough=0.5), 'glow': mat('#ff8fb0', emissive=[1.0, 0.4, 0.6], strength=1.6),
        'lens': mat('#ffd166', rough=0.3, emissive=[1.0, 0.7, 0.2], strength=0.8)})
    # 둥근 몸통 느낌: 상자 3단
    m.box('body', 0, 1.0, 0, 1.2, 0.7, 1.2, 'body')
    m.box('body_top', 0, 1.42, 0, 0.9, 0.16, 0.9, 'body_dark')
    m.box('body_bottom', 0, 0.58, 0, 0.9, 0.16, 0.9, 'body_dark')
    m.mirror('body_fin_l', 'body_fin_r', 0.68, 1.0, -0.2, 0.1, 0.4, 0.6, 'body_light')
    m.box('body_tail', 0, 1.0, -0.72, 0.4, 0.3, 0.26, 'body_light')
    # 센서 눈 (렌즈)
    m.box('eye_lens', 0, 1.1, 0.62, 0.36, 0.3, 0.08, 'lens')
    m.box('eye_rim', 0, 1.1, 0.6, 0.46, 0.4, 0.06, 'steel_dark')
    # 포신 + 발광 포구
    m.box('barrel_main', 0.3, 0.86, 0.8, 0.2, 0.2, 0.9, 'steel_dark')
    m.box('barrel_ring', 0.3, 0.86, 1.05, 0.28, 0.28, 0.1, 'steel')
    m.box('glow_muzzle', 0.3, 0.86, 1.28, 0.16, 0.16, 0.12, 'glow')
    # 로터: 축 + 날개 4개 (rotor_ 이름이면 항상 회전, 떠다님)
    m.box('rotor_mast', 0, 1.62, 0, 0.12, 0.3, 0.12, 'black')
    m.box('rotor_blade_a', 0, 1.78, 0, 1.6, 0.05, 0.16, 'steel')
    m.box('rotor_blade_b', 0, 1.78, 0, 0.16, 0.05, 1.6, 'steel')
    m.box('rotor_cap', 0, 1.84, 0, 0.2, 0.08, 0.2, 'hub')
    # 아래 다리(착륙 스키드)
    m.mirror('skid_l', 'skid_r', 0.4, 0.4, 0, 0.08, 0.2, 0.8, 'black')
    return m


def build_tank():
    m = VoxelModel('tank', {**COMMON,
        'body': mat('#5b7bd6', rough=0.6, metal=0.3), 'body_dark': mat('#3b549c', rough=0.6, metal=0.3),
        'body_light': mat('#8ca6ea', rough=0.6), 'gold': mat('#e3b23c', rough=0.45, metal=0.5),
        'glow': mat('#9ad0ff', emissive=[0.4, 0.7, 1.0], strength=1.4), 'eye_glow': mat('#ff5a5a', emissive=[1.0, 0.25, 0.25], strength=1.2)})
    # 큰 몸통 + 어깨 장갑
    m.box('body', 0, 1.5, 0, 2.0, 1.4, 1.6, 'body')
    m.box('body_top', 0, 2.26, 0, 1.6, 0.14, 1.3, 'body_dark')
    m.box('body_chest', 0, 1.55, 0.82, 1.2, 0.9, 0.08, 'body_dark')
    m.mirror('shoulder_l', 'shoulder_r', 1.1, 2.1, 0, 0.5, 0.5, 1.2, 'body_dark')
    m.mirror('shoulder_trim_l', 'shoulder_trim_r', 1.1, 2.37, 0, 0.52, 0.06, 1.22, 'gold')
    # 배기관 2개 (뒤) + 피스톤 (이동 시 펌프)
    m.mirror('exhaust_l', 'exhaust_r', 0.55, 2.45, -0.5, 0.22, 0.5, 0.22, 'steel_dark')
    m.mirror('piston_l', 'piston_r', 0.75, 0.9, -0.9, 0.2, 0.5, 0.2, 'steel')
    # 눈 두 개 (붉게 빛남)
    m.mirror('eye_l', 'eye_r', 0.35, 1.85, 0.82, 0.3, 0.16, 0.08, 'eye_glow')
    m.mirror('eye_rim_l', 'eye_rim_r', 0.35, 1.85, 0.8, 0.38, 0.24, 0.06, 'black')
    # 하체: 궤도 + 바퀴
    m.box('base', 0, 0.55, 0, 2.3, 0.6, 1.9, 'black')
    m.mirror('track_l', 'track_r', 1.0, 0.5, 0, 0.4, 0.8, 2.0, 'rubber')
    for sz, n in ((0.6, 'f'), (-0.6, 'b')):
        m.mirror(f'wheel_{n}l', f'wheel_{n}r', 1.22, 0.45, sz, 0.06, 0.5, 0.5, 'hub')
    # 방패 (앞, 아래 모서리가 관절): 판 + 금 테 + 중앙 발광
    m.box('shield', 0, 1.3, 1.25, 1.9, 1.7, 0.16, 'body_light')
    m.box('shield_rim_top', 0, 2.13, 1.25, 1.96, 0.1, 0.2, 'gold')
    m.box('shield_rim_bottom', 0, 0.47, 1.25, 1.96, 0.1, 0.2, 'gold')
    m.mirror('shield_rim_l', 'shield_rim_r', 0.95, 1.3, 1.25, 0.1, 1.7, 0.2, 'gold')
    m.box('shield_glow', 0, 1.3, 1.34, 0.3, 0.6, 0.04, 'glow')
    m.box('shield_arm_l', 0.6, 1.3, 1.0, 0.2, 0.2, 0.5, 'steel_dark')
    m.box('shield_arm_r', -0.6, 1.3, 1.0, 0.2, 0.2, 0.5, 'steel_dark')
    return m


def build_stalker():
    m = VoxelModel('stalker', {**COMMON,
        'body': mat('#8e6cff', rough=0.5, metal=0.3), 'body_dark': mat('#5a3fb8', rough=0.5),
        'wing': mat('#3b2a7a', 0.9, rough=0.7, blend=True), 'glow': mat('#ff5fd2', emissive=[1.0, 0.3, 0.8], strength=1.5),
        'fang': mat('#f3f0ff', rough=0.4)})
    # 작은 몸통 + 머리
    m.box('body', 0, 1.0, 0, 0.7, 0.5, 0.8, 'body')
    m.box('body_belly', 0, 0.8, 0.1, 0.5, 0.16, 0.5, 'body_dark')
    m.box('head', 0, 1.25, 0.35, 0.6, 0.4, 0.5, 'body')
    m.mirror('ear_l', 'ear_r', 0.22, 1.55, 0.3, 0.14, 0.3, 0.1, 'body_dark')
    # 눈 두 개 (분홍 발광) + 송곳니
    m.mirror('eye_l', 'eye_r', 0.15, 1.28, 0.62, 0.14, 0.12, 0.06, 'glow')
    m.mirror('fang_l', 'fang_r', 0.12, 1.05, 0.58, 0.06, 0.14, 0.06, 'fang')
    # 날개 (안쪽 모서리가 관절, 퍼덕임)
    for sx, n in ((1, 'l'), (-1, 'r')):
        m.box(f'wing_{n}', sx * 0.85, 1.1, -0.05, 1.0, 0.06, 0.7, 'wing')
        m.box(f'wing_{n}_bone', sx * 0.85, 1.14, 0.2, 1.0, 0.08, 0.08, 'body_dark')
        m.box(f'wing_{n}_tip', sx * 1.4, 1.1, -0.15, 0.2, 0.08, 0.4, 'body_dark')
    # 작은 꼬리
    m.box('tail', 0, 1.0, -0.5, 0.14, 0.14, 0.3, 'body_dark')
    return m


def build_artillery():
    m = VoxelModel('artillery', {**COMMON,
        'body': mat('#c0392b', rough=0.6, metal=0.3), 'body_dark': mat('#7f261c', rough=0.6, metal=0.3),
        'body_light': mat('#e06a5e', rough=0.6), 'glow': mat('#ffb347', emissive=[1.0, 0.55, 0.15], strength=1.6),
        'lens': mat('#ffd166', rough=0.3, emissive=[1.0, 0.7, 0.2], strength=0.8)})
    # 넓은 받침 + 다리 4개
    m.box('base', 0, 0.5, 0, 2.0, 0.5, 2.0, 'black')
    for sx, sz, n in ((1, 1, 'fl'), (-1, 1, 'fr'), (1, -1, 'bl'), (-1, -1, 'br')):
        m.box(f'leg_{n}', sx * 1.0, 0.3, sz * 1.0, 0.4, 0.6, 0.4, 'steel_dark')
        m.box(f'foot_{n}', sx * 1.0, 0.06, sz * 1.0, 0.5, 0.12, 0.5, 'rubber')
    # 포탑 몸통
    m.box('body', 0, 1.3, -0.1, 1.7, 1.1, 1.5, 'body')
    m.box('body_top', 0, 1.9, -0.1, 1.3, 0.14, 1.1, 'body_dark')
    m.mirror('body_side_l', 'body_side_r', 0.88, 1.3, -0.1, 0.08, 0.7, 1.0, 'body_light')
    # 경고 줄무늬 (앞 아래)
    for i in range(5):
        m.box(f'stripe_{i}', -0.7 + i * 0.35, 0.85, 0.66, 0.18, 0.18, 0.04, 'warn_y' if i % 2 == 0 else 'warn_k')
    # 탄약 상자 (뒤)
    m.box('ammo_rack', 0, 1.25, -0.95, 1.0, 0.7, 0.3, 'steel_dark')
    for i in range(3):
        m.box(f'ammo_{i}', -0.3 + i * 0.3, 1.25, -1.12, 0.18, 0.5, 0.1, 'warn_y')
    # 센서 눈 + 안테나
    m.box('eye_lens', 0.45, 1.5, 0.66, 0.3, 0.26, 0.08, 'lens')
    m.box('eye_rim', 0.45, 1.5, 0.64, 0.4, 0.36, 0.06, 'steel_dark')
    m.box('antenna_a', -0.6, 2.3, -0.5, 0.06, 0.7, 0.06, 'black')
    m.box('glow_antenna', -0.6, 2.7, -0.5, 0.14, 0.14, 0.14, 'glow')
    # 큰 포신 (예고 끝에 반동) + 발광 포구
    m.box('barrel_main', -0.3, 1.45, 0.9, 0.42, 0.42, 1.6, 'steel_dark')
    m.box('barrel_ring_a', -0.3, 1.45, 1.1, 0.52, 0.52, 0.12, 'steel')
    m.box('barrel_ring_b', -0.3, 1.45, 1.55, 0.5, 0.5, 0.1, 'steel')
    m.box('barrel_mount', -0.3, 1.45, 0.4, 0.6, 0.6, 0.4, 'body_dark')
    m.box('glow_muzzle', -0.3, 1.45, 1.74, 0.3, 0.3, 0.14, 'glow')
    return m


if __name__ == '__main__':
    for build in (build_rusher, build_shooter, build_tank, build_stalker, build_artillery):
        model = build()
        model.export(OUT / f'enemy-{model.name}.glb')
