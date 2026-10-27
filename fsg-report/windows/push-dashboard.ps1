# FSG 대시보드 올리기 — 다운로드 폴더(또는 설정한 폴더)의 최신 CRM 파일을 대시보드에 올린다
# 처음 한 번 setup.ps1(또는 setup.bat)을 실행해 두면, 이후에는 바탕화면 아이콘을 더블클릭하면 된다.
param([switch]$DryRun, [switch]$NoGit, [switch]$NoOpen, [switch]$AllowOlder, [switch]$NoReport, [switch]$NoDrive, [string]$Period = '')
$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

function Plain([string]$enc) {
    if ($env:FSG_LAUNCHER_PLAINTEXT -eq '1') { return $enc }   # 시험용(리눅스에는 DPAPI가 없음). 운영에서는 쓰지 않는다
    $ss = ConvertTo-SecureString $enc
    $b = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($ss)
    try { return [Runtime.InteropServices.Marshal]::PtrToStringAuto($b) } finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($b) }
}

function Read-Secret([string]$label) {   # 저장하지 않는 PC: 올릴 때마다 입력(화면에 보이지 않음)
    if ($env:FSG_LAUNCHER_PLAINTEXT -eq '1') { return (Read-Host $label) }   # 시험용
    $ss = Read-Host $label -AsSecureString
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
    if ($AllowOlder) { $nodeArgs += '--allow-older' }
    else {
        $saved = (-not [string]::IsNullOrEmpty($cfg.codeEnc)) -and (-not [string]::IsNullOrEmpty($cfg.pwEnc))
        if ($saved) {
            $env:FSG_KPI_CODE = Plain $cfg.codeEnc
            $env:FSG_ADMIN_PW = Plain $cfg.pwEnc
        } else {
            Write-Host '이 PC는 접근 코드·비밀번호를 저장하지 않는 설정입니다. 입력해 주세요(화면에 보이지 않습니다).'
            $env:FSG_KPI_CODE = Read-Secret '대시보드 접근 코드'
            $env:FSG_ADMIN_PW = Read-Secret '관리자 비밀번호'
        }
        $mail = $cfg.email; if ([string]::IsNullOrWhiteSpace($mail)) { $mail = Read-Host '관리자 이메일' }
        $env:FSG_ADMIN_EMAIL = $mail
    }
    & node @nodeArgs
    $rc = $LASTEXITCODE
    if ($rc -ne 0) { throw "올리기에 실패했습니다(종료 코드 $rc). 위 메시지를 확인하세요." }

    # 같은 파일로 월간·분기 보고서 데이터도 만든다(Colab 없이, 수 초). 실패해도 대시보드 올리기는 이미 끝난 상태다.
    if (-not $NoReport -and -not $DryRun) {
        $per = $Period
        if ([string]::IsNullOrWhiteSpace($per)) { $per = (Get-Date).AddMonths(-1).ToString('yyyy-MM', [Globalization.CultureInfo]::InvariantCulture) }
        $outDir = Join-Path $cfg.folder 'FSG_report_out'
        Write-Host ''
        Write-Host "보고서 데이터를 만듭니다(기간 $per)..." -ForegroundColor Cyan
        & node 'fsg-report/report-data.js' '--period' $per '--dir' $cfg.folder '--out' $outDir
        if ($LASTEXITCODE -eq 0) {
            Write-Host "보고서 데이터: $outDir  (report-data_$per.json · 검산_$per.xlsx)" -ForegroundColor Green
            # 고객 만족도(VOC 대시보드) 월 집계도 같은 json 에 합쳐 넣는다 — 실패해도 나머지는 정상
            & node 'fsg-report/voc-summary.js' '--period' $per '--out' $outDir
            if ($LASTEXITCODE -ne 0) { Write-Host '만족도 집계는 건너뜀(보고 데이터는 정상). 위 메시지를 확인하세요.' -ForegroundColor Yellow }
            Write-Host '보고서를 만들 때 report-data 파일(과 검산 xlsx)을 Claude에 올리세요. 다른 기간(분기 등)은 README의 report-data 명령을 쓰세요.'
        } else {
            Write-Host '보고서 데이터 만들기는 실패했습니다(대시보드 올리기는 정상 완료). 위 메시지를 확인하세요.' -ForegroundColor Yellow
        }
    }

    # 만족도 시트용: 같은 CRM 파일(같은 날짜의 활동 파일 + 최근 Serial No)을 Drive 「CRM_원본」 폴더로 올린다(설정했을 때만).
    # 실패해도 대시보드 올리기는 이미 끝난 상태다. 토큰은 환경변수로만 넘기고 화면에 쓰지 않는다.
    $driveDone = $false
    if (-not $NoDrive -and -not $DryRun -and -not [string]::IsNullOrWhiteSpace($cfg.driveUploadUrl)) {
        $day = [regex]::Match($latest.Name, '\d{4}_\d{2}_\d{2}').Value
        $files = @($acts | Where-Object { $day -and $_.Name.Contains($day) } | ForEach-Object { $_.FullName })
        if ($files.Count -eq 0) { $files = @($latest.FullName) }
        $ser = @(Get-ChildItem -LiteralPath $cfg.folder -File -Filter '*.xlsx' -ErrorAction SilentlyContinue | Where-Object { $_.Name -match 'Serial' } | Sort-Object LastWriteTime -Descending | Select-Object -First 1)
        if ($ser.Count -gt 0 -and ((Get-Date) - $ser[0].LastWriteTime).TotalDays -lt 8) { $files += $ser[0].FullName }
        Write-Host ''
        Write-Host '만족도 시트용 CRM 파일을 Drive 로 올립니다...' -ForegroundColor Cyan
        $env:FSG_DRIVE_URL = $cfg.driveUploadUrl
        if (-not [string]::IsNullOrEmpty($cfg.driveTokEnc)) { $env:FSG_DRIVE_TOKEN = Plain $cfg.driveTokEnc }
        else { $env:FSG_DRIVE_TOKEN = Read-Secret 'Drive 업로드 토큰' }
        $upArgs = @('fsg-report/upload-drive.js')
        foreach ($f in $files) { $upArgs += '--file'; $upArgs += $f }
        & node @upArgs
        if ($LASTEXITCODE -eq 0) { $driveDone = $true }
        else { Write-Host 'Drive 업로드는 실패했습니다(대시보드 올리기는 정상 완료). 아래에서 열리는 Drive 폴더에 파일을 직접 끌어다 놓으세요.' -ForegroundColor Yellow }
    }

    if (-not $DryRun) {
        Write-Host ''
        Write-Host '대시보드에 올렸습니다. 팀장 화면은 새로고침하거나 5분 안에 자동 반영됩니다.' -ForegroundColor Green
        if ($driveDone) { Write-Host '만족도 시트용 파일도 Drive 로 올렸습니다 — 2시간 안에 자동 반영됩니다.' -ForegroundColor Green }
        else { Write-Host '만족도 시트는 같은 파일을 Drive의 CRM_원본 폴더에 올리면 2시간 안에 자동 반영됩니다.' }
        if (-not $driveDone -and -not $NoOpen -and $cfg.driveUrl) {
            Write-Host '파일 위치와 Drive 폴더를 엽니다 — 파일을 Drive 창으로 끌어다 놓으세요.'
            Start-Process explorer.exe -ArgumentList "/select,`"$($latest.FullName)`""
            Start-Process $cfg.driveUrl
        }
    }
}
catch { Write-Host ''; Write-Host "오류: $($_.Exception.Message)" -ForegroundColor Red; $global:LASTEXITCODE = 1 }
finally { Remove-Item Env:FSG_KPI_CODE, Env:FSG_ADMIN_EMAIL, Env:FSG_ADMIN_PW, Env:FSG_DRIVE_TOKEN, Env:FSG_DRIVE_URL -ErrorAction SilentlyContinue }
