import { GameConfig } from '../game/GameConfig';
import type { InputManager } from '../input/InputManager';
import type { Player } from './Player';
import {
  clampToArena,
  computeMoveDirection,
  createDashState,
  directionToFacing,
  groundHeightAt,
  integrateJump,
  startDash,
  stepVelocity,
  tickDash,
  lerpAngle,
  resolveCircleVsBoxes,
  type CollisionWorld,
  type Vec2,
} from './movement';

/**
 * 플레이어 조작: 키 입력 → 이동 방향 → 충돌 처리 → 위치/방향 반영
 * - 이동 속도, 회전 속도, 충돌 반지름은 GameConfig.player 에서 매 프레임 읽는다 (설정 변경 즉시 반영).
 * - 카메라가 바라보는 방향(yaw)을 받아서 "화면 위쪽 = 앞으로" 가 되게 한다.
 * - 피격 시 밀려남(knockback)과 점프(Space), 회피(Shift: 이동 방향으로 짧게 빠르게, 무적)도 여기서 처리한다.
 */
export class PlayerController {
  private readonly knock: Vec2 = { x: 0, z: 0 };
  /** 현재 속도 벡터 (가속·감속 보간 결과). 카메라 앞보기·애니메이션에 쓴다 */
  readonly velocity: Vec2 = { x: 0, z: 0 };
  /** 점프 키가 눌린 순간 기록 (프레임 사이에 아주 짧게 눌러도 놓치지 않도록 이벤트로 받는다) */
  private jumpQueued = false;
  private dashQueued = false;
  private readonly dash = createDashState();
  /** 대시가 시작될 때 호출 (효과·소리용) */
  onDash: ((dir: Vec2) => void) | null = null;
  /** 점프가 시작될 때 호출 (소리용) */
  onJump: (() => void) | null = null;

  constructor(
    private readonly player: Player,
    private readonly input: InputManager,
    private readonly world: CollisionWorld,
    private readonly getCameraYaw: () => number,
    /** 이동 속도 배율 (장비 보너스). 없으면 1 */
    private readonly getSpeedMultiplier: () => number = () => 1,
  ) {
    this.input.onPress(GameConfig.controls.jump, () => {
      this.jumpQueued = true;
    });
    this.input.onPress(GameConfig.controls.dodge, () => {
      this.dashQueued = true;
    });
  }

  /** 대시 쿨다운 진행 비율 0(쓸 수 있음)~1(방금 씀). 터치 버튼 표시용 */
  get dashCooldownRatio(): number {
    const cd = GameConfig.player.dash.cooldown;
    return cd > 0 ? Math.min(1, this.dash.cooldown / cd) : 0;
  }

  get dashing(): boolean {
    return this.dash.timer > 0;
  }

  /** 피격 등으로 밀려나게 한다 (dir: 길이 1, strength: 세기) */
  applyKnockback(dir: Vec2, strength: number): void {
    this.knock.x += dir.x * strength;
    this.knock.z += dir.z * strength;
  }

  /** 재시작 시 밀림 초기화 */
  reset(): void {
    this.knock.x = 0;
    this.knock.z = 0;
    this.velocity.x = 0;
    this.velocity.z = 0;
    this.jumpQueued = false;
    this.dashQueued = false;
    this.dash.timer = 0;
    this.dash.cooldown = 0;
    this.player.dashing = false;
  }

