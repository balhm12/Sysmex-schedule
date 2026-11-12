/*******************************************************************
 * Sysmex Korea FS Group — 방문 서비스 만족도 조사 자동 분석 시스템 (최종)
 * 【기존 구글 폼 연동 + 팀/직급/개인 집계 + 기간별 보고서】
 * -----------------------------------------------------------------
 * 기능 요약:
 *  · FSR 44명 명단(팀/직급) 내장 → 'FSR명단' 시트 자동 생성·매핑
 *  · 대시보드: KPI, 팀별/개인별/직급별(팀장·T4 통합)/지역/형태/모델/월별 집계
 *  · 서술형 4단계 자동 분류 (심각/개선요청/칭찬/단순의견) + 심각 적색 강조
 *  · 저점수 응답 즉시 메일 알림 — 관리자 + 담당 FSR의 팀장
 *    (기준: 2026-10-31 접수까지 ≤2점, 2026-11-01 접수부터 ≤3점. 응답 접수일로 갈린다)
 *  · 메뉴 "저점수 알림 시험 발송" — 가짜 응답 1건으로 알림 경로 전체를 확인
 *  · 기간별 보고서: 월(YYYY-MM) / 분기(YYYY-Qn) / 전체 — 전기 대비 증감 포함
 *  · 매월 1일 전월 보고서 자동 생성 + 요약 메일 (메뉴에서 1회 설정)
 *
 * 설치:
 *  폼과 연결된 스프레드시트 → 확장 프로그램 > Apps Script →
 *  이 코드 전체 붙여넣기 → setupExisting 실행 (최초 1회)
 *
 * 버전 교체 시:
 *  기존 코드를 전부 지우고 이 코드로 교체 → 저장 → 대시보드 새로고침
 *  (기존 응답 데이터·자동 보고 트리거는 그대로 유지됩니다)
 *******************************************************************/

/* ============================ 설정 ============================ */
const CONFIG = {
  // 저점수 알림: 3문항 중 하나라도 이 점수 이하이면 즉시 메일
  //
  // 2026-10 변경: 2 → 3.
  // 이유: 정식 운영 후 두 달간(9~10월, 응답 536건) 2점 이하 응답이 단 한 건도
  // 나오지 않아 저점수 대응 체계가 한 번도 작동하지 않았다. 만점 비율이 95%를
  // 넘는 분포에서는 ≤2가 사실상 "절대 걸리지 않는 기준"이라, 개선 신호를 주는
  // 3점대 응답이 전부 그냥 지나갔다.
  //
  // 긴급도는 alertTier_()가 따로 나눈다:
  //   최저 1점 또는 심각 키워드 → 🚨 즉시 조치
  //   최저 2~3점              → ⚠️ 조치 필요
  // 따라서 기준을 3으로 올려도 "즉시 조치" 알림이 늘지는 않는다.
  ALERT_THRESHOLD: 3,

  // 기준 전환일 — 이 날짜부터 "접수된" 응답에 ALERT_THRESHOLD(3)를 적용하고,
  // 그 전 응답은 접수 당시 기준인 ALERT_THRESHOLD_PREV(2)로 센다.
  //
  // 응답일 기준으로 가르는 이유: 기준을 소급 적용하면 이미 공유·게시한 지난달
  // 숫자가 보고서를 다시 뽑을 때마다 바뀐다. 실제로 9월 게시물이 "저점수 0건"으로
  // 인쇄된 뒤 집계만 1건으로 바뀌는 일이 있었다. 과거 보고서는 그대로 재현되어야 한다.
  //
  // 전환이 끝나 과거 자료를 더 쓰지 않게 되면 이 두 줄을 지우고
  // lowMaxAt_()가 항상 ALERT_THRESHOLD를 반환하게 두면 된다.
  ALERT_THRESHOLD_FROM: '2026-11-01',
  ALERT_THRESHOLD_PREV: 2,

  // 월간 보고 메일에 첨부할 "게시물 한 장"(PNG)이 들어 있는 구글 드라이브 폴더 ID.
  // 폴더를 열었을 때 주소창의 .../folders/<이 부분> 을 넣는다. 비워 두면 첨부를 건너뛴다.
  //
  // 왜 폴더에서 집어 오나: 게시물은 매달 사람이 판단해 만든다(우수 엔지니어 선정,
  // 인용문 5건 고르기·다듬기). 스크립트가 그림까지 그릴 수는 없으므로, 만들어 둔
  // 파일을 이름으로 찾아 붙이는 방식이 가장 단순하고 덜 깨진다.
  //
  // 파일 이름에 해당 월이 'YYYYMM' 또는 'YYYY-MM' 형태로 들어 있으면 자동으로 찾는다.
  //   예) FSG_고객만족도_202610_게시용.png
  BOARD_IMAGE_FOLDER_ID: '',

  // 월간 보고 메일을 이 스크립트가 보낼지 여부.
  //
  // false (2026-10-31 사용자 결정): 월간 요약 메일은 claude.ai 예약 작업
  // "월간 VOC PPT 리포트 + 요약 이메일"이 9명에게 HTML 서식으로 보낸다. 이 스크립트까지
  // 보내면 같은 내용이 두 번 가므로 끈다. 보고서 **시트**는 계속 자동 생성된다.
  //
  // 메뉴의 "월간 보고 메일 다시 보내기"는 이 값과 무관하게 수동으로 쓸 수 있다.
  MONTHLY_MAIL: false,

  // 저점수 알림·월간 보고를 항상 받는 관리자(전 팀 공통)
  ALERT_EMAILS: ['hmson@sysmex.co.kr'],

  // 팀별 팀장 — 저점수 알림 시 해당 응답의 담당 FSR이 속한 팀의 팀장에게만 추가 발송한다.
  // 전 팀장에게 일괄 발송하지 않는 이유: 자기 팀과 무관한 알림이 쌓이면 정작 본인 팀
  // 건을 놓치게 되고, 알림 자체를 무시하게 되기 때문이다.
  // ※ 월간 보고 메일은 전체 집계 자료이므로 ALERT_EMAILS(관리자)에게만 발송된다.
  TEAM_LEAD_EMAILS: {
    'FS EAST':    'bwkim@sysmex.co.kr',   // 김병우
    'FS WEST':    'sheo@sysmex.co.kr',    // 허석
    'FS CENTRAL': 'ghjung@sysmex.co.kr',  // 정근하
    'FS SOUTH':   'khseong@sysmex.co.kr', // 성기홍
  },

  // 보고서 개인별 순위에 포함되는 최소 응답 건수
  // 2 = 응답 2건 이상만 순위 포함 (소수 응답 왜곡 방지)
  RANK_MIN_RESPONSES: 2,

  // 고과 반영이 가능한 최소 응답 수. 이 미만은 개인별순위 시트에 '표본부족'으로
  // 표시되어, 평균값을 개인 평가 근거로 그대로 쓰지 않도록 한다.
  // (표본이 작을수록 응답 1건이 평균을 크게 흔들어 형평성이 깨지기 때문)
  EVAL_MIN_RESPONSES: 5,

  /* ---- 이상 응답(자가 응답 의심) 탐지 기준 ----
   * 만족도가 평가에 반영되는 순간, 본인이 직접 응답할 유인이 생긴다. 이를 완전히
   * 차단할 기술적 방법은 없으므로(익명 설문이라 응답자 신원 확인 불가), 대신
   * "패턴이 이상한 응답"에 자동으로 플래그를 달아 관리자가 확인하게 한다.
   * 플래그는 판정이 아니라 확인 요청이다 — 정상 응답도 걸릴 수 있으므로
   * 자동 제외하지 않고 집계에는 그대로 포함시킨다. */
  ANOMALY: {
    // 같은 FSR + 같은 기관 응답이 이 시간(분) 안에 여러 건이면 의심
    BURST_WINDOW_MIN: 10,
    // 위 창 안에서 이 건수 이상이면 플래그
    BURST_COUNT: 2,
    // 3문항 모두 만점이고 서술형도 비어 있는 응답이 한 FSR에게 이 비율 이상이면 플래그
    PERFECT_RATIO: 0.9,
    // 위 비율 판정을 적용할 최소 응답 수 (표본이 적으면 우연일 수 있어 제외)
    PERFECT_MIN_N: 5,

    // 3문항 점수가 전부 같은(예: 4·4·4) 응답이 한 FSR에게 이 비율 이상이면 플래그.
    // 실측 근거: 실제 고객 응답 15건 중 "3문항 동일 점수"는 0건이었다 — 진짜 고객은
    // 항목별로 점수를 다르게 준다. 만점(5·5·5)만 보던 기존 규칙으로는 4·4·4나
    // 3·3·3처럼 "적당히 찍은" 패턴을 놓치므로 별도 규칙으로 분리했다.
    FLAT_RATIO: 0.8,
    FLAT_MIN_N: 5,

    // 서술형 의견이 글자 그대로 반복되는 경우(같은 FSR이 같은 문구로 여러 번).
    // 실제 고객이 우연히 똑같은 문장을 쓸 확률은 매우 낮다.
    DUP_TEXT_MIN_LEN: 4,   // 이 길이 이상인 의견만 대상(“없음”, “좋음” 같은 짧은 상투어 제외)
    DUP_TEXT_COUNT: 2,     // 동일 문구가 이 횟수 이상이면 플래그
  },

  // 폼 편집 URL — updateFormFsrDropdown() 실행 시에만 필요
  // 예: 'https://docs.google.com/forms/d/xxxxx/edit'
  FORM_EDIT_URL: 'https://docs.google.com/forms/d/1rqJNDfMU-Iq28L7HO-yqGbkoqKbHp6Qaakaw43sAlR4/edit',

  // CRM(Dynamics 365) 방문건수 가져오기 시 "방문"으로 인정할 약속/활동 목적
  // 고장 수리 + PM(정기점검)을 집계한다(2026-09 확정).
  // 두 경우 모두 현장 방문 시 설문 QR을 안내하므로 분모에 포함한다.
  // 설치·이전설치는 설문 대상이 아니어서 제외한다.
  // 주의: PM은 한 번 방문에 여러 장비를 점검해 CRM 행이 여러 개 생기므로,
  //       아래 집계 루프의 방문 단위 중복 제거(seenVisit)가 특히 중요하다.
  CRM_ONSITE_PURPOSES: ['고장 수리', 'PM'],
  CRM_FORM_TYPE: '서비스 요청',   // 학술 요청·온라인 고객지원·영업 요청 등은 FSR 현장 서비스가 아니므로 제외
  CRM_STATUS_DONE: '완료됨',      // 취소됨·시작됨 건은 방문건수에서 제외

  // PC 「FSG 대시보드 올리기」가 CRM 파일을 올리는 Drive 폴더. 이름·URL 모두 됨.
  // ── CRM 원본 위치 ──
  // 2026-10-25: 월간보고 허브 시트(FSG_월_분기 보고 데이터)의 원본_활동 탭을 직접 읽는다.
  // 값은 허브 시트 URL 또는 ID. 메뉴 「CRM 허브 시트 지정…」(스크립트 속성 HUB_SHEET)으로도 넣을 수 있다.
  HUB_SHEET: '',
  HUB_CRM_TAB: '원본_활동',
  // 2026-10-26: Drive 폴더(이름 또는 URL). 월간보고·대시보드가 쓰는 CRM 파일 폴더와 같다.
  // 스크립트 속성 CRM_FOLDER 가 있으면 그 값이 우선하고, '-' 면 폴더를 쓰지 않는다.
  // 폴더가 없거나 활동 파일이 없으면 허브 시트 → CRM원본 탭 순서로 읽는다.
  CRM_FOLDER: 'CRM_원본',

  // 진행 중인 달은 방문건수에 넣지 않는다. 월중에 집계하면 분모가 덜 찬 상태로 들어가
  // 응답률이 실제보다 높게 보이고, 달이 끝난 뒤 값이 또 바뀐다.
  // (포털 만족도 카드는 방문건수가 없는 달을 「방문 건수 집계 전」으로 안내한다.)
  VISITS_SKIP_CURRENT_MONTH: true,

  // 방문건수 집계 시작 월 (이 월 이전 데이터는 방문건수 시트에 남기지 않는다).
  // CRM 내보내기에 과거 이력이 통째로 들어 있으면 2024년치까지 1,000행 넘게 쌓여
  // 시트를 알아보기 어려워진다. 조사가 시작된 2026-08부터만 관리한다.
  // 과거 데이터가 필요해지면 이 값만 앞당기고 "CRM 방문건수 가져오기"를 다시 실행하면 된다.
  VISITS_START_MONTH: '2026-08',

  // 설문 조사 개시일. 이 날짜 이전 방문은 응답률 분모에서 제외한다.
  // (조사가 8/19에 시작됐으므로 8/1~8/18 방문은 설문 자체가 없어 응답이 나올 수 없다.
  //  실측 406건이 분모에 잘못 포함돼 개인별 응답률이 절반 수준으로 낮게 표시됐다.)
  VISITS_START_DATE: '2026-08-19',
};

/* FSR 명단 (번호 / 팀 / 직급 / 성명) — 인사이동 시 'FSR명단' 시트에서 직접 수정 */
const ROSTER = [
  [1,'FS WEST','팀장','허석'],   [2,'FS WEST','T3','채대석'],  [3,'FS WEST','T3','전우상'],
  [4,'FS WEST','T3','김보석'],   [5,'FS WEST','T2','이인구'],  [6,'FS WEST','T2','김태윤'],
  [7,'FS WEST','T1','현준'],     [8,'FS WEST','T1','김동찬'],  [9,'FS WEST','T1','안성무'],
  [10,'FS WEST','T1','이경민'],  [11,'FS WEST','T1','백원욱'], [12,'FS WEST','T1','심구'],
  [13,'FS EAST','팀장','김병우'],[14,'FS EAST','T4','유용선'], [15,'FS EAST','T2','이준호'],
  [16,'FS EAST','T2','손지원'],  [17,'FS EAST','T2','김규민'], [18,'FS EAST','T2','김세진'],
  [19,'FS EAST','T2','서윤걸'],  [20,'FS EAST','T1','윤병지'], [21,'FS EAST','T1','박재우'],
  [22,'FS EAST','T1','서재훈'],  [23,'FS EAST','T1','김회창'],
  [24,'FS CENTRAL','팀장','정근하'],[25,'FS CENTRAL','T3','이만식'],[26,'FS CENTRAL','T3','문유진'],
  [27,'FS CENTRAL','T3','이건석'],  [28,'FS CENTRAL','T2','김재모'],[29,'FS CENTRAL','T2','한승호'],
  [30,'FS CENTRAL','T1','유재혁'],  [31,'FS CENTRAL','T1','강태은'],[32,'FS CENTRAL','T1','손혜린'],
  [33,'FS CENTRAL','T1','이건우'],
  [34,'FS SOUTH','팀장','성기홍'],[35,'FS SOUTH','T3','문창수'],[36,'FS SOUTH','T3','박석영'],
  [37,'FS SOUTH','T3','박동민'],  [38,'FS SOUTH','T3','이승직'],[39,'FS SOUTH','T2','이준민'],
  [40,'FS SOUTH','T2','이도협'],  [41,'FS SOUTH','T2','김태현'],[42,'FS SOUTH','T2','윤진성'],
  [43,'FS SOUTH','T1','조수호'],  [44,'FS SOUTH','T1','김성학'],
];

/* 팀별 담당 권역 — 설문에서 "지역" 문항이 빠져도 FSR의 소속 팀으로 권역을 역추정하기 위한 매핑
 * (WEST·EAST는 같은 수도권을 나눠 담당하므로 팀 단위로는 구분되지 않고 같은 권역으로 묶임) */
const TEAM_REGION = {
  'FS WEST': '수도권(서울·경기·강원·인천)',
  'FS EAST': '수도권(서울·경기·강원·인천)',
  'FS CENTRAL': '충청·호남권(대전·광주·충청·전라)',
  'FS SOUTH': '영남권(부산·대구·경상·울산)',
};

/* 기관명에 지역명이 포함된 경우 우선 사용하는 매핑 — 제주는 전 팀이 방문하므로
 * 팀 기준 추정(TEAM_REGION)으로는 절대 맞힐 수 없어 이 레이어가 반드시 필요하다.
 * 제주를 배열 맨 앞에 두어 다른 키워드보다 먼저 매칭되게 한다. */
const REGION_NAME_MAP = [
  ['제주', '제주(전팀 방문)'], ['서귀포', '제주(전팀 방문)'],
  ['서울', '수도권(서울·경기·강원·인천)'], ['경기', '수도권(서울·경기·강원·인천)'],
  ['강원', '수도권(서울·경기·강원·인천)'], ['인천', '수도권(서울·경기·강원·인천)'],
  ['대전', '충청·호남권(대전·광주·충청·전라)'], ['광주', '충청·호남권(대전·광주·충청·전라)'],
  ['충북', '충청·호남권(대전·광주·충청·전라)'], ['충남', '충청·호남권(대전·광주·충청·전라)'],
  ['세종', '충청·호남권(대전·광주·충청·전라)'], ['전북', '충청·호남권(대전·광주·충청·전라)'],
  ['전남', '충청·호남권(대전·광주·충청·전라)'],
  ['부산', '영남권(부산·대구·경상·울산)'], ['대구', '영남권(부산·대구·경상·울산)'],
  ['울산', '영남권(부산·대구·경상·울산)'], ['경북', '영남권(부산·대구·경상·울산)'],
  ['경남', '영남권(부산·대구·경상·울산)'],
];

/* "거래처지역" 시트 로드 → 거래처+담당자 조합 및 거래처 단독 두 가지 키로 조회 가능한 맵 생성.
 * 담당자까지 같이 키로 쓰는 이유: 같은 이름의 거래처가 지점별로 다른 지역에 있는 극소수
 * 사례(예: "참조은병원"이 경기도점과 대구점 둘 다 있음)를 정확히 구분하기 위해서다.
 * byFsrNames는 유사도 매칭(fuzzyMatchOrg_)에서 "이 FSR이 담당하는 거래처 목록"으로만
 * 검색 범위를 좁히기 위해 함께 만든다 — 전체 909개가 아니라 해당 FSR의 10~30개 정도로
 * 좁혀야 오매칭 위험 없이 정확한 유사도 매칭이 가능하다. */
function loadAccountRegion_(ss) {
  const sh = ss.getSheetByName(SHEETS.ACCOUNT_REGION);
  const byAccountFsr = {}, byAccountOnly = {}, byFsrNames = {}, allNames = [];
  if (!sh || sh.getLastRow() < 2) return { byAccountFsr, byAccountOnly, byFsrNames, allNames };
  const data = sh.getDataRange().getValues();
  const head = data[0].map(String);
  const idx = (name) => head.indexOf(name);
  const col = { account: idx('거래처(병원)'), fsr: idx('담당자'), region: idx('지역') };
  if (col.account === -1 || col.region === -1) return { byAccountFsr, byAccountOnly, byFsrNames, allNames };
  const seenAll = {};
  const seenFsrAccount = {}; // "FSR별 담당 목록"에 같은 거래처가 중복으로 쌓이는 것 방지
  // (거래처지역 원본에 같은 담당자·거래처 행이 실수로 두 번 들어있으면, 유사매칭 후보
  //  목록에 같은 이름이 2번 들어가 "1위·2위 격차" 안전장치가 정답을 정답 자신과
  //  비교해 오작동하는 버그가 재발할 수 있다 — broadPool에서 실제로 발견됐던 것과 동일한
  //  종류의 문제라 여기서도 예방적으로 막아둔다.)
  for (let i = 1; i < data.length; i++) {
    const r = data[i];
    const account = String(r[col.account]).trim();
    const region = String(r[col.region]).trim();
    if (!account) continue;
    const accKey = norm_(account);
    if (col.fsr !== -1) {
      const fsrRaw = String(r[col.fsr]).trim();
      const fsrKey = norm_(fsrRaw);
      if (region) byAccountFsr[accKey + '|' + fsrKey] = region;
      const dupKey = fsrKey + '|' + accKey;
      if (!seenFsrAccount[dupKey]) {
        seenFsrAccount[dupKey] = true;
        (byFsrNames[fsrKey] = byFsrNames[fsrKey] || []).push(account);
      }
    }
    if (region && !byAccountOnly[accKey]) byAccountOnly[accKey] = region; // 첫 등장 값 사용
    if (!seenAll[accKey]) { seenAll[accKey] = true; allNames.push(account); }
  }
  return { byAccountFsr, byAccountOnly, byFsrNames, allNames };
}

/* "설치이력" 시트(장비 Serial No 등록대장, 원본 헤더 그대로) 로드 → 거래처 단독 키로
 * 지역(시/도) 조회하는 맵 생성. FSR 배정 리스트(거래처지역)보다 범위가 훨씬 넓다
 * (실측 1,834개 거래처 vs 907개) — 담당자 구분은 없지만(그래서 3단계 중 2순위),
 * 실제 설치 주소 기반이라 정확도는 높다. */
function loadAccountRegionAll_(ss) {
  const sh = ss.getSheetByName(SHEETS.ACCOUNT_REGION_ALL);
  const byAccount = {}, names = [];
  if (!sh || sh.getLastRow() < 2) return { byAccount, names };
  const data = sh.getDataRange().getValues();
  const head = data[0].map(String);
  const idx = (name) => head.indexOf(name);
  const col = { account: idx('거래처'), region: idx('주소 1: 특별시, 광역시, 도(거래처)(거래처)') };
  if (col.account === -1 || col.region === -1) return { byAccount, names };
  const seen = {};
  for (let i = 1; i < data.length; i++) {
    const r = data[i];
    const account = String(r[col.account]).trim();
    const region = String(r[col.region]).trim();
    if (!account) continue;
    const key = norm_(account);
    if (region && !byAccount[key]) byAccount[key] = region; // 첫 등장 값 사용(극소수 지점 충돌은 무시)
    if (!seen[key]) { seen[key] = true; names.push(account); }
  }
  return { byAccount, names };
}

/* 지역 추정 4단계:
 *   ① "거래처지역" 시트(FSR 담당 거래처 리스트, 907개) — 거래처+담당자 조합으로 가장 정확하게
 *      조회, 못 찾으면 거래처명만으로 재조회. 동명 거래처의 지점 구분까지 가능한 유일한 단계.
 *   ② "설치이력" 시트(Serial No 등록대장, 1,834개) — ①보다 범위가 훨씬 넓다. 담당자 구분은
 *      없지만 실제 설치 주소 기반이라 정확도는 높다. ①에 없는 거래처의 보완용.
 *   ③ 기관명에 지역명이 포함되어 있으면 그걸 사용 (①②에도 없는 거래처 대응 — 제주는 특정
 *      담당자에게 고정 배정되지 않아 ①에는 아예 없고, ②에도 다 잡히리라는 보장이 없다)
 *   ④ 그래도 없으면 담당 FSR의 소속 팀으로 권역을 근사 추정 (최후 수단)
 * 폼에 실제 지역 응답이 있는 경우는 이 함수를 아예 타지 않고 그 값을 그대로 쓴다(호출부 참고). */
function deriveRegion_(orgName, fsrName, team, accountRegion, accountRegionAll) {
  const ar = accountRegion || { byAccountFsr: {}, byAccountOnly: {} };
  const accKey = norm_(orgName), fsrKey = norm_(fsrName || '');
  if (ar.byAccountFsr[accKey + '|' + fsrKey]) return ar.byAccountFsr[accKey + '|' + fsrKey];
  if (ar.byAccountOnly[accKey]) return ar.byAccountOnly[accKey];

  if (accountRegionAll && accountRegionAll.byAccount && accountRegionAll.byAccount[accKey]) return accountRegionAll.byAccount[accKey];

  const hit = REGION_NAME_MAP.find(m => orgName.indexOf(m[0]) !== -1);
  if (hit) return hit[1];
  return TEAM_REGION[team] || '';
}

/* 열 매칭 키워드 — [방문 서비스] 폼(양식 1)의 질문 문구 기준 설정 완료 */
const COLUMN_KEYWORDS = {
  region: '기관 위치',           // 항목 01. 기관 위치 (지역)
  org:    '기관명',              // 항목 02. 기관명
  fsr:    '당일 방문 엔지니어',   // 항목 03. 당일 방문 엔지니어 (FSR)
  model:  '장비 모델명',         // 항목 04. 장비 모델명
  type:   '서비스 형태',         // 항목 05. 서비스 형태
  q1:     '신속성',              // 항목 07. 신속성 / 일정 준수
  q2:     '전문성',              // 항목 08. 전문성 / 문제 해결
  q3:     '고객 응대',           // 항목 09. 고객 응대 / 마무리
  txt:    '전할 말씀',           // 의견 기재. 엔지니어에게 전할 말씀
};

/* 알림 래퍼 — "전체 갱신"처럼 여러 작업을 이어서 실행할 때 팝업이 여러 번 뜨는 것을
 * 막기 위해 사용한다. 조용히 실행 중이면 메시지를 모아 두었다가 마지막에 한 번만 보여준다. */
let UI_SILENT = false;
const UI_LOG = [];
function alert_(msg) {
  if (UI_SILENT) { UI_LOG.push(String(msg)); return; }
  // 화면(UI)이 없는 곳에서도 죽지 않게 한다.
  // getUi()는 시트 메뉴에서 실행할 때만 쓸 수 있고, Apps Script 편집기에서 ▶실행을
  // 누르거나 시간 기반 트리거로 돌 때는 'Cannot call SpreadsheetApp.getUi() from this
  // context' 예외를 던진다. 알림을 못 띄우는 것 때문에 설치·갱신 작업 자체가
  // 중단되면 안 되므로, 그런 맥락에서는 실행 로그에만 남기고 그대로 진행한다.
  try {
    SpreadsheetApp.getUi().alert(msg);   // ← 여기서 자기 자신을 부르면 무한 재귀가 된다
  } catch (e) {
    Logger.log(String(msg));
  }
}

const SHEETS = {
  DB: '기관명DB',
  ROSTER: 'FSR명단',
  CLEAN: '정제데이터',
  DASH: '대시보드',
  RANK: '개인별순위',
  TEXT: '서술형응답',
  VISITS: '방문건수',
  CRM: 'CRM원본',
  ACCOUNT_REGION: '거래처지역',
  ACCOUNT_REGION_ALL: '설치이력',
  FUZZY_REVIEW: '유사매칭_검토대기',
};

/* 서술형 의견 분류 키워드 — 서술형응답 시트 분류와 저점수 알림 긴급도 판정에 공용으로 사용 */
const SEVERE_KW  = ['최악','다시는','항의','클레임','교체 요구','교체요구','환불','계약 해지','계약해지',
                     '법적','화가','어이없','불쾌','무례','엉망','무책임','책임 회피','책임회피',
                     '타사로 교체','타사로 변경','경쟁사로 교체','경쟁사로 변경'];
// '늦'은 "늦은 시간까지 감사합니다" 같은 칭찬에도 걸려 실제 오분류가 발생했으므로
// 불만 의도가 분명한 활용형으로 좁혔다(2026-09 수정, 실측 사례 기반).
const IMPROVE_KW = ['불만','늦어','늦게 오','늦었','지각','개선','아쉽','불편','오래','부족','미흡','지연','불친절','실망','느리','반복'];
/* 칭찬 키워드를 두 갈래로 나눈다 — "감사합니다" 한마디와 "설명을 알아듣기 쉽게
 * 해주셨습니다"를 같은 칭찬으로 묶으면 칭찬 건수가 부풀려지고 대표 사례도 인사말로
 * 채워진다. 실측(119건): '감사'만 걸린 단순 인사가 칭찬의 상당수를 차지했다.
 *
 *  · PRAISE_KW    — 무엇을 잘했는지 드러나는 구체적 칭찬. 이것이 있으면 칭찬.
 *  · COURTESY_KW  — 인사·감사 표현. 이것만 있으면 길이로 판단한다(아래 참고).
 *
 * 주의: 한국어 활용형 때문에 '빠르'만 넣으면 "빠른 조치"가 안 잡힌다("빠른"은
 * 빠+른이라 '빠르'를 포함하지 않는다). 활용형을 함께 넣어야 한다. */
const PRAISE_KW  = ['친절','신속','빠르','빠른','빨리','빨라','꼼꼼','정확','전문','깔끔','믿음',
                    '만족','최고','훌륭','좋','해결','고쳐','설명','안내','도움','도와','최선',
                    '편안','상세','자세','시간약속','약속을 잘','신경','침착','적극','완벽',
                    '든든','배려','애써','이해하기 쉽','잘해주','잘 해주'];
const COURTESY_KW = ['감사','고맙','수고','고생','굳','good'];

/* ===== 의견 테마 (다중 라벨) =====================================
 * 기존 분류(심각/개선요청/칭찬/단순의견)는 "조치가 필요한가"를 답한다.
 * 테마는 "무엇에 대한 이야기인가"를 답한다 — 둘은 다른 축이라 함께 쓴다.
 *
 * 왜 필요한가: 칭찬이 전체의 대부분이라 "칭찬 173건"만으로는 아무것도 알 수 없다.
 * 고객이 실제로 무엇을 보고 만족하는지, 어떤 FSR이 무엇에 강한지가 드러나지 않는다.
 *
 * 다중 라벨인 이유: "친절하고 빠르게 해결해주셨다"는 세 가지를 동시에 말한다.
 * 하나만 고르면 정보가 버려진다.
 *
 * 감정이 아니라 주제다: "해결이 안 됐다"도 [문제해결·전문]으로 잡힌다.
 * 좋다/나쁘다는 기존 분류가 판단하므로 여기서 또 가르지 않는다.
 *
 * 설계 근거(실측 56건): 응대·친절 48% · 문제해결·전문 36% · 설명·안내 30% ·
 * 신속·시간 27% · 꼼꼼·마무리 14% · 기대이상 11%. 태그가 하나도 안 붙는 20%는
 * "감사합니다" 같은 순수 인사말로, 단순의견과 일치한다.
 *
 * 앞 네 개는 설문 3문항(신속성/전문성/응대)과 맞춘 축이다. 다만 '설명·안내'는
 * 문항에 없는데도 30%가 언급해 별도 테마로 뒀다 — 문항 추가를 검토할 근거가 된다. */
const THEMES = [
  ['응대·친절',     ['친절','상냥','웃','부드럽','편안','배려','공손','예의','매너','응대','대응',
                     '좋아요','좋습니다','좋았','화이팅','감동']],
  ['설명·안내',     ['설명','알려주','알려 주','안내','가르쳐','이해하기','눈높이','쉽게','상세',
                     '자세','답변','문의','교육','알아듣']],
  ['신속·시간',     ['신속','빠르','빠른','빨리','빨라','즉시','바로','일찍','당일','시간약속',
                     '약속을 잘','시간 준수','지연 없']],
  ['문제해결·전문', ['해결','고쳐','수리','조치','원인','진단','전문','정확','기술','통찰','노하우',
                     '복구','정상화','처리해','대처','믿']],
  ['꼼꼼·마무리',   ['꼼꼼','깔끔','정리','세심','빠짐없','철저','완벽','마무리','사후','점검까지',
                     '확인까지','신경']],
  ['기대이상',      ['먼길','멀리','추가로','까지 해주','까지해주','까지 확인','계속 담당',
                     '담당해주셨으면','학술','휴일','주말인데','퇴근','늦은 시간까지']],
];

/* 의견에서 테마를 뽑아 '응대·친절, 설명·안내' 형태의 문자열로 돌려준다.
 * 해당 없으면 빈 문자열 — 인사말만 있는 의견이 여기 해당한다. */
function tagThemes_(text) {
  const t = String(text || '');
  if (!t.trim()) return '';
  return THEMES.filter(function (th) {
    return th[1].some(function (k) { return t.indexOf(k) !== -1; });
  }).map(function (th) { return th[0]; }).join(', ');
}

/* 인사말만 있을 때 "구체적 서술"로 인정하는 최소 길이.
 * 실측 근거: "주말인데 나와주셔서 감사드립니다"(17자)처럼 인사 표현만 있어도 길면
 * 고객이 상황을 설명한 것이라 칭찬으로 보는 게 맞고, "감사합니다"(5자)는 아니다. */
const COURTESY_MIN_LEN = 15;

/* 부정 표현으로 무효화되는 키워드 판별.
 * 한국어는 "불편함 없이", "느리지 않고", "실망시키지 않는" 처럼 부정어가 뒤에 붙으면
 * 의미가 정반대가 된다. 단순 포함 검사만 하면 칭찬을 불만으로 오분류하므로,
 * 키워드 뒤 8자 안에 부정 표현이 있으면 그 출현은 무효로 본다.
 * 같은 키워드가 여러 번 나오면, 부정 없는 출현이 하나라도 있을 때만 유효로 판정한다.
 * (실측 검증: 칭찬 문장 17종 전수 테스트 통과) */
