const express = require('express');
const movieController = require('../controllers/movieController');

const router = express.Router();

// Search movies (autocomplete)
router.get('/search', movieController.searchMovies);

// Get popular movies
router.get('/popular/list', movieController.getPopularMovies);

// Get recently searched movies
router.get('/recent/list', movieController.getRecentMovies);

// Get statistics (place static route before dynamic params)
router.get('/stats/overview', movieController.getStats);

// Get movie recommendations
router.get('/:imdbId/recommendations', movieController.getRecommendations);

// Get movie details with spoilers (must be last to avoid conflicts)
router.get('/:imdbId', movieController.getMovieDetails);

module.exports = router;
