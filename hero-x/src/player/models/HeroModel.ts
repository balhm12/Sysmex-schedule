import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import type { EquipmentLooks } from '../EquipmentVisuals';
import { glow, pbr } from '../../render/materials';
import { createHeroAnimator, createHeroEquipment, disposeModelTree, type HeroRig } from './heroAnimator';
import type { PlaceholderColors, PlayerModel } from './PlaceholderModel';

/**
 * 매끈한 카툰(치비) 영웅 모델 — 복셀·픽셀 느낌 없이 구·캡슐·둥근 상자로 만든 아들 캐릭터
 * - 둥근 큰 머리(전체의 약 40%), 갈색 머리카락(둥근 모자 + 앞머리 갈래 + 정수리 뭉치), 큰 눈·둥근 안경·미소·홍조,
 *   파란 모험가 복장(금색 장식·스카프·허리띠·주머니·배낭), 갈색 장화, 빛나는 에너지 검.
 * - 관절 구조는 heroAnimator.HeroRig 와 같아 걷기·콤보·회피·점프·피격·쓰러짐 동작과 장비 부착을 공유한다.
 * - 외부 파일 없이 바로 실행된다. 색은 GameConfig.player.colors(skin·visor)만 쓰고 옷 색은 여기 고정.
 */
export function createHeroModel(colors: PlaceholderColors): PlayerModel {
  const root = new THREE.Group();
  root.name = 'HeroChibi';

  const M = {
    skin: pbr({ color: colors.skin, roughness: 0.65, metalness: 0 }),
    skinDark: pbr({ color: '#dcae8c', roughness: 0.7 }),
    blush: pbr({ color: '#f29a93', roughness: 0.9 }),
    hair: pbr({ color: '#5a3a21', roughness: 0.75 }),
    hairDark: pbr({ color: '#3f2514', roughness: 0.8 }),
    hairLight: pbr({ color: '#74492a', roughness: 0.75 }),
    white: pbr({ color: '#f7f4ee', roughness: 0.5 }),
    iris: pbr({ color: '#4a2d19', roughness: 0.35 }),
    pupil: pbr({ color: '#15100b', roughness: 0.3 }),
    glint: glow('#ffffff', 1.0),
    glass: pbr({ color: '#aeb7c6', roughness: 0.3, metalness: 0.75 }),
    lens: new THREE.MeshStandardMaterial({ color: '#cfe4ff', transparent: true, opacity: 0.14, roughness: 0.15, metalness: 0.1, depthWrite: false }),
    mouth: pbr({ color: '#8d3f36', roughness: 0.8 }),
    navy: pbr({ color: '#223a8c', roughness: 0.6 }),
    blue: pbr({ color: '#2f5fd6', roughness: 0.55 }),
    blueLight: pbr({ color: '#5f8ef2', roughness: 0.5 }),
    gold: pbr({ color: '#e9bb42', roughness: 0.35, metalness: 0.6 }),
    goldDark: pbr({ color: '#b98a2c', roughness: 0.4, metalness: 0.6 }),
    brown: pbr({ color: '#6f4226', roughness: 0.8 }),
    brownDark: pbr({ color: '#47291a', roughness: 0.85 }),
    brownLight: pbr({ color: '#8e5a36', roughness: 0.8 }),
    pants: pbr({ color: '#1c2244', roughness: 0.7 }),
    sole: pbr({ color: '#2b1a10', roughness: 0.95 }),
    blade: glow(colors.visor, 2.0),
    bladeCore: glow('#e8fbff', 2.6),
    gem: glow('#5ec8ff', 1.8),
    spark: glow('#bfefff', 2.2),
  };
  M.blade.transparent = true;
  M.blade.opacity = 0.9;
  M.lens.side = THREE.DoubleSide;

  const add = (parent: THREE.Object3D, geo: THREE.BufferGeometry, m: THREE.Material, x = 0, y = 0, z = 0): THREE.Mesh => {
    const mesh = new THREE.Mesh(geo, m);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    parent.add(mesh);
    return mesh;
  };
  const rbox = (w: number, h: number, d: number, r: number) => new RoundedBoxGeometry(w, h, d, 4, Math.min(r, w / 2, h / 2, d / 2));
  const sphere = (r: number, w = 20, h = 14) => new THREE.SphereGeometry(r, w, h);
  const capsule = (r: number, len: number) => new THREE.CapsuleGeometry(r, len, 6, 14);
  const ring = (r: number, tube: number, arc = Math.PI * 2) => new THREE.TorusGeometry(r, tube, 10, 32, arc);
  /** 타원체(구를 늘림) */
  const blob = (parent: THREE.Object3D, r: number, sx: number, sy: number, sz: number, m: THREE.Material, x: number, y: number, z: number): THREE.Mesh => {
    const mesh = add(parent, sphere(r, 16, 12), m, x, y, z);
    mesh.scale.set(sx, sy, sz);
    return mesh;
  };

  // ---------- 다리: 엉덩이(허벅지) → 무릎(정강이·장화) ----------
  const makeLeg = (x: number) => {
    const hip = new THREE.Group();
    hip.position.set(x, 0.6, 0);
    add(hip, capsule(0.11, 0.2), M.pants, 0, -0.12, 0);
    const knee = new THREE.Group();
    knee.position.set(0, -0.26, 0);
    add(knee, capsule(0.1, 0.14), M.pants, 0, -0.08, 0);
    add(knee, rbox(0.2, 0.09, 0.08, 0.03), M.blue, 0, -0.04, 0.09); // 무릎 보호대
    add(knee, ring(0.105, 0.016), M.gold, 0, -0.1, 0).rotation.x = Math.PI / 2; // 금색 끈
    add(knee, rbox(0.26, 0.17, 0.34, 0.07), M.brown, 0, -0.27, 0.03); // 장화
    add(knee, rbox(0.27, 0.05, 0.35, 0.02), M.brownDark, 0, -0.2, 0.03); // 장화 윗단
    add(knee, rbox(0.28, 0.04, 0.36, 0.015), M.brownDark, 0, -0.29, 0.03); // 끈
    add(knee, rbox(0.06, 0.06, 0.02, 0.01), M.gold, 0, -0.29, 0.21); // 버클
    add(knee, rbox(0.22, 0.1, 0.1, 0.04), M.brownLight, 0, -0.32, 0.19); // 앞코
    add(knee, rbox(0.28, 0.035, 0.37, 0.01), M.sole, 0, -0.355, 0.03); // 밑창
    hip.add(knee);
    root.add(hip);
    return { upper: hip, lower: knee };
  };
  const legL = makeLeg(-0.15);
  const legR = makeLeg(0.15);

  // ---------- 몸통 ----------
  const torso = new THREE.Group();
  root.add(torso);
  add(torso, rbox(0.64, 0.52, 0.44, 0.14), M.navy, 0, 0.86, 0);
  add(torso, rbox(0.36, 0.42, 0.05, 0.02), M.blue, 0, 0.87, 0.215); // 앞판
  add(torso, rbox(0.04, 0.4, 0.015, 0.005), M.gold, 0, 0.87, 0.245); // 가운데 금줄
  for (const sx of [-1, 1]) add(torso, rbox(0.03, 0.4, 0.015, 0.005), M.gold, sx * 0.17, 0.87, 0.245);
  add(torso, rbox(0.16, 0.04, 0.015, 0.005), M.gold, 0, 1.04, 0.245); // 가슴 V
  add(torso, sphere(0.035, 10, 8), M.gem, 0, 0.99, 0.25); // 가슴 보석
  add(torso, rbox(0.66, 0.14, 0.46, 0.06), M.blue, 0, 0.6, 0); // 밑단
  add(torso, rbox(0.68, 0.03, 0.48, 0.01), M.goldDark, 0, 0.655, 0);
  add(torso, rbox(0.68, 0.08, 0.48, 0.03), M.brown, 0, 0.69, 0); // 허리띠
  add(torso, rbox(0.1, 0.1, 0.03, 0.015), M.gold, 0, 0.69, 0.245); // 버클
  add(torso, rbox(0.04, 0.04, 0.01, 0.005), M.brownDark, 0, 0.69, 0.265);
  for (const sx of [-1, 1]) {
    add(torso, rbox(0.14, 0.14, 0.12, 0.04), M.brown, sx * 0.26, 0.63, 0.17); // 주머니
    add(torso, rbox(0.15, 0.05, 0.13, 0.02), M.brownDark, sx * 0.26, 0.68, 0.17);
    add(torso, rbox(0.06, 0.36, 0.02, 0.008), M.brown, sx * 0.17, 0.9, 0.235); // 멜빵
    add(torso, rbox(0.07, 0.05, 0.015, 0.005), M.gold, sx * 0.17, 1.0, 0.245);
    // 어깨 보호대(반구) + 금테
    const pad = add(torso, new THREE.SphereGeometry(0.155, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), M.blue, sx * 0.37, 1.06, 0);
    pad.scale.set(1, 0.8, 1.1);
    add(torso, ring(0.15, 0.014), M.gold, sx * 0.37, 1.06, 0).rotation.x = Math.PI / 2;
  }
  // 스카프(목 둘레 고리) + 앞 접힘 + 금 고리
  add(torso, ring(0.26, 0.085, Math.PI * 2), M.blue, 0, 1.12, 0.02).rotation.x = Math.PI / 2;
  add(torso, rbox(0.28, 0.1, 0.12, 0.04), M.blueLight, 0, 1.1, 0.25);
  add(torso, rbox(0.1, 0.1, 0.03, 0.015), M.gold, 0, 1.08, 0.31);
  add(torso, rbox(0.14, 0.26, 0.06, 0.03), M.blue, 0.2, 0.98, -0.28); // 스카프 꼬리
  add(torso, capsule(0.09, 0.08), M.skin, 0, 1.18, 0); // 목
  // 배낭
  add(torso, rbox(0.42, 0.44, 0.22, 0.08), M.brown, 0, 0.9, -0.31);
  add(torso, capsule(0.09, 0.24), M.navy, 0, 1.15, -0.29).rotation.z = Math.PI / 2;
  add(torso, ring(0.095, 0.02), M.blue, 0, 1.15, -0.29).rotation.y = Math.PI / 2;
  add(torso, rbox(0.22, 0.16, 0.06, 0.03), M.brownDark, 0, 0.8, -0.43);
  add(torso, rbox(0.06, 0.06, 0.015, 0.005), M.gold, 0, 0.88, -0.455);

  // ---------- 팔: 어깨(위팔) → 팔꿈치(소매·팔 보호대·손) ----------
  const makeArm = (x: number) => {
    const shoulder = new THREE.Group();
    shoulder.position.set(x, 1.05, 0);
    add(shoulder, capsule(0.085, 0.12), M.navy, 0, -0.1, 0);
    add(shoulder, ring(0.088, 0.014), M.gold, 0, -0.19, 0).rotation.x = Math.PI / 2;
    const elbow = new THREE.Group();
    elbow.position.set(0, -0.22, 0);
    add(elbow, capsule(0.08, 0.05), M.white, 0, -0.03, 0); // 흰 소매
    add(elbow, rbox(0.2, 0.2, 0.22, 0.06), M.brown, 0, -0.14, 0); // 팔 보호대
    add(elbow, ring(0.105, 0.014), M.gold, 0, -0.07, 0).rotation.x = Math.PI / 2;
    add(elbow, rbox(0.21, 0.04, 0.23, 0.015), M.brownDark, 0, -0.22, 0);
    add(elbow, sphere(0.085, 16, 12), M.skin, 0, -0.29, 0.01); // 손
    add(elbow, sphere(0.04, 10, 8), M.skin, -Math.sign(x) * 0.02, -0.26, 0.08); // 엄지
    shoulder.add(elbow);
    torso.add(shoulder);
    return { upper: shoulder, lower: elbow };
  };
  const armL = makeArm(-0.4);
  const armR = makeArm(0.4);

  // ---------- 에너지 검 (오른손, 앞 +Z) ----------
  const sword = new THREE.Group();
  sword.name = 'HeroSword';
  sword.position.set(0, -0.29, 0.02);
  add(sword, new THREE.CylinderGeometry(0.028, 0.03, 0.22, 10), M.brownDark, 0, 0, -0.02).rotation.x = Math.PI / 2;
  add(sword, sphere(0.045, 10, 8), M.gold, 0, 0, -0.14);
  add(sword, rbox(0.26, 0.07, 0.06, 0.025), M.gold, 0, 0, 0.1);
  add(sword, sphere(0.035, 10, 8), M.gem, 0, 0, 0.15);
  add(sword, rbox(0.12, 0.045, 0.78, 0.02), M.blade, 0, 0, 0.56);
  add(sword, rbox(0.05, 0.05, 0.7, 0.02), M.bladeCore, 0, 0, 0.55);
  add(sword, new THREE.ConeGeometry(0.06, 0.14, 4), M.blade, 0, 0, 1.0).rotation.x = Math.PI / 2;
  for (const [dx, dy, dz, s] of [[0.11, 0.08, 0.4, 0.022], [-0.1, -0.06, 0.62, 0.018], [0.09, -0.08, 0.84, 0.018], [-0.08, 0.1, 0.98, 0.02]]) add(sword, sphere(s, 6, 5), M.spark, dx, dy, dz);
  armR.lower.add(sword);

  // ---------- 머리: 둥근 머리 + 얼굴 + 안경 + 머리카락 ----------
  const head = new THREE.Group();
  head.position.y = 1.2;
  const HY = 0.4; // 머리 중심 (머리 그룹 기준)
  const R = 0.42;
  const skull = add(head, sphere(R, 32, 24), M.skin, 0, HY, 0);
  skull.scale.set(1, 0.97, 0.96);
  for (const sx of [-1, 1]) blob(head, 0.07, 0.55, 1, 0.8, M.skin, sx * 0.41, HY - 0.02, -0.02); // 귀
  const face = new THREE.Group();
  face.position.y = HY;
  head.add(face);
  for (const sx of [-1, 1]) {
    const ex = sx * 0.155;
    blob(face, 0.1, 1, 1.2, 0.45, M.white, ex, 0.01, 0.345); // 흰자
    blob(face, 0.062, 1, 1.2, 0.5, M.iris, ex, -0.005, 0.39);
    blob(face, 0.034, 1, 1.2, 0.5, M.pupil, ex, -0.012, 0.415);
    add(face, sphere(0.02, 8, 6), M.glint, ex - sx * 0.028, 0.045, 0.43);
    add(face, sphere(0.011, 6, 5), M.glint, ex + sx * 0.022, -0.03, 0.43);
    add(face, rbox(0.15, 0.03, 0.035, 0.012), M.hairDark, ex, 0.19, 0.345).rotation.z = sx * 0.12; // 눈썹
    // 둥근 안경: 테 + 렌즈, 다리는 귀까지
    add(face, ring(0.145, 0.015), M.glass, ex, 0.01, 0.405);
    add(face, new THREE.CircleGeometry(0.14, 24), M.lens, ex, 0.01, 0.4);
    const temple = add(face, new THREE.CylinderGeometry(0.011, 0.011, 0.4, 8), M.glass, sx * 0.34, 0.06, 0.2);
    temple.rotation.x = Math.PI / 2;
    temple.rotation.z = sx * 0.08;
    blob(face, 0.045, 1.5, 0.7, 0.35, M.blush, sx * 0.265, -0.11, 0.315); // 홍조
  }
  add(face, new THREE.CylinderGeometry(0.01, 0.01, 0.05, 8), M.glass, 0, 0.03, 0.4).rotation.z = Math.PI / 2; // 안경 다리(코 위)
  add(face, sphere(0.032, 10, 8), M.skinDark, 0, -0.08, 0.41); // 코
  add(face, ring(0.055, 0.012, Math.PI), M.mouth, 0, -0.17, 0.39).rotation.z = Math.PI; // 미소
  // 머리카락: 둥근 모자(윗부분) + 옆머리 + 뒷머리 + 앞머리 갈래 + 정수리 뭉치
  const cap = add(head, new THREE.SphereGeometry(R + 0.04, 32, 20, 0, Math.PI * 2, 0, Math.PI * 0.58), M.hair, 0, HY + 0.02, -0.03);
  cap.scale.set(1.02, 1.0, 1.0);
  cap.rotation.x = -0.22;
  blob(head, R + 0.02, 1, 0.9, 0.75, M.hairDark, 0, HY - 0.08, -0.14); // 뒷머리 덩어리
  for (const sx of [-1, 1]) blob(head, 0.13, 0.5, 1.4, 1.1, M.hair, sx * (R + 0.02), HY + 0.02, -0.06); // 옆머리
  const fringe = [-58, -46, -34, -22, -10, 2, 14, 26, 38, 50, 60];
  fringe.forEach((deg, i) => {
    const a = (deg * Math.PI) / 180;
    const rr = R + 0.02;
    const len = 1.5 + 0.7 * Math.abs(Math.sin(i * 1.7));
    const m = i % 5 === 1 ? M.hairDark : i % 4 === 3 ? M.hairLight : M.hair;
    const tuft = blob(head, 0.075, 0.9, len, 0.6, m, Math.sin(a) * rr * 0.98, HY + 0.26 - len * 0.03, Math.cos(a) * rr * 0.95 - 0.04);
    tuft.rotation.y = a;
    tuft.rotation.x = 0.35; // 아래로 갈수록 바깥으로
  });
  const rng = (seed: number) => { let s = seed; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; };
  const rand = rng(11);
  for (let i = 0; i < 16; i++) {
    const th = rand() * Math.PI * 2;
    const ph = rand() * 0.9;
    const rr = R + 0.03;
    const s = 0.09 + rand() * 0.07;
    const t = blob(head, s, 1, 0.75 + rand() * 0.5, 1, rand() < 0.3 ? M.hairLight : M.hair, Math.sin(ph) * Math.cos(th) * rr, HY + 0.02 + Math.cos(ph) * rr, Math.sin(ph) * Math.sin(th) * rr - 0.03);
    t.rotation.set(rand() * 0.6, rand() * Math.PI, rand() * 0.6);
  }
  const spike = blob(head, 0.07, 0.8, 1.8, 0.7, M.hairLight, -0.1, HY + R + 0.1, -0.02);
  spike.rotation.z = 0.35;
  // 얼굴 사진(설정에서 넣은 경우): 얼굴 앞 구면 조각에 텍스처
  const faceMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 1 });
  const facePlane = new THREE.Mesh(new THREE.SphereGeometry(R + 0.005, 24, 18, Math.PI * 0.22, Math.PI * 0.56, Math.PI * 0.22, Math.PI * 0.56), faceMat);
  facePlane.position.y = HY;
  facePlane.visible = false;
  head.add(facePlane);
  root.add(head);

  const rig: HeroRig = { root, torso, head, legL, legR, armL, armR, hurtMats: [M.skin, M.navy, M.blue] };
  const animate = createHeroAnimator(rig);
  const equip = createHeroEquipment(rig, sword, new THREE.Vector3(0, -0.29, 0.02), 0.5, new THREE.Box3(new THREE.Vector3(-0.32, 0.6, -0.22), new THREE.Vector3(0.32, 1.12, 0.22)));

  return {
    root,
    setFace(texture) {
      if (faceMat.map && faceMat.map !== texture) faceMat.map.dispose();
      if (texture) {
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
      animate(dt, state);
    },
    setEquipment(looks: EquipmentLooks) {
      equip(looks);
    },
    dispose() {
      disposeModelTree(root);
    },
  };
}
