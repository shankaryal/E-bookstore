import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import "../../App.css";

const UpdateBook = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState({
    name: "",
    author: "",
    genre: "",
    description: "",
    publisher: "",
    price: "",
    image: null,
    pdf: null,
  });

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await axios.get(`http://localhost:8000/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    }
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !book.name ||
      !book.author ||
      !book.genre ||
      !book.publisher ||
      !book.price
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
    const formData = new FormData();
    formData.append("name", book.name);
    formData.append("author", book.author);
    formData.append("genre", book.genre);
    formData.append("description", book.description);
    formData.append("publisher", book.publisher);
    formData.append("price", book.price);
    formData.append("image", book.image);
    formData.append("pdf", book.pdf);

    try {
      const response = await axios.put(
        `http://localhost:8000/books/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        alert("Book updated successfully"); // Replace toast with alert
        navigate("/"); // Redirect to the home page after updating the book
      } else {
        toast.error("Failed to update book. Response:", response.data);
      }
    } catch (err) {
      toast.error("Failed to update book. Error:", err.message);
    }
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setBook({ ...book, image: imageFile });
  };

  const handlePdfChange = (e) => {
    const pdfFile = e.target.files[0];
    setBook({ ...book, pdf: pdfFile });
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
        <input
          type="text"
          id="name"
          name="name"
          value={book.name}
          onChange={handleChange}
        />
        Author:
        <input
          type="text"
          id="author"
          name="author"
          value={book.author}
          onChange={handleChange}
        />
        Genre:
        <input
          type="text"
          id="genre"
          name="genre"
          value={book.genre}
          onChange={handleChange}
        />
        Publisher:
        <input
          type="text"
          id="publisher"
          name="publisher"
          value={book.publisher}
          onChange={handleChange}
        />
        Description:
        <textarea
          name="description"
          rows="4"
          value={book.description}
          onChange={handleChange}
        ></textarea>
        Price:
        <input
          type="number"
          id="price"
          name="price"
          value={book.price}
          onChange={handleChange}
        />
        Image:
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
        />
        PDF:
        <input
          type="file"
          id="pdf"
          name="pdf"
          accept=".pdf"
          onChange={handlePdfChange}
        />
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default UpdateBook;
