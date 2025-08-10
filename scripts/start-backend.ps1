Write-Host "🚀 Starting Spoiler Ending Checker Backend..." -ForegroundColor Cyan
Write-Host ""

Set-Location "backend"

Write-Host "Checking if dependencies are installed..." -ForegroundColor Yellow
if (!(Test-Path "node_modules")) {
    Write-Host "❌ Dependencies not found. Please run .\setup.ps1 first." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "Checking environment file..." -ForegroundColor Yellow
if (!(Test-Path ".env")) {
    Write-Host "❌ .env file not found. Please add your API keys to backend\.env" -ForegroundColor Red
    Write-Host ""
    Write-Host "You need:" -ForegroundColor White
    Write-Host "- TMDB_API_KEY (get from https://www.themoviedb.org/)" -ForegroundColor Gray
    Write-Host "- OPENAI_API_KEY (get from https://platform.openai.com/)" -ForegroundColor Gray
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "✅ Starting backend server on http://localhost:5000" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

npm run dev
