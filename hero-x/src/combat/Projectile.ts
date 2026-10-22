import * as THREE from 'three';
import type { Enemy } from '../enemies/Enemy';
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
}

interface Shot {
  mesh: THREE.Mesh;
  dir: Vec2;
  life: number;
  spec: ProjectileSpec;
}

/** 탄이 날아가는 높이 */
const FLIGHT_Y = 0.9;
/** 이 높이 이상 떠 있으면 적의 탄이 플레이어 아래로 지나간다 */
const DODGE_HEIGHT = 1.0;

/**
 * 투사체 관리 (플레이어와 적 공용)
 * - 직선으로 날아가고, 장애물·벽에 닿거나 수명이 다하면 사라진다.
 * - 맞았을 때의 처리(피해·효과)는 콜백으로 바깥(Game/CombatSystem)에 맡긴다.
 */
export class ProjectileSystem {
  private readonly root = new THREE.Group();
  private readonly shots: Shot[] = [];
  private readonly geo = new THREE.SphereGeometry(1, 10, 8);

  constructor(scene: THREE.Scene) {
    this.root.name = 'Projectiles';
    scene.add(this.root);
  }

  /** 발사. origin 에서 dir(길이 1) 방향으로 */
  spawn(origin: Vec2, dir: Vec2, spec: ProjectileSpec): void {
    const mesh = new THREE.Mesh(this.geo, new THREE.MeshBasicMaterial({ color: spec.color }));
    mesh.position.set(origin.x, FLIGHT_Y, origin.z);
    mesh.scale.set(spec.radius, spec.radius, spec.radius * 2.2);
    mesh.lookAt(origin.x + dir.x, FLIGHT_Y, origin.z + dir.z);
    this.root.add(mesh);
    this.shots.push({ mesh, dir: { x: dir.x, z: dir.z }, life: spec.lifetime, spec });
  }

  get count(): number {
    return this.shots.length;
  }

  update(dt: number, ctx: ProjectileContext): void {
    const boxes = ctx.world.getObstacleBoxes();
    const half = ctx.world.getArenaHalfSize();
    for (let i = this.shots.length - 1; i >= 0; i--) {
      const s = this.shots[i];
      s.life -= dt;
      s.mesh.position.x += s.dir.x * s.spec.speed * dt;
      s.mesh.position.z += s.dir.z * s.spec.speed * dt;
      const pos: Vec2 = { x: s.mesh.position.x, z: s.mesh.position.z };
      let gone = s.life <= 0 || hitsObstacle(pos, s.spec.radius, boxes, half);

      if (!gone && s.spec.friendly) {
        for (const e of ctx.enemies) {
          if (!e.alive) continue;
          const rr = e.radius + s.spec.radius;
          if ((e.position.x - pos.x) ** 2 + (e.position.z - pos.z) ** 2 < rr * rr) {
            ctx.onHitEnemy(e, s.spec, s.dir);
            gone = true;
            break;
          }
        }
      } else if (!gone && ctx.playerY < DODGE_HEIGHT) {
        const rr = ctx.playerRadius + s.spec.radius;
        if ((ctx.playerPos.x - pos.x) ** 2 + (ctx.playerPos.z - pos.z) ** 2 < rr * rr) {
          ctx.onHitPlayer(s.spec, s.dir, pos);
          gone = true;
        }
      }

      if (gone) this.remove(i);
    }
  }

  /** 모든 탄 제거 (재시작용) */
  clear(): void {
    for (let i = this.shots.length - 1; i >= 0; i--) this.remove(i);
  }

  dispose(): void {
    this.clear();
    this.geo.dispose();
    this.root.removeFromParent();
  }

  private remove(i: number): void {
    const s = this.shots[i];
    this.root.remove(s.mesh);
    (s.mesh.material as THREE.Material).dispose();
    this.shots.splice(i, 1);
  }
}
