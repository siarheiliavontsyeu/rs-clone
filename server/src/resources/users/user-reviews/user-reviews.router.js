const router = require('express').Router({ mergeParams: true });
const { OK } = require('http-status-codes');
const userService = require('./user-reviews.service');
const { toResponse } = require('../../movie/movie.model');

router.route('/').get(async (req, res) => {
  const movies = await userService.getUserReviews(req.params.id);
  res.status(OK).json(movies.map(toResponse));
});

module.exports = router;