const NEGATION_RE = /없이|없었|없습니|없어|없고|없는|없음|않고|않게|않는|않았|않습니|않아/;
function isNegated_(text, kw) {
  let idx = text.indexOf(kw);
  while (idx !== -1) {
    const after = text.slice(idx + kw.length, idx + kw.length + 8);
    if (!NEGATION_RE.test(after)) return false;   // 부정 안 붙은 출현 발견 → 유효
    idx = text.indexOf(kw, idx + 1);
  }
  return true;   // 모든 출현이 부정과 함께 → 무효
}

/* 불만 키워드가 "과거에 겪은 문제"를 말하고 그 뒤에 해결됐다는 서술이 오면,
 * 그 문장은 불만이 아니라 칭찬이다.
 * 실제 사례: "오랜기간 … 불편을 겪었는데 원인을 정확히 파악하여 해결해주셨습니다"
 * → '불편'만 보고 개선요청으로 분류됐다.
 *
 * 키워드 **뒤쪽**에 해소 표현이 있을 때만 인정한다. 순서가 중요한 이유:
 * "처리는 해주셨는데 너무 늦었습니다"는 해소가 불만보다 앞에 있으므로 여전히 불만이다. */
const RESOLVED_RE = /해결|해소|조치해|처리해|고쳐주|해주셔|해주심|해주셨|덕분|잡아주|바로잡/;
function isResolved_(text, kw) {
  let idx = text.indexOf(kw);
  while (idx !== -1) {
    if (!RESOLVED_RE.test(text.slice(idx + kw.length))) return false;  // 해소 없는 출현 발견
    idx = text.indexOf(kw, idx + 1);
  }
  return true;   // 모든 출현 뒤에 해소 표현이 있음
}

/* 키워드 목록 중 "부정으로 무효화되지 않은" 항목이 하나라도 있는지 */
function hasKeyword_(text, list) {
  return list.some(k => text.indexOf(k) !== -1 && !isNegated_(text, k));
}

/* 서술형응답 시트용 분류.
 *
 * 고과 반영 자료로 쓰이므로 형평성 원칙을 명시한다:
 *  ① 서술형이 비어 있으면 분류하지 않는다('(의견없음)').
 *     이전에는 점수만으로 칭찬/개선요청/심각이 붙어, 점수가 서술형 집계에 이중 반영됐다.
 *  ② 분류는 "고객이 실제로 쓴 말"만 근거로 한다. 점수는 보조 신호로만 쓰고,
 *     점수만으로 심각·개선요청을 만들지 않는다. 이전에는 칭찬 문장이라도 점수가 낮으면
 *     '심각'으로 뒤집혀, FSR이 소명할 수 없는 낙인이 찍혔다.
 *  ③ 텍스트와 점수가 어긋나면(칭찬 문구인데 저점수 등) '확인필요'로 표시해 사람이 판단한다.
 *     자동으로 어느 한쪽을 택하지 않는다. */
function classify_(t, avgScore) {
  const text = String(t || '').trim();
  if (!text) return '(의견없음)';               // ① 텍스트 없으면 분류 안 함

  const severe  = hasKeyword_(text, SEVERE_KW);
  // 개선요청은 "해결됐다"는 서술이 뒤따르면 불만으로 보지 않는다.
  // (심각 키워드는 해결 여부와 무관하게 확인이 필요하므로 이 완화를 적용하지 않는다)
  const improve = IMPROVE_KW.some(k =>
    text.indexOf(k) !== -1 && !isNegated_(text, k) && !isResolved_(text, k));
  const praise  = hasKeyword_(text, PRAISE_KW);
  // 인사·감사 표현만 있는 경우: 충분히 길면 상황을 설명한 것으로 보고 칭찬으로,
  // 짧으면 형식적 인사로 보고 단순의견으로 분류한다.
  const courtesy = hasKeyword_(text, COURTESY_KW) && text.length >= COURTESY_MIN_LEN;

  if (severe)  return '🚨 심각(즉시조치)';
  if (improve) return '개선요청';
  if (praise || courtesy) {
    // ③ 칭찬 문구인데 점수가 낮으면 단정하지 않고 사람이 확인하도록 표시
    return (avgScore !== '' && avgScore <= CONFIG.ALERT_THRESHOLD) ? '확인필요(문구·점수 불일치)' : '칭찬';
  }
  return '단순의견';                             // ② 점수만으로 심각/개선 만들지 않음
}

/* 사람이 지정한 분류(수동 보정)를 읽는다.
 * 운영 방식: 서술형응답 시트에서 자동 분류가 틀렸을 때
 *   · 검수결과 = '오분류'
 *   · 조치 내용 = 올바른 분류명 (예: '단순의견')
 * 을 적어 두면, 그 값을 최종 분류로 쓴다.
 *
 * 왜 이렇게 하나: 이전에는 '오분류' 건을 집계에서 빼기만 했다. 그러면 틀린 분류는
 * 사라지지만 그 응답 자체가 통계에서 누락된다. 올바른 분류를 알고 있다면 빼는 것보다
 * 제대로 분류해 넣는 것이 맞다.
 *
 * 조치 내용 열은 저점수 대응 기록에도 쓰이는데, 거기에는 분류명이 아닌 문장이 들어가므로
 * (예: "유선 사과 후 재방문") 아래 목록과 정확히 일치할 때만 보정으로 인정해 충돌을 피한다. */
const MANUAL_CLASSES = ['🚨 심각(즉시조치)', '심각', '개선요청', '칭찬', '단순의견',
                        '확인필요(문구·점수 불일치)', '(의견없음)'];
function manualClass_(review, action) {
  if (String(review).trim() !== '오분류') return '';
  const v = String(action || '').trim();
  if (!v) return '';
  if (MANUAL_CLASSES.indexOf(v) === -1) return '';
  return v === '심각' ? '🚨 심각(즉시조치)' : v;   // 짧게 적은 '심각'도 인정
}

/* 해당 시점에 적용되는 저점수 기준값을 돌려준다.
 * when: Date 또는 'yyyy-MM-dd…' 문자열. 비어 있으면 현행 기준으로 본다. */
function lowMaxAt_(when) {
  const ymd = (when instanceof Date)
    ? Utilities.formatDate(when, 'Asia/Seoul', 'yyyy-MM-dd')
    : String(when || '').slice(0, 10);
  if (ymd.length < 10) return CONFIG.ALERT_THRESHOLD;
  return ymd >= CONFIG.ALERT_THRESHOLD_FROM
    ? CONFIG.ALERT_THRESHOLD
    : CONFIG.ALERT_THRESHOLD_PREV;
}

/* 정제데이터 한 행이 저점수인지 — 그 응답이 접수된 날의 기준으로 판정한다.
 * (0응답일시 … 9신속 10전문 11응대) */
function isLowRow_(r) {
  return Math.min(r[9], r[10], r[11]) <= lowMaxAt_(r[0]);
}

/* 대시보드 KPI 라벨. 전환 전 응답이 아직 남아 있는 동안은 두 기준이 섞이므로
 * 숫자 하나만 적으면 틀린 설명이 된다. 전환일이 지나 과거 기준이 의미 없어지면
 * CONFIG에서 ALERT_THRESHOLD_FROM을 지우고 단순 라벨로 돌아가면 된다. */
function lowKpiLabel_() {
  const cur = CONFIG.ALERT_THRESHOLD, prev = CONFIG.ALERT_THRESHOLD_PREV;
  if (!CONFIG.ALERT_THRESHOLD_FROM || cur === prev) return '저점수(≤' + cur + ')';
  return '저점수(≤' + cur + '·이전 ≤' + prev + ')';
}

/* 저점수 알림 이메일용 2단계 긴급도 판정 (개별 문항 중 최저점 기준)
 * 평균이 아닌 최저점을 쓰는 이유: 5·5·1점(평균 3.67)처럼 한 항목만 심각해도
 * 평균으로는 가려지기 때문에, 알림 맥락에서는 "가장 나쁜 항목"을 기준으로 판단한다. */
function alertTier_(t, minScore) {
  const severe = hasKeyword_(t, SEVERE_KW) || minScore <= 1;
  return severe
    ? { label: '🚨 즉시 조치', subjectTag: '[긴급 VOC · 즉시조치]' }
    : { label: '⚠️ 조치 필요', subjectTag: '[VOC · 조치필요]' };
}

/* 이상 응답(자가 응답 의심) 탐지.
 * rows: 정제데이터 행 배열 (0응답일시 3기관 4FSR 9q1 10q2 11q3 13서술형)
 * 반환: 행 인덱스 → 사유 문자열 맵.
 *
 * 왜 필요한가: 만족도가 개인 평가에 반영되면 FSR 본인이 응답할 유인이 생긴다.
 * 익명 설문이라 응답자가 누구인지 기술적으로 확인할 방법이 없으므로, 대신
 * "정상 고객 응답이라면 나오기 어려운 패턴"을 찾아 확인 대상으로 표시한다.
 *
 * 주의: 이건 판정이 아니라 확인 요청이다. 정상 응답도 걸릴 수 있으므로
 * 자동으로 집계에서 제외하지 않는다 — 제외 여부는 사람이 판단한다. */
function detectAnomalies_(rows) {
  const A = CONFIG.ANOMALY;
  const flags = {};
  const addFlag = (i, reason) => {
    if (!flags[i]) { flags[i] = reason; return; }
    // 같은 유형의 사유가 겹쳐 기록되지 않게 중복 제거(예: 연속 제출은 구간마다 재검출됨)
    if (flags[i].indexOf(reason) === -1) flags[i] += ' / ' + reason;
  };

  // ① 연속 제출: 같은 FSR + 같은 기관이 짧은 시간 안에 여러 건
  //    실제 고객이라면 같은 기관에서 몇 분 안에 여러 명이 응답할 일이 드물다.
  const byKey = {};
  rows.forEach((r, i) => {
    const t = (r[0] instanceof Date) ? r[0].getTime() : new Date(r[0]).getTime();
    if (!t) return;
    const key = norm_(String(r[4])) + '|' + norm_(String(r[3]));
    (byKey[key] = byKey[key] || []).push({ i: i, t: t });
  });
  Object.keys(byKey).forEach(key => {
    const arr = byKey[key].sort((a, b) => a.t - b.t);
    const windowMs = A.BURST_WINDOW_MIN * 60 * 1000;
    for (let s = 0; s < arr.length; s++) {
      const group = arr.filter(x => x.t >= arr[s].t && x.t - arr[s].t <= windowMs);
      if (group.length >= A.BURST_COUNT) {
        group.forEach(g => addFlag(g.i,
          A.BURST_WINDOW_MIN + '분 내 동일 기관·FSR 다건 제출'));
      }
    }
  });

  // ② 만점 편중: 한 FSR의 응답이 대부분 "3문항 만점 + 서술형 없음"
  //    고객은 보통 점수가 갈리거나 한마디라도 남긴다. 무성의한 만점만 반복되면 확인 대상.
  const byFsr = {};
  rows.forEach((r, i) => {
    const k = norm_(String(r[4]));
    if (!k) return;
    (byFsr[k] = byFsr[k] || []).push({ i: i, perfect: (r[9] === 5 && r[10] === 5 && r[11] === 5 && !String(r[13]).trim()) });
  });
  Object.keys(byFsr).forEach(k => {
    const arr = byFsr[k];
    if (arr.length < A.PERFECT_MIN_N) return;
    const p = arr.filter(x => x.perfect).length;
    if (p / arr.length >= A.PERFECT_RATIO) {
      arr.forEach(x => { if (x.perfect) addFlag(x.i, '만점·무의견 편중(' + p + '/' + arr.length + '건)'); });
    }
  });

  // ③ 평탄 점수 편중: 3문항 점수가 전부 같은 응답이 한 FSR에게 반복
  //    실측상 실제 고객 응답에서는 3문항 동일 점수가 나오지 않았다(15건 중 0건).
  //    만점만 보는 ②로는 4·4·4 같은 "적당히 찍은" 패턴을 놓치므로 따로 잡는다.
  const flatByFsr = {};
  rows.forEach((r, i) => {
    const k = norm_(String(r[4]));
    if (!k) return;
    const flat = (r[9] === r[10] && r[10] === r[11] && Number(r[9]) > 0);
    (flatByFsr[k] = flatByFsr[k] || []).push({ i: i, flat: flat });
  });
  Object.keys(flatByFsr).forEach(k => {
    const arr = flatByFsr[k];
    if (arr.length < A.FLAT_MIN_N) return;
    const f = arr.filter(x => x.flat).length;
    if (f / arr.length >= A.FLAT_RATIO) {
      arr.forEach(x => { if (x.flat) addFlag(x.i, '3문항 동일점수 편중(' + f + '/' + arr.length + '건)'); });
    }
  });

  // ④ 서술형 문구 반복: 같은 FSR 건에서 동일한 의견 문구가 반복 등장
  //    실제 고객이 우연히 똑같은 문장을 쓸 확률은 매우 낮다.
  const textByFsr = {};
  rows.forEach((r, i) => {
    const k = norm_(String(r[4]));
    const t = String(r[13] || '').trim();
    if (!k || t.length < A.DUP_TEXT_MIN_LEN) return;
    const tk = norm_(t);
    textByFsr[k] = textByFsr[k] || {};
    (textByFsr[k][tk] = textByFsr[k][tk] || []).push(i);
  });
  Object.keys(textByFsr).forEach(k => {
    Object.keys(textByFsr[k]).forEach(tk => {
      const idxs = textByFsr[k][tk];
      if (idxs.length >= A.DUP_TEXT_COUNT) {
        idxs.forEach(i => addFlag(i, '동일 서술형 문구 ' + idxs.length + '회 반복'));
      }
    });
  });

  return flags;
}

/* ====================== 1. 최초 설치 (1회 실행) ====================== */
function setupExisting() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const raw = findResponseSheet_(ss);
  if (!raw) {
    alert_(
      '❌ 폼 응답 시트를 찾을 수 없습니다.\n\n' +
      '구글 폼 → [응답] 탭 → 스프레드시트 아이콘 → 이 시트에 연결한 뒤 다시 실행해 주세요.');
    return;
  }

  // 열 매칭 검증 (region은 선택 항목 — 폼에서 지역 문항을 뺀 경우 필수로 요구하지 않음)
  const head = raw.getRange(1, 1, 1, raw.getLastColumn()).getValues()[0].map(String);
  const OPTIONAL_COLUMNS = ['region'];
  const missing = [];
  Object.keys(COLUMN_KEYWORDS).forEach(k => {
    if (OPTIONAL_COLUMNS.indexOf(k) !== -1) return;
    if (!head.some(h => h.indexOf(COLUMN_KEYWORDS[k]) !== -1)) {
      missing.push(k + ' (키워드: "' + COLUMN_KEYWORDS[k] + '")');
    }
  });
  if (missing.length) {
    alert_(
      '⚠️ 아래 항목의 키워드가 폼 질문과 일치하지 않습니다.\n' +
      'COLUMN_KEYWORDS 설정을 폼 질문 문구에 맞게 수정 후 다시 실행하세요.\n\n' +
      '· ' + missing.join('\n· ') + '\n\n' +
      '현재 응답 시트의 열 제목:\n' + head.join('\n'));
    return;
  }

  buildDbSheet_(ss);
  buildRosterSheet_(ss);
  buildVisitsSheet_(ss);
  buildFuzzyReviewSheet_(ss);
  getOrCreate_(ss, SHEETS.CLEAN);
  getOrCreate_(ss, SHEETS.DASH);
  getOrCreate_(ss, SHEETS.RANK);
  getOrCreate_(ss, SHEETS.TEXT);

  // 폼 제출 트리거만 재설치 (월간 자동 보고 트리거는 유지)
  ScriptApp.getProjectTriggers().forEach(t => {
    if (t.getHandlerFunction() === 'onFormSubmitHandler') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('onFormSubmitHandler').forSpreadsheet(ss).onFormSubmit().create();

  refreshDashboard();

  alert_(
    '✅ 설치 완료!\n\n' +
    '· FSR 44명 명단이 "FSR명단" 시트에 등록되었습니다. (팀별/직급별 집계 활성화)\n' +
    '· "방문건수" 시트에 월별 총 방문 건수를 입력하면 응답률이 자동 계산됩니다.\n' +
    '  (CRM 내보내기 파일이 있다면 "CRM원본" 시트에 붙여넣고 "CRM 방문건수 가져오기" 메뉴로 자동 집계 가능)\n' +
    '· 기존 응답 포함 대시보드가 구축되었으며, 이후 응답 제출 시 자동 갱신됩니다.\n\n' +
    '※ 폼의 엔지니어 드롭다운을 44명 실명으로 자동 교체하려면\n' +
    '   CONFIG.FORM_EDIT_URL 입력 후 updateFormFsrDropdown 함수를 실행하세요.\n' +
    '※ 응답 후 확인 메시지를 지정하려면 setFormConfirmationMessage 함수를 실행하세요.\n' +
    '※ 기관명 유사매칭 제안은 "유사매칭_검토대기" 시트에 쌓입니다. 검토 후 D열을 "승인"으로\n' +
    '   바꾸고 "유사매칭 승인 반영" 메뉴를 실행해야 기관명DB에 실제로 반영됩니다.');
}

/* 폼 응답 시트 자동 탐색 */
function findResponseSheet_(ss) {
  let sh = ss.getSheets().find(s =>
    s.getName().indexOf('설문지 응답') === 0 || s.getName().indexOf('Form Responses') === 0);
  if (sh) return sh;
  return ss.getSheets().find(s => {
    if (s.getLastColumn() < 2) return false;
    const h = String(s.getRange(1, 1).getValue());
    return h.indexOf('타임스탬프') !== -1 || h.indexOf('Timestamp') !== -1;
  }) || null;
}

/* 기관명DB 시트 초기화 */
function buildDbSheet_(ss) {
  let sh = ss.getSheetByName(SHEETS.DB);
  if (sh) return sh;
  sh = ss.insertSheet(SHEETS.DB);
  sh.getRange('A1:B1').setValues([['입력값(약칭·오타)', '표준 기관명']])
    .setFontWeight('bold').setBackground('#003087').setFontColor('#FFFFFF');
  sh.getRange('A2:B3').setValues([
    ['서울대병원', '서울대학교병원'],
    ['삼성서울', '삼성서울병원'],
  ]);
  sh.setColumnWidths(1, 2, 220);
  return sh;
}

/* 유사매칭_검토대기 시트 초기화. 이 시트는 fuzzyMatchOrg_()가 제안한 매핑을 사람이
 * 검토·승인하기 전까지 보관하는 대기열이다. 기관명DB(실제 매칭 규칙)는 여기서
 * "승인"으로 표시된 것만 applyApprovedFuzzyMappings()를 통해 반영된다.
 * 이렇게 분리한 이유(실측으로 확인된 문제): "일산병원"이 진짜 독립된 병원인데
 * "일산복음병원"의 줄임말로 오판되어 자동 등록된 사례가 있었다 — 유사도 매칭은
 * 틀릴 수 있으므로, 틀린 추측이 영구적인 매칭 규칙으로 굳어버리지 않게 사람이
 * 한 번 확인하는 단계를 반드시 거치게 한다. */
function buildFuzzyReviewSheet_(ss) {
  let sh = ss.getSheetByName(SHEETS.FUZZY_REVIEW);
  if (sh) return sh;
  sh = ss.insertSheet(SHEETS.FUZZY_REVIEW);
  sh.getRange('A1:E1').setValues([['입력값', '제안된 표준명', '유사도', '검토상태', '최초 발견일시']])
    .setFontWeight('bold').setBackground('#003087').setFontColor('#FFFFFF');
  sh.setColumnWidths(1, 2, 220); sh.setColumnWidth(3, 70); sh.setColumnWidth(4, 90); sh.setColumnWidth(5, 140);
  sh.setFrozenRows(1);
  return sh;
}

/* "유사매칭_검토대기"에서 검토상태="거부"로 확정된 입력값 목록을 로드한다.
 * 거부된 입력값은 refreshDashboard()에서 fuzzyMatchOrg_를 다시 시도하지 않고 곧바로
 * DB미등록으로 처리한다 — 그렇지 않으면 "거부"해도 다음 새로고침 때 똑같은 오매칭이
 * 매번 다시 계산되어 화면에 나타나는 문제가 있었다(기관명DB에 안 쓰일 뿐, 정제데이터
 * 표시 자체는 계속 잘못된 채로 남는 문제). */
function loadRejectedFuzzyInputs_(ss) {
  const sh = ss.getSheetByName(SHEETS.FUZZY_REVIEW);
  const rejected = {};
  if (!sh || sh.getLastRow() < 2) return rejected;
  sh.getRange(2, 1, sh.getLastRow() - 1, 4).getValues().forEach(r => {
    if (r[0] && String(r[3]).trim() === '거부') rejected[norm_(r[0])] = true;
  });
  return rejected;
}

/* 유사매칭_검토대기 시트에서 "검토상태"가 "승인"인 항목만 기관명DB에 실제로 반영한다.
 * "거부"나 "미검토" 상태는 반영되지 않는다 — 사람이 명시적으로 승인한 것만
 * 앞으로의 정확 매칭(표준화) 규칙이 된다. 메뉴에서 실행. */
function applyApprovedFuzzyMappings() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const review = ss.getSheetByName(SHEETS.FUZZY_REVIEW);
  if (!review || review.getLastRow() < 2) {
    alert_('검토 대기 중인 유사매칭 항목이 없습니다.');
    return;
  }
  const rows = review.getDataRange().getValues().slice(1);
  const approved = rows.filter(r => String(r[3]).trim() === '승인');
  if (!approved.length) {
    alert_('"검토상태"가 "승인"으로 표시된 항목이 없습니다.\n검토 후 D열을 "승인"으로 설정한 뒤 다시 실행해 주세요.');
    return;
  }

  const dbSh = buildDbSheet_(ss);
  const existing = {};
  dbSh.getDataRange().getValues().slice(1).forEach(r => { if (r[0]) existing[norm_(r[0])] = true; });
  const toAdd = [];
  approved.forEach(r => {
    const key = norm_(r[0]);
    if (!existing[key]) { existing[key] = true; toAdd.push([r[0], r[1]]); }
  });
  if (toAdd.length) dbSh.getRange(dbSh.getLastRow() + 1, 1, toAdd.length, 2).setValues(toAdd);

  if (!UI_SILENT) refreshDashboard();   // 전체 갱신 중이면 마지막에 한 번만 실행
  alert_('✅ 승인된 ' + toAdd.length + '건을 기관명DB에 반영했습니다.\n(이미 등록되어 있던 항목은 건너뛰었습니다.)');
}

/* FSR명단 시트 초기화 (최초 1회 내장 명단으로 생성, 이후 시트에서 직접 관리) */
function buildRosterSheet_(ss) {
  let sh = ss.getSheetByName(SHEETS.ROSTER);
  if (sh && sh.getLastRow() > 1) return sh;   // 이미 있으면 유지 (수동 수정 보호)
  if (!sh) sh = ss.insertSheet(SHEETS.ROSTER);
  sh.clear();
  sh.getRange('A1:D1').setValues([['번호', '팀', '직급', '성명']])
    .setFontWeight('bold').setBackground('#003087').setFontColor('#FFFFFF');
  sh.getRange(2, 1, ROSTER.length, 4).setValues(ROSTER);
  sh.setFrozenRows(1);
  sh.setColumnWidths(1, 4, 110);
  return sh;
}

/* 방문건수 시트 초기화 (관리자가 월별 총 방문 건수를 직접 입력 → 응답률 자동 계산) */
function buildVisitsSheet_(ss) {
  let sh = ss.getSheetByName(SHEETS.VISITS);
  if (sh) return sh;
  sh = ss.insertSheet(SHEETS.VISITS);
  sh.getRange('A1:C1').setValues([['월 (YYYY-MM)', '총 방문 건수', '비고']])
    .setFontWeight('bold').setBackground('#003087').setFontColor('#FFFFFF');
  sh.getRange('A2:C2').setValues([
    ['예: 2026-08', '예: 150', 'FSR 방문 완료 건수 합계 (사내 배차·티켓 시스템 기준) — 매월 직접 입력'],
  ]);
  sh.getRange('A2').setNumberFormat('@'); // 텍스트 고정 (날짜 자동변환 방지)
  sh.setColumnWidth(1, 140); sh.setColumnWidth(2, 110); sh.setColumnWidth(3, 420);
  sh.setFrozenRows(1);
  return sh;
}

/* 방문건수 시트 로드 → { 'YYYY-MM': 총방문건수 } */
function loadVisits_(ss) {
  const sh = buildVisitsSheet_(ss);
  const map = {};
  sh.getDataRange().getValues().slice(1).forEach(r => {
    const m = String(r[0]).trim();
    const n = Number(r[1]);
    if (/^\d{4}-\d{2}$/.test(m) && n > 0) map[m] = n;
  });
  return map;
}

/* FSR별 월간 방문 건수 로드 (방문건수 시트 I~K열, importCrmVisits가 기록).
 * 반환: { 'FSR명': 총 방문건수 } — 특정 월만 필요하면 monthFilter 지정.
 * 개인별순위 시트에서 "응답수 ÷ 방문수 = 개인 응답률"을 계산하는 데 쓴다.
 * 이 값이 없으면(CRM 미가져오기) 응답률 칸은 '-'로 표시되고 집계는 정상 동작한다. */
/* 셀 값을 'YYYY-MM' 문자열로 정규화한다.
 * 구글 시트는 "2026-08"을 입력하면 날짜(Date)로 자동 변환하는 경우가 있어,
 * 머리글을 그대로 문자열 비교하면 매칭에 실패한다(실제로 방문수가 전부 '-'로
 * 나오는 원인이었다). Date면 연-월로 되돌리고, 그 외에는 앞뒤 공백만 정리한다. */
function monthKey_(v) {
  if (v instanceof Date) return Utilities.formatDate(v, 'Asia/Seoul', 'yyyy-MM');
  return String(v).trim();
}

function loadFsrVisits_(ss, monthFilter) {
  const sh = ss.getSheetByName(SHEETS.VISITS);
  const map = {};
  if (!sh || sh.getLastRow() < 3) return map;

  // 가로형 표(FSR | 팀 | 2026-08 | 2026-09 | ... | 합계)를 읽는다.
  // 시작 열이 월 개수에 따라 달라지므로, 2행에서 'FSR' 머리글을 찾아 위치를 잡는다.
  const head = sh.getRange(2, 1, 1, sh.getLastColumn()).getValues()[0].map(monthKey_);
  const startCol = head.indexOf('FSR') + 1;      // 1-based
  if (startCol < 1) return map;                  // 아직 CRM을 가져오지 않은 상태

  // 머리글에서 'YYYY-MM' 형태인 열만 골라낸다('합계' 열은 중복 합산되므로 제외).
  const monthCols = [];
  for (let cIdx = startCol; cIdx <= head.length; cIdx++) {
    const h = head[cIdx - 1];
    if (/^\d{4}-\d{2}$/.test(h)) monthCols.push({ col: cIdx, month: h });
  }
  if (!monthCols.length) return map;

  const width = monthCols[monthCols.length - 1].col - startCol + 1;
  const vals = sh.getRange(3, startCol, sh.getLastRow() - 2, width).getValues();
  vals.forEach(r => {
    const fsr = String(r[0]).trim();
    if (!fsr) return;
    let sum = 0;
    monthCols.forEach(mc => {
      if (monthFilter && mc.month !== monthFilter) return;
      const n = Number(r[mc.col - startCol]);
      if (n > 0) sum += n;
    });
    if (sum > 0) map[norm_(fsr)] = (map[norm_(fsr)] || 0) + sum;
  });
  return map;
}

/* ====== CRM(Dynamics 365) 방문건수 자동 가져오기 ======
 * 사용법: CRM에서 "모든 약속/활동" 내보내기(xlsx) → 구글 시트로 가져와서
 *         시트 이름을 "CRM원본"으로 지정(또는 데이터를 그 시트에 붙여넣기) → 이 함수 실행
 * 상태=완료됨, 양식 타입=서비스 요청, 약속/활동 목적이 현장 방문성 항목인 건만 집계하여
 * "방문건수" 시트의 월별 총 방문 건수를 자동으로 채운다(기존 수기 입력값을 덮어씀). */
