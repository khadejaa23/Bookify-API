## Bookify API

## Description:
A RESTful API for managing books, authors, and genres.

### Installation:

#### Clone the repository: 

``` git clone https://github.com/khadejaa23/bookify-api.git```

#### Install dependencies: 

```npm install```
```npm install express```
```npm install --save-dev mocha chai supertest```

### Usage:

Start the server: ```npm start```

Make API requests using your preferred HTTP client. For example, to get a list of books:

```curl http://localhost:3000/books```

### Endpoints:
```
/books: Get a list of books.
/books/:id: Get a specific book by ID.
/authors: Get a list of authors.
/authors: Get a list of authors.
/authors/:id: Get a specific author by ID.
/genres: Get a list of genres.
/genres/:id: Get a specific genre by ID.
/users/register: Register a new user.
/users/login: Login a user.
/reviews: Get a list of reviews.
// ... other endpoints ...
```
### Test

Run tests: ```npm test```


### Data Structure:
```
Books: title, author(s), publication date, genre(s), description.
Authors: name, biography.
Genres: name.
Users: username, password, role, wishlist.
Reviews: user, book, rating, comment.
```

### Contributing:
Please follow the guidelines in the CONTRIBUTING.md file.

### License:

```MIT License```

### Author:
Khadija Ezzat | https://github.com/khadejaa23
