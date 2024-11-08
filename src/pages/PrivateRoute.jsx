// PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element: Element }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo")); // Check if the user is authenticated

  return userInfo ? <Element /> : <Navigate to="/auth" />;
};

export default PrivateRoute;
