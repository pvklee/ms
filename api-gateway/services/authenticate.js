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
    return res.status(400).json({session: 'Must be logged in'});
  }

  if (!authRes){
    return res.status(400).json({message: 'Unauthorized'})
  }
  req.body.currentUser = authRes.data;
  next();
}