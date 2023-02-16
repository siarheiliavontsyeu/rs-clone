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
  const movie = await Movie.findOne({ kinopoiskId });
  if (!movie) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { kinopoiskId });
  }
  const updateMovie = await Movie.findOneAndUpdate(
    { kinopoiskId, 'reviews.userId': { $ne: userId } },
    { $push: { reviews: { userId, ...body, at: Date.now() } } },
    { new: true }
  );
  if (!updateMovie) {
    throw new DUPLICATE(`${ENTITY_NAME} review`, {
      kinopoiskId,
      userId
    });
  }
};

const getUserReviews = async userId => {
  const movies = await Movie.find({ 'reviews.${}.userId': userId });
  if (!movies) {
    throw new NOT_FOUND_ERROR(`${ENTITY_NAME} user reviews`, { userId });
  }
  console.log(movies);
  return movies;
};

const getUserCritiques = async userId => {
  const movies = await Movie.find({ 'critiques.${}.userId': userId });
  if (!movies) {
    throw new NOT_FOUND_ERROR(`${ENTITY_NAME} user critiques`, { userId });
  }
  console.log(movies);
  return movies;
};

const createCritique = async ({ kinopoiskId, userId, ...body }) => {
  const movie = await Movie.findOne({ kinopoiskId });
  if (!movie) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { kinopoiskId });
  }

  const updateMovie = await Movie.findOneAndUpdate(
    { kinopoiskId, 'critiques.userId': { $ne: userId } },
    {
      $push: {
        critiques: { userId, ...body, useful: 0, useless: 0, at: Date.now() }
      }
    },
    { new: true }
  );
  if (!updateMovie) {
    throw new DUPLICATE(`${ENTITY_NAME} critique`, {
      kinopoiskId,
      userId
    });
  }
};

const updateUseful = async ({ kinopoiskId, userId, useful }) => {
  const movie = await Movie.findOne({
    kinopoiskId,
    'critiques.userId': userId
  });
  if (!movie) {
    throw new NOT_FOUND_ERROR(`${ENTITY_NAME} critiques`, {
      kinopoiskId,
      userId
    });
  }
  const updateMovie = await Movie.updateOne(
    { kinopoiskId, 'critiques.userId': userId },
    {
      $set: {
        'critiques.$.useful': useful
      }
    }
  );
  return updateMovie;
};

const updateUseLess = async ({ kinopoiskId, userId, useless }) => {
  const movie = await Movie.findOne({
    kinopoiskId,
    'critiques.userId': userId
  });
  if (!movie) {
    throw new NOT_FOUND_ERROR(`${ENTITY_NAME} critiques`, {
      kinopoiskId,
      userId
    });
  }
  const updateMovie = await Movie.updateOne(
    { kinopoiskId, 'critiques.userId': userId },
    {
      $set: {
        'critiques.$.useless': useless
      }
    }
  );
  return updateMovie;
};

module.exports = {
  getAll,
  get,
  getRating,
  create,
  remove,
  createReview,
  createCritique,
  updateUseful,
  updateUseLess,
  getUserReviews,
  getUserCritiques
};