function importCrmVisits() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  // 2026-10-25: 허브 시트(원본_활동) 또는 이 시트의 CRM원본 탭에서 필요한 열만 읽는다
  const data = loadCrmTable_(['상태', '양식 타입', '시작 시간', '담당자', '약속/활동 목적', '거래처']);
  if (!data) return;
  const head = data[0].map(String);
  const idx = (name) => head.indexOf(name);
  const col = {
    status: idx('상태'), formType: idx('양식 타입'), start: idx('시작 시간'),
    assignee: idx('담당자'), purpose: idx('약속/활동 목적'),
  };
  // 거래처 열은 "같은 날 같은 기관 방문"을 1건으로 묶는 데 쓴다(필수는 아님).
  const colAccount = idx('거래처');
  const missing = Object.keys(col).filter(k => col[k] === -1);
  if (missing.length) {
    alert_(
      '⚠️ CRM 원본(' + crmSourceLabel_() + ')에서 아래 열을 찾지 못했습니다: ' + missing.join(', ') +
      '\n\nCRM 내보내기 원본 헤더가 그대로 있는지 확인해 주세요 (열 이름을 임의로 바꾸지 마세요).' +
      '\n월간보고 시트의 원본_활동이라면 CRM에서 "전체 열" 보기로 내보냈는지 확인합니다(양식 타입·약속/활동 목적 열 필요).');
    return;
  }

  const purposeSet = {};
  CONFIG.CRM_ONSITE_PURPOSES.forEach(p => purposeSet[p] = true);
  const restrictPurpose = CONFIG.CRM_ONSITE_PURPOSES.length > 0;
  const roster = loadRoster_(ss);

  const byMonth = {};     // { 'YYYY-MM': 건수 }
  const byTeamMonth = {}; // { 'YYYY-MM|팀': 건수 }
  const byFsrMonth = {};  // { 'YYYY-MM|FSR': 건수 } — 개인별 응답률 분모
  const seenVisit = {};   // '날짜|담당자|거래처' — 같은 방문의 중복 장비 행 제거용
  // 진행 중인 달(= 오늘이 속한 달)은 건너뛴다. 월중에 돌리면 분모가 덜 찬 상태로 들어가
  // 응답률이 실제보다 높게 보이고, 달이 끝난 뒤 값이 또 바뀐다.
  const skipMonth = CONFIG.VISITS_SKIP_CURRENT_MONTH
    ? Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM') : '';
  let matched = 0;

  for (let i = 1; i < data.length; i++) {
    const r = data[i];
    if (String(r[col.status]).trim() !== CONFIG.CRM_STATUS_DONE) continue;
    if (String(r[col.formType]).trim() !== CONFIG.CRM_FORM_TYPE) continue;
    if (restrictPurpose && !purposeSet[String(r[col.purpose]).trim()]) continue;
    const d = r[col.start];
    if (!(d instanceof Date)) continue;

    const m = Utilities.formatDate(d, 'Asia/Seoul', 'yyyy-MM');
    if (CONFIG.VISITS_START_MONTH && m < CONFIG.VISITS_START_MONTH) continue;  // 집계 시작 월 이전 제외
    if (skipMonth && m >= skipMonth) continue;   // 진행 중인 달은 넣지 않는다 (분모가 덜 찬 값이 들어가지 않게)

    const dayKeyPre = Utilities.formatDate(d, 'Asia/Seoul', 'yyyy-MM-dd');
    if (CONFIG.VISITS_START_DATE && dayKeyPre < CONFIG.VISITS_START_DATE) continue;  // 조사 개시일 이전 제외

    // ── 방문 1회 = 1건으로 집계 ──
    // CRM은 장비(Serial No)별로 활동 행이 따로 생기므로, 한 번 방문해 장비 3대를
    // 점검하면 3행이 된다. 그대로 세면 방문건수(=응답률 분모)가 부풀려진다.
    // 실측: 활동 79행 → 실제 방문 53건으로 33%가 중복이었다(PM에서 특히 많음).
    // 같은 날짜 + 같은 담당자 + 같은 거래처는 한 번의 방문으로 본다.
    const acct = colAccount >= 0 ? norm_(String(r[colAccount]).trim()) : '';
    const visitKey = dayKeyPre + '|' + norm_(String(r[col.assignee]).trim()) + '|' + acct;
    if (seenVisit[visitKey]) continue;      // 같은 방문의 추가 장비 행은 건너뜀
    seenVisit[visitKey] = true;

    byMonth[m] = (byMonth[m] || 0) + 1;

    const assignee = String(r[col.assignee]).trim();
    const info = roster[norm_(assignee)];
    if (info) {
      byTeamMonth[m + '|' + info.team] = (byTeamMonth[m + '|' + info.team] || 0) + 1;
      // 개인별 방문 건수 — 개인별순위 시트의 응답률 분모로 쓰인다.
      // 명단(FSR명단)에 있는 사람만 집계해 오타·퇴사자 표기를 걸러낸다.
      byFsrMonth[m + '|' + info.name] = (byFsrMonth[m + '|' + info.name] || 0) + 1;
    }
    matched++;
  }

  if (!matched) {
    alert_('⚠️ 조건에 맞는 방문 건이 없습니다. CONFIG.CRM_ONSITE_PURPOSES 및 상태/양식타입 값을 확인해 주세요.');
    return;
  }

  // ---- 방문건수 시트 갱신 (월별 총계, 기존 수기 입력값 덮어씀) ----
  const visitsSh = buildVisitsSheet_(ss);
  const stamp = 'CRM 자동 집계 (' + Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd') + ')';

  // 기존에 수기로 입력해 둔 월(=CRM 집계에 없는 월)은 살리고, CRM 집계분은 최신값으로
  // 덮어쓴 뒤 월 오름차순으로 통째로 다시 쓴다.
  // (예전에는 없는 월을 맨 아래에 덧붙이기만 해서, CRM을 다시 가져오면 2026-09가
  //  2026-06~08 밑이 아니라 목록 맨 끝에 붙어 월 순서가 뒤섞이는 문제가 있었다.)
  // 2행은 "예: 2026-08" 안내 행이므로 건드리지 않고 3행부터 데이터로 쓴다.
  const START = 3;
  const merged = {};
  visitsSh.getDataRange().getValues().slice(2).forEach(r => {
    const m = String(r[0]).trim();
    if (!/^\d{4}-\d{2}$/.test(m) || !(Number(r[1]) > 0)) return;
    if (CONFIG.VISITS_START_MONTH && m < CONFIG.VISITS_START_MONTH) return;  // 과거분은 버림
    merged[m] = [Number(r[1]), String(r[2] || '')];
  });
  Object.keys(byMonth).forEach(m => { merged[m] = [byMonth[m], stamp]; });

  const monthRows = Object.keys(merged).sort().map(m => [m, merged[m][0], merged[m][1]]);
  const clearRows = Math.max(visitsSh.getLastRow() - START + 1, monthRows.length, 1);
  visitsSh.getRange(START, 1, clearRows, 3).clearContent();
  if (monthRows.length) {
    visitsSh.getRange(START, 1, monthRows.length, 1).setNumberFormat('@');
    visitsSh.getRange(START, 1, monthRows.length, 3).setValues(monthRows);
  }

  // ---- 팀별·FSR별 방문건수 (월을 '열'로 펼친 가로형) ----
  // 세로형(월|이름|건수)은 월이 늘 때마다 44명 × N개월로 행이 불어나 보기 어렵다.
  // 사람(또는 팀)을 행에, 월을 열에 두면 인원수만큼만 행이 유지되고 월별 추이도 한눈에 보인다.
  const monthCols = Object.keys(byMonth).sort();   // 집계된 월 목록 (열 순서)

  // 팀별: 팀 | 2026-08 | 2026-09 | ... | 합계
  visitsSh.getRange(1, 5, Math.max(visitsSh.getLastRow(), 1000), 3 + monthCols.length + 2).clearContent();
  visitsSh.getRange(1, 5).setValue('참고: 팀별 월간 방문 건수 (CRM 자동 집계)')
    .setFontWeight('bold').setFontColor('#003087');
  const teamNames = [];
  Object.keys(byTeamMonth).forEach(k => {
    const t = k.split('|')[1];
    if (teamNames.indexOf(t) === -1) teamNames.push(t);
  });
  teamNames.sort();
  // 월 머리글은 텍스트 서식(@)으로 고정한다. 그렇지 않으면 구글 시트가 "2026-08"을
  // 날짜로 자동 변환해 버려, 나중에 YYYY-MM 형식으로 다시 읽지 못한다(실제 발생 사례).
  visitsSh.getRange(2, 6, 1, monthCols.length).setNumberFormat('@');
  visitsSh.getRange(2, 5, 1, monthCols.length + 2)
    .setValues([['팀'].concat(monthCols).concat(['합계'])])
    .setFontWeight('bold').setBackground('#E8F0FE');
  if (teamNames.length) {
    const tRowsOut = teamNames.map(t => {
      const cells = monthCols.map(m => byTeamMonth[m + '|' + t] || 0);
      return [t].concat(cells).concat([cells.reduce((a, b) => a + b, 0)]);
    });
    // 숫자 칸은 서식을 명시적으로 숫자로 돌린다. 월이 늘어 열 위치가 밀리면
    // 이전에 그 자리에 있던 날짜 서식을 물려받아 합계가 "1900-08"처럼 보이는 일이
    // 실제로 발생했다(224건 → 날짜 일련번호 224로 해석).
    visitsSh.getRange(3, 6, tRowsOut.length, monthCols.length + 1).setNumberFormat('0');
    visitsSh.getRange(3, 5, tRowsOut.length, monthCols.length + 2).setValues(tRowsOut);
  }
  visitsSh.setColumnWidth(5, 110);

  // FSR별: FSR | 팀 | 2026-08 | ... | 합계
  // (팀별 표가 차지하는 열 수가 월에 따라 달라지므로 시작 열을 계산해서 띄운다)
  const fsrStartCol = 5 + monthCols.length + 2 + 1;   // 팀별 표 + 여백 1열
  visitsSh.getRange(1, fsrStartCol, Math.max(visitsSh.getLastRow(), 1000), monthCols.length + 4).clearContent();
  visitsSh.getRange(1, fsrStartCol)
    .setValue('참고: FSR별 월간 방문 건수 (CRM 자동 집계 — 개인별 응답률 분모)')
    .setFontWeight('bold').setFontColor('#003087');
  visitsSh.getRange(2, fsrStartCol + 2, 1, monthCols.length).setNumberFormat('@');  // 월 머리글 텍스트 고정
  visitsSh.getRange(2, fsrStartCol, 1, monthCols.length + 3)
    .setValues([['FSR', '팀'].concat(monthCols).concat(['합계'])])
    .setFontWeight('bold').setBackground('#E8F0FE');

  // 명단 순서(팀 → 이름)로 정렬해 팀별로 묶여 보이게 한다.
  const fsrTeam = {};
  Object.keys(byFsrMonth).forEach(k => {
    const nm = k.split('|')[1];
    if (!fsrTeam[nm]) {
      const info = roster[norm_(nm)];
      fsrTeam[nm] = info ? info.team : '(명단외)';
    }
  });
  const fsrNames = Object.keys(fsrTeam).sort((a, b) =>
    fsrTeam[a] === fsrTeam[b] ? a.localeCompare(b) : fsrTeam[a].localeCompare(fsrTeam[b]));

  if (fsrNames.length) {
    const fRowsOut = fsrNames.map(nm => {
      const cells = monthCols.map(m => byFsrMonth[m + '|' + nm] || 0);
      return [nm, fsrTeam[nm]].concat(cells).concat([cells.reduce((a, b) => a + b, 0)]);
    });
    visitsSh.getRange(3, fsrStartCol + 2, fRowsOut.length, monthCols.length + 1).setNumberFormat('0');
    visitsSh.getRange(3, fsrStartCol, fRowsOut.length, monthCols.length + 3).setValues(fRowsOut);
  }
  visitsSh.setColumnWidth(fsrStartCol, 100); visitsSh.setColumnWidth(fsrStartCol + 1, 110);

  // ---- 남는 빈 행 정리 ----
  // clearContent()는 내용만 비우고 행은 남기므로, 집계 시작 월을 앞당겼다가 되돌리면
  // 수백~수천 개의 빈 행이 남아 시트를 알아보기 어려워진다. 실제로 쓰는 만큼만 남긴다.
  const usedRows = Math.max(monthRows.length, teamNames.length, fsrNames.length) + 2; // 헤더 2행
  const maxRows = visitsSh.getMaxRows();
  if (maxRows > usedRows + 10) {
    visitsSh.deleteRows(usedRows + 10, maxRows - (usedRows + 10));
  }

  if (!UI_SILENT) refreshDashboard();   // 전체 갱신 중이면 마지막에 한 번만 실행

  alert_(
    '✅ CRM 방문건수 가져오기 완료!\n\n' +
    '· 원본: ' + crmSourceLabel_() + '\n' +
    '· 집계 대상: ' + matched + '건 (상태=완료됨, 양식 타입=서비스 요청, 목적=수리·점검)\n' +
    (skipMonth ? '· ' + skipMonth + '(진행 중인 달)은 넣지 않았습니다 — 달이 끝난 뒤 들어갑니다.\n' : '') +
    '· ' + Object.keys(byMonth).length + '개월 분량이 "방문건수" 시트에 반영되었습니다.\n' +
    '· 팀별 월간 건수는 "방문건수" 시트 우측(E열~)에서 확인할 수 있습니다.\n\n' +
    '※ 집계 대상 목적은 CONFIG.CRM_ONSITE_PURPOSES에서 조정할 수 있습니다 (예: Calibration 포함).');
}

/* ====== 기관명DB를 CRM 거래처 목록으로 미리 채우기 (선택 기능) ======
 * 문제: 고객이 기관명을 완벽하게 정확히 입력해도, 기관명DB에 등록된 적 없는
 *       이름이면 무조건 "DB미등록"으로 표시되어 매주 검토해야 할 목록이
 *       실제 오탈자가 아니라 처음 나온 정상 기관명으로 도배되기 쉽다.
 * 해결: CRM원본의 "거래처" 열(FSR 44명이 담당하는 기관의 공식 명칭)을
 *       기관명DB에 자기 자신으로 매핑(표준화 완료 상태)해 미리 등록해 둔다.
 *       이후에는 진짜 오탈자·약칭만 DB미등록으로 남아 검토 대상이 줄어든다. */
function seedOrgDbFromCrm() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const data = loadCrmTable_(['거래처', '담당자']);   // 2026-10-25: 허브 시트 또는 CRM원본 탭
  if (!data) return;
  const head = data[0].map(String);
  const idx = (name) => head.indexOf(name);
  const col = { account: idx('거래처'), assignee: idx('담당자') };
  if (col.account === -1) {
    alert_('⚠️ CRM 원본(' + crmSourceLabel_() + ')에서 "거래처" 열을 찾지 못했습니다.');
    return;
  }

  const roster = loadRoster_(ss);
  const accounts = {}; // 정규화된 이름 → 원본 표기 (첫 등장 값 사용)
  for (let i = 1; i < data.length; i++) {
    const r = data[i];
    const assignee = col.assignee !== -1 ? String(r[col.assignee]).trim() : '';
    // FSR 44명 담당 건만 포함 — 학술/영업 등 타 부서 거래처는 이 조사와 무관하므로 제외
    if (col.assignee !== -1 && !roster[norm_(assignee)]) continue;
    const account = String(r[col.account]).trim();
    if (!account) continue;
    const key = norm_(account);
    if (!accounts[key]) accounts[key] = account;
  }

  const dbSh = buildDbSheet_(ss);
  const existing = {};
  dbSh.getDataRange().getValues().slice(1).forEach(r => {
    if (r[0]) existing[norm_(r[0])] = true;
  });

  const newRows = Object.keys(accounts)
    .filter(key => !existing[key])
    .map(key => [accounts[key], accounts[key]]);

  if (!newRows.length) {
    alert_('CRM 거래처 목록이 이미 모두 기관명DB에 등록되어 있습니다. 추가된 항목이 없습니다.');
    return;
  }

  dbSh.getRange(dbSh.getLastRow() + 1, 1, newRows.length, 2).setValues(newRows);
  if (!UI_SILENT) refreshDashboard();   // 전체 갱신 중이면 마지막에 한 번만 실행

  alert_(
    '✅ 기관명DB 시딩 완료!\n\n' +
    '· CRM 거래처 기준으로 ' + newRows.length + '개 기관을 표준 기관명으로 새로 등록했습니다.\n' +
    '· FSR 44명이 담당하는 거래처만 포함했습니다(타 부서 거래처 제외).\n\n' +
    '※ CRM에 새로운 기관이 추가될 때마다(신규 거래처 등록 시) 이 메뉴를 다시 실행하면 됩니다.');
}

/* FSR명단 로드 → { 이름: {team, grade} } */
function loadRoster_(ss) {
  const sh = buildRosterSheet_(ss);
  const map = {};
  sh.getDataRange().getValues().slice(1).forEach(r => {
    if (r[3]) map[norm_(r[3])] = { name: String(r[3]).trim(), team: String(r[1]), grade: String(r[2]) };
  });
  return map;
}

/* ====== 폼 드롭다운을 44명 실명으로 자동 교체 (선택 기능) ====== */
function updateFormFsrDropdown() {
  if (!CONFIG.FORM_EDIT_URL) {
    alert_(
      '폼 편집 URL이 설정되지 않았습니다.\n\n' +
      '코드 상단 CONFIG.FORM_EDIT_URL에 폼 편집 주소를 입력 후 다시 실행하세요.\n' +
      '(폼 편집 화면의 브라우저 주소창 URL: https://docs.google.com/forms/d/.../edit)');
    return;
  }
  const form = FormApp.openByUrl(CONFIG.FORM_EDIT_URL);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const roster = buildRosterSheet_(ss).getDataRange().getValues().slice(1);
  const names = roster.filter(r => r[3]).map(r => String(r[3]));

  const item = form.getItems(FormApp.ItemType.LIST)
    .find(it => it.getTitle().indexOf('엔지니어') !== -1);
  if (!item) {
    alert_('폼에서 "엔지니어" 드롭다운 문항을 찾지 못했습니다.');
    return;
  }
  item.asListItem().setChoiceValues(names);
  alert_('✅ 폼의 엔지니어 드롭다운이 ' + names.length + '명 실명으로 교체되었습니다.');
}

/* ====== 응답 후 확인 메시지 설정 (선택 기능) ======
 * Google Forms 기본 메시지("응답이 기록되었습니다") 대신
 * 고객에게 감사 인사를 명확히 전달하기 위해 커스텀 메시지를 지정합니다. */
function setFormConfirmationMessage() {
  if (!CONFIG.FORM_EDIT_URL) {
    alert_(
      '폼 편집 URL이 설정되지 않았습니다.\n\n' +
      '코드 상단 CONFIG.FORM_EDIT_URL에 폼 편집 주소를 입력 후 다시 실행하세요.');
    return;
  }
  const form = FormApp.openByUrl(CONFIG.FORM_EDIT_URL);
  form.setConfirmationMessage(
    '소중한 의견 감사합니다.\n' +
    '고객님의 답변은 서비스 품질 개선에 소중하게 활용됩니다.\n' +
    '- Sysmex Korea FS Group -'
  );
  form.setShowLinkToRespondAgain(false);
  alert_('✅ 응답 후 확인 메시지가 설정되었습니다. 폼 미리보기에서 직접 확인해 보세요.');
}

/* ====================== 2. 제출 시 자동 처리 ====================== */
function onFormSubmitHandler(e) {
  // 저점수 알림은 시트를 쓰지 않으므로 잠금 밖에서 먼저 처리 — 대시보드 갱신이 밀려도
  // 알림만큼은 지연 없이 나가게 한다(골든타임 대응이 목적).
  try { lowScoreAlert_(e); } catch (err) { Logger.log('알림 오류: ' + err); }

  // 동시 제출 방어: 두 응답이 거의 같은 시각에 들어오면 refreshDashboard가 겹쳐 실행되어
  // 같은 시트를 동시에 clear/write 하다가 데이터가 깨질 수 있다. 실제로 오후 시간대에
  // 여러 FSR의 방문이 동시에 끝나면 충분히 발생 가능한 상황이라 명시적으로 잠근다.
  const lock = LockService.getScriptLock();
  try {
    // 최대 5분 대기 — 앞선 갱신이 끝나면 이어서 실행된다.
    lock.waitLock(5 * 60 * 1000);
    refreshDashboard();
  } catch (err) {
    // 대기 시간을 넘겨 잠금을 못 얻은 경우: 이 응답은 시트에 이미 저장되어 있고,
    // 다음 응답 제출이나 수동 새로고침 때 함께 반영되므로 데이터 유실은 없다.
    Logger.log('대시보드 갱신 건너뜀(다른 실행이 진행 중): ' + err);
  } finally {
    try { lock.releaseLock(); } catch (e2) {}
  }
}

/* 저점수 즉시 알림
 * isTest=true면 제목에 [시험]을 붙이고 본문 맨 위에 시험 발송임을 밝힌다.
 * 판정·수신자 구성·발송은 실제와 완전히 같은 경로를 쓴다 — 시험용 우회로를 따로
 * 만들면 그 우회로만 검증되고 정작 실제 경로는 확인되지 않기 때문이다.
 * 발송한 수신자 배열을 돌려준다(발송하지 않았으면 null). */
function lowScoreAlert_(e, isTest) {
  if (!CONFIG.ALERT_EMAILS.length || !e || !e.namedValues) return null;
  const nv = e.namedValues;
  const get = (kw) => {
    const k = Object.keys(nv).find(x => x.indexOf(kw) !== -1);
    return k ? String(nv[k][0]) : '';
  };
  const K = COLUMN_KEYWORDS;
  const scores = [
    { t: '신속성·일정', v: Number(get(K.q1)) },
    { t: '전문성·해결', v: Number(get(K.q2)) },
    { t: '응대·마무리', v: Number(get(K.q3)) },
  ];
  const lowMax = lowMaxAt_(new Date());
  const low = scores.filter(s => s.v > 0 && s.v <= lowMax);
  if (!low.length) return null;

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const roster = loadRoster_(ss);
  const fsrName = get(K.fsr);
  const info = roster[norm_(fsrName)] || { team: '-', grade: '-' };
  const opinion = get(K.txt);
  const region = get(K.region) || deriveRegion_(get(K.org), fsrName, info.team, loadAccountRegion_(ss), loadAccountRegionAll_(ss));

  // 긴급도 판정: 개별 문항 최저점 + 서술형 키워드 (심각 키워드 또는 1점 존재 시 즉시조치)
  const minScore = Math.min.apply(null, scores.map(s => s.v).filter(v => v > 0));
  const tier = alertTier_(opinion, minScore);

  // 수신자 구성: 관리자(전 팀 공통) + 해당 응답의 담당 FSR이 속한 팀의 팀장
  // 팀을 못 찾는 경우(명단외 FSR 등)에는 관리자에게만 발송된다.
  const teamLead = CONFIG.TEAM_LEAD_EMAILS[String(info.team).toUpperCase()] || '';
  const recipients = [];
  const seenTo = {};
  CONFIG.ALERT_EMAILS.concat(teamLead ? [teamLead] : []).forEach(addr => {
    const k = String(addr).trim().toLowerCase();
    if (k && !seenTo[k]) { seenTo[k] = true; recipients.push(addr); }
  });
  if (!recipients.length) return null;

  const testNote = isTest
    ? '────────────────────────────────────\n' +
      '※ 시험 발송입니다. 실제 고객 응답이 아닙니다.\n' +
      '   저점수 알림이 담당 팀장에게 제대로 도착하는지\n' +
      '   확인하기 위한 것이므로 조치하지 않아도 됩니다.\n' +
      '────────────────────────────────────\n\n'
    : '';

  const body = testNote +
    tier.label + ' — 만족도 저점수 응답이 접수되었습니다.\n\n' +
    '· 기관: ' + get(K.org) + (region ? ' (' + region + ')' : '') + '\n' +
    '· 담당 FSR: ' + fsrName + ' (' + info.team + ' / ' + info.grade + ')\n' +
    '· 장비: ' + get(K.model) + ' / ' + get(K.type) + '\n\n' +
    scores.map(s => '· ' + s.t + ': ' + s.v + '점').join('\n') + '\n\n' +
    '· 고객 의견: ' + (opinion || '(없음)') + '\n\n' +
    (tier.label.indexOf('즉시') !== -1
      ? '골든타임 내 즉시 연락·조치가 필요합니다.'
      : '빠른 시일 내 확인 및 조치를 권장합니다.') + '\n\n' +
    '[조치 후 기록 요청]\n' +
    'FS 포털 → 고객 만족도 → 「확인·조치」에서 사유와 조치 내용을 남겨 주세요.\n' +
    'https://balhm12.github.io/fs-talk/\n' +
    '남긴 내용은 만족도 시트 「저점수조치」로 자동으로 옮겨집니다.\n\n' +
    '(수신: ' + recipients.join(', ') + ')';

  // 모든 수신자를 to에 함께 넣어 1통으로 발송 — 팀장과 관리자가 서로 수신 사실을 알 수 있고,
  // 회신 시 대화가 갈라지지 않는다.
  MailApp.sendEmail(recipients.join(','),
    (isTest ? '[시험] ' : '') + tier.subjectTag + ' ' + get(K.org) + ' — ' + fsrName, body);
  return recipients;
}

/* ────────── 저점수 알림 경로 시험 발송 (메뉴) ──────────
 * 왜 필요한가: 실제 저점수 응답이 매우 드물다. 9·10월 두 달을 합쳐 문항 최저 3점이
 * 1건, 2점 이하는 0건이었다. 그래서 알림 경로 전체 — 그 시점의 기준값 판정,
 * FSR명단 조회, 팀별 팀장 매핑, 긴급도 판정, MailApp 발송 — 가 한 번도 끝까지
 * 돌아본 적이 없다. 첫 저점수 응답이 들어오는 날 경로가 막혀 있는 것을 알게 되면
 * 골든타임을 그대로 놓친다.
 *
 * 이 함수는 가짜 응답 한 건을 만들어 lowScoreAlert_()에 그대로 통과시킨다.
 * 시트에는 아무것도 쓰지 않는다 — lowScoreAlert_()는 FSR명단과 거래처지역만 읽는다.
 * 점수는 lowMaxAt_(오늘)로 정하므로 11/1 전환 전후 어느 쪽에서 실행해도 그 시점
 * 기준에 걸린다. 11/1 이후에 실행하면 ≤3 기준이 실제로 발동하는지까지 확인된다. */
function testLowScoreAlert() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const teams = Object.keys(CONFIG.TEAM_LEAD_EMAILS);

  const ans = ui.prompt('저점수 알림 시험 발송',
    '어느 팀으로 시험할까요? 번호를 입력하세요.\n\n' +
    teams.map((t, i) => (i + 1) + '. ' + t + '  →  ' + CONFIG.TEAM_LEAD_EMAILS[t]).join('\n') +
    '\n\n입력한 팀의 팀장과 관리자(' + CONFIG.ALERT_EMAILS.join(', ') + ')에게' +
    '\n제목 앞에 [시험]이 붙은 메일 1통이 갑니다.' +
    '\n취소하면 아무것도 보내지 않습니다.',
    ui.ButtonSet.OK_CANCEL);
  if (ans.getSelectedButton() !== ui.Button.OK) return;

  const team = teams[Number(String(ans.getResponseText()).trim()) - 1];
  if (!team) { ui.alert('번호를 잘못 입력했습니다. 발송하지 않았습니다.'); return; }

  // 담당 FSR은 FSR명단에 실제로 있는 그 팀 사람을 쓴다. 가상의 이름을 넣으면
  // 명단 조회가 실패해 팀을 못 찾고, 팀장 매핑이 건너뛰어진 채 관리자에게만
  // 발송된다 — 정작 확인하려던 경로가 빠진 시험이 된다.
  const roster = loadRoster_(ss);
  const member = Object.keys(roster).map(k => roster[k])
    .filter(p => String(p.team).toUpperCase() === String(team).toUpperCase())[0];
  if (!member) {
    ui.alert('FSR명단에서 ' + team + ' 소속 인원을 찾지 못했습니다.\n' +
             '메뉴 "FSR명단 시트 갱신"을 먼저 실행해 보세요.');
    return;
  }

  // 응답 시트 머리글에 들어 있는 키워드로 가짜 namedValues를 만든다.
  // lowScoreAlert_()가 머리글 키워드로 열을 찾으므로 실제와 같은 키를 써야 한다.
  const lowScore = lowMaxAt_(new Date());
  const K = COLUMN_KEYWORDS;
  const vals = {};
  vals[K.region] = '(시험)';
  vals[K.org]    = '[시험] 알림 경로 확인';
  vals[K.fsr]    = member.name;
  vals[K.model]  = '(시험)';
  vals[K.type]   = '(시험)';
  vals[K.q1]     = String(lowScore);   // 이 점수가 그 시점 기준에 걸린다
  vals[K.q2]     = '5';
  vals[K.q3]     = '5';
  vals[K.txt]    = '저점수 알림 발송 경로를 확인하기 위한 시험 응답입니다. 실제 고객 의견이 아닙니다.';
  const nv = {};
  Object.keys(vals).forEach(k => { nv[k] = [vals[k]]; });

  let sent = null, err = '';
  try {
    sent = lowScoreAlert_({ namedValues: nv }, true);
  } catch (e2) {
    err = String(e2);
  }

  if (err) {
    ui.alert('발송에 실패했습니다.\n\n' + err +
             '\n\n이 오류가 실제 저점수 응답에서도 그대로 발생합니다. 수정이 필요합니다.');
  } else if (!sent || !sent.length) {
    ui.alert('알림이 발송되지 않았습니다.\n\n' +
             '오늘 적용 기준은 문항 최저 ' + lowScore + '점 이하이고 시험 응답도 ' +
             lowScore + '점으로 넣었으므로, 판정이 아니라 수신자 구성이나 열 머리글 ' +
             '인식에서 막힌 것입니다. CONFIG와 응답 시트 머리글을 확인하세요.');
  } else {
    ui.alert('시험 발송 완료\n\n' +
             '· 적용 기준: 문항 최저 ' + lowScore + '점 이하\n' +
             '· 대상 팀: ' + team + '\n' +
             '· 수신자: ' + sent.join(', ') + '\n\n' +
             '받은 편지함에서 제목이 "[시험]"으로 시작하는 메일을 확인하세요.\n' +
             '몇 분 내에 오지 않으면 스팸함도 확인해 보세요.');
  }
}

