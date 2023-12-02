import React from "react";
import { useLocation } from "react-router-dom";

export const Explore = () => {
  const location = useLocation();
  const book = location.state?.book; // Ensure the book object exists

  // Conditional rendering if book details are available
  if (!book) {
    return <div>Loading...</div>; // Display a loading indicator or handle the case when book details are not available
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        boxShadow: "0px 0px 5px #ccc",
        marginLeft: "20px",
        marginTop: "20px",
        cursor: "pointer",
      }}
    >
      <img
        src={`http://localhost:8000/${book.image}`}
        alt={book.name}
        style={{
          height: "250px",
          width: "250px",
          objectFit: "contain",
        }}
      />

      <br />
      <div>
        <strong>Name:</strong> <small>{book.name}</small>
      </div>
      <div>
        <strong>Author:</strong> <small>{book.author}</small>
      </div>
      <div>
        <strong>Genre:</strong> <small>{book.genre}</small>
      </div>
      <div>
        <strong>Publisher:</strong> <small>{book.publisher}</small>
      </div>
      <div>
        <strong>Description:</strong> <small>{book.description}</small>
      </div>
      <div>
        <strong>price:</strong> <small>{book.price}</small>
      </div>
      {book.pdf && (
        <div>
          <a
            href={`http://localhost:8000/${book.pdf}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View PDF
          </a>
        </div>
      )}
    </div>
  );
};
export default Explore;
