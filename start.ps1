# BofanMax Personal Website - Dev Server Launcher

$port = 5173
$host_ip = "127.0.0.1"

Write-Host "=================================" -ForegroundColor Cyan
Write-Host "  BofanMax - Dev Server Start" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

if (-not (Test-Path "node_modules")) {
    Write-Host "[WARN] node_modules not found, installing..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] npm install failed." -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
    Write-Host "[OK] Dependencies installed." -ForegroundColor Green
    Write-Host ""
}

if (-not (Test-Path "package.json")) {
    Write-Host "[ERROR] package.json not found." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "[INFO] Starting Vite dev server..." -ForegroundColor Green
Write-Host "       Default: http://${host_ip}:${port}" -ForegroundColor Gray
Write-Host "       (Vite will auto-switch if port is in use)" -ForegroundColor Gray
Write-Host ""

npm run dev
