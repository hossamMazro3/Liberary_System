const mongoose = require("mongoose");
const schema = mongoose.Schema;
// setup author schma
const authorSchema = new schema({
  name: {
    type: String,
    required: [true, "name filed is required"],
    minlength: [5, "name can not be less than 5 characters"],
    maxlength: [30, "name can not be more than 30 characters"],
  },
  age: {
    type: Number,
  },
  address: {
    type: String,
  },
  
});
// setup book schema
const bookSchema = new schema(
  {
    name: {
      type: String,
      required: [true, "name filed is required"],
      minlength: [1, "name can not be less than 1 characters"],
      maxlength: [20, "name can not be more than 20 characters"],
    },
    page: {
      type: Number,
      required: [true, "book page must be provided"],
      min: [5, "pages of the book must be at least 5 pages"],
    },
    author: authorSchema,
    price: {
      type: Number,
      required: [true, "book price must be provided"],
    },
    
    bookImage: { type: String },
  },
  { timestamps: true }
);

// setup a book model which mapped to a collection in mongodb
const Book = mongoose.model("book", bookSchema);

module.exports = Book;
