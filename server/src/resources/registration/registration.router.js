const router = require('express').Router();
const { OK } = require('http-status-codes');
const registrationService = require('./registration.service');
const validator = require('../../utils/validation/validator');
const { user } = require('../../utils/validation/schemas');

router.route('/').post(validator(user, 'body'), async (req, res) => {
  const data = await registrationService.registration(req.body);
  res.status(OK).json(data);
});

module.exports = router;
