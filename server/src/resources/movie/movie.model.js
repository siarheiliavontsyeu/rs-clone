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
  movieId: { type: String, required: true, unique: true },
  reviews: [Review],
  critiques: [Critique]
});

const toResponse = movie => {
  const { id, movieId, reviews, critiques } = movie;
  console.log(movie);
  return { id, movieId, reviews, critiques };
};

module.exports = {
  Movie: mongoose.model('movie', Movie),
  toResponse
};
