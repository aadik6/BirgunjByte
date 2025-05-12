import { useAuthStore } from "@/stores/authStore";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const navigate = useNavigate();
  const { token, user } = useAuthStore();

  // Redirect programmatically if not authenticated
  React.useEffect(() => {
    if (!token || user?.role !== "admin") {
      navigate("/login");
    }
  }, [token, user, navigate]);

  // Render the outlet only if the user is authenticated
  if (!token || user?.role !== "admin") {
    return null; // Or add a fallback loader if needed
  }

  return <Outlet />;
};

export default ProtectedRoute;
