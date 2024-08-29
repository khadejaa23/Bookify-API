const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');
const genreRoutes = require('./routes/genreRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
const port = 3000;

app.use(express.json());

start = async () => {
  try {
    require('dotenv').config();
  } catch (error) {
    console.log('dotenv not found');
  } 
}

mongoose.connect('mongodb://localhost:27017/bookify', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);
app.use('/genres', genreRoutes);
app.use('/users', userRoutes);
app.use('/reviews', reviewRoutes);

app.listen(port, () => {
  console.log(`Bookify API listening at http://localhost:${port}`);
});