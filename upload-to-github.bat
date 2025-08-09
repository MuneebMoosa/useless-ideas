@echo off
echo 🚀 SPOILER ENDING CHECKER - GitHub Upload Script
echo ================================================

echo.
echo ✅ Checking Git status...
git status

echo.
echo 📦 Adding all files to Git...
git add .

echo.
echo 💬 Creating commit...
git commit -m "🎬 Spoiler Ending Checker: Full-stack movie spoiler app with AI-powered tiered spoilers"

echo.
echo 🌐 Setting up GitHub remote...
echo Please enter your GitHub repository URL (e.g., https://github.com/username/spoiler-ending-checker.git):
set /p REPO_URL="Repository URL: "

git remote add origin %REPO_URL%

echo.
echo 🚀 Pushing to GitHub...
git branch -M main
git push -u origin main

echo.
echo ✅ SUCCESS! Your project is now on GitHub!
echo.
echo 📋 Next Steps:
echo 1. Go to your GitHub repository
echo 2. Check that all files uploaded correctly
echo 3. Share your repo link for the makethon demo
echo 4. For hosting, check DEPLOYMENT.md for instructions
echo.
pause
