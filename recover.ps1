# Emergency Recovery Script for Corrupted Files
Write-Host "========================================" -ForegroundColor Red
Write-Host "  EMERGENCY FILE RECOVERY" -ForegroundColor Red
Write-Host "========================================" -ForegroundColor Red
Write-Host ""

Write-Host "WARNING: Detected extensive file corruption!" -ForegroundColor Yellow
Write-Host "This may indicate a disk/storage issue." -ForegroundColor Yellow
Write-Host ""

# Stop all node processes
Write-Host "Stopping all Node.js processes..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2

# Clean corrupted node_modules
Write-Host ""
Write-Host "Step 1: Removing corrupted node_modules..." -ForegroundColor Cyan

if (Test-Path "frontend-web\node_modules") {
    Write-Host "  Removing frontend node_modules..." -ForegroundColor Yellow
    Remove-Item "frontend-web\node_modules" -Recurse -Force -ErrorAction SilentlyContinue
}

if (Test-Path "backend\node_modules") {
    Write-Host "  Removing backend node_modules..." -ForegroundColor Yellow
    Remove-Item "backend\node_modules" -Recurse -Force -ErrorAction SilentlyContinue
}

# Remove package-lock files
Write-Host ""
Write-Host "Step 2: Removing lock files..." -ForegroundColor Cyan
Remove-Item "frontend-web\package-lock.json" -Force -ErrorAction SilentlyContinue
Remove-Item "backend\package-lock.json" -Force -ErrorAction SilentlyContinue

# Recreate essential files
Write-Host ""
Write-Host "Step 3: Recreating corrupted source files..." -ForegroundColor Cyan

# Create index.css if missing
if (-not (Test-Path "frontend-web\src\index.css")) {
    Write-Host "  Creating index.css..." -ForegroundColor Yellow
    @"
:root {
  font-family: 'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}

#root {
  width: 100%;
  min-height: 100vh;
}
"@ | Out-File "frontend-web\src\index.css" -Encoding UTF8
}

# Verify authStore.ts
$authStoreContent = Get-Content "frontend-web\src\stores\authStore.ts" -Raw -ErrorAction SilentlyContinue
if ($authStoreContent -match '\x00' -or $authStoreContent -match '\x1a' -or $authStoreContent.Length -lt 100) {
    Write-Host "  Recreating authStore.ts..." -ForegroundColor Yellow
    @"
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'principal' | 'teacher' | 'student' | 'parent' | 'hr' | 'accountant';
  college?: 'engineering' | 'dental' | 'medical' | 'arts-science' | 'nursing';
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),
      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
    }),
    {
      name: 'auth-storage',
    }
  )
);
"@ | Out-File "frontend-web\src\stores\authStore.ts" -Encoding UTF8
}

# Verify main.tsx
$mainContent = Get-Content "frontend-web\src\main.tsx" -Raw -ErrorAction SilentlyContinue
if ($mainContent -match '\x00' -or $mainContent -match '\x1a' -or $mainContent.Length -lt 100) {
    Write-Host "  Recreating main.tsx..." -ForegroundColor Yellow
    @"
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
"@ | Out-File "frontend-web\src\main.tsx" -Encoding UTF8
}

# Reinstall dependencies
Write-Host ""
Write-Host "Step 4: Installing fresh dependencies..." -ForegroundColor Cyan
Write-Host "  This will take several minutes..." -ForegroundColor Yellow
Write-Host ""

Write-Host "Installing frontend dependencies..." -ForegroundColor Green
Set-Location frontend-web
npm install --force
if ($LASTEXITCODE -ne 0) {
    Write-Host "Frontend installation failed!" -ForegroundColor Red
    Set-Location ..
    exit 1
}
Set-Location ..

Write-Host ""
Write-Host "Installing backend dependencies..." -ForegroundColor Green
Set-Location backend
npm install --legacy-peer-deps --force
if ($LASTEXITCODE -ne 0) {
    Write-Host "Backend installation failed!" -ForegroundColor Red
    Set-Location ..
    exit 1
}
Set-Location ..

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  RECOVERY COMPLETE!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "You can now run: .\start.ps1" -ForegroundColor Cyan
Write-Host ""
Write-Host "IMPORTANT: Check your disk health!" -ForegroundColor Yellow
Write-Host "Run: chkdsk /f D:" -ForegroundColor Yellow
Write-Host ""
