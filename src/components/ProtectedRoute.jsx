import { Navigate, Outlet } from "react-router-dom";
 
export default function ProtectedRoute() {
    const token = sessionStorage.getItem("accessToken"); // Check if user is logged in

    return token ? <Outlet /> : <Navigate to="/login" replace />;
}
