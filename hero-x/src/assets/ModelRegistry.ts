import * as THREE from 'three';
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
import type { EnemyModel, EnemyModelState } from '../enemies/EnemyModels';
import type { PlayerModel, PlayerModelState } from '../player/models/PlaceholderModel';
import { buildEnemyPartRig, buildPartRig } from './PartRig';
import { createSkinnedPlayerModel } from './SkinnedPlayerModel';
import { buildArmorModel, buildWeaponModel, disposeVisual, type EquipmentLooks } from '../player/EquipmentVisuals';
import { Logger } from '../utils/Logger';
import { mergeStaticMeshes } from './meshMerge';

/**
 * 정식 3D 모델(.glb) 교체 구조
 * - public/models/manifest.json 에 적힌 파일만 읽는다. 항목이 null 이면 코드로 그린 임시 모델을 그대로 쓴다.
 * - 키: player / enemies.<종류> / bosses.<외형> . 값: { file, scale, offsetY, rotationY }
 * - 로드는 비동기. 플레이어는 로드되는 즉시 교체(Game 이 콜백으로), 적·보스는 다음 생성부터 적용된다.
 * - 애니메이션 클립 이름에 idle / walk|run / attack / jump / die(dead) 가 들어 있으면 상태에 맞춰 재생한다. 없으면 정지 모델.
 * - 모델 정면은 +Z 이어야 한다. 반대면 rotationY 에 180 을 적는다. 위가 Z 축인 파일(복셀 도구 등)은 rotationX 에 -90.
 * - 애니메이션 클립이 없어도 부품 이름(left_leg, right_arm, head, sword …)이 있으면 PartRig 가 걷기·공격 동작을 만든다.
 */
export interface ModelEntry {
  file: string;
  /** 크기 배율 (1 = 파일 그대로) */
  scale?: number;
  /** 바닥 보정 (발이 땅에 닿도록 위아래 이동) */
  offsetY?: number;
  /** 정면 보정 (도) */
  rotationY?: number;
  /** 위 방향 보정 (도). Z 가 위인 파일은 -90 */
  rotationX?: number;
  /** 손 슬롯 뼈 아래 기본으로 보일 무기·방패 메시 이름 (KayKit 처럼 변형이 전부 들어 있는 모델용). 비우면 첫 번째 것만 */
  defaultParts?: string[];
}

export interface ModelManifest {
  player: ModelEntry | null;
  enemies: Record<string, ModelEntry | null>;
  bosses: Record<string, ModelEntry | null>;
}

const EMPTY: ModelManifest = { player: null, enemies: {}, bosses: {} };

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function entry(v: unknown): ModelEntry | null {
  if (!isRecord(v) || typeof v.file !== 'string' || !v.file) return null;
  return {
    file: v.file,
    scale: typeof v.scale === 'number' && v.scale > 0 ? v.scale : 1,
    offsetY: typeof v.offsetY === 'number' ? v.offsetY : 0,
    rotationY: typeof v.rotationY === 'number' ? v.rotationY : 0,
    rotationX: typeof v.rotationX === 'number' ? v.rotationX : 0,
    defaultParts: Array.isArray(v.defaultParts) ? v.defaultParts.filter((x): x is string => typeof x === 'string') : [],
  };
}

/** manifest.json 내용을 검증·보정 (순수 함수, 테스트 대상) */
export function normalizeManifest(raw: unknown): ModelManifest {
  if (!isRecord(raw)) return { ...EMPTY, enemies: {}, bosses: {} };
  const out: ModelManifest = { player: entry(raw.player), enemies: {}, bosses: {} };
  for (const [group, target] of [
    ['enemies', out.enemies],
    ['bosses', out.bosses],
  ] as const) {
    const g = raw[group];
    if (!isRecord(g)) continue;
    for (const [k, v] of Object.entries(g)) {
      const e = entry(v);
      if (e) target[k] = e;
    }
  }
  return out;
}

interface Loaded {
  gltf: GLTF;
  entry: ModelEntry;
}

/** 로드된 모델 보관소 (싱글턴). 모델 생성 함수들이 여기서 교체 모델을 찾는다 */
class ModelRegistry {
  private readonly models = new Map<string, Loaded>();
  private manifest: ModelManifest = EMPTY;
  private loader: GLTFLoader | null = null;
  /** 플레이어 모델이 준비되면 알림 (Game 이 교체) */
  onPlayerReady: (() => void) | null = null;
  /** 로딩 진행 (로딩 표시용): 전체·끝난 수·실패한 파일 */
  readonly progress = { total: 0, done: 0, failed: [] as string[] };
  /** 진행이 바뀔 때 알림 */
  onProgress: (() => void) | null = null;
  /** 같은 파일을 여러 키가 쓰면 한 번만 받는다 */
  private readonly fileCache = new Map<string, Promise<GLTF>>();

