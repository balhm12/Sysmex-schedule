import * as THREE from 'three';
import type { PlayerModelState } from '../player/models/PlaceholderModel';

/**
 * 부품 이름 기반 절차 애니메이션 (애니메이션 클립이 없는 .glb 용)
 * - 복셀·블록 캐릭터처럼 부품(left_leg, right_arm, head, sword_blade …)이 따로 메시로 들어 있고
 *   이름만 붙어 있으면, 이름으로 다리·팔·머리를 묶고 관절 위치(엉덩이·어깨·목)를 바운딩 박스로 잡아
 *   임시 모델과 같은 걷기·공격·점프·회피·피격·쓰러짐 동작을 만든다.
 * - 이름 규칙: 'left_'/'right_'(또는 'l_'/'r_') 접두어 + leg/boot/knee/thigh/shin/foot 또는 arm/hand/bracer/forearm/glove/shoulder.
 *   머리: head/hair/fringe/ear/eye/pupil/brow/nose/mouth/glass/hat/helmet 로 시작. 무기: sword/weapon/blade/shield/axe/staff (가까운 팔에 붙음).
 * - 양 다리 또는 양 팔이 없으면 리그를 만들지 않는다(null) → 단순 흔들림으로 대체.
 */
export type PartKind = 'leftLeg' | 'rightLeg' | 'leftArm' | 'rightArm' | 'head' | 'weapon' | null;

const SIDE = /^(left|right|l|r)[_\- ]?(.+)$/;
const LEG = /^(leg|boot|knee|thigh|shin|foot|shoe)/;
const ARM = /^(arm|hand|bracer|forearm|glove|shoulder|upperarm|lowerarm)/;
const HEAD = /^(head|hair|fringe|ear|eye|pupil|glint|brow|nose|mouth|glass|hat|helmet|cap|visor)/;
const WEAPON = /^(sword|weapon|blade|shield|axe|staff|bow|gun|wand)/;

/** 메시 이름 → 부품 종류 (순수 함수, 테스트 대상) */
export function classifyPart(name: string): PartKind {
  const n = name.toLowerCase().trim();
  if (WEAPON.test(n)) return 'weapon';
  if (HEAD.test(n)) return 'head';
  const m = SIDE.exec(n);
  if (m) {
    const left = m[1] === 'left' || m[1] === 'l';
    const rest = m[2];
    if (LEG.test(rest)) return left ? 'leftLeg' : 'rightLeg';
    if (ARM.test(rest)) return left ? 'leftArm' : 'rightArm';
    if (HEAD.test(rest)) return 'head';
    return null;
  }
  return null;
}

export interface PartRig {
  update(dt: number, s: PlayerModelState): void;
}

interface Joint {
  group: THREE.Group;
  /** 관절 중심에서 부품 끝까지 길이 (대략, 동작 크기 보정용) */
  length: number;
}

/**
 * root 아래 메시를 이름으로 묶어 관절 그룹을 만든다. root 의 변환은 항등이어야 하고(아직 씬에 안 붙은 상태),
 * 메시는 이미 크기·회전 보정이 끝나 있어야 한다(월드 = root 좌표).
 */
