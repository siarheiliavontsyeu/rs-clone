const watchHistory = require('./watch-later.db.repository');

const getAll = () => watchHistory.getAll();
const get = id => watchHistory.get(id);
const create = async history => {
  return watchHistory.create({ ...history });
};
const remove = async id => {
  await watchHistory.remove(id);
};

module.exports = { getAll, get, create, remove };
