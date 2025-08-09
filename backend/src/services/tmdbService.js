const axios = require('axios');

class OMDBService {
  constructor() {
    this.apiKey = process.env.OMDB_API_KEY;
    this.baseUrl = 'http://www.omdbapi.com/';
    
    if (!this.apiKey) {
      throw new Error('OMDB_API_KEY is required');
    }
  }

  // Search for movies by title
  async searchMovies(query, page = 1) {
    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          apikey: this.apiKey,
          s: query,
          type: 'movie',
          page: page
        }
      });

      if (response.data.Response === 'False') {
        return [];
      }

      return response.data.Search.map(movie => ({
        imdbId: movie.imdbID,
        title: movie.Title,
        releaseYear: parseInt(movie.Year),
        posterPath: movie.Poster !== 'N/A' ? movie.Poster : null,
        overview: null // OMDB doesn't provide plot in search results
      }));
    } catch (error) {
      console.error('OMDB Search Error:', error.response?.data || error.message);
      throw new Error('Failed to search movies');
    }
  }

  // Get detailed movie information
  async getMovieDetails(imdbId) {
    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          apikey: this.apiKey,
          i: imdbId,
          plot: 'full'
        }
      });

      if (response.data.Response === 'False') {
        throw new Error('Movie not found');
      }

      const movie = response.data;
      return {
        imdbId: movie.imdbID,
        title: movie.Title,
        releaseYear: parseInt(movie.Year),
        posterPath: movie.Poster !== 'N/A' ? movie.Poster : null,
        overview: movie.Plot !== 'N/A' ? movie.Plot : null,
        genres: movie.Genre !== 'N/A' ? movie.Genre.split(', ').map((name, index) => ({ id: index, name })) : [],
        runtime: movie.Runtime !== 'N/A' ? parseInt(movie.Runtime.replace(' min', '')) : null,
        director: movie.Director !== 'N/A' ? movie.Director : null,
        actors: movie.Actors !== 'N/A' ? movie.Actors : null,
        imdbRating: movie.imdbRating !== 'N/A' ? parseFloat(movie.imdbRating) : null
      };
    } catch (error) {
      console.error('OMDB Details Error:', error.response?.data || error.message);
      throw new Error('Failed to get movie details');
    }
  }

  // Get movie recommendations (OMDB doesn't support this, so we'll return empty array)
  async getRecommendations(imdbId) {
    // OMDB doesn't have recommendations, return empty array
    return [];
  }

  // Get popular movies (OMDB doesn't support this, so we'll search for popular titles)
  async getPopularMovies(page = 1) {
    try {
      // Search for some popular movie titles as suggestions
      const popularTitles = [
        'Avengers', 'Titanic', 'The Matrix', 'Star Wars', 'Batman',
        'Spider-Man', 'Iron Man', 'The Dark Knight', 'Inception', 'Interstellar'
      ];
      
      const randomTitle = popularTitles[Math.floor(Math.random() * popularTitles.length)];
      const movies = await this.searchMovies(randomTitle, 1);
      
      return movies.slice(0, 5);
    } catch (error) {
      console.error('OMDB Popular Movies Error:', error.response?.data || error.message);
      return [];
    }
  }
}

module.exports = new OMDBService();
