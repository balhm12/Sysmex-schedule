import * as THREE from 'three';
import { glow, pbr } from '../render/materials';
import { modelRegistry } from '../assets/ModelRegistry';
import type { EnemyTypeConfig } from '../game/GameConfig';
import type { EnemyState } from './EnemyAI';

/** 모델이 매 프레임 받는 상태 */
export interface EnemyModelState {
  state: EnemyState;
  moving: boolean;
  /** 공격 예고 진행도 0~1 */
  windup: number;
  /** 사망 후 경과 비율 0~1 (사라지는 연출용) */
  death: number;
}

/**
 * 적 모델 인터페이스
 * - 임시 모델과 나중에 넣을 전용 3D 모델이 같은 인터페이스를 쓴다. 모델 정면은 +Z.
 */
export interface EnemyModel {
  readonly root: THREE.Group;
  update(dt: number, state: EnemyModelState): void;
  /** 피격 번쩍임 */
  flash(): void;
  dispose(): void;
}

/**
 * 종류별 임시 모델 생성. 새 종류를 추가하면 여기에 분기를 더한다.
 * - rusher(돌진 로봇): 상자 몸통 + 눈 하나 + 바퀴. 공격 예고 때 눈이 커지고 붉게 변한다.
 * - shooter(포격 드론): 떠다니는 둥근 몸통 + 포신. 예고 때 포신 끝이 밝아진다.
 * - tank(철벽 로봇): 큰 몸통 + 방패. 예고 때 방패를 들어 올린다. 밀려남 저항이 크다.
 */
export function createEnemyModel(type: string, def: EnemyTypeConfig): EnemyModel {
  // 정식 .glb 모델이 등록돼 있으면 그것을 쓴다 (높이는 충돌 반지름에 비례)
  const gltf = modelRegistry.createEnemyModel(`enemy:${type}`, def.radius * 2.8);
  if (gltf) return gltf;
  // def.model 이 있으면 그 외형을, 없으면 종류 이름으로 고른다 (새 종류가 기존 외형을 재사용할 수 있게)
  switch (def.model ?? type) {
    case 'tank':
      return createTankModel(def);
    case 'shooter':
      return createShooterModel(def);
    case 'rusher':
    default:
      return createRusherModel(def);
  }
}

/** 집게 등 금속 부품 재질 (적 색을 살짝 섞은 강철) */
function steelFor(def: EnemyTypeConfig): THREE.MeshStandardMaterial {
  return pbr({ color: new THREE.Color(def.color).lerp(new THREE.Color(0x9aa3b2), 0.6), roughness: 0.35, metalness: 0.85 });
}

