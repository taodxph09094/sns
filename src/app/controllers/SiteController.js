const Course = require('../models/Course');
const Book = require('../models/Book');
const { multipleMongooseToObject } = require('../../util/mongoose');


class SiteController {
  //[GET] /
  index(req, res, next) {
       Course.find({})
          .then(courses => {
            res.render('home', {
              courses: multipleMongooseToObject(courses)

             });
          })
          .catch(next);
         // res.render('home');

      }
    //   }
    dashboard(req, res) {
      res.render('admin');
    }

  book(req, res, next) {
    Book.find({})
          .then(books => res.render('listBook', {
            books: multipleMongooseToObject(books)
          }))
          .catch(next);
  }

  blog(req, res, next) {
    Course.find({})
          .then(courses => res.render('listBlog', {
            courses: multipleMongooseToObject(courses)
          }))
          .catch(next);
  }

  about(req, res) {
    res.render('about');
  }

  }

  //[GET]  /search

module.exports = new SiteController();
