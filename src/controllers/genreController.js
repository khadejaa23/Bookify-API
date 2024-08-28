const Genre = require('../models/genre');
const Book = require('../models/book');

exports.getAllGenres = async (req, res) => {
  const genres = await Genre.find();
  res.json(genres);
};

exports.getGenreById = async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send('Genre not found');
  res.json(genre);
};

exports.createGenre = async (req, res) => {
  const genre = new Genre(req.body);
  await genre.save();
  res.status(201).json(genre);
};

exports.updateGenre = async (req, res) => {
  const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!genre) return res.status(404).send('Genre not found');
  res.json(genre);
};

exports.deleteGenre = async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre) return res.status(404).send('Genre not found');
  res.status(204).send();
};

exports.getBooksByGenre = async (req, res) => {
  const books = await Book.find({ genres: req.params.id });
  res.json(books);
};