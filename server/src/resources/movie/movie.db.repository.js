const mongoose = require('mongoose');
const { Movie } = require('./movie.model');
const {
  NOT_FOUND_ERROR,
  DUPLICATE_USER_LOGIN
} = require('../../errors/appErrors');
const ENTITY_NAME = 'movie';

const getAll = async () => Movie.find({});

const get = async kinopoiskId => {
  const movie = await Movie.findOne({ kinopoiskId });
  if (!movie) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { kinopoiskId });
  }
  return movie;
};

const create = async movie => {
  try {
    return await Movie.create({ ...movie });
  } catch (e) {
    const { kinopoiskId } = movie;
    throw new DUPLICATE_USER_LOGIN(ENTITY_NAME, { kinopoiskId });
  }
};

const remove = async id => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
  const movie = await Movie.deleteOne({ _id: id });
  if (!movie) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
  return movie;
};

module.exports = { getAll, get, create, remove };
