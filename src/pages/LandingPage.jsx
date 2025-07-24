import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ReportIssueContextProvider from "../store/issue-context";
import { useEffect, useState } from "react";

export default function LandingPage() {

   const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  // Check screen size and update state
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
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // function toggleSidebar(){
  //   setOpenSidebar(true)
  //   console.log("opened")
  // }
  return (
    <div className="flex flex-col">
      <Header toggleSidebar={toggleSidebar} isMobile={isMobile} showSidebar={showSidebar}/>

      <div  className="flex flex-col md:flex-row flex-1 gap-2 md:gap-4">
        <div className="hidden md:block">
          <Sidebar isMobile={isMobile} showSidebar={showSidebar}/>
        </div>

        <div className="mt-8 ml-0 md:ml-65 p-4 md:p-0">
          <ReportIssueContextProvider>
            <Outlet />
          </ReportIssueContextProvider>
        </div>
      </div>
    </div>
  );
}
