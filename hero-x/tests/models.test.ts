import { describe, expect, it } from 'vitest';
import { normalizeManifest } from '../src/assets/ModelRegistry';
import { classifyPart } from '../src/assets/PartRig';
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
