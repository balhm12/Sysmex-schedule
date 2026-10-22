import * as THREE from 'three';
import type { PlayerModel } from './models/PlaceholderModel';

/**
 * 플레이어 캐릭터
 * - 위치·방향·이동 상태만 가진다. 입력 처리는 PlayerController, 외형은 PlayerModel 이 담당한다.
 * - setModel() 로 외형(임시 모델 ↔ 전용 3D 모델)을 언제든 교체할 수 있다.
 */
export class Player {
  /** 씬에 추가되는 최상위 객체. 위치와 회전은 이 객체에 적용된다. */
  readonly object3d = new THREE.Group();
  /** 바라보는 각도(라디안). 0이면 +Z 방향 */
  facing = 0;
  /** 이번 프레임에 움직이는 중인지 */
  moving = false;
  /** 현재 이동 속도 (유닛/초) */
  speed = 0;

  private model: PlayerModel;

  constructor(model: PlayerModel, start: { x: number; z: number }) {
    this.object3d.name = 'Player';
    this.model = model;
    this.object3d.add(model.root);
    this.object3d.position.set(start.x, 0, start.z);
  }

  /** 바닥 위 위치 (x, z 사용. y는 0) */
  get position(): THREE.Vector3 {
    return this.object3d.position;
  }

  /** 외형 모델 교체 (기존 모델은 정리한다) */
  setModel(model: PlayerModel): void {
    this.object3d.remove(this.model.root);
    this.model.dispose();
    this.model = model;
    this.object3d.add(model.root);
  }

  /** 매 프레임 호출: 회전 적용 + 모델 동작 갱신 */
  update(dt: number): void {
    this.object3d.rotation.y = this.facing;
    this.model.update(dt, { moving: this.moving, speed: this.speed });
  }

  dispose(): void {
    this.model.dispose();
  }
}
