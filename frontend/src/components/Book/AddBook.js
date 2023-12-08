import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const AddBook = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const response = await axios.post(
        "http://localhost:8000/books/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Added New Book");
        e.target.reset(); // Reset the form after successful submission
        navigate("/"); // Redirect to the home page after adding the book
      } else {
        toast.error("Failed to add book. Response:", response.data);
      }
    } catch (err) {
      toast.error("Failed to add book. Error:", err.message);
    }
  };

  return (
    <div className="input-container">
      <ToastContainer />
      <form
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={handleSubmit}
      >
        Name:
        <input type="text" id="name" name="name" />
        Author:
        <input type="text" id="author" name="author" />
        Genre:
        <input type="text" id="genre" name="genre" />
        Publisher:
        <input type="text" id="publisher" name="publisher" />
        Description:
        <textarea name="description" rows="4"></textarea>
        Price:
        <input type="number" id="price" name="price" />
        Image:
        <input type="file" id="image" name="image" accept="image/*" />
        PDF:
        <input type="file" id="pdf" name="pdf" accept=".pdf" />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
