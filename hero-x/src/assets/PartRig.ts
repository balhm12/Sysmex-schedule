import * as THREE from 'three';
import type { EnemyModelState } from '../enemies/EnemyModels';
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

// ====================== 적 리그 ======================

/** 적 전용 부품 종류: 이름 접두어로 정한다 (사람형 부품 left_/right_/head/weapon 은 classifyPart 가 맡는다) */
export type EnemyPartKind = 'wheel' | 'claw' | 'rotor' | 'wing' | 'barrel' | 'shield' | 'piston' | 'antenna' | 'glow' | 'eye' | 'float' | 'leg' | null;

const ENEMY_PREFIX: Array<[RegExp, Exclude<EnemyPartKind, null>]> = [
  [/^wheel/, 'wheel'],
  [/^claw/, 'claw'],
  [/^rotor/, 'rotor'],
  [/^wing/, 'wing'],
  [/^barrel/, 'barrel'],
  [/^shield/, 'shield'],
  [/^piston/, 'piston'],
  [/^antenna/, 'antenna'],
  [/^glow/, 'glow'],
  [/^eye/, 'eye'],
  [/^float/, 'float'],
  [/^leg/, 'leg'],
];

/** 적 메시 이름 → 부품 종류 (순수 함수, 테스트 대상) */
export function classifyEnemyPart(name: string): EnemyPartKind {
  const n = name.toLowerCase().trim();
  for (const [re, kind] of ENEMY_PREFIX) if (re.test(n)) return kind;
  return null;
}

/** 'claw_l_arm' / 'wing_r' / 'wheel_fl_hub' 처럼 종류 뒤의 첫 토큰이 묶음 이름(한 관절) */
export function enemyPartGroup(name: string): string {
  const n = name.toLowerCase().trim();
  const parts = n.split(/[_\-\s]+/);
  return parts.length >= 2 ? `${parts[0]}:${parts[1]}` : parts[0];
}

export interface EnemyPartRig {
  update(dt: number, s: EnemyModelState): void;
}

interface EnemyJoint {
  kind: Exclude<EnemyPartKind, null>;
  group: THREE.Group;
  /** 좌우 부호 (x 중심의 부호) */
  side: number;
  base: THREE.Vector3;
}

/**
 * 적 모델의 부품 이름으로 관절을 만든다 (root 변환은 항등, 메시는 보정 완료 상태).
 * 기계 부품: wheel(이동 시 X 회전) · claw(예고 때 Y 로 벌어짐) · rotor(항상 회전, 떠다님) · wing(퍼덕임, 떠다님) ·
 *   barrel(발사 순간 반동) · shield(예고 때 들어 올림) · piston(이동 시 펌프) · antenna(흔들림) · glow(예고 때 밝게) ·
 *   eye(예고 때 커짐) · float(있으면 떠다님) · leg(짧게 흔들림).
 * 사람형 부품(left_/right_ + leg/arm/hand…, head, weapon_*): 걷기(팔다리 교차)·예고(무기 팔 뒤로 치켜들기)·공격(앞으로 휘두르기).
 * 인식된 부품이 하나도 없으면 null.
 */
