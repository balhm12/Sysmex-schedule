# FSG 대시보드 올리기 — 한 번만 하는 설정
# 접근 코드·관리자 비밀번호는 이 PC의 이 Windows 계정으로만 풀 수 있게 암호화(DPAPI)해 저장한다.
# 저장 위치: %LOCALAPPDATA%\fsg-kpi\config.json  (저장소·Drive·채팅 어디에도 올라가지 않는다)
$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$repo = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent   # fsg-report\windows → 저장소 루트
$cfgDir = Join-Path $env:LOCALAPPDATA 'fsg-kpi'
$cfgPath = Join-Path $cfgDir 'config.json'
New-Item -ItemType Directory -Force $cfgDir | Out-Null
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
    $ss = Read-Host "$label$hint" -AsSecureString
    if ($ss.Length -eq 0) { return $oldEnc }
    return (ConvertFrom-SecureString $ss)
}

Write-Host ''
Write-Host '=== FSG 대시보드 올리기 설정 (한 번만) ===' -ForegroundColor Cyan
Write-Host '입력한 값은 이 PC의 이 Windows 계정으로만 풀 수 있게 암호화되어 저장됩니다.'
Write-Host ''
$codeEnc = Ask-Secret '대시보드 접근 코드' $old.codeEnc
$email   = Ask '관리자 이메일' $old.email
$pwEnc   = Ask-Secret '관리자 비밀번호' $old.pwEnc
if (-not $codeEnc -or -not $email -or -not $pwEnc) { throw '접근 코드·관리자 이메일·비밀번호는 모두 필요합니다.' }

$dl = $null
try { $dl = (New-Object -ComObject Shell.Application).NameSpace('shell:Downloads').Self.Path } catch {}
if (-not $dl) { $dl = Join-Path $env:USERPROFILE 'Downloads' }
$defFolder = $dl; if ($old.folder) { $defFolder = $old.folder }
Write-Host ''
Write-Host 'CRM에서 내려받은 파일이 저장되는 폴더입니다. 보통 다운로드 폴더 그대로 두면 됩니다.'
$folder = Ask 'CRM 파일 폴더' $defFolder
if (-not (Test-Path -LiteralPath $folder)) { throw "폴더를 찾을 수 없습니다: $folder" }

Write-Host ''
Write-Host '(선택) 만족도 시트용 Drive 폴더 주소: 브라우저에서 Drive의 CRM_원본 폴더를 열고 주소창 URL을 붙여넣으세요.'
Write-Host '올리기가 끝나면 이 폴더와 방금 파일이 함께 열려 드래그만 하면 됩니다. 필요 없으면 Enter.'
$driveUrl = Ask 'Drive 폴더 주소' $old.driveUrl

$cfg = [ordered]@{ codeEnc = $codeEnc; email = $email; pwEnc = $pwEnc; folder = $folder; driveUrl = $driveUrl; repo = $repo }
($cfg | ConvertTo-Json) | Set-Content -LiteralPath $cfgPath -Encoding UTF8
Write-Host ''
Write-Host "설정을 저장했습니다: $cfgPath" -ForegroundColor Green

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
