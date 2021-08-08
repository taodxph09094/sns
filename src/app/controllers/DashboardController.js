const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class DashboardController {
  //[GET] /
  index(req, res) {
    res.render('admin');
  }
  posts(req, res, next) {
    let courseQuery = Course.find({});
    if (req.query.hasOwnProperty('_sort')) {
      courseQuery = courseQuery.sort({
          [req.query.column] : req.query.type
      });
    }
    Promise.all([courseQuery,  Course.countDocumentsDeleted()])
        .then(([courses, deletedCount]) =>
        res.render('dashboard/posts', {
          deletedCount,
          courses: multipleMongooseToObject(courses)
      })
      )
      .catch(next);
  };
  trashPosts( req, res, next){
    Course.findDeleted({ })
    .then(courses =>  res.render('dashboard/trash', {
        courses: multipleMongooseToObject(courses)
    }),
    )
    .catch(next);
  }

 }



  //[GET]  /search

module.exports = new DashboardController();
