import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  let authData;
  
  try {
    authData = JSON.parse(localStorage.getItem("user"));
  } catch (error) {
    console.error("Failed to parse user data from localStorage:", error);
    authData = null;
  }

  
  if (!authData || !authData.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
