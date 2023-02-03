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
  password: Joi.string().regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_@$!%*?&])[A-Za-z\d_@$!%*?&]{8,}$/
  ),
  subscription: Joi.string().regex(/^(basic|premium)$/)
});

const watchHistorySchema = Joi.object({
  userId: Joi.objectId().required(),
  movieId: Joi.string().required()
});

const watchLaterSchema = Joi.object({
  userId: Joi.objectId().required(),
  movieId: Joi.string().required()
});

const reviewSchema = Joi.object({
  userId: Joi.objectId().required(),
  rating: Joi.number().required(),
  text: Joi.string().required()
});

const critiqueSchema = Joi.object({
  userId: Joi.objectId().required(),
  text: Joi.string().required()
});

const movieSchema = Joi.object({
  movieId: Joi.string().required(),
  reviews: Joi.array().items(reviewSchema),
  critiques: Joi.array().items(critiqueSchema)
});

const schemas = {
  id: Joi.object({
    id: Joi.objectId().required()
  }),
  movieId: Joi.object({
    movieId: Joi.string().required()
  }),
  user: userSchema,
  watchHistory: watchHistorySchema,
  watchLater: watchLaterSchema,
  review: reviewSchema,
  critique: critiqueSchema,
  movie: movieSchema
};

module.exports = schemas;
