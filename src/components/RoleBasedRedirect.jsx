// RoleBasedRedirect.jsx
import { Navigate } from "react-router-dom";

export default function RoleBasedRedirect() {
  const role = sessionStorage.getItem("role");
  
  switch(role) {
    case 'admin':
      return <Navigate to="/admin/create-offices" />;
    case 'staff':
    case 'user':
    default:
      return <Navigate to="/landing/reportIssue" />;
  }
}