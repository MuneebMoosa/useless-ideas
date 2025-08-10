Write-Host "🔧 Updating Environment File with API Keys..." -ForegroundColor Cyan
Write-Host ""

$envContent = @"
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/spoiler-checker

# OMDB API Configuration
OMDB_API_KEY=YOUR_OMDB_API_KEY_HERE

# OpenAI API Configuration
OPENAI_API_KEY=YOUR_OPENAI_API_KEY_HERE

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:3000
"@

try {
    Set-Content -Path "backend\.env" -Value $envContent -Encoding UTF8
    Write-Host "✅ Environment file updated successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "API Keys configured:" -ForegroundColor White
    Write-Host "- OMDB API Key: YOUR_KEY_HERE (add your actual key)" -ForegroundColor Gray
    Write-Host "- OpenAI API Key: YOUR_KEY_HERE (add your actual key)" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Install dependencies: .\setup.ps1" -ForegroundColor White
    Write-Host "2. Start backend: .\start-backend.ps1" -ForegroundColor White
    Write-Host "3. Start frontend: .\start-frontend.ps1" -ForegroundColor White
} catch {
    Write-Host "❌ Failed to update environment file: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Read-Host "Press Enter to continue"
