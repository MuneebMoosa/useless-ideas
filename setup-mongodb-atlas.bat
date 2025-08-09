@echo off
echo 🗄️ MongoDB Atlas Setup for Spoiler Ending Checker
echo.

echo Step 1: After creating your Atlas account and cluster:
echo.
echo 1. In MongoDB Atlas Dashboard:
echo    - Click "Connect" on your cluster
echo    - Choose "Connect your application"
echo    - Select "Node.js" and version "4.1 or later"
echo    - Copy the connection string
echo.

echo 2. Your connection string will look like:
echo    mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/spoiler-checker
echo.

echo Step 3: Create Database User:
echo    - In Atlas, go to "Database Access"
echo    - Click "Add New Database User"
echo    - Username: spoileruser
echo    - Password: (create a strong password)
echo    - Database User Privileges: Read and write to any database
echo.

echo Step 4: Whitelist IP Address:
echo    - Go to "Network Access"
echo    - Click "Add IP Address"
echo    - Choose "Allow Access from Anywhere" (0.0.0.0/0)
echo    - Or add your current IP address
echo.

echo Step 5: Update your .env file:
echo    Replace the MONGODB_URI line with your Atlas connection string
echo.

echo Example .env update:
echo MONGODB_URI=mongodb+srv://spoileruser:yourpassword@cluster0.xxxxx.mongodb.net/spoiler-checker
echo.

echo After updating .env:
echo 1. Restart your backend server
echo 2. You should see "✅ Connected to MongoDB" in the logs
echo 3. Movie searches will now be cached for faster performance!
echo.

pause
