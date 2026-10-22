import * as THREE from 'three';
import { GameConfig, type EnemyTypeConfig } from '../game/GameConfig';
import { clampToArena, directionToFacing, lerpAngle, resolveCircleVsBoxes, type Vec2 } from '../player/movement';
import { BossAI, type BossPattern } from './BossAI';
import { Enemy, type EnemyContext } from './Enemy';
import type { EnemyModel, EnemyModelState } from './EnemyModels';

/** 보스가 실행한 공격 (Game 이 효과·피해를 처리) */
export type BossAttack =
  | { kind: 'contact'; damage: number }
  | { kind: 'slam'; radius: number; damage: number }
  | { kind: 'barrage'; count: number; aimed: boolean; damage: number; speed: number };

export interface BossContext extends EnemyContext {
  onBossAttack: (boss: Boss, attack: BossAttack) => void;
  /** 플레이어 충돌 반지름 (돌진 접촉 판정) */
  playerRadius: number;
}

/** 보스용 적 종류 설정을 GameConfig.boss 에서 만든다 */
export function bossTypeConfig(): EnemyTypeConfig {
  const b = GameConfig.boss;
  return {
    name: b.name,
    hp: b.hp,
    speed: b.speed,
    radius: b.radius,
    damage: b.contactDamage,
    attackRange: b.engageRange,
    attackWindup: b.windup.slam,
    attackCooldown: b.cooldown,
    aggroRange: 999,
    color: b.color,
    score: b.score,
    knockbackResist: b.knockbackResist,
  };
}

/**
 * 보스 "숲의 수호 로봇"
 * - Enemy 를 상속해 체력·피격·모델은 그대로 쓰고, 행동은 BossAI 가 맡는다.
 * - 2단계(체력 비율 phase2Ratio 이하)에서 패턴이 빨라지고 탄막이 늘어난다.
 */
export class Boss extends Enemy {
  readonly bossAI = new BossAI();
  private chargeHit = false;

  constructor(pos: Vec2, mul: { hp: number; speed: number }) {
    super('boss', bossTypeConfig(), pos, mul, (_type, def) => createBossModel(def));
  }

  get phase2(): boolean {
    return this.health.ratio <= GameConfig.boss.phase2Ratio;
  }

  override hit(damage: number, fromDir: Vec2, knockback: number): boolean {
    const ok = super.hit(damage, fromDir, knockback);
    if (ok && this.health.isDead) this.bossAI.kill();
    return ok;
  }

  /** 보스는 피격으로 멈추지 않는다 (상위 클래스의 hurt 상태를 쓰지 않음) */
  protected override onHurtEffect(): void {
    /* 패턴 유지 */
  }

  override update(dt: number, ctx: EnemyContext): void {
    const bctx = ctx as BossContext;
    if (this.health.isDead) {
      this.deathTimer += dt;
      this.model.update(dt, { state: 'dead', moving: false, windup: 0, death: Math.min(1, this.deathTimer / Math.max(0.01, GameConfig.enemies.deathDuration)) });
      return;
    }
    const b = GameConfig.boss;
    const p = this.object3d.position;
    const self: Vec2 = { x: p.x, z: p.z };
    const d = this.bossAI.update(dt, self, ctx.playerPos, b, this.phase2);
    const speedMul = this.phase2 ? b.phase2SpeedMul : 1;

    // 이동: 돌진 중에는 빠르게, 평소에는 걷기
    const speed = d.state === 'charge' ? b.charge.speed : this.def.speed * this.mul.speed * speedMul;
    let next: Vec2 = { x: p.x + d.move.x * speed * dt + this.knock.x * dt, z: p.z + d.move.z * speed * dt + this.knock.z * dt };
    const decay = Math.exp(-8 * dt);
    this.knock.x *= decay;
    this.knock.z *= decay;
    next = resolveCircleVsBoxes(next, this.radius, ctx.world.getObstacleBoxes());
    next = clampToArena(next, ctx.world.getArenaHalfSize(), this.radius);
    // 돌진이 벽·장애물에 막히면 멈춘다
    if (d.state === 'charge' && Math.hypot(next.x - p.x, next.z - p.z) < speed * dt * 0.3) this.bossAI.stopCharge();
    p.x = next.x;
    p.z = next.z;

    // 바라보기: 돌진 중에는 돌진 방향, 그 외에는 플레이어
    const lookDir = d.state === 'charge' ? d.move : { x: ctx.playerPos.x - p.x, z: ctx.playerPos.z - p.z };
    if (lookDir.x !== 0 || lookDir.z !== 0) this.facing = lerpAngle(this.facing, directionToFacing(lookDir), 1 - Math.exp(-(d.state === 'charge' ? 30 : 6) * dt));
    this.object3d.rotation.y = this.facing;

    // 패턴 실행
    if (d.execute === 'charge') this.chargeHit = false;
    if (d.execute === 'slam') bctx.onBossAttack(this, { kind: 'slam', radius: b.slam.radius, damage: b.slam.damage });
    if (d.execute === 'barrage') {
      bctx.onBossAttack(this, { kind: 'barrage', count: this.phase2 ? b.barrage.phase2Count : b.barrage.count, aimed: this.phase2, damage: b.barrage.damage, speed: b.barrage.speed });
    }
    // 돌진 접촉 (돌진 한 번에 한 번만)
    if (d.state === 'charge' && !this.chargeHit) {
      const dist = Math.hypot(ctx.playerPos.x - p.x, ctx.playerPos.z - p.z);
      if (dist < this.radius + bctx.playerRadius) {
        this.chargeHit = true;
        bctx.onBossAttack(this, { kind: 'contact', damage: b.contactDamage });
      }
    }

    const moving = d.move.x !== 0 || d.move.z !== 0;
    const modelState: BossModelState = {
      state: d.state === 'windup' ? 'windup' : d.state === 'dead' ? 'dead' : 'chase',
      moving,
      windup: d.windupProgress,
      death: 0,
      pattern: d.windupPattern ?? (d.state === 'charge' ? 'charge' : null),
      phase2: this.phase2,
    };
    this.model.update(dt, modelState);
  }
}

