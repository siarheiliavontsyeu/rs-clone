const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const userSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30),
  login: Joi.string()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string().regex(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,12}$/),
  subscription: Joi.string().regex(/^(basic|premium)$/)
});

const watchHistorySchema = Joi.object({
  userId: Joi.objectId().required(),
  kinopoiskId: Joi.string().required()
});

const watchLaterSchema = Joi.object({
  userId: Joi.objectId().required(),
  kinopoiskId: Joi.string().required()
});

const reviewSchema = Joi.object({
  userId: Joi.objectId().required(),
  rating: Joi.number().required(),
  text: Joi.string().required()
});

const critiqueSchema = Joi.object({
  userId: Joi.objectId().required(),
  title: Joi.string().required(),
  text: Joi.string().required(),
  type: Joi.string()
    .required()
    .regex(/^(positive|negative|neutral)$/)
});

const movieSchema = Joi.object({
  kinopoiskId: Joi.string().required(),
  imdbId: Joi.string().required(),
  nameRu: Joi.string().required(),
  nameOriginal: Joi.string().required(),
  posterUrlPreview: Joi.string(),
  ratingKinopoisk: Joi.number(),
  reviews: Joi.array().items(reviewSchema),
  critiques: Joi.array().items(critiqueSchema)
});

const schemas = {
  id: Joi.object({
    id: Joi.objectId().required()
  }),
  kinopoiskId: Joi.object({
    kinopoiskId: Joi.string().required()
  }),
  user: userSchema,
  watchHistory: watchHistorySchema,
  watchLater: watchLaterSchema,
  review: reviewSchema,
  critique: critiqueSchema,
  movie: movieSchema
};

module.exports = schemas;
