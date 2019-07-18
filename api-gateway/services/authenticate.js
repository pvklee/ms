const axios = require('axios');

exports.isAuthenticated = async (req, res, next) => {
  let authRes;
  let authString = req.headers.authorization;
  try {
    authRes = await axios.get(
      'http://localhost:5001/current',
      {headers: { 'Authorization': authString }}
    );
  } catch (err) {
    res.json(err);
  }
  if (!authRes){
    return res.json({message: 'Unauthorized'})
  }
  req.body.currentUser = authRes.data;
  next();
}