/* ====================== 3. 대시보드 자동 분석 ====================== */
function refreshDashboard() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const raw = findResponseSheet_(ss);
  if (!raw || raw.getLastRow() < 1) return;

  const data = raw.getDataRange().getValues();
  const head = data[0].map(String);
  const idx = (kw) => head.findIndex(h => h.indexOf(kw) !== -1);
  const K = COLUMN_KEYWORDS;

  const col = {
    ts: 0,
    region: idx(K.region), org: idx(K.org), fsr: idx(K.fsr),
    model: idx(K.model), type: idx(K.type),
    q1: idx(K.q1), q2: idx(K.q2), q3: idx(K.q3),
    txt: idx(K.txt),
  };

  const dbSh = buildDbSheet_(ss);
  const map = {};
  dbSh.getDataRange().getValues().slice(1).forEach(r => {
    if (r[0] && r[1]) map[norm_(r[0])] = String(r[1]);
  });
  const roster = loadRoster_(ss);
  const visits = loadVisits_(ss);
  const accountRegion = loadAccountRegion_(ss);
  const accountRegionAll = loadAccountRegionAll_(ss);
  const rejectedFuzzy = loadRejectedFuzzyInputs_(ss);
  const fuzzyCache = {}; // (입력값+FSR) → fuzzyMatchOrg_ 결과 캐시, 이번 실행 동안만 유효

  // ---- 정제데이터 생성 ----
  const rows = [];
  const newFuzzyMappings = []; // 유사도 매칭 제안 [입력값, 표준명, 유사도] — 루프 후 검토대기 시트에 기록(기관명DB엔 미반영)
  for (let i = 1; i < data.length; i++) {
    const r = data[i];
    if (!r[col.ts]) continue;
    const d = new Date(r[col.ts]);
    const orgRaw = String(safe_(r, col.org)).trim();
    const fsrName = String(safe_(r, col.fsr)).trim();
    const info = roster[norm_(fsrName)] || { team: '(명단외)', grade: '(명단외)' };

    let orgStd, orgStatus;
    if (map[norm_(orgRaw)]) {
      orgStd = map[norm_(orgRaw)];
      orgStatus = '표준화';
    } else if (rejectedFuzzy[norm_(orgRaw)]) {
      // 관리자가 "유사매칭_검토대기"에서 이미 "거부"로 확정한 입력값 — 같은 오매칭을
      // 매번 다시 계산해서 보여주지 않고 DB미등록으로 고정한다.
      orgStd = orgRaw;
      orgStatus = orgRaw ? 'DB미등록' : '';
    } else {
      // 같은 (기관명 입력값+FSR) 조합이 여러 응답에 반복될 수 있어(같은 병원에 여러
      // 고객이 응답) 매번 다시 계산하지 않도록 이번 새로고침 실행 안에서만 캐싱한다.
      // 응답이 수백~수천 건으로 쌓일수록 이 캐싱의 효과가 커진다.
      const fuzzyKey = norm_(orgRaw) + '|' + norm_(fsrName);
      let fuzzy;
      if (Object.prototype.hasOwnProperty.call(fuzzyCache, fuzzyKey)) {
        fuzzy = fuzzyCache[fuzzyKey];
      } else {
        fuzzy = orgRaw ? fuzzyMatchOrg_(orgRaw, fsrName, accountRegion, accountRegionAll) : null;
        fuzzyCache[fuzzyKey] = fuzzy;
      }
      if (fuzzy) {
        orgStd = fuzzy.name;
        orgStatus = '자동매칭(유사도 ' + Math.round(fuzzy.score * 100) + '%)';
        newFuzzyMappings.push([orgRaw, fuzzy.name, fuzzy.score]);
      } else {
        orgStd = orgRaw;
        orgStatus = orgRaw ? 'DB미등록' : '';
      }
    }

    const q1 = Number(safe_(r, col.q1)), q2 = Number(safe_(r, col.q2)), q3 = Number(safe_(r, col.q3));
    if (!(q1 || q2 || q3)) continue;
    const rawRegion = String(safe_(r, col.region)).trim();
    rows.push([
      d, Utilities.formatDate(d, 'Asia/Seoul', 'yyyy-MM'),
      rawRegion || deriveRegion_(orgStd, fsrName, info.team, accountRegion, accountRegionAll), orgStd,
      fsrName, info.team, info.grade,
      String(safe_(r, col.model)).trim(), String(safe_(r, col.type)),
      q1, q2, q3, round2_((q1 + q2 + q3) / 3),
      String(safe_(r, col.txt)).trim(),
      orgStatus,
    ]);
  }
  // 유사도 매칭으로 새로 밝혀진 후보를 기관명DB에 바로 쓰지 않고 "유사매칭_검토대기"에
  // 제안만 남긴다 — 사람이 검토상태를 "승인"으로 바꾼 뒤 메뉴에서 반영해야 확정된다.
  if (newFuzzyMappings.length) {
    const reviewSh = buildFuzzyReviewSheet_(ss);
    const existing = {};
    if (reviewSh.getLastRow() > 1) {
      reviewSh.getRange(2, 1, reviewSh.getLastRow() - 1, 1).getValues()
        .forEach(r => { if (r[0]) existing[norm_(r[0])] = true; });
    }
    const now = Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm');
    const toLog = [];
    const seenThisRun = {};
    newFuzzyMappings.forEach(([raw, std, score]) => {
      const key = norm_(raw);
      if (existing[key] || seenThisRun[key]) return; // 이미 검토 대기 중이거나 이번 실행에서 중복이면 건너뜀(기존 검토상태 보존)
      seenThisRun[key] = true;
      toLog.push([raw, std, Math.round(score * 100) + '%', '미검토', now]);
    });
    if (toLog.length) {
      const row = reviewSh.getLastRow() + 1;
      reviewSh.getRange(row, 1, toLog.length, 5).setValues(toLog);
      const rule = SpreadsheetApp.newDataValidation().requireValueInList(['미검토', '승인', '거부'], true).build();
      reviewSh.getRange(row, 4, toLog.length, 1).setDataValidation(rule);
    }
  }
  // 열 인덱스: 0응답일시 1월 2지역 3기관 4FSR 5팀 6직급 7모델 8형태 9q1 10q2 11q3 12평균 13의견 14상태

  // 이상 응답(자가 응답 의심) 탐지 후 마지막 열에 사유 기록
  const anomalies = detectAnomalies_(rows);
  const outRows = rows.map((r, i) => r.concat([anomalies[i] || '']));

  const clean = getOrCreate_(ss, SHEETS.CLEAN);
  clean.clear();
  clean.clearConditionalFormatRules();
  const cHead = ['응답일시','월','지역','기관명(표준)','담당FSR','팀','직급','장비모델','서비스형태',
                 '신속성·일정','전문성·해결','응대·마무리','평균점수','서술형의견','기관명상태','확인필요'];
  clean.getRange(1, 1, 1, cHead.length).setValues([cHead])
       .setFontWeight('bold').setBackground('#003087').setFontColor('#FFFFFF');
  if (outRows.length) {
    clean.getRange(2, 2, outRows.length, 1).setNumberFormat('@'); // 월 열 텍스트 고정 (날짜 자동변환 방지)
    clean.getRange(2, 1, outRows.length, cHead.length).setValues(outRows);
    clean.getRange(2, 1, outRows.length, 1).setNumberFormat('yyyy-mm-dd hh:mm');
    // 확인필요 열에 값이 있으면 주황색으로 강조 (판정이 아닌 확인 요청이므로 적색은 피함)
    const anomalyRange = clean.getRange(2, cHead.length, outRows.length, 1);
    const rules = clean.getConditionalFormatRules();
    rules.push(SpreadsheetApp.newConditionalFormatRule()
      .whenCellNotEmpty().setBackground('#FFF4E5').setFontColor('#B26A00').setBold(true)
      .setRanges([anomalyRange]).build());
    clean.setConditionalFormatRules(rules);
  }
  clean.setFrozenRows(1);

  // ---- 집계 ----
  const n = rows.length;
  const avg = (arr) => arr.length ? round2_(arr.reduce((a, b) => a + b, 0) / arr.length) : 0;
  const AVG_I = 12;
  const a1 = avg(rows.map(r => r[9])), a2 = avg(rows.map(r => r[10])), a3 = avg(rows.map(r => r[11]));
  const total = avg(rows.map(r => r[AVG_I]));
  const pct5 = n ? round1_(100 * rows.filter(r => r[AVG_I] === 5).length / n) : 0;
  const lowCnt = rows.filter(isLowRow_).length;

  // 응답률 KPI: 당월 응답수 / 방문건수 시트에 입력된 당월 총 방문 건수
  const curMonth = Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM');
  const curMonthResp = rows.filter(r => r[1] === curMonth).length;
  const curVisits = visits[curMonth];
  const responseRateLabel = curVisits ? round1_(100 * curMonthResp / curVisits) + '%' : '방문건수 미입력';

  const groupAvg = (keyIdx) => {
    const g = {};
    rows.forEach(r => {
      const k = r[keyIdx] || '(미입력)';
      (g[k] = g[k] || []).push(r[AVG_I]);
    });
    return Object.keys(g).map(k => [k, g[k].length, avg(g[k])])
                 .sort((x, y) => y[2] - x[2]);
  };

  // 팀별 (문항별 평균 포함)
  const gTeam = {};
  rows.forEach(r => {
    const k = r[5] || '(명단외)';
    (gTeam[k] = gTeam[k] || []).push(r);
  });
  const byTeam = Object.keys(gTeam).map(k => {
    const rs = gTeam[k];
    return [k, rs.length, avg(rs.map(r => r[9])), avg(rs.map(r => r[10])),
            avg(rs.map(r => r[11])), avg(rs.map(r => r[AVG_I]))];
  }).sort((x, y) => y[5] - x[5]);

  // 개인별 상세 (문항별 평균 포함)
  const gFsr = {};
  rows.forEach(r => {
    const k = r[4] || '(미입력)';
    (gFsr[k] = gFsr[k] || { team: r[5], grade: r[6], q1: [], q2: [], q3: [], t: [] });
    gFsr[k].q1.push(r[9]); gFsr[k].q2.push(r[10]); gFsr[k].q3.push(r[11]); gFsr[k].t.push(r[AVG_I]);
  });
  const respondents = Object.keys(gFsr).map(k => [
    k, gFsr[k].team, gFsr[k].grade, gFsr[k].t.length,
    avg(gFsr[k].q1), avg(gFsr[k].q2), avg(gFsr[k].q3), avg(gFsr[k].t),
  ]).sort((x, y) => y[7] - x[7]);
  // 대시보드용 TOP 5 요약
  const byFsrTop5 = respondents.slice(0, 5).map(r => [r[0], r[1], r[2], r[3], r[7]]);
  // 명단에 있으나 응답 0건인 인원 (커버리지 확인용)
  const rosterRows = buildRosterSheet_(ss).getDataRange().getValues().slice(1);
  const answered = {};
  Object.keys(gFsr).forEach(k => answered[norm_(k)] = true);
  const noResp = rosterRows.filter(r => r[3] && !answered[norm_(r[3])])
    .map(r => [String(r[3]), String(r[1]), String(r[2]), 0, '-', '-', '-', '-']);

  // 직급별 — T4는 팀장과 함께 '팀장·T4' 그룹으로 집계
  const gradeGroup = (g) => (g === '팀장' || g === 'T4') ? '팀장·T4' : g;
  const gG = {};
  rows.forEach(r => {
    const k = gradeGroup(r[6] || '(명단외)');
    (gG[k] = gG[k] || []).push(r[AVG_I]);
  });
  const byGrade = Object.keys(gG).map(k => [k, gG[k].length, avg(gG[k])])
                        .sort((x, y) => y[2] - x[2]);

  const byRegion = groupAvg(2), byType = groupAvg(8), byModel = groupAvg(7);

  const gm = {};
  rows.forEach(r => (gm[r[1]] = gm[r[1]] || []).push(r[AVG_I]));
  const byMonth = Object.keys(gm).sort().map(k => [k, gm[k].length, avg(gm[k])]);

  // ---- 대시보드 렌더링 ----
  const dash = getOrCreate_(ss, SHEETS.DASH);
  dash.clear();
  dash.getCharts().forEach(c => dash.removeChart(c));
  dash.clearConditionalFormatRules();

  dash.getRange('A1').setValue('📊 방문 서비스 만족도 대시보드 (자동 갱신: ' +
    Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm') + ')')
    .setFontSize(14).setFontWeight('bold').setFontColor('#003087');

  const kpi = [
    ['총 응답 수', n + '건'],
    ['종합 만족도', total + ' / 5.0'],
    ['① 신속성·일정', a1], ['② 전문성·해결', a2], ['③ 응대·마무리', a3],
    ['만점(5.0) 비율', pct5 + '%'],
    [lowKpiLabel_() + ' 건수', lowCnt + '건'],
    ['당월 응답률 (' + curMonth + ')', responseRateLabel],
    ['확인필요 응답', Object.keys(anomalies).length + '건'],
  ];
  dash.getRange(3, 1, 1, kpi.length).setValues([kpi.map(k => k[0])])
      .setFontWeight('bold').setBackground('#003087').setFontColor('#FFFFFF').setHorizontalAlignment('center');
  dash.getRange(4, 1, 1, kpi.length).setValues([kpi.map(k => k[1])])
      .setFontSize(13).setHorizontalAlignment('center');

  let row = 6;
  row = writeTable_(dash, row, '팀별 만족도', ['팀', '응답수', '①신속', '②전문', '③응대', '종합평균'], byTeam);
  row = writeTable_(dash, row, '월별 추이', ['월', '응답수', '평균점수'], byMonth);
  const monthTop = row - byMonth.length - 1;
  row = writeTable_(dash, row, '개인별 TOP 5 (전체 44명 순위 → "개인별순위" 시트)', ['담당FSR', '팀', '직급', '응답수', '평균점수'], byFsrTop5);
  row = writeTable_(dash, row, '직급별', ['직급', '응답수', '평균점수'], byGrade);
  row = writeTable_(dash, row, '지역별 (실답변 또는 팀 기준 권역 추정)', ['지역', '응답수', '평균점수'], byRegion);
  row = writeTable_(dash, row, '서비스 형태별', ['형태', '응답수', '평균점수'], byType);
  row = writeTable_(dash, row, '장비 모델별', ['모델', '응답수', '평균점수'], byModel);

  if (byMonth.length > 1) {
    const chart = dash.newChart().asLineChart()
      .addRange(dash.getRange(monthTop, 1, byMonth.length + 1, 1))
      .addRange(dash.getRange(monthTop, 3, byMonth.length + 1, 1))
      .setPosition(3, 9, 0, 0).setOption('title', '월별 종합 만족도 추이')
      .setOption('vAxis', { minValue: 1, maxValue: 5 })
      .setOption('colors', ['#0072CE']).build();
    dash.insertChart(chart);
  }
  dash.setColumnWidths(1, 8, 120);

  // ---- 서술형응답 시트 (4단계 분류: 심각 → 개선요청 → 칭찬 → 단순의견) ----
  const txt = getOrCreate_(ss, SHEETS.TEXT);

  // 기존 검수결과(사람이 입력한 정확/오분류)를 지우기 전에 먼저 백업한다.
  // 키는 "응답일시|기관명|담당FSR" 조합 — 응답일시만으로도 거의 유일하지만,
  // 혹시 모를 충돌에 대비해 세 값을 합쳐 키로 쓴다.
  // (실제 버그였던 부분: 이전엔 "보존한다"는 주석만 있고 실제로는 매번 빈 값으로
  // 덮어써서, 관리자가 입력한 검수 결과가 새 응답이 들어올 때마다 사라졌었다.)
  // 키는 응답일시(타임스탬프)만 쓴다 — 기관명은 매칭 로직이 개선되면서 나중에
  // 바뀔 수 있어(DB미등록→자동매칭 등) 키에 포함시키면 검수결과가 다시 유실될 수 있다.
  // 타임스탬프는 응답마다 고유하므로 이것만으로 충분히 안전하다.
  // 사람이 입력한 값(검수결과·처리상태·조치내용)을 지우기 전에 백업한다.
  // 키는 응답일시(타임스탬프)만 쓴다 — 기관명은 매칭 로직 개선으로 나중에 바뀔 수
  // 있어(DB미등록→자동매칭 등) 키에 넣으면 입력값이 유실된다.
  // (과거 실제 버그: "보존한다"는 주석만 있고 매번 빈 값으로 덮어써서 검수 결과가
  //  새 응답이 들어올 때마다 사라졌다. 처리상태도 같은 실수를 반복하지 않도록 함께 백업한다.)
  // 열 구조가 바뀔 수 있으므로(9열 → 11열) 열 위치를 고정하지 않고 머리글에서 찾는다.
  // 실제 버그였던 부분: 이전 9열 구조에서는 인덱스 8이 '서술형 의견'인데 이를 그대로
  // '처리상태'로 읽어, 업그레이드 첫 실행에서 처리상태 칸에 고객 의견 텍스트가 들어갔다.
  // 값이 드롭다운 목록에 없으면 버리는 검증도 함께 넣어 이런 오염을 이중으로 막는다.
  const VALID_STATUS = ['미확인', '처리중', '완료', '해당없음'];
  const VALID_REVIEW = ['정확', '오분류'];
  const prevInput = {};   // { ts: { review, status, action } }
  if (txt.getLastRow() > 1 && txt.getLastColumn() >= 8) {
    const oldAll = txt.getRange(1, 1, txt.getLastRow(), txt.getLastColumn()).getValues();
    const oldHead = oldAll[0].map(v => String(v).trim());
    const iReview = oldHead.indexOf('검수결과');
    const iStatus = oldHead.indexOf('처리상태');
    const iAction = oldHead.indexOf('조치 내용');
    oldAll.slice(1).forEach(r => {
      const ts = r[0] instanceof Date ? r[0].getTime() : String(r[0]);
      const pick = (idx, allowed) => {
        if (idx < 0) return '';
        const v = String(r[idx] || '').trim();
        return (!allowed || allowed.indexOf(v) !== -1) ? v : '';
      };
      const rec = {
        review: pick(iReview, VALID_REVIEW),
        status: pick(iStatus, VALID_STATUS),
        action: pick(iAction, null),
      };
      if (rec.review || rec.status || rec.action) prevInput[ts] = rec;
    });
  }

  txt.clear();
  txt.clearConditionalFormatRules(); // 규칙 누적 방지 (매 갱신 시 초기화)
  // '테마'는 '서술형 의견' 바로 앞에 둔다 — 앞쪽 인덱스(검수결과 7·조치 내용 9)가
  // 그대로 유지돼 기존 로직이 영향받지 않고, 화면에서도 의견 옆에 붙어 읽기 좋다.
  const tHead = ['응답일시','기관명','담당FSR','팀','직급','평균점수','분류','검수결과',
                 '처리상태','조치 내용','테마','서술형 의견'];
  txt.getRange(1, 1, 1, tHead.length).setValues([tHead])
     .setFontWeight('bold').setBackground('#003087').setFontColor('#FFFFFF');

  const tRows = rows.filter(r => r[13])
    .map(r => {
      const ts = r[0] instanceof Date ? r[0].getTime() : String(r[0]);
      const prev = prevInput[ts] || {};
      // 사람이 지정한 분류가 있으면 그것을 쓴다(자동 분류보다 우선).
      const auto = classify_(r[13], r[AVG_I]);
      const manual = manualClass_(prev.review, prev.action);
      const cls = manual || auto;
      // 대응이 필요한 건(심각/개선요청)은 기본값을 '미확인'으로 넣어 처리 대상임을 표시한다.
      // 칭찬·단순의견은 대응 대상이 아니므로 빈칸으로 둔다(처리율 분모에서도 제외).
      const needsAction = cls.indexOf('심각') !== -1 || cls === '개선요청';
      const status = prev.status || (needsAction ? '미확인' : '');
      return [r[0], r[3], r[4], r[5], r[6], r[AVG_I], cls,
              prev.review || '', status, prev.action || '', tagThemes_(r[13]), r[13]];
    });
  if (tRows.length) {
    txt.getRange(2, 1, tRows.length, tHead.length).setValues(tRows);
    txt.getRange(2, 1, tRows.length, 1).setNumberFormat('yyyy-mm-dd hh:mm');
    // 심각 행은 빨간 배경으로 강조
    const clsRange = txt.getRange(2, 7, tRows.length, 1);
    const tRules = txt.getConditionalFormatRules();
    tRules.push(SpreadsheetApp.newConditionalFormatRule()
      .whenTextContains('심각').setBackground('#FCE8E6').setFontColor('#CC0000').setBold(true)
      .setRanges([clsRange]).build());
    txt.setConditionalFormatRules(tRules);
    // 검수결과 열 드롭다운 (정확 / 오분류)
    const rule = SpreadsheetApp.newDataValidation().requireValueInList(['정확', '오분류'], true).build();
    txt.getRange(2, 8, tRows.length, 1).setDataValidation(rule);

    // 처리상태 열 드롭다운 (미확인 / 처리중 / 완료 / 해당없음)
    const stRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['미확인', '처리중', '완료', '해당없음'], true).build();
    const stRange = txt.getRange(2, 9, tRows.length, 1);
    stRange.setDataValidation(stRule);
    // 미확인=빨강, 처리중=주황, 완료=초록 — 한눈에 처리 진행이 보이게
    const sRules = txt.getConditionalFormatRules();
    sRules.push(SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('미확인').setBackground('#FCE8E6').setFontColor('#CC0000').setBold(true)
      .setRanges([stRange]).build());
    sRules.push(SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('처리중').setBackground('#FFF4E5').setFontColor('#B26A00').setBold(true)
      .setRanges([stRange]).build());
    sRules.push(SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('완료').setBackground('#E6F4EA').setFontColor('#1E7E34').setBold(true)
      .setRanges([stRange]).build());
    txt.setConditionalFormatRules(sRules);
  }
  txt.setFrozenRows(1);
  txt.setColumnWidth(9, 90);    // 처리상태
  txt.setColumnWidth(10, 280);  // 조치 내용
  txt.setColumnWidth(11, 190);  // 테마
  txt.setColumnWidth(12, 480);  // 서술형 의견

  // 대시보드에 분류별 건수 추가
  // 검수결과가 '오분류'인 건은 자동 분류를 신뢰할 수 없으므로 집계에서 뺀다
  // (기간별 보고서와 동일한 기준 — 두 곳의 수치가 어긋나지 않도록 맞춘다).
  const tOk = tRows.filter(r => String(r[7]).trim() !== '오분류' || !!manualClass_(r[7], r[9]));
  const nMis = tRows.length - tOk.length;
  const gC = {};
  tOk.forEach(r => (gC[r[6]] = (gC[r[6]] || 0) + 1));
  const order = ['🚨 심각(즉시조치)', '확인필요(문구·점수 불일치)', '개선요청', '단순의견', '칭찬', '(의견없음)'];
  const byCls = order.filter(k => gC[k]).map(k => [k, gC[k]]);
  if (byCls.length) {
    dash.getRange(row, 1)
        .setValue('■ 서술형 의견 분류' + (nMis ? '  (검수 제외 ' + nMis + '건)' : ''))
        .setFontWeight('bold').setFontColor('#003087');
    row++;
    dash.getRange(row, 1, 1, 2).setValues([['분류', '건수']])
        .setFontWeight('bold').setBackground('#E8F0FE');
    row++;
    dash.getRange(row, 1, byCls.length, 2).setValues(byCls);
    row += byCls.length + 1;
  }

  // ---- 의견 테마 (다중 라벨 — 합계가 의견 건수보다 많을 수 있다) ----
  // 분류가 "조치 필요 여부"라면 테마는 "무엇에 관한 이야기인가"다.
  // 칭찬이 대부분인 상황에서 실제로 무엇이 평가받는지는 이 표에서만 보인다.
  const gTh = {};
  let nThemed = 0;
  tOk.forEach(r => {
    const ths = String(r[10] || '').split(',').map(s => s.trim()).filter(Boolean);
    if (ths.length) nThemed++;
    ths.forEach(t => (gTh[t] = (gTh[t] || 0) + 1));
  });
  const thOrder = THEMES.map(t => t[0]);
  const byTh = thOrder.filter(k => gTh[k]).map(k => [k, gTh[k], pctOf_(gTh[k], nThemed)]);
  if (byTh.length) {
    dash.getRange(row, 1)
        .setValue('■ 의견 테마 (내용 있는 의견 ' + nThemed + '건 기준 · 중복 포함)')
        .setFontWeight('bold').setFontColor('#003087');
    row++;
    dash.getRange(row, 1, 1, 3).setValues([['테마', '건수', '비율']])
        .setFontWeight('bold').setBackground('#E8F0FE');
    row++;
    dash.getRange(row, 1, byTh.length, 3).setValues(byTh);
    row += byTh.length + 1;
  }

  // ---- VOC 처리 현황 (대응이 필요한 건만 대상) ----
  // 분모: 심각·개선요청으로 분류되어 실제 대응이 필요한 건
  // 분자: 처리상태가 '완료'인 건
  // 칭찬·단순의견은 대응 대상이 아니므로 분모에서 제외한다 — 포함시키면
  // 처리율이 실제보다 부풀려져 대응 체계가 잘 돌아가는 것처럼 보인다.
  const actRows = tOk.filter(r => {
    const cls = r[6];
    return cls.indexOf('심각') !== -1 || cls === '개선요청';
  });
  if (actRows.length) {
    const stCnt = { '미확인': 0, '처리중': 0, '완료': 0, '해당없음': 0 };
    actRows.forEach(r => {
      const s = String(r[8] || '미확인').trim() || '미확인';
      if (stCnt[s] === undefined) stCnt[s] = 0;
      stCnt[s]++;
    });
    const denom = actRows.length - stCnt['해당없음'];
    const rate = denom > 0 ? round1_(100 * stCnt['완료'] / denom) + '%' : '-';
    dash.getRange(row, 1).setValue('■ VOC 처리 현황 (대응 필요 건 기준)')
        .setFontWeight('bold').setFontColor('#003087');
    row++;
    dash.getRange(row, 1, 1, 4).setValues([['대응 필요', '완료', '처리중', '미확인']])
        .setFontWeight('bold').setBackground('#E8F0FE');
    row++;
    dash.getRange(row, 1, 1, 4).setValues([[
      denom + '건', stCnt['완료'] + '건', stCnt['처리중'] + '건', stCnt['미확인'] + '건']]);
    row++;
    dash.getRange(row, 1).setValue('VOC 처리율').setFontWeight('bold');
    dash.getRange(row, 2).setValue(rate)
        .setFontWeight('bold')
        .setFontColor(denom > 0 && stCnt['완료'] === denom ? '#1E7E34'
                    : (stCnt['미확인'] > 0 ? '#CC0000' : '#B26A00'));
    row += 2;
  }

  // ---- 개인별순위 시트 (전체 인원 — 응답 0건 포함) ----
  const rank = getOrCreate_(ss, SHEETS.RANK);
  rank.clear();
  rank.clearConditionalFormatRules();
  rank.getRange(1, 1).setValue('👥 개인별 만족도 순위 — 전체 명단 (자동 갱신: ' +
    Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm') + ')')
    .setFontSize(13).setFontWeight('bold').setFontColor('#003087');
  // FSR별 CRM 방문 건수 — 개인 응답률(응답수÷방문수)의 분모.
  // "응답이 적은 것이 안내를 안 해서인지, 방문 자체가 적어서인지"를 구분하기 위함이다.
  const fsrVisits = loadFsrVisits_(ss);
  const rHead = ['순위', '담당FSR', '팀', '직급', '응답수', '방문수', '응답률', '①신속', '②전문', '③응대', '종합평균', '평가활용'];
  rank.getRange(2, 1, 1, rHead.length).setValues([rHead])
      .setFontWeight('bold').setBackground('#003087').setFontColor('#FFFFFF').setHorizontalAlignment('center');
  // 동점자는 공동순위로 표기한다. 만점자가 여럿인 상황에서 1~5위로 서열을 매기면
  // 실력 차이가 없는데도 순위가 갈린 것처럼 보이기 때문이다(9월 실측: 만점 8명).
  // 고과 반영 형평성: 표본이 적으면 평균이 우연에 크게 흔들린다.
  // (실측: 응답 2건인 FSR은 4점 1건에 -0.50, 5건인 FSR은 -0.20 → 같은 평가에 2.5배 차이)
  // 따라서 표본 충분 여부를 명시해 소수 응답자가 불리하게 평가되지 않도록 한다.
  const EVAL_MIN_N = CONFIG.EVAL_MIN_RESPONSES;
  let rankNo = 0, prevScore = null;
  const rankRows = respondents.map((r, i) => {
    const score = r[7];                       // 종합평균
    if (score !== prevScore) { rankNo = i + 1; prevScore = score; }
    const n = r[3];
    const usable = n >= EVAL_MIN_N ? '가능' : '표본부족(' + n + '건)';
    // r = [FSR, 팀, 직급, 응답수, ①, ②, ③, 종합평균]
    const visits = fsrVisits[norm_(r[0])] || 0;
    const rate = visits > 0 ? round1_(100 * n / visits) + '%' : '-';
    return [rankNo, r[0], r[1], r[2], r[3], visits > 0 ? visits : '-', rate]
             .concat(r.slice(4)).concat([usable]);
  }).concat(noResp.map(r => {
    const visits = fsrVisits[norm_(r[0])] || 0;
    return ['-', r[0], r[1], r[2], r[3], visits > 0 ? visits : '-', visits > 0 ? '0%' : '-']
             .concat(r.slice(4)).concat(['응답없음']);
  }));  // 응답 0건 인원은 하단에 표시
  if (rankRows.length) {
    rank.getRange(3, 1, rankRows.length, rHead.length).setValues(rankRows);
    // 종합평균 열(끝에서 두 번째 — 마지막은 '평가활용' 텍스트 열)
    const sc = rank.getRange(3, rHead.length - 1, rankRows.length, 1);
    const rr = rank.getConditionalFormatRules();
    rr.push(SpreadsheetApp.newConditionalFormatRule().whenNumberGreaterThanOrEqualTo(4.5)
      .setFontColor('#0072CE').setBold(true).setRanges([sc]).build());
    rr.push(SpreadsheetApp.newConditionalFormatRule().whenNumberLessThan(3.5)
      .setFontColor('#CC0000').setBold(true).setRanges([sc]).build());
    // 응답 0건 인원은 회색 처리
    const nameRange = rank.getRange(3, 5, rankRows.length, 1);
    rr.push(SpreadsheetApp.newConditionalFormatRule().whenNumberEqualTo(0)
      .setFontColor('#999999').setRanges([nameRange]).build());
    rank.setConditionalFormatRules(rr);
  }
  rank.setFrozenRows(2);
  rank.setColumnWidth(1, 60); rank.setColumnWidth(2, 110);
  rank.setColumnWidths(3, 9, 88); rank.setColumnWidth(12, 110);
}

/* ====================== 유틸 ====================== */
function writeTable_(sh, row, title, head, body) {
  sh.getRange(row, 1).setValue('■ ' + title).setFontWeight('bold').setFontColor('#003087');
  row++;
  sh.getRange(row, 1, 1, head.length).setValues([head])
    .setFontWeight('bold').setBackground('#E8F0FE');
  row++;
  if (body.length) {
    sh.getRange(row, 1, body.length, head.length).setValues(body);
    const sc = sh.getRange(row, head.length, body.length, 1); // 마지막 열(평균)에 강조
    const rules = sh.getConditionalFormatRules();
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenNumberGreaterThanOrEqualTo(4.5)
      .setFontColor('#0072CE').setBold(true).setRanges([sc]).build());
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenNumberLessThan(3.5)
      .setFontColor('#CC0000').setBold(true).setRanges([sc]).build());
    sh.setConditionalFormatRules(rules);
    row += body.length;
  }
  return row + 1;
}

function getOrCreate_(ss, name) { return ss.getSheetByName(name) || ss.insertSheet(name); }
function safe_(r, i) { return i >= 0 && r[i] != null ? r[i] : ''; }
/* 문자열 정규화: 공백 제거 + 소문자 변환 + 한글 NFC 정규화.
 * NFC 정규화가 중요한 이유: 한글은 완성형(NFC, "강"=1글자)과 분리형(NFD, "강"=ㄱ+ㅏ+ㅇ
 * 3개 코드포인트)으로 각각 저장될 수 있는데, 화면에는 완전히 동일하게 보이지만
 * 문자열 비교 시 다른 값으로 취급된다. 특히 아이폰/맥에서 입력·복사한 텍스트가
 * NFD로 들어오는 경우가 많아, 정규화 없이는 기관명DB·거래처지역·설치이력·FSR명단
 * 매칭이 눈에 보이지 않는 이유로 실패한다(실제 "강릉아산병원" 사례로 확인됨).
 * 모든 이름 비교가 이 함수를 거치므로 한 곳만 고치면 전체 매칭 로직에 적용된다. */
function norm_(s) { return String(s).normalize('NFC').replace(/\s+/g, '').toLowerCase(); }
function round2_(v) { return Math.round(v * 100) / 100; }
function round1_(v) { return Math.round(v * 10) / 10; }
function pctOf_(a, b) { return b ? round1_(100 * a / b) + '%' : '-'; }

