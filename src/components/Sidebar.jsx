import { NavLink } from "react-router-dom";

export default function Sidebar({ isMobile, showSidebar }) {
  return (
    <aside
      className={`fixed left-0 top-2 pt-10 h-screen w-64 text-black flex flex-col ${
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
      <div className="p-4 border-t border-gray-800">
        <button className="w-full px-3 py-2 rounded bg-gray-300 hover:bg-gray-200  transition">
          Logout
        </button>
      </div>
    </aside>
  );
}
