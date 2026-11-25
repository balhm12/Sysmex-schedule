import * as THREE from 'three';
import type { EquipmentLooks } from '../EquipmentVisuals';
import { fabricTexture } from '../../render/fabricTexture';
import { glow, pbr } from '../../render/materials';
import { addOutlines } from '../../render/outline';
import { mergeByMaterial } from '../../assets/meshMerge';
import { add, blob, capsule, rbox, ring, sphere, strand } from '../../render/shapes';
import { createHeroAnimator, createHeroEquipment, disposeModelTree, type HeroRig } from './heroAnimator';
import type { PlaceholderColors, PlayerModel } from './PlaceholderModel';

/**
 * 매끈한 카툰(치비) 영웅 모델 — 픽셀 느낌 없이 구·캡슐·둥근 상자·회전체로 만든 아들 캐릭터 (컨셉 그림 기준 고급화판)
 * - 머리: 둥근 큰 머리(전체의 약 40%), 결이 있는 뾰족한 머리카락 가닥 60여 개(정수리·옆·뒤·앞머리), 큰 눈·반짝임,
 *   네모난 검은 테 안경(투명 렌즈), 미소·홍조·코.
 * - 옷: 후드 달린 긴 파란 코트(앞자락 갈라짐·금 테두리·흰 셔츠·어깨 장식), 가죽 벨트·금 버클·크로스 스트랩, 주머니와 작은 책,
 *   가죽 팔 보호대, 어두운 바지, 무릎 보호대, 끈 달린 가죽 장화. 천·가죽은 캔버스 질감 텍스처.
 * - 관절 구조는 heroAnimator.HeroRig 와 같아 걷기·콤보·회피·점프·피격·쓰러짐 동작과 장비 부착을 공유한다.
 * - 외부 파일 없이 바로 실행된다. 색은 GameConfig.player.colors(skin·visor)만 쓰고 옷 색은 여기 고정.
 */
