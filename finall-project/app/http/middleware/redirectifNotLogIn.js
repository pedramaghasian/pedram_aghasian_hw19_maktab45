const User = require('app/models/user');
const Middleware = require('./middleware');

class RedirectIfNotLogIn extends Middleware {
  handle(req, res, next) {
    if (!req.isAuthenticated()) return res.redirect('/auth/login');

    next();
  }
}

module.exports = new RedirectIfNotLogIn();
