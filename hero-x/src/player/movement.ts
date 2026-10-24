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

/** 축에 정렬된 사각형 장애물: 중심(x, z)과 가로(w), 세로(d). h(높이)가 있으면 점프로 올라설 수 있다 */
export interface Box {
  x: number;
  z: number;
  w: number;
  d: number;
  h?: number;
}

/**
 * 발 높이(feetY)가 상자 윗면에 (올라서기 보조 climbAssist 만큼 모자라도) 닿았으면 그 상자는 가로막지 않는다.
 * 높이가 없는 상자(h 없음)는 항상 가로막는다.
 */
export function isAboveBox(b: Box, feetY: number, climbAssist = 0): boolean {
  return b.h !== undefined && feetY >= b.h - climbAssist;
}

/** 이동 가능한 직사각형 범위 (중심 0,0). 정사각형 던전은 halfX = halfZ */
export interface ArenaBounds {
  halfX: number;
  halfZ: number;
}

/** 충돌 정보를 제공하는 세계(던전)의 인터페이스. 던전 파일을 바꿔도 플레이어 코드는 그대로 쓴다. */
export interface CollisionWorld {
  getObstacleBoxes(): Box[];
  getArenaBounds(): ArenaBounds;
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
 * feetY(발 높이)가 상자 윗면에 닿았으면 그 상자는 건너뛴다(위로 지나감).
 */
export function resolveCircleVsBoxes(pos: Vec2, radius: number, boxes: Box[], feetY = 0, climbAssist = 0): Vec2 {
  const out = { x: pos.x, z: pos.z };
  for (const b of boxes) {
    if (isAboveBox(b, feetY, climbAssist)) continue;
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

/** 이동 가능 영역 밖으로 나가지 못하게 한다 (숫자 하나면 정사각형) */
export function clampToArena(pos: Vec2, bounds: number | ArenaBounds, radius: number): Vec2 {
  const b = typeof bounds === 'number' ? { halfX: bounds, halfZ: bounds } : bounds;
  const lx = Math.max(0, b.halfX - radius);
  const lz = Math.max(0, b.halfZ - radius);
  return { x: clamp(pos.x, -lx, lx), z: clamp(pos.z, -lz, lz) };
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

/** 점(투사체 등)이 장애물이나 영역 밖에 닿았는지 */
export function hitsObstacle(pos: Vec2, radius: number, boxes: Box[], bounds: number | ArenaBounds): boolean {
  const b = typeof bounds === 'number' ? { halfX: bounds, halfZ: bounds } : bounds;
  if (Math.abs(pos.x) > b.halfX || Math.abs(pos.z) > b.halfZ) return true;
  for (const b of boxes) {
    const cx = clamp(pos.x, b.x - b.w / 2, b.x + b.w / 2);
    const cz = clamp(pos.z, b.z - b.d / 2, b.z + b.d / 2);
    if ((pos.x - cx) ** 2 + (pos.z - cz) ** 2 < radius * radius) return true;
  }
  return false;
}

/**
 * 발밑 높이: 중심이 (반지름의 절반만큼 넓힌) 상자 윗면 안에 있고 발이 윗면에 닿을 만큼 높으면 그 상자의 높이, 아니면 0(땅).
 * 여러 상자가 겹치면 가장 높은 것. 발이 윗면보다 조금 낮아도(climbAssist) 올라선 것으로 쳐서 '올라서기 보조'가 된다.
 */
export function groundHeightAt(pos: Vec2, radius: number, boxes: Box[], feetY: number, climbAssist = 0): number {
  let ground = 0;
  const m = radius * 0.5;
  for (const b of boxes) {
    if (b.h === undefined || b.h <= ground) continue;
    if (!isAboveBox(b, feetY, climbAssist)) continue;
    if (Math.abs(pos.x - b.x) <= b.w / 2 + m && Math.abs(pos.z - b.z) <= b.d / 2 + m) ground = b.h;
  }
  return ground;
}

/** 점프 상태: 높이(y)와 수직 속도(vy) */
export interface JumpState {
  y: number;
  vy: number;
}

/**
 * 점프 한 프레임 적분. 발밑(ground, 기본 0 = 땅)에 닿으면 멈춘다. 발밑보다 낮으면 발밑으로 올려 준다(올라서기).
 * 등가속도 공식(y += vy·dt − g·dt²/2)이라 프레임 간격이 커도(느린 기기) 점프 최고 높이가 줄지 않는다.
 */
export function integrateJump(state: JumpState, dt: number, gravity: number, ground = 0): JumpState {
  let y = state.y + state.vy * dt - 0.5 * gravity * dt * dt;
  let vy = state.vy - gravity * dt;
  if (y <= ground) {
    y = ground;
    vy = 0;
  }
  return { y, vy };
}

/** 회피(대시) 상태: timer > 0 이면 대시 중, cooldown > 0 이면 다시 쓸 수 없음 */
export interface DashState {
  timer: number;
  cooldown: number;
  dir: Vec2;
}

export function createDashState(): DashState {
  return { timer: 0, cooldown: 0, dir: { x: 0, z: 1 } };
}

/** 대시 시작 시도. 쿨다운 중이거나 이미 대시 중이면 false */
export function startDash(state: DashState, dir: Vec2, duration: number, cooldown: number): boolean {
  if (state.timer > 0 || state.cooldown > 0) return false;
  const len = Math.hypot(dir.x, dir.z);
  state.dir = len > 1e-6 ? { x: dir.x / len, z: dir.z / len } : { x: 0, z: 1 };
  state.timer = duration;
  state.cooldown = cooldown;
  return true;
}

/** 대시 한 프레임 진행 (대시 시간과 쿨다운을 줄인다) */
export function tickDash(state: DashState, dt: number): void {
  if (state.timer > 0) state.timer = Math.max(0, state.timer - dt);
  if (state.cooldown > 0) state.cooldown = Math.max(0, state.cooldown - dt);
}

/** 선분 a→b 를 따라 반지름 radius 의 원이 지나갈 때 상자에 걸리는지 (step 간격으로 표본 검사) */
export function segmentBlocked(a: Vec2, b: Vec2, radius: number, boxes: Box[]): boolean {
  const dx = b.x - a.x;
  const dz = b.z - a.z;
  const len = Math.hypot(dx, dz);
  const steps = Math.max(1, Math.ceil(len / Math.max(0.25, radius * 0.8)));
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const px = a.x + dx * t;
    const pz = a.z + dz * t;
    for (const bx of boxes) {
      const cx = clamp(px, bx.x - bx.w / 2, bx.x + bx.w / 2);
      const cz = clamp(pz, bx.z - bx.d / 2, bx.z + bx.d / 2);
      if ((px - cx) ** 2 + (pz - cz) ** 2 < radius * radius) return true;
    }
  }
  return false;
}

/** 우회 후보 각도 (라디안): 작은 각부터, 좌우 번갈아 */
const STEER_ANGLES = [0.6, 1.2, 1.8, 2.4];

/**
 * 단순 우회 조종 (A* 는 아님). 가고 싶은 방향(dir)으로 lookAhead 만큼 나아가는 길이 상자에 막히면
 * 좌우로 조금씩 꺾은 방향 후보를 본다.
 * 1) target 이 있으면: 꺾은 끝점까지 뚫려 있고, 그 끝점에서 target 까지도 곧장 뚫린 후보를 작은 각부터 고른다
 *    (울타리 모서리에서 '목표와 반대쪽으로 꺾어 갇히는' 경우를 막는다).
 * 2) 없으면: 끝점까지만 뚫린 첫 후보 (preferSign 쪽을 먼저 본다 — 좌우 떨림 방지).
 * 3) 다 막히면 원래 방향 (벽을 따라 미끄러진다).
 * 순수 함수. 돌려주는 방향의 길이는 dir 과 같다.
 */
export function steerAround(pos: Vec2, dir: Vec2, radius: number, boxes: Box[], lookAhead: number, preferSign = 1, target?: Vec2): Vec2 {
  const len = Math.hypot(dir.x, dir.z);
  if (len < 1e-6) return dir;
  const ux = dir.x / len;
  const uz = dir.z / len;
  // 가까운 상자만 본다 (성능)
  const reach = lookAhead + radius;
  const near = boxes.filter((b) => Math.abs(b.x - pos.x) <= b.w / 2 + reach && Math.abs(b.z - pos.z) <= b.d / 2 + reach);
  const endOf = (ax: number, az: number): Vec2 => ({ x: pos.x + ax * lookAhead, z: pos.z + az * lookAhead });
  const free = (ax: number, az: number) => !segmentBlocked(pos, endOf(ax, az), radius, near);
  if (near.length === 0 || free(ux, uz)) return dir;
  const candidates: Array<{ x: number; z: number }> = [];
  for (const a of STEER_ANGLES) {
    for (const sgn of [preferSign, -preferSign]) {
      const c = Math.cos(a * sgn);
      const s = Math.sin(a * sgn);
      const rx = ux * c - uz * s;
      const rz = ux * s + uz * c;
      if (free(rx, rz)) candidates.push({ x: rx, z: rz });
    }
  }
  if (candidates.length === 0) return dir;
  if (target) {
    // 둘째 구간: 후보 방향으로 '보이는 데까지'(최대 lookAhead 의 2배) 나아간 지점에서 목표가 곧장 보이는지.
    // 그 구간은 범위가 넓으니 덮는 상자만 거른다
    const farReach = lookAhead * 2 + radius;
    const far = boxes.filter((b) => Math.abs(b.x - pos.x) <= b.w / 2 + farReach && Math.abs(b.z - pos.z) <= b.d / 2 + farReach);
    for (const cnd of candidates) {
      let e = endOf(cnd.x, cnd.z);
      for (const k of [2.0, 1.5]) {
        const e2 = { x: pos.x + cnd.x * lookAhead * k, z: pos.z + cnd.z * lookAhead * k };
        if (!segmentBlocked(pos, e2, radius, far)) {
          e = e2;
          break;
        }
      }
      const minX = Math.min(e.x, target.x) - radius;
      const maxX = Math.max(e.x, target.x) + radius;
      const minZ = Math.min(e.z, target.z) - radius;
      const maxZ = Math.max(e.z, target.z) + radius;
      const along = boxes.filter((b) => b.x + b.w / 2 >= minX && b.x - b.w / 2 <= maxX && b.z + b.d / 2 >= minZ && b.z - b.d / 2 <= maxZ);
      // 둘째 구간은 '보이는지'만 보는 어림이므로 반지름을 절반으로 (모서리를 스치는 길도 통과로 친다)
      if (!segmentBlocked(e, target, radius * 0.5, along)) return { x: cnd.x * len, z: cnd.z * len };
    }
  }
  return { x: candidates[0].x * len, z: candidates[0].z * len };
}
