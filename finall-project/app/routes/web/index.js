const express = require('express');
const router = express.Router();
//middleware
const RedirectIfAuthenticated = require('app/http/middleware/redirectIfAuthenticated');
const RedirectIfNotAdmin = require('app/http/middleware/redirectIfNotAdmin');
const redirectifNotLogIn = require('app/http/middleware/redirectifNotLogIn');

const adminRouter = require('./admin');
router.use('/admin', adminRouter);

const homeRouter = require('./home');
router.use('/', homeRouter);

const authRouter = require('./auth');
router.use('/auth', RedirectIfAuthenticated.handle, authRouter);

const userRouter = require('./user');
router.use('/user', redirectifNotLogIn.handle, userRouter);

module.exports = router;
