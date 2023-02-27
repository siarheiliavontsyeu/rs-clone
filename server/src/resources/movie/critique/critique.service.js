const moviesRepo = require('../movie.db.repository');

const create = review => moviesRepo.createCritique(review);
const updateUseful = params => moviesRepo.updateUseful(params);
const updateUseless = params => moviesRepo.updateUseLess(params);

module.exports = { create, updateUseful, updateUseless };
