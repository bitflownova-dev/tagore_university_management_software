# Tagore College Management System - Startup Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Tagore College Management System" -ForegroundColor Cyan
Write-Host "  Starting Application..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Function to check if a port is in use
function Test-Port {
    param($Port)
    $connection = New-Object System.Net.Sockets.TcpClient
    try {
        $connection.Connect("localhost", $Port)
        $connection.Close()
        return $true
    } catch {
        return $false
    }
}

# Function to kill process on port
function Stop-ProcessOnPort {
    param($Port)
    $process = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
    if ($process) {
        Write-Host "Stopping process on port $Port..." -ForegroundColor Yellow
        Stop-Process -Id $process -Force -ErrorAction SilentlyContinue
        Start-Sleep -Seconds 2
    }
}

# Check and fix corrupted files
Write-Host "Checking for corrupted files..." -ForegroundColor Yellow
$corruptedFiles = @()

# Check main.tsx
if (Test-Path "frontend-web\src\main.tsx") {
    $content = Get-Content "frontend-web\src\main.tsx" -Raw -ErrorAction SilentlyContinue
    if ($content -match '\x00' -or $content -match '\x1a' -or $content.Length -lt 50) {
        $corruptedFiles += "main.tsx"
    }
}

# Check authStore.ts
if (Test-Path "frontend-web\src\stores\authStore.ts") {
    $content = Get-Content "frontend-web\src\stores\authStore.ts" -Raw -ErrorAction SilentlyContinue
    if ($content -match '\x00' -or $content -match '\x1a' -or $content.Length -lt 50) {
        $corruptedFiles += "authStore.ts"
    }
}

if ($corruptedFiles.Count -gt 0) {
    Write-Host "Found corrupted files: $($corruptedFiles -join ', ')" -ForegroundColor Red
    Write-Host "Please restore these files from backup or version control." -ForegroundColor Red
    Write-Host "Or press Ctrl+Z to undo recent changes in VS Code." -ForegroundColor Yellow
    Write-Host ""
    $continue = Read-Host "Do you want to continue anyway? (y/n)"
    if ($continue -ne 'y') {
        exit 1
    }
}

# Check if ports are in use
Write-Host "Checking ports..." -ForegroundColor Yellow
if (Test-Port 3000) {
    Write-Host "Port 3000 (Backend) is in use. Stopping process..." -ForegroundColor Yellow
    Stop-ProcessOnPort 3000
}
if (Test-Port 3001) {
    Write-Host "Port 3001 (Frontend) is in use. Stopping process..." -ForegroundColor Yellow
    Stop-ProcessOnPort 3001
}

# Check if node_modules exist and are healthy
$backendNodeModules = Test-Path "backend\node_modules"
$frontendNodeModules = Test-Path "frontend-web\node_modules"

if (-not $backendNodeModules) {
    Write-Host "Backend dependencies not found. Installing..." -ForegroundColor Yellow
    Set-Location backend
    npm install --legacy-peer-deps
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to install backend dependencies!" -ForegroundColor Red
        Set-Location ..
        exit 1
    }
    Set-Location ..
}

if (-not $frontendNodeModules) {
    Write-Host "Frontend dependencies not found. Installing..." -ForegroundColor Yellow
    Set-Location frontend-web
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to install frontend dependencies!" -ForegroundColor Red
        Set-Location ..
        exit 1
    }
    Set-Location ..
}

Write-Host ""
Write-Host "Starting Backend Server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; Write-Host 'Backend Server (Port 3000)' -ForegroundColor Green; npm run start:dev"

Write-Host "Waiting for backend to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host "Starting Frontend Server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\frontend-web'; Write-Host 'Frontend Server (Port 3001)' -ForegroundColor Green; npm run dev"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Application Starting!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend:  http://localhost:3000" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:3001" -ForegroundColor Yellow
Write-Host ""
Write-Host "Waiting 10 seconds before opening browser..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Open browser
Write-Host "Opening application in browser..." -ForegroundColor Green
Start-Process "http://localhost:3001"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Application Started Successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Press any key to exit this script (servers will continue running)..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
