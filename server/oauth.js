const router = require('express').Router()
const passport = require('passport')
const User = require('./db/user')
router.get('/', passport.authenticate('google', { scope: 'email' }));


router.get('/callback', passport.authenticate('google', {
    successRedirect: '/home',
    failureRedirect: '/'
  }));

  const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

  // collect our google configuration into an object
  const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  };

  const strategy = new GoogleStrategy(googleConfig, async function (token, refreshToken, profile, done) {
    const googleId = profile.id;
    const email = profile.emails[0].value;
    try {
        const user = await User.findOrCreate({
            where: {
                googleId: profile.id
            },
            defaults: {
                email,
                googleId
            }
        })
        done(null, user[0])
    } catch (err){
        done(err)
    }
  })

  passport.use(strategy)

  passport.serializeUser((user, done) => {
    try {
        console.log('TESTTSTSTST', user.id)
      done(null, user.id);
    } catch (err) {
    console.log('test', user)
      done(err);
    }
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id)
        
        done(null, user)
    } catch (err){
        console.log('Error in Deserialize')
        done(err)
    }
  });
module.exports = router
