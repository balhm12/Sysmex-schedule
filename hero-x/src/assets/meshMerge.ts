import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

/**
 * 복셀 .glb 의 상자 메시 합치기 (그리기 호출 줄이기)
 * - 복셀 모델은 상자 하나가 메시 하나라 적 1마리가 80번 넘게 그려진다. 같은 부모(관절 묶음) 아래에서
 *   같은 재질을 쓰는 메시들을 하나의 지오메트리로 합쳐 묶음·재질당 한 번만 그린다.
 * - 리그(PartRig)가 관절 묶음(Group)으로 나눈 **뒤**에 불러야 팔·다리가 따로 움직인다.
 * - 원래 메시의 지오메트리는 다른 개체와 공유되므로 dispose 하지 않고 트리에서만 뺀다.
 *   합친 지오메트리는 이 개체 전용(새 메모리)이며 disposeTree 가 정리한다.
 * - 합친 메시는 userData.parts 에 원래 부품 이름 목록을 남긴다 (이름으로 찾는 코드용: 보스 눈 등).
 * - 뼈대(SkinnedMesh)·재질 배열·속성 구성이 다른 메시는 건드리지 않는다.
 */
export function mergeStaticMeshes(root: THREE.Object3D): { before: number; after: number } {
  const parents: THREE.Object3D[] = [];
  root.traverse((o) => {
    if (o.children.some((c) => (c as THREE.Mesh).isMesh)) parents.push(o);
  });
  let before = 0;
  let after = 0;
  for (const parent of parents) {
    const byMat = new Map<THREE.Material, THREE.Mesh[]>();
    for (const c of parent.children) {
      const mesh = c as THREE.Mesh;
      if (!mesh.isMesh || (mesh as THREE.SkinnedMesh).isSkinnedMesh || Array.isArray(mesh.material) || mesh.children.length > 0) continue;
      const list = byMat.get(mesh.material) ?? [];
      list.push(mesh);
      byMat.set(mesh.material, list);
    }
    for (const [material, meshes] of byMat) {
      before += meshes.length;
      if (meshes.length < 2 || !sameAttributes(meshes)) {
        after += meshes.length;
        continue;
      }
      const geos = meshes.map((m) => {
        m.updateMatrix();
        return m.geometry.clone().applyMatrix4(m.matrix);
      });
      const merged = mergeGeometries(geos, false);
      geos.forEach((g) => g.dispose());
      if (!merged) {
        after += meshes.length;
        continue;
      }
      const out = new THREE.Mesh(merged, material);
      out.name = `merged:${meshes[0].name}`;
      out.userData.parts = meshes.map((m) => m.name);
      out.castShadow = meshes.some((m) => m.castShadow);
      out.receiveShadow = meshes.some((m) => m.receiveShadow);
      for (const m of meshes) parent.remove(m);
      parent.add(out);
      after += 1;
    }
  }
  return { before, after };
}

/** 모든 메시의 지오메트리 속성 이름·인덱스 유무가 같아야 합칠 수 있다 */
function sameAttributes(meshes: THREE.Mesh[]): boolean {
  const key = (g: THREE.BufferGeometry) => `${Object.keys(g.attributes).sort().join(',')}|${g.index ? 'i' : 'n'}`;
  const k0 = key(meshes[0].geometry);
  return meshes.every((m) => key(m.geometry) === k0);
}

/** 메시 이름 또는 합쳐진 부품 이름 중 하나라도 정규식에 맞으면 true */
export function meshHasPart(mesh: THREE.Object3D, re: RegExp): boolean {
  if (re.test(mesh.name)) return true;
  const parts = (mesh.userData as { parts?: string[] }).parts;
  return Array.isArray(parts) && parts.some((n) => re.test(n));
}
