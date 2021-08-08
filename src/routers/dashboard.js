const express = require('express');
const router = express.Router();

const DashboardController = require('../app/controllers/DashboardController');

router.get('/', DashboardController.index);
router.get('/posts', DashboardController.posts);
router.get('/trash', DashboardController.trashPosts);

module.exports = router;
