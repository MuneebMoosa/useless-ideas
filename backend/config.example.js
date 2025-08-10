// Production Configuration Example
// Copy this file to config.js and fill in your actual values

module.exports = {
  // MongoDB Connection
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority'
  },
  
  // API Keys
  tmdb: {
    apiKey: process.env.TMDB_API_KEY || 'your_tmdb_api_key_here'
  },
  
  openai: {
    apiKey: process.env.OPENAI_API_KEY || 'your_openai_api_key_here'
  },
  
  // Server Configuration
  server: {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'production'
  },
  
  // CORS Configuration
  cors: {
    origin: process.env.CORS_ORIGIN || 'https://your-frontend-domain.com'
  },
  
  // Rate Limiting
  rateLimit: {
    windowMs: process.env.RATE_LIMIT_WINDOW_MS || 900000, // 15 minutes
    maxRequests: process.env.RATE_LIMIT_MAX_REQUESTS || 100
  }
};
