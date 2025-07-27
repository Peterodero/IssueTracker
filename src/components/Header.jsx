import { Link, NavLink, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Header({toggleSidebar, isMobile, showSidebar, toggleIssueSubmenu, showIssueSubmenu  }) {

  const navigate = useNavigate();

  function handleLogout(){
    sessionStorage.removeItem("accessToken")
    navigate('/login')
  }

  // let name = sessionStorage.getItem('userName')
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
          <h2 className=" text-2xl p-3 font-semibold">Welcome Peter</h2>
        </div>

        <button className="flex bg-red mr-2" onClick={handleLogout}>
          <Link to="">Logout</Link>
        </button>
      </header>

      {isMobile && showSidebar && (
        <div
          className={`fixed inset-0 mt-20 w-38 ${showIssueSubmenu && `h-70`} h-52 bg-gray-300 z-55 md:hidden`}
          
        >
          <nav className="flex-1 p-1">
            <ul className="space-y-1">
              <li>
                <NavLink
                  to="/landing/reportIssue"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded  hover:bg-gray-200 ${
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
                    className={`flex items-center justify-between gap-2 px-3 py-2 rounded hover:bg-gray-200 ${
                      location.pathname.includes("/landing/viewIssues")
                        ? "bg-gray-300"
                        : ""
                    }`}
                  >
                    <span className=" a-view-issues px-0 py-2 rounded hover:bg-gray-200">
                      View Issues
                    </span>
                    <span>{showIssueSubmenu ? "🔽" : "▶️"}</span>
                  </button>
                  {showIssueSubmenu && (
                    <div className="ml-4 mt-1 space-y-1">
                      <NavLink
                        to="/landing/resolved"
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded hover:bg-gray-200 text-sm ${
                            isActive ? "bg-gray-300" : ""
                          }`
                        }
                      >
                        Resolved
                      </NavLink>
                      <NavLink
                        to="/landing/unresolved"
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded hover:bg-gray-200 text-sm ${
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
                <NavLink
                  to="/landing/resolveTopUp"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded  hover:bg-gray-200 ${
                      isActive ? "bg-gray-300" : ""
                    }`
                  }
                >
                  Update top-up
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/landing/history"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded  hover:bg-gray-200 ${
                      isActive ? "bg-gray-300" : ""
                    }`
                  }
                >
                  History
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
