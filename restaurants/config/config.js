require('dotenv').config();

const env = process.env.NODE_ENV || 'dev';

const dev = {
  app: {
    portNumber: parseInt(process.env.DEV_APP_PORT) || 5002
  },
  db: {
    mongoURI: process.env.DEV_MONGO_URI
  },
  secret: process.env.DEV_SECRET_KEY
};

const test = {
};

const config = {
  dev,
  test
}

module.exports = config[env];