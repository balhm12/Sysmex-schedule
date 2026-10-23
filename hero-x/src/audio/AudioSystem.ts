import { Logger } from '../utils/Logger';
import { MUSIC, SFX, semitoneToFreq, type MusicName, type SfxName } from './soundDefs';

/**
 * 소리 시스템 (Web Audio 로 코드 합성. 외부 음원 파일 없음)
 * - 브라우저는 사용자가 한 번 조작(터치·키·클릭)하기 전에는 소리를 못 내므로, 첫 조작에 AudioContext 를 만들고 깨운다(unlock).
 * - 효과음: soundDefs.SFX 레시피대로 오실레이터/소음을 겹친다. 같은 효과음이 너무 자주 겹치지 않게 짧은 간격 제한.
 * - 음악: soundDefs.MUSIC 악절을 '미리 예약' 방식(lookahead)으로 반복 재생한다. 트랙을 바꾸면 짧게 페이드.
 * - 음량: 전체·효과음·음악 3단계 게인. Web Audio 를 지원하지 않거나 실패하면 조용히 무시한다(게임은 계속).
 */
export class AudioSystem {
  private ctx: AudioContext | null = null;
  private master!: GainNode;
  private sfxGain!: GainNode;
  private musicGain!: GainNode;
  private noiseBuffer: AudioBuffer | null = null;
  private volumes = { master: 0.8, sfx: 1, music: 0.6 };
  private lastPlayed = new Map<SfxName, number>();
  private unlocked = false;
  private cleanup: Array<() => void> = [];

  // 음악 예약 상태
  private track: MusicName | null = null;
  private pendingTrack: MusicName | null = null;
  private nextNoteTime = 0;
  private step = 0;
  private schedulerId = 0;
  private trackGain: GainNode | null = null;

  /** 첫 사용자 조작에 소리를 켠다 */
  attach(target: Window = window): void {
    const wake = () => {
      this.ensureContext();
      if (this.ctx && this.ctx.state === 'suspended') void this.ctx.resume();
      if (this.ctx) this.unlocked = true;
      if (this.pendingTrack) {
        const t = this.pendingTrack;
        this.pendingTrack = null;
        this.playMusic(t);
      }
    };
    for (const ev of ['pointerdown', 'keydown', 'touchend'] as const) {
      target.addEventListener(ev, wake, { passive: true });
      this.cleanup.push(() => target.removeEventListener(ev, wake));
    }
    // 탭을 숨기면 음악을 멈추고(배터리), 돌아오면 다시
    const onVis = () => {
      if (!this.ctx) return;
      if (document.hidden) void this.ctx.suspend();
      else void this.ctx.resume();
    };
    document.addEventListener('visibilitychange', onVis);
    this.cleanup.push(() => document.removeEventListener('visibilitychange', onVis));
  }

  get ready(): boolean {
    return this.unlocked && this.ctx !== null;
  }

  get currentTrack(): MusicName | null {
    return this.track ?? this.pendingTrack;
  }

  private ensureContext(): void {
    if (this.ctx) return;
    try {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return;
      this.ctx = new Ctor();
      this.master = this.ctx.createGain();
      this.sfxGain = this.ctx.createGain();
      this.musicGain = this.ctx.createGain();
      this.sfxGain.connect(this.master);
      this.musicGain.connect(this.master);
      this.master.connect(this.ctx.destination);
      this.applyVolumes();
      // 백색 소음 1초 버퍼
      const len = this.ctx.sampleRate;
      this.noiseBuffer = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
      const data = this.noiseBuffer.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    } catch (err) {
      Logger.warn('소리를 켤 수 없습니다 (Web Audio 미지원). 게임은 계속 진행됩니다.', err);
      this.ctx = null;
    }
  }

  /** 음량 설정 (0~1). 즉시 반영 */
  setVolumes(v: { master?: number; sfx?: number; music?: number }): void {
    this.volumes = { ...this.volumes, ...v };
    this.applyVolumes();
  }

  private applyVolumes(): void {
    if (!this.ctx) return;
    const clamp = (x: number) => Math.min(1, Math.max(0, x));
    this.master.gain.value = clamp(this.volumes.master);
    this.sfxGain.gain.value = clamp(this.volumes.sfx);
    this.musicGain.gain.value = clamp(this.volumes.music);
  }