/* 편집거리 기반 유사도(0~1). 짧은 기관명 비교용이라 O(m*n)이어도 충분히 빠르다. */
function levenshtein_(a, b) {
  const m = a.length, n = b.length;
  if (!m) return n; if (!n) return m;
  const dp = [];
  for (let i = 0; i <= m; i++) dp.push(new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}
function similarity_(a, b) {
  if (!a.length && !b.length) return 1;
  return 1 - levenshtein_(a, b) / Math.max(a.length, b.length);
}

/* a가 b에서 글자를 몇 개 "빼기만" 해서 만들 수 있는 부분수열인지 확인(순서 유지, 연속일 필요 없음).
 * 예: "일산병원"은 "일산복음병원"에서 '복음'만 빼면 되므로 true(진짜 같은 기관의 생략형).
 * "일산흥민병원"은 아무리 빼도 안 만들어지므로 false(글자가 바뀐 것 = 다른 기관일 가능성).
 * 이 구분이 필요한 이유(실측으로 발견된 오매칭): 한국 병원명은 "지역+특징+병원" 패턴이 많아
 * "일산○○병원"처럼 가운데만 다른 두 기관이 편집거리상 우연히 비슷하게 나올 수 있다
 * (실제로 존재하지 않는 "일산흥민병원"이 "일산복음병원"과 67% 유사도로 오매칭된 사례 확인). */
function isSubsequence_(shorter, longer) {
  let i = 0;
  for (let j = 0; j < longer.length && i < shorter.length; j++) {
    if (longer[j] === shorter[i]) i++;
  }
  return i === shorter.length;
}

/* 기관명DB에 정확히 없는 이름을 유사도로 찾는다. 두 단계로 검색 범위를 넓혀간다:
 *   ① 좁게: 해당 FSR이 거래처지역에서 직접 담당하는 목록(보통 10~30개)
 *   ② 넓게: ①에서 못 찾으면 거래처지역 전체(모든 FSR 합산) + 설치이력 전체로 재검색
 * ②가 필요한 이유(실측으로 확인된 문제): "강원대학교병원"처럼 대형병원은 거래처지역에
 * 특정 FSR 한 명(예: 김세진)에게만 배정되어 있지만, 실제로는 여러 FSR이 함께 방문한다
 * (CRM 기준 26명). 응답의 담당 FSR이 배정자 본인이 아니면 ①만으로는 후보 목록 자체에
 * 없어 매칭이 실패한다. ②는 범위가 넓어진 만큼 오매칭 위험이 살짝 높아지지만, 실제
 * 병원명은 서로 충분히 다른 경우가 대부분이라 같은 임계값(0.6)을 그대로 쓴다.
 *
 * "서울대", "대구가톨릭"처럼 심하게 줄인 이름은 편집거리 기준 유사도가 0.5 이하로
 * 떨어져 위 로직만으로는 못 잡는다(뒷부분을 통째로 생략한 것이라 "오타"가 아니라
 * "부분 문자열"이기 때문). 그래서 접두어(prefix) 일치를 별도로 확인하되,
 * **후보군 안에서 그 접두어로 시작하는 기관이 정확히 1개일 때만** 신뢰한다 — 실측
 * 결과 "서울대"로 시작하는 기관이 8개("서울대학교병원", "서울대학교 치과병원",
 * "서울대학교병원 강남센터" 등), "대구가톨릭"도 4개나 있어서, 후보가 여럿이면
 * 어느 걸 의도한 건지 알 수 없다 — 이럴 땐 틀리게 찍는 것보다 DB미등록으로 남겨
 * 사람이 확인하게 하는 편이 안전하다. */
function fuzzyMatchOrg_(orgRaw, fsrName, accountRegion, accountRegionAll) {
  const input = norm_(orgRaw);

  const prefixMatch = (candidates) => {
    if (input.length < 3 || !candidates || !candidates.length) return null;
    const hits = candidates.filter(c => norm_(c).indexOf(input) === 0);
    // 정확히 1개만 그 접두어로 시작할 때만 신뢰(중복이면 어느 지점/부서인지 특정 불가)
    return hits.length === 1 ? { name: hits[0], score: 0.99 } : null;
  };

  const bestOf = (candidates) => {
    if (!candidates || !candidates.length) return null;
    const prefix = prefixMatch(candidates);
    if (prefix) return prefix;

    const scored = [];
    candidates.forEach(c => {
      const cn = norm_(c);
      const score = similarity_(input, cn);
      // 글자를 "빼기만" 해서 만들 수 있는 관계(부분수열)면 생략형으로 보고 0.6을 쓰지만,
      // 글자가 "바뀐" 관계(부분수열 아님)면 다른 기관일 위험이 있어 0.85로 훨씬 엄격하게 본다.
      const abbreviation = isSubsequence_(input, cn) || isSubsequence_(cn, input);
      const threshold = abbreviation ? 0.6 : 0.85;
      if (score >= threshold) scored.push({ name: c, score });
    });
    if (!scored.length) return null;
    scored.sort((a, b) => b.score - a.score);
    // 1위·2위 점수 차이가 0.1 미만이면(=여러 후보가 비슷하게 그럴듯하면) 확신할 수 없으니 보류.
    // 예: "서울대병원"은 "서울대정병원"(0.83)·"서울현대병원"(0.83)·"서울대학교병원"(0.71)이
    // 뒤섞여 있어 편집거리만으로는 어느 게 맞는지 알 수 없다 — 이럴 땐 안 잡는 게 안전하다.
    if (scored.length > 1 && (scored[0].score - scored[1].score) < 0.1) return null;
    return { name: scored[0].name, score: round2_(scored[0].score) };
  };

  const narrow = bestOf((accountRegion.byFsrNames || {})[norm_(fsrName)]);
  if (narrow) return narrow;

  // 거래처지역·설치이력 두 목록을 합칠 때 정규화 기준으로 중복 제거— 안 하면 같은 기관이
  // 두 목록에 겹쳐 있을 때(실측 706개) 후보 목록에 자기 자신이 2번 들어가서, 1위·2위
  // 점수 격차 검사가 "정답 vs 정답 자신"을 비교해 동점(격차 0)으로 보고 애매하다고
  // 착각해 정상적인 매칭까지 막아버리는 버그가 있었다(실측으로 확인·수정됨).
  const seenBroad = {};
  const broadPool = [];
  (accountRegion.allNames || []).concat((accountRegionAll && accountRegionAll.names) || []).forEach(n => {
    const k = norm_(n);
    if (!seenBroad[k]) { seenBroad[k] = true; broadPool.push(n); }
  });
  return bestOf(broadPool);
}




/* ====================== 4. 기간별 보고서 (월/분기/전체) ====================== */

/* 메뉴에서 실행: 기간 입력 받아 보고서 시트 생성 */
function generatePeriodReport() {
  const ui = SpreadsheetApp.getUi();
  const lastMonth = Utilities.formatDate(
    new Date(new Date().getFullYear(), new Date().getMonth() - 1, 15), 'Asia/Seoul', 'yyyy-MM');
  const res = ui.prompt('기간별 보고서 생성',
    '생성할 기간을 입력하세요.\n\n' +
    '· 월별:   YYYY-MM      (예: ' + lastMonth + ')\n' +
    '· 분기별: YYYY-Q1~Q4  (예: 2026-Q3)\n' +
    '· 전체:   전체',
    ui.ButtonSet.OK_CANCEL);
  if (res.getSelectedButton() !== ui.Button.OK) return;
  const input = res.getResponseText().trim();

  const period = parsePeriod_(input);
  if (!period) { ui.alert('형식이 올바르지 않습니다.\n예: ' + lastMonth + ' / 2026-Q3 / 전체'); return; }

  const ok = buildPeriodReport_(period);
  ui.alert(ok ? '✅ "' + period.sheetName + '" 시트가 생성되었습니다.'
              : '⚠️ 해당 기간의 응답 데이터가 없습니다.');
}

/* 기간 문자열 해석 → {label, sheetName, months|null, prevMonths|null, prevLabel} */
function parsePeriod_(input) {
  const s = input.replace(/\s+/g, '');
  // 월별
  if (/^\d{4}-\d{2}$/.test(s)) {
    const [y, m] = s.split('-').map(Number);
    const pm = Utilities.formatDate(new Date(y, m - 2, 15), 'Asia/Seoul', 'yyyy-MM');
    return { label: s + ' 월간', sheetName: '월별보고_' + s,
             months: [s], prevMonths: [pm], prevLabel: pm };
  }
  // 분기별
  const qm = s.match(/^(\d{4})-?Q([1-4])$/i);
  if (qm) {
    const y = Number(qm[1]), q = Number(qm[2]);
    const mk = (yy, mm) => yy + '-' + String(mm).padStart(2, '0');
    const months = [1, 2, 3].map(i => mk(y, (q - 1) * 3 + i));
    const py = q === 1 ? y - 1 : y, pq = q === 1 ? 4 : q - 1;
    const prevMonths = [1, 2, 3].map(i => mk(py, (pq - 1) * 3 + i));
    return { label: y + '년 ' + q + '분기', sheetName: '분기보고_' + y + '-Q' + q,
             months: months, prevMonths: prevMonths, prevLabel: py + '-Q' + pq };
  }
  // 전체
  if (s === '전체' || s.toLowerCase() === 'all') {
    const today = Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd');
    return { label: '전체 누적 (' + today + ' 기준)', sheetName: '전체보고_' + today,
             months: null, prevMonths: null, prevLabel: null };
  }
  return null;
}

/* 매월 1일 오전 8시에 전월 보고서 자동 생성 + 메일 발송 트리거 설치 (선택, 1회 실행) */
function installMonthlyTrigger() {
  ScriptApp.getProjectTriggers().forEach(t => {
    if (t.getHandlerFunction() === 'autoMonthlyReport') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('autoMonthlyReport').timeBased().onMonthDay(1).atHour(8).create();
  alert_('✅ 매월 1일 오전 8시에 전월 보고서가 자동 생성됩니다.\n' +
    (CONFIG.ALERT_EMAILS.length ? '요약 메일도 함께 발송됩니다.' : '(메일 발송은 ALERT_EMAILS 설정 시 활성화)'));
}

/* 해당 월 게시물 이미지(PNG)를 드라이브 폴더에서 찾는다. 없으면 null.
 * 이름에 'YYYYMM' 또는 'YYYY-MM'이 들어간 이미지 파일을 쓴다.
 * 같은 월 파일이 여러 개면 가장 최근에 수정된 것을 고른다 — 수정본을 다시 올렸을 때
 * 옛 파일이 붙는 일을 막기 위해서다. */
function findBoardImage_(month) {
  const id = String(CONFIG.BOARD_IMAGE_FOLDER_ID || '').trim();
  if (!id) return null;
  let folder;
  try { folder = DriveApp.getFolderById(id); }
  catch (e) { Logger.log('게시물 폴더를 열 수 없습니다: ' + e); return null; }

  const keys = [month.replace('-', ''), month];   // '202610' 과 '2026-10' 둘 다 인정
  const hits = [];
  const it = folder.getFiles();
  while (it.hasNext()) {
    const f = it.next();
    const name = f.getName();
    if (!/\.(png|jpg|jpeg)$/i.test(name)) continue;
    if (!keys.some(k => name.indexOf(k) !== -1)) continue;
    hits.push(f);
  }
  if (!hits.length) return null;
  hits.sort((a, b) => b.getLastUpdated() - a.getLastUpdated());
  return hits[0];
}

/* 월간 보고 메일 1통 발송. 게시물 이미지가 있으면 첨부한다.
 * 자동 트리거와 "다시 보내기" 메뉴가 같은 함수를 쓴다 — 두 경로의 메일이 달라지면 안 된다. */
function sendMonthlyMail_(month, summary) {
  if (!CONFIG.ALERT_EMAILS.length) return { sent: 0, attached: false };

  const img = findBoardImage_(month);
  const body = summary.mailBody + '\n\n' + (img
    ? '· 사내 게시용 한 장(' + img.getName() + ')을 첨부했습니다.'
    : '· 사내 게시용 한 장은 아직 등록되지 않았습니다. 게시물을 만들어 드라이브 폴더에 올린 뒤\n'
      + '  메뉴 > "월간 보고 메일 다시 보내기"로 첨부해 보낼 수 있습니다.');

  const opts = { name: 'FS Group FSS Team' };
  if (img) opts.attachments = [img.getAs('image/png')];

  CONFIG.ALERT_EMAILS.forEach(to => MailApp.sendEmail(
    to, '[FS Group] ' + month + ' 방문 서비스 만족도 월간 보고', body, opts));
  return { sent: CONFIG.ALERT_EMAILS.length, attached: !!img };
}

/* 게시물을 뒤늦게 올렸을 때 같은 달 메일을 첨부해서 다시 보낸다. */
function resendMonthlyMail() {
  const ui = SpreadsheetApp.getUi();
  const now = new Date();
  const last = Utilities.formatDate(
    new Date(now.getFullYear(), now.getMonth() - 1, 15), 'Asia/Seoul', 'yyyy-MM');
  const res = ui.prompt('월간 보고 메일 다시 보내기',
    '월을 입력하세요 (예: ' + last + ')', ui.ButtonSet.OK_CANCEL);
  if (res.getSelectedButton() !== ui.Button.OK) return;

  const month = res.getResponseText().trim();
  const period = parsePeriod_(month);
  if (!period) { ui.alert('형식이 올바르지 않습니다. 예: ' + last); return; }

  const summary = buildPeriodReport_(period);
  if (!summary) { ui.alert('⚠️ 해당 기간의 응답 데이터가 없습니다.'); return; }

  const r = sendMonthlyMail_(month, summary);
  ui.alert(!r.sent
    ? '⚠️ CONFIG.ALERT_EMAILS가 비어 있어 발송하지 않았습니다.'
    : '✅ ' + month + ' 보고 메일을 ' + r.sent + '명에게 보냈습니다.\n'
      + (r.attached ? '게시물 이미지도 첨부되었습니다.'
                    : '게시물 이미지는 찾지 못해 본문만 보냈습니다.'));
}

function autoMonthlyReport() {
  const now = new Date();
  const month = Utilities.formatDate(
    new Date(now.getFullYear(), now.getMonth() - 1, 15), 'Asia/Seoul', 'yyyy-MM');
  const period = parsePeriod_(month);
  const summary = buildPeriodReport_(period);
  // 시트는 항상 만든다. 메일은 CONFIG.MONTHLY_MAIL이 true일 때만.
  if (summary && CONFIG.MONTHLY_MAIL) sendMonthlyMail_(month, summary);
}

/* 보고서 본체 — 성공 시 {mailBody} 반환, 데이터 없으면 false */
function buildPeriodReport_(period) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const clean = ss.getSheetByName(SHEETS.CLEAN);
  if (!clean || clean.getLastRow() < 2) return false;

  const all = clean.getDataRange().getValues().slice(1);
  const ymOf = (v) => (v instanceof Date)
    ? Utilities.formatDate(v, 'Asia/Seoul', 'yyyy-MM') : String(v).trim();
  const inMonths = (r, months) => months === null || months.indexOf(ymOf(r[1])) !== -1;
  const cur = all.filter(r => inMonths(r, period.months));
  if (!cur.length) return false;
  const prev = period.prevMonths ? all.filter(r => inMonths(r, period.prevMonths)) : [];

  const avg = (arr) => arr.length ? round2_(arr.reduce((a, b) => a + b, 0) / arr.length) : null;
  const diff = (c, p) => (p == null || c == null) ? '-' : ((c - p >= 0 ? '▲ +' : '▼ ') + round2_(c - p));

  const cTotal = avg(cur.map(r => r[12])), pTotal = avg(prev.map(r => r[12]));
  const cQ = [9, 10, 11].map(i => avg(cur.map(r => r[i])));
  const pQ = [9, 10, 11].map(i => avg(prev.map(r => r[i])));
  const lowRows = cur.filter(isLowRow_);

  // 응답률 (해당 기간 월들의 방문건수 합계 대비)
  const visits = loadVisits_(ss);
  const periodMonths = period.months || Array.from(new Set(cur.map(r => ymOf(r[1]))));
  const totalVisits = periodMonths.reduce((s, m) => s + (visits[m] || 0), 0);

  // 이 보고 기간에 적용되는 저점수 기준 (기간 첫 달 1일 기준).
  // 기간이 전환일을 걸치면 행마다 기준이 달라지므로 라벨에 그 사실을 적는다.
  const pMonths = periodMonths.slice().sort();
  const lowMaxFirst = lowMaxAt_(pMonths[0] + '-01');
  const lowMaxLast  = lowMaxAt_(pMonths[pMonths.length - 1] + '-01');
  const lowMaxLabel = (lowMaxFirst === lowMaxLast)
    ? '≤' + lowMaxFirst
    : '≤' + lowMaxLast + '·' + CONFIG.ALERT_THRESHOLD_FROM + ' 이전 ≤' + lowMaxFirst;
  const responseRate = totalVisits ? round1_(100 * cur.length / totalVisits) + '%' : '방문건수 미입력';

  // 팀별
  const gT = {};
  cur.forEach(r => { const k = r[5] || '(명단외)'; (gT[k] = gT[k] || []).push(r[12]); });
  const byTeam = Object.keys(gT).map(k => [k, gT[k].length, avg(gT[k])]).sort((a, b) => b[2] - a[2]);

  // 월별 추이
  const gm = {};
  cur.forEach(r => { const m = ymOf(r[1]); (gm[m] = gm[m] || []).push(r[12]); });
  const byMonth = Object.keys(gm).sort().map(k => [k, gm[k].length, avg(gm[k])]);

  // 개인별 (응답 2건 이상만 순위 참여)
  const gF = {};
  cur.forEach(r => {
    const k = r[4] || '(미입력)';
    (gF[k] = gF[k] || { team: r[5], n: 0, s: 0 });
    gF[k].n++; gF[k].s += r[12];
  });
  const fsrArr = Object.keys(gF).map(k => [k, gF[k].team, gF[k].n, round2_(gF[k].s / gF[k].n)])
                       .sort((a, b) => b[3] - a[3]);
  const ranked = fsrArr.filter(r => r[2] >= CONFIG.RANK_MIN_RESPONSES);
  const top5 = ranked.slice(0, 5);
  // 하위 산정 시 최고점 동점자는 제외한다.
  // (실측 문제: 9월에 만점자가 8명인데 단순히 "뒤에서 5개"를 잘라내다 보니
  //  정렬상 뒤에 있던 만점자 3명이 하위로 표시됐다. 실력 차가 아니라 동점자
  //  나열 순서일 뿐이므로, 최고점과 같은 점수면 하위로 지목하지 않는다.)
  const topScore = ranked.length ? ranked[0][3] : null;
  const bottomPool = ranked.filter(r => r[3] < topScore);
  const bottom5 = bottomPool.slice(-5).reverse();

  // 코칭 대상은 "순위 하위"가 아니라 "실제 저점수(문항 최저 CONFIG.ALERT_THRESHOLD점 이하)가
  // 발생한 FSR"로 본다.
  // 이유(실측): 만점 응답이 대부분인 구간에서는 하위 5명이 4점대 우수 평가자가 되고,
  // 응답이 1~2건뿐인 표본에서는 우연히 4점 하나로 하위권이 되어 실력과 무관하게 지목된다.
  // 저점수가 없으면 코칭 대상도 없는 것이 맞다.
  const coachMap = {};
  lowRows.forEach(r => {
    const k = r[4] || '(미입력)';
    (coachMap[k] = coachMap[k] || { team: r[5], n: 0 });
    coachMap[k].n++;
  });
  const coachList = Object.keys(coachMap)
    .map(k => [k, coachMap[k].team, coachMap[k].n + '건', '저점수 발생'])
    .sort((a, b) => parseInt(b[2]) - parseInt(a[2]));

  // 서술형
  const txtSheet = ss.getSheetByName(SHEETS.TEXT);
  const txtAll = (txtSheet && txtSheet.getLastRow() > 1) ? txtSheet.getDataRange().getValues().slice(1) : [];
  // 서술형 열: 0일시 1기관 2FSR 3팀 4직급 5평균 6분류 7검수결과 8의견
  const txtCur = txtAll.filter(r => {
    const m = Utilities.formatDate(new Date(r[0]), 'Asia/Seoul', 'yyyy-MM');
    return period.months === null || period.months.indexOf(m) !== -1;
  });
  // 검수결과 반영: 관리자가 '오분류'로 표시한 건은 자동 분류를 신뢰하지 않으므로
  // 분류별 집계에서 제외한다. (이전에는 검수결과를 기록만 하고 어디에도 쓰지 않아,
  //  오분류를 표시해도 보고서 수치가 그대로였다.)
  // '오분류'라도 조치 내용에 올바른 분류를 적어 두었으면 그 분류로 집계한다
  // (분류 열에는 이미 보정값이 반영되어 있으므로 여기서는 제외 여부만 판단).
  // 보정값 없이 '오분류'로만 표시된 건은 신뢰할 분류가 없으므로 제외한다.
  const isOk = (r) => String(r[7]).trim() !== '오분류' || !!manualClass_(r[7], r[9]);
  const misclassified = txtCur.filter(r => !isOk(r));
  const severe  = txtCur.filter(r => isOk(r) && String(r[6]).indexOf('심각') !== -1);
  const improve = txtCur.filter(r => isOk(r) && r[6] === '개선요청');
  const praise  = txtCur.filter(r => isOk(r) && r[6] === '칭찬');

  // VOC 처리율 — 대응이 필요한 건(심각·개선요청) 중 '완료' 비율.
  // '해당없음'(제3자 책임 등)은 분모에서 제외한다.
  const vocAll = severe.concat(improve);
  const vocDone = vocAll.filter(r => String(r[8]).trim() === '완료').length;
  const vocNA = vocAll.filter(r => String(r[8]).trim() === '해당없음').length;
  const vocDenom = vocAll.length - vocNA;
  const vocRateLabel = vocAll.length === 0 ? '대응 필요 건 없음'
    : (vocDenom > 0 ? round1_(100 * vocDone / vocDenom) + '% (' + vocDone + '/' + vocDenom + '건)'
                    : '전건 해당없음');

  // ---- 시트 렌더링 ----
  const old = ss.getSheetByName(period.sheetName);
  if (old) ss.deleteSheet(old);
  const sh = ss.insertSheet(period.sheetName);
  let row = 1;

  sh.getRange(row, 1).setValue('📋 방문 서비스 만족도 보고서 — ' + period.label)
    .setFontSize(15).setFontWeight('bold').setFontColor('#003087');
  row += 2;

  // 1. 개요
  const cmpLabel = period.prevLabel ? ' (전기: ' + period.prevLabel + ' 대비)' : '';
  sh.getRange(row, 1).setValue('1. 개요' + cmpLabel).setFontWeight('bold').setFontColor('#0072CE');
  row++;
  const ov = [
    ['항목', '당기', '전기', '증감'],
    ['응답 수', cur.length + '건', prev.length ? prev.length + '건' : '-', diff(cur.length, prev.length ? prev.length : null)],
    ['응답률 (방문건수 대비)', responseRate, '-', '-'],
    ['종합 만족도', cTotal, pTotal ?? '-', diff(cTotal, pTotal)],
    ['① 신속성·일정', cQ[0], pQ[0] ?? '-', diff(cQ[0], pQ[0])],
    ['② 전문성·해결', cQ[1], pQ[1] ?? '-', diff(cQ[1], pQ[1])],
    ['③ 응대·마무리', cQ[2], pQ[2] ?? '-', diff(cQ[2], pQ[2])],
    ['저점수(' + lowMaxLabel + ') 건수', lowRows.length + '건', '-', '-'],
    ['VOC 처리율 (대응 필요 건)', vocRateLabel, '-', '-'],
  ];
  sh.getRange(row, 1, ov.length, 4).setValues(ov);
  sh.getRange(row, 1, 1, 4).setFontWeight('bold').setBackground('#003087').setFontColor('#FFFFFF');
  row += ov.length + 1;

  // 2. 월별 추이 (기간이 2개월 이상일 때만 표시)
  if (byMonth.length > 1) {
    sh.getRange(row, 1).setValue('2. 월별 추이').setFontWeight('bold').setFontColor('#0072CE');
    row++;
    sh.getRange(row, 1, 1, 3).setValues([['월', '응답수', '평균']])
      .setFontWeight('bold').setBackground('#E8F0FE');
    row++;
    sh.getRange(row, 1, byMonth.length, 3).setValues(byMonth);
    row += byMonth.length + 1;
  }

  // 3. 팀별
  sh.getRange(row, 1).setValue('3. 팀별 만족도').setFontWeight('bold').setFontColor('#0072CE');
  row++;
  sh.getRange(row, 1, 1, 3).setValues([['팀', '응답수', '평균']])
    .setFontWeight('bold').setBackground('#E8F0FE');
  row++;
  sh.getRange(row, 1, byTeam.length, 3).setValues(byTeam);
  row += byTeam.length + 1;

  // 4. 개인별 상·하위
  sh.getRange(row, 1).setValue('4. 개인별 순위 (응답 ' + CONFIG.RANK_MIN_RESPONSES + '건 이상) — 표본이 적을 경우 순위 변동이 크므로 참고용')
    .setFontWeight('bold').setFontColor('#0072CE');
  row++;
  const writeRank = (label, arr) => {
    sh.getRange(row, 1).setValue(label).setFontWeight('bold');
    row++;
    if (arr.length) {
      sh.getRange(row, 1, 1, 4).setValues([['FSR', '팀', '응답수', '평균']])
        .setFontWeight('bold').setBackground('#E8F0FE');
      row++;
      sh.getRange(row, 1, arr.length, 4).setValues(arr);
      row += arr.length;
    } else {
      sh.getRange(row, 1).setValue('(해당자 없음)'); row++;
    }
    row++;
  };
  writeRank('▲ 상위 5명', top5);
  writeRank('▽ 하위 5명 (참고 — 코칭 대상 아님)', bottom5);

  // 실제 코칭 검토 대상 (저점수 발생자)
  sh.getRange(row, 1).setValue('■ 코칭 검토 대상 — 저점수(문항 최저 ' + lowMaxLabel.replace('≤', '') + '점 이하) 발생 FSR')
    .setFontWeight('bold').setFontColor('#CC0000');
  row++;
  if (coachList.length) {
    sh.getRange(row, 1, 1, 4).setValues([['FSR', '팀', '저점수 건수', '구분']])
      .setFontWeight('bold').setBackground('#FCE8E6');
    row++;
    sh.getRange(row, 1, coachList.length, 4).setValues(coachList);
    row += coachList.length;
  } else {
    sh.getRange(row, 1).setValue('해당자 없음 — 저점수 응답이 발생하지 않았습니다.');
    row++;
  }
  row++;

  // 5. 저점수 응답
  sh.getRange(row, 1).setValue('5. 저점수 응답 상세 (' + lowRows.length + '건)').setFontWeight('bold').setFontColor('#CC0000');
  row++;
  if (lowRows.length) {
    sh.getRange(row, 1, 1, 6).setValues([['일시', '기관', 'FSR', '팀', '평균', '의견']])
      .setFontWeight('bold').setBackground('#FCE8E6');
    row++;
    const lr = lowRows.map(r => [
      Utilities.formatDate(new Date(r[0]), 'Asia/Seoul', 'yy-MM-dd'), r[3], r[4], r[5], r[12], r[13] || '']);
    sh.getRange(row, 1, lr.length, 6).setValues(lr);
    row += lr.length;
  } else {
    sh.getRange(row, 1).setValue('(없음)'); row++;
  }
  row++;

  // 6. 서술형 요약
  sh.getRange(row, 1).setValue('6. 서술형 의견 요약 — 심각 ' + severe.length + '건 / 개선요청 ' +
    improve.length + '건 / 칭찬 ' + praise.length + '건' +
    (misclassified.length ? ' (검수 제외 ' + misclassified.length + '건)' : ''))
    .setFontWeight('bold').setFontColor('#0072CE');
  row++;
  // 서술형응답 시트 열 위치 (열이 추가되면 여기만 고치면 된다).
  // 실제 사고: 처리상태·조치내용 2열을 추가했을 때 의견 위치가 8→10으로 밀렸는데
  // 보고서가 r[8]을 그대로 읽어 '의견' 자리에 '처리상태'가 출력됐다.
  const T = { ORG: 1, FSR: 2, TEAM: 3, AVG: 5, CLS: 6, REVIEW: 7, THEME: 10, TXT: 11 };

  // 6-1. 테마 분포 — 분류(조치 필요 여부)와 달리 "무엇에 관한 의견인가"를 보여준다.
  // 칭찬이 대부분인 기간에도 어떤 강점이 실제로 언급됐는지는 여기서만 드러난다.
  const okRows = txtCur.filter(isOk);
  const gTh = {};
  let nThemed = 0;
  okRows.forEach(r => {
    const ths = String(r[T.THEME] || '').split(',').map(s => s.trim()).filter(Boolean);
    if (ths.length) nThemed++;
    ths.forEach(t => (gTh[t] = (gTh[t] || 0) + 1));
  });
  const byTh = THEMES.map(t => t[0]).filter(k => gTh[k])
                     .map(k => [k, gTh[k], pctOf_(gTh[k], nThemed)]);
  if (byTh.length) {
    sh.getRange(row, 1).setValue('▪ 의견 테마 (내용 있는 의견 ' + nThemed + '건 기준 · 중복 포함)')
      .setFontWeight('bold');
    row++;
    sh.getRange(row, 1, 1, 3).setValues([['테마', '건수', '비율']])
      .setFontWeight('bold').setBackground('#E8F0FE');
    row++;
    sh.getRange(row, 1, byTh.length, 3).setValues(byTh);
    row += byTh.length + 1;
  }

  /* 대표 사례 선정 점수 — "감사합니다", "굳!" 같은 단문이 대표로 뽑히는 것을 막는다.
   * 길이(정보량) + 구체적 언급 키워드 + 문장 형태를 합산해 높은 순으로 고른다.
   * 실측: 74건 중 18건(24%)이 10자 이하 단문이라 정렬 없이는 대표성이 떨어진다. */
  const INFO_KW = ['신속','빠르','친절','설명','해결','꼼꼼','정확','시간약속','원인','대처','안내','이해'];
  const infoScore = (txt) => {
    const s = String(txt || '').trim();
    if (!s) return 0;
    let v = Math.min(s.length, 80) / 80 * 40;            // 길이 (최대 40점)
    INFO_KW.forEach(k => { if (s.indexOf(k) !== -1) v += 6; });  // 구체 언급
    if (/[.!?]/.test(s)) v += 5;                         // 문장 형태
    return v;
  };

  const writeTxt = (label, arr, max, rank) => {
    if (!arr.length) return;
    // 심각·개선요청은 전건을 시간순 그대로(누락 방지), 칭찬은 대표성 높은 순으로 정렬
    const list = rank ? arr.slice().sort((a, b) => infoScore(b[T.TXT]) - infoScore(a[T.TXT])) : arr;
    sh.getRange(row, 1).setValue(label).setFontWeight('bold');
    row++;
    list.slice(0, max).forEach(r => {
      const flag = String(r[T.REVIEW]).trim() === '오분류' ? ' ⚠오분류' : '';
      sh.getRange(row, 1, 1, 3).setValues([
        [r[T.FSR] + ' (' + r[T.TEAM] + ')' + flag, r[T.ORG], r[T.TXT]]]);
      row++;
    });
    row++;
  };
  writeTxt('🚨 심각 (전체)', severe, 200, false);
  writeTxt('개선요청 (전체)', improve, 200, false);
  writeTxt('칭찬 대표 사례 (정보량 상위 10건)', praise, 10, true);

  sh.setColumnWidth(1, 160); sh.setColumnWidth(2, 180); sh.setColumnWidth(3, 400);
  sh.setColumnWidths(4, 3, 100);

  // ---- 메일 요약 ----
  const mailBody =
    '[' + period.label + ' 방문 서비스 만족도 요약]\n\n' +
    '· 응답 수: ' + cur.length + '건' + (prev.length ? ' (전기 ' + prev.length + '건)' : '') + '\n' +
    '· 응답률: ' + responseRate + '\n' +
    '· 종합 만족도: ' + cTotal + ' / 5.0' + (pTotal ? ' (전기 대비 ' + diff(cTotal, pTotal) + ')' : '') + '\n' +
    '· 문항별: 신속성 ' + cQ[0] + ' / 전문성 ' + cQ[1] + ' / 응대 ' + cQ[2] + '\n' +
    '· 팀별 1위: ' + (byTeam[0] ? byTeam[0][0] + ' (' + byTeam[0][2] + '점)' : '-') + '\n' +
    '· 저점수 응답: ' + lowRows.length + '건 / 서술형 심각: ' + severe.length + '건\n\n' +
    '상세 내용은 스프레드시트의 "' + period.sheetName + '" 시트를 확인하세요.';

  return { mailBody: mailBody };
}

/* 스프레드시트 메뉴 */
/* ====================== 시트 정리 (보기 편하게) ======================
 * 시트가 14개 이상으로 늘어 실무에서 찾기 어렵다는 의견에 따라 추가.
 * "참조용" 시트를 숨겨 탭 수를 줄이고, 자주 보는 순서로 재배치한다.
 * 숨긴 시트도 코드는 정상적으로 읽으므로 동작에는 전혀 영향이 없다.
 * (탭 우클릭 → "숨기기 취소"로 언제든 다시 볼 수 있다.) */

/* 사용자가 직접 볼 일이 거의 없는 참조·원본 시트 */
const HIDE_SHEETS = [
  SHEETS.CRM,                  // CRM 내보내기 원본 — 가져오기 후에는 볼 일 없음
  SHEETS.ACCOUNT_REGION,       // 거래처지역 — 정적 참조 자료
  SHEETS.ACCOUNT_REGION_ALL,   // 설치이력 — 정적 참조 자료
  SHEETS.ROSTER,               // FSR명단 — 인사이동 때만 수정
];
// 참고: 정제데이터는 숨기지 않는다. 기관명상태(표준화/자동매칭/DB미등록) 확인 등
// 거래처 매핑 점검에 자주 쓰이므로 실무상 상시 접근이 필요하다.

/* 자주 보는 순서 (왼쪽부터). 목록에 없는 시트는 뒤에 그대로 둔다. */
const SHEET_ORDER = [
  SHEETS.DASH,          // 매일: 전체 현황
  SHEETS.RANK,          // 매일: 개인별 순위
  SHEETS.TEXT,          // 주 1회: 서술형 검수
  SHEETS.FUZZY_REVIEW,  // 주 1회: 유사매칭 승인
  SHEETS.CLEAN,         // 수시: 거래처 매핑(기관명상태) 확인
  SHEETS.VISITS,        // 월 1회: 방문건수
  SHEETS.DB,            // 필요 시: 기관명 매핑
];

function organizeSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  let hidden = 0, moved = 0;

  // 1) 참조용 시트 숨기기 — 활성 시트는 숨길 수 없으므로 먼저 대시보드로 이동
  const dash = ss.getSheetByName(SHEETS.DASH);
  if (dash) ss.setActiveSheet(dash);

  HIDE_SHEETS.forEach(name => {
    const sh = ss.getSheetByName(name);
    if (sh && !sh.isSheetHidden()) { sh.hideSheet(); hidden++; }
  });

  // 2) 자주 보는 순서로 재배치 (월별보고 시트는 건드리지 않고 뒤에 남긴다)
  SHEET_ORDER.forEach((name, i) => {
    const sh = ss.getSheetByName(name);
    if (!sh || sh.isSheetHidden()) return;
    ss.setActiveSheet(sh);
    ss.moveActiveSheet(i + 1);
    moved++;
  });
  if (dash) ss.setActiveSheet(dash);

  ui.alert(
    '✅ 시트 정리 완료\n\n' +
    '· 숨긴 시트: ' + hidden + '개 (참조·원본용)\n' +
    '· 재배치: ' + moved + '개 (자주 보는 순서)\n\n' +
    '숨긴 시트도 시스템은 정상적으로 읽습니다.\n' +
    '다시 보려면 탭 영역 우클릭 → "숨기기 취소"를 선택하세요.');
}

/* 숨긴 시트를 모두 다시 표시 */
function showAllSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let shown = 0;
  ss.getSheets().forEach(sh => {
    if (sh.isSheetHidden()) { sh.showSheet(); shown++; }
  });
  alert_('✅ 숨긴 시트 ' + shown + '개를 다시 표시했습니다.');
}

/* ====== FSR명단 시트를 코드의 ROSTER로 갱신 (진급·인사이동 반영) ======
 * buildRosterSheet_는 시트가 이미 있으면 손대지 않는다(수동 수정 보호).
 * 그래서 코드의 ROSTER만 고치면 기존 시트에는 반영되지 않는다 —
 * 진급이 있었는데도 옛 직급으로 집계되는 일이 실제로 생긴다.
 * 이 함수는 명시적으로 실행할 때만 시트를 코드 기준으로 덮어쓴다. */
function syncRosterSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  const sh = ss.getSheetByName(SHEETS.ROSTER);

  // 현재 시트와 코드 ROSTER를 비교해 바뀌는 사람만 추린다
  const diffs = [];
  if (sh && sh.getLastRow() > 1) {
    const cur = {};
    sh.getRange(2, 1, sh.getLastRow() - 1, 4).getValues().forEach(r => {
      if (r[3]) cur[String(r[3]).trim()] = { team: String(r[1]).trim(), grade: String(r[2]).trim() };
    });
    ROSTER.forEach(r => {
      const name = r[3], c = cur[name];
      if (!c) { diffs.push('+ ' + name + ' (신규 ' + r[1] + '/' + r[2] + ')'); return; }
      if (c.grade !== r[2]) diffs.push('· ' + name + ' 직급 ' + c.grade + ' → ' + r[2]);
      if (c.team !== r[1])  diffs.push('· ' + name + ' 팀 ' + c.team + ' → ' + r[1]);
    });
    Object.keys(cur).forEach(name => {
      if (!ROSTER.some(r => r[3] === name)) diffs.push('- ' + name + ' (명단에서 제외됨)');
    });
  }

  if (sh && sh.getLastRow() > 1 && !diffs.length) {
    alert_('FSR명단 시트가 이미 코드와 같습니다. 변경할 내용이 없습니다.');
    return;
  }

  const res = ui.alert('FSR명단 시트 갱신',
    (diffs.length ? '아래 ' + diffs.length + '건이 변경됩니다.\n\n' + diffs.join('\n') + '\n\n'
                  : '시트를 새로 만듭니다.\n\n') +
    '시트에 직접 입력한 내용이 있다면 덮어써집니다. 계속할까요?',
    ui.ButtonSet.OK_CANCEL);
  if (res !== ui.Button.OK) return;

  const target = sh || ss.insertSheet(SHEETS.ROSTER);
  target.clear();
  target.getRange('A1:D1').setValues([['번호', '팀', '직급', '성명']])
    .setFontWeight('bold').setBackground('#003087').setFontColor('#FFFFFF');
  target.getRange(2, 1, ROSTER.length, 4).setValues(ROSTER);
  target.setFrozenRows(1);
  target.setColumnWidths(1, 4, 110);

  alert_('✅ FSR명단 시트를 갱신했습니다 (' + ROSTER.length + '명).\n\n' +
    (diffs.length ? diffs.join('\n') + '\n\n' : '') +
    '이어서 "🔄 전체 갱신"을 실행하면 집계에 반영됩니다.');
}

