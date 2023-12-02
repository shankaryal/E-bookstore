const Book = require("../models/book");
const path = require("path");
const fs = require("fs");

// Add a new book with image and PDF upload
exports.addNewBook = async (req, res) => {
  try {
    const { name, author, genre, description, publisher, price } = req.body;
    const { image, pdf } = req.files;

    if (!image || !pdf) {
      return res
        .status(400)
        .json({ message: "Image and PDF files are required." });
    }

    const newBook = new Book({
      name,
      author,
      genre,
      description,
      publisher,
      price,
      image: `image/${image[0].filename}`, // Save image file path in the database
      pdf: `pdf/${pdf[0].filename}`, // Save PDF file path in the database
    });

    const savedBook = await newBook.save();

    res.status(200).json(savedBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get book by ID
exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update book by ID
exports.updateBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, author, genre, description, price, publisher, image, pdf } =
      req.body;

    let book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Update book details
    book.name = name || book.name;
    book.author = author || book.author;
    book.description = description || book.description;
    book.price = price || book.price;
    book.publisher = publisher || book.publisher;
    book.genre = genre || book.genre;

    // Update image name if provided in the request body
    if (image) {
      book.image = image;
    }

    // Update pdf name if provided in the request body
    if (pdf) {
      book.pdf = pdf;
    }

    const updatedBook = await book.save();
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete book by ID
exports.deleteBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const imagePath = path.join(__dirname, `../public/image/${book.image}`);
    const pdfPath = path.join(__dirname, `../public/pdf/${book.pdf}`);

    // Delete the image file
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
    // else {
    //   console.error("Image file not found:", imagePath);
    // }

    // Delete the PDF file
    if (fs.existsSync(pdfPath)) {
      fs.unlinkSync(pdfPath);
    }
    // else {
    //   console.error("PDF file not found:", pdfPath);
    // }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find();
    res.status(200).json(allBooks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.searchBooks = async (key) => {
  try {
    const result = await Book.find({
      $or: [
        { name: { $regex: key, $options: "i" } }, // Case-insensitive regex for book names
        { author: { $regex: key, $options: "i" } }, // Case-insensitive regex for publishers
        { genre: { $regex: key, $options: "i" } }, // Case-insensitive regex for genres
      ],
    });

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
