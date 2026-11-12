# 정식 음원 넣기 (.ogg / .mp3 / .wav)

이 폴더에 음원 파일을 넣고 `manifest.json` 에 파일 이름을 적으면 게임이 그 소리를 씁니다. 파일이 없거나 항목이 `null` 이면 코드로 합성한 소리를 그대로 씁니다. 파일을 넣은 뒤 `git push` 하면 휴대폰(GitHub Pages)에도 반영됩니다.

## manifest.json 예

```json
{
  "sfx": {
    "melee": { "files": ["swing1.ogg", "swing2.ogg", "swing3.ogg"] },
    "enemyHit": { "file": "hit.ogg", "gain": 0.8 },
    "kill": null
  },
  "music": {
    "menu": { "file": "menu.ogg", "gain": 0.7 },
    "forest": { "file": "forest.ogg" },
    "boss": null
  }
}
```

- `file`: 파일 하나. `files`: 여러 개 적으면 재생마다 무작위로 골라 같은 소리가 반복되는 느낌을 줄입니다(효과음에 권장).
- `gain`: 음량 배율 (0.5 = 절반, 최대 4). 설정 화면의 음량과 곱해집니다.
- 음악은 자동으로 반복 재생됩니다. 곡 처음과 끝이 자연스럽게 이어지도록 만든(loop 용) 파일이 좋습니다.

## 이름표

| 효과음 이름 | 언제 | 음악 이름 | 언제 |
| --- | --- | --- | --- |
| melee | 근접 공격 휘두름 | menu | 메인 메뉴 |
| ranged | 원거리 발사 | forest | 잊혀진 숲 |
| enemyHit | 적 피격 | cave | 수정 동굴 |
| kill | 적 처치 | fortress | 강철 요새 |
| hurt | 플레이어 피격 | boss | 보스전 (모든 던전 공통) |
| pickup / heal / equip | 아이템 획득 / 회복 / 장비 장착 | | |
| levelup / chest | 레벨 업 / 상자 열기 | | |
| jump / dash | 점프 / 회피 | | |
| bossAppear / slam / boom / summon | 보스 등장 / 내려찍기 / 박격포 폭발 / 소환 | | |
| clear / defeat / ui | 승리 / 패배 / 메뉴 클릭 | | |

## 파일 조건

- 형식: `.ogg`(권장, 용량 작음) / `.mp3` / `.wav`. iPhone Safari 는 ogg 를 2023년(iOS 17) 이후부터 지원하므로, 오래된 아이폰이면 `.mp3` 를 쓰세요.
- 용량: 효과음은 100KB 이하, 음악은 곡당 1~3MB, 전체 20MB 이내 권장(휴대폰 로딩).
- 효과음은 앞에 무음이 없어야 반응이 빠릅니다.
- 라이선스가 분명한 파일만 넣습니다(직접 만든 것, CC0, 또는 출처 표기 조건을 지킨 CC-BY).

## 무료 음원 구하는 곳 (라이선스 확인 필수)

- **Kenney** (kenney.nl/assets, CC0): 효과음·UI 음 묶음. 게임용으로 정리되어 있어 가장 쉽습니다.
- **freesound.org**: 검색 시 License 를 `Creative Commons 0` 로 거르면 출처 표기 없이 쓸 수 있습니다.
- **OpenGameArt.org**: 효과음·음악 모두. 각 항목의 License 표기(CC0 / CC-BY)를 확인하고 CC-BY 면 GAME_GUIDE 에 출처를 적습니다.
- **Kevin MacLeod (incompetech.com, CC-BY)**: 게임 음악. 출처 표기 필요.

## 직접 만들기 (무료 도구)

- 효과음: **jsfxr** / **ChipTone** (브라우저에서 버튼 몇 번으로 게임 효과음 생성 → wav 내려받기).
- 음악: **BeepBox** (브라우저, 몇 분이면 반복 악절 완성, wav 내보내기 → ogg 로 변환), **LMMS**, **Bosca Ceoil**.
- wav → ogg 변환: Audacity(무료)에서 열고 "내보내기 → OGG".
