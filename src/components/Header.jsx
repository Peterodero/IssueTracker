import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import useOutsideClick from "../hooks/useOutsideClick";

export default function Header({
  toggleSidebar,
  isMobile,
  showSidebar,
  onCloseSidebar,
  toggleIssueSubmenu,
  toggleAirtimeSubmenu,
  showIssueSubmenu,
  showAirtimeSubmenu,
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

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex items-center justify-between sticky top-0 z-50 border-b border-gray-200">
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
                    onClick={() => navigateToPath("/landing/reportIssue")}
                    className={`block w-full text-left px-4 py-1 rounded-md transition-colors duration-200 ${
                      location.pathname === "/landing/reportIssue"
                        ? "bg-orange-100 text-orange-600 font-medium border-l-4 border-orange-500"
                        : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                    }`}
                  >
                    <div className="flex items-center">Report Issue</div>
                  </button>
                </div>
              </li>

              <li>
                <div className="flex flex-col">
                  <button
                    onClick={toggleIssueSubmenu}
                    className={`flex items-center justify-between w-full px-4 py-1 rounded-md hover:bg-orange-50 transition-colors ${
                      location.pathname.includes("/landing/viewIssues")
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
                        onClick={() => navigateToPath("/landing/allIssues")}
                        className={`block w-full text-left px-4 py-1 rounded-md transition-colors duration-200 ${
                          location.pathname === "/landing/allIssues"
                            ? "bg-orange-100 text-orange-600 font-medium border-l-4 border-orange-500"
                            : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                        }`}
                      >
                        <div className="flex items-center">All Issues</div>
                      </button>
                      <button
                        onClick={() => navigateToPath("/landing/resolved")}
                        className={`block w-full text-left px-4 py-1 rounded-md transition-colors duration-200 ${
                          location.pathname === "/landing/resolved"
                            ? "bg-orange-100 text-orange-600 font-medium border-l-4 border-orange-500"
                            : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                        }`}
                      >
                        <div className="flex items-center">Resolved</div>
                      </button>
                      <button
                        onClick={() => navigateToPath("/landing/unresolved")}
                        className={`block w-full text-left px-4 py-1 rounded-md transition-colors duration-200 ${
                          location.pathname === "/landing/unresolved"
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
                    onClick={toggleAirtimeSubmenu}
                    className={`flex items-center justify-between gap-2 px-4 py-1 rounded hover:bg-gray-200 ${
                      location.pathname.includes("/landing/viewAirtime")
                        ? "bg-orange-100 text-orange-600"
                        : "text-gray-700"
                    }`}
                  >
                    <span>Airtime</span>
                    <span>{showAirtimeSubmenu ? "▼" : "►"}</span>
                  </button>
                  {showAirtimeSubmenu && (
                    <div className="ml-4 space-y-1">
                      <button
                        onClick={() => navigateToPath("/landing/resolveTopUp")}
                        className={`block w-full text-left px-4 py-1 rounded-md transition-colors duration-200 ${
                          location.pathname === "/landing/resolveTopUp"
                            ? "bg-orange-100 text-orange-600 font-medium border-l-4 border-orange-500"
                            : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                        }`}
                      >
                        <div className="flex items-center">Record Top-Up</div>
                      </button>
                      <button
                        onClick={() => navigateToPath("/landing/viewTopUps")}
                        className={`block w-full text-left px-4 py-1 rounded-md transition-colors duration-200 ${
                          location.pathname === "/landing/viewTopUps"
                            ? "bg-orange-100 text-orange-600 font-medium border-l-4 border-orange-500"
                            : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                        }`}
                      >
                        <div className="flex items-center">View Top-Up</div>
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

// import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import { useRef } from "react";
// import useOutsideClick from "../hooks/useOutsideClick";

// export default function Header({
//   toggleSidebar,
//   isMobile,
//   showSidebar,
//   onCloseSidebar,
//   toggleAirtimeSubmenu,
//   toggleIssueSubmenu,
//   showAirtimeSubmenu,
//   showIssueSubmenu,
// }) {
//   const navigate = useNavigate();
//   const sidebarRef = useRef(null);
//   const location = useLocation()

//   useOutsideClick(sidebarRef, onCloseSidebar);

//   function handleLogout() {
//     sessionStorage.removeItem("accessToken");
//     navigate("/login");
//   }

//   return (
//     <>
//       <header className="bg-gray-200 shadow p-2 flex flex-row h-20 items-center justify-between sticky top-0 z-50">
//         <button
//           className="md:hidden bg-blue-500 text-white px-1 rounded shadow-lg"
//           onClick={toggleSidebar}
//         >
//           ☰
//         </button>
//         <div>
//           <h2 className=" text-2xl p-3 font-semibold">Welcome</h2>
//         </div>

//         <button className="text-gray-600 flex bg-red mr-2 bg-green-200 py-2 px-5 rounded" onClick={handleLogout}>
//           Logout
//         </button>
//       </header>

//       {isMobile && showSidebar && (
//         <div
//           ref={sidebarRef}
//           className={`fixed inset-0 mt-20 w-38 ${
//             (showIssueSubmenu || showAirtimeSubmenu) && `h-80`
//           } h-52 bg-gray-300 z-55 rounded md:hidden`}
//         >
//           <nav className="flex-1 p-1">
//             <ul className="space-y-1">
//               <li>
//                 <NavLink
//                   to="/landing/reportIssue"
//                   className={({ isActive }) =>
//                     `flex items-center gap-2 px-3 py-1 rounded  hover:bg-gray-200 ${
//                       isActive ? "bg-gray-300" : ""
//                     }`
//                   }
//                 >
//                   Report Issue
//                 </NavLink>
//               </li>
//               <li>
//                 <div className="flex flex-col">
//                   <button
//                     onClick={toggleIssueSubmenu}
//                     className={`flex items-center justify-between gap-2 px-3 py-1 rounded hover:bg-gray-200 ${
//                       location.pathname.includes("/landing/viewIssues")
//                         ? "bg-gray-300"
//                         : ""
//                     }`}
//                   >
//                     <span className=" a-view-issues px-0 py-1 rounded hover:bg-gray-200">
//                       View Issues
//                     </span>
//                     <span>{showIssueSubmenu ? "🔽" : "▶️"}</span>
//                   </button>
//                   {showIssueSubmenu && (
//                     <div className="ml-4 space-y-1">
//                       <NavLink
//                         to="/landing/allIssues"
//                         className={({ isActive }) =>
//                           `block px-3 py-1 rounded hover:bg-gray-200 text-sm ${
//                             isActive ? "bg-gray-300" : ""
//                           }`
//                         }
//                       >
//                         All Issues
//                       </NavLink>
//                       <NavLink
//                         to="/landing/resolved"
//                         className={({ isActive }) =>
//                           `block px-3 py-1 rounded hover:bg-gray-200 text-sm ${
//                             isActive ? "bg-gray-300" : ""
//                           }`
//                         }
//                       >
//                         Resolved
//                       </NavLink>
//                       <NavLink
//                         to="/landing/unresolved"
//                         className={({ isActive }) =>
//                           `block px-3 py-1 rounded hover:bg-gray-200 text-sm ${
//                             isActive ? "bg-gray-300" : ""
//                           }`
//                         }
//                       >
//                         Unresolved
//                       </NavLink>
//                     </div>
//                   )}
//                 </div>
//               </li>

//               <li>
//                 <div className="flex flex-col">
//                   <button
//                     onClick={toggleAirtimeSubmenu}
//                     className={`flex items-center justify-between gap-2 px-3 py-1 rounded hover:bg-gray-200 ${
//                       location.pathname.includes("/landing/viewIssues")
//                         ? "bg-gray-300"
//                         : ""
//                     }`}
//                   >
//                     <span className=" a-view-issues px-0 py-1 rounded hover:bg-gray-200">
//                       Airtime
//                     </span>
//                     <span>{showAirtimeSubmenu ? "🔽" : "▶️"}</span>
//                   </button>
//                   {showAirtimeSubmenu && (
//                     <div className="ml-4 space-y-1">
//                       <NavLink
//                         to="/landing/resolveTopUp"
//                         className={({ isActive }) =>
//                           `block px-3 py-1 rounded hover:bg-gray-200 text-sm ${
//                             isActive ? "bg-gray-300" : ""
//                           }`
//                         }
//                       >
//                         Update Top-Up
//                       </NavLink>
//                       <NavLink
//                         to="/landing/viewTopUps"
//                         className={({ isActive }) =>
//                           `block px-3 py-1 rounded hover:bg-gray-200 text-sm ${
//                             isActive ? "bg-gray-300" : ""
//                           }`
//                         }
//                       >
//                         View Top-Ups
//                       </NavLink>
//                     </div>
//                   )}
//                 </div>
//               </li>
//               {/* <li>
//                 <div className="flex flex-col">
//                   <button
//                     onClick={toggleManageSubmenu}
//                     className={`flex items-center justify-between gap-2 px-3 py-1 rounded hover:bg-gray-200 ${
//                       location.pathname.includes("/landing/viewIssues")
//                         ? "bg-gray-300"
//                         : ""
//                     }`}
//                   >
//                     <span className=" a-view-issues px-0 py-1 rounded hover:bg-gray-200">
//                       Manage
//                     </span>
//                     <span>{showManageSubmenu ? "🔽" : "▶️"}</span>
//                   </button>
//                   {showManageSubmenu && (
//                     <div className="ml-4 space-y-1">
//                       <NavLink
//                         to="/landing/create-offices"
//                         className={({ isActive }) =>
//                           `block px-3 py-1 rounded hover:bg-gray-200 text-sm ${
//                             isActive ? "bg-gray-300" : ""
//                           }`
//                         }
//                       >
//                         Create Office
//                       </NavLink>
//                       <NavLink
//                         to="/landing/create-services"
//                         className={({ isActive }) =>
//                           `block px-3 py-1 rounded hover:bg-gray-200 text-sm ${
//                             isActive ? "bg-gray-300" : ""
//                           }`
//                         }
//                       >
//                         Create Service
//                       </NavLink>
//                     </div>
//                   )}
//                 </div>
//               </li> */}
//             </ul>
//           </nav>
//         </div>
//       )}
//     </>
//   );
// }
