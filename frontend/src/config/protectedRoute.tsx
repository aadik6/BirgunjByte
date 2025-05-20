import { useAuthStore } from "@/stores/authStore";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const navigate = useNavigate();
  const { token, user, refreshToken, loading } = useAuthStore();

  React.useEffect(() => {
    if (!token || user?.role !== "admin") {
      (async () => {
        const ok = await refreshToken();
        if (!ok) {
          navigate("/login", { replace: true });
        }
      })();
    }
  }, [token, user, navigate]);

  if (!token || user?.role !== "admin") {
    navigate("/login", { replace: true });
  }
  if (!loading) {
    return <Outlet />;
  }
};

export default ProtectedRoute;
