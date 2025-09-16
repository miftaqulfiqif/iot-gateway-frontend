import React from "react";
import { Header } from "./header";
import Sidebar from "./sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
  state: string;
}
const MainLayout = ({ children, title, state }: MainLayoutProps) => {
  return (
    <div className="flex flex-row h-screen">
      <div className="p-4 h-screen">
        <Sidebar state={state} />
      </div>
      <div className="flex flex-col w-full">
        <Header title={title} />
        <div className="flex flex-col px-4 overflow-y-auto h-[calc(100vh-4rem)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
