import * as THREE from 'three';
import type { Box } from '../player/movement';
import { pbr } from '../render/materials';

/**
 * 인트로 전용 세트: 창릉초등학교 3학년 교실
 * - 숲 던전 위에 나무 바닥·뒷벽·칠판(글자는 캔버스로 그림)·책상·의자·교탁을 잠깐 올려 둔다. 인트로가 끝나면 치운다.
 * - 책상·교탁·뒷벽은 충돌 상자를 함께 내줘 몬스터와 주인공이 통과하지 않는다 (Game 이 dungeon 에 넣었다 뺀다).
 * - 주인공은 (0, 3) 에 서서 +Z(칠판) 쪽을 보고 '공부' 하다가, 몬스터가 -Z 쪽에서 들이닥치면 돌아서서 싸운다.
 */
export class IntroSet {
  readonly root = new THREE.Group();
  readonly boxes: Box[] = [];
  private readonly disposables: Array<{ dispose(): void }> = [];

  constructor(center: { x: number; z: number }, schoolName: string) {
    const cx = center.x;
    const cz = center.z;
    this.root.name = 'IntroClassroom';
    const wood = pbr({ color: 0xb9895a, roughness: 0.8 });
    const woodDark = pbr({ color: 0x7a5230, roughness: 0.85 });
    const metal = pbr({ color: 0x8b94a3, roughness: 0.4, metalness: 0.6 });
    const wall = pbr({ color: 0xf1e9d8, roughness: 0.95 });
    const boardFrame = pbr({ color: 0x5a3b22, roughness: 0.85 });
    const paper = pbr({ color: 0xfafafa, roughness: 0.9 });
    const bookRed = pbr({ color: 0xc0392b, roughness: 0.8 });
    const bookBlue = pbr({ color: 0x2f58c4, roughness: 0.8 });
    this.disposables.push(wood, woodDark, metal, wall, boardFrame, paper, bookRed, bookBlue);

    const add = (geo: THREE.BufferGeometry, mat: THREE.Material, x: number, y: number, z: number, castShadow = true): THREE.Mesh => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.castShadow = castShadow;
      m.receiveShadow = true;
      this.root.add(m);
      this.disposables.push(geo);
      return m;
    };

    // 나무 바닥 (얇게 올려 잔디를 덮는다)
    add(new THREE.BoxGeometry(13, 0.06, 11), wood, cx, 0.03, cz + 1.5, false);
    for (let i = -6; i <= 6; i += 1.3) add(new THREE.BoxGeometry(0.04, 0.07, 11), woodDark, cx + i, 0.035, cz + 1.5, false);

    // 뒷벽 + 칠판 + 시계 + 창문
    add(new THREE.BoxGeometry(13, 3.4, 0.3), wall, cx, 1.7, cz + 7.2);
    this.boxes.push({ x: cx, z: cz + 7.2, w: 13, d: 0.3 });
    add(new THREE.BoxGeometry(5.2, 2.0, 0.12), boardFrame, cx - 1, 1.9, cz + 7.0);
    const board = this.makeBoardTexture(schoolName);
    const boardMat = new THREE.MeshStandardMaterial({ map: board, roughness: 0.9 });
    this.disposables.push(board, boardMat);
    add(new THREE.BoxGeometry(4.9, 1.75, 0.06), boardMat, cx - 1, 1.92, cz + 6.93);
    add(new THREE.BoxGeometry(5.2, 0.1, 0.2), boardFrame, cx - 1, 0.95, cz + 6.96); // 분필 받침
    add(new THREE.CylinderGeometry(0.32, 0.32, 0.06, 20), paper, cx + 4.2, 2.8, cz + 7.0).rotation.x = Math.PI / 2; // 시계
    add(new THREE.BoxGeometry(0.04, 0.22, 0.04), metal, cx + 4.2, 2.9, cz + 6.95);
    add(new THREE.BoxGeometry(0.16, 0.04, 0.04), metal, cx + 4.27, 2.8, cz + 6.95);
    add(new THREE.BoxGeometry(1.6, 1.4, 0.1), pbr({ color: 0x9fd8ff, roughness: 0.2, metalness: 0.1 }), cx + 4.5, 1.9, cz + 7.0); // 창문
    add(new THREE.BoxGeometry(1.7, 0.08, 0.14), woodDark, cx + 4.5, 1.9, cz + 7.0);
    add(new THREE.BoxGeometry(0.08, 1.5, 0.14), woodDark, cx + 4.5, 1.9, cz + 7.0);

