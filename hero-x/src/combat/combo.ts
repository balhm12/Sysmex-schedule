import type { ComboStepConfig } from '../game/GameConfig';

/**
 * 근접 콤보 단계 계산 (순수 함수 → 테스트 대상)
 * - 한 번 휘두르면 "이어가기 시간"이 흐르기 시작한다. 그 안에 다시 누르면 다음 단계, 놓치면 1단계(0)로 돌아간다.
 * - 마지막 단계(마무리) 뒤에는 시간 안에 눌러도 1단계로 돌아간다.
 */

/** 다음에 나갈 콤보 단계(0부터). current: 마지막으로 나간 단계, chainOpen: 이어가기 시간 안인지 */
export function nextComboStep(current: number, chainOpen: boolean, stepCount: number): number {
  if (stepCount <= 1) return 0;
  if (!chainOpen) return 0;
  return current + 1 >= stepCount ? 0 : current + 1;
}

/** 단계의 베기 방향을 Effects.slash 의 sweep 값으로 (1: 오른→왼, -1: 왼→오른, 0: 한 바퀴) */
export function sweepSign(step: ComboStepConfig): 1 | -1 | 0 {
  return step.sweep === 'right' ? 1 : step.sweep === 'left' ? -1 : 0;
}

/** 마무리 단계인지 (마지막 단계) */
export function isFinisher(index: number, stepCount: number): boolean {
  return stepCount > 1 && index === stepCount - 1;
}
