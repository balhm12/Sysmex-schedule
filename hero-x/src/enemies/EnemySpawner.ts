import * as THREE from 'three';
import { GameConfig, type EnemySpawnConfig } from '../game/GameConfig';
import { Logger } from '../utils/Logger';
import { Enemy, type EnemyContext } from './Enemy';
import { createEnemyModel, type EnemyModel } from './EnemyModels';

/**
 * 적 배치·관리
 * - 던전 정의의 spawns 목록대로 적을 만들고, 매 프레임 갱신하며, 사망 연출이 끝난 적을 치운다.
 * - 설정에 없는 종류가 적혀 있으면 경고를 남기고 건너뛴다 (게임은 계속 실행).
 */
export class EnemySpawner {
  private readonly enemies: Enemy[] = [];
  /** 미리 만들어 둔 적 모델 (키 = 종류:외형). 구역에 들어가 적이 나타날 때 모델을 새로 만들지 않아 끊김이 없다 */
  private readonly pool = new Map<string, EnemyModel[]>();

  /** 적 생성에 적용할 난이도 배율 (Game 이 난이도 변경 시 갱신) */
  multipliers = { hp: 1, speed: 1 };

  constructor(private readonly scene: THREE.Scene) {}

  /** 배치 목록대로 적 생성 (기본은 GameConfig.enemies.spawns, 던전마다 다른 목록을 넘긴다) */
  spawnFromConfig(spawns: EnemySpawnConfig[] = GameConfig.enemies.spawns): void {
    for (const s of spawns) {
      const def = GameConfig.enemies.types[s.type];
      if (!def) {
        Logger.warn(`적 종류 '${s.type}' 이(가) GameConfig.enemies.types 에 없어 배치를 건너뜁니다.`);
        continue;
      }
      this.spawn(s.type, s.x, s.z);
    }
  }

  /** 적 한 마리 생성. elite(정예 배율)가 있으면 체력이 그만큼 세지고 1.5 이상이면 몸집도 커진다 */
  spawn(type: string, x: number, z: number, elite = 1, skin?: string): Enemy | null {
    const def = GameConfig.enemies.types[type];
    if (!def) return null;
    const pooled = this.takePooled(type, skin);
    const enemy = new Enemy(type, def, { x, z }, { hp: this.multipliers.hp * elite, speed: this.multipliers.speed }, pooled ? () => pooled : skin ? (t, d) => createEnemyModel(t, d, skin) : undefined);
    // 몸집: 정예는 크게, 그 외는 개체마다 조금씩 다르게 (보기용)
    const jitter = GameConfig.enemies.sizeJitter;
    enemy.object3d.scale.setScalar(elite >= 1.5 ? 1.25 : 1 + (Math.random() * 2 - 1) * jitter);
    this.scene.add(enemy.object3d);
    this.enemies.push(enemy);
    return enemy;
  }

  private static poolKey(type: string, skin?: string): string {
    return skin ? `${type}:${skin}` : type;
  }

  private takePooled(type: string, skin?: string): EnemyModel | null {
    const list = this.pool.get(EnemySpawner.poolKey(type, skin));
    return list && list.length > 0 ? list.pop()! : null;
  }

  /**
   * 등장 예정 목록만큼 모델을 미리 만든다 (이미 있는 수는 빼고). 던전을 열 때 부르면 전투 중 생성 비용이 없다.
   * 만든 모델 수를 돌려준다. 설정에 없는 종류는 건너뛴다.
   */
  prewarm(entries: Array<{ type: string; skin?: string }>): number {
    const need = new Map<string, { type: string; skin?: string; n: number }>();
    for (const e of entries) {
      const k = EnemySpawner.poolKey(e.type, e.skin);
      const cur = need.get(k) ?? { type: e.type, skin: e.skin, n: 0 };
      cur.n++;
      need.set(k, cur);
    }
    let made = 0;
    for (const [k, v] of need) {
      const def = GameConfig.enemies.types[v.type];
      if (!def) continue;
      const list = this.pool.get(k) ?? [];
      while (list.length < v.n) {
        list.push(createEnemyModel(v.type, def, v.skin));
        made++;
      }
      this.pool.set(k, list);
    }
    return made;
  }

  /** 풀에 있는 모델 수 (검증용) */
  get poolSize(): number {
    let n = 0;
    for (const l of this.pool.values()) n += l.length;
    return n;
  }

  /** 풀에 있는 모델의 루트들 (셰이더 미리 컴파일용) */
  pooledRoots(): THREE.Object3D[] {
    const out: THREE.Object3D[] = [];
    for (const l of this.pool.values()) for (const m of l) out.push(m.root);
    return out;
  }

  /** 밖에서 만든 적(보스 등)을 목록에 넣는다 */
  addEnemy(enemy: Enemy): void {
    this.scene.add(enemy.object3d);
    this.enemies.push(enemy);
  }

  /** 모든 적 (사망 연출 중인 적 포함) */
  getEnemies(): Enemy[] {
    return this.enemies;
  }

  /** 살아 있는 적 수 */
  get aliveCount(): number {
    return this.enemies.reduce((n, e) => n + (e.alive ? 1 : 0), 0);
  }

  update<T extends Omit<EnemyContext, 'others'>>(dt: number, ctx: T): void {
    const full: EnemyContext & T = { ...ctx, others: this.enemies };
    for (const e of this.enemies) e.update(dt, full);
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      if (this.enemies[i].removable) {
        this.enemies[i].dispose();
        this.enemies.splice(i, 1);
      }
    }
  }

  /** 모든 적 제거 (재시작용) */
  clear(): void {
    this.enemies.forEach((e) => e.dispose());
    this.enemies.length = 0;
  }

  dispose(): void {
    this.clear();
    for (const l of this.pool.values()) for (const m of l) m.dispose();
    this.pool.clear();
  }
}
