const Book = require('../models/Book');
const { mongooseToObject } = require('../../util/mongoose');

class BookController {

  showBook(req, res, next){
    // [GET] /book/:slug
    Book.findOne({ slug: req.params.slug })
        .then(book =>
            res.render('books/show', {book: mongooseToObject(book)})

        )
        .catch(next);

}

create(req, res, next){
    //[GET] /book/create
   res.render('books/create');
}

 //[POST] /book/store
store(req, res, next){

    // res.json(req.body);
        const book = new Book(req.body);
        book.save()
        .then(() => res.redirect('/danh-sach/sach'))
        .catch(next);
}
//[GET] /book/:id/edit
    edit(req, res, next){
        Book.findById(req.params.id)
            .then(book => res.render('books/edit', {
                book: mongooseToObject(book)
            }) )
                .catch(next);
    }

    //[PUT] /books/:id
    update(req, res, next){
        Book.updateOne({ _id: req.params.id}, req.body)
            .then(() => res.redirect('/danh-sach/sach'))
            .catch(next);
    }
     //[Delete] books/:id
    delete(req, res, next){
        Book.delete({ _id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[Delete] books/:id/force
    forceDelete(req, res, next){
        Book.deleteOne({ _id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[PATCH] book/:id/restore
    restore( req, res, next) {
        Book.restore({ _id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next);
    }

    //[POST] /book/handle-form-actions
    handleFormActions(req, res, next){
        switch(req.body.action){
            case 'delete':
                Book.delete({ _id: {$in: req.body.bookIds} })
                .then(() => res.redirect('back'))
                .catch(next);
                    break;
                default:
                    res.json({ message: 'Action is invalid!' });
        }
    }

    storedBooks(req, res, next) {

        let bookQuery = Book.find({});


        if (req.query.hasOwnProperty('_sort')) {
          bookQuery = bookQuery.sort({
              [req.query.column] : req.query.type
          });
        }
        Promise.all([bookQuery,  Book.countDocumentsDeleted()])
            .then(([books, deletedCount]) =>
            res.render('/books/list', {
              deletedCount,
              books: multipleMongooseToObject(books)
          })
          )
          .catch(next);
      };

}
module.exports = new BookController();
