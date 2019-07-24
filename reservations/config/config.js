require('dotenv').config();

const env = process.env.NODE_ENV || 'dev';

const dev = {
  app: {
    portNumber: 5003
  },
  db: {
    mongoURI: 'mongodb://localhost:27017/venues-reservations-dev'
  }
};

const test = {
  app: {
    portNumber: 5003
  },
  db: {
    mongoURI: 'mongodb://localhost:27017/venues-reservations-test'
  }
};

const production = {
  app: {
    portNumber: parseInt(process.env.PROD_APP_PORT) || 5003
  },
  db: {
    mongoURI: process.env.PROD_MONGO_URI
  }
}

const config = {
  dev,
  test,
  production
}

module.exports = config[env];