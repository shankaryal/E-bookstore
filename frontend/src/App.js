import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AddBook from "../src/components/Book/AddBook";
import HomePage from "../src/components/Book/HomePage";
import Dashboard from "../src/components/Book/Dashboard";
import Nav from "../src/components/Nav/Nav";
import { Explore } from "../src/components/Book/Explore";
import ListBook from "../src/components/Book/ListBook";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import AdminLogin from "./components/Admin/AdminLogin";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  );

  const ProtectedAdminRoute = ({ element: Element, ...rest }) => {
    return isAdmin ? (
      <Route {...rest} element={<Element />} />
    ) : (
      <Navigate to="/" />
    );
  };
  const ProtectedAdminLogin = () => {
    return isAdmin || isLoggedIn ? (
      <Navigate to="/" />
    ) : (
      <AdminLogin setIsAdmin={setIsAdmin} />
    );
  };

  const ProtectedSignup = () => {
    return isAdmin || isLoggedIn ? (
      <Navigate to="/" />
    ) : (
      <Signup setIsLoggedIn={setIsLoggedIn} />
    );
  };
  const ProtectedLogin = () => {
    return isAdmin || isLoggedIn ? (
      <Navigate to="/" />
    ) : (
      <Login setIsLoggedIn={setIsLoggedIn} />
    );
  };

  return (
    <Router>
      <Nav
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Protect AddBook and ListBook routes */}
        <Route
          path="/addBook"
          element={<ProtectedAdminRoute element={AddBook} isAdmin={isAdmin} />}
        />
        <Route
          path="/listBook"
          element={<ProtectedAdminRoute element={ListBook} isAdmin={isAdmin} />}
        />

        {/* Conditional rendering for protecting the /signup route */}
        <Route path="/signup" element={<ProtectedSignup />} />

        <Route path="/login" element={<ProtectedLogin />} />
        <Route path="/admin-login" element={<ProtectedAdminLogin />} />

        {/* Add a 404 route for unmatched paths */}
        <Route path="*" element={<b>Page Not Found</b>} />
      </Routes>
    </Router>
  );
}

export default App;
