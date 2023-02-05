const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CritiqueSchema = Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: { type: String, required: true },
  at: { type: Date }
});

const toResponse = review => {
  const { userId, text, at } = review;

  return {
    userId,
    text,
    at
  };
};

module.exports = {
  toResponse,
  CritiqueSchema
};
