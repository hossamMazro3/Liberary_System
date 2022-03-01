const Book = require("../model/book");
const multer = require("multer");
// setup router
const router = require("express").Router();

// init storage option
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
// init a fileFilter option
const fileFilter = function (req, file, cb) {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    // accept this file
    cb(null, true);
  } else {
    cb(new Error("file must be image file"), false);
  }
};
// init multer upload
const upload = multer({
  storage: storage,
  limits: {
    // file size must be less than or equal 5MB
    fileSize: 1024 * 1024 * 100,
  },
  fileFilter: fileFilter,
});




router.get("/book", async (req, res, next) => {
  const books = await Book.find({});
  res.status(200).json({ books });
});
router.get("/book/:name", async (req, res, next) => {
  const book = await Book.findOne({ name: req.params.name });
  if (!book) {
    return next(new Error(`No book with name ${req.params.name}`));
  }
  res.status(200).json({ book });
});
router.post("/book", upload.single("avatar"), (req, res, next) => {
  const newBook = new Book({
    name: req.body.name,
    page: req.body.page,
    author: JSON.parse( req.body.author ),
    price: req.body.price,
    bookImage: req.file.path,
  });


  newBook.save()
    .then((data) => {
      res.status(201).json({ data });
    })
    .catch(next); 
});
router.patch("/book/:id", async (req, res, next) => {
  const book = await Book.updateOne({ _id: req.params.id }, req.body);
  if (!book) {
    return next(new Error(`No book with id ${req.params.id}`));
  }
  res.status(200).json({ book });
});
router.delete("/book/:id", async (req, res, next) => {
  const book = await Book.deleteOne({ _id: req.params.id });
  if (!book) {
    return next(new Error(`No book with id ${req.params.id}`));
  }
  res.status(200).json({ book });
});

module.exports = router;
