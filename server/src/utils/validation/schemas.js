const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const schemas = {
  id: Joi.object({
    id: Joi.objectId().required()
  }),
  user: Joi.object()
    .options({ abortEarly: false, allowUnknown: true })
    .keys({
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
    }),
  watchHistory: Joi.object()
    .options({ abortEarly: false, allowUnknown: true })
    .keys({
      userId: Joi.string().required(),
      movieId: Joi.string().required()
    }),
  watchLater: Joi.object()
    .options({ abortEarly: false, allowUnknown: true })
    .keys({
      userId: Joi.string().required(),
      movieId: Joi.string().required()
    })
};

module.exports = schemas;
