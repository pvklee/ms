const axios = require('axios');

exports.create = async (req, res) => {
  const {name, description, address, currentUser} = req.body;
  let createRes;
  try {
    createRes = await axios.post('http://localhost:5002/create', {name, description, address, currentUser});
  } catch (err) {
    res.json(err);
  }

  res.json(createRes.data);
}

exports.all = async (req, res) => {
  let allRes;
  try{
    allRes = await axios.get('http://localhost:5002/');
  } catch (err) {
    res.json(err);
  }
  res.json(allRes.data);
}