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
  const moviesPromises = moviesRequests.map(movieRequest =>
    Promise.resolve(movieRequest).then(toResponseMovie)
  );
  const movies = await Promise.allSettled(moviesPromises);
  const resMovies = movies
    .filter(movie => movie.status === 'fulfilled')
    .map(movie => movie.value);
  const response = later
    .map(toResponse)
    .map((hist, idx) => {
      if (resMovies[idx]) {
        return { ...hist, movie: resMovies[idx] };
      }
    })
    .filter(Boolean);
  res.status(OK).json(response);
});

module.exports = router;