/* ====== 검수결과 일괄 정리 (분류 로직을 바꾼 뒤 1회 실행) ======
 * 왜 필요한가: 관리자가 "오분류"로 표시한 판정은 "그 당시의 자동 분류가 틀렸다"는
 * 뜻이다. 분류 로직을 개선하면 그중 상당수는 이미 바르게 분류되지만 표시는 남는다.
 * 우리 집계는 '오분류' 건을 제외하므로, 남은 표시가 **올바르게 분류된 건까지
 * 계속 제외**하게 된다(실측: 오분류 20건 중 15건이 로직 개선으로 해소됨).
 *
 * 그래서 '오분류' 표시만 비운다. '정확' 표시는 집계에 영향을 주지 않으므로 그대로 둔다.
 * 비운 뒤에는 새 분류 기준으로 다시 검토하면 된다(대개 몇 건만 남는다). */
function clearMisclassifiedMarks() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  const sh = ss.getSheetByName(SHEETS.TEXT);
  if (!sh || sh.getLastRow() < 2) {
    alert_('"' + SHEETS.TEXT + '" 시트에 데이터가 없습니다.');
    return;
  }

  const head = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0].map(v => String(v).trim());
  const iReview = head.indexOf('검수결과');
  const iCls = head.indexOf('분류');
  const iTxt = head.indexOf('서술형 의견');
  if (iReview < 0) { alert_('"검수결과" 열을 찾지 못했습니다.'); return; }

  const last = sh.getLastRow();
  const vals = sh.getRange(2, 1, last - 1, sh.getLastColumn()).getValues();
  const targets = [];
  vals.forEach((r, i) => {
    if (String(r[iReview]).trim() === '오분류') {
      targets.push({
        row: i + 2,
        cls: iCls >= 0 ? String(r[iCls]).trim() : '',
        txt: iTxt >= 0 ? String(r[iTxt]).trim() : '',
      });
    }
  });

  if (!targets.length) {
    alert_('정리할 "오분류" 표시가 없습니다.');
    return;
  }

  const preview = targets.slice(0, 10)
    .map(t => '· [' + t.cls + '] ' + t.txt.slice(0, 30)).join('\n');
  const res = ui.alert('검수결과 정리',
    '"오분류" 표시 ' + targets.length + '건을 비웁니다.\n' +
    '(분류 로직이 바뀌어 예전 판정의 근거가 달라졌기 때문입니다)\n\n' +
    preview + (targets.length > 10 ? '\n… 외 ' + (targets.length - 10) + '건' : '') +
    '\n\n"정확" 표시와 처리상태·조치내용은 그대로 유지됩니다.\n계속할까요?',
    ui.ButtonSet.OK_CANCEL);
  if (res !== ui.Button.OK) return;

  targets.forEach(t => sh.getRange(t.row, iReview + 1).clearContent());

  alert_('✅ "오분류" 표시 ' + targets.length + '건을 비웠습니다.\n\n' +
    '새 분류 기준으로 다시 검토해 주세요.\n' +
    '집계에서 제외하려면 해당 행의 검수결과를 다시 "오분류"로 지정하면 됩니다.');
}

/* 방문수·응답률이 '-'로만 나올 때 원인을 눈으로 확인하는 진단 기능.
 * loadFsrVisits_가 시트에서 실제로 무엇을 읽는지 단계별로 보여준다. */
function diagnoseFsrVisits() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEETS.VISITS);
  const out = [];

  if (!sh) {
    alert_('❌ "' + SHEETS.VISITS + '" 시트를 찾을 수 없습니다.');
    return;
  }
  out.push('시트: ' + sh.getName());
  out.push('마지막 행: ' + sh.getLastRow() + ' / 마지막 열: ' + sh.getLastColumn());

  const head = sh.getRange(2, 1, 1, sh.getLastColumn()).getValues()[0].map(monthKey_);
  out.push('');
  out.push('[2행 머리글]');
  head.forEach((h, i) => { if (h) out.push('  ' + (i + 1) + '열: "' + h + '"'); });

  const startCol = head.indexOf('FSR') + 1;
  out.push('');
  out.push("'FSR' 머리글 위치: " + (startCol > 0 ? startCol + '열' : '❌ 찾지 못함'));
  if (startCol < 1) {
    out.push('→ CRM 방문건수 가져오기를 먼저 실행해야 합니다.');
    alert_(out.join('\n'));
    return;
  }

  const monthCols = [];
  for (let i = startCol; i <= head.length; i++) {
    if (/^\d{4}-\d{2}$/.test(head[i - 1])) monthCols.push({ col: i, month: head[i - 1] });
  }
  out.push('월 열: ' + (monthCols.length ? monthCols.map(m => m.month + '(' + m.col + '열)').join(', ') : '❌ 없음'));
  if (!monthCols.length) {
    alert_(out.join('\n'));
    return;
  }

  const map = loadFsrVisits_(ss);
  const keys = Object.keys(map);
  out.push('');
  out.push('읽어온 FSR 수: ' + keys.length + '명');
  out.push('샘플: ' + keys.slice(0, 5).map(k => k + '=' + map[k]).join(', '));

  // 개인별순위에 실제로 쓰이는 이름과 대조
  const clean = ss.getSheetByName(SHEETS.CLEAN);
  if (clean && clean.getLastRow() > 1) {
    const names = {};
    clean.getRange(2, 5, clean.getLastRow() - 1, 1).getValues()
      .forEach(r => { const n = String(r[0]).trim(); if (n) names[n] = true; });
    const sample = Object.keys(names).slice(0, 5);
    out.push('');
    out.push('[이름 대조 — 정제데이터 기준]');
    sample.forEach(n => {
      out.push('  "' + n + '" → 방문수 ' + (map[norm_(n)] !== undefined ? map[norm_(n)] + '건 ✅' : '없음 ❌'));
    });
  }

  alert_(out.join('\n'));
}

/* ====================== 전체 갱신 (버튼 하나로 일괄 실행) ======================
 * CRM 데이터를 새로 붙여넣거나 기관명 매칭을 승인한 뒤, 메뉴를 여러 번 눌러야 했던 것을
 * 한 번에 처리한다. 실행 순서가 중요하다:
 *   ① 유사매칭 승인 반영 — 관리자가 승인한 기관명을 먼저 기관명DB에 반영해야
 *      이후 정제 단계에서 올바른 표준명으로 매칭된다.
 *   ② 기관명DB 시딩 — CRM 거래처 중 DB에 없는 기관을 채운다.
 *   ③ CRM 방문건수 가져오기 — 응답률 분모를 갱신한다(내부에서 대시보드도 갱신).
 *   ④ 대시보드 새로고침 — 위 결과를 모두 반영해 최종 재계산한다.
 * 각 단계의 팝업은 모아 두었다가 마지막에 한 번만 보여준다. */
/* 2026-10-27 v5: 6분 제한 대응
 *  ① CRM 파일은 한 번만 읽는다(CRM_MEMO_) ② CRM 파일(이름+수정시각)이 지난번 처리 때와 같으면 CRM 두 단계를 건너뛴다
 *     (강제로 다시 읽으려면 메뉴 「🔄 전체 갱신 — CRM 다시 읽기」) ③ 단계별 걸린 시간을 기억해 두었다가, 남은 시간이
 *     모자라 보이면 그 단계부터는 1분 뒤 새 실행에서 이어서 한다(트리거 resumeUpdateStepsTrigger). */
const UPD_STEPS_ = [
  { key: 'fuzzy',   label: '유사매칭 승인 반영',     crm: false, fn: () => applyApprovedFuzzyMappings() },
  { key: 'seed',    label: '기관명DB 채우기',        crm: true,  fn: () => seedOrgDbFromCrm() },
  { key: 'import',  label: 'CRM 방문건수 가져오기',  crm: true,  fn: () => importCrmVisits() },
  { key: 'refresh', label: '대시보드 새로고침',      crm: false, fn: () => refreshDashboard() },
  { key: 'push',    label: 'Firebase 내보내기',      crm: false, fn: () => pushDashboardToFirebase() },   // 공개 대시보드(GitHub Pages)용 — 연동 설정 전이면 건너뜀
];
const UPD_BUDGET_MS_ = 255 * 1000;   // Apps Script 실행 제한 360초에서 여유를 둔 값
const UPD_CRM_COLS_ = ['상태', '양식 타입', '시작 시간', '담당자', '약속/활동 목적', '거래처'];   // seed·import 가 쓰는 열의 합집합
function updJson_(key, dflt) { try { return JSON.parse(PropertiesService.getScriptProperties().getProperty(key) || 'null') || dflt; } catch (e) { return dflt; } }

function runUpdateSteps_(opts) {
  opts = opts || {};
  const started = Date.now();
  const props = PropertiesService.getScriptProperties();
  const timing = updJson_('UPD_STEP_SEC', {});          // 단계별 지난번 걸린 시간(초)
  const only = opts.only || null;                        // 이어서 실행할 때 남은 단계 키
  UI_SILENT = true;
  UI_LOG.length = 0;
  const steps = [], deferred = [];
  sweepStaleTemps_();   // 지난번에 끊기며 남은 임시 변환 파일 정리
  let sig = null;
  try {
    const todo = UPD_STEPS_.filter(st => !only || only.indexOf(st.key) >= 0);
    // CRM 파일이 지난번 처리 때와 같으면 CRM 두 단계는 할 일이 없다
    let skipCrm = false;
    if (todo.some(st => st.crm)) {
      try { const as = crmAutoState_(); sig = as.sig || null; } catch (e) { sig = null; }
      skipCrm = !opts.force && !!sig && props.getProperty('CRM_STEPS_SIG') === sig;
    }
    // 읽어야 하면 먼저 변환 캐시를 채우고(느린 일 — 시간이 모자라면 CRM 단계부터 다음 실행으로), 한 번만 읽어 둔다
    let warmPending = false;
    if (todo.some(st => st.crm) && !skipCrm) {
      warmPending = crmWarmCache_(UPD_BUDGET_MS_ - (Date.now() - started)).pending;
      if (!warmPending) crmMemoPrefetch_(UPD_CRM_COLS_);
    }
    let crmOk = opts.crmOk !== false, crmRan = false;   // 이어서 실행할 때는 앞 실행의 CRM 결과를 이어받는다
    todo.forEach(st => {
      if (st.crm && skipCrm) { steps.push('⏭ ' + st.label + ' — CRM 파일 변경 없음(건너뜀)'); return; }
      if (st.crm && warmPending) { deferred.push(st.key); return; }   // 변환이 아직 덜 끝남
      const est = (timing[st.key] || 0) * 1000 * 1.25;
      if (steps.length + deferred.length > 0 && Date.now() - started + est > UPD_BUDGET_MS_) { deferred.push(st.key); return; }
      if (deferred.length) { deferred.push(st.key); return; }   // 순서가 중요하므로 한 단계라도 미루면 뒤는 모두 미룬다
      const t0 = Date.now(), logFrom = UI_LOG.length;
      props.setProperty('UPD_PROGRESS', JSON.stringify({ step: st.label, at: crmNowStr_() }));   // 끊겨도 어느 단계였는지 남는다
      crmToast_('진행 중: ' + st.label);
      let bad = false;
      try { st.fn(); steps.push('✅ ' + st.label); }
      catch (err) { bad = true; steps.push('⚠️ ' + st.label + ' — ' + err.message); }   // 한 단계가 실패해도 나머지는 계속 진행한다
      if (UI_LOG.slice(logFrom).some(m => /^❌|⚠️/.test(String(m)))) bad = true;
      const sec = Math.round((Date.now() - t0) / 1000);
      timing[st.key] = sec;
      steps[steps.length - 1] += ' (' + sec + '초)';
      if (st.crm) { crmRan = true; if (bad) crmOk = false; }
    });
    const crmDeferred = deferred.some(k => UPD_STEPS_.filter(x => x.key === k)[0].crm);
    if (crmRan && crmOk && !crmDeferred && sig) props.setProperty('CRM_STEPS_SIG', sig);   // CRM 두 단계가 모두 끝나 성공했을 때만 기억한다
    props.setProperty('UPD_STEP_SEC', JSON.stringify(timing));
    if (deferred.length) {
      props.setProperty('UPD_RESUME', JSON.stringify({ keys: deferred, at: crmNowStr_(), crmOk: crmOk }));
      ScriptApp.getProjectTriggers().forEach(t => { if (t.getHandlerFunction() === 'resumeUpdateStepsTrigger') ScriptApp.deleteTrigger(t); });
      ScriptApp.newTrigger('resumeUpdateStepsTrigger').timeBased().after(60 * 1000).create();
      steps.push('⏸ 시간이 모자라 1분 뒤 자동으로 이어서 합니다: ' + deferred.map(k => UPD_STEPS_.filter(x => x.key === k)[0].label).join(' → '));
    } else { props.deleteProperty('UPD_RESUME'); props.deleteProperty('UPD_RESUME_N'); }
    props.setProperty('UPD_PROGRESS', JSON.stringify({ done: true, at: crmNowStr_() }));
  } finally {
    // 예기치 못한 오류로 중단되더라도 플래그는 반드시 되돌린다.
    // 켜진 채 남으면 이후 모든 알림이 화면에 뜨지 않아 원인 파악이 어려워진다.
    UI_SILENT = false;
    CRM_MEMO_ = null;
  }
  return { steps: steps, log: UI_LOG.slice(), sec: Math.round((Date.now() - started) / 1000), deferred: deferred };
}

/* 시간 부족으로 미룬 단계를 새 실행에서 이어서 한다(시간 트리거 진입점). 끝나면 트리거를 스스로 지운다. */
function resumeUpdateStepsTrigger() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) return;
  const props = PropertiesService.getScriptProperties();
  try {
    ScriptApp.getProjectTriggers().forEach(t => { if (t.getHandlerFunction() === 'resumeUpdateStepsTrigger') ScriptApp.deleteTrigger(t); });
    const pend = updJson_('UPD_RESUME', null);
    if (!pend || !pend.keys || !pend.keys.length) return;
    const tries = (Number(props.getProperty('UPD_RESUME_N')) || 0) + 1;
    if (tries > 8) { props.deleteProperty('UPD_RESUME'); props.deleteProperty('UPD_RESUME_N'); crmAutoMail_('전체 갱신(이어서 실행)이 끝나지 않음', ['8번 이어서 실행했지만 끝나지 않아 멈췄습니다.', '남은 단계: ' + pend.keys.join(', '), '시트 메뉴 「🔄 전체 갱신」을 직접 실행해 확인해 주세요.']); return; }
    props.setProperty('UPD_RESUME_N', String(tries));
    props.deleteProperty('UPD_RESUME');
    const r = runUpdateSteps_({ only: pend.keys, crmOk: pend.crmOk });
    const failed = r.steps.some(x => x.indexOf('⚠️') === 0) || r.log.some(m => /^❌|⚠️/.test(String(m)));
    props.setProperty('CRM_AUTO_LAST', JSON.stringify({ at: crmNowStr_(), ok: !failed, note: '이어서 실행', sec: r.sec, steps: r.steps, log: r.log.map(m => String(m).split('\n')[0]).slice(0, 8) }));
    if (failed) crmAutoMail_('전체 갱신(이어서 실행) 오류', ['남은 단계를 이어서 실행하다 문제가 있었습니다.', ''].concat(r.steps).concat(r.log.map(m => String(m).split('\n')[0]).slice(0, 8)));
  } catch (err) {
    crmAutoMail_('전체 갱신(이어서 실행) 오류', [String(err && err.message || err)]);
  } finally { lock.releaseLock(); }
}

function runAllUpdatesForce() { runAllUpdates({ force: true }); }   // 메뉴용: CRM 파일이 그대로여도 CRM 단계를 다시 한다
function runAllUpdates(opts) {
  const ui = SpreadsheetApp.getUi();
  const r = runUpdateSteps_({ force: !!(opts && opts.force === true) });   // 메뉴가 넘기는 이벤트 객체는 쓰지 않는다

  let msg = '전체 갱신 완료 (' + r.sec + '초)\n\n' + r.steps.join('\n');
  if (r.log.length) {
    // 각 단계가 남긴 안내문 중 핵심만 덧붙인다(너무 길어지지 않도록 앞부분만).
    msg += '\n\n──── 상세 ────\n' +
           r.log.map(m => m.split('\n')[0]).join('\n');
  }
  ui.alert(msg);
}


/* ============ 저점수 후속 조치 — FS 포털 → 「저점수조치」 시트 ============
 * 2026-11-12 사용자 결정: 조치 사유·내용은 FS 포털(talk/vocfu)에서 적고,
 * 이 시트는 그 값을 받아 적는 거울이다. 시트에서 고쳐도 다음 동기화 때 덮어쓴다.
 * (정본이 둘이면 갈라지므로 입력은 포털 한 곳에서만 한다.)
 *
 * 서술형응답 시트를 쓰지 않는 이유: 그 시트는 의견이 있는 응답만 들어가서,
 * 3점 이하인데 서술형을 안 남긴 응답은 적을 칸이 없다.
 *
 * 최초 1회: setupLowFollowSync() 실행 → FS 포털 DB 주소·비밀 입력 → 시험 동기화 → 트리거 설치
 *   FSTALK_URL    : https://fs-talk-fa383-default-rtdb.asia-southeast1.firebasedatabase.app (끝에 / 없이)
 *   FSTALK_SECRET : 그 프로젝트의 데이터베이스 보안 비밀 (만족도 쪽 FIREBASE_SECRET 과 다른 값)
 */
const LOWFU = {
  SHEET: '저점수조치',
  URL_KEY: 'FSTALK_URL',
  SECRET_KEY: 'FSTALK_SECRET',
};

/* 포털 index.html 의 VOC_REASONS 와 글자 그대로 같아야 한다.
 * 한쪽만 고치면 시트 집계에 없는 사유가 들어온다. */
const VOC_REASONS = ['조치 지연', '재방문 발생', '부품 수급', '설명·안내 부족',
                     '장비 상태', '응대 태도', '고객 착오', '기타'];

const LOWFU_HEAD = ['응답일시', '기관명', '담당FSR', '팀', '최저점', '신속', '전문', '응대',
                    '서술형 의견', '처리상태', '사유', '조치 내용', '기록자', '완료일시', '키'];

/* 포털 vocKey 와 같은 해시(FNV-1a 32bit → base36).
 * 포털: [r.fsr, r.org, r.ts].join('|') — 순서·구분자·공백까지 같아야 맞는다.
 * ts 는 정제데이터 '응답일시'를 'yyyy-MM-dd HH:mm' 으로 (Firebase 내보내기 fmtTs 와 동일),
 * org 는 '기관명(표준)', fsr 은 '담당FSR'. */
function vocKeyOf_(fsr, org, ts) {
  const s = [fsr, org, ts].join('|');
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return 'v' + (h >>> 0).toString(36);
}

/* 정제데이터의 저점수 행을 뽑는다 — 판정은 응답 접수일 기준(isLowRow_)이라
 * 11/1 전 응답은 ≤2, 그 뒤는 ≤3 으로 센다. 보고서·대시보드와 같은 기준이다. */
function lowFollowRows_(ss) {
  const cs = ss.getSheetByName(SHEETS.CLEAN);
  if (!cs || cs.getLastRow() < 2) return [];
  const vals = cs.getDataRange().getValues();
  const head = vals[0].map(String);
  const ix = n => head.indexOf(n);
  const c = { ts: ix('응답일시'), org: ix('기관명(표준)'), fsr: ix('담당FSR'), team: ix('팀'),
              q1: ix('신속성·일정'), q2: ix('전문성·해결'), q3: ix('응대·마무리'),
              comment: ix('서술형의견') };
  const tz = ss.getSpreadsheetTimeZone() || 'Asia/Seoul';
  const fmt = v => (v instanceof Date)
    ? Utilities.formatDate(v, tz, 'yyyy-MM-dd HH:mm')
    : String(v || '').trim();
  const out = [];
  for (let i = 1; i < vals.length; i++) {
    const r = vals[i];
    if (!isLowRow_(r)) continue;
    const ts = fmt(r[c.ts]);
    if (!ts) continue;
    const org = String(r[c.org] || '').trim(), fsr = String(r[c.fsr] || '').trim();
    const q1 = Number(r[c.q1]) || 0, q2 = Number(r[c.q2]) || 0, q3 = Number(r[c.q3]) || 0;
    out.push({
      key: vocKeyOf_(fsr, org, ts), ts: ts, org: org, fsr: fsr,
      team: String(r[c.team] || '').trim(),
      low: Math.min(q1, q2, q3), q1: q1, q2: q2, q3: q3,
      comment: String(r[c.comment] || '').trim(),
    });
  }
  out.sort((a, b) => a.ts < b.ts ? 1 : a.ts > b.ts ? -1 : 0);   // 최근 응답이 위로
  return out;
}

/* FS 포털 DB 읽기 (읽기 전용 — 포털 데이터는 이 스크립트가 쓰지 않는다) */
function fsTalkGet_(path) {
  const p = PropertiesService.getScriptProperties();
  const url = (p.getProperty(LOWFU.URL_KEY) || '').replace(/\/+$/, '');
  const secret = p.getProperty(LOWFU.SECRET_KEY) || '';
  if (!url || !secret) throw new Error('FS 포털 연동이 설정되지 않았습니다 — 메뉴 「저점수 조치: FS 포털 연동 설정」을 먼저 실행하세요.');
  const res = UrlFetchApp.fetch(url + '/' + path + '.json?auth=' + encodeURIComponent(secret),
    { muteHttpExceptions: true });
  const code = res.getResponseCode();
  if (code !== 200) throw new Error('FS 포털 읽기 실패 (' + code + ')');
  return JSON.parse(res.getContentText() || 'null');
}

function buildLowFollowSheet_(ss) {
  let sh = ss.getSheetByName(LOWFU.SHEET);
  if (!sh) sh = ss.insertSheet(LOWFU.SHEET);
  if (sh.getLastRow() < 1 || String(sh.getRange(1, 1).getValue()) !== LOWFU_HEAD[0]) {
    sh.clear();
    sh.getRange(1, 1, 1, LOWFU_HEAD.length).setValues([LOWFU_HEAD])
      .setFontWeight('bold').setBackground('#003087').setFontColor('#FFFFFF');
    sh.setFrozenRows(1);
    [140, 170, 80, 90, 55, 50, 50, 50, 320, 80, 110, 360, 80, 140, 90]
      .forEach((w, i) => sh.setColumnWidth(i + 1, w));
    sh.hideColumns(LOWFU_HEAD.length);   // '키'는 대조용이라 평소에는 숨긴다
  }
  return sh;
}

/* FS 포털의 조치 기록을 시트로 옮긴다. 바뀐 행만 쓴다. */
function syncLowFollowFromPortal_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const rows = lowFollowRows_(ss);
  const fu = fsTalkGet_('talk/vocfu') || {};
  const tz = ss.getSpreadsheetTimeZone() || 'Asia/Seoul';
  const when = ms => ms ? Utilities.formatDate(new Date(Number(ms)), tz, 'yyyy-MM-dd HH:mm') : '';
  const label = { doing: '조치 중', done: '조치 완료' };

  const want = rows.map(r => {
    const f = fu[r.key] || {};
    return [r.ts, r.org, r.fsr, r.team, r.low, r.q1, r.q2, r.q3, r.comment,
            label[f.s] || '미확인', f.r || '', f.t || '', f.by || '', when(f.at || 0), r.key];
  });

  const sh = buildLowFollowSheet_(ss);
  const last = sh.getLastRow();
  const have = last > 1 ? sh.getRange(2, 1, last - 1, LOWFU_HEAD.length).getValues() : [];

  // 줄어들었으면 남은 줄을 먼저 지운다(응답이 삭제·수정되어 저점수에서 빠진 경우)
  if (have.length > want.length) sh.getRange(want.length + 2, 1, have.length - want.length, LOWFU_HEAD.length).clearContent();

  let changed = 0;
  for (let i = 0; i < want.length; i++) {
    const a = want[i], b = have[i];
    if (b && a.every((v, j) => String(v) === String(b[j]))) continue;
    sh.getRange(i + 2, 1, 1, LOWFU_HEAD.length).setValues([a]);
    changed++;
  }

  const done = want.filter(r => r[9] === '조치 완료').length;
  return { total: want.length, done: done, changed: changed };
}

/* 메뉴용 — 결과를 알려 준다 */
function syncLowFollow() {
  try {
    const r = syncLowFollowFromPortal_();
    alert_('✅ 저점수 조치 동기화 완료\n\n' +
      '· 저점수 응답: ' + r.total + '건 (조치 완료 ' + r.done + '건)\n' +
      '· 이번에 바뀐 줄: ' + r.changed + '개\n\n' +
      '사유·조치 내용은 FS 포털에서 적습니다. 이 시트에서 고쳐도 다음 동기화 때 덮어써집니다.');
  } catch (err) {
    alert_('⚠️ 저점수 조치 동기화 실패\n\n' + err.message);
  }
}

/* 최초 1회 설정 */
function setupLowFollowSync() {
  const ui = SpreadsheetApp.getUi();
  const p = PropertiesService.getScriptProperties();
  const u = ui.prompt('FS 포털 DB 주소',
    '예: https://fs-talk-fa383-default-rtdb.asia-southeast1.firebasedatabase.app\n(끝에 / 없이)',
    ui.ButtonSet.OK_CANCEL);
  if (u.getSelectedButton() !== ui.Button.OK) return;
  const s = ui.prompt('FS 포털 데이터베이스 보안 비밀',
    'Firebase 콘솔 → fs-talk-fa383 → 프로젝트 설정 → 서비스 계정 → 데이터베이스 보안 비밀',
    ui.ButtonSet.OK_CANCEL);
  if (s.getSelectedButton() !== ui.Button.OK) return;
  p.setProperty(LOWFU.URL_KEY, u.getResponseText().trim().replace(/\/+$/, ''));
  p.setProperty(LOWFU.SECRET_KEY, s.getResponseText().trim());

  try {
    const r = syncLowFollowFromPortal_();
    ScriptApp.getProjectTriggers()
      .filter(t => t.getHandlerFunction() === 'syncLowFollowFromPortal_')
      .forEach(t => ScriptApp.deleteTrigger(t));
    ScriptApp.newTrigger('syncLowFollowFromPortal_').timeBased().everyHours(1).create();
    alert_('✅ FS 포털 연동 완료\n\n· 저점수 응답 ' + r.total + '건을 「' + LOWFU.SHEET + '」 시트에 옮겼습니다.\n' +
      '· 1시간마다 자동으로 다시 받아옵니다.');
  } catch (err) {
    p.deleteProperty(LOWFU.SECRET_KEY);
    alert_('⚠️ 연결 실패 — 주소·비밀을 다시 확인해 주세요.\n\n' + err.message);
  }
}


function crmHubId_() {
  const raw = String(CONFIG.HUB_SHEET || PropertiesService.getScriptProperties().getProperty('HUB_SHEET') || '').trim();
  if (!raw) return '';
  const m = raw.match(/\/spreadsheets\/d\/([A-Za-z0-9_-]+)/);
  return m ? m[1] : raw;
}
var CRM_LAST_SRC_ = '';   // 이번 실행에서 실제로 읽은 원본 설명(알림·진단에 표시)
function crmSourceLabel_() {
  if (CRM_LAST_SRC_) return CRM_LAST_SRC_;
  return crmHubId_() ? '월간보고 허브 시트 ' + CONFIG.HUB_CRM_TAB + ' 탭' : '이 시트의 ' + SHEETS.CRM + ' 탭';
}

/* ---- Drive 폴더 CRM_원본 (2026-10-26) ---- */
function crmFolderSpec_() { return String(PropertiesService.getScriptProperties().getProperty('CRM_FOLDER') || CONFIG.CRM_FOLDER || '').trim(); }
/* → {folder} 또는 {none:'이유'}(폴더를 안 쓰거나 못 찾음 → 다음 원본으로) 또는 {error:'메시지'}(같은 이름 폴더가 여럿 등 → 사용자가 고쳐야 함) */
function crmFindFolder_() {
  const spec = crmFolderSpec_();
  if (!spec || spec === '-') return { none: '폴더를 쓰지 않음' };
  const m = spec.match(/\/folders\/([A-Za-z0-9_-]{10,})/);
  const id = m ? m[1] : (/^[A-Za-z0-9_-]{25,}$/.test(spec) ? spec : '');
  if (id) {
    try { return { folder: DriveApp.getFolderById(id) }; }
    catch (e) { return { error: 'CRM 폴더를 ID로 열 수 없습니다: ' + spec + '\n' + e.message }; }
  }
  const it = DriveApp.getFoldersByName(spec);
  if (!it.hasNext()) return { none: 'Drive에 "' + spec + '" 폴더가 없음' };
  const f = it.next();
  if (it.hasNext()) return { error: '"' + spec + '" 이름의 폴더가 여러 개입니다. 메뉴 「CRM 폴더 지정…」에 폴더 URL을 넣어 하나를 지정해 주세요.' };
  return { folder: f };
}
function crmFileDateKey_(name) {
  const s = String(name || ''), m = s.match(/(20\d{2})[-_.](\d{1,2})[-_.](\d{1,2})(?!\d)/) || s.match(/(20\d{2})(\d{2})(\d{2})(?!\d)/);
  if (!m) return null;
  const y = +m[1], mo = +m[2], d = +m[3];
  if (mo < 1 || mo > 12 || d < 1 || d > 31) return null;
  return y + '-' + (mo < 10 ? '0' + mo : mo) + '-' + (d < 10 ? '0' + d : d);
}
/* 폴더에서 활동 파일 후보를 모아 가장 새 날짜(파일명 날짜 → 수정 시각)의 파일들을 돌려준다. 같은 날짜가 여럿이면 전부(기간을 나눠 내보낸 경우). */
function crmPickActFiles_(candidates) {
  const acts = candidates.filter(c => /약속|활동|activit/i.test(c.name) && !/케이스|case|serial|시리얼|자산|캘린더|calendar/i.test(c.name));
  if (!acts.length) return [];
  const newer = (a, b) => (a.dateKey && b.dateKey && a.dateKey !== b.dateKey) ? a.dateKey > b.dateKey : ((!!a.dateKey !== !!b.dateKey) ? !!a.dateKey : a.updated > b.updated);
  let best = acts[0]; acts.forEach(c => { if (newer(c, best)) best = c; });
  return best.dateKey ? acts.filter(c => c.dateKey === best.dateKey).sort((a, b) => a.name < b.name ? -1 : 1) : [best];
}
function crmListFiles_(folder) {
  const OK = { 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 1, 'application/vnd.ms-excel': 1, 'application/vnd.google-apps.spreadsheet': 1, 'text/csv': 1 };
  const out = [], it = folder.getFiles();
  while (it.hasNext()) {
    const f = it.next(), name = f.getName();
    if (!OK[f.getMimeType()] || /^\[(임시변환|CRM변환캐시)\]/.test(name) || /^~\$/.test(name)) continue;
    // 설명에 sha256 과 'PC 업로드' 가 있으면 uploadCore_ 가 크기·체크섬을 확인하고 만든 완전한 파일이다
    let desc = ''; try { desc = String(f.getDescription() || ''); } catch (e) {}
    out.push({ file: f, name: name, mime: f.getMimeType(), updated: f.getLastUpdated().getTime(),
               dateKey: crmFileDateKey_(name), verified: /^sha256:[0-9a-f]{64} · PC 업로드/.test(desc) });
  }
  return out;
}
/* xlsx(csv) → 임시 구글 시트 ID (Drive API v3 create · v2 insert 모두 지원). 서비스가 꺼져 있으면 켜는 방법을 안내한다. */
function crmConvert_(file, nameOverride) {
  if (typeof Drive === 'undefined' || !Drive.Files) throw new Error('Drive API 서비스가 꺼져 있습니다. Apps Script 편집기 왼쪽 「서비스(+)」 → Drive API → 추가한 뒤 다시 실행하세요.');
  const blob = file.getBlob(), name = nameOverride || ('[임시변환] ' + file.getName());
  const out = (typeof Drive.Files.create === 'function')
    ? Drive.Files.create({ name: name, mimeType: MimeType.GOOGLE_SHEETS }, blob, { supportsAllDrives: true })
    : Drive.Files.insert({ title: name, mimeType: MimeType.GOOGLE_SHEETS }, blob, { convert: true, supportsAllDrives: true });
  if (!out || !out.id) throw new Error('xlsx → 시트 변환에 실패했습니다: ' + file.getName());
  return out.id;
}
/* 2026-10-27 v6: 변환한 시트를 남겨 두고 다음부터 재사용한다.
 * xlsx(8~10MB) → 구글 시트 변환이 가장 느린 일이라, 파일(ID+수정시각)이 같으면 한 번만 변환한다.
 * 이름: "[CRM변환캐시] <원본 파일 ID>_<수정시각>" (내 드라이브 맨 위). 원본이 바뀌면 이름이 달라져 새로 변환하고 옛 것은 휴지통으로. */
