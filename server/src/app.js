const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const createError = require('http-errors');
const { OK, NOT_FOUND } = require('http-status-codes');
const morgan = require('morgan');
const winston = require('./common/logging');
const errorHandler = require('./errors/errorHandler');
const checkToken = require('./common/check-token');
require('express-async-errors');

const loginRouter = require('./resources/login/login.router');
const userRouter = require('./resources/users/user.router');
const watchHistoryRouter = require('./resources/watch-history/watch-history.router');
const watchLaterRouter = require('./resources/watch-later/watch-later.router');
const movieRouter = require('./resources/movie/movie.router');
const reviewRouter = require('./resources/movie/review/review.router');
const critiqueRouter = require('./resources/movie/critique/critique.router');

const app = express();
app.disable('x-powered-by');
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(checkToken);

app.use(
  morgan(
    ':method :status :url :query Body :body size :res[content-length] - :response-time ms',
    {
      stream: winston.stream
    }
  )
);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.status(OK).send('Service is running!');
    return;
  }
  next();
});

app.use('/login', loginRouter);
app.use('/users', userRouter);
app.use('/watch-history', watchHistoryRouter);
app.use('/watch-later', watchLaterRouter);
app.use('/movie', movieRouter);
movieRouter.use('/:kinopoiskId/review', reviewRouter);
movieRouter.use('/:kinopoiskId/critique', critiqueRouter);

app.use((req, res, next) => next(createError(NOT_FOUND)));

app.use(errorHandler);

// throw Error('Oops!');
// Promise.reject(Error('Oops!'));

module.exports = app;
