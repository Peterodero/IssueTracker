import { Link, NavLink, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useRef } from "react";
import useOutsideClick from "../hooks/useOutsideClick";

export default function Header({
  toggleSidebar,
  isMobile,
  showSidebar,
  onCloseSidebar,
  toggleAirtimeSubmenu,
  toggleIssueSubmenu,
  toggleManageSubmenu,
  showAirtimeSubmenu,
  showIssueSubmenu,
  showManageSubmenu,
}) {
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  useOutsideClick(sidebarRef, onCloseSidebar);

  function handleLogout() {
    sessionStorage.removeItem("accessToken");
    navigate("/login");
  }

  return (
    <>
      <header className="bg-gray-200 shadow p-2 flex flex-row h-20 items-center justify-between sticky top-0 z-50">
        <button
          className="md:hidden bg-blue-500 text-white px-1 rounded shadow-lg"
          onClick={toggleSidebar}
        >
          ☰
        </button>
        <div>
          <h2 className=" text-2xl p-3 font-semibold">Welcome</h2>
        </div>

        <button className="flex bg-red mr-2" onClick={handleLogout}>
          <Link to="">Logout</Link>
        </button>
      </header>

      {isMobile && showSidebar && (
        <div
          ref={sidebarRef}
          className={`fixed inset-0 mt-20 w-38 ${
            (showIssueSubmenu || showAirtimeSubmenu || showManageSubmenu) && `h-100`
          } h-52 bg-gray-300 z-55 rounded md:hidden`}
        >
          <nav className="flex-1 p-1">
            <ul className="space-y-1">
              <li>
                <NavLink
                  to="/landing/reportIssue"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-1 rounded  hover:bg-gray-200 ${
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
                    <div className="ml-4 space-y-1">
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
                    <div className="ml-4 space-y-1">
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
        </div>
      )}
    </>
  );
}
