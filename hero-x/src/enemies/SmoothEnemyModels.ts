import * as THREE from 'three';
import type { EnemyTypeConfig } from '../game/GameConfig';
import { glow, pbr } from '../render/materials';
import { addOutlines } from '../render/outline';
import { add, blob, capsule, cone, disposeTree, live, rbox, ring, sphere, strand } from '../render/shapes';
import { mergeByMaterial } from '../assets/meshMerge';
import type { EnemyModel, EnemyModelState } from './EnemyModels';

/**
 * 매끈한 카툰 적 모델 (주인공과 같은 스타일: 구·캡슐·둥근 상자·가닥, 픽셀 없음)
 * - 종류: goblin(고블린 전사·궁수), ghost(유령 마법사, 떠다님), troll(트롤 거인), bat(동굴 박쥐, 떠다님), golem(돌 골렘),
 *   slime(슬라임·작은 슬라임), beetle(폭탄 벌레), boar(뿔 멧돼지), robot(강철 요새 로봇 외형 6종: skin 'robot-<종류>').
 * - 공통 동작: 이동 들썩임/걸음, 공격 예고(windup 0→1)마다 종류별 동작과 눈 붉어짐, 피격 번쩍임(flash), 사망(작아지며 가라앉음).
 * - 크기는 def.radius(r)에 비례: 키 약 2.6r. 색은 def.color 를 기준으로 밝은·어두운 색을 만든다.
 */

type Animate = (dt: number, s: EnemyModelState, t: number) => void;

interface Palette {
  main: THREE.MeshStandardMaterial;
  dark: THREE.MeshStandardMaterial;
  light: THREE.MeshStandardMaterial;
  white: THREE.MeshStandardMaterial;
  pupil: THREE.MeshStandardMaterial;
  mouth: THREE.MeshStandardMaterial;
  accent: THREE.MeshStandardMaterial;
}

function palette(def: EnemyTypeConfig, opts: { metal?: boolean } = {}): Palette {
  const c = new THREE.Color(def.color);
  const m = opts.metal ? { roughness: 0.4, metalness: 0.6 } : { roughness: 0.6, metalness: 0.05 };
  return {
    main: pbr({ color: c, ...m }),
    dark: pbr({ color: c.clone().multiplyScalar(0.45), ...m }),
    light: pbr({ color: c.clone().lerp(new THREE.Color(0xffffff), 0.35), ...m }),
    white: pbr({ color: 0xf8f6f0, roughness: 0.4 }),
    pupil: pbr({ color: 0x15100c, roughness: 0.3 }),
    mouth: pbr({ color: 0x3a1a1a, roughness: 0.8 }),
    accent: pbr({ color: 0xe9bb42, roughness: 0.35, metalness: 0.6 }),
  };
}

/** 공통 마무리: 사망·피격·갱신 틀 */
function finish(root: THREE.Group, r: number, flashMats: THREE.MeshStandardMaterial[], animate: Animate): EnemyModel {
  // 같은 관절·같은 재질의 부품을 합쳐 그리기 호출을 줄인다 (움직이는 부품은 live() 로 표시돼 제외). 외곽선보다 먼저
  mergeByMaterial(root);
  root.updateMatrixWorld(true);
  addOutlines(root, Math.max(0.015, r * 0.035), 'enemy', r * 0.08);
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
      animate(dt, s, t);
      if (flashTimer > 0) {
        flashTimer -= dt;
        if (flashTimer <= 0) for (const m of flashMats) m.emissive.setScalar(0);
      }
    },
    flash() {
      flashTimer = 0.09;
      for (const m of flashMats) m.emissive.setScalar(0.9);
    },
    dispose() {
      disposeTree(root);
    },
  };
}

/** 큰 눈 두 개 (흰자·동공·반짝임). 예고 때 동공이 커지고 붉어진다 → pupils 를 돌려준다 */
function eyes(parent: THREE.Object3D, p: Palette, r: number, x: number, y: number, z: number, size = 0.22): THREE.Mesh[] {
  const pupils: THREE.Mesh[] = [];
  for (const sx of [-1, 1]) {
    blob(parent, r * size, 1, 1.15, 0.5, p.white, sx * x, y, z);
    const pupil = blob(parent, r * size * 0.55, 1, 1.2, 0.5, p.pupil.clone(), sx * x, y - r * 0.01, z + r * size * 0.28);
    add(parent, sphere(r * size * 0.18, 6, 5), glow(0xffffff, 0.8), sx * x - sx * r * size * 0.2, y + r * size * 0.3, z + r * size * 0.45);
    pupils.push(pupil);
  }
  return pupils;
}
const redden = (pupils: THREE.Mesh[], w: number) => {
  for (const p of pupils) {
    p.scale.set(1 + w * 0.5, 1.2 + w * 0.5, 0.5);
    (p.material as THREE.MeshStandardMaterial).emissive.setRGB(w * 0.9, 0.05 * w, 0.05 * w);
  }
};
const lerpTo = (obj: THREE.Object3D, axis: 'x' | 'y' | 'z', target: number, dt: number, k = 12) => {
  obj.rotation[axis] += (target - obj.rotation[axis]) * (1 - Math.exp(-k * dt));
};

