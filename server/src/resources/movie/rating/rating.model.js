const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = Schema({
  rating: { type: Number, required: true }
});

const toResponse = movie => {
  const { rating, kinopoiskId } = movie;

  return {
    rating,
    kinopoiskId
  };
};

module.exports = {
  toResponse,
  RatingSchema
};
