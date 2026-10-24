import { soundRegistry } from '../assets/SoundRegistry';
import { Logger } from '../utils/Logger';
import { MUSIC, SFX, chordAt, semitoneToFreq, type MusicName, type MusicTrack, type SfxName, type SfxPart, MUSIC_MOODS, type MusicMood } from './soundDefs';

/**
 * 소리 시스템 (Web Audio)
 * - 브라우저는 사용자가 한 번 조작(터치·키·클릭)하기 전에는 소리를 못 내므로, 첫 조작에 AudioContext 를 만들고 깨운다(unlock).
 * - 효과음: soundDefs.SFX 레시피대로 오실레이터/소음을 겹치고(필터 스윕·왜곡·두 겹 오실레이터), 잔향 버스로 일부를 보낸다.
 *   재생마다 음높이·음량을 조금씩 바꿔 같은 소리가 반복되는 느낌을 줄인다. 같은 효과음이 너무 자주 겹치지 않게 짧은 간격 제한.
 * - 음악: soundDefs.MUSIC 악절(베이스+서브·멜로디·드럼·패드 코드)을 '미리 예약' 방식(lookahead)으로 반복 재생한다. 트랙을 바꾸면 짧게 페이드.
 * - 정식 음원 파일: public/sounds/manifest.json 에 적힌 효과음·음악은 파일로 재생한다(SoundRegistry 가 받아 두고 여기서 디코딩).
 *   파일이 아직 준비되지 않았으면 합성음으로 대신하고, 준비되면 다음부터(음악은 즉시) 파일을 쓴다.
 * - 음량: 전체·효과음·음악 3단계 게인 → 컴프레서(여러 소리가 겹쳐도 찢어지지 않게) → 출력.
 *   Web Audio 를 지원하지 않거나 실패하면 조용히 무시한다(게임은 계속).
 */
export class AudioSystem {
  private ctx: AudioContext | null = null;
  private master!: GainNode;
  private sfxGain!: GainNode;
  private musicGain!: GainNode;
  private reverb: ConvolverNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private readonly shaperCurves = new Map<number, Float32Array>();
  private volumes = { master: 0.8, sfx: 1, music: 0.6 };
  private lastPlayed = new Map<SfxName, number>();
  private unlocked = false;
  private cleanup: Array<() => void> = [];
  /** 지금 울리고 있는 소리 조각 수 (디버그·검증용) */
  private activeVoices = 0;

  // 음원 파일 디코딩 결과 (키: 'sfx:이름' / 'music:이름')
  private readonly decoded = new Map<string, AudioBuffer[]>();
  private readonly decoding = new Set<string>();

  // 음악 예약 상태
  private track: MusicName | null = null;
  private pendingTrack: MusicName | null = null;
  private nextNoteTime = 0;
  private step = 0;
  private schedulerId = 0;
  private trackGain: GainNode | null = null;
  private musicSource: AudioBufferSourceNode | null = null;
  private musicIsFile = false;
  /** 현재 분위기(구역에 따라 바뀜). 다음 음부터 적용되어 자연스럽게 넘어간다 */
  private mood: MusicMood = MUSIC_MOODS.normal;
  private moodName: keyof typeof MUSIC_MOODS = 'normal';

  constructor() {
    // 음원 파일이 새로 도착하면 (컨텍스트가 있을 때) 바로 디코딩
    soundRegistry.onLoaded = (key) => this.decodeKey(key);
  }

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

  get voices(): number {
    return this.activeVoices;
  }

  /** 현재 음악이 파일 재생인지 (false = 합성) */
  get usingFileMusic(): boolean {
    return this.musicIsFile;
  }

  /** 디코딩이 끝나 파일로 재생 가능한 키 목록 */
  get fileKeys(): string[] {
    return [...this.decoded.keys()];
  }

