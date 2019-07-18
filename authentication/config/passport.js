const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const secretOrKey = require('../config/config').secret;
const User = require('../models/User');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = secretOrKey;

module.exports = passport => {
  passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
    const user = await User.findById(jwt_payload.id);
    if(!user){return done(null, false);};
    return done(null, user);
  }))
};