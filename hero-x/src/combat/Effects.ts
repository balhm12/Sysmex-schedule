import * as THREE from 'three';
import { glow } from '../render/materials';

/**
 * 전투 시각 효과: 근접 공격 휘두르기 부채꼴·검 궤적, 충격파·예고 원, 빛 기둥(레벨 업·보스 등장), 타격·처치 파편
 * - 피나 잔인한 표현 없이 빛과 파편으로만 표현한다.
 * - 파편은 미리 만들어 둔 풀(pool)을 재사용해 메모리를 아낀다.
 */
export class Effects {
  private readonly root = new THREE.Group();
  /** 바닥·공중에 잠깐 보이는 도형들: 휘두르기 부채꼴, 충격파(grow), 예고 원(warn) */
  private readonly swings: Array<{ mesh: THREE.Mesh; life: number; max: number; grow?: boolean; warn?: boolean }> = [];
  /** 검 궤적: 좁고 밝은 부채꼴이 공격 각도를 가로질러 휩쓸고 지나간다 */
  private readonly slashes: Array<{ mesh: THREE.Mesh; life: number; max: number; from: number; to: number }> = [];
  /** 섬광: 공중의 밝은 구가 순간 커지며 사라진다 (총구 섬광·탄 명중) */
  private readonly flashes: Array<{ mesh: THREE.Mesh; life: number; max: number; radius: number }> = [];
  private readonly flashGeo = new THREE.SphereGeometry(1, 12, 8);
  /** 빛 기둥: 위로 솟았다가 옅어진다 (레벨 업·보스 등장) */
  private readonly pillars: Array<{ mesh: THREE.Mesh; life: number; max: number; height: number }> = [];
  private readonly particles: Array<{ mesh: THREE.Mesh; v: THREE.Vector3; life: number; max: number }> = [];
  private readonly particleGeo = new THREE.BoxGeometry(0.16, 0.16, 0.16);
  /**
   * 번개: 적 둘레에서 지그재그로 튀는 가닥 여러 개. 매 프레임 꺾이는 점을 새로 뽑아 '지직' 거린다.
   * WebGL 선은 1픽셀이라 안 보이므로 마디마다 가는 상자 메시(발광)로 그린다 (가닥 하나 = 마디 BOLT_POINTS-1 개)
   */
  private readonly bolts: Array<{ group: THREE.Group; segs: THREE.Mesh[]; life: number; max: number; center: THREE.Vector3; radius: number; height: number; seed: number; pts: THREE.Vector3[] }> = [];
  private readonly boltGeo = new THREE.BoxGeometry(1, 1, 1);
  private static readonly BOLT_POINTS = 8;
  private static readonly BOLT_WIDTH = 0.07;

  constructor(scene: THREE.Scene, particleCount = 120) {
    this.root.name = 'Effects';
    scene.add(this.root);
    for (let i = 0; i < particleCount; i++) {
      const mesh = new THREE.Mesh(this.particleGeo, glow(0xffffff, 1.8));
      mesh.visible = false;
      this.root.add(mesh);
      this.particles.push({ mesh, v: new THREE.Vector3(), life: 0, max: 1 });
    }
  }

