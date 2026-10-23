import * as THREE from 'three';
import { Health } from '../combat/Health';
import { GameConfig } from '../game/GameConfig';
import type { PlayerModel } from './models/PlaceholderModel';

/**
 * 플레이어 캐릭터
 * - 위치·방향·체력·동작 상태만 가진다. 입력 처리는 PlayerController, 공격 판정은 CombatSystem, 외형은 PlayerModel 이 담당한다.
 * - setModel() 로 외형(임시 모델 ↔ 전용 3D 모델)을 언제든 교체할 수 있다.
 */
export class Player {
  /** 씬에 추가되는 최상위 객체. 위치와 회전은 이 객체에 적용된다. */
  readonly object3d = new THREE.Group();
  /** 체력 (최대 체력·무적 시간은 GameConfig.player) */
  readonly health: Health;
  /** 바라보는 각도(라디안). 0이면 +Z 방향 */
  facing = 0;
  /** 이번 프레임에 움직이는 중인지 */
  moving = false;
  /** 현재 이동 속도 (유닛/초) */
  speed = 0;

  /** 발 높이 (0 이면 땅, 상자 위에 서 있으면 그 상자 높이) */
  jumpY = 0;
  /** 발밑 높이 (서 있는 상자 윗면, 땅이면 0). PlayerController 가 매 프레임 갱신 */
  groundY = 0;
  /** 점프 수직 속도 */
  jumpVy = 0;

  private model: PlayerModel;
  private attackTimer = 0;
  private attackDuration = 0;

  constructor(model: PlayerModel, start: { x: number; z: number }) {
    this.object3d.name = 'Player';
    this.model = model;
    this.object3d.add(model.root);
    this.object3d.position.set(start.x, 0, start.z);
    this.health = new Health(GameConfig.player.maxHp, GameConfig.player.invulnerableTime);
  }

  /** 바닥 위 위치 (x, z 사용. y는 0) */
  get position(): THREE.Vector3 {
    return this.object3d.position;
  }

  /** 회피(대시) 중인지 (PlayerController 가 갱신) */
  dashing = false;

  /** 공격 동작 중인지 */
  get attacking(): boolean {
    return this.attackTimer > 0;
  }

  /** 공중에 떠 있는지 */
  get airborne(): boolean {
    return this.jumpY > this.groundY + 1e-4;
  }

  /** 현재 외형 모델 */
  get currentModel(): PlayerModel {
    return this.model;
  }

  /** 얼굴 사진이 붙어 보이는 중인지 (디버그용) */
  get faceVisible(): boolean {
    let visible = false;
    this.model.root.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh && mesh.visible && (mesh.material as THREE.MeshBasicMaterial).map && mesh.parent?.position.y === 1.42 && (mesh.material as THREE.MeshBasicMaterial).transparent) visible = true;
    });
    return visible;
  }

  /** 외형 모델 교체 (기존 모델은 정리한다) */
  setModel(model: PlayerModel): void {
    this.object3d.remove(this.model.root);
    this.model.dispose();
    this.model = model;
    this.object3d.add(model.root);
  }

  /** 공격 동작 시작 (CombatSystem 이 호출) */
  triggerAttack(duration: number): void {
    this.attackTimer = this.attackDuration = Math.max(0.01, duration);
  }

  /** 재시작: 체력·위치·동작 초기화 */
  reset(start: { x: number; z: number }): void {
    this.health.reset(GameConfig.player.maxHp);
    this.health.invulnerableTime = GameConfig.player.invulnerableTime;
    this.object3d.position.set(start.x, 0, start.z);
    this.facing = 0;
    this.moving = false;
    this.speed = 0;
    this.attackTimer = 0;
    this.jumpY = 0;
    this.jumpVy = 0;
    this.groundY = 0;
    this.object3d.visible = true;
  }

  /** 매 프레임 호출: 회전 적용 + 모델 동작 갱신 */
  update(dt: number): void {
    this.health.update(dt);
    if (this.attackTimer > 0) this.attackTimer -= dt;
    this.object3d.rotation.y = this.facing;
    this.object3d.position.y = this.jumpY;
    this.model.update(dt, {
      moving: this.moving,
      speed: this.speed,
      attack: this.attackTimer > 0 ? 1 - this.attackTimer / this.attackDuration : null,
      airborne: this.airborne,
      dead: this.health.isDead,
      dashing: this.dashing,
      // 피격 직후(무적 시간) 비율. 회피 무적은 피격이 아니므로 제외
      hurt: !this.dashing && this.health.invulnerableTime > 0 ? Math.min(1, this.health.invulnerable / this.health.invulnerableTime) : 0,
    });
    // 무적 시간 동안 깜빡여서 피격을 알린다
    this.object3d.visible = this.health.isDead || this.health.invulnerable <= 0 || Math.floor(this.health.invulnerable * 20) % 2 === 0;
  }

  dispose(): void {
    this.model.dispose();
  }
}
