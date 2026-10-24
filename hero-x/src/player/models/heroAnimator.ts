import * as THREE from 'three';
import { buildArmorModel, buildWeaponModel, disposeVisual, type EquipmentLooks } from '../EquipmentVisuals';
import type { PlayerModelState } from './PlaceholderModel';

/**
 * 코드로 만든 영웅 모델(임시 모델·매끈한 치비 모델)이 공유하는 관절 동작·장비 부착·정리
 * - 관절 구조: 몸통(torso) 아래 어깨→팔꿈치, 엉덩이→무릎, 머리. 모델마다 생김새는 달라도 이 그룹만 맞추면 같은 동작을 쓴다.
 * - 걷기(팔다리 교차·무릎 접힘·들썩임), 정지 숨쉬기, 점프, 회피, 피격 젖힘·붉은 기, 근접 콤보 3단·원거리 반동, 쓰러짐, 망토 흔들림(있으면).
 */
export interface HeroLimb {
  /** 위쪽 관절 (어깨 또는 엉덩이) */
  upper: THREE.Group;
  /** 아래쪽 관절 (팔꿈치 또는 무릎) */
  lower: THREE.Group;
}

export interface HeroRig {
  root: THREE.Group;
  torso: THREE.Group;
  head: THREE.Group;
  legL: HeroLimb;
  legR: HeroLimb;
  armL: HeroLimb;
  armR: HeroLimb;
  /** 피격 때 붉게 물들일 재질 */
  hurtMats: THREE.MeshStandardMaterial[];
  /** 망토 (없으면 생략): 아래로 갈수록 크게 흔들린다 */
  cape?: { geo: THREE.BufferGeometry; base: Float32Array };
}

export function createHeroAnimator(rig: HeroRig): (dt: number, state: PlayerModelState) => void {
  const { root, torso, head, legL, legR, armL, armR } = rig;
  let walkT = 0;
  let idleT = Math.random() * 10;
  let prevAirborne = false;
  /** 착지 눌림 남은 시간 */
  let landT = 0;
  /** 몸 기울임(옆) 부드럽게 */
  let lean = 0;
  const ease = (dt: number, k: number) => 1 - Math.exp(-k * dt);
  const toward = (obj: { rotation: THREE.Euler }, axis: 'x' | 'y' | 'z', target: number, k: number) => {
    obj.rotation[axis] += (target - obj.rotation[axis]) * k;
  };
  return (dt, state) => {
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
    for (const m of rig.hurtMats) m.emissive.setRGB(hurt * 0.6, 0, 0);

    if (rig.cape) {
      // 망토 흔들림: 아래로 갈수록 크게, 이동 중에는 뒤로 날린다
      const capePos = rig.cape.geo.attributes.position as THREE.BufferAttribute;
      const base = rig.cape.base;
      const wind = Math.sin(idleT * 3) * 0.04;
      const fly = (state.moving ? Math.min(1, state.speed / 7) : 0) * (state.dashing ? 1.6 : 1);
      for (let i = 0; i < capePos.count; i++) {
        const y = base[i * 3 + 1];
        const depth = -y / 0.7;
        capePos.setZ(i, base[i * 3 + 2] - depth * depth * (0.35 * fly) + wind * depth);
        capePos.setX(i, base[i * 3] + Math.sin(idleT * 4 + depth * 3) * 0.03 * depth);
      }
      capePos.needsUpdate = true;
    }

    if (state.dashing) {
      // 회피: 앞으로 숙이고 팔을 뒤로, 다리를 모은다
      toward(torso, 'x', 0.55, k);
      toward(armL.upper, 'x', 1.4, k);
      toward(armR.upper, 'x', 1.4, k);
      toward(legL.upper, 'x', -0.6, k);
      toward(legR.upper, 'x', 0.3, k);
      toward(legL.lower, 'x', 0.8, k);
      toward(legR.lower, 'x', 0.4, k);
      root.position.y = 0;
      return;
    }
    // 걷기(0)~달리기(1): 최고 속도의 55% 부터 달리기 자세로 (보폭·팔 흔들림·앞기울임이 커진다)
    const ratio = state.speedRatio ?? (state.moving ? Math.min(1, state.speed / 7) : 0);
    const run = state.moving ? Math.min(1, Math.max(0, (ratio - 0.55) / 0.45)) : 0;
    // 방향 전환 때 몸을 안쪽으로 살짝 기울인다 (급회전 흔들림 방지: 상한·완만한 보간)
    const targetLean = state.moving ? Math.max(-0.22, Math.min(0.22, -(state.turnRate ?? 0) * 0.025)) : 0;
    lean += (targetLean - lean) * ease(dt, 10);
    torso.rotation.z = lean;
    // 착지: 점프 끝에 몸이 눌렸다 펴진다
    if (prevAirborne && !state.airborne) landT = 0.18;
    prevAirborne = state.airborne;
    landT = Math.max(0, landT - dt);
    const squash = landT > 0 ? Math.sin((landT / 0.18) * Math.PI) * 0.12 : 0;
    toward(torso, 'x', hurt * -0.35 + (state.moving ? 0.08 + run * 0.16 : 0), k);

    if (state.airborne) {
      // 점프: 무릎을 접고 팔을 벌린다
      toward(legL.upper, 'x', -0.9, k);
      toward(legR.upper, 'x', 0.5, k);
      toward(legL.lower, 'x', 1.2, k);
      toward(legR.lower, 'x', 0.9, k);
      toward(armL.upper, 'x', -2.2, k);
      toward(armL.lower, 'x', -0.4, k);
      if (state.attack === null) toward(armR.upper, 'x', -2.2, k);
      root.position.y = 0;
      return;
    }
    // 걷기/달리기: 허벅지는 앞뒤로, 정강이는 뒤로 갈 때 접힌다. 팔은 반대로. 달리기는 보폭·무릎·팔이 크고 들썩임이 세다
    const amount = state.moving ? 1 : 0;
    walkT += dt * (state.speed > 0 ? state.speed * (1.7 - run * 0.3) : 0);
    const stride = 0.8 + run * 0.35;
    const swing = Math.sin(walkT) * stride * amount;
    const kneeL = Math.max(0, -Math.sin(walkT)) * (0.9 + run * 0.5) * amount;
    const kneeR = Math.max(0, Math.sin(walkT)) * (0.9 + run * 0.5) * amount;
    toward(legL.upper, 'x', swing + squash * 2, k);
    toward(legR.upper, 'x', -swing + squash * 2, k);
    toward(legL.lower, 'x', kneeL + squash * 3, k);
    toward(legR.lower, 'x', kneeR + squash * 3, k);
    toward(armL.upper, 'x', -swing * (0.8 + run * 0.4), k);
    toward(armL.lower, 'x', -0.3 - Math.max(0, -swing) * 0.4 - run * 0.6, k);
    // 숨쉬기(정지)·들썩임(이동)·착지 눌림
    const breathe = state.moving ? 0 : Math.sin(idleT * 2.2) * 0.012;
    torso.scale.set(1 + squash * 0.5, 1 + breathe - squash, 1 + squash * 0.5);
    root.position.y = Math.abs(Math.sin(walkT)) * (0.06 + run * 0.03) * amount - squash * 0.3;

    if (state.attack !== null && state.attackKind === 'ranged') {
      // 쏘기: 팔을 앞으로 뻗고 반동으로 살짝 튄다
      const p = state.attack;
      const recoil = Math.sin(Math.min(1, p * 1.6) * Math.PI);
      armR.upper.rotation.x = -Math.PI / 2 + recoil * 0.35;
      armR.upper.rotation.y = 0;
      armR.lower.rotation.x = -recoil * 0.4;
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
      armR.upper.rotation.x = -Math.PI / 2 * windup - swingK * 0.4;
      armR.upper.rotation.y = (0.5 - p) * 1.8 * dirSign;
      armR.lower.rotation.x = -0.6 * (1 - p) - 0.2;
      torso.rotation.y = step >= 2 ? p * Math.PI * 2 : (0.5 - p) * 0.55 * dirSign;
      head.rotation.y = step >= 2 ? 0 : (0.5 - p) * 0.3 * dirSign;
    } else {
      toward(armR.upper, 'x', swing * (0.8 + run * 0.4) - 0.1, ease(dt, 10));
      toward(armR.upper, 'y', 0, ease(dt, 10));
      toward(armR.lower, 'x', -0.35 + Math.sin(idleT * 2.2) * 0.03, ease(dt, 10));
      toward(torso, 'y', 0, ease(dt, 10));
      toward(head, 'y', 0, ease(dt, 10));
    }
    // 피격 시 머리도 뒤로
    toward(head, 'x', hurt * -0.3, k);
  };
}

