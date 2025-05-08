import React from "react";
import { Header } from "../header";
import Sidebar from "../sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
  state: string;
}
const MainLayout = ({ children, title, state }: MainLayoutProps) => {
  return (
    <div className="flex flex-row h-screen w-screen">
      <div className="p-4">
        <Sidebar state={state} />
      </div>
      <div className="flex flex-col w-full">
        <Header title={title} />
        <div className="p-10">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
