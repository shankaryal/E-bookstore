import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../App.css";

const ListBook = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios.get("http://localhost:8000/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8000/books/${id}`);
        setBooks(books.filter((book) => book._id !== id));
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>S.N</th>
            <th>Name</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Image</th>
            <th>PDF</th>
            <th>Publisher</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book._id}>
              <td>{index + 1}</td>
              <td>{book.name}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>
                <img
                  src={`http://localhost:8000/${book.image}`}
                  alt={`Cover of ${book.name}`}
                />
              </td>
              <td>
                <a
                  href={`http://localhost:8000/${book.pdf}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  PDF Link
                </a>
              </td>
              <td>{book.publisher}</td>
              <td>
                <Link to={`/update/${book._id}`}>Update</Link>
                <button onClick={() => handleDelete(book._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListBook;
