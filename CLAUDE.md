# CLAUDE.md

이 파일은 Claude Code(claude.ai/code)가 이 저장소에서 작업할 때 참고할 가이드를 제공합니다.

## 이 저장소는 무엇인가

Sysmex Korea FS(Field Service)팀을 위한 2페이지짜리 정적 웹 앱입니다(빌드 단계 없음, package.json 없음):

- **`index.html`** — "시스템 설치 공유 캘린더". 병원(거래처)별 설치/이전설치/평가 일정을 캘린더 형태로 관리합니다. FY26(2026년 4월 ~ 2027년 3월) 기준.
- **`work-schedule.html`** — "근무일정". West/East/Central/South 4개 지역팀의 팀원별 일일 근무 상태(오전1·오전2·오후1·오후2, 야간, 주말/공휴일 당직)를 관리합니다.

두 파일 모두 완전히 독립적입니다: `<style>`과 `<script>`가 인라인으로 들어있고, 모듈이나 번들러가 없습니다. 유일한 외부 의존성은 "Excel 내보내기" 기능에 쓰이는 CDN 로드 ExcelJS(`cdnjs.cloudflare.com/.../exceljs/4.4.0/exceljs.min.js`)입니다.

두 페이지는 상단의 작은 네비게이션 바(`.app-nav`)로 서로 연결되어 있습니다.

## 개발 워크플로우

이 저장소에는 빌드/린트/테스트 도구가 없습니다 — 순수 HTML/CSS/JS입니다. 작업 방법:

- `.html` 파일을 브라우저에서 직접 열거나, 정적 파일 서버(예: `python3 -m http.server`)로 서빙하세요. `file://`로 열면 Firebase로의 `fetch()` 호출이 CORS 제약에 걸릴 수 있습니다.
- 자동화된 테스트는 없습니다. 브라우저에서 직접 UI를 조작해 변경 사항을 검증하세요(일정/근무 항목 추가·수정·삭제, 월/주 전환, 범례 필터, ICS/Excel 내보내기 등).
- UI 로직과 마크업이 페이지별로 파일 하나에 다 들어있으므로, 작업 중에는 브라우저 devtools 콘솔로 `render()` 결과를 바로 확인하며 진행하세요.

## 공유 데이터 아키텍처

두 페이지 모두 **동일한 Firebase Realtime Database**(`FIREBASE_URL` 상수, 현재 `https://sysmex-system-schedule-default-rtdb.firebaseio.com`)에 데이터를 저장하며, SDK 없이 순수 REST(`fetch`로 `<FIREBASE_URL>/<path>.json`에 GET/PUT)로 통신합니다. 데이터가 섞이지 않도록 페이지마다 경로가 다릅니다:

| 페이지 | 데이터 경로 | 메타 경로 |
|---|---|---|
| `index.html` | `schedule-overrides.json` | — |
| `work-schedule.html` | `work-schedule.json` | `work-schedule-meta.json` |

저장소 관련 코드를 건드릴 때 유지해야 할 공통 패턴:

- `loadStorage()` / `saveStorage()`는 `fetch`에 명시적 타임아웃을 걸어 감쌉니다(`index.html`은 `AbortController`, `work-schedule.html`은 `Promise.race` — 후자는 postMessage clone 오류를 피하기 위함). 실패 시 `showToast()`/`alert()`로 타임아웃/네트워크/401·403(Firebase 규칙) 오류를 구분한 한글 메시지를 보여줍니다. 새로운 저장소 호출도 이 오류 처리 방식을 따르세요.
- `render()`는 `loadStorage()`가 끝나기 *전에* 페이지 로드 시 즉시 한 번 호출됩니다. 그래야 네트워크가 느리거나 막혀도 화면이 비어 보이지 않습니다. fetch가 끝나면 다시 렌더링됩니다.
- `setInterval`(20초)로 `loadStorage()` + `render()`를 반복 호출해 팀원 간 준실시간 공유를 구현하지만, 편집 오버레이/패널이 열려 있는 동안에는 새로고침을 건너뛰어 작업 중인 입력을 덮어쓰지 않습니다.
- `FIREBASE_URL`이 설정되지 않은 경우(`http`로 시작하지 않음) `STORAGE_ENDPOINT`는 `null`이 되고, 앱은 로컬 전용 모드로 동작하며 경고 배너를 표시합니다 — 엔드포인트가 항상 설정되어 있다고 가정하지 마세요.

### index.html 데이터 모델

