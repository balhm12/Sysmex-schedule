/**
 * 자동 화질 조절 (순수 함수, 테스트 대상)
 * - 플레이 중 프레임(FPS)을 몇 초 동안 재서 낮으면 한 단계씩 화질을 내린다: 높음→중간 → 그림자 끄기 → 해상도 낮추기.
 * - 사용자가 설정 화면에서 값을 바꾸면 그 뒤로는 손대지 않는다 (Game 이 autoQuality 설정으로 관리).
 * - 올리는 방향은 하지 않는다 (올렸다 내렸다 깜빡임 방지). 다음 실행에서 다시 판단한다.
 */
export interface QualityState {
  /** 화질 프리셋 ('high' 면 먼저 'medium' 으로 내린다) */
  quality: 'low' | 'medium' | 'high';
  shadows: boolean;
  resolution: number;
}

export interface QualityDecision {
  next: QualityState;
  /** 사람에게 보여줄 안내 (바뀐 것이 없으면 null) */
  message: string | null;
}

/** 표본 FPS 평균이 threshold 미만이면 한 단계 낮춘다 */
export function decideQuality(fpsSamples: number[], current: QualityState, threshold = 30, minResolution = 0.5): QualityDecision {
  if (fpsSamples.length === 0) return { next: current, message: null };
  const avg = fpsSamples.reduce((a, b) => a + b, 0) / fpsSamples.length;
  if (avg >= threshold) return { next: current, message: null };
  if (current.quality === 'high') return { next: { ...current, quality: 'medium' }, message: `화면이 끊겨(평균 ${Math.round(avg)} FPS) 화질을 '중간'으로 낮췄습니다` };
  if (current.shadows) return { next: { ...current, shadows: false }, message: `화면이 끊겨(평균 ${Math.round(avg)} FPS) 그림자를 껐습니다` };
  const lowered = Math.round(Math.max(minResolution, current.resolution - 0.2) * 10) / 10;
  if (lowered < current.resolution) return { next: { ...current, resolution: lowered }, message: `화면이 끊겨(평균 ${Math.round(avg)} FPS) 해상도를 ${lowered.toFixed(1)}× 로 낮췄습니다` };
  return { next: current, message: null };
}
