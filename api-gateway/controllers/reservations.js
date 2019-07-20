const axios = require('axios');

exports.create = async (req, res) => {
  const {venue, date, currentUser} = req.body;
  let createRes;
  try {
    createRes = await axios.post('http://localhost:5003/create', {venue, date, currentUser});
  } catch (err) {
    res.status(400).json(err);
  }

  res.json(createRes.data);
}

exports.all = async (req, res) => {
  let allRes;
  try{
    allRes = await axios.get('http://localhost:5003/');
  } catch (err) {
    res.status(400).json(err);
  }
  res.json(allRes.data);
}

exports.my = async (req, res) => {
  let myRes;
  try{
    myRes = await axios.get('http://localhost:5003/my');
  } catch (err) {
    res.status(400).json(err);
  }
  res.json(myRes.data);
}