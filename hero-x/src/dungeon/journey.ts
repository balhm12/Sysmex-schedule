import type { EnemySpawnConfig, ObstacleConfig } from '../game/GameConfig';
import type { Vec2 } from '../player/movement';

/**
 * 여정형 던전 정의와 계산 (순수 함수, 테스트 대상)
 * - 던전을 '구역(zone)'과 '통로(corridor)' 사각형의 모음으로 적는다. 그 밖은 모두 벽(울타리)이다.
 * - 벽은 격자(cell)로 래스터화해 걷는 칸과 맞닿은 칸만 상자로 만든다 → 충돌 상자와 눈에 보이는 울타리가 같다.
 * - 시작 → 보스까지, 그리고 모든 구역이 걸어서 닿는지 BFS 로 검증한다 (지시서: 경로 연결 검증).
 */
export type ZoneKind = 'start' | 'fight' | 'path' | 'treasure' | 'branch' | 'secret' | 'ambush' | 'rest' | 'arena' | 'boss';

export interface Rect {
  x: number;
  z: number;
  w: number;
  d: number;
}

export interface ZoneWave {
  /** 'enter' 구역에 들어설 때 / 'half' 처음 등장한 적이 절반 이하가 되면 */
  when: 'enter' | 'half';
  spawns: EnemySpawnConfig[];
}

export interface ZoneDef {
  id: string;
  name: string;
  kind: ZoneKind;
  rect: Rect;
  /** 진행 안내 문구 (HUD 목표) */
  objective: string;
  /** 메인 경로 순서 (없으면 선택 경로 — 진행도에 안 들어감) */
  mainIndex?: number;
  waves?: ZoneWave[];
}

export interface GateDef {
  id: string;
  rect: Rect;
  /** 이 구역의 적을 모두 처치하면 열린다 */
  opensWhenCleared: string;
}

export interface JourneyDef {
  /** 걸을 수 있는 전체 범위 (바깥 벽) */
  halfX: number;
  halfZ: number;
  /** 벽 격자 한 칸 크기 */
  cell: number;
  wallHeight: number;
  zones: ZoneDef[];
  corridors: Rect[];
  gates: GateDef[];
  start: Vec2;
  bossZone: string;
}

/** 점이 사각형 안에 있는지 (여유 margin) */
export function inRect(p: Vec2, r: Rect, margin = 0): boolean {
  return Math.abs(p.x - r.x) <= r.w / 2 + margin && Math.abs(p.z - r.z) <= r.d / 2 + margin;
}

export function walkableRects(j: JourneyDef): Rect[] {
  return [...j.zones.map((z) => z.rect), ...j.corridors];
}

/** 점이 걸을 수 있는 곳인지 */
export function isWalkable(j: JourneyDef, p: Vec2): boolean {
  return walkableRects(j).some((r) => inRect(p, r));
}

/** 점이 속한 구역 (여러 개면 먼저 적힌 것) */
export function zoneAt(j: JourneyDef, p: Vec2): ZoneDef | null {
  return j.zones.find((z) => inRect(p, z.rect)) ?? null;
}

/** 격자 좌표 ↔ 세계 좌표 */
export interface Grid {
  cols: number;
  rows: number;
  cell: number;
  originX: number;
  originZ: number;
  walk: Uint8Array;
}

export function rasterize(j: JourneyDef): Grid {
  const cell = j.cell;
  const cols = Math.ceil((j.halfX * 2) / cell);
  const rows = Math.ceil((j.halfZ * 2) / cell);
  const originX = -j.halfX;
  const originZ = -j.halfZ;
  const walk = new Uint8Array(cols * rows);
  const rects = walkableRects(j);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const p = { x: originX + (c + 0.5) * cell, z: originZ + (r + 0.5) * cell };
      if (rects.some((rc) => inRect(p, rc, 1e-6))) walk[r * cols + c] = 1;
    }
  }
  return { cols, rows, cell, originX, originZ, walk };
}

/**
 * 벽 상자 만들기: 걷는 칸과 (8방향으로) 맞닿은 벽 칸을 가로로 이어 붙여 상자로.
 * 바깥 테두리는 DungeonScene 의 경계 벽이 막으므로 격자 범위 안의 칸만 만든다.
 */
