import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { EnemySpawner } from '../src/enemies/EnemySpawner';

describe('적 모델 미리 만들기 (EnemySpawner.prewarm)', () => {
  it('등장 목록만큼 만들고, spawn 은 풀의 모델을 꺼내 쓰며, 이미 있는 수는 다시 만들지 않는다', () => {
    const sp = new EnemySpawner(new THREE.Scene());
    const made = sp.prewarm([{ type: 'rusher' }, { type: 'rusher' }, { type: 'tank', skin: 'robot-tank' }, { type: 'nope' }]);
    expect(made).toBe(3);
    expect(sp.poolSize).toBe(3);
    expect(sp.pooledRoots().length).toBe(3);
    const root = sp.pooledRoots()[0];
    const e = sp.spawn('rusher', 1, 2);
    expect(e).not.toBeNull();
    expect(sp.poolSize).toBe(2);
    // 꺼낸 모델이 적에 붙어 있다
    const roots = new Set(sp.pooledRoots());
    expect(roots.has(root) || e!.object3d.children.length > 0).toBe(true);
    // 같은 종류·다른 외형은 풀을 쓰지 않는다
    sp.spawn('tank', 3, 4);
    expect(sp.poolSize).toBe(2);
    sp.spawn('tank', 3, 4, 1, 'robot-tank');
    expect(sp.poolSize).toBe(1);
    expect(sp.prewarm([{ type: 'rusher' }])).toBe(0);
    expect(sp.prewarm([{ type: 'rusher' }, { type: 'rusher' }])).toBe(1);
    sp.dispose();
    expect(sp.poolSize).toBe(0);
  });
});
