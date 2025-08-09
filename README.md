# 🎬 Spoiler Ending Checker

A full-stack web application that provides tiered spoiler information for movies with adjustable spoiler levels - from mild mood indicators to full plot reveals.

![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-22.18.0-green)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--3.5--turbo-orange)

## ✨ Features

- **🔍 Real-time Movie Search** - Autocomplete search with movie posters
- **🎭 Three Spoiler Levels** - Mild (mood only), Medium (mood + hint), High (full spoiler)
- **🤖 AI-Powered Spoilers** - OpenAI GPT-3.5-turbo with smart fallback system
- **🎨 Beautiful UI** - Mobile-responsive design with smooth animations
- **🛡️ Bulletproof Architecture** - Automatic API failover and error handling
- **🌍 Regional Movie Support** - Hardcoded spoilers for popular international and regional films

## 🚀 Live Demo

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 🏗️ Tech Stack

### Frontend
- **React.js** - Modern UI framework
- **CSS3** - Custom styling with gradients and animations
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (optional, with fallback)
- **Mongoose** - ODM for MongoDB

### APIs & Services
- **OMDB API** - Movie metadata and posters
- **OpenAI API** - AI-powered spoiler generation
- **Automatic Failover** - Dual API key system

## 📦 Installation

### Prerequisites
- Node.js (v22.18.0 or higher)
- npm (v10.9.3 or higher)
- MongoDB (optional)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd spoiler-ending-checker
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd backend && npm install
   
   # Frontend
   cd ../frontend && npm install
   ```

3. **Environment Setup**
   Create `backend/.env` file:
   ```env
   MONGODB_URI=mongodb://localhost:27017/spoiler-checker
   OMDB_API_KEY=your_omdb_api_key
   OPENAI_API_KEY=your_openai_api_key
   OPENAI_API_KEY_BACKUP=your_backup_openai_key
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start the application**
   ```bash
   # Terminal 1 - Backend
   cd backend && npm run dev
   
   # Terminal 2 - Frontend
   cd frontend && npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 API Keys Setup

### OMDB API Key
1. Visit [OMDB API](http://www.omdbapi.com/apikey.aspx)
2. Register for a free API key
3. Add to your `.env` file

### OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Add $5-10 credits to your account
4. Add both primary and backup keys to `.env`

## 🎬 Usage

1. **Search for a movie** - Type in the search bar
2. **Select from suggestions** - Click on a movie from the dropdown
3. **Choose spoiler level**:
   - 🟡 **Mild** - Just the ending mood (Happy/Sad/Twist)
   - 🟠 **Medium** - Mood + small plot hint
   - 🔴 **High** - Full spoiler with character names and events

## 🏆 Supported Movies

### International Blockbusters
- Titanic, Matrix, Avengers, Batman
- Star Wars, Inception, Interstellar
- Joker, Avengers Endgame

### Regional Cinema
- Drishyam, Baahubali, KGF, Pushpa
- And many more through AI generation

## 🛡️ Architecture Highlights

- **Triple-Layer Fallback System**:
  1. OpenAI API (Primary)
  2. OpenAI API (Backup)
  3. Hardcoded Spoilers + Safe Fallbacks

- **Error Handling**:
  - Automatic API key switching
  - Graceful degradation
  - User-friendly error messages

- **Performance**:
  - MongoDB caching (optional)
  - Optimized API calls
  - Responsive design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OMDB API for movie metadata
- OpenAI for AI-powered spoiler generation
- The React and Node.js communities

## 📞 Contact

- **Developer**: [Your Name]
- **Email**: [your.email@example.com]
- **LinkedIn**: [Your LinkedIn Profile]

---

**⚠️ Disclaimer**: This app is for entertainment purposes. Use spoilers responsibly - don't be that friend who ruins movies for others!

## 🎯 Features

- **Smart Search**: Autocomplete movie search powered by TMDB API
- **Tiered Spoilers**: Three levels of spoiler information
  - 😃 **Mild**: Ending mood only
  - 😢 **Medium**: Mood + small plot hint  
  - 😲 **High**: Full spoiler with names/events
- **AI-Powered**: Automatic spoiler generation using AI classification
- **Mobile-First**: Responsive design for all devices

## 🛠 Tech Stack

**Frontend:**
- React.js
- Responsive CSS
- TMDB API integration

**Backend:**
- Node.js + Express.js
- MongoDB for data storage
- OpenAI API for spoiler generation
- TMDB API for movie metadata

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB
- TMDB API key
- OpenAI API key

### Installation

1. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Add your API keys to .env
npm run dev
```

2. **Frontend Setup**
```bash
cd frontend
npm install
npm start
```

### Environment Variables

Create a `.env` file in the backend directory:
```
MONGODB_URI=mongodb://localhost:27017/spoiler-checker
TMDB_API_KEY=your_tmdb_api_key
OPENAI_API_KEY=your_openai_api_key
PORT=5000
```

## 📁 Project Structure

```
spoiler-ending-checker/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── styles/
│   │   └── utils/
│   ├── public/
│   └── package.json
└── README.md
```

## 🎭 Spoiler Examples

**Movie: Titanic**
- **Mild**: 😢 Sad
- **Medium**: 😢 Sad – a major character dies
- **High**: 😢 Jack dies, the ship sinks in icy waters

## ⚠️ Disclaimer

*Remember: with great spoilers comes great responsibility — don't be that friend.*

## 🔮 Future Features

- Admin panel for spoiler moderation
- User accounts and watchlists
- TV series support
- Multilingual spoilers
