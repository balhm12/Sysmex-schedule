import * as THREE from 'three';

/**
 * 바닥 표시 두 가지
 * - 목표 표시(ObjectiveMarker): 다음 목표 구역(적이 나타나는 자리) 가운데에 놓는 넓고 아주 투명한 표시.
 *   넓은 바닥 원 + 가장자리 고리 + 낮고 넓은 반투명 기둥(멀리서도 위치가 보이게). 예전의 높이 40 밝은 기둥을 대체한다.
 * - 플레이어 발밑 고리(PlayerRing): 캐릭터가 서 있는 자리를 바닥의 얇은 원으로만 표시한다.
 * 수치는 GameConfig.juice.beacon / juice.playerRing 에서 받는다.
 */
export interface ObjectiveMarkerConfig { radius: number; opacity: number; height: number; color: string }
export interface PlayerRingConfig { radius: number; opacity: number; color: string }

const basic = (color: string, opacity: number, additive = true): THREE.MeshBasicMaterial =>
  new THREE.MeshBasicMaterial({
    color, transparent: true, opacity, side: THREE.DoubleSide, depthWrite: false,
    blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
  });

export class ObjectiveMarker {
  readonly group = new THREE.Group();
  private readonly disc: THREE.Mesh;
  private readonly edge: THREE.Mesh;
  private readonly column: THREE.Mesh;
  private readonly baseOpacity: number;

  constructor(cfg: ObjectiveMarkerConfig) {
    const r = cfg.radius;
    this.baseOpacity = cfg.opacity;
    // 바닥 원: 가운데는 더 옅게(원 전체가 밝으면 캐릭터가 가려 보인다)
    this.disc = new THREE.Mesh(new THREE.CircleGeometry(r, 48), basic(cfg.color, cfg.opacity * 0.5));
    this.disc.rotation.x = -Math.PI / 2;
    this.disc.position.y = 0.04;
    // 가장자리 고리: 위치를 또렷하게 알리는 선
    this.edge = new THREE.Mesh(new THREE.RingGeometry(r * 0.86, r, 64), basic(cfg.color, cfg.opacity * 2));
    this.edge.rotation.x = -Math.PI / 2;
    this.edge.position.y = 0.05;
    // 낮고 넓은 기둥: 위로 갈수록 사라지는 느낌을 위해 아주 옅게
    this.column = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.92, r, cfg.height, 32, 1, true), basic(cfg.color, cfg.opacity * 0.6));
    this.column.position.y = cfg.height / 2;
    this.group.add(this.disc, this.edge, this.column);
    this.group.name = 'Beacon';
    this.group.visible = false;
  }

  /** 목표 위치에 두고 보이게 한다. null 이면 숨김 */
  setTarget(target: { x: number; z: number } | null): void {
    this.group.visible = target !== null;
    if (target) this.group.position.set(target.x, 0, target.z);
  }

  /** 천천히 숨 쉬듯 밝기·고리 크기가 변한다 (nowMs: performance.now()) */
  update(nowMs: number): void {
    if (!this.group.visible) return;
    const s = Math.sin(nowMs * 0.003);
    (this.edge.material as THREE.MeshBasicMaterial).opacity = this.baseOpacity * (2 + 0.8 * s);
    (this.column.material as THREE.MeshBasicMaterial).opacity = this.baseOpacity * (0.6 + 0.25 * s);
    const k = 1 + 0.04 * s;
    this.edge.scale.set(k, k, 1);
  }

  dispose(): void {
    this.group.removeFromParent();
    for (const m of [this.disc, this.edge, this.column]) {
      m.geometry.dispose();
      (m.material as THREE.Material).dispose();
    }
  }
}

/** 플레이어 발밑의 얇은 원. 매 프레임 setPosition 으로 따라간다 */
export class PlayerRing {
  readonly mesh: THREE.Mesh;

  constructor(cfg: PlayerRingConfig) {
    this.mesh = new THREE.Mesh(new THREE.RingGeometry(cfg.radius * 0.8, cfg.radius, 40), basic(cfg.color, cfg.opacity, false));
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.position.y = 0.03;
    this.mesh.name = 'PlayerRing';
    this.mesh.visible = false;
  }

  setPosition(x: number, z: number): void {
    this.mesh.position.set(x, 0.03, z);
  }

  dispose(): void {
    this.mesh.removeFromParent();
    this.mesh.geometry.dispose();
    (this.mesh.material as THREE.Material).dispose();
  }
}
