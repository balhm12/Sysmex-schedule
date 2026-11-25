import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { GameConfig } from '../game/GameConfig';
import { QUALITY_PRESETS, type QualityLevel } from './Quality';

/**
 * 렌더 파이프라인
 * - 톤매핑(ACES Filmic)·sRGB 출력·환경광(코드로 만든 실내 환경 맵, 외부 파일 없음)을 한 곳에서 관리한다.
 * - '높음' 화질: EffectComposer(장면 → 블룸 → 출력) + MSAA. 그 외: 렌더러 직접 그리기(안티앨리어싱은 렌더러 기본).
 * - 크기·픽셀 비율이 바뀌면 composer 도 함께 맞춘다.
 */
export class RenderPipeline {
  readonly renderer: THREE.WebGLRenderer;
  private composer: EffectComposer | null = null;
  private bloom: UnrealBloomPass | null = null;
  private quality: QualityLevel = 'medium';
  private readonly pmrem: THREE.PMREMGenerator;
  private envMap: THREE.Texture | null = null;
  private width = 1;
  private height = 1;

  constructor(canvas: HTMLCanvasElement) {
    const g = GameConfig.graphics;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: g.antialias, powerPreference: 'high-performance' });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.shadowMap.enabled = g.shadows;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.pmrem = new THREE.PMREMGenerator(this.renderer);
  }

  /** 환경광 지도: 코드로 만든 실내 환경(RoomEnvironment). 금속·광택 표면이 주변을 비추게 한다 */
  environment(): THREE.Texture {
    if (!this.envMap) {
      this.envMap = this.pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    }
    return this.envMap;
  }

  setExposure(v: number): void {
    this.renderer.toneMappingExposure = v;
  }

  get currentQuality(): QualityLevel {
    return this.quality;
  }

  /** 화질 프리셋 적용 (블룸·MSAA) */
  setQuality(q: QualityLevel): void {
    this.quality = q;
    const p = QUALITY_PRESETS[q];
    if (p.bloom) {
      if (!this.composer) this.buildComposer(p.msaa);
      if (this.bloom) {
        const b = GameConfig.graphics.bloom;
        this.bloom.strength = b.strength;
        this.bloom.radius = b.radius;
        this.bloom.threshold = b.threshold;
      }
    } else if (this.composer) {
      this.composer.dispose();
      this.composer = null;
      this.bloom = null;
    }
  }

  private buildComposer(msaa: number): void {
    const r = this.renderer;
    const samples = r.capabilities.isWebGL2 ? msaa : 0;
    const target = new THREE.WebGLRenderTarget(this.width, this.height, { samples, type: THREE.HalfFloatType });
    this.composer = new EffectComposer(r, target);
    this.composer.setPixelRatio(r.getPixelRatio());
    this.composer.setSize(this.width, this.height);
    // 장면 → 블룸 → 톤매핑·sRGB 출력
    const b = GameConfig.graphics.bloom;
    this.bloom = new UnrealBloomPass(new THREE.Vector2(this.width, this.height), b.strength, b.radius, b.threshold);
    this.composer.addPass(new RenderPass(this.sceneRef ?? new THREE.Scene(), this.cameraRef ?? new THREE.PerspectiveCamera()));
    this.composer.addPass(this.bloom);
    this.composer.addPass(new OutputPass());
  }

  private sceneRef: THREE.Scene | null = null;
  private cameraRef: THREE.Camera | null = null;

  /** 그리기. 후처리가 켜져 있으면 composer 로, 아니면 바로 */
  render(scene: THREE.Scene, camera: THREE.Camera): void {
    if (this.sceneRef !== scene || this.cameraRef !== camera) {
      this.sceneRef = scene;
      this.cameraRef = camera;
      if (this.composer) {
        const rp = this.composer.passes[0] as RenderPass;
        rp.scene = scene;
        rp.camera = camera;
      }
    }
    if (this.composer) this.composer.render();
    else this.renderer.render(scene, camera);
  }

  setSize(w: number, h: number): void {
    this.width = w;
    this.height = h;
    this.renderer.setSize(w, h, false);
    this.composer?.setSize(w, h);
    this.bloom?.setSize(w, h);
  }

  setPixelRatio(r: number): void {
    this.renderer.setPixelRatio(r);
    this.composer?.setPixelRatio(r);
    if (this.composer) this.composer.setSize(this.width, this.height);
  }

  get bloomEnabled(): boolean {
    return this.composer !== null;
  }

  dispose(): void {
    this.composer?.dispose();
    this.envMap?.dispose();
    this.pmrem.dispose();
    this.renderer.dispose();
  }
}
