const mongoose = require('mongoose');
const { WatchLater } = require('./watch-later.model');
const { NOT_FOUND_ERROR } = require('../../errors/appErrors');
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

const create = async history =>
  WatchLater.create({ ...history, watchedAt: Date.now() });

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
