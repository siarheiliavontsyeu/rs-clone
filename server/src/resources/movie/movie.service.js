const moviesRepo = require('./movie.db.repository');

const getAll = () => moviesRepo.getAll();
const get = id => moviesRepo.get(id);
const create = async movie => {
  return moviesRepo.create({ ...movie });
};
const update = async movie => {
  return moviesRepo.update({ ...movie });
};
const remove = async id => {
  await moviesRepo.remove(id);
};

module.exports = { getAll, get, create, update, remove };
