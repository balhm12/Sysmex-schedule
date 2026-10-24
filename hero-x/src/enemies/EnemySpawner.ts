import * as THREE from 'three';
import { GameConfig, type EnemySpawnConfig } from '../game/GameConfig';
import { Logger } from '../utils/Logger';
import { Enemy, type EnemyContext } from './Enemy';

/**
 * 적 배치·관리
 * - 던전 정의의 spawns 목록대로 적을 만들고, 매 프레임 갱신하며, 사망 연출이 끝난 적을 치운다.
 * - 설정에 없는 종류가 적혀 있으면 경고를 남기고 건너뛴다 (게임은 계속 실행).
 */
export class EnemySpawner {
  private readonly enemies: Enemy[] = [];

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
  spawn(type: string, x: number, z: number, elite = 1): Enemy | null {
    const def = GameConfig.enemies.types[type];
    if (!def) return null;
    const enemy = new Enemy(type, def, { x, z }, { hp: this.multipliers.hp * elite, speed: this.multipliers.speed });
    if (elite >= 1.5) enemy.object3d.scale.setScalar(1.25);
    this.scene.add(enemy.object3d);
    this.enemies.push(enemy);
    return enemy;
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
  }
}
