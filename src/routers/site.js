const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');


router.get('/', siteController.index);
router.get('/about', siteController.about);
router.get('/books',siteController.book);
router.get('/blogs',siteController.blog);

module.exports = router;
