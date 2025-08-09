# 🚀 Spoiler Ending Checker - Setup Guide

## Prerequisites

Before running the application, you need to install the following:

### 1. Node.js and npm
- Download and install Node.js (v16 or higher) from: https://nodejs.org/
- This will also install npm (Node Package Manager)
- Verify installation by running:
  ```bash
  node --version
  npm --version
  ```

### 2. MongoDB
- **Option A: Local MongoDB**
  - Download and install MongoDB Community Server from: https://www.mongodb.com/try/download/community
  - Start MongoDB service
  
- **Option B: MongoDB Atlas (Cloud)**
  - Create a free account at: https://www.mongodb.com/atlas
  - Create a cluster and get connection string
  - Update `MONGODB_URI` in backend/.env

### 3. API Keys

#### TMDB API Key (Required)
1. Create account at: https://www.themoviedb.org/
2. Go to Settings → API → Create API Key
3. Copy the API key and update `TMDB_API_KEY` in backend/.env

#### OpenAI API Key (Required)
1. Create account at: https://platform.openai.com/
2. Go to API Keys section and create a new key
3. Copy the API key and update `OPENAI_API_KEY` in backend/.env

## Installation Steps

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### 3. Configure Environment Variables
- Update `backend/.env` with your API keys
- Update `frontend/.env` if needed (default should work)

### 4. Start the Application

#### Terminal 1 - Backend Server
```bash
cd backend
npm run dev
```
The backend will start on http://localhost:5000

#### Terminal 2 - Frontend Development Server
```bash
cd frontend
npm start
```
The frontend will start on http://localhost:3000

## Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/spoiler-checker
TMDB_API_KEY=your_actual_tmdb_api_key_here
OPENAI_API_KEY=your_actual_openai_api_key_here
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Testing the Application

1. Open http://localhost:3000 in your browser
2. Search for a movie (e.g., "Titanic", "The Matrix", "Avengers")
3. Select a movie from the dropdown
4. Try different spoiler levels (Mild, Medium, High)

## Troubleshooting

### Common Issues

**Backend won't start:**
- Check if MongoDB is running
- Verify API keys are correct
- Check if port 5000 is available

**Frontend won't start:**
- Check if port 3000 is available
- Verify backend is running on port 5000

**Movie search not working:**
- Verify TMDB API key is valid
- Check browser console for errors
- Ensure backend is connected to frontend

**AI spoiler generation failing:**
- Verify OpenAI API key is valid
- Check if you have sufficient OpenAI credits
- Monitor backend logs for AI service errors

### Logs and Debugging

**Backend logs:**
- Check terminal running `npm run dev` in backend folder
- Look for MongoDB connection status
- Monitor API request/response logs

**Frontend logs:**
- Open browser Developer Tools (F12)
- Check Console tab for JavaScript errors
- Monitor Network tab for API calls

## Production Deployment

For production deployment, you'll need to:

1. Build the frontend: `npm run build` in frontend folder
2. Set up production MongoDB instance
3. Configure production environment variables
4. Deploy backend to a service like Heroku, Railway, or DigitalOcean
5. Deploy frontend to Netlify, Vercel, or similar service

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify all prerequisites are installed
3. Ensure API keys are valid and have sufficient credits
4. Check that all environment variables are set correctly
