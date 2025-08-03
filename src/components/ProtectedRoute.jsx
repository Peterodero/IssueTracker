import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
  const token = sessionStorage.getItem("accessToken");
  const role = sessionStorage.getItem("role");
  const location = useLocation();

  if (!token || !role) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Check if route is admin path and user is not admin
  const isAdminRoute = location.pathname.startsWith('/admin');
  if (isAdminRoute && role !== 'admin') {
    return <Navigate to="/landing" replace />;
  }

  // Check if route is user path and user is admin
  const isUserRoute = location.pathname.startsWith('/landing');
  if (isUserRoute && role === 'admin') {
    return <Navigate to="/admin" replace />;
  }


  return <Outlet />;
}