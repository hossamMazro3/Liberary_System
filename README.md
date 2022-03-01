liberary system API
liberary app that enables you to  start writing down what you have to do with CRUD operations (This repo is backend.).

# Tech stack
 - JavaScript
 - NodeJS
 - ExpressJS
 - MongoDB
 - Mongoose
 - Multer
 - DotEnv

# Features
 - Create a book.

 - Edit and delete a book by id.

 - Get all books.

 - Get a specific book by name.

 - get books associated with an author

### Make sure to Create a dev.env file inside a config folder in the root of the project with the following:
 - DB_Name =
  - port = (optional)


# Endpoints
  ## CRUD Book
    Create book - POST api/book
    Read books - GET api/book
    Read book - GET api/book/:name
    Update book - PATCH api/book/:id
    Delete book - DELETE api/book/:id
   <!-- Author -->
    Read books associated with an author
        => GET /author/books/:authorName
    Read authors - GET /author

