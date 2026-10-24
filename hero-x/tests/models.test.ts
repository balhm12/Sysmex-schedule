import { describe, expect, it } from 'vitest';
import { normalizeManifest } from '../src/assets/ModelRegistry';
import { classifyEnemyPart, classifyPart, enemyPartGroup } from '../src/assets/PartRig';
import { cropRect } from '../src/player/FaceTexture';

describe('얼굴 사진 자르기 (cropRect)', () => {
  it('세로 사진은 가로 전체, 세로는 위쪽 40% 지점 중심의 정사각형', () => {
    const r = cropRect(600, 1000);
    expect(r.size).toBe(600);
    expect(r.x).toBe(0);
    expect(r.y).toBe(100); // 0.4×1000 − 300
  });
  it('가로 사진은 세로 전체, 가로 가운데', () => {
    const r = cropRect(1000, 400);
    expect(r).toEqual({ x: 300, y: 0, size: 400 });
  });
  it('정사각형은 그대로, 0 크기는 1 로 보정', () => {
    expect(cropRect(300, 300)).toEqual({ x: 0, y: 0, size: 300 });
    expect(cropRect(0, 0).size).toBe(1);
  });
});

describe('모델 manifest 검증 (normalizeManifest)', () => {
  it('비어 있거나 잘못된 입력은 모두 null 로', () => {
    expect(normalizeManifest(null)).toEqual({ player: null, enemies: {}, bosses: {} });
    expect(normalizeManifest({ player: { scale: 2 } }).player).toBeNull(); // file 없음
    expect(normalizeManifest({ enemies: { rusher: 'x.glb' } }).enemies).toEqual({});
  });
  it('항목이 있으면 기본값(scale 1, offsetY 0, rotationY 0)을 채운다', () => {
    const m = normalizeManifest({ player: { file: 'player.glb' }, enemies: { rusher: { file: 'r.glb', scale: 0.5, rotationY: 180 }, tank: null }, bosses: { golem: { file: 'g.glb', offsetY: -0.1 } } });
    expect(m.player).toEqual({ file: 'player.glb', scale: 1, offsetY: 0, rotationY: 0, rotationX: 0 });
    expect(m.enemies.rusher).toEqual({ file: 'r.glb', scale: 0.5, offsetY: 0, rotationY: 180, rotationX: 0 });
    expect('tank' in m.enemies).toBe(false);
    expect(m.bosses.golem?.offsetY).toBe(-0.1);
    expect(normalizeManifest({ player: { file: 'p.glb', scale: -1 } }).player?.scale).toBe(1);
  });
});

describe('부품 이름 리그 (classifyPart)', () => {
  it('left_/right_ 접두어 + 다리·팔 부품, 머리·무기 이름을 분류한다', () => {
    expect(classifyPart('left_leg')).toBe('leftLeg');
    expect(classifyPart('right_boot_trim')).toBe('rightLeg');
    expect(classifyPart('L_Knee')).toBe('leftLeg');
    expect(classifyPart('right_arm')).toBe('rightArm');
    expect(classifyPart('left_bracer_gold')).toBe('leftArm');
    expect(classifyPart('left_shoulder')).toBe('leftArm');
    expect(classifyPart('head')).toBe('head');
    expect(classifyPart('hair_left')).toBe('head');
    expect(classifyPart('left_ear')).toBe('head');
    expect(classifyPart('eye_white_L')).toBe('head');
    expect(classifyPart('glasses_bridge')).toBe('head');
    expect(classifyPart('sword_blade')).toBe('weapon');
    expect(classifyPart('torso')).toBeNull();
    expect(classifyPart('backpack')).toBeNull();
    expect(classifyPart('belt')).toBeNull();
  });
});

