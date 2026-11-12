import * as THREE from 'three';
import { GameConfig } from '../game/GameConfig';
import { buildArmorModel, buildWeaponModel, disposeVisual, type EquipmentLooks } from '../player/EquipmentVisuals';
import type { PlayerModel, PlayerModelState } from '../player/models/PlaceholderModel';
import { Logger } from '../utils/Logger';
import { clipByName, describeClipRoles, resolveClipRoles, type ClipRoles } from './skinnedClips';

/**
 * 뼈대·애니메이션 클립이 있는 .glb 플레이어 모델 (KayKit Adventurers 등)
 * - 상태 우선순위: 사망 > 한 번 재생 동작(공격·회피·피격) > 공중 > 이동(걷기/달리기) > 정지.
 *   전환은 crossfade(FADE 초). 한 번 재생 동작은 끝나면 자동으로 이동/정지로 돌아간다.
 * - 이동 속도에 맞춰 걷기·달리기 클립 속도(timeScale)를 바꿔 발이 미끄러지지 않게 한다.
 * - 공격 클립은 휘두르기 시간(attackDuration)에 맞게 빨리 감는다 → 타격 판정 시점과 동작이 맞는다.
 * - 장비 외형: 손 슬롯 뼈(handslot.r / handslot.l, 없으면 hand.*)와 가슴 뼈(chest/spine)에 붙인다.
 *   붙일 자리는 로드 직후(바인드 자세) 뼈의 월드 행렬로 정해 두어, 움직이는 중에 장착해도 같은 자리에 붙는다.
 * - 손 슬롯 아래 들어 있는 기본 무기·방패 변형(KayKit 은 전부 겹쳐 있음)은 defaultParts 만 보이게 한다.
 */
const FADE = 0.15;
const FADE_FAST = 0.08;
/** 걷기·달리기 클립이 원래 만들어진 기준 속도(유닛/초). 실제 속도 ÷ 기준 = 클립 속도 */
const WALK_REF_SPEED = 2.6;
const RUN_REF_SPEED = 6.5;

interface Attach {
  handR: THREE.Object3D;
  handL: THREE.Object3D;
  chest: THREE.Object3D;
  /** 바인드 자세의 뼈 월드 행렬 역행렬 (root 기준) */
  handRInv: THREE.Matrix4;
  handLInv: THREE.Matrix4;
  chestInv: THREE.Matrix4;
  /** 바인드 자세의 손 위치·무기 방향(root 기준) */
  handRPos: THREE.Vector3;
  handLPos: THREE.Vector3;
  weaponDirR: THREE.Vector3;
  weaponDirL: THREE.Vector3;
  armLength: number;
  torsoBox: THREE.Box3;
  /** 손 슬롯 아래 기본 무기 메시들 (장비를 들면 숨긴다) */
  slotPartsR: THREE.Object3D[];
  slotPartsL: THREE.Object3D[];
}

/** 이름 비교용 정리: GLTFLoader 는 노드 이름의 '.' 같은 문자를 지우므로(handslot.r → handslotr) 양쪽을 같은 규칙으로 맞춘다 */
const norm = (n: string): string => n.toLowerCase().replace(/\s/g, '_').replace(/[^\w-]/g, '');

/** 후보 이름을 앞에서부터 차례로 찾는다 (앞 후보가 우선: handslot.r 이 hand.r 보다 먼저) */
function findNode(root: THREE.Object3D, ...names: string[]): THREE.Object3D | null {
  const all: THREE.Object3D[] = [];
  root.traverse((o) => all.push(o));
  for (const n of names.map(norm)) {
    const hit = all.find((o) => norm(o.name) === n);
    if (hit) return hit;
  }
  return null;
}

/** 뼈 아래 '메시가 달린' 자식들 (KayKit 손 슬롯의 무기·방패 변형) */
function slotParts(bone: THREE.Object3D | null): THREE.Object3D[] {
  if (!bone) return [];
  return bone.children.filter((c) => (c as THREE.Mesh).isMesh || c.children.some((g) => (g as THREE.Mesh).isMesh));
}

/** 메시의 월드 바운딩 박스 (뼈대 메시는 바인드 자세 기준) */
function worldBox(mesh: THREE.Mesh): THREE.Box3 {
  mesh.geometry.computeBoundingBox();
  return mesh.geometry.boundingBox!.clone().applyMatrix4(mesh.matrixWorld);
}

