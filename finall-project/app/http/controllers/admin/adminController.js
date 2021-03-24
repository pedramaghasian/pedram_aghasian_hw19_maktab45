const Controller = require('app/http/controllers/controller.js')

class AdminController extends Controller {
  index(req,res) {
    res.json('Admin Page !')
  }
}

module.exports = new AdminController();