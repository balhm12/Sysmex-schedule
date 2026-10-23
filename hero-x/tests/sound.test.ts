import { describe, expect, it } from 'vitest';
import { MUSIC, SFX, semitoneToFreq } from '../src/audio/soundDefs';
import { DUNGEONS } from '../src/game/DungeonDefs';

describe('소리 정의 (soundDefs)', () => {
  it('모든 효과음은 조각이 1개 이상이고 길이·음량이 합리적 범위다', () => {
    for (const [name, parts] of Object.entries(SFX)) {
      expect(parts.length, name).toBeGreaterThan(0);
      for (const p of parts) {
        expect(p.duration).toBeGreaterThan(0);
        expect(p.duration).toBeLessThanOrEqual(2);
        expect(p.gain).toBeGreaterThan(0);
        expect(p.gain).toBeLessThanOrEqual(1);
        if (p.wave !== 'noise') {
          expect(p.freq).toBeGreaterThanOrEqual(20);
          expect(p.freq).toBeLessThanOrEqual(8000);
          if (p.freqEnd !== undefined) expect(p.freqEnd).toBeGreaterThan(0);
        }
      }
    }
  });

  it('던전마다 음악 트랙이 있고(id 와 같은 이름), 악절 길이가 박자에 맞는다', () => {
    for (const d of DUNGEONS) expect(MUSIC[d.id as keyof typeof MUSIC], `던전 '${d.id}' 음악 없음`).toBeDefined();
    for (const [name, t] of Object.entries(MUSIC)) {
      expect(t.bpm, name).toBeGreaterThanOrEqual(40);
      expect(t.bpm).toBeLessThanOrEqual(220);
      expect(t.melody.length % 2, `${name}: 멜로디는 반 박자 단위라 짝수 길이`).toBe(0);
      expect(t.melody.length / 2).toBe(t.bass.length); // 멜로디 한 바퀴 = 베이스 한 바퀴
    }
  });

  it('반음 변환: 12 반음은 한 옥타브(2배), 0 은 기준음', () => {
    expect(semitoneToFreq(130.81, 0)).toBeCloseTo(130.81, 6);
    expect(semitoneToFreq(130.81, 12)).toBeCloseTo(261.62, 6);
    expect(semitoneToFreq(440, 7)).toBeCloseTo(659.26, 1);
  });
});
