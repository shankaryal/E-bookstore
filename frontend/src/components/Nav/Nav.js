import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = ({ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("firstName");
    navigate("/");
  };

  const firstName = localStorage.getItem("firstName");

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            Home
          </Link>
        </li>
        {isAdmin ? (
          <>
            <li className="navbar-item">
              <Link to="/addbook" className="navbar-link">
                Add Book
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/listbook" className="navbar-link">
                List Book
              </Link>
            </li>
            {/* Display user's first name next to Logout */}
            <li className="navbar-item">
              <span className="navbar-link" onClick={handleLogout}>
                Logout
              </span>
            </li>
          </>
        ) : isLoggedIn ? (
          <>
            <li className="navbar-item">
              <span className="navbar-link" onClick={handleLogout}>
                Logout({firstName})
              </span>
            </li>
          </>
        ) : (
          <>
            <li className="navbar-item">
              <Link to="/signup" className="navbar-link">
                Sign Up
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/login" className="navbar-link">
                Login
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/admin-login" className="navbar-link">
                Admin
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