export function buildWallBoxes(j: JourneyDef): ObstacleConfig[] {
  const g = rasterize(j);
  const isWalk = (c: number, r: number) => c >= 0 && r >= 0 && c < g.cols && r < g.rows && g.walk[r * g.cols + c] === 1;
  const wallCell = new Uint8Array(g.cols * g.rows);
  for (let r = 0; r < g.rows; r++) {
    for (let c = 0; c < g.cols; c++) {
      if (isWalk(c, r)) continue;
      let near = false;
      for (let dr = -1; dr <= 1 && !near; dr++) for (let dc = -1; dc <= 1; dc++) if ((dr || dc) && isWalk(c + dc, r + dr)) near = true;
      if (near) wallCell[r * g.cols + c] = 1;
    }
  }
  const boxes: ObstacleConfig[] = [];
  for (let r = 0; r < g.rows; r++) {
    let c = 0;
    while (c < g.cols) {
      if (!wallCell[r * g.cols + c]) {
        c++;
        continue;
      }
      let end = c;
      while (end + 1 < g.cols && wallCell[r * g.cols + end + 1]) end++;
      const n = end - c + 1;
      boxes.push({ x: g.originX + (c + n / 2) * g.cell, z: g.originZ + (r + 0.5) * g.cell, w: n * g.cell, d: g.cell, h: j.wallHeight, kind: 'hedge' });
      c = end + 1;
    }
  }
  return boxes;
}

/** 시작점에서 걸어서 닿는 칸들 (BFS). 문은 열린 것으로 친다 */
function reachable(j: JourneyDef): { g: Grid; seen: Uint8Array } {
  const g = rasterize(j);
  const seen = new Uint8Array(g.cols * g.rows);
  const toCell = (p: Vec2) => ({ c: Math.floor((p.x - g.originX) / g.cell), r: Math.floor((p.z - g.originZ) / g.cell) });
  const s = toCell(j.start);
  const queue = [s];
  seen[s.r * g.cols + s.c] = 1;
  while (queue.length) {
    const { c, r } = queue.shift()!;
    for (const [dc, dr] of [[1, 0], [-1, 0], [0, 1], [0, -1]] as const) {
      const nc = c + dc;
      const nr = r + dr;
      if (nc < 0 || nr < 0 || nc >= g.cols || nr >= g.rows) continue;
      const i = nr * g.cols + nc;
      if (seen[i] || !g.walk[i]) continue;
      seen[i] = 1;
      queue.push({ c: nc, r: nr });
    }
  }
  return { g, seen };
}

/** 시작에서 닿지 않는 구역 이름 목록 (비어 있으면 모두 연결됨) */
export function unreachableZones(j: JourneyDef): string[] {
  const { g, seen } = reachable(j);
  const out: string[] = [];
  for (const z of j.zones) {
    const c = Math.floor((z.rect.x - g.originX) / g.cell);
    const r = Math.floor((z.rect.z - g.originZ) / g.cell);
    if (!seen[r * g.cols + c]) out.push(z.id);
  }
  return out;
}

/** 메인 경로 구역을 순서대로 */
export function mainZones(j: JourneyDef): ZoneDef[] {
  return j.zones.filter((z) => z.mainIndex !== undefined).sort((a, b) => a.mainIndex! - b.mainIndex!);
}

/** 구역의 모든 적 배치 (파도 포함) */
export function zoneSpawns(z: ZoneDef): EnemySpawnConfig[] {
  return (z.waves ?? []).flatMap((w) => w.spawns);
}

/** 걷는 길의 대략적인 길이(유닛): 메인 구역 중심을 차례로 잇는 직선 거리 합 (플레이 시간 어림용) */
export function mainPathLength(j: JourneyDef): number {
  const zs = mainZones(j);
  let len = 0;
  for (let i = 1; i < zs.length; i++) len += Math.hypot(zs[i].rect.x - zs[i - 1].rect.x, zs[i].rect.z - zs[i - 1].rect.z);
  return len;
}
