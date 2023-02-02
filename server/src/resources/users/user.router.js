const router = require('express').Router();
const { OK, NO_CONTENT } = require('http-status-codes');
const { toResponse } = require('./user.model');
const usersService = require('./user.service');
const { id, user } = require('../../utils/validation/schemas');
const validator = require('../../utils/validation/validator');

router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
    res.status(OK).json(users.map(toResponse));
  })
  .post(validator(user, 'body'), async (req, res) => {
    const resUser = await usersService.create(req.body);
    res.status(OK).json(toResponse(resUser));
  });

router
  .route('/:id')
  .get(validator(id, 'params'), async (req, res) => {
    const resUser = await usersService.get(req.params.id);
    res.status(OK).json(toResponse(resUser));
  })
  .put([validator(id, 'params'), validator(user, 'body')], async (req, res) => {
    const { id: reqID } = req.params;
    const resUser = await usersService.update({ ...req.body, id: reqID });
    res.status(OK).json(toResponse(resUser));
  })
  .delete(validator(id, 'params'), async (req, res) => {
    await usersService.remove(req.params.id);
    res.sendStatus(NO_CONTENT);
  });

module.exports = router;
