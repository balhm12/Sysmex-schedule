import * as THREE from 'three';
import type { DungeonDef } from '../game/DungeonDefs';
import type { Vec2 } from '../player/movement';
import { glow, pbr } from '../render/materials';
import { QUALITY_PRESETS, type QualityLevel } from '../render/Quality';
import { planDecor, planZoneProps, seededRandom, type DecorItem } from './decorLayout';

/**
 * 던전 장식 (코드로 만든 소품·풀·입자)
 * - decorLayout.planDecor 가 정한 자리에 종류별 소품을 세운다. 소품은 보이기만 하고 충돌은 없다.
 * - 풀: InstancedMesh 한 번의 그리기 호출로 수천 포기. 정점 셰이더에서 바람에 흔들린다.
 * - 입자: 반딧불(숲)·먼지(동굴)·불똥(요새)을 Points 로 띄운다.
 * - 화질 프리셋에 따라 풀 포기 수·입자 수를 줄인다.
 */
export class Decor {
  readonly root = new THREE.Group();
  private readonly disposables: Array<{ dispose(): void }> = [];
  private grass: THREE.InstancedMesh | null = null;
  private grassMat: THREE.MeshStandardMaterial | null = null;
  private grassTime = { value: 0 };
  private particles: THREE.Points | null = null;
  private particleVel: Float32Array | null = null;
  private readonly lamps: THREE.MeshStandardMaterial[] = [];
  /** 횃불·모닥불 불꽃 (일렁임) */
  private readonly flames: Array<{ mat: THREE.MeshStandardMaterial; mesh: THREE.Mesh; phase: number }> = [];
  private t = 0;
  private readonly rnd: () => number;

  constructor(private readonly def: DungeonDef, bossSpawn: Vec2, quality: QualityLevel) {
    this.root.name = `Decor-${def.id}`;
    this.rnd = seededRandom(def.id.length * 131 + 17);
    const plan = planDecor(def, bossSpawn, 1);
    for (const it of plan.inside) this.root.add(this.makeProp(it));
    for (const it of plan.outside) this.root.add(this.makeProp(it));
    // 여정 던전: 구역 종류별 테마 소품 (출발 표지판·숲길 횃불·보물 터 폐허·쉼터 모닥불·보스 터 돌기둥 …)
    for (const it of planZoneProps(def, bossSpawn, 1)) this.root.add(this.makeProp(it));
    this.buildGrass(quality);
    this.buildParticles(quality);
  }

