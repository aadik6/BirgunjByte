import React, { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { Outlet, useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

const ProtectedRoute: React.FC = () => {
  const navigate = useNavigate();
  const { token, user, refreshToken, loading } = useAuthStore();

  useEffect(() => {
    const checkAuthorization = async () => {
      if (!token || user?.role !== "admin") {
        const ok = await refreshToken();
        if (!ok) {
          navigate("/login", { replace: true });
        }
      }
    };

    checkAuthorization();
  }, [token, user, navigate, refreshToken]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[90vh]">
        <Loader className="animate-spin" size={24} />
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
