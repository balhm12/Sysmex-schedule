# 정식 3D 모델 넣기 (.glb)

이 폴더에 `.glb` 파일을 넣고 `manifest.json` 에 파일 이름을 적으면 게임이 그 모델을 씁니다. 파일이 없거나 항목이 `null` 이면 코드로 그린 임시 모델을 그대로 씁니다. 파일을 넣은 뒤 `git push` 하면 휴대폰(GitHub Pages)에도 반영됩니다.

## manifest.json 예

```json
{
  "player": { "file": "player.glb", "scale": 1, "offsetY": 0, "rotationY": 0, "rotationX": -90 },
  "enemies": { "rusher": { "file": "robot-small.glb" }, "shooter": null, "tank": null, "stalker": null, "artillery": null },
  "bosses": { "guardian": null, "golem": { "file": "golem.glb", "scale": 1.2 }, "commander": null }
}
```

- `file`: 이 폴더 안의 파일 이름
- `scale`: 크기 배율 (플레이어는 키 1.9, 적은 종류별 기본 크기에 맞춘 뒤 곱함)
- `offsetY`: 발이 땅에 안 닿거나 묻히면 조정 (예: 0.1 / -0.1)
- `rotationY`: 모델이 뒤를 보면 180
- `rotationX`: 모델이 누워 있으면(위가 Z 축인 복셀 도구·trimesh 출력) -90

## 모델 조건

- 형식: glTF 2.0 바이너리(`.glb`), 텍스처 포함. 크기는 5MB 이하 권장(휴대폰 로딩).
- 정면이 +Z 를 보게 만듭니다. 반대면 `rotationY: 180`.
- 애니메이션 클립 이름에 `idle`, `walk` 또는 `run`, `attack`, `jump`, `die` 가 들어 있으면 자동으로 재생합니다.
- 클립이 없어도 **부품 이름**이 있으면 게임이 관절을 만들어 걷기·공격·점프·회피·피격·쓰러짐 동작을 넣습니다(`src/assets/PartRig.ts`).
  이름 규칙: `left_`/`right_` 접두어 + `leg`/`boot`/`knee`/`foot`(다리), `arm`/`hand`/`bracer`/`shoulder`(팔). 머리는 `head`/`hair`/`eye`/`glass`… 로 시작, 무기는 `sword`/`weapon`/`shield`… 로 시작(가까운 팔에 붙음). 몸통·가방·허리띠 등 나머지는 그대로 둡니다.
- 둘 다 없으면 정지 모델로도 동작합니다(걷기 흔들림만).

## 지금 들어 있는 모델

- `player.glb`: 아들 복셀 모험가(안경·갈색 머리·파란 튜닉·검·배낭). trimesh 로 만든 Z-up 파일이라 `rotationX: -90`. 애니메이션 클립은 없고 부품 이름 리그로 움직입니다.
  이 모델을 쓰는 동안은 설정의 **내 얼굴 사진**이 적용되지 않습니다(사진은 임시 모델 전용). 임시 모델로 돌아가려면 `manifest.json` 의 `player` 를 `null` 로.
- 라이선스가 분명한 파일만 넣습니다(직접 만든 것, 또는 상업적 사용이 허용된 것).

## 아들 얼굴 모델 만드는 방법 (무료 범위)

1. **Avaturn** 또는 **Ready Player Me**: 정면 사진 한 장으로 사람 아바타를 만들고 `.glb` 로 내려받습니다. 애니메이션은 Mixamo 에서 입힐 수 있습니다.
2. **Meshy / Tripo**: 사진·글로 캐릭터를 만들고 `.glb` 로 내려받습니다.
3. 내려받은 파일을 `player.glb` 로 이 폴더에 넣고 `manifest.json` 의 `player` 에 적습니다.
4. `npm run dev` 로 열어 크기·방향을 확인하고 `scale`, `rotationY`, `rotationX`, `offsetY` 를 조정합니다.

GLB 가 없을 때는 게임 설정 → 게임 → **내 얼굴 사진**으로 사진만 넣어도 임시 캐릭터 머리에 얼굴이 붙습니다.
