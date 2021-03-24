const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const Helpers = require('./helper');
const RememberLogin = require('app/http/middleware/rememberLogin');

class Application {
  constructor() {
    this.setupExpress();
    this.setMongoConnection();
    this.setConfig();
    this.setMulter();
    this.setRouters();
  }

  setupExpress() {
    app.listen(config.port, () =>
      console.log(`Listening on port ${config.port}`)
    );
  }

  setMongoConnection() {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.database.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  setConfig() {
    require('app/passport/passport-local');
    require('app/passport/passport-google');
    app.use(express.static(config.layout.public_dir));
    app.use('/profile', express.static(path.join(__dirname, '../', 'profile')));
    app.use(
      '/imagePost',
      express.static(path.join(__dirname, '../', 'imagePost'))
    );
    app.set('view engine', config.layout.view_engine);
    app.set('views', config.layout.view_dir);
    app.use(config.layout.ejs.expressLayouts);
    app.set('layout extractScripts', config.layout.ejs.extractScripts);
    app.set('layout extractStyles', config.layout.ejs.extractStyles);
    app.set('layout', config.layout.ejs.master);

    app.use(bodyParser.json());
    app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
    app.use(session({ ...config.session }));
    app.use(cookieParser('mysecretKey'));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(RememberLogin.handle);
    app.use((req, res, next) => {
      // set user - isAuthenticated() on every req
      app.locals = new Helpers(req, res).getObjects();
      res.locals.messages = req.flash('errors');

      next();
    });
  }

  setMulter() {
    let storage = multer.diskStorage({
      destination: (req, file, cb) => {
        if (file.fieldname == 'image') {
          cb(null, 'profile/');
        } else {
          cb(null, 'imagePost/');
        }
      },
      filename: (req, file, cb) => {
        cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
      },
    });
    const fileFilter = (req, file, cb) => {
      if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
      ) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    };
    app.use(
      multer({ storage: storage, fileFilter: fileFilter }).fields([
        { name: 'image', maxCount: 1 },
        { name: 'imagePost', maxCount: 1 },
      ])
    );
  }

  setRouters() {
    app.use(require('./routes/web'));
    app.use(require('./routes/api'));
  }
}

module.exports = Application;