// ---------------------------------------------------------------- 고블린 (전사·궁수)
function goblin(def: EnemyTypeConfig, archer: boolean): EnemyModel {
  const root = new THREE.Group();
  const r = def.radius;
  const p = palette(def);
  const skin = pbr({ color: new THREE.Color(def.color).lerp(new THREE.Color(0x7bd14f), 0.55), roughness: 0.65 });
  const body = new THREE.Group();
  root.add(body);
  blob(body, r * 0.62, 1, 0.9, 0.9, p.main, 0, r * 1.05, 0); // 둥근 몸(조끼)
  blob(body, r * 0.45, 1, 0.75, 0.6, p.dark, 0, r * 0.95, r * 0.3); // 배 가리개
  add(body, rbox(r * 1.2, r * 0.14, r * 1.0, r * 0.05), p.accent, 0, r * 0.62, 0); // 허리띠
  const head = new THREE.Group();
  head.position.y = r * 1.95;
  body.add(head);
  blob(head, r * 0.72, 1, 0.9, 0.92, skin, 0, 0, 0);
  for (const sx of [-1, 1]) strand(head, sx * r * 0.6, r * 0.1, -r * 0.05, new THREE.Vector3(sx, 0.6, -0.1), r * 0.7, r * 0.17, skin); // 뾰족 귀
  const pupils = eyes(head, p, r, r * 0.26, r * 0.05, r * 0.52, 0.2);
  add(head, sphere(r * 0.1, 8, 6), skin, 0, -r * 0.1, r * 0.7); // 코
  add(head, ring(r * 0.2, r * 0.035, Math.PI), p.mouth, 0, -r * 0.3, r * 0.62).rotation.z = Math.PI; // 씩 웃음
  for (const sx of [-1, 1]) add(head, cone(r * 0.05, r * 0.14, 6), p.white, sx * r * 0.14, -r * 0.32, r * 0.66); // 송곳니
  strand(head, 0, r * 0.55, -r * 0.1, new THREE.Vector3(0.2, 1, -0.3), r * 0.4, r * 0.1, p.dark); // 머리 깃털
  // 다리·팔
  const legs: THREE.Group[] = [];
  for (const sx of [-1, 1]) {
    const hip = new THREE.Group();
    hip.position.set(sx * r * 0.3, r * 0.55, 0);
    add(hip, capsule(r * 0.16, r * 0.25), skin, 0, -r * 0.22, 0);
    blob(hip, r * 0.2, 1.1, 0.6, 1.4, p.dark, 0, -r * 0.5, r * 0.08); // 발
    body.add(hip);
    legs.push(hip);
  }
  const arms: THREE.Group[] = [];
  for (const sx of [-1, 1]) {
    const sh = new THREE.Group();
    sh.position.set(sx * r * 0.7, r * 1.3, 0);
    add(sh, capsule(r * 0.13, r * 0.4), skin, 0, -r * 0.3, 0);
    add(sh, sphere(r * 0.16, 10, 8), skin, 0, -r * 0.6, 0);
    body.add(sh);
    arms.push(sh);
  }
  // 무기: 전사는 곤봉(오른손), 궁수는 활(왼손)+화살통
  const right = arms[1];
  const left = arms[0];
  if (!archer) {
    const club = new THREE.Group();
    club.position.set(0, -r * 0.6, 0);
    add(club, new THREE.CylinderGeometry(r * 0.06, r * 0.08, r * 0.9, 8), p.dark, 0, 0, r * 0.35).rotation.x = Math.PI / 2;
    add(club, sphere(r * 0.22, 10, 8), p.dark, 0, 0, r * 0.85);
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      add(club, cone(r * 0.05, r * 0.14, 5), p.accent, Math.cos(a) * r * 0.2, Math.sin(a) * r * 0.2, r * 0.85).lookAt(new THREE.Vector3(Math.cos(a) * 10, Math.sin(a) * 10, r * 0.85));
    }
    right.add(club);
  } else {
    const bow = new THREE.Group();
    bow.position.set(0, -r * 0.6, 0);
    add(bow, ring(r * 0.7, r * 0.05, Math.PI), p.dark, 0, 0, 0).rotation.set(0, Math.PI / 2, Math.PI / 2);
    add(bow, new THREE.CylinderGeometry(r * 0.012, r * 0.012, r * 1.4, 6), p.white, 0, 0, 0);
    left.add(bow);
    add(body, new THREE.CylinderGeometry(r * 0.12, r * 0.12, r * 0.7, 10), p.dark, -r * 0.35, r * 1.3, -r * 0.5).rotation.z = 0.5; // 화살통
    for (let i = 0; i < 3; i++) add(body, new THREE.CylinderGeometry(r * 0.015, r * 0.015, r * 0.6, 5), p.accent, -r * 0.42 + i * r * 0.07, r * 1.7, -r * 0.5).rotation.z = 0.5;
  }
  let lastW = 0;
  let recoil = 0;
  return finish(root, r, [p.main, skin], (dt, s, t) => {
    const w = s.windup;
    const walk = s.moving ? Math.sin(t * 13) : 0;
    legs[0].rotation.x = walk * 0.7;
    legs[1].rotation.x = -walk * 0.7;
    body.position.y = s.moving ? Math.abs(Math.sin(t * 13)) * r * 0.08 : Math.sin(t * 2) * r * 0.015;
    redden(pupils, w);
    if (!archer) {
      // 곤봉을 머리 위로 치켜들었다가 내려친다
      lerpTo(right, 'x', -2.4 * w, dt);
      lerpTo(left, 'x', -walk * 0.5 + w * 0.4, dt);
      lerpTo(body, 'x', -w * 0.25, dt);
    } else {
      if (lastW > 0.6 && w === 0) recoil = 1;
      lastW = w;
      recoil = Math.max(0, recoil - dt * 6);
      // 활을 앞으로 들고 시위를 당긴다 (오른팔 뒤로)
      lerpTo(left, 'x', -1.4 - w * 0.2, dt);
      lerpTo(right, 'x', -1.2 + w * 0.9 - recoil * 0.6, dt);
      lerpTo(body, 'y', -0.35 * w, dt);
    }
    head.rotation.x = w * 0.15;
  });
}

