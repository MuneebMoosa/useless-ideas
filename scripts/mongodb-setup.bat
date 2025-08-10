@echo off
echo 🗄️ MongoDB Setup Guide for Spoiler Ending Checker
echo.

echo Option 1: Download MongoDB Community Server
echo.
echo 1. Go to: https://www.mongodb.com/try/download/community
echo 2. Select:
echo    - Version: 7.0 (Current)
echo    - Platform: Windows
echo    - Package: msi
echo 3. Download and install
echo 4. During installation:
echo    - Check "Install MongoDB as a Service"
echo    - Check "Run service as Network Service user"
echo    - Install MongoDB Compass (GUI tool)
echo.

echo Option 2: MongoDB Atlas (Cloud - Free)
echo.
echo 1. Go to: https://www.mongodb.com/atlas
echo 2. Create free account
echo 3. Create free cluster (M0 Sandbox)
echo 4. Get connection string
echo 5. Update backend\.env with your Atlas connection string
echo.

echo After MongoDB is installed:
echo 1. MongoDB service should start automatically
echo 2. Restart your backend server
echo 3. You'll see "✅ Connected to MongoDB" in the logs
echo 4. Movie data will be cached for faster searches
echo.

echo Benefits of MongoDB:
echo ✅ Faster movie searches (cached results)
echo ✅ Search statistics and popular movies
echo ✅ Better performance
echo ✅ Data persistence between restarts
echo.

pause
