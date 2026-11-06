import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

/**
 * 매끈한 카툰 모델용 도형 도우미 (주인공·적·보스 코드 모델이 공유)
 * - 모든 메시는 그림자를 드리운다. 위치는 부모 기준.
 */
export const add = (parent: THREE.Object3D, geo: THREE.BufferGeometry, m: THREE.Material, x = 0, y = 0, z = 0): THREE.Mesh => {
  const mesh = new THREE.Mesh(geo, m);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  parent.add(mesh);
  return mesh;
};
/** 모서리가 둥근 상자 */
export const rbox = (w: number, h: number, d: number, r: number): THREE.BufferGeometry => new RoundedBoxGeometry(w, h, d, 4, Math.min(r, w / 2, h / 2, d / 2));
export const sphere = (r: number, w = 20, h = 14): THREE.BufferGeometry => new THREE.SphereGeometry(r, w, h);
/** 세로 캡슐 (둥근 양끝) */
export const capsule = (r: number, len: number): THREE.BufferGeometry => new THREE.CapsuleGeometry(r, len, 6, 14);
/** 고리 (XY 평면) */
export const ring = (r: number, tube: number, arc = Math.PI * 2): THREE.BufferGeometry => new THREE.TorusGeometry(r, tube, 10, 32, arc);
export const cone = (r: number, h: number, seg = 12): THREE.BufferGeometry => new THREE.ConeGeometry(r, h, seg);
/** 타원체(구를 늘림) */
export const blob = (parent: THREE.Object3D, r: number, sx: number, sy: number, sz: number, m: THREE.Material, x: number, y: number, z: number): THREE.Mesh => {
  const mesh = add(parent, sphere(r, 16, 12), m, x, y, z);
  mesh.scale.set(sx, sy, sz);
  return mesh;
};
/** 끝이 뾰족한 가닥(머리카락·가시·뿔): 아래가 둥글고 끝으로 갈수록 가늘다. 길이 len, 밑동 반지름 r, Y 축 방향 */
export const strandGeo = (len: number, r: number): THREE.BufferGeometry => {
  const pts: THREE.Vector2[] = [];
  const n = 7;
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const rr = r * Math.sin(Math.min(1, t * 1.6 + 0.08) * Math.PI * 0.5) * (1 - t * t * 0.95) + (i === n ? 0 : 0.002);
    pts.push(new THREE.Vector2(rr, t * len));
  }
  return new THREE.LatheGeometry(pts, 8);
};
/** 가닥을 (x,y,z)에서 dir 방향으로 */
export const strand = (parent: THREE.Object3D, x: number, y: number, z: number, dir: THREE.Vector3, len: number, r: number, m: THREE.Material): THREE.Mesh => {
  const mesh = add(parent, strandGeo(len, r), m, x, y, z);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
  return mesh;
};
/** 매 프레임 직접 움직이는 메시 표시 (mergeByMaterial 이 합치지 않는다). 만든 자리에서 감싼다 */
export const live = <T extends THREE.Object3D>(obj: T): T => {
  obj.userData.animated = true;
  return obj;
};
/** 트리 안 메시의 기하·재질 정리 */
export const disposeTree = (root: THREE.Object3D): void => {
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.isMesh) {
      mesh.geometry.dispose();
      const m = mesh.material;
      if (Array.isArray(m)) m.forEach((x) => x.dispose());
      else m.dispose();
    }
  });
};
