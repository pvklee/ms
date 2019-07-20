const Reservation = require('../models/Reservation');

exports.create = async (req, res) => {
  const {venue, date, currentUser} = req.body;
  const newReservation = new Reservation({venue, booker: currentUser, resDate: date});
  let result;
  try {
    result = await newReservation.save();
  } catch (errs) {
    return res.json(errs);
  }

  return res.json(result);
}

exports.my = async (req, res) => {
  let result;
  try{
    console.log(req.body);
    result = await Reservation.find({'booker.id': req.body.currentUser.id});
  } catch (errs) {
    return res.json(errs);
  }
  return res.json(result);
}

exports.all = async (req, res) => {
  let result;
  try {
    result = await Reservation.find({});
  } catch (errs) {
    return res.json(errs);
  }
  return res.json(result);
}