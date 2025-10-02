import React, { useEffect, useState } from "react";
import { Header } from "./header";
import Sidebar from "./sidebar";
import BottomNavbar from "./bottom-navbar";

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
  state: string;
}

const MainLayout = ({ children, title, state }: MainLayoutProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // cek pertama kali
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [state]);

  return (
    <div className="flex flex-row h-screen">
      {/* Sidebar hanya muncul di desktop */}
      {!isMobile && (
        <div className="p-4 h-screen">
          <Sidebar state={state} />
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-col w-full">
        <Header title={title} />

        <div className="flex flex-col px-4 overflow-y-auto h-[calc(100vh-4rem)]">
          {children}
        </div>
      </div>

      {/* Bottom Navbar untuk mobile */}
      {isMobile && <BottomNavbar />}
    </div>
  );
};

export default MainLayout;
