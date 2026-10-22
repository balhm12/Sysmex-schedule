import { GameConfig } from '../game/GameConfig';
import type { InputManager } from '../input/InputManager';
import type { Player } from './Player';
import {
  clampToArena,
  computeMoveDirection,
  directionToFacing,
  lerpAngle,
  resolveCircleVsBoxes,
  type CollisionWorld,
  type Vec2,
} from './movement';

/**
 * 플레이어 조작: 키 입력 → 이동 방향 → 충돌 처리 → 위치/방향 반영
 * - 이동 속도, 회전 속도, 충돌 반지름은 GameConfig.player 에서 매 프레임 읽는다 (설정 변경 즉시 반영).
 * - 카메라가 바라보는 방향(yaw)을 받아서 "화면 위쪽 = 앞으로" 가 되게 한다.
 * - 피격 시 밀려남(knockback)도 여기서 처리한다.
 */
export class PlayerController {
  private readonly knock: Vec2 = { x: 0, z: 0 };

  constructor(
    private readonly player: Player,
    private readonly input: InputManager,
    private readonly world: CollisionWorld,
    private readonly getCameraYaw: () => number,
  ) {}

  /** 피격 등으로 밀려나게 한다 (dir: 길이 1, strength: 세기) */
  applyKnockback(dir: Vec2, strength: number): void {
    this.knock.x += dir.x * strength;
    this.knock.z += dir.z * strength;
  }

  /** 재시작 시 밀림 초기화 */
  reset(): void {
    this.knock.x = 0;
    this.knock.z = 0;
  }

  update(dt: number): void {
    const cfg = GameConfig.player;
    const pos = this.player.position;

    if (this.player.health.isDead) {
      this.player.moving = false;
      this.player.speed = 0;
      return;
    }

    const axis = this.input.getMoveAxis();
    const dir = computeMoveDirection(axis, this.getCameraYaw());
    const moving = dir.x !== 0 || dir.z !== 0;
    const speed = cfg.moveSpeed * (this.player.attacking ? cfg.attackMoveFactor : 1);

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
