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
  showAirtimeSubmenu,
  showIssueSubmenu,
  showManageSubmenu,
}) {
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const location = useLocation();

  useOutsideClick(sidebarRef, onCloseSidebar);

  function handleLogout() {
    sessionStorage.removeItem("accessToken");
    navigate("/login");
  }

  return (
    <>
      <header className="bg-gray-200 shadow p-2 flex flex-row h-20 items-center justify-between sticky top-0 z-50">
        <button
          className="md:hidden bg-orange-300 text-white px-1 rounded shadow-lg"
          onClick={toggleSidebar}
        >
          ☰
        </button>
        <div>
          <h2 className=" text-2xl p-3 font-semibold">Welcome</h2>
        </div>

        <button
          className="text-black flex bg-red mr-2 md:bg-red-400 bg-orange-300 py-1 px-2 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>

      {isMobile && showSidebar && (
        <div
          ref={sidebarRef}
          className={`fixed inset-0 mt-20 w-38 ${
            (showIssueSubmenu || showAirtimeSubmenu || showManageSubmenu) &&
            `h-full`
          } h-full bg-orange-300 z-55 rounded md:hidden`}
        >
          <nav className="flex-1 p-1">
            <ul className="space-y-1">
              <li>
                <div className="space-y-1">
                  <NavLink
                    to="/admin/analytics"
                    className={({ isActive }) =>
                      `block px-3 py-1 rounded hover:bg-gray-200 ${
                        isActive ? "bg-gray-300" : ""
                      }`
                    }
                  >
                    Dashboard
                  </NavLink>
                </div>
              </li>

              <li>
                <div className="flex flex-col">
                  <button
                    onClick={toggleIssueSubmenu}
                    className={`flex items-center justify-between gap-2 px-3 py-1 rounded hover:bg-gray-200 ${
                      location.pathname.includes("/landing/viewIssues")
                        ? "bg-gray-300"
                        : ""
                    }`}
                  >
                    <span className=" a-view-issues px-0 py-1 rounded hover:bg-gray-200">
                      View Issues
                    </span>
                    <span>{showIssueSubmenu ? "🔽" : "▶️"}</span>
                  </button>
                  {showIssueSubmenu && (
                    <div className="ml-4 space-y-1">
                      <NavLink
                        to="/admin/allIssues"
                        className={({ isActive }) =>
                          `block px-3 py-1 rounded hover:bg-gray-200 text-sm ${
                            isActive ? "bg-gray-300" : ""
                          }`
                        }
                      >
                        All Issues
                      </NavLink>
                      <NavLink
                        to="/admin/admin_resolved"
                        className={({ isActive }) =>
                          `block px-3 py-1 rounded hover:bg-gray-200 text-sm ${
                            isActive ? "bg-gray-300" : ""
                          }`
                        }
                      >
                        Resolved
                      </NavLink>
                      <NavLink
                        to="/admin/admin_unresolved"
                        className={({ isActive }) =>
                          `block px-3 py-1 rounded hover:bg-gray-200 text-sm ${
                            isActive ? "bg-gray-300" : ""
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
                <div className="space-y-1">
                  <NavLink
                    to="/admin/viewTopUps"
                    className={({ isActive }) =>
                      `block px-3 py-1 rounded hover:bg-gray-200 ${
                        isActive ? "bg-gray-300" : ""
                      }`
                    }
                  >
                    View Top-Ups
                  </NavLink>
                </div>
              </li>
              <li>
                <div className="flex flex-col">
                  <button
                    onClick={toggleManageSubmenu}
                    className={`flex items-center justify-between gap-2 px-3 py-1 rounded hover:bg-gray-200 ${
                      location.pathname.includes("/landing/viewIssues")
                        ? "bg-gray-300"
                        : ""
                    }`}
                  >
                    <span className=" a-view-issues px-0 py-1 rounded hover:bg-gray-200">
                      Manage
                    </span>
                    <span>{showManageSubmenu ? "🔽" : "▶️"}</span>
                  </button>
                  {showManageSubmenu && (
                    <div className="ml-4 space-y-1">
                      <NavLink
                        to="/admin/create-offices"
                        className={({ isActive }) =>
                          `block px-3 py-1 rounded hover:bg-gray-200 text-sm ${
                            isActive ? "bg-gray-300" : ""
                          }`
                        }
                      >
                        Create Office
                      </NavLink>
                      <NavLink
                        to="/admin/create-services"
                        className={({ isActive }) =>
                          `block px-3 py-1 rounded hover:bg-gray-200 text-sm ${
                            isActive ? "bg-gray-300" : ""
                          }`
                        }
                      >
                        Create Service
                      </NavLink>
                      <NavLink
                        to="/admin/register-user"
                        className={({ isActive }) =>
                          `block px-3 py-1 rounded hover:bg-gray-200 text-sm ${
                            isActive ? "bg-gray-300" : ""
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
        </div>
      )}
    </>
  );
}
