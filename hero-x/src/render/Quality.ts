/**
 * 화질 프리셋 (낮음 / 중간 / 높음)
 * - 설정의 quality 로 고른다. 휴대폰 기본 중간, PC 기본 높음. 자동 화질 조절은 높음 → 중간 → (그림자 끔) → (해상도 ↓) 순으로 내린다.
 * - 값은 RenderPipeline 과 DungeonScene 이 읽는다.
 */
export type QualityLevel = 'low' | 'medium' | 'high';

export interface QualityPreset {
  label: string;
  /** 빛 번짐(블룸) 후처리 */
  bloom: boolean;
  /** 후처리 사용 시 MSAA 표본 수 (WebGL2 만) */
  msaa: number;
  /** 그림자 지도 해상도 */
  shadowMapSize: number;
  /** 바닥 텍스처 선명도 */
  anisotropy: number;
  /** 바닥 요철(노멀맵) 세기 */
  normalScale: number;
}

export const QUALITY_PRESETS: Record<QualityLevel, QualityPreset> = {
  low: { label: '낮음', bloom: false, msaa: 0, shadowMapSize: 1024, anisotropy: 1, normalScale: 0.4 },
  medium: { label: '중간', bloom: false, msaa: 0, shadowMapSize: 2048, anisotropy: 4, normalScale: 0.7 },
  high: { label: '높음', bloom: true, msaa: 4, shadowMapSize: 2048, anisotropy: 8, normalScale: 0.9 },
};

export const QUALITY_ORDER: QualityLevel[] = ['low', 'medium', 'high'];

export function isQualityLevel(v: unknown): v is QualityLevel {
  return typeof v === 'string' && v in QUALITY_PRESETS;
}
