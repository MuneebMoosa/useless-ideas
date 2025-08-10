@echo off
echo 📦 Installing Dependencies for Spoiler Ending Checker...
echo.

echo Installing backend dependencies...
cd backend
echo Current directory: %CD%
echo.

echo Running npm install for backend...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Backend npm install failed
    echo.
    echo Trying alternative npm command...
    call "%PROGRAMFILES%\nodejs\npm" install
    if %errorlevel% neq 0 (
        echo ❌ Alternative npm command also failed
        echo Please ensure Node.js and npm are properly installed
        pause
        exit /b 1
    )
)

echo ✅ Backend dependencies installed successfully!
echo.

echo Installing frontend dependencies...
cd ..\frontend
echo Current directory: %CD%
echo.

echo Running npm install for frontend...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Frontend npm install failed
    echo.
    echo Trying alternative npm command...
    call "%PROGRAMFILES%\nodejs\npm" install
    if %errorlevel% neq 0 (
        echo ❌ Alternative npm command also failed
        echo Please ensure Node.js and npm are properly installed
        pause
        exit /b 1
    )
)

echo ✅ Frontend dependencies installed successfully!
echo.
echo 🎉 All dependencies installed!
echo.
echo Next steps:
echo 1. Start backend: run start-backend.bat
echo 2. Start frontend: run start-frontend.bat
echo 3. Open http://localhost:3000 in your browser
echo.
pause
