Write-Host "🎬 Starting Spoiler Ending Checker Frontend..." -ForegroundColor Cyan
Write-Host ""

Set-Location "frontend"

Write-Host "Checking if dependencies are installed..." -ForegroundColor Yellow
if (!(Test-Path "node_modules")) {
    Write-Host "❌ Dependencies not found. Please run .\setup.ps1 first." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "✅ Starting frontend development server..." -ForegroundColor Green
Write-Host ""
Write-Host "The app will open at http://localhost:3000" -ForegroundColor White
Write-Host "Make sure the backend is running on http://localhost:5000" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

npm start
