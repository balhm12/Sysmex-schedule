import * as THREE from 'three';
import { glow } from '../render/materials';
import type { Enemy } from '../enemies/Enemy';
import { GameConfig } from '../game/GameConfig';
import { hitsObstacle, type CollisionWorld, type Vec2 } from '../player/movement';

/** 투사체 한 발의 성질 */
export interface ProjectileSpec {
  damage: number;
  speed: number;
  lifetime: number;
  radius: number;
  knockback: number;
  color: THREE.ColorRepresentation;
  /** true: 플레이어가 쏜 탄(적에게 맞음), false: 적이 쏜 탄(플레이어에게 맞음) */
  friendly: boolean;
}

/** 투사체 갱신에 필요한 바깥 정보 */
export interface ProjectileContext {
  world: CollisionWorld;
  enemies: Enemy[];
  playerPos: Vec2;
  /** 플레이어 높이(점프 중이면 0보다 큼). 1 이상 떠 있으면 적의 탄이 아래로 지나간다 */
  playerY: number;
  playerRadius: number;
  onHitEnemy: (enemy: Enemy, spec: ProjectileSpec, dir: Vec2) => void;
  onHitPlayer: (spec: ProjectileSpec, dir: Vec2, from: Vec2) => void;
  /** 탄이 사라질 때(명중·벽·수명) 알림 — 명중 연출용. 없으면 생략 */
  onImpact?: (pos: Vec2, spec: ProjectileSpec, reason: 'enemy' | 'player' | 'wall' | 'expire') => void;
}

interface Shot {
  mesh: THREE.Mesh;
  /** 탄 뒤로 늘어지는 빛 꼬리 (가산 혼합, 지나온 거리만큼 길어진다) */
  trail: THREE.Mesh;
  dir: Vec2;
  life: number;
  travelled: number;
  spec: ProjectileSpec;
}

/** 탄이 날아가는 높이 */
const FLIGHT_Y = 0.9;
/** 이 높이 이상 떠 있으면 적의 탄이 플레이어 아래로 지나간다 */
const DODGE_HEIGHT = 1.0;

/**
 * 투사체 관리 (플레이어와 적 공용)
 * - 직선으로 날아가고, 장애물·벽에 닿거나 수명이 다하면 사라진다. 뒤로 빛 꼬리를 끌고 돌면서 날아간다.
 * - 사라지는 순간 onImpact 로 알려서 바깥이 명중 연출(섬광·파편·충격파)을 넣는다.
 * - 맞았을 때의 처리(피해·효과)는 콜백으로 바깥(Game/CombatSystem)에 맡긴다.
 */
export class ProjectileSystem {
  private readonly root = new THREE.Group();
  private readonly shots: Shot[] = [];
  private readonly geo = new THREE.SphereGeometry(1, 10, 8);
  /** 꼬리: 길이 1 의 원기둥. -Z 쪽(뒤)으로 늘어나도록 끝점이 원점에 오게 옮겨 둔다 */
  private readonly trailGeo = (() => {
    const g = new THREE.CylinderGeometry(0.35, 1, 1, 8, 1, true);
    g.rotateX(Math.PI / 2);
    g.translate(0, 0, -0.5);
    return g;
  })();

  constructor(scene: THREE.Scene) {
    this.root.name = 'Projectiles';
    scene.add(this.root);
  }

  /** 발사. origin 에서 dir(길이 1) 방향으로 */
  spawn(origin: Vec2, dir: Vec2, spec: ProjectileSpec): void {
    const mesh = new THREE.Mesh(this.geo, glow(spec.color, 2.5));
    mesh.position.set(origin.x, FLIGHT_Y, origin.z);
    mesh.scale.set(spec.radius, spec.radius, spec.radius * 2.2);
    mesh.lookAt(origin.x + dir.x, FLIGHT_Y, origin.z + dir.z);
    this.root.add(mesh);
    const trail = new THREE.Mesh(
      this.trailGeo,
      new THREE.MeshBasicMaterial({ color: spec.color, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }),
    );
    trail.position.copy(mesh.position);
    trail.quaternion.copy(mesh.quaternion);
    trail.scale.set(spec.radius, spec.radius, 0.001);
    this.root.add(trail);
    this.shots.push({ mesh, trail, dir: { x: dir.x, z: dir.z }, life: spec.lifetime, travelled: 0, spec });
  }

  get count(): number {
    return this.shots.length;
  }

  update(dt: number, ctx: ProjectileContext): void {
    const boxes = ctx.world.getObstacleBoxes();
    const half = ctx.world.getArenaBounds();
    for (let i = this.shots.length - 1; i >= 0; i--) {
      const s = this.shots[i];
      s.life -= dt;
      const stepLen = s.spec.speed * dt;
      s.mesh.position.x += s.dir.x * stepLen;
      s.mesh.position.z += s.dir.z * stepLen;
      s.travelled += stepLen;
      // 탄은 돌면서 살짝 두근거리고, 꼬리는 지나온 길이(최대 trailLength)만큼 뒤로 늘어진다
      s.mesh.rotation.z += dt * 14;
      const pulse = 1 + 0.15 * Math.sin(s.travelled * 6);
      s.mesh.scale.set(s.spec.radius * pulse, s.spec.radius * pulse, s.spec.radius * 2.2);
      s.trail.position.copy(s.mesh.position);
      s.trail.scale.z = Math.max(0.001, Math.min(GameConfig.juice.ranged.trailLength, s.travelled));
      const pos: Vec2 = { x: s.mesh.position.x, z: s.mesh.position.z };
      let reason: 'enemy' | 'player' | 'wall' | 'expire' | null = s.life <= 0 ? 'expire' : hitsObstacle(pos, s.spec.radius, boxes, half) ? 'wall' : null;

      if (!reason && s.spec.friendly) {
        for (const e of ctx.enemies) {
          if (!e.alive) continue;
          const rr = e.radius + s.spec.radius;
          if ((e.position.x - pos.x) ** 2 + (e.position.z - pos.z) ** 2 < rr * rr) {
            ctx.onHitEnemy(e, s.spec, s.dir);
            reason = 'enemy';
            break;
          }
        }
      } else if (!reason && ctx.playerY < DODGE_HEIGHT) {
        const rr = ctx.playerRadius + s.spec.radius;
        if ((ctx.playerPos.x - pos.x) ** 2 + (ctx.playerPos.z - pos.z) ** 2 < rr * rr) {
          ctx.onHitPlayer(s.spec, s.dir, pos);
          reason = 'player';
        }
      }

      if (reason) {
        ctx.onImpact?.(pos, s.spec, reason);
        this.remove(i);
      }
    }
  }

  /** 모든 탄 제거 (재시작용) */
  clear(): void {
    for (let i = this.shots.length - 1; i >= 0; i--) this.remove(i);
  }

  dispose(): void {
    this.clear();
    this.geo.dispose();
    this.trailGeo.dispose();
    this.root.removeFromParent();
  }

  private remove(i: number): void {
    const s = this.shots[i];
    this.root.remove(s.mesh);
    this.root.remove(s.trail);
    (s.mesh.material as THREE.Material).dispose();
    (s.trail.material as THREE.Material).dispose();
    this.shots.splice(i, 1);
  }
}
