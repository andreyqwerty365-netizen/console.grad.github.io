$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot

function Assert-True([bool]$condition, [string]$message) {
  if (-not $condition) { throw $message }
}

$pages = @('index.html', 'pslounge.html', 'legal.html', 'privacy.html', 'terms.html')
foreach ($page in $pages) {
  Assert-True (Test-Path -LiteralPath (Join-Path $root $page)) "Missing page: $page"
}

Assert-True (Test-Path -LiteralPath (Join-Path $root 'Dockerfile')) 'Missing Dockerfile'
Assert-True (Test-Path -LiteralPath (Join-Path $root 'nginx.conf')) 'Missing nginx.conf'

$dockerfile = Get-Content -LiteralPath (Join-Path $root 'Dockerfile') -Raw
Assert-True ($dockerfile -match 'nginx') 'Dockerfile must use nginx'

$nginx = Get-Content -LiteralPath (Join-Path $root 'nginx.conf') -Raw
Assert-True ($nginx -match 'listen\s+80') 'nginx must listen on port 80'

$styles = Get-Content -LiteralPath (Join-Path $root 'styles.css') -Raw
Assert-True ($styles -match '\.legal-card\s+h1') 'Legal page h1 must retain heading styles'

$agents = Get-Content -LiteralPath (Join-Path $root 'agents.md') -Raw
Assert-True ($agents -match [regex]::Escape('D:\Проекты\Сайт\Сайт')) 'agents.md contains an outdated project path'

$config = Get-Content -LiteralPath (Join-Path $root '.codex\config.toml') -Raw
Assert-True ($config -match [regex]::Escape('D:\\Проекты\\Сайт\\Сайт')) '.codex/config.toml contains an outdated writable root'

foreach ($page in $pages) {
  $path = Join-Path $root $page
  $html = Get-Content -LiteralPath $path -Raw
  $h1Count = [regex]::Matches($html, '<h1\b', 'IgnoreCase').Count
  Assert-True ($h1Count -eq 1) "$page must contain exactly one h1; found $h1Count"
  $ids = [regex]::Matches($html, '\bid=["'']([^"'']+)["'']', 'IgnoreCase') | ForEach-Object { $_.Groups[1].Value }
  $duplicates = $ids | Group-Object | Where-Object Count -gt 1
  Assert-True (-not $duplicates) "$page contains duplicate IDs: $($duplicates.Name -join ', ')"

  $refs = [regex]::Matches($html, '(?:src|href)=["'']([^"'']+)["'']', 'IgnoreCase') | ForEach-Object { $_.Groups[1].Value }
  foreach ($ref in $refs) {
    if ($ref -match '^(?:https?:|mailto:|tel:|#|data:|javascript:)') { continue }
    $clean = ($ref -split '[?#]')[0]
    if (-not $clean) { continue }
    $target = Join-Path $root $clean.TrimStart('.', '/', '\')
    Assert-True (Test-Path -LiteralPath $target) "$page references missing file: $ref"
  }
}

Write-Output 'Static site checks passed.'
