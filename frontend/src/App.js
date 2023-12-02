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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const ProtectedSignup = () => {
    return isLoggedIn ? (
      <Navigate to="/" />
    ) : (
      <Signup setIsLoggedIn={setIsLoggedIn} />
    );
  };

  return (
    <Router>
      <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addBook" element={<AddBook />} />
        <Route path="/listBook" element={<ListBook />} />

        {/* Conditional rendering for protecting the /signup route */}
        <Route path="/signup" element={<ProtectedSignup />} />

        <Route
          path="/login"
          element={
            <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />

        {/* Add a 404 route for unmatched paths */}
        <Route path="*" element={<b>Page Not Found</b>} />
      </Routes>
    </Router>
  );
}

export default App;
