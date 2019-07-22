const {validateSignup, validateLogin} = require('../validation/users')
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secretOrKey = require('../config/config').secret;
const User = require('../models/User');

exports.signup = async (req, res) => {
  const {errors, isValid} = validateSignup(req.body);
  if(!isValid) {return res.status(400).json(errors);}
  const {email, password, firstname, lastname} = req.body;

  const user = await User.findOne({ email });

  if(user){
    return res.status(400).json({email: 'email already taken'});
  }

  const hash = await bcrypt.hash(password, saltRounds);
  const newUser = new User({email, password: hash, firstname, lastname});
  let result;
  try {
    result = await newUser.save();
  } catch (errs) {
    return res.status(400).json(errs)
  }

  const payload = {id: result.id, email};
  jwt.sign(
    payload,
    secretOrKey,
    {expiresIn: 3600},
    (err, token) => {
      return res.json({
        success: true,
        token: 'Bearer ' + token
      });
    });
}

exports.login = async (req, res) => {
  const {errors, isValid} = validateLogin(req.body);
  if(!isValid){return res.status(400).json(errors);}

  const {email, password} = req.body;
  const user = await User.findOne({email});

  if(!user){
    return res.status(400).json({email: 'no user with that email'});
  }
  const match = await bcrypt.compare(password, user.password);
  if(match){
    const payload = {id: user.id, email: user.email};
    jwt.sign(
      payload,
      secretOrKey,
      {expiresIn: 3600},
      (err, token) => {
        return res.json({
          success: true,
          token: 'Bearer ' + token
        });
      });
  }else{
    return res.status(400).json({password: 'incorrect password'});
  }
}

exports.current = (req, res) => {
  return res.json({id: req.currentUser.id, email: req.currentUser.email});
}