import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { GameConfig } from '../src/game/GameConfig';
import { createHeroModel } from '../src/player/models/HeroModel';
import type { PlayerModelState } from '../src/player/models/PlaceholderModel';

const base: PlayerModelState = { moving: false, speed: 0, attack: null, airborne: false, dead: false };

describe('HeroModel (매끈한 카툰 아들 캐릭터)', () => {
  it('머리·몸통·팔다리·검이 있고 키가 약 1.9', () => {
    const m = createHeroModel(GameConfig.player.colors);
    expect(m.root.name).toBe('HeroChibi');
    let meshes = 0;
    let sword: THREE.Object3D | null = null;
    m.root.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) meshes++;
      if (o.name === 'HeroSword') sword = o;
    });
    expect(meshes).toBeGreaterThan(60);
    expect(sword).not.toBeNull();
    const box = new THREE.Box3().setFromObject(m.root);
    expect(box.max.y - box.min.y).toBeGreaterThan(1.7);
    expect(box.max.y - box.min.y).toBeLessThan(2.6); // 머리카락 삐침·외곽선 껍데기 포함
    expect(box.min.y).toBeGreaterThan(-0.05); // 발이 땅(0)에 닿음
    m.dispose();
  });

  it('모든 상태(정지·걷기·공격 3단·원거리·회피·점프·피격·사망)로 갱신해도 예외가 없다', () => {
    const m = createHeroModel(GameConfig.player.colors);
    const states: PlayerModelState[] = [
      base,
      { ...base, moving: true, speed: 7 },
      { ...base, attack: 0.3, attackKind: 'melee', attackStep: 0, attackDuration: 0.22 },
      { ...base, attack: 0.6, attackKind: 'melee', attackStep: 1 },
      { ...base, attack: 0.9, attackKind: 'melee', attackStep: 2 },
      { ...base, attack: 0.5, attackKind: 'ranged' },
      { ...base, dashing: true, moving: true, speed: 20 },
      { ...base, airborne: true },
      { ...base, hurt: 0.8 },
      { ...base, dead: true },
    ];
    for (const s of states) for (let i = 0; i < 5; i++) m.update(0.05, s);
    expect(Number.isFinite(m.root.position.y)).toBe(true);
    m.dispose();
  });

  it('장비 외형이 손·몸통에 붙고 기본 검은 숨으며, 없애면 다시 보인다', () => {
    const m = createHeroModel(GameConfig.player.colors);
    const names = () => { const out: string[] = []; m.root.traverse((o) => { if (/^(Weapon|Armor)-/.test(o.name)) out.push(o.name); }); return out; };
    const sword = () => { let s: THREE.Object3D | null = null; m.root.traverse((o) => { if (o.name === 'HeroSword') s = o; }); return s!; };
    m.setEquipment!({ melee: { look: 'axe', color: '#ff7a45', rarityColor: '#5b8dff' }, ranged: { look: 'bow', color: '#ffd23f', rarityColor: '#c77dff' }, armor: { look: 'plate', color: '#b8c4d6', rarityColor: '#ffc531' } });
    expect(names().sort()).toEqual(['Armor-plate', 'Weapon-axe', 'Weapon-bow']);
    expect(sword().visible).toBe(false);
    m.setEquipment!({ melee: null, ranged: null, armor: null });
    expect(names()).toEqual([]);
    expect(sword().visible).toBe(true);
    m.dispose();
  });
});
