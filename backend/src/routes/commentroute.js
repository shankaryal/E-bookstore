const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

// Add a new comment
router.post("/", commentController.addComment);

// Get all comments
router.get("/", commentController.getAllComments);

// Get comments by book ID
router.get("/book/:bookId", commentController.getCommentsByBookId);

// Update comment by ID
router.put("/:id", commentController.updateCommentById);

// Delete comment by ID
router.delete("/:id", commentController.deleteCommentById);

module.exports = router;
