const passport = require ('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const {findUserbyId,addOrCreateUser} = require('../controllers/users')

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(async function(id, done) {
    const finduser = await findUserbyId(id);
    return done(null,finduser[0])
  });

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    const getUser = await addOrCreateUser({googleId:profile.emails[0].value})
    return done(null,getUser)
  }
));

