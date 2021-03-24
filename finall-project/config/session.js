const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

module.exports = {
  secret: 'mysecretKey',
  resave: true,
  saveUninitialized: true,
  cookie: { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2) }, //for 2 days
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
  }),
};
