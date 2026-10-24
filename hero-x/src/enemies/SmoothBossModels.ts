import * as THREE from 'three';
import type { EnemyTypeConfig } from '../game/GameConfig';
import type { BossPattern } from './BossAI';
import { glow, pbr } from '../render/materials';
import { add, blob, capsule, disposeTree, rbox, ring, sphere, strand } from '../render/shapes';
import type { EnemyModel, EnemyModelState } from './EnemyModels';

/**
 * 매끈한 카툰 보스 모델 4종 (주인공·적과 같은 스타일)
 * - guardian(숲의 수호 로봇): 둥근 강철 기사, 왕관 가시, 오른손 큰 망치·왼손 건틀릿
 * - golem(수정 골렘): 둥근 바위 덩어리, 등·어깨의 빛나는 수정, 둥근 주먹
 * - commander(요새 사령관): 둥근 붉은 장갑, 어깨 포탑 2기, 양팔 포신, 바이저
 * - frost(서리 거인): 얼음빛 둥근 거인, 고드름 수염·왕관, 얼음 곤봉
 * 공통: 패턴 예고 바닥 원(색·크기), 패턴별 팔 동작, 돌진 기울임, 2단계 붉은 눈, 피격 번쩍임, 사망.
 */
export type SmoothBossKind = 'guardian' | 'golem' | 'commander' | 'frost';

interface BossModelState extends EnemyModelState {
  pattern?: BossPattern | null;
  phase2?: boolean;
}

const PATTERN_COLOR: Record<BossPattern, number> = { charge: 0xff7a45, slam: 0xff4f79, barrage: 0xb06bff, summon: 0x8fe8ff, mortar: 0xffb14f };

