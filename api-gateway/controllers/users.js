const axios = require('axios');

exports.signup = async (req, res) => {
  const {email, password} = req.body;
  let signupRes;
  try {
    signupRes = await axios.post('http://localhost:5001/signup', {email, password});
  } catch (err) {
    return res.status(400).json(err.response.data);
  }
  res.json(signupRes.data);
}

exports.login = async (req, res) => {
  const {email, password} = req.body;
  let loginRes;
  try {
    loginRes = await axios.post('http://localhost:5001/login', {email, password});
  } catch (err) {
    return res.status(400).json(err.response.data);
  }
  res.json(loginRes.data);
}

exports.current = (req, res) => {
  res.json(req.body.currentUser);
}