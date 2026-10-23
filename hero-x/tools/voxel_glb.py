"""
복셀(박스 쌓기) → glTF 2.0 바이너리(.glb) 공용 모듈 (파이썬 표준 라이브러리만)
- 좌표: Y 가 위, 정면은 +Z (게임 규칙). 노멀을 넣지 않아 게임(three.js)이 평면 음영으로 그린다.
- 색은 화면 색(sRGB 16진수)으로 적고 내보낼 때 선형으로 변환한다(안 하면 허옇게 뜬다).
- 재질: color(hex, alpha), rough, metal, emissive([r,g,b]) + strength(발광 세기, KHR_materials_emissive_strength), blend(반투명).
- 부품 이름은 src/assets/PartRig.ts 규칙을 따라야 게임이 관절·동작을 만든다.
"""
import json
import struct
from pathlib import Path


def srgb_to_linear(v):
    return v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4


def c(hexs, a=1.0):
    h = hexs.lstrip('#')
    return [srgb_to_linear(int(h[i:i + 2], 16) / 255) for i in (0, 2, 4)] + [a]


def mat(hexs, a=1.0, rough=0.9, metal=0.0, emissive=None, strength=1.0, blend=False):
    return dict(color=c(hexs, a), rough=rough, metal=metal, emissive=emissive, strength=strength, blend=blend)


def _face_tris(mn, mx):
    """8꼭짓점 박스의 꼭짓점과 삼각형 색인 (바깥을 향하게 감김 확인)"""
    verts = [((mx if i & 1 else mn)[0], (mx if i & 2 else mn)[1], (mx if i & 4 else mn)[2]) for i in range(8)]
    faces = {(0, -1): [0, 2, 6, 4], (0, 1): [1, 3, 7, 5], (1, -1): [0, 1, 5, 4], (1, 1): [2, 3, 7, 6], (2, -1): [0, 1, 3, 2], (2, 1): [4, 5, 7, 6]}
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


class VoxelModel:
    def __init__(self, name, materials):
        self.name = name
        self.materials = materials
        self.boxes = []  # (이름, 중심, 크기, 재질 이름)

    def box(self, name, cx, cy, cz, sx, sy, sz, m):
        assert m in self.materials, f'재질 없음: {m}'
        self.boxes.append((name, (cx, cy, cz), (sx, sy, sz), m))

    def mirror(self, name_l, name_r, x, y, z, sx, sy, sz, m):
        """좌우 대칭 두 개 (x 는 +쪽 값)"""
        self.box(name_l, +x, y, z, sx, sy, sz, m)
        self.box(name_r, -x, y, z, sx, sy, sz, m)

    def export(self, out: Path):
        mat_index = {k: i for i, k in enumerate(self.materials)}
        bin_parts, views, accessors, meshes, nodes = [], [], [], [], []
        offset = 0

        def add_view(data, target):
            nonlocal offset
            pad = (-len(data)) % 4
            views.append({'buffer': 0, 'byteOffset': offset, 'byteLength': len(data), 'target': target})
            bin_parts.append(data + b'\0' * pad)
            offset += len(data) + pad
            return len(views) - 1

        _, tris = _face_tris((0, 0, 0), (1, 1, 1))
        accessors.append({'bufferView': add_view(struct.pack('<36H', *tris), 34963), 'componentType': 5123, 'count': 36, 'type': 'SCALAR', 'max': [7], 'min': [0]})
        for name, (cx, cy, cz), (sx, sy, sz), m in self.boxes:
            mn = (cx - sx / 2, cy - sy / 2, cz - sz / 2)
            mx = (cx + sx / 2, cy + sy / 2, cz + sz / 2)
            verts, _ = _face_tris(mn, mx)
            view = add_view(struct.pack('<24f', *[v for p in verts for v in p]), 34962)
            accessors.append({'bufferView': view, 'componentType': 5126, 'count': 8, 'type': 'VEC3', 'min': list(mn), 'max': list(mx)})
            meshes.append({'name': name, 'primitives': [{'attributes': {'POSITION': len(accessors) - 1}, 'indices': 0, 'material': mat_index[m], 'mode': 4}]})
            nodes.append({'name': name, 'mesh': len(meshes) - 1})
        materials = []
        for k, m in self.materials.items():
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
            'asset': {'version': '2.0', 'generator': 'hero-x tools/voxel_glb.py'},
            'scene': 0,
            'scenes': [{'nodes': [len(nodes)]}],
            'nodes': nodes + [{'name': self.name, 'children': list(range(len(nodes)))}],
            'meshes': meshes,
            'materials': materials,
            'accessors': accessors,
            'bufferViews': views,
            'buffers': [{'byteLength': len(bin_data)}],
            'extensionsUsed': ['KHR_materials_emissive_strength'],
        }
        json_bytes = json.dumps(gltf, separators=(',', ':')).encode('utf-8')
        json_bytes += b' ' * ((-len(json_bytes)) % 4)
        total = 12 + 8 + len(json_bytes) + 8 + len(bin_data)
        out.parent.mkdir(parents=True, exist_ok=True)
        with open(out, 'wb') as f:
            f.write(b'glTF' + struct.pack('<II', 2, total))
            f.write(struct.pack('<I', len(json_bytes)) + b'JSON' + json_bytes)
            f.write(struct.pack('<I', len(bin_data)) + b'BIN\0' + bin_data)
        print(f'{out.name}: 박스 {len(self.boxes)}개, 재질 {len(materials)}개, {total / 1024:.1f} KB')
