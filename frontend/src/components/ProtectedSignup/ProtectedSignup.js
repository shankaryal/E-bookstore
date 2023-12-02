// ProtectedSignup.js
import React from "react";
import { Navigate, Route } from "react-router-dom";

const ProtectedSignup = ({ element: Element, isLoggedIn, ...rest }) => {
  return (
    <Route {...rest} element={isLoggedIn ? <Navigate to="/" /> : <Element />} />
  );
};

export default ProtectedSignup;
