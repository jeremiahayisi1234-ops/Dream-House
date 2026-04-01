# Generates DOCUMENTATION.pdf without Node.js (Windows PowerShell)
$ErrorActionPreference = 'Stop'

$lines = @(
  'Luxury Villa VR (A-Frame) - Examination documentation',
  'GitHub: https://github.com/jeremiahayisi1234-ops/Examination',
  'GitHub Pages: https://jeremiahayisi1234-ops.github.io/Examination/',
  'School: https://IndexNumber.ceiscy.com/Examination',
  '',
  'Six rooms: 2 living, 2 bedrooms, kitchen, dining. Pool shader water.',
  'Nine trees (3 types x 3). Two kids + dog near pool. Lighting: ambient, sun, points.',
  'JS: water-shader.js, pool-orbit.js, scene-helpers.js, procedural-textures.js.',
  'Challenges: mesh timing (object3dset); analytic paths; procedural textures 256px.',
  'Full report: DOCUMENTATION.md / print DOCUMENTATION.html to PDF.'
)

$stream = "BT`n/F1 9 Tf`n50 770 Td`n"
$first = $true
foreach ($line in $lines) {
  if (-not $first) { $stream += "0 -11 Td`n" }
  $esc = $line -replace '\\', '\\\\' -replace '\(', '\(' -replace '\)', '\)'
  $stream += "($esc) Tj`n"
  $first = $false
}
$stream += "ET`n"
$stream = $stream -replace "`r`n", "`n"

$len = [System.Text.Encoding]::ASCII.GetByteCount($stream)

$obj1 = "1 0 obj<< /Type /Catalog /Pages 2 0 R >>`nendobj`n"
$obj2 = "2 0 obj<< /Type /Pages /Kids [3 0 R] /Count 1 >>`nendobj`n"
$obj3 = "3 0 obj<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>`nendobj`n"
$obj4 = "4 0 obj<< /Length $len >>`nstream`n$stream`nendstream`nendobj`n"
$obj5 = "5 0 obj<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>`nendobj`n"

$body = "%PDF-1.4`n" + $obj1 + $obj2 + $obj3 + $obj4 + $obj5
$xrefOffset = [System.Text.Encoding]::ASCII.GetByteCount($body)

function Get-ObjOffset([string]$n) {
  $needle = "$n 0 obj"
  return [System.Text.Encoding]::ASCII.GetByteCount($body.Substring(0, $body.IndexOf($needle)))
}

$o1 = Get-ObjOffset '1'
$o2 = Get-ObjOffset '2'
$o3 = Get-ObjOffset '3'
$o4 = Get-ObjOffset '4'
$o5 = Get-ObjOffset '5'

$xref = @"
xref
0 6
0000000000 65535 f 
$('{0:D10} 00000 n ' -f $o1)
$('{0:D10} 00000 n ' -f $o2)
$('{0:D10} 00000 n ' -f $o3)
$('{0:D10} 00000 n ' -f $o4)
$('{0:D10} 00000 n ' -f $o5)
trailer<< /Size 6 /Root 1 0 R >>
startxref
$xrefOffset
%%EOF
"@

$pdf = $body + $xref
$out = Join-Path $PSScriptRoot 'DOCUMENTATION.pdf'
[System.IO.File]::WriteAllText($out, $pdf, [System.Text.Encoding]::ASCII)
Write-Host "Wrote $out"
