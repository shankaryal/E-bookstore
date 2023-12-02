import axios from "axios";

const BASE_URL = "http://localhost:8000";

const Comment = {
  addComment: async (commentData) => {
    try {
      const response = await axios.post(`${BASE_URL}/comments`, commentData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  },

  getAllComments: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/comments`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  },

  getCommentsByBookId: async (bookId) => {
    try {
      const response = await axios.get(`${BASE_URL}/comments/book/${bookId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  },

  updateCommentById: async (commentId, newText) => {
    try {
      const response = await axios.put(`${BASE_URL}/comments/${commentId}`, {
        text: newText,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  },

  deleteCommentById: async (commentId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/comments/${commentId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  },
};

export default Comment;
