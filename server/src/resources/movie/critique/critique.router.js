const router = require('express').Router({ mergeParams: true });
const { OK, CREATED } = require('http-status-codes');
const critiqueService = require('./critique.service');
const validator = require('../../../utils/validation/validator');
const {
  critique,
  useful,
  useless
} = require('../../../utils/validation/schemas');

router.route('/').post([validator(critique, 'body')], async (req, res) => {
  const { kinopoiskId } = req.params;
  await critiqueService.create({ ...req.body, kinopoiskId });
  res.sendStatus(CREATED);
});

router.route('/useful').put([validator(useful, 'body')], async (req, res) => {
  const { kinopoiskId } = req.params;
  await critiqueService.updateUseful({ ...req.body, kinopoiskId });
  res.sendStatus(OK);
});

router.route('/useless').put([validator(useless, 'body')], async (req, res) => {
  const { kinopoiskId } = req.params;
  await critiqueService.updateUseless({ ...req.body, kinopoiskId });
  res.sendStatus(OK);
});

module.exports = router;
