const newsRouter = require('./news');
const meRouter = require('./me');
const siteRouter = require('./site');
const dashboardRouter = require('./dashboard');
const coursesRouter = require('./courses');
const contactRouter = require('./contact');
const booksRouter = require('./books');
const CourseController = require('../app/controllers/CourseController');
function route(app) {
  app.use('/news', newsRouter);
  app.use('/me', meRouter);
  app.use('/PR-sach', booksRouter);
  app.use('/blog', coursesRouter);
  app.use('/admin', dashboardRouter);
  app.use('/dashboard', dashboardRouter);
  app.use('/contact', contactRouter);
  app.use('/', siteRouter);
  //  app.get('/search', (req, res) => {
  //     res.render('search');
  //   });

  //   app.post('/search', (req, res) => {

  //     res.send('');
  //   });
}


module.exports = route;
