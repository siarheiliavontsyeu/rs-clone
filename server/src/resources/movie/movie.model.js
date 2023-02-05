const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Review = Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, required: true },
  text: { type: String, required: true },
  at: { type: Date }
});

const Critique = Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: { type: String, required: true },
  at: { type: Date }
});

const Movie = Schema({
  kinopoiskId: { type: String, required: true, unique: true },
  imdbId: { type: String, required: true, unique: true },
  nameRu: { type: String, required: true },
  nameOriginal: { type: String, required: true },
  posterUrlPreview: { type: String },
  ratingKinopoisk: { type: Number },
  reviews: [Review],
  critiques: [Critique]
});

const toResponse = movie => {
  const {
    id,
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
    id,
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
