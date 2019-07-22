const axios = require('axios');

exports.create = async (req, res) => {
  const {name, description, address, currentUser} = req.body;
  let createRes;
  try {
    createRes = await axios.post('http://localhost:5002/create', {name, description, address, currentUser});
  } catch (err) {
    res.status(400).json(err.response.data);
  }

  res.json(createRes.data);
}

exports.my = async (req, res) => {
  let myRes;
  try{
    myRes = await axios.get('http://localhost:5002/my');
  } catch (err) {
    res.status(400).json(err.response.data);
  }
  res.json(myRes.data);
}

exports.all = async (req, res) => {
  let allRes;
  try{
    allRes = await axios.get('http://localhost:5002/');
  } catch (err) {
    res.status(400).json(err.response.data);
  }
  res.json(allRes.data);
}

exports.detail = async (req, res) => {
  let detailRes;
  let reservationsRes;
  try{
    detailRes = await axios.get(`http://localhost:5002/${req.params.venueId}`);
    reservationsRes = await axios.get(`http://localhost:5003/venue/${req.params.venueId}`);
  } catch (err) {
    res.status(400).json(err.response.data);
  }
  res.json({venue: detailRes.data, reservations: reservationsRes.data});
}