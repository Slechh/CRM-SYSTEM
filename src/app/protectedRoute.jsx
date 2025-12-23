import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function ProtectedRoute({ allowedRoles }) {
  const { user } = useAuth();
  const userRole = sessionStorage.getItem("userRole");

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="error" />;
  }

  return <Outlet />;
}
