const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
  venue: {
    type: String,
    required: true
  },
  booker:{
    id: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  resDate: {
    type: Date,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Reservation = mongoose.model('reservations', ReservationSchema);