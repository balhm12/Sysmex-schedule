import type { EnemySpawnConfig } from '../game/GameConfig';
import type { Vec2 } from '../player/movement';
import { inRect, mainZones, type JourneyDef, type ZoneDef } from './journey';

/** 구역 진행기가 게임에 요구하는 것들 (Game 이 함수로 넘긴다) */
export interface ZoneHooks {
  /** 적 생성. 살아 있는지 확인용 핸들을 돌려준다 */
  spawn(s: EnemySpawnConfig): { alive: boolean } | null;
  /** 구역에 처음 들어섰을 때 (배너·소리) */
  onEnter(zone: ZoneDef): void;
  /** 구역의 적을 모두 처치했을 때 */
  onCleared(zone: ZoneDef): void;
  /** 문 열기 */
  openGate(id: string): void;
  /** 보스 구역에 들어섰을 때 (보스 등장) */
  onBossZone(zone: ZoneDef): void;
}

interface ZoneState {
  entered: boolean;
  cleared: boolean;
  enemies: Array<{ alive: boolean }>;
  /** 등장시킨 파도 수 */
  wavesDone: number;
  initialCount: number;
}

/**
 * 여정 던전 진행기
 * - 플레이어가 구역에 들어서면 'enter' 파도의 적이 등장하고, 처음 등장한 적이 절반 이하가 되면 'half' 파도(증원)가 나온다.
 * - 구역의 적을 모두 처치하면 '클리어' → 그 구역을 조건으로 하는 문이 열린다. 적이 없는 구역(출발·쉼터)은 들어서면 바로 클리어.
 * - 보스 구역은 들어서면 onBossZone (보스 처치는 Game 이 판정).
 * - 목표: 메인 경로에서 아직 클리어하지 않은 첫 구역. 진행도 = 클리어한 메인 구역 / 전체 메인 구역.
 */
export class ZoneSystem {
  private readonly state = new Map<string, ZoneState>();
  private readonly main: ZoneDef[];
  private current: ZoneDef | null = null;
  private bossEntered = false;

  constructor(private readonly journey: JourneyDef, private readonly hooks: ZoneHooks) {
    this.main = mainZones(journey);
    this.reset();
  }

  reset(): void {
    this.state.clear();
    for (const z of this.journey.zones) this.state.set(z.id, { entered: false, cleared: false, enemies: [], wavesDone: 0, initialCount: 0 });
    this.current = null;
    this.bossEntered = false;
  }

  /** 매 단계: 플레이어 위치로 진입·증원·클리어 판정 */
  update(playerPos: Vec2): void {
    // 진입 (여러 구역이 겹치면 모두)
    for (const z of this.journey.zones) {
      const st = this.state.get(z.id)!;
      if (!st.entered && inRect(playerPos, z.rect)) {
        st.entered = true;
        this.current = z;
        this.hooks.onEnter(z);
        this.spawnWave(z, st, 'enter');
        if (z.kind === 'boss' && !this.bossEntered) {
          this.bossEntered = true;
          this.hooks.onBossZone(z);
        }
      } else if (st.entered && inRect(playerPos, z.rect)) {
        this.current = z;
      }
    }
    // 증원·클리어
    for (const z of this.journey.zones) {
      const st = this.state.get(z.id)!;
      if (!st.entered || st.cleared) continue;
      if (z.kind === 'boss') continue; // 보스 처치는 Game 이 판정
      const alive = st.enemies.filter((e) => e.alive).length;
      const totalWaves = z.waves?.length ?? 0;
      if (st.wavesDone < totalWaves && alive <= Math.ceil(st.initialCount / 2)) {
        // 증원이 나온 단계에서는 클리어 판정을 하지 않는다 (방금 등장한 적이 살아 있으므로)
        this.spawnWave(z, st, 'half');
        continue;
      }
      if (alive === 0 && st.wavesDone >= totalWaves) {
        st.cleared = true;
        this.hooks.onCleared(z);
        for (const g of this.journey.gates) if (g.opensWhenCleared === z.id) this.hooks.openGate(g.id);
      }
    }
  }

  private spawnWave(z: ZoneDef, st: ZoneState, when: 'enter' | 'half'): void {
    const waves = z.waves ?? [];
    // 순서대로: enter 파도들 먼저, 그다음 half 파도들
    for (let i = st.wavesDone; i < waves.length; i++) {
      const w = waves[i];
      if (w.when !== when) break;
      for (const s of w.spawns) {
        const e = this.hooks.spawn(s);
        if (e) st.enemies.push(e);
      }
      if (when === 'enter') st.initialCount = st.enemies.length;
      st.wavesDone = i + 1;
    }
  }

  /** 밖에서 생긴 적(분열 슬라임의 새끼 등)을 그 자리의 구역에 붙인다 → 잡아야 구역이 클리어된다 */
  attach(enemy: { alive: boolean }, pos: Vec2): void {
    for (const z of this.journey.zones) {
      const st = this.state.get(z.id)!;
      if (st.entered && !st.cleared && inRect(pos, z.rect)) {
        st.enemies.push(enemy);
        return;
      }
    }
  }

  /** 보스 구역 클리어 표시 (Game 이 보스 처치 때 부른다) */
  markBossCleared(): void {
    const st = this.state.get(this.journey.bossZone);
    if (st) st.cleared = true;
  }

  isCleared(id: string): boolean {
    return this.state.get(id)?.cleared ?? false;
  }

  get currentZone(): ZoneDef | null {
    return this.current;
  }

  /** 지금 목표 (메인 경로에서 아직 클리어하지 않은 첫 구역) */
  get objective(): { zone: ZoneDef | null; text: string; done: number; total: number } {
    const done = this.main.filter((z) => this.state.get(z.id)!.cleared).length;
    const zone = this.main.find((z) => !this.state.get(z.id)!.cleared) ?? null;
    return { zone, text: zone ? zone.objective : '던전 클리어!', done, total: this.main.length };
  }

  /** 길잡이(빛 기둥)를 세울 자리: 목표 구역에 아직 들어가지 않았을 때 그 구역 중심 */
  get beacon(): Vec2 | null {
    const o = this.objective.zone;
    if (!o) return null;
    const st = this.state.get(o.id)!;
    return st.entered ? null : { x: o.rect.x, z: o.rect.z };
  }

  /** 디버그 */
  snapshot(): { current: string | null; objective: string; done: number; total: number; cleared: string[]; entered: string[] } {
    const o = this.objective;
    return {
      current: this.current?.id ?? null,
      objective: o.text,
      done: o.done,
      total: o.total,
      cleared: [...this.state.entries()].filter(([, s]) => s.cleared).map(([id]) => id),
      entered: [...this.state.entries()].filter(([, s]) => s.entered).map(([id]) => id),
    };
  }
}