- `BASE_EVENTS`: 하드코딩된 초기 일정 배열(설치/이전설치/평가/공휴일), 각 항목은 `{id, category, start, end, title, device, team, assignee}` 구조입니다. 파일에 내장된 읽기 전용 기준 데이터로 취급합니다.
- 사용자 변경사항은 `BASE_EVENTS`를 직접 수정하지 않고 그 위에 레이어로 쌓입니다: `customEvents`(신규 일정), `editedMap`(id → 수정된 base 일정으로 교체할 객체), `deletedIds`(삭제된 id들의 Set, base/custom 모두 포함). `getAllEvents()`가 이 세 레이어를 병합하므로, `BASE_EVENTS`를 직접 읽지 말고 항상 이 함수를 거치세요.
- `CLIENT_DIRECTORY_BASE` + `customClients`: 일정 추가 시 자동완성에 쓰이는 병원명 → 담당자/담당팀 디렉토리이며, `getAllClients()`가 이를 병합합니다(같은 이름이면 custom이 base를 덮어씀). 저장 시 담당자명이 입력되어 있으면 신규 거래처가 여기 자동 등록됩니다.
- `CATS`는 세 가지 일정 구분(`install`/`relocation`/`evaluation`)과 표시 순서를 정의합니다. 공휴일은 별도의 `HOLIDAYS_KR` 맵(2026~2027년 대한민국 법정 공휴일, 대체공휴일 포함)에서 오며 사용자가 수정할 수 없습니다.
- 내보내기 기능: `buildICS()`/`exportICS()`는 Outlook/캘린더 앱 가져오기용 RFC5545 `.ics`(종일 일정, RFC 7986 `COLOR` 포함)를 생성하고, `exportExcel()`은 ExcelJS로 다중 시트 워크북(일정 표 + FY 월별 요약 + 팀별 피벗 표)을 생성합니다.

### work-schedule.html 데이터 모델

- `TEAMS`(west/east/central/south)에 각 팀의 인원 명단(`{name, role}`)이 하드코딩되어 있습니다. `TEAMS.all`은 모든 팀을 합친 파생 "가상 팀"이며, 팀 구성이 바뀔 때마다 `rebuildAllTeam()`으로 재생성됩니다. `TEAM_ORDER`/`TAB_ORDER`가 표시 순서를 정하고, `applyMemberOrder()`가 `scheduleData.memberOrder`에 저장된 팀별 사용자 지정 정렬 순서를 적용합니다.
- `scheduleData[team][date][name]`에 개인별·날짜별 항목이 들어갑니다: `{night, weekend, am1, am2, pm1, pm2}`(`blankEntry()` 참고). 빈 항목은 저장하지 않고 삭제됩니다(`setEntry()`).
- 상태 어휘는 세 가지 고정 옵션 목록으로 나뉩니다 — `HALF_STATUS`(오전1·오전2·오후1·오후2 4칸), `NIGHT_STATUS`(평일 야간 근무), `WEEKEND_STATUS`(주말/공휴일 당직). 각 항목은 `key`, `label`, `short`(배지 텍스트), `color`/`bg`를 가지며, 선택적으로 `fillGroup`(관련 슬롯을 자동으로 채움, 예: OFF는 4칸 모두 채움)과 `hasDetail`(`key + ':'` 뒤에 자유 텍스트를 붙일 수 있음, 예: `"교육: 신제품 교육"`)을 가집니다. 새 상태를 추가할 때는 이 구조를 그대로 따르고 `matchStatus`/`statusOfIn`/`splitDetail`/`combineDetail`에도 연결하세요.
- 뷰 모드는 두 가지(`viewMode`: `'month'` | `'week'`)이며, `dutyOnlyView` 토글을 켜면 4칸 전체(`fillDayCell`) 대신 야간/주말 당직 배지만(`fillDayCellDutyOnly`) 표시됩니다.
- **1회성 데이터 마이그레이션**은 매번 `init()` 시 실행되지만 반드시 멱등(idempotent)해야 합니다: `normalizeWeekendKeys()`, `migrateNightKeyNames()`, `normalizeWeekendNight()`는 `scheduleData`를 훑어 제자리에서 고쳐 쓰고, 변경이 있을 때(`if(changed)`)만 저장하므로 여러 번 실행해도 안전합니다. 시드 데이터 마이그레이션(`removeSeedSchedule()`, `applySeedScheduleV3()`)은 `META_ENDPOINT`에 저장되는 1회성 플래그(`checkSeedRemoved`/`markSeedRemoved`, `checkSeedV3Applied`/`markSeedV3Applied`)로 보호되어 모든 클라이언트에서 정확히 한 번만 실행됩니다 — 비슷한 일회성 백필 작업을 추가할 때는 로컬 플래그가 아니라 이 원격 플래그 방식을 따르세요. 팀원 모두의 브라우저 간에 상태가 동기화되어야 하기 때문입니다.
- `exportExcel()`은 5개 시트짜리 ExcelJS 워크북(개인별 요약, 팀별 비교, 당직 색상 표시가 포함된 형평성 뷰, 통계, 상세)을 생성합니다.

## 지켜야 할 컨벤션

- 사용자에게 노출되는 모든 문자열은 한글입니다. 새로 작성하는 UI 텍스트와 오류 메시지도 한글로, 기존 문구와 톤을 맞춰 작성하세요.
- 두 파일 모두 프레임워크 없이 순수 DOM API(`document.createElement`, `innerHTML` 템플릿 문자열)를 사용합니다 — 작은 변경을 위해 프레임워크나 빌드 단계를 도입하지 마세요.
- 색상은 데이터 기반입니다: 구분/상태별 색상은 데이터 항목 하나(`CATS`, `HALF_STATUS` 등)에 한 번만 정의하고 호출부에서는 항상 조회해서 씁니다 — 호출부마다 색상을 하드코딩하지 마세요. 새 구분/상태를 추가할 때도 같은 패턴을 따르세요.
- Firebase Realtime Database는 `.json` 경로에 대한 REST `GET`/`PUT`으로 단순 JSON 저장소처럼만 쓰입니다 — 이 저장소 안에서 건드릴 인증/규칙 로직은 없습니다. 연결 문제를 진단할 때는 각 파일의 `testConnection()`이 진입점입니다.