  /** 근접 공격 부채꼴 표시 (origin 에서 facing 방향으로, range 길이, arcDegrees 각도) */
  swing(origin: THREE.Vector3, facing: number, range: number, arcDegrees: number, duration: number, color = 0x5cf2d8): void {
    const arc = (arcDegrees * Math.PI) / 180;
    // RingGeometry 는 XY 평면·+X 기준이므로 바닥에 눕히고 각도를 맞춘다
    const geo = new THREE.RingGeometry(0.45, range, 24, 1, Math.PI / 2 - arc / 2, arc);
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.75, side: THREE.DoubleSide, depthWrite: false });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(origin.x, 0.5, origin.z);
    // 바닥으로 눕힌 뒤(+90°: 부채꼴 중심 +Y 가 앞쪽 +Z 를 향함), 바라보는 방향으로 회전
    // (-90° 로 하면 부채꼴이 등 뒤로 그려진다 — v0.2.0-a.1 의 '반대 방향' 버그)
    mesh.rotation.order = 'YXZ';
    mesh.rotation.y = facing;
    mesh.rotation.x = Math.PI / 2;
    this.root.add(mesh);
    this.swings.push({ mesh, life: duration, max: duration });
  }

  /**
   * 검 궤적: facing 을 중심으로 한 공격 부채꼴(arcDegrees)을 좁은 빛 조각(부채꼴의 35%)이
   * duration 동안 한쪽 끝에서 반대쪽 끝까지 휩쓴다. 공중 1.0 높이에 살짝 기울여 그린다(가산 혼합).
   * sweep: 1 이면 오른쪽→왼쪽(기본), -1 이면 왼쪽→오른쪽(되돌려 베기), 0 이면 facing 에서 시작해 한 바퀴(회전 베기)
   */
  slash(origin: THREE.Vector3, facing: number, range: number, arcDegrees: number, duration: number, color = 0xbffcf2, sweep: 1 | -1 | 0 = 1): void {
    const arc = (arcDegrees * Math.PI) / 180;
    const piece = Math.max(0.25, Math.min(arc, Math.PI * 0.7) * 0.35);
    const geo = new THREE.RingGeometry(Math.max(0.3, range * 0.45), range * 1.05, 16, 1, Math.PI / 2 - piece / 2, piece);
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(origin.x, 1.0, origin.z);
    mesh.rotation.order = 'YXZ';
    // 바닥에 눕힌 뒤(+90°) 앞쪽이 살짝 들리게 기울인다 → 비스듬한 베기 느낌. 되돌려 베기는 반대로 기울인다
    mesh.rotation.x = Math.PI / 2 - (sweep === -1 ? -0.35 : 0.55);
    let from = facing - arc / 2 + piece / 2;
    let to = facing + arc / 2 - piece / 2;
    if (sweep === -1) [from, to] = [to, from];
    if (sweep === 0) {
      from = facing;
      to = facing + Math.PI * 2;
    }
    mesh.rotation.y = from;
    this.root.add(mesh);
    this.slashes.push({ mesh, life: duration, max: duration, from, to });
  }

  /** 빛 기둥: center 에서 반지름 radius·높이 height 의 반투명 원기둥이 솟아오르며 옅어진다 */
  pillar(center: THREE.Vector3, radius: number, height: number, duration: number, color: THREE.ColorRepresentation): void {
    const geo = new THREE.CylinderGeometry(radius, radius * 1.25, height, 24, 1, true);
    geo.translate(0, height / 2, 0);
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.35, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(center.x, 0, center.z);
    mesh.scale.set(1, 0.05, 1);
    this.root.add(mesh);
    this.pillars.push({ mesh, life: duration, max: duration, height });
  }

  /** 충격파 링: center 에서 radius 까지 퍼지며 사라진다 */
  shockwave(center: THREE.Vector3, radius: number, duration = 0.45, color: THREE.ColorRepresentation = 0xff4f79): void {
    const geo = new THREE.RingGeometry(radius * 0.8, radius, 48);
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.8, side: THREE.DoubleSide, depthWrite: false });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(center.x, 0.08, center.z);
    mesh.rotation.x = -Math.PI / 2;
    mesh.scale.setScalar(0.2);
    this.root.add(mesh);
    this.swings.push({ mesh, life: duration, max: duration, grow: true });
  }

  /** 예고 표시: 바닥에 원을 그려 duration 동안 점점 진해지다가 사라진다 (포격 낙하 지점 등) */
  marker(center: THREE.Vector3, radius: number, duration: number, color = 0xff7a45): void {
    const geo = new THREE.RingGeometry(radius * 0.7, radius, 40);
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.2, side: THREE.DoubleSide, depthWrite: false });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(center.x, 0.07, center.z);
    mesh.rotation.x = -Math.PI / 2;
    this.root.add(mesh);
    this.swings.push({ mesh, life: duration, max: duration, grow: false, warn: true });
  }

  /** 섬광: pos 에서 반지름 radius 의 밝은 구가 순간 커지면서 사라진다 (총구 섬광·탄 명중·마무리 타격) */
  flash(pos: THREE.Vector3, radius: number, duration: number, color: THREE.ColorRepresentation): void {
    if (radius <= 0) return;
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending });
    const mesh = new THREE.Mesh(this.flashGeo, mat);
    mesh.position.copy(pos);
    mesh.scale.setScalar(radius * 0.3);
    this.root.add(mesh);
    this.flashes.push({ mesh, life: duration, max: duration, radius });
  }

  /**
   * 감전 번개: center(적 발밑) 둘레 radius 안에서 height 높이까지 지그재그 선 count 가닥이 duration 초 동안 튄다.
   * 가운데에 짧은 섬광도 함께 낸다.
   */
  lightning(center: THREE.Vector3, radius: number, height: number, count: number, duration: number, color: THREE.ColorRepresentation): void {
    if (count <= 0 || duration <= 0) return;
    for (let i = 0; i < count; i++) {
      const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.95, depthWrite: false, blending: THREE.AdditiveBlending });
      const group = new THREE.Group();
      const segs: THREE.Mesh[] = [];
      const pts: THREE.Vector3[] = [];
      for (let k = 0; k < Effects.BOLT_POINTS; k++) pts.push(new THREE.Vector3());
      for (let k = 0; k < Effects.BOLT_POINTS - 1; k++) {
        const m = new THREE.Mesh(this.boltGeo, mat);
        m.frustumCulled = false;
        group.add(m);
        segs.push(m);
      }
      this.root.add(group);
      const b = { group, segs, life: duration, max: duration, center: center.clone(), radius, height, seed: Math.random() * 1000, pts };
      this.rebuildBolt(b, 0);
      this.bolts.push(b);
    }
    this.flash(new THREE.Vector3(center.x, center.y + height * 0.5, center.z), radius * 0.9, Math.min(0.2, duration), color);
  }

  /** 번개 한 가닥의 꺾이는 점을 새로 뽑고(위에서 아래로 내려오며 좌우로 튄다) 마디 상자를 점 사이에 맞춘다 */
  private rebuildBolt(b: { segs: THREE.Mesh[]; pts: THREE.Vector3[]; center: THREE.Vector3; radius: number; height: number; seed: number }, t: number): void {
    const n = Effects.BOLT_POINTS;
    const a0 = b.seed + t * 7;
    const r = b.radius;
    for (let i = 0; i < n; i++) {
      const k = i / (n - 1);
      const ang = a0 + (Math.random() - 0.5) * 2.5;
      const rr = r * (0.3 + Math.random() * 0.9);
      const y = b.center.y + b.height * (1 - k) + (Math.random() - 0.5) * 0.15;
      b.pts[i].set(b.center.x + Math.cos(ang) * rr, Math.max(0.05, y), b.center.z + Math.sin(ang) * rr);
    }
    const w = Effects.BOLT_WIDTH;
    for (let i = 0; i < n - 1; i++) {
      const a = b.pts[i];
      const c = b.pts[i + 1];
      const m = b.segs[i];
      m.position.copy(a).add(c).multiplyScalar(0.5);
      const len = a.distanceTo(c);
      m.scale.set(w, w, Math.max(0.01, len));
      m.lookAt(c);
    }
  }

  /** 지금 화면에 살아 있는 효과 수 (디버그·검증용) */
  get activeCount(): number {
    let particles = 0;
    for (const p of this.particles) if (p.life > 0) particles++;
    return this.swings.length + this.slashes.length + this.pillars.length + this.flashes.length + this.bolts.length + particles;
  }

  /** 살아 있는 번개 가닥 수 (검증용) */
  get boltCount(): number {
    return this.bolts.length;
  }

  /** 파편 터뜨리기 (타격: 적게, 처치: 많이) */
  burst(pos: THREE.Vector3, color: THREE.ColorRepresentation, count = 8, power = 5): void {
    let spawned = 0;
    for (const p of this.particles) {
      if (p.life > 0) continue;
      p.mesh.visible = true;
      p.mesh.position.copy(pos);
      const pm = p.mesh.material as THREE.MeshStandardMaterial;
      pm.emissive.set(color);
      pm.color.set(color).multiplyScalar(0.3);
      p.v.set(Math.random() - 0.5, Math.random() * 0.8 + 0.3, Math.random() - 0.5).normalize().multiplyScalar(power * (0.5 + Math.random() * 0.5));
      p.life = p.max = 0.4 + Math.random() * 0.4;
      p.mesh.scale.setScalar(0.6 + Math.random() * 0.8);
      if (++spawned >= count) break;
    }
  }

  update(dt: number): void {
    for (let i = this.swings.length - 1; i >= 0; i--) {
      const s = this.swings[i];
      s.life -= dt;
      const k = Math.max(0, s.life / s.max);
      if (s.warn) {
        // 예고 원: 시간이 갈수록 진해지고 깜빡인다
        (s.mesh.material as THREE.MeshBasicMaterial).opacity = 0.25 + (1 - k) * 0.6 * (0.7 + 0.3 * Math.sin(s.life * 25));
        s.mesh.scale.setScalar(1);
      } else {
        (s.mesh.material as THREE.MeshBasicMaterial).opacity = 0.75 * k;
        // 휘두르기는 살짝 커지고, 충격파는 0.2 → 1 로 끝까지 퍼진다
        s.mesh.scale.setScalar(s.grow ? 0.2 + (1 - k) * 0.8 : 1 + (1 - k) * 0.15);
      }
      if (s.life <= 0) {
        this.root.remove(s.mesh);
        s.mesh.geometry.dispose();
        (s.mesh.material as THREE.Material).dispose();
        this.swings.splice(i, 1);
      }
    }
    for (let i = this.slashes.length - 1; i >= 0; i--) {
      const s = this.slashes[i];
      s.life -= dt;
      const k = 1 - Math.max(0, s.life / s.max); // 0 → 1 진행
      // 빠르게 휩쓸고(앞 70%) 나머지 시간엔 끝자리에서 사라진다
      const sweep = Math.min(1, k / 0.7);
      s.mesh.rotation.y = s.from + (s.to - s.from) * (1 - (1 - sweep) * (1 - sweep));
      (s.mesh.material as THREE.MeshBasicMaterial).opacity = k < 0.7 ? 0.9 : 0.9 * (1 - (k - 0.7) / 0.3);
      s.mesh.scale.setScalar(1 + k * 0.1);
      if (s.life <= 0) {
        this.root.remove(s.mesh);
        s.mesh.geometry.dispose();
        (s.mesh.material as THREE.Material).dispose();
        this.slashes.splice(i, 1);
      }
    }
    for (let i = this.flashes.length - 1; i >= 0; i--) {
      const f = this.flashes[i];
      f.life -= dt;
      const k = 1 - Math.max(0, f.life / f.max);
      // 빠르게 커지고(앞 40%) 그 뒤 옅어진다
      f.mesh.scale.setScalar(f.radius * (0.3 + 0.7 * Math.min(1, k / 0.4)));
      (f.mesh.material as THREE.MeshBasicMaterial).opacity = k < 0.4 ? 0.85 : 0.85 * (1 - (k - 0.4) / 0.6);
      if (f.life <= 0) {
        this.root.remove(f.mesh);
        (f.mesh.material as THREE.Material).dispose();
        this.flashes.splice(i, 1);
      }
    }
    for (let i = this.pillars.length - 1; i >= 0; i--) {
      const p = this.pillars[i];
      p.life -= dt;
      const k = 1 - Math.max(0, p.life / p.max);
      // 처음 30%에 솟아오르고, 그 뒤 옅어지며 조금 넓어진다
      const rise = Math.min(1, k / 0.3);
      p.mesh.scale.set(1 + k * 0.4, Math.max(0.05, 1 - (1 - rise) * (1 - rise)), 1 + k * 0.4);
      (p.mesh.material as THREE.MeshBasicMaterial).opacity = k < 0.3 ? 0.35 : 0.35 * (1 - (k - 0.3) / 0.7);
      p.mesh.rotation.y += dt * 0.8;
      if (p.life <= 0) {
        this.root.remove(p.mesh);
        p.mesh.geometry.dispose();
        (p.mesh.material as THREE.Material).dispose();
        this.pillars.splice(i, 1);
      }
    }
    for (let i = this.bolts.length - 1; i >= 0; i--) {
      const b = this.bolts[i];
      b.life -= dt;
      const k = Math.max(0, b.life / b.max);
      this.rebuildBolt(b, b.max - b.life);
      // 깜빡이며 끝으로 갈수록 옅어진다 (마디들이 재질을 공유한다)
      (b.segs[0].material as THREE.MeshBasicMaterial).opacity = (0.5 + 0.5 * Math.random()) * Math.min(1, k * 1.5);
      if (b.life <= 0) {
        this.root.remove(b.group);
        (b.segs[0].material as THREE.Material).dispose();
        this.bolts.splice(i, 1);
      }
    }
    for (const p of this.particles) {
      if (p.life <= 0) continue;
      p.life -= dt;
      p.v.y -= 16 * dt;
      p.mesh.position.addScaledVector(p.v, dt);
      if (p.mesh.position.y < 0.08) {
        p.mesh.position.y = 0.08;
        p.v.y *= -0.3;
        p.v.x *= 0.7;
        p.v.z *= 0.7;
      }
      p.mesh.rotation.x += dt * 6;
      p.mesh.rotation.z += dt * 4;
      p.mesh.scale.setScalar(Math.max(0.01, p.life / p.max) * 1.2);
      if (p.life <= 0) p.mesh.visible = false;
    }
  }

  dispose(): void {
    this.root.removeFromParent();
    this.particleGeo.dispose();
    this.flashGeo.dispose();
    for (const f of this.flashes) (f.mesh.material as THREE.Material).dispose();
    this.flashes.length = 0;
    for (const b of this.bolts) (b.segs[0].material as THREE.Material).dispose();
    this.bolts.length = 0;
    this.boltGeo.dispose();
    this.particles.forEach((p) => (p.mesh.material as THREE.Material).dispose());
    for (const list of [this.swings, this.slashes, this.pillars] as Array<Array<{ mesh: THREE.Mesh }>>) {
      for (const s of list) {
        s.mesh.geometry.dispose();
        (s.mesh.material as THREE.Material).dispose();
      }
    }
  }
}
