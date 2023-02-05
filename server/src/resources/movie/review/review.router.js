const router = require('express').Router({ mergeParams: true });
const { CREATED } = require('http-status-codes');
const reviewService = require('./review.service');

router.route('/').post(async (req, res) => {
  const { kinopoiskId } = req.params;
  await reviewService.create({ ...req.body, kinopoiskId });
  res.sendStatus(CREATED);
});

module.exports = router;
