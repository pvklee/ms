require('dotenv').config();

const env = process.env.NODE_ENV || 'dev';

const dev = {
  app: {
    portNumber: parseInt(process.env.DEV_APP_PORT) || 5000
  }
};

const test = {
};

const config = {
  dev,
  test
}

module.exports = config[env];