// ---------------------------------------------------------------- 유령 마법사 (떠다님)
function ghost(def: EnemyTypeConfig): EnemyModel {
  const root = new THREE.Group();
  const r = def.radius;
  const p = palette(def);
  const eyeMat = glow(0xfff4a8, 2.0);
  const orbMat = glow(0xff5577, 2.2);
  const hover = new THREE.Group();
  root.add(hover);
  blob(hover, r * 0.8, 1, 1.05, 0.95, p.main, 0, r * 1.6, 0);
  const tail = live(add(hover, cone(r * 0.72, r * 1.3, 16), p.main, 0, r * 0.75, 0));
  tail.rotation.x = Math.PI;
  blob(hover, r * 0.55, 1, 0.35, 1, p.dark, 0, r * 0.45, 0); // 치맛단
  add(hover, cone(r * 0.75, r * 1.1, 16), p.dark, 0, r * 2.75, 0); // 모자
  add(hover, ring(r * 0.8, r * 0.09), p.dark, 0, r * 2.25, 0).rotation.x = Math.PI / 2;
  add(hover, ring(r * 0.8, r * 0.04), p.accent, 0, r * 2.32, 0).rotation.x = Math.PI / 2;
  const eyeL = live(blob(hover, r * 0.14, 1, 1.4, 0.5, eyeMat, -r * 0.28, r * 1.72, r * 0.72));
  const eyeR = live(blob(hover, r * 0.14, 1, 1.4, 0.5, eyeMat, r * 0.28, r * 1.72, r * 0.72));
  add(hover, ring(r * 0.12, r * 0.03, Math.PI), p.mouth, 0, r * 1.4, r * 0.78); // 'o' 입
  for (const sx of [-1, 1]) blob(hover, r * 0.2, 1, 0.8, 1, p.light, sx * r * 0.85, r * 1.35, r * 0.2); // 손
  const staff = new THREE.Group();
  staff.position.set(r * 0.85, r * 1.35, r * 0.2);
  hover.add(staff);
  add(staff, new THREE.CylinderGeometry(r * 0.05, r * 0.06, r * 2.2, 8), pbr({ color: 0x5a3a26, roughness: 0.8 }), 0, 0, 0);
  const orb = live(add(staff, sphere(r * 0.22, 12, 10), orbMat, 0, r * 1.25, 0));
  add(staff, ring(r * 0.3, r * 0.03), p.accent, 0, r * 1.25, 0).rotation.x = Math.PI / 2;
  let lastW = 0;
  let recoil = 0;
  return finish(root, r, [p.main], (dt, s, t) => {
    void dt;
    hover.position.y = Math.sin(t * 2.6) * r * 0.15;
    hover.rotation.x = s.moving ? 0.12 : 0;
    hover.rotation.z = Math.sin(t * 1.3) * 0.05;
    tail.scale.set(1, 1 + Math.sin(t * 4) * 0.08, 1);
    const w = s.windup;
    if (lastW > 0.6 && w === 0) recoil = 1;
    lastW = w;
    recoil = Math.max(0, recoil - dt * 5);
    orb.scale.setScalar(1 + w * 1.6 - recoil * 0.5);
    orbMat.color.setRGB(1, 0.33 + w * 0.6, 0.47 + w * 0.5);
    orbMat.emissiveIntensity = 2 + w * 3 + Math.sin(t * 7) * 0.4;
    lerpTo(staff, 'x', -0.9 * w + recoil * 0.5, dt);
    const es = 1 + w * 0.5;
    eyeL.scale.set(es, 1.4 * es, 0.5);
    eyeR.scale.set(es, 1.4 * es, 0.5);
  });
}