  private ensureContext(): void {
    if (this.ctx) return;
    try {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return;
      const ctx = new Ctor();
      this.ctx = ctx;
      this.master = ctx.createGain();
      this.sfxGain = ctx.createGain();
      this.musicGain = ctx.createGain();
      this.sfxGain.connect(this.master);
      this.musicGain.connect(this.master);
      // 컴프레서: 타격·폭발이 겹쳐도 찢어지지 않게
      const comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -14;
      comp.knee.value = 18;
      comp.ratio.value = 4;
      comp.attack.value = 0.003;
      comp.release.value = 0.25;
      this.master.connect(comp);
      comp.connect(ctx.destination);
      this.applyVolumes();
      // 백색 소음 1초 버퍼
      const len = ctx.sampleRate;
      this.noiseBuffer = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = this.noiseBuffer.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
      // 잔향: 1.8초 동안 줄어드는 소음을 임펄스 응답으로 (파일 없이 홀 느낌)
      const irLen = Math.floor(ctx.sampleRate * 1.8);
      const ir = ctx.createBuffer(2, irLen, ctx.sampleRate);
      for (let c = 0; c < 2; c++) {
        const d = ir.getChannelData(c);
        for (let i = 0; i < irLen; i++) {
          const t = i / irLen;
          d[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 3) * 0.6;
        }
      }
      this.reverb = ctx.createConvolver();
      this.reverb.buffer = ir;
      this.reverb.connect(this.master);
      // 이미 받아 둔 음원 파일 디코딩
      for (const key of soundRegistry.loadedKeys) this.decodeKey(key);
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

  // ---------- 음원 파일 ----------

  /** 받아 둔 파일을 디코딩한다 (한 번만). 재생 중인 합성 음악이 파일로 바뀔 수 있으면 바꾼다 */
  private decodeKey(key: string): void {
    if (!this.ctx || this.decoded.has(key) || this.decoding.has(key)) return;
    const s = soundRegistry.get(key);
    if (!s) return;
    this.decoding.add(key);
    const ctx = this.ctx;
    Promise.all(s.data.map((d) => ctx.decodeAudioData(d.slice(0))))
      .then((bufs) => {
        this.decoded.set(key, bufs);
        if (this.track && key === `music:${this.track}` && !this.musicIsFile) {
          const t = this.track;
          this.stopMusic();
          this.playMusic(t);
        }
      })
      .catch((err) => Logger.warn(`음원 '${key}' 디코딩 실패. 합성음을 씁니다.`, err))
      .finally(() => this.decoding.delete(key));
  }

  /** 파일이 준비돼 있으면 버퍼 목록과 음량 배율, 아니면 null (있는데 안 됐으면 디코딩 시작) */
  private fileBuffers(key: string): { buffers: AudioBuffer[]; gain: number } | null {
    const bufs = this.decoded.get(key);
    const s = soundRegistry.get(key);
    if (bufs && s) return { buffers: bufs, gain: s.entry.gain };
    if (s) this.decodeKey(key);
    return null;
  }

  private playBuffer(buffers: AudioBuffer[], out: AudioNode, rate: number, gain: number, start: number, loop: boolean): AudioBufferSourceNode | null {
    if (!this.ctx) return null;
    const src = this.ctx.createBufferSource();
    src.buffer = buffers[Math.floor(Math.random() * buffers.length)];
    src.playbackRate.value = rate;
    src.loop = loop;
    const g = this.ctx.createGain();
    g.gain.value = gain;
    src.connect(g);
    g.connect(out);
    this.trackVoice(src);
    src.start(start);
    return src;
  }

  private trackVoice(src: AudioScheduledSourceNode): void {
    this.activeVoices++;
    src.addEventListener('ended', () => {
      this.activeVoices--;
    });
  }

  // ---------- 효과음 ----------

  /** 효과음 재생. 같은 효과음은 minGap 초 안에 다시 울리지 않는다 */
  /** 효과음 재생. minGap: 같은 소리의 최소 간격(초), pitchMul: 음높이 배율(콤보 단계 등에 쓴다, 1 이 원래 높이) */
  play(name: SfxName, minGap = 0.03, pitchMul = 1): void {
    if (!this.ctx || !this.unlocked || this.volumes.master <= 0 || this.volumes.sfx <= 0) return;
    const now = this.ctx.currentTime;
    const last = this.lastPlayed.get(name) ?? -1;
    if (now - last < minGap) return;
    this.lastPlayed.set(name, now);
    const def = SFX[name];
    const pitch = (def.pitchJitter ? Math.pow(2, ((Math.random() * 2 - 1) * def.pitchJitter) / 12) : 1) * pitchMul;
    const gainMul = def.gainJitter ? 1 + (Math.random() * 2 - 1) * def.gainJitter : 1;
    // 정식 음원 파일이 있으면 그걸로
    const file = this.fileBuffers(`sfx:${name}`);
    if (file) {
      this.playBuffer(file.buffers, this.sfxGain, pitch, gainMul * file.gain, now, false);
      return;
    }
    // 합성: 이 효과음의 버스(음량 흔들림) → 효과음 게인, 일부는 잔향으로
    const bus = this.ctx.createGain();
    bus.gain.value = gainMul;
    bus.connect(this.sfxGain);
    if (def.reverb && this.reverb) {
      const send = this.ctx.createGain();
      send.gain.value = def.reverb;
      bus.connect(send);
      send.connect(this.reverb);
    }
    for (const part of def.parts) this.synthPart(part, bus, now, pitch);
  }

  /** 레시피 조각 하나를 합성한다: 소스 → (필터) → (왜곡) → 음량 포락선 → out */
  private synthPart(part: SfxPart, out: AudioNode, now: number, pitch: number): void {
    const ctx = this.ctx;
    if (!ctx) return;
    const start = now + (part.delay ?? 0);
    const end = start + part.duration;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, start);
    g.gain.linearRampToValueAtTime(part.gain, start + (part.attack ?? 0.008));
    g.gain.exponentialRampToValueAtTime(0.0001, end);
    g.connect(out);
    let dest: AudioNode = g;
    if (part.distortion) {
      const ws = ctx.createWaveShaper();
      ws.curve = this.shaperCurve(part.distortion);
      ws.oversample = '2x';
      ws.connect(dest);
      dest = ws;
    }
    const isNoise = part.wave === 'noise';
    const cutoff = part.filter ?? (isNoise ? 2000 : undefined);
    if (cutoff !== undefined) {
      const f = ctx.createBiquadFilter();
      f.type = part.filterType ?? 'lowpass';
      f.Q.value = f.type === 'bandpass' ? 1.2 : 0.8;
      f.frequency.setValueAtTime(cutoff, start);
      if (part.filterEnd !== undefined) f.frequency.exponentialRampToValueAtTime(Math.max(20, part.filterEnd), end);
      f.connect(dest);
      dest = f;
    }
    if (isNoise) {
      if (!this.noiseBuffer) return;
      const src = ctx.createBufferSource();
      src.buffer = this.noiseBuffer;
      src.loop = true;
      src.connect(dest);
      this.trackVoice(src);
      src.start(start);
      src.stop(end + 0.02);
      return;
    }
    // 오실레이터 (detune 이 있으면 두 개를 어긋나게 겹친다)
    const detunes = part.detune ? [-part.detune / 2, part.detune / 2] : [0];
    for (const d of detunes) {
      const o = ctx.createOscillator();
      o.type = part.wave as OscillatorType;
      o.frequency.setValueAtTime(part.freq * pitch, start);
      if (part.freqEnd !== undefined) o.frequency.exponentialRampToValueAtTime(Math.max(1, part.freqEnd * pitch), end);
      o.detune.value = d;
      if (detunes.length > 1) {
        const half = ctx.createGain();
        half.gain.value = 0.55;
        o.connect(half);
        half.connect(dest);
      } else {
        o.connect(dest);
      }
      this.trackVoice(o);
      o.start(start);
      o.stop(end + 0.02);
    }
  }

  /** 왜곡 곡선 (amount 0~1). 같은 값은 재사용 */
  private shaperCurve(amount: number): Float32Array {
    const key = Math.round(amount * 100) / 100;
    let c = this.shaperCurves.get(key);
    if (c) return c;
    const n = 1024;
    const k = key * 100;
    c = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const x = (i * 2) / n - 1;
      c[i] = ((1 + k) * x) / (1 + k * Math.abs(x));
    }
    this.shaperCurves.set(key, c);
    return c;
  }