/** 보스 모델 상태 (일반 적 상태 + 패턴·2단계) */
interface BossModelState extends EnemyModelState {
  pattern?: BossPattern | null;
  phase2?: boolean;
}

/** 보스 임시 모델: 큰 로봇, 두 팔(망치), 왕관 안테나. 예고 때 패턴별로 다른 색·동작 */
function createBossModel(def: EnemyTypeConfig): EnemyModel {
  const root = new THREE.Group();
  root.name = `Boss-${def.name}`;
  const r = def.radius;
  const bodyMat = new THREE.MeshLambertMaterial({ color: new THREE.Color(def.color) });
  const darkMat = new THREE.MeshLambertMaterial({ color: 0x2a2f3d });
  const goldMat = new THREE.MeshLambertMaterial({ color: 0xffd23f });
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0x5cf2d8 });
  const glowMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });

  const body = new THREE.Mesh(new THREE.BoxGeometry(r * 1.5, r * 1.3, r * 1.2), bodyMat);
  body.position.y = r * 1.3;
  body.castShadow = true;
  root.add(body);
  const legs = new THREE.Mesh(new THREE.BoxGeometry(r * 1.3, r * 0.6, r * 1.0), darkMat);
  legs.position.y = r * 0.35;
  legs.castShadow = true;
  root.add(legs);
  const head = new THREE.Mesh(new THREE.BoxGeometry(r * 0.8, r * 0.6, r * 0.8), bodyMat);
  head.position.y = r * 2.3;
  head.castShadow = true;
  root.add(head);
  for (const sx of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(r * 0.1, 8, 6), eyeMat);
    eye.position.set(sx * r * 0.2, r * 2.35, r * 0.42);
    root.add(eye);
    const spike = new THREE.Mesh(new THREE.ConeGeometry(r * 0.12, r * 0.4, 5), goldMat);
    spike.position.set(sx * r * 0.25, r * 2.75, 0);
    root.add(spike);
  }
  const crown = new THREE.Mesh(new THREE.ConeGeometry(r * 0.16, r * 0.5, 5), goldMat);
  crown.position.y = r * 2.85;
  root.add(crown);
  // 팔: 어깨 축, 끝에 망치
  const arms: THREE.Group[] = [];
  for (const sx of [-1, 1]) {
    const shoulder = new THREE.Group();
    shoulder.position.set(sx * r * 0.95, r * 1.8, 0);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(r * 0.3, r * 1.1, r * 0.3), darkMat);
    arm.position.y = -r * 0.55;
    arm.castShadow = true;
    shoulder.add(arm);
    const hammer = new THREE.Mesh(new THREE.BoxGeometry(r * 0.55, r * 0.4, r * 0.55), goldMat);
    hammer.position.y = -r * 1.2;
    hammer.castShadow = true;
    shoulder.add(hammer);
    root.add(shoulder);
    arms.push(shoulder);
  }
  // 예고 표시용 바닥 원
  const ring = new THREE.Mesh(new THREE.RingGeometry(r * 0.9, r * 1.1, 32), glowMat);
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.06;
  root.add(ring);

  let flashTimer = 0;
  let t = 0;
  const patternColor: Record<BossPattern, number> = { charge: 0xff7a45, slam: 0xff4f79, barrage: 0xb06bff };

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
        return;
      }
      eyeMat.color.set(s.phase2 ? 0xff3b3b : 0x5cf2d8);
      body.position.y = r * 1.3 + (s.moving ? Math.abs(Math.sin(t * 6)) * 0.08 : 0);
      const w = s.windup;
      const pat = s.pattern ?? null;
      // 예고: 패턴 색으로 바닥 원이 커지고, 팔 동작이 달라진다
      glowMat.opacity = pat && s.state === 'windup' ? 0.25 + w * 0.55 : pat === 'charge' ? 0.5 : 0;
      if (pat) glowMat.color.set(patternColor[pat]);
      ring.scale.setScalar(pat === 'slam' ? 1 + w * 1.6 : 1);
      const armTarget = pat === 'slam' ? -2.6 * w : pat === 'charge' ? -1.2 : pat === 'barrage' ? -1.6 * w : 0;
      for (const a of arms) a.rotation.x += (armTarget - a.rotation.x) * (1 - Math.exp(-12 * dt));
      body.rotation.x = pat === 'charge' ? 0.25 : pat === 'slam' ? -0.15 * w : 0;
      if (flashTimer > 0) {
        flashTimer -= dt;
        bodyMat.emissive.setScalar(flashTimer > 0 ? 0.9 : 0);
      }
    },
    flash() {
      flashTimer = 0.09;
      bodyMat.emissive.setScalar(0.9);
    },
    dispose() {
      root.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.isMesh) {
          mesh.geometry.dispose();
          const m = mesh.material;
          if (Array.isArray(m)) m.forEach((x) => x.dispose());
          else m.dispose();
        }
      });
    },
  };
}
