import * as THREE from 'three';
import { GameConfig } from './GameConfig';

/**
 * 3인칭 추적 카메라
 * - 플레이어 위 뒤쪽(GameConfig.camera.offset)에서 플레이어를 바라보며 부드럽게 따라간다.
 * - 던전 탐험 게임처럼 시점 각도는 고정이다. (마우스 회전은 이후 단계에서 검토)
 */
export class CameraController {
  private readonly desired = new THREE.Vector3();
  private readonly lookTarget = new THREE.Vector3();
  private first = true;

  constructor(readonly camera: THREE.PerspectiveCamera) {}

  /** 매 프레임: target(플레이어 위치)을 따라간다 */
  update(dt: number, target: THREE.Vector3): void {
    const c = GameConfig.camera;
    this.desired.set(target.x + c.offset.x, target.y + c.offset.y, target.z + c.offset.z);
    if (this.first) {
      // 첫 프레임에는 바로 제자리로 (시작할 때 카메라가 날아오는 느낌 방지)
      this.camera.position.copy(this.desired);
      this.first = false;
    } else {
      const k = 1 - Math.exp(-c.smoothing * dt);
      this.camera.position.lerp(this.desired, k);
    }
    this.lookTarget.set(target.x, target.y + c.lookAtHeight, target.z);
    this.camera.lookAt(this.lookTarget);
  }

  /** 카메라가 바라보는 수평 방향(yaw). 이동 입력을 화면 기준으로 바꿀 때 사용 */
  getYaw(): number {
    const o = GameConfig.camera.offset;
    return Math.atan2(o.x, o.z);
  }
}
