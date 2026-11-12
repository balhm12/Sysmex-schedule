# 만족도 시트 Apps Script

`survey_analysis.gs` 가 **스프레드시트 「고객만족도조사_구글서베이_Trial」에 붙은 Apps Script 의 전체 코드**다.
이 파일이 `main` 에 올라가면 GitHub Actions(`deploy-apps-script.yml`)가 clasp 로 그 프로젝트에 올린다.
편집기에서 직접 고치면 다음 배포 때 덮어쓰므로, **고치는 곳은 이 파일 하나**로 한다.

## 처음 한 번만 (사용자)

1. **Apps Script API 켜기** — https://script.google.com/home/usersettings 에서 「Google Apps Script API」 사용
2. **스크립트 ID** — 시트 → 확장 프로그램 → Apps Script → 왼쪽 ⚙ 프로젝트 설정 → 「스크립트 ID」 복사
3. **clasp 로그인 토큰** — PC(PowerShell)에서

   ```powershell
   npx @google/clasp@2.4.2 login
   ```

   브라우저에서 이 구글 계정으로 승인하면 `%USERPROFILE%\.clasprc.json` 이 생긴다.
   그 파일 내용 **전체**를 복사한다. (이 값은 계정 접근 토큰이다 — 채팅·저장소에 붙여넣지 않는다.)
4. **GitHub Secrets 넣기** — 저장소 → Settings → Secrets and variables → Actions → New repository secret

   | 이름 | 값 |
   |---|---|
   | `VOC_CLASPRC_JSON` | 3번의 `.clasprc.json` 내용 전체 |
   | `VOC_SCRIPT_ID` | 2번의 스크립트 ID |
   | `VOC_DEPLOYMENT_ID` | (선택) 대시보드 JSON 웹앱 배포 ID |

5. **첫 배포 전 확인** — clasp 는 프로젝트의 코드 파일을 통째로 바꾼다.
   편집기의 현재 코드가 이 파일과 같은지(마지막으로 붙여넣은 버전이 맞는지) 한 번 확인한 뒤
   Actions → 「Deploy Apps Script (만족도)」 → Run workflow 로 수동 실행한다.

비밀값이 아직 없으면 워크플로는 문법만 확인하고 올리지 않는다.

## 올린 뒤 확인

- Actions 실행 결과(초록)
- 시트를 열어 메뉴 「📊 만족도 조사」에 항목이 그대로 있는지
- 「저점수 조치: FS 포털 연동 설정」은 스크립트 속성(`FSTALK_URL`·`FSTALK_SECRET`)을 쓰므로
  코드를 다시 올려도 설정은 유지된다