/**
 * 손에 든 기준 무기 메시가 뻗은 방향(가장 긴 축, 어깨에서 먼 쪽). 없으면 어깨→손 방향
 */
function weaponDirection(refMesh: THREE.Mesh | null, hand: THREE.Vector3, shoulder: THREE.Vector3): THREE.Vector3 {
  const fallback = hand.clone().sub(shoulder);
  if (fallback.lengthSq() < 1e-6) fallback.set(0, 0, 1);
  fallback.normalize();
  if (!refMesh) return fallback;
  const box = worldBox(refMesh);
  const size = box.getSize(new THREE.Vector3());
  const axis = size.x >= size.y && size.x >= size.z ? 'x' : size.y >= size.z ? 'y' : 'z';
  const dir = new THREE.Vector3();
  dir[axis] = 1;
  // 상자의 두 끝 중 어깨에서 먼 쪽이 칼끝
  const c = box.getCenter(new THREE.Vector3());
  const half = size[axis] / 2;
  const endA = c.clone().addScaledVector(dir, half);
  const endB = c.clone().addScaledVector(dir, -half);
  if (endB.distanceTo(shoulder) > endA.distanceTo(shoulder)) dir.negate();
  return dir;
}

function buildAttach(root: THREE.Object3D, defaultParts: string[]): Attach | null {
  root.updateMatrixWorld(true);
  const handR = findNode(root, 'handslot.r', 'hand.r', 'hand_r', 'righthand', 'hand.right');
  const handL = findNode(root, 'handslot.l', 'hand.l', 'hand_l', 'lefthand', 'hand.left');
  const chest = findNode(root, 'chest', 'spine1', 'spine', 'torso', 'spine.001');
  if (!handR || !handL || !chest) return null;
  const shoulderR = findNode(root, 'upperarm.r', 'upper_arm.r', 'shoulder.r', 'arm.r') ?? chest;
  const handRPos = handR.getWorldPosition(new THREE.Vector3());
  const handLPos = handL.getWorldPosition(new THREE.Vector3());
  const shoulderPos = shoulderR.getWorldPosition(new THREE.Vector3());
  const partsR = slotParts(handR);
  const partsL = slotParts(handL);
  // 기본으로 보일 변형만 남기고 숨긴다 (목록이 비어 있으면 첫 번째 것만)
  const show = new Set(defaultParts.map(norm));
  for (const list of [partsR, partsL]) {
    list.forEach((p, i) => {
      p.visible = show.size > 0 ? show.has(norm(p.name)) : i === 0;
    });
  }
  const refR = (partsR.find((p) => p.visible) ?? partsR[0]) as THREE.Mesh | undefined;
  const refL = partsL.find((p) => (p as THREE.Mesh).isMesh && /sword|dagger|axe|wand|staff/i.test(p.name)) as THREE.Mesh | undefined;
  // 몸통 상자: 이름에 body/torso 가 있는 뼈대 메시, 없으면 가장 큰 뼈대 메시
  let body: THREE.Mesh | null = null;
  let bodyVol = 0;
  root.traverse((o) => {
    const m = o as THREE.SkinnedMesh;
    if (!m.isSkinnedMesh) return;
    const b = worldBox(m);
    const s = b.getSize(new THREE.Vector3());
    const vol = s.x * s.y * s.z;
    const named = /body|torso/i.test(m.name);
    if ((named && !(body && /body|torso/i.test(body.name))) || (!body && vol > bodyVol) || (named && vol > bodyVol)) {
      body = m;
      bodyVol = vol;
    }
  });
  const torsoBox = body ? worldBox(body) : new THREE.Box3(new THREE.Vector3(-0.3, 0.7, -0.2), new THREE.Vector3(0.3, 1.4, 0.2));
  return {
    handR,
    handL,
    chest,
    handRInv: handR.matrixWorld.clone().invert(),
    handLInv: handL.matrixWorld.clone().invert(),
    chestInv: chest.matrixWorld.clone().invert(),
    handRPos,
    handLPos,
    weaponDirR: weaponDirection(refR && refR.isMesh ? refR : null, handRPos, shoulderPos),
    weaponDirL: weaponDirection(refL ?? null, handLPos, findNode(root, 'upperarm.l', 'upper_arm.l', 'shoulder.l', 'arm.l')?.getWorldPosition(new THREE.Vector3()) ?? chest.getWorldPosition(new THREE.Vector3())),
    armLength: Math.max(0.2, handRPos.distanceTo(shoulderPos)),
    torsoBox,
    slotPartsR: partsR,
    slotPartsL: partsL,
  };
}