  get loadedKeys(): string[] {
    return [...this.models.keys()];
  }

  has(key: string): boolean {
    return this.models.has(key);
  }

  /** manifest 를 읽고 적힌 모델을 모두 비동기로 로드한다. 실패해도 게임은 계속 */
  async load(baseUrl: string): Promise<void> {
    const root = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
    try {
      const res = await fetch(`${root}models/manifest.json`, { cache: 'no-cache' });
      if (!res.ok) {
        Logger.warn(`models/manifest.json 을 읽지 못했습니다 (${res.status}). 임시 모델을 씁니다.`);
        return;
      }
      this.manifest = normalizeManifest(await res.json());
    } catch (err) {
      Logger.warn('models/manifest.json 을 읽지 못했습니다. 임시 모델을 씁니다.', err);
      return;
    }
    const jobs: Array<Promise<void>> = [];
    const count = (this.manifest.player ? 1 : 0) + Object.values(this.manifest.enemies).filter(Boolean).length + Object.values(this.manifest.bosses).filter(Boolean).length;
    this.progress.total = count;
    this.progress.done = 0;
    this.progress.failed.length = 0;
    this.onProgress?.();
    if (this.manifest.player) jobs.push(this.loadOne('player', this.manifest.player, root));
    for (const [k, e] of Object.entries(this.manifest.enemies)) if (e) jobs.push(this.loadOne(`enemy:${k}`, e, root));
    for (const [k, e] of Object.entries(this.manifest.bosses)) if (e) jobs.push(this.loadOne(`boss:${k}`, e, root));
    await Promise.all(jobs);
  }

  private async loadOne(key: string, e: ModelEntry, root: string): Promise<void> {
    this.loader ??= new GLTFLoader();
    try {
      const url = `${root}models/${e.file}`;
      let job = this.fileCache.get(url);
      if (!job) {
        job = this.loader.loadAsync(url);
        this.fileCache.set(url, job);
      }
      const gltf = await job;
      this.models.set(key, { gltf, entry: e });
      Logger.info(`모델 로드: ${key} ← ${e.file} (애니메이션 ${gltf.animations.length}개)`);
      if (key === 'player') this.onPlayerReady?.();
    } catch (err) {
      this.progress.failed.push(e.file);
      Logger.warn(`모델 '${e.file}' 을(를) 읽지 못해 '${key}' 는 임시 모델을 씁니다.`, err);
    } finally {
      this.progress.done++;
      this.onProgress?.();
    }
  }

  /** 플레이어용 교체 모델 (없으면 null) */
  createPlayerModel(): PlayerModel | null {
    const m = this.models.get('player');
    return m ? createGltfPlayerModel(m) : null;
  }

  /** 적·보스용 교체 모델 (없으면 null). targetHeight: 임시 모델과 비슷한 크기로 맞출 기준 높이 */
  createEnemyModel(key: string, targetHeight: number): EnemyModel | null {
    const m = this.models.get(key);
    return m ? createGltfEnemyModel(m, targetHeight) : null;
  }
}

export const modelRegistry = new ModelRegistry();

/** 재질을 이 인스턴스 전용으로 복제한다 (피격 번쩍임·발광이 다른 개체와 섞이지 않게). emissive 가 있는 것만 돌려준다 */
function cloneMaterials(root: THREE.Object3D): THREE.MeshStandardMaterial[] {
  const out: THREE.MeshStandardMaterial[] = [];
  const cache = new Map<THREE.Material, THREE.Material>();
  root.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh) return;
    const swap = (mt: THREE.Material) => {
      let own = cache.get(mt);
      if (!own) {
        own = mt.clone();
        cache.set(mt, own);
        if ((own as THREE.MeshStandardMaterial).emissive) out.push(own as THREE.MeshStandardMaterial);
      }
      return own;
    };
    mesh.material = Array.isArray(mesh.material) ? mesh.material.map(swap) : swap(mesh.material);
  });
  return out;
}