function crmToast_(msg) { try { SpreadsheetApp.getActiveSpreadsheet().toast(msg, '전체 갱신', 30); } catch (e) {} }
function crmCacheName_(c) { return '[CRM변환캐시] ' + c.file.getId() + '_' + c.updated; }
function crmCacheFind_(c) {
  try { const it = DriveApp.getFilesByName(crmCacheName_(c)); while (it.hasNext()) { const f = it.next(); if (!f.isTrashed()) return f.getId(); } } catch (e) {}
  return null;
}
function crmCacheTrimOld_(c, keepId) {
  try {
    const prefix = '[CRM변환캐시] ' + c.file.getId() + '_', it = DriveApp.searchFiles("title contains '" + prefix + "' and trashed = false");
    while (it.hasNext()) { const f = it.next(); if (f.getId() !== keepId && f.getName().indexOf(prefix) === 0) f.setTrashed(true); }
  } catch (e) { Logger.log('옛 변환 캐시 정리 실패: ' + e); }
}
function crmCacheGet_(c) {
  const hit = crmCacheFind_(c); if (hit) return hit;
  crmToast_('CRM 파일 변환 중: ' + c.name + ' — 처음 한 번만 오래 걸립니다');
  const t0 = Date.now(), id = crmConvert_(c.file, crmCacheName_(c)), sec = Math.round((Date.now() - t0) / 1000);
  const props = PropertiesService.getScriptProperties();
  if (sec > (Number(props.getProperty('CRM_CONV_SEC')) || 0)) props.setProperty('CRM_CONV_SEC', String(sec));   // 가장 오래 걸린 변환(초) — 다음 실행의 시간 배분에 쓴다
  crmCacheTrimOld_(c, id);
  return id;
}
/* 아직 변환하지 않은 활동 파일을 남은 시간 안에서 변환해 둔다. 시간이 모자라면 {pending:true} → 나머지는 다음 실행에서(실행마다 최소 1개는 변환) */
function crmWarmCache_(leftMs) {
  const fr = crmFindFolder_(); if (fr.error || fr.none) return { pending: false };
  let picks; try { picks = crmPickActFiles_(crmListFiles_(fr.folder)); } catch (e) { return { pending: false }; }
  const est = (Number(PropertiesService.getScriptProperties().getProperty('CRM_CONV_SEC')) || 0) * 1000 * 1.3, t0 = Date.now();
  let done = 0;
  for (let i = 0; i < picks.length; i++) {
    const c = picks[i];
    if (c.mime === 'application/vnd.google-apps.spreadsheet' || crmCacheFind_(c)) continue;
    if (done > 0 && Date.now() - t0 + est > leftMs) return { pending: true };
    try { crmCacheGet_(c); done++; } catch (e) { return { pending: false }; }   // 오류 안내는 본 읽기 경로가 한다
  }
  return { pending: false };
}
function clearCrmCache() {
  let n = 0;
  try { const it = DriveApp.searchFiles("title contains '[CRM변환캐시]' and trashed = false"); while (it.hasNext()) { const f = it.next(); if (f.getName().indexOf('[CRM변환캐시]') === 0) { f.setTrashed(true); n++; } } } catch (e) {}
  alert_('✅ CRM 변환 캐시 ' + n + '개를 휴지통으로 보냈습니다. 다음 갱신에서 CRM 파일을 새로 변환합니다.');
}
/* 2026-10-27: 중간에 끊겨(6분 제한 등) 남은 "[임시변환]" 파일을 치운다 — 만든 지 30분이 넘은 것만(지금 변환 중인 파일은 건드리지 않는다).
 * 반환: 휴지통으로 보낸 개수. 실패해도 본 작업을 막지 않는다. */
function sweepStaleTemps_() {
  var n = 0;
  try {
    var cutoff = Date.now() - 30 * 60 * 1000, it = DriveApp.searchFiles("title contains '[임시변환]' and trashed = false");
    while (it.hasNext()) {
      var f = it.next();
      if (f.getName().indexOf('[임시변환]') === 0 && f.getDateCreated().getTime() < cutoff) { f.setTrashed(true); n++; }
    }
  } catch (e) { try { Logger.log('임시 변환 파일 정리 실패: ' + e); } catch (e2) {} }
  return n;
}
function crmRemoveTemp_(id) {
  try { Drive.Files.remove(id); } catch (e) { try { DriveApp.getFileById(id).setTrashed(true); } catch (e2) {} }
}
/* 파일 한 개에서 필요한 열만 읽는다 → {head:[열이름...], rows:[[...]]} (없는 열은 빠짐) */
function crmReadFileCols_(c, wantCols) {
  const isSheet = c.mime === 'application/vnd.google-apps.spreadsheet';
  const bookId = isSheet ? c.file.getId() : crmCacheGet_(c);   // v6: 변환본은 남겨 두고 재사용
  {
    const book = SpreadsheetApp.openById(bookId), sheets = book.getSheets();
    let sh = sheets[0];
    for (let i = 0; i < sheets.length; i++) {   // '약속/활동 목적' 열이 있는 시트를 우선(여러 시트가 있는 파일 대비)
      if (sheets[i].getLastRow() < 2) continue;
      const h = sheets[i].getRange(1, 1, 1, sheets[i].getLastColumn()).getValues()[0].map(x => String(x).trim());
      if (h.indexOf('약속/활동 목적') >= 0) { sh = sheets[i]; break; }
    }
    const lastRow = sh.getLastRow(), lastCol = sh.getLastColumn();
    if (lastRow < 2 || lastCol < 1) return { head: [], rows: [] };
    const head = sh.getRange(1, 1, 1, lastCol).getValues()[0].map(x => String(x).trim());
    const want = wantCols.map(n => head.indexOf(n)).filter(i => i >= 0);
    if (!want.length) return { head: [], rows: [] };
    const cols = want.map(i => sh.getRange(2, i + 1, lastRow - 1, 1).getValues());
    const rows = []; for (let r = 0; r < lastRow - 1; r++) rows.push(cols.map(col => col[r][0]));
    return { head: want.map(i => head[i]), rows: rows };
  }
}
/* 폴더에서 읽기. 반환: 표 [헤더, ...행] · null이면 다른 원본으로 · 읽다가 실패하면 알림 후 {fail:true} (오래된 다른 원본으로 조용히 넘어가지 않는다) */
const CRM_DEDUPE_COLS_ = ['시작 시간', '종료 시간', '주제', 'Serial No. (lookup)', '만든 날짜', 'Error 1', '필수 참석자'];
const CRM_OVERLAP_ = 0.5;   // 두 파일 시작 시간 범위의 교집합 ÷ 짧은 쪽 범위가 이 값 이상이면 같은 기간을 다시 내보낸 것
/* CRM 파일명 「… 2026_10_26 AM 12-34-04.xlsx」의 시각 → 하루 중 초(12시간제, AM 12 = 0시). 없으면 null */
function crmFileTod_(name) {
  const m = String(name || '').match(/\b(AM|PM)\s*(\d{1,2})-(\d{2})-(\d{2})/i); if (!m) return null;
  let h = (+m[2]) % 12; if (m[1].toUpperCase() === 'PM') h += 12; return h * 3600 + (+m[3]) * 60 + (+m[4]);
}
function crmRange_(rows, ti) {
  if (ti < 0) return null; let lo = Infinity, hi = -Infinity;
  rows.forEach(r => { const v = r[ti]; const t = v instanceof Date ? v.getTime() : (typeof v === 'number' ? v : NaN); if (t === t) { if (t < lo) lo = t; if (t > hi) hi = t; } });
  return hi >= lo ? { lo: lo, hi: hi } : null;
}
function crmOverlap_(a, b) {
  if (!a || !b) return 0; const inter = Math.min(a.hi, b.hi) - Math.max(a.lo, b.lo); if (inter <= 0) return 0;
  const shorter = Math.min(a.hi - a.lo, b.hi - b.lo); return shorter > 0 ? inter / shorter : 1;
}
function crmLoadFromFolder_(needCols) {
  const fr = crmFindFolder_();
  if (fr.error) { alert_('❌ ' + fr.error); return { fail: true }; }
  if (fr.none) return null;
  let picks;
  try { picks = crmPickActFiles_(crmListFiles_(fr.folder)); } catch (e) { alert_('❌ CRM 폴더를 읽는 중 오류: ' + e.message); return { fail: true }; }
  if (!picks.length) return null;   // 폴더는 있는데 활동 파일이 없음 → 다음 원본
  try {
    const multi = picks.length > 1, want = multi ? needCols.concat(CRM_DEDUPE_COLS_.filter(n => needCols.indexOf(n) < 0)) : needCols;
    const parts = picks.map(c => crmReadFileCols_(c, want));
    const head = parts[0].head;
    if (!head.length) { alert_('❌ 활동 파일에서 필요한 열을 하나도 찾지 못했습니다: ' + picks[0].name + '\nCRM 「모든 약속/활동」 내보내기(전체 열) 파일인지 확인해 주세요.'); return { fail: true }; }
    let rows = [], dup = 0, used = picks, superseded = [];
    if (!multi) rows = parts[0].rows;
    else {
      parts.forEach(p => { if (p.head.join('|') !== head.join('|')) throw new Error('같은 날짜 활동 파일들의 열 구성이 다릅니다. 같은 보기(전체 열)로 내보냈는지 확인해 주세요.'); });
      // 같은 날짜 파일 판정: 시작 시간 범위가 이어 붙으면 분할 내보내기(합침), 절반 이상 겹치면 다시 내보낸 것(가장 새 파일만)
      const ti = head.indexOf('시작 시간');
      const items = picks.map((c, i) => ({ c: c, p: parts[i], tod: crmFileTod_(c.name), range: crmRange_(parts[i].rows, ti) }));
      const newer = (a, b) => (a.tod !== null && b.tod !== null && a.tod !== b.tod) ? a.tod > b.tod : a.c.updated > b.c.updated;
      const sorted = items.slice().sort((a, b) => newer(a, b) ? -1 : (newer(b, a) ? 1 : 0));
      const kept = [];
      sorted.forEach(f => { if (kept.some(k => crmOverlap_(k.range, f.range) >= CRM_OVERLAP_)) superseded.push(f.c.name); else kept.push(f); });
      const order = items.filter(f => kept.indexOf(f) >= 0);
      used = order.map(f => f.c);
      const seen = {};
      order.forEach(f => f.p.rows.forEach(r => { const k = r.map(v => v instanceof Date ? v.getTime() : v).join('\u0001'); if (seen[k]) { dup++; return; } seen[k] = 1; rows.push(r); }));
      const keep = head.map((n, i) => needCols.indexOf(n) >= 0 ? i : -1).filter(i => i >= 0);   // 중복 판별용으로만 읽은 열은 버린다
      rows = rows.map(r => keep.map(i => r[i]));
      head.splice(0, head.length, ...keep.map(i => head[i]));
    }
    CRM_LAST_SRC_ = 'Drive 폴더 ' + fr.folder.getName() + ' · ' + used.map(c => c.name).join(' + ') + (used.length > 1 ? ' (파일 ' + used.length + '개 합침, 똑같은 행 ' + dup + '개 제외)' : '') +
      (superseded.length ? ' · ⚠ 같은 기간을 다시 내보낸 파일 ' + superseded.length + '개는 쓰지 않음(최신만 사용): ' + superseded.join(', ') : '');
    return [head].concat(rows);
  } catch (e) { alert_('❌ Drive 폴더의 CRM 파일을 읽지 못했습니다.\n' + e.message); return { fail: true }; }
}
/* 2026-10-27 v5: 전체 갱신 한 번 동안은 CRM을 한 번만 읽는다(예전에는 단계마다 xlsx→시트 변환을 되풀이해 6분 제한에 걸렸다).
 * CRM_MEMO_ 는 runUpdateSteps_ 가 켜고 끈다. 꺼져 있으면(메뉴에서 단계를 따로 실행) 예전과 똑같이 매번 읽는다. */
var CRM_MEMO_ = null;   // {head:[...], rows:[...], src:'...', fail:bool}
function crmMemoPrefetch_(cols) {
  const t = loadCrmTableRaw_(cols);
  CRM_MEMO_ = t ? { head: t[0], rows: t.slice(1), src: CRM_LAST_SRC_, fail: false } : { head: [], rows: [], src: '', fail: true };
}
function loadCrmTable_(needCols) {
  const m = CRM_MEMO_;
  if (!m) return loadCrmTableRaw_(needCols);
  if (m.fail) return null;
  CRM_LAST_SRC_ = m.src;
  const want = needCols.map(n => m.head.indexOf(n)).filter(i => i >= 0);   // 없는 열은 빠진 채 돌려줘 기존 missing 검사에 걸리게 한다
  if (!want.length) return [m.head.slice()];
  if (want.length === m.head.length && want.every((w, i) => w === i)) return [m.head.slice()].concat(m.rows);
  return [want.map(i => m.head[i])].concat(m.rows.map(r => want.map(i => r[i])));
}
function loadCrmTableRaw_(needCols) {
  CRM_LAST_SRC_ = '';
  const fold = crmLoadFromFolder_(needCols);
  if (fold && fold.fail) return null;
  if (fold) return fold;
  const id = crmHubId_();
  let sh = null;
  if (id) {
    let hub;
    try { hub = SpreadsheetApp.openById(id); }
    catch (e) {
      alert_('❌ 허브 시트를 열 수 없습니다 (' + id + ').\n메뉴 「CRM 허브 시트 지정…」에 월간보고 시트(FSG_월_분기 보고 데이터) URL을 다시 넣어 주세요.\n' + e.message);
      return null;
    }
    sh = hub.getSheetByName(CONFIG.HUB_CRM_TAB);
    if (!sh || sh.getLastRow() < 2) {
      alert_('❌ 허브 시트 "' + hub.getName() + '"에 "' + CONFIG.HUB_CRM_TAB + '" 탭이 없거나 비어 있습니다.\n' +
             '월간보고 시트 메뉴 「FSG 보고서 › CRM 가져오기 (Drive)」를 먼저 실행해 주세요.');
      return null;
    }
  } else {
    sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEETS.CRM);
    if (!sh || sh.getLastRow() < 2) {
      alert_('❌ "' + SHEETS.CRM + '" 시트를 찾을 수 없습니다.\n\n' +
             '권장: Drive 「내 드라이브」의 폴더 "' + (crmFolderSpec_() || 'CRM_원본') + '"에 CRM 「모든 약속/활동」 xlsx를 넣어 두면 바로 읽습니다.\n' +
             '(또는 메뉴 「CRM 허브 시트 지정…」 · 예전처럼 CRM 내보내기를 "' + SHEETS.CRM + '" 시트에 붙여넣기)');
      return null;
    }
  }
  const lastRow = sh.getLastRow(), lastCol = sh.getLastColumn();
  const head = sh.getRange(1, 1, lastRow ? 1 : 1, lastCol).getValues()[0].map(h => String(h).trim());
  const want = needCols.map(n => head.indexOf(n)).filter(i => i >= 0);   // 없는 열은 빠진 채 돌려줘 기존 missing 검사에 걸리게 한다
  if (!want.length) return [head];
  const cols = want.map(i => sh.getRange(2, i + 1, lastRow - 1, 1).getValues());
  const rows = [];
  for (let r = 0; r < lastRow - 1; r++) rows.push(cols.map(c => c[r][0]));
  return [want.map(i => head[i])].concat(rows);
}
function setCrmHubSheet() {
  const ui = SpreadsheetApp.getUi();
  const props = PropertiesService.getScriptProperties();
  const cur = crmHubId_();
  const res = ui.prompt('CRM 허브 시트 지정',
    '월간보고 시트(FSG_월_분기 보고 데이터)의 URL을 붙여넣으세요.\n' +
    '비우고 확인하면 이 시트의 "' + SHEETS.CRM + '" 탭을 읽는 예전 방식으로 돌아갑니다.\n\n현재: ' + (cur || '(지정 안 됨)'),
    ui.ButtonSet.OK_CANCEL);
  if (res.getSelectedButton() !== ui.Button.OK) return;
  const v = String(res.getResponseText() || '').trim();
  if (v) props.setProperty('HUB_SHEET', v); else props.deleteProperty('HUB_SHEET');
  diagnoseCrmSource();
}
function setCrmFolder() {
  const ui = SpreadsheetApp.getUi();
  const props = PropertiesService.getScriptProperties();
  const res = ui.prompt('CRM 폴더 지정',
    'CRM 내보내기 파일을 넣어 두는 Drive 폴더의 이름 또는 URL을 넣으세요. (기본: CRM_원본, 월간보고·대시보드와 같은 폴더)\n' +
    '폴더를 쓰지 않으려면 - 를 넣으세요. 비우고 확인하면 기본값으로 돌아갑니다.\n\n현재: ' + (crmFolderSpec_() || '(없음)'),
    ui.ButtonSet.OK_CANCEL);
  if (res.getSelectedButton() !== ui.Button.OK) return;
  const v = String(res.getResponseText() || '').trim();
  if (v) props.setProperty('CRM_FOLDER', v); else props.deleteProperty('CRM_FOLDER');
  diagnoseCrmSource();
}
function diagnoseCrmSource() {
  const t = loadCrmTable_(['상태', '양식 타입', '시작 시간', '담당자', '약속/활동 목적', '거래처']);
  if (!t) return;
  const head = t[0], n = t.length - 1, si = head.indexOf('시작 시간');
  let last = null;
  if (si >= 0) for (let i = 1; i < t.length; i++) { const d = t[i][si]; if (d instanceof Date && (!last || d > last)) last = d; }
  const needed = ['상태', '양식 타입', '시작 시간', '담당자', '약속/활동 목적'].filter(h => head.indexOf(h) === -1);
  const fr = crmFindFolder_(), fnote = fr.folder ? '' : (fr.error ? '\n· ⚠ ' + fr.error : '\n· Drive 폴더: ' + fr.none + ' → 다음 원본 사용');
  alert_('CRM 원본 연결 확인\n\n· 원본: ' + crmSourceLabel_() + fnote + '\n· 행 수: ' + n +
         '\n· 찾은 열: ' + head.join(', ') + (needed.length ? '\n⚠ 없는 필수 열: ' + needed.join(', ') : '') +
         (last ? '\n· 가장 늦은 시작 시간: ' + Utilities.formatDate(last, 'Asia/Seoul', 'yyyy-MM-dd') : ''));
}

/* FSR명단 로드 → { 이름: {team, grade} } */


/* ====================== CRM 업로드 입구 — 웹 앱 (2026-10-27) ======================
 * PC 바탕화면 아이콘(FSG 대시보드 올리기)이 CRM 파일을 Drive 「CRM_원본」 폴더로 올릴 때 쓰는 입구.
 * 사용자가 파일을 Drive 창으로 끌어다 놓는 손일을 없앤다.
 *
 * 2026-11-12: 올리기는 파일을 폴더에 넣는 것까지만 하고 집계는 「CRM 자동 가져오기」가 했기 때문에,
 *   올린 뒤 최대 2시간(또는 트리거가 꺼져 있으면 영원히) 반영되지 않았다. 이제 활동 파일이
 *   올라오면 uploadScheduleRefresh_ 가 1분 뒤 집계를 한 번 예약한다. doPost 안에서 바로 돌리지
 *   않는 이유는 그 함수 위에 적어 두었다. 자동 가져오기를 꺼 두면 예약하지 않는다.
 *   ※ 이 입구는 **배포된 버전의 코드**로 돈다 — 여기를 고치면 「배포 관리 › 수정 › 새 버전」으로
 *     다시 배포해야 반영된다(그 전까지는 10분 주기 트리거가 처리한다).
 *
 * 2026-10-27 추가: CRM 파일뿐 아니라 보고 데이터(`report-data_<기간>.json`, `검산_<기간>.xlsx`)도 받는다 — 내 드라이브 「FSG_report_out/<기간>」 폴더에
 *   저장(없으면 만든다). 프로젝트(채팅)가 Drive 커넥터로 읽거나 사용자가 내려받아 올린다. 같은 이름은 최신 것으로 바뀐다(이전 것은 휴지통).
 * 최초 1회: ① 메뉴 「CRM 업로드 입구: 토큰 새로 만들기」 → 화면에 한 번만 보이는 토큰을 PC 설정(setup.bat)에 붙여넣는다.
 *           ② 편집기 「배포 › 새 배포 › 유형: 웹 앱 · 다음 사용자로 실행: 나 · 액세스: 모든 사용자」 → 웹 앱 주소(…/exec)를 PC 설정에 붙여넣는다.
 *           코드를 고친 뒤에는 「배포 관리 › 수정 › 새 버전」으로 다시 배포해야 반영된다.
 * 보안: 주소를 아는 것만으로는 아무것도 못 한다 — 64자리 무작위 토큰이 맞아야 하고, 약속_활동·Serial No 의 .xlsx 만 받으며,
 *       파일은 CRM_원본 폴더에만 저장한다(다른 폴더·다른 이름·덮어쓰기 불가). 토큰은 스크립트 속성에만 있고 코드·로그에 남기지 않는다.
 *       끄려면 「배포 관리」에서 배포를 보관처리하거나 토큰 속성(UPLOAD_TOKEN)을 지운다. */
const UPLOAD_ = { MAX_BYTES: 45 * 1024 * 1024, MIN_TOKEN: 24, XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' };
function uploadTokenEq_(a, b) { if (a.length !== b.length) return false; let d = 0; for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i); return d === 0; }
function uploadReply_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function uploadHex_(bytes) { return bytes.map(b => ((b < 0 ? b + 256 : b)).toString(16).padStart(2, '0')).join(''); }
/* 내 드라이브 「FSG_report_out/<기간>」 폴더를 찾고 없으면 만든다(월간보고 엔진의 Drive 출력 위치와 같다) */
function uploadReportFolder_(period) {
  const sub = (parent, name) => { const it = parent.getFoldersByName(name); return it.hasNext() ? it.next() : parent.createFolder(name); };
  const rootIt = DriveApp.getRootFolder().getFoldersByName('FSG_report_out');
  const top = rootIt.hasNext() ? rootIt.next() : DriveApp.getRootFolder().createFolder('FSG_report_out');
  return sub(top, period);
}
/* 올리기가 끝나면 1분 뒤에 집계를 한 번 예약한다.
 * · doPost 안에서 집계를 바로 돌리지 않는 이유: 전체 갱신은 수십 초~수 분이 걸려
 *   PC 쪽이 응답을 기다리다 멈춘 것처럼 보이고, 웹 앱 실행 시간 제한에도 걸린다.
 * · 1분을 두는 이유: PC 가 활동·Serial 파일을 잇달아 올리므로 묶음이 끝나길 기다린다.
 * · 트리거는 실행되면 스스로 지운다(프로젝트 트리거 20개 제한). 이미 예약돼 있으면 더 만들지 않는다.
 * 실패해도 올리기 자체는 성공으로 둔다 — 10분 주기 트리거가 안전망이다. */
function uploadScheduleRefresh_() {
  try {
    const ts = ScriptApp.getProjectTriggers();
    if (!ts.some(t => t.getHandlerFunction() === 'autoCrmRefreshTrigger')) return 'off';   // 자동 가져오기를 꺼 둔 상태면 예약하지 않는다
    if (ts.some(t => t.getHandlerFunction() === 'uploadRefreshTrigger')) return 'already';
    if (ts.length >= 18) return 'full';
    ScriptApp.newTrigger('uploadRefreshTrigger').timeBased().after(60 * 1000).create();
    return 'scheduled';
  } catch (e) { return 'error'; }
}
/* 예약 진입점 — 자기 트리거를 먼저 지우고(집계가 실패해도 남지 않게) 집계한다 */
function uploadRefreshTrigger() {
  try { ScriptApp.getProjectTriggers().forEach(t => { if (t.getHandlerFunction() === 'uploadRefreshTrigger') ScriptApp.deleteTrigger(t); }); } catch (e) {}
  autoCrmRefresh({});
}
function uploadCore_(req) {
  const props = PropertiesService.getScriptProperties(), want = props.getProperty('UPLOAD_TOKEN') || '';
  if (want.length < UPLOAD_.MIN_TOKEN || !uploadTokenEq_(String(req.token || ''), want)) { Utilities.sleep(1500); return { ok: false, error: '인증 실패' }; }   // 무차별 대입을 늦춘다
  const name = String(req.name || '');
  const rep = /^(report-data_(\d{4}-\d{2})\.json|검산_(\d{4}-\d{2})\.xlsx)$/.exec(name);   // 보고 데이터: 기간이 이름에 있는 두 가지뿐
  const isCrm = !!name && name === name.trim() && !/[\\\/:*?"<>|]/.test(name) && /\.xlsx$/i.test(name) && /(약속_활동|serial)/i.test(name);
  if (!rep && !isCrm) return { ok: false, error: '허용되지 않는 파일 이름입니다 (약속_활동·Serial No 의 .xlsx, report-data_YYYY-MM.json, 검산_YYYY-MM.xlsx 만)' };
  let bytes; try { bytes = Utilities.base64Decode(String(req.b64 || '')); } catch (e) { return { ok: false, error: '파일 내용을 읽을 수 없습니다' }; }
  if (!bytes.length) return { ok: false, error: '빈 파일입니다' };
  if (bytes.length > UPLOAD_.MAX_BYTES) return { ok: false, error: '파일이 너무 큽니다(최대 45MB)' };
  if (Number(req.size) !== bytes.length) return { ok: false, error: '파일 크기가 맞지 않습니다(전송 중 손상)' };
  const sha = uploadHex_(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, bytes));
  if (String(req.sha256 || '') !== sha) return { ok: false, error: '파일이 손상되었습니다(체크섬 불일치)' };
  let folder;
  if (rep) { try { folder = uploadReportFolder_(rep[2] || rep[3]); } catch (e) { return { ok: false, error: '보고 데이터 폴더를 만들 수 없습니다: ' + e.message }; } }
  else { const fr = crmFindFolder_(); if (fr.error) return { ok: false, error: fr.error }; if (fr.none) return { ok: false, error: fr.none }; folder = fr.folder; }
  const same = folder.getFilesByName(name);
  let replaced = 0;
  while (same.hasNext()) {
    const f = same.next();
    if (String(f.getDescription() || '').indexOf('sha256:' + sha) === 0) return { ok: true, dup: true, id: f.getId() };   // 같은 파일이 이미 있음 — 집계할 것이 없다
    f.setTrashed(true); replaced++;   // 같은 이름인데 내용이 다르면 이전 것은 휴지통으로(복구 가능)
  }
  const file = folder.createFile(Utilities.newBlob(bytes, /\.json$/.test(name) ? 'application/json' : UPLOAD_.XLSX, name));
  file.setDescription('sha256:' + sha + ' · PC 업로드 ' + crmNowStr_());
  props.setProperty('UPLOAD_LAST', JSON.stringify({ at: crmNowStr_(), name: name, size: bytes.length }));
  // 활동 파일만 집계를 예약한다 (Serial No 는 KPI 대시보드용, 보고 데이터는 집계와 무관)
  const refresh = (isCrm && /약속_활동/.test(name)) ? uploadScheduleRefresh_() : '';
  if (refresh === 'scheduled') props.setProperty('UPLOAD_SCHED', crmNowStr_());
  return { ok: true, dup: false, id: file.getId(), replaced: replaced, refresh: refresh };
}
function doPost(e) {
  try { return uploadReply_(uploadCore_(JSON.parse(e.postData.contents))); }
  catch (err) { return uploadReply_({ ok: false, error: '서버 오류: ' + String(err && err.message || err) }); }
}
// (doGet 은 이미 공개 대시보드 웹 앱이 쓰고 있다 — 여기서 다시 정의하지 않는다. 같은 배포에 doPost 만 더해진다.)
function setupUploadToken() {
  const ui = SpreadsheetApp.getUi(), props = PropertiesService.getScriptProperties();
  if (props.getProperty('UPLOAD_TOKEN')) {
    const r = ui.alert('CRM 업로드 입구', '이미 토큰이 있습니다. 새로 만들면 PC에 저장된 예전 토큰은 못 쓰게 됩니다(PC 설정을 다시 해야 합니다). 새로 만들까요?', ui.ButtonSet.YES_NO);
    if (r !== ui.Button.YES) return;
  }
  const token = (Utilities.getUuid() + Utilities.getUuid()).replace(/-/g, '');
  props.setProperty('UPLOAD_TOKEN', token);
  // 손으로 옮기다 틀리지 않도록 읽기 전용 칸 + 「복사」 버튼으로 보여 준다(토큰은 16진수라 HTML에 그대로 넣어도 안전하다).
  const html = HtmlService.createHtmlOutput(
    '<div style="font-family:sans-serif;font-size:13px;line-height:1.55;color:#222">' +
    '<p style="margin:0 0 8px"><b>✅ 토큰을 만들었습니다 — 지금 한 번만 보입니다</b></p>' +
    '<input id="t" readonly value="' + token + '" onclick="this.select()" style="width:100%;box-sizing:border-box;font-family:monospace;font-size:12px;padding:7px">' +
    '<p style="margin:8px 0"><button id="b" onclick="var i=document.getElementById(\'t\');i.focus();i.select();document.execCommand(\'copy\');this.textContent=\'복사됨 ✓\'" style="padding:6px 16px;font-size:13px">복사</button></p>' +
    '<p style="margin:6px 0">PC에서 <code>fsg-report\\windows\\setup.bat</code> 을 실행해 「Drive 업로드 토큰」에 붙여넣으세요(검은 창에서는 마우스 오른쪽 클릭이 붙여넣기입니다).</p>' +
    '<p style="margin:6px 0;color:#a00">채팅·메일·메신저에는 붙여넣지 마세요(스크린샷에도 찍히지 않게 하세요). 노출됐다면 이 메뉴로 새로 만들면 예전 토큰은 즉시 못 씁니다.</p>' +
    '<p style="margin:6px 0">다음: 편집기 「배포 › 새 배포 › 웹 앱(실행: 나, 액세스: 모든 사용자)」으로 배포하고 주소(…/exec)도 setup.bat 에 넣습니다.</p></div>'
  ).setWidth(520).setHeight(330);
  ui.showModalDialog(html, 'CRM 업로드 입구 — 토큰');
}
function showUploadStatus() {
  const props = PropertiesService.getScriptProperties(); let last = null; try { last = JSON.parse(props.getProperty('UPLOAD_LAST') || 'null'); } catch (e) {}
  let url = ''; try { url = ScriptApp.getService().getUrl() || ''; } catch (e) {}
  alert_('CRM 업로드 입구\n\n· 토큰: ' + (props.getProperty('UPLOAD_TOKEN') ? '만들어 둠' : '⚠️ 아직 없음 — 「토큰 새로 만들기」를 실행하세요') +
         '\n· 웹 앱 주소: ' + (/\/exec$/.test(url) ? url : '⚠️ 배포되지 않음 (편집기 「배포 › 새 배포 › 웹 앱」)') +
         '\n· 마지막 업로드: ' + (last ? last.at + ' · ' + last.name + ' (' + Math.round(last.size / 1048576 * 10) / 10 + 'MB)' : '(아직 없음)'));
}


/* ====================== CRM 자동 가져오기 (2026-10-27) ======================
 * 시간 트리거(2시간마다)가 Drive 폴더의 활동 파일을 확인해, 지난번 처리한 파일과 다를 때만 「전체 갱신」과 같은 작업을
 * 화면 없이 실행한다. 사용자는 폴더에 CRM 파일을 넣기만 하면 된다.
 *  - 새 파일 판정: 선택된 활동 파일들의 이름 + Drive 수정 시각 서명이 달라졌을 때
 *  - 올라온 지 3분이 안 된 파일은 다음 확인으로 미룬다(업로드·동기화 중인 파일을 읽지 않도록)
 *  - 같은 파일로는 한 번만 시도한다(실패해도 2시간마다 되풀이하지 않음) — 실패하면 소유자에게 메일, 하루 한 번까지
 *  - 시간 트리거에서는 팝업을 띄울 수 없으므로 runUpdateSteps_()의 조용한 모드를 쓴다 */
/* EVERY_MIN: 수동으로 Drive 에 넣은 파일을 위한 안전망 주기(분). PC 올리기는 doPost 가
 * 올린 직후 한 번만 예약하므로 이 주기를 기다리지 않는다(uploadScheduleRefresh_).
 * MIN_AGE_MS: 아직 전송 중인 파일을 읽지 않으려는 대기. PC 올리기로 들어온 파일은
 * uploadCore_ 가 크기·SHA-256 을 확인한 뒤 통째로 만들므로 이 대기가 필요 없다(verified). */
