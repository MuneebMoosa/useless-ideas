const Movie = require('../models/Movie');
const omdbService = require('../services/tmdbService'); // Renamed file but keeping import path
const aiService = require('../services/aiService');

class MovieController {
  // Search movies with autocomplete
  async searchMovies(req, res) {
    try {
      const { query, page = 1 } = req.query;
      
      if (!query || query.trim().length < 2) {
        return res.status(400).json({ 
          error: 'Query must be at least 2 characters long' 
        });
      }

      // Search OMDB for movies
      const movies = await omdbService.searchMovies(query.trim(), page);
      
      // Format for autocomplete
      const suggestions = movies.slice(0, 8).map(movie => ({
        imdbId: movie.imdbId,
        title: movie.title,
        releaseYear: movie.releaseYear,
        posterPath: movie.posterPath
      }));

      res.json({
        suggestions,
        total: movies.length
      });
    } catch (error) {
      console.error('Search error:', error);
      res.status(500).json({ 
        error: 'Failed to search movies',
        message: error.message 
      });
    }
  }

  // Get movie details with spoilers
  async getMovieDetails(req, res) {
    try {
      const { imdbId } = req.params;
      const { spoilerLevel = 'mild' } = req.query;
      
      console.log(`🎬 Getting movie details for ${imdbId} with spoiler level: ${spoilerLevel}`);

      if (!imdbId) {
        return res.status(400).json({ 
          error: 'Valid IMDB ID is required' 
        });
      }

      // Check if movie exists in database (if MongoDB is available)
      let movie = null;
      try {
        movie = await Movie.findOne({ imdbId: imdbId });
        if (movie) {
          // Update search statistics
          await movie.incrementSearchCount();
          
          return res.json({
            success: true,
            movie: movie.toAPIResponse(spoilerLevel),
            cached: true
          });
        }
      } catch (dbError) {
        console.log('⚠️  Database not available, fetching fresh data');
      }

      // Movie not in database, fetch from OMDB and generate spoilers
      const movieDetails = await omdbService.getMovieDetails(imdbId);
      
      if (!movieDetails.overview) {
        return res.status(404).json({ 
          error: 'Movie overview not available for spoiler generation' 
        });
      }

      // Generate spoilers using AI
      const spoilers = await aiService.generateSpoilers(
        movieDetails.title,
        movieDetails.overview,
        movieDetails.genres
      );

      // Create movie response object (save to DB if available)
      const movieData = {
        imdbId: movieDetails.imdbId,
        title: movieDetails.title,
        releaseYear: movieDetails.releaseYear,
        posterPath: movieDetails.posterPath,
        overview: movieDetails.overview,
        genres: movieDetails.genres,
        runtime: movieDetails.runtime,
        spoilers: {
          mild: spoilers.mild,
          medium: spoilers.medium,
          high: spoilers.high,
          moodIcon: spoilers.moodIcon
        },
        searchCount: 1,
        lastSearched: new Date()
      };

      // Try to save to database if available
      try {
        movie = new Movie(movieData);
        await movie.save();
        console.log('✅ Movie saved to database');
      } catch (dbError) {
        console.log('⚠️  Database not available, returning data without caching');
        // Create a mock movie object for response
        movie = {
          toAPIResponse: (level) => ({
            id: movieDetails.imdbId,
            imdbId: movieDetails.imdbId,
            title: movieDetails.title,
            releaseYear: movieDetails.releaseYear,
            posterUrl: movieDetails.posterPath,
            genres: movieDetails.genres,
            runtime: movieDetails.runtime,
            spoiler: {
              level: level,
              text: spoilers[level],
              moodIcon: spoilers.moodIcon
            },
            verified: false,
            searchCount: 1
          })
        };
      }

      const apiResponse = movie.toAPIResponse(spoilerLevel);
      console.log(`📤 Sending response for ${spoilerLevel} level:`, {
        spoilerText: apiResponse.spoiler.text,
        spoilerLevel: apiResponse.spoiler.level,
        moodIcon: apiResponse.spoiler.moodIcon
      });
      
      res.json({
        success: true,
        movie: apiResponse,
        cached: false
      });

    } catch (error) {
      console.error('Movie details error:', error);
      res.status(500).json({ 
        error: 'Failed to get movie details',
        message: error.message 
      });
    }
  }

  // Get popular movies for homepage
  async getPopularMovies(req, res) {
    try {
      const { page = 1 } = req.query;
      
      const movies = await omdbService.getPopularMovies(page);
      
      res.json({
        success: true,
        movies
      });
    } catch (error) {
      console.error('Popular movies error:', error);
      res.status(500).json({ 
        error: 'Failed to get popular movies',
        message: error.message 
      });
    }
  }

  // Get movie recommendations
  async getRecommendations(req, res) {
    try {
      const { imdbId } = req.params;
      
      if (!imdbId) {
        return res.status(400).json({ 
          error: 'Valid IMDB ID is required' 
        });
      }

      const recommendations = await omdbService.getRecommendations(imdbId);
      
      res.json({
        success: true,
        recommendations
      });
    } catch (error) {
      console.error('Recommendations error:', error);
      res.status(500).json({ 
        error: 'Failed to get recommendations',
        message: error.message 
      });
    }
  }

  // Get recently searched movies
  async getRecentMovies(req, res) {
    try {
      const { limit = 10 } = req.query;
      
      const movies = await Movie.find()
        .sort({ lastSearched: -1 })
        .limit(parseInt(limit))
        .select('tmdbId title releaseYear posterPath searchCount lastSearched');

      res.json({
        success: true,
        movies: movies.map(movie => ({
          imdbId: movie.imdbId,
          title: movie.title,
          releaseYear: movie.releaseYear,
          posterUrl: movie.getPosterUrl ? movie.getPosterUrl() : movie.posterPath,
          searchCount: movie.searchCount,
          lastSearched: movie.lastSearched
        }))
      });
    } catch (error) {
      console.error('Recent movies error:', error);
      res.status(500).json({ 
        error: 'Failed to get recent movies',
        message: error.message 
      });
    }
  }

  // Get movie statistics
  async getStats(req, res) {
    try {
      const totalMovies = await Movie.countDocuments();
      const totalSearches = await Movie.aggregate([
        { $group: { _id: null, total: { $sum: '$searchCount' } } }
      ]);

      const topMovies = await Movie.find()
        .sort({ searchCount: -1 })
        .limit(5)
        .select('title searchCount');

      res.json({
        success: true,
        stats: {
          totalMovies,
          totalSearches: totalSearches[0]?.total || 0,
          topMovies
        }
      });
    } catch (error) {
      console.error('Stats error:', error);
      res.status(500).json({ 
        error: 'Failed to get statistics',
        message: error.message 
      });
    }
  }
}

module.exports = new MovieController();
