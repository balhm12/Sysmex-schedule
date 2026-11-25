/**
 * 화면 비율에 따른 카메라 세로 시야각 계산 (순수 함수, 테스트 대상)
 * - three.js 의 fov 는 '세로' 각도라 화면이 옆으로 길수록(휴대폰 가로 21:9 등) 가로 시야가 함께 커져 캐릭터가 작게 보인다.
 * - 가로 시야각이 maxHorizontalFov 를 넘지 않도록 세로 fov 를 줄인다 → 넓은 화면에서는 자동으로 줌인된다.
 *   (16:9 에서 세로 50° 는 가로 약 80°. 상한을 80° 로 두면 16:9 까지는 그대로, 그보다 넓으면 좁힌다)
 */
export function verticalFovFor(aspect: number, baseFov: number, maxHorizontalFov: number): number {
  if (!(aspect > 0) || !(baseFov > 0)) return baseFov;
  const toRad = Math.PI / 180;
  const h = 2 * Math.atan(Math.tan((baseFov * toRad) / 2) * aspect);
  const maxH = maxHorizontalFov * toRad;
  if (h <= maxH) return baseFov;
  return (2 * Math.atan(Math.tan(maxH / 2) / aspect)) / toRad;
}

/** 지금 세로 fov 에서의 가로 시야각(도) */
export function horizontalFov(aspect: number, verticalFov: number): number {
  const toRad = Math.PI / 180;
  return (2 * Math.atan(Math.tan((verticalFov * toRad) / 2) * aspect)) / toRad;
}
