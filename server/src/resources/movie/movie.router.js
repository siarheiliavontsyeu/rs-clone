const router = require('express').Router();
const { OK, NO_CONTENT } = require('http-status-codes');
const { toResponse } = require('./movie.model');
const movieService = require('./movie.service');
const { movieId, movie } = require('../../utils/validation/schemas');
const validator = require('../../utils/validation/validator');

router
  .route('/')
  .get(async (req, res) => {
    const movies = await movieService.getAll();
    res.status(OK).json(movies.map(toResponse));
  })
  .post(validator(movie, 'body'), async (req, res) => {
    const resMovie = await movieService.create(req.body);
    res.status(OK).json(toResponse(resMovie));
  });

router
  .route('/:movieId')
  .get(validator(movieId, 'params'), async (req, res) => {
    const resMovie = await movieService.get(req.params.movieId);
    console.log(resMovie);
    res.status(OK).json(toResponse(resMovie));
  })
  .put(
    [validator(movieId, 'params'), validator(movie, 'body')],
    async (req, res) => {
      const { movieId: reqID } = req.params;
      const resMovie = await movieService.update({ ...req.body, id: reqID });
      res.status(OK).json(toResponse(resMovie));
    }
  )
  .delete(validator(movieId, 'params'), async (req, res) => {
    await movieService.remove(req.params.id);
    res.sendStatus(NO_CONTENT);
  });

module.exports = router;