  // ---------- 음악 ----------

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
    const now = this.ctx.currentTime;
    this.trackGain = this.ctx.createGain();
    this.trackGain.gain.setValueAtTime(0.0001, now);
    this.trackGain.gain.exponentialRampToValueAtTime(1, now + 0.6);
    this.trackGain.connect(this.musicGain);
    // 정식 음원 파일이 있으면 반복 재생
    const file = this.fileBuffers(`music:${name}`);
    if (file) {
      this.musicIsFile = true;
      this.musicSource = this.playBuffer(file.buffers, this.trackGain, 1, file.gain, now + 0.05, true);
      return;
    }
    // 합성: 트랙 잔향 보내기
    const t = MUSIC[name];
    if (t.reverb && this.reverb) {
      const send = this.ctx.createGain();
      send.gain.value = t.reverb;
      this.trackGain.connect(send);
      send.connect(this.reverb);
    }
    this.musicIsFile = false;
    this.step = 0;
    this.nextNoteTime = now + 0.05;
    this.schedule();
  }

  stopMusic(): void {
    if (this.schedulerId) {
      clearTimeout(this.schedulerId);
      this.schedulerId = 0;
    }
    if (this.trackGain && this.ctx) {
      const g = this.trackGain;
      const src = this.musicSource;
      const now = this.ctx.currentTime;
      g.gain.cancelScheduledValues(now);
      g.gain.setValueAtTime(g.gain.value, now);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
      try {
        src?.stop(now + 0.45);
      } catch {
        /* 이미 멈춤 */
      }
      setTimeout(() => g.disconnect(), 500);
    }
    this.musicSource = null;
    this.musicIsFile = false;
    this.trackGain = null;
    this.track = null;
    this.pendingTrack = null;
  }

  /** 악절을 조금 앞서 예약한다 (브라우저 타이머 지연에 흔들리지 않게) */
  /** 음악 분위기 바꾸기 (같은 곡을 템포·드럼·음량만 달리 연주). 파일 음악에는 음량만 영향 */
  setMood(name: keyof typeof MUSIC_MOODS): void {
    if (name === this.moodName) return;
    this.moodName = name;
    this.mood = MUSIC_MOODS[name];
    if (this.trackGain && this.ctx && this.musicIsFile) {
      const now = this.ctx.currentTime;
      this.trackGain.gain.cancelScheduledValues(now);
      this.trackGain.gain.setValueAtTime(this.trackGain.gain.value, now);
      this.trackGain.gain.linearRampToValueAtTime(this.mood.pad, now + 1.0);
    }
  }

  get currentMood(): keyof typeof MUSIC_MOODS {
    return this.moodName;
  }

  private schedule(): void {
    if (!this.ctx || !this.track || !this.trackGain) return;
    const t = MUSIC[this.track];
    const beat = 60 / (t.bpm * this.mood.tempo);
    const half = beat / 2;
    const lookahead = 0.25;
    while (this.nextNoteTime < this.ctx.currentTime + lookahead) {
      const i = this.step;
      const time = this.nextNoteTime;
      // 한 박자마다: 베이스(+서브 옥타브), 패드 코드
      if (i % 2 === 0) {
        const bi = i / 2;
        const b = t.bass[bi % t.bass.length];
        if (b !== null) this.note(t.bassWave, semitoneToFreq(t.root, b), time, beat * 0.9, 0.2, undefined, true);
        if (t.chords && t.chords[bi % t.chords.length] !== null) {
          const c = chordAt(t.chords, bi);
          if (c) this.pad(t, c.notes, time, c.hold * beat, this.mood.pad);
        }
      }
      // 반 박자마다: 멜로디, 드럼
      const m = t.melody[i % t.melody.length];
      if (m !== null) this.note(t.melodyWave, semitoneToFreq(t.root, m), time, half * 0.8, 0.14 * t.melodyGain * this.mood.melody, t.melodyFilter);
      const d = this.mood.drums ? t.drums?.[i % t.drums.length] : undefined;
      if (d) this.drum(d, time);
      this.nextNoteTime += half;
      this.step++;
    }
    this.schedulerId = window.setTimeout(() => this.schedule(), 100);
  }

  /** 음 하나. sub 이면 한 옥타브 아래 사인파를 함께 울려 베이스를 받친다 */
  private note(wave: OscillatorType, freq: number, start: number, duration: number, gain: number, filter?: number, sub = false): void {
    const ctx = this.ctx;
    if (!ctx || !this.trackGain) return;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, start);
    g.gain.linearRampToValueAtTime(gain, start + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    g.connect(this.trackGain);
    let dest: AudioNode = g;
    if (filter) {
      // 신시사이저 느낌: 밝게 시작해 어두워지는 필터 포락선
      const f = ctx.createBiquadFilter();
      f.type = 'lowpass';
      f.Q.value = 1.5;
      f.frequency.setValueAtTime(filter, start);
      f.frequency.exponentialRampToValueAtTime(Math.max(200, filter * 0.3), start + duration);
      f.connect(g);
      dest = f;
    }
    const o = ctx.createOscillator();
    o.type = wave;
    o.frequency.value = freq;
    o.connect(dest);
    this.trackVoice(o);
    o.start(start);
    o.stop(start + duration + 0.02);
    if (sub) {
      const s = ctx.createOscillator();
      const sg = ctx.createGain();
      s.type = 'sine';
      s.frequency.value = freq / 2;
      sg.gain.value = 0.7;
      s.connect(sg);
      sg.connect(g);
      this.trackVoice(s);
      s.start(start);
      s.stop(start + duration + 0.02);
    }
  }

  /** 패드 코드: 음마다 두 오실레이터를 어긋나게 겹쳐 저역 통과, 천천히 올라와 코드가 바뀔 때 사라진다 */
  private pad(t: MusicTrack, notes: number[], start: number, duration: number, mul = 1): void {
    const ctx = this.ctx;
    if (!ctx || !this.trackGain) return;
    const gain = 0.045 * (t.padGain ?? 1) * mul;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, start);
    g.gain.linearRampToValueAtTime(gain, start + 0.12);
    g.gain.setValueAtTime(gain, start + duration - 0.2);
    g.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    const f = ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = 900;
    f.connect(g);
    g.connect(this.trackGain);
    for (const n of notes) {
      for (const d of [-6, 6]) {
        const o = ctx.createOscillator();
        o.type = t.padWave ?? 'triangle';
        o.frequency.value = semitoneToFreq(t.root, n);
        o.detune.value = d;
        o.connect(f);
        this.trackVoice(o);
        o.start(start);
        o.stop(start + duration + 0.02);
      }
    }
  }

  /** 드럼 한 칸: k 킥 / s 스네어 / h 하이햇 / o 열린 하이햇 */
  private drum(step: string, start: number): void {
    const ctx = this.ctx;
    if (!ctx || !this.trackGain || !this.noiseBuffer) return;
    const out = this.trackGain;
    const env = (gain: number, decay: number) => {
      const g = ctx.createGain();
      g.gain.setValueAtTime(gain, start);
      g.gain.exponentialRampToValueAtTime(0.0001, start + decay);
      g.connect(out);
      return g;
    };
    const noise = (filterType: BiquadFilterType, freq: number, gain: number, decay: number) => {
      const src = ctx.createBufferSource();
      src.buffer = this.noiseBuffer;
      src.loop = true;
      const f = ctx.createBiquadFilter();
      f.type = filterType;
      f.frequency.value = freq;
      f.Q.value = 0.7;
      src.connect(f);
      f.connect(env(gain, decay));
      this.trackVoice(src);
      src.start(start);
      src.stop(start + decay + 0.02);
    };
    const tone = (from: number, to: number, gain: number, decay: number) => {
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(from, start);
      o.frequency.exponentialRampToValueAtTime(to, start + decay * 0.5);
      o.connect(env(gain, decay));
      this.trackVoice(o);
      o.start(start);
      o.stop(start + decay + 0.02);
    };
    for (const ch of step) {
      if (ch === 'k') tone(150, 40, 0.5, 0.25);
      else if (ch === 's') {
        noise('bandpass', 1800, 0.3, 0.12);
        tone(200, 120, 0.2, 0.08);
      } else if (ch === 'h') noise('highpass', 7000, 0.12, 0.04);
      else if (ch === 'o') noise('highpass', 6000, 0.1, 0.22);
    }
  }

  dispose(): void {
    this.stopMusic();
    this.cleanup.forEach((fn) => fn());
    this.cleanup = [];
    soundRegistry.onLoaded = null;
    void this.ctx?.close();
    this.ctx = null;
  }
}
