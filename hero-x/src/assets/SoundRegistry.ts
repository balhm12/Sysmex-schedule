import { Logger } from '../utils/Logger';

/**
 * 정식 음원 파일(.ogg/.mp3/.wav) 교체 구조
 * - public/sounds/manifest.json 에 적힌 파일만 읽는다. 항목이 null 이면 코드로 합성한 소리를 그대로 쓴다.
 * - 키: sfx.<효과음 이름> / music.<음악 이름> (이름은 soundDefs 의 SfxName / MusicName 과 같다)
 * - 값: { file } 또는 { files: [...] }(여러 개면 재생마다 무작위 선택), gain(음량 배율)
 * - 여기서는 파일 바이트만 받아 둔다. 디코딩은 AudioContext 가 생긴 뒤 AudioSystem 이 한다(브라우저 제한).
 */
export interface SoundEntry {
  files: string[];
  /** 음량 배율 (1 = 파일 그대로) */
  gain: number;
}

export interface SoundManifest {
  sfx: Record<string, SoundEntry | null>;
  music: Record<string, SoundEntry | null>;
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function entry(v: unknown): SoundEntry | null {
  if (!isRecord(v)) return null;
  const files: string[] = [];
  if (typeof v.file === 'string' && v.file) files.push(v.file);
  if (Array.isArray(v.files)) for (const f of v.files) if (typeof f === 'string' && f) files.push(f);
  if (files.length === 0) return null;
  return { files, gain: typeof v.gain === 'number' && v.gain > 0 ? Math.min(4, v.gain) : 1 };
}

/** manifest.json 내용을 검증·보정 (순수 함수, 테스트 대상) */
export function normalizeSoundManifest(raw: unknown): SoundManifest {
  const out: SoundManifest = { sfx: {}, music: {} };
  if (!isRecord(raw)) return out;
  for (const group of ['sfx', 'music'] as const) {
    const g = raw[group];
    if (!isRecord(g)) continue;
    for (const [k, v] of Object.entries(g)) {
      const e = entry(v);
      if (e) out[group][k] = e;
    }
  }
  return out;
}

export interface LoadedSound {
  entry: SoundEntry;
  /** 파일별 원본 바이트. 디코딩 때 복사해서 쓴다(decodeAudioData 가 버퍼를 비워 버리므로) */
  data: ArrayBuffer[];
}

/** 받아 둔 음원 보관소 (싱글턴). AudioSystem 이 재생 전에 여기서 파일을 찾는다 */
class SoundRegistry {
  private readonly sounds = new Map<string, LoadedSound>();
  /** 파일이 새로 준비될 때 알림 (AudioSystem 이 디코딩) */
  onLoaded: ((key: string) => void) | null = null;

  get loadedKeys(): string[] {
    return [...this.sounds.keys()];
  }

  get(key: string): LoadedSound | null {
    return this.sounds.get(key) ?? null;
  }

  /** manifest 를 읽고 적힌 파일을 모두 비동기로 받는다. 실패해도 게임은 계속(합성음 사용) */
  async load(baseUrl: string): Promise<void> {
    const root = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
    let manifest: SoundManifest;
    try {
      const res = await fetch(`${root}sounds/manifest.json`, { cache: 'no-cache' });
      if (!res.ok) {
        Logger.warn(`sounds/manifest.json 을 읽지 못했습니다 (${res.status}). 합성음을 씁니다.`);
        return;
      }
      manifest = normalizeSoundManifest(await res.json());
    } catch (err) {
      Logger.warn('sounds/manifest.json 을 읽지 못했습니다. 합성음을 씁니다.', err);
      return;
    }
    const jobs: Array<Promise<void>> = [];
    for (const [k, e] of Object.entries(manifest.sfx)) if (e) jobs.push(this.loadOne(`sfx:${k}`, e, root));
    for (const [k, e] of Object.entries(manifest.music)) if (e) jobs.push(this.loadOne(`music:${k}`, e, root));
    await Promise.all(jobs);
  }

  private async loadOne(key: string, e: SoundEntry, root: string): Promise<void> {
    const data: ArrayBuffer[] = [];
    for (const f of e.files) {
      try {
        const res = await fetch(`${root}sounds/${f}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        data.push(await res.arrayBuffer());
      } catch (err) {
        Logger.warn(`음원 '${f}' 을(를) 읽지 못했습니다.`, err);
      }
    }
    if (data.length === 0) {
      Logger.warn(`'${key}' 음원 파일이 모두 실패해 합성음을 씁니다.`);
      return;
    }
    this.sounds.set(key, { entry: e, data });
    Logger.info(`음원 로드: ${key} ← ${e.files.join(', ')}`);
    this.onLoaded?.(key);
  }
}

export const soundRegistry = new SoundRegistry();
