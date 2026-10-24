import { describe, expect, it } from 'vitest';
import { normalizeSoundManifest } from '../src/assets/SoundRegistry';
import { MUSIC, MUSIC_MOODS, MUSIC_NAMES, SFX, SFX_NAMES, chordAt, moodForZone, semitoneToFreq } from '../src/audio/soundDefs';
import { DUNGEONS } from '../src/game/DungeonDefs';

describe('소리 정의 (soundDefs)', () => {
  it('모든 효과음은 조각이 1개 이상이고 길이·음량·필터가 합리적 범위다', () => {
    expect(Object.keys(SFX).sort()).toEqual([...SFX_NAMES].sort());
    for (const [name, def] of Object.entries(SFX)) {
      expect(def.parts.length, name).toBeGreaterThan(0);
      if (def.reverb !== undefined) expect(def.reverb).toBeLessThanOrEqual(1);
      if (def.pitchJitter !== undefined) expect(def.pitchJitter).toBeLessThanOrEqual(3);
      if (def.gainJitter !== undefined) expect(def.gainJitter).toBeLessThan(0.5);
      for (const p of def.parts) {
        expect(p.duration).toBeGreaterThan(0);
        expect(p.duration).toBeLessThanOrEqual(2);
        expect(p.gain).toBeGreaterThan(0);
        expect(p.gain).toBeLessThanOrEqual(1);
        if (p.attack !== undefined) expect(p.attack).toBeLessThan(p.duration);
        if (p.distortion !== undefined) expect(p.distortion).toBeLessThanOrEqual(1);
        if (p.filter !== undefined) expect(p.filter).toBeGreaterThanOrEqual(20);
        if (p.filterEnd !== undefined) expect(p.filter, `${name}: filterEnd 는 filter 와 함께`).toBeDefined();
        if (p.wave !== 'noise') {
          expect(p.freq).toBeGreaterThanOrEqual(20);
          expect(p.freq).toBeLessThanOrEqual(8000);
          if (p.freqEnd !== undefined) expect(p.freqEnd).toBeGreaterThan(0);
        }
      }
    }
  });

  it('던전마다 음악 트랙이 있고(id 와 같은 이름), 악절 길이가 박자에 맞는다', () => {
    expect(Object.keys(MUSIC).sort()).toEqual([...MUSIC_NAMES].sort());
    for (const d of DUNGEONS) expect(MUSIC[d.id as keyof typeof MUSIC], `던전 '${d.id}' 음악 없음`).toBeDefined();
    for (const [name, t] of Object.entries(MUSIC)) {
      expect(t.bpm, name).toBeGreaterThanOrEqual(40);
      expect(t.bpm).toBeLessThanOrEqual(220);
      expect(t.melody.length % 2, `${name}: 멜로디는 반 박자 단위라 짝수 길이`).toBe(0);
      expect(t.melody.length / 2).toBe(t.bass.length); // 멜로디 한 바퀴 = 베이스 한 바퀴
      if (t.drums) expect(t.drums.length, `${name}: 드럼은 멜로디와 같은 길이`).toBe(t.melody.length);
      if (t.chords) {
        expect(t.chords.length, `${name}: 코드는 베이스와 같은 길이`).toBe(t.bass.length);
        expect(t.chords[0], `${name}: 첫 박자에 코드가 있어야 반복이 이어진다`).not.toBeNull();
        for (const c of t.chords) if (c) expect(c.length).toBeGreaterThanOrEqual(2);
      }
      for (const step of t.drums ?? []) if (step) expect(step).toMatch(/^[ksho]+$/);
    }
  });

  it('반음 변환: 12 반음은 한 옥타브(2배), 0 은 기준음', () => {
    expect(semitoneToFreq(130.81, 0)).toBeCloseTo(130.81, 6);
    expect(semitoneToFreq(130.81, 12)).toBeCloseTo(261.62, 6);
    expect(semitoneToFreq(440, 7)).toBeCloseTo(659.26, 1);
  });

  it('chordAt: 코드가 시작하는 박자와 몇 박자 이어지는지', () => {
    const chords = [[0, 4, 7], null, null, null, [5, 9, 12], null, [7, 11, 14], null];
    expect(chordAt(chords, 0)).toEqual({ notes: [0, 4, 7], hold: 4 });
    expect(chordAt(chords, 1)).toBeNull(); // 이어지는 박자
    expect(chordAt(chords, 4)).toEqual({ notes: [5, 9, 12], hold: 2 });
    expect(chordAt(chords, 6)).toEqual({ notes: [7, 11, 14], hold: 2 }); // 끝에서 처음으로 감싸 2박
    expect(chordAt(chords, 8)).toEqual({ notes: [0, 4, 7], hold: 4 }); // 반복
    expect(chordAt([], 0)).toBeNull();
  });
});

describe('음원 manifest 검증 (normalizeSoundManifest)', () => {
  it('비어 있거나 잘못된 입력은 모두 비운다', () => {
    expect(normalizeSoundManifest(null)).toEqual({ sfx: {}, music: {} });
    expect(normalizeSoundManifest({ sfx: { melee: { gain: 2 } } }).sfx).toEqual({}); // 파일 없음
    expect(normalizeSoundManifest({ music: { menu: 'menu.ogg' } }).music).toEqual({});
    expect(normalizeSoundManifest({ sfx: { melee: null } }).sfx).toEqual({});
  });
  it('file / files 를 목록으로 합치고 gain 기본 1, 상한 4', () => {
    const m = normalizeSoundManifest({ sfx: { melee: { file: 'a.ogg', files: ['b.ogg', ''] }, kill: { files: ['k.ogg'], gain: 0.5 } }, music: { menu: { file: 'm.ogg', gain: 99 } } });
    expect(m.sfx.melee).toEqual({ files: ['a.ogg', 'b.ogg'], gain: 1 });
    expect(m.sfx.kill).toEqual({ files: ['k.ogg'], gain: 0.5 });
    expect(m.music.menu).toEqual({ files: ['m.ogg'], gain: 4 });
  });
});

describe('음악 분위기 (MUSIC_MOODS / moodForZone)', () => {
  it('분위기 값은 합리적인 범위이고, 구역 종류에 따라 다르게 고른다', () => {
    for (const m of Object.values(MUSIC_MOODS)) {
      expect(m.tempo).toBeGreaterThanOrEqual(0.7);
      expect(m.tempo).toBeLessThanOrEqual(1.4);
      expect(m.melody).toBeGreaterThan(0);
      expect(m.pad).toBeGreaterThan(0);
    }
    expect(moodForZone('rest', false)).toBe('calm');
    expect(MUSIC_MOODS[moodForZone('rest', false)].drums).toBe(false);
    expect(moodForZone('ambush', false)).toBe('battle');
    expect(moodForZone('arena', false)).toBe('battle');
    expect(moodForZone('arena', true)).toBe('normal'); // 정리하면 평소로
    expect(moodForZone('path', false)).toBe('tense');
    expect(moodForZone('fight', false)).toBe('normal');
    expect(MUSIC_MOODS.battle.tempo).toBeGreaterThan(MUSIC_MOODS.calm.tempo);
  });
});