  update(dt: number): void {
    const cfg = GameConfig.player;
    const pos = this.player.position;

    if (this.player.health.isDead) {
      this.player.moving = false;
      this.player.speed = 0;
      this.velocity.x = 0;
      this.velocity.z = 0;
      return;
    }

    // 점프: 땅(또는 상자 위)에 있을 때 점프 키를 누르면 떠오른다 (공중에서 누른 입력은 버린다). 중력은 이동 뒤에 적용
    if (this.jumpQueued && !this.player.airborne) {
      this.player.jumpVy = cfg.jumpSpeed;
      this.player.jumpY = this.player.groundY + 0.001;
      this.onJump?.();
    }
    this.jumpQueued = false;

    const axis = this.input.getMoveAxis();
    let dir = computeMoveDirection(axis, this.getCameraYaw());
    let moving = dir.x !== 0 || dir.z !== 0;
    let speed = cfg.moveSpeed * this.getSpeedMultiplier() * (this.player.attacking ? cfg.attackMoveFactor : 1);

    // 회피(대시): 이동 중이면 그 방향, 아니면 바라보는 방향으로. 대시 중에는 무적(설정)이고 밀림을 무시한다
    tickDash(this.dash, dt);
    if (this.dashQueued) {
      this.dashQueued = false;
      const want = moving ? dir : { x: Math.sin(this.player.facing), z: Math.cos(this.player.facing) };
      if (startDash(this.dash, want, cfg.dash.duration, cfg.dash.cooldown)) {
        if (cfg.dash.invulnerable) this.player.health.invulnerable = Math.max(this.player.health.invulnerable, cfg.dash.duration);
        this.knock.x = 0;
        this.knock.z = 0;
        this.onDash?.(this.dash.dir);
      }
    }
    if (this.dash.timer > 0) {
      dir = this.dash.dir;
      moving = true;
      speed = cfg.dash.speed;
    }
    this.player.dashing = this.dash.timer > 0;

    // 가속·감속: 입력 방향×속도를 목표로 속도 벡터를 보간한다 (대시는 즉시). 방향을 바꾸면 튀지 않고 부드럽게 꺾인다
    const target = { x: dir.x * speed, z: dir.z * speed };
    if (this.dash.timer > 0) {
      this.velocity.x = target.x;
      this.velocity.z = target.z;
    } else {
      const v = stepVelocity(this.velocity, target, dt, cfg.accelTime, cfg.decelTime);
      this.velocity.x = v.x;
      this.velocity.z = v.z;
    }
    let next = { x: pos.x + this.velocity.x * dt + this.knock.x * dt, z: pos.z + this.velocity.z * dt + this.knock.z * dt };
    const decay = Math.exp(-8 * dt);
    this.knock.x *= decay;
    this.knock.z *= decay;

    // 발이 윗면에 닿은 상자는 가로막지 않고(위로 지나감), 그 밖의 상자는 밀어낸다
    const boxes = this.world.getObstacleBoxes();
    next = resolveCircleVsBoxes(next, cfg.radius, boxes, this.player.jumpY, cfg.climbAssist);
    next = clampToArena(next, this.world.getArenaBounds(), cfg.radius);
    pos.x = next.x;
    pos.z = next.z;

    // 발밑 높이(서 있는 상자 윗면 또는 땅)를 구하고, 공중이면 중력으로 내려온다. 윗면보다 조금 낮으면 올려 준다(올라서기 보조)
    const ground = groundHeightAt(next, cfg.radius, boxes, this.player.jumpY, cfg.climbAssist);
    this.player.groundY = ground;
    if (this.player.jumpY !== ground || this.player.jumpVy !== 0) {
      const j = integrateJump({ y: this.player.jumpY, vy: this.player.jumpVy }, dt, cfg.gravity, ground);
      this.player.jumpY = j.y;
      this.player.jumpVy = j.vy;
    }

    // 이동 방향으로 부드럽게 몸을 돌린다 (공격 중에는 공격 방향 유지). 입력이 있을 때만 → 감속 중엔 방향을 지킨다
    if (moving && (!this.player.attacking || this.dash.timer > 0)) {
      const face = directionToFacing(dir);
      this.player.facing = lerpAngle(this.player.facing, face, 1 - Math.exp(-cfg.turnSpeed * dt));
    }

    // 실제 속도 기준으로 동작: 감속 중에도 발이 미끄러지지 않게 걷기 동작이 이어진다
    const actual = Math.hypot(this.velocity.x, this.velocity.z);
    this.player.moving = moving || actual > 0.3;
    this.player.speed = this.player.moving ? Math.max(actual, moving ? speed * 0.35 : 0) : 0;
  }
}
