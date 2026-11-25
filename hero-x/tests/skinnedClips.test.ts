import { describe, expect, it } from 'vitest';
import { resolveClipRoles } from '../src/assets/skinnedClips';

// KayKit Adventurers 기사 모델(player-knight.glb)에 남긴 18개 클립 이름
const KAYKIT = ['Idle', 'Walking_A', 'Running_A', '1H_Melee_Attack_Chop', '1H_Melee_Attack_Slice_Horizontal', '1H_Melee_Attack_Slice_Diagonal', '1H_Melee_Attack_Stab', '2H_Melee_Attack_Spin', '1H_Ranged_Shoot', 'Spellcast_Shoot', 'Dodge_Forward', 'Jump_Full_Short', 'Jump_Idle', 'Jump_Land', 'Hit_A', 'Death_A', 'Cheer', 'PickUp'];

describe('resolveClipRoles (뼈대 모델 클립 역할 매핑)', () => {
  it('KayKit 이름은 정확히 매핑된다 (2H_Melee_Idle 같은 비슷한 이름에 속지 않음)', () => {
    const r = resolveClipRoles(['2H_Melee_Idle', ...KAYKIT]);
    expect(r.idle).toBe('Idle');
    expect(r.walk).toBe('Walking_A');
    expect(r.run).toBe('Running_A');
    expect(r.attack).toEqual(['1H_Melee_Attack_Slice_Horizontal', '1H_Melee_Attack_Slice_Diagonal', '2H_Melee_Attack_Spin']);
    expect(r.ranged).toBe('1H_Ranged_Shoot');
    expect(r.dodge).toBe('Dodge_Forward');
    expect(r.jump).toBe('Jump_Full_Short');
    expect(r.jumpIdle).toBe('Jump_Idle');
    expect(r.hit).toBe('Hit_A');
    expect(r.death).toBe('Death_A');
  });

  it('일반 키워드 이름(Mixamo 식)도 찾고, 없는 역할은 null', () => {
    const r = resolveClipRoles(['idle', 'walk', 'attack01', 'die']);
    expect(r.idle).toBe('idle');
    expect(r.walk).toBe('walk');
    expect(r.run).toBe('walk'); // 달리기가 없으면 걷기로 대신
    expect(r.attack).toEqual(['attack01', 'attack01', 'attack01']);
    expect(r.death).toBe('die');
    expect(r.dodge).toBeNull();
    expect(r.hit).toBeNull();
    expect(r.ranged).toBeNull();
  });

  it('클립이 하나도 없으면 전부 null/빈 배열', () => {
    const r = resolveClipRoles([]);
    expect(r.idle).toBeNull();
    expect(r.attack).toEqual([]);
  });
});
