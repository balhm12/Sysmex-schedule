import * as THREE from 'three';

/**
 * 툰 외곽선 (뒤집힌 껍데기 방식): 메시마다 같은 기하를 조금 키운 검은 뒷면(BackSide) 메시를 자식으로 붙인다.
 * - 외부 셰이더 없이 동작하고 둥근 모양(구·캡슐·둥근 상자)에 잘 맞는다. 그리기 호출이 메시 수만큼 늘어나므로 화질에 따라 켜고 끈다.
 * - 발광·반투명·아주 작은 메시(보석·반짝임·눈 하이라이트 등)는 건너뛴다.
 * - 두께는 월드 단위(thickness)로 맞춘다: 메시의 바운딩 반지름에 반비례해 scale 을 정한다.
 */
export type OutlineMode = 'none' | 'hero' | 'all';
export type OutlineGroup = 'hero' | 'enemy';

let currentMode: OutlineMode = 'all';

/** 지금 화질의 외곽선 모드 (새로 만드는 모델은 이 값으로 보이기/숨기기를 정한다) */
export function setOutlineMode(mode: OutlineMode): void {
  currentMode = mode;
}
export function getOutlineMode(): OutlineMode {
  return currentMode;
}
export function outlineVisibleFor(group: OutlineGroup, mode: OutlineMode = currentMode): boolean {
  return mode === 'all' || (mode === 'hero' && group === 'hero');
}

const outlineMat = new THREE.MeshBasicMaterial({ color: 0x1a1430, side: THREE.BackSide });

/** root 아래 메시에 외곽선을 붙인다. 붙인 개수를 돌려준다 */
export function addOutlines(root: THREE.Object3D, thickness: number, group: OutlineGroup, minRadius = 0.05): number {
  const targets: THREE.Mesh[] = [];
  root.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh || mesh.userData.outline || mesh.userData.outlined) return;
    const mat = mesh.material as THREE.MeshStandardMaterial;
    if (Array.isArray(mesh.material) || !mat) return;
    // 발광(emissive 색이 밝고 세기가 큰) 재질·반투명은 건너뛴다. 보통 pbr 재질은 emissive 가 검정이라 통과한다
    const em = mat.emissive;
    const glowing = !!em && em.r + em.g + em.b > 0.3 && mat.emissiveIntensity > 0.9;
    if (mat.transparent || glowing) return;
    mesh.geometry.computeBoundingSphere();
    const r = mesh.geometry.boundingSphere?.radius ?? 0;
    // 메시의 월드 크기(부모 scale 포함)가 너무 작으면 건너뛴다
    const s = mesh.getWorldScale(new THREE.Vector3());
    const worldR = r * Math.max(s.x, s.y, s.z);
    if (!(worldR > minRadius)) return;
    targets.push(mesh);
  });
  for (const mesh of targets) {
    const r = mesh.geometry.boundingSphere!.radius;
    const s = mesh.getWorldScale(new THREE.Vector3());
    const worldR = r * Math.max(s.x, s.y, s.z);
    const k = 1 + thickness / worldR;
    const shell = new THREE.Mesh(mesh.geometry, outlineMat);
    shell.name = 'outline';
    shell.scale.setScalar(k);
    shell.castShadow = false;
    shell.receiveShadow = false;
    shell.userData.outline = group;
    shell.visible = outlineVisibleFor(group);
    mesh.userData.outlined = true;
    mesh.add(shell);
  }
  return targets.length;
}

/** 씬(또는 모델) 안 외곽선의 보이기/숨기기를 모드에 맞춘다 */
export function applyOutlineMode(root: THREE.Object3D, mode: OutlineMode): void {
  currentMode = mode;
  root.traverse((o) => {
    const g = o.userData.outline as OutlineGroup | undefined;
    if (g) o.visible = outlineVisibleFor(g, mode);
  });
}
