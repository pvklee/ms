const Venue = require('../models/Venue');

exports.create = async (req, res) => {
  const {name, description, address, currentUser} = req.body;
  const newVenue = new Venue({name, description, address, owner: currentUser});
  let result;
  try {
    result = await newVenue.save();
  } catch (errs) {
    return res.status(400).json(errs);
  }

  return res.json(result);
}

exports.all = async (req, res) => {
  let result;
  try {
    result = await Venue.find({}).sort({_id:-1});
  } catch (errs) {
    return res.status(400).json(errs);
  }
  return res.json(result);
}

exports.detail = async (req, res) => {
  let result;
  try {
    result = await Venue.findById(req.params.venueId);
  } catch (errs) {
    return res.status(400).json(errs);
  }
  return res.json(result);
}