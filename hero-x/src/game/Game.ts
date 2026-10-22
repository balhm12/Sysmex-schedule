import * as THREE from 'three';
import { Dungeon01 } from '../dungeon/Dungeon01';
import { InputManager } from '../input/InputManager';
import { Player } from '../player/Player';
import { PlayerController } from '../player/PlayerController';
import { createPlaceholderModel } from '../player/models/PlaceholderModel';
import { ControlsGuide } from '../ui/ControlsGuide';
import { Logger } from '../utils/Logger';
import { CameraController } from './CameraController';
import { GameConfig, sanitizeGameConfig } from './GameConfig';

/** 테스트·디버그용으로 밖에서 읽을 수 있는 상태 */
export interface GameDebugState {
  running: boolean;
  frames: number;
  player: { x: number; z: number; facing: number; moving: boolean };
  camera: { x: number; y: number; z: number };
  guideVisible: boolean;
}

/**
 * 게임 본체: 렌더러·씬·카메라를 만들고, 각 시스템(던전, 플레이어, 입력, 카메라, UI)을 연결해 매 프레임 갱신한다.
 * - 새로운 시스템(적, 전투, 아이템 등)은 이 클래스에 '추가'하는 방식으로 붙인다. 기존 시스템은 서로 직접 참조하지 않는다.
 */
export class Game {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera: THREE.PerspectiveCamera;
  private readonly input = new InputManager();
  private readonly dungeon: Dungeon01;
  private readonly player: Player;
  private readonly controller: PlayerController;
  private readonly cameraCtrl: CameraController;
  private readonly guide: ControlsGuide;

  private running = false;
  private rafId = 0;
  private lastTime = 0;
  private frames = 0;
  private fpsFrames = 0;
  private fpsTime = 0;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    uiRoot: HTMLElement,
  ) {
    // 설정값 검증 (범위를 벗어난 값은 보정하고 알린다)
    for (const w of sanitizeGameConfig(GameConfig)) {
      Logger.warn(`설정 '${w.path}' 값 ${w.from} 은(는) 허용 범위를 벗어나 ${w.to} 로 보정했습니다.`);
    }

    const g = GameConfig.graphics;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: g.antialias, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, g.maxPixelRatio));
    this.renderer.shadowMap.enabled = g.shadows;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    const c = GameConfig.camera;
    this.camera = new THREE.PerspectiveCamera(c.fov, 1, c.near, c.far);

    // 시스템 구성
    this.dungeon = new Dungeon01(this.scene);
    this.player = new Player(createPlaceholderModel(GameConfig.player.colors), GameConfig.player.startPosition);
    this.scene.add(this.player.object3d);
    this.cameraCtrl = new CameraController(this.camera);
    this.controller = new PlayerController(this.player, this.input, this.dungeon, () => this.cameraCtrl.getYaw());
    this.guide = new ControlsGuide(uiRoot, () => this.canvas.focus());

    // 입력 연결
    this.input.attach();
    this.input.onPress(GameConfig.controls.toggleGuide, () => this.guide.toggle());

    window.addEventListener('resize', this.resize);
    this.resize();
    Logger.info(`${GameConfig.meta.title} v${GameConfig.meta.version} 준비 완료`);
  }

  /** 게임 루프 시작 */
  start(): void {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    this.rafId = requestAnimationFrame(this.loop);
  }

  /** 게임 루프 정지 */
  stop(): void {
    this.running = false;
    cancelAnimationFrame(this.rafId);
  }

  /** 모든 자원 정리 (페이지를 떠나거나 게임을 완전히 종료할 때) */
  dispose(): void {
    this.stop();
    this.input.detach();
    window.removeEventListener('resize', this.resize);
    this.player.dispose();
    this.dungeon.dispose();
    this.renderer.dispose();
  }

  /** 플레이어를 지정한 위치로 옮긴다 (테스트·디버그용, 나중에 리스폰·순간이동에도 사용) */
  setPlayerPosition(x: number, z: number): void {
    this.player.position.set(x, 0, z);
  }

  /** 테스트·디버그용 상태 */
  getDebugState(): GameDebugState {
    const p = this.player.position;
    const cam = this.camera.position;
    return {
      running: this.running,
      frames: this.frames,
      player: { x: p.x, z: p.z, facing: this.player.facing, moving: this.player.moving },
      camera: { x: cam.x, y: cam.y, z: cam.z },
      guideVisible: this.guide.visible,
    };
  }

  /** 매 프레임 갱신 */
  private readonly loop = (now: number): void => {
    if (!this.running) return;
    this.rafId = requestAnimationFrame(this.loop);

    // 탭을 오래 비웠다 돌아와도 한 번에 크게 움직이지 않도록 dt 상한을 둔다
    const dt = Math.min(0.05, (now - this.lastTime) / 1000);
    this.lastTime = now;

    this.controller.update(dt);
    this.player.update(dt);
    this.cameraCtrl.update(dt, this.player.position);
    this.dungeon.updateLight(this.player.position);

    this.renderer.render(this.scene, this.camera);
    this.frames++;
    this.updateFps(dt);
  };

  /** FPS 표시 (0.5초마다 갱신) */
  private updateFps(dt: number): void {
    if (!GameConfig.debug.showFps) return;
    this.fpsFrames++;
    this.fpsTime += dt;
    if (this.fpsTime >= 0.5) {
      this.guide.setHudText(`FPS ${Math.round(this.fpsFrames / this.fpsTime)}`);
      this.fpsFrames = 0;
      this.fpsTime = 0;
    }
  }

  /** 창 크기 변경에 맞춰 렌더러와 카메라를 조정 */
  private readonly resize = (): void => {
    const w = this.canvas.clientWidth || window.innerWidth;
    const h = this.canvas.clientHeight || window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  };
}