/** 트리 안의 emissive 가 있는 재질을 중복 없이 모은다 (합치기 뒤 번쩍임·붉은 기 적용 대상) */
function collectEmissiveMaterials(root: THREE.Object3D): THREE.MeshStandardMaterial[] {
  const out: THREE.MeshStandardMaterial[] = [];
  const seen = new Set<THREE.Material>();
  root.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh) return;
    for (const mt of Array.isArray(mesh.material) ? mesh.material : [mesh.material]) {
      if (!seen.has(mt) && (mt as THREE.MeshStandardMaterial).emissive) {
        seen.add(mt);
        out.push(mt as THREE.MeshStandardMaterial);
      }
    }
  });
  return out;
}

/** 씬 복제(뼈대 있는 모델도 안전) + 크기·위치 보정 */
function instantiate(m: Loaded, targetHeight: number | null): { root: THREE.Group; mixer: THREE.AnimationMixer | null; clips: THREE.AnimationClip[] } {
  const scene = SkeletonUtils.clone(m.gltf.scene) as THREE.Group;
  const root = new THREE.Group();
  root.add(scene);
  scene.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (mesh.isMesh) {
      mesh.castShadow = true;
      mesh.receiveShadow = false;
    }
  });
  // 회전 보정 먼저 (위 방향·정면), 그 다음 크기를 잰다
  scene.rotation.set(((m.entry.rotationX ?? 0) * Math.PI) / 180, ((m.entry.rotationY ?? 0) * Math.PI) / 180, 0);
  scene.updateMatrixWorld(true);
  // 크기: targetHeight 가 있으면 모델 높이를 거기에 맞추고, 그 위에 manifest 의 scale 을 곱한다
  let k = m.entry.scale ?? 1;
  if (targetHeight) {
    const box = new THREE.Box3().setFromObject(scene);
    const h = box.max.y - box.min.y;
    if (h > 1e-6) k *= targetHeight / h;
  }
  scene.scale.setScalar(k);
  scene.updateMatrixWorld(true);
  // 발이 땅에 닿게, 좌우·앞뒤 중심을 0 으로
  const box2 = new THREE.Box3().setFromObject(scene);
  const c = box2.getCenter(new THREE.Vector3());
  scene.position.set(-c.x, -box2.min.y + (m.entry.offsetY ?? 0), -c.z);
  const clips = m.gltf.animations;
  const mixer = clips.length > 0 ? new THREE.AnimationMixer(scene) : null;
  return { root, mixer, clips };
}

/** 이름에 키워드가 들어간 클립 찾기 */
function findClip(clips: THREE.AnimationClip[], ...keywords: string[]): THREE.AnimationClip | null {
  for (const kw of keywords) {
    const c = clips.find((x) => x.name.toLowerCase().includes(kw));
    if (c) return c;
  }
  return null;
}

function disposeTree(root: THREE.Object3D): void {
  root.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (mesh.isMesh) {
      mesh.geometry.dispose();
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      mats.forEach((mt) => mt.dispose());
    }
  });
}

/**
 * glb 플레이어 모델
 * - 애니메이션 클립이 있으면(뼈대 모델) SkinnedPlayerModel 이 상태 기계·crossfade·장비 뼈 부착을 맡는다.
 * - 클립이 없으면 부품 이름 리그(PartRig, 복셀 캐릭터)로 동작을 만든다.
 */