export function createSmoothBossModel(def: EnemyTypeConfig, kind: SmoothBossKind): EnemyModel {
  const root = new THREE.Group();
  root.name = `Boss-${def.name}`;
  const r = def.radius;
  const c = new THREE.Color(def.color);
  const metal = kind === 'guardian' || kind === 'commander';
  const main = pbr({ color: c, roughness: metal ? 0.4 : 0.7, metalness: metal ? 0.6 : 0.05 });
  const dark = pbr({ color: c.clone().multiplyScalar(0.45), roughness: 0.6, metalness: metal ? 0.6 : 0.05 });
  const light = pbr({ color: c.clone().lerp(new THREE.Color(0xffffff), 0.35), roughness: 0.5, metalness: metal ? 0.5 : 0.05 });
  const steel = pbr({ color: 0xb6bfcc, roughness: 0.35, metalness: 0.8 });
  const gold = pbr({ color: 0xe9bb42, roughness: 0.35, metalness: 0.6 });
  const eyeColor = kind === 'golem' ? 0x8fe8ff : kind === 'frost' ? 0xbfe9ff : 0x5cf2d8;
  const eyeMat = glow(eyeColor, 2.5);
  const crystal = glow(kind === 'frost' ? 0xbfe9ff : 0x8fe8ff, 1.6);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthWrite: false });

  const body = new THREE.Group();
  root.add(body);
  const bodyY = r * 1.45;
  // 몸통: 모두 둥글게, 종류별 폭
  blob(body, r * 1.05, kind === 'commander' ? 1.2 : 1.05, 1.0, 1.0, main, 0, bodyY, 0);
  if (kind === 'golem') {
    blob(body, r * 0.6, 1, 0.5, 0.7, dark, 0, bodyY - r * 0.4, r * 0.75);
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2;
      strand(body, Math.cos(a) * r * 0.75, bodyY + r * 0.5 + (i % 2) * r * 0.2, Math.sin(a) * r * 0.7 - r * 0.2, new THREE.Vector3(Math.cos(a) * 0.6, 1, Math.sin(a) * 0.6 - 0.2), r * (0.6 + (i % 3) * 0.25), r * 0.16, crystal);
    }
    for (let i = 0; i < 6; i++) add(body, new THREE.DodecahedronGeometry(r * (0.14 + (i % 2) * 0.08), 0), dark, Math.cos(i * 1.1) * r * 0.9, bodyY - r * 0.6 + i * r * 0.2, Math.sin(i * 1.1) * r * 0.8);
  } else if (kind === 'frost') {
    blob(body, r * 0.7, 1, 0.6, 0.7, light, 0, bodyY - r * 0.3, r * 0.8); // 배
    for (let i = 0; i < 7; i++) strand(body, (i - 3) * r * 0.22, bodyY + r * 0.95, -r * 0.3, new THREE.Vector3((i - 3) * 0.15, 1, -0.3), r * (0.5 + (i % 2) * 0.3), r * 0.12, crystal); // 등 얼음 가시
    add(body, rbox(r * 2.0, r * 0.2, r * 1.6, r * 0.08), pbr({ color: 0x4a3326, roughness: 0.9 }), 0, bodyY - r * 0.9, 0); // 가죽 허리띠
  } else {
    add(body, ring(r * 1.05, r * 0.07), steel, 0, bodyY, 0).rotation.x = Math.PI / 2; // 허리 금속 띠
    add(body, rbox(r * 0.9, r * 0.9, r * 0.2, r * 0.1), light, 0, bodyY + r * 0.05, r * 0.95); // 가슴판
    add(body, sphere(r * 0.18, 10, 8), glow(def.color, 1.8), 0, bodyY + r * 0.1, r * 1.08); // 가슴 코어
    if (kind === 'commander') {
      for (const sx of [-1, 1]) {
        const turret = add(body, new THREE.CylinderGeometry(r * 0.16, r * 0.2, r * 1.0, 10), dark, sx * r * 0.95, bodyY + r * 0.95, r * 0.2);
        turret.rotation.x = Math.PI / 2 - 0.35;
        add(body, sphere(r * 0.3, 10, 8), steel, sx * r * 0.95, bodyY + r * 0.8, -r * 0.1);
      }
    }
  }
  // 머리
  const head = new THREE.Group();
  head.position.set(0, bodyY + r * 1.1, r * 0.1);
  body.add(head);
  if (kind === 'golem') add(head, new THREE.DodecahedronGeometry(r * 0.5, 0), dark, 0, 0, 0);
  else blob(head, r * 0.5, 1, 0.9, 0.95, kind === 'frost' ? light : main, 0, 0, 0);
  if (kind === 'guardian' || kind === 'commander') {
    add(head, rbox(r * 0.7, r * 0.16, r * 0.16, r * 0.06), eyeMat, 0, r * 0.05, r * 0.42); // 바이저
    add(head, rbox(r * 0.8, r * 0.26, r * 0.14, r * 0.06), dark, 0, r * 0.05, r * 0.38);
  } else {
    for (const sx of [-1, 1]) blob(head, r * 0.12, 1, 0.9, 0.5, eyeMat, sx * r * 0.2, r * 0.05, r * 0.45);
  }
  if (kind === 'guardian') for (let i = 0; i < 5; i++) strand(head, (i - 2) * r * 0.17, r * 0.38, -r * 0.05, new THREE.Vector3((i - 2) * 0.25, 1, 0), r * (0.45 - Math.abs(i - 2) * 0.08), r * 0.08, gold); // 왕관
  if (kind === 'frost') {
    for (let i = 0; i < 5; i++) strand(head, (i - 2) * r * 0.16, r * 0.4, -r * 0.05, new THREE.Vector3((i - 2) * 0.2, 1, 0), r * (0.5 - Math.abs(i - 2) * 0.1), r * 0.08, crystal); // 얼음 왕관
    for (let i = 0; i < 6; i++) strand(head, (i - 2.5) * r * 0.14, -r * 0.3, r * 0.3, new THREE.Vector3((i - 2.5) * 0.1, -1, 0.3), r * (0.35 + (i % 2) * 0.2), r * 0.07, crystal); // 고드름 수염
  }
  if (kind === 'golem') for (const sx of [-1, 1]) strand(head, sx * r * 0.35, r * 0.3, -r * 0.1, new THREE.Vector3(sx * 0.8, 1, -0.2), r * 0.6, r * 0.12, crystal); // 수정 뿔
  // 다리(짧고 둥글게)
  const legs: THREE.Group[] = [];
  for (const sx of [-1, 1]) {
    const hip = new THREE.Group();
    hip.position.set(sx * r * 0.5, r * 0.6, 0);
    add(hip, capsule(r * 0.26, r * 0.2), dark, 0, -r * 0.2, 0);
    blob(hip, r * 0.3, 1.1, 0.6, 1.3, dark, 0, -r * 0.45, r * 0.1);
    body.add(hip);
    legs.push(hip);
  }
  // 팔: 어깨 축, 끝에 종류별 무기
  const arms: THREE.Group[] = [];
  for (const sx of [-1, 1]) {
    const sh = new THREE.Group();
    sh.position.set(sx * r * (kind === 'commander' ? 1.25 : 1.1), bodyY + r * 0.45, 0);
    blob(sh, r * 0.3, 1, 0.8, 1, kind === 'golem' ? dark : main, 0, 0, 0); // 어깨
    add(sh, capsule(r * 0.2, r * 0.7), kind === 'golem' ? dark : kind === 'frost' ? light : steel, 0, -r * 0.55, 0);
    body.add(sh);
    arms.push(sh);
  }
  const right = arms[1];
  const left = arms[0];
  if (kind === 'guardian') {
    add(right, new THREE.CylinderGeometry(r * 0.08, r * 0.1, r * 1.3, 8), dark, 0, -r * 1.0, r * 0.3).rotation.x = Math.PI / 2;
    add(right, rbox(r * 0.7, r * 0.5, r * 0.5, r * 0.12), steel, 0, -r * 1.0, r * 1.0); // 망치
    add(right, rbox(r * 0.74, r * 0.12, r * 0.12, r * 0.04), gold, 0, -r * 1.0, r * 1.0);
    add(left, sphere(r * 0.34, 12, 10), steel, 0, -r * 1.05, 0); // 건틀릿
  } else if (kind === 'golem') {
    for (const a of arms) add(a, new THREE.DodecahedronGeometry(r * 0.42, 0), dark, 0, -r * 1.05, 0);
  } else if (kind === 'commander') {
    for (const a of arms) {
      add(a, new THREE.CylinderGeometry(r * 0.2, r * 0.26, r * 1.0, 10), dark, 0, -r * 1.0, r * 0.4).rotation.x = Math.PI / 2;
      add(a, sphere(r * 0.16, 8, 6), glow(0xff5577, 2.2), 0, -r * 1.0, r * 0.95);
    }
  } else {
    add(right, new THREE.CylinderGeometry(r * 0.1, r * 0.14, r * 1.4, 8), pbr({ color: 0x5a3a26, roughness: 0.85 }), 0, -r * 1.0, r * 0.4).rotation.x = Math.PI / 2;
    add(right, new THREE.DodecahedronGeometry(r * 0.42, 0), crystal, 0, -r * 1.0, r * 1.2); // 얼음 곤봉
    add(left, sphere(r * 0.34, 12, 10), light, 0, -r * 1.05, 0);
  }
  // 예고 바닥 원
  const ringMesh = add(root, new THREE.RingGeometry(r * 0.9, r * 1.1, 32), ringMat, 0, 0.06, 0);
  ringMesh.rotation.x = -Math.PI / 2;
  ringMesh.castShadow = false;

  let flashTimer = 0;
  let t = 0;
  return {
    root,
    update(dt, s0) {
      const s = s0 as BossModelState;
      t += dt;
      if (s.state === 'dead') {
        const k = Math.max(0, 1 - s.death);
        root.scale.setScalar(k);
        root.position.y = -(1 - k) * r;
        root.rotation.y += dt * 3;
        ringMat.opacity = 0;
        return;
      }
      eyeMat.emissive.set(s.phase2 ? 0xff3b3b : eyeColor);
      eyeMat.emissiveIntensity = 2 + Math.sin(t * (s.phase2 ? 8 : 3)) * 0.8;
      const walk = s.moving ? Math.sin(t * 6) : 0;
      legs[0].rotation.x = walk * 0.4;
      legs[1].rotation.x = -walk * 0.4;
      body.position.y = s.moving ? Math.abs(Math.sin(t * 6)) * r * 0.08 : 0;
      const breathe = 1 + Math.sin(t * 1.6) * 0.02;
      body.scale.set(breathe, 1 / breathe, breathe);
      const w = s.windup;
      const pat = s.pattern ?? null;
      ringMat.opacity = pat && s.state === 'windup' ? 0.25 + w * 0.55 : pat === 'charge' ? 0.5 : 0;
      if (pat) ringMat.color.set(PATTERN_COLOR[pat]);
      ringMesh.scale.setScalar(pat === 'slam' ? 1 + w * 1.6 : 1);
      ringMesh.rotation.z += dt * 1.5;
      const armTarget = pat === 'slam' ? -2.6 * w : pat === 'charge' ? -1.2 : pat === 'barrage' ? -1.6 * w : pat === 'summon' ? -3.0 * w : pat === 'mortar' ? -1.4 : walk * 0.3;
      for (let i = 0; i < arms.length; i++) arms[i].rotation.x += ((i ? armTarget : pat ? armTarget : -walk * 0.3) - arms[i].rotation.x) * (1 - Math.exp(-12 * dt));
      body.rotation.x = pat === 'charge' ? 0.25 : pat === 'slam' ? -0.15 * w : 0;
      head.rotation.x = pat === 'slam' ? -0.2 * w : 0;
      if (flashTimer > 0) {
        flashTimer -= dt;
        if (flashTimer <= 0) main.emissive.setScalar(0);
      }
    },
    flash() {
      flashTimer = 0.09;
      main.emissive.setScalar(0.9);
    },
    dispose() {
      disposeTree(root);
    },
  };
}
