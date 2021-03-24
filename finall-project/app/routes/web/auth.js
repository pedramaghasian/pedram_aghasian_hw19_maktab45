const express = require('express');
const router = express.Router();
const passport = require('passport');

//controllers
const loginController = require('app/http/controllers/auth/loginController');
const registerController = require('app/http/controllers/auth/registerController');
const forgetPasswordController = require('app/http/controllers/auth/forgetPasswordController');
const resetPasswordController = require('app/http/controllers/auth/resetPasswordController');

//validators
const RegisterValidator = require('app/http/validators/registerValidator');
const LoginValidator = require('app/http/validators/loginValidator');
const ForgetPasswordValidator = require('app/http/validators/forgetPasswordValidator');
const ResetPasswordValidator = require('app/http/validators/resetPasswordValidator');

//routes

//login
router.get('/login', loginController.getLogin);
router.post('/login', LoginValidator.handle(), loginController.postLogin);

//register
router.get('/register', registerController.getRegister);

router.post(
  '/register',
  RegisterValidator.handle(),
  registerController.postRegister
);

//reset password
router.get('/password/reset', forgetPasswordController.getPasswordReset);

router.post(
  '/password/email',
  ForgetPasswordValidator.handle(),
  forgetPasswordController.sendPasswordResetLink
);

router.get('/password/reset/:token', resetPasswordController.getResetPassword);

router.post(
  '/password/reset',
  ResetPasswordValidator.handle(),
  resetPasswordController.postResetPassword
);

//google
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/auth/register',
  })
);
module.exports = router;
