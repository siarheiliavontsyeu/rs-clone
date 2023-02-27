const mongoose = require('mongoose');
const { CritiqueSchema } = require('./critique/critique.model');
const { ReviewSchema } = require('./review/review.model');
const Schema = mongoose.Schema;

const Movie = Schema({
  kinopoiskId: { type: String, required: true, unique: true },
  imdbId: { type: String, required: true },
  nameRu: { type: String, required: true },
  nameOriginal: { type: String, required: true },
  posterUrlPreview: { type: String },
  ratingKinopoisk: { type: Number },
  reviews: [ReviewSchema],
  critiques: [CritiqueSchema]
});

const toResponse = movie => {
  const {
    kinopoiskId,
    imdbId,
    nameRu,
    nameOriginal,
    posterUrlPreview,
    ratingKinopoisk,
    reviews,
    critiques
  } = movie;

  return {
    kinopoiskId,
    imdbId,
    nameRu,
    nameOriginal,
    posterUrlPreview,
    ratingKinopoisk,
    reviews,
    critiques
  };
};

module.exports = {
  Movie: mongoose.model('movie', Movie),
  toResponse
};