    // 교탁
    this.desk(add, wood, woodDark, cx + 3.2, cz + 5.6, 1.5, 0.9, 1.0);
    // 학생 책상 두 줄 (주인공 책상은 앞줄 가운데 왼쪽, 책이 펼쳐져 있다)
    const desks: Array<[number, number]> = [
      [cx - 3.4, cz - 1.2],
      [cx - 0.9, cz - 1.2],
      [cx + 1.8, cz - 1.2],
      [cx - 3.4, cz + 1.6],
      [cx + 1.8, cz + 1.6],
    ];
    for (const [dx, dz] of desks) {
      this.desk(add, wood, metal, dx, dz, 1.3, 0.8, 0.78);
      // 의자 (책상 뒤, 칠판 반대쪽 = -Z 쪽)
      add(new THREE.BoxGeometry(0.5, 0.06, 0.5), wood, dx, 0.46, dz - 0.75);
      add(new THREE.BoxGeometry(0.5, 0.5, 0.06), wood, dx, 0.72, dz - 0.98);
      for (const sx of [-0.2, 0.2]) for (const sz of [-0.2, 0.2]) add(new THREE.BoxGeometry(0.05, 0.46, 0.05), metal, dx + sx, 0.23, dz - 0.75 + sz);
    }
    // 주인공 책상의 책·연필
    add(new THREE.BoxGeometry(0.55, 0.05, 0.4), paper, cx - 0.9, 0.82, cz - 1.25);
    add(new THREE.BoxGeometry(0.3, 0.06, 0.4), bookRed, cx - 1.35, 0.82, cz - 1.2);
    add(new THREE.BoxGeometry(0.3, 0.08, 0.42), bookBlue, cx - 0.45, 0.83, cz - 1.15);
    add(new THREE.BoxGeometry(0.03, 0.03, 0.3), pbr({ color: 0xf2c94c, roughness: 0.6 }), cx - 0.7, 0.81, cz - 1.3);
    // 교탁 위 지구본 느낌 공
    add(new THREE.SphereGeometry(0.22, 12, 10), pbr({ color: 0x4f7fe0, roughness: 0.5 }), cx + 3.2, 1.3, cz + 5.6);
  }

  /** 책상: 상판 + 다리 4개 + 충돌 상자 */
  private desk(add: (g: THREE.BufferGeometry, m: THREE.Material, x: number, y: number, z: number) => THREE.Mesh, top: THREE.Material, leg: THREE.Material, x: number, z: number, w: number, d: number, h: number): void {
    add(new THREE.BoxGeometry(w, 0.08, d), top, x, h, z);
    add(new THREE.BoxGeometry(w - 0.1, 0.25, d - 0.1), top, x, h - 0.2, z);
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) add(new THREE.BoxGeometry(0.07, h, 0.07), leg, x + sx * (w / 2 - 0.08), h / 2, z + sz * (d / 2 - 0.08));
    this.boxes.push({ x, z, w, d });
  }

  /** 칠판 글자 (캔버스로 그려 텍스처로) */
  private makeBoardTexture(schoolName: string): THREE.Texture {
    const c = document.createElement('canvas');
    c.width = 1024;
    c.height = 368;
    const g = c.getContext('2d');
    if (g) {
      g.fillStyle = '#2f5d46';
      g.fillRect(0, 0, c.width, c.height);
      g.strokeStyle = 'rgba(255,255,255,0.08)';
      for (let i = 0; i < 40; i++) {
        g.beginPath();
        g.moveTo(Math.random() * c.width, Math.random() * c.height);
        g.lineTo(Math.random() * c.width, Math.random() * c.height);
        g.stroke();
      }
      g.fillStyle = '#f7f3e3';
      g.textAlign = 'center';
      g.font = '700 74px sans-serif';
      g.fillText(`${schoolName} 3학년`, c.width / 2, 120);
      g.font = '600 58px sans-serif';
      g.fillStyle = '#ffe9a8';
      g.fillText('오늘의 수학:  347 + 268 = ?', c.width / 2, 220);
      g.font = '500 40px sans-serif';
      g.fillStyle = '#cfe9d8';
      g.fillText('조용히 문제를 풉니다 ✎', c.width / 2, 300);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  }

  dispose(): void {
    this.root.removeFromParent();
    for (const d of this.disposables) d.dispose();
  }
}
