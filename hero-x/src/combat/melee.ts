import type { Vec2 } from '../player/movement';

/**
 * 근접 공격 판정 (순수 함수)
 * - 공격자 위치(origin)에서 바라보는 방향(facing) 기준으로, 부채꼴(range, arcDegrees) 안에 대상이 있는지 판단한다.
 * - 대상의 반지름(targetRadius)을 고려해 가장자리만 걸려도 맞은 것으로 본다.
 */
export function isInMeleeArc(
  origin: Vec2,
  facing: number,
  target: Vec2,
  targetRadius: number,
  range: number,
  arcDegrees: number,
): boolean {
  const dx = target.x - origin.x;
  const dz = target.z - origin.z;
  const dist = Math.hypot(dx, dz);
  if (dist - targetRadius > range) return false;
  if (dist < 1e-6) return true;

  const angleToTarget = Math.atan2(dx, dz);
  let diff = angleToTarget - facing;
  while (diff > Math.PI) diff -= Math.PI * 2;
  while (diff < -Math.PI) diff += Math.PI * 2;

  // 대상이 클수록 각도 여유를 준다
  const extra = Math.atan2(targetRadius, dist);
  const halfArc = (arcDegrees * Math.PI) / 180 / 2;
  return Math.abs(diff) <= halfArc + extra;
}
