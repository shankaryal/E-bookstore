const mongoose = require("mongoose");
const Comment = require("./Comment"); // Import Comment model

const bookSchema = new mongoose.Schema({
  name: String,
  author: String,
  genre: String,
  publisher: String,
  description: String,
  price: Number,
  image: String,
  pdf: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], // Reference to comments using the Comment model
});
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
