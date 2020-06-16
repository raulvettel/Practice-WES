const passport = require('passport');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const secretKey = 'your_jwt_secret';
const bcrypt = require('bcryptjs');
const User = require('../model/user');

passport.use(new LocalStrategy({ usernameField: 'email',
passwordField: 'password' },
 function (email, password, cb) {
 return User.findOne({ email: email })
 .then(user => {
 if (!user) {
 return cb({ errors: { password: { message: 'Email not found' } } }, false);
 }
 if (bcrypt.compareSync(password, user.password)) {
 return cb({ errors: { password: { message: 'Incorrect password' } } }, false);
 }
 return cb(null, user);
 })
 .catch(err => cb(err));
 }
 ));

 passport.use(new JWTStrategy({
 jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
 secretOrKey: secretKey
 },
 function (jwtPayload, cb) {
 return User.findById(jwtPayload.id)
 .then(user => {
 return cb(null, user);
 })
 .catch(err => cb(err));
 }
 ));

module.exports.secretKey = secretKey;