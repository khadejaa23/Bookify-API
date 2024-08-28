const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  ISBN: String,
  title: String,
  authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }],
  genres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
  publicationDate: Date,
  description: String,
  imageUrl: String
});

module.exports = mongoose.model('Book', bookSchema);