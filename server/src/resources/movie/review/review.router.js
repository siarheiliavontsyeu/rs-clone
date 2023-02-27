const router = require('express').Router({ mergeParams: true });
const { CREATED } = require('http-status-codes');
const reviewService = require('./review.service');
const validator = require('../../../utils/validation/validator');
const { review } = require('../../../utils/validation/schemas');

router.route('/').put([validator(review, 'body')], async (req, res) => {
  const { kinopoiskId } = req.params;
  await reviewService.createOrUpdate({ ...req.body, kinopoiskId });
  res.sendStatus(CREATED);
});

module.exports = router;
