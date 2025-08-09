@echo off
echo 🗄️ Installing MongoDB Community Server Locally
echo.

echo This will download and install MongoDB on your computer
echo Benefits: No account needed, works offline, completely free
echo.

echo Step 1: Download MongoDB
echo Opening MongoDB download page...
start https://www.mongodb.com/try/download/community

echo.
echo Step 2: Installation Instructions
echo 1. Select:
echo    - Version: 7.0 (Current)
echo    - Platform: Windows
echo    - Package: msi
echo.
echo 2. Download and run the installer
echo.
echo 3. During installation:
echo    - Check "Install MongoDB as a Service"
echo    - Check "Run service as Network Service user"
echo    - Install MongoDB Compass (optional GUI)
echo.
echo 4. After installation:
echo    - MongoDB service starts automatically
echo    - Your app will connect to: mongodb://localhost:27017/spoiler-checker
echo.

echo Step 3: Update your app
echo The .env file is already configured for local MongoDB!
echo Just restart your backend server after MongoDB is installed.
echo.

echo Press any key to open the download page...
pause >nul
