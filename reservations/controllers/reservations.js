const Reservation = require('../models/Reservation');

exports.create = async (req, res) => {
  const {venue, date, currentUser} = req.body;
  console.log(date);
  let existing = await Reservation.findOne({venue, resDate: date});
  if(existing){
    return res.status(400).json({date: 'Existing reservation on that date'});
  }
  const newReservation = new Reservation({venue, booker: currentUser, resDate: date});
  let result;
  try {
    result = await newReservation.save();
  } catch (errs) {
    return res.status(400).json(errs);
  }

  return res.json(result);
}

exports.my = async (req, res) => {
  let result;
  try{
    console.log(req.body);
    result = await Reservation.find({'booker.id': req.body.currentUser.id});
  } catch (errs) {
    return res.status(400).json(errs);
  }
  return res.json(result);
}

exports.all = async (req, res) => {
  let result;
  try {
    result = await Reservation.find({});
  } catch (errs) {
    return res.status(400).json(errs);
  }
  return res.json(result);
}

exports.fromVenueId = async (req, res) => {
  let result;
  try{
    result = await Reservation.find({venue: req.params.venueId});
  }catch(errs){
    return res.status(400).json(errs);
  }
  return res.json(result);
}