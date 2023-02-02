const router = require('express').Router();
const { OK, NO_CONTENT } = require('http-status-codes');
const { toResponse } = require('./watch-later.model');
const watchLaterService = require('./watch-later.service');
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

router
  .route('/:id')
  .get(validator(id, 'params'), async (req, res) => {
    const later = await watchLaterService.get(req.params.id);
    res.status(OK).json(later.map(toResponse));
  })
  .delete(validator(id, 'params'), async (req, res) => {
    await watchLaterService.remove(req.params.id);
    res.sendStatus(NO_CONTENT);
  });

module.exports = router;
