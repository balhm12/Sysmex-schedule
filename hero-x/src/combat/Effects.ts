import * as THREE from 'three';
import { glow } from '../render/materials';

/**
 * 전투 시각 효과: 근접 공격 휘두르기 부채꼴, 타격·처치 파편
 * - 피나 잔인한 표현 없이 빛과 파편으로만 표현한다.
 * - 파편은 미리 만들어 둔 풀(pool)을 재사용해 메모리를 아낀다.
 */
export class Effects {
  private readonly root = new THREE.Group();
  /** 바닥·공중에 잠깐 보이는 도형들: 휘두르기 부채꼴, 충격파(grow), 예고 원(warn) */
  private readonly swings: Array<{ mesh: THREE.Mesh; life: number; max: number; grow?: boolean; warn?: boolean }> = [];
  private readonly particles: Array<{ mesh: THREE.Mesh; v: THREE.Vector3; life: number; max: number }> = [];
  private readonly particleGeo = new THREE.BoxGeometry(0.16, 0.16, 0.16);

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

  /** 충격파 링: center 에서 radius 까지 퍼지며 사라진다 */
  shockwave(center: THREE.Vector3, radius: number, duration = 0.45, color = 0xff4f79): void {
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
    this.particles.forEach((p) => (p.mesh.material as THREE.Material).dispose());
    this.swings.forEach((s) => {
      s.mesh.geometry.dispose();
      (s.mesh.material as THREE.Material).dispose();
    });
  }
}
