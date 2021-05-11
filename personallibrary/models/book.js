const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  comments: [],
  commentcount: Number
});

exports.Book = mongoose.model('Book', bookSchema);
