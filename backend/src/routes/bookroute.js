const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const multer = require("multer");
const path = require("path");

// Set up multer storage for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "image") {
      cb(null, path.join(__dirname, "../../public/image"));
    } else if (file.fieldname === "pdf") {
      cb(null, path.join(__dirname, "../../public/pdf"));
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Route to add a new book with file uploads
router.post(
  "/add",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  bookController.addNewBook
);

// Route to get a book by ID
router.get("/:id", bookController.getBookById);

// Route to delete a book by ID
router.delete("/:id", bookController.deleteBookById);

// Route to get all books
router.get("/", bookController.getAllBooks);

// Route to search books
router.get("/search/:key", async (req, res) => {
  try {
    const searchTerm = req.params.key;
    const result = await bookController.searchBooks(searchTerm);
    res.send(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// Route to update a book by ID
router.put(
  "/update/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  bookController.updateBookById
);

module.exports = router;
