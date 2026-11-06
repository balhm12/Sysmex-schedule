/**
 * 체력 (플레이어와 적이 공통으로 사용)
 * - 피해, 회복, 무적 시간, 사망 판정을 담당한다. Three.js 에 의존하지 않아 단위 테스트가 쉽다.
 */
export class Health {
  /** 현재 체력 */
  hp: number;
  /** 남은 무적 시간(초). 0보다 크면 피해를 받지 않는다 */
  invulnerable = 0;

  constructor(
    public maxHp: number,
    /** 피격 후 무적 시간(초) */
    public invulnerableTime = 0,
  ) {
    this.hp = maxHp;
  }

  get isDead(): boolean {
    return this.hp <= 0;
  }

  /** 체력 비율 0~1 (체력바 표시용) */
  get ratio(): number {
    return this.maxHp > 0 ? Math.max(0, Math.min(1, this.hp / this.maxHp)) : 0;
  }

  /** 피해를 준다. 실제로 체력이 깎였으면 true (무적·사망·0 이하 피해는 false) */
  takeDamage(amount: number): boolean {
    if (this.isDead || this.invulnerable > 0 || amount <= 0) return false;
    this.hp = Math.max(0, this.hp - amount);
    this.invulnerable = this.invulnerableTime;
    return true;
  }

  /** 회복 (최대 체력을 넘지 않는다) */
  heal(amount: number): void {
    if (this.isDead || amount <= 0) return;
    this.hp = Math.min(this.maxHp, this.hp + amount);
  }

  /** 체력을 가득 채우고 무적을 해제한다 (재시작용). 최대 체력을 바꿀 수도 있다 */
  reset(maxHp = this.maxHp): void {
    this.maxHp = maxHp;
    this.hp = maxHp;
    this.invulnerable = 0;
  }

  /** 매 프레임: 무적 시간 감소 */
  update(dt: number): void {
    if (this.invulnerable > 0) this.invulnerable = Math.max(0, this.invulnerable - dt);
  }
}
