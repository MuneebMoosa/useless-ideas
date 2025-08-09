const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  imdbId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  title: {
    type: String,
    required: true,
    index: true
  },
  releaseYear: {
    type: Number,
    required: true
  },
  posterPath: {
    type: String,
    default: null
  },
  overview: {
    type: String,
    required: true
  },
  genres: [{
    id: Number,
    name: String
  }],
  runtime: {
    type: Number,
    default: null
  },
  spoilers: {
    mild: {
      type: String,
      required: true
    },
    medium: {
      type: String,
      required: true
    },
    high: {
      type: String,
      required: true
    },
    moodIcon: {
      type: String,
      enum: ['😃', '😢', '😲'],
      required: true
    }
  },
  aiGenerated: {
    type: Boolean,
    default: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  searchCount: {
    type: Number,
    default: 0
  },
  lastSearched: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for text search
movieSchema.index({ title: 'text' });

// Update search statistics
movieSchema.methods.incrementSearchCount = function() {
  this.searchCount += 1;
  this.lastSearched = new Date();
  return this.save();
};

// Get poster URL
movieSchema.methods.getPosterUrl = function(size = 'w500') {
  if (!this.posterPath) return null;
  return `https://image.tmdb.org/t/p/${size}${this.posterPath}`;
};

// Transform for API response
movieSchema.methods.toAPIResponse = function(spoilerLevel = 'mild') {
  const validLevels = ['mild', 'medium', 'high'];
  const level = validLevels.includes(spoilerLevel) ? spoilerLevel : 'mild';
  
  return {
    id: this._id,
    imdbId: this.imdbId,
    title: this.title,
    releaseYear: this.releaseYear,
    posterUrl: this.getPosterUrl(),
    genres: this.genres,
    runtime: this.runtime,
    spoiler: {
      level: level,
      text: this.spoilers[level],
      moodIcon: this.spoilers.moodIcon
    },
    verified: this.verified,
    searchCount: this.searchCount
  };
};

module.exports = mongoose.model('Movie', movieSchema);
