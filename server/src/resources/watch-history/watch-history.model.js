const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WatchHistory = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    kinopoiskId: { type: String, required: true, unique: true },
    watchedAt: { type: Date }
  },
  { collection: 'watchHistory', versionKey: false }
);

const toResponse = watchHistory => {
  const { userId, kinopoiskId, watchedAt } = watchHistory;
  return { userId, kinopoiskId, watchedAt };
};

module.exports = {
  WatchHistory: mongoose.model('watchHistory', WatchHistory),
  toResponse
};
