const venuesRepository = require('../repositories/venues');

exports.create = async(req, res) => {
  const {name, description, address, currentUser: owner} = req.body;
  const {result, errors} = await venuesRepository.createNewVenue({
    name,
    description,
    address,
    owner,
  });
  if (errors) {
    return res.status(400).json(errors);
  }
  return res.json(result);
};

exports.all = async(req, res) => {
  const {result, errors} = await venuesRepository.fetchAllVenues();
  if (errors) {
    return res.status(400).json(errors);
  }
  return res.json(result);
};

exports.detail = async(req, res) => {
  const {result, errors} = await venuesRepository.fetchVenueById(
    req.params.venueId
  );
  if (errors) {
    return res.status(400).json(errors);
  }
  return res.json(result);
};
