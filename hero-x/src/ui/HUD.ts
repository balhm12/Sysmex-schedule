/**
 * 전투 중 화면 표시(HUD): 체력바, 남은 적, 처치 수, 점수
 * - 값이 바뀔 때만 DOM 을 갱신한다.
 */
export class HUD {
  private readonly root: HTMLDivElement;
  private readonly hpFill: HTMLElement;
  private readonly hpText: HTMLElement;
  private readonly enemiesText: HTMLElement;
  private readonly killsText: HTMLElement;
  private readonly scoreText: HTMLElement;
  private last = { hp: -1, maxHp: -1, enemies: -1, kills: -1, score: -1 };

  constructor(parent: HTMLElement) {
    this.root = document.createElement('div');
    this.root.className = 'hud-top';
    this.root.innerHTML = `
      <div class="hud-panel hud-hp">
        <div class="hud-label">체력</div>
        <div class="hp-bar"><i id="hud-hp-fill"></i></div>
        <div class="hud-value" id="hud-hp-text">100 / 100</div>
      </div>
      <div class="hud-panel hud-stats">
        <div><span class="hud-label">남은 적</span><b id="hud-enemies">0</b></div>
        <div><span class="hud-label">처치</span><b id="hud-kills">0</b></div>
        <div><span class="hud-label">점수</span><b id="hud-score">0</b></div>
      </div>`;
    parent.appendChild(this.root);
    this.hpFill = this.root.querySelector('#hud-hp-fill') as HTMLElement;
    this.hpText = this.root.querySelector('#hud-hp-text') as HTMLElement;
    this.enemiesText = this.root.querySelector('#hud-enemies') as HTMLElement;
    this.killsText = this.root.querySelector('#hud-kills') as HTMLElement;
    this.scoreText = this.root.querySelector('#hud-score') as HTMLElement;
  }

  update(data: { hp: number; maxHp: number; enemies: number; kills: number; score: number }): void {
    const hp = Math.ceil(data.hp);
    if (hp !== this.last.hp || data.maxHp !== this.last.maxHp) {
      const ratio = data.maxHp > 0 ? Math.max(0, Math.min(1, data.hp / data.maxHp)) : 0;
      this.hpFill.style.width = `${ratio * 100}%`;
      this.hpFill.classList.toggle('low', ratio <= 0.3);
      this.hpText.textContent = `${hp} / ${data.maxHp}`;
      this.last.hp = hp;
      this.last.maxHp = data.maxHp;
    }
    if (data.enemies !== this.last.enemies) {
      this.enemiesText.textContent = String(data.enemies);
      this.last.enemies = data.enemies;
    }
    if (data.kills !== this.last.kills) {
      this.killsText.textContent = String(data.kills);
      this.last.kills = data.kills;
    }
    if (data.score !== this.last.score) {
      this.scoreText.textContent = data.score.toLocaleString('ko-KR');
      this.last.score = data.score;
    }
  }

  /** 피격 순간 화면 테두리를 붉게 번쩍인다 */
  flashHit(): void {
    this.root.classList.remove('hit');
    void this.root.offsetWidth; // 애니메이션 재시작
    this.root.classList.add('hit');
  }

  show(): void {
    this.root.hidden = false;
  }

  hide(): void {
    this.root.hidden = true;
  }
}
