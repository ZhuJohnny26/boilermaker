const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan')
const session = require('express-session');
const User = require('./db/user')

app.use(morgan('dev'))
// you'll of course want static middleware so your browser can request things like your 'bundle.js'
app.use(express.static(path.join(__dirname, '../public')))

// Any routes or other various middlewares should go here!

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(session({
  secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
  resave: false,
  saveUninitialized: false
}));

const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then(user => done(null, user))
    .catch(done);
});

app.use('/api', require('./api'))
app.use('/auth', require('./auth'))


// Make sure this is right at the end of your server logic!
// The only thing after this might be a piece of middleware to serve up 500 errors for server problems
// (However, if you have middleware to serve up 404s, that go would before this as well )
app.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

app.listen(8000, () => {console.log('http://localhost:8000')})

module.exports = app