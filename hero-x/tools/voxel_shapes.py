"""
둥근 복셀 모양 도우미 (파이썬 표준 라이브러리만)
- 격자 간격 v 로 공간을 나눠, 모양 안에 있는 칸 중 '겉면'(이웃 하나라도 밖)만 남긴다 → 속이 빈 껍데기라 칸 수가 적다.
- 결과는 (cx, cy, cz, v, v, v) 목록. VoxelModel.voxels(name, cubes, 재질) 로 한 메시가 된다.
- keep(x, y, z) 를 주면 그 자리만 남긴다(윗부분만 = 모자, 뒷부분만 = 뒷머리 등). 잘린 면은 속이 보이므로 다른 덩어리와 겹치게 둔다.
"""
import math


def _grid(lo, hi, v):
    """lo~hi 를 v 간격 칸의 '중심' 좌표로. 칸 경계가 0 에 맞도록 정렬"""
    i0 = math.floor(lo / v)
    i1 = math.ceil(hi / v)
    return [(i + 0.5) * v for i in range(i0, i1)]


def shell(inside, bounds, v, keep=None, solid=False):
    """inside(x,y,z) 가 참인 칸 중 겉면만. bounds = (x0,x1,y0,y1,z0,z1)"""
    x0, x1, y0, y1, z0, z1 = bounds
    out = []
    for x in _grid(x0, x1, v):
        for y in _grid(y0, y1, v):
            for z in _grid(z0, z1, v):
                if not inside(x, y, z):
                    continue
                if keep and not keep(x, y, z):
                    continue
                if not solid:
                    exposed = False
                    for dx, dy, dz in ((v, 0, 0), (-v, 0, 0), (0, v, 0), (0, -v, 0), (0, 0, v), (0, 0, -v)):
                        if not inside(x + dx, y + dy, z + dz):
                            exposed = True
                            break
                    if not exposed:
                        continue
                out.append((x, y, z, v, v, v))
    return out


def ellipsoid(cx, cy, cz, rx, ry, rz, v, keep=None, solid=False):
    """타원체(구) 껍데기"""
    def inside(x, y, z):
        return ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 + ((z - cz) / rz) ** 2 <= 1.0
    return shell(inside, (cx - rx, cx + rx, cy - ry, cy + ry, cz - rz, cz + rz), v, keep, solid)


def rounded_box(cx, cy, cz, sx, sy, sz, r, v, keep=None, solid=False):
    """모서리를 반지름 r 로 둥글린 상자 껍데기"""
    hx, hy, hz = sx / 2 - r, sy / 2 - r, sz / 2 - r
    def inside(x, y, z):
        dx = max(abs(x - cx) - hx, 0.0)
        dy = max(abs(y - cy) - hy, 0.0)
        dz = max(abs(z - cz) - hz, 0.0)
        return dx * dx + dy * dy + dz * dz <= r * r
    return shell(inside, (cx - sx / 2, cx + sx / 2, cy - sy / 2, cy + sy / 2, cz - sz / 2, cz + sz / 2), v, keep, solid)


def capsule_y(cx, cy0, cy1, cz, r, v, keep=None):
    """세로 캡슐(팔·다리): y0~y1 사이 반지름 r, 양 끝 반구"""
    def inside(x, y, z):
        yy = min(max(y, cy0), cy1)
        return (x - cx) ** 2 + (y - yy) ** 2 + (z - cz) ** 2 <= r * r
    return shell(inside, (cx - r, cx + r, cy0 - r, cy1 + r, cz - r, cz + r), v, keep)


def ring_xy(cx, cy, cz, r_major, r_minor, v, keep=None):
    """XY 평면에 놓인 고리(안경테): 중심 (cx,cy,cz), 큰 반지름 r_major, 두께 반지름 r_minor"""
    def inside(x, y, z):
        d = math.hypot(x - cx, y - cy) - r_major
        return d * d + (z - cz) ** 2 <= r_minor * r_minor
    R = r_major + r_minor
    return shell(inside, (cx - R, cx + R, cy - R, cy + R, cz - r_minor, cz + r_minor), v, keep, solid=True)
