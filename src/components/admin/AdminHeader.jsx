import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";

export default function AdminHeader({
  toggleSidebar,
  isMobile,
  showSidebar,
  onCloseSidebar,
  toggleIssueSubmenu,
  toggleManageSubmenu,
  showIssueSubmenu,
  showManageSubmenu,
  navigateToPath,
}) {
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const location = useLocation();

  useOutsideClick(sidebarRef, onCloseSidebar);

  function handleLogout() {
    sessionStorage.removeItem("accessToken");
    navigate("/login");
  }

  console.log(sessionStorage.getItem("role"))

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex items-center justify-between fixed top-0 right-0 left-0 z-50 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <button
            className="md:hidden bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300"
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <h2 className="text-xl font-bold text-gray-800">Welcome</h2>
        </div>

        <button
          className="flex items-center bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300"
          onClick={handleLogout}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
              clipRule="evenodd"
            />
          </svg>
          Logout
        </button>
      </header>

      {/* Mobile Sidebar */}
      {isMobile && showSidebar && (
        <div
          ref={sidebarRef}
          className="fixed inset-0 mt-16 w-50 h-full bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out"
        >
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              <li>
                <div className="py-1">
                  <button
                    onClick={() => navigateToPath("/admin/analytics")}
                    className={`block w-full text-left px-4 py-2 rounded-md transition-colors duration-200 ${
                      location.pathname === "/admin/analytics"
                        ? "bg-orange-100 text-orange-600 font-medium border-l-4 border-orange-500"
                        : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                    }`}
                  >
                    <div className="flex items-center">Dashboard</div>
                  </button>
                </div>
              </li>

              <li>
                <div>
                  <button
                    onClick={() => navigateToPath("/admin/viewTopUps")}
                    className={`block w-full text-left px-4 py-2 rounded-md transition-colors duration-200 ${
                      location.pathname === "/admin/viewTopUps"
                        ? "bg-orange-100 text-orange-600 font-medium border-l-4 border-orange-500"
                        : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                    }`}
                  >
                    <div className="flex items-center">View Top-Up</div>
                  </button>
                </div>
              </li>

              <li>
                <div className="flex flex-col">
                  <button
                    onClick={toggleIssueSubmenu}
                    className={`flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-orange-50 transition-colors ${
                      location.pathname.includes("/admin/viewIssues")
                        ? "bg-orange-100 text-orange-600"
                        : "text-gray-700"
                    }`}
                  >
                    <span>View Issues</span>
                    <span className="text-sm">
                      {showIssueSubmenu ? "▼" : "►"}
                    </span>
                  </button>
                  {showIssueSubmenu && (
                    <div className="ml-4 space-y-1 mt-1 border-l-2 border-orange-200 pl-2">
                      <button
                        onClick={() => navigateToPath("/admin/allIssues")}
                        className={`block w-full text-left px-4 py-1 rounded-md transition-colors duration-200 ${
                          location.pathname === "/admin/allIssues"
                            ? "bg-orange-100 text-orange-600 font-medium border-l-4 border-orange-500"
                            : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                        }`}
                      >
                        <div className="flex items-center">All Issues</div>
                      </button>
                      <button
                        onClick={() => navigateToPath("/admin/admin_resolved")}
                        className={`block w-full text-left px-4 py-1 rounded-md transition-colors duration-200 ${
                          location.pathname === "/admin/admin_resolved"
                            ? "bg-orange-100 text-orange-600 font-medium border-l-4 border-orange-500"
                            : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                        }`}
                      >
                        <div className="flex items-center">Resolved</div>
                      </button>
                      <button
                        onClick={() =>
                          navigateToPath("/admin/admin_unresolved")
                        }
                        className={`block w-full text-left px-4 py-1 rounded-md transition-colors duration-200 ${
                          location.pathname === "/admin/admin_unresolved"
                            ? "bg-orange-100 text-orange-600 font-medium border-l-4 border-orange-500"
                            : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                        }`}
                      >
                        <div className="flex items-center">Unresolved</div>
                      </button>
                    </div>
                  )}
                </div>
              </li>

              <li>
                <div className="flex flex-col">
                  <button
                    onClick={toggleManageSubmenu}
                    className={`flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-orange-50 transition-colors ${
                      location.pathname.includes("/admin/manage")
                        ? "bg-orange-100 text-orange-600"
                        : "text-gray-700"
                    }`}
                  >
                    <span>Manage</span>
                    <span className="text-sm">
                      {showManageSubmenu ? "▼" : "►"}
                    </span>
                  </button>
                  {showManageSubmenu && (
                    <div className="ml-4 space-y-1 mt-1 border-l-2 border-orange-200 pl-2">
                      <button
                        onClick={() => navigateToPath("/admin/create-offices")}
                        className={`block w-full text-left px-4 py-1 rounded-md transition-colors duration-200 ${
                          location.pathname === "/admin/create-offices"
                            ? "bg-orange-100 text-orange-600 font-medium border-l-4 border-orange-500"
                            : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                        }`}
                      >
                        <div className="flex items-center">Create Office</div>
                      </button>
                      <button
                        onClick={() => navigateToPath("/admin/create-services")}
                        className={`block w-full text-left px-4 py-1 rounded-md transition-colors duration-200 ${
                          location.pathname === "/admin/create-services"
                            ? "bg-orange-100 text-orange-600 font-medium border-l-4 border-orange-500"
                            : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                        }`}
                      >
                        <div className="flex items-center">Create Service</div>
                      </button>
                      <button
                        onClick={() => navigateToPath("/admin/register-user")}
                        className={`block w-full text-left px-4 py-1 rounded-md transition-colors duration-200 ${
                          location.pathname === "/admin/register-user"
                            ? "bg-orange-100 text-orange-600 font-medium border-l-4 border-orange-500"
                            : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                        }`}
                      >
                        <div className="flex items-center">Register User</div>
                      </button>
                      <button
                        onClick={() => navigateToPath("/admin/disable-user")}
                        className={`block w-full text-left px-4 py-1 rounded-md transition-colors duration-200 ${
                          location.pathname === "/admin/disable-user"
                            ? "bg-orange-100 text-orange-600 font-medium border-l-4 border-orange-500"
                            : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                        }`}
                      >
                        <div className="flex items-center">Users</div>
                      </button>
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
