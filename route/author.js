const Book = require("../model/book");
// setup router
const router = require("express").Router();
// get all books associated with author
router.get("/author/books/:authorName", async (req, res, next) => {
  const books = await Book.find({
    "author.name": req.params.authorName,
  });
  res.status(200).json({ books });
});

router.get("/author", async (req, res, next) => {
  const authors = await  Book.find({},{author:1}).select("-__v ")
  res.status(200).json({ authors });
});

module.exports = router;