export function buildPartRig(root: THREE.Object3D): PartRig | null {
  root.updateMatrixWorld(true);
  const groups = new Map<Exclude<PartKind, null>, THREE.Mesh[]>();
  root.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh) return;
    const kind = classifyPart(mesh.name);
    if (!kind) return;
    const list = groups.get(kind) ?? [];
    list.push(mesh);
    groups.set(kind, list);
  });
  const hasLegs = groups.has('leftLeg') && groups.has('rightLeg');
  const hasArms = groups.has('leftArm') && groups.has('rightArm');
  if (!hasLegs && !hasArms) return null;

  const boxOf = (meshes: THREE.Mesh[]) => {
    const box = new THREE.Box3();
    for (const m of meshes) box.expandByObject(m);
    return box;
  };
  // 무기는 가까운 쪽 팔에 붙인다 (무기 중심 x 와 팔 중심 x 비교)
  const weapons = groups.get('weapon') ?? [];
  let weaponSide: 'leftArm' | 'rightArm' | null = null;
  if (weapons.length > 0 && hasArms) {
    const wx = boxOf(weapons).getCenter(new THREE.Vector3()).x;
    const lx = boxOf(groups.get('leftArm')!).getCenter(new THREE.Vector3()).x;
    const rx = boxOf(groups.get('rightArm')!).getCenter(new THREE.Vector3()).x;
    weaponSide = Math.abs(wx - lx) <= Math.abs(wx - rx) ? 'leftArm' : 'rightArm';
    groups.get(weaponSide)!.push(...weapons);
  }

  // 관절 그룹 만들기: 다리·팔은 위쪽 끝(엉덩이·어깨), 머리는 아래쪽 끝(목)이 관절
  const makeJoint = (kind: Exclude<PartKind, null>, atTop: boolean): Joint | null => {
    const meshes = groups.get(kind);
    if (!meshes || meshes.length === 0) return null;
    // 무기를 뺀 몸 부품만으로 관절 위치를 잡는다
    const body = meshes.filter((m) => classifyPart(m.name) !== 'weapon');
    const box = boxOf(body.length ? body : meshes);
    const c = box.getCenter(new THREE.Vector3());
    const pivot = new THREE.Vector3(c.x, atTop ? box.max.y : box.min.y, c.z);
    const group = new THREE.Group();
    group.name = `joint:${kind}`;
    group.position.copy(pivot);
    root.add(group);
    group.updateMatrixWorld(true);
    for (const m of meshes) group.attach(m);
    return { group, length: box.max.y - box.min.y };
  };
  const lLeg = hasLegs ? makeJoint('leftLeg', true) : null;
  const rLeg = hasLegs ? makeJoint('rightLeg', true) : null;
  const lArm = hasArms ? makeJoint('leftArm', true) : null;
  const rArm = hasArms ? makeJoint('rightArm', true) : null;
  const head = makeJoint('head', false);
  const swordArm = weaponSide === 'leftArm' ? lArm : weaponSide === 'rightArm' ? rArm : rArm;
  const otherArm = swordArm === lArm ? rArm : lArm;

  // 몸 전체(관절 포함)를 한 번 더 감싸 기울임·회전을 root 와 분리한다
  const body = new THREE.Group();
  body.name = 'rigBody';
  const children = [...root.children];
  root.add(body);
  for (const ch of children) body.attach(ch);

  let t = 0;
  const lerp = (a: number, b: number, k: number) => a + (b - a) * Math.max(0, Math.min(1, k));
  const ease = (k: number) => k * k * (3 - 2 * k);
  return {
    update(dt: number, s: PlayerModelState) {
      t += dt;
      const hurt = s.hurt ?? 0;
      // 기본값
      let legL = 0;
      let legR = 0;
      let armL = 0;
      let armR = 0;
      let armSwordSide = 0; // 검 든 팔의 옆 벌림(z 축)
      let headPitch = 0;
      let bodyPitch = 0;
      let bodyYaw = 0;
      let bob = 0;
      if (s.dead) {
        // 뒤로 쓰러짐
        body.rotation.set(-1.45, 0, 0);
        body.position.y = 0.25;
        return;
      }
      if (s.moving) {
        const w = t * 9 * Math.max(0.6, Math.min(1.4, s.speed / 6));
        legL = Math.sin(w) * 0.65;
        legR = -legL;
        armL = -Math.sin(w) * 0.5;
        armR = -armL;
        bob = Math.abs(Math.sin(w)) * 0.035;
        bodyPitch = 0.06;
      } else {
        // 서 있을 때 숨쉬기
        armL = armR = Math.sin(t * 2) * 0.04;
        bob = Math.sin(t * 2) * 0.01;
      }
      if (s.airborne) {
        legL = 0.55;
        legR = 0.3;
        armL = armR = -2.4;
      }
      if (s.dashing) {
        bodyPitch = 0.45;
        armL = armR = 0.9;
        legL = 0.7;
        legR = -0.5;
      }
      // 공격: 검 든 팔을 뒤로 당겼다가 앞으로 크게 휘두르고 몸이 따라 돈다
      let sword = 0;
      let other = 0;
      if (s.attack !== null) {
        const a = s.attack;
        if (a < 0.3) {
          sword = lerp(0, -2.2, ease(a / 0.3));
          armSwordSide = lerp(0, 0.5, a / 0.3);
          bodyYaw = lerp(0, 0.35, a / 0.3);
        } else {
          const k = ease((a - 0.3) / 0.7);
          sword = lerp(-2.2, 1.1, k);
          armSwordSide = lerp(0.5, -0.2, k);
          bodyYaw = lerp(0.35, -0.3, k);
          bodyPitch += lerp(0, 0.18, k);
        }
        other = -sword * 0.3;
      }
      if (hurt > 0) {
        bodyPitch -= 0.35 * hurt;
        headPitch -= 0.3 * hurt;
      }
      const swordSign = swordArm === lArm ? 1 : -1;
      if (lLeg) lLeg.group.rotation.x = legL;
      if (rLeg) rLeg.group.rotation.x = legR;
      if (swordArm) {
        swordArm.group.rotation.x = s.attack !== null ? sword : swordArm === lArm ? armL : armR;
        swordArm.group.rotation.z = armSwordSide * swordSign;
      }
      if (otherArm) {
        otherArm.group.rotation.x = s.attack !== null ? other : otherArm === lArm ? armL : armR;
        otherArm.group.rotation.z = 0;
      }
      if (head) head.group.rotation.x = headPitch + (s.moving ? Math.sin(t * 9) * 0.02 : 0);
      body.rotation.set(bodyPitch, bodyYaw, 0);
      body.position.y = bob;
    },
  };
}
