import type * as THREE from 'three';
import { GameConfig } from '../game/GameConfig';
import type { IntroOverlay } from '../ui/IntroOverlay';
import { INTRO_SPAWNS, INTRO_SPAWN_AT, introAt, type HeroPose, type IntroFrame } from './introTimeline';

/** 인트로가 게임에 요구하는 것들 (Game 이 함수로 넘긴다) */
export interface IntroHooks {
  /** 몬스터 생성 (체력은 Game 이 인트로용으로 낮춘다) */
  spawn(type: string, x: number, z: number): void;
  /** 주인공 위치 */
  hero(): HeroPose;
  /** 가장 가까운 살아 있는 적까지의 거리와 방향 (없으면 null) */
  nearestEnemy(): { dist: number; dx: number; dz: number } | null;
  /** 가상 이동 입력 (카메라 기준 축) */
  setAxis(x: number, z: number): void;
  press(code: string): void;
  release(code: string): void;
  camera: THREE.PerspectiveCamera;
  overlay: IntroOverlay;
  /** 인트로가 끝났을 때 */
  onEnd(): void;
}

/**
 * 인트로 연출 진행기
 * - 실시간으로 시간표(introTimeline)를 읽어 몬스터를 등장시키고, 주인공을 가상 입력으로 움직이며(걷기·공격·회피),
 *   카메라 위치·줌과 자막을 매 프레임 적용한다. 게임 시뮬레이션은 timeScale 로 느려질 수 있다(슬로 모션).
 * - 처치가 일어나면 onKill() 로 줌 펀치를 넣는다.
 */
export class IntroDirector {
  private t = 0;
  private punch = 0;
  private spawned = false;
  private dodged = false;
  private attackTimer = 0;
  private attackHeld = false;
  private ended = false;
  private frame: IntroFrame;

  constructor(private readonly hooks: IntroHooks) {
    this.frame = introAt(0, hooks.hero());
  }

  /** 현재 게임 시간 배율 (Game.frame 이 시뮬레이션 시간에 곱한다) */
  get timeScale(): number {
    return this.frame.timeScale;
  }

  get time(): number {
    return this.t;
  }

  get shot(): string {
    return this.frame.shot;
  }

  /** 적 처치 순간: 줌 펀치 */
  onKill(): void {
    this.punch = 1;
  }

  /** 매 프레임(실시간 dt) */
  update(dt: number): void {
    if (this.ended) return;
    this.t += dt;
    this.punch = Math.max(0, this.punch - dt * 2.5);
    const hero = this.hooks.hero();
    const f = (this.frame = introAt(this.t, hero, this.punch));
    if (f.shot === 'done') {
      this.finish();
      return;
    }
    if (!this.spawned && this.t >= INTRO_SPAWN_AT) {
      this.spawned = true;
      for (const s of INTRO_SPAWNS) this.hooks.spawn(s.type, s.x, s.z);
    }
    // 이동: 접근 장면에서는 앞으로, 전투 장면에서는 적이 멀면 다가간다
    const near = this.hooks.nearestEnemy();
    if (f.walk) this.hooks.setAxis(0, -1);
    else if (f.attack && near && near.dist > 2.6) this.hooks.setAxis(near.dx * 0.8, near.dz * 0.8);
    else this.hooks.setAxis(0, 0);
    // 공격: 적이 사정거리 안이면 0.45초마다 한 번씩 누른다 (누름 → 다음 프레임 뗌)
    const melee = GameConfig.controls.attackMelee[0];
    if (this.attackHeld) {
      this.hooks.release(melee);
      this.attackHeld = false;
    }
    this.attackTimer -= dt;
    if (f.attack && near && near.dist <= 2.6 && this.attackTimer <= 0) {
      this.hooks.press(melee);
      this.attackHeld = true;
      this.attackTimer = 0.45;
    }
    // 회피 한 번 (슬로 모션 시작)
    if (f.dodge && !this.dodged) {
      this.dodged = true;
      const dodge = GameConfig.controls.dodge[0];
      this.hooks.press(dodge);
      setTimeout(() => this.hooks.release(dodge), 60);
    }
    // 카메라·줌
    const cam = this.hooks.camera;
    cam.position.set(f.cam.x, f.cam.y, f.cam.z);
    cam.lookAt(f.look.x, f.look.y, f.look.z);
    if (Math.abs(cam.fov - f.fov) > 1e-3) {
      cam.fov = f.fov;
      cam.updateProjectionMatrix();
    }
    this.hooks.overlay.set(f.title, f.caption);
  }

  /** 건너뛰기 또는 끝 */
  finish(): void {
    if (this.ended) return;
    this.ended = true;
    if (this.attackHeld) this.hooks.release(GameConfig.controls.attackMelee[0]);
    this.hooks.setAxis(0, 0);
    this.hooks.onEnd();
  }
}
