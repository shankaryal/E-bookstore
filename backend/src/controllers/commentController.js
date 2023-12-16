const Book = require("../models/Book");
const Comment = require("../models/Comment");
const User = require("../models/User");

// Add comment to a book by ID
exports.addCommentToBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { userId, content, timestamp } = req.body; // Include timestamp from req.body
    console.log("userId in backend:", userId);

    // Check if userId exists or not
    if (!userId) {
      return res.status(400).json({ message: "User is not authenticated" });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(400).json({ message: "Book not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const newComment = new Comment({
      user: userId,
      content,
    });

    const savedComment = await newComment.save();

    book.comments.push(savedComment._id);
    await book.save();
    savedComment.user = user;

    res.status(200).json(savedComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCommentsForBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    const book = await Book.findById(bookId)
      .populate({
        path: "comments",
        populate: {
          path: "user",
          model: "User",
          select: "firstname lastname _id",
        },
      })
      .populate({
        path: "comments",
        populate: {
          path: "replies",
          model: "Comment",
          populate: {
            path: "user",
            model: "User",
            select: "firstname lastname _id",
          },
        },
      });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Modify the response to include the full name
    const commentsWithFullName = book.comments.map((comment) => {
      const fullName = `${comment.user.firstname} ${comment.user.lastname}`;
      return {
        ...comment.toObject(),
        user: {
          ...comment.user.toObject(),
          fullName,
        },
      };
    });

    res.status(200).json(commentsWithFullName);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete comment by ID
exports.deleteCommentById = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findByIdAndDelete(commentId);
    if (!comment) {
      return res.status(400).json({ message: "Comment not found" });
    }

    await Book.findOneAndUpdate(
      { comments: commentId },
      { $pull: { comments: commentId } }
    );

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateCommentById = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    // Check if the user is authenticated and get the user ID from the request
    const userId = req.body.userId; // Assuming userId is available in the request body

    // Find the comment by ID
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(400).json({ message: "Comment not found" });
    }

    console.log("UserId:", userId);
    console.log("Comment Owner:", comment.user.toString());

    // Ensure the authenticated user is the comment owner
    if (comment.user.toString() !== userId) {
      console.log("Unauthorized access to edit comment");
      return res.status(401).json({
        message: "Unauthorized: You are not the owner of this comment",
      });
    }

    // Update the content of the comment and save
    comment.content = content;
    await comment.save();

    // Respond with the updated comment
    res.status(200).json({
      message: "Comment updated successfully",
      updatedComment: comment,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addReplyToComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId, content } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User is not authenticated" });
    }

    const parentComment = await Comment.findById(commentId);
    if (!parentComment) {
      return res.status(400).json({ message: "Parent Comment not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const newReply = new Comment({
      user: userId,
      content,
      isReply: true,
      parentComment: commentId,
    });

    const savedReply = await newReply.save();

    parentComment.replies.push(savedReply._id);
    await parentComment.save();

    res.status(200).json(savedReply);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteReplyToComment = async (req, res) => {
  try {
    const { commentId, replyId } = req.params;

    const parentComment = await Comment.findById(commentId);
    if (!parentComment) {
      return res.status(400).json({ message: "Parent Comment not found" });
    }

    const replyToDelete = await Comment.findByIdAndDelete(replyId);
    if (!replyToDelete) {
      return res.status(400).json({ message: "Reply not found" });
    }

    // Remove the reply from parent comment's replies array
    parentComment.replies.pull(replyId);
    await parentComment.save();

    res.status(200).json({ message: "Reply deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.updateReplyToComment = async (req, res) => {
  try {
    const { commentId, replyId } = req.params;
    const { userId, content } = req.body;

    // Check if userId exists or not
    if (!userId) {
      return res.status(400).json({ message: "User is not authenticated" });
    }

    const parentComment = await Comment.findById(commentId);
    if (!parentComment) {
      return res.status(400).json({ message: "Parent Comment not found" });
    }

    const replyToUpdate = await Comment.findById(replyId);
    if (!replyToUpdate) {
      return res.status(400).json({ message: "Reply not found" });
    }

    // Ensure the authenticated user is the reply owner
    if (replyToUpdate.user.toString() !== userId) {
      console.log("Unauthorized access to edit reply");
      return res.status(401).json({
        message: "Unauthorized: You are not the owner of this reply",
      });
    }

    // Update the content of the reply and save
    replyToUpdate.content = content;
    await replyToUpdate.save();

    // Respond with the updated reply
    res.status(200).json({
      message: "Reply updated successfully",
      updatedReply: replyToUpdate,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = exports;
