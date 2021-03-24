const Validator = require('./validator');
const { check } = require('express-validator');

class UpdatePasswordValidator extends Validator {
  handle() {
    return [
      check('new-password')
        .isLength({ min: 6, max: 20 })
        .withMessage(
          'فیلد پسورد نمیتواند کمتر از 6 کاراکتر و بیشتر از 20 باشد'
        ),
    ];
  }
}

module.exports = new UpdatePasswordValidator();
