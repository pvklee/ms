require('dotenv').config();

const env = process.env.NODE_ENV || 'dev';

const dev = {
  app: {
    portNumber: 5001
  },
  db: {
    mongoURI: 'mongodb://localhost:27017/venues-authentication-dev'
  },
  secret: process.env.DEV_SECRET_KEY
};

const test = {
  app: {
    portNumber: 5001
  },
  db: {
    mongoURI: 'mongodb://localhost:27017/venues-authentication-test'
  },
  secret: process.env.TEST_SECRET_KEY
};

const production = {
  app: {
    portNumber: parseInt(process.env.PROD_APP_PORT) || 5001
  },
  db: {
    mongoURI: process.env.PROD_MONGO_URI
  },
  secret: process.env.PROD_SECRET_KEY
}

const config = {
  dev,
  test,
  production
}

module.exports = config[env];