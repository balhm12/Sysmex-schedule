/* 서버용 Firebase 키(2026-11-25) — PC·Colab 에서 도는 Node 프로그램(push-dashboard·report-data·voc-summary)이 쓰는 키.
   화면용 키(각 HTML 의 FIREBASE_API_KEY)에 HTTP 리퍼러 제한을 걸면 Referer 가 없는 이 프로그램들은 로그인이 막힌다.
   그래서 환경변수 FSG_FB_SERVER_KEY(제한 없는 서버용 키)가 있으면 그것을 쓰고, 없으면 지금처럼 화면용 키를 쓴다(제한을 걸기 전까지는 그대로 동작).
   키 값은 저장소에 적지 않는다 — PC 는 사용자 환경변수, Colab 은 노트북에서 os.environ 으로 넣는다. */
function serverKey(fallback) {
  const v = String(process.env.FSG_FB_SERVER_KEY || '').trim();
  return v || fallback;
}
module.exports = { serverKey };
