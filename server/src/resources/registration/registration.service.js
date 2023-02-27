const { BAD_REQUEST_ERROR } = require('../../errors/appErrors');
const { hashPassword } = require('../../utils/hash-helpers');
const usersRepo = require('../users/user.db.repository');
const { toResponse } = require('../users/user.model');
const ENTITY_NAME = 'registration';

const registration = async user => {
  if (!user) {
    throw new BAD_REQUEST_ERROR(ENTITY_NAME, { login: user.login });
  }
  const hash = await hashPassword(user.password);
  const subscription = user.subscription || 'basic';
  const newUser = await usersRepo.create({
    ...user,
    password: hash,
    subscription
  });

  return {
    user: toResponse(newUser)
  };
};

module.exports = { registration };
