const moviesRepo = require('../movie.db.repository');
const get = kinopoiskId => moviesRepo.getRating(kinopoiskId);

module.exports = { get };
