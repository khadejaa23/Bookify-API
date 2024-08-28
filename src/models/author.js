const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: String,
  biography: String,
  birthDate: Date,
  deathDate: Date,
  nationality: String
});

module.exports = mongoose.model('Author', authorSchema);