# Quick Frontend-Only Start
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Starting Frontend Only" -ForegroundColor Cyan
Write-Host "  (Backend has dependency issues)" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check port
if (Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue) {
    Write-Host "Stopping process on port 3001..." -ForegroundColor Yellow
    $process = Get-NetTCPConnection -LocalPort 3001 | Select-Object -ExpandProperty OwningProcess -Unique
    Stop-Process -Id $process -Force
    Start-Sleep -Seconds 2
}

Write-Host "Starting Frontend Server..." -ForegroundColor Green
Set-Location frontend-web
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev"
Set-Location ..

Write-Host ""
Write-Host "Waiting for server to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 8

Write-Host ""
Write-Host "Opening browser..." -ForegroundColor Green
Start-Process "http://localhost:3001"

Write-Host ""
Write-Host "Frontend running at: http://localhost:3001" -ForegroundColor Cyan
Write-Host ""
Write-Host "Note: Backend is not running due to dependency issues." -ForegroundColor Yellow
Write-Host "The UI will work but API calls will fail." -ForegroundColor Yellow
Write-Host ""
