import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Spinner } from "../components/Spinner";

export function ProtectedRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}