  /** 효과음 재생. 같은 효과음은 minGap 초 안에 다시 울리지 않는다 */
  play(name: SfxName, minGap = 0.03): void {
    if (!this.ctx || !this.unlocked || this.volumes.master <= 0 || this.volumes.sfx <= 0) return;
    const now = this.ctx.currentTime;
    const last = this.lastPlayed.get(name) ?? -1;
    if (now - last < minGap) return;
    this.lastPlayed.set(name, now);
    for (const part of SFX[name]) {
      const start = now + (part.delay ?? 0);
      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0.0001, start);
      g.gain.linearRampToValueAtTime(part.gain, start + 0.008);
      g.gain.exponentialRampToValueAtTime(0.0001, start + part.duration);
      g.connect(this.sfxGain);
      if (part.wave === 'noise') {
        if (!this.noiseBuffer) continue;
        const src = this.ctx.createBufferSource();
        src.buffer = this.noiseBuffer;
        src.loop = true;
        const f = this.ctx.createBiquadFilter();
        f.type = 'lowpass';
        f.frequency.value = part.filter ?? 2000;
        src.connect(f);
        f.connect(g);
        src.start(start);
        src.stop(start + part.duration + 0.02);
      } else {
        const o = this.ctx.createOscillator();
        o.type = part.wave;
        o.frequency.setValueAtTime(part.freq, start);
        if (part.freqEnd !== undefined) o.frequency.exponentialRampToValueAtTime(Math.max(1, part.freqEnd), start + part.duration);
        o.connect(g);
        o.start(start);
        o.stop(start + part.duration + 0.02);
      }
    }
  }

  /** 음악 트랙 재생(반복). 같은 트랙이면 그대로, 다른 트랙이면 짧게 페이드 후 교체. null 이면 정지 */
  playMusic(name: MusicName | null): void {
    if (!this.ctx || !this.unlocked) {
      this.pendingTrack = name;
      return;
    }
    if (name === this.track) return;
    this.stopMusic();
    if (!name) return;
    this.track = name;
    this.trackGain = this.ctx.createGain();
    this.trackGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
    this.trackGain.gain.exponentialRampToValueAtTime(1, this.ctx.currentTime + 0.6);
    this.trackGain.connect(this.musicGain);
    this.step = 0;
    this.nextNoteTime = this.ctx.currentTime + 0.05;
    this.schedule();
  }

  stopMusic(): void {
    if (this.schedulerId) {
      clearTimeout(this.schedulerId);
      this.schedulerId = 0;
    }
    if (this.trackGain && this.ctx) {
      const g = this.trackGain;
      g.gain.cancelScheduledValues(this.ctx.currentTime);
      g.gain.setValueAtTime(g.gain.value, this.ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.4);
      setTimeout(() => g.disconnect(), 500);
    }
    this.trackGain = null;
    this.track = null;
    this.pendingTrack = null;
  }

  /** 악절을 조금 앞서 예약한다 (브라우저 타이머 지연에 흔들리지 않게) */
  private schedule(): void {
    if (!this.ctx || !this.track || !this.trackGain) return;
    const t = MUSIC[this.track];
    const beat = 60 / t.bpm;
    const half = beat / 2;
    const lookahead = 0.25;
    while (this.nextNoteTime < this.ctx.currentTime + lookahead) {
      const i = this.step;
      // 베이스: 한 박자마다
      if (i % 2 === 0) {
        const b = t.bass[(i / 2) % t.bass.length];
        if (b !== null) this.note(t.bassWave, semitoneToFreq(t.root, b), this.nextNoteTime, beat * 0.9, 0.22);
      }
      const m = t.melody[i % t.melody.length];
      if (m !== null) this.note(t.melodyWave, semitoneToFreq(t.root, m), this.nextNoteTime, half * 0.8, 0.14 * t.melodyGain);
      this.nextNoteTime += half;
      this.step++;
    }
    this.schedulerId = window.setTimeout(() => this.schedule(), 100);
  }

  private note(wave: OscillatorType, freq: number, start: number, duration: number, gain: number): void {
    if (!this.ctx || !this.trackGain) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = wave;
    o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, start);
    g.gain.linearRampToValueAtTime(gain, start + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    o.connect(g);
    g.connect(this.trackGain);
    o.start(start);
    o.stop(start + duration + 0.02);
  }

  dispose(): void {
    this.stopMusic();
    this.cleanup.forEach((fn) => fn());
    this.cleanup = [];
    void this.ctx?.close();
    this.ctx = null;
  }
}
