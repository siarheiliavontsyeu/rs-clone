const usersRepo = require('./user.db.repository');
const watchHistoryRepo = require('../watch-history/watch-history.db.repository');
const { hashPassword } = require('../../utils/hash-helpers');

const getAll = () => usersRepo.getAll();
const get = id => usersRepo.get(id);
const create = async user => {
  const hash = await hashPassword(user.password);
  const subscription = user.subscription || 'basic';
  return usersRepo.create({ ...user, password: hash, subscription });
};
const update = async user => {
  if (user.password) {
    const hash = await hashPassword(user.password);
    return usersRepo.update({ ...user, password: hash });
  }
  return usersRepo.update({ ...user });
};
const remove = async id => {
  const allWatchHistory = await watchHistoryRepo.get(id);
  console.log(allWatchHistory);
  const taskForUpdate = [];
  for (const task of allWatchHistory) {
    console.log(task);
    taskForUpdate.push(watchHistoryRepo.remove(task.id));
  }
  await Promise.all(taskForUpdate);
  await usersRepo.remove(id);
};

module.exports = { getAll, get, create, update, remove };
