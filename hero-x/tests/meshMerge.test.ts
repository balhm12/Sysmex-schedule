import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { mergeByMaterial } from '../src/assets/meshMerge';
import { live } from '../src/render/shapes';
import { mergeStaticMeshes, meshHasPart } from '../src/assets/meshMerge';

function box(name: string, mat: THREE.Material, x: number, y: number, z: number, s = 1): THREE.Mesh {
  const m = new THREE.Mesh(new THREE.BoxGeometry(s, s, s), mat);
  m.name = name;
  m.position.set(x, y, z);
  m.castShadow = true;
  return m;
}

describe('복셀 메시 합치기 (mergeStaticMeshes)', () => {
  it('같은 부모·같은 재질의 메시만 하나로 합치고, 모양(바운딩 박스)은 그대로', () => {
    const skin = new THREE.MeshStandardMaterial({ color: 0x6fae3c });
    const eye = new THREE.MeshStandardMaterial({ color: 0xffd23f, emissive: 0xffd23f, emissiveIntensity: 1.2 }); // 발광 → 다른 재질 값
    const root = new THREE.Group();
    root.add(box('body', skin, 0, 1, 0), box('body_belt', skin, 0, 0.5, 0, 0.5), box('body_chest', skin, 0, 1.3, 0.4, 0.3), box('eye_l', eye, 0.2, 1.5, 0.5, 0.1));
    const joint = new THREE.Group();
    joint.name = 'joint:leftArm';
    joint.position.set(1, 1.5, 0);
    joint.add(box('left_arm', skin, 0, -0.3, 0), box('left_hand', skin, 0, -0.7, 0, 0.4));
    root.add(joint);
    root.updateMatrixWorld(true);
    const before = new THREE.Box3().setFromObject(root);
    const stat = mergeStaticMeshes(root);
    root.updateMatrixWorld(true);
    const after = new THREE.Box3().setFromObject(root);
    expect(stat.before).toBe(6);
    expect(stat.after).toBe(3); // 몸통 피부 1 + 눈 1 + 팔 1
    expect(root.children.filter((c) => (c as THREE.Mesh).isMesh)).toHaveLength(2);
    expect(joint.children).toHaveLength(1);
    expect(after.min.distanceTo(before.min)).toBeLessThan(1e-6);
    expect(after.max.distanceTo(before.max)).toBeLessThan(1e-6);
    // 합친 메시는 원래 부품 이름을 기억한다 → 이름으로 찾는 코드가 계속 동작
    const merged = root.children.find((c) => c.name.startsWith('merged:body')) as THREE.Mesh;
    expect(merged.userData.parts).toEqual(['body', 'body_belt', 'body_chest']);
    expect(meshHasPart(merged, /^body_belt/)).toBe(true);
    expect(meshHasPart(root.children.find((c) => c.name === 'eye_l')!, /^eye/)).toBe(true);
    expect(merged.castShadow).toBe(true);
    // 합친 재질은 흰색 + 정점 색 (각 상자의 색이 정점에 구워짐)
    const mm = merged.material as THREE.MeshStandardMaterial;
    expect(mm.vertexColors).toBe(true);
    expect(mm.color.getHex()).toBe(0xffffff);
    const col = merged.geometry.getAttribute('color');
    expect(col.getX(0)).toBeCloseTo(new THREE.Color(0x6fae3c).r, 5);
  });

  it('재질 배열·뼈대 메시·속성이 다른 메시는 건드리지 않는다', () => {
    const mat = new THREE.MeshStandardMaterial();
    const root = new THREE.Group();
    const multi = new THREE.Mesh(new THREE.BoxGeometry(), [mat, mat]);
    const plain = box('a', mat, 0, 0, 0);
    const noNormal = box('b', mat, 2, 0, 0);
    noNormal.geometry.deleteAttribute('normal');
    root.add(multi, plain, noNormal);
    const stat = mergeStaticMeshes(root);
    expect(stat.after).toBe(2); // plain 과 noNormal 은 속성이 달라 그대로
    expect(root.children).toHaveLength(3);
  });
});

