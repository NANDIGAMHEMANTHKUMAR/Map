import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useProtectedRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      alert("Please log in first.");
      navigate("/"); 
    }
  }, [navigate]);
};

export default useProtectedRoute;