  /** 종류별 소품 생성 (단순 도형 조합, PBR 재질) */
  private makeProp(it: DecorItem): THREE.Object3D {
    const g = new THREE.Group();
    g.position.set(it.x, 0, it.z);
    g.rotation.y = it.rot;
    g.scale.setScalar(it.scale);
    const add = (geo: THREE.BufferGeometry, mat: THREE.Material, y: number, x = 0, z = 0, shadow = true) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.castShadow = shadow;
      m.receiveShadow = true;
      g.add(m);
      this.disposables.push(geo, mat);
      return m;
    };
    const r = this.rnd;
    switch (it.kind) {
      case 'tree': {
        // 줄기 + 둥근 잎 3덩이 (잎 색은 조금씩 다르게)
        const trunkH = 2.2 + r() * 1.4;
        add(new THREE.CylinderGeometry(0.22, 0.32, trunkH, 7), pbr({ color: '#6b4a2a', roughness: 0.9 }), trunkH / 2);
        const leaf = pbr({ color: new THREE.Color().setHSL(0.27 + r() * 0.07, 0.55, 0.32 + r() * 0.1), roughness: 0.85, flatShading: true });
        add(new THREE.IcosahedronGeometry(1.5 + r() * 0.5, 1), leaf, trunkH + 0.8);
        add(new THREE.IcosahedronGeometry(1.1 + r() * 0.4, 1), leaf, trunkH + 1.7, 0.6, 0.3);
        add(new THREE.IcosahedronGeometry(1.0 + r() * 0.4, 1), leaf, trunkH + 1.4, -0.7, -0.2);
        break;
      }
      case 'rock':
        add(new THREE.DodecahedronGeometry(0.5 + r() * 0.5, 0), pbr({ color: '#8a8f99', roughness: 0.9, flatShading: true }), 0.3);
        break;
      case 'bush':
        add(new THREE.IcosahedronGeometry(0.55, 1), pbr({ color: '#3f8a3a', roughness: 0.9, flatShading: true }), 0.4);
        add(new THREE.IcosahedronGeometry(0.4, 1), pbr({ color: '#4c9a44', roughness: 0.9, flatShading: true }), 0.5, 0.4, 0.2);
        break;
      case 'flower': {
        const col = ['#ff6b90', '#ffd23f', '#ffffff', '#b48cff'][Math.floor(r() * 4)];
        add(new THREE.CylinderGeometry(0.02, 0.02, 0.4, 4), pbr({ color: '#3f8a3a' }), 0.2, 0, 0, false);
        add(new THREE.SphereGeometry(0.1, 6, 5), pbr({ color: col, roughness: 0.7, emissive: col, emissiveIntensity: 0.25 }), 0.42, 0, 0, false);
        break;
      }
      case 'stump':
        add(new THREE.CylinderGeometry(0.45, 0.55, 0.5, 9), pbr({ color: '#7a5533', roughness: 0.95 }), 0.25);
        break;
      case 'crystalSmall':
      case 'crystalBig': {
        const big = it.kind === 'crystalBig';
        const col = r() < 0.5 ? '#8fe8ff' : '#c7a2ff';
        const n = big ? 4 : 2;
        for (let i = 0; i < n; i++) {
          const h = (big ? 1.8 : 0.7) * (0.7 + r() * 0.6);
          const m = add(new THREE.ConeGeometry((big ? 0.4 : 0.16) * (0.7 + r() * 0.6), h, 5), pbr({ color: col, roughness: 0.15, emissive: col, emissiveIntensity: big ? 0.6 : 0.45, flatShading: true }), h / 2, (r() - 0.5) * 0.8, (r() - 0.5) * 0.8);
          m.rotation.set((r() - 0.5) * 0.6, 0, (r() - 0.5) * 0.6);
        }
        break;
      }
      case 'stalagmite':
        add(new THREE.ConeGeometry(0.35 + r() * 0.3, 1.2 + r() * 1.6, 6), pbr({ color: '#4a4f7a', roughness: 0.9, flatShading: true }), 0.8);
        break;
      case 'mushroom': {
        add(new THREE.CylinderGeometry(0.06, 0.08, 0.3, 6), pbr({ color: '#d9d4e8' }), 0.15, 0, 0, false);
        add(new THREE.SphereGeometry(0.18, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2), glow('#7fe3ff', 0.9), 0.3, 0, 0, false);
        break;
      }
      case 'barrel':
        add(new THREE.CylinderGeometry(0.4, 0.4, 0.9, 12), pbr({ color: r() < 0.5 ? '#b0392f' : '#6d7280', roughness: 0.5, metalness: 0.7 }), 0.45);
        break;
      case 'crate':
        add(new THREE.BoxGeometry(0.9, 0.9, 0.9), pbr({ color: '#8d9099', roughness: 0.5, metalness: 0.6 }), 0.45);
        break;
      case 'pipe':
        add(new THREE.CylinderGeometry(0.18, 0.18, 2.4, 10), pbr({ color: '#5c6069', roughness: 0.4, metalness: 0.85 }), 0.2).rotation.z = Math.PI / 2;
        break;
      case 'lamp': {
        // 경고등: 기둥 + 깜빡이는 붉은 등
        add(new THREE.CylinderGeometry(0.06, 0.08, 1.4, 6), pbr({ color: '#3a3c44', metalness: 0.8, roughness: 0.4 }), 0.7, 0, 0, false);
        const lm = glow('#ff3b3b', 2.0);
        add(new THREE.SphereGeometry(0.14, 8, 6), lm, 1.45, 0, 0, false);
        this.lamps.push(lm);
        break;
      }
      case 'tower':
        add(new THREE.BoxGeometry(2.2, 5 + r() * 3, 2.2), pbr({ color: '#5c6069', roughness: 0.5, metalness: 0.6 }), 3);
        add(new THREE.SphereGeometry(0.2, 8, 6), glow('#ff3b3b', 1.8), 7, 0, 0, false);
        break;
      // ---- 여정 구역 테마 소품 ----
      case 'torch': {
        // 횃불: 나무 기둥 + 쇠 받침 + 일렁이는 불꽃
        add(new THREE.CylinderGeometry(0.07, 0.09, 1.9, 6), pbr({ color: '#5a3a1e', roughness: 0.9 }), 0.95, 0, 0, false);
        add(new THREE.CylinderGeometry(0.16, 0.12, 0.22, 8), pbr({ color: '#3a3c44', metalness: 0.7, roughness: 0.5 }), 1.95, 0, 0, false);
        this.addFlame(g, 2.2, 0.22);
        break;
      }
      case 'campfire': {
        // 모닥불: 돌 둘레 + 장작 세 개 + 불꽃
        const stone = pbr({ color: '#6f6a66', roughness: 0.95 });
        for (let i = 0; i < 7; i++) {
          const a = (i / 7) * Math.PI * 2;
          add(new THREE.DodecahedronGeometry(0.2 + r() * 0.08, 0), stone, 0.14, Math.cos(a) * 0.8, Math.sin(a) * 0.8);
        }
        const wood = pbr({ color: '#4a3119', roughness: 0.95 });
        for (let i = 0; i < 3; i++) {
          const m = add(new THREE.CylinderGeometry(0.09, 0.1, 1.0, 6), wood, 0.16);
          m.rotation.set(Math.PI / 2 - 0.5, 0, (i / 3) * Math.PI * 2);
        }
        add(new THREE.CylinderGeometry(0.3, 0.35, 0.08, 8), pbr({ color: '#2a2320', roughness: 1 }), 0.04, 0, 0, false);
        this.addFlame(g, 0.55, 0.42);
        break;
      }
      case 'logSeat': {
        // 통나무 의자 (모닥불 쪽을 향함)
        const m = add(new THREE.CylinderGeometry(0.26, 0.26, 1.4, 8), pbr({ color: '#6b4a2b', roughness: 0.95 }), 0.26);
        m.rotation.z = Math.PI / 2;
        add(new THREE.CylinderGeometry(0.2, 0.2, 1.42, 8), pbr({ color: '#b08a5a', roughness: 0.9 }), 0.26, 0, 0, false).rotation.z = Math.PI / 2;
        break;
      }
      case 'log': {
        // 쓰러진 통나무: 가지 하나 + 이끼
        const m = add(new THREE.CylinderGeometry(0.3, 0.36, 2.6, 8), pbr({ color: '#5a3d22', roughness: 0.95 }), 0.32);
        m.rotation.z = Math.PI / 2;
        add(new THREE.CylinderGeometry(0.1, 0.14, 0.9, 6), pbr({ color: '#4a3119', roughness: 0.95 }), 0.6, 0.6, 0.2).rotation.x = -0.6;
        add(new THREE.BoxGeometry(1.2, 0.08, 0.5), pbr({ color: '#4f8a3a', roughness: 0.95 }), 0.64, -0.3, 0, false);
        break;
      }
      case 'fence': {
        // 부서진 나무 울타리 한 토막: 기둥 2 + 가로대 1~2
        const wood = pbr({ color: '#7a5a34', roughness: 0.95 });
        for (const x of [-0.9, 0.9]) add(new THREE.BoxGeometry(0.16, 1.1 + r() * 0.2, 0.16), wood, 0.55, x, 0);
        add(new THREE.BoxGeometry(2.0, 0.12, 0.1), wood, 0.9);
        if (r() < 0.6) add(new THREE.BoxGeometry(1.4, 0.12, 0.1), wood, 0.45, 0.2, 0).rotation.z = 0.08;
        break;
      }
      case 'signpost': {
        // 표지판: 기둥 + 화살표 판 2개 (북쪽 가리킴)
        add(new THREE.BoxGeometry(0.16, 2.0, 0.16), pbr({ color: '#5a3a1e', roughness: 0.9 }), 1.0);
        const board = pbr({ color: '#c49a5c', roughness: 0.85 });
        const b1 = add(new THREE.BoxGeometry(1.2, 0.3, 0.08), board, 1.7, 0.3, 0);
        b1.rotation.y = -0.3;
        const b2 = add(new THREE.BoxGeometry(1.0, 0.3, 0.08), board, 1.3, -0.25, 0.05);
        b2.rotation.y = 0.5;
        break;
      }
      case 'ruinPillar': {
        // 부러진 돌기둥: 받침 + 기둥(위가 깨짐) + 이끼
        const stone = pbr({ color: '#8a8f86', roughness: 0.9 });
        add(new THREE.BoxGeometry(1.1, 0.3, 1.1), stone, 0.15);
        const h = 1.4 + r() * 1.6;
        const col = add(new THREE.CylinderGeometry(0.34, 0.4, h, 8), stone, 0.3 + h / 2);
        col.rotation.set((r() - 0.5) * 0.12, 0, (r() - 0.5) * 0.12);
        add(new THREE.BoxGeometry(0.5, 0.1, 0.6), pbr({ color: '#4f8a3a', roughness: 0.95 }), 0.32, 0.3, 0.2, false);
        break;
      }
      case 'ruinWall': {
        // 무너진 돌담 조각: 벽돌 몇 개가 계단처럼 남음
        const stone = pbr({ color: '#7f857c', roughness: 0.95 });
        const dark = pbr({ color: '#5e655c', roughness: 0.95 });
        for (let i = 0; i < 4; i++) add(new THREE.BoxGeometry(0.7, 0.4, 0.5), i % 2 ? dark : stone, 0.2 + (i < 2 ? 0 : 0.4), -1.0 + i * 0.7 - (i < 2 ? 0 : 0.7), 0);
        add(new THREE.BoxGeometry(0.7, 0.4, 0.5), stone, 1.0, -0.65, 0);
        break;
      }
      case 'bossPillar': {
        // 보스 터 돌기둥: 크고 검은 돌 + 위에 발광 룬
        const stone = pbr({ color: '#4a4f58', roughness: 0.8 });
        add(new THREE.BoxGeometry(1.6, 0.4, 1.6), stone, 0.2);
        add(new THREE.BoxGeometry(1.0, 3.6, 1.0), stone, 2.2);
        add(new THREE.BoxGeometry(1.3, 0.3, 1.3), stone, 4.15);
        const rune = glow('#5cf2d8', 1.6);
        add(new THREE.BoxGeometry(0.16, 1.2, 0.04), rune, 2.6, 0, 0.52, false);
        add(new THREE.BoxGeometry(0.5, 0.16, 0.04), rune, 2.6, 0, 0.52, false);
        this.lamps.push(rune);
        break;
      }
      case 'bones': {
        // 뼈 무더기: 갈비뼈·두개골 느낌의 밝은 조각들
        const bone = pbr({ color: '#e9e2cf', roughness: 0.7 });
        for (let i = 0; i < 4; i++) {
          const m = add(new THREE.CylinderGeometry(0.05, 0.06, 0.7 + r() * 0.4, 5), bone, 0.06, (r() - 0.5) * 0.9, (r() - 0.5) * 0.9, false);
          m.rotation.set(Math.PI / 2, 0, r() * Math.PI);
        }
        add(new THREE.SphereGeometry(0.22, 8, 6), bone, 0.2, 0.3, 0.1, false);
        break;
      }
      case 'mushroomGlow': {
        // 발광 버섯 무리 (보물 터·은신처)
        const stem = pbr({ color: '#e6dcc3', roughness: 0.8 });
        for (let i = 0; i < 3; i++) {
          const k = 0.5 + r() * 0.6;
          const x = (r() - 0.5) * 0.9;
          const z = (r() - 0.5) * 0.9;
          add(new THREE.CylinderGeometry(0.06 * k, 0.08 * k, 0.4 * k, 6), stem, 0.2 * k, x, z, false);
          const cap = glow('#7fe9d0', 1.2);
          add(new THREE.SphereGeometry(0.2 * k, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2), cap, 0.4 * k, x, z, false);
          this.lamps.push(cap);
        }
        break;
      }
      case 'crystalPillar': {
        // 수정 기둥: 바위 받침 + 큰 수정 + 작은 수정 2개 (끝이 발광)
        add(new THREE.DodecahedronGeometry(0.5, 0), pbr({ color: '#4b4660', roughness: 0.95 }), 0.3);
        const big = add(new THREE.ConeGeometry(0.34, 2.2 + r() * 1.2, 5), pbr({ color: r() < 0.5 ? '#8fe8ff' : '#c7a2ff', roughness: 0.25, metalness: 0.1 }), 1.5);
        big.rotation.set((r() - 0.5) * 0.25, 0, (r() - 0.5) * 0.25);
        for (let i = 0; i < 2; i++) {
          const a = r() * Math.PI * 2;
          const sm = add(new THREE.ConeGeometry(0.16, 0.8 + r() * 0.5, 5), glow(r() < 0.5 ? '#8fe8ff' : '#c7a2ff', 1.0), 0.6, Math.cos(a) * 0.45, Math.sin(a) * 0.45);
          sm.rotation.set(Math.sin(a) * 0.5, 0, -Math.cos(a) * 0.5);
        }
        break;
      }
      case 'machine': {
        // 공장 기계: 강철 상자 + 발광 조작판 + 배관 + 위의 작은 경고등
        add(new THREE.BoxGeometry(1.6, 1.3, 1.0), pbr({ color: '#5c6069', roughness: 0.5, metalness: 0.7 }), 0.65);
        add(new THREE.BoxGeometry(0.9, 0.5, 0.06), glow('#7fe9d0', 1.3), 0.85, 0, 0.53, false);
        add(new THREE.BoxGeometry(0.3, 0.12, 0.05), glow('#ff9a3d', 1.6), 1.1, -0.5, 0.53, false);
        add(new THREE.CylinderGeometry(0.1, 0.1, 1.2, 8), pbr({ color: '#8d9099', roughness: 0.4, metalness: 0.85 }), 1.5, 0.5, -0.2);
        const lm = glow('#ff3b3b', 1.6);
        add(new THREE.SphereGeometry(0.1, 8, 6), lm, 1.42, -0.5, -0.2, false);
        this.lamps.push(lm);
        break;
      }
      case 'tent': {
        // 작은 천막: 삼각 지붕 + 기둥
        add(new THREE.ConeGeometry(1.3, 1.5, 4), pbr({ color: '#8a4a3a', roughness: 0.95 }), 0.95).rotation.y = Math.PI / 4;
        add(new THREE.BoxGeometry(0.1, 1.5, 0.1), pbr({ color: '#5a3a1e', roughness: 0.9 }), 0.75, 0, 0, false);
        break;
      }
      default:
        add(new THREE.SphereGeometry(0.3, 6, 5), pbr({ color: '#999999' }), 0.3);
    }
    return g;
  }

  /** 불꽃: 발광 구 두 개(주황·노랑). update 에서 크기·밝기가 일렁인다 */
  private addFlame(parent: THREE.Group, y: number, size: number): void {
    const mat = glow('#ff9a3d', 2.2);
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(size, 8, 6), mat);
    mesh.position.y = y;
    mesh.scale.set(0.8, 1.3, 0.8);
    parent.add(mesh);
    const core = new THREE.Mesh(new THREE.SphereGeometry(size * 0.5, 6, 5), glow('#ffe08a', 2.6));
    core.position.y = y + size * 0.2;
    mesh.add(core);
    this.disposables.push(mesh.geometry, mat, core.geometry, core.material as THREE.Material);
    this.flames.push({ mat, mesh, phase: this.rnd() * Math.PI * 2 });
  }

  /** 풀: 가늘고 긴 판 수천 개를 인스턴싱. 셰이더에서 끝부분이 바람에 흔들린다 */
  private buildGrass(quality: QualityLevel): void {
    if (this.def.id !== 'forest') return;
    const count = QUALITY_PRESETS[quality].grassCount;
    if (count <= 0) return;
    const geo = new THREE.PlaneGeometry(0.14, 0.7, 1, 3);
    geo.translate(0, 0.35, 0);
    // 위로 갈수록 좁아지게
    const pos = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      pos.setX(i, pos.getX(i) * (1 - y / 0.7) * 1.2);
    }
    const mat = pbr({ color: '#5fae3f', roughness: 0.95, metalness: 0 });
    mat.side = THREE.DoubleSide;
    const time = this.grassTime;
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = time;
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', '#include <common>\nuniform float uTime;')
        .replace(
          '#include <begin_vertex>',
          `#include <begin_vertex>
          // 바람: 인스턴스 위치를 위상으로 써서 포기마다 다르게, 끝부분(uv.y 큰 쪽)이 더 흔들린다
          vec4 wp = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
          float sway = sin(uTime * 1.8 + wp.x * 0.7 + wp.z * 0.5) * 0.18 * uv.y * uv.y;
          transformed.x += sway;
          transformed.z += sway * 0.5;`,
        );
    };
    const mesh = new THREE.InstancedMesh(geo, mat, count);
    const halfX = this.def.journey?.halfX ?? this.def.arenaHalfSize;
    const halfZ = this.def.journey?.halfZ ?? this.def.arenaHalfSize;
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const s = new THREE.Vector3();
    const p = new THREE.Vector3();
    const color = new THREE.Color();
    for (let i = 0; i < count; i++) {
      p.set((this.rnd() * 2 - 1) * (halfX - 0.5), 0, (this.rnd() * 2 - 1) * (halfZ - 0.5));
      q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), this.rnd() * Math.PI);
      const k = 0.6 + this.rnd() * 0.9;
      s.set(k, k, k);
      m.compose(p, q, s);
      mesh.setMatrixAt(i, m);
      color.setHSL(0.27 + this.rnd() * 0.05, 0.6, 0.3 + this.rnd() * 0.15);
      mesh.setColorAt(i, color);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.castShadow = false;
    mesh.receiveShadow = true;
    mesh.frustumCulled = false;
    this.grass = mesh;
    this.grassMat = mat;
    this.root.add(mesh);
    this.disposables.push(geo, mat);
  }

  /** 입자: 숲 반딧불, 동굴 먼지, 요새 불똥 */
  private buildParticles(quality: QualityLevel): void {
    const count = QUALITY_PRESETS[quality].particleCount;
    if (count <= 0) return;
    const half = Math.max(this.def.journey?.halfX ?? this.def.arenaHalfSize, this.def.journey?.halfZ ?? this.def.arenaHalfSize) + 6;
    const positions = new Float32Array(count * 3);
    this.particleVel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (this.rnd() * 2 - 1) * half;
      positions[i * 3 + 1] = 0.5 + this.rnd() * 4;
      positions[i * 3 + 2] = (this.rnd() * 2 - 1) * half;
      this.particleVel[i * 3] = (this.rnd() - 0.5) * 0.6;
      this.particleVel[i * 3 + 1] = (this.rnd() - 0.5) * 0.3;
      this.particleVel[i * 3 + 2] = (this.rnd() - 0.5) * 0.6;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const style = this.def.id === 'forest' ? { color: 0xfff28a, size: 0.18 } : this.def.id === 'cave' ? { color: 0x9fd8ff, size: 0.12 } : { color: 0xffa040, size: 0.1 };
    const mat = new THREE.PointsMaterial({ color: style.color, size: style.size, transparent: true, opacity: 0.85, sizeAttenuation: true, depthWrite: false, blending: THREE.AdditiveBlending });
    this.particles = new THREE.Points(geo, mat);
    this.particles.frustumCulled = false;
    this.root.add(this.particles);
    this.disposables.push(geo, mat);
  }

  /** 화질 변경: 풀·입자를 다시 만든다 */
  applyQuality(quality: QualityLevel): void {
    if (this.grass) {
      this.root.remove(this.grass);
      this.grass.geometry.dispose();
      this.grassMat?.dispose();
      this.grass = null;
    }
    if (this.particles) {
      this.root.remove(this.particles);
      this.particles.geometry.dispose();
      (this.particles.material as THREE.Material).dispose();
      this.particles = null;
    }
    this.buildGrass(quality);
    this.buildParticles(quality);
  }

  update(dt: number): void {
    this.t += dt;
    this.grassTime.value = this.t;
    // 경고등 깜빡임
    for (let i = 0; i < this.lamps.length; i++) this.lamps[i].emissiveIntensity = 1.2 + Math.max(0, Math.sin(this.t * 3 + i)) * 1.8;
    // 불꽃 일렁임: 밝기·높이가 빠르게 흔들린다
    for (const f of this.flames) {
      const k = 0.85 + Math.sin(this.t * 9 + f.phase) * 0.1 + Math.sin(this.t * 23 + f.phase * 2) * 0.07;
      f.mat.emissiveIntensity = 1.8 + k * 1.2;
      f.mesh.scale.set(0.8 * k, 1.3 * (2 - k), 0.8 * k);
    }
    // 입자 떠다니기 (영역을 벗어나면 반대편으로)
    if (this.particles && this.particleVel) {
      const pos = this.particles.geometry.attributes.position as THREE.BufferAttribute;
      const arr = pos.array as Float32Array;
      const half = Math.max(this.def.journey?.halfX ?? this.def.arenaHalfSize, this.def.journey?.halfZ ?? this.def.arenaHalfSize) + 6;
      const n = pos.count;
      for (let i = 0; i < n; i++) {
        const j = i * 3;
        arr[j] += this.particleVel[j] * dt + Math.sin(this.t + i) * 0.004;
        arr[j + 1] += this.particleVel[j + 1] * dt + Math.cos(this.t * 0.7 + i) * 0.003;
        arr[j + 2] += this.particleVel[j + 2] * dt;
        if (arr[j] > half) arr[j] = -half;
        if (arr[j] < -half) arr[j] = half;
        if (arr[j + 2] > half) arr[j + 2] = -half;
        if (arr[j + 2] < -half) arr[j + 2] = half;
        if (arr[j + 1] < 0.3) arr[j + 1] = 4.5;
        if (arr[j + 1] > 5) arr[j + 1] = 0.3;
      }
      pos.needsUpdate = true;
    }
  }

  dispose(): void {
    this.root.removeFromParent();
    for (const d of this.disposables) d.dispose();
    this.disposables.length = 0;
  }
}
