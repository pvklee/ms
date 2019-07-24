const mongoose = require('mongoose');
const {
  db: {mongoURI},
} = require('../config/config');

module.exports = async() => {
  await mongoose.connect(mongoURI);
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
};
