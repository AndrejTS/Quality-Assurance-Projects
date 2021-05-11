'use strict';

const Book = require('../models/book').Book;

module.exports = function (app) {

  app.route('/api/books')
    .get(async function (req, res){
      let books = await Book.find({});
      res.json(books);
    })
    
    .post(async function (req, res){
      let newBook = new Book({
        title: req.body.title,
        commentcount: 0
      });
      try {
        await newBook.save();
      } catch (err) {
        if (err) {
          res.send('missing required field title');
          return;
        }
      }
      res.json(newBook);
    })
    
    .delete(async function(req, res){
      await Book.deleteMany({});
      res.send('complete delete successful');
    });



  app.route('/api/books/:id')
    .get(async function (req, res){
      try {
        let book = await Book.findById(req.params.id);
        if (!book) {
          res.send('no book exists');
          return;
        }
        res.json(book);
      } catch (err) {
        res.send('no book exists');
      }
    })
    
    .post(async function(req, res){
      let comment = req.body.comment;
      if (!comment) {
        res.send('missing required field comment');
        return;
      }
      try {
        let bookToUpdate = await Book.findById(req.params.id);
        bookToUpdate.comments.push(comment);
        bookToUpdate.commentcount++;
        await bookToUpdate.save();
        res.json(bookToUpdate);
      } catch (err) {
        res.send('no book exists');
      }
    })
    
    .delete(async function(req, res){
      let bookid = req.params.id;
      try {
        let deletedBook = await Book.findByIdAndDelete(bookid);
        if (!deletedBook) {
          return res.send('no book exists');
        }
        res.send('delete successful');
      } catch (err) {
        res.send('no book exists');
      }
    });
  
};
