const jwt = require('jsonwebtoken');
const { comparePasswords } = require('../../utils/hash-helpers');
const { INCORRECT_LOGIN_OR_PASSWORD } = require('../../errors/appErrors');
const usersRepo = require('../users/user.db.repository');
const ENTITY_NAME = 'login';

const { JWT_SECRET_KEY } = require('../../common/config');

const connect = async user => {
  const user_ = await usersRepo.getOneByLogin(user);
  const { login: account } = user;
  if (!user_) {
    throw new INCORRECT_LOGIN_OR_PASSWORD(ENTITY_NAME, { login: account });
  }
  const isPasswordValid = await comparePasswords(user.password, user_.password);
  if (!isPasswordValid) {
    throw new INCORRECT_LOGIN_OR_PASSWORD(ENTITY_NAME, { login: account });
  }
  const { id, login } = user_;

  return jwt.sign({ id, login }, JWT_SECRET_KEY);
};

module.exports = { connect };
