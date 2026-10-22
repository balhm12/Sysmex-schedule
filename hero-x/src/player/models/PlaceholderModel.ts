import * as THREE from 'three';

/** 모델이 매 프레임 받는 상태 */
export interface PlayerModelState {
  moving: boolean;
  speed: number;
}

/**
 * 플레이어 모델 인터페이스
 * - 임시 모델(이 파일)과 나중에 넣을 전용 3D 모델(.glb)이 같은 인터페이스를 쓴다.
 * - 모델의 정면은 +Z 방향이어야 한다. (Player.facing 각도로 회전시킨다)
 */
export interface PlayerModel {
  readonly root: THREE.Group;
  /** 걷기 등 간단한 동작 갱신 */
  update(dt: number, state: PlayerModelState): void;
  /** 메모리 정리 */
  dispose(): void;
}

export interface PlaceholderColors {
  body: string;
  accent: string;
  skin: string;
  visor: string;
}

/**
 * 임시 플레이어 모델: 단순 도형을 조합한 작은 영웅
 * - 외부 파일 없이 바로 실행된다.
 * - 전용 캐릭터 모델이 준비되면 Player.setModel() 로 교체한다.
 */
export function createPlaceholderModel(colors: PlaceholderColors): PlayerModel {
  const root = new THREE.Group();
  root.name = 'PlaceholderHero';

  const mat = (color: string) => new THREE.MeshLambertMaterial({ color: new THREE.Color(color) });
  const bodyMat = mat(colors.body);
  const accentMat = mat(colors.accent);
  const skinMat = mat(colors.skin);
  const visorMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(colors.visor) });
  const darkMat = mat('#2c3e6b');

  const addMesh = (parent: THREE.Object3D, geo: THREE.BufferGeometry, m: THREE.Material, x = 0, y = 0, z = 0) => {
    const mesh = new THREE.Mesh(geo, m);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    parent.add(mesh);
    return mesh;
  };

  // 다리: 엉덩이 위치를 기준으로 흔들리도록 그룹으로 만든다
  const makeLeg = (x: number) => {
    const pivot = new THREE.Group();
    pivot.position.set(x, 0.5, 0);
    addMesh(pivot, new THREE.CylinderGeometry(0.11, 0.12, 0.42, 10), darkMat, 0, -0.21, 0);
    addMesh(pivot, new THREE.BoxGeometry(0.24, 0.12, 0.32), accentMat, 0, -0.46, 0.04);
    root.add(pivot);
    return pivot;
  };
  const legL = makeLeg(-0.14);
  const legR = makeLeg(0.14);

  // 몸통과 허리띠
  addMesh(root, new THREE.BoxGeometry(0.6, 0.52, 0.36), bodyMat, 0, 0.76, 0);
  addMesh(root, new THREE.BoxGeometry(0.62, 0.08, 0.38), accentMat, 0, 0.52, 0);

  // 팔: 어깨를 기준으로 흔들린다
  const makeArm = (x: number) => {
    const pivot = new THREE.Group();
    pivot.position.set(x, 0.98, 0);
    addMesh(pivot, new THREE.CylinderGeometry(0.085, 0.08, 0.44, 10), bodyMat, 0, -0.2, 0);
    addMesh(pivot, new THREE.SphereGeometry(0.1, 10, 8), skinMat, 0, -0.44, 0);
    root.add(pivot);
    return pivot;
  };
  const armL = makeArm(-0.38);
  const armR = makeArm(0.38);

  // 머리: 둥근 머리 + 앞쪽 바이저(얼굴 방향 = +Z)
  const head = new THREE.Group();
  head.position.y = 1.42;
  addMesh(head, new THREE.SphereGeometry(0.4, 24, 18), skinMat);
  addMesh(head, new THREE.BoxGeometry(0.5, 0.16, 0.12), visorMat, 0, 0.05, 0.36);
  // 머리카락(위쪽 반구)
  const hair = addMesh(head, new THREE.SphereGeometry(0.43, 24, 12, 0, Math.PI * 2, 0, Math.PI * 0.5), darkMat, 0, 0.03, -0.05);
  hair.rotation.x = -0.3;
  root.add(head);

  // 배낭(등 쪽)
  addMesh(root, new THREE.BoxGeometry(0.36, 0.4, 0.18), accentMat, 0, 0.8, -0.26);

  let walkT = 0;

  return {
    root,
    update(dt, state) {
      // 걷는 동안 다리와 팔을 교차로 흔들고 몸을 살짝 들썩인다
      const amount = state.moving ? 1 : 0;
      walkT += dt * (state.speed > 0 ? state.speed * 1.6 : 0);
      const swing = Math.sin(walkT) * 0.75 * amount;
      legL.rotation.x = swing;
      legR.rotation.x = -swing;
      armL.rotation.x = -swing * 0.8;
      armR.rotation.x = swing * 0.8;
      root.position.y = Math.abs(Math.sin(walkT)) * 0.06 * amount;
      if (!state.moving) {
        // 멈추면 자세를 천천히 원위치로
        const k = 1 - Math.exp(-10 * dt);
        legL.rotation.x += (0 - legL.rotation.x) * k;
        legR.rotation.x += (0 - legR.rotation.x) * k;
        armL.rotation.x += (0 - armL.rotation.x) * k;
        armR.rotation.x += (0 - armR.rotation.x) * k;
      }
    },
    dispose() {
      root.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.isMesh) {
          mesh.geometry.dispose();
          const m = mesh.material;
          if (Array.isArray(m)) m.forEach((x) => x.dispose());
          else m.dispose();
        }
      });
    },
  };
}
