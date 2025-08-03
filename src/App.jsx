import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ReportIssuePage from "./components/issues/ReportIssue";
import ViewIssues from "./components/ViewIssues";
import UpdateTopUp from "./components/UpdateTopUp";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateOffices from "./components/admin/CreateOffices";
import CreateServices from "./components/admin/CreateServices";
import ResolvedIssues from "./components/issues/ResolvedIssues";
import AllIssues from "./components/issues/AllIssues";
import ViewTopUp from "./components/airtimeTopUp/ViewTopUp";
import ViewAttachment from "./components/admin/Attachment";
import AdminLandingPage from "./components/admin/AdminLandingPage";
import AdminUnresolvedIssues from "./components/admin/AdminUnResolvedIssues";
import AnalyticsPage from "./components/admin/AnalyticsPage";
import AdminResolvedIssues from "./components/admin/AdminResolveIssues";
import UnresolvedIssues from "./components/issues/UnresolvedIssues";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/landing",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/landing",
          element: <LandingPage />,
          children: [
            {
              index: true,
              element: <Navigate to="reportIssue" />,
            },
            {
              path: "reportIssue",
              element: <ReportIssuePage />,
            },
            {
              path: "viewIssues",
              element: <ViewIssues />,
            },
            {
              path: "resolveTopUp",
              element: <UpdateTopUp />,
            },
            {
              path: "allIssues",
              element: <AllIssues />,
            },
            {
              path: "resolved",
              element: <ResolvedIssues />,
            },
            {
              path: "unresolved",
              element: <UnresolvedIssues />,
            },
            {
              path: "viewTopUps",
              element: <ViewTopUp />,
            },

          ],
        },
      ],
    },

    {
      path: "/admin",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/admin",
          element: <AdminLandingPage />, // Admin routes use the same layout
          children: [
            {
              index: true,
              element: <Navigate to="analytics" />,
            },
            {
              path: "analytics",
              element: <AnalyticsPage/>
            },
            {
              path: "allIssues",
              element: <AllIssues />,
            },
            {
              path: "create-offices",
              element: <CreateOffices />,
            },
            {
              path: "create-services",
              element: <CreateServices />,
            },

            {
              path: "admin_resolved",
              element: <AdminResolvedIssues />,
            },
            {
              path: "admin_unresolved",
              element: <AdminUnresolvedIssues />,
            },
            {
              path: "viewTopUps",
              element: <ViewTopUp />,
            },
            {
              path: "viewIssues",
              element: <ViewIssues />,
            },
            
            {
              path: "view-attachment/:issue_id",
              element: <ViewAttachment />,
            },
            
          ],
        },
      ],
    },
  ]);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
