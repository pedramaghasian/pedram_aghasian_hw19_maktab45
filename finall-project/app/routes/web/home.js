const express = require('express');
const router = express.Router();

//controllers
const homeController = require('app/http/controllers/homeController');

//routes
router.get('/', homeController.index);

router.get('/logout', (req, res) => {
  req.logout();
  res.clearCookie('remember_token');
  res.redirect('/');
});

module.exports = router;
