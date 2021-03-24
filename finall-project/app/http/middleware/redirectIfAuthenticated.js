const User = require('app/models/user');
const Middleware = require('./middleware');

class RedirectIfAuthenticated extends Middleware {
  handle(req, res, next) {
    if (req.isAuthenticated()) return res.redirect('/');

    next();
  }
}

module.exports = new RedirectIfAuthenticated();
