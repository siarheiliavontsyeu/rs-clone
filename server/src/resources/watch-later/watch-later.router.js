const router = require('express').Router();
const { OK } = require('http-status-codes');
const { toResponse } = require('./watch-later.model');
const { toResponse: toResponseMovie } = require('../movie/movie.model');
const watchLaterService = require('./watch-later.service');
const movieService = require('../movie/movie.service');
const { id, watchLater } = require('../../utils/validation/schemas');
const validator = require('../../utils/validation/validator');

router
  .route('/')
  .get(async (req, res) => {
    const later = await watchLaterService.getAll();
    res.status(OK).json(later.map(toResponse));
  })
  .post(validator(watchLater, 'body'), async (req, res) => {
    const later = await watchLaterService.create(req.body);
    res.status(OK).json(toResponse(later));
  });

router.route('/:id').get(validator(id, 'params'), async (req, res) => {
  const later = await watchLaterService.get(req.params.id);
  const moviesRequests = later.map(movie => {
    return movieService.get(movie.kinopoiskId);
  });
  const movies = await Promise.all(moviesRequests);
  const resMovies = movies.map(toResponseMovie);
  const response = later.map(toResponse).map((hist, idx) => {
    return { ...hist, movie: resMovies[idx] };
  });
  res.status(OK).json(response);
});

module.exports = router;