const AUTO_CRM_ = { MIN_AGE_MS: 3 * 60 * 1000, EVERY_MIN: 10, MAIL_COOLDOWN_MS: 24 * 3600 * 1000 };
function crmNowStr_() { return Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm'); }
/* 전송이 끝나길 기다려야 하는 파일인가. PC 올리기로 검증된 파일은 기다리지 않는다. */
function crmNeedsWait_(c, now) { return !c.verified && (now - c.updated) < AUTO_CRM_.MIN_AGE_MS; }
function crmAutoState_() {
  const fr = crmFindFolder_();
  if (fr.error) return { error: fr.error };
  if (fr.none) return { none: fr.none };
  const picks = crmPickActFiles_(crmListFiles_(fr.folder));
  if (!picks.length) return { none: '폴더에 활동 파일(이름에 "약속_활동")이 없음' };
  const now = Date.now();
  return { sig: picks.map(c => c.name + '|' + c.updated).join(';'), names: picks.map(c => c.name), pending: picks.some(c => crmNeedsWait_(c, now)), folder: fr.folder.getName() };
}
function crmAutoMail_(subject, lines) {
  const props = PropertiesService.getScriptProperties();
  const key = subject + '|' + lines[0];
  try {
    const prev = JSON.parse(props.getProperty('CRM_AUTO_MAILED') || 'null');
    if (prev && prev.key === key && Date.now() - prev.at < AUTO_CRM_.MAIL_COOLDOWN_MS) return false;   // 같은 문제는 하루 한 번만
    const to = Session.getEffectiveUser().getEmail() || (CONFIG.ALERT_EMAILS && CONFIG.ALERT_EMAILS[0]);
    if (!to) return false;
    MailApp.sendEmail(to, '[만족도 시트] ' + subject, lines.join('\n'));
    props.setProperty('CRM_AUTO_MAILED', JSON.stringify({ key: key, at: Date.now() }));
    return true;
  } catch (err) { Logger.log('메일 실패: ' + err); return false; }
}
function autoCrmRefresh(opts) {
  opts = opts || {};
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) return { skipped: '다른 작업이 실행 중이라 다음 확인으로 미룸' };
  const props = PropertiesService.getScriptProperties();
  const saveLast = o => props.setProperty('CRM_AUTO_LAST', JSON.stringify(Object.assign({ at: crmNowStr_() }, o)));
  try {
    const st = crmAutoState_();
    if (st.error) { saveLast({ ok: false, note: st.error }); crmAutoMail_('CRM 자동 가져오기: 폴더를 열 수 없음', [st.error]); return { error: st.error }; }
    if (st.none) { props.setProperty('CRM_AUTO_CHECKED', crmNowStr_()); return { skipped: st.none }; }
    if (st.pending && !opts.force) return { skipped: '파일이 방금 올라와 3분 뒤 다음 확인에서 처리' };
    if (!opts.force && props.getProperty('CRM_AUTO_SIG') === st.sig) { props.setProperty('CRM_AUTO_CHECKED', crmNowStr_()); return { skipped: '새 파일 없음' }; }
    const r = runUpdateSteps_({ force: !!opts.force });
    const failed = r.steps.some(x => x.indexOf('⚠️') === 0) || r.log.some(m => /^❌|⚠️/.test(String(m)));
    props.setProperty('CRM_AUTO_SIG', st.sig);   // 실패해도 같은 파일로는 다시 시도하지 않는다(메일로 알림 · 「지금 확인」으로 강제 실행)
    props.setProperty('CRM_AUTO_CHECKED', crmNowStr_());
    const brief = { ok: !failed, files: st.names, sec: r.sec, steps: r.steps, log: r.log.map(m => String(m).split('\n')[0]).slice(0, 8) };
    saveLast(brief);
    if (failed) crmAutoMail_('CRM 자동 가져오기 오류', ['새 파일 ' + st.names.join(' + ') + ' 처리 중 문제가 있었습니다.', ''].concat(r.steps).concat(brief.log).concat(['', '시트 메뉴 「📊 만족도 조사 › CRM 자동 가져오기: 상태」에서 확인하고, 원인을 고친 뒤 「지금 확인」(강제)을 실행하세요.']));
    return { done: true, failed: failed, sec: r.sec, steps: r.steps };
  } catch (err) {
    saveLast({ ok: false, note: String(err && err.message || err) });
    crmAutoMail_('CRM 자동 가져오기 오류', [String(err && err.message || err)]);
    return { error: String(err && err.message || err) };
  } finally { lock.releaseLock(); }
}
function autoCrmRefreshTrigger() { autoCrmRefresh({}); }   // 시간 트리거 진입점(트리거가 넘기는 이벤트 객체는 쓰지 않는다)
function installAutoCrmTrigger() {
  ScriptApp.getProjectTriggers().forEach(t => { if (t.getHandlerFunction() === 'autoCrmRefreshTrigger') ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('autoCrmRefreshTrigger').timeBased().everyMinutes(AUTO_CRM_.EVERY_MIN).create();
  alert_('✅ CRM 자동 가져오기를 켰습니다.\n\n' +
         '· PC 「FSG 대시보드 올리기」로 올리면 올린 직후(약 1분 뒤) 자동으로 집계합니다.\n' +
         '· 그 밖에 Drive 폴더 "' + (crmFolderSpec_() || 'CRM_원본') + '"에 직접 넣은 파일은 ' + AUTO_CRM_.EVERY_MIN + '분마다 확인해 처리합니다.\n' +
         '· 새 활동 파일이 없으면 폴더만 보고 바로 끝냅니다.\n\n' +
         '켠 뒤 첫 확인에서 현재 파일을 한 번 처리합니다. 문제가 생기면 시트 소유자에게 메일이 갑니다.\n\n지금 바로 확인하려면 「CRM 자동 가져오기: 지금 확인」을 실행하세요.');
}
function removeAutoCrmTrigger() {
  let n = 0; ScriptApp.getProjectTriggers().forEach(t => { if (t.getHandlerFunction() === 'autoCrmRefreshTrigger') { ScriptApp.deleteTrigger(t); n++; } });
  ScriptApp.getProjectTriggers().forEach(t => { if (t.getHandlerFunction() === 'uploadRefreshTrigger') { ScriptApp.deleteTrigger(t); n++; } });   // 올리기 직후 예약도 함께 지운다
  alert_(n ? '✅ CRM 자동 가져오기를 껐습니다. PC 올리기로 올린 파일도 자동 집계되지 않습니다 — 필요할 때 「🔄 전체 갱신」을 직접 실행하세요.' : '자동 가져오기가 켜져 있지 않았습니다.');
}
function runAutoCrmNow() {
  const r = autoCrmRefresh({});
  alert_(r.done ? ('✅ 새 파일을 처리했습니다 (' + r.sec + '초)\n\n' + r.steps.join('\n') + (r.failed ? '\n\n⚠️ 일부 단계에 문제가 있습니다. 「상태」 메뉴를 확인하세요.' : ''))
       : r.error ? ('❌ ' + r.error) : ('처리할 새 파일이 없습니다 — ' + r.skipped + '\n\n강제로 다시 하려면 「🔄 전체 갱신」을 실행하세요.'));
}
function showAutoCrmStatus() {
  const props = PropertiesService.getScriptProperties();
  const on = ScriptApp.getProjectTriggers().some(t => t.getHandlerFunction() === 'autoCrmRefreshTrigger');
  let last = null; try { last = JSON.parse(props.getProperty('CRM_AUTO_LAST') || 'null'); } catch (e) {}
  let st; try { st = crmAutoState_(); } catch (e) { st = { error: e.message }; }
  const sched = ScriptApp.getProjectTriggers().some(t => t.getHandlerFunction() === 'uploadRefreshTrigger');
  const lines = ['CRM 자동 가져오기: ' + (on ? '켜짐 (PC 올리기 직후 + ' + AUTO_CRM_.EVERY_MIN + '분마다 확인)' : '꺼짐 — 메뉴 「CRM 자동 가져오기 켜기」')];
  if (!on) lines.push('  ⚠️ 꺼져 있으면 PC 「FSG 대시보드 올리기」로 올려도 집계되지 않습니다(파일만 폴더에 들어갑니다).');
  lines.push('마지막 확인: ' + (props.getProperty('CRM_AUTO_CHECKED') || '(아직 없음)'));
  lines.push('PC 올리기: ' + (props.getProperty('UPLOAD_LAST') ? (function () { try { const u = JSON.parse(props.getProperty('UPLOAD_LAST')); return u.at + ' · ' + u.name; } catch (e) { return '(기록 읽기 실패)'; } })() : '(아직 없음)')
             + (sched ? '\n  → 올리기 직후 집계가 예약돼 있습니다 (1분 안에 실행)' : ''));
  const pg = updJson_('UPD_PROGRESS', null), rs = updJson_('UPD_RESUME', null);
  if (pg) lines.push('전체 갱신: ' + (pg.done ? pg.at + ' 정상 종료' : '⚠️ ' + pg.at + ' 「' + pg.step + '」 단계에서 멈춤 (지금 실행 중이 아니라면 시간 초과로 끊긴 것)'));
  if (rs) lines.push('이어서 할 단계 대기: ' + rs.keys.join(' → ') + ' (' + rs.at + ' 예약)');
  if (last) lines.push('마지막 처리: ' + last.at + ' · ' + (last.ok ? '성공' : '⚠️ 문제 있음') + (last.sec != null ? ' · ' + last.sec + '초' : '') + (last.files ? '\n  파일: ' + last.files.join(' + ') : '') + (last.note ? '\n  ' + last.note : '') + (last.log && last.log.length ? '\n  ' + last.log.join('\n  ') : ''));
  else lines.push('마지막 처리: (아직 없음)');
  if (st.error) lines.push('폴더: ❌ ' + st.error);
  else if (st.none) lines.push('폴더: ' + st.none);
  else lines.push('폴더 "' + st.folder + '"의 활동 파일: ' + st.names.join(' + ') + '\n  → ' + (st.pending ? '방금 올라온 파일이라 3분 뒤 확인합니다' : (props.getProperty('CRM_AUTO_SIG') === st.sig ? '이미 처리한 파일입니다(새 파일을 기다리는 중)' : '아직 처리하지 않은 새 파일입니다 — 다음 확인 때(또는 「지금 확인」으로) 자동 갱신')));
  alert_(lines.join('\n'));
}


function onOpen() {
  SpreadsheetApp.getUi().createMenu('📊 만족도 조사')
    .addItem('🔄 전체 갱신 (CRM·매칭·대시보드)', 'runAllUpdates')
    .addItem('🔄 전체 갱신 — CRM 다시 읽기(강제)', 'runAllUpdatesForce')
    .addSeparator()
    .addItem('대시보드 새로고침', 'refreshDashboard')
    .addItem('기간별 보고서 생성 (월/분기/전체)', 'generatePeriodReport')
    .addItem('매월 1일 자동 보고 설정', 'installMonthlyTrigger')
    .addItem('월간 보고 메일 다시 보내기 (게시물 첨부)', 'resendMonthlyMail')
    .addItem('저점수 알림 시험 발송 (경로 확인)', 'testLowScoreAlert')
    .addSeparator()
    .addItem('폼 FSR 드롭다운 실명 교체', 'updateFormFsrDropdown')
    .addItem('응답 확인 메시지 설정', 'setFormConfirmationMessage')
    .addItem('CRM 방문건수 가져오기', 'importCrmVisits')
    .addItem('CRM 폴더 지정… (Drive 폴더 이름 또는 URL)', 'setCrmFolder')
    .addItem('CRM 자동 가져오기 켜기 (2시간마다 새 파일 확인)', 'installAutoCrmTrigger')
    .addItem('CRM 자동 가져오기 끄기', 'removeAutoCrmTrigger')
    .addItem('CRM 자동 가져오기: 지금 확인', 'runAutoCrmNow')
    .addItem('CRM 자동 가져오기: 상태', 'showAutoCrmStatus')
    .addItem('CRM 업로드 입구: 토큰 새로 만들기', 'setupUploadToken')
    .addItem('CRM 업로드 입구: 상태', 'showUploadStatus')
    .addItem('CRM 허브 시트 지정… (월간보고 시트 URL)', 'setCrmHubSheet')
    .addItem('진단: CRM 원본 연결 확인', 'diagnoseCrmSource')
    .addItem('CRM 변환 캐시 지우기', 'clearCrmCache')
    .addItem('기관명DB CRM 거래처로 채우기', 'seedOrgDbFromCrm')
    .addItem('유사매칭 승인 반영', 'applyApprovedFuzzyMappings')
    .addItem('FSR명단 시트 갱신 (진급·인사이동)', 'syncRosterSheet')
    .addItem('최초 설치 (setupExisting)', 'setupExisting')
    .addSeparator()
    .addItem('시트 정리 (참조용 숨기기)', 'organizeSheets')
    .addItem('숨긴 시트 모두 보기', 'showAllSheets')
    .addItem('진단: 방문수 읽기 확인', 'diagnoseFsrVisits')
    .addItem('검수결과 정리 (분류 로직 변경 후)', 'clearMisclassifiedMarks')
    .addSeparator()
    .addItem('저점수 조치: FS 포털에서 받아오기', 'syncLowFollow')
    .addItem('저점수 조치: FS 포털 연동 설정', 'setupLowFollowSync')
    .addSeparator()
    .addItem('공개 대시보드 Firebase 연동 설정', 'setupFirebasePush')
    .addItem('공개 대시보드 지금 내보내기', 'pushDashboardToFirebaseNow')
    .addToUi();
}


/*******************************************************************
 * 【추가】 공개 대시보드 연동 (GitHub Pages + Firebase)
 * -----------------------------------------------------------------
 * FSR 44명이 링크로 보는 공개 대시보드(voc-dashboard.html)에 데이터를 공급한다.
 * 읽기만 하며 이 스프레드시트에는 아무것도 쓰지 않는다
 * (저장하는 것은 Firebase 주소·비밀을 담는 스크립트 속성뿐).
 *
 * 최초 1회: 메뉴 "📊 만족도 조사 > 공개 대시보드 Firebase 연동 설정" 실행
 *   → Realtime Database 주소 + 데이터베이스 보안 비밀 입력
 *   → 시험 저장 후 트리거 2개(응답 접수 시 / 매시간) 자동 설치
 *
 * 이후: 응답이 들어오거나 "🔄 전체 갱신"을 누르면 자동으로 반영된다.
 *******************************************************************/

var DASH_WEB = {
  TITLE: 'FSG 방문 서비스 만족도',
  TZ: 'Asia/Seoul',
  CACHE_SEC: 120,   // 같은 2분 안에 여러 명이 열면 시트를 다시 읽지 않는다 (0이면 캐시 안 함)
};

function doGet(e) {
  // ?format=json — GitHub Pages 대시보드(voc-dashboard.html)가 Firebase 없이 직접 읽을 때 사용
  if (e && e.parameter && e.parameter.format === 'json') {
    return ContentService.createTextOutput(getDashboardJson_()).setMimeType(ContentService.MimeType.JSON);
  }
  // Dashboard.html을 프로젝트에 넣지 않았어도(=GitHub Pages 방식만 쓰는 경우) 오류 대신
  // JSON을 돌려준다. 웹앱 배포를 안 했다면 이 함수는 애초에 호출되지 않는다.
  try {
    var t = HtmlService.createTemplateFromFile('Dashboard');
    t.dataJson = getDashboardJson_();
    return t.evaluate()
      .setTitle(DASH_WEB.TITLE)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  } catch (err) {
    return ContentService.createTextOutput(getDashboardJson_()).setMimeType(ContentService.MimeType.JSON);
  }
}

/* 페이지 안 "새로고침" 버튼이 호출 — 캐시를 무시하고 다시 읽는다 */
function getDashboardJsonFresh() { return getDashboardJson_(true); }

function getDashboardJson_(skipCache) {
  var cache = CacheService.getScriptCache();
  if (!skipCache && DASH_WEB.CACHE_SEC > 0) {
    var hit = cache.get('dash_json');
    if (hit) return hit;
  }
  var json = JSON.stringify(buildDashboardData_()).replace(/<\//g, '<\\/');  // 서술형 의견에 </script> 같은 문자열이 있어도 페이지가 깨지지 않게
  if (DASH_WEB.CACHE_SEC > 0 && json.length < 95000) cache.put('dash_json', json, DASH_WEB.CACHE_SEC);
  return json;
}

function buildDashboardData_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var tz = DASH_WEB.TZ;
  var fmtTs = function (v) {
    if (v instanceof Date) return Utilities.formatDate(v, tz, 'yyyy-MM-dd HH:mm');
    return String(v || '').trim();
  };
  var fmtMonth = function (v) {
    if (v instanceof Date) return Utilities.formatDate(v, tz, 'yyyy-MM');
    return String(v || '').trim();
  };
  var isMonth = function (s) { return /^\d{4}-\d{2}$/.test(s); };

  // ---- FSR명단 ----
  var roster = [];
  var rs = ss.getSheetByName(SHEETS.ROSTER);
  if (rs && rs.getLastRow() > 1) {
    rs.getRange(2, 1, rs.getLastRow() - 1, 4).getValues().forEach(function (r) {
      if (r[3]) roster.push({ team: String(r[1]).trim(), grade: String(r[2]).trim(), name: String(r[3]).trim() });
    });
  }

  // ---- 정제데이터 (헤더 이름으로 열을 찾는다 — 열 순서가 바뀌어도 동작) ----
  var recs = [];
  var cs = ss.getSheetByName(SHEETS.CLEAN);
  if (cs && cs.getLastRow() > 1) {
    var vals = cs.getDataRange().getValues();
    var head = vals[0].map(String);
    var ix = function (name) { return head.indexOf(name); };
    var c = {
      ts: ix('응답일시'), month: ix('월'), region: ix('지역'), org: ix('기관명(표준)'), fsr: ix('담당FSR'),
      team: ix('팀'), grade: ix('직급'), model: ix('장비모델'), svc: ix('서비스형태'),
      q1: ix('신속성·일정'), q2: ix('전문성·해결'), q3: ix('응대·마무리'), avg: ix('평균점수'),
      comment: ix('서술형의견'), flag: ix('확인필요'),
    };
    var g = function (r, i) { return i >= 0 && r[i] != null ? r[i] : ''; };
    for (var i = 1; i < vals.length; i++) {
      var r = vals[i];
      var ts = fmtTs(g(r, c.ts));
      if (!ts) continue;
      var q1 = Number(g(r, c.q1)), q2 = Number(g(r, c.q2)), q3 = Number(g(r, c.q3));
      if (!(q1 || q2 || q3)) continue;
      var month = fmtMonth(g(r, c.month)) || ts.slice(0, 7);
      recs.push({
        ts: ts, month: month, region: String(g(r, c.region)).trim(), org: String(g(r, c.org)).trim(),
        fsr: String(g(r, c.fsr)).trim(), team: String(g(r, c.team)).trim(), grade: String(g(r, c.grade)).trim(),
        model: String(g(r, c.model)).trim(), svc: String(g(r, c.svc)).trim(),
        q1: q1, q2: q2, q3: q3, avg: Math.round((q1 + q2 + q3) / 3 * 10000) / 10000,
        comment: String(g(r, c.comment)).trim(), flag: String(g(r, c.flag)).trim(),
      });
    }
  }

  // ---- 방문건수: 월별 총계 (A:B) + 팀별/FSR별 참고표 (긴 형식·피벗 형식 모두 인식) ----
  var total = {}, visits = {}, fsrv = {};
  var vs = ss.getSheetByName(SHEETS.VISITS);
  if (vs && vs.getLastRow() > 1) {
    var v = vs.getDataRange().getValues();
    v.forEach(function (r) {
      var m = fmtMonth(r[0]), n = Number(r[1]);
      if (isMonth(m) && n > 0) total[m] = n;
    });
    var addTeam = function (team, m, n) {
      if (!team || !isMonth(m) || !(n > 0)) return;
      (visits[team] = visits[team] || {})[m] = (visits[team][m] || 0) + n;
    };
    var addFsr = function (name, team, m, n) {
      if (!name || !isMonth(m) || !(n > 0)) return;
      var o = fsrv[name] = fsrv[name] || { team: team };
      o[m] = (o[m] || 0) + n;
    };
    var cell = function (row, col) { return row < v.length && col < v[row].length ? v[row][col] : ''; };
    var str = function (row, col) { return String(cell(row, col)).trim(); };
    var monthsAcross = function (hr, from) {   // 헤더 행에서 'YYYY-MM' 열이 연속으로 몇 개인지
      var out = [];
      for (var k = from; k < v[hr].length; k++) {
        var m = fmtMonth(cell(hr, k));
        if (!isMonth(m)) break;
        out.push([k, m]);
      }
      return out;
    };
    // 헤더를 찾아 그 아래를 읽는다 (헤더는 상위 5행 안에 있다).
    // FSR 참고표를 먼저 찾아 그 열 범위를 "사용됨"으로 표시한다 — 그렇게 하지 않으면
    // FSR 표의 '팀' 열(FSR | 팀 | 2026-08 | ...)이 팀별 피벗표로도 인식되어 팀 방문건수가
    // 두 번 더해진다(실측으로 확인: 팀별 건수가 정확히 2배가 됨).
    var taken = {};   // 'hr:col' → true
    var markTaken = function (hr, from, to) { for (var k = from; k <= to; k++) taken[hr + ':' + k] = true; };
    var rr, k2;
    for (var hr = 0; hr < Math.min(5, v.length); hr++) {
      for (var col = 0; col < v[hr].length; col++) {
        var h0 = str(hr, col), h1 = str(hr, col + 1), h2 = str(hr, col + 2), h3 = str(hr, col + 3);
        if (h0 === '월' && h1 === 'FSR' && h2 === '팀' && h3 === '건수') {          // 긴 형식: 월|FSR|팀|건수
          for (rr = hr + 1; rr < v.length && str(rr, col); rr++) addFsr(str(rr, col + 1), str(rr, col + 2), fmtMonth(cell(rr, col)), Number(cell(rr, col + 3)));
          markTaken(hr, col, col + 3);
        } else if (h0 === 'FSR' && h1 === '팀' && isMonth(fmtMonth(cell(hr, col + 2)))) {  // 피벗: FSR|팀|2026-08|...
          var fm = monthsAcross(hr, col + 2);
          for (rr = hr + 1; rr < v.length && str(rr, col); rr++) {
            for (k2 = 0; k2 < fm.length; k2++) addFsr(str(rr, col), str(rr, col + 1), fm[k2][1], Number(cell(rr, fm[k2][0])));
          }
          markTaken(hr, col, col + 1 + fm.length);
        }
      }
    }
    for (var hr2 = 0; hr2 < Math.min(5, v.length); hr2++) {
      for (var c2 = 0; c2 < v[hr2].length; c2++) {
        if (taken[hr2 + ':' + c2]) continue;                                       // FSR 표에 이미 쓰인 열은 건너뜀
        var g0 = str(hr2, c2), g1 = str(hr2, c2 + 1), g2 = str(hr2, c2 + 2);
        if (g0 === '월' && g1 === '팀' && g2 === '건수') {                          // 긴 형식: 월|팀|건수
          for (rr = hr2 + 1; rr < v.length && str(rr, c2); rr++) addTeam(str(rr, c2 + 1), fmtMonth(cell(rr, c2)), Number(cell(rr, c2 + 2)));
        } else if (g0 === '팀' && isMonth(fmtMonth(cell(hr2, c2 + 1)))) {           // 피벗: 팀|2026-08|...
          var tm = monthsAcross(hr2, c2 + 1);
          for (rr = hr2 + 1; rr < v.length && str(rr, c2); rr++) {
            for (k2 = 0; k2 < tm.length; k2++) addTeam(str(rr, c2), tm[k2][1], Number(cell(rr, tm[k2][0])));
          }
        }
      }
    }
  }
  // 월별 총계가 비어 있으면 팀별 합으로 보완
  if (!Object.keys(total).length) {
    Object.keys(visits).forEach(function (t) { Object.keys(visits[t]).forEach(function (m) { total[m] = (total[m] || 0) + visits[t][m]; }); });
  }

  // ---- 서술형응답: 분류 라벨 ----
  var voc = [];
  var xs = ss.getSheetByName(SHEETS.TEXT);
  if (xs && xs.getLastRow() > 1) {
    var xv = xs.getDataRange().getValues();
    var xh = xv[0].map(String);
    var xi = { ts: xh.indexOf('응답일시'), fsr: xh.indexOf('담당FSR'), cat: xh.indexOf('분류'),
               review: xh.indexOf('검수결과'), action: xh.indexOf('조치 내용'),
               theme: xh.indexOf('테마') };
    if (xi.ts >= 0 && xi.cat >= 0) {
      for (var j = 1; j < xv.length; j++) {
        var xr = xv[j];
        if (!xr[xi.ts]) continue;
        // 공개 대시보드도 시트·보고서와 같은 기준을 쓴다.
        // '오분류'인데 올바른 분류를 적어 두지 않은 건은 신뢰할 분류가 없으므로 제외한다
        // (적어 두었으면 분류 열에 이미 반영되어 있으므로 그대로 표시된다).
        if (xi.review >= 0) {
          var rv = String(xr[xi.review]).trim();
          var ac = xi.action >= 0 ? xr[xi.action] : '';
          if (rv === '오분류' && !manualClass_(rv, ac)) continue;
        }
        // 테마는 ', '로 이어진 문자열이므로 배열로 풀어서 내보낸다.
        // 열이 아직 없는 시트(구버전)에서도 깨지지 않도록 인덱스를 확인한다.
        var th = xi.theme >= 0 ? String(xr[xi.theme] || '').split(',').map(function (s) {
          return s.trim();
        }).filter(Boolean) : [];
        voc.push({ ts: fmtTs(xr[xi.ts]), fsr: xi.fsr >= 0 ? String(xr[xi.fsr]).trim() : '',
                   cat: String(xr[xi.cat]).trim(), themes: th });
      }
    }
  }

  return {
    recs: recs, total: total, visits: visits, fsrv: fsrv, voc: voc, roster: roster,
    updated: Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd HH:mm'),
  };
}


/* ============ Firebase 내보내기 (GitHub Pages 대시보드용) ============
 * voc-dashboard.html(GitHub Pages)이 읽는 JSON을 Firebase Realtime Database의
 * /voc-dashboard/data 에 저장한다. 쓰기는 이 스크립트만 하고 브라우저는 읽기만 한다.
 *
 * 최초 1회: setupFirebasePush() 실행
 *   → 스크립트 속성 FIREBASE_URL / FIREBASE_SECRET 입력 → 시험 저장 → 트리거 설치
 *     (응답 접수 시 + 매시간). CRM 방문건수 가져오기 후 바로 반영하려면 pushDashboardToFirebase() 실행.
 *
 * FIREBASE_URL    : https://<프로젝트>-default-rtdb.<리전>.firebasedatabase.app  (끝에 / 없이)
 * FIREBASE_SECRET : Firebase 콘솔 → 프로젝트 설정 → 서비스 계정 → 데이터베이스 보안 비밀
 *                   (규칙이 auth != null 이어도 서버에서 쓸 수 있게 해 주는 값. 코드가 아닌 스크립트 속성에만 둔다)
 */
var FIREBASE_DATA_PATH = '/voc-dashboard/data.json';

function pushDashboardToFirebase() {
  var props = PropertiesService.getScriptProperties();
  var url = (props.getProperty('FIREBASE_URL') || '').replace(/\/+$/, '');
  var secret = props.getProperty('FIREBASE_SECRET') || '';
  // 아직 연동 설정을 하지 않았으면 조용히 건너뛴다.
  // (여기서 오류를 던지면 "🔄 전체 갱신"과 폼 제출 트리거가 매번 실패로 표시된다 —
  //  공개 대시보드를 쓰지 않는 동안에도 계속 경고가 뜨는 것은 맞지 않다.)
  if (!url) { Logger.log('Firebase 미설정 — 내보내기 건너뜀'); return null; }
  var data = buildDashboardData_();
  data.pushedAt = data.updated;
  var res = UrlFetchApp.fetch(url + FIREBASE_DATA_PATH + (secret ? '?auth=' + encodeURIComponent(secret) : ''), {
    method: 'put', contentType: 'application/json', payload: JSON.stringify(data), muteHttpExceptions: true,
  });
  if (res.getResponseCode() >= 300) {
    throw new Error('Firebase 저장 실패 (' + res.getResponseCode() + '): ' + res.getContentText().slice(0, 200));
  }
  // 일자별 백업 (같은 날은 덮어씀) — 복구용, 30일 지난 것은 setup 시점에만 정리
  try {
    var day = Utilities.formatDate(new Date(), DASH_WEB.TZ, 'yyyy-MM-dd');
    UrlFetchApp.fetch(url + '/voc-dashboard-backups/' + day + '.json' + (secret ? '?auth=' + encodeURIComponent(secret) : ''), {
      method: 'put', contentType: 'application/json', payload: JSON.stringify(data), muteHttpExceptions: true,
    });
  } catch (err) { Logger.log('백업 실패: ' + err); }
  Logger.log('Firebase 저장 완료: 응답 ' + data.recs.length + '건');
  return data.recs.length;
}

/* 폼 제출 트리거용 — 기존 onFormSubmitHandler가 정제데이터를 먼저 갱신할 시간을 준 뒤 내보낸다 */
function pushAfterFormSubmit() {
  Utilities.sleep(20000);
  pushDashboardToFirebase();
}

function setupFirebasePush() {
  var ui = SpreadsheetApp.getUi();
  var props = PropertiesService.getScriptProperties();
  var r1 = ui.prompt('Firebase 연동 1/2', 'Realtime Database 주소를 입력하세요.\n예: https://xxxx-default-rtdb.asia-southeast1.firebasedatabase.app\n\n현재: ' + (props.getProperty('FIREBASE_URL') || '(없음)'), ui.ButtonSet.OK_CANCEL);
  if (r1.getSelectedButton() !== ui.Button.OK) return;
  if (r1.getResponseText().trim()) props.setProperty('FIREBASE_URL', r1.getResponseText().trim());
  var r2 = ui.prompt('Firebase 연동 2/2', '데이터베이스 보안 비밀(Database secret)을 입력하세요.\n(프로젝트 설정 → 서비스 계정 → 데이터베이스 보안 비밀)\n규칙이 공개 쓰기라면 비워 두세요.\n\n현재: ' + (props.getProperty('FIREBASE_SECRET') ? '(설정됨)' : '(없음)'), ui.ButtonSet.OK_CANCEL);
  if (r2.getSelectedButton() !== ui.Button.OK) return;
  if (r2.getResponseText().trim()) props.setProperty('FIREBASE_SECRET', r2.getResponseText().trim());

  var n;
  try { n = pushDashboardToFirebase(); }
  catch (err) { ui.alert('❌ 시험 저장 실패\n\n' + err.message + '\n\n주소/보안 비밀을 확인한 뒤 다시 실행하세요.'); return; }

  ScriptApp.getProjectTriggers().forEach(function (t) {
    var f = t.getHandlerFunction();
    if (f === 'pushAfterFormSubmit' || f === 'pushDashboardToFirebase') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('pushAfterFormSubmit').forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet()).onFormSubmit().create();
  ScriptApp.newTrigger('pushDashboardToFirebase').timeBased().everyHours(1).create();

  ui.alert('✅ Firebase 연동 완료\n\n· 시험 저장: 응답 ' + n + '건\n· 응답 접수 시 + 매시간 자동으로 내보냅니다.\n· voc-dashboard.html의 FIREBASE_URL에 같은 주소를 넣어 GitHub에 올리면 됩니다.');
}

/* 메뉴 "공개 대시보드 지금 내보내기" — 결과를 화면으로 알려준다.
 * (트리거가 부르는 pushDashboardToFirebase는 화면을 띄우지 않는다) */
function pushDashboardToFirebaseNow() {
  var ui = SpreadsheetApp.getUi();
  var n;
  try {
    n = pushDashboardToFirebase();
  } catch (err) {
    ui.alert('❌ 내보내기 실패\n\n' + err.message);
    return;
  }
  if (n === null) {
    ui.alert('아직 Firebase 연동 설정이 되어 있지 않습니다.\n\n' +
             '메뉴 "📊 만족도 조사 > 공개 대시보드 Firebase 연동 설정"을 먼저 실행해 주세요.');
    return;
  }
  ui.alert('✅ 공개 대시보드로 내보냈습니다.\n\n· 응답 ' + n + '건\n' +
           '· 잠시 후 voc-dashboard.html 에서 새로고침하면 반영됩니다.');
}