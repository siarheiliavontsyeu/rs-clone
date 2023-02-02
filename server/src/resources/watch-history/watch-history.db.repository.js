const mongoose = require('mongoose');
const { WatchHistory } = require('./watch-history..model');
const { NOT_FOUND_ERROR } = require('../../errors/appErrors');
const ENTITY_NAME = 'history';

const getAll = async () => WatchHistory.find({});

const get = async userId => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { userId });
  }
  const history = await WatchHistory.find({ userId });
  if (!history) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { userId });
  }
  return history;
};

const create = async history =>
  WatchHistory.create({ ...history, watchedAt: Date.now() });

const remove = async id => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
  const history = await WatchHistory.deleteOne({ _id: id });
  if (!history) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
  return history;
};

module.exports = { getAll, get, create, remove };
