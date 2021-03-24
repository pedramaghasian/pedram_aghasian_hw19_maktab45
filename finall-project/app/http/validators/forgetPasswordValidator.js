const Validator = require('./validator');
const { check } = require('express-validator');


class ForgetPasswordValidator extends Validator {
  handle() {
    return [
      check('email')
        .notEmpty()
        .withMessage('فیلد ایمیل نمیتواند خالی باشد')
        .isEmail()
        .withMessage('فیلد ایمیل معتبر نیست'),
    ];
  }
}

module.exports = new ForgetPasswordValidator();
