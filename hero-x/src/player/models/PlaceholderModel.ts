import * as THREE from 'three';
import { glow, pbr } from '../../render/materials';

/** 모델이 매 프레임 받는 상태 */
export interface PlayerModelState {
  moving: boolean;
  speed: number;
  /** 공격 동작 진행도 0~1, 공격 중이 아니면 null */
  attack: number | null;
  /** 점프 중 */
  airborne: boolean;
  /** 쓰러진 상태 */
  dead: boolean;
}

/**
 * 플레이어 모델 인터페이스
 * - 임시 모델(이 파일)과 나중에 넣을 전용 3D 모델(.glb)이 같은 인터페이스를 쓴다.
 * - 모델의 정면은 +Z 방향이어야 한다. (Player.facing 각도로 회전시킨다)
 */
export interface PlayerModel {
  readonly root: THREE.Group;
  /** 걷기·공격 등 동작 갱신 */
  update(dt: number, state: PlayerModelState): void;
  /** 메모리 정리 */
  dispose(): void;
  /** 얼굴 사진 텍스처 붙이기 (지원하는 모델만). null 이면 원래 얼굴 */
  setFace?(texture: THREE.Texture | null): void;
}

export interface PlaceholderColors {
  body: string;
  accent: string;
  skin: string;
  visor: string;
}

/**
 * 임시 플레이어 모델: 단순 도형을 조합한 작은 영웅 (오른손에 에너지 검)
 * - 외부 파일 없이 바로 실행된다.
 * - 전용 캐릭터 모델이 준비되면 Player.setModel() 로 교체한다.
 */
