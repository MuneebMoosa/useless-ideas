@echo off
echo 🚀 Setting up Spoiler Ending Checker for GitHub...
echo.

echo Step 1: Initialize Git repository
git init
echo.

echo Step 2: Add all files to Git
git add .
echo.

echo Step 3: Create initial commit
git commit -m "🎬 Initial commit: Spoiler Ending Checker - Full-stack movie spoiler app with AI integration"
echo.

echo Step 4: Instructions for GitHub push
echo.
echo 📋 Next steps to push to GitHub:
echo.
echo 1. Create a new repository on GitHub:
echo    - Go to https://github.com/new
echo    - Repository name: spoiler-ending-checker
echo    - Description: Full-stack movie spoiler app with AI integration
echo    - Make it Public (for makethon visibility)
echo    - Don't initialize with README (we already have one)
echo.
echo 2. Copy the repository URL and run:
echo    git remote add origin https://github.com/YOUR_USERNAME/spoiler-ending-checker.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 3. Your project will be live on GitHub!
echo.

echo ✅ Git repository initialized and ready for GitHub push!
echo.
pause