/** 월드 좌표로 만든 그룹을, 바인드 자세 기준으로 뼈 아래에 붙인다 (뼈가 움직이면 따라간다) */
function attachToBone(group: THREE.Object3D, bone: THREE.Object3D, bindInv: THREE.Matrix4): void {
  group.updateMatrix();
  group.matrix.premultiply(bindInv);
  group.matrix.decompose(group.position, group.quaternion, group.scale);
  bone.add(group);
}

export function createSkinnedPlayerModel(root: THREE.Group, mixer: THREE.AnimationMixer, clips: THREE.AnimationClip[], mats: THREE.MeshStandardMaterial[], defaultParts: string[]): PlayerModel {
  const roles: ClipRoles = resolveClipRoles(clips.map((c) => c.name));
  Logger.info(`플레이어 모델 클립: ${describeClipRoles(roles)}`);
  const attach = buildAttach(root, defaultParts);
  if (!attach) Logger.warn('플레이어 모델에 손·가슴 뼈(handslot/hand, chest/spine)가 없어 장비 외형을 붙이지 못합니다.');

  const action = (name: string | null): THREE.AnimationAction | null => {
    const clip = clipByName(clips, name);
    return clip ? mixer.clipAction(clip) : null;
  };
  let current: THREE.AnimationAction | null = null;
  /** 한 번 재생 중인 동작 (끝나면 null) */
  let oneShot: THREE.AnimationAction | null = null;
  let oneShotEnd = 0;
  let now = 0;

  const play = (a: THREE.AnimationAction | null, fade = FADE): void => {
    if (!a || current === a) return;
    a.enabled = true;
    a.setLoop(THREE.LoopRepeat, Infinity);
    a.clampWhenFinished = false;
    a.reset().fadeIn(fade).play();
    current?.fadeOut(fade);
    current = a;
  };
  /** 한 번만 재생: seconds 안에 끝나도록 속도를 맞춘다 */
  const playOnce = (a: THREE.AnimationAction | null, seconds: number, fade = FADE_FAST): void => {
    if (!a) return;
    const dur = a.getClip().duration;
    a.enabled = true;
    a.setLoop(THREE.LoopOnce, 1);
    a.clampWhenFinished = true;
    a.timeScale = dur / Math.max(0.05, seconds);
    a.reset().fadeIn(fade).play();
    if (current && current !== a) current.fadeOut(fade);
    current = a;
    oneShot = a;
    oneShotEnd = now + seconds;
  };

  const act = {
    idle: action(roles.idle),
    walk: action(roles.walk),
    run: action(roles.run),
    attack: roles.attack.map((n) => action(n)),
    ranged: action(roles.ranged),
    dodge: action(roles.dodge),
    jump: action(roles.jump),
    jumpIdle: action(roles.jumpIdle),
    hit: action(roles.hit),
    death: action(roles.death),
  };

  let prevAttack: number | null = null;
  let prevDashing = false;
  let prevHurt = 0;
  let prevAirborne = false;
  let dead = false;
  const gear: { melee: THREE.Group | null; ranged: THREE.Group | null; armor: THREE.Group | null } = { melee: null, ranged: null, armor: null };

  return {
    root,
    setEquipment(looks: EquipmentLooks) {
      if (!attach) return;
      disposeVisual(gear.melee);
      disposeVisual(gear.ranged);
      disposeVisual(gear.armor);
      gear.melee = gear.ranged = gear.armor = null;
      // 교체 무기를 들면 모델에 들어 있던 기본 무기(오른손)·방패(왼손)는 숨긴다
      const showR = looks.melee === null;
      const showL = looks.ranged === null;
      const show = new Set(defaultParts.map(norm));
      attach.slotPartsR.forEach((p, i) => (p.visible = showR && (show.size > 0 ? show.has(norm(p.name)) : i === 0)));
      attach.slotPartsL.forEach((p, i) => (p.visible = showL && (show.size > 0 ? show.has(norm(p.name)) : i === 0)));
      const unit = attach.armLength * 1.15;
      if (looks.melee) {
        gear.melee = buildWeaponModel(looks.melee, unit);
        gear.melee.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), attach.weaponDirR);
        gear.melee.position.copy(attach.handRPos);
        attachToBone(gear.melee, attach.handR, attach.handRInv);
      }
      if (looks.ranged) {
        gear.ranged = buildWeaponModel(looks.ranged, unit);
        gear.ranged.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), attach.weaponDirL);
        gear.ranged.position.copy(attach.handLPos);
        attachToBone(gear.ranged, attach.handL, attach.handLInv);
      }
      if (looks.armor) {
        gear.armor = buildArmorModel(looks.armor, attach.torsoBox);
        attachToBone(gear.armor, attach.chest, attach.chestInv);
      }
    },
    update(dt: number, s: PlayerModelState) {
      now += dt;
      const hurt = s.hurt ?? 0;
      for (const mt of mats) mt.emissive.setRGB(hurt * 0.6, 0, 0);

      if (s.dead) {
        if (!dead) {
          dead = true;
          oneShot = null;
          const a = act.death ?? act.idle;
          if (a) {
            a.enabled = true;
            a.setLoop(THREE.LoopOnce, 1);
            a.clampWhenFinished = true;
            a.timeScale = 1;
            a.reset().fadeIn(FADE).play();
            current?.fadeOut(FADE);
            current = a;
          }
        }
        mixer.update(dt);
        return;
      }
      if (dead) {
        // 되살아남(재시작): 정지로
        dead = false;
        current = null;
        mixer.stopAllAction();
      }

      // ---- 한 번 재생 동작의 시작 감지 (공격 > 회피 > 피격 순으로 우선) ----
      const attackStarted = s.attack !== null && (prevAttack === null || s.attack < prevAttack);
      const dashStarted = !!s.dashing && !prevDashing;
      const hurtStarted = hurt > 0 && prevHurt === 0 && !s.dashing;
      prevAttack = s.attack;
      prevDashing = !!s.dashing;
      prevHurt = hurt;
      if (attackStarted) {
        const dur = Math.max(0.12, s.attackDuration ?? 0.22);
        if (s.attackKind === 'ranged') playOnce(act.ranged ?? act.attack[0] ?? null, dur * 1.6);
        else {
          const step = Math.min(s.attackStep ?? 0, Math.max(0, act.attack.length - 1));
          // 휘두르기 시간보다 조금 길게 재생해 타격(앞 60%) 뒤 되돌아오는 동작이 보이게 한다
          playOnce(act.attack[step] ?? act.attack[0] ?? null, dur * 1.7);
        }
      } else if (dashStarted) {
        playOnce(act.dodge, Math.max(0.2, GameConfig.player.dash.duration * 1.6));
      } else if (hurtStarted && act.hit) {
        playOnce(act.hit, 0.35);
      }

      // ---- 한 번 재생 동작이 끝났으면 이동/정지로 ----
      if (oneShot && now >= oneShotEnd) oneShot = null;

      if (!oneShot) {
        if (s.airborne) {
          if (!prevAirborne && act.jump) playOnce(act.jump, 0.5, FADE_FAST);
          else play(act.jumpIdle ?? act.jump ?? act.idle);
        } else if (s.moving) {
          const runThreshold = GameConfig.player.moveSpeed * 0.55;
          const useRun = s.speed >= runThreshold && act.run;
          const a = useRun ? act.run : (act.walk ?? act.run);
          if (a) {
            a.timeScale = Math.min(2.2, Math.max(0.5, s.speed / (useRun ? RUN_REF_SPEED : WALK_REF_SPEED)));
            play(a);
          }
        } else {
          if (act.idle) act.idle.timeScale = 1;
          play(act.idle);
        }
      }
      prevAirborne = s.airborne;
      mixer.update(dt);
    },
    dispose() {
      mixer.stopAllAction();
      disposeVisual(gear.melee);
      disposeVisual(gear.ranged);
      disposeVisual(gear.armor);
      root.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (mesh.isMesh) {
          mesh.geometry.dispose();
          (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).forEach((mt) => mt.dispose());
        }
      });
    },
  };
}
