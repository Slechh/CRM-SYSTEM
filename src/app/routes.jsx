// src/routes.jsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "../layouts/layout.jsx";
import { DashboardPage, NotFoundPage, EmployeesPage } from "../pages/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "employees", element: <EmployeesPage /> },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
