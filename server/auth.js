require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, ENVIRONMENT } = process.env;

let callbackURL = 'http://localhost:3000/google/callback';
if (ENVIRONMENT === 'PRODUCTION') {
  callbackURL = 'http://18.216.224.164:3000//google/callback';
}

passport.use(new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL,
    passReqToCallback: true,
  },
  ((request, accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }),
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});