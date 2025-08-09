import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import LoadingSpinner from './components/LoadingSpinner';
import { movieAPI } from './services/api';
import './index.css';

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [spoilerLevel, setSpoilerLevel] = useState('mild');
  const [backendStatus, setBackendStatus] = useState('checking');

  // Check backend health on app load
  useEffect(() => {
    checkBackendHealth();
  }, []);

  const checkBackendHealth = async () => {
    try {
      await movieAPI.healthCheck();
      setBackendStatus('connected');
    } catch (error) {
      console.error('Backend health check failed:', error);
      setBackendStatus('disconnected');
    }
  };

  const handleMovieSelect = async (movie) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await movieAPI.getMovieDetails(movie.imdbId, spoilerLevel);
      setSelectedMovie(response.movie);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      setError(error.message || 'Failed to load movie details');
      setSelectedMovie(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSpoilerLevelChange = async (newLevel) => {
    if (!selectedMovie || newLevel === spoilerLevel) return;
    
    setSpoilerLevel(newLevel);
    setLoading(true);
    setError(null);

    try {
      const response = await movieAPI.getMovieDetails(selectedMovie.imdbId, newLevel);
      setSelectedMovie(response.movie);
    } catch (error) {
      console.error('Error updating spoiler level:', error);
      setError(error.message || 'Failed to update spoiler level');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    if (selectedMovie) {
      handleMovieSelect({ imdbId: selectedMovie.imdbId });
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <a href="/" className="logo" onClick={(e) => {
            e.preventDefault();
            setSelectedMovie(null);
            setError(null);
          }}>
            🎬 Spoiler Ending Checker
          </a>
          
          {backendStatus === 'disconnected' && (
            <div className="status-indicator" style={{
              color: '#e74c3c',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              ⚠️ Backend disconnected
              <button 
                onClick={checkBackendHealth}
                style={{
                  background: 'none',
                  border: '1px solid #e74c3c',
                  color: '#e74c3c',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.8rem'
                }}
              >
                Retry
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="main">
        {/* Search Section */}
        <div className="search-section">
          <h1 className="search-title">
            Discover Movie Endings
          </h1>
          <p className="search-subtitle">
            Find out how your favorite movies end with adjustable spoiler levels - 
            from mild mood indicators to full plot reveals
          </p>
          
          <SearchBar 
            onMovieSelect={handleMovieSelect} 
            loading={loading}
          />
        </div>

        {/* Loading State */}
        {loading && (
          <LoadingSpinner 
            message={
              selectedMovie 
                ? "Updating spoiler level..." 
                : "Searching for movie details and generating spoilers..."
            }
          />
        )}

        {/* Error State */}
        {error && (
          <div className="error-container" style={{
            background: 'rgba(231, 76, 60, 0.1)',
            border: '1px solid rgba(231, 76, 60, 0.3)',
            borderRadius: '1rem',
            padding: '2rem',
            textAlign: 'center',
            color: 'white',
            marginTop: '2rem'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚠️</div>
            <h3 style={{ marginBottom: '1rem' }}>Oops! Something went wrong</h3>
            <p style={{ marginBottom: '1.5rem', opacity: 0.9 }}>{error}</p>
            <button 
              onClick={handleRetry}
              style={{
                background: '#e74c3c',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '2rem',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500'
              }}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Movie Result */}
        {selectedMovie && !loading && !error && (
          <MovieCard 
            movie={selectedMovie}
            onSpoilerLevelChange={handleSpoilerLevelChange}
          />
        )}

        {/* Welcome Message */}
        {!selectedMovie && !loading && !error && (
          <div className="welcome-message" style={{
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.8)',
            marginTop: '3rem'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎭</div>
            <h2 style={{ marginBottom: '1rem' }}>Ready to Discover?</h2>
            <p style={{ maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}>
              Search for any movie above to see how it ends. Choose your spoiler level:
              from just the mood to full plot details.
            </p>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '2rem', 
              marginTop: '2rem',
              flexWrap: 'wrap'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>😃</div>
                <div style={{ fontWeight: '500' }}>Mild</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Just the mood</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>😢</div>
                <div style={{ fontWeight: '500' }}>Medium</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Mood + hint</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>😲</div>
                <div style={{ fontWeight: '500' }}>High</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Full spoiler</div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-warning">
          Remember: with great spoilers comes great responsibility — don't be that friend.
        </div>
      </footer>
    </div>
  );
}

export default App;
