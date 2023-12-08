import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../App.css";

const ListBook = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10); // Number of books per page

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

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextClick = () => {
    const nextPage = currentPage + 1;

    if (nextPage <= Math.ceil(books.length / booksPerPage)) {
      setCurrentPage(nextPage);
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
            <th>Publisher</th>
            <th>Image</th>
            <th>PDF</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map((book, index) => (
            <tr key={book._id}>
              <td>{index + 1}</td>
              <td>{book.name}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.publisher}</td>
              <td>
                <img
                  src={`http://localhost:8000/${book.image}`} // Construct complete URL for the image
                  alt={`Cover of ${book.name}`}
                />
              </td>
              <td>
                <a
                  href={`http://localhost:8000/${book.pdf}`} // Construct complete URL for the PDF
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  PDF Link
                </a>
              </td>
              <td>
                <Link to={`/updateBook/${book._id}`} state={{ book }}>
                  Update
                </Link>
                <button onClick={() => handleDelete(book._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="pagination">
        {currentPage > 1 && (
          <li className="page-item">
            <button onClick={handlePrevClick} className="page-link">
              Previous
            </button>
          </li>
        )}
        {Array.from({ length: Math.ceil(books.length / booksPerPage) }).map(
          (_, index) => (
            <li key={index} className="page-item">
              <button
                onClick={() => paginate(index + 1)}
                className={
                  currentPage === index + 1 ? "page-link active" : "page-link"
                }
              >
                {index + 1}
              </button>
            </li>
          )
        )}
        {currentPage < Math.ceil(books.length / booksPerPage) && (
          <li className="page-item">
            <button onClick={handleNextClick} className="page-link">
              Next
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ListBook;
