param(
  [switch]$VerifyOnly
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$destination = Join-Path $root "public\evidence"

$assets = @(
  @{ Id = "1ncgSVxJxtpC9xYBjWvn5p0pKbsWpzTh3"; File = "windmill-project-summary.pdf"; Kind = "PDF"; Pages = 3 },
  @{ Id = "148hyEmGzXFadY36TYxFuCE1ysxpE4MId"; File = "windmill-contribution-profile.md"; Kind = "Markdown" },
  @{ Id = "1mCHTc5X0TsDCyRNCTZde9fUxpjZrdfoY"; File = "windmill-readme.md"; Kind = "Markdown" },
  @{ Id = "1juvxvlez0xyRo5G-i-IR9miEiIsKwh4a"; File = "gcs-daily-snippet-agent.md"; Kind = "Markdown" },
  @{ Id = "1yLhr725eVENS-1bptLrSzoEQ7H1KQXbs"; File = "gcs-hutzpa-creator-popups-slides.pdf"; Kind = "PDF"; Pages = 13 },
  @{ Id = "1I_ui87ovbbuGsjkpc98AFFOCskekoVDw"; File = "gcs-hutzpa-creator-popups-script.pdf"; Kind = "PDF"; Pages = 4 },
  @{ Id = "14rZpe-I65cO479a9CKTAsA7m18kPwjol"; File = "gcs-hutzpa-construction-billing-slides.pdf"; Kind = "PDF"; Pages = 12 },
  @{ Id = "14LOzhbPe8ehuGeOasb9TKbO8LQwMazWk"; File = "gcs-hutzpa-construction-billing-retro.md"; Kind = "Markdown" },
  @{ Id = "1EQFDs8rmybQMk8hdynmPaB1fOUov_Y2I"; File = "gcs-agentic-linkedin-slides.pdf"; Kind = "PDF"; Pages = 9 },
  @{ Id = "1O6ZbwXwzF8m2Sj1tu6GMrugyd5QQwNts"; File = "gcs-pitumi-slides.pdf"; Kind = "PDF"; Pages = 17 },
  @{ Id = "10cFFZt84l3f7qejaBRATWQLnbzYoaGVq"; File = "gcs-llm-api-automation.md"; Kind = "Markdown" },
  @{ Id = "1iTYbX3tgnxtpRzoPHn7kYmMdaynbshS7"; File = "oishifood-landing.md"; Kind = "Markdown" },
  @{ Id = "1XTJoWJWB6ibebQgaiPnM9dl20PRX9ZHq"; File = "gcs-kanban-backend-cli.md"; Kind = "Markdown" },
  @{ Id = "1QlTjx9jj2YGkrk_QpGg5Q2pjQyxgkLOv"; File = "footstep-contribution-profile.md"; Kind = "Markdown" },
  @{ Id = "1UPBuhT5BxFfl0YHs8spMs6tyOPhnNWQt"; File = "footstep-readme.md"; Kind = "Markdown" },
  @{ Id = "19ZpHfAMMvdp6AjU2yzMwLsd2YL9hCEOM"; File = "areum-activity.pdf"; Kind = "PDF"; Pages = 2 }
)

$publicOnlyAssets = @(
  @{ File = "gcs-pitumi-retro-public-summary.md"; Kind = "Markdown" },
  @{ File = "cert-history.png"; Kind = "Image" },
  @{ File = "cert-linuxmaster.png"; Kind = "Image" },
  @{ File = "cert-info-processing.jpg"; Kind = "Image" }
)

# Certificate originals are intentionally published per owner decision.
# Only the internal retrospective original stays forbidden in public assets.
$forbiddenPublicFiles = @(
  "gcs-pitumi-retro.md"
)

$sensitivePattern = "([A-Za-z0-9._%+-]+@(?!example\.com)[A-Za-z0-9.-]+\.[A-Za-z]{2,}|01[016789][-. ]?[0-9]{3,4}[-. ]?[0-9]{4}|sk-[A-Za-z0-9]|AKIA[0-9A-Z]{16})"

New-Item -ItemType Directory -Force -Path $destination | Out-Null

foreach ($fileName in $forbiddenPublicFiles) {
  $forbiddenPath = Join-Path $destination $fileName
  if (Test-Path -LiteralPath $forbiddenPath) {
    throw "Forbidden sensitive public asset exists: $fileName"
  }
}

foreach ($asset in $assets) {
  $output = Join-Path $destination $asset.File

  if (-not $VerifyOnly) {
    $params = @{ fileId = $asset.Id; alt = "media" } | ConvertTo-Json -Compress
    gws drive files get --params $params --output $output | Out-Null
  }

  if (-not (Test-Path -LiteralPath $output)) {
    throw "Missing evidence asset: $($asset.File)"
  }

  $file = Get-Item -LiteralPath $output
  if ($file.Length -le 0) {
    throw "Empty evidence asset: $($asset.File)"
  }

  if ($asset.Kind -eq "Markdown") {
    $content = Get-Content -LiteralPath $output -Raw
    if ($content -match $sensitivePattern) {
      Write-Warning "Potential sensitive text in $($asset.File). Review before commit."
    }
  }

  [pscustomobject]@{
    File = $asset.File
    Kind = $asset.Kind
    Bytes = $file.Length
    Pages = $asset.Pages
  }
}

foreach ($asset in $publicOnlyAssets) {
  $output = Join-Path $destination $asset.File
  if (-not (Test-Path -LiteralPath $output)) {
    throw "Missing reviewed public evidence asset: $($asset.File)"
  }

  $file = Get-Item -LiteralPath $output
  if ($file.Length -le 0) {
    throw "Empty reviewed public evidence asset: $($asset.File)"
  }

  if ($asset.Kind -eq "Markdown") {
    $content = Get-Content -LiteralPath $output -Raw
    if ($content -match $sensitivePattern) {
      throw "Potential sensitive text in reviewed public asset: $($asset.File)"
    }
  }

  [pscustomobject]@{
    File = $asset.File
    Kind = $asset.Kind
    Bytes = $file.Length
    Pages = $null
  }
}
