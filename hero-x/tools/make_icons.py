#!/usr/bin/env python3
"""
앱 아이콘 생성기 → public/icons/icon-192.png, icon-512.png, maskable-512.png, apple-touch-icon-180.png
실행: python3 tools/make_icons.py  (Pillow 필요: pip install pillow — 게임 실행에는 필요 없고 아이콘을 다시 만들 때만)
- 픽셀 아트: 짙은 남색 바탕 위에 복셀 영웅 얼굴(갈색 머리·피부·파란 옷)과 빛나는 검 + 'X' 느낌의 검 궤적. 외부 이미지 없음.
"""
from pathlib import Path
from PIL import Image, ImageDraw

OUT = Path(__file__).resolve().parent.parent / 'public' / 'icons'
OUT.mkdir(parents=True, exist_ok=True)

# 24x24 픽셀 아트 (문자 → 색)
PAL = {
    '.': None,
    'H': '#5b3a1e',  # 머리카락
    'h': '#7a5230',  # 머리카락 밝은 부분
    'S': '#f1c9a5',  # 피부
    'E': '#15161d',  # 눈
    'W': '#ffffff',  # 눈 흰자/하이라이트
    'M': '#c8584d',  # 입
    'B': '#2f6fd6',  # 옷(파랑)
    'b': '#1e4ea8',  # 옷 어두운
    'G': '#ffd23f',  # 금 버클
    'K': '#5cf2d8',  # 검 날(발광)
    'k': '#bffcf2',  # 검 하이라이트
    'T': '#8b5a2b',  # 검 손잡이
}
ART = [
    "........................",
    "........HHHHHHHH........",
    "......HHHhHHHHHhHH......",
    ".....HHHHHHHHHHHHHH.....",
    ".....HHhHHHHHHHHhHH.....",
    ".....HHSSSSSSSSSSHH.....",
    ".....HSSSSSSSSSSSSH.....",
    ".....HSSWESSSSWESSH.....",
    ".....HSSEESSSSEESSH.....",
    "......SSSSSSSSSSSS......",
    "......SSSSSMMSSSSS......",
    ".......SSSSSSSSSS.......",
    "........SSSSSSSS........",
    "......BBBBBBBBBBBB...K..",
    ".....BBbBBBBBBBbBB..Kk..",
    "....BBBBBBGGBBBBBB.Kk...",
    "....BBBBBBGGBBBBBBKk....",
    "....BBBBBBBBBBBBBKk.....",
    "....BBBBBBBBBBBBKk......",
    "....BBbBBBBBBBbKk.......",
    "....BBBBBBBBBBTT........",
    "....BBBBBBBBBBBT........",
    "........................",
    "........................",
]


def render(size: int, maskable: bool) -> Image.Image:
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    # 바탕: 둥근 사각형(maskable 은 꽉 찬 사각형) + 세로 그라데이션
    for y in range(size):
        t = y / size
        r = int(14 + (30 - 14) * t)
        g = int(20 + (48 - 20) * t)
        b = int(36 + (92 - 36) * t)
        d.line([(0, y), (size, y)], fill=(r, g, b, 255))
    if not maskable:
        mask = Image.new('L', (size, size), 0)
        ImageDraw.Draw(mask).rounded_rectangle([0, 0, size - 1, size - 1], radius=size // 5, fill=255)
        img.putalpha(mask)
    # 픽셀 아트: maskable 은 안전 영역(가운데 80%)에 맞춰 작게
    n = len(ART)
    scale = (size * (0.68 if maskable else 0.84)) / n
    ox = (size - n * scale) / 2
    oy = (size - n * scale) / 2
    for yy, row in enumerate(ART):
        for xx, ch in enumerate(row):
            col = PAL.get(ch)
            if not col:
                continue
            x0 = ox + xx * scale
            y0 = oy + yy * scale
            d.rectangle([x0, y0, x0 + scale + 0.5, y0 + scale + 0.5], fill=col)
    return img


for name, size, maskable in (('icon-192.png', 192, False), ('icon-512.png', 512, False), ('maskable-512.png', 512, True), ('apple-touch-icon-180.png', 180, True)):
    im = render(size, maskable)
    if name.startswith('apple'):
        # iOS 는 알파를 검게 칠하므로 바탕색으로 채운다
        bg = Image.new('RGBA', im.size, (14, 20, 36, 255))
        bg.alpha_composite(im)
        im = bg.convert('RGB')
    im.save(OUT / name, optimize=True)
    print(name, im.size)
