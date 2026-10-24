# HERO X — 모험의 던전

3D 액션 RPG (Three.js + TypeScript + Vite). PC 웹 브라우저에서 실행됩니다.

현재 버전 **v1.1.0 (그래픽 개선: PBR·하늘·블룸, 던전 장식·풀·입자, 관절형 캐릭터·적 애니메이션)** — 던전 3개(잊혀진 숲 → 수정 동굴 → 강철 요새)를 차례로 열어 가며 적 5종을 처치하고 보물 상자(E)로 장비 16종을 모읍니다. 각 던전의 보스를 쓰러뜨리면 다음 던전이 열립니다. PC 는 키보드·마우스, 휴대폰·태블릿은 화면 조이스틱·버튼으로 조작합니다. 레벨·골드·장비는 자동 저장되어 다음에 '이어하기'로 계속할 수 있고, 설정 화면에서 난이도·체력·공격력·카메라·그래픽을 조절할 수 있습니다. 조작법과 설정은 `GAME_GUIDE.md` 에 있습니다.

---

> 휴대폰에서는 메인 메뉴의 **앱으로 설치 / 홈 화면에 추가** 로 앱처럼(전체 화면·오프라인) 쓸 수 있습니다. 자세한 방법은 GAME_GUIDE.md 의 '휴대폰에 앱처럼 설치하기'.

## 1. 필요한 프로그램 (최초 1회)

| 프로그램 | 용도 | 설치 |
| --- | --- | --- |
| **Node.js** (LTS, 18 이상) | 게임 실행·빌드 도구 | https://nodejs.org 에서 LTS 버전 다운로드 → 기본값으로 설치 |
| **Git** | 소스 관리 | https://git-scm.com 에서 다운로드 → 기본값으로 설치 |
| Visual Studio Code (선택) | 파일 편집·터미널 | https://code.visualstudio.com |

설치 확인: 터미널(PowerShell 또는 명령 프롬프트)을 열고 아래를 입력합니다.

```
node -v
npm -v
git --version
```

버전 번호가 나오면 준비 완료입니다. (`'node'은(는) 내부 또는 외부 명령...` 이 나오면 설치가 안 된 것입니다. 설치 후 터미널을 새로 여세요.)

## 2. 최초 설치

```
git clone https://github.com/balhm12/sysmex-schedule.git
cd sysmex-schedule/hero-x
npm install
```

- `npm install` 은 `package.json` 에 적힌 라이브러리(three, vite 등)를 `node_modules/` 폴더에 내려받습니다. 1~2분 걸립니다.
- 이미 받아둔 폴더가 있으면 `cd hero-x` 로 들어간 뒤 `npm install` 만 다시 실행하면 됩니다.

## 3. 게임 실행

```
npm run dev
```

터미널에 `Local: http://localhost:5173/` 이 보이면 브라우저(Chrome 또는 Edge)에서 **http://localhost:5173** 을 엽니다.

- 메인 메뉴가 뜹니다. **새 게임** 을 누르고 `W A S D` 또는 방향키로 움직이고, 마우스 왼쪽 버튼(또는 `J`)으로 마우스가 가리키는 쪽을 공격해 보세요. `H` 로 조작 안내, `Esc` 로 메뉴입니다.
- 소스 파일을 저장하면 브라우저가 자동으로 새로고침됩니다.

### 게임 종료

- 브라우저 탭을 닫습니다.
- 터미널에서 `Ctrl + C` 를 누르면 개발 서버가 꺼집니다. (`일괄 작업을 끝내시겠습니까 (Y/N)?` 가 나오면 `Y`)

## 3-1. 휴대폰에서 하기

두 가지 방법이 있습니다.

**A. 인터넷으로 (GitHub Pages, 추천)**

`hero-x` 브랜치에 코드를 올리면(git push) GitHub 가 자동으로 빌드해 `main` 브랜치의 `game/` 폴더에 넣습니다. 1~2분 뒤 휴대폰 브라우저에서 아래 주소를 엽니다.

```
https://balhm12.github.io/Sysmex-schedule/game/
```

