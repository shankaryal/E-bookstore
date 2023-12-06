import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "../../App.css";

const AdminLogin = ({ setIsAdmin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(true);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin === "true") {
      setIsAdmin(true);
      navigate("/");
    }
  }, [navigate, setIsAdmin]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "password") {
      setIsPasswordEmpty(e.target.value === "");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem("isAdmin", "true");
        setIsAdmin(true);
        navigate("/");
      } else {
        setFormData({ email: "", password: "" });

        if (data && data.type === "email") {
          setError("Email not found. Please check your email.");
        } else if (data && data.type === "password") {
          setError("Incorrect password. Please try again.");
        } else {
          setError("Invalid credentials. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <h1> Admin Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <br />
        <br />

        <label htmlFor="password">Password:</label>
        <div className="password-input">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="password-field"
          />
          {!isPasswordEmpty && ( // Only show icon when password field is not empty
            <span
              className="toggle-password"
              onClick={togglePasswordVisibility}
              title={showPassword ? "Hide Password" : "Show Password"}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          )}
        </div>
        <br />
        <br />
        {error ? <p style={{ color: "red" }}>{error}</p> : null}
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default AdminLogin;
