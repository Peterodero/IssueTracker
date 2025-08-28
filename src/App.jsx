import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ReportIssuePage from "./components/user/ReportIssue";
import UpdateTopUp from "./components/user/UpdateTopUp";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateServices from "./components/admin/CreateServices";
import AllIssues from "./components/issues/AllIssues";
import ViewTopUp from "./components/airtimeTopUp/ViewTopUp";
import ViewAttachment from "./components/Attachment";
import AdminLandingPage from "./components/admin/AdminLandingPage";
import AdminUnresolvedIssues from "./components/admin/AdminUnResolvedIssues";
import AnalyticsPage from "./components/admin/AnalyticsPage";
import AdminResolvedIssues from "./components/admin/AdminResolveIssues";
import DisableUser from "./components/admin/DisableUser";
import UserResolvedIssues from "./components/user/UserResolvedIssues";
import UserUnresolvedIssues from "./components/user/UserUnresolvedIssues";
import Saccos from "./components/admin/Saccos";
import Services from "./components/admin/Services";
import SaccoDetails from "./components/admin/SaccoDetails";

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
              path: "resolveTopUp",
              element: <UpdateTopUp />,
            },
            {
              path: "allIssues",
              element: <AllIssues />,
            },
            {
              path: "resolved",
              element: <UserResolvedIssues />,
            },
            {
              path: "unresolved",
              element: <UserUnresolvedIssues />,
            },
            {
              path: "viewTopUps",
              element: <ViewTopUp />,
            },
            {
              path: "view-attachment/:issue_id",
              element: <ViewAttachment />,
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
              element: <AnalyticsPage />,
            },
            {
              path: "allIssues",
              element: <AllIssues />,
            },
             {
              path: "saccos",
              element: <Saccos/>,
            },
            {
              path: "services",
              element: <Services />,
            },
            {
              path: "disable-user",
              element: <DisableUser />,
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
              path: "view-attachment/:issue_id",
              element: <ViewAttachment />,
            },
            {
              path: "sacco-details/:sacco_id",
              element: <SaccoDetails/>
            }
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
