const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WatchLater = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    movieId: { type: String, required: true }
  },
  { collection: 'watchLater', versionKey: false }
);

const toResponse = watchHistory => {
  const { id, userId, movieId } = watchHistory;
  return { id, userId, movieId };
};

module.exports = {
  WatchLater: mongoose.model('watchLater', WatchLater),
  toResponse
};
