@echo off
echo 🚀 Starting Spoiler Ending Checker Backend...
echo.

cd backend

echo Checking if dependencies are installed...
if not exist "node_modules" (
    echo ❌ Dependencies not found. Please run setup.bat first.
    pause
    exit /b 1
)

echo Checking environment file...
if not exist ".env" (
    echo ❌ .env file not found. Please add your API keys to backend\.env
    echo.
    echo You need:
    echo - OMDB_API_KEY (get from http://www.omdbapi.com/apikey.aspx)
    echo - OPENAI_API_KEY (get from https://platform.openai.com/)
    echo.
    pause
    exit /b 1
)

echo ✅ Starting backend server on http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo.

npm run dev
