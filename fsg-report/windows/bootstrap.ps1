# git·Node 없는 PC: 엔진 코드 + 설치 불필요 Node(22.19 이상)를 $HOME\Sysmex-engine 에 준비한다. PowerShell 에서
#   (irm https://raw.githubusercontent.com/balhm12/Sysmex-schedule/main/fsg-report/windows/bootstrap.ps1).TrimStart([char]0xFEFF) | iex
& {
$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$root = Join-Path $HOME 'Sysmex-engine'
$tmp  = Join-Path ([IO.Path]::GetTempPath()) 'fsg-bootstrap'
if (Test-Path $tmp) { Remove-Item $tmp -Recurse -Force }
New-Item -ItemType Directory -Force $root, $tmp | Out-Null
Write-Host '1/4 엔진 코드를 내려받는 중...'
Invoke-WebRequest 'https://github.com/balhm12/Sysmex-schedule/archive/refs/heads/main.zip' -OutFile (Join-Path $tmp 'engine.zip') -UseBasicParsing
Expand-Archive (Join-Path $tmp 'engine.zip') (Join-Path $tmp 'engine')
Copy-Item (Join-Path (Join-Path $tmp 'engine') 'Sysmex-schedule-main\*') $root -Recurse -Force
$nodeDir = Join-Path (Join-Path $root 'tools') 'node'
$nodeVer = 'v22.22.2'; $nodeSha = '7c93e9d92bf68c07182b471aa187e35ee6cd08ef0f24ab060dfff605fcc1c57c'
$need = $true
$nodeExe = Join-Path $nodeDir 'node.exe'
if (Test-Path $nodeExe) {
  $cur = (& $nodeExe --version).TrimStart('v').Split('.') | ForEach-Object { [int]$_ }
  if (($cur[0] -gt 22) -or ($cur[0] -eq 22 -and $cur[1] -ge 19)) { $need = $false }
}
if ($need) {
  Write-Host "2/4 Node.js $nodeVer (설치 없이 쓰는 ZIP)를 내려받는 중... 약 35MB"
  $zip = Join-Path $tmp 'node.zip'
  Invoke-WebRequest "https://nodejs.org/dist/$nodeVer/node-$nodeVer-win-x64.zip" -OutFile $zip -UseBasicParsing
  if ((Get-FileHash $zip -Algorithm SHA256).Hash.ToLower() -ne $nodeSha) { throw 'Node 파일의 체크섬이 맞지 않습니다. 다시 시도하세요.' }
  Expand-Archive $zip (Join-Path $tmp 'node')
  New-Item -ItemType Directory -Force (Split-Path $nodeDir -Parent) | Out-Null
  if (Test-Path $nodeDir) { Remove-Item $nodeDir -Recurse -Force }
  Move-Item (Join-Path (Join-Path $tmp 'node') "node-$nodeVer-win-x64") $nodeDir
} else { Write-Host '2/4 Node.js는 이미 최신입니다.' }
Write-Host '3/4 Node.js 위치를 사용자 PATH에 등록합니다(이 계정에만 적용).'
$up = [Environment]::GetEnvironmentVariable('Path', 'User')
if (($up -split ';') -notcontains $nodeDir) { [Environment]::SetEnvironmentVariable('Path', (($up + ';' + $nodeDir).TrimStart(';')), 'User') }
$env:Path = "$nodeDir;$env:Path"
Write-Host '4/4 필요한 부품(npm install)을 설치합니다...'
Set-Location $root
& (Join-Path $nodeDir 'npm.cmd') install --no-audit --no-fund
if ($LASTEXITCODE -ne 0) { throw 'npm install에 실패했습니다.' }
Write-Host ('Node ' + (& (Join-Path $nodeDir 'node.exe') --version) + ' 준비 완료. 열린 폴더에서 setup.bat 을 더블클릭하세요.') -ForegroundColor Green
explorer (Join-Path (Join-Path $root 'fsg-report') 'windows')
}
