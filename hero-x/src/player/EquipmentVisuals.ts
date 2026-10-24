import * as THREE from 'three';
import type { ArmorLook, WeaponLook } from '../game/GameConfig';
import { glow, metal, pbr } from '../render/materials';

/**
 * 장착한 장비의 외형 (코드로 만든 상자 모델, 외부 파일 없음)
 * - 무기: 손 위치가 원점이고 +Z(앞)로 뻗는 그룹. 크기는 팔 길이(unit)에 비례한다.
 * - 방어구: 몸통 바운딩 박스에 맞춰 덮는 판·어깨·망토.
 * - 등급 색(rarityColor)은 빛나는 줄무늬·보석으로 들어가 멀리서도 등급이 보인다.
 */
export interface EquipmentLook {
  look: WeaponLook | ArmorLook;
  /** 주 색 */
  color: string;
  /** 등급 색 (빛나는 부분) */
  rarityColor: string;
}

export interface EquipmentLooks {
  melee: EquipmentLook | null;
  ranged: EquipmentLook | null;
  armor: EquipmentLook | null;
}

const box = (parent: THREE.Object3D, w: number, h: number, d: number, m: THREE.Material, x = 0, y = 0, z = 0): THREE.Mesh => {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  parent.add(mesh);
  return mesh;
};

/** 무기 모델. unit = 팔 길이(어깨→손). 손이 원점, 날은 +Z */
export function buildWeaponModel(e: EquipmentLook, unit: number): THREE.Group {
  const g = new THREE.Group();
  g.name = `Weapon-${e.look}`;
  // 팔 길이의 70% 를 기준 단위로 (복셀 캐릭터의 팔은 길어서 그대로 쓰면 무기가 너무 크다)
  const u = unit * 0.7;
  const grip = pbr({ color: '#4a3524', roughness: 0.85 });
  const dark = metal('#2f3542', 0.45);
  const main = metal(e.color, 0.35);
  const edge = glow(e.color, 1.8);
  const gem = glow(e.rarityColor, 2.0);
  switch (e.look) {
    case 'sword': {
      box(g, 0.1 * u, 0.1 * u, 0.5 * u, grip, 0, 0, 0.05 * u);
      box(g, 0.42 * u, 0.1 * u, 0.1 * u, dark, 0, 0, 0.32 * u);
      box(g, 0.16 * u, 0.06 * u, 1.5 * u, main, 0, 0, 1.08 * u);
      box(g, 0.07 * u, 0.08 * u, 1.3 * u, edge, 0, 0, 1.05 * u);
      box(g, 0.1 * u, 0.1 * u, 0.1 * u, gem, 0, 0, 0.36 * u);
      break;
    }
    case 'axe': {
      box(g, 0.1 * u, 0.1 * u, 1.5 * u, grip, 0, 0, 0.55 * u);
      // 도끼날: 머리 양쪽으로 넓은 판 + 빛나는 날 끝
      box(g, 0.14 * u, 0.5 * u, 0.3 * u, dark, 0, 0, 1.15 * u);
      box(g, 0.08 * u, 0.9 * u, 0.5 * u, main, 0.18 * u, 0, 1.15 * u);
      box(g, 0.05 * u, 0.95 * u, 0.1 * u, edge, 0.4 * u, 0, 1.15 * u);
      box(g, 0.12 * u, 0.12 * u, 0.12 * u, gem, -0.12 * u, 0, 1.15 * u);
      break;
    }
    case 'hammer': {
      box(g, 0.1 * u, 0.1 * u, 1.6 * u, grip, 0, 0, 0.6 * u);
      box(g, 0.75 * u, 0.42 * u, 0.42 * u, main, 0, 0, 1.3 * u);
      box(g, 0.8 * u, 0.12 * u, 0.12 * u, gem, 0, 0, 1.3 * u);
      box(g, 0.2 * u, 0.5 * u, 0.5 * u, dark, 0, 0, 1.3 * u);
      break;
    }
    case 'spear': {
      box(g, 0.08 * u, 0.08 * u, 2.6 * u, grip, 0, 0, 0.9 * u);
      box(g, 0.14 * u, 0.06 * u, 0.6 * u, main, 0, 0, 2.3 * u);
      box(g, 0.06 * u, 0.08 * u, 0.7 * u, edge, 0, 0, 2.35 * u);
      box(g, 0.12 * u, 0.12 * u, 0.12 * u, gem, 0, 0, 1.95 * u);
      break;
    }
    case 'blaster': {
      box(g, 0.12 * u, 0.22 * u, 0.14 * u, grip, 0, -0.08 * u, 0.05 * u);
      box(g, 0.16 * u, 0.16 * u, 0.6 * u, main, 0, 0.06 * u, 0.3 * u);
      box(g, 0.08 * u, 0.08 * u, 0.3 * u, dark, 0, 0.06 * u, 0.7 * u);
      box(g, 0.1 * u, 0.1 * u, 0.1 * u, gem, 0, 0.16 * u, 0.3 * u);
      break;
    }
    case 'bow': {
      // 활: 손을 가로지르는 세로 활대 + 시위, 앞을 향한다
      box(g, 0.08 * u, 1.3 * u, 0.1 * u, main, 0, 0, 0.1 * u);
      box(g, 0.06 * u, 0.3 * u, 0.3 * u, dark, 0, 0.6 * u, 0.0);
      box(g, 0.06 * u, 0.3 * u, 0.3 * u, dark, 0, -0.6 * u, 0.0);
      box(g, 0.02 * u, 1.3 * u, 0.02 * u, edge, 0, 0, -0.1 * u);
      box(g, 0.1 * u, 0.1 * u, 0.1 * u, gem, 0, 0, 0.16 * u);
      break;
    }
    case 'cannon': {
      box(g, 0.14 * u, 0.26 * u, 0.16 * u, grip, 0, -0.1 * u, 0.05 * u);
      box(g, 0.34 * u, 0.34 * u, 1.0 * u, main, 0, 0.08 * u, 0.5 * u);
      box(g, 0.44 * u, 0.44 * u, 0.2 * u, dark, 0, 0.08 * u, 0.95 * u);
      box(g, 0.2 * u, 0.2 * u, 0.08 * u, edge, 0, 0.08 * u, 1.06 * u);
      box(g, 0.36 * u, 0.1 * u, 0.1 * u, gem, 0, 0.3 * u, 0.4 * u);
      break;
    }
    case 'rifle': {
      box(g, 0.12 * u, 0.24 * u, 0.14 * u, grip, 0, -0.1 * u, 0.05 * u);
      box(g, 0.14 * u, 0.18 * u, 1.5 * u, main, 0, 0.04 * u, 0.6 * u);
      box(g, 0.06 * u, 0.06 * u, 0.5 * u, dark, 0, 0.04 * u, 1.55 * u);
      box(g, 0.05 * u, 0.05 * u, 1.2 * u, gem, 0, 0.16 * u, 0.6 * u);
      box(g, 0.12 * u, 0.1 * u, 0.3 * u, dark, 0, 0.1 * u, -0.1 * u);
      break;
    }
    default:
      box(g, 0.1 * u, 0.1 * u, 1.2 * u, main, 0, 0, 0.6 * u);
  }
  return g;
}

