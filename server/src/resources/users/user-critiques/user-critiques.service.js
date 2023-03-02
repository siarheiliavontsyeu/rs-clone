const moviesRepo = require('../../movie/movie.db.repository');

const getUserCritiques = review => moviesRepo.getUserCritiques(review);

module.exports = { getUserCritiques };