import { materialKey, mergeStaticProps } from '../src/assets/meshMerge';

describe('소품 전체 합치기 (mergeStaticProps / materialKey)', () => {
  it('값이 같은 재질은 다른 객체여도 하나로 합치고, 움직이는(animated) 메시와 다른 값의 재질은 남긴다', () => {
    const root = new THREE.Group();
    const mk = () => new THREE.MeshStandardMaterial({ color: 0x6b4a2b, roughness: 0.9 });
    const a = new THREE.Group(); a.position.set(3, 0, 0); a.rotation.y = 1;
    a.add(box('trunk', mk(), 0, 1, 0), box('leaf', new THREE.MeshStandardMaterial({ color: 0x3f8a3a }), 0, 2.5, 0));
    const b = new THREE.Group(); b.position.set(-4, 0, 2); b.scale.setScalar(1.3);
    b.add(box('trunk', mk(), 0, 1, 0), box('leaf', new THREE.MeshStandardMaterial({ color: 0x3f8a3a }), 0, 2.5, 0));
    const flame = box('flame', new THREE.MeshStandardMaterial({ color: 0xff9a3d, emissive: 0xff9a3d }), 0, 2, 0);
    flame.userData.animated = true;
    root.add(a, b, flame);
    root.updateMatrixWorld(true);
    const before = new THREE.Box3().setFromObject(root);
    expect(materialKey(mk())).toBe(materialKey(mk()));
    const st = mergeStaticProps(root);
    root.updateMatrixWorld(true);
    const after = new THREE.Box3().setFromObject(root);
    expect(st.before).toBe(5);
    expect(st.after).toBe(3); // 줄기 1 + 잎 1 + 불꽃(그대로)
    expect(st.merged).toHaveLength(2);
    for (const m of st.merged) {
      expect((m.material as THREE.MeshStandardMaterial).vertexColors).toBe(true);
      expect(m.geometry.getAttribute('color')).toBeDefined();
    }
    expect(root.children.filter((c) => (c as THREE.Mesh).isMesh)).toHaveLength(3);
    expect(root.children.includes(flame)).toBe(true);
    expect(after.min.distanceTo(before.min)).toBeLessThan(1e-5);
    expect(after.max.distanceTo(before.max)).toBeLessThan(1e-5);
    // 빈 소품 Group 은 치워진다
    expect(root.children.includes(a)).toBe(false);
  });
});

describe('코드 모델 부품 합치기 (mergeByMaterial)', () => {
  it('같은 부모·같은 재질 객체의 메시만 합치고, 재질 객체·모양·animated 메시는 그대로', () => {
    const root = new THREE.Group();
    const joint = new THREE.Group();
    root.add(joint);
    const matA = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const matB = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const mk = (m: THREE.Material, x: number) => { const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), m); mesh.position.x = x; mesh.castShadow = true; joint.add(mesh); return mesh; };
    mk(matA, 0); mk(matA, 2); mk(matA, 4);
    mk(matB, 6);
    const eye = live(mk(matA, 8));
    const before = new THREE.Box3().setFromObject(root);
    const r = mergeByMaterial(root);
    expect(r.before).toBe(4); // animated 제외
    expect(r.after).toBe(2); // A 합침 1 + B 1
    const meshes: THREE.Mesh[] = [];
    root.traverse((o) => { if ((o as THREE.Mesh).isMesh) meshes.push(o as THREE.Mesh); });
    expect(meshes.length).toBe(3); // merged A, B, eye
    const merged = meshes.find((m) => m.name.startsWith('merged:'))!;
    expect(merged.material).toBe(matA);
    expect(merged.castShadow).toBe(true);
    expect(merged.geometry.attributes.position.count).toBe(3 * 24);
    expect(meshes).toContain(eye);
    expect(new THREE.Box3().setFromObject(root)).toEqual(before);
  });
});
