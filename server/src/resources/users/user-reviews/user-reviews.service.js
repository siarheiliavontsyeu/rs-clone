const moviesRepo = require('../../movie/movie.db.repository');

const getUserReviews = review => moviesRepo.getUserReviews(review);

module.exports = { getUserReviews };
