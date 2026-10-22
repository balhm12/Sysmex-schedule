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
} from './movement';

/**
 * 플레이어 조작: 키 입력 → 이동 방향 → 충돌 처리 → 위치/방향 반영
 * - 이동 속도, 회전 속도, 충돌 반지름은 GameConfig.player 에서 매 프레임 읽는다 (설정 변경 즉시 반영).
 * - 카메라가 바라보는 방향(yaw)을 받아서 "화면 위쪽 = 앞으로" 가 되게 한다.
 */
export class PlayerController {
  constructor(
    private readonly player: Player,
    private readonly input: InputManager,
    private readonly world: CollisionWorld,
    private readonly getCameraYaw: () => number,
  ) {}

  update(dt: number): void {
    const cfg = GameConfig.player;
    const axis = this.input.getMoveAxis();
    const dir = computeMoveDirection(axis, this.getCameraYaw());
    const moving = dir.x !== 0 || dir.z !== 0;
    const pos = this.player.position;

    if (moving) {
      let next = { x: pos.x + dir.x * cfg.moveSpeed * dt, z: pos.z + dir.z * cfg.moveSpeed * dt };
      next = resolveCircleVsBoxes(next, cfg.radius, this.world.getObstacleBoxes());
      next = clampToArena(next, this.world.getArenaHalfSize(), cfg.radius);
      pos.x = next.x;
      pos.z = next.z;

      // 이동 방향으로 부드럽게 몸을 돌린다
      const target = directionToFacing(dir);
      this.player.facing = lerpAngle(this.player.facing, target, 1 - Math.exp(-cfg.turnSpeed * dt));
    }

    this.player.moving = moving;
    this.player.speed = moving ? cfg.moveSpeed : 0;
  }
}
