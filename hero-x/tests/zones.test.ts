import { describe, expect, it } from 'vitest';
import type { JourneyDef } from '../src/dungeon/journey';
import { ZoneSystem } from '../src/dungeon/ZoneSystem';

/** 작은 여정: 출발 → 전투(진입 2마리, 증원 1마리) → 문 → 보스 */
const J: JourneyDef = {
  halfX: 20,
  halfZ: 40,
  cell: 2,
  wallHeight: 2,
  start: { x: 0, z: 30 },
  bossZone: 'boss',
  zones: [
    { id: 'start', name: '출발', kind: 'start', rect: { x: 0, z: 30, w: 10, d: 10 }, mainIndex: 0, objective: '가자' },
    {
      id: 'fight', name: '전투', kind: 'fight', rect: { x: 0, z: 10, w: 10, d: 10 }, mainIndex: 1, objective: '싸우자',
      waves: [
        { when: 'enter', spawns: [{ type: 'rusher', x: 0, z: 12 }, { type: 'rusher', x: 2, z: 8 }] },
        { when: 'half', spawns: [{ type: 'rusher', x: -2, z: 8 }] },
      ],
    },
    { id: 'boss', name: '보스', kind: 'boss', rect: { x: 0, z: -20, w: 10, d: 10 }, mainIndex: 2, objective: '보스' },
  ],
  corridors: [{ x: 0, z: 20, w: 4, d: 10 }, { x: 0, z: -5, w: 4, d: 20 }],
  gates: [{ id: 'g', rect: { x: 0, z: -5, w: 4, d: 1 }, opensWhenCleared: 'fight' }],
};

function harness() {
  const spawned: Array<{ alive: boolean; type: string }> = [];
  const events: string[] = [];
  const zs = new ZoneSystem(J, {
    spawn: (s) => {
      const e = { alive: true, type: s.type };
      spawned.push(e);
      return e;
    },
    onEnter: (z) => events.push(`enter:${z.id}`),
    onCleared: (z) => events.push(`cleared:${z.id}`),
    openGate: (id) => events.push(`gate:${id}`),
    onBossZone: () => events.push('boss'),
  });
  return { zs, spawned, events };
}

describe('구역 진행기 (ZoneSystem)', () => {
  it('출발 구역은 적이 없어 바로 클리어되고, 목표는 다음 메인 구역', () => {
    const { zs, events } = harness();
    zs.update({ x: 0, z: 30 });
    expect(events).toEqual(['enter:start', 'cleared:start']);
    expect(zs.objective.zone?.id).toBe('fight');
    expect(zs.objective.done).toBe(1);
    expect(zs.beacon).toEqual({ x: 0, z: 10 }); // 아직 안 들어간 목표 구역 중심
  });

  it('전투 구역: 진입 때 적 등장, 절반 이하가 되면 증원, 증원까지 모두 죽어야 클리어·문 열림', () => {
    const { zs, spawned, events } = harness();
    zs.update({ x: 0, z: 30 });
    zs.update({ x: 0, z: 10 });
    expect(spawned).toHaveLength(2);
    expect(zs.beacon).toBeNull(); // 목표 구역 안에 있을 때는 빛 기둥 없음
    spawned[0].alive = false; // 1마리 남음 = 절반 → 증원
    zs.update({ x: 0, z: 10 });
    expect(spawned).toHaveLength(3);
    expect(zs.isCleared('fight')).toBe(false);
    spawned[1].alive = false;
    zs.update({ x: 0, z: 10 });
    expect(zs.isCleared('fight'), '증원이 살아 있으면 클리어 아님').toBe(false);
    spawned[2].alive = false;
    zs.update({ x: 0, z: 10 });
    expect(zs.isCleared('fight')).toBe(true);
    expect(events.slice(-2)).toEqual(['cleared:fight', 'gate:g']);
  });

  it('한 번에 전멸해도 증원은 나오고, 그 증원을 잡아야 클리어된다', () => {
    const { zs, spawned } = harness();
    zs.update({ x: 0, z: 30 });
    zs.update({ x: 0, z: 10 });
    spawned.forEach((e) => (e.alive = false));
    zs.update({ x: 0, z: 10 });
    expect(spawned).toHaveLength(3);
    expect(zs.isCleared('fight')).toBe(false);
    spawned[2].alive = false;
    zs.update({ x: 0, z: 10 });
    expect(zs.isCleared('fight')).toBe(true);
  });

  it('보스 구역 진입은 한 번만 알리고, 보스 클리어 표시로 진행도가 끝난다', () => {
    const { zs, events } = harness();
    zs.update({ x: 0, z: -20 });
    zs.update({ x: 0, z: -20 });
    expect(events.filter((e) => e === 'boss')).toHaveLength(1);
    expect(zs.objective.done).toBe(0); // 건너뛴 구역은 클리어 아님
    zs.markBossCleared();
    expect(zs.isCleared('boss')).toBe(true);
    zs.reset();
    expect(zs.objective.done).toBe(0);
    expect(zs.currentZone).toBeNull();
  });
});
