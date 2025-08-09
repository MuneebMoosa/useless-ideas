@echo off
echo 🔧 Simple npm Installation Script
echo.

echo Installing backend dependencies...
cd backend
call "C:\Program Files\nodejs\npm" install
if %errorlevel% neq 0 (
    echo Trying alternative path...
    call npm install
)
echo Backend done!
echo.

echo Installing frontend dependencies...
cd ..\frontend
call "C:\Program Files\nodejs\npm" install
if %errorlevel% neq 0 (
    echo Trying alternative path...
    call npm install
)
echo Frontend done!
echo.

cd ..
echo ✅ Installation complete!
echo.
echo To start your app:
echo 1. Double-click start-backend.bat
echo 2. Double-click start-frontend.bat
echo 3. Open http://localhost:3000
echo.
pause
