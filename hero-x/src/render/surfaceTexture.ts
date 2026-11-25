import * as THREE from 'three';

/**
 * 벽·장애물 표면 텍스처를 코드로 만든다 (외부 이미지 없음)
 * - hedge(생울타리 잎), rock(바위), steel(강철 판·리벳), ice(얼음·금), wood(판자), brick(벽돌)
 * - 색 지도와 요철(노멀맵)을 같은 높이 노이즈에서 만든다. 타일이 이어지게 주기 노이즈를 쓴다.
 * - 순수 계산부(높이 함수)는 테스트 대상, 캔버스는 브라우저에서만.
 */
export type SurfaceKind = 'hedge' | 'rock' | 'steel' | 'ice' | 'wood' | 'brick';

export interface SurfaceOptions {
  kind: SurfaceKind;
  /** 기본 색 (테마 벽 색 등) */
  color: string;
  size?: number;
  seed?: number;
}

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

function fbm(noise: (x: number, y: number) => number, x: number, y: number, period: number, octaves = 4): number {
  let v = 0;
  let amp = 0.5;
  let freq = 1;
  for (let i = 0; i < octaves; i++) {
    const p = period * freq;
    const xx = ((x * freq) % p + p) % p;
    const yy = ((y * freq) % p + p) % p;
    v += amp * noise(xx, yy);
    amp *= 0.5;
    freq *= 2;
  }
  return v;
}

/** 0~1 사이로 자르기 */
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/**
 * 표면 한 점의 높이(0~1)와 색 가중치를 돌려주는 순수 함수 — 종류별 무늬의 핵심 (테스트 대상)
 * u, v 는 0~1 타일 좌표. 반환: { h: 높이, tint: -1(어둡게)~1(밝게), crack: 0~1(금·틈 세기) }
 */
export function surfaceSample(kind: SurfaceKind, u: number, v: number, noise: (x: number, y: number) => number): { h: number; tint: number; crack: number } {
  const P = 8;
  switch (kind) {
    case 'hedge': {
      // 잎 덩어리: 중간 주파수 노이즈 + 잎 점 (높은 주파수)
      const big = fbm(noise, u * P, v * P, P, 3);
      const leaf = noise(((u * 48) % 48 + 48) % 48, ((v * 48) % 48 + 48) % 48);
      const h = clamp01(big * 0.6 + leaf * 0.4);
      return { h, tint: (leaf - 0.5) * 0.9 + (big - 0.5) * 0.4, crack: 0 };
    }
    case 'rock': {
      // 바위: 큰 덩어리 + 가는 금 (노이즈가 0.5 근처인 곳)
      const big = fbm(noise, u * P * 0.6, v * P * 0.6, P * 0.6, 4);
      const vein = fbm(noise, u * P * 1.7 + 3, v * P * 1.7 + 7, P * 1.7, 3);
      const crack = clamp01(1 - Math.abs(vein - 0.5) * 18);
      const h = clamp01(big - crack * 0.5);
      return { h, tint: (big - 0.5) * 0.7 - crack * 0.6, crack };
    }
    case 'steel': {
      // 강철 판: 격자 홈 + 리벳 + 약한 얼룩
      const gx = (u * 4) % 1;
      const gy = (v * 2) % 1;
      const groove = gx < 0.04 || gx > 0.96 || gy < 0.04 || gy > 0.96 ? 1 : 0;
      const rx = ((u * 4) % 1) - 0.12;
      const ry = ((v * 2) % 1) - 0.14;
      const rivet = Math.hypot(rx, ry) < 0.035 || Math.hypot(rx - 0.76, ry) < 0.035 ? 1 : 0;
      const stain = fbm(noise, u * P, v * P, P, 3);
      const h = clamp01(0.55 - groove * 0.5 + rivet * 0.4 + (stain - 0.5) * 0.1);
      return { h, tint: -groove * 0.7 + rivet * 0.5 + (stain - 0.5) * 0.25, crack: groove };
    }
    case 'ice': {
      // 얼음: 부드러운 줄무늬 + 가늘고 밝은 금
      const flow = fbm(noise, u * P * 0.8, v * P * 2.2, P * 2.2, 3);
      const vein = fbm(noise, u * P * 2.3 + 11, v * P * 2.3 + 5, P * 2.3, 3);
      const crack = clamp01(1 - Math.abs(vein - 0.5) * 24);
      const h = clamp01(0.5 + (flow - 0.5) * 0.4 + crack * 0.3);
      return { h, tint: (flow - 0.5) * 0.35 + crack * 0.8, crack };
    }
    case 'wood': {
      // 판자: 가로 판 4개, 판 사이 홈, 나뭇결 줄무늬
      const plank = (v * 4) % 1;
      const gap = plank < 0.06 ? 1 : 0;
      const grain = fbm(noise, u * P * 3, v * P * 0.4 + Math.floor(v * 4) * 7, P * 3, 3);
      const h = clamp01(0.6 - gap * 0.6 + (grain - 0.5) * 0.25);
      return { h, tint: (grain - 0.5) * 0.6 - gap * 0.8, crack: gap };
    }
    case 'brick': {
      // 벽돌: 줄마다 반 칸씩 어긋난 벽돌 + 회반죽 홈
      const row = Math.floor(v * 4);
      const bx = ((u + (row % 2) * 0.5) * 2) % 1;
      const by = (v * 4) % 1;
      const mortar = bx < 0.05 || bx > 0.95 || by < 0.1 ? 1 : 0;
      const wear = fbm(noise, u * P * 2 + row * 3, v * P * 2, P * 2, 3);
      const h = clamp01(0.6 - mortar * 0.6 + (wear - 0.5) * 0.3);
      return { h, tint: (wear - 0.5) * 0.5 - mortar * 0.5, crack: mortar };
    }
  }
}

