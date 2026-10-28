// .glb 에서 필요한 애니메이션만 남기고(이름 목록), 쓰지 않는 버퍼 조각을 버려 용량을 줄인다. (Node 전용, 외부 라이브러리 없음)
// 사용: node tools/prune_glb.mjs <입력.glb> <출력.glb> <남길 애니메이션 이름,쉼표로 구분>
import fs from 'node:fs';

const [, , input, output, keepList] = process.argv;
if (!input || !output) {
  console.error('사용: node tools/prune_glb.mjs <입력.glb> <출력.glb> [남길 애니메이션 이름,…]');
  process.exit(1);
}
const keep = keepList ? new Set(keepList.split(',').map((s) => s.trim())) : null;
const buf = fs.readFileSync(input);
if (buf.readUInt32LE(0) !== 0x46546c67) throw new Error('glb 파일이 아닙니다');
const jsonLen = buf.readUInt32LE(12);
const json = JSON.parse(buf.subarray(20, 20 + jsonLen).toString());
const binOffset = 20 + jsonLen + 8;
const bin = buf.subarray(binOffset, binOffset + buf.readUInt32LE(20 + jsonLen));

// 1) 애니메이션 고르기
const before = json.animations?.length ?? 0;
if (keep && json.animations) json.animations = json.animations.filter((a) => keep.has(a.name));

// 2) 쓰이는 접근자(accessor) 모으기: 메시·스킨·애니메이션·형태 변형
const usedAcc = new Set();
for (const m of json.meshes ?? []) for (const p of m.primitives) {
  for (const v of Object.values(p.attributes)) usedAcc.add(v);
  if (p.indices != null) usedAcc.add(p.indices);
  for (const t of p.targets ?? []) for (const v of Object.values(t)) usedAcc.add(v);
}
for (const s of json.skins ?? []) if (s.inverseBindMatrices != null) usedAcc.add(s.inverseBindMatrices);
for (const a of json.animations ?? []) for (const s of a.samplers) { usedAcc.add(s.input); usedAcc.add(s.output); }

// 3) 접근자·버퍼뷰 번호 다시 매기기
const accMap = new Map();
const newAccessors = [];
json.accessors.forEach((a, i) => { if (usedAcc.has(i)) { accMap.set(i, newAccessors.length); newAccessors.push(a); } });
const usedBv = new Set();
for (const a of newAccessors) { if (a.bufferView != null) usedBv.add(a.bufferView); if (a.sparse) { usedBv.add(a.sparse.indices.bufferView); usedBv.add(a.sparse.values.bufferView); } }
for (const im of json.images ?? []) if (im.bufferView != null) usedBv.add(im.bufferView);
const bvMap = new Map();
const newBvs = [];
const chunks = [];
let offset = 0;
json.bufferViews.forEach((bv, i) => {
  if (!usedBv.has(i)) return;
  const data = bin.subarray(bv.byteOffset ?? 0, (bv.byteOffset ?? 0) + bv.byteLength);
  const copy = { ...bv, byteOffset: offset, buffer: 0 };
  bvMap.set(i, newBvs.length);
  newBvs.push(copy);
  chunks.push(data);
  offset += data.length;
  const pad = (4 - (offset % 4)) % 4;
  if (pad) { chunks.push(Buffer.alloc(pad)); offset += pad; }
});
const remapAcc = (i) => accMap.get(i);
for (const a of newAccessors) { if (a.bufferView != null) a.bufferView = bvMap.get(a.bufferView); if (a.sparse) { a.sparse.indices.bufferView = bvMap.get(a.sparse.indices.bufferView); a.sparse.values.bufferView = bvMap.get(a.sparse.values.bufferView); } }
for (const m of json.meshes ?? []) for (const p of m.primitives) {
  for (const k of Object.keys(p.attributes)) p.attributes[k] = remapAcc(p.attributes[k]);
  if (p.indices != null) p.indices = remapAcc(p.indices);
  for (const t of p.targets ?? []) for (const k of Object.keys(t)) t[k] = remapAcc(t[k]);
}
for (const s of json.skins ?? []) if (s.inverseBindMatrices != null) s.inverseBindMatrices = remapAcc(s.inverseBindMatrices);
for (const a of json.animations ?? []) for (const s of a.samplers) { s.input = remapAcc(s.input); s.output = remapAcc(s.output); }
for (const im of json.images ?? []) if (im.bufferView != null) im.bufferView = bvMap.get(im.bufferView);
json.accessors = newAccessors;
json.bufferViews = newBvs;
json.buffers = [{ byteLength: offset }];

// 4) 다시 쓰기
let jsonText = Buffer.from(JSON.stringify(json));
const jpad = (4 - (jsonText.length % 4)) % 4;
if (jpad) jsonText = Buffer.concat([jsonText, Buffer.from(' '.repeat(jpad))]);
const binOut = Buffer.concat(chunks);
const total = 12 + 8 + jsonText.length + 8 + binOut.length;
const header = Buffer.alloc(12); header.writeUInt32LE(0x46546c67, 0); header.writeUInt32LE(2, 4); header.writeUInt32LE(total, 8);
const jh = Buffer.alloc(8); jh.writeUInt32LE(jsonText.length, 0); jh.writeUInt32LE(0x4e4f534a, 4);
const bh = Buffer.alloc(8); bh.writeUInt32LE(binOut.length, 0); bh.writeUInt32LE(0x004e4942, 4);
fs.writeFileSync(output, Buffer.concat([header, jh, jsonText, bh, binOut]));
console.log(`애니메이션 ${before} → ${json.animations?.length ?? 0}, 크기 ${buf.length} → ${total} 바이트 (${(total / 1024).toFixed(0)} KB)`);
