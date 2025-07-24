import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./components/Login";
import LandingPage from "./pages/LandingPage";
import ReportIssuePage from "./components/issues/ReportIssue";
import ViewIssues from "./components/ViewIssues";
import UpdateTopUp from "./components/UpdateTopUp";
import UnresolvedIssues from "./components/issues/UnresolvedIssues";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: <Login />,
    },
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
          element: <ViewIssues/>
        },
        {
          path: "resolveTopUp",
          element:<UpdateTopUp/>
        },
        {
          path: "unresolved",
          element: <UnresolvedIssues/>
        }
      ],
    },
  ]);

  return (
    
      <RouterProvider router={router} />

  );
}

export default App;
