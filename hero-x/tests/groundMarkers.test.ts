import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { ObjectiveMarker, PlayerRing } from '../src/render/groundMarkers';
import { GameConfig } from '../src/game/GameConfig';

const maxHeight = (root: THREE.Object3D): number => {
  root.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(root);
  return box.max.y;
};
const maxOpacity = (root: THREE.Object3D): number => {
  let m = 0;
  root.traverse((o) => {
    if (o instanceof THREE.Mesh) m = Math.max(m, (o.material as THREE.MeshBasicMaterial).opacity);
  });
  return m;
};

describe('목표 바닥 표시(ObjectiveMarker)', () => {
  it('높은 기둥이 아니라 넓고 낮은 표시다 (높이 ≤ 설정, 반지름 = 설정)', () => {
    const cfg = GameConfig.juice.beacon;
    const marker = new ObjectiveMarker(cfg);
    marker.setTarget({ x: 3, z: -4 });
    const box = new THREE.Box3().setFromObject(marker.group);
    expect(maxHeight(marker.group)).toBeLessThanOrEqual(cfg.height + 0.01);
    expect(box.max.x - box.min.x).toBeCloseTo(cfg.radius * 2, 1);
    expect(marker.group.position.x).toBe(3);
    expect(marker.group.position.z).toBe(-4);
    expect(marker.group.visible).toBe(true);
    marker.dispose();
  });
  it('모든 재질이 옅다(투명도 ≤ 기본값×2.8) 이고 숨 쉬듯 변해도 범위를 넘지 않는다', () => {
    const cfg = GameConfig.juice.beacon;
    const marker = new ObjectiveMarker(cfg);
    marker.setTarget({ x: 0, z: 0 });
    for (let t = 0; t < 4000; t += 97) {
      marker.update(t);
      expect(maxOpacity(marker.group)).toBeLessThanOrEqual(cfg.opacity * 2.8 + 1e-6);
    }
    expect(cfg.opacity * 2.8).toBeLessThan(0.5);
    marker.setTarget(null);
    expect(marker.group.visible).toBe(false);
    marker.dispose();
  });
});

describe('플레이어 발밑 고리(PlayerRing)', () => {
  it('바닥에 납작한 고리이고 위치를 따라간다', () => {
    const ring = new PlayerRing(GameConfig.juice.playerRing);
    ring.setPosition(5, 7);
    expect(ring.mesh.position.x).toBe(5);
    expect(ring.mesh.position.z).toBe(7);
    expect(ring.mesh.position.y).toBeLessThan(0.1);
    expect(ring.mesh.geometry).toBeInstanceOf(THREE.RingGeometry);
    ring.dispose();
  });
});
