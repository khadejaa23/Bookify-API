const request = require('supertest');
const express = require('express');
const app = express();
const chai = require('chai');
const expect = chai.expect;

app.use(express.json());

let books = [];

// Routes (same as in your app.js)
app.get('/books', (req, res) => {
  res.json(books);
});

app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('Book not found');
  res.json(book);
});

app.post('/books', (req, res) => {
  const book = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author
  };
  books.push(book);
  res.status(201).json(book);
});

app.put('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('Book not found');

  book.title = req.body.title;
  book.author = req.body.author;
  res.json(book);
});

app.delete('/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex === -1) return res.status(404).send('Book not found');

  books.splice(bookIndex, 1);
  res.status(204).send();
});

// Tests
describe('Book API', () => {
  it('should get all books', (done) => {
    request(app)
      .get('/books')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should create a new book', (done) => {
    request(app)
      .post('/books')
      .send({ title: 'New Book', author: 'Author' })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('title', 'New Book');
        expect(res.body).to.have.property('author', 'Author');
        done();
      });
  });

  it('should get a book by id', (done) => {
    const book = { id: 1, title: 'Book 1', author: 'Author 1' };
    books.push(book);
    request(app)
      .get('/books/1')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('id', 1);
        expect(res.body).to.have.property('title', 'Book 1');
        expect(res.body).to.have.property('author', 'Author 1');
        done();
      });
  });

  it('should update a book by id', (done) => {
    const book = { id: 2, title: 'Book 2', author: 'Author 2' };
    books.push(book);
    request(app)
      .put('/books/2')
      .send({ title: 'Updated Book 2', author: 'Updated Author 2' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('id', 2);
        expect(res.body).to.have.property('title', 'Updated Book 2');
        expect(res.body).to.have.property('author', 'Updated Author 2');
        done();
      });
  });

  it('should delete a book by id', (done) => {
    const book = { id: 3, title: 'Book 3', author: 'Author 3' };
    books.push(book);
    request(app)
      .delete('/books/3')
      .expect(204)
      .end((err) => {
        if (err) return done(err);
        expect(books.find(b => b.id === 3)).to.be.undefined;
        done();
      });
  });
});