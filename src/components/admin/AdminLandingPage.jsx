import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import ReportIssueContextProvider from "../../store/issue-context";

export default function AdminLandingPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const [showIssueSubmenu, setShowIssueSubmenu] = useState(false);
  const [showManageSubmenu, setShowManageSubmenu] = useState(false);
  const [showAirtimeSubmenu, setShowAirtimeSubmenu] = useState(false);

  const navigate = useNavigate();

  const toggleIssueSubmenu = () => {
    setShowIssueSubmenu(!showIssueSubmenu);
  };

  const toggleManageSubmenu = () => {
    setShowManageSubmenu(!showManageSubmenu);
  };
   const toggleAirtimeSubmenu = () => {
    setShowAirtimeSubmenu(!showAirtimeSubmenu);
  };


  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768; // Tailwind's 'md' breakpoint
      setIsMobile(mobile);
      // On large screens, always show sidebar
      if (!mobile) {
        setShowSidebar(true);
      } else {
        setShowSidebar(false);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const onCloseSidebar = () => {
    setShowSidebar(false);
  }

  const navigateToPath = (path)=> {
    setShowSidebar(false)
    navigate(path)
  }

  return (
    <div className="flex flex-col">
      <AdminHeader
        toggleSidebar={toggleSidebar}
        isMobile={isMobile}
        showSidebar={showSidebar}
        onCloseSidebar={onCloseSidebar}
        toggleAirtimeSubmenu={toggleAirtimeSubmenu}
        toggleIssueSubmenu={toggleIssueSubmenu}
        showAirtimeSubmenu={showAirtimeSubmenu}
        showIssueSubmenu={showIssueSubmenu}
        toggleManageSubmenu={toggleManageSubmenu}
        showManageSubmenu={showManageSubmenu}
        navigateToPath={navigateToPath}

      />

      <div className="flex flex-col md:flex-row flex-1 gap-2 md:gap-4">
        <div className="hidden md:block">
          <AdminSidebar
            isMobile={isMobile}
            showSidebar={showSidebar}
            toggleAirtimeSubmenu={toggleAirtimeSubmenu}
            toggleIssueSubmenu={toggleIssueSubmenu}
            toggleManageSubmenu={toggleManageSubmenu}
            showAirtimeSubmenu={showAirtimeSubmenu}
            showManageSubmenu={showManageSubmenu}
            showIssueSubmenu={showIssueSubmenu}
            navigateToPath={navigateToPath}
          />
        </div>

        <div className="mt-8 ml-0 md:ml-65 p-4 md:p-0 w-screen mr-7">
          <ReportIssueContextProvider>
            <Outlet />
          </ReportIssueContextProvider>
        </div>
      </div>
    </div>
  );
}
