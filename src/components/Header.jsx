import { Link, NavLink } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Header({ toggleSidebar, isMobile, showSidebar }) {
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

        <button className="flex bg-red mr-2">
          <Link to="/login">Logout</Link>
        </button>
      </header>

      {isMobile && showSidebar && (
        <div
          className="fixed inset-0 mt-20 w-38 h-52 bg-gray-300 z-55 md:hidden"
          onClick={toggleSidebar}
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
                <NavLink
                  to="/landing/viewIssues"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded  hover:bg-gray-200 ${
                      isActive ? "bg-gray-300" : ""
                    }`
                  }
                >
                  View Issues
                </NavLink>
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
