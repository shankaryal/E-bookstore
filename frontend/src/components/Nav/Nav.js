import { Link, useNavigate } from "react-router-dom";

const Nav = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication state (setIsLoggedIn) and clear localStorage
    setIsLoggedIn(false);
    localStorage.clear();

    // Redirect to the homepage or any desired route after logout
    navigate("/");
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            Home
          </Link>
        </li>
        {isLoggedIn ? (
          <li className="navbar-item">
            <button onClick={handleLogout} className="navbar-link">
              Logout
            </button>
          </li>
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
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
