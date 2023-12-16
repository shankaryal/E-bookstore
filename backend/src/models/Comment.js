const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: String,
  timestamp: { type: Date, default: Date.now },
  isReply: { type: Boolean, default: false },
  parentComment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