/** 철벽 로봇: 넓은 몸통 + 앞에 든 방패 + 두 눈. 예고 때 방패를 들어 올렸다가 내려찍는다 */
function createTankModel(def: EnemyTypeConfig): EnemyModel {
  const root = new THREE.Group();
  root.name = `Enemy-${def.name}`;
  const r = def.radius;

  const bodyMat = pbr({ color: new THREE.Color(def.color) });
  const darkMat = pbr({ color: 0x2a2f3d });
  const steelMat = pbr({ color: 0x9aa3b2 });
  const eyeMat = glow(0xffd23f, 2.2);

  const body = new THREE.Mesh(new THREE.BoxGeometry(r * 1.7, r * 1.5, r * 1.4), bodyMat);
  body.position.y = r * 1.1;
  body.castShadow = true;
  root.add(body);
  for (const sx of [-1, 1]) {
    const tread = new THREE.Mesh(new THREE.BoxGeometry(r * 0.5, r * 0.6, r * 1.7), darkMat);
    tread.position.set(sx * r * 0.85, r * 0.3, 0);
    tread.castShadow = true;
    root.add(tread);
    const eye = new THREE.Mesh(new THREE.SphereGeometry(r * 0.13, 8, 6), eyeMat);
    eye.position.set(sx * r * 0.35, r * 1.5, r * 0.72);
    root.add(eye);
  }
  // 등 뒤 배기관 2개 + 몸통 옆 피스톤 (이동 중 들썩임)
  for (const sx of [-1, 1]) {
    const pipe = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.12, r * 0.14, r * 0.7, 8), darkMat);
    pipe.position.set(sx * r * 0.45, r * 2.1, -r * 0.45);
    root.add(pipe);
  }
  const pistons: THREE.Mesh[] = [];
  for (const sx of [-1, 1]) {
    const p = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.1, r * 0.1, r * 0.6, 8), steelMat);
    p.position.set(sx * r * 0.95, r * 0.75, -r * 0.4);
    root.add(p);
    pistons.push(p);
  }
  // 방패: 어깨를 축으로 들어 올린다
  const shieldPivot = new THREE.Group();
  shieldPivot.position.set(0, r * 1.7, r * 0.6);
  const shield = new THREE.Mesh(new THREE.BoxGeometry(r * 1.9, r * 1.6, r * 0.2), steelMat);
  shield.position.set(0, -r * 0.7, r * 0.3);
  shield.castShadow = true;
  shieldPivot.add(shield);
  root.add(shieldPivot);

  let flashTimer = 0;
  let t = Math.random() * 10;

  return {
    root,
    update(dt, s) {
      t += dt;
      if (s.state === 'dead') {
        const k = Math.max(0, 1 - s.death);
        root.scale.setScalar(k);
        root.position.y = -(1 - k) * r;
        root.rotation.y += dt * 6;
        return;
      }
      body.position.y = r * 1.1 + (s.moving ? Math.abs(Math.sin(t * 8)) * 0.04 : 0);
      pistons[0].position.y = r * 0.75 + (s.moving ? Math.sin(t * 8) * 0.12 : 0);
      pistons[1].position.y = r * 0.75 + (s.moving ? -Math.sin(t * 8) * 0.12 : 0);
      // 예고: 방패를 뒤로 들어 올림 (progress 1 에서 내려찍기 직전), 눈이 붉게 맥동
      shieldPivot.rotation.x = -s.windup * 1.3;
      eyeMat.emissive.setRGB(1, 0.82 - s.windup * 0.6, 0.25 - s.windup * 0.2);
      eyeMat.emissiveIntensity = 1.6 + Math.sin(t * 4) * 0.4 + s.windup * 1.5;
      if (flashTimer > 0) {
        flashTimer -= dt;
        bodyMat.emissive.setScalar(flashTimer > 0 ? 0.9 : 0);
      }
    },
    flash() {
      flashTimer = 0.09;
      bodyMat.emissive.setScalar(0.9);
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

/** 포격 드론: 둥근 몸통 + 앞으로 난 포신 + 떠다니는 느낌. 예고 때 포신 끝이 밝아진다 */
function createShooterModel(def: EnemyTypeConfig): EnemyModel {
  const root = new THREE.Group();
  root.name = `Enemy-${def.name}`;
  const r = def.radius;

  const bodyMat = pbr({ color: new THREE.Color(def.color), flatShading: true, roughness: 0.5, metalness: 0.5 });
  const darkMat = pbr({ color: 0x2a2f3d });
  const glowMat = glow(0xff5577, 2.5);

  const hover = new THREE.Group();
  root.add(hover);
  const body = new THREE.Mesh(new THREE.IcosahedronGeometry(r * 0.9, 1), bodyMat);
  body.position.y = r * 1.6;
  body.castShadow = true;
  hover.add(body);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(r * 1.1, r * 0.12, 8, 20), darkMat);
  ring.position.y = r * 1.6;
  ring.rotation.x = Math.PI / 2;
  hover.add(ring);
  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.16, r * 0.2, r * 1.0, 10), darkMat);
  barrel.rotation.x = Math.PI / 2;
  barrel.position.set(0, r * 1.6, r * 1.1);
  hover.add(barrel);
  const muzzle = new THREE.Mesh(new THREE.SphereGeometry(r * 0.2, 8, 6), glowMat);
  muzzle.position.set(0, r * 1.6, r * 1.6);
  hover.add(muzzle);
  // 머리 위 로터 3장 (항상 회전) + 아래 센서 눈
  const rotor = new THREE.Group();
  rotor.position.y = r * 2.55;
  for (let i = 0; i < 3; i++) {
    const blade = new THREE.Mesh(new THREE.BoxGeometry(r * 1.4, r * 0.04, r * 0.16), darkMat);
    blade.rotation.y = (i / 3) * Math.PI * 2;
    rotor.add(blade);
  }
  hover.add(rotor);
  const sensor = new THREE.Mesh(new THREE.SphereGeometry(r * 0.14, 8, 6), glow(0x5cf2d8, 1.6));
  sensor.position.set(0, r * 0.85, r * 0.35);
  hover.add(sensor);

  let flashTimer = 0;
  let t = Math.random() * 10;
  let lastWindup = 0;
  let recoil = 0;

  return {
    root,
    update(dt, s) {
      t += dt;
      if (s.state === 'dead') {
        const k = Math.max(0, 1 - s.death);
        root.scale.setScalar(k);
        root.position.y = -(1 - k) * r;
        root.rotation.y += dt * 8;
        return;
      }
      // 둥실둥실 떠 있고 로터가 돈다
      hover.position.y = Math.sin(t * 3) * 0.08;
      ring.rotation.z += dt * 2;
      rotor.rotation.y += dt * (s.moving ? 28 : 18);
      hover.rotation.x = s.moving ? 0.15 : 0;
      // 예고: 포신 끝이 커지며 밝아진다. 발사 순간(예고 1→0) 포신이 뒤로 밀린다
      if (lastWindup > 0.6 && s.windup === 0) recoil = 1;
      lastWindup = s.windup;
      recoil = Math.max(0, recoil - dt * 5);
      barrel.position.z = r * 1.1 - recoil * r * 0.3;
      muzzle.position.z = r * 1.6 - recoil * r * 0.3;
      muzzle.scale.setScalar(1 + s.windup * 1.5);
      glowMat.color.setRGB(1, 0.33 + s.windup * 0.6, 0.47 + s.windup * 0.5);
      if (flashTimer > 0) {
        flashTimer -= dt;
        bodyMat.emissive.setScalar(flashTimer > 0 ? 0.9 : 0);
      }
    },
    flash() {
      flashTimer = 0.09;
      bodyMat.emissive.setScalar(0.9);
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

function createRusherModel(def: EnemyTypeConfig): EnemyModel {
  const root = new THREE.Group();
  root.name = `Enemy-${def.name}`;
  const r = def.radius;

  const bodyMat = pbr({ color: new THREE.Color(def.color) });
  const darkMat = pbr({ color: 0x2a2f3d });
  const eyeWhite = pbr({ color: 0xffffff });
  const pupilMat = pbr({ color: 0x1a1a22, roughness: 0.3 });

  const body = new THREE.Mesh(new THREE.BoxGeometry(r * 1.6, r * 1.4, r * 1.6), bodyMat);
  body.position.y = r * 1.1;
  body.castShadow = true;
  root.add(body);

  const base = new THREE.Mesh(new THREE.BoxGeometry(r * 1.9, r * 0.5, r * 1.9), darkMat);
  base.position.y = r * 0.25;
  base.castShadow = true;
  root.add(base);

  const eye = new THREE.Mesh(new THREE.SphereGeometry(r * 0.32, 12, 10), eyeWhite);
  eye.position.set(0, r * 1.35, r * 0.75);
  root.add(eye);
  const pupil = new THREE.Mesh(new THREE.SphereGeometry(r * 0.16, 10, 8), pupilMat);
  pupil.position.set(0, r * 1.35, r * 1.0);
  root.add(pupil);

  const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, r * 0.8, 6), darkMat);
  antenna.position.set(0, r * 2.1, 0);
  root.add(antenna);
  const tipMat = glow(def.color, 2.5);
  const tip = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), tipMat);
  tip.position.set(0, r * 2.5, 0);
  root.add(tip);
  // 바퀴 4개 (이동 중 구른다) + 집게 팔 2개 (예고 때 벌어진다)
  const wheelMat = pbr({ color: 0x1a1d26, roughness: 0.7, metalness: 0.3 });
  const wheels: THREE.Mesh[] = [];
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const w = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.3, r * 0.3, r * 0.22, 12), wheelMat);
      w.rotation.z = Math.PI / 2;
      w.position.set(sx * r * 1.0, r * 0.3, sz * r * 0.6);
      w.castShadow = true;
      root.add(w);
      wheels.push(w);
    }
  }
  const claws: THREE.Group[] = [];
  for (const sx of [-1, 1]) {
    const pivot = new THREE.Group();
    pivot.position.set(sx * r * 0.85, r * 1.0, r * 0.5);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(r * 0.18, r * 0.18, r * 0.7), darkMat);
    arm.position.z = r * 0.35;
    pivot.add(arm);
    const claw = new THREE.Mesh(new THREE.ConeGeometry(r * 0.14, r * 0.35, 4), steelFor(def));
    claw.rotation.x = Math.PI / 2;
    claw.position.z = r * 0.85;
    pivot.add(claw);
    root.add(pivot);
    claws.push(pivot);
  }

  let flashTimer = 0;
  let t = Math.random() * 10;

  return {
    root,
    update(dt, s) {
      t += dt;
      if (s.state === 'dead') {
        // 작아지며 땅으로 가라앉고 회전
        const k = Math.max(0, 1 - s.death);
        root.scale.setScalar(k);
        root.position.y = -(1 - k) * r;
        root.rotation.y += dt * 8;
        return;
      }
      // 이동 중 바퀴가 구르고 몸이 들썩인다
      body.position.y = r * 1.1 + (s.moving ? Math.abs(Math.sin(t * 14)) * 0.06 : 0);
      if (s.moving) for (const w of wheels) w.rotation.x += dt * 9;
      // 공격 예고: 눈이 커지고 붉어지며 몸이 뒤로 젖혀지고 집게가 벌어졌다가 튀어나간다
      const w = s.windup;
      pupil.scale.setScalar(1 + w * 1.2);
      (pupil.material as THREE.MeshStandardMaterial).emissive.setRGB(0.1 + w * 0.9, 0.1, 0.13);
      body.rotation.x = -w * 0.35;
      claws[0].rotation.y = -0.2 - w * 0.9;
      claws[1].rotation.y = 0.2 + w * 0.9;
      tipMat.emissiveIntensity = 1.8 + Math.sin(t * 6) * 0.7 + w * 2;
      // 피격 번쩍임
      if (flashTimer > 0) {
        flashTimer -= dt;
        bodyMat.emissive.setScalar(flashTimer > 0 ? 0.9 : 0);
      }
    },
    flash() {
      flashTimer = 0.09;
      bodyMat.emissive.setScalar(0.9);
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
