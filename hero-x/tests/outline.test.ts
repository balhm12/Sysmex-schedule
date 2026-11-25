import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { addOutlines, applyOutlineMode, outlineVisibleFor, setOutlineMode } from '../src/render/outline';
import { createHeroModel } from '../src/player/models/HeroModel';
import { createSmoothEnemyModel } from '../src/enemies/SmoothEnemyModels';
import { GameConfig } from '../src/game/GameConfig';
import { glow, pbr } from '../src/render/materials';

const countOutlines = (root: THREE.Object3D, onlyVisible = false) => { let n = 0; root.traverse((o) => { if (o.userData.outline && (!onlyVisible || o.visible)) n++; }); return n; };

describe('툰 외곽선 (addOutlines / applyOutlineMode)', () => {
  it('보통 메시에는 뒤집힌 껍데기가 붙고, 발광·반투명·작은 메시는 건너뛴다', () => {
    setOutlineMode('all');
    const root = new THREE.Group();
    const big = new THREE.Mesh(new THREE.SphereGeometry(0.4, 8, 6), pbr({ color: 0xff0000 }));
    const tiny = new THREE.Mesh(new THREE.SphereGeometry(0.02, 8, 6), pbr({ color: 0xff0000 }));
    const gem = new THREE.Mesh(new THREE.SphereGeometry(0.3, 8, 6), glow(0x00ff00, 2));
    const glass = new THREE.Mesh(new THREE.SphereGeometry(0.3, 8, 6), new THREE.MeshStandardMaterial({ transparent: true, opacity: 0.3 }));
    root.add(big, tiny, gem, glass);
    root.updateMatrixWorld(true);
    expect(addOutlines(root, 0.02, 'hero')).toBe(1);
    const shell = big.children[0] as THREE.Mesh;
    expect(shell.userData.outline).toBe('hero');
    expect((shell.material as THREE.MeshBasicMaterial).side).toBe(THREE.BackSide);
    expect(shell.scale.x).toBeCloseTo(1 + 0.02 / 0.4, 3);
    expect(shell.geometry).toBe(big.geometry); // 기하 공유 (메모리 절약)
    // 두 번 불러도 중복으로 붙지 않는다
    expect(addOutlines(root, 0.02, 'hero')).toBe(0);
  });

  it('모드에 따라 주인공/적 외곽선이 보이거나 숨는다', () => {
    expect(outlineVisibleFor('hero', 'none')).toBe(false);
    expect(outlineVisibleFor('hero', 'hero')).toBe(true);
    expect(outlineVisibleFor('enemy', 'hero')).toBe(false);
    expect(outlineVisibleFor('enemy', 'all')).toBe(true);
    const scene = new THREE.Group();
    setOutlineMode('all');
    const hero = createHeroModel(GameConfig.player.colors);
    const goblin = createSmoothEnemyModel('rusher', GameConfig.enemies.types.rusher);
    scene.add(hero.root, goblin.root);
    expect(countOutlines(hero.root)).toBeGreaterThan(20);
    expect(countOutlines(goblin.root)).toBeGreaterThan(5);
    applyOutlineMode(scene, 'hero');
    expect(countOutlines(hero.root, true)).toBe(countOutlines(hero.root));
    expect(countOutlines(goblin.root, true)).toBe(0);
    applyOutlineMode(scene, 'none');
    expect(countOutlines(scene, true)).toBe(0);
    // 모드가 'none' 인 상태에서 새로 만든 적은 외곽선이 숨겨진 채로 만들어진다
    const later = createSmoothEnemyModel('slime', GameConfig.enemies.types.slime);
    expect(countOutlines(later.root, true)).toBe(0);
    applyOutlineMode(scene, 'all');
    hero.dispose();
    goblin.dispose();
    later.dispose();
  });
});
