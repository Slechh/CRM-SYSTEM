import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  DashboardPage,
  NotFoundPage,
  EmployeesPage,
  SignInPage,
} from "../pages/index.js";
import { Layout } from "../layouts/layout.jsx";
import { ProtectedRoute } from "./protectedRoute.jsx";

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          { index: true, element: <Navigate to="/dashboard" /> },
          { path: "dashboard", element: <DashboardPage /> },
          {
            path: "employees",
            element: <EmployeesPage className="mt-6 pb-5" />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "signin",
    element: <SignInPage />,
  },
]);

export default router;
