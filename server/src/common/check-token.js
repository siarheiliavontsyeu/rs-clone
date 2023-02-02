const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');
const { INCORRECT_TOKEN } = require('../errors/appErrors');
const ENTITY_NAME = 'token';
const AUTH_TYPE = 'Bearer';

const PATH_WITHOUT_AUTH = ['/', '/login', '/login/'];

const checkToken = (req, res, next) => {
  const { url, headers } = req;
  if (PATH_WITHOUT_AUTH.includes(url)) {
    return next();
  }
  try {
    const [type, token] = headers.authorization.split(' ');
    if (type !== AUTH_TYPE) {
      throw new INCORRECT_TOKEN(ENTITY_NAME, { token: headers.authorization });
    }
    jwt.verify(token, JWT_SECRET_KEY);
    return next();
  } catch {
    throw new INCORRECT_TOKEN(ENTITY_NAME, { token: headers.authorization });
  }
};

module.exports = checkToken;
