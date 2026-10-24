import * as THREE from 'three';
import { Health } from '../combat/Health';
import { GameConfig, type EnemyTypeConfig } from '../game/GameConfig';
import { clampToArena, directionToFacing, lerpAngle, resolveCircleVsBoxes, steerAround, type CollisionWorld, type Vec2 } from '../player/movement';
import { EnemyAI } from './EnemyAI';
import { createEnemyModel, type EnemyModel } from './EnemyModels';

/** 적이 갱신될 때 필요한 바깥 정보 */
export interface EnemyContext {
  playerPos: Vec2;
  world: CollisionWorld;
  /** 같은 던전의 다른 적들 (서로 겹치지 않게 밀어내기용) */
  others: Enemy[];
  /** 적이 공격을 실행했을 때 호출 (근접이면 피해, 원거리면 투사체 발사는 Game 이 결정) */
  onAttackPlayer: (enemy: Enemy, damage: number) => void;
}

/**
 * 적 한 마리
 * - 능력치(def)는 GameConfig.enemies.types 에서 오고, 외형은 EnemyModel, 판단은 EnemyAI 가 맡는다.
 * - 이동·충돌은 플레이어와 같은 movement.ts 함수를 재사용한다.
 */
export class Enemy {
  readonly object3d = new THREE.Group();
  /** 우회 이동 상태: 다음 판단까지 남은 시간, 현재 꺾은 방향, 먼저 볼 쪽(+1 왼쪽/−1 오른쪽) */
  private detourTimer = 0;
  private detourDir: Vec2 | null = null;
  private detourSign = 1;
  readonly health: Health;
  readonly ai = new EnemyAI();
  readonly def: EnemyTypeConfig;

  protected readonly model: EnemyModel;
  protected facing = 0;
  protected readonly knock: Vec2 = { x: 0, z: 0 };
  protected deathTimer = 0;

  constructor(
    readonly type: string,
    def: EnemyTypeConfig,
    pos: Vec2,
    /** 난이도 배율 (체력·속도). 없으면 1 */
    protected readonly mul: { hp: number; speed: number } = { hp: 1, speed: 1 },
    /** 외형 생성 함수 (보스 등 특수 적이 바꿔 쓴다) */
    makeModel: (type: string, def: EnemyTypeConfig) => EnemyModel = createEnemyModel,
  ) {
    this.def = def;
    this.health = new Health(Math.max(1, Math.round(def.hp * mul.hp)), 0);
    this.model = makeModel(type, def);
    this.object3d.name = `Enemy-${type}`;
    this.object3d.add(this.model.root);
    this.object3d.position.set(pos.x, 0, pos.z);
    this.facing = Math.random() * Math.PI * 2;
    this.object3d.rotation.y = this.facing;
  }

  get position(): THREE.Vector3 {
    return this.object3d.position;
  }

  get radius(): number {
    return this.def.radius;
  }

  get alive(): boolean {
    return !this.health.isDead;
  }

  /** 사망 연출이 끝나 제거해도 되는지 */
  get removable(): boolean {
    return this.health.isDead && this.deathTimer >= GameConfig.enemies.deathDuration;
  }

  /** 피해를 입힌다. 실제로 맞았으면 true */
  hit(damage: number, fromDir: Vec2, knockback: number): boolean {
    if (!this.health.takeDamage(damage)) return false;
    const resist = this.def.knockbackResist ?? 1;
    this.knock.x += fromDir.x * knockback * resist;
    this.knock.z += fromDir.z * knockback * resist;
    this.model.flash();
    if (this.health.isDead) this.ai.kill();
    else this.onHurtEffect();
    return true;
  }

  /** 피격 시 행동 (기본: 잠시 멈춤). 보스는 덮어써서 멈추지 않는다 */
  protected onHurtEffect(): void {
    this.ai.onHurt();
  }

  update(dt: number, ctx: EnemyContext): void {
    if (this.health.isDead) {
      this.deathTimer += dt;
      this.model.update(dt, { state: 'dead', moving: false, windup: 0, death: Math.min(1, this.deathTimer / Math.max(0.01, GameConfig.enemies.deathDuration)) });
      return;
    }

    const p = this.object3d.position;
    const self: Vec2 = { x: p.x, z: p.z };
    const decision = this.ai.update(dt, self, ctx.playerPos, this.def);

    // 이동 + 밀림
    // 우회 이동: 추적 중 앞이 울타리·장애물로 막히면 interval 마다 좌우로 꺾은 방향을 고른다 (A* 는 아님)
    let move = decision.move;
    if (decision.state === 'chase' && (move.x !== 0 || move.z !== 0)) {
      this.detourTimer -= dt;
      if (this.detourTimer <= 0) {
        const dcfg = GameConfig.enemies.detour;
        this.detourTimer = dcfg.interval;
        const steered = steerAround(p, move, this.radius, ctx.world.getObstacleBoxes(), dcfg.lookAhead, this.detourSign, ctx.playerPos);
        // 처음 꺾는 순간의 쪽을 기억해, 우회가 이어지는 동안 같은 쪽을 먼저 본다 (좌우 떨림 방지)
        if (steered !== move && !this.detourDir) this.detourSign = move.x * steered.z - move.z * steered.x >= 0 ? 1 : -1;
        this.detourDir = steered === move ? null : steered;
      }
      if (this.detourDir) move = this.detourDir;
    } else {
      this.detourDir = null;
    }
    let next: Vec2 = {
      x: p.x + move.x * this.def.speed * this.mul.speed * (decision.speedMul ?? 1) * dt + this.knock.x * dt,
      z: p.z + move.z * this.def.speed * this.mul.speed * (decision.speedMul ?? 1) * dt + this.knock.z * dt,
    };
    const decay = Math.exp(-8 * dt);
    this.knock.x *= decay;
    this.knock.z *= decay;

    // 다른 적과 겹치지 않게 밀어내기
    const sep = GameConfig.enemies.separation;
    for (const o of ctx.others) {
      if (o === this || !o.alive) continue;
      const dx = next.x - o.position.x;
      const dz = next.z - o.position.z;
      const minDist = this.radius + o.radius + 0.2;
      const d2 = dx * dx + dz * dz;
      if (d2 < minDist * minDist && d2 > 1e-6) {
        const d = Math.sqrt(d2);
        const push = (1 - d / minDist) * sep * dt;
        next = { x: next.x + (dx / d) * push, z: next.z + (dz / d) * push };
      }
    }

    next = resolveCircleVsBoxes(next, this.radius, ctx.world.getObstacleBoxes());
    next = clampToArena(next, ctx.world.getArenaBounds(), this.radius);
    p.x = next.x;
    p.z = next.z;

    // 추적·예고 중에는 플레이어를 바라본다
    if (decision.state === 'chase' || decision.state === 'windup') {
      const target = directionToFacing({ x: ctx.playerPos.x - p.x, z: ctx.playerPos.z - p.z });
      this.facing = lerpAngle(this.facing, target, 1 - Math.exp(-10 * dt));
    }
    this.object3d.rotation.y = this.facing;

    if (decision.attackNow) ctx.onAttackPlayer(this, this.def.damage);

    const moving = move.x !== 0 || move.z !== 0;
    this.model.update(dt, { state: decision.state, moving, windup: this.ai.windupProgress, death: 0 });
  }

  dispose(): void {
    this.object3d.removeFromParent();
    this.model.dispose();
  }
}
