const router = require('express').Router({ mergeParams: true });
const { CREATED } = require('http-status-codes');
const critiqueService = require('./critique.service');
const validator = require('../../../utils/validation/validator');
const { critique } = require('../../../utils/validation/schemas');

router.route('/').post([validator(critique, 'body')], async (req, res) => {
  const { kinopoiskId } = req.params;
  await critiqueService.create({ ...req.body, kinopoiskId });
  res.sendStatus(CREATED);
});

module.exports = router;
