#!/bin/bash
# Claude Code on the web 세션 시작 시 개발 도구를 준비한다.
# - jsdom (npm test 의존성)
# - GSD (작업 순서·진행 상황 관리 스킬, ~/.claude 에 전역 설치)
# - agent-browser CLI (클로드가 브라우저로 화면 확인)
# 이미 있으면 건너뛰므로 여러 번 실행해도 안전하다.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-$(pwd)}"

npm install --no-audit --no-fund --loglevel=error

if [ ! -f "$HOME/.claude/skills/gsd-help/SKILL.md" ]; then
  npx --yes @opengsd/gsd-core@latest --claude --global >/dev/null
fi

if ! command -v agent-browser >/dev/null 2>&1; then
  npm install -g agent-browser --no-audit --no-fund --loglevel=error
fi

# 클라우드에서는 Chrome 다운로드가 막혀 있으므로 미리 깔린 Chromium을 쓴다.
if [ -x /opt/pw-browsers/chromium ] && [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  echo 'export AGENT_BROWSER_EXECUTABLE_PATH=/opt/pw-browsers/chromium' >> "$CLAUDE_ENV_FILE"
fi
