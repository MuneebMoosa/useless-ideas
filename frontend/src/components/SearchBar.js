import React, { useState, useEffect, useRef } from 'react';
import { movieAPI, utils } from '../services/api';

const SearchBar = ({ onMovieSelect, loading }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Debounced search function
  const debouncedSearch = utils.debounce(async (searchQuery) => {
    if (searchQuery.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsSearching(true);
    try {
      const response = await movieAPI.searchMovies(searchQuery);
      setSuggestions(response.suggestions || []);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Search error:', error);
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setIsSearching(false);
    }
  }, 300);

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  // Handle suggestion click
  const handleSuggestionClick = (movie) => {
    setQuery(utils.formatMovieTitle(movie.title, movie.releaseYear));
    setShowSuggestions(false);
    setSuggestions([]);
    onMovieSelect(movie);
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      handleSuggestionClick(suggestions[0]);
    }
  };

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        !searchRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          ref={searchRef}
          type="text"
          className="search-input"
          placeholder="Search for a movie... (e.g., Titanic, Avengers, The Matrix)"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          disabled={loading}
        />
      </form>

      {showSuggestions && (suggestions.length > 0 || isSearching) && (
        <div ref={suggestionsRef} className="search-suggestions">
          {isSearching ? (
            <div className="suggestion-item">
              <div className="suggestion-info">
                <div className="suggestion-title">Searching...</div>
              </div>
            </div>
          ) : (
            suggestions.map((movie) => (
              <div
                key={movie.imdbId}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(movie)}
              >
                {movie.posterPath ? (
                  <img
                    src={utils.getPosterUrl(movie.posterPath, 'w92')}
                    alt={movie.title}
                    className="suggestion-poster"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="suggestion-poster">
                    🎬
                  </div>
                )}
                <div className="suggestion-info">
                  <div className="suggestion-title">{movie.title}</div>
                  {movie.releaseYear && (
                    <div className="suggestion-year">{movie.releaseYear}</div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