export function buildEnemyPartRig(root: THREE.Object3D): EnemyPartRig | null {
  root.updateMatrixWorld(true);
  const whole = new THREE.Box3().setFromObject(root);
  const height = Math.max(0.01, whole.max.y - whole.min.y);
  const groups = new Map<string, { kind: Exclude<EnemyPartKind, null>; meshes: THREE.Mesh[] }>();
  const humanoid = new Map<Exclude<PartKind, null>, THREE.Mesh[]>();
  root.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh) return;
    // 사람형 부품이 우선 (left_leg 는 'leg' 접두어가 아니므로 겹치지 않지만, 안전하게 먼저 본다)
    const hk = classifyPart(mesh.name);
    if (hk) {
      const list = humanoid.get(hk) ?? [];
      list.push(mesh);
      humanoid.set(hk, list);
      return;
    }
    const kind = classifyEnemyPart(mesh.name);
    if (!kind) return;
    // 묶음: 발광·눈은 메시마다, 로터·포신·방패는 종류마다 하나, 나머지(바퀴·집게·날개·피스톤·안테나·다리)는 두 번째 토큰까지
    const key = kind === 'glow' || kind === 'eye' ? `${kind}:${mesh.name}` : kind === 'rotor' || kind === 'barrel' || kind === 'shield' ? kind : enemyPartGroup(mesh.name);
    const g = groups.get(key) ?? { kind, meshes: [] };
    g.meshes.push(mesh);
    groups.set(key, g);
  });
  const hasLegs = humanoid.has('leftLeg') && humanoid.has('rightLeg');
  const hasArms = humanoid.has('leftArm') && humanoid.has('rightArm');
  if (groups.size === 0 && !hasLegs && !hasArms) return null;

  const boxOf = (meshes: THREE.Mesh[]) => {
    const box = new THREE.Box3();
    for (const m of meshes) box.expandByObject(m);
    return box;
  };
  const attachJoint = (name: string, meshes: THREE.Mesh[], pivot: THREE.Vector3): THREE.Group => {
    const group = new THREE.Group();
    group.name = name;
    group.position.copy(pivot);
    root.add(group);
    group.updateMatrixWorld(true);
    for (const m of meshes) group.attach(m);
    return group;
  };

  // --- 기계 부품 관절 ---
  const joints: EnemyJoint[] = [];
  const glowMats: THREE.MeshStandardMaterial[] = [];
  let floating = false;
  for (const { kind, meshes } of groups.values()) {
    if (kind === 'float') {
      floating = true;
      continue;
    }
    const box = boxOf(meshes);
    const c = box.getCenter(new THREE.Vector3());
    const side = c.x >= 0 ? 1 : -1;
    let pivot: THREE.Vector3;
    switch (kind) {
      case 'claw':
      case 'wing':
        pivot = new THREE.Vector3(side > 0 ? box.min.x : box.max.x, c.y, kind === 'claw' ? box.min.z : c.z); // 몸 쪽 모서리
        break;
      case 'shield':
      case 'antenna':
        pivot = new THREE.Vector3(c.x, box.min.y, c.z); // 아래 모서리
        break;
      case 'leg':
        pivot = new THREE.Vector3(c.x, box.max.y, c.z); // 위 모서리
        break;
      default:
        pivot = c.clone();
    }
    const group = attachJoint(`joint:${kind}`, meshes, pivot);
    if (kind === 'glow') {
      for (const m of meshes) {
        const list = Array.isArray(m.material) ? m.material : [m.material];
        for (const mt of list) if ((mt as THREE.MeshStandardMaterial).emissive) glowMats.push(mt as THREE.MeshStandardMaterial);
      }
    }
    joints.push({ kind, group, side, base: pivot.clone() });
  }
  if (joints.some((j) => j.kind === 'rotor' || j.kind === 'wing')) floating = true;
  const glowBase = glowMats.map((m) => m.emissiveIntensity);

  // --- 사람형 관절: 다리·팔은 위 끝, 머리는 아래 끝. 무기는 가까운 팔에 ---
  const weapons = humanoid.get('weapon') ?? [];
  let weaponSide: 'leftArm' | 'rightArm' | null = null;
  if (weapons.length > 0 && hasArms) {
    const wx = boxOf(weapons).getCenter(new THREE.Vector3()).x;
    const lx = boxOf(humanoid.get('leftArm')!).getCenter(new THREE.Vector3()).x;
    const rx = boxOf(humanoid.get('rightArm')!).getCenter(new THREE.Vector3()).x;
    weaponSide = Math.abs(wx - lx) <= Math.abs(wx - rx) ? 'leftArm' : 'rightArm';
    humanoid.get(weaponSide)!.push(...weapons);
  }
  const makeHuman = (kind: Exclude<PartKind, null>, atTop: boolean): THREE.Group | null => {
    const meshes = humanoid.get(kind);
    if (!meshes || meshes.length === 0) return null;
    const body = meshes.filter((m) => classifyPart(m.name) !== 'weapon');
    const box = boxOf(body.length ? body : meshes);
    const c = box.getCenter(new THREE.Vector3());
    return attachJoint(`joint:${kind}`, meshes, new THREE.Vector3(c.x, atTop ? box.max.y : box.min.y, c.z));
  };
  const lLeg = hasLegs ? makeHuman('leftLeg', true) : null;
  const rLeg = hasLegs ? makeHuman('rightLeg', true) : null;
  const lArm = hasArms ? makeHuman('leftArm', true) : null;
  const rArm = hasArms ? makeHuman('rightArm', true) : null;
  const head = makeHuman('head', false);
  const weaponArm = weaponSide === 'leftArm' ? lArm : weaponSide === 'rightArm' ? rArm : rArm;
  const otherArm = weaponArm === lArm ? rArm : lArm;

  // 몸 전체를 감싸 떠다님·기울임을 root 와 분리
  const body = new THREE.Group();
  body.name = 'rigBody';
  const children = [...root.children];
  root.add(body);
  for (const ch of children) body.attach(ch);

  const lerp = (a: number, b: number, k: number) => a + (b - a) * Math.max(0, Math.min(1, k));
  let t = 0;
  let recoil = 0; // 공격 직후 1 → 0 (휘두르기·반동)
  let prevWindup = 0;
  return {
    update(dt: number, s: EnemyModelState) {
      t += dt;
      const windup = s.state === 'windup' ? s.windup : 0;
      // 예고가 끝나는 순간(공격 발생) 휘두르기·반동 시작
      if (prevWindup > 0.5 && windup === 0) recoil = 1;
      prevWindup = windup;
      recoil = Math.max(0, recoil - dt * 4);
      const move = s.moving ? 1 : 0;
      for (const j of joints) {
        const g = j.group;
        switch (j.kind) {
          case 'wheel':
            if (s.moving) g.rotation.x += dt * 9;
            break;
          case 'claw':
            g.rotation.y = -j.side * (0.15 + windup * 0.7 + (s.moving ? Math.sin(t * 10) * 0.08 : 0));
            break;
          case 'rotor':
            g.rotation.y += dt * 18;
            break;
          case 'wing':
            g.rotation.z = j.side * Math.sin(t * 14) * (0.45 + move * 0.2);
            break;
          case 'barrel':
            g.position.z = j.base.z - recoil * height * 0.12;
            break;
          case 'shield':
            g.rotation.x = -windup * 1.1 + (s.moving ? Math.sin(t * 8) * 0.03 : 0);
            break;
          case 'piston':
            g.position.y = j.base.y + (s.moving ? Math.sin(t * 8 + j.side * Math.PI) * height * 0.05 : 0);
            break;
          case 'antenna':
            g.rotation.z = Math.sin(t * 3 + j.side) * 0.12 + (s.moving ? Math.sin(t * 12) * 0.1 : 0);
            break;
          case 'leg':
            g.rotation.x = Math.sin(t * 6 + j.side) * 0.2 * (floating ? 1 : move);
            break;
          case 'eye': {
            const k = 1 + windup * 0.5;
            g.scale.set(k, k, 1);
            break;
          }
          case 'glow':
          case 'float':
            break;
        }
      }
      glowMats.forEach((m, i) => (m.emissiveIntensity = glowBase[i] * (0.5 + windup * 1.5 + recoil)));

      // 사람형: 걷기 교차, 예고 때 무기 팔을 뒤로 치켜들고 공격 순간 앞으로 휘두른다
      if (lLeg || lArm) {
        const w = t * 8;
        const legSwing = s.moving ? Math.sin(w) * 0.6 : 0;
        const armSwing = s.moving ? -Math.sin(w) * 0.4 : Math.sin(t * 2) * 0.05;
        if (lLeg) lLeg.rotation.x = legSwing;
        if (rLeg) rLeg.rotation.x = -legSwing;
        // 무기 팔: 예고 0→1 동안 -2.0 까지 뒤로, 공격 직후 recoil 1→0 동안 +1.1(앞) → 0 으로 복귀
        let weaponAngle = armSwing;
        if (windup > 0) weaponAngle = lerp(0, -2.0, windup);
        else if (recoil > 0) weaponAngle = recoil > 0.6 ? lerp(-2.0, 1.1, (1 - recoil) / 0.4) : lerp(1.1, 0, (0.6 - recoil) / 0.6);
        if (weaponArm) weaponArm.rotation.x = weaponAngle;
        if (otherArm) otherArm.rotation.x = windup > 0 ? lerp(0, 0.5, windup) : recoil > 0 ? -0.3 * recoil : -armSwing;
        if (head) head.rotation.x = -0.25 * windup + (s.moving ? Math.sin(w) * 0.03 : 0);
        body.rotation.y = windup > 0 ? 0.3 * windup : recoil > 0.6 ? lerp(0.3, -0.25, (1 - recoil) / 0.4) : lerp(-0.25, 0, (0.6 - recoil) / 0.6);
      } else {
        body.rotation.y = 0;
      }
      // 떠다니는 적은 몸을 띄우고 위아래로 흔들림, 그 외는 이동 시 살짝 들썩임
      body.position.y = floating ? height * 0.3 + Math.sin(t * 3) * height * 0.04 : s.moving ? Math.abs(Math.sin(t * 8)) * height * 0.025 : 0;
      body.rotation.x = windup * -0.12 + recoil * 0.1;
    },
  };
}