/** 방어구 모델. torso: 몸통 바운딩 박스(root 좌표). 그룹은 root 좌표 그대로 몸 그룹에 붙인다 */
export function buildArmorModel(e: EquipmentLook, torso: THREE.Box3): THREE.Group {
  const g = new THREE.Group();
  g.name = `Armor-${e.look}`;
  const c = torso.getCenter(new THREE.Vector3());
  const size = torso.getSize(new THREE.Vector3());
  const w = size.x, h = size.y, d = size.z;
  const pad = Math.max(0.02, w * 0.06);
  const main = e.look === 'plate' ? metal(e.color, 0.35) : pbr({ color: e.color, roughness: e.look === 'suit' ? 0.3 : 0.8 });
  const trim = glow(e.rarityColor, 1.3);
  switch (e.look) {
    case 'vest': {
      // 양옆·앞가슴 판 + 어깨끈
      box(g, pad * 1.5, h * 0.6, d * 0.9, main, torso.min.x - pad * 0.5, c.y, c.z);
      box(g, pad * 1.5, h * 0.6, d * 0.9, main, torso.max.x + pad * 0.5, c.y, c.z);
      box(g, w * 0.55, h * 0.5, pad * 1.5, main, c.x, c.y - h * 0.05, torso.max.z + pad * 0.5);
      box(g, w * 0.5, pad, pad * 2, trim, c.x, c.y + h * 0.22, torso.max.z + pad * 0.6);
      break;
    }
    case 'plate': {
      // 앞뒤 가슴판 + 양 어깨 보호대 + 허리 띠
      box(g, w * 0.95, h * 0.78, pad * 2, main, c.x, c.y + h * 0.03, torso.max.z + pad);
      box(g, w * 0.95, h * 0.78, pad * 2, main, c.x, c.y + h * 0.03, torso.min.z - pad);
      for (const sx of [-1, 1]) box(g, w * 0.3, h * 0.16, d * 1.05, main, c.x + sx * (w * 0.5 + w * 0.08), torso.max.y - h * 0.02, c.z);
      box(g, w * 0.5, h * 0.12, pad * 2.2, trim, c.x, c.y + h * 0.14, torso.max.z + pad * 1.1);
      box(g, w * 1.02, pad * 1.6, d * 1.04, trim, c.x, torso.min.y + h * 0.12, c.z);
      break;
    }
    case 'suit': {
      // 몸에 붙는 얇은 슈트 + 빛나는 선
      box(g, w * 1.02, h * 0.9, d * 1.02, main, c.x, c.y, c.z);
      box(g, w * 0.12, h * 0.7, pad, trim, c.x - w * 0.22, c.y, torso.max.z + pad * 0.7);
      box(g, w * 0.12, h * 0.7, pad, trim, c.x + w * 0.22, c.y, torso.max.z + pad * 0.7);
      box(g, w * 1.06, pad, d * 1.06, trim, c.x, torso.min.y + h * 0.15, c.z);
      break;
    }
    case 'cloak': {
      // 어깨에서 등 뒤로 늘어진 망토 + 목 부분 고리
      const capeMat = pbr({ color: e.color, roughness: 0.9 });
      capeMat.side = THREE.DoubleSide;
      const cape = new THREE.Mesh(new THREE.PlaneGeometry(w * 1.25, h * 1.55), capeMat);
      cape.position.set(c.x, torso.max.y - h * 0.78, torso.min.z - pad * 1.5);
      cape.rotation.x = 0.12;
      cape.castShadow = true;
      g.add(cape);
      box(g, w * 1.1, pad * 1.5, d * 0.5, main, c.x, torso.max.y - pad, c.z - d * 0.2);
      box(g, w * 0.16, w * 0.16, pad * 1.6, trim, c.x, torso.max.y - h * 0.08, torso.max.z + pad * 0.6);
      break;
    }
  }
  return g;
}

/** 그룹 안 메시의 기하·재질 정리 */
export function disposeVisual(obj: THREE.Object3D | null): void {
  if (!obj) return;
  obj.removeFromParent();
  obj.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh) return;
    mesh.geometry.dispose();
    (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).forEach((m) => m.dispose());
  });
}
