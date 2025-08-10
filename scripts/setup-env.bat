@echo off
echo 🔧 Setting up Environment File with Your API Keys...
echo.

cd backend

echo # MongoDB Connection > .env
echo MONGODB_URI=mongodb://localhost:27017/spoiler-checker >> .env
echo. >> .env
echo # OMDB API Configuration >> .env
echo OMDB_API_KEY=YOUR_OMDB_API_KEY_HERE >> .env
echo. >> .env
echo # OpenAI API Configuration >> .env
echo OPENAI_API_KEY=YOUR_OPENAI_API_KEY_HERE >> .env
echo. >> .env
echo # Server Configuration >> .env
echo PORT=5000 >> .env
echo NODE_ENV=development >> .env
echo. >> .env
echo # CORS Configuration >> .env
echo FRONTEND_URL=http://localhost:3000 >> .env

echo ✅ Environment file created successfully!
echo.
echo Your API keys have been configured:
echo - OMDB API Key: YOUR_KEY_HERE (add your actual key)
echo - OpenAI API Key: YOUR_KEY_HERE (add your actual key)
echo.
echo Next steps:
echo 1. Install backend dependencies: cd backend && npm install
echo 2. Install frontend dependencies: cd frontend && npm install
echo 3. Start backend: cd backend && npm run dev
echo 4. Start frontend: cd frontend && npm start
echo.
pause