// ---------------------------------------------------------------- 트롤 거인
function troll(def: EnemyTypeConfig): EnemyModel {
  const root = new THREE.Group();
  const r = def.radius;
  const p = palette(def);
  const body = new THREE.Group();
  root.add(body);
  blob(body, r * 0.95, 1, 0.95, 0.92, p.main, 0, r * 1.15, 0); // 큰 배
  blob(body, r * 0.6, 1, 0.8, 0.5, p.light, 0, r * 1.0, r * 0.5); // 배 밝은 부분
  add(body, rbox(r * 1.7, r * 0.18, r * 1.4, r * 0.06), pbr({ color: 0x5a3a26, roughness: 0.85 }), 0, r * 0.55, 0); // 허리 가죽
  const head = new THREE.Group();
  head.position.set(0, r * 2.15, r * 0.15);
  body.add(head);
  blob(head, r * 0.5, 1, 0.85, 0.95, p.main, 0, 0, 0);
  add(head, rbox(r * 0.7, r * 0.14, r * 0.3, r * 0.05), p.dark, 0, r * 0.2, r * 0.32); // 무거운 눈썹
  const pupils = eyes(head, p, r, r * 0.18, r * 0.02, r * 0.4, 0.13);
  for (const sx of [-1, 1]) add(head, cone(r * 0.06, r * 0.28, 6), p.white, sx * r * 0.22, -r * 0.2, r * 0.42).rotation.x = -0.3; // 엄니(위로)
  add(head, ring(r * 0.2, r * 0.03, Math.PI), p.mouth, 0, -r * 0.22, r * 0.45); // 찡그린 입
  for (const sx of [-1, 1]) blob(head, r * 0.1, 0.6, 1, 0.8, p.main, sx * r * 0.5, r * 0.05, -r * 0.05);
  const legs: THREE.Group[] = [];
  for (const sx of [-1, 1]) {
    const hip = new THREE.Group();
    hip.position.set(sx * r * 0.42, r * 0.5, 0);
    add(hip, capsule(r * 0.22, r * 0.2), p.dark, 0, -r * 0.2, 0);
    blob(hip, r * 0.26, 1.1, 0.6, 1.3, p.dark, 0, -r * 0.42, r * 0.1);
    body.add(hip);
    legs.push(hip);
  }
  const arms: THREE.Group[] = [];
  for (const sx of [-1, 1]) {
    const sh = new THREE.Group();
    sh.position.set(sx * r * 1.0, r * 1.6, 0);
    add(sh, capsule(r * 0.22, r * 0.6), p.main, 0, -r * 0.45, 0);
    add(sh, sphere(r * 0.26, 12, 10), p.main, 0, -r * 0.9, 0);
    body.add(sh);
    arms.push(sh);
  }
  // 왼손 둥근 방패, 오른손 큰 곤봉
  const shield = add(arms[0], new THREE.CylinderGeometry(r * 0.7, r * 0.7, r * 0.12, 24), pbr({ color: 0x6b4a2e, roughness: 0.7 }), -r * 0.2, -r * 0.9, r * 0.2);
  shield.rotation.z = Math.PI / 2;
  add(arms[0], sphere(r * 0.18, 10, 8), p.accent, -r * 0.3, -r * 0.9, r * 0.2);
  add(arms[0], ring(r * 0.62, r * 0.05), p.accent, -r * 0.27, -r * 0.9, r * 0.2).rotation.y = Math.PI / 2;
  const club = new THREE.Group();
  club.position.set(0, -r * 0.9, 0);
  add(club, new THREE.CylinderGeometry(r * 0.08, r * 0.12, r * 1.4, 8), pbr({ color: 0x5a3a26, roughness: 0.85 }), 0, 0, r * 0.5).rotation.x = Math.PI / 2;
  add(club, sphere(r * 0.34, 12, 10), pbr({ color: 0x4a2e1c, roughness: 0.9 }), 0, 0, r * 1.3);
  arms[1].add(club);
  return finish(root, r, [p.main], (dt, s, t) => {
    const w = s.windup;
    const walk = s.moving ? Math.sin(t * 7) : 0;
    legs[0].rotation.x = walk * 0.5;
    legs[1].rotation.x = -walk * 0.5;
    body.position.y = s.moving ? Math.abs(Math.sin(t * 7)) * r * 0.08 : 0;
    body.rotation.z = walk * 0.05;
    redden(pupils, w);
    // 예고: 방패와 곤봉을 들어 올렸다가 내려찍는다
    lerpTo(arms[0], 'x', -1.6 * w - walk * 0.3, dt);
    lerpTo(arms[1], 'x', -2.6 * w + walk * 0.3, dt);
    lerpTo(body, 'x', -w * 0.2, dt);
    const breathe = 1 + Math.sin(t * 1.8) * 0.02;
    body.scale.set(breathe, 1 / breathe, breathe);
  });
}

// ---------------------------------------------------------------- 동굴 박쥐 (떠다님)
function bat(def: EnemyTypeConfig): EnemyModel {
  const root = new THREE.Group();
  const r = def.radius;
  const p = palette(def);
  const eyeMat = glow(0xff6b6b, 1.8);
  const hover = new THREE.Group();
  root.add(hover);
  const bodyY = r * 1.6;
  blob(hover, r * 0.6, 1, 0.9, 0.9, p.main, 0, bodyY, 0);
  blob(hover, r * 0.35, 1, 0.6, 0.6, p.light, 0, bodyY - r * 0.1, r * 0.4); // 배
  for (const sx of [-1, 1]) {
    strand(hover, sx * r * 0.3, bodyY + r * 0.45, 0, new THREE.Vector3(sx * 0.5, 1, 0), r * 0.7, r * 0.18, p.main); // 큰 귀
    strand(hover, sx * r * 0.3, bodyY + r * 0.45, r * 0.02, new THREE.Vector3(sx * 0.5, 1, 0), r * 0.5, r * 0.1, p.light);
  }
  const eyeL = live(blob(hover, r * 0.12, 1, 1.3, 0.5, eyeMat, -r * 0.22, bodyY + r * 0.08, r * 0.55));
  const eyeR = live(blob(hover, r * 0.12, 1, 1.3, 0.5, eyeMat, r * 0.22, bodyY + r * 0.08, r * 0.55));
  add(hover, ring(r * 0.14, r * 0.025, Math.PI), p.mouth, 0, bodyY - r * 0.18, r * 0.57).rotation.z = Math.PI;
  for (const sx of [-1, 1]) add(hover, cone(r * 0.04, r * 0.14, 5), p.white, sx * r * 0.08, bodyY - r * 0.28, r * 0.58).rotation.x = Math.PI;
  const wings: THREE.Group[] = [];
  for (const sx of [-1, 1]) {
    const w = new THREE.Group();
    w.position.set(sx * r * 0.45, bodyY + r * 0.1, -r * 0.05);
    const membrane = blob(w, r * 0.5, 1.9, 0.08, 1.1, p.dark, sx * r * 0.85, 0, 0);
    membrane.rotation.z = sx * 0.1;
    for (let i = 0; i < 3; i++) add(w, new THREE.CylinderGeometry(r * 0.02, r * 0.03, r * 1.0, 5), p.dark, sx * r * 0.5, r * 0.02, -r * 0.35 + i * r * 0.35).rotation.z = sx * (Math.PI / 2 + 0.1 - i * 0.12);
    hover.add(w);
    wings.push(w);
  }
  for (const sx of [-1, 1]) add(hover, capsule(r * 0.04, r * 0.18), p.dark, sx * r * 0.18, bodyY - r * 0.6, 0);
  return finish(root, r, [p.main], (_dt, s, t) => {
    const w = s.windup;
    hover.position.y = Math.sin(t * 5) * r * 0.12;
    hover.rotation.x = s.moving ? 0.25 : 0.05;
    const flap = Math.sin(t * (s.moving ? 22 : 12)) * (0.55 - w * 0.3);
    wings[0].rotation.z = flap + w * 0.6;
    wings[1].rotation.z = -flap - w * 0.6;
    const es = 1 + w * 0.6;
    eyeL.scale.set(es, 1.3 * es, 0.5);
    eyeR.scale.set(es, 1.3 * es, 0.5);
    eyeMat.emissiveIntensity = 1.8 + w * 2;
  });
}

