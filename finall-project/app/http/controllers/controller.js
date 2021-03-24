const autoBind = require('auto-bind');
const Recaptcha = require('express-recaptcha').RecaptchaV2;
const { check, validationResult } = require('express-validator');

module.exports = class Controller {
  constructor() {
    autoBind(this);
    this.recaptchaConfig();
  }

  recaptchaConfig() {
    this.recaptcha = new Recaptcha(
      config.service.recaptcha.client_key,
      config.service.recaptcha.secret_key,
      {
        ...config.service.recaptcha.options,
      }
    );
  }

  recaptchaValidation(req, res) {
    return new Promise((resolve, reject) => {
      this.recaptcha.verify(req, (err, data) => {
        if (err) {
          req.flash('errors', 'لطفا گزینه من ربات نیستم را فعال کنید');
          this.back(req, res);
        } else resolve(true);
      });
    });
  }

  async validationData(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let messages = [];
      errors.array().forEach((err) => {
        messages.push(err.msg);
      });
      req.flash('errors', messages);
      return false;
    }
    return true;
  }

  back(req, res) {
    return res.redirect(req.header('Referer') || '/');
  }
};
