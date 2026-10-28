import { describe, expect, it } from 'vitest';
import { isFinisher, nextComboStep, sweepSign } from '../src/combat/combo';
import { GameConfig } from '../src/game/GameConfig';

describe('nextComboStep (근접 콤보 단계)', () => {
  it('처음 누르면 1단계(0)', () => {
    expect(nextComboStep(-1, false, 3)).toBe(0);
  });

  it('이어가기 시간 안에 다시 누르면 다음 단계로', () => {
    expect(nextComboStep(0, true, 3)).toBe(1);
    expect(nextComboStep(1, true, 3)).toBe(2);
  });

  it('이어가기 시간을 놓치면 1단계로 돌아간다', () => {
    expect(nextComboStep(1, false, 3)).toBe(0);
  });

  it('마지막 단계(마무리) 뒤에는 시간 안에 눌러도 1단계로', () => {
    expect(nextComboStep(2, true, 3)).toBe(0);
  });

  it('단계가 하나뿐이면 항상 0', () => {
    expect(nextComboStep(0, true, 1)).toBe(0);
    expect(nextComboStep(0, true, 0)).toBe(0);
  });

  it('마무리 판정은 마지막 단계만, 단계가 하나면 없음', () => {
    expect(isFinisher(2, 3)).toBe(true);
    expect(isFinisher(1, 3)).toBe(false);
    expect(isFinisher(0, 1)).toBe(false);
  });
});

describe('콤보 설정(GameConfig.combat.melee.combo)', () => {
  const combo = GameConfig.combat.melee.combo;

  it('2단계 이상이고 첫 단계는 기본 베기(배율 1)', () => {
    expect(combo.steps.length).toBe(5); // 5연격 (v1.31.0)
    expect(combo.shock.stun).toBeGreaterThan(0);
    expect(combo.shock.bossMul).toBeLessThanOrEqual(1);
    expect(combo.steps[0].damageMul).toBe(1);
    expect(combo.steps[0].rangeMul).toBe(1);
    expect(combo.steps[0].arcDegrees).toBe(GameConfig.combat.melee.arcDegrees);
  });

  it('단계가 오를수록 피해 배율이 오르고, 마무리는 한 바퀴(360도) 회전 베기이며 대기가 길다', () => {
    for (let i = 1; i < combo.steps.length; i++) expect(combo.steps[i].damageMul).toBeGreaterThan(combo.steps[i - 1].damageMul);
    const last = combo.steps[combo.steps.length - 1];
    expect(last.sweep).toBe('spin');
    expect(last.arcDegrees).toBe(360);
    expect(last.cooldownMul).toBeGreaterThan(1);
  });

  it('모든 단계 값은 양수이고 색은 #rrggbb, 방향은 셋 중 하나', () => {
    for (const st of combo.steps) {
      for (const v of [st.damageMul, st.rangeMul, st.arcDegrees, st.swingTime, st.cooldownMul, st.knockbackMul]) expect(v).toBeGreaterThan(0);
      expect(st.color).toMatch(/^#[0-9a-f]{6}$/i);
      expect(['right', 'left', 'spin']).toContain(st.sweep);
      expect([1, -1, 0]).toContain(sweepSign(st));
    }
    expect(sweepSign(combo.steps[0])).toBe(1);
  });

  it('이어가기 시간은 쿨다운보다 길어서 사람이 연타할 수 있다', () => {
    expect(combo.window).toBeGreaterThan(0.2);
  });
});
