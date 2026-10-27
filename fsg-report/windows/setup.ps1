# FSG 대시보드 올리기 — 한 번만 하는 설정
# 접근 코드·관리자 비밀번호를 이 PC에 저장할지 고른다.
#  - 저장(y): 이 PC의 이 Windows 계정으로만 풀 수 있게 암호화(DPAPI)해 저장 → 이후 아이콘만 누르면 된다. 본인만 쓰는 PC에서만.
#  - 저장 안 함(N, 기본): 올릴 때마다 입력한다. 여러 사람이 쓰는 PC·번갈아 쓰는 PC에서는 이쪽을 권한다.
# 저장 위치: %LOCALAPPDATA%\fsg-kpi\config.json  (저장소·Drive·채팅 어디에도 올라가지 않는다)
$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$repo = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent   # fsg-report\windows → 저장소 루트
$cfgPath = $env:FSG_LAUNCHER_CONFIG   # 시험용 지정. 운영에서는 비어 있다
if (-not $cfgPath) { $cfgPath = Join-Path (Join-Path $env:LOCALAPPDATA 'fsg-kpi') 'config.json' }
New-Item -ItemType Directory -Force (Split-Path $cfgPath -Parent) | Out-Null
$old = $null
if (Test-Path -LiteralPath $cfgPath) { $old = Get-Content -LiteralPath $cfgPath -Raw -Encoding UTF8 | ConvertFrom-Json }

function Ask([string]$label, [string]$default) {
    $hint = ''; if ($default) { $hint = " [$default]" }
    $v = Read-Host "$label$hint"
    if ([string]::IsNullOrWhiteSpace($v)) { return $default }
    return $v.Trim()
}
function Ask-Secret([string]$label, [string]$oldEnc) {
    $hint = ''; if ($oldEnc) { $hint = ' (그대로 두려면 Enter)' }
    if ($env:FSG_LAUNCHER_PLAINTEXT -eq '1') {   # 시험용(리눅스에는 DPAPI가 없음)
        $v = Read-Host "$label$hint"; if ([string]::IsNullOrEmpty($v)) { return $oldEnc }; return $v
    }
    $ss = Read-Host "$label$hint" -AsSecureString
    if ($ss.Length -eq 0) { return $oldEnc }
    return (ConvertFrom-SecureString $ss)
}

Write-Host ''
Write-Host '=== FSG 대시보드 올리기 설정 (한 번만) ===' -ForegroundColor Cyan
Write-Host '접근 코드와 관리자 비밀번호를 이 PC에 저장할까요?'
Write-Host '  y = 본인만 쓰는 PC. 이 Windows 계정으로만 풀 수 있게 암호화해 저장 → 이후 아이콘만 누르면 됩니다.'
Write-Host '  n = 여러 사람이 쓰거나 번갈아 쓰는 PC. 저장하지 않고 올릴 때마다 입력합니다. (기본)'
$saveAns = Read-Host '저장할까요? (y/N)'
$save = ($saveAns -match '^[yY]')
Write-Host ''
$email = Ask '관리자 이메일' $old.email
if (-not $email) { throw '관리자 이메일이 필요합니다.' }
$codeEnc = ''; $pwEnc = ''
if ($save) {
    $codeEnc = Ask-Secret '대시보드 접근 코드' $old.codeEnc
    $pwEnc   = Ask-Secret '관리자 비밀번호' $old.pwEnc
    if (-not $codeEnc -or -not $pwEnc) { throw '저장하려면 접근 코드와 비밀번호가 모두 필요합니다.' }
} else { Write-Host '접근 코드·비밀번호는 저장하지 않습니다. 올릴 때마다 물어봅니다.' }

$dl = $null
try { $dl = (New-Object -ComObject Shell.Application).NameSpace('shell:Downloads').Self.Path } catch {}
if (-not $dl) { $dl = Join-Path ([Environment]::GetFolderPath('UserProfile')) 'Downloads' }
$defFolder = $dl; if ($old.folder) { $defFolder = $old.folder }
Write-Host ''
Write-Host 'CRM에서 내려받은 파일이 저장되는 폴더입니다. 보통 다운로드 폴더 그대로 두면 됩니다.'
$folder = Ask 'CRM 파일 폴더' $defFolder
if (-not (Test-Path -LiteralPath $folder)) { throw "폴더를 찾을 수 없습니다: $folder" }

Write-Host ''
Write-Host '(선택) 만족도 시트용 Drive 폴더 주소: 브라우저에서 Drive의 CRM_원본 폴더를 열고 주소창 URL을 붙여넣으세요.'
Write-Host '올리기가 끝나면 이 폴더와 방금 파일이 함께 열려 드래그만 하면 됩니다. 필요 없으면 Enter.'
$driveUrl = Ask 'Drive 폴더 주소' $old.driveUrl

Write-Host ''
Write-Host '(선택) 만족도 시트로 CRM 파일 자동 업로드: 만족도 시트의 Apps Script 를 웹 앱으로 배포한 주소(…/exec)와,'
Write-Host '시트 메뉴 「CRM 업로드 입구: 토큰 새로 만들기」에서 받은 토큰을 넣으면 아이콘이 파일을 Drive CRM_원본 폴더로 올려 줍니다. 필요 없으면 Enter.'
$driveUp = Ask 'Drive 업로드 주소 (…/exec)' $old.driveUploadUrl
$driveTokEnc = ''
if ($driveUp) {
    if ($save) { $driveTokEnc = Ask-Secret 'Drive 업로드 토큰' $old.driveTokEnc }
    else { Write-Host '토큰은 저장하지 않습니다. 올릴 때마다 물어봅니다.' }
}

$cfg = [ordered]@{ codeEnc = $codeEnc; email = $email; pwEnc = $pwEnc; folder = $folder; driveUrl = $driveUrl; driveUploadUrl = $driveUp; driveTokEnc = $driveTokEnc; repo = $repo }
($cfg | ConvertTo-Json) | Set-Content -LiteralPath $cfgPath -Encoding UTF8
Write-Host ''
Write-Host "설정을 저장했습니다: $cfgPath" -ForegroundColor Green
if ($save) { Write-Host '접근 코드·비밀번호를 암호화해 저장했습니다(이 PC의 이 Windows 계정으로만 사용 가능).' } else { Write-Host '접근 코드·비밀번호는 저장하지 않았습니다.' }

try {
    $desk = [Environment]::GetFolderPath('Desktop')
    $lnk = (New-Object -ComObject WScript.Shell).CreateShortcut((Join-Path $desk 'FSG 대시보드 올리기.lnk'))
    $lnk.TargetPath = Join-Path $PSScriptRoot 'push-dashboard.bat'
    $lnk.WorkingDirectory = $repo
    $lnk.Description = 'CRM 파일을 FSG KPI 대시보드에 올립니다'
    $lnk.Save()
    Write-Host '바탕화면에 「FSG 대시보드 올리기」 아이콘을 만들었습니다.' -ForegroundColor Green
} catch { Write-Host "바탕화면 아이콘은 만들지 못했습니다(무시해도 됩니다): $($_.Exception.Message)" -ForegroundColor Yellow }

Write-Host ''
Write-Host '지금 파일을 잘 찾는지 확인합니다(올리지는 않습니다)...' -ForegroundColor Cyan
& (Join-Path $PSScriptRoot 'push-dashboard.ps1') -DryRun -NoGit
