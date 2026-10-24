import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { GameConfig } from '../src/game/GameConfig';
import type { EnemyModelState } from '../src/enemies/EnemyModels';
import { createSmoothBossModel } from '../src/enemies/SmoothBossModels';
import { createSmoothEnemyModel } from '../src/enemies/SmoothEnemyModels';
import { bossTypeConfig } from '../src/enemies/Boss';

const states: EnemyModelState[] = [
  { state: 'idle', moving: false, windup: 0, death: 0 },
  { state: 'chase', moving: true, windup: 0, death: 0 },
  { state: 'windup', moving: false, windup: 0.5, death: 0 },
  { state: 'windup', moving: false, windup: 1, death: 0 },
  { state: 'charge', moving: true, windup: 0, death: 0 },
  { state: 'hurt', moving: false, windup: 0, death: 0 },
  { state: 'dead', moving: false, windup: 0, death: 0.5 },
];

describe('매끈한 적 모델 (SmoothEnemyModels)', () => {
  it('모든 종류와 로봇 외형이 만들어지고, 키가 반지름의 1.5~4배이며, 모든 상태로 갱신·피격·정리해도 예외가 없다', () => {
    const types = Object.keys(GameConfig.enemies.types);
    expect(types.length).toBe(10);
    const skins = ['rusher', 'shooter', 'tank', 'stalker', 'artillery', 'bomber'].map((t) => `robot-${t}`);
    const cases: Array<[string, string | undefined]> = [...types.map((t): [string, undefined] => [t, undefined]), ...skins.map((s): [string, string] => [s.slice(6), s])];
    for (const [type, skin] of cases) {
      const def = GameConfig.enemies.types[type];
      const m = createSmoothEnemyModel(type, def, skin);
      expect(m.root.name).toBe(`Enemy-${def.name}`);
      let meshes = 0;
      m.root.traverse((o) => { if ((o as THREE.Mesh).isMesh) meshes++; });
      expect(meshes, type).toBeGreaterThan(8);
      m.update(0.05, states[0]);
      const box = new THREE.Box3().setFromObject(m.root);
      const h = box.max.y - box.min.y;
      expect(h, `${type}${skin ? '/' + skin : ''} 키`).toBeGreaterThan(def.radius * 1.5);
      expect(h, `${type}${skin ? '/' + skin : ''} 키`).toBeLessThan(def.radius * 4.2);
      for (const s of states) for (let i = 0; i < 3; i++) m.update(0.05, s);
      m.flash();
      m.update(0.05, states[0]);
      m.update(0.2, states[0]);
      m.dispose();
    }
  });
});

describe('매끈한 보스 모델 (SmoothBossModels)', () => {
  it('4종 모두 만들어지고 패턴·2단계·사망 상태로 갱신해도 예외가 없다', () => {
    for (const kind of ['guardian', 'golem', 'commander', 'frost'] as const) {
      const def = bossTypeConfig({ ...GameConfig.boss, model: kind });
      const m = createSmoothBossModel(def, kind);
      expect(m.root.name).toBe(`Boss-${def.name}`);
      let meshes = 0;
      m.root.traverse((o) => { if ((o as THREE.Mesh).isMesh) meshes++; });
      expect(meshes, kind).toBeGreaterThan(12);
      const box = new THREE.Box3().setFromObject(m.root);
      expect(box.max.y - box.min.y).toBeGreaterThan(def.radius * 2);
      for (const pattern of ['charge', 'slam', 'barrage', 'summon', 'mortar', null] as const) {
        for (const phase2 of [false, true]) {
          m.update(0.05, { state: 'windup', moving: false, windup: 0.7, death: 0, pattern, phase2 } as EnemyModelState);
          m.update(0.05, { state: 'chase', moving: true, windup: 0, death: 0, pattern, phase2 } as EnemyModelState);
        }
      }
      m.flash();
      m.update(0.2, states[0]);
      m.update(0.05, states[6]);
      m.dispose();
    }
  });
});
