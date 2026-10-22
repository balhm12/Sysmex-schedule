import { GameConfig } from '../game/GameConfig';
import type { InputManager } from '../input/InputManager';
import type { Player } from './Player';
import {
  clampToArena,
  computeMoveDirection,
  directionToFacing,
  integrateJump,
  lerpAngle,
  resolveCircleVsBoxes,
  type CollisionWorld,
  type Vec2,
} from './movement';

/**
 * 플레이어 조작: 키 입력 → 이동 방향 → 충돌 처리 → 위치/방향 반영
 * - 이동 속도, 회전 속도, 충돌 반지름은 GameConfig.player 에서 매 프레임 읽는다 (설정 변경 즉시 반영).
 * - 카메라가 바라보는 방향(yaw)을 받아서 "화면 위쪽 = 앞으로" 가 되게 한다.
 * - 피격 시 밀려남(knockback)과 점프(Space)도 여기서 처리한다.
 */
export class PlayerController {
  private readonly knock: Vec2 = { x: 0, z: 0 };
  /** 점프 키가 눌린 순간 기록 (프레임 사이에 아주 짧게 눌러도 놓치지 않도록 이벤트로 받는다) */
  private jumpQueued = false;

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
    this.jumpQueued = false;
  }

  update(dt: number): void {
    const cfg = GameConfig.player;
    const pos = this.player.position;

    if (this.player.health.isDead) {
      this.player.moving = false;
      this.player.speed = 0;
      return;
    }

    // 점프: 땅에 있을 때 점프 키를 누르면 떠오르고, 중력으로 내려온다 (공중에서 누른 입력은 버린다)
    if (this.jumpQueued && !this.player.airborne) {
      this.player.jumpVy = cfg.jumpSpeed;
      this.player.jumpY = 0.001;
    }
    this.jumpQueued = false;
    if (this.player.airborne) {
      const j = integrateJump({ y: this.player.jumpY, vy: this.player.jumpVy }, dt, cfg.gravity);
      this.player.jumpY = j.y;
      this.player.jumpVy = j.vy;
    }

    const axis = this.input.getMoveAxis();
    const dir = computeMoveDirection(axis, this.getCameraYaw());
    const moving = dir.x !== 0 || dir.z !== 0;
    const speed = cfg.moveSpeed * this.getSpeedMultiplier() * (this.player.attacking ? cfg.attackMoveFactor : 1);

    let next = { x: pos.x + dir.x * speed * dt + this.knock.x * dt, z: pos.z + dir.z * speed * dt + this.knock.z * dt };
    const decay = Math.exp(-8 * dt);
    this.knock.x *= decay;
    this.knock.z *= decay;

    next = resolveCircleVsBoxes(next, cfg.radius, this.world.getObstacleBoxes());
    next = clampToArena(next, this.world.getArenaHalfSize(), cfg.radius);
    pos.x = next.x;
    pos.z = next.z;

    // 이동 방향으로 부드럽게 몸을 돌린다 (공격 중에는 공격 방향 유지)
    if (moving && !this.player.attacking) {
      const target = directionToFacing(dir);
      this.player.facing = lerpAngle(this.player.facing, target, 1 - Math.exp(-cfg.turnSpeed * dt));
    }

    this.player.moving = moving;
    this.player.speed = moving ? speed : 0;
  }
}