- 주소의 `Sysmex-schedule` 은 S 가 대문자입니다 (일정표 주소와 같은 규칙). 끝의 `/game/` 까지 입력하세요.
- 처음 한 번: GitHub 저장소 → Settings → Pages 에서 Source 가 `Deploy from a branch`, Branch 가 `main` / `/ (root)` 인지 확인합니다 (일정표 사이트가 이미 이렇게 되어 있다면 그대로입니다).
- 배포 진행 상황은 저장소 → Actions → "HERO X 게임 배포" 에서 봅니다. 실패하면 로그를 Claude Code 에 전달하세요.
- 홈 화면에 추가하면(Chrome: 메뉴 → 홈 화면에 추가 / Safari: 공유 → 홈 화면에 추가) 전체 화면으로 열립니다.
- 저장(레벨·장비)은 휴대폰 브라우저 안에 따로 됩니다. PC 의 진행과는 이어지지 않습니다.

**B. 집 와이파이로 PC 에 접속 (인터넷 없이)**

PC 와 휴대폰이 같은 와이파이에 있을 때, PC 에서 아래처럼 실행합니다.

```
npm run dev -- --host
```

터미널에 `Network: http://192.168.x.x:5173/` 같은 주소가 나옵니다. 그 주소를 휴대폰 브라우저에 입력합니다. (Windows 방화벽이 물으면 "허용". 안 열리면 PC 의 방화벽에서 5173 포트를 허용하세요.)

## 4. 검사와 빌드

| 명령 | 하는 일 |
| --- | --- |
| `npm run check` | 타입 검사 + 단위 테스트 + 빌드를 한 번에 실행 (작업 후 항상 실행) |
| `npm test` | 단위 테스트만 |
| `npm run typecheck` | TypeScript 타입 검사만 |
| `npm run build` | 배포용 파일을 `dist/` 폴더에 만듭니다 |
| `npm run preview` | `dist/` 를 http://localhost:4173 에서 미리 봅니다 |

`dist/` 폴더 전체를 아무 웹 서버(예: GitHub Pages)에 올리면 설치 없이 플레이할 수 있습니다.

## 5. 설정 바꾸기

이동 속도, 카메라 거리, 장애물 배치, 키 설정 등은 **`hero-x/src/game/GameConfig.ts`** 한 파일에서 바꿉니다. 값을 저장하면 게임에 바로 반영됩니다. 허용 범위를 벗어난 값은 게임이 시작할 때 자동으로 보정되고 콘솔(F12)에 안내가 나옵니다.

Claude Code 에 "캐릭터를 더 빠르게 해줘", "카메라를 더 가까이" 처럼 한국어로 요청해도 됩니다. 작업 규칙은 `CLAUDE.md` 에 있습니다.

## 6. 문서

- `CLAUDE.md` — Claude Code 작업 규칙, 폴더 구조, 절차
- `GAME_GUIDE.md` — 조작법과 게임 기능
- `CHANGELOG.md` — 버전별 변경 내역
- `TROUBLESHOOTING.md` — 자주 생기는 오류와 해결 방법

## 7. 자주 생기는 문제 (요약)

| 증상 | 해결 |
| --- | --- |
| `npm: command not found` / `'npm'은(는) 내부 또는 외부 명령...` | Node.js 를 설치하고 터미널을 새로 엽니다 |
| `npm : 이 시스템에서 스크립트를 실행할 수 없으므로 ... npm.ps1` | PowerShell 에서 `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` 실행 후 `Y` (한 번만) |
| `Cannot find module 'three'` | `hero-x` 폴더 안에서 `npm install` 을 다시 실행합니다 |
| 포트 5173 이 이미 사용 중 | 이미 켜진 `npm run dev` 터미널을 `Ctrl + C` 로 끄거나, `npm run dev -- --port 5174` 로 다른 포트 사용 |
| 화면이 검고 "게임을 시작할 수 없습니다" | 최신 Chrome/Edge 사용, 브라우저 설정에서 하드웨어 가속 켜기 |

자세한 내용은 `TROUBLESHOOTING.md` 를 보세요.

## 8. 사용한 외부 에셋

| 에셋 | 출처 | 라이선스 | 용량 | 비고 |
| --- | --- | --- | --- | --- |
| 플레이어 캐릭터 (기사) | [KayKit Adventurers Character Pack 1.0](https://kaylousberg.itch.io/kaykit-adventurers), Kay Lousberg | CC0 1.0 | 원본 3.5 MB → 1.1 MB (`tools/prune_glb.mjs` 로 클립 18개만) | `public/models/player-knight.glb`, 자세한 내용은 `public/models/README.md` |

그 밖의 모델·텍스처·소리는 모두 이 저장소의 코드(`tools/*.py`, `src/render`, `src/audio`)로 만든 자체 제작물입니다.
