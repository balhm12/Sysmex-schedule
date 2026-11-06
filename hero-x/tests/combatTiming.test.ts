import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { CombatSystem } from '../src/combat/CombatSystem';
import type { Effects } from '../src/combat/Effects';
import type { ProjectileSystem } from '../src/combat/Projectile';
import type { Enemy } from '../src/enemies/Enemy';
import { GameConfig } from '../src/game/GameConfig';
import type { InputManager } from '../src/input/InputManager';
import type { Player } from '../src/player/Player';

/** 최소 가짜 객체들: 근접 판정의 '시점'만 본다 */
function setup() {
  const pressHandlers: Record<string, () => void> = {};
  const input = {
    onPress: (codes: string[], fn: () => void) => { pressHandlers[codes[0]] = fn; },
    isActionDown: () => false,
  } as unknown as InputManager;
  const player = {
    position: new THREE.Vector3(0, 0, 0),
    facing: 0,
    health: { isDead: false },
    triggerAttack: () => {},
  } as unknown as Player;
  const hits: number[] = [];
  const enemy = {
    alive: true,
    position: new THREE.Vector3(0, 0, 1.2),
    radius: 0.5,
    def: { color: '#fff', score: 10 },
    type: 'rusher',
    hit: (dmg: number) => { hits.push(dmg); return true; },
  } as unknown as Enemy;
  const effects = { swing() {}, slash() {}, shockwave() {}, burst() {}, flash() {} } as unknown as Effects;
  const projectiles = { spawn() {} } as unknown as ProjectileSystem;
  const combat = new CombatSystem(player, input, () => [enemy], () => null, effects, projectiles);
  const press = () => pressHandlers[GameConfig.controls.attackMelee[0]]();
  return { combat, press, hits };
}

describe('근접 타격 시점 (combat.melee.hitFraction)', () => {
  it('누른 직후에는 맞지 않고, 휘두르기 시간 × 비율이 지나면 맞는다', () => {
    const { combat, press, hits } = setup();
    const swing = GameConfig.combat.melee.combo.steps[0].swingTime;
    const delay = swing * GameConfig.combat.melee.hitFraction;
    expect(delay).toBeGreaterThan(0);
    combat.update(0.016); // 입력 핸들러 연결
    press();
    combat.update(0.001); // 공격 시작 (예약)
    expect(combat.attacks).toBe(1);
    expect(hits.length).toBe(0);
    combat.update(delay * 0.5);
    expect(hits.length).toBe(0);
    combat.update(delay * 0.6);
    expect(hits.length).toBe(1);
    expect(hits[0]).toBe(GameConfig.combat.melee.damage);
  });

  it('hitFraction 이 0 이면 누르는 즉시 맞는다', () => {
    const original = GameConfig.combat.melee.hitFraction;
    GameConfig.combat.melee.hitFraction = 0;
    try {
      const { combat, press, hits } = setup();
      combat.update(0.016);
      press();
      combat.update(0.001);
      expect(hits.length).toBe(1);
    } finally {
      GameConfig.combat.melee.hitFraction = original;
    }
  });

  it('재시작(reset)하면 예약된 타격이 사라진다', () => {
    const { combat, press, hits } = setup();
    combat.update(0.016);
    press();
    combat.update(0.001);
    combat.reset();
    combat.update(1);
    expect(hits.length).toBe(0);
  });
});
