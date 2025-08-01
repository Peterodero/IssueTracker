import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar({
  isMobile,
  showSidebar,
  toggleAirtimeSubmenu,
  toggleIssueSubmenu,
  toggleManageSubmenu,
  showAirtimeSubmenu,
  showIssueSubmenu,
  showManageSubmenu
}) {
  const navigate = useNavigate();

  function handleLogout() {
    sessionStorage.removeItem("accessToken");
    navigate("/login");
  }

  return (
    <aside
      className={`fixed left-0 top-2 pt-8 h-screen w-64 text-black flex flex-col ${
        isMobile ? "fixed top-16 left-0 w-64 h-full transform" : "block"
      }
        ${
          isMobile
            ? showSidebar
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0"
        }`}
    >
      <div className="p-6 text-2xl font-bold"></div>
      <nav className="flex-1 p-4">
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/landing/reportIssue"
              className={({ isActive }) =>
                `flex items-center gap-1 px-3 py-1 rounded hover:bg-gray-200 ${
                  isActive ? "bg-gray-300" : ""
                }`
              }
            >
              Report Issue
            </NavLink>
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
                    to="/landing/allIssues"
                    className={({ isActive }) =>
                      `block px-3 py-1 rounded hover:bg-gray-200 text-sm ${
                        isActive ? "bg-gray-300" : ""
                      }`
                    }
                  >
                    All Issues
                  </NavLink>
                  <NavLink
                    to="/landing/resolved"
                    className={({ isActive }) =>
                      `block px-3 py-1 rounded hover:bg-gray-200 text-sm ${
                        isActive ? "bg-gray-300" : ""
                      }`
                    }
                  >
                    Resolved
                  </NavLink>
                  <NavLink
                    to="/landing/unresolved"
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
            <div className="flex flex-col">
              <button
                onClick={toggleAirtimeSubmenu}
                className={`flex items-center justify-between gap-2 px-3 py-1 rounded hover:bg-gray-200 ${
                  location.pathname.includes("/landing/viewIssues")
                    ? "bg-gray-300"
                    : ""
                }`}
              >
                <span className=" a-view-issues px-0 py-1 rounded hover:bg-gray-200">
                  Airtime
                </span>
                <span>{showAirtimeSubmenu ? "🔽" : "▶️"}</span>
              </button>
              {showAirtimeSubmenu && (
                <div className="ml-4  space-y-1">
                  <NavLink
                    to="/landing/resolveTopUp"
                    className={({ isActive }) =>
                      `block px-3 py-1 rounded hover:bg-gray-200 text-sm ${
                        isActive ? "bg-gray-300" : ""
                      }`
                    }
                  >
                    Update Top-Up
                  </NavLink>
                  <NavLink
                    to="/landing/viewTopUps"
                    className={({ isActive }) =>
                      `block px-3 py-1 rounded hover:bg-gray-200 text-sm ${
                        isActive ? "bg-gray-300" : ""
                      }`
                    }
                  >
                    View Top-Ups
                  </NavLink>
                </div>
              )}
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
                <div className="ml-4  space-y-1">
                  <NavLink
                    to="/landing/create-offices"
                    className={({ isActive }) =>
                      `block px-3 py-1 rounded hover:bg-gray-200 text-sm ${
                        isActive ? "bg-gray-300" : ""
                      }`
                    }
                  >
                    Create Office
                  </NavLink>
                  <NavLink
                    to="/landing/create-services"
                    className={({ isActive }) =>
                      `block px-3 py-1 rounded hover:bg-gray-200 text-sm ${
                        isActive ? "bg-gray-300" : ""
                      }`
                    }
                  >
                    Create Service
                  </NavLink>
                </div>
              )}
            </div>
          </li>
        </ul>
      </nav>
      <div className="p-3 border-t border-gray-800">
        <button
          className="w-full px-3 py-1 rounded bg-gray-300 hover:bg-gray-200 transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
