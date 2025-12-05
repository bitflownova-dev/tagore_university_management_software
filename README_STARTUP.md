# Quick Start Guide

## Starting the Application

### Option 1: Double-click (Windows)
Simply double-click `start.bat` in the project root folder.

### Option 2: PowerShell
```powershell
.\start.ps1
```

### Option 3: Command Prompt
```cmd
start.bat
```

## What the Script Does

1. ✅ Checks for corrupted files
2. ✅ Checks if ports 3000 and 3001 are available
3. ✅ Stops any processes using those ports
4. ✅ Installs dependencies if missing
5. ✅ Starts backend server (Port 3000)
6. ✅ Starts frontend server (Port 3001)
7. ✅ Opens browser automatically to http://localhost:3001

## Manual Start (if needed)

### Backend
```powershell
cd backend
npm run start:dev
```

### Frontend
```powershell
cd frontend-web
npm run dev
```

## Troubleshooting

### Corrupted Files Error
If you see "Found corrupted files", you need to restore them:
1. Press `Ctrl+Z` in VS Code to undo recent changes
2. Or restore from Git: `git restore <filename>`
3. Or recreate the files manually

### Port Already in Use
The script automatically stops processes on ports 3000 and 3001.
If it fails, manually kill them:
```powershell
# Find process on port
Get-NetTCPConnection -LocalPort 3000 | Select-Object OwningProcess
# Kill process
Stop-Process -Id <PID> -Force
```

### Dependencies Issues
If npm install fails, try:
```powershell
# Backend
cd backend
Remove-Item -Recurse -Force node_modules
npm install --legacy-peer-deps

# Frontend
cd frontend-web
Remove-Item -Recurse -Force node_modules
npm install
```

## URLs

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000
- **API Docs**: http://localhost:3000/api

## Stopping the Application

Close the PowerShell windows running the servers, or press `Ctrl+C` in each terminal.
