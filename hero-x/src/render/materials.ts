import * as THREE from 'three';

/**
 * 재질 도우미 (PBR)
 * - 게임의 모든 불투명 물체는 MeshStandardMaterial(금속성·거칠기)로 만들어 조명·환경광·톤매핑이 사실적으로 먹게 한다.
 * - glow(): 스스로 빛나는 부분(바이저·검·눈·탄·수정). emissiveIntensity 가 1 을 넘으면 '높음' 화질의 블룸(빛 번짐)이 걸린다.
 */
export interface PbrOptions {
  color: THREE.ColorRepresentation;
  /** 거칠기 0(거울)~1(무광). 기본 0.6 */
  roughness?: number;
  /** 금속성 0~1. 기본 0.1 */
  metalness?: number;
  emissive?: THREE.ColorRepresentation;
  emissiveIntensity?: number;
  flatShading?: boolean;
  map?: THREE.Texture | null;
  normalMap?: THREE.Texture | null;
  normalScale?: number;
  transparent?: boolean;
  opacity?: number;
}

export function pbr(o: PbrOptions): THREE.MeshStandardMaterial {
  const m = new THREE.MeshStandardMaterial({
    color: new THREE.Color(o.color),
    roughness: o.roughness ?? 0.6,
    metalness: o.metalness ?? 0.1,
    flatShading: o.flatShading ?? false,
    map: o.map ?? null,
    normalMap: o.normalMap ?? null,
    transparent: o.transparent ?? false,
    opacity: o.opacity ?? 1,
  });
  if (o.emissive !== undefined) {
    m.emissive = new THREE.Color(o.emissive);
    m.emissiveIntensity = o.emissiveIntensity ?? 1;
  }
  if (o.normalMap && o.normalScale !== undefined) m.normalScale.set(o.normalScale, o.normalScale);
  return m;
}

/** 금속 느낌 (로봇 몸통 등) */
export function metal(color: THREE.ColorRepresentation, roughness = 0.4): THREE.MeshStandardMaterial {
  return pbr({ color, roughness, metalness: 0.65 });
}

/** 스스로 빛나는 재질. intensity 1.5 이상이면 블룸이 번진다 */
export function glow(color: THREE.ColorRepresentation, intensity = 2.0): THREE.MeshStandardMaterial {
  const c = new THREE.Color(color);
  const m = new THREE.MeshStandardMaterial({ color: c.clone().multiplyScalar(0.25), roughness: 0.4, metalness: 0 });
  m.emissive = c;
  m.emissiveIntensity = intensity;
  return m;
}
