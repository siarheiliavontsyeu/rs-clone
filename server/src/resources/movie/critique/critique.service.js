const moviesRepo = require('../movie.db.repository');

const create = review => moviesRepo.createCritique(review);

module.exports = { create };
