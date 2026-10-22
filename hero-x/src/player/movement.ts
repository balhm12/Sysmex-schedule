/**
 * 이동·충돌 계산 (순수 함수 모음)
 * - Three.js나 브라우저에 의존하지 않아서 단위 테스트가 쉽다 (tests/movement.test.ts).
 * - PlayerController 가 매 프레임 이 함수들을 호출한다.
 */

/** 바닥 평면 위의 2D 좌표 (x, z) */
export interface Vec2 {
  x: number;
  z: number;
}

/** 축에 정렬된 사각형 장애물: 중심(x, z)과 가로(w), 세로(d) */
export interface Box {
  x: number;
  z: number;
  w: number;
  d: number;
}

/** 충돌 정보를 제공하는 세계(던전)의 인터페이스. 던전 파일을 바꿔도 플레이어 코드는 그대로 쓴다. */
export interface CollisionWorld {
  getObstacleBoxes(): Box[];
  getArenaHalfSize(): number;
}

const clamp = (v: number, a: number, b: number): number => Math.max(a, Math.min(b, v));

/**
 * 입력 축을 카메라 기준 이동 방향(길이 1)으로 바꾼다.
 * - cameraYaw 가 0이면 화면 위쪽(W)이 -Z 방향이다.
 * - 입력이 없으면 (0, 0)을 돌려준다.
 */
export function computeMoveDirection(axis: Vec2, cameraYaw = 0): Vec2 {
  const len = Math.hypot(axis.x, axis.z);
  if (len < 1e-6) return { x: 0, z: 0 };
  const nx = axis.x / len;
  const nz = axis.z / len;
  const cos = Math.cos(cameraYaw);
  const sin = Math.sin(cameraYaw);
  return { x: nx * cos + nz * sin, z: -nx * sin + nz * cos };
}

/**
 * 원(플레이어)과 사각형 장애물들의 겹침을 밀어내어 새 위치를 돌려준다.
 * 장애물 안쪽 깊숙이 들어간 경우에는 더 가까운 면으로 밀어낸다.
 */
export function resolveCircleVsBoxes(pos: Vec2, radius: number, boxes: Box[]): Vec2 {
  const out = { x: pos.x, z: pos.z };
  for (const b of boxes) {
    const hw = b.w / 2;
    const hd = b.d / 2;
    const cx = clamp(out.x, b.x - hw, b.x + hw);
    const cz = clamp(out.z, b.z - hd, b.z + hd);
    const dx = out.x - cx;
    const dz = out.z - cz;
    const dist2 = dx * dx + dz * dz;
    if (dist2 >= radius * radius) continue;
    if (dist2 < 1e-9) {
      // 중심이 상자 안에 있음: 가장 얕게 겹친 축으로 밀어낸다
      const penX = hw + radius - Math.abs(out.x - b.x);
      const penZ = hd + radius - Math.abs(out.z - b.z);
      if (penX < penZ) out.x += Math.sign(out.x - b.x || 1) * penX;
      else out.z += Math.sign(out.z - b.z || 1) * penZ;
    } else {
      const dist = Math.sqrt(dist2);
      out.x = cx + (dx / dist) * radius;
      out.z = cz + (dz / dist) * radius;
    }
  }
  return out;
}

/** 이동 가능 영역 밖으로 나가지 못하게 한다 */
export function clampToArena(pos: Vec2, halfSize: number, radius: number): Vec2 {
  const limit = Math.max(0, halfSize - radius);
  return { x: clamp(pos.x, -limit, limit), z: clamp(pos.z, -limit, limit) };
}

/** 각도(라디안)를 최단 방향으로 보간한다. t는 0~1 */
export function lerpAngle(from: number, to: number, t: number): number {
  let diff = (to - from) % (Math.PI * 2);
  if (diff > Math.PI) diff -= Math.PI * 2;
  if (diff < -Math.PI) diff += Math.PI * 2;
  return from + diff * clamp(t, 0, 1);
}

/** 이동 방향 → 캐릭터가 바라볼 각도 (모델 정면이 +Z 일 때) */
export function directionToFacing(dir: Vec2): number {
  return Math.atan2(dir.x, dir.z);
}
