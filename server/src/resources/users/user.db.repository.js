const mongoose = require('mongoose');
const { User } = require('./user.model');
const {
  NOT_FOUND_ERROR,
  DUPLICATE_USER_LOGIN
} = require('../../errors/appErrors');
const ENTITY_NAME = 'user';

const getAll = async () => User.find({});

const get = async id => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
  const user = await User.findById(id);
  if (!user) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
  return user;
};

const getOneByLogin = async ({ login }) => {
  const user = (await User.find({ login }))[0];
  return user;
};

const create = async user => {
  try {
    return await User.create(user);
  } catch (e) {
    const { login } = user;
    throw new DUPLICATE_USER_LOGIN(ENTITY_NAME, { login });
  }
};

const update = async user => {
  const { id } = user;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
  await User.updateOne({ _id: id }, user);
  if (!user) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }

  return get(id);
};

const remove = async id => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
  const user = await User.deleteOne({ _id: id });
  if (!user) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
  return user;
};

module.exports = { getAll, get, getOneByLogin, create, update, remove };
