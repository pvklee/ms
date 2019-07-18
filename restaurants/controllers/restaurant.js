const Restaurant = require('../models/Restaurant');

exports.create = async (req, res) => {
  const {name, description, address, currentUser} = req.body;
  const newRestaurant = new Restaurant({name, description, address, owner: currentUser});
  let result;
  try {
    result = await newRestaurant.save();
  } catch (errs) {
    return res.status(400).json(errs);
  }

  return res.json(result);
}

exports.all = async (req, res) => {
  let result;
  try {
    result = await Restaurant.find({});
  } catch (errs) {
    return res.status(400).json(errs);
  }
  return res.json(result);
}