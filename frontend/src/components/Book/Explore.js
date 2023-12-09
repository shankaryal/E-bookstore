import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../App.css";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const Explore = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state?.book;
  const [showPDF, setShowPDF] = useState(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  if (!book) {
    return <div>Loading...</div>; // Display a loading indicator or handle the case when book details are not available
  }

  const togglePDFView = () => {
    if (isLoggedIn || isAdmin) {
      setShowPDF(!showPDF);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="book-explore">
      <img
        src={`http://localhost:8000/${book.image}`}
        alt={book.name}
        className="book-image"
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
        <strong>Price:</strong> <small>{book.price}</small>
      </div>
      {book.pdf && (
        <div>
          <button onClick={togglePDFView}>View PDF</button>
        </div>
      )}

      <div className={`popup-container ${showPDF ? "active" : ""}`}>
        <button onClick={togglePDFView} className="close-button">
          Close
        </button>
        <div className="pdf-content">
          <Document file={`http://localhost:8000/${book.pdf}`}>
            <Page pageNumber={1} width={600} />
          </Document>
        </div>
      </div>
    </div>
  );
};

export default Explore;
