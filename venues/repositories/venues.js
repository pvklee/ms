const Venue = require('../models/Venue');

exports.createNewVenue = async venue => {
  const newVenue = new Venue(venue);
  let result;
  try {
    result = await newVenue.save();
  } catch (errors) {
    return {errors};
  }
  return {result};
};

exports.fetchAllVenues = async() => {
  let result;
  try {
    result = await Venue.find({}).sort({_id: -1});
  } catch (errors) {
    return {errors};
  }
  return {result};
};

exports.fetchVenueById = async venueId => {
  let result;
  try {
    result = await Venue.findById(venueId);
  } catch (errors) {
    return {errors};
  }
  return {result};
};