export function createHeroModel(colors: PlaceholderColors): PlayerModel {
  const root = new THREE.Group();
  root.name = 'HeroChibi';

  const cloth = fabricTexture('cloth');
  const leather = fabricTexture('leather');
  const M = {
    skin: pbr({ color: colors.skin, roughness: 0.65, metalness: 0 }),
    skinDark: pbr({ color: '#dcae8c', roughness: 0.7 }),
    blush: pbr({ color: '#f29a93', roughness: 0.9 }),
    hair: pbr({ color: '#5b3a20', roughness: 0.7 }),
    hairDark: pbr({ color: '#3e2412', roughness: 0.75 }),
    hairLight: pbr({ color: '#7a4e2b', roughness: 0.7 }),
    white: pbr({ color: '#f7f4ee', roughness: 0.5 }),
    shirt: pbr({ color: '#f1ede4', roughness: 0.7, map: cloth }),
    iris: pbr({ color: '#2f6fd6', roughness: 0.3 }),
    irisDark: pbr({ color: '#1d3f8a', roughness: 0.3 }),
    pupil: pbr({ color: '#10141f', roughness: 0.3 }),
    glint: glow('#ffffff', 1.0),
    frame: pbr({ color: '#23252e', roughness: 0.35, metalness: 0.3 }),
    lens: new THREE.MeshStandardMaterial({ color: '#cfe4ff', transparent: true, opacity: 0.14, roughness: 0.15, metalness: 0.1, depthWrite: false }),
    mouth: pbr({ color: '#8d3f36', roughness: 0.8 }),
    coat: pbr({ color: '#2448a8', roughness: 0.65, map: cloth }),
    coatDark: pbr({ color: '#1a3480', roughness: 0.7, map: cloth }),
    coatLight: pbr({ color: '#3b64d4', roughness: 0.6, map: cloth }),
    gold: pbr({ color: '#e9bb42', roughness: 0.35, metalness: 0.6 }),
    goldDark: pbr({ color: '#b98a2c', roughness: 0.4, metalness: 0.6 }),
    leather: pbr({ color: '#6b3f22', roughness: 0.8, map: leather }),
    leatherDark: pbr({ color: '#44271a', roughness: 0.85, map: leather }),
    leatherLight: pbr({ color: '#8c5a35', roughness: 0.8, map: leather }),
    pants: pbr({ color: '#1b2140', roughness: 0.75, map: cloth }),
    sole: pbr({ color: '#2b1a10', roughness: 0.95 }),
    blade: glow(colors.visor, 2.0),
    bladeCore: glow('#e8fbff', 2.6),
    gem: glow('#5ec8ff', 1.8),
    spark: glow('#bfefff', 2.2),
  };
  M.blade.transparent = true;
  M.blade.opacity = 0.9;
  M.lens.side = THREE.DoubleSide;

  // ---------- 다리: 엉덩이(허벅지) → 무릎(정강이·무릎 보호대·장화) ----------
  const makeLeg = (x: number) => {
    const hip = new THREE.Group();
    hip.position.set(x, 0.6, 0);
    add(hip, capsule(0.11, 0.2), M.pants, 0, -0.12, 0);
    const knee = new THREE.Group();
    knee.position.set(0, -0.26, 0);
    add(knee, capsule(0.1, 0.14), M.pants, 0, -0.08, 0);
    add(knee, rbox(0.2, 0.12, 0.09, 0.035), M.leather, 0, -0.03, 0.09); // 무릎 보호대
    add(knee, rbox(0.21, 0.03, 0.1, 0.01), M.gold, 0, 0.03, 0.09);
    add(knee, rbox(0.27, 0.22, 0.34, 0.07), M.leather, 0, -0.22, 0.03); // 장화 몸체
    add(knee, rbox(0.28, 0.05, 0.35, 0.02), M.leatherDark, 0, -0.13, 0.03); // 윗단
    add(knee, rbox(0.29, 0.035, 0.36, 0.012), M.leatherDark, 0, -0.2, 0.03); // 끈 1
    add(knee, rbox(0.29, 0.035, 0.36, 0.012), M.leatherDark, 0, -0.28, 0.03); // 끈 2
    add(knee, rbox(0.05, 0.05, 0.02, 0.01), M.gold, 0, -0.2, 0.215);
    add(knee, rbox(0.05, 0.05, 0.02, 0.01), M.gold, 0, -0.28, 0.215);
    add(knee, rbox(0.23, 0.11, 0.11, 0.045), M.leatherLight, 0, -0.32, 0.19); // 앞코
    add(knee, rbox(0.29, 0.035, 0.37, 0.01), M.sole, 0, -0.355, 0.03); // 밑창
    hip.add(knee);
    root.add(hip);
    return { upper: hip, lower: knee };
  };
  const legL = makeLeg(-0.15);
  const legR = makeLeg(0.15);

  // ---------- 몸통: 코트(앞이 갈라진 긴 코트)·셔츠·벨트·스트랩·주머니·후드·배낭 없음(컨셉 기준) ----------
  const torso = new THREE.Group();
  root.add(torso);
  add(torso, rbox(0.62, 0.5, 0.42, 0.13), M.coat, 0, 0.87, 0); // 코트 몸체
  add(torso, rbox(0.24, 0.3, 0.06, 0.02), M.shirt, 0, 0.98, 0.205); // 흰 셔츠(가슴)
  for (const sx of [-1, 1]) {
    // 코트 앞깃(라펠): 안쪽으로 비스듬히, 금 테두리
    const lapel = add(torso, rbox(0.14, 0.32, 0.05, 0.02), M.coatLight, sx * 0.16, 0.97, 0.22);
    lapel.rotation.z = -sx * 0.22;
    const trim = add(torso, rbox(0.025, 0.32, 0.055, 0.01), M.gold, sx * 0.095, 0.97, 0.225);
    trim.rotation.z = -sx * 0.22;
    // 어깨 장식(금 줄) + 어깨 둥근 패드
    const pad = add(torso, new THREE.SphereGeometry(0.15, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), M.coatDark, sx * 0.36, 1.06, 0);
    pad.scale.set(1, 0.8, 1.1);
    add(torso, ring(0.145, 0.013), M.gold, sx * 0.36, 1.06, 0).rotation.x = Math.PI / 2;
    // 앞자락: 벨트 아래 두 갈래, 바깥으로 살짝 벌어짐, 금 테두리
    const tail = add(torso, rbox(0.3, 0.34, 0.06, 0.03), M.coat, sx * 0.17, 0.47, 0.19);
    tail.rotation.z = sx * 0.1;
    tail.rotation.x = 0.1;
    const tailTrim = add(torso, rbox(0.03, 0.34, 0.065, 0.01), M.gold, sx * 0.035, 0.47, 0.195);
    tailTrim.rotation.z = sx * 0.1;
    tailTrim.rotation.x = 0.1;
    add(torso, rbox(0.3, 0.03, 0.065, 0.01), M.gold, sx * 0.17, 0.31, 0.21).rotation.z = sx * 0.1;
  }
  add(torso, rbox(0.58, 0.36, 0.06, 0.03), M.coat, 0, 0.46, -0.19).rotation.x = -0.12; // 뒷자락
  add(torso, rbox(0.58, 0.03, 0.065, 0.01), M.gold, 0, 0.29, -0.215);
  for (const sx of [-1, 1]) add(torso, rbox(0.06, 0.4, 0.44, 0.02), M.coatDark, sx * 0.31, 0.62, 0); // 옆자락
  // 벨트·버클·크로스 스트랩
  add(torso, rbox(0.66, 0.08, 0.46, 0.03), M.leather, 0, 0.68, 0);
  add(torso, rbox(0.11, 0.1, 0.03, 0.015), M.gold, 0, 0.68, 0.235);
  add(torso, rbox(0.045, 0.04, 0.01, 0.005), M.leatherDark, 0, 0.68, 0.255);
  const strap = add(torso, rbox(0.07, 0.56, 0.02, 0.01), M.leather, 0.02, 0.9, 0.225);
  strap.rotation.z = 0.55;
  add(torso, rbox(0.08, 0.06, 0.015, 0.005), M.gold, 0.12, 0.84, 0.235).rotation.z = 0.55;
  // 주머니(오른쪽 허리)·작은 책(왼쪽 허리)
  add(torso, rbox(0.14, 0.15, 0.12, 0.04), M.leather, 0.27, 0.6, 0.15);
  add(torso, rbox(0.15, 0.05, 0.13, 0.02), M.leatherDark, 0.27, 0.65, 0.15);
  add(torso, rbox(0.05, 0.05, 0.015, 0.005), M.gold, 0.27, 0.6, 0.215);
  add(torso, rbox(0.1, 0.16, 0.13, 0.015), M.leatherDark, -0.3, 0.6, 0.1); // 책
  add(torso, rbox(0.08, 0.14, 0.11, 0.01), M.white, -0.3, 0.6, 0.1);
  add(torso, rbox(0.1, 0.03, 0.13, 0.005), M.gold, -0.3, 0.6, 0.1);
  // 후드: 목 뒤에 늘어진 둥근 고리 + 주머니
  add(torso, ring(0.26, 0.09, Math.PI), M.coatDark, 0, 1.12, -0.02).rotation.set(Math.PI / 2, 0, 0);
  blob(torso, 0.2, 1.3, 0.7, 0.9, M.coatDark, 0, 1.05, -0.22);
  add(torso, ring(0.26, 0.03, Math.PI), M.gold, 0, 1.16, -0.02).rotation.set(Math.PI / 2, 0, 0);
  add(torso, capsule(0.09, 0.08), M.skin, 0, 1.18, 0); // 목
  add(torso, ring(0.17, 0.035), M.shirt, 0, 1.14, 0.02).rotation.x = Math.PI / 2; // 셔츠 깃

  // ---------- 팔: 어깨(위팔) → 팔꿈치(소매·가죽 팔 보호대·손) ----------
  const makeArm = (x: number) => {
    const shoulder = new THREE.Group();
    shoulder.position.set(x, 1.05, 0);
    add(shoulder, capsule(0.085, 0.12), M.coat, 0, -0.1, 0);
    add(shoulder, ring(0.088, 0.013), M.gold, 0, -0.19, 0).rotation.x = Math.PI / 2;
    const elbow = new THREE.Group();
    elbow.position.set(0, -0.22, 0);
    add(elbow, capsule(0.08, 0.05), M.shirt, 0, -0.03, 0); // 흰 소매
    add(elbow, rbox(0.2, 0.2, 0.22, 0.06), M.leather, 0, -0.14, 0); // 팔 보호대
    add(elbow, ring(0.105, 0.013), M.gold, 0, -0.07, 0).rotation.x = Math.PI / 2;
    add(elbow, rbox(0.21, 0.04, 0.23, 0.015), M.leatherDark, 0, -0.22, 0);
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
  add(sword, new THREE.CylinderGeometry(0.028, 0.03, 0.22, 10), M.leatherDark, 0, 0, -0.02).rotation.x = Math.PI / 2;
  add(sword, sphere(0.045, 10, 8), M.gold, 0, 0, -0.14);
  add(sword, rbox(0.26, 0.07, 0.06, 0.025), M.gold, 0, 0, 0.1);
  add(sword, sphere(0.035, 10, 8), M.gem, 0, 0, 0.15);
  add(sword, rbox(0.12, 0.045, 0.78, 0.02), M.blade, 0, 0, 0.56);
  add(sword, rbox(0.05, 0.05, 0.7, 0.02), M.bladeCore, 0, 0, 0.55);
  add(sword, new THREE.ConeGeometry(0.06, 0.14, 4), M.blade, 0, 0, 1.0).rotation.x = Math.PI / 2;
  for (const [dx, dy, dz, s] of [[0.11, 0.08, 0.4, 0.022], [-0.1, -0.06, 0.62, 0.018], [0.09, -0.08, 0.84, 0.018], [-0.08, 0.1, 0.98, 0.02]]) add(sword, sphere(s, 6, 5), M.spark, dx, dy, dz);
  armR.lower.add(sword);

  // ---------- 머리: 둥근 머리 + 얼굴 + 네모 안경 + 뾰족한 머리카락 ----------
  const head = new THREE.Group();
  head.position.y = 1.2;
  const HY = 0.4;
  const R = 0.42;
  const skull = add(head, sphere(R, 32, 24), M.skin, 0, HY, 0);
  skull.scale.set(1, 0.97, 0.96);
  for (const sx of [-1, 1]) blob(head, 0.07, 0.55, 1, 0.8, M.skin, sx * 0.41, HY - 0.02, -0.02); // 귀
  const face = new THREE.Group();
  face.position.y = HY;
  head.add(face);
  for (const sx of [-1, 1]) {
    const ex = sx * 0.16;
    blob(face, 0.105, 1, 1.25, 0.45, M.white, ex, 0.0, 0.345); // 흰자
    blob(face, 0.07, 1, 1.25, 0.5, M.irisDark, ex, -0.012, 0.388); // 홍채 테
    blob(face, 0.058, 1, 1.25, 0.5, M.iris, ex, -0.01, 0.398);
    blob(face, 0.034, 1, 1.25, 0.5, M.pupil, ex, -0.018, 0.418);
    add(face, sphere(0.022, 8, 6), M.glint, ex - sx * 0.03, 0.045, 0.432);
    add(face, sphere(0.011, 6, 5), M.glint, ex + sx * 0.024, -0.035, 0.432);
    add(face, rbox(0.15, 0.03, 0.035, 0.012), M.hairDark, ex, 0.2, 0.345).rotation.z = sx * 0.1; // 눈썹
    // 네모난 안경테(모서리 둥근 사각형 4변) + 렌즈
    const fx = ex, fy = 0.0, fz = 0.405;
    add(face, rbox(0.3, 0.028, 0.028, 0.012), M.frame, fx, fy + 0.12, fz);
    add(face, rbox(0.3, 0.028, 0.028, 0.012), M.frame, fx, fy - 0.12, fz);
    add(face, rbox(0.028, 0.26, 0.028, 0.012), M.frame, fx + 0.14, fy, fz);
    add(face, rbox(0.028, 0.26, 0.028, 0.012), M.frame, fx - 0.14, fy, fz);
    add(face, new THREE.PlaneGeometry(0.27, 0.22), M.lens, fx, fy, fz - 0.005);
    const temple = add(face, new THREE.CylinderGeometry(0.011, 0.011, 0.38, 8), M.frame, sx * 0.33, 0.06, 0.2);
    temple.rotation.x = Math.PI / 2;
    temple.rotation.z = sx * 0.06;
    blob(face, 0.045, 1.5, 0.7, 0.35, M.blush, sx * 0.27, -0.12, 0.315); // 홍조
  }
  add(face, rbox(0.06, 0.022, 0.025, 0.01), M.frame, 0, 0.02, 0.405); // 안경 다리(코 위)
  add(face, sphere(0.03, 10, 8), M.skinDark, 0, -0.085, 0.41); // 코
  add(face, ring(0.055, 0.012, Math.PI), M.mouth, 0, -0.17, 0.39).rotation.z = Math.PI; // 미소
  // 머리카락: 모자(윗부분·뒷부분) 위에 뾰족한 가닥을 겹쳐 결을 만든다
  const cap = add(head, new THREE.SphereGeometry(R + 0.045, 32, 20, 0, Math.PI * 2, 0, Math.PI * 0.62), M.hair, 0, HY + 0.02, -0.03);
  cap.rotation.x = -0.2;
  blob(head, R + 0.015, 1, 0.9, 0.78, M.hairDark, 0, HY - 0.08, -0.13); // 뒷머리 덩어리
  for (const sx of [-1, 1]) blob(head, 0.12, 0.5, 1.3, 1.0, M.hair, sx * (R + 0.02), HY + 0.0, -0.05); // 옆머리
  const rng = (seed: number) => { let s = seed; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; };
  const rand = rng(23);
  const hairMat = () => (rand() < 0.22 ? M.hairLight : rand() < 0.3 ? M.hairDark : M.hair);
  // 정수리·옆·뒤: 구면 위 점에서 머리를 따라 눕는 짧은 가닥 (결만 보이게, 삐죽하지 않게)
  for (let i = 0; i < 22; i++) {
    const th = rand() * Math.PI * 2; // 둘레 각 (0 = +X)
    const ph = 0.12 + rand() * 0.95; // 0 = 정수리, 클수록 옆
    const rr = R + 0.01;
    const px = Math.sin(ph) * Math.cos(th) * rr;
    const py = Math.cos(ph) * rr * 0.98;
    const pz = Math.sin(ph) * Math.sin(th) * rr - 0.03;
    const normal = new THREE.Vector3(px, py, pz + 0.03).normalize();
    const front = pz > 0.15; // 앞쪽은 앞머리가 맡는다 → 짧게
    const up = new THREE.Vector3(0, 1, 0);
    const swirl = new THREE.Vector3(-Math.sin(th), 0, Math.cos(th)).multiplyScalar(0.7);
    // 바깥쪽 성분은 작게, 둘레 방향(swirl)으로 눕혀서 머리에 붙은 결처럼
    const dir = normal.clone().multiplyScalar(0.35).add(up.multiplyScalar(0.2)).add(swirl);
    if (pz < -0.1) dir.y -= 0.5; // 뒷머리는 아래로
    const len = front ? 0.1 + rand() * 0.05 : 0.12 + rand() * 0.07;
    strand(head, px, HY + 0.02 + py - 0.02, pz, dir, len, 0.065 + rand() * 0.03, hairMat());
  }
  // 앞머리: 이마 위에서 아래·옆으로 흐르는 가닥 (가운데 가르마, 길이 제각각)
  const fringe = [-62, -50, -38, -27, -16, -6, 5, 15, 26, 37, 49, 60];
  fringe.forEach((deg, i) => {
    const a = (deg * Math.PI) / 180;
    const rr = R + 0.015;
    const px = Math.sin(a) * rr;
    const pz = Math.cos(a) * rr - 0.02;
    const side = Math.sign(deg) || 1;
    const len = 0.16 + 0.05 * Math.abs(Math.sin(i * 1.9)) + rand() * 0.03;
    const dir = new THREE.Vector3(Math.sin(a) * 0.4 + side * 0.15, -1, Math.cos(a) * 0.3);
    strand(head, px, HY + 0.3, pz, dir, len, 0.065, i % 5 === 1 ? M.hairDark : i % 4 === 3 ? M.hairLight : M.hair);
  });
  // 정수리 삐침: 작은 가닥 둘만 (귀여운 포인트)
  strand(head, -0.06, HY + R + 0.02, -0.02, new THREE.Vector3(-0.5, 1, 0.15), 0.17, 0.055, M.hairLight);
  strand(head, 0.08, HY + R + 0.01, 0.02, new THREE.Vector3(0.45, 0.9, 0.3), 0.14, 0.05, M.hair);
  // 얼굴 사진(설정에서 넣은 경우): 얼굴 앞 구면 조각에 텍스처
  const faceMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 1 });
  const facePlane = new THREE.Mesh(new THREE.SphereGeometry(R + 0.005, 24, 18, Math.PI * 0.22, Math.PI * 0.56, Math.PI * 0.22, Math.PI * 0.56), faceMat);
  facePlane.position.y = HY;
  facePlane.visible = false;
  head.add(facePlane);
  root.add(head);

  // 같은 관절·같은 재질의 부품(머리카락 가닥·단추·끈 …)을 합쳐 그리기 호출을 줄인다 (동작은 관절 그룹만 움직이므로 안전)
  mergeByMaterial(root);
  // 툰 외곽선 (화질에 따라 보이기/숨기기)
  root.updateMatrixWorld(true);
  addOutlines(root, 0.022, 'hero');
  const rig: HeroRig = { root, torso, head, legL, legR, armL, armR, hurtMats: [M.skin, M.coat, M.coatLight, M.coatDark] };
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
