const Controller = require('../controller');
const passport = require('passport');
const ResetPassword = require('../../../models/password-reset');
const User = require('../../../models/user');
class LoginController extends Controller {
  getResetPassword(req, res) {
    res.render('home/auth/password/reset', {
      messages: req.flash('errors'),
      captcha: this.recaptcha.render(),
      title: ' بازیابی رمز عبور',
      token: req.params.token,
    });
  }

  async postResetPassword(req, res, next) {
    await this.recaptchaValidation(req, res);
    const result = await this.validationData(req, res);
    if (result) return this.resetPassword(req, res, next);
    return res.redirect('/auth/password/reset/' + req.body.token);
  }

  async resetPassword(req, res, next) {
    const field = await ResetPassword.findOne({
      $and: [{ email: req.body.email }, { token: req.body.token }],
    });

    if (!field) {
      req.flash('errors', 'اطلاعات وارد شده صحیح نیست');
      return this.back(req, res);
    }

    if (field.use) {
      req.flash('errors', 'از این لینک قبلا استفاده شده است');
      return this.back(req, res);
    }

    let user = await User.findOneAndUpdate(
      { email: field.email },
      { $set: { password: req.body.password } }
    );

    if (!user) {
      req.flash('errors', 'آپدیت شدن انجام نشد');
      return this.back(req, res);
    }

    await field.update({ use: true });
    return res.redirect('/auth/login');
  }
}

module.exports = new LoginController();