export function createPlaceholderModel(colors: PlaceholderColors): PlayerModel {
  const root = new THREE.Group();
  root.name = 'PlaceholderHero';

  const mat = (color: string) => pbr({ color, roughness: 0.55, metalness: 0.15 });
  const bodyMat = mat(colors.body);
  const accentMat = mat(colors.accent);
  const skinMat = mat(colors.skin);
  const visorMat = glow(colors.visor, 1.6);
  const bladeMat = glow(colors.visor, 2.2);
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

  // 몸통과 허리띠 (공격 때 몸통이 살짝 비틀린다)
  const torso = new THREE.Group();
  addMesh(torso, new THREE.BoxGeometry(0.6, 0.52, 0.36), bodyMat, 0, 0.76, 0);
  addMesh(torso, new THREE.BoxGeometry(0.62, 0.08, 0.38), accentMat, 0, 0.52, 0);
  addMesh(torso, new THREE.BoxGeometry(0.36, 0.4, 0.18), accentMat, 0, 0.8, -0.26); // 배낭
  root.add(torso);

  // 팔: 어깨를 기준으로 흔들린다
  const makeArm = (x: number) => {
    const pivot = new THREE.Group();
    pivot.position.set(x, 0.98, 0);
    addMesh(pivot, new THREE.CylinderGeometry(0.085, 0.08, 0.44, 10), bodyMat, 0, -0.2, 0);
    addMesh(pivot, new THREE.SphereGeometry(0.1, 10, 8), skinMat, 0, -0.44, 0);
    torso.add(pivot);
    return pivot;
  };
  const armL = makeArm(-0.38);
  const armR = makeArm(0.38);

  // 오른손의 에너지 검: 손에서 앞(+Z)으로 뻗는다. 평소에는 아래로 내려 들고 있다
  const sword = new THREE.Group();
  sword.position.set(0, -0.44, 0);
  addMesh(sword, new THREE.BoxGeometry(0.07, 0.07, 0.9), bladeMat, 0, 0, 0.5);
  addMesh(sword, new THREE.BoxGeometry(0.18, 0.06, 0.06), accentMat, 0, 0, 0.08);
  armR.add(sword);

  // 머리: 둥근 머리 + 앞쪽 바이저(얼굴 방향 = +Z)
  const head = new THREE.Group();
  head.position.y = 1.42;
  addMesh(head, new THREE.SphereGeometry(0.4, 24, 18), skinMat);
  addMesh(head, new THREE.BoxGeometry(0.5, 0.16, 0.12), visorMat, 0, 0.05, 0.36);
  const hair = addMesh(head, new THREE.SphereGeometry(0.43, 24, 12, 0, Math.PI * 2, 0, Math.PI * 0.5), darkMat, 0, 0.03, -0.05);
  hair.rotation.x = -0.3;
  // 얼굴 사진: 머리 앞면에 살짝 둥근 판을 두고 사진 텍스처를 붙인다 (사진이 없으면 숨김)
  const faceMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 1 });
  // SphereGeometry 의 phi 는 +X 에서 시작해 +Z 가 π/2 이므로, 정면(+Z)을 중심으로 0.56π 만큼 잘라낸다
  const facePlane = new THREE.Mesh(new THREE.SphereGeometry(0.405, 24, 18, Math.PI * 0.22, Math.PI * 0.56, Math.PI * 0.22, Math.PI * 0.56), faceMat);
  facePlane.visible = false;
  head.add(facePlane);
  const visor = head.children[1];
  root.add(head);

  let walkT = 0;

  return {
    root,
    setFace(texture) {
      if (faceMat.map && faceMat.map !== texture) faceMat.map.dispose();
      if (texture) {
        // 구면 조각의 u 방향이 보는 사람 기준 오른쪽→왼쪽이라 좌우를 뒤집어 거울상이 되지 않게 한다
        texture.wrapS = THREE.RepeatWrapping;
        texture.repeat.x = -1;
        texture.needsUpdate = true;
      }
      faceMat.map = texture;
      faceMat.needsUpdate = true;
      facePlane.visible = texture !== null;
      visor.visible = texture === null;
    },
    update(dt, state) {
      if (state.dead) {
        // 쓰러짐: 옆으로 눕는다
        root.rotation.z = THREE.MathUtils.lerp(root.rotation.z, Math.PI / 2, 1 - Math.exp(-8 * dt));
        root.position.y = THREE.MathUtils.lerp(root.position.y, 0.4, 1 - Math.exp(-8 * dt));
        return;
      }
      root.rotation.z = 0;

      if (state.airborne) {
        // 점프: 다리를 접고 팔을 벌린다
        const k = 1 - Math.exp(-14 * dt);
        legL.rotation.x += (-0.9 - legL.rotation.x) * k;
        legR.rotation.x += (0.5 - legR.rotation.x) * k;
        armL.rotation.x += (-2.2 - armL.rotation.x) * k;
        if (state.attack === null) armR.rotation.x += (-2.2 - armR.rotation.x) * k;
        root.position.y = 0;
        return;
      }
      // 걷는 동안 다리와 팔을 교차로 흔들고 몸을 살짝 들썩인다
      const amount = state.moving ? 1 : 0;
      walkT += dt * (state.speed > 0 ? state.speed * 1.6 : 0);
      const swing = Math.sin(walkT) * 0.75 * amount;
      legL.rotation.x = swing;
      legR.rotation.x = -swing;
      armL.rotation.x = -swing * 0.8;
      root.position.y = Math.abs(Math.sin(walkT)) * 0.06 * amount;

      if (state.attack !== null) {
        // 휘두르기: 오른팔을 앞으로 올리며 몸통을 비튼다 (0→1 진행)
        const p = state.attack;
        const k = Math.sin(p * Math.PI);
        armR.rotation.x = -Math.PI / 2 * Math.min(1, p * 2) - k * 0.3;
        armR.rotation.y = (0.5 - p) * 1.6;
        torso.rotation.y = (0.5 - p) * 0.5;
      } else {
        const k = 1 - Math.exp(-10 * dt);
        armR.rotation.x += (swing * 0.8 - armR.rotation.x) * k;
        armR.rotation.y += (0 - armR.rotation.y) * k;
        torso.rotation.y += (0 - torso.rotation.y) * k;
      }

      if (!state.moving) {
        const k = 1 - Math.exp(-10 * dt);
        legL.rotation.x += (0 - legL.rotation.x) * k;
        legR.rotation.x += (0 - legR.rotation.x) * k;
        armL.rotation.x += (0 - armL.rotation.x) * k;
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
