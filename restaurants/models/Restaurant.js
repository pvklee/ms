const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  owner:{
    id: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Restaurant = mongoose.model('restaurants', RestaurantSchema);