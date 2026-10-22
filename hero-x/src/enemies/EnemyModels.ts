import * as THREE from 'three';
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
 */
export function createEnemyModel(type: string, def: EnemyTypeConfig): EnemyModel {
  switch (type) {
    case 'shooter':
      return createShooterModel(def);
    case 'rusher':
    default:
      return createRusherModel(def);
  }
}

/** 포격 드론: 둥근 몸통 + 앞으로 난 포신 + 떠다니는 느낌. 예고 때 포신 끝이 밝아진다 */
function createShooterModel(def: EnemyTypeConfig): EnemyModel {
  const root = new THREE.Group();
  root.name = `Enemy-${def.name}`;
  const r = def.radius;

  const bodyMat = new THREE.MeshLambertMaterial({ color: new THREE.Color(def.color), flatShading: true });
  const darkMat = new THREE.MeshLambertMaterial({ color: 0x2a2f3d });
  const glowMat = new THREE.MeshBasicMaterial({ color: 0xff5577 });

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
        root.rotation.y += dt * 8;
        return;
      }
      // 둥실둥실 떠 있기
      hover.position.y = Math.sin(t * 3) * 0.08;
      ring.rotation.z += dt * 2;
      // 예고: 포신 끝이 커지며 밝아진다
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

  const bodyMat = new THREE.MeshLambertMaterial({ color: new THREE.Color(def.color) });
  const darkMat = new THREE.MeshLambertMaterial({ color: 0x2a2f3d });
  const eyeWhite = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const pupilMat = new THREE.MeshBasicMaterial({ color: 0x1a1a22 });

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
  const tip = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), new THREE.MeshBasicMaterial({ color: def.color }));
  tip.position.set(0, r * 2.5, 0);
  root.add(tip);

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
      // 이동 중 바퀴 소리 나듯 들썩이기
      body.position.y = r * 1.1 + (s.moving ? Math.abs(Math.sin(t * 14)) * 0.06 : 0);
      // 공격 예고: 눈이 커지고 붉어지며 몸이 뒤로 젖혀졌다가 튀어나간다
      const w = s.windup;
      pupil.scale.setScalar(1 + w * 1.2);
      (pupil.material as THREE.MeshBasicMaterial).color.setRGB(0.1 + w * 0.9, 0.1, 0.13);
      body.rotation.x = -w * 0.35;
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
