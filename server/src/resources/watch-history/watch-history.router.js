const router = require('express').Router();
const { OK, NO_CONTENT } = require('http-status-codes');
const { toResponse } = require('./watch-history.model');
const watchHistoryService = require('./watch-history.service');
const { id, watchHistory } = require('../../utils/validation/schemas');
const validator = require('../../utils/validation/validator');

router
  .route('/')
  .get(async (req, res) => {
    const history = await watchHistoryService.getAll();
    res.status(OK).json(history.map(toResponse));
  })
  .post(validator(watchHistory, 'body'), async (req, res) => {
    const resHistory = await watchHistoryService.create(req.body);
    res.status(OK).json(toResponse(resHistory));
  });

router
  .route('/:id')
  .get(validator(id, 'params'), async (req, res) => {
    const resHistory = await watchHistoryService.get(req.params.id);
    res.status(OK).json(resHistory.map(toResponse));
  })
  .delete(validator(id, 'params'), async (req, res) => {
    await watchHistoryService.remove(req.params.id);
    res.sendStatus(NO_CONTENT);
  });

module.exports = router;
