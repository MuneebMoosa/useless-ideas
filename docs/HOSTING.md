# Hosting Guide

This guide will help you deploy the "What At The End" application to production.

## 🚀 Prerequisites

Before deploying, ensure you have:

- [ ] MongoDB Atlas account and cluster
- [ ] TMDB API key
- [ ] OpenAI API key
- [ ] Vercel account (for backend)
- [ ] Vercel/Netlify account (for frontend)

## 📋 Step-by-Step Deployment

### 1. Backend Deployment (Vercel)

1. **Install Vercel CLI**

   ```bash
   npm i -g vercel
   ```

2. **Navigate to backend directory**

   ```bash
   cd backend
   ```

3. **Deploy to Vercel**

   ```bash
   vercel --prod
   ```

4. **Set Environment Variables in Vercel Dashboard**
   - Go to your project in Vercel
   - Navigate to Settings → Environment Variables
   - Add the following variables:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `TMDB_API_KEY`: Your TMDB API key
     - `OPENAI_API_KEY`: Your OpenAI API key
     - `NODE_ENV`: `production`
     - `CORS_ORIGIN`: Your frontend domain

### 2. Frontend Deployment

#### Option A: Vercel (Recommended)

1. **Navigate to frontend directory**

   ```bash
   cd frontend
   ```

2. **Build the project**

   ```bash
   npm run build
   ```

3. **Deploy to Vercel**

   ```bash
   vercel --prod
   ```

4. **Update API endpoint**
   - In your frontend code, update the API base URL to your backend Vercel URL
   - Rebuild and redeploy

#### Option B: Netlify

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Drag and drop the `build` folder to Netlify**

   - Or connect your GitHub repository for automatic deployments

3. **Set environment variables**
   - Go to Site settings → Environment variables
   - Add `REACT_APP_API_URL` with your backend URL

### 3. MongoDB Atlas Setup

1. **Create a cluster** in MongoDB Atlas
2. **Set up database access** with a username and password
3. **Set up network access** (allow all IPs for production: 0.0.0.0/0)
4. **Get connection string** and update your backend environment variables

### 4. Domain Configuration

1. **Custom Domain** (Optional)

   - Add your custom domain in Vercel/Netlify
   - Update CORS settings in backend to include your domain

2. **SSL Certificate**
   - Automatically handled by Vercel/Netlify

## 🔧 Post-Deployment Checklist

- [ ] Backend is responding to API calls
- [ ] Frontend can connect to backend
- [ ] MongoDB connection is working
- [ ] API keys are properly configured
- [ ] CORS is properly set up
- [ ] Rate limiting is working
- [ ] Error handling is in place

## 🚨 Common Issues

### CORS Errors

- Ensure `CORS_ORIGIN` is set to your frontend domain
- Check that the domain includes the protocol (https://)

### MongoDB Connection Issues

- Verify connection string format
- Check network access settings in MongoDB Atlas
- Ensure username/password are correct

### API Key Issues

- Verify API keys are valid
- Check rate limits on external APIs

## 📞 Support

If you encounter issues:

1. Check the console logs in your browser
2. Check Vercel/Netlify function logs
3. Verify all environment variables are set correctly
4. Ensure all dependencies are properly installed

## 🔄 Updates and Maintenance

- **Automatic Deployments**: Connect your GitHub repository for automatic deployments
- **Environment Variables**: Update them in your hosting platform dashboard
- **Database Backups**: Set up regular backups in MongoDB Atlas
