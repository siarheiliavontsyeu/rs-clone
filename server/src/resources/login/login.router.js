const router = require('express').Router();
const { OK } = require('http-status-codes');
const loginService = require('./login.service');

router.route('/').post(async (req, res) => {
  const user = req.body;
  const data = await loginService.connect(user);
  res.status(OK).json(data);
});

module.exports = router;