// ---------------------------------------------------------------- 돌 골렘 (원거리)
function golem(def: EnemyTypeConfig): EnemyModel {
  const root = new THREE.Group();
  const r = def.radius;
  const rock = pbr({ color: new THREE.Color(def.color).lerp(new THREE.Color(0x6e6a66), 0.5), roughness: 0.9 });
  const rockDark = pbr({ color: new THREE.Color(def.color).lerp(new THREE.Color(0x3a3734), 0.6), roughness: 0.95 });
  const coreMat = glow(0xff8a3d, 2.0);
  const crystal = glow(def.color, 1.4);
  const body = new THREE.Group();
  root.add(body);
  blob(body, r * 0.95, 1.05, 0.9, 0.95, rock, 0, r * 1.2, 0);
  add(body, new THREE.DodecahedronGeometry(r * 0.5, 0), rockDark, 0, r * 2.05, r * 0.1); // 머리 바위
  const core = live(add(body, sphere(r * 0.28, 12, 10), coreMat, 0, r * 1.25, r * 0.78));
  add(body, ring(r * 0.36, r * 0.05), rockDark, 0, r * 1.25, r * 0.8);
  const eyeMat = glow(0xffd36b, 1.8);
  for (const sx of [-1, 1]) blob(body, r * 0.09, 1, 0.8, 0.5, eyeMat, sx * r * 0.18, r * 2.12, r * 0.52);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    strand(body, Math.cos(a) * r * 0.5, r * 1.75 + (i % 2) * r * 0.1, Math.sin(a) * r * 0.5 - r * 0.2, new THREE.Vector3(Math.cos(a) * 0.5, 1, Math.sin(a) * 0.5 - 0.3), r * (0.5 + (i % 3) * 0.15), r * 0.12, crystal); // 등 수정
  }
  for (let i = 0; i < 5; i++) add(body, new THREE.DodecahedronGeometry(r * (0.12 + (i % 2) * 0.06), 0), rockDark, Math.cos(i * 1.3) * r * 0.8, r * (0.8 + i * 0.22), Math.sin(i * 1.3) * r * 0.7); // 몸 박힌 돌
  const legs: THREE.Group[] = [];
  for (const sx of [-1, 1]) {
    const hip = new THREE.Group();
    hip.position.set(sx * r * 0.45, r * 0.55, 0);
    add(hip, new THREE.DodecahedronGeometry(r * 0.33, 0), rockDark, 0, -r * 0.3, 0);
    body.add(hip);
    legs.push(hip);
  }
  const arms: THREE.Group[] = [];
  for (const sx of [-1, 1]) {
    const sh = new THREE.Group();
    sh.position.set(sx * r * 1.05, r * 1.6, 0);
    add(sh, new THREE.DodecahedronGeometry(r * 0.3, 0), rock, 0, -r * 0.35, 0);
    add(sh, new THREE.DodecahedronGeometry(r * 0.38, 0), rockDark, 0, -r * 0.85, 0);
    body.add(sh);
    arms.push(sh);
  }
  const cannon = add(arms[1], new THREE.CylinderGeometry(r * 0.16, r * 0.22, r * 0.8, 10), rockDark, 0, -r * 0.85, r * 0.45);
  cannon.rotation.x = Math.PI / 2;
  const muzzle = live(add(arms[1], sphere(r * 0.16, 8, 6), coreMat, 0, -r * 0.85, r * 0.9));
  let lastW = 0;
  let recoil = 0;
  return finish(root, r, [rock], (dt, s, t) => {
    const w = s.windup;
    const walk = s.moving ? Math.sin(t * 5) : 0;
    legs[0].rotation.x = walk * 0.4;
    legs[1].rotation.x = -walk * 0.4;
    body.position.y = s.moving ? Math.abs(Math.sin(t * 5)) * r * 0.1 : 0;
    body.rotation.z = walk * 0.06;
    if (lastW > 0.6 && w === 0) recoil = 1;
    lastW = w;
    recoil = Math.max(0, recoil - dt * 5);
    coreMat.emissiveIntensity = 1.6 + w * 3 + Math.sin(t * 5) * 0.4;
    core.scale.setScalar(1 + w * 0.4);
    muzzle.scale.setScalar(1 + w * 1.4 - recoil * 0.5);
    lerpTo(arms[1], 'x', -1.5 * w + recoil * 0.5, dt); // 포신 팔을 앞으로
    lerpTo(arms[0], 'x', walk * 0.3, dt);
  });
}

