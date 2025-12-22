import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function ProtectedRoute({ allowedRoles }) {
  const { user } = useAuth();
  const userRole = sessionStorage.getItem("userRole");

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Если роль не разрешена, редирект на 404 или dashboard
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
