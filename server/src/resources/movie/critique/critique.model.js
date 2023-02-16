const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CritiqueSchema = Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  text: { type: String, required: true },
  type: { type: String, required: true },
  useful: { type: Number },
  useless: { type: Number },
  at: { type: Date }
});

const toResponse = review => {
  const { userId, type, text, useful, useless, at } = review;

  return {
    userId,
    type,
    text,
    useful,
    useless,
    at
  };
};

module.exports = {
  toResponse,
  CritiqueSchema
};
