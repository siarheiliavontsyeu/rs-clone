const router = require('express').Router({ mergeParams: true });
const { OK } = require('http-status-codes');
const ratingService = require('./rating.service');
const { toResponse } = require('./rating.model');

router.route('/').get(async (req, res) => {
  const { kinopoiskId } = req.params;
  const rating = await ratingService.get(kinopoiskId);
  res.status(OK).json(toResponse(rating));
});

module.exports = router;
