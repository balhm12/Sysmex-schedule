import * as THREE from 'three';

/**
 * 사진으로 얼굴 넣기
 * - 사용자가 고른 사진에서 얼굴이 있을 법한 가운데 위쪽 정사각형을 잘라 작은 이미지(data URL)로 만든다.
 * - 브라우저 저장소(localStorage, 키 hero-x.face)에만 저장한다. 서버로 보내지 않는다.
 * - 임시 캐릭터 모델의 머리 앞면에 텍스처로 붙인다 (PlayerModel.setFace).
 */
export const FACE_KEY = 'hero-x.face';
export const FACE_SIZE = 256;

/** 자를 영역: 가로는 가운데, 세로는 위쪽 40% 지점을 중심으로 한 정사각형 (셀카·인물 사진에서 얼굴이 보통 위쪽에 있음) */
export function cropRect(width: number, height: number): { x: number; y: number; size: number } {
  const size = Math.max(1, Math.min(width, height));
  const x = Math.round((width - size) / 2);
  const centerY = height * 0.4;
  const y = Math.round(Math.min(Math.max(0, centerY - size / 2), Math.max(0, height - size)));
  return { x, y, size };
}

/** 이미지 파일 → 정사각형 얼굴 data URL (JPEG) */
export async function faceFromFile(file: Blob): Promise<string> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const im = new Image();
      im.onload = () => resolve(im);
      im.onerror = () => reject(new Error('이미지를 읽을 수 없습니다. JPG·PNG 파일인지 확인하세요.'));
      im.src = url;
    });
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = FACE_SIZE;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('캔버스를 만들 수 없습니다.');
    const r = cropRect(img.naturalWidth, img.naturalHeight);
    ctx.drawImage(img, r.x, r.y, r.size, r.size, 0, 0, FACE_SIZE, FACE_SIZE);
    return canvas.toDataURL('image/jpeg', 0.85);
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function loadFace(): string | null {
  try {
    const v = localStorage.getItem(FACE_KEY);
    return v && v.startsWith('data:image/') ? v : null;
  } catch {
    return null;
  }
}

export function saveFace(dataUrl: string | null): boolean {
  try {
    if (dataUrl) localStorage.setItem(FACE_KEY, dataUrl);
    else localStorage.removeItem(FACE_KEY);
    return true;
  } catch {
    return false;
  }
}

/** data URL → three.js 텍스처 (비동기 로드) */
export function faceTexture(dataUrl: string): Promise<THREE.Texture> {
  return new Promise((resolve, reject) => {
    new THREE.TextureLoader().load(
      dataUrl,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        resolve(tex);
      },
      undefined,
      () => reject(new Error('얼굴 텍스처를 만들 수 없습니다.')),
    );
  });
}
