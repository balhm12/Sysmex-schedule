import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { Effects } from '../src/combat/Effects';
import { Enemy, type EnemyContext } from '../src/enemies/Enemy';
import { Boss } from '../src/enemies/Boss';
import { createSmoothEnemyModel } from '../src/enemies/SmoothEnemyModels';
import { GameConfig } from '../src/game/GameConfig';

const world = { getObstacleBoxes: () => [], getArenaBounds: () => ({ halfX: 50, halfZ: 50 }) };
const ctx = (onShockDamage?: EnemyContext['onShockDamage']): EnemyContext => ({ playerPos: { x: 0, z: 0 }, world, others: [], onAttackPlayer: () => {}, onShockDamage });

describe('감전 번개 효과(Effects.lightning)', () => {
  it('가닥 수만큼 생기고 시간이 지나면 사라진다', () => {
    const fx = new Effects(new THREE.Scene(), 8);
    fx.lightning(new THREE.Vector3(1, 0.05, 2), 0.8, 1.5, 4, 0.5, '#9ff3ff');
    expect(fx.boltCount).toBe(4);
    expect(fx.activeCount).toBeGreaterThanOrEqual(5); // 번개 4 + 섬광 1
    fx.update(0.3);
    expect(fx.boltCount).toBe(4);
    fx.update(0.3);
    expect(fx.boltCount).toBe(0);
    fx.dispose();
  });
  it('가닥 수 0 이면 아무것도 만들지 않는다', () => {
    const fx = new Effects(new THREE.Scene(), 8);
    fx.lightning(new THREE.Vector3(), 1, 1, 0, 1, '#fff');
    expect(fx.activeCount).toBe(0);
    fx.dispose();
  });
});

describe('적 감전(Enemy.shock)', () => {
  const def = GameConfig.enemies.types.rusher;
  const make = () => new Enemy('rusher', def, { x: 5, z: 0 }, { hp: 1, speed: 1 }, (t, d) => createSmoothEnemyModel(t, d));

  it('감전 중에는 움직이지 않고, 끝나면 다시 플레이어 쪽으로 간다', () => {
    const e = make();
    e.shock(0.5);
    expect(e.shocked).toBe(true);
    for (let i = 0; i < 10; i++) e.update(0.04, ctx());
    expect(e.position.x).toBeCloseTo(5, 3);
    expect(e.shocked).toBe(true);
    for (let i = 0; i < 20; i++) e.update(0.05, ctx());
    expect(e.shocked).toBe(false);
    expect(e.position.x).toBeLessThan(5);
  });
  it('초당 추가 피해를 1 단위로 모아 onShockDamage 로 준다', () => {
    const e = make();
    let total = 0;
    e.shock(1, 10);
    for (let i = 0; i < 20; i++) e.update(0.05, ctx((_, d) => (total += d)));
    expect(total).toBeGreaterThanOrEqual(9);
    expect(total).toBeLessThanOrEqual(10);
  });
  it('죽은 적은 감전되지 않고, 보스는 bossMul 배로 짧게 멈춘다', () => {
    const e = make();
    e.hit(99999, { x: 1, z: 0 }, 0);
    e.shock(1);
    expect(e.shocked).toBe(false);
    const b = new Boss({ x: 6, z: 0 }, { hp: 1, speed: 1 }, GameConfig.boss);
    b.shock(1);
    const mul = GameConfig.combat.melee.combo.shock.bossMul;
    // bossMul 시간 안에는 감전, 그 뒤엔 풀린다
    for (let i = 0; i < Math.floor((mul * 1) / 0.05) - 1; i++) b.update(0.05, ctx());
    expect(b.shocked).toBe(true);
    for (let i = 0; i < 4; i++) b.update(0.05, ctx());
    expect(b.shocked).toBe(false);
    b.dispose();
    e.dispose();
  });
});
