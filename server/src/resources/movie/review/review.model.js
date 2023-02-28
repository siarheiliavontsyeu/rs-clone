const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, required: true },
  text: { type: String, required: true },
  at: { type: Date }
});

const toResponse = review => {
  const { userId, rating, text, at } = review;

  return {
    userId,
    rating,
    text,
    at
  };
};

module.exports = {
  toResponse,
  ReviewSchema
};
