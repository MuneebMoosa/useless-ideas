@echo off
echo 🔧 Fixing npm PATH and Installing Dependencies...
echo.

:: Find npm location
set "NPM_PATH="
if exist "%PROGRAMFILES%\nodejs\npm.cmd" (
    set "NPM_PATH=%PROGRAMFILES%\nodejs\npm.cmd"
    echo Found npm at: %PROGRAMFILES%\nodejs\npm.cmd
) else if exist "%PROGRAMFILES(x86)%\nodejs\npm.cmd" (
    set "NPM_PATH=%PROGRAMFILES(x86)%\nodejs\npm.cmd"
    echo Found npm at: %PROGRAMFILES(x86)%\nodejs\npm.cmd
) else if exist "C:\Program Files\nodejs\npm.cmd" (
    set "NPM_PATH=C:\Program Files\nodejs\npm.cmd"
    echo Found npm at: C:\Program Files\nodejs\npm.cmd
) else (
    echo ❌ npm not found in standard locations
    echo Trying to find npm...
    where npm >nul 2>&1
    if %errorlevel% equ 0 (
        set "NPM_PATH=npm"
        echo Found npm in PATH
    ) else (
        echo ❌ npm not found anywhere
        pause
        exit /b 1
    )
)

echo.
echo ✅ Using npm: %NPM_PATH%
echo.

:: Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
echo Current directory: %CD%

"%NPM_PATH%" install
if %errorlevel% neq 0 (
    echo ❌ Backend installation failed
    pause
    exit /b 1
)

echo ✅ Backend dependencies installed!
echo.

:: Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd ..\frontend
echo Current directory: %CD%

"%NPM_PATH%" install
if %errorlevel% neq 0 (
    echo ❌ Frontend installation failed
    pause
    exit /b 1
)

echo ✅ Frontend dependencies installed!
echo.

:: Create npm wrapper scripts
echo 🔧 Creating npm wrapper scripts...
cd ..

echo @echo off > npm-backend.bat
echo cd backend >> npm-backend.bat
echo "%NPM_PATH%" %%* >> npm-backend.bat

echo @echo off > npm-frontend.bat
echo cd frontend >> npm-frontend.bat
echo "%NPM_PATH%" %%* >> npm-frontend.bat

echo ✅ Created npm wrapper scripts!
echo.

echo 🎉 Setup Complete!
echo.
echo Your Spoiler Ending Checker is ready to run!
echo.
echo To start the application:
echo 1. Run: start-backend.bat (in one terminal)
echo 2. Run: start-frontend.bat (in another terminal)
echo 3. Open: http://localhost:3000 in your browser
echo.
echo Or use the wrapper scripts:
echo - npm-backend.bat run dev (to start backend)
echo - npm-frontend.bat start (to start frontend)
echo.
pause
