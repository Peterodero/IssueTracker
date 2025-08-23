// components/ProtectedRoute.jsx (CORRECT IMPLEMENTATION)
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isTokenExpired, refreshAuthToken } from "../util/http";
import { useEffect, useState } from "react";

export default function ProtectedRoute() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const token = sessionStorage.getItem("accessToken");
  const refreshToken = sessionStorage.getItem("refreshToken");
  const role = sessionStorage.getItem("role");
  const location = useLocation();

  useEffect(() => {
    const silentRefresh = async () => {
      if (token && isTokenExpired(token) && refreshToken && !isTokenExpired(refreshToken)) {
        setIsRefreshing(true);
        try {
          // Import your refresh function
          await refreshAuthToken();
        } catch (error) {
          console.log('Silent refresh failed');
        } finally {
          setIsRefreshing(false);
        }
      }
    };

    silentRefresh();
  }, [token, refreshToken, location]);

  // Check if refresh token is expired (actual logout condition)
  if (refreshToken && isTokenExpired(refreshToken)) {
    sessionStorage.clear();
    return <Navigate to="/login?error=session_expired" replace />;
  }

  // No valid tokens at all
  if (!token || !refreshToken) {
    return <Navigate to="/login" replace />;
  }

  // Show loading while silently refreshing
  if (isRefreshing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Renewing your session...</p>
        </div>
      </div>
    );
  }

  // Role-based routing
  const isAdminRoute = location.pathname.startsWith('/admin');
  if (isAdminRoute && role !== 'admin') {
    return <Navigate to="/landing" replace />;
  }

  const isUserRoute = location.pathname.startsWith('/landing');
  if (isUserRoute && role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}

// // components/ProtectedRoute.jsx (UPDATE)
// import { Navigate, Outlet, useLocation } from "react-router-dom";

// function isTokenExpired(token) {
//   if (!token) return true;
//   try {
//     const payload = JSON.parse(atob(token.split('.')[1]));
//     return payload.exp * 1000 < Date.now();
//   } catch {
//     return true;
//   }
// }

// export default function ProtectedRoute() {
//   const token = sessionStorage.getItem("accessToken");
//   const role = sessionStorage.getItem("role");
//   const location = useLocation();

//   // Check if token exists and is not expired
//   if (!token || isTokenExpired(token)) {
//     // Attempt to refresh token if it's expired but we have a refresh token
//     const refreshToken = sessionStorage.getItem('refreshToken');
//     if (token && refreshToken && isTokenExpired(token)) {
//       // Redirect to login with flag to attempt refresh
//       return <Navigate to="/login?refresh=true" replace state={{ from: location }} />;
//     }
//     return <Navigate to="/login" replace state={{ from: location }} />;
//   }

//   // Check if route is admin path and user is not admin
//   const isAdminRoute = location.pathname.startsWith('/admin');
//   if (isAdminRoute && role !== 'admin') {
//     return <Navigate to="/landing" replace />;
//   }

//   // Check if route is user path and user is admin
//   const isUserRoute = location.pathname.startsWith('/landing');
//   if (isUserRoute && role === 'admin') {
//     return <Navigate to="/admin" replace />;
//   }

//   return <Outlet />;
// }