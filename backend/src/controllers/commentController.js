// const Comment = require("../models/Comment");

// // Add a new comment
// exports.addComment = async (req, res) => {
//   try {
//     const { commenter, book, text } = req.body;

//     const newComment = new Comment({
//       commenter,
//       book,
//       text,
//     });

//     const savedComment = await newComment.save();

//     res.status(201).json(savedComment);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get all comments
// exports.getAllComments = async (req, res) => {
//   try {
//     const allComments = await Comment.find();
//     res.status(200).json(allComments);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get comments by book ID
// exports.getCommentsByBookId = async (req, res) => {
//   try {
//     const { bookId } = req.params;
//     const comments = await Comment.find({ book: bookId });
//     res.status(200).json(comments);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Update comment by ID
// exports.updateCommentById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { text } = req.body;

//     const comment = await Comment.findById(id);
//     if (!comment) {
//       return res.status(404).json({ message: "Comment not found" });
//     }

//     comment.text = text || comment.text;

//     const updatedComment = await comment.save();
//     res.status(200).json(updatedComment);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Delete comment by ID
// exports.deleteCommentById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const comment = await Comment.findByIdAndDelete(id);
//     if (!comment) {
//       return res.status(404).json({ message: "Comment not found" });
//     }

//     res.status(200).json({ message: "Comment deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
