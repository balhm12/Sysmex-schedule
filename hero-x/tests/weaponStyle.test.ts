import { describe, expect, it } from 'vitest';
import { GameConfig } from '../src/game/GameConfig';
import { ITEM_TEMPLATES, createItem } from '../src/items/ItemDatabase';
import { DEFAULT_STYLE, meleeComboFor, styleLabelFor, weaponStyleFor } from '../src/items/weaponStyle';

const tpl = (id: string) => ITEM_TEMPLATES.find((t) => t.id === id)!;

describe('weaponStyleFor (장착 무기 → 공격 방식)', () => {
  it('무기가 없으면 기본 방식(근접 sword, 원거리 blaster)', () => {
    expect(weaponStyleFor('melee', null)).toBe(GameConfig.combat.weaponStyles[DEFAULT_STYLE.melee]);
    expect(weaponStyleFor('ranged', undefined)).toBe(GameConfig.combat.weaponStyles[DEFAULT_STYLE.ranged]);
  });

  it('도끼는 2단 강타, 창은 4단 찌르기, 라이플은 관통탄', () => {
    expect(weaponStyleFor('melee', createItem(tpl('axe_heavy'), 'common')).melee?.steps.length).toBe(2);
    expect(weaponStyleFor('melee', createItem(tpl('spear_crystal'), 'rare')).melee?.steps.length).toBe(4);
    expect(weaponStyleFor('ranged', createItem(tpl('rifle_rail'), 'epic')).ranged?.pierce).toBe(3);
    expect(weaponStyleFor('ranged', createItem(tpl('bow_photon'), 'common')).ranged?.count).toBe(3);
  });

  it('표에 없는 방식이나 종류가 안 맞는 방식은 기본으로 돌아간다', () => {
    const odd = { ...createItem(tpl('sword_basic'), 'common'), style: 'nope' };
    expect(weaponStyleFor('melee', odd).label).toBe(GameConfig.combat.weaponStyles.sword.label);
    // 근접 무기 칸에 원거리 방식 키가 들어가도 근접 기본
    const wrong = { ...createItem(tpl('sword_basic'), 'common'), style: 'cannon' };
    expect(weaponStyleFor('melee', wrong).label).toBe(GameConfig.combat.weaponStyles.sword.label);
  });

  it('장비 화면 꼬리표는 무기에만 붙는다', () => {
    expect(styleLabelFor(createItem(tpl('hammer_pulse'), 'common'))).toContain('충격 회전');
    expect(styleLabelFor(createItem(tpl('vest_light'), 'common'))).toBeNull();
  });
});

describe('무기 방식 설정(GameConfig.combat.weaponStyles)', () => {
  it('모든 무기 템플릿의 style 은 표에 있고 분류와 맞으며, 방어구는 look 이 있다', () => {
    for (const t of ITEM_TEMPLATES) {
      if (t.category === 'melee' || t.category === 'ranged') {
        expect(t.style, `${t.id} 에 style 없음`).toBeDefined();
        const st = GameConfig.combat.weaponStyles[t.style!];
        expect(st, `${t.id} 의 style '${t.style}' 이 표에 없음`).toBeDefined();
        expect(t.category === 'melee' ? st.melee : st.ranged, `${t.id} 의 방식이 분류와 안 맞음`).toBeDefined();
      }
      if (t.category === 'armor') expect(['vest', 'plate', 'suit', 'cloak']).toContain(t.look);
    }
  });

  it('근접 방식은 2단계 이상이고 마지막 단계가 가장 세며, 기본 콤보는 melee.combo 와 같다', () => {
    for (const [key, st] of Object.entries(GameConfig.combat.weaponStyles)) {
      if (!st.melee) continue;
      const steps = st.melee.steps;
      expect(steps.length, key).toBeGreaterThanOrEqual(2);
      const last = steps[steps.length - 1];
      for (const s of steps) expect(last.damageMul, key).toBeGreaterThanOrEqual(s.damageMul);
      expect(st.melee.window).toBeGreaterThan(0.2);
      expect(meleeComboFor(st).steps).toBe(steps);
    }
    expect(GameConfig.combat.weaponStyles.sword.melee!.steps).toEqual(GameConfig.combat.melee.combo.steps);
  });

  it('원거리 방식은 탄 수 1 이상, 배율 양수, 관통 0 이상', () => {
    for (const [key, st] of Object.entries(GameConfig.combat.weaponStyles)) {
      if (!st.ranged) continue;
      const r = st.ranged;
      expect(r.count, key).toBeGreaterThanOrEqual(1);
      for (const v of [r.speedMul, r.radiusMul, r.cooldownMul, r.lifetimeMul, r.knockbackMul]) expect(v, key).toBeGreaterThan(0);
      expect(r.pierce, key).toBeGreaterThanOrEqual(0);
      expect(r.color).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });
});
