require('dotenv').config();

const env = process.env.NODE_ENV || 'dev';

const dev = {
  app: {
    portNumber: 5002,
  },
  db: {
    mongoURI: 'mongodb://localhost:27017/venues-venues-dev',
  },
};

const test = {
  app: {
    portNumber: 5002,
  },
  db: {
    mongoURI: 'mongodb://localhost:27017/venues-venues-test',
  },
};

const production = {
  app: {
    portNumber: parseInt(process.env.PROD_APP_PORT) || 5002,
  },
  db: {
    mongoURI: process.env.PROD_MONGO_URI,
  },
};

const config = {
  dev,
  test,
  production,
};

module.exports = config[env];
