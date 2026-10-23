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

## 적 모델의 부품 이름 (클립 없는 .glb 가 움직이는 규칙)

**사람형 몬스터**는 플레이어와 같은 이름(`left_leg`/`right_leg`/`left_arm`/`right_arm`/`head` + 무기 `weapon_*`)을 쓰면 걷기(팔다리 교차)·공격 예고(무기 팔을 뒤로 치켜듦)·공격(앞으로 휘두름)이 자동으로 붙습니다. 무기에 달린 발광 부품(구슬 등)도 `weapon_*` 로 이름 지어야 팔과 함께 움직입니다. 이·귀·뿔처럼 머리에 붙는 것은 `mouth_*`/`ear_*`/`head_*` 로. 떠다니는 몬스터는 `float_*` 부품을 하나 둡니다. 아래 기계 부품 이름도 함께 쓸 수 있습니다(트롤의 `shield`, 박쥐의 `wing_*`).

| 접두어 | 동작 | 묶음 |
| --- | --- | --- |
| `wheel_` | 이동 시 바퀴 회전 | `wheel_fl`, `wheel_fl_hub` 처럼 두 번째 토큰까지 한 바퀴 |
| `claw_` | 공격 예고 때 바깥으로 벌어짐 (몸 쪽 모서리가 관절) | `claw_l_*` / `claw_r_*` |
| `rotor_` | 항상 회전, 있으면 모델이 떠다님 | 모두 하나 |
| `wing_` | 퍼덕임, 있으면 떠다님 (안쪽 모서리가 관절) | `wing_l_*` / `wing_r_*` |
| `barrel_` | 공격(예고 끝) 순간 뒤로 반동 | 모두 하나 |
| `shield` | 예고 때 들어 올림 (아래 모서리가 관절) | 모두 하나 |
| `piston_` | 이동 시 위아래 펌프 | 두 번째 토큰 |
| `antenna_` | 흔들림 | 두 번째 토큰 |
| `glow_` | 예고 때 더 밝게 발광 | 메시마다 |
| `eye_` | 예고 때 커짐 | 메시마다 |

나머지 이름(`body`, `base`, `stripe_*` …)은 고정 부품입니다. 피격 번쩍임·사망(줄어들며 사라짐)은 모든 .glb 적에 자동 적용됩니다.

## 지금 들어 있는 모델

- `player.glb`: 아들 복셀 모험가(안경·갈색 머리·파란 튜닉·금 장식·발광 검·배낭, 박스 209개). `tools/make_player_glb.py` 가 만든 파일이라 다시 만들려면 `python3 tools/make_player_glb.py` (파이썬 3 만 있으면 됨). 색·크기·부품은 그 스크립트에서 바꿉니다. Y-up·정면 +Z 로 만들어 보정값이 없습니다. 애니메이션 클립은 없고 부품 이름 리그로 움직입니다.
  이 모델을 쓰는 동안은 설정의 **내 얼굴 사진**이 적용되지 않습니다(사진은 임시 모델 전용). 임시 모델로 돌아가려면 `manifest.json` 의 `player` 를 `null` 로.
- **지금 쓰는 적(몬스터)** `monster-rusher.glb` 고블린 전사(초록 피부, 곤봉, 노란 눈, 뼈 어깨 장식, 깃털 머리띠) / `monster-shooter.glb` 유령 마법사(보라 로브, 연기 하체, 지팡이 발광 구슬, 떠다님) / `monster-tank.glb` 트롤 거인(푸른 회색 피부, 털 조끼, 뿔·송곳니, 나무 방패+룬, 도끼) / `monster-stalker.glb` 동굴 박쥐(보라 털, 뼈대 날개, 분홍 눈, 송곳니) / `monster-artillery.glb` 돌 골렘(바위 몸, 용암 균열, 이끼, 던질 바위). `tools/make_monsters_glb.py` 로 생성.
- **로봇 버전(선택)** `enemy-rusher.glb` 돌진 로봇(주황, 바퀴 4·집게 2·눈 하나·발광 안테나) / `enemy-shooter.glb` 포격 드론(보라, 로터·포신·렌즈) / `enemy-tank.glb` 철벽 로봇(파랑, 궤도·방패·붉은 눈·배기관·피스톤) / `enemy-stalker.glb` 박쥐 드론(보라, 날개·송곳니·분홍 눈) / `enemy-artillery.glb` 요새 포대(빨강, 다리 4·큰 포신·탄약 상자). 모두 `tools/make_enemies_glb.py` 가 만들며 다시 만들려면 `python3 tools/make_enemies_glb.py`. 로봇으로 바꾸려면 manifest 의 `enemies.<종류>` 파일 이름을 `enemy-<종류>.glb` 로, 임시 모델로 돌아가려면 `null` 로.
- 라이선스가 분명한 파일만 넣습니다(직접 만든 것, 또는 상업적 사용이 허용된 것).

## 아들 얼굴 모델 만드는 방법 (무료 범위)

1. **Avaturn** 또는 **Ready Player Me**: 정면 사진 한 장으로 사람 아바타를 만들고 `.glb` 로 내려받습니다. 애니메이션은 Mixamo 에서 입힐 수 있습니다.
2. **Meshy / Tripo**: 사진·글로 캐릭터를 만들고 `.glb` 로 내려받습니다.
3. 내려받은 파일을 `player.glb` 로 이 폴더에 넣고 `manifest.json` 의 `player` 에 적습니다.
4. `npm run dev` 로 열어 크기·방향을 확인하고 `scale`, `rotationY`, `rotationX`, `offsetY` 를 조정합니다.

GLB 가 없을 때는 게임 설정 → 게임 → **내 얼굴 사진**으로 사진만 넣어도 임시 캐릭터 머리에 얼굴이 붙습니다.
