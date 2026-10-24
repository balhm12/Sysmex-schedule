import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
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
    const skin = new THREE.MeshStandardMaterial();
    const eye = new THREE.MeshStandardMaterial();
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
    expect(merged.material).toBe(skin);
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
