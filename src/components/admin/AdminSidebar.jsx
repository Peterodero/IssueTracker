import { NavLink, useNavigate } from "react-router-dom";

export default function AdminSidebar({
  isMobile,
  showSidebar,
  toggleIssueSubmenu,
  toggleManageSubmenu,
  showIssueSubmenu,
  showManageSubmenu,
}) {
  const navigate = useNavigate();

  function handleLogout() {
    sessionStorage.removeItem("accessToken");
    navigate("/login");
  }

  return (
    <aside
      className={`fixed left-0 top-0 pt-16 h-screen w-64 bg-white text-black flex flex-col shadow-lg z-40 border-r border-gray-200 transition-transform duration-300 ease-in-out ${
        isMobile
          ? showSidebar
            ? "translate-x-0"
            : "-translate-x-full"
          : "translate-x-0"
      }`}
    >
      <div className="p-6 text-xl font-bold border-b border-gray-200">
        <h2 className="text-orange-500">Admin Panel</h2>
      </div>
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          <li>
            <div className="space-y-1 ml-4">
              <button
                onClick={()=> navigate("/admin/analytics")}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md hover:bg-orange-50 transition-colors ${
                    isActive ? "bg-orange-100 text-orange-600 font-medium" : "text-gray-700"
                  }`
                }
              >
                <span>Dashboard</span>
              </button>
            </div>
          </li>

          <li>
            <div className="flex flex-col">
              <button
                onClick={toggleIssueSubmenu}
                className={`flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-orange-50 transition-colors ${
                  location.pathname.includes("/admin/viewIssues") ? "bg-orange-100 text-orange-600" : "text-gray-700"
                }`}
              >
                <span>View Issues</span>
                <span className="text-sm">
                  {showIssueSubmenu ? "▼" : "►"}
                </span>
              </button>
              {showIssueSubmenu && (
                <div className="ml-4 space-y-1 mt-1 border-l-2 border-orange-200 pl-2">
                  <NavLink
                    to="/admin/allIssues"
                    className={({ isActive }) =>
                      `block px-4 py-2 rounded-md hover:bg-orange-50 transition-colors text-sm ${
                        isActive ? "bg-orange-100 text-orange-600 font-medium" : "text-gray-600"
                      }`
                    }
                  >
                    All Issues
                  </NavLink>
                  <NavLink
                    to="/admin/admin_resolved"
                    className={({ isActive }) =>
                      `block px-4 py-2 rounded-md hover:bg-orange-50 transition-colors text-sm ${
                        isActive ? "bg-orange-100 text-orange-600 font-medium" : "text-gray-600"
                      }`
                    }
                  >
                    Resolved
                  </NavLink>
                  <NavLink
                    to="/admin/admin_unresolved"
                    className={({ isActive }) =>
                      `block px-4 py-2 rounded-md hover:bg-orange-50 transition-colors text-sm ${
                        isActive ? "bg-orange-100 text-orange-600 font-medium" : "text-gray-600"
                      }`
                    }
                  >
                    Unresolved
                  </NavLink>
                </div>
              )}
            </div>
          </li>

          <li>
            <div className="space-y-1 ml-4">
              <button
                onClick={()=> navigate("/admin/viewTopUps")}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md hover:bg-orange-50 transition-colors ${
                    isActive ? "bg-orange-100 text-orange-600 font-medium" : "text-gray-700"
                  }`
                }
              >
                View Top-Ups
              </button>
            </div>
          </li>

          <li>
            <div className="flex flex-col">
              <button
                onClick={toggleManageSubmenu}
                className={`flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-orange-50 transition-colors ${
                  location.pathname.includes("/admin/manage") ? "bg-orange-100 text-orange-600" : "text-gray-700"
                }`}
              >
                <span>Manage</span>
                <span className="text-sm">
                  {showManageSubmenu ? "▼" : "►"}
                </span>
              </button>
              {showManageSubmenu && (
                <div className="ml-4 space-y-1 mt-1 border-l-2 border-orange-200 pl-2">
                  <NavLink
                    to="/admin/create-offices"
                    className={({ isActive }) =>
                      `block px-4 py-2 rounded-md hover:bg-orange-50 transition-colors text-sm ${
                        isActive ? "bg-orange-100 text-orange-600 font-medium" : "text-gray-600"
                      }`
                    }
                  >
                    Create Office
                  </NavLink>
                  <NavLink
                    to="/admin/create-services"
                    className={({ isActive }) =>
                      `block px-4 py-2 rounded-md hover:bg-orange-50 transition-colors text-sm ${
                        isActive ? "bg-orange-100 text-orange-600 font-medium" : "text-gray-600"
                      }`
                    }
                  >
                    Create Service
                  </NavLink>
                  <NavLink
                    to="/admin/register-user"
                    className={({ isActive }) =>
                      `block px-4 py-2 rounded-md hover:bg-orange-50 transition-colors text-sm ${
                        isActive ? "bg-orange-100 text-orange-600 font-medium" : "text-gray-600"
                      }`
                    }
                  >
                    Register User
                  </NavLink>
                </div>
              )}
            </div>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200 mt-auto">
        <button
          className="w-full px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-300"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </aside>
  );
}