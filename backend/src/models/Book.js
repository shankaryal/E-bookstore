const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: String,
  author: String,
  genre: String,
  publisher: String,
  description: String,
  price: Number,
  image: String,
  pdf: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const Book = mongoose.model("books", bookSchema);

module.exports = Book;
