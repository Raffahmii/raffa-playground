# Jalankan dari folder raffa-playground:  powershell -ExecutionPolicy Bypass -File .\setup-assets.ps1
$src = 'D:\Portfolio\identitas\assets'
$dst = Join-Path $PSScriptRoot 'public'
function Mk($p) { New-Item -ItemType Directory -Force -Path $p | Out-Null }

# Foto
Mk "$dst\img"
Copy-Item "$src\04_Photos\final\utama_*.webp"  "$dst\img\" -Force
Copy-Item "$src\04_Photos\final\avatar_*.webp" "$dst\img\" -Force

# Grafik
Mk "$dst\stickers"; Mk "$dst\shapes"; Mk "$dst\textures"; Mk "$dst\icons"
Copy-Item "$src\06_Graphics\stickers-hero\*" "$dst\stickers\" -Force
Copy-Item "$src\06_Graphics\shapes\*"        "$dst\shapes\"   -Force
Copy-Item "$src\06_Graphics\textures\*"      "$dst\textures\" -Force
Copy-Item "$src\06_Graphics\icons\*"         "$dst\icons\"    -Force

# Brand + dokumen
Mk "$dst\brand"
Copy-Item "$src\05_Brand\monogram-r*.svg"  "$dst\brand\" -Force
Copy-Item "$src\05_Brand\woodmark*.svg"    "$dst\brand\" -Force
Copy-Item "$src\05_Brand\favicon.svg"      "$dst\favicon.svg" -Force
Copy-Item "$src\05_Brand\favicon-32.png"   "$dst\favicon-32.png" -Force
Copy-Item "$src\05_Brand\og-image.png"     "$dst\og-image.png" -Force
Copy-Item "$src\10_Documents\cv-raffa.pdf" "$dst\cv-raffa.pdf" -Force

# Project (folder lama -> slug)
$map = @{ 'jejak_visual'='jejak-visual'; 'amazon_sales_analysis'='amazon-sales-analysis'; 'mading_indonesia'='mading-indonesia'; 'retail_performance'='retail-performance'; 'kesenian'='kesenian' }
foreach ($k in $map.Keys) {
  $d = "$dst\img\projects\$($map[$k])"; Mk $d
  foreach ($n in 'cover','preview','desktop-1','mobile-1') {
    Get-ChildItem "$src\08_Projects\$k" -Filter "$n.*" -ErrorAction SilentlyContinue | Copy-Item -Destination $d -Force
  }
}
Write-Host 'Selesai. Cek folder public\ lalu jalankan: npm run dev'
