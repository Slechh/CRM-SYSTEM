import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  DashboardPage,
  NotFoundPage,
  EmployeesPage,
  SignInPage,
  OverviewPage,
  AnalyticsPage,
  ProjectsPage,
} from "../pages/index.js";

import { Layout } from "../layouts/layout.jsx";
import { ProtectedRoute } from "./protectedRoute.jsx";

import { OverviewTab } from "../tabs/overview/OverviewTab.jsx";
import { CvTab } from "../tabs/overview/CvTab.jsx";
import { AttachmentTab } from "../tabs/overview/AttachmentTab.jsx";

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

          {
            path: "projects",
            element: <ProjectsPage className="mt-6 pb-5" />,
          },

          {
            element: <ProtectedRoute allowedRoles={["CEO"]} />,
            children: [
              {
                path: "analytics",
                element: <AnalyticsPage />,
              },
            ],
          },

          {
            path: "overview/:id",
            element: <OverviewPage className="mt-7" />,
            children: [
              {
                index: true,
                element: <OverviewTab />,
              },
              {
                path: "cv",
                element: <CvTab />,
              },
              {
                path: "attachment",
                element: <AttachmentTab />,
              },
            ],
          },
        ],
      },
    ],
  },

  {
    path: "signin",
    element: <SignInPage />,
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
