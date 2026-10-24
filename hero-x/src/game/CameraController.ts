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
  /** 카메라 거리 배율 (사용자 설정). 1 이 GameConfig.camera.offset 그대로 */
  distanceScale = 1;
  /** 보스전 거리 배율: 목표(1 또는 bossZoom.scale)로 부드럽게 다가간다 */
  private bossZoomTarget = 1;
  private bossZoom = 1;
  private shakeAmp = 0;
  private shakeTime = 0;
  private shakeTotal = 0;
  private readonly shakeOffset = new THREE.Vector3();

  /** 카메라 흔들기 (피격·내려찍기·폭발). amp: 유닛, duration: 초 */
  shake(amp: number, duration: number): void {
    this.shakeAmp = Math.max(this.shakeAmp, amp);
    this.shakeTime = this.shakeTotal = Math.max(this.shakeTime, duration);
  }

  constructor(readonly camera: THREE.PerspectiveCamera) {}

  /** 보스전 줌아웃 켜기/끄기 (Game 이 매 프레임 보스 거리로 정한다) */
  setBossZoom(active: boolean): void {
    this.bossZoomTarget = active ? GameConfig.camera.bossZoom.scale : 1;
  }

  /** 현재 적용 중인 전체 거리 배율 (설정 × 보스전) */
  get effectiveDistanceScale(): number {
    return this.distanceScale * this.bossZoom;
  }

  /** 다음 갱신 때 카메라를 바로 제자리로 (인트로처럼 카메라를 따로 움직인 뒤 복귀) */
  resetFollow(): void {
    this.first = true;
  }

  /** 매 프레임: target(플레이어 위치)을 따라간다 */
  update(dt: number, target: THREE.Vector3): void {
    const c = GameConfig.camera;
    this.bossZoom += (this.bossZoomTarget - this.bossZoom) * (1 - Math.exp(-2.5 * dt));
    const k0 = this.distanceScale * this.bossZoom;
    this.desired.set(target.x + c.offset.x * k0, target.y + c.offset.y * k0, target.z + c.offset.z * k0);
    if (this.first) {
      // 첫 프레임에는 바로 제자리로 (시작할 때 카메라가 날아오는 느낌 방지)
      this.camera.position.copy(this.desired);
      this.first = false;
    } else {
      const k = 1 - Math.exp(-c.smoothing * dt);
      this.camera.position.lerp(this.desired, k);
    }
    this.lookTarget.set(target.x, target.y + c.lookAtHeight, target.z);
    // 흔들림: 남은 시간에 비례해 줄어드는 무작위 오프셋
    if (this.shakeTime > 0) {
      this.shakeTime = Math.max(0, this.shakeTime - dt);
      const k = this.shakeTotal > 0 ? this.shakeTime / this.shakeTotal : 0;
      const a = this.shakeAmp * k * k;
      this.shakeOffset.set((Math.random() - 0.5) * 2 * a, (Math.random() - 0.5) * 2 * a, (Math.random() - 0.5) * 2 * a);
      this.camera.position.add(this.shakeOffset);
      if (this.shakeTime === 0) this.shakeAmp = 0;
    }
    this.camera.lookAt(this.lookTarget);
  }

  /** 카메라가 바라보는 수평 방향(yaw). 이동 입력을 화면 기준으로 바꿀 때 사용 */
  getYaw(): number {
    const o = GameConfig.camera.offset;
    return Math.atan2(o.x, o.z);
  }
}
