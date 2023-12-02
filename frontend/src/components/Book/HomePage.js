import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../App.css"; //

const HomePage = () => {
  const navigate = useNavigate();
  const [bookList, setBookList] = useState([]);
  const [tempBookList, setTempBookList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchBooks() {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8000/books");
        setBookList(response.data);
        setTempBookList(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function searchBooks() {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8000/books/search/${searchText}`
        );
        if (response.data && isMounted) {
          setBookList(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error searching books:", error);
        setLoading(false);
      }
    }

    if (searchText) {
      searchBooks();
    } else {
      setBookList(tempBookList);
    }

    return () => {
      isMounted = false; // Cleanup to prevent setting state on unmounted component
    };
  }, [searchText, tempBookList]);

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Books..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="book-container">
          {bookList.length > 0 ? (
            bookList.map((book) => (
              <div
                onClick={() =>
                  navigate("/explore", {
                    state: {
                      book,
                    },
                  })
                }
                key={book._id}
                className="book-card"
              >
                <img
                  src={`http://localhost:8000/${book.image}`}
                  alt={book.name}
                  className="book-image"
                />
                <div className="book-details">
                  <div className="book-name">{book.name}</div>
                  <div className="book-info">Author: {book.author}</div>
                  <div className="book-info">Genre: {book.genre}</div>
                  <div className="book-info">Publisher: {book.publisher}</div>
                  <div className="book-info">Price: ${book.price}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-books">No Books Found</div>
          )}
        </div>
      )}
    </>
  );
};

export default HomePage;
