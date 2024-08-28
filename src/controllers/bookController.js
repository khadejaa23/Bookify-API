const Book = require('../models/book');

exports.getAllBooks = async (req, res) => {
  const books = await Book.find().populate('authors genres');
  res.json(books);
};

exports.getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id).populate('authors genres');
  if (!book) return res.status(404).send('Book not found');
  res.json(book);
};

exports.createBook = async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).json(book);
};

exports.updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!book) return res.status(404).send('Book not found');
  res.json(book);
};

exports.deleteBook = async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) return res.status(404).send('Book not found');
  res.status(204).send();
};

exports.searchBooks = async (req, res) => {
  const { title, author, genre } = req.query;
  const query = {};
  if (title) query.title = new RegExp(title, 'i');
  if (author) query.authors = author;
  if (genre) query.genres = genre;
  const books = await Book.find(query).populate('authors genres');
  res.json(books);
};