import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function useAuth() {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem("authenticated") === "true";
  
    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/login");
      }
    }, [isAuthenticated, navigate]);
  
    return isAuthenticated;
  }

export default useAuth;