// ---------------------------------------------------------------- 슬라임
function slime(def: EnemyTypeConfig): EnemyModel {
  const root = new THREE.Group();
  const r = def.radius;
  const p = palette(def);
  const jelly = pbr({ color: def.color, roughness: 0.25, metalness: 0.05 });
  jelly.transparent = true;
  jelly.opacity = 0.92;
  const squish = new THREE.Group();
  root.add(squish);
  const dome = live(blob(squish, r * 1.0, 1, 0.8, 1, jelly, 0, r * 0.8, 0));
  blob(squish, r * 0.3, 1, 0.5, 0.6, p.light, -r * 0.3, r * 1.35, r * 0.35); // 반짝 하이라이트
  const pupils = eyes(squish, p, r, r * 0.3, r * 0.85, r * 0.72, 0.2);
  add(squish, ring(r * 0.14, r * 0.03, Math.PI), p.mouth, 0, r * 0.55, r * 0.9).rotation.z = Math.PI;
  for (let i = 0; i < 4; i++) blob(squish, r * 0.1, 1, 1, 1, p.light, Math.cos(i * 1.9) * r * 0.55, r * (0.5 + (i % 2) * 0.5), Math.sin(i * 1.9) * r * 0.5); // 속 방울
  return finish(root, r, [jelly], (_dt, s, t) => {
    const w = s.windup;
    const bounce = s.moving ? Math.sin(t * 10) : Math.sin(t * 3) * 0.3;
    const sy = 1 + bounce * 0.12 + w * 0.35;
    squish.scale.set(1 / Math.sqrt(sy) + w * 0.1, sy, 1 / Math.sqrt(sy) + w * 0.1);
    dome.position.y = r * 0.8;
    redden(pupils, w);
  });
}

// ---------------------------------------------------------------- 폭탄 벌레
function beetle(def: EnemyTypeConfig): EnemyModel {
  const root = new THREE.Group();
  const r = def.radius * 1.3; // 납작한 벌레라 조금 키워 눈에 띄게
  const p = palette(def);
  const glowMat = glow(0xffb13d, 2.0);
  const body = new THREE.Group();
  root.add(body);
  blob(body, r * 0.8, 1, 0.7, 1.15, p.main, 0, r * 0.75, 0); // 등껍질
  add(body, rbox(r * 0.06, r * 0.4, r * 1.7, r * 0.02), p.dark, 0, r * 1.05, 0); // 등 갈라진 선
  const abdomen = live(blob(body, r * 0.5, 1, 0.8, 1, glowMat, 0, r * 0.65, -r * 0.85));
  blob(body, r * 0.45, 1, 0.9, 0.9, p.dark, 0, r * 0.7, r * 0.8); // 머리
  const pupils = eyes(body, p, r, r * 0.2, r * 0.8, r * 1.1, 0.14);
  for (const sx of [-1, 1]) strand(body, sx * r * 0.15, r * 1.05, r * 0.95, new THREE.Vector3(sx * 0.6, 1, 0.5), r * 0.6, r * 0.05, p.dark); // 더듬이
  const legs: THREE.Mesh[] = [];
  for (const sx of [-1, 1]) for (let i = 0; i < 3; i++) {
    const leg = live(add(body, capsule(r * 0.05, r * 0.45), p.dark, sx * r * 0.75, r * 0.35, -r * 0.5 + i * r * 0.5));
    leg.rotation.z = sx * 1.1;
    legs.push(leg);
  }
  return finish(root, r, [p.main], (_dt, s, t) => {
    const w = s.windup;
    body.position.y = s.moving ? Math.abs(Math.sin(t * 16)) * r * 0.05 : 0;
    legs.forEach((l, i) => (l.rotation.x = s.moving ? Math.sin(t * 16 + i) * 0.4 : 0));
    // 자폭 예고: 꽁무니가 빠르게 깜빡이며 몸이 부푼다
    const blink = w > 0 ? (Math.sin(t * (10 + w * 30)) > 0 ? 1 : 0.2) : 1;
    glowMat.emissiveIntensity = (2 + w * 4) * blink;
    glowMat.color.setRGB(1, 0.69 - w * 0.5, 0.24 - w * 0.2);
    abdomen.scale.setScalar(1 + w * 0.6);
    body.scale.setScalar(1 + w * 0.2);
    redden(pupils, w);
  });
}

// ---------------------------------------------------------------- 뿔 멧돼지 (돌진)
function boar(def: EnemyTypeConfig): EnemyModel {
  const root = new THREE.Group();
  const r = def.radius;
  const p = palette(def);
  const snoutMat = pbr({ color: 0xd9a08a, roughness: 0.7 });
  const body = new THREE.Group();
  root.add(body);
  const trunk = add(body, capsule(r * 0.62, r * 0.9), p.main, 0, r * 0.95, -r * 0.1);
  trunk.rotation.x = Math.PI / 2;
  blob(body, r * 0.5, 1, 0.5, 1.2, p.light, 0, r * 0.6, -r * 0.1); // 배
  for (let i = 0; i < 7; i++) strand(body, 0, r * 1.5, -r * 0.7 + i * r * 0.2, new THREE.Vector3((i % 2 ? 0.3 : -0.3), 1, -0.4), r * 0.4, r * 0.1, p.dark); // 갈기
  const head = new THREE.Group();
  head.position.set(0, r * 1.05, r * 0.8);
  body.add(head);
  blob(head, r * 0.55, 1, 0.9, 1, p.main, 0, 0, 0);
  add(head, rbox(r * 0.42, r * 0.34, r * 0.3, r * 0.1), snoutMat, 0, -r * 0.12, r * 0.5); // 코
  for (const sx of [-1, 1]) add(head, sphere(r * 0.05, 6, 5), p.mouth, sx * r * 0.1, -r * 0.1, r * 0.66);
  for (const sx of [-1, 1]) add(head, cone(r * 0.07, r * 0.4, 6), p.white, sx * r * 0.26, -r * 0.3, r * 0.4).rotation.set(-0.5, 0, sx * 0.3); // 엄니
  add(head, cone(r * 0.12, r * 0.6, 8), p.accent, 0, r * 0.35, r * 0.3).rotation.x = -0.8; // 이마 뿔
  const pupils = eyes(head, p, r, r * 0.3, r * 0.12, r * 0.42, 0.12);
  for (const sx of [-1, 1]) strand(head, sx * r * 0.4, r * 0.35, -r * 0.1, new THREE.Vector3(sx * 0.6, 1, -0.2), r * 0.35, r * 0.12, p.dark); // 귀
  const legs: THREE.Group[] = [];
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    const hip = new THREE.Group();
    hip.position.set(sx * r * 0.35, r * 0.55, sz * r * 0.45 - r * 0.05);
    add(hip, capsule(r * 0.13, r * 0.3), p.dark, 0, -r * 0.25, 0);
    body.add(hip);
    legs.push(hip);
  }
  strand(body, 0, r * 1.1, -r * 0.95, new THREE.Vector3(0, 0.6, -1), r * 0.5, r * 0.06, p.dark); // 꼬리
  return finish(root, r, [p.main], (dt, s, t) => {
    const w = s.windup;
    const charging = s.state === 'charge';
    const gait = s.moving ? Math.sin(t * (charging ? 22 : 12)) : 0;
    legs[0].rotation.x = gait * 0.6;
    legs[3].rotation.x = gait * 0.6;
    legs[1].rotation.x = -gait * 0.6;
    legs[2].rotation.x = -gait * 0.6;
    body.position.y = s.moving ? Math.abs(gait) * r * 0.08 : 0;
    // 예고: 머리를 숙이고 앞발로 땅을 긁는다. 돌진 중엔 몸을 앞으로 기울인다
    lerpTo(head, 'x', w * 0.5, dt);
    lerpTo(body, 'x', charging ? 0.18 : -w * 0.08, dt);
    if (w > 0 && !s.moving) legs[1].rotation.x = Math.sin(t * 14) * 0.5 * w;
    redden(pupils, w);
  });
}

