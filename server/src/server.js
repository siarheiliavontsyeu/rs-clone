/* eslint-disable no-sync */
const mongoose = require('mongoose');
const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const logger = require('./common/logging');
// const https = require('https');
// const fs = require('fs');
const app = require('./app');
// const { create } = require('./resources/users/user.service');

// const MOCK_USER = {
//   login: 'admin',
//   password: 'admin',
//   subscription: 'premium'
// };
/*
const sslOptions = {
  key: fs.readFileSync('/home/lsi/back/src/key.pem'),
  cert: fs.readFileSync('/home/lsi/back/src/cert.pem'),
  ca: fs.readFileSync('/home/lsi/back/src/ca.pem')
};
*/
mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;

db.on('error', () => logger.error('MongoDB connection fail:')).once(
  'open',
  async () => {
    logger.info('Successfully connect to MongoDB');
    // await create(MOCK_USER);
    // logger.info('Successfully create mock admin user');
    // https.createServer(sslOptions, app).listen(PORT);
    app.listen(PORT, () =>
      logger.info(`App is running on http://localhost:${PORT}`)
    );
  }
);
