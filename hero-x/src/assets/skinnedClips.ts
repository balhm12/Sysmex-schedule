import type * as THREE from 'three';

/**
 * 뼈대 애니메이션 모델(.glb)의 클립 이름 → 역할 매핑 (순수 함수, 테스트 대상)
 * - KayKit Adventurers 같은 팩의 정확한 이름을 먼저 찾고, 없으면 키워드(소문자 포함)로 찾는다.
 * - 없는 역할은 null: 재생 코드가 대체 동작(예: 걷기 대신 달리기, 피격 없음)을 고른다.
 */
export interface ClipRoles {
  idle: string | null;
  walk: string | null;
  run: string | null;
  /** 근접 콤보 단계별 (0, 1, 2…). 단계가 더 많으면 마지막 것을 반복 */
  attack: string[];
  ranged: string | null;
  dodge: string | null;
  jump: string | null;
  jumpIdle: string | null;
  hit: string | null;
  death: string | null;
}

/** 역할별 후보: 앞에 있을수록 우선. 소문자 비교, '='로 시작하면 정확히 일치해야 하고 아니면 '포함' */
const CANDIDATES: Record<Exclude<keyof ClipRoles, 'attack'>, string[]> = {
  idle: ['=idle', '=unarmed_idle', 'idle', 'stand'],
  walk: ['=walking_a', '=walking_b', '=walking_c', 'walking', 'walk'],
  run: ['=running_a', '=running_b', 'running', 'run'],
  ranged: ['=1h_ranged_shoot', '=spellcast_shoot', '=2h_ranged_shoot', 'shoot', 'throw'],
  dodge: ['=dodge_forward', 'dodge', 'roll'],
  jump: ['=jump_full_short', '=jump_start', 'jump'],
  jumpIdle: ['=jump_idle', 'jump_idle', 'fall'],
  hit: ['=hit_a', '=hit_b', 'hit', 'hurt', 'damage'],
  death: ['=death_a', '=death_b', 'death', 'die', 'dead'],
};
const ATTACK_STEPS: string[][] = [
  ['=1h_melee_attack_slice_horizontal', '=1h_melee_attack_chop', 'slice', 'attack', 'slash', 'punch'],
  ['=1h_melee_attack_slice_diagonal', '=1h_melee_attack_chop', 'chop', 'attack', 'slash', 'punch'],
  ['=2h_melee_attack_spin', '=2h_melee_attack_spinning', '=1h_melee_attack_stab', 'spin', 'stab', 'attack', 'slash', 'punch'],
];

function pick(names: string[], candidates: string[]): string | null {
  const lower = names.map((n) => n.toLowerCase());
  for (const c of candidates) {
    const exact = c.startsWith('=');
    const key = exact ? c.slice(1) : c;
    const i = lower.findIndex((n) => (exact ? n === key : n.includes(key)));
    if (i >= 0) return names[i];
  }
  return null;
}

/** 클립 이름 목록에서 역할표를 만든다 */
export function resolveClipRoles(names: string[]): ClipRoles {
  const out = {} as ClipRoles;
  for (const key of Object.keys(CANDIDATES) as Array<Exclude<keyof ClipRoles, 'attack'>>) out[key] = pick(names, CANDIDATES[key]);
  out.attack = ATTACK_STEPS.map((c) => pick(names, c)).filter((n): n is string => n !== null);
  // 걷기만 있고 달리기가 없으면(또는 반대) 서로 대신 쓴다
  if (!out.run && out.walk) out.run = out.walk;
  if (!out.walk && out.run) out.walk = out.run;
  return out;
}

/** 역할표 → 사람이 읽을 요약 (디버그·로그) */
export function describeClipRoles(r: ClipRoles): string {
  return `idle=${r.idle} walk=${r.walk} run=${r.run} attack=[${r.attack.join(',')}] ranged=${r.ranged} dodge=${r.dodge} jump=${r.jump}/${r.jumpIdle} hit=${r.hit} death=${r.death}`;
}

/** 클립 배열에서 이름으로 찾기 */
export function clipByName(clips: THREE.AnimationClip[], name: string | null): THREE.AnimationClip | null {
  if (!name) return null;
  return clips.find((c) => c.name === name) ?? null;
}
