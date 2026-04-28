@echo off
title BofanMax Dev Server
echo =================================
echo   BofanMax - Dev Server Start
echo =================================
echo.

if not exist "node_modules" (
    echo [WARN] node_modules not found, installing...
    call npm install
    if errorlevel 1 (
        echo [ERROR] npm install failed.
        pause
        exit /b 1
    )
    echo [OK] Dependencies installed.
    echo.
)

if not exist "package.json" (
    echo [ERROR] package.json not found.
    pause
    exit /b 1
)

echo [INFO] Starting Vite dev server...
echo        Default: http://127.0.0.1:5173
echo.

call npm run dev

pause
