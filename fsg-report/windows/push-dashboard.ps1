# FSG 대시보드 올리기 — 다운로드 폴더(또는 설정한 폴더)의 최신 CRM 파일을 대시보드에 올린다
# 처음 한 번 setup.ps1(또는 setup.bat)을 실행해 두면, 이후에는 바탕화면 아이콘을 더블클릭하면 된다.
param([switch]$DryRun, [switch]$NoGit, [switch]$NoOpen)
$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

function Plain([string]$enc) {
    if ($env:FSG_LAUNCHER_PLAINTEXT -eq '1') { return $enc }   # 시험용(리눅스에는 DPAPI가 없음). 운영에서는 쓰지 않는다
    $ss = ConvertTo-SecureString $enc
    $b = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($ss)
    try { return [Runtime.InteropServices.Marshal]::PtrToStringAuto($b) } finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($b) }
}

try {
    $cfgPath = $env:FSG_LAUNCHER_CONFIG   # 시험용 지정. 운영에서는 비어 있다
    if (-not $cfgPath) { $cfgPath = Join-Path (Join-Path $env:LOCALAPPDATA 'fsg-kpi') 'config.json' }
    if (-not (Test-Path -LiteralPath $cfgPath)) { throw '먼저 설정을 해 주세요: fsg-report\windows\setup.bat 을 더블클릭(한 번만).' }
    $cfg = Get-Content -LiteralPath $cfgPath -Raw -Encoding UTF8 | ConvertFrom-Json
    $repo = $cfg.repo
    if (-not (Test-Path -LiteralPath (Join-Path (Join-Path $repo 'fsg-report') 'push-dashboard.js'))) { throw "엔진 폴더를 찾을 수 없습니다: $repo (저장소를 옮겼다면 setup.bat 을 다시 실행)" }
    Set-Location -LiteralPath $repo

    if (-not $NoGit) {   # 엔진을 최신으로(실패해도 계속)
        $prev = $ErrorActionPreference; $ErrorActionPreference = 'Continue'
        try { $out = & git pull --ff-only 2>&1; if ($LASTEXITCODE -eq 0) { Write-Host '엔진 최신 확인 완료' } else { Write-Host '엔진 업데이트는 건너뜀(기존 버전으로 진행)' -ForegroundColor Yellow } } catch { Write-Host '엔진 업데이트는 건너뜀(기존 버전으로 진행)' -ForegroundColor Yellow }
        $ErrorActionPreference = $prev
    }

    # 가장 새 활동 파일 확인 — 너무 오래된 파일을 모르고 올리는 일을 막는다
    $acts = @(Get-ChildItem -LiteralPath $cfg.folder -File -Filter '*.xlsx' -ErrorAction SilentlyContinue | Where-Object { $_.Name -match '약속_활동' } | Sort-Object LastWriteTime -Descending)
    if ($acts.Count -eq 0) { throw "활동 파일을 찾지 못했습니다. CRM에서 「2. 모든 약속/활동」을 내보내 이 폴더에 저장하세요: $($cfg.folder)" }
    $latest = $acts[0]
    $age = [int]((Get-Date) - $latest.LastWriteTime).TotalDays
    Write-Host "활동 파일: $($latest.Name)  (받은 지 $age 일)"
    if ($age -ge 8 -and -not $DryRun) {
        $ans = Read-Host "이 파일은 $age 일 전에 받은 것입니다. 그래도 올릴까요? (y/N)"
        if ($ans -notmatch '^[yY]') { Write-Host '취소했습니다.'; return }
    }

    $nodeArgs = @('fsg-report/push-dashboard.js', '--dir', $cfg.folder)
    if ($DryRun) { $nodeArgs += '--dry-run' }
    else {
        $env:FSG_KPI_CODE = Plain $cfg.codeEnc
        $env:FSG_ADMIN_EMAIL = $cfg.email
        $env:FSG_ADMIN_PW = Plain $cfg.pwEnc
    }
    & node @nodeArgs
    $rc = $LASTEXITCODE
    if ($rc -ne 0) { throw "올리기에 실패했습니다(종료 코드 $rc). 위 메시지를 확인하세요." }

    if (-not $DryRun) {
        Write-Host ''
        Write-Host '대시보드에 올렸습니다. 팀장 화면은 새로고침하거나 5분 안에 자동 반영됩니다.' -ForegroundColor Green
        Write-Host '만족도 시트는 같은 파일을 Drive의 CRM_원본 폴더에 올리면 2시간 안에 자동 반영됩니다.'
        if (-not $NoOpen -and $cfg.driveUrl) {
            Write-Host '파일 위치와 Drive 폴더를 엽니다 — 파일을 Drive 창으로 끌어다 놓으세요.'
            Start-Process explorer.exe -ArgumentList "/select,`"$($latest.FullName)`""
            Start-Process $cfg.driveUrl
        }
    }
}
catch { Write-Host ''; Write-Host "오류: $($_.Exception.Message)" -ForegroundColor Red; $global:LASTEXITCODE = 1 }
finally { Remove-Item Env:FSG_KPI_CODE, Env:FSG_ADMIN_EMAIL, Env:FSG_ADMIN_PW -ErrorAction SilentlyContinue }
