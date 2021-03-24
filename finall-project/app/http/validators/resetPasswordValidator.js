const Validator = require('./validator');
const { check } = require('express-validator');

class ResetPasswordValidator extends Validator {
  handle() {
    return [
      check('email').trim().isEmail().withMessage('فیلد ایمیل معتبر نیست'),

      check('token')
        .trim()
        .notEmpty()
        .withMessage('فیلد توکن نمیتواند خالی باشد'),

      check('password')
        .trim()
        .isLength({ min: 8 })
        .withMessage('فیلد پسورد نمیتواند کمتر از 8 کاراکتر باشد'),
    ];
  }
}

module.exports = new ResetPasswordValidator();
