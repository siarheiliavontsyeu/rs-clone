const {
  NOT_FOUND,
  BAD_REQUEST,
  FORBIDDEN,
  UNAUTHORIZED,
  CONFLICT
} = require('http-status-codes');

class NotFoundError extends Error {
  constructor(entity, params, message) {
    super(
      message || `Couldn't find a(an) ${entity} with: ${JSON.stringify(params)}`
    );
    this.status = NOT_FOUND;
  }
}

class BadRequestError extends Error {
  constructor(entity, body, message) {
    super(message || `Bad request ${entity} with: ${JSON.stringify(body)}`);
    this.status = BAD_REQUEST;
  }
}

class IncorrectLoginPassword extends Error {
  constructor(entity, body, message) {
    super(message || `Incorrect ${entity} creds with: ${JSON.stringify(body)}`);
    this.status = FORBIDDEN;
  }
}

class IncorrectToken extends Error {
  constructor(entity, body, message) {
    super(message || `Incorrect ${entity} with: ${JSON.stringify(body)}`);
    this.status = UNAUTHORIZED;
  }
}

class Duplicate extends Error {
  constructor(entity, body, message) {
    super(message || `Duplicate  ${entity} with: ${JSON.stringify(body)}`);
    this.status = CONFLICT;
  }
}

module.exports = {
  NOT_FOUND_ERROR: NotFoundError,
  BAD_REQUEST_ERROR: BadRequestError,
  INCORRECT_LOGIN_OR_PASSWORD: IncorrectLoginPassword,
  INCORRECT_TOKEN: IncorrectToken,
  DUPLICATE: Duplicate
};
