const mongoose = require('mongoose');
const { Movie } = require('./movie.model');
const { NOT_FOUND_ERROR, DUPLICATE } = require('../../errors/appErrors');
const ENTITY_NAME = 'movie';

const getAll = async () => Movie.find({});

const get = async kinopoiskId => {
  const movie = await Movie.findOne({ kinopoiskId });
  if (!movie) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { kinopoiskId });
  }
  return movie;
};

const getRating = async kinopoiskId => {
  const movie = await Movie.findOne({ kinopoiskId });
  if (!movie) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { kinopoiskId });
  }

  const rating =
    movie.reviews.reduce((acc, next) => acc + next.rating, 0) /
    movie.reviews.length;
  return { kinopoiskId, rating: rating.toFixed(1) };
};

const create = async movie => {
  try {
    return await Movie.create({ ...movie });
  } catch (e) {
    const { kinopoiskId, imdbId } = movie;
    throw new DUPLICATE(`${ENTITY_NAME} kinopoiskId or imdbId`, {
      kinopoiskId,
      imdbId
    });
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

const createReview = async ({ kinopoiskId, userId, ...body }) => {
  try {
    const movie = await Movie.findOneAndUpdate(
      { kinopoiskId, 'reviews.userId': { $ne: userId } },
      { $push: { reviews: { userId, ...body, at: Date.now() } } },
      { new: true }
    );
    if (!movie) {
      throw new NOT_FOUND_ERROR(ENTITY_NAME, { kinopoiskId });
    }
  } catch (error) {
    throw new DUPLICATE(`${ENTITY_NAME} review userID`, {
      kinopoiskId,
      userId
    });
  }
};

const createCritique = async ({ kinopoiskId, userId, ...body }) => {
  try {
    const movie = await Movie.findOneAndUpdate(
      { kinopoiskId, 'critiques.userId': { $ne: userId } },
      { $push: { critiques: { userId, ...body, at: Date.now() } } },
      { new: true }
    );
    if (!movie) {
      throw new NOT_FOUND_ERROR(ENTITY_NAME, { kinopoiskId });
    }
  } catch (error) {
    throw new DUPLICATE(`${ENTITY_NAME} critique userID`, {
      kinopoiskId,
      userId
    });
  }
};

module.exports = {
  getAll,
  get,
  getRating,
  create,
  remove,
  createReview,
  createCritique
};
