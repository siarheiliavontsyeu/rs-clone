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
const cors = require('cors');
require('express-async-errors');

const loginRouter = require('./resources/login/login.router');
const registrationRouter = require('./resources/registration/registration.router');
const userRouter = require('./resources/users/user.router');
const userReviewsRouter = require('./resources/users/user-reviews/user-reviews.router');
const useCritiquesRouter = require('./resources/users/user-critiques/user-critiques.router');
const watchHistoryRouter = require('./resources/watch-history/watch-history.router');
const watchLaterRouter = require('./resources/watch-later/watch-later.router');
const movieRouter = require('./resources/movie/movie.router');
const reviewRouter = require('./resources/movie/review/review.router');
const critiqueRouter = require('./resources/movie/critique/critique.router');
const ratingRouter = require('./resources/movie/rating/rating.router');

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

const app = express();
app.use(cors(corsOptions));
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
app.use('/registration', registrationRouter);
app.use('/users', userRouter);
userRouter.use('/:userId/user-reviews', userReviewsRouter);
userRouter.use('/:userId/user-critiques', useCritiquesRouter);
app.use('/watch-history', watchHistoryRouter);
app.use('/watch-later', watchLaterRouter);
app.use('/movie', movieRouter);
movieRouter.use('/:kinopoiskId/review', reviewRouter);
movieRouter.use('/:kinopoiskId/critique', critiqueRouter);
movieRouter.use('/:kinopoiskId/rating', ratingRouter);

app.use((req, res, next) => next(createError(NOT_FOUND)));

app.use(errorHandler);

// throw Error('Oops!');
// Promise.reject(Error('Oops!'));

module.exports = app;
