import * as THREE from 'three';
import { glow, pbr } from '../../render/materials';

/** 모델이 매 프레임 받는 상태 */
export interface PlayerModelState {
  moving: boolean;
  speed: number;
  /** 공격 동작 진행도 0~1, 공격 중이 아니면 null */
  attack: number | null;
  /** 공격 종류: 근접(베기) / 원거리(쏘기). 없으면 근접 */
  attackKind?: 'melee' | 'ranged';
  /** 근접 콤보 단계(0부터): 0 가로 베기, 1 되돌려 베기, 2 이상 회전 베기 */
  attackStep?: number;
  /** 점프 중 */
  airborne: boolean;
  /** 쓰러진 상태 */
  dead: boolean;
  /** 회피(대시) 중 */
  dashing?: boolean;
  /** 피격 직후 남은 비율 1→0 (무적 시간 기준). 0 이면 평소 */
  hurt?: number;
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
 * 코드로 만든 영웅 모델 (관절형)
 * - 허벅지·정강이, 위팔·아래팔이 따로 움직여 걷기·공격·점프·회피·피격 동작이 자연스럽다.
 * - 얼굴(눈·눈썹·입), 머리카락 뭉치, 어깨 보호대, 허리띠 버클(빛남), 장화, 바람에 흔들리는 망토, 에너지 검.
 * - 외부 파일 없이 바로 실행된다. 전용 캐릭터 모델(.glb)이 준비되면 Player.setModel() 로 교체한다.
 */
export function createPlaceholderModel(colors: PlaceholderColors): PlayerModel {
  const root = new THREE.Group();
  root.name = 'PlaceholderHero';

  const mat = (color: string) => pbr({ color, roughness: 0.55, metalness: 0.15 });
  const bodyMat = mat(colors.body);
  const accentMat = pbr({ color: colors.accent, roughness: 0.35, metalness: 0.7 });
  const skinMat = pbr({ color: colors.skin, roughness: 0.7, metalness: 0 });
  const visorMat = glow(colors.visor, 1.0);
  const bladeMat = glow(colors.visor, 2.2);
  const darkMat = mat('#2c3e6b');
  const hairMat = pbr({ color: '#1f2433', roughness: 0.8 });
  const capeMat = pbr({ color: '#c0392b', roughness: 0.8 });
  capeMat.side = THREE.DoubleSide;
  const eyeMat = pbr({ color: '#1a1a22', roughness: 0.3 });
  const whiteMat = pbr({ color: '#ffffff', roughness: 0.4 });

  const addMesh = (parent: THREE.Object3D, geo: THREE.BufferGeometry, m: THREE.Material, x = 0, y = 0, z = 0) => {
    const mesh = new THREE.Mesh(geo, m);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    parent.add(mesh);
    return mesh;
  };

  // 다리: 엉덩이(허벅지 축) → 무릎(정강이 축) → 장화
  const makeLeg = (x: number) => {
    const hip = new THREE.Group();
    hip.position.set(x, 0.52, 0);
    addMesh(hip, new THREE.CylinderGeometry(0.11, 0.1, 0.26, 10), darkMat, 0, -0.13, 0);
    const knee = new THREE.Group();
    knee.position.set(0, -0.26, 0);
    addMesh(knee, new THREE.CylinderGeometry(0.095, 0.09, 0.24, 10), darkMat, 0, -0.12, 0);
    addMesh(knee, new THREE.BoxGeometry(0.22, 0.12, 0.3), accentMat, 0, -0.26, 0.04); // 장화
    hip.add(knee);
    root.add(hip);
    return { hip, knee };
  };
  const legL = makeLeg(-0.14);
  const legR = makeLeg(0.14);

  // 몸통·허리띠·버클·배낭·어깨 보호대
  const torso = new THREE.Group();
  addMesh(torso, new THREE.BoxGeometry(0.58, 0.52, 0.36), bodyMat, 0, 0.78, 0);
  addMesh(torso, new THREE.BoxGeometry(0.62, 0.08, 0.38), accentMat, 0, 0.54, 0);
  addMesh(torso, new THREE.BoxGeometry(0.12, 0.1, 0.04), glow(colors.visor, 1.0), 0, 0.54, 0.2); // 버클
  addMesh(torso, new THREE.BoxGeometry(0.36, 0.4, 0.18), accentMat, 0, 0.82, -0.26); // 배낭
  for (const sx of [-1, 1]) addMesh(torso, new THREE.SphereGeometry(0.15, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2), accentMat, sx * 0.36, 1.02, 0);
  root.add(torso);

  // 망토: 등 뒤에 걸린 판. 아래쪽이 바람·이동에 따라 흔들린다
  const capeGeo = new THREE.PlaneGeometry(0.5, 0.7, 1, 4);
  capeGeo.translate(0, -0.35, 0);
  const cape = new THREE.Mesh(capeGeo, capeMat);
  cape.position.set(0, 1.02, -0.2);
  cape.castShadow = true;
  torso.add(cape);
  const capeBase = (capeGeo.attributes.position as THREE.BufferAttribute).array.slice() as Float32Array;

  // 팔: 어깨(위팔 축) → 팔꿈치(아래팔 축) → 손
  const makeArm = (x: number) => {
    const shoulder = new THREE.Group();
    shoulder.position.set(x, 0.98, 0);
    addMesh(shoulder, new THREE.CylinderGeometry(0.085, 0.08, 0.24, 10), bodyMat, 0, -0.12, 0);
    const elbow = new THREE.Group();
    elbow.position.set(0, -0.24, 0);
    addMesh(elbow, new THREE.CylinderGeometry(0.075, 0.07, 0.22, 10), skinMat, 0, -0.11, 0);
    addMesh(elbow, new THREE.SphereGeometry(0.1, 10, 8), skinMat, 0, -0.24, 0);
    shoulder.add(elbow);
    torso.add(shoulder);
    return { shoulder, elbow };
  };
  const armL = makeArm(-0.38);
  const armR = makeArm(0.38);

  // 오른손의 에너지 검: 손에서 앞(+Z)으로 뻗는다
  const sword = new THREE.Group();
  sword.position.set(0, -0.24, 0);
  addMesh(sword, new THREE.BoxGeometry(0.07, 0.07, 0.9), bladeMat, 0, 0, 0.5);
  addMesh(sword, new THREE.BoxGeometry(0.2, 0.06, 0.06), accentMat, 0, 0, 0.08);
  addMesh(sword, new THREE.CylinderGeometry(0.035, 0.035, 0.2, 8), darkMat, 0, 0, -0.08).rotation.x = Math.PI / 2;
  armR.elbow.add(sword);

  // 머리: 둥근 머리 + 얼굴(눈·눈썹·입) + 머리카락 뭉치 + 바이저(머리띠)
  const head = new THREE.Group();
  head.position.y = 1.42;
  addMesh(head, new THREE.SphereGeometry(0.4, 24, 18), skinMat);
  const face = new THREE.Group();
  for (const sx of [-1, 1]) {
    addMesh(face, new THREE.SphereGeometry(0.075, 10, 8), whiteMat, sx * 0.14, 0.02, 0.35);
    addMesh(face, new THREE.SphereGeometry(0.04, 8, 6), eyeMat, sx * 0.14, 0.02, 0.405);
    const brow = addMesh(face, new THREE.BoxGeometry(0.14, 0.03, 0.03), hairMat, sx * 0.14, 0.13, 0.37);
    brow.rotation.z = sx * 0.15;
  }
  addMesh(face, new THREE.BoxGeometry(0.12, 0.03, 0.03), pbr({ color: '#a1413a', roughness: 0.8 }), 0, -0.16, 0.38); // 입
  head.add(face);
  addMesh(head, new THREE.BoxGeometry(0.52, 0.1, 0.1), visorMat, 0, 0.22, 0.33); // 머리띠(바이저)
  const hair = addMesh(head, new THREE.SphereGeometry(0.43, 24, 12, 0, Math.PI * 2, 0, Math.PI * 0.5), hairMat, 0, 0.04, -0.05);
  hair.rotation.x = -0.3;
  for (let i = 0; i < 5; i++) {
    const tuft = addMesh(head, new THREE.ConeGeometry(0.09, 0.26, 5), hairMat, (i - 2) * 0.13, 0.42, -0.05 + Math.abs(i - 2) * 0.02);
    tuft.rotation.z = (i - 2) * 0.35;
    tuft.rotation.x = -0.4;
  }
  // 얼굴 사진: 머리 앞면에 살짝 둥근 판을 두고 사진 텍스처를 붙인다 (사진이 없으면 숨김)
  const faceMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 1 });
  // SphereGeometry 의 phi 는 +X 에서 시작해 +Z 가 π/2 이므로, 정면(+Z)을 중심으로 0.56π 만큼 잘라낸다
  const facePlane = new THREE.Mesh(new THREE.SphereGeometry(0.405, 24, 18, Math.PI * 0.22, Math.PI * 0.56, Math.PI * 0.22, Math.PI * 0.56), faceMat);
  facePlane.visible = false;
  head.add(facePlane);
  root.add(head);

  let walkT = 0;
  let idleT = Math.random() * 10;
  const ease = (dt: number, k: number) => 1 - Math.exp(-k * dt);
  const toward = (obj: { rotation: THREE.Euler }, axis: 'x' | 'y' | 'z', target: number, k: number) => {
    obj.rotation[axis] += (target - obj.rotation[axis]) * k;
  };

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
      face.visible = texture === null;
    },
    update(dt, state) {
      idleT += dt;
      if (state.dead) {
        // 쓰러짐: 옆으로 눕는다
        root.rotation.z = THREE.MathUtils.lerp(root.rotation.z, Math.PI / 2, ease(dt, 8));
        root.position.y = THREE.MathUtils.lerp(root.position.y, 0.4, ease(dt, 8));
        return;
      }
      root.rotation.z = 0;
      const k = ease(dt, 14);
      const hurt = state.hurt ?? 0;
      // 피격: 뒤로 젖혀지며 붉게
      bodyMat.emissive.setRGB(hurt * 0.8, 0, 0);
      skinMat.emissive.setRGB(hurt * 0.5, 0, 0);

      // 망토 흔들림: 아래로 갈수록 크게, 이동 중에는 뒤로 날린다
      const capePos = capeGeo.attributes.position as THREE.BufferAttribute;
      const wind = Math.sin(idleT * 3) * 0.04;
      const fly = (state.moving ? Math.min(1, state.speed / 7) : 0) * (state.dashing ? 1.6 : 1);
      for (let i = 0; i < capePos.count; i++) {
        const y = capeBase[i * 3 + 1];
        const depth = -y / 0.7; // 0(위)~1(아래)
        capePos.setZ(i, capeBase[i * 3 + 2] - depth * depth * (0.35 * fly) + wind * depth);
        capePos.setX(i, capeBase[i * 3] + Math.sin(idleT * 4 + depth * 3) * 0.03 * depth);
      }
      capePos.needsUpdate = true;

      if (state.dashing) {
        // 회피: 앞으로 숙이고 팔을 뒤로, 다리를 모은다
        toward(torso, 'x', 0.55, k);
        toward(armL.shoulder, 'x', 1.4, k);
        toward(armR.shoulder, 'x', 1.4, k);
        toward(legL.hip, 'x', -0.6, k);
        toward(legR.hip, 'x', 0.3, k);
        toward(legL.knee, 'x', 0.8, k);
        toward(legR.knee, 'x', 0.4, k);
        root.position.y = 0;
        return;
      }
      toward(torso, 'x', hurt * -0.35 + (state.moving ? 0.08 : 0), k);

      if (state.airborne) {
        // 점프: 무릎을 접고 팔을 벌린다
        toward(legL.hip, 'x', -0.9, k);
        toward(legR.hip, 'x', 0.5, k);
        toward(legL.knee, 'x', 1.2, k);
        toward(legR.knee, 'x', 0.9, k);
        toward(armL.shoulder, 'x', -2.2, k);
        toward(armL.elbow, 'x', -0.4, k);
        if (state.attack === null) toward(armR.shoulder, 'x', -2.2, k);
        root.position.y = 0;
        return;
      }
      // 걷기: 허벅지는 앞뒤로, 정강이는 뒤로 갈 때 접힌다. 팔은 반대로
      const amount = state.moving ? 1 : 0;
      walkT += dt * (state.speed > 0 ? state.speed * 1.7 : 0);
      const swing = Math.sin(walkT) * 0.8 * amount;
      const kneeL = Math.max(0, -Math.sin(walkT)) * 0.9 * amount;
      const kneeR = Math.max(0, Math.sin(walkT)) * 0.9 * amount;
      toward(legL.hip, 'x', swing, k);
      toward(legR.hip, 'x', -swing, k);
      toward(legL.knee, 'x', kneeL, k);
      toward(legR.knee, 'x', kneeR, k);
      toward(armL.shoulder, 'x', -swing * 0.8, k);
      toward(armL.elbow, 'x', -0.3 - Math.max(0, -swing) * 0.4, k);
      // 숨쉬기(정지)·들썩임(이동)
      const breathe = state.moving ? 0 : Math.sin(idleT * 2.2) * 0.012;
      torso.scale.set(1, 1 + breathe, 1);
      root.position.y = Math.abs(Math.sin(walkT)) * 0.06 * amount;

      if (state.attack !== null && state.attackKind === 'ranged') {
        // 쏘기: 팔을 앞으로 뻗고 반동으로 살짝 튄다
        const p = state.attack;
        const recoil = Math.sin(Math.min(1, p * 1.6) * Math.PI);
        armR.shoulder.rotation.x = -Math.PI / 2 + recoil * 0.35;
        armR.shoulder.rotation.y = 0;
        armR.elbow.rotation.x = -recoil * 0.4;
        torso.rotation.y = 0;
        torso.rotation.x = -recoil * 0.08;
        head.rotation.y = 0;
      } else if (state.attack !== null) {
        // 휘두르기: 오른팔을 뒤로 당겼다가 앞으로 크게 뿌리고, 몸통·머리가 따라 돈다
        // 콤보 2단은 반대 방향으로 되돌려 베고, 3단은 몸을 한 바퀴 돌린다
        const p = state.attack;
        const step = state.attackStep ?? 0;
        const dirSign = step === 1 ? -1 : 1;
        const windup = Math.min(1, p * 2.5);
        const swingK = Math.sin(p * Math.PI);
        armR.shoulder.rotation.x = -Math.PI / 2 * windup - swingK * 0.4;
        armR.shoulder.rotation.y = (0.5 - p) * 1.8 * dirSign;
        armR.elbow.rotation.x = -0.6 * (1 - p) - 0.2;
        torso.rotation.y = step >= 2 ? p * Math.PI * 2 : (0.5 - p) * 0.55 * dirSign;
        head.rotation.y = step >= 2 ? 0 : (0.5 - p) * 0.3 * dirSign;
      } else {
        toward(armR.shoulder, 'x', swing * 0.8 - 0.1, ease(dt, 10));
        toward(armR.shoulder, 'y', 0, ease(dt, 10));
        toward(armR.elbow, 'x', -0.35 + Math.sin(idleT * 2.2) * 0.03, ease(dt, 10));
        toward(torso, 'y', 0, ease(dt, 10));
        toward(head, 'y', 0, ease(dt, 10));
      }
      // 피격 시 머리도 뒤로
      toward(head, 'x', hurt * -0.3, k);
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
