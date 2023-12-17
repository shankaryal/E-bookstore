const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

// Route to add a comment to a book by book ID
router.post("/:bookId/comments", commentController.addCommentToBook);

// Route to get comments for a book by book ID
router.get("/:bookId", commentController.getCommentsForBook);

// Route to delete a comment by comment ID
router.delete("/:commentId", commentController.deleteCommentById);
//update comment
router.put("/:commentId", commentController.updateCommentById);
// Route to add a reply to a comment
router.post("/:commentId/replies", commentController.addReplyToComment);
// Route to delete a reply to a comment
router.delete(
  "/:commentId/replies/:replyId",
  commentController.deleteReplyToComment
);

// Route to update a reply to a comment
router.put(
  "/:commentId/replies/:replyId",
  commentController.updateReplyToComment
);

module.exports = router;
