import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API service methods
export const movieAPI = {
  // Search movies for autocomplete
  searchMovies: async (query, page = 1) => {
    try {
      const response = await api.get('/movies/search', {
        params: { query, page }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to search movies');
    }
  },

  // Get movie details with spoilers
  getMovieDetails: async (imdbId, spoilerLevel = 'mild') => {
    try {
      const response = await api.get(`/movies/${imdbId}`, {
        params: { spoilerLevel }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to get movie details');
    }
  },

  // Get popular movies
  getPopularMovies: async (page = 1) => {
    try {
      const response = await api.get('/movies/popular/list', {
        params: { page }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to get popular movies');
    }
  },

  // Get movie recommendations
  getRecommendations: async (imdbId) => {
    try {
      const response = await api.get(`/movies/${imdbId}/recommendations`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to get recommendations');
    }
  },

  // Get recent movies
  getRecentMovies: async (limit = 10) => {
    try {
      const response = await api.get('/movies/recent/list', {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to get recent movies');
    }
  },

  // Get statistics
  getStats: async () => {
    try {
      const response = await api.get('/movies/stats/overview');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to get statistics');
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      throw new Error('Backend server is not responding');
    }
  }
};

// Utility functions
export const utils = {
  // Get TMDB poster URL
  getPosterUrl: (posterPath, size = 'w500') => {
    if (!posterPath) return null;
    return `https://image.tmdb.org/t/p/${size}${posterPath}`;
  },

  // Format movie title with year
  formatMovieTitle: (title, year) => {
    return year ? `${title} (${year})` : title;
  },

  // Debounce function for search
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
};

export default api;
