import React, { useState, useEffect } from 'react';
import { utils } from '../services/api';

const MovieCard = ({ movie, onSpoilerLevelChange }) => {
  const [currentLevel, setCurrentLevel] = useState(movie?.spoiler?.level || 'mild');

  // Sync currentLevel with movie spoiler level when movie changes
  useEffect(() => {
    if (movie?.spoiler?.level) {
      setCurrentLevel(movie.spoiler.level);
    }
  }, [movie?.spoiler?.level]);

  const spoilerLevels = [
    { key: 'mild', label: 'Mild', description: 'Ending mood only' },
    { key: 'medium', label: 'Medium', description: 'Mood + small hint' },
    { key: 'high', label: 'High', description: 'Full spoiler' }
  ];

  const handleLevelChange = (level) => {
    console.log(`🎯 Changing spoiler level to: ${level}`);
    setCurrentLevel(level);
    onSpoilerLevelChange(level);
  };

  const getSpoilerWarning = (level) => {
    switch (level) {
      case 'mild':
        return 'Safe zone - just the mood';
      case 'medium':
        return 'Caution - small plot hint ahead';
      case 'high':
        return 'Danger zone - full spoilers!';
      default:
        return '';
    }
  };

  if (!movie) return null;

  return (
    <div className="movie-result">
      <div className="movie-header">
        {movie.posterUrl ? (
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="movie-poster"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDIwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjBGMEYwIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5IiBmb250LXNpemU9IjQ4Ij7wn46sPC90ZXh0Pgo8L3N2Zz4K';
            }}
          />
        ) : (
          <div className="movie-poster" style={{ 
            background: '#f0f0f0', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: '3rem'
          }}>
            🎬
          </div>
        )}
        
        <div className="movie-info">
          <h1 className="movie-title">{movie.title}</h1>
          {movie.releaseYear && (
            <div className="movie-year">{movie.releaseYear}</div>
          )}
          
          {movie.genres && movie.genres.length > 0 && (
            <div className="movie-genres">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="genre-tag">
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          {movie.runtime && (
            <div className="movie-runtime">
              Runtime: {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
            </div>
          )}

          {movie.verified && (
            <div className="verified-badge">
              ✅ Verified by moderators
            </div>
          )}
        </div>
      </div>

      <div className="spoiler-section">
        <div className="spoiler-controls">
          <div className="spoiler-level-selector">
            {spoilerLevels.map((level) => (
              <button
                key={level.key}
                className={`level-button ${currentLevel === level.key ? 'active' : ''}`}
                onClick={() => handleLevelChange(level.key)}
                title={level.description}
              >
                {level.label}
              </button>
            ))}
          </div>
          
          <div className="spoiler-warning">
            <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>
              {currentLevel === 'mild' && '🟡'}
              {currentLevel === 'medium' && '🟠'}
              {currentLevel === 'high' && '🔴'}
            </span>
            {getSpoilerWarning(currentLevel)}
          </div>
        </div>

        <div className="spoiler-content">
          <span className="mood-icon">
            {movie.spoiler?.moodIcon || '😲'}
          </span>
          
          <div className="spoiler-text">
            {movie.spoiler?.text || 'Spoiler information not available'}
          </div>
          
          <div className="spoiler-level-info">
            <small>
              {currentLevel === 'mild' && 'Just the ending mood - no plot details'}
              {currentLevel === 'medium' && 'Mood with a small hint - minimal spoilers'}
              {currentLevel === 'high' && 'Full spoiler with names and events'}
            </small>
          </div>
        </div>

        {movie.searchCount && movie.searchCount > 1 && (
          <div className="movie-stats">
            <small>
              🔍 Searched {movie.searchCount} times
              {movie.cached && ' • Cached result'}
            </small>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
