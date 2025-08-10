Write-Host "🚀 Spoiler Ending Checker Setup" -ForegroundColor Cyan
Write-Host ""

Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js first." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "Checking npm installation..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✅ npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm not found. Please restart your terminal." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
Set-Location "backend"
try {
    npm install
    Write-Host "✅ Backend dependencies installed successfully!" -ForegroundColor Green
} catch {
    Write-Host "❌ Backend installation failed" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location "..\frontend"
try {
    npm install
    Write-Host "✅ Frontend dependencies installed successfully!" -ForegroundColor Green
} catch {
    Write-Host "❌ Frontend installation failed" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Set-Location ".."

Write-Host ""
Write-Host "✅ All dependencies installed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Get your API keys:" -ForegroundColor White
Write-Host "   - TMDB API: https://www.themoviedb.org/" -ForegroundColor Gray
Write-Host "   - OpenAI API: https://platform.openai.com/" -ForegroundColor Gray
Write-Host "2. Update backend\.env with your API keys" -ForegroundColor White
Write-Host "3. Run: .\start-backend.ps1 (in one terminal)" -ForegroundColor White
Write-Host "4. Run: .\start-frontend.ps1 (in another terminal)" -ForegroundColor White
Write-Host ""
Read-Host "Press Enter to continue"
