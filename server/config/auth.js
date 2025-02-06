const passport = require('passport');
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt');
require('dotenv').config();

passport.use(new JWTStrategy({
  secretOrKey: process.env.JWT_SECRET,
  issuer: 'yourdomain.com',
}, (jwt_payload, done) => {
  User.findById(jwt_payload.sub, (err, user) => {
    if (err) {
        return done(err, false);
        }
        if (!user) {
        return done(null, false);
        }
        return done(null, user);
        });
}));