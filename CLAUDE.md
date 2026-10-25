# FSG 공유 웹앱 (sysmex-schedule) — Claude 작업 지침

## 프로젝트
- 단일 HTML+JS 페이지 4개가 한 저장소에 있다. 프레임워크 없음.
  - `index.html` 시스템 설치 공유 캘린더 · `work-schedule.html` FSG 근무일정표
  - `voc-dashboard.html` 방문 서비스 만족도 · `fsg-kpi.html` FSG KPI 대시보드(접근 코드)
- 백엔드: Firebase Realtime Database (익명 인증). 44명이 같이 쓰는 **실데이터**다.
- 배포: GitHub Pages, `main` 브랜치 루트. **`main`에 푸시하면 즉시 배포된다** — 수정은 브랜치 + PR로.
- `restore*.html`, `fss복구.html`, `bulk_*_tool.html`은 데이터를 통째로 쓰는 관리자 도구다. 손대기 전에 사용자에게 확인한다.
- 사용자 환경: Windows 11 + PowerShell.

## 데이터 안전 (가장 중요)
- 전체 데이터를 읽어 다시 쓰는(`set`) 코드를 만들지 않는다. 바뀐 키만 `update`한다.
  과거에 "전체 저장" 로직으로 데이터를 두 번 잃은 적이 있다 — `firebase-shared-web-app` 스킬의 안전 쓰기 패턴을 따른다.
- 페이지에는 거래처(병원)명과 직원 실명이 뜬다. 캡처나 대화에 그대로 옮기지 않는다.

## 스킬 자동 사용 규칙
| 요청 유형 | 먼저 쓸 스킬 |
|---|---|
| 화면 확인, 스크린샷, 버튼 눌러보기 | `agent-browser` |
| 화면·UI 수정, 글자 크기, 접근성, 휴대폰 레이아웃 | `frontend-ui-engineering` |
| 저장·동기화 로직, Firebase 쓰기 | `firebase-shared-web-app` |
| 만족도 지표·VOC 집계 | `fsg-voc-survey-system`, `voc-survey-monthly-metrics` |
| KPI 탭·지표·가중치 | `fsg-kpi-dashboard` |
| 팀·직급·거주지 명단 | `fsg-roster` |
| 여러 단계 작업, 이어서 하기 | GSD `/gsd-next` |

## 검증
- 테스트: `npm install` 후 `npm test` (`tests/*.js`, jsdom). `index.html`·`work-schedule.html`을 고치면 푸시 때 `.github/workflows/validate.yml`이 같은 테스트를 돌린다.
- 화면: 저장소 루트에서 `python -m http.server 8770` → http://localhost:8770/<페이지> 를 **390×844**와 1280×800으로 본다. 콘솔 오류도 확인한다.
- UI 규칙: 순수 HTML/CSS/JS 유지. 색·간격은 각 페이지의 CSS 변수를 따른다. 입력칸 글자는 16px 이상(iOS 확대 방지), 확대 금지(`user-scalable=no`)는 쓰지 않는다.
