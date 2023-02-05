const moviesRepo = require('../movie.db.repository');

const create = review => moviesRepo.createReview(review);

module.exports = { create };
