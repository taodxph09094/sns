const express = require('express');
const router = express.Router();

const bookController = require('../app/controllers/BookController');


router.get('/create',bookController.create);
// router.post('/handle-form-actions', bookController.handleFormActions);
// router.get('/:id/edit', bookController.edit);
// router.put('/:id', bookController.update);
// router.patch('/:id/restore', bookController.restore); //restore
// router.delete('/:id', bookController.delete);
// router.delete('/:id/force', bookController.forceDelete);
router.get('/:slug', bookController.showBook);
// router.get('/danh-sach', bookController.store);
// router.get('/danh-sach/sach', bookController.storedBooks);

module.exports = router;
