const { mongooseToObject } = require('../../util/mongoose');
class ContactController {
  //[GET] /news
  index(req, res) {
    res.render('contact');
  }

  //[GET]  /news/:slug
  contact(req, res) {
    res.send('/contact');
  }
}
module.exports = new ContactController();
