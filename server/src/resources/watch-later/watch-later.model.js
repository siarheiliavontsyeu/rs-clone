const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WatchLater = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    kinopoiskId: { type: String, required: true }
  },
  { collection: 'watchLater', versionKey: false }
);

const toResponse = watchHistory => {
  const { userId, kinopoiskId } = watchHistory;
  return { userId, kinopoiskId };
};

module.exports = {
  WatchLater: mongoose.model('watchLater', WatchLater),
  toResponse
};