describe('적 부품 이름 리그 (classifyEnemyPart / enemyPartGroup)', () => {
  it('접두어로 종류를 정하고, 두 번째 토큰까지가 한 관절 묶음이다', () => {
    expect(classifyEnemyPart('wheel_fl')).toBe('wheel');
    expect(classifyEnemyPart('wheel_fl_hub')).toBe('wheel');
    expect(classifyEnemyPart('claw_l_arm')).toBe('claw');
    expect(classifyEnemyPart('rotor_blade_a')).toBe('rotor');
    expect(classifyEnemyPart('wing_r_tip')).toBe('wing');
    expect(classifyEnemyPart('barrel_main')).toBe('barrel');
    expect(classifyEnemyPart('shield_rim_top')).toBe('shield');
    expect(classifyEnemyPart('piston_l')).toBe('piston');
    expect(classifyEnemyPart('antenna_a')).toBe('antenna');
    expect(classifyEnemyPart('glow_muzzle')).toBe('glow');
    expect(classifyEnemyPart('eye_lens')).toBe('eye');
    expect(classifyEnemyPart('float_tail')).toBe('float');
    expect(classifyEnemyPart('leg_l_claw')).toBe('leg');
    expect(classifyEnemyPart('left_leg')).toBeNull(); // 사람형 부품은 classifyPart 가 맡는다
    expect(classifyPart('weapon_club')).toBe('weapon');
    expect(classifyPart('tooth_l')).toBeNull();
    expect(classifyEnemyPart('body')).toBeNull();
    expect(classifyEnemyPart('stripe_0')).toBeNull();
    expect(enemyPartGroup('wheel_fl_hub')).toBe('wheel:fl');
    expect(enemyPartGroup('claw_l_tip')).toBe('claw:l');
    expect(enemyPartGroup('rotor_blade_a')).toBe('rotor:blade'); // 로터는 날개·축이 묶음이 달라도 모두 중심에서 돈다
    expect(enemyPartGroup('shield')).toBe('shield');
  });
});

// ---------------------------------------------------------------- 보스 .glb (tools/make_bosses_glb.py 산출물)
// @ts-expect-error 테스트 전용 Node 모듈 (프로젝트에 @types/node 를 두지 않음 — vitest 는 그대로 실행한다)
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error 위와 같음
import { resolve } from 'node:path';

/** .glb 의 JSON 청크에서 노드(부품) 이름을 뽑는다 */
function glbNodeNames(file: string): string[] {
  const buf: Uint8Array = readFileSync(file);
  const jsonLen = new DataView(buf.buffer, buf.byteOffset).getUint32(12, true);
  const json = JSON.parse(new TextDecoder().decode(buf.subarray(20, 20 + jsonLen))) as { nodes?: Array<{ name?: string }> };
  return (json.nodes ?? []).map((n) => n.name ?? '');
}

describe('보스 복셀 모델 (public/models/boss-*.glb)', () => {
  const dir: string = resolve(new URL('.', import.meta.url).pathname, '../public/models');
  const manifest = JSON.parse(readFileSync(resolve(dir, 'manifest.json'), 'utf8') as string) as { bosses: Record<string, { file: string } | null> };
  for (const kind of ['guardian', 'golem', 'commander', 'frost']) {
    it(`${kind}: manifest 에 등록돼 있고 파일이 있으며, 사람형 리그 부품(팔·다리·머리·눈)이 들어 있다`, () => {
      const entry = manifest.bosses[kind];
      expect(entry?.file).toBe(`boss-${kind}.glb`);
      const file: string = resolve(dir, entry!.file);
      expect(existsSync(file)).toBe(true);
      const names = glbNodeNames(file);
      const kinds = new Set(names.map((n) => classifyPart(n)));
      expect(kinds.has('leftLeg') && kinds.has('rightLeg') && kinds.has('leftArm') && kinds.has('rightArm') && kinds.has('head')).toBe(true);
      expect(names.some((n) => /^eye_/.test(n))).toBe(true);
      // 발광 부품은 적 리그 'glow' 관절이 된다 (예고 때 밝아짐)
      expect(names.some((n) => classifyEnemyPart(n) === 'glow')).toBe(true);
    });
  }
  it('수호 로봇·사령관은 무기(weapon_*)가 있어 리그가 무기 팔을 치켜들고, 골렘·서리 거인은 맨주먹', () => {
    const has = (k: string) => glbNodeNames(resolve(dir, `boss-${k}.glb`)).some((n) => classifyPart(n) === 'weapon');
    expect(has('guardian')).toBe(true);
    expect(has('commander')).toBe(true);
    expect(has('golem')).toBe(false);
    expect(has('frost')).toBe(false);
  });
});
