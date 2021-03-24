const Validator = require('./validator');
const { check } = require('express-validator');

class RegisterValidator extends Validator {
  handle() {
    return [
      check('name')
        .isLength({ min: 3, max: 20 })
        .withMessage('فیلد نام نمیتواند کمتر از 3 کاراکتر و بیشتر از 20 باشد'),

      check('lastname')
        .isLength({ min: 3, max: 20 })
        .withMessage(
          'فیلد نام خانوادگی نمیتواند کمتر از 3 کاراکتر و بیشتر از 20 باشد'
        ),

      check('gender').notEmpty().withMessage('لطفا جنسیت خود را تعیین کنید'),

      check('email').isEmail().withMessage('فیلد ایمیل معتبر نیست'),

      check('phone')
        .isLength({ min: 8, max: 12 })
        .withMessage('شماره تلفن باید بین 8 تا 12 عدد باشد')
        .isNumeric()
        .withMessage('شماره تلفن باید عدد باشد'),

      check('password')
        .isLength({ min: 6, max: 20 })
        .withMessage(
          'فیلد پسورد نمیتواند کمتر از 6 کاراکتر و بیشتر از 20 باشد'
        ),
    ];
  }
}

module.exports = new RegisterValidator();
