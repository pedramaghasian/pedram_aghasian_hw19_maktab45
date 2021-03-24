const Controller = require('./controller');

class HomeController extends Controller {
  index(req, res) {
    res.render('home/index');
  }
}

module.exports = new HomeController();
