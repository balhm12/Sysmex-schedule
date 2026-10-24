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
    // 같은 부모 아래, 재질 '값'(색 제외)이 같은 메시끼리 묶는다. 색은 정점 색으로 구워 한 재질로 그린다
    const byKey = new Map<string, { material: THREE.Material; meshes: THREE.Mesh[] }>();
    for (const c of parent.children) {
      const mesh = c as THREE.Mesh;
      if (!mesh.isMesh || (mesh as THREE.SkinnedMesh).isSkinnedMesh || Array.isArray(mesh.material) || mesh.children.length > 0) continue;
      const key = materialKey(mesh.material);
      const g = byKey.get(key) ?? { material: mesh.material, meshes: [] };
      g.meshes.push(mesh);
      byKey.set(key, g);
    }
    for (const { material, meshes } of byKey.values()) {
      before += meshes.length;
      if (meshes.length < 2 || !sameAttributes(meshes)) {
        after += meshes.length;
        continue;
      }
      const geos = meshes.map((m) => {
        m.updateMatrix();
        const geo = m.geometry.clone().applyMatrix4(m.matrix);
        bakeVertexColor(geo, (m.material as THREE.MeshStandardMaterial).color);
        return geo;
      });
      const merged = mergeGeometries(geos, false);
      geos.forEach((g) => g.dispose());
      if (!merged) {
        after += meshes.length;
        continue;
      }
      const shared = material.clone() as THREE.MeshStandardMaterial;
      if (shared.color) shared.color.set(0xffffff);
      shared.vertexColors = true;
      const out = new THREE.Mesh(merged, shared);
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

/**
 * 재질을 '같은 것으로 볼' 열쇠: 종류·거칠기·금속성·발광·투명도·면 방향 (소품은 prop 마다 재질 객체를 새로 만들므로 값으로 비교).
 * 색은 넣지 않는다 — 합칠 때 각 메시의 색을 정점 색으로 구워 넣으므로 색이 달라도 한 재질로 그릴 수 있다.
 */
export function materialKey(mat: THREE.Material): string {
  const m = mat as THREE.MeshStandardMaterial;
  const em = m.emissive ? `${m.emissive.getHexString()}:${m.emissiveIntensity ?? 1}` : '-';
  return `${mat.type}|${m.roughness ?? '-'}|${m.metalness ?? '-'}|${em}|${mat.transparent ? mat.opacity : 1}|${mat.side}|${(m as unknown as { flatShading?: boolean }).flatShading ? 'f' : 's'}|${m.map ? 'map' : ''}`;
}

/** 메시의 재질 색을 정점 색 속성으로 굽는다 (이미 정점 색이 있으면 곱한다) */
function bakeVertexColor(geo: THREE.BufferGeometry, color: THREE.Color | undefined): void {
  const n = geo.attributes.position.count;
  const c = color ?? new THREE.Color(1, 1, 1);
  const existing = geo.attributes.color as THREE.BufferAttribute | undefined;
  const arr = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const r = existing ? existing.getX(i) : 1;
    const g = existing ? existing.getY(i) : 1;
    const b = existing ? existing.getZ(i) : 1;
    arr[i * 3] = c.r * r;
    arr[i * 3 + 1] = c.g * g;
    arr[i * 3 + 2] = c.b * b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(arr, 3));
}

/**
 * 움직이지 않는 소품 전체를 재질 값별로 합친다 (던전 장식용: 횃불 기둥·바위·울타리·나무 …).
 * - root 아래 모든 메시를 월드 좌표로 구워 재질 열쇠(materialKey)별로 하나의 메시로 만들어 root 바로 아래에 둔다.
 * - 건너뜀: userData.animated 가 true 인 메시(불꽃·등불처럼 매 프레임 바뀌는 것), InstancedMesh, SkinnedMesh, 재질 배열, 속성 구성이 다른 것.
 * - 원래 메시의 지오메트리는 이 소품 전용이므로 dispose 하고, 빈 Group 은 치운다. 돌려주는 값은 합친 메시들(정리용).
 */
export function mergeStaticProps(root: THREE.Object3D): { before: number; after: number; merged: THREE.Mesh[] } {
  root.updateMatrixWorld(true);
  const rootInv = new THREE.Matrix4().copy(root.matrixWorld).invert();
  const groups = new Map<string, { material: THREE.Material; meshes: THREE.Mesh[] }>();
  let before = 0;
  let skipped = 0;
  root.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh) return;
    before++;
    if ((mesh as THREE.InstancedMesh).isInstancedMesh || (mesh as THREE.SkinnedMesh).isSkinnedMesh || Array.isArray(mesh.material) || mesh.userData.animated) {
      skipped++;
      return;
    }
    const key = materialKey(mesh.material);
    const g = groups.get(key) ?? { material: mesh.material, meshes: [] };
    g.meshes.push(mesh);
    groups.set(key, g);
  });
  const merged: THREE.Mesh[] = [];
  let after = skipped;
  for (const { material, meshes } of groups.values()) {
    if (meshes.length < 2 || !sameAttributes(meshes)) {
      after += meshes.length;
      continue;
    }
    const local = new THREE.Matrix4();
    const geos = meshes.map((m) => {
      local.multiplyMatrices(rootInv, m.matrixWorld);
      const geo = m.geometry.clone().applyMatrix4(local);
      bakeVertexColor(geo, (m.material as THREE.MeshStandardMaterial).color);
      return geo;
    });
    const g = mergeGeometries(geos, false);
    geos.forEach((x) => x.dispose());
    if (!g) {
      after += meshes.length;
      continue;
    }
    // 합친 메시의 재질: 첫 재질을 복제해 흰색 + 정점 색 사용
    const shared = material.clone() as THREE.MeshStandardMaterial;
    if (shared.color) shared.color.set(0xffffff);
    shared.vertexColors = true;
    const out = new THREE.Mesh(g, shared);
    out.name = `props:${meshes[0].name || materialKey(material).slice(0, 24)}`;
    out.castShadow = meshes.some((m) => m.castShadow);
    out.receiveShadow = meshes.some((m) => m.receiveShadow);
    for (const m of meshes) {
      m.removeFromParent();
      m.geometry.dispose();
      (m.material as THREE.Material).dispose();
    }
    root.add(out);
    merged.push(out);
    after++;
  }
  // 비어 버린 소품 Group 정리 (자식이 없는 Group 만, root 는 제외)
  const empties: THREE.Object3D[] = [];
  root.traverse((o) => {
    if (o !== root && (o as THREE.Group).isGroup && o.children.length === 0) empties.push(o);
  });
  for (const e of empties) e.removeFromParent();
  return { before, after, merged };
}
