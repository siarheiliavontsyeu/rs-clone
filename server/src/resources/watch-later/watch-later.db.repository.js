const mongoose = require('mongoose');
const { WatchLater } = require('./watch-later.model');
const { NOT_FOUND_ERROR, DUPLICATE } = require('../../errors/appErrors');
const ENTITY_NAME = 'watch-later';

const getAll = async () => WatchLater.find({});

const get = async userId => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { userId });
  }
  const later = await WatchLater.find({ userId });
  if (!later) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { userId });
  }
  return later;
};

const create = async history => {
  const existingHistory = await WatchLater.findOne({
    kinopoiskId: history.kinopoiskId,
    userId: history.userId
  });
  if (existingHistory) {
    throw new DUPLICATE(`${ENTITY_NAME} kinopoiskId`, {
      kinopoiskId: history.kinopoiskId
    });
  }
  return WatchLater.create({
    ...history
  });
};

const remove = async id => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
  const later = await WatchLater.deleteOne({ _id: id });
  if (!later) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
  return later;
};

module.exports = { getAll, get, create, remove };
