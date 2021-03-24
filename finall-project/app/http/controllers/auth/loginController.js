const Controller = require('../controller');
const passport = require('passport');

class LoginController extends Controller {
  getLogin(req, res) {
    res.render('home/auth/login', {
      messages: req.flash('errors'),
      captcha: this.recaptcha.render(),
      title: 'صفحه ورود',
    });
  }

  async postLogin(req, res, next) {
    await this.recaptchaValidation(req, res);
    const result = await this.validationData(req, res);
    if (result) return this.login(req, res,next);
    return res.redirect('/auth/login');
  }

  login(req, res, next) {
    passport.authenticate('local.login', (err, user) => {
      if (!user) return res.redirect('/auth/login');
      req.login(user, (err) => {
        if (req.body.remember) {
          user.setRememberToken(res);
        }
        return res.redirect('/');
      });
    })(req, res, next);
  }
}

module.exports = new LoginController();
