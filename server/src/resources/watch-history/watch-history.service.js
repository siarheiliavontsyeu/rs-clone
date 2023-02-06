const watchHistory = require('./watch-history.db.repository');
const usersRepo = require('../users/user.db.repository');

const getAll = () => watchHistory.getAll();
const get = async id => {
  await usersRepo.get(id);
  return watchHistory.get(id);
};
const create = async history => {
  return watchHistory.create({ ...history });
};
const remove = async id => {
  await watchHistory.remove(id);
};

module.exports = { getAll, get, create, remove };
