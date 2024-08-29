const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Adjust the path to your app.js file
const User = require('../models/user');
const Book = require('../models/book');

const { expect } = chai;
chai.use(chaiHttp);

describe('Authentication and Authorization', () => {
  let token;

  before(async () => {
    // Clean up the database before running tests
    await User.deleteMany({});
    await Book.deleteMany({});
  });

  describe('POST /users/register', () => {
    it('should register a new user', (done) => {
      chai.request(app)
        .post('/users/register')
        .send({ username: 'testuser', password: 'password' })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('_id');
          done();
        });
    });
  });

  describe('POST /users/login', () => {
    it('should login and return a token', (done) => {
      chai.request(app)
        .post('/users/login')
        .send({ username: 'testuser', password: 'password' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          token = res.body.token;
          done();
        });
    });
  });

  describe('Protected routes', () => {
    it('should not allow access to protected route without token', (done) => {
      chai.request(app)
        .get('/books')
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('should allow access to protected route with token', (done) => {
      chai.request(app)
        .get('/books')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('should allow admin to create a book', (done) => {
      chai.request(app)
        .post('/books')
        .set('Authorization', `Bearer ${token}`)
        .send({ ISBN: '1234567890', title: 'New Book', authors: [], genres: [], publicationDate: '2023-01-01', description: 'A new book', imageUrl: 'http://example.com/image.jpg' })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('_id');
          done();
        });
    });
  });
});