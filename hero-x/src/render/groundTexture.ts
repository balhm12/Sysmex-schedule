import * as THREE from 'three';

/**
 * 바닥 텍스처를 코드로 만든다 (외부 이미지 없음)
 * - 값 노이즈(value noise) 여러 겹으로 흙·풀·돌의 얼룩을 만들고, 같은 높이 노이즈에서 노멀맵(요철)을 계산한다.
 * - 던전 테마 색 두 가지와 '조각' 색으로 색을 입힌다.
 */
export interface GroundTextureOptions {
  size?: number;
  colorA: string;
  colorB: string;
  flecks: [string, string];
  /** 요철 세기 (노멀맵 계산용 높이 배율) */
  bump?: number;
  /** 노이즈 축척 (작을수록 큰 얼룩) */
  scale?: number;
  seed?: number;
}

/** 간단한 해시 기반 2D 값 노이즈 (0~1) */
function makeNoise(seed: number) {
  const hash = (x: number, y: number) => {
    let h = (x * 374761393 + y * 668265263 + seed * 1442695041) | 0;
    h = (h ^ (h >>> 13)) * 1274126177;
    return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
  };
  const smooth = (t: number) => t * t * (3 - 2 * t);
  return (x: number, y: number): number => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const fx = smooth(x - xi);
    const fy = smooth(y - yi);
    const a = hash(xi, yi);
    const b = hash(xi + 1, yi);
    const c = hash(xi, yi + 1);
    const d = hash(xi + 1, yi + 1);
    return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
  };
}

/** 여러 겹(옥타브) 노이즈. 타일이 이어지도록 좌표를 주기화한다 */
function fbm(noise: (x: number, y: number) => number, x: number, y: number, period: number): number {
  let v = 0;
  let amp = 0.5;
  let freq = 1;
  for (let i = 0; i < 4; i++) {
    const p = period * freq;
    // 주기적으로 만들기 위해 네 모서리를 섞는다
    const xx = ((x * freq) % p + p) % p;
    const yy = ((y * freq) % p + p) % p;
    v += amp * noise(xx, yy);
    amp *= 0.5;
    freq *= 2;
  }
  return v;
}

function hexToRgb(hex: string): [number, number, number] {
  const c = new THREE.Color(hex);
  return [c.r * 255, c.g * 255, c.b * 255];
}

/** 색 지도 + 노멀맵 생성 */
export function createGroundTextures(o: GroundTextureOptions): { map: THREE.Texture; normalMap: THREE.Texture } {
  const size = o.size ?? 512;
  const scale = o.scale ?? 6;
  const noise = makeNoise(o.seed ?? 7);
  const height = new Float32Array(size * size);
  const A = hexToRgb(o.colorA);
  const B = hexToRgb(o.colorB);
  const F0 = hexToRgb(o.flecks[0]);
  const F1 = hexToRgb(o.flecks[1]);

  const color = document.createElement('canvas');
  color.width = color.height = size;
  const cctx = color.getContext('2d')!;
  const img = cctx.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = (x / size) * scale;
      const v = (y / size) * scale;
      const n = fbm(noise, u, v, scale); // 0~1 근처
      const fine = fbm(noise, u * 7 + 3, v * 7 + 3, scale * 7);
      height[y * size + x] = n * 0.7 + fine * 0.3;
      const t = Math.min(1, Math.max(0, (n - 0.35) * 2.2));
      let r = A[0] + (B[0] - A[0]) * t;
      let g = A[1] + (B[1] - A[1]) * t;
      let b = A[2] + (B[2] - A[2]) * t;
      // 조각: 아주 가는 노이즈가 높은 곳에 점을 찍는다
      if (fine > 0.74) {
        const f = fine > 0.8 ? F1 : F0;
        r = r * 0.4 + f[0] * 0.6;
        g = g * 0.4 + f[1] * 0.6;
        b = b * 0.4 + f[2] * 0.6;
      }
      // 미세 명암
      const shade = 0.9 + fine * 0.2;
      const i = (y * size + x) * 4;
      img.data[i] = Math.min(255, r * shade);
      img.data[i + 1] = Math.min(255, g * shade);
      img.data[i + 2] = Math.min(255, b * shade);
      img.data[i + 3] = 255;
    }
  }
  cctx.putImageData(img, 0, 0);

  // 노멀맵: 높이 차이(소벨)로 기울기를 구해 RGB 로 기록
  const normal = document.createElement('canvas');
  normal.width = normal.height = size;
  const nctx = normal.getContext('2d')!;
  const nimg = nctx.createImageData(size, size);
  const bump = o.bump ?? 2.5;
  const at = (x: number, y: number) => height[((y + size) % size) * size + ((x + size) % size)];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = (at(x + 1, y) - at(x - 1, y)) * bump;
      const dy = (at(x, y + 1) - at(x, y - 1)) * bump;
      const len = Math.hypot(dx, dy, 1);
      const i = (y * size + x) * 4;
      nimg.data[i] = ((-dx / len) * 0.5 + 0.5) * 255;
      nimg.data[i + 1] = ((-dy / len) * 0.5 + 0.5) * 255;
      nimg.data[i + 2] = (1 / len) * 255;
      nimg.data[i + 3] = 255;
    }
  }
  nctx.putImageData(nimg, 0, 0);

  const map = new THREE.CanvasTexture(color);
  map.colorSpace = THREE.SRGBColorSpace;
  const normalMap = new THREE.CanvasTexture(normal);
  for (const t of [map, normalMap]) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
  }
  return { map, normalMap };
}
