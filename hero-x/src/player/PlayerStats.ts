import { GameConfig } from '../game/GameConfig';

/**
 * 플레이어 성장 수치: 레벨, 경험치, 골드
 * - 레벨이 오르면 최대 체력과 공격력 배율이 늘어난다 (수치는 GameConfig.progression).
 * - Three.js 에 의존하지 않아 단위 테스트가 쉽다. 저장(5단계)은 이 객체의 값을 그대로 저장하면 된다.
 */
export class PlayerStats {
  level = 1;
  xp = 0;
  gold = 0;

  /** 다음 레벨까지 필요한 경험치 (레벨이 오를수록 증가) */
  get xpToNext(): number {
    const p = GameConfig.progression;
    return Math.round(p.xpBase * Math.pow(p.xpGrowth, this.level - 1));
  }

  /** 레벨 보너스를 더한 최대 체력 */
  get maxHp(): number {
    return GameConfig.player.maxHp + (this.level - 1) * GameConfig.progression.hpPerLevel;
  }

  /** 레벨 보너스 공격력 배율 (1 = 보너스 없음) */
  get damageMultiplier(): number {
    return 1 + (this.level - 1) * GameConfig.progression.damagePerLevel;
  }

  /** 경험치를 더하고, 오른 레벨 수를 돌려준다 (여러 레벨을 한 번에 오를 수도 있다) */
  addXp(amount: number): number {
    if (amount <= 0) return 0;
    this.xp += amount;
    let gained = 0;
    const maxLevel = GameConfig.progression.maxLevel;
    while (this.level < maxLevel && this.xp >= this.xpToNext) {
      this.xp -= this.xpToNext;
      this.level++;
      gained++;
    }
    if (this.level >= maxLevel) this.xp = Math.min(this.xp, this.xpToNext);
    return gained;
  }

  addGold(amount: number): void {
    if (amount > 0) this.gold += amount;
  }

  /** 처음 상태로 (새 게임) */
  reset(): void {
    this.level = 1;
    this.xp = 0;
    this.gold = 0;
  }
}