function createGltfPlayerModel(m: Loaded): PlayerModel {
  const { root, mixer, clips } = instantiate(m, 1.9);
  root.name = 'GltfHero';
  if (mixer) {
    const skinnedMats = cloneMaterials(root);
    return createSkinnedPlayerModel(root, mixer, clips, skinnedMats, m.entry.defaultParts ?? []);
  }
  // 클립이 없으면 부품 이름으로 관절 리그를 시도한다 (복셀 캐릭터)
  const rig = buildPartRig(root);
  if (rig) Logger.info('플레이어 모델: 부품 이름 리그로 걷기·공격 동작을 만듭니다.');
  cloneMaterials(root);
  // 복셀 상자들을 관절·재질별로 합쳐 그리기 호출을 줄인다 (리그가 관절을 나눈 뒤). 합친 뒤 재질 목록을 다시 모은다(피격 붉은 기 적용용)
  const st = mergeStaticMeshes(root);
  const mats = collectEmissiveMaterials(root);
  Logger.info(`플레이어 모델 메시 합치기: ${st.before} → ${st.after}`);
  let t = 0;
  const gear: { melee: THREE.Group | null; ranged: THREE.Group | null; armor: THREE.Group | null } = { melee: null, ranged: null, armor: null };
  return {
    root,
    /** 장비 외형: 리그(부품 이름 관절)가 있는 모델만 지원. 무기는 손 끝(관절 기준 (0,-팔길이,0))에, 방어구는 몸통 박스에 맞춰 */
    setEquipment(looks: EquipmentLooks) {
      const a = rig?.attach;
      if (!a) return;
      disposeVisual(gear.melee);
      disposeVisual(gear.ranged);
      disposeVisual(gear.armor);
      gear.melee = gear.ranged = gear.armor = null;
      if (a.weaponHold) a.weaponHold.visible = looks.melee === null;
      if (looks.melee) {
        gear.melee = buildWeaponModel(looks.melee, a.armLength);
        gear.melee.position.set(0, -a.armLength * 0.95, 0);
        a.swordArm.add(gear.melee);
      }
      if (looks.ranged) {
        gear.ranged = buildWeaponModel(looks.ranged, a.armLength);
        gear.ranged.position.set(0, -a.armLength * 0.95, 0);
        a.otherArm.add(gear.ranged);
      }
      if (looks.armor) {
        gear.armor = buildArmorModel(looks.armor, a.torsoBox);
        a.body.add(gear.armor);
      }
    },
    update(dt: number, s: PlayerModelState) {
      t += dt;
      const hurt = s.hurt ?? 0;
      for (const mt of mats) mt.emissive.setRGB(hurt * 0.6, 0, 0);
      if (rig) {
        rig.update(dt, s);
      } else {
        // 애니메이션이 없는 모델: 걷기 흔들림·공격 기울임만
        root.rotation.z = s.moving ? Math.sin(t * 10) * 0.05 : 0;
        root.rotation.x = s.attack !== null ? -0.25 * Math.sin(s.attack * Math.PI) : 0;
        root.scale.setScalar(s.dead ? 0.6 : 1);
      }
    },
    dispose() {
      disposeTree(root);
    },
  };
}

/** glb 적·보스 모델: 걷기(walk/run)·예고(attack)·사망 클립이 있으면 재생, 없으면 임시 연출. 피격 번쩍임은 재질 emissive */
function createGltfEnemyModel(m: Loaded, targetHeight: number): EnemyModel {
  const { root, mixer, clips } = instantiate(m, targetHeight);
  root.name = 'GltfEnemy';
  // 클립이 없으면 부품 이름(wheel_/claw_/rotor_/wing_/barrel_/shield/…)으로 동작을 만든다
  const rig = mixer ? null : buildEnemyPartRig(root);
  const walk = findClip(clips, 'run', 'walk');
  const idle = findClip(clips, 'idle');
  const attack = findClip(clips, 'attack');
  let current: THREE.AnimationAction | null = null;
  const play = (clip: THREE.AnimationClip | null) => {
    if (!mixer || !clip) return;
    const a = mixer.clipAction(clip);
    if (current === a) return;
    a.reset().fadeIn(0.1).play();
    current?.fadeOut(0.1);
    current = a;
  };
  let mats = cloneMaterials(root);
  if (!mixer) {
    mergeStaticMeshes(root); // 상자 메시를 관절·재질별로 합친다 (적 1마리 ≈ 80회 → 10회 안팎)
    mats = collectEmissiveMaterials(root); // 합친 재질로 다시 모은다 (피격 번쩍임용)
  }
  const baseEmissive = mats.map((mt) => mt.emissive.clone());
  let flashTimer = 0;
  let t = 0;
  return {
    root,
    update(dt: number, s: EnemyModelState) {
      t += dt;
      if (s.state === 'dead') {
        const k = Math.max(0, 1 - s.death);
        root.scale.setScalar(k);
        root.position.y = -(1 - k) * 0.5;
        return;
      }
      if (rig) {
        rig.update(dt, s);
      } else if (mixer) {
        if (s.state === 'windup' && attack) play(attack);
        else if (s.moving) play(walk ?? idle);
        else play(idle ?? walk);
        mixer.update(dt);
      } else {
        root.position.y = s.moving ? Math.abs(Math.sin(t * 8)) * 0.06 : 0;
        root.rotation.x = s.state === 'windup' ? -0.2 * s.windup : 0;
      }
      if (flashTimer > 0) {
        flashTimer -= dt;
        if (flashTimer <= 0) mats.forEach((mt, i) => mt.emissive.copy(baseEmissive[i]));
      }
    },
    flash() {
      flashTimer = 0.09;
      for (const mt of mats) mt.emissive.setScalar(0.8);
    },
    dispose() {
      mixer?.stopAllAction();
      disposeTree(root);
    },
  };
}