/** 표면 종류별 색 지도 + 노멀맵 (브라우저 캔버스) */
export function createSurfaceTextures(o: SurfaceOptions): { map: THREE.Texture; normalMap: THREE.Texture } {
  const size = o.size ?? 256;
  const noise = makeNoise(o.seed ?? 3);
  const base = new THREE.Color(o.color);
  const heights = new Float32Array(size * size);
  const img = new Uint8ClampedArray(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const s = surfaceSample(o.kind, x / size, y / size, noise);
      const i = y * size + x;
      heights[i] = s.h;
      const k = 1 + s.tint * 0.45;
      // 얼음 금은 흰색 쪽으로, 그 밖의 금은 어둡게
      const crackMix = o.kind === 'ice' ? s.crack * 0.6 : 0;
      img[i * 4] = clamp01(base.r * k * (1 - crackMix) + crackMix) * 255;
      img[i * 4 + 1] = clamp01(base.g * k * (1 - crackMix) + crackMix) * 255;
      img[i * 4 + 2] = clamp01(base.b * k * (1 - crackMix) + crackMix) * 255;
      img[i * 4 + 3] = 255;
    }
  }
  const map = textureFrom(img, size);
  map.colorSpace = THREE.SRGBColorSpace;
  // 노멀맵: 높이 차이로
  const nrm = new Uint8ClampedArray(size * size * 4);
  const strength = o.kind === 'hedge' ? 3.5 : o.kind === 'steel' ? 2.5 : 2.2;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const hl = heights[y * size + ((x - 1 + size) % size)];
      const hr = heights[y * size + ((x + 1) % size)];
      const hu = heights[((y - 1 + size) % size) * size + x];
      const hd = heights[((y + 1) % size) * size + x];
      const nx = (hl - hr) * strength;
      const ny = (hu - hd) * strength;
      const len = Math.hypot(nx, ny, 1);
      const i = (y * size + x) * 4;
      nrm[i] = (nx / len * 0.5 + 0.5) * 255;
      nrm[i + 1] = (ny / len * 0.5 + 0.5) * 255;
      nrm[i + 2] = (1 / len * 0.5 + 0.5) * 255;
      nrm[i + 3] = 255;
    }
  }
  const normalMap = textureFrom(nrm, size);
  return { map, normalMap };
}

function textureFrom(data: Uint8ClampedArray, size: number): THREE.Texture {
  const tex = new THREE.DataTexture(new Uint8Array(data.buffer), size, size, THREE.RGBAFormat);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.generateMipmaps = true;
  tex.needsUpdate = true;
  return tex;
}

/**
 * 인스턴스 벽처럼 크기가 제각각인 상자에 텍스처가 늘어나지 않게, 월드 좌표로 UV 를 만드는 셰이더 패치.
 * 면의 법선 방향에 따라 xz / zy / xy 평면을 고르고 metersPerTile 로 나눈다.
 */
export function useWorldSpaceUv(mat: THREE.MeshStandardMaterial, metersPerTile: number): void {
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uTile = { value: 1 / metersPerTile };
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nuniform float uTile;')
      .replace(
        '#include <uv_vertex>',
        `#include <uv_vertex>
        {
          #ifdef USE_INSTANCING
            vec4 wp = modelMatrix * instanceMatrix * vec4(position, 1.0);
            vec3 wn = normalize(mat3(modelMatrix) * mat3(instanceMatrix) * normal);
          #else
            vec4 wp = modelMatrix * vec4(position, 1.0);
            vec3 wn = normalize(mat3(modelMatrix) * normal);
          #endif
          vec2 planar = abs(wn.y) > 0.5 ? wp.xz : (abs(wn.x) > 0.5 ? wp.zy : wp.xy);
          #ifdef USE_MAP
            vMapUv = planar * uTile;
          #endif
          #ifdef USE_NORMALMAP
            vNormalMapUv = planar * uTile;
          #endif
        }`,
      );
  };
  // onBeforeCompile 결과를 재질마다 다르게 캐시하도록
  mat.customProgramCacheKey = () => `worldUv:${metersPerTile}`;
}
