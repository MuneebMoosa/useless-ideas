const express = require('express');
const movieController = require('../controllers/movieController');

const router = express.Router();

// Search movies (autocomplete)
router.get('/search', movieController.searchMovies);

// Get popular movies
router.get('/popular/list', movieController.getPopularMovies);

// Get recently searched movies
router.get('/recent/list', movieController.getRecentMovies);

// Get movie recommendations
router.get('/:imdbId/recommendations', movieController.getRecommendations);

// Get movie details with spoilers (must be last to avoid conflicts)
router.get('/:imdbId', movieController.getMovieDetails);

// Get statistics
router.get('/stats/overview', movieController.getStats);

module.exports = router;
