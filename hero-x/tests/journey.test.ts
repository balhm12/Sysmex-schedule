import { describe, expect, it } from 'vitest';
import { buildWallBoxes, inRect, isWalkable, mainPathLength, mainZones, rasterize, unreachableZones, zoneAt, zoneSpawns } from '../src/dungeon/journey';
import { DUNGEONS, FOREST_JOURNEY, resolveBossConfig } from '../src/game/DungeonDefs';
import { GameConfig } from '../src/game/GameConfig';

const J = FOREST_JOURNEY;
const forest = DUNGEONS[0];

describe('잊혀진 숲 여정 (journey)', () => {
  it('모든 구역이 시작점에서 걸어서 닿고, 메인 경로가 출발→보스 순서로 이어진다', () => {
    expect(unreachableZones(J)).toEqual([]);
    const main = mainZones(J);
    expect(main[0].kind).toBe('start');
    expect(main[main.length - 1].id).toBe(J.bossZone);
    expect(main.map((z) => z.mainIndex)).toEqual(main.map((_, i) => i));
    expect(isWalkable(J, J.start)).toBe(true);
    expect(zoneAt(J, J.start)?.id).toBe('start');
  });

  it('구역·통로는 범위 안이고 서로 다른 모양이다 (같은 방 복붙이 아님)', () => {
    for (const r of [...J.zones.map((z) => z.rect), ...J.corridors]) {
      expect(Math.abs(r.x) + r.w / 2).toBeLessThanOrEqual(J.halfX);
      expect(Math.abs(r.z) + r.d / 2).toBeLessThanOrEqual(J.halfZ);
    }
    const shapes = new Set(J.zones.map((z) => `${z.rect.w}x${z.rect.d}`));
    expect(shapes.size).toBeGreaterThanOrEqual(6);
    expect(new Set(J.zones.map((z) => z.kind)).size).toBeGreaterThanOrEqual(8);
  });

  it('적 배치는 자기 구역 안이고 종류가 정의돼 있으며, 정예는 체력 배율이 있다', () => {
    for (const z of J.zones) {
      for (const sp of zoneSpawns(z)) {
        expect(GameConfig.enemies.types[sp.type], sp.type).toBeDefined();
        expect(inRect(sp, z.rect), `${z.id} 의 적 (${sp.x}, ${sp.z}) 이 구역 밖`).toBe(true);
        if (sp.elite) expect(sp.elite).toBeGreaterThan(1);
      }
    }
    const total = J.zones.reduce((n, z) => n + zoneSpawns(z).length, 0);
    expect(total).toBeGreaterThanOrEqual(35); // 10~15분 분량
    expect(J.zones.some((z) => zoneSpawns(z).some((s) => s.elite))).toBe(true); // 미니 보스
    expect(J.zones.some((z) => z.waves?.some((w) => w.when === 'half'))).toBe(true); // 증원 이벤트
  });

  it('상자·보스·시작은 걸을 수 있는 곳이고, 문은 통로 안에 있으며 열어 주는 구역이 있다', () => {
    for (const c of forest.chests) expect(isWalkable(J, c), `상자 (${c.x}, ${c.z})`).toBe(true);
    const b = resolveBossConfig(forest);
    expect(zoneAt(J, b.spawn)?.id).toBe('boss');
    for (const g of J.gates) {
      expect(J.corridors.some((c) => inRect(g.rect, c)), `문 ${g.id} 가 통로 밖`).toBe(true);
      expect(J.zones.find((z) => z.id === g.opensWhenCleared), `문 ${g.id} 를 여는 구역 없음`).toBeDefined();
    }
    for (const o of forest.obstacles) expect(isWalkable(J, o), `장애물 (${o.x}, ${o.z}) 이 벽 속`).toBe(true);
  });

  it('벽 상자는 걷는 칸을 덮지 않고, 걷는 칸은 모두 벽으로 둘러싸인다', () => {
    const walls = buildWallBoxes(J);
    expect(walls.length).toBeGreaterThan(50);
    for (const w of walls) {
      expect(isWalkable(J, w), `벽 (${w.x}, ${w.z}) 가 길 위`).toBe(false);
      expect(w.kind).toBe('hedge');
    }
    // 격자: 걷는 칸의 이웃이 범위 밖이 아니면 걷는 칸이거나 벽 칸이어야 한다 (구멍 없음)
    const g = rasterize(J);
    const wallSet = new Set(walls.flatMap((w) => { const n = Math.round(w.w / g.cell); return Array.from({ length: n }, (_, i) => `${Math.round((w.x - w.w / 2 + (i + 0.5) * g.cell - g.originX) / g.cell - 0.5)},${Math.round((w.z - g.originZ) / g.cell - 0.5)}`); }));
    for (let r = 0; r < g.rows; r++) for (let c = 0; c < g.cols; c++) {
      if (!g.walk[r * g.cols + c]) continue;
      for (const [dc, dr] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nc = c + dc; const nr = r + dr;
        if (nc < 0 || nr < 0 || nc >= g.cols || nr >= g.rows) continue;
        if (g.walk[nr * g.cols + nc]) continue;
        expect(wallSet.has(`${nc},${nr}`), `(${nc},${nr}) 에 벽 없음`).toBe(true);
      }
    }
  });

  it('메인 경로 길이는 걸어서 1분 이상 걸릴 만큼 길다', () => {
    const len = mainPathLength(J);
    expect(len).toBeGreaterThan(200);
    expect(len / GameConfig.player.moveSpeed).toBeGreaterThan(30); // 초 (직선 거리 합이라 실제 길은 더 길다)
  });
});
