import type { BossConfig } from './DungeonDefs';
import { GameConfig } from './GameConfig';

/** 보스 등장 팝업에 보여줄 패턴 설명 한 줄 (순수 함수, 테스트 대상) */
export interface BossPatternInfo {
  name: string;
  desc: string;
  tip: string;
}

/** 보스 설정에서 패턴 설명을 만든다: 돌진 여부 + 가까울 때 패턴(중복 제거) + 2단계 */
export function describeBossPatterns(cfg: BossConfig): BossPatternInfo[] {
  const out: BossPatternInfo[] = [];
  if (cfg.useCharge) out.push({ name: '돌진', desc: `${cfg.chargeMinRange} 이상 떨어져 있으면 바닥에 주황 원을 그린 뒤 똑바로 달려듭니다 (피해 ${cfg.contactDamage}).`, tip: '옆으로 비키기. 벽에 부딪히면 잠시 멈춥니다.' });
  const seen = new Set<string>();
  for (const p of cfg.closePatterns) {
    if (seen.has(p)) continue;
    seen.add(p);
    switch (p) {
      case 'slam':
        out.push({ name: '내려찍기', desc: `붉은 원이 커진 뒤 반지름 ${cfg.slam.radius} 안을 내려찍습니다 (피해 ${cfg.slam.damage}).`, tip: '원 밖으로 나가거나 점프(공중이면 안 맞음).' });
        break;
      case 'barrage':
        out.push({ name: '탄막', desc: `보라 원 뒤에 사방으로 ${cfg.barrage.count}발(2단계 ${cfg.barrage.phase2Count}발)을 쏩니다 (피해 ${cfg.barrage.damage}).`, tip: '탄 사이 틈으로 빠지거나 점프.' });
        break;
      case 'summon': {
        const t = GameConfig.enemies.types[cfg.summon.type];
        out.push({ name: '소환', desc: `팔을 벌리면 ${t?.name ?? cfg.summon.type} ${cfg.summon.count}마리(2단계 ${cfg.summon.phase2Count})가 나옵니다. 동시에 ${cfg.summon.maxAlive}마리까지.`, tip: '소환된 적은 약하니 먼저 정리하고 보스를 치기.' });
        break;
      }
      case 'mortar':
        out.push({ name: '포격 낙하', desc: `발밑에 주황 원 ${cfg.mortar.count}개(2단계 ${cfg.mortar.phase2Count})가 찍히고 ${cfg.mortar.delay}초 뒤 떨어집니다 (피해 ${cfg.mortar.damage}).`, tip: '원 밖으로 달리거나 점프.' });
        break;
    }
  }
  out.push({ name: `분노 (체력 ${Math.round(cfg.phase2Ratio * 100)}% 이하)`, desc: `눈이 붉어지고 예고가 빨라지며(×${cfg.phase2TimeMul}) 속도가 오릅니다(×${cfg.phase2SpeedMul}).`, tip: '2단계 전에 체력을 채워 두고, 예고를 보고 먼저 피한 뒤 때리기.' });
  return out;
}
