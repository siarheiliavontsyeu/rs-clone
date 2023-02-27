const router = require('express').Router();
const { OK, CREATED } = require('http-status-codes');
const { toResponse } = require('./watch-history.model');
const { toResponse: toResponseMovie } = require('../movie/movie.model');
const watchHistoryService = require('./watch-history.service');
const movieService = require('../movie/movie.service');
const { id, watchHistory } = require('../../utils/validation/schemas');
const validator = require('../../utils/validation/validator');

router
  .route('/')
  .get(async (req, res) => {
    const history = await watchHistoryService.getAll();
    res.status(OK).json(history.map(toResponse));
  })
  .post(validator(watchHistory, 'body'), async (req, res) => {
    await watchHistoryService.create(req.body);
    res.sendStatus(CREATED);
  });

router.route('/:id').get(validator(id, 'params'), async (req, res) => {
  const resHistory = await watchHistoryService.get(req.params.id);
  const moviesRequests = resHistory.map(movie => {
    return movieService.get(movie.kinopoiskId);
  });
  const moviesPromises = moviesRequests.map(movieRequest =>
    Promise.resolve(movieRequest).then(toResponseMovie)
  );
  const movies = await Promise.allSettled(moviesPromises);
  const resMovies = movies
    .filter(movie => movie.status === 'fulfilled')
    .map(movie => movie.value);
  const response = resHistory
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
