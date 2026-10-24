import * as THREE from 'three';

/**
 * 캐릭터용 작은 질감 텍스처 (파일 없이 캔버스로 그린다)
 * - cloth: 씨실·날실이 보이는 천 (코트·바지), leather: 얼룩·주름이 있는 가죽 (장화·벨트·팔 보호대)
 * - 색은 재질 color 가 곱해지므로 밝기 변화만 담는다(회색 계열). 같은 종류는 캐시해 재사용.
 * - 캔버스가 없는 환경(단위 테스트)에서는 null → 재질에 map 을 넣지 않는다.
 */
export type FabricKind = 'cloth' | 'leather';

const cache = new Map<FabricKind, THREE.Texture | null>();

function mulberry(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function fabricTexture(kind: FabricKind): THREE.Texture | null {
  if (cache.has(kind)) return cache.get(kind)!;
  if (typeof document === 'undefined') {
    cache.set(kind, null);
    return null;
  }
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    cache.set(kind, null);
    return null;
  }
  const img = ctx.createImageData(size, size);
  const rnd = mulberry(kind === 'cloth' ? 101 : 202);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let v: number;
      if (kind === 'cloth') {
        // 씨실·날실: 가로·세로 줄무늬를 살짝 겹치고 미세한 잡음
        const weave = ((x % 4 < 2) !== (y % 4 < 2) ? 0.035 : -0.035) + Math.sin(x * 0.9) * 0.012 + Math.sin(y * 0.9) * 0.012;
        v = 0.86 + weave + (rnd() - 0.5) * 0.05;
      } else {
        // 가죽: 큰 얼룩(저주파) + 가는 주름 + 잡음
        const blotch = Math.sin(x * 0.11 + y * 0.07) * Math.cos(y * 0.09 - x * 0.05) * 0.06;
        const crease = Math.abs(Math.sin((x + y * 0.6) * 0.5)) < 0.08 ? -0.06 : 0;
        v = 0.84 + blotch + crease + (rnd() - 0.5) * 0.08;
      }
      const c = Math.max(0, Math.min(255, Math.round(v * 255)));
      const i = (y * size + x) * 4;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = c;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 3);
  tex.colorSpace = THREE.SRGBColorSpace;
  cache.set(kind, tex);
  return tex;
}