/**
 * 장비 외형 부착: 무기는 팔꿈치 그룹의 손 위치(handOffset)에, 방어구는 몸통 상자에 맞춰. 기본 검(sword)은 교체 무기를 들면 숨긴다.
 * armUnit: 무기 크기 기준(팔 길이)
 */
export function createHeroEquipment(rig: HeroRig, sword: THREE.Object3D | null, handOffset: THREE.Vector3, armUnit: number, torsoBox: THREE.Box3): (looks: EquipmentLooks) => void {
  const gear: { melee: THREE.Group | null; ranged: THREE.Group | null; armor: THREE.Group | null } = { melee: null, ranged: null, armor: null };
  return (looks) => {
    disposeVisual(gear.melee);
    disposeVisual(gear.ranged);
    disposeVisual(gear.armor);
    gear.melee = gear.ranged = gear.armor = null;
    if (sword) sword.visible = looks.melee === null;
    if (looks.melee) {
      gear.melee = buildWeaponModel(looks.melee, armUnit);
      gear.melee.position.copy(handOffset);
      rig.armR.lower.add(gear.melee);
    }
    if (looks.ranged) {
      gear.ranged = buildWeaponModel(looks.ranged, armUnit);
      gear.ranged.position.copy(handOffset);
      rig.armL.lower.add(gear.ranged);
    }
    if (looks.armor) {
      gear.armor = buildArmorModel(looks.armor, torsoBox);
      rig.torso.add(gear.armor);
    }
  };
}

/** 트리 안 메시의 기하·재질 정리 */
export function disposeModelTree(root: THREE.Object3D): void {
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.isMesh) {
      mesh.geometry.dispose();
      const m = mesh.material;
      if (Array.isArray(m)) m.forEach((x) => x.dispose());
      else m.dispose();
    }
  });
}
