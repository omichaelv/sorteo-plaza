import React from "react";
import { Route, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ path, element }) => {
    const isAuthenticated = localStorage.getItem("authenticated");
    const navigate = useNavigate();
  
    if (isAuthenticated === "true") {
      return <Route path={path} element={element} />;
    } else {
      navigate("/login");
      return null;
    }
  };

export default ProtectedRoute;