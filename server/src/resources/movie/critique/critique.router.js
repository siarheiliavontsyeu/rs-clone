const router = require('express').Router({ mergeParams: true });
const { CREATED } = require('http-status-codes');
const critiqueService = require('./critique.service');

router.route('/').post(async (req, res) => {
  const { kinopoiskId } = req.params;
  await critiqueService.create({ ...req.body, kinopoiskId });
  res.sendStatus(CREATED);
});

module.exports = router;