// ---------------------------------------------------------------- 강철 요새 로봇 (skin 'robot-<종류>')
function robot(def: EnemyTypeConfig, kind: string): EnemyModel {
  const root = new THREE.Group();
  const r = def.radius;
  const p = palette(def, { metal: true });
  const steel = pbr({ color: 0xaab3c2, roughness: 0.35, metalness: 0.8 });
  const dark = pbr({ color: 0x2a2f3d, roughness: 0.5, metalness: 0.6 });
  const visorMat = glow(0x5cf2d8, 2.0);
  const flying = kind === 'shooter' || kind === 'stalker';
  const big = kind === 'tank' || kind === 'artillery';
  const hover = new THREE.Group();
  root.add(hover);
  const bodyY = flying ? r * 1.6 : big ? r * 1.2 : r * 1.1;
  const body = new THREE.Group();
  body.position.y = bodyY;
  hover.add(body);
  blob(body, r * (big ? 0.95 : 0.75), 1, big ? 0.9 : 0.95, 1, p.main, 0, 0, 0); // 둥근 몸
  add(body, ring(r * (big ? 0.95 : 0.75), r * 0.06), steel, 0, 0, 0).rotation.x = Math.PI / 2; // 허리 띠
  add(body, rbox(r * 0.7, r * 0.18, r * 0.2, r * 0.07), visorMat, 0, r * 0.18, r * (big ? 0.85 : 0.68)); // 바이저 눈
  add(body, rbox(r * 0.8, r * 0.26, r * 0.16, r * 0.06), dark, 0, r * 0.18, r * (big ? 0.8 : 0.63));
  const antenna = add(body, new THREE.CylinderGeometry(r * 0.03, r * 0.03, r * 0.6, 6), dark, r * 0.3, r * (big ? 1.05 : 0.9), 0);
  const tip = live(add(body, sphere(r * 0.08, 8, 6), glow(def.color, 2.4), r * 0.3, r * (big ? 1.35 : 1.2), 0));
  void antenna;
  const movers: THREE.Mesh[] = [];
  const arms: THREE.Group[] = [];
  let rotor: THREE.Group | null = null;
  let muzzle: THREE.Mesh | null = null;
  let bomb: THREE.MeshStandardMaterial | null = null;
  if (!flying) {
    // 바퀴 (작은 로봇은 2개 큰 로봇은 4개)
    const wheelMat = pbr({ color: 0x1a1d26, roughness: 0.7, metalness: 0.3 });
    const zs = big ? [-0.55, 0.55] : [0];
    for (const sx of [-1, 1]) for (const sz of zs) {
      const w = live(add(hover, new THREE.CylinderGeometry(r * 0.3, r * 0.3, r * 0.22, 14), wheelMat, sx * r * (big ? 0.9 : 0.75), r * 0.3, sz * r));
      w.rotation.z = Math.PI / 2;
      movers.push(w);
    }
  } else {
    rotor = new THREE.Group();
    rotor.position.y = r * (kind === 'stalker' ? 0.95 : 1.0);
    for (let i = 0; i < 3; i++) add(rotor, rbox(r * 1.3, r * 0.04, r * 0.14, r * 0.02), dark, 0, 0, 0).rotation.y = (i / 3) * Math.PI * 2;
    body.add(rotor);
    add(body, ring(r * 0.95, r * 0.08), dark, 0, -r * 0.2, 0).rotation.x = Math.PI / 2;
  }
  if (kind === 'rusher' || kind === 'tank') {
    for (const sx of [-1, 1]) {
      const sh = new THREE.Group();
      sh.position.set(sx * r * (big ? 0.95 : 0.75), 0, r * 0.2);
      add(sh, capsule(r * 0.1, r * 0.4), dark, 0, -r * 0.3, 0);
      if (kind === 'rusher') {
        const claw = add(sh, cone(r * 0.14, r * 0.4, 4), steel, 0, -r * 0.65, 0);
        claw.rotation.x = Math.PI;
      } else {
        add(sh, sphere(r * 0.2, 10, 8), steel, 0, -r * 0.6, 0);
      }
      body.add(sh);
      arms.push(sh);
    }
    if (kind === 'tank') {
      const shield = add(arms[0], rbox(r * 0.16, r * 1.2, r * 1.0, r * 0.1), steel, -r * 0.2, -r * 0.6, r * 0.1);
      add(arms[0], rbox(r * 0.04, r * 0.6, r * 0.5, r * 0.05), glow(def.color, 1.4), -r * 0.3, -r * 0.6, r * 0.1);
      void shield;
    }
  }
  if (kind === 'shooter' || kind === 'artillery') {
    const barrel = add(body, new THREE.CylinderGeometry(r * 0.14, r * 0.18, r * 0.9, 10), dark, 0, -r * 0.1, r * 0.9);
    barrel.rotation.x = Math.PI / 2;
    muzzle = live(add(body, sphere(r * 0.18, 8, 6), glow(0xff5577, 2.4), 0, -r * 0.1, r * 1.35));
    if (kind === 'artillery') add(body, new THREE.CylinderGeometry(r * 0.22, r * 0.26, r * 0.5, 10), steel, 0, -r * 0.1, r * 0.55).rotation.x = Math.PI / 2;
  }
  if (kind === 'stalker') {
    for (const sx of [-1, 1]) {
      const wing = live(add(body, rbox(r * 0.9, r * 0.06, r * 0.4, r * 0.03), steel, sx * r * 0.9, -r * 0.1, -r * 0.1));
      wing.rotation.z = sx * 0.2;
      movers.push(wing);
    }
    for (const sx of [-1, 1]) add(body, cone(r * 0.08, r * 0.3, 5), steel, sx * r * 0.2, -r * 0.6, r * 0.3).rotation.x = Math.PI;
  }
  if (kind === 'bomber') {
    bomb = glow(0xffb13d, 2.0);
    blob(body, r * 0.45, 1, 1, 1, bomb, 0, -r * 0.05, -r * 0.55);
    for (let i = 0; i < 3; i++) add(body, sphere(r * 0.05, 6, 5), bomb, Math.cos(i * 2.1) * r * 0.6, r * 0.3, Math.sin(i * 2.1) * r * 0.6);
  }
  let lastW = 0;
  let recoil = 0;
  return finish(root, r, [p.main], (dt, s, t) => {
    const w = s.windup;
    if (flying) {
      hover.position.y = Math.sin(t * 3) * r * 0.1;
      hover.rotation.x = s.moving ? 0.15 : 0;
      if (rotor) rotor.rotation.y += dt * (s.moving ? 26 : 16);
      movers.forEach((m, i) => (m.rotation.z = (i ? -1 : 1) * (0.2 + Math.sin(t * 6) * 0.1)));
    } else {
      body.position.y = bodyY + (s.moving ? Math.abs(Math.sin(t * 14)) * r * 0.05 : 0);
      if (s.moving) for (const m of movers) m.rotation.x += dt * 9;
    }
    visorMat.color.setRGB(0.36 + w * 0.64, 0.95 - w * 0.6, 0.85 - w * 0.6);
    visorMat.emissive.copy(visorMat.color);
    tip.scale.setScalar(1 + Math.sin(t * 6) * 0.15 + w * 0.5);
    if (lastW > 0.6 && w === 0) recoil = 1;
    lastW = w;
    recoil = Math.max(0, recoil - dt * 5);
    if (muzzle) {
      muzzle.scale.setScalar(1 + w * 1.5 - recoil * 0.5);
      muzzle.position.z = r * 1.35 - recoil * r * 0.3;
    }
    if (kind === 'rusher') {
      lerpTo(arms[0], 'y', -0.2 - w * 0.9, dt);
      lerpTo(arms[1], 'y', 0.2 + w * 0.9, dt);
      body.rotation.x = -w * 0.3;
    } else if (kind === 'tank') {
      lerpTo(arms[0], 'x', -1.6 * w, dt);
      lerpTo(arms[1], 'x', -2.4 * w, dt);
    } else if (bomb) {
      const blink = w > 0 ? (Math.sin(t * (10 + w * 30)) > 0 ? 1 : 0.2) : 1;
      bomb.emissiveIntensity = (2 + w * 4) * blink;
      bomb.color.setRGB(1, 0.69 - w * 0.5, 0.24 - w * 0.2);
      body.scale.setScalar(1 + w * 0.2);
    }
  });
}

/** 종류(또는 def.model)·skin 으로 매끈한 모델을 고른다 */
export function createSmoothEnemyModel(type: string, def: EnemyTypeConfig, skin?: string): EnemyModel {
  const robotKind = skin?.startsWith('robot-') ? skin.slice(6) : null;
  const m = robotKind ? robot(def, robotKind) : pickBase(type, def);
  m.root.name = `Enemy-${def.name}`;
  return m;
}

function pickBase(type: string, def: EnemyTypeConfig): EnemyModel {
  switch (type) {
    case 'archer':
      return goblin(def, true);
    case 'shooter':
      return ghost(def);
    case 'tank':
      return troll(def);
    case 'stalker':
      return bat(def);
    case 'artillery':
      return golem(def);
    case 'slime':
    case 'slimelet':
      return slime(def);
    case 'bomber':
      return beetle(def);
    case 'charger':
      return boar(def);
    case 'rusher':
      return goblin(def, false);
    default:
      // 새 종류가 기존 외형을 빌리면(def.model) 그 외형, 없으면 고블린
      return def.model && def.model !== type ? pickBase(def.model, def) : goblin(def, false);
  }
}
