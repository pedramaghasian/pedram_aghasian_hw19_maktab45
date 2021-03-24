const express = require('express');
const router = express.Router();

//controllers
const userController = require('app/http/controllers/userController');

const userUpdateValidator = require('app/http/validators/userUpdateValidator');
const updatePasswordValidator = require('app/http/validators/updatePasswordValidator');

//routes
router.get('/', userController.getUser);
router.post(
  '/password',

  updatePasswordValidator.handle(),
  userController.postPassword
);
router.post('/delete', userController.deletePanel);
router.post('/edit', userUpdateValidator.handle(), userController.postEdit);

module.exports = router;
