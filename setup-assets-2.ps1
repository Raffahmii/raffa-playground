# Tambahan aset untuk V2:  powershell -ExecutionPolicy Bypass -File .\setup-assets-2.ps1
$src = 'D:\Portfolio\identitas\assets'
$dst = Join-Path $PSScriptRoot 'public'
New-Item -ItemType Directory -Force -Path "$dst\img\galeri","$dst\img\certs" | Out-Null
Copy-Item "$src\04_Photos\final\galeri\*.jpg" "$dst\img\galeri\" -Force
Copy-Item "$src\04_Photos\final\sertifikat\Sertifikat_English\toeic.jpeg" "$dst\img\certs\toeic.jpeg" -Force
Copy-Item "$src\04_Photos\final\sertifikat\Setifikat_Pegadaian\pegadaian.jpeg" "$dst\img\certs\pegadaian.jpeg" -Force
Write-Host 'Selesai.'
