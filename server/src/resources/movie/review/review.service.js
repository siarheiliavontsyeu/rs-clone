const moviesRepo = require('../movie.db.repository');

const createOrUpdate = review => moviesRepo.createOrUpdateReview(review);

module.exports = { createOrUpdate };
