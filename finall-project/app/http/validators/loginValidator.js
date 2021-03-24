const Validator = require('./validator')
const {check} = require('express-validator')

class LoginValidator extends Validator{

  handle() {
    return [

   
     
      check('email')
        .notEmpty()
        .withMessage('فیلد ایمیل نمیتواند خالی باشد')
        .isEmail()
        .withMessage('فیلد ایمیل معتبر نیست'),
     
      check('password')
        .notEmpty()
        .withMessage('فیلد پسورد نمیتواند خالی باشد')
        .isLength({ min: 8 })
        .withMessage( 'فیلد پسورد نمیتواند کمتر از 8 کاراکتر باشد')
    ]
  }

}

module.exports = new LoginValidator();

