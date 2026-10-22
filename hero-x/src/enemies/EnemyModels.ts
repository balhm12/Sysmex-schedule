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
    case 'rusher':
    default:
      return createRusherModel(def);
  }
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
