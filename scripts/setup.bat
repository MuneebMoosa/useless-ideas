@echo off
echo 🚀 Spoiler Ending Checker Setup
echo.

echo Checking Node.js installation...
node --version
if %errorlevel% neq 0 (
    echo ❌ Node.js not found in PATH
    echo Please restart your terminal or use Node.js Command Prompt
    pause
    exit /b 1
)

echo Checking npm installation...
npm --version
if %errorlevel% neq 0 (
    echo ❌ npm not found in PATH
    echo Please restart your terminal or use Node.js Command Prompt
    pause
    exit /b 1
)

echo.
echo ✅ Node.js and npm are working!
echo.

echo Installing backend dependencies...
cd backend
npm install
if %errorlevel% neq 0 (
    echo ❌ Backend installation failed
    pause
    exit /b 1
)

echo.
echo Installing frontend dependencies...
cd ..\frontend
npm install
if %errorlevel% neq 0 (
    echo ❌ Frontend installation failed
    pause
    exit /b 1
)

echo.
echo ✅ All dependencies installed successfully!
echo.
echo Next steps:
echo 1. Get your API keys (TMDB and OpenAI)
echo 2. Update backend\.env with your API keys
echo 3. Run start-backend.bat to start the backend
echo 4. Run start-frontend.bat to start the frontend
echo.
pause
