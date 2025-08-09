@echo off
echo 🎬 Starting Spoiler Ending Checker Frontend...
echo.

cd frontend

echo Checking if dependencies are installed...
if not exist "node_modules" (
    echo ❌ Dependencies not found. Please run setup.bat first.
    pause
    exit /b 1
)

echo ✅ Starting frontend development server...
echo.
echo The app will open at http://localhost:3000
echo Make sure the backend is running on http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo.

npm start
