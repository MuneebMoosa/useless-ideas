<img width="3188" height="1202" alt="frame (3)" src="https://github.com/user-attachments/assets/517ad8e9-ad22-457d-9538-a9e62d137cd7" />

# [WHAT AT THE END] 🎯

A web application that lets users search for movies and find out if they have a happy, sad, or twist/cliffhanger ending.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account
- TMDB API key
- OpenAI API key

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/muneebmoosa/useless-ideas.git
   cd useless-ideas
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your API keys and MongoDB connection string
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run build
   npm start
   ```

## 📁 Project Structure

```
useless-ideas/
├── backend/          # Node.js API server
├── frontend/         # React application
├── scripts/          # Development and deployment scripts
├── docs/            # Project documentation
├── .gitignore       # Git ignore rules
└── README.md        # This file
```

## 🔧 Environment Variables

Create a `.env` file in the backend directory:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
TMDB_API_KEY=your_tmdb_api_key
OPENAI_API_KEY=your_openai_api_key
PORT=5000
NODE_ENV=production
```

## 🚀 Deployment

### Backend (Vercel)

- The backend is configured for Vercel deployment
- Update environment variables in Vercel dashboard
- Deploy using `vercel --prod`

### Frontend (Vercel/Netlify)

- Build the project: `npm run build`
- Deploy the `build` folder to your hosting platform

## 📚 Documentation

- [Setup Guide](docs/SETUP.md) - Detailed setup instructions
- [Production Guide](docs/PRODUCTION.md) - Production deployment guide
- [Deployment Guide](docs/DEPLOYMENT.md) - Platform-specific deployment

## 🛠️ Available Scripts

Check the `scripts/` folder for development and deployment scripts.

## 👥 Team

- **Muneeb** - UI and Development
- **Thanzeeh** - UI and Development

---

Made with ❤️ at TinkerHub Useless Projects

![Static Badge](https://img.shields.io/badge/TinkerHub-24?color=%23000000&link=https%3A%2F%2Fwww.tinkerhub.org%2F)
![Static Badge](https://img.shields.io/badge/UselessProjects--25-25?link=https%3A%2F%2Fwww.tinkerhub.org%2Fevents%2FQ2Q1TQKX6Q%2FUseless%2520Projects)
